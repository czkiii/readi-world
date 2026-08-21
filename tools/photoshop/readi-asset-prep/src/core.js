"use strict";

const ASSET_ID_PATTERN = /^[a-z][a-z0-9]*(?:[.-][a-z0-9]+)+$/;
const REVISION_PATTERN = /^r\d{3}$/;
const PROFILE_SCHEMA_VERSION = 1;
const GEOMETRY_SCHEMA_VERSION = 1;
const STANDARD_GROUPS = Object.freeze([
  { name: "00_GUIDES_DO_NOT_EXPORT", exportVisible: false },
  { name: "10_ART", exportVisible: true },
  { name: "20_OPTIONAL", exportVisible: true },
  { name: "90_REVIEW_DO_NOT_EXPORT", exportVisible: false }
]);

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function finiteNumber(value, label) {
  invariant(Number.isFinite(value), `${label} must be a finite number.`);
  return value;
}

function positiveNumber(value, label) {
  finiteNumber(value, label);
  invariant(value > 0, `${label} must be greater than zero.`);
  return value;
}

function validatePoint(point, label) {
  invariant(isRecord(point), `${label} must be an object.`);
  finiteNumber(point.x, `${label}.x`);
  finiteNumber(point.y, `${label}.y`);
}

function signedPolygonArea(points) {
  return points.reduce((area, point, index) => {
    const next = points[(index + 1) % points.length];
    return area + point.x * next.y - next.x * point.y;
  }, 0) / 2;
}

function validateShape(shape, label) {
  invariant(isRecord(shape), `${label} must be an object.`);
  invariant(["none", "rect", "circle", "polygon"].includes(shape.type), `${label}.type is unsupported.`);
  if (shape.type === "none") return;
  if (shape.type === "circle") {
    validatePoint(shape.center, `${label}.center`);
    positiveNumber(shape.radius, `${label}.radius`);
    return;
  }
  if (shape.type === "rect") {
    validatePoint(shape.center, `${label}.center`);
    positiveNumber(shape.width, `${label}.width`);
    positiveNumber(shape.height, `${label}.height`);
    return;
  }
  invariant(Array.isArray(shape.points) && shape.points.length >= 3, `${label}.points must contain at least three points.`);
  shape.points.forEach((point, index) => validatePoint(point, `${label}.points[${index}]`));
  invariant(Math.abs(signedPolygonArea(shape.points)) > 1e-8, `${label}.points form a degenerate polygon.`);
}

function validateInteractionAnchor(anchor, label) {
  invariant(isRecord(anchor), `${label} must be an object.`);
  invariant(["none", "radius"].includes(anchor.type), `${label}.type is unsupported.`);
  if (anchor.type === "none") return;
  validatePoint(anchor.point, `${label}.point`);
  positiveNumber(anchor.radius, `${label}.radius`);
}

function calculateNormalizedPivot(canvasPx, pivotPx) {
  invariant(isRecord(canvasPx), "canvasPx must be an object.");
  invariant(isRecord(pivotPx), "pivotPx must be an object.");
  positiveNumber(canvasPx.width, "canvasPx.width");
  positiveNumber(canvasPx.height, "canvasPx.height");
  finiteNumber(pivotPx.x, "pivotPx.x");
  finiteNumber(pivotPx.y, "pivotPx.y");
  invariant(pivotPx.x >= 0 && pivotPx.x <= canvasPx.width, "pivotPx.x must be inside the canvas.");
  invariant(pivotPx.y >= 0 && pivotPx.y <= canvasPx.height, "pivotPx.y must be inside the canvas.");
  return Object.freeze({
    x: pivotPx.x / canvasPx.width,
    y: pivotPx.y / canvasPx.height
  });
}

function estimateDecodedMiB(canvasPx, channels = 4, bytesPerChannel = 1) {
  positiveNumber(canvasPx.width, "canvasPx.width");
  positiveNumber(canvasPx.height, "canvasPx.height");
  positiveNumber(channels, "channels");
  positiveNumber(bytesPerChannel, "bytesPerChannel");
  return canvasPx.width * canvasPx.height * channels * bytesPerChannel / (1024 * 1024);
}

