import assert from "node:assert/strict";
import test from "node:test";

import {
  AssetManifestError,
  createValidatedAssetManifest
} from "../src/core/assets/asset-manifest.js";
import {
  AssetResolutionError,
  createAssetRegistry
} from "../src/core/assets/asset-registry.js";

function createManifest() {
  return {
    schemaVersion: 2,
    registryVersion: 1,
    id: "test.assets",
    packages: [
      {
        id: "test.core",
        version: 1,
        dependencies: []
      }
    ],
    vocabulary: {
      roles: ["world.tree", "system.missing"],
      tags: ["biome.forest", "season.winter", "system.fallback"]
    },
    assets: [
      createSprite({
        id: "test.sprite.tree-a",
        roles: ["world.tree"],
        tags: ["biome.forest"],
        priority: 10,
        variants: [
          {
            id: "test.variant.tree-winter",
            requiredTags: ["season.winter"],
            assetId: "test.sprite.tree-winter"
          }
        ]
      }),
      createSprite({
        id: "test.sprite.tree-b",
        roles: ["world.tree"],
        tags: ["biome.forest"],
        priority: 5
      }),
      createSprite({
        id: "test.sprite.tree-winter",
        roles: ["world.tree"],
        tags: ["biome.forest", "season.winter"],
        priority: 1
      }),
      createSprite({
        id: "test.sprite.missing",
        roles: ["system.missing"],
        tags: ["system.fallback"],
        priority: 0
      })
    ],
    fallbackChains: {
      "world.tree": ["test.sprite.missing"]
    },
    aliases: {
      "test.sprite.old-tree": "test.sprite.tree-a"
    }
  };
}

function createSprite({
  id,
  roles,
  tags,
  priority,
  variants = [],
  fallbackIds = []
}) {
  return {
    id,
    packageId: "test.core",
    kind: "sprite",
    roles,
    tags,
    priority,
    fallbackIds,
    variants,
    source: {
      type: "image",
      uri: `assets/test/${id}.png`
    },
    geometry: {
      sourceRect: { x: 0, y: 0, width: 64, height: 96 },
      pivot: { x: 0.5, y: 0.9 },
      drawSize: { width: 1, height: 1.5 },
      alphaMode: "straight",
      logicalFootprint: {
        type: "circle",
        center: { x: 0, y: 0 },
        radius: 0.35
      },
      interactionAnchor: {
        type: "radius",
        point: { x: 0, y: 0 },
        radius: 1.25
      },
      occluderShape: {
        type: "polygon",
        points: [
          { x: -0.4, y: -1.2 },
          { x: 0.4, y: -1.2 },
          { x: 0.5, y: -0.2 },
          { x: -0.5, y: -0.2 }
        ]
      }
    }
  };
}

test("accepts a versioned manifest with controlled semantic metadata", () => {
  const manifest = createValidatedAssetManifest(createManifest());

  assert.equal(manifest.schemaVersion, 2);
  assert.equal(manifest.registryVersion, 1);
  assert.equal(Object.isFrozen(manifest), true);
  assert.equal(Object.isFrozen(manifest.assets[0].geometry), true);
  assert.equal(
    manifest.assets[0].geometry.logicalFootprint.radius,
    0.35
  );
  assert.equal(
    manifest.assets[0].geometry.interactionAnchor.radius,
    1.25
  );
});

test("rejects schema v1 instead of inventing geometry defaults", () => {
  const manifest = createManifest();
  manifest.schemaVersion = 1;

  assert.throws(
    () => createValidatedAssetManifest(manifest),
    (error) =>
      error instanceof AssetManifestError &&
      error.code === "UNSUPPORTED_MANIFEST_VERSION"
  );
});

test("requires footprint interaction and occluder metadata", () => {
  const manifest = createManifest();
  delete manifest.assets[0].geometry.logicalFootprint;

  assert.throws(() => createValidatedAssetManifest(manifest));
});

test("rejects a pivot outside normalized source coordinates", () => {
  const manifest = createManifest();
  manifest.assets[0].geometry.pivot = { x: 0.5, y: 1.01 };

  assert.throws(
    () => createValidatedAssetManifest(manifest),
    (error) =>
      error instanceof AssetManifestError &&
      error.code === "INVALID_NORMALIZED_POINT"
  );
});

test("rejects a degenerate occluder polygon", () => {
  const manifest = createManifest();
  manifest.assets[0].geometry.occluderShape = {
    type: "polygon",
    points: [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 }
    ]
  };

  assert.throws(
    () => createValidatedAssetManifest(manifest),
    (error) =>
      error instanceof AssetManifestError && error.code === "INVALID_POLYGON"
  );
});

