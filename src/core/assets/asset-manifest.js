import {
  assertJsonValue,
  assertPlainRecord,
  assertStableId,
  deepFreeze
} from "../world-state/world-state-contract.js";

export const ASSET_MANIFEST_SCHEMA_VERSION = 1;
export const ASSET_REGISTRY_SCHEMA_VERSION = 1;

const ASSET_KINDS = new Set(["sprite", "atlas-frame"]);
const SOURCE_TYPES = new Set(["image", "atlas"]);
const ALPHA_MODES = new Set(["straight", "premultiplied", "opaque"]);
const HIT_SHAPE_TYPES = new Set(["none", "rect", "circle"]);

export class AssetManifestError extends Error {
  constructor(code, message, options = {}) {
    super(message, options);
    this.name = "AssetManifestError";
    this.code = code;
    this.details = options.details ?? null;
  }
}

export function validateAssetManifest(manifest) {
  assertPlainRecord(manifest, "asset manifest");
  assertJsonValue(manifest, "asset manifest");

  if (manifest.schemaVersion !== ASSET_MANIFEST_SCHEMA_VERSION) {
    throw manifestError(
      "UNSUPPORTED_MANIFEST_VERSION",
      `Expected asset manifest schema ${ASSET_MANIFEST_SCHEMA_VERSION}.`
    );
  }

  if (manifest.registryVersion !== ASSET_REGISTRY_SCHEMA_VERSION) {
    throw manifestError(
      "UNSUPPORTED_REGISTRY_VERSION",
      `Expected asset registry schema ${ASSET_REGISTRY_SCHEMA_VERSION}.`
    );
  }

  assertNamespacedId(manifest.id, "manifest id");
  assertArray(manifest.packages, "packages");
  assertPlainRecord(manifest.vocabulary, "vocabulary");
  assertArray(manifest.vocabulary.roles, "role vocabulary");
  assertArray(manifest.vocabulary.tags, "tag vocabulary");
  assertArray(manifest.assets, "assets");
  assertPlainRecord(manifest.fallbackChains, "fallbackChains");
  assertPlainRecord(manifest.aliases, "aliases");

  const roleSet = validateVocabulary(manifest.vocabulary.roles, "role");
  const tagSet = validateVocabulary(manifest.vocabulary.tags, "tag");
  const packageMap = validatePackages(manifest.packages);
  const assetMap = new Map();

  for (const asset of manifest.assets) {
    validateAsset(asset, { roleSet, tagSet, packageMap });

    if (assetMap.has(asset.id)) {
      throw manifestError(
        "DUPLICATE_ASSET_ID",
        `Asset id ${asset.id} is registered more than once.`
      );
    }

    assetMap.set(asset.id, asset);
  }

  validateAssetReferences(manifest, assetMap, roleSet, tagSet);
  return manifest;
}

export function createValidatedAssetManifest(manifest) {
  validateAssetManifest(manifest);
  return deepFreeze(structuredClone(manifest));
}

function validatePackages(packages) {
  const packageMap = new Map();

  for (const packageDefinition of packages) {
    assertPlainRecord(packageDefinition, "asset package");
    assertNamespacedId(packageDefinition.id, "asset package id");
    assertPositiveInteger(packageDefinition.version, "asset package version");
    assertArray(packageDefinition.dependencies, "asset package dependencies");

    if (packageMap.has(packageDefinition.id)) {
      throw manifestError(
        "DUPLICATE_PACKAGE_ID",
        `Asset package ${packageDefinition.id} is registered more than once.`
      );
    }

    packageMap.set(packageDefinition.id, packageDefinition);
  }

  for (const packageDefinition of packages) {
    const dependencySet = new Set();

    for (const dependencyId of packageDefinition.dependencies) {
      assertNamespacedId(dependencyId, "asset package dependency");

      if (!packageMap.has(dependencyId)) {
        throw manifestError(
          "MISSING_PACKAGE_DEPENDENCY",
          `Package ${packageDefinition.id} depends on missing package ${dependencyId}.`
        );
      }

      if (dependencyId === packageDefinition.id) {
        throw manifestError(
          "SELF_PACKAGE_DEPENDENCY",
          `Package ${packageDefinition.id} cannot depend on itself.`
        );
      }

      if (dependencySet.has(dependencyId)) {
        throw manifestError(
          "DUPLICATE_PACKAGE_DEPENDENCY",
          `Package ${packageDefinition.id} repeats dependency ${dependencyId}.`
        );
      }

      dependencySet.add(dependencyId);
    }
  }

  detectPackageCycles(packageMap);
  return packageMap;
}

