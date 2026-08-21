# Readi World — D8 forest harvest tree family specification v1

Frissítve: 2026-08-02  
Állapot: `OWNER APPROVED` — `D8-OWN-001A`, 2026-08-02  
Family ID: `family.environment.harvest-tree.pine`  
Spec version: `1`

## 1. Miért ez az első production family?

A standard harvestable pine tree az első vertical slice egyik legkorábban
használt nagy gameplay-objektuma. Egyetlen kis familyben bizonyítja:

- a D4 perspektívát, WU/APU skálát, pivotot és occlusiont;
- a D5 foliage-, anyag-, fény- és silhouette-irányt;
- a D6 master/normalized/export/passport/report folyamatot;
- a D7 exact prompt- és run-log rendszert;
- az available → stump állapotazonosságot;
- a mobil zoomon való olvashatóságot és textúramemória-mérést.

Nem azért első, mert a legkönnyebb kép, hanem mert kis scope mellett sok
kockázatot tesztel, és azonnal látható gameplayértéket ad.

## 2. Scope contract

### Egyetlen cél

Egyetlen standard, kivágható Readi World-fenyő production familyje álló,
matching stump és külön contact-shadow exporttal, még runtime-integráció nélkül.

### Módosítható a későbbi gyártási körben

- e family `art-source/` brief-, master-, normalized- és review-fájljai;
- a három asset passportja és egy family report;
- kizárólag az elfogadott D8 outputok.

### Védett

- `runtime/` a külön I4 csomagig;
- más assetcsalád, ground, karakter, épület, UI és effekt;
- D1–D7 szerződések;
- referenciafotók eredeti bináris fájljai.

### Nem része

- további három P1 tree variant;
- boundary tree, young tree, lombhullató fa vagy szezon;
- favágó animáció, fejsze, forgácseffekt, hang vagy respawnbalansz;
- atlasz és runtime manifestmódosítás;
- automatikus Photoshop-eszköz implementációja.

## 3. Family inventory

| Asset ID | Szerep | State | Kötelező output |
|---|---|---|---|
| `world.tree.pine.harvestable.standard` | álló, valid harvest target | `available/reserved` | 1 normalized PNG + 1 runtime WebP candidate |
| `world.tree.pine.harvestable.standard.stump` | ugyanazon node depleted képe | `depleted` | 1 normalized PNG + 1 runtime WebP candidate |
| `world.shadow.tree.pine.harvestable.standard` | külön ground contact | prezentáció | 1 normalized PNG + 1 runtime WebP/PNG candidate |

`reserved` nem új sprite: ugyanaz az álló fa kap runtime target/progress
feedbacket. Respawnkor a logikai node visszaoldja az álló Asset ID-t.

## 4. Package, role és tag javaslat

```text
packageId: package.p1.forest.core

roles:
  world.resource.tree.harvestable
  world.resource.tree.stump
  world.shadow.contact

tags:
  biome.forest
  species.pine
  material.wood
  state.standing
  state.depleted
  variant.standard
  milestone.p1
```

A role/tag vocabulary csak az I4 manifestcsomagban aktiválható. Gameplay
elsődlegesen role/tag alapján kér assetet; konkrét ID a stabil tree state-
kapcsolathoz és exact stump párhoz használható.

## 5. Art identity

### Silhouette

- érett, de nem monumentális cozy pine;
- szélesebb, enyhén szabálytalan, rétegzett és lekerekített canopy;
- egy nagy lombtömeg, 4–6 közepes cluster, kevés tűlevél-accent;
- az alsó lomb nem rejti el teljesen a melegbarna törzset;
- délről tiszta megközelítés;
- nem tökéletes karácsonyfa-kúp és nem éles low-poly fenyő.

### Anyag és paletta

- fő lomb: `RW-PINE`, `RW-MOSS`, kis `RW-LICHEN` highlight;
- mélység: `RW-DEEP-FOREST`, de nem fekete lyuk;
- törzs: `RW-TIMBER` és `RW-DARK-WOOD`;
- visszafogott moss a gyökérnél megengedett;
- D5 semleges, enyhén meleg masterfény; puha upper-left key;
- hosszú cast shadow nincs a tree sprite-ban.

### Referenciaszerep

```text
REF-001 INSPIRE: natural forest silhouette, canopy rhythm and cozy spacing
REF-003 INSPIRE: painted foliage richness at controlled density
REF-005 MATCH: warm storybook material mood and mobile readability
AVOID: copying any exact tree, scene layout, UI or generated detail
```

## 6. Pontos geometria

Az alábbi értékek **normalized output targetek**, nem a képgenerátor által
garantált koordináták. A generált képen a teljes ground contactnak látszania
kell; Photoshopban a D6 pivotlánc szerint kerül exact canvasra és sidecarba.

### Standing tree

| Mező | Érték |
|---|---:|
| visible draw bounds | `4.5 × 6.0 WU` |
| source density | `64 px/WU` |
| visible target | kb. `288 × 384 px` |
| normalized canvas | `6.0 × 7.0 WU` = `384 × 448 px` |
| world pivot | trunk base center |
| canvas pivot | `(192, 416) px` = normalized `(0.5, 0.928571)` |
| top padding | `32 px` |
| side padding target | `48 px` |
| bottom padding | `32 px` |
| logical footprint | circle, diameter `1.15 WU`, radius `0.575 WU` |
| interaction approach | trunk pivottól `1.45 WU` kezdő radius |
| sort point | trunk base center |

### Matching stump

