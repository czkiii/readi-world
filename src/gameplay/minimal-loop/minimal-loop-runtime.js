import { createAssetRegistry } from "../../core/assets/asset-registry.js";
import {
  drawLoadedAsset,
  loadAssetImageSet
} from "../../core/assets/asset-image-loader.js";
import { createSaveManager } from "../../core/save/save-manager.js";
import { createWorldStateStore } from "../../core/world-state/world-state-store.js";
import { createVirtualJoystick } from "../../input/virtual-joystick.js?v=i2-floating-joystick";
import { createIndexedDbSaveStorageAdapter } from "../../platform/web/indexeddb-save-storage-adapter.js";
import { loadVerticalSliceLayout } from "../vertical-slice/vertical-slice-layout.js";
import {
  createInitialMinimalLoopState,
  createMinimalLoopCommand,
  getMinimalLoopView,
  MINIMAL_LOOP_COMMAND_HANDLERS,
  MINIMAL_LOOP_WORLD,
  requiresMinimalCraftingMigration,
  requiresResourceLayoutMigration,
  requiresRestorationMilestoneMigration
} from "./minimal-loop-state.js";

const SAVE_SLOT_ID = "local-world";
const MOVE_SPEED = 172;
const GATHER_DURATION = 0.85;
const RESTORE_DURATION = 1.6;
const WORLD_PIXELS_PER_UNIT = 32;
const NORMAL_CAMERA_CSS_PIXELS_PER_WU = 20;
const PLAYER_SCREEN_ANCHOR_Y = 0.6;
const CHARACTER_DRAW_SIZE_WU = Object.freeze({ width: 1.5, height: 2.35 });
const WORKBENCH_DRAW_SIZE_WU = Object.freeze({ width: 3, height: 2.3 });
const HUT_DRAW_SIZE_WU = Object.freeze({ width: 10.5, height: 12 });
const PINE_ASSET_REQUESTS = Object.freeze({
  standing: {
    role: "world.resource.tree.harvestable",
    tags: ["biome.forest", "species.pine", "variant.standard"],
    variantTags: []
  },
  stump: {
    role: "world.resource.tree.stump",
    tags: ["biome.forest", "species.pine", "variant.standard"],
    variantTags: []
  },
  shadow: {
    role: "world.shadow.contact",
    tags: ["biome.forest", "species.pine", "variant.standard"],
    variantTags: []
  }
});

