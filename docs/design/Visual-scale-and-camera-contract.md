# Readi World — D4 visual scale and camera contract

Frissítve: 2026-08-01  
Állapot: `DONE`  
Kapcsolt scale sheet: `docs/art/Visual-scale-sheet.md`

## 1. Cél

Ez a szerződés egységesíti, milyen perspektívában készül az art, mekkora
világrész látszik portré telefonon, hogyan követ a kamera, hogyan rendeződnek a
sprite-ok mélységben, és mit tesz a rendszer, ha fa, tető vagy HUD takarja a
játékost.

A D4 nem választ végleges rendererkönyvtárat, nem készít production assetet és
nem hangolja késznek a joystickot vagy kamerát dokumentumból. Fix geometriai
alapot és mérhető kezdőprofilt ad; a megjelölt érzeti értékeket fizikai
iPhone-proof finomíthatja.

## 2. Források és korlátok

- `docs/Dokumentumaudit.txt`: 7–14, 23–25, 32, 110–116, 227–239,
  246, 263, 265–266, D1–D3;
- `docs/design/HUD-menu-screen-map.md`;
- `docs/design/Vertical-slice-map-blueprint.md`;
- `docs/art/Visual-scale-sheet.md`;
- `docs/implementation-control/Eszkoz-es-kepernyomatrix.md`;
- `docs/art/reference-sheets/Reference-index.md`;
- elsődleges proof: iPhone 16 Pro Safari és Home Screen portré;
- 60 FPS cél, tartós 30 FPS alatti fail;
- 350 MB folyamat- és 128 MB aktív textúrakeret.

## 3. Lezárt D4 szerződés

| ID | Döntés |
|---|---|
| `D4-PR-001` | A világ ortografikus hatású, enyhén döntött 3/4 top-down projekciót használ, perspektivikus összetartás és horizon nélkül. Észak a képernyő teteje; nincs 45°-kal elforgatott izometrikus gyémántrács. |
| `D4-PR-002` | Vizuális kameraegyenérték: kb. `55° ± 5°` eleváció a talajsík fölött, yaw `0°`. A 2D assetek ugyanazt a tető–homlokzat arányt és dél felé néző olvashatóságot követik. |
| `D4-PR-003` | `1 WU` felbontásfüggetlen világméret; production export kezdő sűrűsége `64 source px/WU`. CSS viewport, DPR, belső render scale és source pixel külön fogalom. |
| `D4-PR-004` | iPhone referencia normál zoomcélja `20 CSS px/WU`; támogatott kontextuszoom induló tartománya `12–26 CSS px/WU`. Normal gameplayben nincs játékosi pinch zoom P1-ben. |
| `D4-PR-005` | A követő kamera a karakter validált ground pivotját követi, portréban kissé a képernyő közepe alá komponálva, korlátozott mozgási look-aheaddel. |
| `D4-PR-006` | Draw order deklarált layer + ground sort point/edge + stabil Object ID tie-break alapján készül; spritefájl neve vagy betöltési sorrend nem depth rule. |
| `D4-PR-007` | Occlusion logikai occluder shape-ből indul. Elsődleges megoldás a takaró lomb/tetőrész rövid alpha fade-je; collision és World State nem változik. |
| `D4-PR-008` | A critical framing rect figyelembe veszi a top HUD-ot, goal cardot és alsó kézzónákat; fontos target vagy manuális prompt nem maradhat kizárólag takart területen. |
| `D4-PR-009` | Tablet több világot mutat, nem nagyítja fel automatikusan az asseteket és HUD-ot. Landscape nem támogatott külön proof nélkül. |
| `D4-PR-010` | Persistent asset semleges mastervilágítást és külön ground/contact shadow szerződést használ; napszak/runtime tint nem igényel teljes assetduplikációt. |

## 4. Projekciós szerződés

### 4.1 Vizuális kamera

```text
projection: orthographic-looking 3/4 top-down
camera elevation equivalent: 55° above ground plane, tolerance ±5°
camera yaw: 0°
world north: screen up
horizon: none
vanishing-point convergence: none
diamond-isometric grid rotation: none
primary readable façades: south/front, with coherent east/west side cues
```