| Mező | Érték |
|---|---:|
| visible draw bounds | `1.2 × 0.8 WU` ≈ `77 × 51 px` |
| normalized canvas | `2.0 × 1.5 WU` = `128 × 96 px` |
| world pivot | az álló fa azonos trunk center pontja |
| canvas pivot | `(64, 80) px` = normalized `(0.5, 0.833333)` |
| logical footprint | circle, diameter `0.9 WU` |
| interaction | depleted state-ben nincs axe-work; role szerint inspect később |

### Contact shadow

| Mező | Érték |
|---|---:|
| visible soft footprint | kb. `1.45 × 0.55 WU` |
| normalized canvas | `2.0 × 1.0 WU` = `128 × 64 px` |
| canvas pivot | `(64, 48) px` = normalized `(0.5, 0.75)` |
| alpha | soft neutral dark, straight alpha |
| collision/sort | nincs; a parent tree pivotjához kötött |

## 7. Occlusion és interaction contract

- a trunk collision kör nem követi a canopy alpháját;
- a canopy authored occluder shape-et kap az I4 metadata-kiterjesztésben;
- játékos takarásakor a canopy vagy teljes tree vizuális fade-je megengedett,
  World State/collision változás nélkül;
- target highlight/progress nem része a sprite-nak;
- axe selected + valid range = automatikus munka, külön ACT nélkül;
- stump state ugyanazon stabil tree node/Object ID-hoz tartozik.

### Lezárt integrációs rés

`D8-GAP-001`: a manifest geometry v2 implementációja PR #9-ben `177d542`
squash commitként mainre merge-elve és 50/50 tesztet teljesít. A v2 normalized
pivotot és world-local logical footprint/interaction/occluder mezőt validál.
Az I4-et már a D8 owner acceptance és a production asset hiánya tartja vissza.

## 8. Fájl- és mappaszerződés

```text
art-source/
  10_briefs/environment/family-environment-harvest-tree-pine/
  20_masters/environment/world-tree-pine-harvestable-standard/
  30_normalized/environment/world-tree-pine-harvestable-standard/
  40_review/environment/world-tree-pine-harvestable-standard/
```

```text
world-tree-pine-harvestable-standard__master-r001.psd
world-tree-pine-harvestable-standard__normalized-r001.png
world-tree-pine-harvestable-standard__runtime-e001.webp

world-tree-pine-harvestable-standard-stump__master-r001.psd
world-tree-pine-harvestable-standard-stump__normalized-r001.png
world-tree-pine-harvestable-standard-stump__runtime-e001.webp

world-shadow-tree-pine-harvestable-standard__master-r001.psd
world-shadow-tree-pine-harvestable-standard__normalized-r001.png
world-shadow-tree-pine-harvestable-standard__runtime-e001.webp
```

## 9. Generálási és utómunka-sorrend

1. exact standing-tree promptból legfeljebb 4 exploration candidate;
2. egyetlen candidate kiválasztása D5 quick score alapján;
3. Photoshop master: silhouette, alpha, trunk approach, anyag és fény korrekció;
4. D5 teljes art QA és owner approval a masterrevisionre;
5. matching stump az elfogadott tree master kötelező inputjával;
6. stump kézi korrekció és world-pivot overlay;
7. contact shadow Photoshopban kézzel vagy későbbi ART-TOOL-01 segítségével;
8. D6 normalized export és technical QA;
9. family report, passportok és backup/hash;
10. külön I4 runtime-integráció a már lezárt `D8-GAP-001` contract alapján.

## 10. Méret- és memóriabudget

| Export | Decoded becslés | Runtime fájlméret cél | Figyelmeztető szint |
|---|---:|---:|---:|
| standing `384×448 RGBA` | `0.656 MiB` | legfeljebb kb. `300 KiB` | `450 KiB` felett review |
| stump `128×96 RGBA` | `0.047 MiB` | legfeljebb kb. `60 KiB` | `100 KiB` felett review |
| shadow `128×64 RGBA` | `0.031 MiB` | legfeljebb kb. `20 KiB` | `40 KiB` felett review |
| **family total** | **`0.734 MiB`** | mérendő | P1 128 MiB aktív keret része |

A fájlméretcél nem írhatja felül a silhouette-et vagy alpha-minőséget. Túllépés
először új exportrevisiont, nem masterrombolást jelent.

## 11. Acceptance

### Art

- D5 score legalább `18/20`, hard fail nélkül;
- standard pine identity és cozy silhouette owner-approved;
- trunk délről tisztán olvasható;
- min/normal/max zoomon (`12/20/26 CSS px/WU`) felismerhető;
- stump egyértelműen ugyanazon fa maradványa;
- nincs baked napszak, hosszú shadow, szöveg, watermark vagy reference-copy.

### Geometry és technical

- normalized canvas és pivot exact;
- álló/stump world-pivot overlay eltérés `0 WU`;
- footprint és interaction debug overlay dokumentált;
- straight alpha edge-en nincs fekete/fehér fringe;
- tree és shadow külön export;
- decoded total a reportban `0.734 MiB` körüli vagy indokolt;
- három passport, source inventory és family report kitöltött;
- master + külön backup hash-ellenőrzött.

### Integráció előtt

- `D8-GAP-001` lezárva;
- role/tag vocabulary és fallback jóváhagyva;
- manifest validation és missing-asset fallback teszt;
- normal gameplay, canopy fade, stump state és iPhone screenshot proof;
- előző placeholder visszaállítható.

## 12. Tulajdonosi kapu

`D8-OWN-001` — A standard harvestable pine tree + matching stump + külön contact
shadow az első production assetfamily; a fenti identity, méret, pivot, file,
prompt, budget, QA és integrációs gap szerződés elfogadható.

Elfogadott döntés: **`D8-OWN-001A` — elfogadva**, 2026-08-02.
