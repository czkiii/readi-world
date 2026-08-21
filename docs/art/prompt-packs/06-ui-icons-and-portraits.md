# D7 — UI-panel-, ikon- és portrépromptok v1

Állapot: `DONE` — `D7-OWN-001A`

## Family invariáns

- deep-forest panel, parchment tartalom, moss border, warm-gold focus;
- bitmap szöveg, szám és lokalizáció tilos;
- funkcionális state nem csak színnel különbözik;
- UI panel 9-slice proof, ikon kis HUD-méret proof;
- portré identity az elfogadott karakterhez kötött.

## `PROMPT.ui.nine-slice-panel.v001`

```text
Create one clean scalable Readi World UI panel skin for {{PANEL_ROLE}}, asset
{{ASSET_ID}}. Use a dark deep-forest green base, a softly raised inner surface,
a restrained moss-colored border, warm parchment-compatible content area and a
small warm-gold focus accent only where declared. Corners are rounded and calm,
with subtle handcrafted storybook texture and a soft lower/inner shadow. Keep a
large quiet center for runtime content.

Design it as a true 9-slice candidate: four visually stable corners, horizontal
edges that can stretch only horizontally, vertical edges that can stretch only
vertically, and a quiet stretchable center. Declared fixed corner/inset:
{{SLICE_INSETS}}; minimum draw size {{MIN_DRAW_SIZE}}; source canvas
{{OUTPUT_SIZE}}.

Show only the isolated panel skin on transparent or plain neutral background.
Do not render words, letters, numbers, icons, buttons, inventory slots, full
screen mockups, device chrome, logo or watermark.

Avoid sci-fi glassmorphism, neon edge light, casino gloss, corporate vector
clipart, photoreal wood texture, ornate medieval filigree, high-contrast center,
asymmetric corners and details that cannot stretch. This is a 9-slice
candidate; final acceptance requires external stretch testing.
```

## `PROMPT.ui.icon.v001`

```text
Create one Readi World UI icon for semantic role {{ICON_ROLE}}, asset
{{ASSET_ID}}. Depict {{SUBJECT}} with one strong silhouette and no more than one
to three internal structural details. Use the same natural material identity as
the world object, simplified for clarity at {{TARGET_CSS_SIZE}} CSS pixels.
Use restrained natural color, soft painted volume, consistent upper-left light
and no enclosing badge unless {{BADGE_PROFILE}} explicitly requests one.

Center one complete icon inside {{OUTPUT_SIZE}} with {{SAFE_PADDING}}, on
transparent or plain neutral background. No text, number, count, label, UI
screen, border, logo or watermark.

Avoid tiny detail, photorealism, thick black outline, neon rarity glow, generic
emoji, mismatched perspective, multiple objects, cropped silhouette and meaning
that could be confused with {{CONFUSABLE_ICON}}. Locked/success/error variants
must also use a distinct shape marker, not color alone.
```

## `PROMPT.ui.portrait-cutout.v001`

```text
Using the attached accepted character identity as a strict source, create one
Readi World HUD portrait cutout for {{IDENTITY_ID}}, expression {{EXPRESSION}}.
Preserve exact face, hair silhouette, skin tone, outfit colors and identity
markers. Use warm hand-painted storybook rendering, clear eyes and expression,
soft neutral upper-left daylight and a clean silhouette suitable for a circular
or rounded mask.

Head and upper torso only, safely centered in {{OUTPUT_SIZE}} with
{{MASK_SAFE_AREA}}. Transparent or quiet neutral background as declared. Do not
add a frame, level, badge, name, text, number, UI mockup, logo or watermark.

Avoid identity drift, changed age, photoreal skin, plastic 3D, extreme anime or
chibi redesign, cropped hair and overly dramatic baked lighting.
```

## `PROMPT.ui.state-marker.v001`

```text
Create one small Readi World state marker for {{STATE_MEANING}}. Combine the
declared color token {{COLOR_TOKEN}} with a unique readable shape symbol
{{SHAPE_SYMBOL}} so meaning does not depend on color alone. Quiet painted UI
style, one silhouette, transparent background, canvas {{OUTPUT_SIZE}}. No text,
letters, numbers, glow, full button or watermark.
```

## Kötelező proof

9-slice stretch matrix, icon at target CSS size, colorblind/state-shape review,
portrait mask test és D2 panelállapotokhoz illesztés.