A kameraérték nem 3D motor kötelezettsége. 2D sprite és festett asset esetén
vizuális geometriai szerződés: azonos tárgyakat ugyanabból a nézetből kell
megalkotni.

### 4.2 Miért nem klasszikus izometrikus?

- az analóg észak/dél/kelet/nyugat mozgás közvetlenül olvasható;
- a D3 authored útvonalai nem kényszerülnek gyémántrácsra;
- a mobilportré függőleges world flow természetes marad;
- organikus utak és freeform dekor könnyebben illeszkednek;
- mégis látszik elég tető- és homlokzatfelület a cozy épületkarakterhez.

### 4.3 Perspektívakompatibilitási teszt

Minden új world assetet egy közös lineup scene-ben kell ellenőrizni:

- `2 × 2 WU` ground grid;
- egy `2.0 WU` karakter;
- `1.1 × 2.3 WU` ajtó;
- standard tree;
- workbench;
- Forester Hut silhouette;
- azonos dél/front irány és ground baseline;
- nincs eltérő horizon, lens distortion vagy erős perspective convergence.

## 5. Kamera- és zoomprofilok

| Profile ID | Használat | Kezdő zoomcél | Engedélyezett tartomány | Player input |
|---|---|---:|---:|---|
| `CAM-NORMAL` | séta, pickup, általános világ | `20 CSS px/WU` | `18–22` | nincs pinch; automatikus context bias |
| `CAM-WORK` | workbench, tree work, közeli project | `22 CSS px/WU` | `20–24` | nincs pinch P1-ben |
| `CAM-LANDMARK` | hut discovery/restoration reveal | `16 CSS px/WU` | `14–18` | rövid scripted profile, skippelhető ahol biztonságos |
| `CAM-TERRAIN` | későbbi placement/terrain mode | `13 CSS px/WU` | `10–16` | pan + pinch, csak külön inputcontextben |
| `CAM-SCENIC` | későbbi Scenic/photo alap | `16 CSS px/WU` | `12–24` | külön későbbi scope |

Globális hard guard kezdetben: `12–26 CSS px/WU`. Ettől eltérés csak új
device- és assetélességi bizonyítékkal történhet.

### 5.1 Látható világ becslése

Normál `20 CSS px/WU` mellett a tényleges CSS viewport:

```text
visibleWorldWidthWU  = viewportCssWidth  / 20
visibleWorldHeightWU = viewportCssHeight / 20
```

Ez nyers geometriai becslés. A critical framing rect ennél kisebb, mert a HUD
és kézzónák fölött a világ tovább renderelődhet, de kritikus targetet oda nem
szabad kizárólagosan komponálni.

## 6. Követő kamera kezdőprofil

| Paraméter | Kezdő érték / tartomány | Státusz |
|---|---:|---|
| player screen anchor | `(50%, 58–62%)` | D4 geometry; exact device tuning |
| follow dead zone | viewport kb. `8%` széles × `6%` magas | measurement |
| smoothing time | kb. `180–260 ms` | measurement |
| max visual lag | kb. `1.25–1.75 WU` | measurement |
| movement look-ahead | `0–1.5 WU`, sebesség/irány szerint | measurement |
| look-ahead release | gyorsabb, mint az indulási felépülés | measurement |
| edge composition | camera bounds + authored composition anchor | locked principle |
| camera shake | P1-ben minimális; Reduced Motionnál off | locked principle |

A kamera nem követ nyers touch koordinátát. A cél a validált character ground
pivot vagy explicit authored camera anchor.

### 6.1 Follow szabályok

- kis iránykorrekciónál a kamera ne „úszkáljon” minden frame-ben;
- gyors irányváltásnál ne maradjon le annyira, hogy a játékos targetet veszítsen;
- look-ahead nem tolhat kötelező célpontot a HUD alá;
- target work közben enyhe target bias megengedett, de a játékos kontrollja
  olvasható marad;
- input megszűnésekor a kamera simán, túllövés nélkül áll vissza;
- fókusz/resume után nincs régi velocityból származó kamerarántás;
- Reduced Motion rövidíti vagy azonnalira váltja a hosszabb recenter/reveal
  átmenetet.

## 7. Critical framing és safe area

### 7.1 Képernyőterületek

