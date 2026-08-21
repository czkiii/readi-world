# D7 — épület- és fejlődési állapot promptok v1

Állapot: `DONE` — `D7-OWN-001A`

## Family invariáns

- előbb egy stabil building identity/base master készül;
- ruined/restoring/restored ugyanazt a footprintet, déli entrance-t, tetőformát
  és ground pivotot tartja;
- state lehetőleg base master szerkesztése, nem három független generálás;
- romos nem felismerhetetlen törmelék, restored nem palota.

## `PROMPT.building.identity-base.v001`

```text
Create the canonical exterior identity for the Readi World building
{{BUILDING_NAME}}, asset family {{FAMILY_ID}}, functional role {{ROLE}}. It is a
practical handcrafted village structure made from {{MATERIALS}}, with
{{SILHOUETTE_DESCRIPTION}} and a clearly readable south-facing entrance. The
logical footprint is {{FOOTPRINT_WU}}, declared draw size {{DRAW_SIZE_WU}}.
Preserve clear working space around the entrance and do not add an interior.

Use warm cozy hand-painted storybook game art, stable large masses, controlled
structural detail, natural matte materials, slight handcrafted asymmetry and a
clean mobile silhouette. Use an orthographic-looking three-quarter top-down
view at approximately 55 degrees visual elevation, zero yaw, no horizon and no
perspective convergence. Use neutral daylight with soft upper-left key light,
subtle local occlusion and a small separable contact shadow.

Show exactly one complete isolated building, centered on transparent or plain
neutral background, source canvas {{OUTPUT_SIZE}}, safe padding
{{SAFE_PADDING}}. No surrounding terrain, path, trees, character, sign text,
UI, border, logo or watermark. Reference intent: {{REFERENCE_ROLES}}.

Avoid eye-level architecture, rotated diamond isometric view, cropped roof or
entrance, fantasy palace scale, photoreal/PBR materials, glossy generic 3D,
thick black outline, baked sunset/night light, unreadable doorway, floating
foundation and resemblance to another game's specific building.
```

## `PROMPT.building.restoration-state.v001`

Az elfogadott base mastert kötelező képi inputként add át.

```text
Edit the attached accepted {{BUILDING_NAME}} identity master into the
{{TARGET_STATE}} state for asset {{ASSET_ID}}. Preserve exactly the same canvas,
projection, building scale, footprint, foundation, south-facing entrance,
roof silhouette, ground-contact pivot and core architectural identity. This
must clearly remain the same building at another restoration state.

State direction: {{STATE_DESCRIPTION}}.
Keep: {{MUST_KEEP}}.
Change only: {{ALLOWED_CHANGES}}.
Do not add: {{FORBIDDEN_CHANGES}}.

Use the same Readi World warm hand-painted storybook material treatment and
neutral soft upper-left daylight as the supplied master. Show one complete
isolated building on transparent or neutral background with identical safe
padding. No terrain scene, character, text, UI, logo or watermark.

Avoid geometry drift, a different roof pitch, moved doorway, changed footprint,
changed camera, changed scale, unrelated annex, heavy baked light, excessive
debris, identity loss and a full redesign. A ruined state must stay
recognizable; a restored state must feel repaired and alive, not transformed
into a palace.
```

### Állapotmezők

| State | `STATE_DESCRIPTION` kezdőszöveg |
|---|---|
| ruined | missing and weathered secondary elements, controlled damage, cool-neutral age, restrained overgrowth; core structure readable |
| restoring | partial repairs and limited scaffold/progress elements; obvious improvement without changing the building identity |
| restored | repaired structure, cleaner materials, one or two functional props and restrained warm life; no new tier or palace-scale extension |

## `PROMPT.building.emissive-layer.v001`

```text
Using the attached accepted building master as an exact geometry mask, create
only the optional emissive contribution for {{EMISSIVE_ROLE}}. Keep every
window, lamp or fire source aligned exactly to the master. Produce isolated
soft warm light shapes with controlled falloff; do not redraw the building,
ground, shadow, text or scene. Transparent or black review background as
declared by {{OUTPUT_PROFILE}}, canvas exactly {{OUTPUT_SIZE}}.

Avoid daylight repainting, large bloom, neon glow, changed window positions,
opaque background, hard-edged light cones and lighting areas with no source.
```

## Kötelező proof

State overlay/difference, azonos footprint/entrance/pivot, normal zoom state-
olvashatóság és ruined→restored golden comparison.
