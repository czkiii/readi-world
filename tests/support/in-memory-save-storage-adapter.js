const RECORD_KINDS = Object.freeze(["active", "backup", "staging"]);

export function createInMemorySaveStorageAdapter() {
  const slots = new Map();
  const lockTails = new Map();
  const failures = new Map();
  let cacheClearCount = 0;

  const adapter = {
    recordKinds: RECORD_KINDS,

    async withExclusiveLock(slotId, operation) {
      const previous = lockTails.get(slotId) ?? Promise.resolve();
      let release;
      const current = new Promise((resolve) => {
        release = resolve;
      });
      const tail = previous.then(() => current);
      lockTails.set(slotId, tail);

      await previous;

      try {
        return await operation();
      } finally {
        release();

        if (lockTails.get(slotId) === tail) {
          lockTails.delete(slotId);
        }
      }
    },

    async read(slotId, kind) {
      triggerFailure(`read.${kind}`);
      return cloneRecord(getSlot(slotId)[kind]);
    },

    async writeStaging(slotId, record) {
      triggerFailure("writeStaging");
      getSlot(slotId).staging = cloneRecord(record);
    },

    async commitStaging(
      slotId,
      { expectedActiveGeneration, rotateActiveToBackup }
    ) {
      triggerFailure("commitStaging");
      const slot = getSlot(slotId);
      const actualGeneration = slot.active?.generation ?? null;

      if (actualGeneration !== expectedActiveGeneration) {
        throw storageError(
          "ACTIVE_GENERATION_CONFLICT",
          "Active generation changed."
        );
      }

      if (!slot.staging) {
        throw storageError("STAGING_RECORD_MISSING", "Staging is missing.");
      }

      const nextSlot = {
        active: cloneRecord(slot.staging),
        backup: rotateActiveToBackup
          ? cloneRecord(slot.active)
          : cloneRecord(slot.backup),
        staging: null
      };

      slots.set(slotId, nextSlot);
    },

    async discardStaging(slotId) {
      triggerFailure("discardStaging");
      getSlot(slotId).staging = null;
    },

    async clearDiscardableCache() {
      cacheClearCount += 1;
      triggerFailure("clearDiscardableCache");
      return true;
    },

    failNext(operation, code = "INJECTED_STORAGE_FAILURE") {
      const queue = failures.get(operation) ?? [];
      queue.push(code);
      failures.set(operation, queue);
    },

    corrupt(slotId, kind, transform) {
      const slot = getSlot(slotId);
      slot[kind] = transform(cloneRecord(slot[kind]));
    },

    inspect(slotId) {
      return structuredClone(getSlot(slotId));
    },

    getCacheClearCount() {
      return cacheClearCount;
    }
  };

  return Object.freeze(adapter);

  function getSlot(slotId) {
    if (!slots.has(slotId)) {
      slots.set(slotId, {
        active: null,
        backup: null,
        staging: null
      });
    }

    return slots.get(slotId);
  }

  function triggerFailure(operation) {
    const queue = failures.get(operation);

    if (!queue?.length) {
      return;
    }

    const code = queue.shift();
    throw storageError(code, `Injected failure at ${operation}.`);
  }
}

function cloneRecord(record) {
  return record === null ? null : structuredClone(record);
}

function storageError(code, message) {
  return Object.assign(new Error(message), { code });
}