function validateAsset(asset, { roleSet, tagSet, packageMap }) {
  assertPlainRecord(asset, "asset");
  assertNamespacedId(asset.id, "asset id");
  assertNamespacedId(asset.packageId, "asset package id");

  if (!packageMap.has(asset.packageId)) {
    throw manifestError(
      "UNKNOWN_ASSET_PACKAGE",
      `Asset ${asset.id} references unknown package ${asset.packageId}.`
    );
  }

  if (!ASSET_KINDS.has(asset.kind)) {
    throw manifestError(
      "INVALID_ASSET_KIND",
      `Asset ${asset.id} has unsupported kind ${asset.kind}.`
    );
  }

  assertArray(asset.roles, `asset ${asset.id} roles`);
  assertArray(asset.tags, `asset ${asset.id} tags`);
  assertArray(asset.fallbackIds, `asset ${asset.id} fallbackIds`);
  assertArray(asset.variants, `asset ${asset.id} variants`);
  assertInteger(asset.priority, `asset ${asset.id} priority`);
  validateControlledValues(asset.roles, roleSet, "role", asset.id);
  validateControlledValues(asset.tags, tagSet, "tag", asset.id);
  validateUniqueValues(asset.roles, `asset ${asset.id} roles`);
  validateUniqueValues(asset.tags, `asset ${asset.id} tags`);
  validateUniqueValues(asset.fallbackIds, `asset ${asset.id} fallbackIds`);

  for (const fallbackId of asset.fallbackIds) {
    assertNamespacedId(fallbackId, `asset ${asset.id} fallback id`);
  }

  validateSource(asset);
  validateGeometry(asset);

  const variantIds = new Set();

  for (const variant of asset.variants) {
    assertPlainRecord(variant, `asset ${asset.id} variant`);
    assertNamespacedId(variant.id, `asset ${asset.id} variant id`);
    assertNamespacedId(variant.assetId, `variant ${variant.id} asset id`);
    assertArray(variant.requiredTags, `variant ${variant.id} requiredTags`);
    validateControlledValues(
      variant.requiredTags,
      tagSet,
      "variant tag",
      variant.id
    );
    validateUniqueValues(
      variant.requiredTags,
      `variant ${variant.id} requiredTags`
    );

    if (variantIds.has(variant.id)) {
      throw manifestError(
        "DUPLICATE_VARIANT_ID",
        `Asset ${asset.id} repeats variant ${variant.id}.`
      );
    }

    variantIds.add(variant.id);
  }
}

function validateSource(asset) {
  assertPlainRecord(asset.source, `asset ${asset.id} source`);

  if (!SOURCE_TYPES.has(asset.source.type)) {
    throw manifestError(
      "INVALID_SOURCE_TYPE",
      `Asset ${asset.id} has unsupported source type ${asset.source.type}.`
    );
  }

  if (
    typeof asset.source.uri !== "string" ||
    asset.source.uri.length === 0 ||
    asset.source.uri.includes("..") ||
    /^[a-z]+:/i.test(asset.source.uri) ||
    asset.source.uri.startsWith("/") ||
    asset.source.uri.startsWith("\\")
  ) {
    throw manifestError(
      "UNSAFE_ASSET_URI",
      `Asset ${asset.id} must use a safe manifest-relative URI.`
    );
  }

  if (asset.kind === "sprite" && asset.source.type !== "image") {
    throw manifestError(
      "ASSET_SOURCE_KIND_MISMATCH",
      `Sprite ${asset.id} must use an image source.`
    );
  }

  if (asset.kind === "atlas-frame") {
    if (asset.source.type !== "atlas") {
      throw manifestError(
        "ASSET_SOURCE_KIND_MISMATCH",
        `Atlas frame ${asset.id} must use an atlas source.`
      );
    }

    validateAtlasSource(asset);
  }
}

