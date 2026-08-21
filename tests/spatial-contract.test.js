import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs/promises";

import { validateSpatialContract } from "../src/gameplay/spatial/spatial-contract.js";

async function loadContract() {
  return validateSpatialContract(JSON.parse(
    await fs.readFile(new URL("../data/spatial-contract.json", import.meta.url), "utf8")
  ));
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
