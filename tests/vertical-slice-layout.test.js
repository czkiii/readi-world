import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs/promises";

import { validateVerticalSliceLayout } from "../src/gameplay/vertical-slice/vertical-slice-layout.js";

test("validates the I3 vertical-slice authored layout", async () => {
  const layout = validateVerticalSliceLayout(JSON.parse(
    await fs.readFile(new URL("../data/vertical-slice-layout.json", import.meta.url), "utf8")
  ));

  assert.equal(layout.id, "layout.main-village.vertical-slice.i3");
  assert.deepEqual(layout.world, { width: 1000, height: 1600 });
  assert.equal(layout.paths.spine.points.length, 6);
  assert.equal(layout.paths.forestLoop.points.length, 6);
  assert.equal(layout.paths.farmBranch.points.at(-1)[0], 850);
  assert.ok(layout.scenery.pines.length >= 18);
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