| Terület | Szabály |
|---|---|
| top safe inset | `env(safe-area-inset-top)` + D2 top rail |
| expanded goal area | dinamikus exclusion; kamera vagy marker kompenzál |
| bottom safe inset | `env(safe-area-inset-bottom)` + browser/Home Screen külön profil |
| right-hand control zone | jobbkezes profil floating joystick activation/gesture területe |
| left tool zone | tool-intent rail és kapcsolt reachable anchorok |
| critical framing rect | középső, szabad world corridor; exact rect viewportprofilból számolódik |

A renderer a teljes viewport mögé rajzolhat világot. A safe-area szerződés azt
határozza meg, hol kell a kritikus játékosi információnak olvashatónak lennie.

### 7.2 Kötelező viselkedés

- world label screen edge-nél clampelt markerre válthat;
- manuális prompt UI-hittarget, ezért nem indíthat joystickot;
- target progress nem kerül a browser bottom bar vagy Home indicator alá;
- jobb/balkezes profilváltás után a critical framing újraszámolódik;
- expanded goal cardnál a kamera nem szükségszerűen zoomol; először target bias
  vagy marker reposition történik;
- orientációváltás ideiglenes inputot ürít, state-et nem módosít;
- landscape támogatás hiányában érthető portrait guidance jelenik meg.

## 8. Draw layer és depth sorting

| Layer index | Layer ID | Tartalom | Sorting |
|---:|---|---|---|
| 0 | `GROUND` | base terrain | authored chunk/tile order |
| 10 | `GROUND-DECAL` | path, transition, footprint decal | authored order |
| 20 | `GROUND-FX` | contact shadow, footprint, low ground effect | ground anchor |
| 30 | `LOW-PROP` | virág, apró pickup, alacsony dekor | sort point, ha szükséges |
| 40 | `WORLD-Y` | player, NPC, fa, prop, building base | `sortY` + stable Object ID |
| 50 | `OVERHANG` | lomb, tető, foreground rész | owner object sort + occlusion policy |
| 60 | `WORLD-FX` | work/pickup/restoration effekt | effect anchor + priority |
| 70 | `WORLD-MARKER` | label, target progress, lock feedback | screen-safe projection |
| 100 | `HUD` | D2 UI | DOM/UI stack, nem world depth |

### 8.1 Stable sort key

```text
(layerIndex, sortYQuantized, explicitSuborder, stableObjectId)
```

- `sortY` ground pivotból vagy building south sort edge-ből származik;
- lebegő draw bounds teteje nem depth key;
- azonos y esetén a stable Object ID megakadályozza a frame-enkénti villogást;
- building szükség esetén base + overhang részekre bontható, de egy logikai
  building instance marad;
- state-váltás nem változtathatja meg rejtetten a layer- vagy sortkontraktust.

## 9. Occlusion contract

### 9.1 Occluder meta

Nagy fa, lombkorona, tető vagy magas foreground prop deklarálhat:

```text
occluderShape
occlusionTargets
fadeAlpha
fadeInMs / fadeOutMs
hysteresisWU
maxConcurrentPolicy
```

### 9.2 Kezdő vizuális profil

| Paraméter | Kezdő cél |
|---|---:|
| occluder faded alpha | `0.40–0.55` |
| fade duration | `120–180 ms` |
| Reduced Motion | rövid vagy azonnali alpha váltás |
| hysteresis | kis ground margin, hogy ne villogjon a határon |
| egyidejű aktív occluder | lehetőleg legfeljebb `3`, jelenetkompozícióval csökkentve |

Sorrend takarásnál:

1. authored interaction/camera anchor kerülje a rossz kompozíciót;
2. érintett overhang/canopy alpha fade;
3. szükség esetén rövid target silhouette/highlight;
4. korlátozott camera bias;
5. zoom csak végső, deklarált profilváltásként.

Nem engedett:

- teljes erdő automatikus eltüntetése;
- collision kikapcsolása pusztán láthatóságért;
- World State módosítása occlusionból;
- állandó x-ray outline minden objektumon;
- sprite alpha pixeleiből automatikusan következtetett gameplay collision.

## 10. Camera bounds és map edge