export async function startMinimalLoopRuntime(elements) {
  const {
    canvas,
    status,
    woodCount,
    repairTimberCount,
    objective,
    prompt,
    toast,
    milestoneBanner,
    joystickZone,
    joystickRoot,
    joystickKnob
  } = elements;
  const context = canvas.getContext("2d");

  if (!context) throw new Error("Canvas 2D context is unavailable.");

  const layout = await loadVerticalSliceLayout();
  const assetRegistry = await loadAssetRegistry();
  const pineAssets = await loadAssetImageSet(
    assetRegistry,
    PINE_ASSET_REQUESTS
  );
  let persistence = createPersistence(status);
  let loaded = { status: "empty", worldState: null };

  if (persistence) {
    try {
      loaded = await persistence.load({ slotId: SAVE_SLOT_ID });
    } catch (error) {
      console.error("Local save recovery failed; stored data was left untouched.", error);
      persistence = null;
      status.textContent = "Recovery mode - temporary session";
    }
  }
  const store = createWorldStateStore({
    initialState: loaded.worldState ?? createInitialMinimalLoopState(),
    commandHandlers: MINIMAL_LOOP_COMMAND_HANDLERS
  });
  const craftingMigrated = requiresMinimalCraftingMigration(store.getState());
  if (craftingMigrated) {
    store.dispatch(
      createMinimalLoopCommand(
        store.getState(),
        "migration.add-minimal-crafting",
        { migrationId: "migration.p0-05-minimal-crafting.v1" }
      )
    );
  }
  const resourceLayoutMigrated = requiresResourceLayoutMigration(
    store.getState()
  );
  if (resourceLayoutMigrated) {
    store.dispatch(
      createMinimalLoopCommand(
        store.getState(),
        "migration.resource-discoverability-v2",
        { migrationId: "migration.resource-discoverability.v2" }
      )
    );
  }
  const restorationMilestoneMigrated =
    requiresRestorationMilestoneMigration(store.getState());
  if (restorationMilestoneMigrated) {
    store.dispatch(
      createMinimalLoopCommand(
        store.getState(),
        "migration.add-restoration-milestone-v1",
        { migrationId: "migration.restoration-milestone.v1" }
      )
    );
  }
  let view = getMinimalLoopView(store.getState());
  let playerPosition = { ...view.player.components.position };
  let committedPosition = { ...playerPosition };
  let lockedTargetId = null;
  let interactionProgress = 0;
  let lastTimestamp = performance.now();
  let saveQueue = Promise.resolve();
  let toastTimer;
  const pressedKeys = new Set();

  const updateHud = () => {
    woodCount.textContent = `${view.inventory.wood}/${view.woodRequired}`;
    repairTimberCount.textContent = `${view.inventory.repairTimber}/1`;
    objective.textContent = getObjectiveText(view);
  };

  const showToast = (message) => {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(
      () => toast.classList.remove("is-visible"),
      2200
    );
  };

  const showMilestone = () => {
    milestoneBanner.classList.remove("is-visible");
    void milestoneBanner.offsetWidth;
    milestoneBanner.classList.add("is-visible");
    window.setTimeout(
      () => milestoneBanner.classList.remove("is-visible"),
      4300
    );
  };

  const dispatch = (type, payload) => {
    const transaction = store.dispatch(
      createMinimalLoopCommand(store.getState(), type, payload)
    );
    view = getMinimalLoopView(transaction.state);
    committedPosition = { ...view.player.components.position };
    updateHud();
  };

  const checkpointPosition = () => {
    if (
      Math.hypot(
        playerPosition.x - committedPosition.x,
        playerPosition.y - committedPosition.y
      ) < 1
    ) {
      return;
    }

    dispatch("movement.commit-position", playerPosition);
  };

  const queueSave = (reason) => {
    if (!persistence) return;

    saveQueue = saveQueue
      .then(() =>
        persistence.save({
          slotId: SAVE_SLOT_ID,
          worldState: store.getState(),
          reason
        })
      )
      .catch((error) => {
        status.textContent = "A helyi mentés most nem garantálható";
        console.error("Save failed", error);
      });
  };

  const joystick = createVirtualJoystick({
    zone: joystickZone,
    root: joystickRoot,
    knob: joystickKnob,
    onRelease: () => {
      checkpointPosition();
      queueSave("autosave.checkpoint");
    }
  });

  const finishInteraction = (target) => {
    checkpointPosition();

    if (target.type === "wood") {
      dispatch("gather.collect-wood", { targetId: target.id });
      showToast("+1 fa összegyűjtve");
    } else if (target.type === "workbench") {
      dispatch("crafting.craft-repair-timber", {
        targetId: target.id,
        recipeId: view.recipe.id,
        recipeVersion: view.recipe.contentVersion
      });
      showToast("Javítógerenda elkészült!");
    } else {
      dispatch("restoration.restore-forester-hut", { targetId: target.id });
      showToast("A Forester’s Hut helyreállt!");
      showMilestone();
    }

    lockedTargetId = null;
    interactionProgress = 0;
    queueSave("critical.transaction");
  };

  const updateInteraction = (deltaTime) => {
    const target = selectTarget(view, playerPosition, lockedTargetId);

    if (!target) {
      lockedTargetId = null;
      interactionProgress = 0;
      prompt.textContent = view.completed
        ? "Faluszint 1 · A farmösvény megnyílt"
        : "Mozogj közelebb egy kiemelt célponthoz";
      prompt.dataset.state = "idle";
      return;
    }

    if (target.id !== lockedTargetId) {
      lockedTargetId = target.id;
      interactionProgress = 0;
    }

    if (target.distance > target.radius) {
      interactionProgress = 0;
      prompt.textContent = target.type === "wood"
        ? "Lépj közelebb az ágakhoz"
        : target.type === "workbench"
          ? "Lépj közelebb az erdei munkapadhoz"
          : "Lépj közelebb a Forester’s Huthoz";
      prompt.dataset.state = "locked";
      return;
    }

    if (target.type === "workbench") {
      const missing = Math.max(0, view.woodRequired - view.inventory.wood);

      if (missing > 0) {
        interactionProgress = 0;
        prompt.textContent = `Munkapad – még ${missing} fa szükséges`;
        prompt.dataset.state = "locked";
        return;
      }
    }

    if (target.type === "hut") {
      if (view.inventory.repairTimber < 1) {
        interactionProgress = 0;
        prompt.textContent = "Forester’s Hut – előbb készíts javítógerendát";
        prompt.dataset.state = "locked";
        return;
      }
    }

    const duration = target.type === "wood"
      ? GATHER_DURATION
      : target.type === "workbench"
        ? view.recipe.durationSeconds
        : RESTORE_DURATION;
    interactionProgress += deltaTime;
    const percent = Math.min(
      100,
      Math.round(interactionProgress / duration * 100)
    );
    prompt.textContent = target.type === "wood"
      ? `Ágak összegyűjtése… ${percent}%`
      : target.type === "workbench"
        ? `Javítógerenda készítése… ${percent}%`
        : `A kunyhó helyreállítása… ${percent}%`;
    prompt.dataset.state = "active";

    if (interactionProgress >= duration) finishInteraction(target);
  };

  const frame = (timestamp) => {
    const deltaTime = Math.min(0.05, (timestamp - lastTimestamp) / 1000);
    lastTimestamp = timestamp;
    const movement = combinedMovement(joystick.getVector(), pressedKeys);

    playerPosition.x = clamp(
      playerPosition.x + movement.x * MOVE_SPEED * deltaTime,
      28,
      MINIMAL_LOOP_WORLD.width - 28
    );
    playerPosition.y = clamp(
      playerPosition.y + movement.y * MOVE_SPEED * deltaTime,
      28,
      MINIMAL_LOOP_WORLD.height - 28
    );
    view = transientPlayerView(view, playerPosition);
    updateInteraction(deltaTime);
    renderWorld(context, canvas, view, pineAssets, layout);
    requestAnimationFrame(frame);
  };

  window.addEventListener("keydown", (event) => {
    if (!movementKey(event.code)) return;
    pressedKeys.add(event.code);
    event.preventDefault();
  });
  window.addEventListener("keyup", (event) => {
    if (!movementKey(event.code)) return;
    pressedKeys.delete(event.code);
    if (pressedKeys.size === 0) {
      checkpointPosition();
      queueSave("autosave.checkpoint");
    }
    event.preventDefault();
  });

  const lifecycleCheckpoint = () => {
    pressedKeys.clear();
    joystick.release();
    checkpointPosition();
    queueSave("lifecycle.background");
  };
  window.addEventListener("blur", lifecycleCheckpoint);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) lifecycleCheckpoint();
  });
  window.addEventListener("resize", () => {
    pressedKeys.clear();
    joystick.release();
  });

  status.textContent = persistence
    ? loaded.status === "recovered"
      ? "Backupból helyreállítva"
      : "Helyi mentés aktív"
    : "Session mód – tartós mentés nem érhető el";
  updateHud();
  if (
    craftingMigrated ||
    resourceLayoutMigrated ||
    restorationMilestoneMigrated
  ) {
    queueSave("migration.p0-06-restoration-milestone");
  }
  requestAnimationFrame(frame);
}

