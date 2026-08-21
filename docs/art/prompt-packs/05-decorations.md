# D7 — dekorációs promptok v1

Állapot: `DONE` — `D7-OWN-001A`

## Family invariáns

- a dekor támogatja a hely történetét, nem versenyez a gameplay targettel;
- 1–3 nagy szerkezeti részlet, kevés mikrozaj;
- functional-looking prop csak valós role/interaction mellett tűnhet aktívnak;
- family variánsok skálája, anyaga és perspektívája azonos.

## `PROMPT.decoration.single-prop.v001`

```text
Create one original Readi World village decoration prop: {{SUBJECT}}, asset
{{ASSET_ID}}, variant {{VARIANT}}. Its narrative purpose is
{{NARRATIVE_PURPOSE}}. Use a clear mobile silhouette, one dominant mass and only
one to three structural details. Materials: {{MATERIALS}}. Declared draw size:
{{DRAW_SIZE_WU}}; footprint: {{FOOTPRINT_WU}}. It is
{{INTERACTION_STATUS}}, so its visual affordance must not imply a different
gameplay function.

Use warm cozy hand-painted storybook game art, natural matte handcrafted
materials, restrained saturation and soft dimensional volume. Use the fixed
orthographic-looking 55-degree three-quarter top-down view, zero yaw, no horizon
and neutral daylight with a soft upper-left key and small contact shadow.

Exactly one complete isolated prop on transparent or neutral background,
canvas {{OUTPUT_SIZE}}, safe padding {{SAFE_PADDING}}. No surrounding scene,
terrain patch, character, sparkle, text, label, UI, logo or watermark. Reference
intent: {{REFERENCE_ROLES}}.

Avoid photorealism, glossy generic 3D, excessive ornament, noisy tiny parts,
cropped base, floating object, wrong perspective, neon rarity glow, misleading
interaction affordance and a design copied from another game.
```

## `PROMPT.decoration.family-variant.v001`

```text
Using the attached accepted {{FAMILY_ID}} base prop as the strict scale,
material, camera and construction reference, create variant {{VARIANT}} for
{{ASSET_ID}}. Change only {{ALLOWED_VARIATION}}. Preserve the same family
silhouette logic, ground pivot, footprint class, palette, neutral light and
detail density. One isolated complete prop, canvas {{OUTPUT_SIZE}}, transparent
or neutral background. No scene, text, UI or watermark.

Avoid scale drift, new material family, changed gameplay affordance, added
interaction glow, different camera, different light and decorative overload.
```

## `PROMPT.decoration.cluster-preview.v001`

```text
Create a non-production composition preview showing how the already defined
Readi World props {{PROP_IDS}} could form a quiet cluster for
{{LOCATION_ROLE}}. Preserve each prop's identity and scale. Use only the declared
props; do not invent new interactable objects. Keep the walkable corridor and
target visibility described by {{SPACING_RULE}}. This output is layout
reference only, not a runtime sprite or new asset source. No text or UI.
```

## Kötelező proof

Normal-zoom silhouette, family scale montage, interaction-affordance review és
D3 corridor/density overlay.
