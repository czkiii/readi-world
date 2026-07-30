import {
  assertJsonValue,
  assertPlainRecord,
  assertStableId,
  deepFreeze,
  validateWorldState
} from "../world-state/world-state-contract.js";

export const SAVE_SCHEMA_VERSION = 1;
export const SAVE_FORMAT = "readi-world-save";
export const SAVE_INTEGRITY_ALGORITHM = "sha-256";

export class SaveEnvelopeError extends Error {
  constructor(code, message, options = {}) {
    super(message, options);
    this.name = "SaveEnvelopeError";
    this.code = code;
  }
}

export function createSha256IntegrityProvider(
  cryptoImplementation = globalThis.crypto
) {
  if (!cryptoImplementation?.subtle) {
    throw new SaveEnvelopeError(
      "INTEGRITY_PROVIDER_UNAVAILABLE",
      "SHA-256 integrity verification requires Web Crypto."
    );
  }

  return Object.freeze({
    algorithm: SAVE_INTEGRITY_ALGORITHM,

    async digest(value) {
      const serialized = canonicalStringify(value);
      const bytes = new TextEncoder().encode(serialized);
      const digest = await cryptoImplementation.subtle.digest("SHA-256", bytes);

      return Array.from(new Uint8Array(digest), (byte) =>
        byte.toString(16).padStart(2, "0")
      ).join("");
    }
  });
}

export async function createSaveEnvelope({
  slotId,
  generation,
  reason,
  createdAt,
  worldState,
  integrityProvider
}) {
  assertStableId(slotId, "save slot id");
  assertPositiveInteger(generation, "save generation");
  assertStableId(reason, "save reason");
  assertIsoTimestamp(createdAt);
  validateWorldState(worldState);
  validateIntegrityProvider(integrityProvider);

  const unsignedEnvelope = {
    format: SAVE_FORMAT,
    saveSchemaVersion: SAVE_SCHEMA_VERSION,
    slotId,
    generation,
    reason,
    createdAt,
    transactionWatermark: worldState.metadata.lastCommandId,
    sections: {
      worldState: {
        schemaVersion: worldState.schemaVersion,
        data: structuredClone(worldState)
      }
    }
  };

  const digest = await integrityProvider.digest(unsignedEnvelope);
  const envelope = {
    ...unsignedEnvelope,
    integrity: {
      algorithm: integrityProvider.algorithm,
      digest
    }
  };

  await validateSaveEnvelope(envelope, { integrityProvider });
  return deepFreeze(envelope);
}

export async function parseAndValidateSaveEnvelope(serialized, options) {
  if (typeof serialized !== "string") {
    throw new SaveEnvelopeError(
      "INVALID_SERIALIZED_SAVE",
      "Serialized save data must be a string."
    );
  }

  let envelope;

  try {
    envelope = JSON.parse(serialized);
  } catch (error) {
    throw new SaveEnvelopeError(
      "INVALID_SAVE_JSON",
      "Save data is not valid JSON.",
      { cause: error }
    );
  }

  await validateSaveEnvelope(envelope, options);
  return deepFreeze(structuredClone(envelope));
}

export async function validateSaveEnvelope(envelope, { integrityProvider }) {
  validateIntegrityProvider(integrityProvider);
  assertPlainRecord(envelope, "save envelope");
  assertJsonValue(envelope, "save envelope");

  if (envelope.format !== SAVE_FORMAT) {
    throw new SaveEnvelopeError(
      "INVALID_SAVE_FORMAT",
      `Expected save format ${SAVE_FORMAT}.`
    );
  }

  if (envelope.saveSchemaVersion !== SAVE_SCHEMA_VERSION) {
    throw new SaveEnvelopeError(
      "UNSUPPORTED_SAVE_VERSION",
      `Save schema ${envelope.saveSchemaVersion} is not supported by schema ${SAVE_SCHEMA_VERSION}.`
    );
  }

  assertStableId(envelope.slotId, "save slot id");
  assertPositiveInteger(envelope.generation, "save generation");
  assertStableId(envelope.reason, "save reason");
  assertIsoTimestamp(envelope.createdAt);

  if (envelope.transactionWatermark !== null) {
    assertStableId(envelope.transactionWatermark, "transaction watermark");
  }

  assertPlainRecord(envelope.sections, "save sections");
  assertPlainRecord(envelope.sections.worldState, "World State section");
  validateWorldState(envelope.sections.worldState.data);

  if (
    envelope.sections.worldState.schemaVersion !==
    envelope.sections.worldState.data.schemaVersion
  ) {
    throw new SaveEnvelopeError(
      "WORLD_STATE_SECTION_VERSION_MISMATCH",
      "World State section version does not match its data."
    );
  }

  if (
    envelope.transactionWatermark !==
    envelope.sections.worldState.data.metadata.lastCommandId
  ) {
    throw new SaveEnvelopeError(
      "TRANSACTION_WATERMARK_MISMATCH",
      "Save transaction watermark does not match World State."
    );
  }

  assertPlainRecord(envelope.integrity, "save integrity");

  if (envelope.integrity.algorithm !== integrityProvider.algorithm) {
    throw new SaveEnvelopeError(
      "UNSUPPORTED_INTEGRITY_ALGORITHM",
      `Integrity algorithm ${envelope.integrity.algorithm} is not supported.`
    );
  }

  if (
    typeof envelope.integrity.digest !== "string" ||
    !/^[a-f0-9]{64}$/.test(envelope.integrity.digest)
  ) {
    throw new SaveEnvelopeError(
      "INVALID_INTEGRITY_DIGEST",
      "Save integrity digest must be a lowercase SHA-256 value."
    );
  }

  const { integrity, ...unsignedEnvelope } = envelope;
  const expectedDigest = await integrityProvider.digest(unsignedEnvelope);

  if (integrity.digest !== expectedDigest) {
    throw new SaveEnvelopeError(
      "INTEGRITY_CHECK_FAILED",
      "Save data failed its integrity check."
    );
  }

  return envelope;
}

export function serializeSaveEnvelope(envelope) {
  return canonicalStringify(envelope);
}

export function canonicalStringify(value) {
  assertJsonValue(value, "canonical JSON value");
  return serializeCanonicalValue(value);
}

function serializeCanonicalValue(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map(serializeCanonicalValue).join(",")}]`;
  }

  const entries = Object.keys(value)
    .sort()
    .map(
      (key) =>
        `${JSON.stringify(key)}:${serializeCanonicalValue(value[key])}`
    );

  return `{${entries.join(",")}}`;
}

function validateIntegrityProvider(integrityProvider) {
  if (
    integrityProvider === null ||
    typeof integrityProvider !== "object" ||
    typeof integrityProvider.algorithm !== "string" ||
    typeof integrityProvider.digest !== "function"
  ) {
    throw new SaveEnvelopeError(
      "INVALID_INTEGRITY_PROVIDER",
      "Save Manager requires an integrity provider."
    );
  }
}

function assertPositiveInteger(value, fieldName) {
  if (!Number.isInteger(value) || value < 1) {
    throw new SaveEnvelopeError(
      "INVALID_POSITIVE_INTEGER",
      `${fieldName} must be a positive integer.`
    );
  }
}

function assertIsoTimestamp(value) {
  if (
    typeof value !== "string" ||
    !Number.isFinite(Date.parse(value)) ||
    new Date(value).toISOString() !== value
  ) {
    throw new SaveEnvelopeError(
      "INVALID_SAVE_TIMESTAMP",
      "Save timestamp must be a canonical ISO-8601 string."
    );
  }
}
