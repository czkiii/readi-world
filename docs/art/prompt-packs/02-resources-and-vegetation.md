# D7 — fa-, kő- és gyűjthető resource promptok v1

Állapot: `DONE` — `D7-OWN-001A`

## Family invariáns

- nagy lomb-/kőtömeg, közepes cluster, kevés finom részlet;
- harvest tree megközelíthető törzse és pivotja tiszta;
- boundary foliage nem tűnhet harvest node-nak;
- stump ugyanazon trunk pivotot tartja;
- pickup kicsiben felismerhető, neon nélkül.

## `PROMPT.environment.harvest-tree.v001`

```text
Create one original Readi World harvestable {{TREE_SPECIES}} tree for asset
{{ASSET_ID}}, variant {{VARIANT}}. Give it a distinctive readable silhouette:
{{SILHOUETTE_DESCRIPTION}}. Build the foliage from one large canopy mass,
several controlled medium clusters and very few fine leaf accents. The trunk
must remain clearly visible and approachable from the south, with a stable
ground-contact pivot and logical footprint {{FOOTPRINT_WU}}. Declared draw size:
{{DRAW_SIZE_WU}}.

Use warm cozy hand-painted storybook game art, natural restrained pine/moss
greens, softly rounded organic forms, painted bark and foliage, clean mobile
readability and no plastic gloss. Use an orthographic-looking three-quarter
top-down view at approximately 55 degrees visual elevation, zero yaw, no horizon
and no perspective convergence. Use neutral daylight with a soft upper-left key
light, subtle local occlusion and a small separable contact shadow.

Exactly one complete isolated tree, centered on transparent or plain neutral
background, source canvas {{OUTPUT_SIZE}}, safe padding {{SAFE_PADDING}}. Do not
include grass terrain, rocks, flowers, animals, text, UI, border, watermark or
logo. Reference intent: {{REFERENCE_ROLES}}.

Avoid photoreal leaves, noisy individual-leaf texture, low-poly spikes, a hidden
trunk, multiple trees, floating roots, cropped canopy, eye-level or rotated
isometric view, strong sunset/night tint, neon highlight, thick black outline
and another game's identifiable tree design. {{SPECIAL_AVOID}}
```

## `PROMPT.environment.tree-stump-edit.v001`

```text
Using the attached accepted standing-tree master as the strict species,
diameter, bark and pivot reference, create the matching harvested stump state
for {{ASSET_ID}}. Preserve the exact trunk center and ground-contact pivot.
Show a clean readable cut surface, a small amount of natural bark damage and no
large scattered scene debris. Keep the same Readi World painted material,
55-degree three-quarter top-down projection and neutral upper-left daylight.

One isolated stump on transparent or neutral background, full safe padding,
canvas {{OUTPUT_SIZE}}. No terrain patch, regrown sapling, axe, character, text,
UI or watermark. Avoid changing species, trunk diameter, pivot, scale or light.
```

## `PROMPT.environment.loose-pickup.v001`

```text
Create one small collectible {{RESOURCE_OBJECT}} for Readi World, asset
{{ASSET_ID}}, variant {{VARIANT}}. Make the silhouette immediately recognizable
at mobile gameplay size without glow: {{SHAPE_DESCRIPTION}}. Use painted natural
{{MATERIALS}}, one dominant shape and one or two structural details only.

Use the Readi World warm hand-painted storybook style, orthographic-looking
55-degree three-quarter top-down view and neutral soft upper-left daylight. The
declared draw size is {{DRAW_SIZE_WU}}. Show one complete object, grounded and
isolated on transparent or neutral background, canvas {{OUTPUT_SIZE}}, with
{{SAFE_PADDING}}. No terrain, sparkle, label, count, UI, text, logo or watermark.

Avoid neon pickup glow, treasure rarity effects, excessive tiny fragments,
photorealism, glossy plastic, floating object, wrong perspective and silhouette
too similar to {{CONFUSABLE_OBJECT}}.
```

## `PROMPT.environment.rock-node.v001`

```text
Create one Readi World {{ROCK_ROLE}} rock formation for {{ASSET_ID}}, variant
{{VARIANT}}. Use a grounded blocky mass with softly rounded large planes,
{{STONE_COLOR_DESCRIPTION}}, subtle age and optional restrained moss. Preserve
a clear footprint {{FOOTPRINT_WU}} and declared draw size {{DRAW_SIZE_WU}}.

Warm hand-painted storybook rendering, clean mobile silhouette,
orthographic-looking 55-degree three-quarter top-down view, neutral upper-left
daylight and small contact shadow. One isolated complete formation on
transparent or neutral background, canvas {{OUTPUT_SIZE}}. No ground patch,
crystals unless explicitly requested, mine entrance, text, UI or watermark.

Avoid sharp low-poly facets, fantasy crystal spikes, photoreal stone noise,
multiple unrelated boulders, floating base, cropped silhouette and scale drift.
```

## Kötelező proof

Standing/stump pivot overlay, south approach readability, family silhouette
contact sheet, pickup normal-zoom teszt és collision/footprint vizualizáció.
