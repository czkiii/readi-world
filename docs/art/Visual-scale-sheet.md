# Readi World — D4 visual scale sheet

Frissítve: 2026-08-01  
Állapot: `DONE`  
Kapcsolt szerződés: `docs/design/Visual-scale-and-camera-contract.md`

## 1. Cél

Ez a sheet közös léptéket ad a karaktereknek, fáknak, köveknek,
épületeknek, utaknak, pickupoknak, effekteknek és árnyékoknak. A számok
production kezdőértékek: azonos világban tartják az asseteket, de a fizikai
iPhone proof dokumentáltan finomíthatja őket.

## 2. Egységek

| Jel | Jelentés | Szabály |
|---|---|---|
| `WU` | world unit | felbontásfüggetlen logikai világméret; a collision, path és camera ezt használja |
| `CSS px` | viewport pixel | HUD- és képernyőméret; nem kerül gameplay-számításba |
| `source px` | export textúrapixel | az asset raszteres sűrűsége; nem azonos eszközpixellel |
| `PPWU` | CSS pixel / WU | kamerazoom prezentációs értéke |
| `APU` | source pixel / WU | production raster density |

Kezdő production raster density: **64 source px / WU**. Ez a jelenlegi
`26 CSS px/WU × 2.0 effective DPR = 52 render px/WU` legközelebbi célzoom
fölött hagy élességi tartalékot, de nem kényszerít minden kis propot 1024 px-es
fájlba.

A szerkeszthető master lehet nagyobb vagy vektoros/layeres. A runtime export
méretét mindig a deklarált `drawSizeWU × APU`, nem egy általános „minden legyen
1024×1024” szabály adja.

## 3. Karakter mint etalon

| Tulajdonság | Kezdő cél |
|---|---:|
| vizuális magasság talptól hajtetőig | `2.0 WU` |
| teljes draw canvas hajjal/animációs tartalékkal | kb. `1.5 × 2.35 WU` |
| source export körülbelül | `96 × 150 px` frame-enként 64 APU-n |
| collision | talpközépre igazított kapszula/kör, kb. `0.62–0.72 WU` széles |
| interaction origin | lábpont, nem sprite-közép |
| sort point | két talp közötti földpont |
| shadow footprint | kb. `0.85 × 0.38 WU`, külön prezentációs elem |

A karakter feje a cozy/storybook irány miatt lehet enyhén nagyított, de az
ajtóhoz, workbenchhez és fákhoz viszonyított fizikai magasság nem változhat
animációnként.

### 3.1 Mozgási és facing szerződés

- a logikai mozgás 360° analóg;
- a megjelenített facing 8 irányú;
- production alap: 5 authored irány (`N`, `NE`, `E`, `SE`, `S`) és 3 tükrözött
  pár, ahol a karakter- és tool-aszimmetria ezt megengedi;
- kézben tartott tool, ruha-, haj- vagy történeti aszimmetria nem tükrözhető
  vakon; külön overlay vagy korrigált frame szükséges;
- minden irány azonos frame canvas-, pivot- és lábpontkontraktust használ;
- az idle, walk és első work animation pontos frameszáma a karaktercsalád D8
  specifikációjában záródik.

Ez az analóg joystick mellett folyamatosabb karakterérzetet ad, miközben nem
követel nyolc teljesen külön megrajzolt alapkészletet.

## 4. Világobjektum-léptékek

