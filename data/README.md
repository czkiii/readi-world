# Data contracts

No legacy gameplay definition is active in the clean baseline.

`assets-manifest.json` is the versioned activation root for visual assets.
The runtime never scans folders to discover content. Empty registries are
valid during P0; an asset becomes active only after its package, controlled
roles and tags, geometry, fallback references, and source URI all validate.