- kamera center clamp a D3 scene bounds + viewport half extents alapján;
- authored composition anchor korrigálhatja a clampet landmarknál;
- mapperem mögött nincs látható üres canvas vagy ismétlődő placeholder;
- kis viewport nem változtat world collisiont vagy landmarkpozíciót;
- nagy tablet viewportnál background/boundary buffernek elég világot kell
  biztosítania, vagy deklarált camera max-width profilt kell használni;
- safe spawn és camera return anchor nem lehet boundsból kivágva;
- restoration reveal ugyanazt a golden camera anchort használja before/after.

## 11. Device- és render-scale profil

| Profil | Kamera/scale elv | HUD/panel elv | Proof |
|---|---|---|---|
| iPhone 16 Pro Safari portrait | `CAM-NORMAL` target 20 PPWU; runtime measured safe insets | D2 responsive rail, browser chrome változás | kötelező fizikai E2E |
| iPhone 16 Pro Home Screen | azonos world scale; külön bottom/top inset capture | Home indicator és standalone viewport | kötelező fizikai E2E |
| keskeny/rövid telefon | PPWU 18–22 clamp; readability előrébb való a több worldnél | HUD tömörül, panel görget | viewport screenshot + későbbi device |
| magas telefon | world vertical framing bővülhet, critical target nem tolódik túl messze | HUD nem nyúlik szét | screenshot proof |
| iPad portrait | ugyanaz vagy közeli PPWU; több world látható, camera bounds/buffer valid | panel max-width, HUD nem nagyított | kompatibilitási proof |
| landscape | nincs támogatási ígéret | pause/guidance, state megőrzés | külön későbbi proof |

### 11.1 DPR és belső render scale

- CSS viewport és internal render size külön;
- kezdő `effective DPR` maximum: `2.0`, adaptív csökkentés engedett;
- natív DPR 3 nem jelent automatikus 3× canvas- és textúrakötelezettséget;
- render scale csökkentése nem módosíthat layoutot, collisiont vagy zoomot;
- font/UI DOM-élesség külön kezelhető a world canvas render scale-től;
- változtatás frame time-, memória-, hő- és vizuális screenshot-bizonyítékhoz kötött.

## 12. Assetélesség és zoom acceptance

Minden production world assetet legalább ezeken kell ellenőrizni:

| Proof view | PPWU | Követelmény |
|---|---:|---|
| terrain overview | `12–14` | silhouette, út és landmark olvasható; részletek nem zajosak |
| landmark reveal | `16` | building state és entrance felismerhető |
| normal gameplay | `20` | karakter, pickup, tree és path tiszta |
| work context | `22–24` | tool/work feedback és object state olvasható |
| hard close guard | `26` | nincs elfogadhatatlan blur vagy atlaszszivárgás |

A `64 APU` csak akkor változik, ha ugyanaz az asset a fenti nézetek egyikén
bizonyíthatóan túl homályos vagy indokolatlanul túlméretezett.

## 13. Camera state és lifecycle

A mentés nem tárol frame-enkénti camera smoothingot. Tartósan csak az maradhat,
ami a valid resume-hoz szükséges:

- camera profile ID, ha az aktív scene/mode indokolja;
- valid logical target ID vagy safe fallback;
- opcionális user zoom csak olyan későbbi módban, ahol engedett;
- active authored reveal checkpoint, ha annak resume-policyja ezt kéri.

Fókuszvesztés/resume:

- touch, pinch, pan, joystick és drag state törlődik;
- camera target újravalidálódik;
- smoothing velocity nulláról vagy biztonságos értékről indul;
- scene bounds, viewport és safe area újraszámolódik;
- nem játszódik le kétszer milestone reveal vagy camera-triggered feedback.

## 14. Terrain/edit camera handoff

A terrain mode nem P1 feature, de a camera contract előkészíti:

- explicit `CAM-TERRAIN` inputcontext;
- pan, pinch és object drag egymást kizáró gesture state;
- selected object world coordinate nem változik camera pan/zoomtól;
- zoom érdemben nagyobb áttekintést ad, de nem enged a scene bounds mögé;
- normál HUD eltűnik, csak edit HUD marad;
- kilépéskor safe transition vissza a valid player targetre;
- Reduced Motion esetén azonnali vagy rövid visszatérés;
- exact pinch threshold és zoom inertia csak prototípusmérés után zárható.

