import assert from "node:assert/strict";
import test from "node:test";

import {
  createInitialWorldState,
  validateWorldState,
  WorldStateContractError
} from "../src/core/world-state/world-state-contract.js";
import {
  createWorldStateStore,
  WorldStateCommandError
} from "../src/core/world-state/world-state-store.js";

function createTestStore() {
  return createWorldStateStore({
    initialState: createInitialWorldState({ worldId: "main-village" }),
    commandHandlers: {
      "test.set-system-value"(draft, payload, { emit }) {
        draft.systems[payload.systemId] = payload.value;
        emit("test.system-value-set", payload);
      },
      "test.fail-after-write"(draft) {
        draft.systems.partialWrite = true;
        throw new Error("deliberate failure");
      },
      "test.break-contract"(draft) {
        draft.schemaVersion = 999;
      }
    }
  });
}

test("creates a frozen, versioned initial World State", () => {
  const state = createInitialWorldState({ worldId: "main-village" });

  assert.equal(state.schemaVersion, 1);
  assert.equal(state.revision, 0);
  assert.equal(state.world.id, "main-village");
  assert.equal(Object.isFrozen(state), true);
  assert.equal(Object.isFrozen(state.metadata.appliedCommandIds), true);
  assert.equal(validateWorldState(state), state);
});

test("rejects unstable ids before creating state", () => {
  assert.throws(
    () => createInitialWorldState({ worldId: "Main Village" }),
    (error) =>
      error instanceof WorldStateContractError &&
      error.code === "INVALID_STABLE_ID"
  );
});

test("requires stable, matching ids for persistent entity instances", () => {
  const state = structuredClone(
    createInitialWorldState({ worldId: "main-village" })
  );
  state.entities["forester-hut-001"] = {
    id: "different-id",
    definitionId: "building.forester-hut"
  };

  assert.throws(
    () => validateWorldState(state),
    (error) =>
      error instanceof WorldStateContractError &&
      error.code === "ENTITY_ID_MISMATCH"
  );
});

test("commits one validated transaction and deterministic event", () => {
  const store = createTestStore();
  const command = {
    id: "command-0001",
    type: "test.set-system-value",
    expectedRevision: 0,
    payload: {
      systemId: "verticalSlice",
      value: { phase: "foundation" }
    }
  };

  const transaction = store.dispatch(command);

  assert.equal(transaction.status, "committed");
  assert.equal(transaction.fromRevision, 0);
  assert.equal(transaction.toRevision, 1);
  assert.deepEqual(transaction.state.systems.verticalSlice, {
    phase: "foundation"
  });
  assert.deepEqual(transaction.events, [
    {
      id: "command-0001.event.1",
      type: "test.system-value-set",
      revision: 1,
      payload: command.payload
    }
  ]);
  assert.equal(Object.isFrozen(transaction.state), true);
  assert.equal(Object.isFrozen(transaction.events[0]), true);
});

test("replaying a command is idempotent and does not advance revision", () => {
  const store = createTestStore();
  const command = {
    id: "command-0002",
    type: "test.set-system-value",
    expectedRevision: 0,
    payload: {
      systemId: "proof",
      value: { ready: true }
    }
  };

  store.dispatch(command);
  const replay = store.dispatch(command);

  assert.equal(replay.status, "duplicate");
  assert.equal(replay.fromRevision, 1);
  assert.equal(replay.toRevision, 1);
  assert.deepEqual(replay.events, []);
  assert.deepEqual(replay.state.metadata.appliedCommandIds, ["command-0002"]);
});

test("rejects stale commands without changing state", () => {
  const store = createTestStore();
  const before = store.getState();

  assert.throws(
    () =>
      store.dispatch({
        id: "command-0003",
        type: "test.set-system-value",
        expectedRevision: 4,
        payload: { systemId: "proof", value: { ready: true } }
      }),
    (error) =>
      error instanceof WorldStateCommandError &&
      error.code === "REVISION_CONFLICT"
  );

  assert.equal(store.getState(), before);
});

test("rolls back every draft write when a handler fails", () => {
  const store = createTestStore();
  const before = store.getState();

  assert.throws(
    () =>
      store.dispatch({
        id: "command-0004",
        type: "test.fail-after-write",
        expectedRevision: 0,
        payload: {}
      }),
    (error) =>
      error instanceof WorldStateCommandError &&
      error.code === "COMMAND_REJECTED"
  );

  assert.equal(store.getState(), before);
  assert.equal(store.getState().systems.partialWrite, undefined);
  assert.equal(store.getState().revision, 0);
});

test("does not commit a draft that violates the World State contract", () => {
  const store = createTestStore();
  const before = store.getState();

  assert.throws(
    () =>
      store.dispatch({
        id: "command-0005",
        type: "test.break-contract",
        expectedRevision: 0,
        payload: {}
      }),
    (error) =>
      error instanceof WorldStateCommandError &&
      error.code === "COMMAND_REJECTED"
  );

  assert.equal(store.getState(), before);
});
