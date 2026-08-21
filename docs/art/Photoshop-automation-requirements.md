# Readi World — ART-TOOL-01 Photoshop asset automation requirements

Frissítve: 2026-08-02  
Állapot: `PS2020 JSX OPERATIONAL / HOST-ACCEPTED / ART-TOOL-01A DONE`; UXP `IMPLEMENTED / DEFERRED`  
Jelenlegi operatív irány: Photoshop 2020 ExtendScript + Action/gyorsbillentyű  
Hosszú távú kényelmi irány: Photoshop UXP panel  
Későbbi adapter: Illustrator UXP/script UI- és ikonforrásokhoz

## 1. Cél

Egy saját **Readi Asset Prep** panel csökkentse a kézi, ismétlődő és hibára
érzékeny utómunkát anélkül, hogy automatikusan művészi döntést hozna vagy
production assetet aktiválna.

## 2. Miért Photoshop UXP az első?

- a világassetek rasteres, festett és alpha-érzékeny elemek;
- tartós panelt, mezőket, validációt és több külön gombot ad;
- modern Photoshop API és `batchPlay` használható;
- kényelmesebb, mint minden művelethez külön JSX fájl;
- WebP/PNG export, guide/layer és dokumentum-meta kontrolláltabban kezelhető.

Photoshop 2020-hoz elkészült a funkcionálisan azonos, Actionből vagy
gyorsbillentyűről megnyitható JSX/ScriptUI híd. Hosszú távon a UXP panel marad a
kényelmesebb, dokkolható felület, de nem előfeltétele a production assetmunkának.
Illustrator akkor kap adaptert, amikor UI/ikon family valóban vektoros mastert
igényel; environment assethez nem ez az elsődleges eszköz.

### Host-kompatibilitás

A plugin UXP manifest v5, API v2 és Photoshop `24.0.0` minimum mellett készült.
A 24.0 minimumot a guide API koordinátajavítása indokolja. A helyi gépen
észlelt Photoshop 2020 `21.1`, amely UXP plugint nem támogat. Emiatt elkészült
az ES3/ExtendScript kompatibilis JSX híd is: ugyanazt a D8 profilt, pivotot,
geometriát, validációt, duplicate-exportot, sidecart és passport-szerződést
használja. A JSX csomag 6/6, az UXP csomag 14/14 hostfüggetlen tesztje sikeres;
a helyi Photoshop 21.1 kézi acceptance 2026-08-02-án sikeresen lezárult. A
`ReadiWorldScript` Action a projektmappában maradó JSX-et indítja; mindhárom
profil, a PNG/JSON export, a biztonsági blokkok és a passport-ágak hostban is
bizonyítottak. A Photoshop 24+ telepítés csak a későbbi dokkolt UXP-panel host
proofjához kell, assetgyártási blokkoló nem lehet.

Implementációk: `tools/photoshop/readi-asset-prep-jsx/` (PS 2020 operatív út)
és `tools/photoshop/readi-asset-prep/` (későbbi UXP-panel).

## 3. Panel mezői

| Csoport | Mezők |
|---|---|
| identity | Asset ID, family, package, role/tag |
| revision | master `rNNN`, export `eNNN`, prompt Run ID |
| geometry | WU width/height, 64 px/WU, canvas px, pivot x/y, footprint |
| output | normalized PNG, review PNG, runtime WebP/PNG profile |
| special | transparent sprite, stump/state pair, shadow, seamless, 9-slice, animation frame |
| paths | master, normalized, review és passport célmappa |
| pivot metadata | target px, actual px, normalized `0..1`, geometry sidecar path |

Az értékek kézzel megadhatók, de elsődlegesen a D8 family profileból tölthetők.

## 4. Tervezett gombok

### Dokumentum

- `Create From Family Profile`;
- `Validate Active Document`;
- `Apply sRGB / RGB 8-bit`;
- `Set Canvas Without Scaling Art`;
- `Create Safe Padding Guides`;
- `Create Pivot + Ground Line`;
- `Create Footprint / Interaction Overlay`;
- `Create Standard Layer Groups`.

