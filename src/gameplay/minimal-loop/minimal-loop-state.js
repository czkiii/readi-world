import {
  createInitialWorldState,
  deepFreeze,
  validateWorldState
} from "../../core/world-state/world-state-contract.js";
import {
  REPAIR_TIMBER_RECIPE,
  validateMinimalCraftingRecipe
} from "./minimal-crafting-contract.js";

export const MINIMAL_LOOP_WORLD = Object.freeze({
  width: 1000,
  height: 1600,
  gatherRadius: 92,
  craftingRadius: 112,
  restorationRadius: 122,
  woodRequired: 3
});

const PLAYER_ID = "player.main";
const HUT_ID = "building.forester-hut";
const WORKBENCH_ID = "workstation.field-bench";
const WOOD_NODE_IDS = Object.freeze([
  "resource.wood-01",
  "resource.wood-02",
  "resource.wood-03",
  "resource.wood-04"
]);
const RESOURCE_LAYOUT_VERSION = 2;
const WOOD_NODE_POSITIONS = Object.freeze([
  Object.freeze([390, 1120]),
  Object.freeze([610, 1080]),
  Object.freeze([380, 850]),
  Object.freeze([620, 800])
]);

export function createInitialMinimalLoopState() {
  const state = structuredClone(
    createInitialWorldState({ worldId: "main-village" })
  );

  state.entities[PLAYER_ID] = createEntity(
    PLAYER_ID,
    "player.avatar",
    500,
    1160,
    { safeAnchorId: "anchor.village-entry" }
  );
  state.entities[HUT_ID] = createEntity(
    HUT_ID,
    "building.forester-hut",
    500,
    350,
    { restorationPhase: "ruined" }
  );
  state.entities[WORKBENCH_ID] = createEntity(
    WORKBENCH_ID,
    "workstation.field-bench",
    500,
    700,
    {
      capabilities: [
        REPAIR_TIMBER_RECIPE.requirements.workstationCapability
      ]
    }
  );

  WOOD_NODE_IDS.forEach((id, index) => {
    const [x, y] = WOOD_NODE_POSITIONS[index];
    state.entities[id] = createEntity(id, "resource.fallen-branch", x, y, {
      available: true
    });
  });

  state.systems.minimalLoop = {
    inventory: { wood: 0, repairTimber: 0 },
    woodRequired: MINIMAL_LOOP_WORLD.woodRequired,
    resourceLayoutVersion: RESOURCE_LAYOUT_VERSION,
    unlockedRecipeIds: [REPAIR_TIMBER_RECIPE.id],
    completed: false
  };

  validateWorldState(state);
  return deepFreeze(state);
}

export const MINIMAL_LOOP_COMMAND_HANDLERS = Object.freeze({
  "migration.resource-discoverability-v2"(draft, payload, { emit }) {
    const loop = requireLoopState(draft);

    if (loop.resourceLayoutVersion >= RESOURCE_LAYOUT_VERSION) {
      throw loopError("RESOURCE_LAYOUT_ALREADY_CURRENT");
    }

    WOOD_NODE_IDS.forEach((id, index) => {
      const node = requireEntity(draft, id, "resource.fallen-branch");
      if (!node.components.available) return;
      const [x, y] = WOOD_NODE_POSITIONS[index];
      node.components.position = { x, y };
    });
    loop.resourceLayoutVersion = RESOURCE_LAYOUT_VERSION;
    emit("migration.resource-layout-updated", {
      migrationId: payload.migrationId,
      resourceLayoutVersion: RESOURCE_LAYOUT_VERSION
    });
  },

  "migration.add-minimal-crafting"(draft, payload, { emit }) {
    const loop = requireLoopState(draft);

    if (hasMinimalCraftingState(draft)) {
      throw loopError("MINIMAL_CRAFTING_ALREADY_PRESENT");
    }

    loop.inventory.repairTimber = 0;
    loop.unlockedRecipeIds = [REPAIR_TIMBER_RECIPE.id];
    draft.entities[WORKBENCH_ID] = createEntity(
      WORKBENCH_ID,
      "workstation.field-bench",
      500,
      700,
      {
        capabilities: [
          REPAIR_TIMBER_RECIPE.requirements.workstationCapability
        ]
      }
    );
    emit("migration.minimal-crafting-added", {
      migrationId: payload.migrationId
    });
  },

  "movement.commit-position"(draft, payload, { emit }) {
    const player = requireEntity(draft, PLAYER_ID, "player.avatar");
    const position = validatePosition(payload);
    player.components.position = position;
    player.components.safeAnchorId = "anchor.main-village";
    emit("movement.position-committed", { actorId: PLAYER_ID, position });
  },

  "gather.collect-wood"(draft, payload, { emit }) {
    const player = requireEntity(draft, PLAYER_ID, "player.avatar");
    const node = requireEntity(
      draft,
      payload.targetId,
      "resource.fallen-branch"
    );
    const loop = requireLoopState(draft);

    if (!node.components.available) {
      throw loopError("RESOURCE_ALREADY_COLLECTED");
    }

    if (
      distance(player.components.position, node.components.position) >
      MINIMAL_LOOP_WORLD.gatherRadius
    ) {
      throw loopError("GATHER_TARGET_OUT_OF_RANGE");
    }

    node.components.available = false;
    loop.inventory.wood += 1;
    emit("gather.wood-collected", {
      actorId: PLAYER_ID,
      targetId: node.id,
      wood: loop.inventory.wood
    });
  },

  "crafting.craft-repair-timber"(draft, payload, { emit }) {
    const player = requireEntity(draft, PLAYER_ID, "player.avatar");
    const workstation = requireEntity(
      draft,
      payload.targetId,
      "workstation.field-bench"
    );
    const loop = requireLoopState(draft);
    const recipe = validateMinimalCraftingRecipe(REPAIR_TIMBER_RECIPE);

    if (
      payload.recipeId !== recipe.id ||
      payload.recipeVersion !== recipe.contentVersion
    ) {
      throw loopError("CRAFTING_RECIPE_VERSION_MISMATCH");
    }

    if (!loop.unlockedRecipeIds.includes(recipe.id)) {
      throw loopError("CRAFTING_RECIPE_LOCKED");
    }

    if (
      !workstation.components.capabilities.includes(
        recipe.requirements.workstationCapability
      )
    ) {
      throw loopError("CRAFTING_WORKSTATION_CAPABILITY_MISSING");
    }

    if (
      distance(
        player.components.position,
        workstation.components.position
      ) > MINIMAL_LOOP_WORLD.craftingRadius
    ) {
      throw loopError("CRAFTING_WORKSTATION_OUT_OF_RANGE");
    }

    const woodInput = recipe.inputs[0].quantity;
    const timberOutput = recipe.outputs[0].quantity;

    if (loop.inventory.wood < woodInput) {
      throw loopError("CRAFTING_INPUT_MISSING");
    }

    if (loop.inventory.repairTimber + timberOutput > 1) {
      throw loopError("CRAFTING_OUTPUT_FULL");
    }

    loop.inventory.wood -= woodInput;
    loop.inventory.repairTimber += timberOutput;
    emit("crafting.repair-timber-completed", {
      actorId: PLAYER_ID,
      targetId: workstation.id,
      recipeId: recipe.id,
      recipeVersion: recipe.contentVersion,
      outputQuantity: timberOutput
    });
  },

  "restoration.restore-forester-hut"(draft, payload, { emit }) {
    const player = requireEntity(draft, PLAYER_ID, "player.avatar");
    const hut = requireEntity(
      draft,
      payload.targetId,
      "building.forester-hut"
    );
    const loop = requireLoopState(draft);

    if (hut.components.restorationPhase !== "ruined" || loop.completed) {
      throw loopError("FORESTER_HUT_ALREADY_RESTORED");
    }

    if (
      distance(player.components.position, hut.components.position) >
      MINIMAL_LOOP_WORLD.restorationRadius
    ) {
      throw loopError("RESTORATION_TARGET_OUT_OF_RANGE");
    }

    if (loop.inventory.repairTimber < 1) {
      throw loopError("RESTORATION_MATERIALS_MISSING");
    }

    loop.inventory.repairTimber -= 1;
    loop.completed = true;
    hut.components.restorationPhase = "restored";
    emit("restoration.forester-hut-restored", {
      actorId: PLAYER_ID,
      targetId: hut.id
    });
  }
});

