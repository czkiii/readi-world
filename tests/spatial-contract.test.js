import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs/promises";

import { validateSpatialContract } from "../src/gameplay/spatial/spatial-contract.js";

async function loadJson(path) {
  return JSON.parse(await fs.readFile(new URL(path, import.meta.url), "utf8"));
}

async function loadContract() {
  return validateSpatialContract(await loadJson("../data/spatial-contract.json"));
}

test("locks known scale anchors without locking path composition", async () => {
  const contract = await loadContract();

  assert.equal(contract.unit.id, "WU");
  assert.equal(contract.unit.sourcePixelsPerWU, 64);
  assert.equal(contract.anchors.character.referenceHeightWU, 2);
  assert.deepEqual(contract.anchors.productionPine.drawSizeWU, { width: 6, height: 7 });
  assert.equal(contract.anchors.productionPine.logicalFootprint.radiusWU, 0.575);
  assert.equal(contract.anchors.productionPine.interactionRadiusWU, 1.45);
  assert.equal(contract.paths.finalWidthLocked, false);
  assert.equal(contract.paths.finalRoutingLocked, false);
  assert.equal(contract.paths.currentTuningOnly.approved, false);
});

test("keeps the production pine spatial anchor equal to asset manifest geometry", async () => {
  const contract = await loadContract();
  const manifest = await loadJson("../data/assets-manifest.json");
  const pine = manifest.assets.find(
    (asset) => asset.id === contract.anchors.productionPine.assetId
  );

  assert.ok(pine, "production pine must exist in the asset manifest");
  assert.deepEqual(pine.geometry.drawSize, contract.anchors.productionPine.drawSizeWU);
  assert.equal(
    pine.geometry.logicalFootprint.radius,
    contract.anchors.productionPine.logicalFootprint.radiusWU
  );
  assert.equal(
    pine.geometry.interactionAnchor.radius,
    contract.anchors.productionPine.interactionRadiusWU
  );
});

test("requires production-safe placeholder geometry fields", async () => {
  const contract = await loadContract();
  assert.deepEqual(contract.placeholderContract.requiredGeometry, [
    "logicalFootprint",
    "pivot",
    "expectedDrawSize",
    "interactionAnchor"
  ]);
  assert.deepEqual(contract.placeholderContract.buildingAdditionalGeometry, [
    "entrancePoint",
    "clearRadius"
  ]);
});

test("rejects accidental path locking while representative art is missing", async () => {
  const contract = structuredClone(await loadContract());
  contract.paths.finalWidthLocked = true;
  assert.throws(
    () => validateSpatialContract(contract),
    /PATHS_MUST_REMAIN_PROVISIONAL/
  );
});
