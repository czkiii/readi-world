const SPATIAL_CONTRACT_PATH = "./data/spatial-contract.json";

export async function loadSpatialContract() {
  const response = await fetch(SPATIAL_CONTRACT_PATH, { cache: "no-store" });
  if (!response.ok) throw new Error(`Spatial contract: ${response.status}`);
  return validateSpatialContract(await response.json());
}

export function validateSpatialContract(contract) {
  if (!contract || contract.schemaVersion !== 1 || typeof contract.id !== "string") {
    throw new Error("SPATIAL_CONTRACT_INVALID_HEADER");
  }
  if (contract.unit?.id !== "WU" || !positive(contract.unit.sourcePixelsPerWU)) {
    throw new Error("SPATIAL_CONTRACT_INVALID_UNIT");
  }

  const character = contract.anchors?.character;
  if (!positive(character?.referenceHeightWU)) {
    throw new Error("SPATIAL_CONTRACT_INVALID_CHARACTER_ANCHOR");
  }

  const pine = contract.anchors?.productionPine;
  if (!pine?.assetId || !positive(pine.drawSizeWU?.width) ||
      !positive(pine.drawSizeWU?.height) ||
      !positive(pine.logicalFootprint?.radiusWU) ||
      !positive(pine.interactionRadiusWU)) {
    throw new Error("SPATIAL_CONTRACT_INVALID_PINE_ANCHOR");
  }

  const paths = contract.paths;
  if (paths?.finalWidthLocked !== false || paths?.finalRoutingLocked !== false ||
      paths?.currentTuningOnly?.approved !== false) {
    throw new Error("SPATIAL_CONTRACT_PATHS_MUST_REMAIN_PROVISIONAL");
  }
  if (!positive(paths.currentTuningOnly.runtimePixelsPerWU) ||
      !positive(paths.currentTuningOnly.mainPathWidthWU) ||
      !positive(paths.currentTuningOnly.secondaryPathWidthWU)) {
    throw new Error("SPATIAL_CONTRACT_INVALID_PATH_TUNING");
  }

  const required = contract.placeholderContract?.requiredGeometry;
  for (const field of ["logicalFootprint", "pivot", "expectedDrawSize", "interactionAnchor"]) {
    if (!Array.isArray(required) || !required.includes(field)) {
      throw new Error("SPATIAL_CONTRACT_PLACEHOLDER_GEOMETRY_MISSING");
    }
  }

  return Object.freeze(contract);
}

function positive(value) {
  return Number.isFinite(value) && value > 0;
}
