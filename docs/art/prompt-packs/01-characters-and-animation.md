# D7 — karakter- és animációpromptok v1

Állapot: `DONE` — `D7-OWN-001A`

## Family invariáns

- barátságos, enyhén stilizált, nem extrém chibi; fej a teljes magasság kb.
  25–30%-a;
- kéz, tool és láb/ground contact mobilméreten is olvasható;
- D4 szerint 8 displayed, 5 authored direction; tükrözés csak kompatibilis
  aszimmetriánál;
- minden gameplay frame azonos skálát, testarányt és ground pivotot tart;
- identity sheet referencia, nem automatikusan használható spritesheet.

## `PROMPT.character.identity-sheet.v001`

```text
Create an original production identity sheet for the Readi World player
character {{CHARACTER_NAME}}, identity ID {{IDENTITY_ID}}. The character is a
friendly, practical young village restorer and forest worker with
{{BODY_SHAPE}}, {{SKIN_TONE}}, {{HAIR_DESCRIPTION}}, {{OUTFIT_DESCRIPTION}} and
{{IDENTITY_MARKERS}}. Keep the head approximately 25–30 percent of total body
height, with readable hands, boots and tool grip, slightly stylized but not
extreme chibi or anime.

Use warm cozy hand-painted storybook game art, clean readable silhouettes, soft
dimensional volume, natural handcrafted cloth, leather and wood, restrained
natural saturation, 60% large forms, 30% structural detail and no more than 10%
fine texture. Use a neutral daylight production master with a soft upper-left
key light and no baked time-of-day tint.

Show five clearly separated authored gameplay directions at identical scale:
south, south-east, east, north-east and north. Use an orthographic-looking
three-quarter top-down game view with approximately 55 degrees visual
elevation, zero yaw, no horizon and no perspective convergence. Every view must
preserve exactly the same face, hair silhouette, clothing construction, colors,
body proportions and ground-contact pivot.

Create a clean identity sheet on a plain neutral background. Do not overlap the
views and do not add labels, text, a decorative border, UI, scenery, watermark
or logo. This is a design reference; accepted gameplay directions will be
produced separately. Reference intent: {{REFERENCE_ROLES}}.

Avoid photorealism, glossy 3D mobile-ad rendering, extreme anime/chibi anatomy,
thick black outlines, different outfits between directions, changing hair,
extra fingers, merged hands, inconsistent tools, floating feet, cropped boots,
eye-level or diamond-isometric view, strong sunset/night light, text and
watermarks. Do not imitate another game's character or a living artist's style.
```

## `PROMPT.character.gameplay-direction.v001`

Használd az elfogadott identity mastert kötelező képi inputként.

```text
Using the attached accepted Readi World character identity as the strict design
source, create one isolated gameplay sprite for {{ASSET_ID}} facing {{FACING}}
in state {{STATE}}. Preserve exactly the same identity, proportions, hair,
outfit construction, palette and handed details. Do not redesign the character.

Use an orthographic-looking 55-degree three-quarter top-down game view, zero
yaw, no horizon and no perspective convergence. The declared draw size is
{{DRAW_SIZE_WU}} at the D4 scale. Show the full body and boots with the precise
ground-contact pivot and {{SAFE_PADDING}}. Use warm cozy hand-painted storybook
art, clean mobile silhouette, soft dimensional volume, neutral daylight, soft
upper-left key light and a small separate-looking contact shadow.

Exactly one character, centered, isolated on transparent or plain neutral
background, source canvas {{OUTPUT_SIZE}}. No scene, prop unless declared,
text, UI, label, border, watermark or logo.

Avoid identity drift, different body height, changed costume, mirrored
asymmetry, extra limbs or fingers, hidden hands, cropped feet, floating pose,
motion blur, photorealism, glossy 3D, heavy outline, eye-level perspective,
baked sunset/night tint and noisy microdetail.
```

## `PROMPT.character.animation-key-pose.v001`

```text
Using the attached accepted identity and accepted {{FACING}} idle sprite as
strict references, create one isolated animation key pose for {{ACTION}} at
phase {{PHASE_DESCRIPTION}}. Preserve the same canvas, character scale,
ground-contact pivot, facing, outfit, tool design and silhouette family. Move
only the body parts required by the action. Keep the tool path and hands clearly
readable at mobile size. The feet may shift only according to
{{FOOT_PLANT_RULE}}; do not move the world-space pivot.

Use the Readi World warm hand-painted storybook style, orthographic-looking
55-degree three-quarter top-down view and neutral upper-left daylight. Exactly
one full character on a clean transparent or neutral background, canvas
{{OUTPUT_SIZE}}, safe padding {{SAFE_PADDING}}. No labels, arrows, ghost frames,
scene, UI, text or watermark.

Avoid redesigning the character, camera drift, scale pumping, changing limb
length, changing tool size, floating feet, extra fingers, motion blur, baked
effects, eye-level view and a multi-frame sprite sheet. Generate one key pose
only; sequence consistency will be checked externally.
```

## `PROMPT.character.portrait.v001`

```text
Using the attached accepted Readi World character identity, create a friendly
head-and-upper-torso portrait for {{IDENTITY_ID}}, expression {{EXPRESSION}}.
Preserve the exact hair silhouette, face identity, skin tone, outfit colors and
identity markers. Use a slightly closer storybook painted treatment with clear
eyes and expression, but keep the same character rather than inventing a
realistic or anime redesign. Neutral warm daylight, soft upper-left key, simple
quiet background or transparent cutout as declared by {{OUTPUT_PROFILE}}.

Compose safely inside {{OUTPUT_SIZE}} with room for a circular or rounded HUD
mask. No frame, text, level number, badge, UI mockup, logo or watermark. Avoid
photoreal skin, plastic 3D, extreme chibi/anime, changed age, changed outfit,
cropped hair and identity drift.
```

## Kötelező proof

Identity overlay, öt authored direction azonos skálán, frame-to-frame pivot,
normal zoom silhouette és legalább egy rövid animation timing proof.