function validateOutput(output, density) {
  invariant(isRecord(output), "Each profile output must be an object.");
  invariant(typeof output.key === "string" && output.key.length > 0, "output.key is required.");
  invariant(ASSET_ID_PATTERN.test(output.assetId), `Invalid Asset ID: ${output.assetId}`);
  invariant(typeof output.role === "string" && output.role.length > 0, `${output.assetId}: role is required.`);
  invariant(Array.isArray(output.tags), `${output.assetId}: tags must be an array.`);
  positiveNumber(output.canvasPx.width, `${output.assetId}.canvasPx.width`);
  positiveNumber(output.canvasPx.height, `${output.assetId}.canvasPx.height`);
  positiveNumber(output.drawSizeWU.width, `${output.assetId}.drawSizeWU.width`);
  positiveNumber(output.drawSizeWU.height, `${output.assetId}.drawSizeWU.height`);
  invariant(output.canvasPx.width === output.drawSizeWU.width * density, `${output.assetId}: canvas width does not match density.`);
  invariant(output.canvasPx.height === output.drawSizeWU.height * density, `${output.assetId}: canvas height does not match density.`);
  calculateNormalizedPivot(output.canvasPx, output.pivotPx);
  validateShape(output.logicalFootprint, `${output.assetId}.logicalFootprint`);
  validateInteractionAnchor(output.interactionAnchor, `${output.assetId}.interactionAnchor`);
  validateShape(output.occluderShape, `${output.assetId}.occluderShape`);
  invariant(isRecord(output.safePaddingPx), `${output.assetId}: safePaddingPx is required.`);
  ["top", "right", "bottom", "left"].forEach((side) => {
    finiteNumber(output.safePaddingPx[side], `${output.assetId}.safePaddingPx.${side}`);
    invariant(output.safePaddingPx[side] >= 0, `${output.assetId}.safePaddingPx.${side} cannot be negative.`);
  });
}

function validateFamilyProfile(profile) {
  invariant(isRecord(profile), "Profile must be an object.");
  invariant(profile.schemaVersion === PROFILE_SCHEMA_VERSION, `Unsupported profile schema: ${profile.schemaVersion}`);
  invariant(ASSET_ID_PATTERN.test(profile.profileId), `Invalid profileId: ${profile.profileId}`);
  invariant(ASSET_ID_PATTERN.test(profile.familyId), `Invalid familyId: ${profile.familyId}`);
  invariant(ASSET_ID_PATTERN.test(profile.packageId), `Invalid packageId: ${profile.packageId}`);
  positiveNumber(profile.sourceDensityPxPerWU, "sourceDensityPxPerWU");
  invariant(Array.isArray(profile.outputs) && profile.outputs.length > 0, "Profile must contain outputs.");
  const keys = new Set();
  const ids = new Set();
  profile.outputs.forEach((output) => {
    validateOutput(output, profile.sourceDensityPxPerWU);
    invariant(!keys.has(output.key), `Duplicate output key: ${output.key}`);
    invariant(!ids.has(output.assetId), `Duplicate Asset ID: ${output.assetId}`);
    keys.add(output.key);
    ids.add(output.assetId);
  });
  return profile;
}

function selectOutput(profile, key) {
  validateFamilyProfile(profile);
  const output = profile.outputs.find((candidate) => candidate.key === key);
  invariant(output, `Unknown output profile: ${key}`);
  return output;
}

function validateRevision(revision) {
  invariant(REVISION_PATTERN.test(revision), `Revision must match rNNN: ${revision}`);
  return revision;
}

function assetIdToFileStem(assetId) {
  invariant(ASSET_ID_PATTERN.test(assetId), `Invalid Asset ID: ${assetId}`);
  return assetId.replace(/\./g, "-");
}

function buildOutputNames(output, revision) {
  validateRevision(revision);
  const stem = assetIdToFileStem(output.assetId);
  return Object.freeze({
    normalized: `${stem}__normalized-${revision}.png`,
    review: `${stem}__review-${revision}.png`,
    geometry: `${stem}__geometry-${revision}.json`,
    passport: `${stem}__passport-${revision}.json`
  });
}

