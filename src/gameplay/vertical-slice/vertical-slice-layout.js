import { VISUAL_SCALE } from "../../config/runtime-config.js";

const LAYOUT_PATH = "./data/vertical-slice-layout.json";

export async function loadVerticalSliceLayout() {
  const response = await fetch(LAYOUT_PATH, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Vertical slice layout: ${response.status}`);
  }
  return validateVerticalSliceLayout(await response.json());
}

export function validateVerticalSliceLayout(layout) {
  if (!layout || layout.schemaVersion !== 2 || typeof layout.id !== "string") {
    throw new Error("VERTICAL_SLICE_LAYOUT_INVALID_HEADER");
  }
  if (!positive(layout.world?.width) || !positive(layout.world?.height)) {
    throw new Error("VERTICAL_SLICE_LAYOUT_INVALID_WORLD");
  }
  for (const [pathId, path] of Object.entries(layout.paths ?? {})) {
    if (!positive(path.widthWU) || !Array.isArray(path.points) || path.points.length < 2) {
      throw new Error("VERTICAL_SLICE_LAYOUT_INVALID_PATH");
    }
    validatePathWidth(pathId, path.widthWU);
    for (const point of path.points) validatePoint(point, layout.world);
  }
  for (const pine of layout.scenery?.pines ?? []) {
    if (!["standing", "stump"].includes(pine.type)) {
      throw new Error("VERTICAL_SLICE_LAYOUT_INVALID_PINE");
    }
    validateXY(pine, layout.world);
  }
  validateXY(layout.landmarks?.farmGate, layout.world);
  return Object.freeze(layout);
}

function validatePathWidth(pathId, widthWU) {
  const range = pathId === "spine"
    ? VISUAL_SCALE.pathWidthRangesWU.main
    : VISUAL_SCALE.pathWidthRangesWU.secondary;
  if (widthWU < range.min || widthWU > range.max) {
    throw new Error("VERTICAL_SLICE_LAYOUT_PATH_WIDTH_OUT_OF_D4_RANGE");
  }
}

function validatePoint(point, world) {
  if (!Array.isArray(point) || point.length !== 2) {
    throw new Error("VERTICAL_SLICE_LAYOUT_INVALID_POINT");
  }
  validateXY({ x: point[0], y: point[1] }, world);
}

function validateXY(point, world) {
  if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y) ||
      point.x < 0 || point.y < 0 || point.x > world.width || point.y > world.height) {
    throw new Error("VERTICAL_SLICE_LAYOUT_POINT_OUT_OF_BOUNDS");
  }
}

function positive(value) {
  return Number.isFinite(value) && value > 0;
}