| Asset role | Visual draw size cél | Logical footprint cél | Interaction/approach cél | Pivot / sort point |
|---|---:|---:|---:|---|
| loose branch pickup | `0.65–0.95 × 0.45–0.75 WU` | legfeljebb `0.35–0.5 WU` | `1.0–1.25 WU` | földkontakt közép |
| small stone pickup | `0.55–0.9 × 0.4–0.7 WU` | `0.35–0.55 WU` | `1.0–1.25 WU` | földkontakt közép |
| bush / undergrowth | `1.4–2.5 × 1.0–2.0 WU` | `0.8–1.6 WU` | csak ha interactable | tövek középpontja |
| small rock | `1.0–2.0 × 0.7–1.5 WU` | `0.7–1.5 WU` | role szerint | alsó földkontakt közép |
| large rock cluster | `2.5–4.5 × 1.8–3.5 WU` | `1.8–3.5 WU` | role szerint | déli földkontakt/sort edge |
| young/small tree | `2.5–3.8 × 3.5–5.0 WU` | trunk `0.65–1.0 WU` | `1.15–1.5 WU` | törzs talpközép |
| standard harvest tree | `3.6–5.2 × 5.0–7.0 WU` | trunk `0.9–1.4 WU` | `1.25–1.65 WU` | törzs talpközép |
| large boundary tree | `5.0–7.5 × 7.0–10.0 WU` | `1.4–2.4 WU` vagy boundary shape | nem feltétlen interactable | törzs talpközép |
| stump | `0.9–1.5 × 0.55–1.0 WU` | `0.65–1.1 WU` | role szerint | közép |
| workbench | `2.6–3.4 × 1.8–2.7 WU` | `2.0–2.7 × 0.9–1.4 WU` | `1.35–1.8 WU` | déli footprintközép |
| fence module | `1.0–2.0 WU` hossz | keskeny segment shape | nincs | modul ground anchor |
| path sign | `0.8–1.3 × 1.5–2.3 WU` | `0.35–0.6 WU` | `1.0–1.4 WU`, ha interactable | oszlop talpa |
| small functional building | `6–9 × 7–11 WU` draw | `4.5–7 × 3.5–6 WU` | entrance `1.6–2.2 WU` | déli footprint/sort edge |
| Forester Hut landmark | kb. `9–12 × 10–14 WU` draw | kb. `7–9 × 5.5–7.5 WU` | déli entrance `1.8–2.4 WU` | stabil déli footprint/sort edge |
| future Player Home | Forester Hutnál azonos vagy kissé kisebb | külön D8 building spec | entrance szerint | stabil déli footprint/sort edge |

A range-ek nem engedélyeznek tetszőleges eltérést. Egy assetcsalád-specifikáció
egyetlen célt választ a range-en belül, és ugyanazt használja minden state-ben.

## 5. Ajtó, út és térköz

| Elem | Kezdő cél |
|---|---:|
| emberi ajtó vizuális szélesség | `1.0–1.25 WU` |
| emberi ajtó vizuális magasság | `2.1–2.5 WU` |
| tiszta entrance approach | legalább `1.6 WU` széles és `1.8 WU` mély |
| P1 főút járható szélesség | `3.5–5.0 WU` |
| forest mellékösvény | `2.6–4.0 WU` |
| két collision objektum közti kényelmes rés | legalább `1.15 WU` |
| kamera return/safe spawn tiszta átmérő | legalább `2.5 WU` |
| work interaction tiszta gyűrű | object profile szerint `1.2–2.4 WU` |

Ezeket nem kell merev burkolólap-rácsként megrajzolni. A hibrid világ organikus
szélt használhat, miközben a logikai járható szélesség ellenőrizhető marad.

## 6. Ground- és pathmodul

- ajánlott alap logikai ground modul: `2 × 2 WU` vagy ennek atlasz-kompatibilis
  többszöröse;
- a modul exportja 64 APU mellett `128 × 128 source px` lehet;
- nagyobb `4 × 4 WU` variation patch `256 × 256 source px` lehet;
- valódi seamless tile négy irányban ismétlődik, és kötelező 3×3 teszten megy át;
- path edge, corner, T-junction és transition alakzatok ugyanahhoz a
  groundprojekcióhoz igazodnak;
- festett útvonal lehet több modulból kompozit, de collision és nav nem a
  textúra pixeleiből származik;
- groundon nincs erős, egyetlen napszakhoz kötött directional light vagy hosszú
  baked shadow.

## 7. Footprint, pivot és interaction anchor

Három külön fogalom kötelező:

1. `draw bounds`: a teljes látható sprite, beleértve tetőt, lombot és átlógást;
2. `footprint`: a földön elfoglalt logikai terület;
3. `interaction anchor/ring`: ahol és ahonnan a játékos használhatja.

Ezek nem vezethetők le egymásból automatikusan.

### Kötelező pivotpéldák

