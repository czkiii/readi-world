import {
  assertJsonValue,
  assertPlainRecord,
  assertStableId,
  deepFreeze
} from "../world-state/world-state-contract.js";
import { createValidatedAssetManifest } from "./asset-manifest.js";

const EXACT_REASONS = new Set(["authored-landmark", "animation-state"]);

export class AssetResolutionError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "AssetResolutionError";
    this.code = code;
  }
}

export function createAssetRegistry(rawManifest) {
  const manifest = createValidatedAssetManifest(rawManifest);
  const assetMap = new Map(manifest.assets.map((asset) => [asset.id, asset]));
  const roleSet = new Set(manifest.vocabulary.roles);
  const tagSet = new Set(manifest.vocabulary.tags);

  return Object.freeze({
    manifest,

    getById(assetId) {
      assertStableId(assetId, "asset id");
      const targetId = manifest.aliases[assetId] ?? assetId;
      return assetMap.get(targetId) ?? null;
    },

    resolve(request) {
      validateRequest(request, { roleSet, tagSet });
      const attempts = [];
      const warnings = [];

      if (request.exactId) {
        const aliasedId = manifest.aliases[request.exactId];
        const targetId = aliasedId ?? request.exactId;
        attempts.push({ kind: "exact", value: request.exactId });

        if (aliasedId) {
          warnings.push({
            code: "ASSET_ALIAS_USED",
            from: request.exactId,
            to: aliasedId
          });
        }

        const exactAsset = assetMap.get(targetId);

        if (exactAsset) {
          return resolution(
            "resolved",
            selectVariant(exactAsset, request.variantTags, assetMap),
            request,
            attempts,
            warnings
          );
        }
      }

      if (request.role) {
        attempts.push({
          kind: "semantic",
          value: request.role,
          tags: [...request.tags]
        });

        const candidates = manifest.assets
          .filter(
            (asset) =>
              asset.roles.includes(request.role) &&
              request.tags.every((tag) => asset.tags.includes(tag))
          )
          .sort((left, right) => {
            if (left.priority !== right.priority) {
              return right.priority - left.priority;
            }

            return left.id.localeCompare(right.id);
          });

        if (candidates.length > 0) {
          return resolution(
            "resolved",
            selectVariant(candidates[0], request.variantTags, assetMap),
            request,
            attempts,
            warnings
          );
        }

        for (const fallbackId of manifest.fallbackChains[request.role] ?? []) {
          attempts.push({ kind: "fallback", value: fallbackId });
          const fallbackAsset = assetMap.get(fallbackId);

          if (fallbackAsset) {
            warnings.push({
              code: "SEMANTIC_FALLBACK_USED",
              role: request.role,
              assetId: fallbackId
            });

            return resolution(
              "fallback",
              selectVariant(fallbackAsset, request.variantTags, assetMap),
              request,
              attempts,
              warnings
            );
          }
        }
      }

      return resolution("missing", null, request, attempts, [
        ...warnings,
        {
          code: "ASSET_NOT_RESOLVED",
          role: request.role ?? null,
          exactId: request.exactId ?? null
        }
      ]);
    }
  });
}

function selectVariant(asset, variantTags, assetMap) {
  const matchingVariants = asset.variants
    .filter((variant) =>
      variant.requiredTags.every((tag) => variantTags.includes(tag))
    )
    .sort((left, right) => {
      if (left.requiredTags.length !== right.requiredTags.length) {
        return right.requiredTags.length - left.requiredTags.length;
      }

      return left.id.localeCompare(right.id);
    });

  if (matchingVariants.length === 0) {
    return asset;
  }

  return assetMap.get(matchingVariants[0].assetId);
}

function validateRequest(request, { roleSet, tagSet }) {
  assertPlainRecord(request, "asset request");
  assertJsonValue(request, "asset request");

  const role = request.role ?? null;
  const exactId = request.exactId ?? null;
  const exactReason = request.exactReason ?? null;
  const tags = request.tags ?? [];
  const variantTags = request.variantTags ?? [];

  if (role === null && exactId === null) {
    throw resolutionError(
      "EMPTY_ASSET_REQUEST",
      "Asset request requires a semantic role or exact asset id."
    );
  }

  if (role !== null && !roleSet.has(role)) {
    throw resolutionError(
      "UNKNOWN_ASSET_ROLE",
      `Asset request uses uncontrolled role ${role}.`
    );
  }

  if (exactId !== null) {
    assertStableId(exactId, "exact asset id");

    if (!exactId.includes(".")) {
      throw resolutionError(
        "EXACT_ASSET_ID_NOT_NAMESPACED",
        "Exact asset id must contain a namespace."
      );
    }

    if (!EXACT_REASONS.has(exactReason)) {
      throw resolutionError(
        "EXACT_ASSET_REASON_REQUIRED",
        "Exact asset requests are limited to authored landmarks and animation states."
      );
    }
  } else if (exactReason !== null) {
    throw resolutionError(
      "UNUSED_EXACT_ASSET_REASON",
      "exactReason requires exactId."
    );
  }

  for (const [values, fieldName] of [
    [tags, "request tags"],
    [variantTags, "variant tags"]
  ]) {
    if (!Array.isArray(values)) {
      throw resolutionError(
        "INVALID_REQUEST_TAGS",
        `${fieldName} must be an array.`
      );
    }

    if (new Set(values).size !== values.length) {
      throw resolutionError(
        "DUPLICATE_REQUEST_TAG",
        `${fieldName} must not contain duplicates.`
      );
    }

    for (const tag of values) {
      if (!tagSet.has(tag)) {
        throw resolutionError(
          "UNKNOWN_ASSET_TAG",
          `Asset request uses uncontrolled tag ${tag}.`
        );
      }
    }
  }
}

function resolution(status, asset, request, attempts, warnings) {
  return deepFreeze({
    status,
    asset,
    diagnostics: {
      request: structuredClone(request),
      attempts,
      warnings
    }
  });
}

function resolutionError(code, message) {
  return new AssetResolutionError(code, message);
}