function validateAtlasSource(asset) {
  const atlas = asset.source.atlas;
  assertPlainRecord(atlas, `asset ${asset.id} atlas`);
  assertSize(atlas.textureSize, `asset ${asset.id} atlas textureSize`);
  assertPositiveInteger(
    atlas.maxTextureSize,
    `asset ${asset.id} maxTextureSize`
  );

  if (
    atlas.textureSize.width > atlas.maxTextureSize ||
    atlas.textureSize.height > atlas.maxTextureSize
  ) {
    throw manifestError(
      "ATLAS_TEXTURE_LIMIT_EXCEEDED",
      `Atlas for ${asset.id} exceeds its declared texture limit.`
    );
  }

  assertPlainRecord(atlas.grid, `asset ${asset.id} atlas grid`);

  for (const field of ["cellWidth", "cellHeight", "columns", "rows"]) {
    assertPositiveInteger(atlas.grid[field], `asset ${asset.id} grid ${field}`);
  }

  assertNonNegativeInteger(
    atlas.grid.padding,
    `asset ${asset.id} grid padding`
  );
  assertArray(atlas.frameOrder, `asset ${asset.id} frameOrder`);
  validateUniqueValues(atlas.frameOrder, `asset ${asset.id} frameOrder`);

  for (const frameId of atlas.frameOrder) {
    assertNamespacedId(frameId, `asset ${asset.id} frame id`);
  }

  const gridWidth =
    atlas.grid.columns * atlas.grid.cellWidth +
    (atlas.grid.columns - 1) * atlas.grid.padding;
  const gridHeight =
    atlas.grid.rows * atlas.grid.cellHeight +
    (atlas.grid.rows - 1) * atlas.grid.padding;

  if (
    gridWidth > atlas.textureSize.width ||
    gridHeight > atlas.textureSize.height
  ) {
    throw manifestError(
      "ATLAS_GRID_OUT_OF_BOUNDS",
      `Atlas grid for ${asset.id} exceeds its texture dimensions.`
    );
  }
}

function validateGeometry(asset) {
  const geometry = asset.geometry;
  assertPlainRecord(geometry, `asset ${asset.id} geometry`);
  assertRect(geometry.sourceRect, `asset ${asset.id} sourceRect`);
  assertPoint(geometry.pivot, `asset ${asset.id} pivot`);
  assertSize(geometry.drawSize, `asset ${asset.id} drawSize`);

  if (!ALPHA_MODES.has(geometry.alphaMode)) {
    throw manifestError(
      "INVALID_ALPHA_MODE",
      `Asset ${asset.id} has unsupported alpha mode ${geometry.alphaMode}.`
    );
  }

  if (
    asset.kind === "atlas-frame" &&
    (geometry.sourceRect.x + geometry.sourceRect.width >
      asset.source.atlas.textureSize.width ||
      geometry.sourceRect.y + geometry.sourceRect.height >
        asset.source.atlas.textureSize.height)
  ) {
    throw manifestError(
      "ATLAS_FRAME_OUT_OF_BOUNDS",
      `Source rectangle for ${asset.id} exceeds its atlas texture.`
    );
  }

  assertPlainRecord(geometry.hitShape, `asset ${asset.id} hitShape`);

  if (!HIT_SHAPE_TYPES.has(geometry.hitShape.type)) {
    throw manifestError(
      "INVALID_HIT_SHAPE",
      `Asset ${asset.id} has unsupported hit shape ${geometry.hitShape.type}.`
    );
  }

  if (geometry.hitShape.type === "rect") {
    assertSize(geometry.hitShape.size, `asset ${asset.id} hit rect size`);
  }

  if (geometry.hitShape.type === "circle") {
    assertPositiveNumber(
      geometry.hitShape.radius,
      `asset ${asset.id} hit circle radius`
    );
  }
}

function validateAssetReferences(manifest, assetMap, roleSet, tagSet) {
  for (const asset of manifest.assets) {
    for (const fallbackId of asset.fallbackIds) {
      validateAssetReference(assetMap, fallbackId, asset.id, "fallback");
    }

    for (const variant of asset.variants) {
      const target = validateAssetReference(
        assetMap,
        variant.assetId,
        asset.id,
        "variant"
      );

      if (target.kind !== asset.kind) {
        throw manifestError(
          "INCOMPATIBLE_VARIANT_KIND",
          `Variant ${variant.id} changes ${asset.id} from ${asset.kind} to ${target.kind}.`
        );
      }
    }
  }

  for (const [role, fallbackIds] of Object.entries(manifest.fallbackChains)) {
    if (!roleSet.has(role)) {
      throw manifestError(
        "UNKNOWN_FALLBACK_ROLE",
        `Fallback chain uses uncontrolled role ${role}.`
      );
    }

    assertArray(fallbackIds, `fallback chain ${role}`);
    validateUniqueValues(fallbackIds, `fallback chain ${role}`);

    for (const fallbackId of fallbackIds) {
      validateAssetReference(assetMap, fallbackId, role, "role fallback");
    }
  }

  for (const [aliasId, targetId] of Object.entries(manifest.aliases)) {
    assertNamespacedId(aliasId, "asset alias id");
    assertNamespacedId(targetId, `asset alias ${aliasId} target`);

    if (assetMap.has(aliasId)) {
      throw manifestError(
        "ALIAS_SHADOWS_ASSET",
        `Alias ${aliasId} conflicts with an active asset id.`
      );
    }

    validateAssetReference(assetMap, targetId, aliasId, "alias");
  }

  void tagSet;
}

