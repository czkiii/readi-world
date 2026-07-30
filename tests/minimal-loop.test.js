import assert from "node:assert/strict";
import test from "node:test";

import {
  createWorldStateStore,
  WorldStateCommandError
} from "../src/core/world-state/world-state-store.js";
import {
  createInitialMinimalLoopState,
  createMinimalLoopCommand,
  getMinimalLoopView,
  MINIMAL_LOOP_COMMAND_HANDLERS
} from "../src/gameplay/minimal-loop/minimal-loop-state.js";

function createStore() {
  return createWorldStateStore({
    initialState: createInitialMinimalLoopState(),
    commandHandlers: MINIMAL_LOOP_COMMAND_HANDLERS
  });
}

function dispatch(store, type, payload) {
  return store.dispatch(
    createMinimalLoopCommand(store.getState(), type, payload)
  );
}

test("creates a sparse minimal loop with stable persistent ids", () => {
  const view = getMinimalLoopView(createInitialMinimalLoopState());
  assert.equal(view.inventory.wood, 0);
  assert.equal(view.woodRequired, 3);
  assert.equal(view.completed, false);
  assert.equal(view.hut.id, "building.forester-hut");
  assert.equal(view.woodNodes.length, 4);
});

test("commits a validated player position checkpoint", () => {
  const store = createStore();
  dispatch(store, "movement.commit-position", { x: 270, y: 1120 });
  assert.deepEqual(
    getMinimalLoopView(store.getState()).player.components.position,
    { x: 270, y: 1120 }
  );
});

test("rejects an out-of-bounds checkpoint atomically", () => {
  const store = createStore();
  const before = store.getState();
  assert.throws(
    () => dispatch(store, "movement.commit-position", { x: -1, y: 20 }),
    (error) =>
      error instanceof WorldStateCommandError &&
      error.code === "COMMAND_REJECTED"
  );
  assert.equal(store.getState(), before);
});

test("collects a nearby resource exactly once", () => {
  const store = createStore();
  dispatch(store, "movement.commit-position", { x: 270, y: 1120 });
  dispatch(store, "gather.collect-wood", { targetId: "resource.wood-01" });
  assert.equal(getMinimalLoopView(store.getState()).inventory.wood, 1);
  assert.throws(() =>
    dispatch(store, "gather.collect-wood", {
      targetId: "resource.wood-01"
    })
  );
  assert.equal(getMinimalLoopView(store.getState()).inventory.wood, 1);
});

test("rejects gathering outside the proximity radius", () => {
  const store = createStore();
  assert.throws(
    () =>
      dispatch(store, "gather.collect-wood", {
        targetId: "resource.wood-01"
      }),
    (error) =>
      error instanceof WorldStateCommandError &&
      error.code === "COMMAND_REJECTED"
  );
});

test("restores the Forester Hut after three valid collections", () => {
  const store = createStore();

  for (const [targetId, position] of [
    ["resource.wood-01", { x: 270, y: 1120 }],
    ["resource.wood-02", { x: 740, y: 1080 }],
    ["resource.wood-03", { x: 300, y: 820 }]
  ]) {
    dispatch(store, "movement.commit-position", position);
    dispatch(store, "gather.collect-wood", { targetId });
  }

  dispatch(store, "movement.commit-position", { x: 500, y: 430 });
  dispatch(store, "restoration.restore-forester-hut", {
    targetId: "building.forester-hut"
  });
  const view = getMinimalLoopView(store.getState());
  assert.equal(view.completed, true);
  assert.equal(view.inventory.wood, 0);
  assert.equal(view.hut.components.restorationPhase, "restored");
});

test("cannot restore before the material requirement is met", () => {
  const store = createStore();
  dispatch(store, "movement.commit-position", { x: 500, y: 430 });
  assert.throws(() =>
    dispatch(store, "restoration.restore-forester-hut", {
      targetId: "building.forester-hut"
    })
  );
  assert.equal(getMinimalLoopView(store.getState()).completed, false);
});
