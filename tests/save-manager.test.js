import assert from "node:assert/strict";
import test from "node:test";

import {
  createSha256IntegrityProvider,
  parseAndValidateSaveEnvelope
} from "../src/core/save/save-envelope.js";
import {
  createSaveManager,
  SaveManagerError
} from "../src/core/save/save-manager.js";
import { createInitialWorldState } from "../src/core/world-state/world-state-contract.js";
import { createWorldStateStore } from "../src/core/world-state/world-state-store.js";
import { createInMemorySaveStorageAdapter } from "./support/in-memory-save-storage-adapter.js";

const SLOT_ID = "local-world";
const FIXED_TIME = "2026-07-30T20:00:00.000Z";

function createHarness() {
  const storageAdapter = createInMemorySaveStorageAdapter();
  const integrityProvider = createSha256IntegrityProvider();
  const saveManager = createSaveManager({
    storageAdapter,
    integrityProvider,
    now: () => new Date(FIXED_TIME)
  });

  return { storageAdapter, integrityProvider, saveManager };
}

function createChangedState(commandId = "command-0100", tick = 12) {
  const store = createWorldStateStore({
    initialState: createInitialWorldState({ worldId: "main-village" }),
    commandHandlers: {
      "test.advance"(draft, payload) {
        draft.clock.tick = payload.tick;
      }
    }
  });

  store.dispatch({
    id: commandId,
    type: "test.advance",
    expectedRevision: 0,
    payload: { tick }
  });

  return store.getState();
}

test("writes and loads one validated, versioned save generation", async () => {
  const { saveManager } = createHarness();
  const worldState = createChangedState();

  const saved = await saveManager.save({
    slotId: SLOT_ID,
    worldState,
    reason: "critical.transaction"
  });
  const loaded = await saveManager.load({ slotId: SLOT_ID });

  assert.equal(saved.status, "saved");
  assert.equal(saved.generation, 1);
  assert.equal(saved.envelope.saveSchemaVersion, 1);
  assert.equal(saved.envelope.reason, "critical.transaction");
  assert.equal(saved.envelope.transactionWatermark, "command-0100");
  assert.equal(saved.envelope.createdAt, FIXED_TIME);
  assert.equal(loaded.status, "loaded");
  assert.equal(loaded.source, "active");
  assert.deepEqual(loaded.worldState, worldState);
});

test("does not write a new generation when World State is unchanged", async () => {
  const { saveManager, storageAdapter } = createHarness();
  const worldState = createChangedState();

  await saveManager.save({
    slotId: SLOT_ID,
    worldState,
    reason: "lifecycle.background"
  });
  const repeated = await saveManager.save({
    slotId: SLOT_ID,
    worldState,
    reason: "lifecycle.background"
  });

  assert.equal(repeated.status, "unchanged");
  assert.equal(repeated.generation, 1);
  assert.equal(storageAdapter.inspect(SLOT_ID).backup, null);
});

test("rotates the previous verified active save to one backup", async () => {
  const { saveManager, storageAdapter } = createHarness();
  const initial = createInitialWorldState({ worldId: "main-village" });
  const changed = createChangedState("command-0101");

  await saveManager.save({
    slotId: SLOT_ID,
    worldState: initial,
    reason: "autosave.checkpoint"
  });
  await saveManager.save({
    slotId: SLOT_ID,
    worldState: changed,
    reason: "critical.transaction"
  });

  const records = storageAdapter.inspect(SLOT_ID);
  assert.equal(records.active.generation, 2);
  assert.equal(records.backup.generation, 1);
  assert.equal(records.staging, null);
});

test("loads the verified backup when the active save is corrupted", async () => {
  const { saveManager, storageAdapter } = createHarness();
  const initial = createInitialWorldState({ worldId: "main-village" });
  const changed = createChangedState("command-0102");

  await saveManager.save({
    slotId: SLOT_ID,
    worldState: initial,
    reason: "autosave.checkpoint"
  });
  await saveManager.save({
    slotId: SLOT_ID,
    worldState: changed,
    reason: "critical.transaction"
  });
  storageAdapter.corrupt(SLOT_ID, "active", (record) => ({
    ...record,
    serialized: record.serialized.replace("main-village", "tampered-world")
  }));

  const recovered = await saveManager.load({ slotId: SLOT_ID });

  assert.equal(recovered.status, "recovered");
  assert.equal(recovered.source, "backup");
  assert.equal(recovered.generation, 1);
  assert.deepEqual(recovered.worldState, initial);
  assert.equal(recovered.recovery.status, "invalid");
  assert.equal(recovered.recovery.code, "INTEGRITY_CHECK_FAILED");
});

