import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  drawLoadedAsset,
  getSpriteDrawRect,
  loadAssetImageSet
} from "../src/core/assets/asset-image-loader.js";
import { createAssetRegistry } from "../src/core/assets/asset-registry.js";

const runtimeRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);

test("production pine manifest resolves all three controlled roles", async () => {
  const manifest = JSON.parse(
    await readFile(path.join(runtimeRoot, "data/assets-manifest.json"), "utf8")
  );
  const registry = createAssetRegistry(manifest);
  const requests = {
    standing: request("world.resource.tree.harvestable"),
    stump: request("world.resource.tree.stump"),
    shadow: request("world.shadow.contact")
  };

  const images = await loadAssetImageSet(registry, requests, {
    imageFactory: successfulImageFactory
  });

  for (const [key, loaded] of Object.entries(images)) {
    assert.equal(loaded.resolution.status, "resolved", key);
    assert.ok(loaded.image, key);
    await access(path.join(runtimeRoot, loaded.resolution.asset.source.uri));
  }
});

test("failed image decoding remains a non-fatal structured fallback", async () => {
  const registry = {
    resolve: () => ({
      status: "resolved",
      asset: spriteAsset(),
      diagnostics: { warnings: [] }
    })
  };
  const images = await loadAssetImageSet(
    registry,
    { standing: request("world.resource.tree.harvestable") },
    { imageFactory: failingImageFactory, logger: { warn() {} } }
  );

  assert.equal(images.standing.image, null);
  assert.ok(images.standing.error instanceof Error);
});

test("sprite draw rectangle honors manifest draw size and normalized pivot", () => {
  const asset = spriteAsset();
  const rect = getSpriteDrawRect(asset, { x: 200, y: 300 }, 32);

  assert.deepEqual(rect, {
    x: 104,
    y: 92,
    width: 192,
    height: 224
  });

  const calls = [];
  const drawn = drawLoadedAsset(
    { drawImage: (...args) => calls.push(args) },
    { image: { id: "pine" }, resolution: { asset } },
    { x: 200, y: 300 },
    32
  );

  assert.equal(drawn, true);
  assert.deepEqual(calls[0].slice(1), [104, 92, 192, 224]);
});

function request(role) {
  return {
    role,
    tags: ["biome.forest", "species.pine", "variant.standard"],
    variantTags: []
  };
}

function spriteAsset() {
  return {
    id: "world.tree.pine.harvestable.standard",
    source: { uri: "assets/environment/pine/tree.webp" },
    geometry: {
      drawSize: { width: 6, height: 7 },
      pivot: { x: 0.5, y: 0.9285714285714286 }
    }
  };
}

function successfulImageFactory() {
  return fakeImage(false);
}

function failingImageFactory() {
  return fakeImage(true);
}

function fakeImage(fails) {
  return {
    complete: false,
    naturalWidth: 0,
    decoding: "auto",
    onload: null,
    onerror: null,
    set src(value) {
      this.currentSrc = value;
      queueMicrotask(() => {
        if (fails) {
          this.onerror?.();
        } else {
          this.complete = true;
          this.naturalWidth = 64;
          this.onload?.();
        }
      });
    }
  };
}