function validateAssetReference(assetMap, targetId, ownerId, referenceType) {
  const target = assetMap.get(targetId);

  if (!target) {
    throw manifestError(
      "MISSING_ASSET_REFERENCE",
      `${referenceType} on ${ownerId} references missing asset ${targetId}.`
    );
  }

  if (targetId === ownerId) {
    throw manifestError(
      "SELF_ASSET_REFERENCE",
      `${referenceType} on ${ownerId} cannot reference itself.`
    );
  }

  return target;
}

function validateVocabulary(values, kind) {
  const result = new Set();

  for (const value of values) {
    assertNamespacedId(value, `${kind} vocabulary entry`);

    if (result.has(value)) {
      throw manifestError(
        "DUPLICATE_VOCABULARY_ENTRY",
        `${kind} ${value} appears more than once.`
      );
    }

    result.add(value);
  }

  return result;
}

function validateControlledValues(values, vocabulary, kind, ownerId) {
  for (const value of values) {
    if (!vocabulary.has(value)) {
      throw manifestError(
        "UNCONTROLLED_VOCABULARY_VALUE",
        `${ownerId} uses uncontrolled ${kind} ${value}.`
      );
    }
  }
}

function detectPackageCycles(packageMap) {
  const visiting = new Set();
  const visited = new Set();

  function visit(packageId) {
    if (visiting.has(packageId)) {
      throw manifestError(
        "CYCLIC_PACKAGE_DEPENDENCY",
        `Asset package dependency cycle includes ${packageId}.`
      );
    }

    if (visited.has(packageId)) {
      return;
    }

    visiting.add(packageId);

    for (const dependencyId of packageMap.get(packageId).dependencies) {
      visit(dependencyId);
    }

    visiting.delete(packageId);
    visited.add(packageId);
  }

  for (const packageId of packageMap.keys()) {
    visit(packageId);
  }
}

function assertNamespacedId(value, fieldName) {
  assertStableId(value, fieldName);

  if (!value.includes(".")) {
    throw manifestError(
      "ID_NOT_NAMESPACED",
      `${fieldName} must contain a namespace.`
    );
  }
}

function assertArray(value, fieldName) {
  if (!Array.isArray(value)) {
    throw manifestError("INVALID_ARRAY", `${fieldName} must be an array.`);
  }
}

function validateUniqueValues(values, fieldName) {
  if (new Set(values).size !== values.length) {
    throw manifestError(
      "DUPLICATE_ARRAY_VALUE",
      `${fieldName} must not contain duplicate values.`
    );
  }
}

function assertRect(value, fieldName) {
  assertPlainRecord(value, fieldName);
  assertNonNegativeInteger(value.x, `${fieldName}.x`);
  assertNonNegativeInteger(value.y, `${fieldName}.y`);
  assertPositiveInteger(value.width, `${fieldName}.width`);
  assertPositiveInteger(value.height, `${fieldName}.height`);
}

function assertPoint(value, fieldName) {
  assertPlainRecord(value, fieldName);

  if (!Number.isFinite(value.x) || !Number.isFinite(value.y)) {
    throw manifestError(
      "INVALID_POINT",
      `${fieldName} coordinates must be finite numbers.`
    );
  }
}

function assertSize(value, fieldName) {
  assertPlainRecord(value, fieldName);
  assertPositiveNumber(value.width, `${fieldName}.width`);
  assertPositiveNumber(value.height, `${fieldName}.height`);
}

function assertPositiveNumber(value, fieldName) {
  if (!Number.isFinite(value) || value <= 0) {
    throw manifestError(
      "INVALID_POSITIVE_NUMBER",
      `${fieldName} must be a positive number.`
    );
  }
}

function assertInteger(value, fieldName) {
  if (!Number.isInteger(value)) {
    throw manifestError("INVALID_INTEGER", `${fieldName} must be an integer.`);
  }
}

function assertPositiveInteger(value, fieldName) {
  if (!Number.isInteger(value) || value < 1) {
    throw manifestError(
      "INVALID_POSITIVE_INTEGER",
      `${fieldName} must be a positive integer.`
    );
  }
}

function assertNonNegativeInteger(value, fieldName) {
  if (!Number.isInteger(value) || value < 0) {
    throw manifestError(
      "INVALID_NON_NEGATIVE_INTEGER",
      `${fieldName} must be a non-negative integer.`
    );
  }
}

function manifestError(code, message, options) {
  return new AssetManifestError(code, message, options);
}
