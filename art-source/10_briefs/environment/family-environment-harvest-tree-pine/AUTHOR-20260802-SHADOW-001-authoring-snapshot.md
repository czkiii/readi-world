# AUTHOR-20260802-SHADOW-001 — contact shadow

- Asset ID: `world.shadow.tree.pine.harvestable.standard`
- Method: deterministic local raster authoring; no ImageGen
- Canvas: `128×64`
- Pivot: `(64,48)`
- Visible target: approximately `1.45×0.55 WU`
- Material: soft neutral dark, straight alpha
- Runtime activation: `NOT_AUTHORIZED`

The source is generated reproducibly by
`tools/art-pipeline/generate-contact-shadow.py`. It uses layered soft ellipses and
subtle asymmetry, with no long cast direction, terrain, tree, text or baked light.

