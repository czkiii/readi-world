# D7 — globális promptblokkok v1

Állapot: `DONE` — `D7-OWN-001A`

Pivot clarification: a v1 blokkokban a „preserve pivot” vizuális szándék. Exact
pixelpivotot csak a D6 normalizálás bizonyít. Új production futásnál az alábbi
v2 camera/output blokk ajánlott.

Ezek a blokkok angolul készültek, mert a képgenerátoroknál ez a legstabilabb
közös munkanyelv. A jelentésük a D4–D6 szerződésből származik.

## `GLOBAL_STYLE_v1`

```text
Create original production concept art for Readi World, a warm cozy
hand-painted storybook game world. Use clean readable silhouettes, soft
dimensional volume, natural handcrafted materials, restrained natural
saturation, large clear shapes with controlled medium detail, and mobile-game
readability without generic mobile-ad gloss. The mood is calm, welcoming and
grounded: a once-neglected place gradually becoming alive and personal through
the player's work. Use approximately 60% large clear mass, 30% structural
detail and no more than 10% fine texture. Keep the result visually consistent
with one cohesive original Readi World art direction.
```

## `CAMERA_GEOMETRY_D4_v1`

```text
Use an orthographic-looking three-quarter top-down game view with approximately
55 degrees visual elevation, zero yaw, north aligned to the top of the image,
no visible horizon and no perspective convergence. This is not a rotated
diamond-isometric grid and not an eye-level view. Preserve the declared world
scale, footprint, south-facing ground access and ground-contact pivot. Do not
crop the ground contact or required safe padding.
```

## `CAMERA_GEOMETRY_D4_v2`

```text
Use an orthographic-looking three-quarter top-down game view with approximately
55 degrees visual elevation, zero yaw, north aligned to the top of the image,
no visible horizon and no perspective convergence. This is not a rotated
diamond-isometric grid and not an eye-level view. Preserve the declared world
scale and keep the complete ground-contact region clearly visible with enough
clean padding for later exact pivot alignment. Do not claim or draw a technical
pivot marker; the exact pixel and normalized pivot will be established during
the D6 normalization step.
```

## `LIGHTING_NEUTRAL_D5_v1`

```text
Use a neutral daylight production master with a very gentle warm bias, a soft
upper-left key light, subtle local ambient occlusion and a small grounded
contact shadow. Do not bake a strong morning, sunset, night or weather tint into
the persistent asset. Do not paint long irreversible cast shadows. Windows,
lamps, fire or magical glow must be separable optional emissive elements.
```

## `OUTPUT_ISOLATED_RGBA_v1`

```text
Show exactly one complete isolated asset, centered on a clean transparent or
plain neutral background, with no surrounding scene, terrain patch, text,
labels, border, mockup, UI, watermark or logo. Include the entire silhouette,
ground-contact point and {{SAFE_PADDING}}. Target source canvas:
{{OUTPUT_SIZE}}. The final production source will be normalized to sRGB RGBA;
do not use a colored matte around transparent edges.
```

## `OUTPUT_ISOLATED_RGBA_v2`

```text
Show exactly one complete isolated asset, centered approximately as requested
on a clean transparent or plain neutral background, with no surrounding scene,
terrain patch, text, labels, border, mockup, UI, watermark or logo. Include the
entire silhouette and complete ground-contact region with {{SAFE_PADDING}}.
Target generation canvas: {{OUTPUT_SIZE}}. Do not render a pivot marker into the
artwork. Exact normalized canvas, alpha cleanup and pivot placement are external
Photoshop/D6 acceptance steps, not guarantees of image generation.
```

## `OUTPUT_IDENTITY_SHEET_v1`

```text
Create a clean production identity sheet on a plain neutral background. Keep
every view at exactly the same scale, proportions, materials, colors and design
identity. Separate views clearly, do not overlap them, do not add labels or
decorative presentation. This sheet is a design reference only; each accepted
gameplay view will later be produced and normalized as a separate asset.
```

## `OUTPUT_SEAMLESS_CANDIDATE_v1`

```text
Create a square tile candidate with no focal center, no border, no lighting
gradient and no unique landmark. Opposite edges should continue naturally in
both horizontal and vertical directions. Keep low-frequency value and color
distribution even. This is only a seamless candidate: final acceptance requires
an external four-edge and 3x3 repetition test.
```

## `OUTPUT_UI_CLEAN_v1`

```text
Create the visual asset only. Do not render words, numbers, generated glyphs,
icons that were not requested, device chrome, a full screen mockup or baked
localization. Preserve clean scalable edges and the declared 9-slice or icon
safe area on a transparent or plain neutral background.
```

## `NEGATIVE_GLOBAL_v1`

```text
Avoid neon, cyberpunk color, harsh pixel art, photorealism, PBR realism,
glossy generic 3D mobile-ad rendering, corporate vector clipart, casino UI,
extreme anime or chibi proportions, thick black outlines on every edge,
fisheye, eye-level perspective, a visible horizon, rotated diamond isometric
geometry, strong baked time-of-day color, long cast shadows, noisy microdetail,
plastic materials, floating ground contact, cropped silhouette, inconsistent
scale, text, letters, numbers, logos, signatures and watermarks. Do not imitate
the identifiable style or specific assets of another game or living artist.
```

## `QA_REMINDER_v1`

```text
Before finalizing, verify: one coherent subject; correct Readi World
three-quarter top-down projection; declared scale and full ground contact visible;
clear silhouette at mobile size; neutral master lighting; natural painted
materials; no forbidden text or watermark; no unrequested feature; and no
geometry drift from the supplied identity or state reference.
```

## Universal assembly template

```text
TASK
Create {{SUBJECT}} for asset {{ASSET_ID}}, state {{STATE}}, variant {{VARIANT}}.

[PASTE GLOBAL_STYLE_v1]
[PASTE CAMERA_GEOMETRY_D4_v2]
[PASTE LIGHTING_NEUTRAL_D5_v1]

FAMILY AND SUBJECT
{{FAMILY_BLOCK}}
The declared draw size is {{DRAW_SIZE_WU}}. {{SUBJECT_DETAILS}}
Reference intent: {{REFERENCE_ROLES}}.

[PASTE THE REQUIRED v2 OUTPUT BLOCK WHEN AVAILABLE]
[PASTE NEGATIVE_GLOBAL_v1]
Additional exclusions: {{SPECIAL_AVOID}}.
[PASTE QA_REMINDER_v1]
```