test("accepts explicit non-interactive and non-occluding geometry", () => {
  const manifest = createManifest();
  const geometry = manifest.assets[0].geometry;
  geometry.interactionAnchor = { type: "none" };
  geometry.occluderShape = { type: "none" };

  const validated = createValidatedAssetManifest(manifest);

  assert.equal(validated.assets[0].geometry.interactionAnchor.type, "none");
  assert.equal(validated.assets[0].geometry.occluderShape.type, "none");
});

test("rejects duplicate stable asset ids before activation", () => {
  const manifest = createManifest();
  manifest.assets.push(structuredClone(manifest.assets[0]));

  assert.throws(
    () => createValidatedAssetManifest(manifest),
    (error) =>
      error instanceof AssetManifestError &&
      error.code === "DUPLICATE_ASSET_ID"
  );
});

test("rejects uncontrolled roles and tags", () => {
  const manifest = createManifest();
  manifest.assets[0].roles.push("unknown.role");

  assert.throws(
    () => createValidatedAssetManifest(manifest),
    (error) =>
      error instanceof AssetManifestError &&
      error.code === "UNCONTROLLED_VOCABULARY_VALUE"
  );
});

test("rejects missing fallback and variant references", () => {
  const manifest = createManifest();
  manifest.assets[0].fallbackIds.push("test.sprite.does-not-exist");

  assert.throws(
    () => createValidatedAssetManifest(manifest),
    (error) =>
      error instanceof AssetManifestError &&
      error.code === "MISSING_ASSET_REFERENCE"
  );
});

test("rejects atlas grids that exceed the declared texture", () => {
  const manifest = createManifest();
  const asset = manifest.assets[0];
  asset.kind = "atlas-frame";
  asset.source = {
    type: "atlas",
    uri: "assets/test/trees.png",
    atlas: {
      textureSize: { width: 128, height: 128 },
      maxTextureSize: 2048,
      grid: {
        cellWidth: 64,
        cellHeight: 64,
        columns: 3,
        rows: 2,
        padding: 0
      },
      frameOrder: ["test.frame.one", "test.frame.two"]
    }
  };

  assert.throws(
    () => createValidatedAssetManifest(manifest),
    (error) =>
      error instanceof AssetManifestError &&
      error.code === "ATLAS_GRID_OUT_OF_BOUNDS"
  );
});

test("resolves semantic requests deterministically by priority then id", () => {
  const registry = createAssetRegistry(createManifest());
  const result = registry.resolve({
    role: "world.tree",
    tags: ["biome.forest"],
    variantTags: []
  });

  assert.equal(result.status, "resolved");
  assert.equal(result.asset.id, "test.sprite.tree-a");
  assert.equal(result.diagnostics.warnings.length, 0);
});

test("resolves the most specific compatible visual variant", () => {
  const registry = createAssetRegistry(createManifest());
  const result = registry.resolve({
    role: "world.tree",
    tags: ["biome.forest"],
    variantTags: ["season.winter"]
  });

  assert.equal(result.status, "resolved");
  assert.equal(result.asset.id, "test.sprite.tree-winter");
});

test("uses the declared fallback chain with diagnostics", () => {
  const registry = createAssetRegistry(createManifest());
  const result = registry.resolve({
    role: "world.tree",
    tags: ["season.winter", "system.fallback"],
    variantTags: []
  });

  assert.equal(result.status, "fallback");
  assert.equal(result.asset.id, "test.sprite.missing");
  assert.equal(
    result.diagnostics.warnings[0].code,
    "SEMANTIC_FALLBACK_USED"
  );
});

test("limits exact id requests to approved reasons and reports aliases", () => {
  const registry = createAssetRegistry(createManifest());

  assert.throws(
    () =>
      registry.resolve({
        exactId: "test.sprite.tree-a",
        tags: [],
        variantTags: []
      }),
    (error) =>
      error instanceof AssetResolutionError &&
      error.code === "EXACT_ASSET_REASON_REQUIRED"
  );

  const result = registry.resolve({
    exactId: "test.sprite.old-tree",
    exactReason: "authored-landmark",
    tags: [],
    variantTags: []
  });

  assert.equal(result.asset.id, "test.sprite.tree-a");
  assert.equal(result.diagnostics.warnings[0].code, "ASSET_ALIAS_USED");
});

test("returns a structured missing result instead of guessing a filename", () => {
  const manifest = createManifest();
  manifest.fallbackChains["world.tree"] = [];
  const registry = createAssetRegistry(manifest);
  const result = registry.resolve({
    role: "world.tree",
    tags: ["season.winter", "system.fallback"],
    variantTags: []
  });

  assert.equal(result.status, "missing");
  assert.equal(result.asset, null);
  assert.equal(
    result.diagnostics.warnings.at(-1).code,
    "ASSET_NOT_RESOLVED"
  );
});