### QA

- `Build Min / Normal / Max Zoom Proof`;
- `Build State Pivot Overlay`;
- `Build 3×3 Seamless Proof`;
- `Build 9-Slice Stretch Proof`;
- `Check Alpha Fringe / Empty Pixels`;
- `Estimate Decoded Texture MiB`;
- `Generate Review Contact Sheet`.

### Export és napló

- `Export Normalized PNG`;
- `Export Review PNG`;
- `Export Runtime Candidate`;
- `Calculate SHA-256`;
- `Create Passport Draft`;
- `Write Geometry Sidecar`;
- `Create Family Report Delta`;
- `Open Target Folder`.

## 5. Standard layerek

```text
00_GUIDES_DO_NOT_EXPORT
  pivot
  ground-line
  footprint
  interaction
  safe-padding
10_ART
  paint
  corrections
  masks
20_OPTIONAL
  emissive
  state-overlay
90_REVIEW_DO_NOT_EXPORT
  notes
  reference-overlay
```

A panel nem flatteneli felül az aktív mastert. Exporthoz temporary duplicate-ot
használ, majd azt bezárja.

A pivot guide nem kerül az exportba. A panel a family profileból olvassa a
target pixelpivotot, az exportcanvasból kiszámítja a normalized pivotot, majd
JSON sidecarba és passport draftba írja. Photoshop/XMP csak opcionális tükör,
nem egyetlen igazságforrás.

## 6. Biztonsági szabályok

- nincs automatikus mentés az eredeti fájl fölé;
- új revision létező fájlnevet nem írhat felül;
- runtime mappába alapból nem exportálhat;
- `INTEGRATED` státuszt nem állíthat be;
- a pivot/canvas módosítása előtt preview és megerősítés;
- minden művelet logolható, hiba esetén a dokumentum változatlan vagy undoable;
- external CLI/WebP/hash folyamat csak explicit felhasználói művelettel;
- passport draft nem jelent QA-pass állapotot.

## 7. Fázisok

| Fázis | Scope | Eredmény |
|---|---|---|
| `ART-TOOL-01A` | Photoshop UXP MVP | profile betöltés, canvas/pivot/guides, validate, normalized/review export, memory és passport draft |
| `ART-TOOL-01B` | QA bővítés | zoom proof, state overlay, 3×3, 9-slice, alpha check |
| `ART-TOOL-01C` | export/report | runtime candidate, hash, report delta, opcionális CLI bridge |
| `ART-TOOL-02` | Illustrator adapter | csak UI/vector family tényleges igénye után |

## 8. Első profile

A proofprofil a D8 harvest tree family:

- standing `384×448`, pivot `(192,416)`;
- stump `128×96`, pivot `(64,80)`;
- shadow `128×64`, pivot `(64,48)`;
- 64 px/WU;
- min/normal/max zoom proof;
- standing/stump world-pivot overlay.

## 9. Acceptance az MVP-hez

- támogatott Photoshop-verzió és UXP manifest dokumentált;
- a panel hibás Asset ID-t, méretet, color mode-ot és revision-overwrite-ot blokkol;
- exact canvas/pivot és layerstruktúra készül;
- az aktív master nem sérül export közben;
- normalized PNG és review sheet reprodukálható;
- memory estimate és passport draft helyes;
- harvest tree fixture-rel automatizált vagy kézi acceptance lefut;
- telepítési és eltávolítási leírás rendelkezésre áll.

## 10. Külön tulajdonosi irány

`ART-TOOL-01` nem része a D8 family acceptance-nek, és nem blokkolja a kézi
assetgyártást. Javasolt következő art-tool döntés:

Elfogadott irány: **`ART-TOOL-01A` — Photoshop UXP MVP először; Illustrator
adapter csak későbbi UI/vector family igazolt igénye után**, 2026-08-02.