function createPersistence(status) {
  try {
    return createSaveManager({
      storageAdapter: createIndexedDbSaveStorageAdapter()
    });
  } catch (error) {
    status.textContent = "Session mód – tartós mentés nem érhető el";
    console.warn("Persistence unavailable", error);
    return null;
  }
}

async function loadAssetRegistry() {
  const response = await fetch("./data/assets-manifest.json", {
    cache: "no-store"
  });
  if (!response.ok) throw new Error(`Asset manifest: ${response.status}`);
  return createAssetRegistry(await response.json());
}

function transientPlayerView(view, position) {
  return {
    ...view,
    player: {
      ...view.player,
      components: { ...view.player.components, position }
    }
  };
}

function selectTarget(view, playerPosition, lockedTargetId) {
  const candidates = view.woodNodes
    .filter(
      (node) =>
        node.components.available &&
        view.inventory.wood < view.woodRequired
    )
    .map((node) => ({
      id: node.id,
      type: "wood",
      distance: distance(playerPosition, node.components.position),
      radius: MINIMAL_LOOP_WORLD.gatherRadius
    }));

  if (!view.completed) {
    if (view.inventory.repairTimber < 1) {
      candidates.push({
        id: view.workbench.id,
        type: "workbench",
        distance: distance(
          playerPosition,
          view.workbench.components.position
        ),
        radius: MINIMAL_LOOP_WORLD.craftingRadius
      });
    }

    candidates.push({
      id: view.hut.id,
      type: "hut",
      distance: distance(playerPosition, view.hut.components.position),
      radius: MINIMAL_LOOP_WORLD.restorationRadius
    });
  }

  const locked = candidates.find((item) => item.id === lockedTargetId);
  if (locked && locked.distance <= locked.radius + 28) return locked;

  return candidates
    .filter((item) => item.distance <= item.radius)
    .sort(
      (left, right) =>
        left.distance - right.distance || left.id.localeCompare(right.id)
    )[0] ?? null;
}