## 15. D5–D8 prompt- és assethandoff

Minden későbbi world-asset promptcsalád kötelezően ugyanazt a nem változó
geometriablokkot örökli. A D7 pontos promptszöveget verziózza, de jelentése:

```text
orthographic-looking three-quarter top-down game asset,
camera elevation equivalent 55 degrees above the ground plane,
zero yaw, north aligned to screen up,
no horizon, no vanishing-point perspective convergence,
coherent south/front readable façade,
consistent Readi World scale, declared ground-contact pivot and footprint
```

Negatív geometriai blokk:

```text
no side view, no eye-level camera, no first-person view,
no steep bird's-eye flattening, no diamond-isometric rotation,
no fisheye, no wide-angle distortion, no mismatched horizon,
no floating object, no cropped ground-contact point
```

Ez még nem teljes art prompt: D5 adja a stílust/fényt, D6 az exportot, D7 a
verziózott promptstruktúrát, D8 pedig az assetcsalád-specifikus változókat.

## 16. Golden proof scene

A D4 elfogadás után később készülő scale proof scene kötelező elemei:

- 3×3 ground tile teszt;
- világgrid vagy mérővonal fejlesztői módban;
- player character minden displayed facinggel;
- branch pickup, rock, bush, standard tree és boundary tree;
- workbench damaged/repaired;
- Forester Hut ruined/restored ugyanazon pivoton;
- main path és forest path;
- occlusion walk-behind teszt;
- `CAM-NORMAL`, `CAM-WORK`, `CAM-LANDMARK` screenshot;
- jobb- és balkezes D2 HUD overlay;
- Safari és Home Screen safe-area screenshot;
- Reduced Motion camera transition proof.

## 17. Mérési jegyzőkönyv

Minden camera/scale tuning rögzíti:

- commit/build;
- device, OS, Safari/Home Screen mód;
- CSS viewport, safe insets, native DPR és effective DPR;
- camera profile és PPWU;
- follow dead zone, smoothing, lag és look-ahead;
- frame time/FPS, memória és render scale;
- tesztútvonal és target;
- before/after screenshot vagy videó;
- félrenyomás, elvesztett target és motion discomfort megfigyelés;
- pass/fail és indokolt új érték.

## 18. D4 acceptance

- a projekció és north/south orientáció egyértelmű;
- WU, CSS px, source px, PPWU és APU nem keveredik;
- a `Visual-scale-sheet.md` karaktertől hutig használható közös lineupot ad;
- öt camera profile és hard zoom guard dokumentált;
- pivot, footprint, draw bounds, interaction anchor és occluder shape külön meta;
- draw layer és stable sort key deklarált;
- occlusion, Reduced Motion és safe-area fallback meghatározott;
- iPhone Safari/Home Screen, keskeny telefon, iPad és landscape státusza ismert;
- 8 displayed character facing, 5 authored base irány és tükrözési kivétel
  rögzített;
- semleges mastervilágítás támogatja a runtime napszakot;
- D5 megkapja a perspektíva-, scale- és lighting-határokat;
- D6 megkapja az APU/export/meta követelményeket;
- D7 megkapja a kötelező geometriaprompt-blokkot;
- D8 minden assetcsaládnál konkrét célt választ a scale range-ekből;
- a final camera feel továbbra is fizikai device measurement, nem dokumentumból
  bizonyítottnak állított kész eredmény.

## 19. Tulajdonosi jóváhagyási kapu

`D4-OWN-001A` — A fenti projekció, `55° ± 5°` vizuális kameraegyenérték,
64 APU scale rendszer, 12–26 PPWU zoom guard, 8 displayed/5 authored
karakterirány, pivot/footprint/draw-order/occlusion szerződés és device-stratégia
a kapcsolt `Visual-scale-sheet.md` fájllal együtt 2026-08-01-én elfogadva.

Az elfogadás nem jelenti, hogy a kameraérzet mérés nélkül végleges. A stabil
geometriai alapot zárja le, amelyre már biztonságosan épülhet az art direction,
asset pipeline és promptkönyvtár.