| Család | Pivot |
|---|---|
| karakter/NPC | két talp közötti ground point |
| fa | trunk base center |
| bokor/virág | gyökér/tő ground center |
| pickup | vizuális földkontakt közép |
| prop | földkontakt center vagy deklarált south edge |
| épület | stabil footprint south-center/south-edge; state-ek között azonos |
| kerítés/path modul | modulkontraktus szerinti ground anchor |
| effekt | az esemény ground anchorja; nem képközép alapértelmezésből |

Az assetkivágás változhat, de a logikai pivot és footprint azonos asset ID
kompatibilis cseréjénél nem mozdulhat el report nélkül.

## 8. Árnyék- és világítási geometria

- persistent object master semleges nappali alapszínt használ;
- erős napkelte, esti vagy éjszakai színezés nincs belefestve;
- kis kontaktárnyék és helyi ambient occlusion megengedett;
- hosszú, világirányhoz kötött cast shadow külön shadow role/layer vagy runtime
  megoldás, nem az objektumsprite visszavonhatatlan része;
- character, tree, prop és building shadow ugyanahhoz a ground pivothoz kötődik;
- napszak és időjárás runtime tint/light profile, emissive és opcionális külön
  variáns kombinációja;
- az árnyék nem növeli a collisiont és nem módosítja a sort pointot.

A teljes paletta, anyag- és lighting contract D5-ben záródik; ez a D4 csak azt
akadályozza meg, hogy a geometria egyetlen napszakhoz égjen hozzá.

## 9. State- és animációkompatibilitás

- Forester Hut `ruined`, `restoring`, `restored` állapota azonos footprintet,
  entrance anchort és sort edge-et használ;
- workbench damaged/repaired állapot azonos interaction anchort tart;
- tree available/stump state trunk pivotja azonos;
- character minden facing és animation frame-je azonos ground pivothoz igazodik;
- frame canvas nem ugrálhat animáció közben;
- vizuális overhang változhat, logikai collision csak explicit state rule-lal;
- frame trimming csak akkor engedett, ha az atlaszmeta visszaállítja az eredeti
  untrimmed pivotot és draw boundsot.

## 10. Source/export méret képlete

```text
targetSourceWidth  = ceil(drawWidthWU  × 64 APU)
targetSourceHeight = ceil(drawHeightWU × 64 APU)
```

Példák:

| Elem | Draw size példa | Runtime export cél |
|---|---:|---:|
| character frame | `1.5 × 2.35 WU` | kb. `96 × 150 px` |
| standard tree | `4.5 × 6.0 WU` | kb. `288 × 384 px` |
| workbench | `3.0 × 2.3 WU` | kb. `192 × 148 px` |
| Forester Hut | `10.5 × 12.0 WU` | kb. `672 × 768 px` |
| ground tile | `2 × 2 WU` | `128 × 128 px` |

Atlaszba rendezés, padding, maximális atlaszméret és tömörítés D6 pipeline-
döntés. A scale sheet nem engedi meg, hogy atlasz miatt a drawSize vagy pivot
megváltozzon.

## 11. Kötelező assetmeta

Minden world sprite vagy animation family legalább ezt deklarálja:

```text
spriteId / animationId
sourcePixelRect
untrimmedSourceSize
drawSizeWU
pivotNormalized vagy pivotSourcePx
sortPoint / sortEdge
footprintShape
interactionAnchor vagy null
occluderShape vagy null
shadowProfile vagy null
alphaPolicy
supportedStates / directions
fallbackRole
```

## 12. Elfogadási feltételek

- minden P1 assetcsalád WU-ban kap méretet;
- minden world asset külön draw bounds, footprint és pivot metaadatot használ;
- a 64 APU export density a kamera legközelebbi támogatott zoomján is elég
  élesnek bizonyul, vagy mérési bizonyítékkal módosul;
- karakter, ajtó, workbench, fa és Forester Hut egy közös scale lineupban
  arányos;
- a nyolc displayed facing nem okoz pivot- vagy méretugrást;
- ugyanazon épület state-jei pixelpontosan kompatibilis ground anchoron állnak;
- a semleges mastervilágítás támogatja a runtime napszakváltást;
- egy assetcsalád D8 specifikációja szűkítheti, de nem írhatja felül rejtetten
  ezt a közös rendszert.

## 13. Tulajdonosi kapu

A sheet a kapcsolt camera contracttal együtt a 2026-08-01-én elfogadott
`D4-OWN-001A` döntés része.