function renderWorld(context, canvas, view, pineAssets, layout) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const ratio = Math.min(2, window.devicePixelRatio || 1);

  if (
    canvas.width !== Math.round(width * ratio) ||
    canvas.height !== Math.round(height * ratio)
  ) {
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
  }

  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  const zoom = NORMAL_CAMERA_CSS_PIXELS_PER_WU / WORLD_PIXELS_PER_UNIT;
  const visibleWorldWidth = width / zoom;
  const visibleWorldHeight = height / zoom;
  const cameraX = clamp(
    view.player.components.position.x - visibleWorldWidth / 2,
    0,
    Math.max(0, MINIMAL_LOOP_WORLD.width - visibleWorldWidth)
  );
  const cameraY = clamp(
    view.player.components.position.y - visibleWorldHeight * PLAYER_SCREEN_ANCHOR_Y,
    0,
    Math.max(0, MINIMAL_LOOP_WORLD.height - visibleWorldHeight)
  );

  context.save();
  context.scale(zoom, zoom);
  context.translate(-cameraX, -cameraY);
  drawGround(context, layout);
  drawPaths(context, layout);
  drawPineLayer(
    context,
    pineAssets,
    layout.scenery.pines,
    (item) => item.y < view.player.components.position.y
  );
  drawFarmPathGate(context, view, layout.landmarks.farmGate);
  drawHut(context, view.hut);
  drawWorkbench(context, view.workbench);
  view.woodNodes
    .filter((node) => node.components.available)
    .forEach((node) => drawWoodNode(context, node.components.position));
  drawPlayer(context, view.player.components.position);
  drawPineLayer(
    context,
    pineAssets,
    layout.scenery.pines,
    (item) => item.y >= view.player.components.position.y
  );
  context.restore();
}

function drawGround(context, layout) {
  context.fillStyle = "#78965e";
  context.fillRect(0, 0, layout.world.width, layout.world.height);
  for (let y = 0; y < layout.world.height; y += 80) {
    for (let x = 0; x < layout.world.width; x += 80) {
      context.fillStyle = (x / 80 + y / 80) % 2 === 0
        ? "rgb(255 255 255 / 2.5%)"
        : "rgb(31 65 35 / 3%)";
      context.fillRect(x, y, 80, 80);
    }
  }
}

function drawPaths(context, layout) {
  drawPolylinePath(context, layout.paths.spine, "#c9aa72");
  drawPolylinePath(context, layout.paths.forestLoop, "#b99d69");
  drawPolylinePath(context, layout.paths.farmBranch, "#c3a46d");
}

function drawPolylinePath(context, path, color) {
  if (!path?.points?.length) return;
  context.strokeStyle = color;
  context.lineWidth = path.width;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  context.moveTo(path.points[0][0], path.points[0][1]);
  for (const [x, y] of path.points.slice(1)) context.lineTo(x, y);
  context.stroke();
}

function drawPineLayer(context, pineAssets, pineLayout, predicate) {
  for (const item of pineLayout.filter(predicate)) {
    const target = pineAssets[item.type];

    if (target?.image) {
      drawLoadedAsset(
        context,
        pineAssets.shadow,
        item,
        WORLD_PIXELS_PER_UNIT
      );
      drawLoadedAsset(context, target, item, WORLD_PIXELS_PER_UNIT);
      continue;
    }

    drawPineFallback(context, item);
  }
}