test("reports recovery mode when neither active nor backup is valid", async () => {
  const { saveManager, storageAdapter } = createHarness();
  const initial = createInitialWorldState({ worldId: "main-village" });

  await saveManager.save({
    slotId: SLOT_ID,
    worldState: initial,
    reason: "autosave.checkpoint"
  });
  storageAdapter.corrupt(SLOT_ID, "active", (record) => ({
    ...record,
    serialized: "{broken"
  }));

  await assert.rejects(
    () => saveManager.load({ slotId: SLOT_ID }),
    (error) =>
      error instanceof SaveManagerError && error.code === "RECOVERY_REQUIRED"
  );
});

test("an interrupted staged write preserves active and backup", async () => {
  const { saveManager, storageAdapter } = createHarness();
  const initial = createInitialWorldState({ worldId: "main-village" });
  const changed = createChangedState("command-0103", 12);
  const nextChange = createChangedState("command-0104", 24);

  await saveManager.save({
    slotId: SLOT_ID,
    worldState: initial,
    reason: "autosave.checkpoint"
  });
  await saveManager.save({
    slotId: SLOT_ID,
    worldState: changed,
    reason: "critical.transaction"
  });
  const before = storageAdapter.inspect(SLOT_ID);
  storageAdapter.failNext("commitStaging");

  await assert.rejects(() =>
    saveManager.save({
      slotId: SLOT_ID,
      worldState: nextChange,
      reason: "critical.transaction"
    })
  );

  const after = storageAdapter.inspect(SLOT_ID);
  assert.deepEqual(after.active, before.active);
  assert.deepEqual(after.backup, before.backup);
  assert.equal(after.staging, null);
});

test("quota failure clears discardable cache and retries once", async () => {
  const { saveManager, storageAdapter } = createHarness();
  storageAdapter.failNext("writeStaging", "STORAGE_QUOTA_EXCEEDED");

  const result = await saveManager.save({
    slotId: SLOT_ID,
    worldState: createInitialWorldState({ worldId: "main-village" }),
    reason: "lifecycle.background"
  });

  assert.equal(result.status, "saved");
  assert.equal(storageAdapter.getCacheClearCount(), 1);
});

test("tampering is detected by the integrity marker", async () => {
  const { saveManager, storageAdapter, integrityProvider } = createHarness();

  await saveManager.save({
    slotId: SLOT_ID,
    worldState: createInitialWorldState({ worldId: "main-village" }),
    reason: "autosave.checkpoint"
  });

  const active = storageAdapter.inspect(SLOT_ID).active;
  const parsed = JSON.parse(active.serialized);
  parsed.reason = "tampered.reason";

  await assert.rejects(
    () =>
      parseAndValidateSaveEnvelope(JSON.stringify(parsed), {
        integrityProvider
      }),
    (error) => error.code === "INTEGRITY_CHECK_FAILED"
  );
});

test("serializes concurrent writers into distinct generations", async () => {
  const { saveManager } = createHarness();
  const initial = createInitialWorldState({ worldId: "main-village" });
  const changed = createChangedState("command-0105");

  const [first, second] = await Promise.all([
    saveManager.save({
      slotId: SLOT_ID,
      worldState: initial,
      reason: "autosave.checkpoint"
    }),
    saveManager.save({
      slotId: SLOT_ID,
      worldState: changed,
      reason: "critical.transaction"
    })
  ]);
  const loaded = await saveManager.load({ slotId: SLOT_ID });

  assert.equal(first.generation, 1);
  assert.equal(second.generation, 2);
  assert.equal(loaded.generation, 2);
  assert.deepEqual(loaded.worldState, changed);
});

test("returns an explicit empty result for a new save slot", async () => {
  const { saveManager } = createHarness();

  assert.deepEqual(await saveManager.load({ slotId: SLOT_ID }), {
    status: "empty",
    source: null,
    generation: 0,
    worldState: null,
    envelope: null,
    recovery: null
  });
});
