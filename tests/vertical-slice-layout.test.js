import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs/promises";

import { validateVerticalSliceLayout } from "../src/gameplay/vertical-slice/vertical-slice-layout.js";

test("validates the canonical D3 remap in the expanded world", async () => {
  const layout = validateVerticalSliceLayout(JSON.parse(
    await fs.readFile(new URL("../data/vertical-slice-layout.json", import.meta.url), "utf8")
  ));

  assert.equal(layout.id, "layout.main-village.vertical-slice.d3-remap");
  assert.deepEqual(layout.world, { width: 1600, height: 2800 });
  assert.deepEqual(layout.paths.spine.points, [
    [878, 2582], [909, 2302], [956, 1960], [878, 1649],
    [800, 1369], [909, 996], [940, 607]
  ]);
  assert.deepEqual(layout.paths.forestLoop.points.at(0), [878, 1649]);
  assert.deepEqual(layout.paths.forestLoop.points.at(-1), [909, 996]);
  assert.deepEqual(layout.paths.farmBranch.points.at(0), [909, 1493]);
  assert.deepEqual(layout.paths.farmBranch.points.at(-2), [1407, 1291]);
  assert.deepEqual(layout.landmarks.farmGate, {
    x: 1407,
    y: 1291,
    approachX: 1298,
    approachY: 1369
  });
  assert.ok(layout.scenery.pines.length >= 20);
});

test("rejects out-of-bounds authored points", () => {
  assert.throws(() => validateVerticalSliceLayout({
    schemaVersion: 1,
    id: "bad-layout",
    world: { width: 100, height: 100 },
    paths: { spine: { width: 10, points: [[0, 0], [101, 50]] } },
    landmarks: { farmGate: { x: 50, y: 50 } },
    scenery: { pines: [] }
  }), /POINT_OUT_OF_BOUNDS/);
});
