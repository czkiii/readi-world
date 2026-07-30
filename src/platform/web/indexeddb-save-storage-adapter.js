import { assertStableId } from "../../core/world-state/world-state-contract.js";

const RECORD_KINDS = Object.freeze(["active", "backup", "staging"]);
const DEFAULT_DATABASE_NAME = "readi-world-saves";
const STORE_NAME = "saveRecords";

export class SaveStorageError extends Error {
  constructor(code, message, options = {}) {
    super(message, options);
    this.name = "SaveStorageError";
    this.code = code;
  }
}

export function createIndexedDbSaveStorageAdapter({
  indexedDBImplementation = globalThis.indexedDB,
  lockManager = globalThis.navigator?.locks,
  databaseName = DEFAULT_DATABASE_NAME,
  discardableCacheCleaner = async () => false
} = {}) {
  if (!indexedDBImplementation?.open) {
    throw new SaveStorageError(
      "INDEXED_DB_UNAVAILABLE",
      "IndexedDB is required for authoritative web saves."
    );
  }

  if (typeof lockManager?.request !== "function") {
    throw new SaveStorageError(
      "STORAGE_LOCK_UNAVAILABLE",
      "A cross-tab Web Lock is required for safe authoritative saves."
    );
  }

  if (typeof discardableCacheCleaner !== "function") {
    throw new SaveStorageError(
      "INVALID_CACHE_CLEANER",
      "Discardable cache cleaner must be a function."
    );
  }

  let databasePromise;

  const getDatabase = () => {
    databasePromise ??= openDatabase(indexedDBImplementation, databaseName);
    return databasePromise;
  };

  return Object.freeze({
    recordKinds: RECORD_KINDS,

    withExclusiveLock(slotId, operation) {
      assertStableId(slotId, "save slot id");

      if (typeof operation !== "function") {
        throw new SaveStorageError(
          "INVALID_LOCK_OPERATION",
          "Storage lock operation must be a function."
        );
      }

      return lockManager.request(
        `readi-world.save.${slotId}`,
        { mode: "exclusive" },
        operation
      );
    },

    async read(slotId, kind) {
      validateRecordAddress(slotId, kind);
      const database = await getDatabase();
      const transaction = database.transaction(STORE_NAME, "readonly");
      const request = transaction.objectStore(STORE_NAME).get(recordKey(slotId, kind));
      const storedRecord = await requestResult(request);
      await transactionCompletion(transaction);

      if (storedRecord === undefined) {
        return null;
      }

      return {
        generation: storedRecord.generation,
        serialized: storedRecord.serialized
      };
    },

    async writeStaging(slotId, record) {
      validateStorageRecord(slotId, record);
      const database = await getDatabase();
      const transaction = database.transaction(STORE_NAME, "readwrite");

      transaction.objectStore(STORE_NAME).put({
        key: recordKey(slotId, "staging"),
        slotId,
        kind: "staging",
        generation: record.generation,
        serialized: record.serialized
      });

      await completeOrNormalize(transaction);
    },

    async commitStaging(
      slotId,
      { expectedActiveGeneration, rotateActiveToBackup }
    ) {
      assertStableId(slotId, "save slot id");
      const database = await getDatabase();
      const transaction = database.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      try {
        const active = await requestResult(
          store.get(recordKey(slotId, "active"))
        );
        const staging = await requestResult(
          store.get(recordKey(slotId, "staging"))
        );
        const actualGeneration = active?.generation ?? null;

        if (actualGeneration !== expectedActiveGeneration) {
          throw new SaveStorageError(
            "ACTIVE_GENERATION_CONFLICT",
            "Active save changed while a new generation was being staged."
          );
        }

        if (!staging) {
          throw new SaveStorageError(
            "STAGING_RECORD_MISSING",
            "No staged save is available to activate."
          );
        }

        if (rotateActiveToBackup && active) {
          store.put({
            ...active,
            key: recordKey(slotId, "backup"),
            kind: "backup"
          });
        }

        store.put({
          ...staging,
          key: recordKey(slotId, "active"),
          kind: "active"
        });
        store.delete(recordKey(slotId, "staging"));
      } catch (error) {
        transaction.abort();
        throw error;
      }

      await completeOrNormalize(transaction);
    },

    async discardStaging(slotId) {
      assertStableId(slotId, "save slot id");
      const database = await getDatabase();
      const transaction = database.transaction(STORE_NAME, "readwrite");
      transaction.objectStore(STORE_NAME).delete(recordKey(slotId, "staging"));
      await completeOrNormalize(transaction);
    },

    async clearDiscardableCache() {
      // The save database itself is never discardable. Runtime wiring may
      // inject a separate asset/cache cleanup without coupling it to saves.
      return discardableCacheCleaner();
    }
  });
}

function openDatabase(indexedDBImplementation, databaseName) {
  return new Promise((resolve, reject) => {
    const request = indexedDBImplementation.open(databaseName, 1);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(
        normalizeStorageError(
          request.error,
          "INDEXED_DB_OPEN_FAILED",
          "Could not open authoritative save storage."
        )
      );
  });
}

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function transactionCompletion(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error);
    transaction.onerror = () => reject(transaction.error);
  });
}

async function completeOrNormalize(transaction) {
  try {
    await transactionCompletion(transaction);
  } catch (error) {
    throw normalizeStorageError(
      error,
      "INDEXED_DB_WRITE_FAILED",
      "IndexedDB could not complete the save transaction."
    );
  }
}

function normalizeStorageError(error, fallbackCode, fallbackMessage) {
  if (
    error?.name === "QuotaExceededError" ||
    error?.name === "NS_ERROR_DOM_QUOTA_REACHED"
  ) {
    return new SaveStorageError(
      "STORAGE_QUOTA_EXCEEDED",
      "Storage quota is insufficient for a new save generation.",
      { cause: error }
    );
  }

  if (error instanceof SaveStorageError) {
    return error;
  }

  return new SaveStorageError(fallbackCode, fallbackMessage, { cause: error });
}

function validateRecordAddress(slotId, kind) {
  assertStableId(slotId, "save slot id");

  if (!RECORD_KINDS.includes(kind)) {
    throw new SaveStorageError(
      "INVALID_RECORD_KIND",
      `Unknown save record kind ${kind}.`
    );
  }
}

function validateStorageRecord(slotId, record) {
  assertStableId(slotId, "save slot id");

  if (
    record === null ||
    typeof record !== "object" ||
    !Number.isInteger(record.generation) ||
    record.generation < 1 ||
    typeof record.serialized !== "string"
  ) {
    throw new SaveStorageError(
      "INVALID_STORAGE_RECORD",
      "Staged save record is invalid."
    );
  }
}

function recordKey(slotId, kind) {
  return `${slotId}:${kind}`;
}
