import {
  assertStableId,
  deepFreeze,
  validateWorldState
} from "../world-state/world-state-contract.js";
import {
  canonicalStringify,
  createSaveEnvelope,
  createSha256IntegrityProvider,
  parseAndValidateSaveEnvelope,
  serializeSaveEnvelope
} from "./save-envelope.js";

const SAVE_RECORD_KINDS = Object.freeze(["active", "backup", "staging"]);
const QUOTA_ERROR_CODE = "STORAGE_QUOTA_EXCEEDED";

export class SaveManagerError extends Error {
  constructor(code, message, options = {}) {
    super(message, options);
    this.name = "SaveManagerError";
    this.code = code;
    this.details = options.details ?? null;
  }
}

export function createSaveManager({
  storageAdapter,
  integrityProvider = createSha256IntegrityProvider(),
  now = () => new Date()
}) {
  validateStorageAdapter(storageAdapter);

  if (typeof now !== "function") {
    throw new SaveManagerError(
      "INVALID_CLOCK",
      "Save Manager clock must be a function."
    );
  }

  return Object.freeze({
    async save({ slotId, worldState, reason }) {
      assertStableId(slotId, "save slot id");
      assertStableId(reason, "save reason");
      validateWorldState(worldState);

      return storageAdapter.withExclusiveLock(slotId, async () => {
        const activeRecord = await storageAdapter.read(slotId, "active");
        const backupRecord = await storageAdapter.read(slotId, "backup");
        const activeResult = await inspectRecord(activeRecord, integrityProvider);
        const backupResult = await inspectRecord(backupRecord, integrityProvider);

        if (
          activeResult.status === "valid" &&
          statesAreEqual(
            activeResult.envelope.sections.worldState.data,
            worldState
          )
        ) {
          return deepFreeze({
            status: "unchanged",
            source: "active",
            generation: activeResult.envelope.generation,
            envelope: activeResult.envelope
          });
        }

        const generation =
          Math.max(
            validGeneration(activeResult),
            validGeneration(backupResult)
          ) + 1;
        const timestamp = normalizeTimestamp(now());
        const envelope = await createSaveEnvelope({
          slotId,
          generation,
          reason,
          createdAt: timestamp,
          worldState,
          integrityProvider
        });
        const stagingRecord = {
          generation,
          serialized: serializeSaveEnvelope(envelope)
        };

        try {
          await writeStagingWithQuotaRetry(
            storageAdapter,
            slotId,
            stagingRecord
          );

          const stagedResult = await inspectRecord(
            await storageAdapter.read(slotId, "staging"),
            integrityProvider
          );

          if (
            stagedResult.status !== "valid" ||
            stagedResult.envelope.generation !== generation ||
            stagedResult.envelope.slotId !== slotId
          ) {
            throw new SaveManagerError(
              "STAGING_VALIDATION_FAILED",
              "Staged save did not pass post-write validation.",
              { details: recordFailureDetails(stagedResult) }
            );
          }

          await storageAdapter.commitStaging(slotId, {
            expectedActiveGeneration: activeRecord?.generation ?? null,
            rotateActiveToBackup: activeResult.status === "valid"
          });

          const committedResult = await inspectRecord(
            await storageAdapter.read(slotId, "active"),
            integrityProvider
          );

          if (
            committedResult.status !== "valid" ||
            committedResult.envelope.generation !== generation
          ) {
            throw new SaveManagerError(
              "ACTIVE_SAVE_VALIDATION_FAILED",
              "Activated save did not pass final validation.",
              { details: recordFailureDetails(committedResult) }
            );
          }

          return deepFreeze({
            status: "saved",
            source: "active",
            generation,
            envelope: committedResult.envelope
          });
        } catch (error) {
          await safelyDiscardStaging(storageAdapter, slotId);

          if (error instanceof SaveManagerError) {
            throw error;
          }

          if (error?.code === QUOTA_ERROR_CODE) {
            throw new SaveManagerError(
              QUOTA_ERROR_CODE,
              "Storage quota is still insufficient after discardable cache cleanup.",
              { cause: error }
            );
          }

          throw new SaveManagerError(
            "SAVE_WRITE_FAILED",
            "Save generation was not activated; the previous verified save remains available.",
            { cause: error }
          );
        }
      });
    },

    async load({ slotId }) {
      assertStableId(slotId, "save slot id");

      return storageAdapter.withExclusiveLock(slotId, async () => {
        const activeResult = await inspectRecord(
          await storageAdapter.read(slotId, "active"),
          integrityProvider
        );

        if (activeResult.status === "valid") {
          return createLoadResult("loaded", "active", activeResult.envelope);
        }

        const backupResult = await inspectRecord(
          await storageAdapter.read(slotId, "backup"),
          integrityProvider
        );

        if (backupResult.status === "valid") {
          return createLoadResult(
            "recovered",
            "backup",
            backupResult.envelope,
            recordFailureDetails(activeResult)
          );
        }

        if (
          activeResult.status === "missing" &&
          backupResult.status === "missing"
        ) {
          return deepFreeze({
            status: "empty",
            source: null,
            generation: 0,
            worldState: null,
            envelope: null,
            recovery: null
          });
        }

        throw new SaveManagerError(
          "RECOVERY_REQUIRED",
          "Neither the active save nor its automatic backup is valid.",
          {
            details: {
              active: recordFailureDetails(activeResult),
              backup: recordFailureDetails(backupResult)
            }
          }
        );
      });
    }
  });
}