function drawPineFallback(context, { type, x, y }) {
  if (type === "stump") {
    context.fillStyle = "#6f4a2d";
    context.beginPath();
    context.ellipse(x, y - 6, 24, 14, 0, 0, Math.PI * 2);
    context.fill();
    return;
  }

  context.fillStyle = "#31593d";
  context.beginPath();
  context.arc(x, y - 46, 54, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#47744a";
  context.beginPath();
  context.arc(x - 12, y - 62, 39, 0, Math.PI * 2);
  context.fill();
}

function drawWoodNode(context, { x, y }) {
  context.strokeStyle = "rgb(248 216 128 / 72%)";
  context.lineWidth = 4;
  context.beginPath();
  context.arc(x, y, 52, 0, Math.PI * 2);
  context.stroke();
  context.fillStyle = "#825634";
  context.strokeStyle = "#4d3526";
  context.lineWidth = 6;
  context.beginPath();
  context.roundRect(x - 38, y - 13, 76, 26, 13);
  context.fill();
  context.stroke();
  context.fillStyle = "#f0cf7c";
  context.beginPath();
  context.arc(x + 33, y, 9, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgb(20 29 24 / 82%)";
  context.font = "700 16px system-ui";
  context.textAlign = "center";
  context.fillText("Lehullott ágak", x, y - 36);
}

function drawHut(context, hut) {
  const { x, y } = hut.components.position;
  const restored = hut.components.restorationPhase === "restored";
  const width = HUT_DRAW_SIZE_WU.width * WORLD_PIXELS_PER_UNIT;
  const height = HUT_DRAW_SIZE_WU.height * WORLD_PIXELS_PER_UNIT;
  const wallWidth = width * 0.78;
  const wallHeight = height * 0.52;
  const roofHeight = height - wallHeight;
  const wallTop = y - wallHeight;
  const doorWidth = 1.1 * WORLD_PIXELS_PER_UNIT;
  const doorHeight = 2.3 * WORLD_PIXELS_PER_UNIT;

  context.fillStyle = restored ? "#9b693e" : "#675340";
  context.fillRect(x - wallWidth / 2, wallTop, wallWidth, wallHeight);
  context.fillStyle = restored ? "#d08b45" : "#4d443c";
  context.beginPath();
  context.moveTo(x - width / 2, wallTop + 8);
  context.lineTo(x, wallTop - roofHeight);
  context.lineTo(x + width / 2, wallTop + 8);
  context.closePath();
  context.fill();
  context.fillStyle = restored ? "#f3c978" : "#262c28";
  context.fillRect(x - doorWidth / 2, y - doorHeight, doorWidth, doorHeight);
  context.fillStyle = "rgb(20 29 24 / 78%)";
  context.font = "700 18px system-ui";
  context.textAlign = "center";
  context.fillText(
    restored ? "Forester’s Hut" : "Romos kunyhó",
    x,
    wallTop - roofHeight - 16
  );
}

function drawFarmPathGate(context, view, gate) {
  const unlocked = view.progression.unlockedAreaIds.includes(
    "area.farm-path-preview"
  );
  const x = gate.x;
  const y = gate.y;

  context.fillStyle = unlocked ? "#d5b16c" : "#625344";
  context.fillRect(x - 92, y - 9, 184, 18);
  context.fillStyle = unlocked ? "#7b5535" : "#473d34";
  context.fillRect(x - 100, y - 55, 18, 112);
  context.fillRect(x + 82, y - 55, 18, 112);

  if (unlocked) {
    context.clearRect(x - 38, y - 14, 76, 28);
    context.fillStyle = "#e9cd83";
    for (const flowerX of [x - 125, x - 112, x + 112, x + 126]) {
      context.beginPath();
      context.arc(flowerX, y + 28, 6, 0, Math.PI * 2);
      context.fill();
    }
  }

  context.fillStyle = "rgb(20 29 24 / 82%)";
  context.font = "700 18px system-ui";
  context.textAlign = "center";
  context.fillText(
    unlocked ? "Farmösvény · feloldva" : "Farmösvény · lezárva",
    x,
    y - 72
  );
}

function drawWorkbench(context, workbench) {
  const { x, y } = workbench.components.position;
  const width = WORKBENCH_DRAW_SIZE_WU.width * WORLD_PIXELS_PER_UNIT;
  const height = WORKBENCH_DRAW_SIZE_WU.height * WORLD_PIXELS_PER_UNIT;
  const topThickness = 0.36 * WORLD_PIXELS_PER_UNIT;
  const topY = y - height * 0.58;
  const legWidth = 0.28 * WORLD_PIXELS_PER_UNIT;

  context.fillStyle = "rgb(20 29 24 / 78%)";
  context.font = "700 16px system-ui";
  context.textAlign = "center";
  context.fillText("Erdei munkapad", x, topY - 18);
  context.fillStyle = "#765033";
  context.fillRect(x - width / 2, topY, width, topThickness);
  context.fillStyle = "#4d3526";
  context.fillRect(x - width * 0.36, topY + topThickness, legWidth, y - topY - topThickness);
  context.fillRect(x + width * 0.36 - legWidth, topY + topThickness, legWidth, y - topY - topThickness);
  context.fillStyle = "#d29a4c";
  context.fillRect(x - width * 0.18, topY - 0.28 * WORLD_PIXELS_PER_UNIT, width * 0.36, 0.22 * WORLD_PIXELS_PER_UNIT);
}

function drawPlayer(context, { x, y }) {
  const width = CHARACTER_DRAW_SIZE_WU.width * WORLD_PIXELS_PER_UNIT;
  const height = CHARACTER_DRAW_SIZE_WU.height * WORLD_PIXELS_PER_UNIT;
  const headRadius = 0.34 * WORLD_PIXELS_PER_UNIT;
  const bodyTop = y - height * 0.57;
  const bodyHeight = height * 0.5;
  const bodyWidth = width * 0.68;

  context.fillStyle = "rgb(0 0 0 / 18%)";
  context.beginPath();
  context.ellipse(
    x,
    y + 0.06 * WORLD_PIXELS_PER_UNIT,
    0.425 * WORLD_PIXELS_PER_UNIT,
    0.19 * WORLD_PIXELS_PER_UNIT,
    0,
    0,
    Math.PI * 2
  );
  context.fill();
  context.fillStyle = "#2b5f67";
  context.beginPath();
  context.roundRect(
    x - bodyWidth / 2,
    bodyTop,
    bodyWidth,
    bodyHeight,
    0.3 * WORLD_PIXELS_PER_UNIT
  );
  context.fill();
  const headY = bodyTop - headRadius * 0.82;
  context.fillStyle = "#e7b886";
  context.beginPath();
  context.arc(x, headY, headRadius, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "#5a3528";
  context.beginPath();
  context.arc(x, headY - 0.12 * WORLD_PIXELS_PER_UNIT, headRadius * 1.04, Math.PI, Math.PI * 2);
  context.fill();
}

function combinedMovement(joystick, keys) {
  let x = joystick.x;
  let y = joystick.y;
  if (keys.has("ArrowLeft") || keys.has("KeyA")) x -= 1;
  if (keys.has("ArrowRight") || keys.has("KeyD")) x += 1;
  if (keys.has("ArrowUp") || keys.has("KeyW")) y -= 1;
  if (keys.has("ArrowDown") || keys.has("KeyS")) y += 1;
  const length = Math.hypot(x, y);
  return length > 1 ? { x: x / length, y: y / length } : { x, y };
}

function getObjectiveText(view) {
  if (view.completed) {
    return "Faluszint 1 · A farmösvény megnyílt";
  }
  if (view.inventory.repairTimber > 0) {
    return "Vidd a javítógerendát a kunyhóhoz";
  }
  if (view.inventory.wood >= view.woodRequired) {
    return "Készíts javítógerendát az erdei munkapadnál";
  }
  return "Gyűjts össze 3 világító, lehullott ágat";
}

function movementKey(code) {
  return [
    "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
    "KeyA", "KeyD", "KeyW", "KeyS"
  ].includes(code);
}

function distance(left, right) {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}