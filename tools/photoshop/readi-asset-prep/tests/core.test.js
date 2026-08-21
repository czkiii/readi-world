"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const core = require("../src/core.js");
const profilePath = path.join(__dirname, "..", "profiles", "pine-family-v1.json");
const profile = JSON.parse(fs.readFileSync(profilePath, "utf8"));

test("accepts the bundled D8 pine tooling fixture", () => {
  assert.equal(core.validateFamilyProfile(profile), profile);
  assert.equal(profile.ownerReviewRequired, true);
  assert.deepEqual(profile.outputs.map((output) => output.key), ["standing", "stump", "shadow"]);
});

test("calculates exact normalized pivots for all three outputs", () => {
  const expected = {
    standing: { x: 0.5, y: 416 / 448 },
    stump: { x: 0.5, y: 80 / 96 },
    shadow: { x: 0.5, y: 0.75 }
  };
  for (const output of profile.outputs) {
    assert.deepEqual(core.calculateNormalizedPivot(output.canvasPx, output.pivotPx), expected[output.key]);
  }
});

test("calculates the documented decoded family memory budget", () => {
  const total = profile.outputs.reduce((sum, output) => sum + core.estimateDecodedMiB(output.canvasPx), 0);
  assert.equal(total, 0.734375);
});

test("rejects invalid Asset IDs and revisions", () => {
  const invalid = structuredClone(profile);
  invalid.outputs[0].assetId = "Bad Asset ID";
  assert.throws(() => core.validateFamilyProfile(invalid), /Invalid Asset ID/);
  assert.throws(() => core.validateRevision("r1"), /rNNN/);
});

test("rejects canvas dimensions that disagree with WU density", () => {
  const invalid = structuredClone(profile);
  invalid.outputs[0].canvasPx.width = 385;
  assert.throws(() => core.validateFamilyProfile(invalid), /canvas width does not match density/);
});

test("rejects degenerate authored occluder polygons", () => {
  const invalid = structuredClone(profile);
  invalid.outputs[0].occluderShape.points = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }];
  assert.throws(() => core.validateFamilyProfile(invalid), /degenerate polygon/);
});

test("builds deterministic revision-safe output names", () => {
  const output = core.selectOutput(profile, "standing");
  assert.deepEqual(core.buildOutputNames(output, "r001"), {
    normalized: "world-tree-pine-harvestable-standard__normalized-r001.png",
    review: "world-tree-pine-harvestable-standard__review-r001.png",
    geometry: "world-tree-pine-harvestable-standard__geometry-r001.json",
    passport: "world-tree-pine-harvestable-standard__passport-r001.json"
  });
});

test("builds the geometry sidecar without QA or activation state", () => {
  const output = core.selectOutput(profile, "standing");
  const sidecar = core.buildGeometrySidecar(profile, output, "r001");
  assert.equal(sidecar.schemaVersion, 1);
  assert.equal(sidecar.assetId, output.assetId);
  assert.deepEqual(sidecar.pivotNormalized, { x: 0.5, y: 416 / 448 });
  assert.equal(sidecar.logicalFootprint.radius, 0.575);
  assert.equal(sidecar.interactionAnchor.radius, 1.45);
});

test("passport draft can never claim integration or QA pass", () => {
  const output = core.selectOutput(profile, "stump");
  const passport = core.buildPassportDraft(profile, output, "r001", { promptRunId: "RUN-001" });
  assert.equal(passport.status, "DRAFT");
  assert.equal(passport.activationStatus, "NOT_INTEGRATED");
  assert.equal(passport.contract.actualPivotPx, null);
  assert.equal(passport.contract.actualPivotNormalized, null);
  assert.deepEqual(passport.qa, {
    technical: "PENDING",
    art: "PENDING",
    ownerApproval: "PENDING",
    manifestValidation: "PENDING"
  });
});

test("document validation separates blocking errors from missing helper groups", () => {
  const output = core.selectOutput(profile, "shadow");
  const good = core.validateDocumentSnapshot({
    width: 128,
    height: 64,
    mode: "RGB",
    bitsPerChannel: 8,
    colorProfileName: "sRGB IEC61966-2.1",
    topLevelLayerNames: core.STANDARD_GROUPS.map((group) => group.name)
  }, output);
  assert.equal(good.ok, true);
  assert.equal(good.issues.length, 0);

  const bad = core.validateDocumentSnapshot({
    width: 256,
    height: 64,
    mode: "CMYK",
    bitsPerChannel: 16,
    colorProfileName: "Adobe RGB",
    topLevelLayerNames: []
  }, output);
  assert.equal(bad.ok, false);
  assert.ok(bad.issues.some((issue) => issue.code === "CANVAS_MISMATCH"));
  assert.ok(bad.issues.some((issue) => issue.code === "LAYER_GROUP_MISSING"));
});

test("passport records actual pivot only after explicit alignment confirmation", () => {
  const output = core.selectOutput(profile, "standing");
  const passport = core.buildPassportDraft(profile, output, "r001", { alignmentConfirmed: true });
  assert.deepEqual(passport.contract.actualPivotPx, { x: 192, y: 416 });
  assert.deepEqual(passport.contract.actualPivotNormalized, { x: 0.5, y: 416 / 448 });
});