async function inspectRecord(record, integrityProvider) {
  if (record === null) {
    return { status: "missing" };
  }

  if (
    typeof record !== "object" ||
    !Number.isInteger(record.generation) ||
    record.generation < 1 ||
    typeof record.serialized !== "string"
  ) {
    return {
      status: "invalid",
      error: new SaveManagerError(
        "INVALID_STORAGE_RECORD",
        "Storage returned an invalid save record."
      )
    };
  }

  try {
    const envelope = await parseAndValidateSaveEnvelope(record.serialized, {
      integrityProvider
    });

    if (record.generation !== envelope.generation) {
      throw new SaveManagerError(
        "STORAGE_GENERATION_MISMATCH",
        "Storage generation does not match the save envelope."
      );
    }

    return { status: "valid", envelope };
  } catch (error) {
    return { status: "invalid", error };
  }
}

function createLoadResult(status, source, envelope, recovery = null) {
  return deepFreeze({
    status,
    source,
    generation: envelope.generation,
    worldState: structuredClone(envelope.sections.worldState.data),
    envelope,
    recovery
  });
}

async function writeStagingWithQuotaRetry(adapter, slotId, record) {
  try {
    await adapter.writeStaging(slotId, record);
  } catch (error) {
    if (error?.code !== QUOTA_ERROR_CODE) {
      throw error;
    }

    await adapter.clearDiscardableCache();
    await adapter.writeStaging(slotId, record);
  }
}

async function safelyDiscardStaging(adapter, slotId) {
  try {
    await adapter.discardStaging(slotId);
  } catch {
    // A failed cleanup must not hide the original save error.
  }
}

function statesAreEqual(left, right) {
  return canonicalStringify(left) === canonicalStringify(right);
}

function validGeneration(result) {
  return result.status === "valid" ? result.envelope.generation : 0;
}

function recordFailureDetails(result) {
  if (result.status === "missing") {
    return { status: "missing", code: null };
  }

  if (result.status === "valid") {
    return { status: "valid", code: null };
  }

  return {
    status: "invalid",
    code: result.error?.code ?? "UNKNOWN_SAVE_ERROR"
  };
}

function normalizeTimestamp(value) {
  if (value instanceof Date) {
    try {
      return value.toISOString();
    } catch (error) {
      throw new SaveManagerError(
        "INVALID_CLOCK_VALUE",
        "Save Manager clock returned an invalid Date.",
        { cause: error }
      );
    }
  }

  if (typeof value === "string") {
    try {
      return new Date(value).toISOString();
    } catch (error) {
      throw new SaveManagerError(
        "INVALID_CLOCK_VALUE",
        "Save Manager clock returned an invalid timestamp.",
        { cause: error }
      );
    }
  }

  throw new SaveManagerError(
    "INVALID_CLOCK_VALUE",
    "Save Manager clock must return a Date or ISO timestamp."
  );
}

function validateStorageAdapter(adapter) {
  if (
    adapter === null ||
    (typeof adapter !== "object" && typeof adapter !== "function")
  ) {
    throw new SaveManagerError(
      "INVALID_STORAGE_ADAPTER",
      "Save Manager requires a storage adapter."
    );
  }

  for (const method of [
    "withExclusiveLock",
    "read",
    "writeStaging",
    "commitStaging",
    "discardStaging",
    "clearDiscardableCache"
  ]) {
    if (typeof adapter[method] !== "function") {
      throw new SaveManagerError(
        "INVALID_STORAGE_ADAPTER",
        `Storage adapter must implement ${method}().`
      );
    }
  }

  if (
    adapter.recordKinds !== undefined &&
    canonicalStringify(adapter.recordKinds) !==
      canonicalStringify(SAVE_RECORD_KINDS)
  ) {
    throw new SaveManagerError(
      "INVALID_STORAGE_RECORD_KINDS",
      "Storage adapter record kinds do not match Save Manager."
    );
  }
}
