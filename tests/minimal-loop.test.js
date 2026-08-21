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
  MINIMAL_LOOP_COMMAND_HANDLERS,
  requiresMinimalCraftingMigration,
  requiresResourceLayoutMigration,
  requiresRestorationMilestoneMigration
} from "../src/gameplay/minimal-loop/minimal-loop-state.js";
import {
  REPAIR_TIMBER_RECIPE,
  validateMinimalCraftingRecipe
} from "../src/gameplay/minimal-loop/minimal-crafting-contract.js";

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
  assert.equal(view.inventory.repairTimber, 0);
  assert.equal(view.woodRequired, 3);
  assert.equal(view.completed, false);
  assert.equal(view.hut.id, "building.forester-hut");
  assert.equal(view.workbench.id, "workstation.field-bench");
  assert.equal(view.woodNodes.length, 4);
  assert.equal(view.progression.villageLevel, 0);
  assert.deepEqual(view.progression.unlockedAreaIds, []);
  assert.deepEqual(
    view.woodNodes.slice(0, 2).map((node) => node.components.position),
    [{ x: 650, y: 2220 }, { x: 930, y: 2130 }]
  );
});

test("declares one stable and versioned minimal crafting recipe", () => {
  const recipe = validateMinimalCraftingRecipe(REPAIR_TIMBER_RECIPE);
  assert.equal(recipe.id, "recipe.forester-repair-timber");
  assert.equal(recipe.contentVersion, 1);
  assert.deepEqual(recipe.inputs, [{ itemId: "item.wood", quantity: 3 }]);
  assert.deepEqual(recipe.outputs, [
    { itemId: "item.repair-timber", quantity: 1 }
  ]);
  assert.equal(
    recipe.requirements.workstationCapability,
    "crafting.basic-woodworking"
  );
});

