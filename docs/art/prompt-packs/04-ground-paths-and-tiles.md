# D7 — ground-, út- és seamless promptok v1

Állapot: `DONE` — `D7-OWN-001A`

## Family invariáns

- ground alacsony kontrasztú háttér, nem gameplay-fókusz;
- nincs egyedi center, vignette, világítási gradiens vagy ismétlődő virágbélyeg;
- az AI „seamless” állítása csak jelöltet ad; acceptance mindig külső 3×3 proof;
- path világosabb, természetesen kopott gerinc, nem sárga tutorial csík.

## `PROMPT.ground.seamless-base.v001`

```text
Create a square seamless candidate for the Readi World ground material
{{MATERIAL_NAME}}, asset {{ASSET_ID}}. The surface is {{SURFACE_DESCRIPTION}},
using restrained natural colors from {{PALETTE_DESCRIPTION}}. Build it from
quiet low-frequency painted variation, a few medium natural patches and almost
no high-contrast microdetail. It must support clear characters, resources and
paths above it rather than becoming the focal point.

Use warm cozy hand-painted storybook material art viewed as an
orthographic-looking 55-degree three-quarter top-down ground plane. Use neutral
even daylight with no directional cast shadow, no vignette and no time-of-day
tint. Opposite edges should continue naturally in both horizontal and vertical
directions. Keep color, value and detail density evenly distributed with no
focal center and no unique landmark.

Square source canvas {{OUTPUT_SIZE}}. Fill the entire canvas; no transparent
border, frame, labels, grid, preview mockup, character, object, path, text, logo
or watermark. Reference intent: {{REFERENCE_ROLES}}.

Avoid visible seams, border darkening, central spotlight, repeating flower or
stone stamps, large unique crack, perspective horizon, photoreal texture noise,
plastic 3D, directional sunset shadow and high-contrast clutter.

This is only a seamless candidate. Do not claim technical success; final
acceptance requires external four-edge inspection and a 3x3 repetition test at
native, minimum, normal and maximum gameplay zoom.
```

## `PROMPT.ground.transition-overlay.v001`

```text
Create one isolated organic transition overlay from {{MATERIAL_A}} to
{{MATERIAL_B}} for Readi World, shape role {{EDGE_ROLE}}. Preserve the exact
ground projection and scale. The transition edge should use soft irregular
grass, soil, pebble or leaf clusters appropriate to {{EDGE_DESCRIPTION}}, with
large readable rhythm and no repeating comb pattern.

Warm hand-painted storybook treatment, neutral even daylight, transparent
background outside the transition contribution, canvas {{OUTPUT_SIZE}}. No
complete terrain scene, path, object, text, grid or watermark. Avoid a straight
hard border, noisy individual blades, lighting gradient and opaque matte fringe.
```

## `PROMPT.ground.path-module.v001`

```text
Create one Readi World worn village path module for {{ASSET_ID}}, module shape
{{MODULE_SHAPE}} and declared world width {{PATH_WIDTH_WU}}. The path is a
subtle naturally worn route of {{MATERIALS}}, slightly lighter or value-separated
from the surrounding ground, with organic edges and a clear walkable center.
Keep all connection edges aligned to {{CONNECTION_CONTRACT}}.

Use hand-painted cozy storybook material art in the fixed 55-degree top-down
ground projection with neutral even daylight. Isolate the path contribution on
transparent background or the declared base ground {{BASE_PROFILE}}, canvas
{{OUTPUT_SIZE}}. No signs, footprints that imply a character, props, flowers as
a focal marker, text or watermark.

Avoid a bright yellow tutorial stripe, hard rectangular edge, unique center
landmark, strong cast shadow, photoreal gravel noise, inconsistent width and
connections that do not tile with the family.
```

## `PROMPT.ground.variation-patch.v001`

```text
Create one subtle Readi World variation patch for {{BASE_MATERIAL}}, variant
{{VARIANT}}: {{PATCH_DESCRIPTION}}. It must break repetition without changing
collision, walkability, material identity or gameplay meaning. Low contrast,
small coverage, neutral light, transparent outside the painted contribution,
canvas {{OUTPUT_SIZE}}. No unique landmark, resource, interactable object, text
or watermark.
```

## Kötelező proof

4-edge inspection, 3×3 repeat, min/normal/max zoom, path connection montage,
transition alpha fringe és detail-frequency review.