function buildGeometrySidecar(profile, output, revision) {
  validateFamilyProfile(profile);
  validateRevision(revision);
  const pivotNormalized = calculateNormalizedPivot(output.canvasPx, output.pivotPx);
  return {
    schemaVersion: GEOMETRY_SCHEMA_VERSION,
    assetId: output.assetId,
    masterRevision: revision,
    sourceDensityPxPerWU: profile.sourceDensityPxPerWU,
    canvasPx: { ...output.canvasPx },
    pivotPx: { ...output.pivotPx },
    pivotNormalized,
    drawSizeWU: { ...output.drawSizeWU },
    logicalFootprint: JSON.parse(JSON.stringify(output.logicalFootprint)),
    interactionAnchor: JSON.parse(JSON.stringify(output.interactionAnchor)),
    occluderShape: JSON.parse(JSON.stringify(output.occluderShape))
  };
}

function buildPassportDraft(profile, output, revision, details = {}) {
  validateFamilyProfile(profile);
  validateRevision(revision);
  const names = buildOutputNames(output, revision);
  const pivotNormalized = calculateNormalizedPivot(output.canvasPx, output.pivotPx);
  return {
    schemaVersion: 1,
    status: "DRAFT",
    activationStatus: "NOT_INTEGRATED",
    identity: {
      assetId: output.assetId,
      familyId: profile.familyId,
      packageId: profile.packageId,
      role: output.role,
      tags: [...output.tags],
      state: output.state
    },
    contract: {
      sourceDensityPxPerWU: profile.sourceDensityPxPerWU,
      canvasPx: { ...output.canvasPx },
      drawSizeWU: { ...output.drawSizeWU },
      targetPivotPx: { ...output.pivotPx },
      targetPivotNormalized: pivotNormalized,
      actualPivotPx: details.alignmentConfirmed ? { ...output.pivotPx } : null,
      actualPivotNormalized: details.alignmentConfirmed ? pivotNormalized : null,
      geometrySidecar: names.geometry
    },
    source: {
      masterRevision: revision,
      promptRunId: details.promptRunId || "TODO",
      operator: details.operator || "TODO",
      photoshopVersion: details.photoshopVersion || "TODO"
    },
    exports: {
      normalizedPng: names.normalized,
      reviewPng: names.review,
      estimatedDecodedMiB: estimateDecodedMiB(output.canvasPx)
    },
    qa: {
      technical: "PENDING",
      art: "PENDING",
      ownerApproval: "PENDING",
      manifestValidation: "PENDING"
    }
  };
}

function validateDocumentSnapshot(snapshot, output) {
  invariant(isRecord(snapshot), "Document snapshot is required.");
  const issues = [];
  if (snapshot.width !== output.canvasPx.width || snapshot.height !== output.canvasPx.height) {
    issues.push({ code: "CANVAS_MISMATCH", severity: "error", message: `Canvas must be ${output.canvasPx.width}×${output.canvasPx.height}px.` });
  }
  if (snapshot.mode !== "RGB") {
    issues.push({ code: "MODE_MISMATCH", severity: "error", message: "Document mode must be RGB." });
  }
  if (snapshot.bitsPerChannel !== 8) {
    issues.push({ code: "BIT_DEPTH_MISMATCH", severity: "error", message: "Document must use 8 bits per channel." });
  }
  if (!String(snapshot.colorProfileName || "").toLowerCase().includes("srgb")) {
    issues.push({ code: "PROFILE_MISMATCH", severity: "error", message: "Document color profile must be sRGB." });
  }
  const layerNames = new Set(snapshot.topLevelLayerNames || []);
  STANDARD_GROUPS.forEach(({ name }) => {
    if (!layerNames.has(name)) {
      issues.push({ code: "LAYER_GROUP_MISSING", severity: "error", message: `Missing layer group: ${name}` });
    }
  });
  return Object.freeze({ ok: issues.every((issue) => issue.severity !== "error"), issues });
}

module.exports = {
  ASSET_ID_PATTERN,
  REVISION_PATTERN,
  STANDARD_GROUPS,
  assetIdToFileStem,
  buildGeometrySidecar,
  buildOutputNames,
  buildPassportDraft,
  calculateNormalizedPivot,
  estimateDecodedMiB,
  selectOutput,
  validateDocumentSnapshot,
  validateFamilyProfile,
  validateRevision
};
