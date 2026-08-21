# D7 — effekt-, árnyék- és részecskepromptok v1

Állapot: `DONE` — `D7-OWN-001A`

## Family invariáns

- rövid, puha, kevés nagyobb és olvasható elem;
- nem takar targetet, collisiont vagy utat;
- Reduced Motion variáns ugyanazt az információt megtartja;
- kontaktárnyék külön role, nem beégetett hosszú cast shadow;
- sequence frame-ek külön validált képek, nem vakon elfogadott AI-spritesheet.

## `PROMPT.effect.contact-shadow.v001`

```text
Create one isolated soft ground-contact shadow for Readi World asset
{{PARENT_ASSET_ID}}, shadow role {{SHADOW_ROLE}}. Match the declared footprint
{{FOOTPRINT_WU}} and ground pivot exactly. Use a compact soft-edged neutral dark
shape with subtle irregularity and controlled opacity, suitable for a
three-quarter top-down object under neutral upper-left daylight. The shadow
must ground the object without looking like a black stain or a long directional
cast shadow.

Show only the shadow contribution on transparent background, canvas exactly
{{OUTPUT_SIZE}}, aligned to {{PIVOT_COORDINATE}}. No object, terrain, glow, text,
border, logo or watermark.

Avoid hard black edges, long sunset direction, multiple light sources, ambient
full-canvas darkening, colored shadow, blur beyond the footprint and changed
pivot.
```

## `PROMPT.effect.work-hit-frame.v001`

```text
Create one isolated Readi World {{MATERIAL}} work-hit effect key frame for
{{ACTION}}, phase {{PHASE_DESCRIPTION}}. Use only 2–5 larger readable particles
such as {{PARTICLE_TYPES}}, arranged in a short soft arc around
{{IMPACT_ANCHOR}}. Warm hand-painted storybook effect treatment, restrained
brightness, neutral master color and clear mobile silhouette.

Transparent background, canvas {{OUTPUT_SIZE}}, full effect inside safe padding.
No character, tool, target object, scene, text, UI, logo or watermark. Avoid a
particle cloud, explosion, fireworks, neon magic, screen-filling flash, motion
blur that hides shape and tiny noisy fragments. Generate one key frame only;
sequence timing and pivot are validated externally.
```

## `PROMPT.effect.pickup.v001`

```text
Create one brief Readi World pickup feedback key frame for {{RESOURCE_TYPE}},
phase {{PHASE_DESCRIPTION}}. Use a restrained upward curved motion suggestion
with {{PARTICLE_DESCRIPTION}}, one small warm highlight and no rarity beam. It
must confirm collection without covering the character or environment.
Transparent background, canvas {{OUTPUT_SIZE}}, effect anchored at
{{ANCHOR}}. No resource icon, number, text, UI, scene, logo or watermark.

Avoid loot explosion, neon glow, confetti, coins unless the resource is coin,
screen flash, long trail and dense micro-particles.
```

## `PROMPT.effect.restoration-milestone.v001`

```text
Create one isolated Readi World restoration milestone effect layer for
{{LANDMARK_ID}}, phase {{PHASE_DESCRIPTION}}. Use a calm warm light sweep,
restrained dust or leaf movement and a few readable particles that communicate
repair and new life. Preserve visibility of the building silhouette and path;
the effect must feel earned and cozy, not magical combat or casino reward.

Transparent background, canvas and anchor exactly matching
{{BUILDING_CANVAS_AND_PIVOT}}. No building repaint, character, text, banner,
coins, UI, logo or watermark. Avoid explosion, fireworks, confetti, large bloom,
camera shake implication, neon and full-screen opacity.
```

## `PROMPT.effect.reduced-motion-variant.v001`

```text
Using the accepted {{EFFECT_ID}} as meaning reference, create a Reduced Motion
variant that preserves the same feedback with substantially less travel and
fewer particles. Use a short local highlight or compact fade around
{{ANCHOR}}, no sweeping arc, no camera motion and no information loss.
Transparent background, same canvas and pivot. Do not redesign the semantic
color or timing role.
```

## Kötelező proof

Anchor overlay, frame sequence timing, overdraw/visibility screenshot, Reduced
Motion comparison és atlasz/memóriabudget.