test("commits a validated player position checkpoint", () => {
  const store = createStore();
  dispatch(store, "movement.commit-position", { x: 432, y: 1960 });
  assert.deepEqual(
    getMinimalLoopView(store.getState()).player.components.position,
    { x: 432, y: 1960 }
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
  dispatch(store, "movement.commit-position", { x: 650, y: 2220 });
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

test("crafts one repair timber atomically after three valid collections", () => {
  const store = createStore();
  collectThreeWood(store);
  dispatch(store, "movement.commit-position", { x: 810, y: 1660 });
  dispatch(store, "crafting.craft-repair-timber", {
    targetId: "workstation.field-bench",
    recipeId: REPAIR_TIMBER_RECIPE.id,
    recipeVersion: REPAIR_TIMBER_RECIPE.contentVersion
  });
  const view = getMinimalLoopView(store.getState());
  assert.equal(view.inventory.wood, 0);
  assert.equal(view.inventory.repairTimber, 1);
});

test("cannot craft before all recipe inputs are available", () => {
  const store = createStore();
  dispatch(store, "movement.commit-position", { x: 810, y: 1660 });
  assert.throws(() =>
    dispatch(store, "crafting.craft-repair-timber", {
      targetId: "workstation.field-bench",
      recipeId: REPAIR_TIMBER_RECIPE.id,
      recipeVersion: REPAIR_TIMBER_RECIPE.contentVersion
    })
  );
  assert.equal(getMinimalLoopView(store.getState()).inventory.repairTimber, 0);
});

test("restores the Forester Hut only after crafting repair timber", () => {
  const store = createStore();
  collectThreeWood(store);
  dispatch(store, "movement.commit-position", { x: 810, y: 1660 });
  dispatch(store, "crafting.craft-repair-timber", {
    targetId: "workstation.field-bench",
    recipeId: REPAIR_TIMBER_RECIPE.id,
    recipeVersion: REPAIR_TIMBER_RECIPE.contentVersion
  });

  dispatch(store, "movement.commit-position", { x: 760, y: 630 });
  dispatch(store, "restoration.restore-forester-hut", {
    targetId: "building.forester-hut"
  });
  const view = getMinimalLoopView(store.getState());
  assert.equal(view.completed, true);
  assert.equal(view.inventory.wood, 0);
  assert.equal(view.inventory.repairTimber, 0);
  assert.equal(view.hut.components.restorationPhase, "restored");
  assert.equal(view.progression.villageLevel, 1);
  assert.deepEqual(view.progression.unlockedAreaIds, [
    "area.farm-path-preview"
  ]);
});

test("raw wood cannot bypass the crafting requirement", () => {
  const store = createStore();
  collectThreeWood(store);
  dispatch(store, "movement.commit-position", { x: 760, y: 630 });
  assert.throws(() =>
    dispatch(store, "restoration.restore-forester-hut", {
      targetId: "building.forester-hut"
    })
  );
  assert.equal(getMinimalLoopView(store.getState()).completed, false);
});

test("migrates a P0-04 save without resetting its progress", () => {
  const legacyState = structuredClone(createInitialMinimalLoopState());
  delete legacyState.entities["workstation.field-bench"];
  delete legacyState.systems.minimalLoop.inventory.repairTimber;
  delete legacyState.systems.minimalLoop.unlockedRecipeIds;
  legacyState.systems.minimalLoop.inventory.wood = 2;
  const store = createWorldStateStore({
    initialState: legacyState,
    commandHandlers: MINIMAL_LOOP_COMMAND_HANDLERS
  });

  assert.equal(requiresMinimalCraftingMigration(store.getState()), true);
  dispatch(store, "migration.add-minimal-crafting", {
    migrationId: "migration.p0-05-minimal-crafting.v1"
  });
  const view = getMinimalLoopView(store.getState());
  assert.equal(requiresMinimalCraftingMigration(store.getState()), false);
  assert.equal(view.inventory.wood, 2);
  assert.equal(view.inventory.repairTimber, 0);
  assert.equal(view.workbench.id, "workstation.field-bench");
});

test("migrates the legacy map into the expanded I3.1A world", () => {
  const legacyState = structuredClone(createInitialMinimalLoopState());
  delete legacyState.systems.minimalLoop.resourceLayoutVersion;
  legacyState.entities["resource.wood-01"].components.available = false;
  legacyState.entities["resource.wood-01"].components.position = {
    x: 270,
    y: 1120
  };
  legacyState.entities["resource.wood-02"].components.position = {
    x: 740,
    y: 1080
  };
  legacyState.entities["player.main"].components.position = { x: 500, y: 800 };
  legacyState.systems.minimalLoop.inventory.wood = 1;
  const store = createWorldStateStore({
    initialState: legacyState,
    commandHandlers: MINIMAL_LOOP_COMMAND_HANDLERS
  });

  assert.equal(requiresResourceLayoutMigration(store.getState()), true);
  dispatch(store, "migration.resource-discoverability-v2", {
    migrationId: "migration.resource-discoverability.v2"
  });
  const view = getMinimalLoopView(store.getState());
  assert.equal(requiresResourceLayoutMigration(store.getState()), false);
  assert.equal(view.inventory.wood, 1);
  assert.deepEqual(view.woodNodes[0].components.position, {
    x: 270,
    y: 1120
  });
  assert.deepEqual(view.woodNodes[1].components.position, {
    x: 930,
    y: 2130
  });
  assert.deepEqual(view.player.components.position, { x: 800, y: 1400 });
  assert.deepEqual(view.workbench.components.position, { x: 810, y: 1660 });
  assert.deepEqual(view.hut.components.position, { x: 760, y: 520 });
});

test("recovers the restoration reward for an older completed save", () => {
  const legacyState = structuredClone(createInitialMinimalLoopState());
  delete legacyState.systems.minimalLoop.progression;
  legacyState.systems.minimalLoop.completed = true;
  legacyState.entities["building.forester-hut"].components.restorationPhase =
    "restored";
  const store = createWorldStateStore({
    initialState: legacyState,
    commandHandlers: MINIMAL_LOOP_COMMAND_HANDLERS
  });

  assert.equal(requiresRestorationMilestoneMigration(store.getState()), true);
  dispatch(store, "migration.add-restoration-milestone-v1", {
    migrationId: "migration.restoration-milestone.v1"
  });
  const view = getMinimalLoopView(store.getState());
  assert.equal(requiresRestorationMilestoneMigration(store.getState()), false);
  assert.equal(view.completed, true);
  assert.equal(view.progression.villageLevel, 1);
  assert.deepEqual(view.progression.unlockedAreaIds, [
    "area.farm-path-preview"
  ]);
});

function collectThreeWood(store) {
  for (const [targetId, position] of [
    ["resource.wood-01", { x: 650, y: 2220 }],
    ["resource.wood-02", { x: 930, y: 2130 }],
    ["resource.wood-03", { x: 610, y: 1900 }]
  ]) {
    dispatch(store, "movement.commit-position", position);
    dispatch(store, "gather.collect-wood", { targetId });
  }
}