export function getMinimalLoopView(state) {
  validateWorldState(state);
  const loop = requireLoopState(state);

  return deepFreeze({
    player: structuredClone(state.entities[PLAYER_ID]),
    hut: structuredClone(state.entities[HUT_ID]),
    workbench: structuredClone(state.entities[WORKBENCH_ID]),
    woodNodes: WOOD_NODE_IDS.map((id) =>
      structuredClone(state.entities[id])
    ),
    inventory: structuredClone(loop.inventory),
    woodRequired: loop.woodRequired,
    recipe: structuredClone(REPAIR_TIMBER_RECIPE),
    completed: loop.completed
  });
}

export function requiresMinimalCraftingMigration(state) {
  validateWorldState(state);
  return !hasMinimalCraftingState(state);
}

export function requiresResourceLayoutMigration(state) {
  validateWorldState(state);
  return (
    state.systems.minimalLoop?.resourceLayoutVersion !==
    RESOURCE_LAYOUT_VERSION
  );
}

export function createMinimalLoopCommand(state, type, payload = {}) {
  return {
    id: `loop.command.${state.revision + 1}.${type.split(".").at(-1)}`,
    type,
    expectedRevision: state.revision,
    payload
  };
}

function createEntity(id, definitionId, x, y, components) {
  return {
    id,
    definitionId,
    components: {
      position: { x, y },
      ...components
    }
  };
}

function validatePosition(payload) {
  if (
    payload === null ||
    typeof payload !== "object" ||
    !Number.isFinite(payload.x) ||
    !Number.isFinite(payload.y) ||
    payload.x < 0 ||
    payload.y < 0 ||
    payload.x > MINIMAL_LOOP_WORLD.width ||
    payload.y > MINIMAL_LOOP_WORLD.height
  ) {
    throw loopError("INVALID_PLAYER_POSITION");
  }

  return {
    x: Math.round(payload.x * 1000) / 1000,
    y: Math.round(payload.y * 1000) / 1000
  };
}

function requireEntity(state, id, definitionId) {
  const entity = state.entities[id];

  if (!entity || entity.definitionId !== definitionId) {
    throw loopError("INVALID_INTERACTION_TARGET");
  }

  return entity;
}

function requireLoopState(state) {
  const loop = state.systems.minimalLoop;

  if (!loop || typeof loop !== "object") {
    throw loopError("MINIMAL_LOOP_STATE_MISSING");
  }

  return loop;
}

function hasMinimalCraftingState(state) {
  const loop = state.systems.minimalLoop;
  const workstation = state.entities[WORKBENCH_ID];

  return Boolean(
    loop &&
    Number.isInteger(loop.inventory?.repairTimber) &&
    Array.isArray(loop.unlockedRecipeIds) &&
    loop.unlockedRecipeIds.includes(REPAIR_TIMBER_RECIPE.id) &&
    workstation?.definitionId === "workstation.field-bench"
  );
}

function distance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

function loopError(code) {
  return Object.assign(new Error(code), { code });
}
