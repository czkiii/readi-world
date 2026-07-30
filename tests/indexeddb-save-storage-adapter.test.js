import assert from "node:assert/strict";
import test from "node:test";

import {
  createIndexedDbSaveStorageAdapter,
  SaveStorageError
} from "../src/platform/web/indexeddb-save-storage-adapter.js";

test("requires IndexedDB for authoritative web saves", () => {
  assert.throws(
    () =>
      createIndexedDbSaveStorageAdapter({
        indexedDBImplementation: null,
        lockManager: { request() {} }
      }),
    (error) =>
      error instanceof SaveStorageError &&
      error.code === "INDEXED_DB_UNAVAILABLE"
  );
});

test("refuses unsafe web saves when a cross-tab lock is unavailable", () => {
  assert.throws(
    () =>
      createIndexedDbSaveStorageAdapter({
        indexedDBImplementation: { open() {} },
        lockManager: null
      }),
    (error) =>
      error instanceof SaveStorageError &&
      error.code === "STORAGE_LOCK_UNAVAILABLE"
  );
});

test("delegates slot ownership to an exclusive named Web Lock", async () => {
  const requests = [];
  const adapter = createIndexedDbSaveStorageAdapter({
    indexedDBImplementation: { open() {} },
    lockManager: {
      request(name, options, operation) {
        requests.push({ name, options });
        return operation();
      }
    }
  });

  const value = await adapter.withExclusiveLock("local-world", async () => 42);

  assert.equal(value, 42);
  assert.deepEqual(requests, [
    {
      name: "readi-world.save.local-world",
      options: { mode: "exclusive" }
    }
  ]);
});

test("cleans only separately injected discardable cache data", async () => {
  let cleanupCalls = 0;
  const adapter = createIndexedDbSaveStorageAdapter({
    indexedDBImplementation: { open() {} },
    lockManager: { request() {} },
    discardableCacheCleaner: async () => {
      cleanupCalls += 1;
      return true;
    }
  });

  assert.equal(await adapter.clearDiscardableCache(), true);
  assert.equal(cleanupCalls, 1);
});
