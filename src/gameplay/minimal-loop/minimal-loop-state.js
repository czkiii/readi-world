import {
  createInitialWorldState,
  deepFreeze,
  validateWorldState
} from "../../core/world-state/world-state-contract.js";

export const MINIMAL_LOOP_WORLD = Object.freeze({
  width: 1000,
  height: 1600,
  gatherRadius: 92,
  restorationRadius: 122,
  woodRequired: 3
});

const PLAYER_ID = "player.main";
const HUT_ID = "building.forester-hut";
const WOOD_NODE_IDS = Object.freeze([
  "resource.wood-01",
  "resource.wood-02",
  "resource.wood-03",
  "resource.wood-04"
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

  const nodePositions = [
    [270, 1120],
    [740, 1080],
    [300, 820],
    [720, 780]
  ];

  WOOD_NODE_IDS.forEach((id, index) => {
    const [x, y] = nodePositions[index];
    state.entities[id] = createEntity(id, "resource.fallen-branch", x, y, {
      available: true
    });
  });

  state.systems.minimalLoop = {
    inventory: { wood: 0 },
    woodRequired: MINIMAL_LOOP_WORLD.woodRequired,
    completed: false
  };

  validateWorldState(state);
  return deepFreeze(state);
}

export const MINIMAL_LOOP_COMMAND_HANDLERS = Object.freeze({
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

    if (loop.inventory.wood < loop.woodRequired) {
      throw loopError("RESTORATION_MATERIALS_MISSING");
    }

    loop.inventory.wood -= loop.woodRequired;
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
    woodNodes: WOOD_NODE_IDS.map((id) =>
      structuredClone(state.entities[id])
    ),
    inventory: structuredClone(loop.inventory),
    woodRequired: loop.woodRequired,
    completed: loop.completed
  });
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

function distance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

function loopError(code) {
  return Object.assign(new Error(code), { code });
}
