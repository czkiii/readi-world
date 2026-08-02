# Data contracts

No legacy gameplay definition is active in the clean baseline.

`assets-manifest.json` is the versioned activation root for visual assets.
The runtime never scans folders to discover content. Empty registries are
valid during P0; an asset becomes active only after its package, controlled
roles and tags, geometry, fallback references, and source URI all validate.

## Geometry schema v2

Asset manifest schema v2 makes gameplay geometry explicit. Coordinate spaces:

- `sourceRect`: source-image pixels;
- `pivot`: normalized coordinates inside `sourceRect`, each component `0..1`;
- `drawSize`: full source canvas size in world units, including transparent
  padding;
- `logicalFootprint`, `interactionAnchor`, and `occluderShape`: world-local
  units relative to the pivot, with `+x` east/right and `+y` south/down.

`logicalFootprint` and `occluderShape` support `none`, `rect`, `circle`, and
non-degenerate `polygon`. `interactionAnchor` is either explicit `none` or a
point plus positive interaction radius. These fields are required for every
active asset and are never inferred from alpha pixels, Photoshop guides, or the
file name.
