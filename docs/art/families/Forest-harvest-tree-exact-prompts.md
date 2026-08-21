# Readi World — D8 harvest tree exact prompt pack v1

Frissítve: 2026-08-02  
Állapot: `OWNER REVIEW REQUIRED`  
Kapcsolt spec: `Forest-harvest-tree-family-spec.md`

## 1. Standing tree

Prompt ID: `PROMPT.environment.harvest-tree.v001`  
Asset ID: `world.tree.pine.harvestable.standard`

Az alábbi prompt a teljes ground-contact és padding szándékát rögzíti. Nem
bizonyít `(192,416)` pixelpivotot; ezt a Photoshop/D6 normalizálás állítja be.

```text
Create one original Readi World standard harvestable pine tree for asset
world.tree.pine.harvestable.standard, variant standard-a. It is a mature but not
monumental cozy pine with a broad, slightly irregular, layered and softly
rounded silhouette rather than a perfect Christmas-tree cone. Build the foliage
from one large canopy mass, four to six controlled medium clusters and very few
fine needle accents. Keep the lower warm-brown trunk clearly visible and
approachable from the south. The visible draw bounds are 4.5 world units wide
and 6.0 world units tall; the trunk collision footprint is a 1.15-world-unit
diameter circle centered on the trunk base.

Create original production concept art for Readi World, a warm cozy
hand-painted storybook game world. Use clean readable silhouettes, soft
dimensional volume, natural handcrafted materials, restrained natural
saturation, large clear shapes with controlled medium detail, and mobile-game
readability without generic mobile-ad gloss. Use approximately 60% large clear
mass, 30% structural detail and no more than 10% fine texture. Use deep forest,
pine and moss greens with small lichen highlights; use warm timber and dark wood
for the trunk.

Use an orthographic-looking three-quarter top-down game view with approximately
55 degrees visual elevation, zero yaw, north aligned to the top, no visible
horizon and no perspective convergence. This is not a rotated diamond-isometric
grid and not an eye-level view. Preserve a centered trunk-base ground pivot and
clear south approach.

Use a neutral daylight production master with a very gentle warm bias, a soft
upper-left key light, subtle local ambient occlusion and no long cast shadow.
Do not bake morning, sunset, night or weather tint into the tree. A contact
shadow will be authored separately.

Show exactly one complete isolated tree, centered on a clean transparent or
plain neutral background, with the full canopy, roots and ground-contact point
visible. Generation canvas: portrait 1024 by 1536. Leave generous clean padding
on every side. Do not include grass terrain, rocks, flowers, animals, character,
axe, scene, text, UI, border, watermark or logo.

Reference intent: REF-001 inspires natural forest silhouette and canopy rhythm;
REF-003 inspires controlled painted foliage richness; REF-005 matches warm
storybook material mood and mobile readability. Do not copy any exact tree,
scene layout, UI or generated detail from the references.

Avoid neon, harsh pixel art, photoreal leaves, PBR realism, glossy generic 3D
mobile-ad rendering, corporate vector clipart, sharp low-poly spikes, noisy
individual-needle texture, a hidden trunk, multiple trees, a perfect symmetrical
Christmas-tree cone, floating roots, cropped canopy, thick black outlines,
fisheye, eye-level perspective, visible horizon, rotated diamond isometric
geometry, strong baked sunset/night light, long shadow, text, letters, numbers,
logos, signatures and watermarks. Do not imitate another game's identifiable
tree or a living artist's style.

Before finalizing, verify one coherent tree, correct Readi World projection,
full trunk-base pivot, clear mobile silhouette, visible south approach, neutral
master light, natural painted materials and no unrequested scene element.
```

## 2. Matching stump edit

Prompt ID: `PROMPT.environment.tree-stump-edit.v001`  
Asset ID: `world.tree.pine.harvestable.standard.stump`

Az elfogadott és utómunkázott standing-tree mastert kötelezően csatolni kell.

```text
Using the attached accepted Readi World standing pine master
world.tree.pine.harvestable.standard as the strict species, trunk diameter,
bark, lighting and ground-pivot reference, create the matching harvested stump
state world.tree.pine.harvestable.standard.stump.

Preserve the exact trunk center and world-space ground-contact pivot. The stump
must clearly be the remains of this same tree. Target visible size: 1.2 world
units wide and 0.8 world units tall, with a 0.9-world-unit circular logical
footprint. Show a clean readable cut surface, restrained bark damage, a few
short root forms and a very small natural moss accent. Do not include large
scattered debris.

Use the same warm cozy hand-painted storybook material, deep wood and timber
palette, orthographic-looking 55-degree three-quarter top-down projection and
neutral soft upper-left daylight as the attached master. Do not redesign the
species or change the trunk thickness.

Show exactly one complete isolated stump on transparent or plain neutral
background, square generation canvas 1024 by 1024, with generous clean padding.
No terrain patch, regrown sapling, axe, character, chips, sparkle, text, UI,
border, logo or watermark. The contact shadow will be separate.

Avoid changing species, trunk diameter, bark language, pivot, scale, camera or
light; avoid a hollow fantasy stump, face-like pattern, photoreal wood, glossy
3D, thick black outline, floating roots, cropped base, strong time-of-day tint,
text and watermark.
```

## 3. Contact shadow authoring brief

Prompt ID: `PROMPT.effect.contact-shadow.v001`  
Asset ID: `world.shadow.tree.pine.harvestable.standard`

Elsődleges eljárás: Photoshopban kézzel vagy az `ART-TOOL-01` panellel készül,
nem szükséges AI-generálás.

```text
Create one isolated soft ground-contact shadow for the accepted Readi World
standard harvestable pine tree. Match a 1.45 by 0.55 world-unit soft footprint,
centered on the exact trunk-base pivot. Use a compact, soft-edged neutral dark
painted ellipse with slight organic irregularity and controlled low opacity. It
must ground the trunk without looking like a black stain or a long directional
cast shadow.

Show only the shadow contribution on transparent background. No tree, stump,
terrain, glow, text, border, logo or watermark. Avoid hard black edges, long
sunset direction, multiple light sources, colored shadow and blur extending far
beyond the declared footprint.
```

## 4. Normalizálási célok

| Output | Normalized canvas | Pivot |
|---|---:|---:|
| standing | `384×448 px` | `(192,416)` |
| stump | `128×96 px` | `(64,80)` |
| shadow | `128×64 px` | `(64,48)` |

A generátortól kapott pixelméret nem acceptance. Photoshopban a teljes
silhouette és pivot megőrzésével ezekre a normalized célokra kell rendezni.
Pivotjel nem kerül a képre; guide + geometry sidecar + passport tárolja.
