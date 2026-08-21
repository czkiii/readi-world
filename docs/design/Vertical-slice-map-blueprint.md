# Readi World — D3 vertical-slice map blueprint

Frissítve: 2026-08-01  
Állapot: `DONE`  
Hatókör: P1 village–forest–Forester Hut térbeli és adatkontraktus; runtime- és artmódosítás nélkül

## 1. Cél

A D3 egyetlen, összefüggő és portré mobilon bejárható vertical-slice jelenet
logikai térképe. A pálya megtanítja és térben támogatja ezt az ívet:

```text
érkezés
→ földi ágak
→ munkapad helyreállítása
→ további ágak
→ fejsze craftolása
→ fejsze kiválasztása
→ automatikus favágás
→ Forester Hut restaurációja
→ látható világváltozás
→ farmösvény megnyílása
```

A dokumentum nem pixelpontos map és nem production art brief. A világméretet,
karakterarányt, kamerát, zoomot, pivotot, footprintet és occlusion-szabályt D4
zárja. Az exact receptköltség és balansz külön content contract vagy mérés.

## 2. Irányadó források

- `docs/Dokumentumaudit.txt`: 8–14, 23–39, 52, 59–65, 101–106,
  113–116, 136–143, 145–153, 203–208, 234–239, 263, 265–266, 277,
  284–285 és D1.1C–D1.7C, D2.1C–D2.8C;
- `docs/Gameplay-bible.txt`: 7–10, 17, 21.10–21.15, kizárólag ahol az
  audit nem írja felül;
- `docs/design/HUD-menu-screen-map.md`;
- `docs/implementation-control/Vertical-slice-content-es-assetbudget.md`;
- `docs/art/reference-sheets/Reference-index.md`, főleg `REF-001`, `REF-003`,
  `REF-005`, `REF-008` és `REF-009`;
- `docs/implementation-control/Prototype-behavior-parity-inventory.md`.

## 3. Lezárt D3 szerződés

| ID | Döntés |
|---|---|
| `D3-PR-001` | A slice egyetlen folyamatos `main-village` jelenetben tartalmazza az érkezési tisztást, munkapadot, forest edge/grove zónát, Forester Hutot és a lezárt farmösvényt. Nincs village–forest loading screen. |
| `D3-PR-002` | A világ hibrid: authored útvonalak és landmarkok + adatvezérelt ground/object/resource slotok. Saját map editor P1-ben nem szükséges. |
| `D3-PR-003` | A térkép portréban észak–déli főgerinccel vezeti a játékost; az oldalágak felfedezést adnak, de a kritikus út nem válik labirintussá. |
| `D3-PR-004` | A Forester Hut korán látható vagy előrevetített landmark, de restaurációja csak a munkapad–fejsze–fa sorrend validálása után lehetséges. |
| `D3-PR-005` | A workbench a főút természetes középső csomópontja. A játékos nem kerülheti meg észrevétlenül, de nincs láthatatlan fal vagy erőltetett folyosó. |
| `D3-PR-006` | Kötelező manuális world prompt és fontos target nem kerül a jobbkezes joystick vagy bal oldali tool rail elsődleges kézzónája alá. |
| `D3-PR-007` | A romos és restored állapot ugyanazt a Scene ID-t, landmark ID-t, footprintet és bejáratot használja; csak state-driven asset, környezet és útelérhetőség változik. |
| `D3-PR-008` | A farmösvény megnyílása a slice jutalma és következő iránya. P1-ben nem hoz létre működés nélküli Farm screent vagy teljes farmjátékmenetet. |
| `D3-PR-009` | A Player Home későbbi teljes belsőtere nem növeli a P1 mapbudgetet. A slice déli részén fenntartható player-plot hely, de production Home asset csak külön budgetdöntéssel kerül be. |
| `D3-PR-010` | Nincs harbor, mine, quarry, NPC-kötelezettség, kereskedés, expedition, teljes farm vagy terrain editor ebben a mapcsomagban. |

## 4. Koordináta- és irányelv

A D3 `layout unit` koordinátát használ kizárólag relatív kompozícióhoz:

- bal felső sarok: `(0, 0)`;
- kelet/jobbra: növekvő `x`;
- dél/lefelé: növekvő `y`;
- tervezési tartomány: `100 × 180 layout unit`;
- a számok nem világpixelek, nem tile-ok és nem végleges collisionértékek;
- D4 a vizuális scale proof után arányosan átméretezheti a teljes layoutot,
  de a zónasorrendet és landmarkkapcsolatot nem cserélheti fel észrevétlenül.

## 5. Logikai térkép

```text
                         ÉSZAK
┌──────────────────────────────────────────────┐
│             Z5 — FORESTER HUT               │
│       romos landmark + déli bejárat          │
│                    │                         │
│ Z4 — FOREST GROVE  │      Z6 — FARM GATE    │
│ harvest fák        ├────── lezárt ösvény ──▶│
│       ╲            │                         │
│        Z3 — FOREST EDGE                      │
│        ágak + első locked fa                 │
│                    │                         │
│             Z2 — WORKYARD                    │
│           sérült munkapad                    │
│                    │                         │
│          Z1 — VILLAGE CLEARING               │
│      irányjel, nyitott pihenőterület         │
│                    │                         │
│          Z0 — ARRIVAL / PLAYER PLOT          │
│       safe spawn + első földi ágak           │
└──────────────────────────────────────────────┘
                          DÉL
```

Ez nem egyetlen képernyő. A world view a nagyobb térkép kamerakivágása, és a
játékos végigsétál a zónákon.

## 6. Zónaleltár

| Zone ID | Relatív tartomány | Szerep | Belépési állapot | Slice-változás |
|---|---|---|---|---|
| `ZONE-P1-ARRIVAL` | x 38–72, y 150–178 | safe spawn, első mozgás és pickup tanítás | nyitott | később tisztább ösvény/finom dekor |
| `ZONE-P1-VILLAGE` | x 28–88, y 122–160 | nyitott village clearing, útirány és pihenőpont | nyitott | restoration után élet/megvilágítás finoman nőhet |
| `ZONE-P1-WORKYARD` | x 40–78, y 98–130 | sérült workbench, crafting csomópont | workbench damaged/locked | repaired/active workbench |
| `ZONE-P1-FOREST-EDGE` | x 14–70, y 72–112 | további ágak, első látható fák és tool requirement tanítása | járható; harvest axe nélkül locked | axe után work context aktív |
| `ZONE-P1-FOREST-GROVE` | x 6–56, y 36–88 | fő wood gathering terület, rövid mellékloop | járható vagy természetesen vezetett | néhány stump/depleted state, későbbi respawn |
| `ZONE-P1-HUT` | x 38–80, y 8–46 | Forester Hut landmark és restoration project | romos, követelmények szerint locked | restored building + környezeti reakció |
| `ZONE-P1-FARM-GATE` | x 76–100, y 58–104 | jövőbeli farmirány vizuális ígérete | fizikailag és érthetően lezárt | hut restoration után út nyílik; farm gameplay külön scope |
| `ZONE-P1-BOUNDARY` | külső perem | természetes mapkorlát és performance buffer | nem járható | nem változik P1-ben |

## 7. Landmark- és interaction anchor leltár

| Object ID | Típus / role | Ajánlott pont | Kötelező anchor | Kezdő állapot | Slice-végállapot |
|---|---|---:|---|---|---|
| `spawn.p1.arrival` | safe player spawn | `(55, 166)` | szabad footprint + fallback ring | active | active |
| `plot.p1.player-home` | reserved player plot | `(40, 151)` | későbbi kapu/ajtó iránya | üres vagy kis diegetic jel | változatlan; nem kötelező Home asset |
| `sign.p1.spine` | route sign / visual guide | `(54, 137)` | olvasható észak felől/dél felől | forest/hut irány | restored állapotban farmirány is jelezhető |
| `workbench.p1.field` | workstation landmark | `(62, 116)` | interaction `(60, 122)` | damaged | repaired/active |
| `landmark.p1.forester-hut` | restoration building | `(59, 26)` | déli entrance `(59, 39)` | ruined | restored |
| `gate.p1.farm-path` | progression gate | `(89, 83)` | approach `(82, 88)` | blocked | open / next-goal marker |
| `rest.p1.clearing` | non-system rest/readability pocket | `(69, 143)` | nincs kötelező interakció | visual only | visual only |

A gameplay a role/tag és stabil ID alapján kapcsolódik. A fenti pontok nem
képfájlnevek és nem hardcoded canvaspixelek.

## 8. Útvonalhálózat

### 8.1 Fő gerinc

`PATH-P1-SPINE` ajánlott control pointjai:

```text
(55,166) → (57,148) → (60,126) → (55,106)
         → (50,88) → (57,64) → (59,39)
```

Követelmények:

- végigjárható normál mozgással;
- organikus, nem tökéletesen egyenes;
- az első irányválasztás egyértelmű;
- a workbench természetes megállópont;
- a hut entrance délről olvasható;
- nincs kötelező pixelpontos átjáró vagy egykarakteres szűkület;
- a fő gerincet a talaj, növényritmus, fény és landmark-sziluett együtt jelöli.

### 8.2 Forest mellékloop

`PATH-P1-FOREST-LOOP`:

```text
(55,106) → (38,101) → (26,84) → (29,61)
         → (45,54) → (57,64)
```

A loop elég rövid ahhoz, hogy a játékos ne veszítse el a hut irányát, de
elég széles ahhoz, hogy a faállomány ne egy sorban álló tutorialobjektum legyen.

### 8.3 Farm branch

`PATH-P1-FARM-LOCKED`:

```text
(57,96) → (72,91) → (82,88) → (89,83) → east exit
```

Kezdetben a gate, sérült út, növényzet vagy hiteles világobjektum zárja. A
lezárás nem lehet puszta láthatatlan fal. Restauráció után ugyanazon path ID
`open` állapotot kap; a kamera röviden megmutathatja, de nem tölti be a farmot.

## 9. Resource slot leltár

Az exact darabszám és költség külön balanszadat. A map invariánsokat rögzít:

| Slot family | Hely | Szerep | Kötelező invariáns |
|---|---|---|---|
| `branch.prebench.*` | Arrival + Village | workbench előtti pickup | a játékos elérhesse a workbench szükséges mennyiségét tool nélkül |
| `branch.postbench.*` | Workyard + Forest Edge | axe recipe előtti további pickup | a workbench javítása után elérhető loose supply fedezze a fejszereceptet |
| `tree.training.*` | Forest Edge | első axe-work proof | legalább egy tisztán olvasható, biztonságosan megközelíthető valid fa |
| `tree.grove.*` | Forest Grove | hut project wood | a determinisztikus elérhető hozam fedezze a kötelező projectigényt grind nélkül |
| `tree.boundary.*` | perem | látvány és természetes boundary | ami harvestable-nek látszik, annak vagy valóban használhatónak, vagy egyértelműen háttérelemnek kell lennie |
| `decor.afterrestore.*` | Hut + spine + Village | látható világreakció | nem blokkolhat spawn-, út- vagy interaction footprintet |

### 9.1 Javasolt authored slotbudget

- `branch.prebench`: 3–4 stabil slot;
- `branch.postbench`: 3–5 stabil slot;
- `tree.training`: 2–3 stabil node;
- `tree.grove`: 4–6 stabil node;
- vizuális resource-variáns a content/assetbudget szerint, nem minden slothoz
  külön sprite;
- randomizáció csak valid slotokon és determinisztikus seedből történhet;
- kötelező tutorial-resource nem spawnolhat elérhetetlenül vagy a HUD alatt.

Ezek tervezési kezdőértékek. Az exact költség és hozam validatorának kell
bizonyítania a fenti supply-invariánsokat.

## 10. Progression beat és térbeli kapu

| Beat ID | Játékosi cél | Térbeli bizonyíték | Gate | Save checkpoint |
|---|---|---|---|---|
| `BEAT-P1-00` | tájékozódás és mozgás | arrival clearing + északi út | nincs | új játék / safe spawn |
| `BEAT-P1-01` | földi ágak gyűjtése | prebench slotok a főgerinc körül | Empty Hands pickup | első stabil pickup után debounce save |
| `BEAT-P1-02` | workbench helyreállítása | workbench a gerinc közepén | elegendő branch + manuális project commit | repair előtt és után |
| `BEAT-P1-03` | több ág + axe craft | Forest Edge loose supply + active bench | recept és inventory validáció | craft előtt és után |
| `BEAT-P1-04` | fa vágása | training tree, majd grove loop | axe selected = work intent; valid target/range | első committed harvest után |
| `BEAT-P1-05` | Forester Hut restauráció | északi landmark és requirements | szükséges material + project commit | restoration előtt |
| `BEAT-P1-06` | világváltozás | hut state, környezet, gate és path változik | atomi milestone transaction | restoration commit után |
| `BEAT-P1-07` | farmirány felismerése | megnyílt keleti ösvény + új goal | farm gameplay nem indul automatikusan | milestone state mentve |

## 11. Sequence-break és softlock védelem

- minden kötelező prebench branch tool nélkül elérhető;
- workbench-javítás nem fogyaszthatja el az axe recepthez szükséges későbbi
  loose supplyt, mert a postbench supply külön zónában biztosított;
- axe nélkül a fa látható lehet, de a locked state egyértelműen `Axe required`;
- Empty Hands mellett favágás nem indul;
- axe kiválasztása után valid fa közelében nincs második ACT/tap;
- a Forester Hut korán megközelíthető lehet, de a hiányzó követelményt és
  következő lépést mutatja;
- a farm gate restauráció előtt fizikailag és logikailag zárt;
- resource vagy landmark nem spawnolhat más gameplay footprintjére;
- elérhetetlen vagy hibás spawn safe fallbacket használ;
- kritikus pickup elvesztése, inventory full vagy appmegszakítás nem teheti
  befejezhetetlenné a slice-ot;
- respawn nem írhat felül buildinget, player deltát vagy aktív reservationt.

## 12. HUD-safe world composition

D2 alapján a térképnek a következő kompozíciós szabályokat kell teljesítenie:

- a fő út és a következő landmark a középső world corridorban marad;
- kötelező manuális interaction anchor alaphelyzetben nem kerül a jobb alsó
  joystick- vagy bal alsó toolzóna mögé;
- top rail és goal card alatt nem lehet csak érintéssel elérhető kritikus
  célpont; a kamera vagy marker safe irányba tolja;
- world-space label clamped screen-space fallbacket használhat;
- context progress a target közelében jelenik meg, nem a teljes alsó sávban;
- milestone banner nem takarhat mozgásveszélyt vagy kötelező promptot;
- balkezes tükrözés után ugyanazokat az anchorokat újra kell ellenőrizni;
- iPad nagyobb viewportja több világot mutat, de nem fed fel hibás üres mapperemet.

## 13. Camera composition anchorok

| Camera ID | Trigger | Téma | Normál változat | Reduced Motion |
|---|---|---|---|---|
| `CAM-P1-START` | first spawn | út és távoli északi irány | rövid stabil beállás a játékosra | azonnali követő kamera |
| `CAM-P1-BENCH` | workbench first seen/repaired | sérült → működő csomópont | finom target bias, nem kontrollvesztő cutscene | statikus highlight |
| `CAM-P1-HUT-DISCOVERY` | hut először látható | landmark és romos állapot | rövid előrevetítés, majd vissza a playerhez | marker + hang nélkül is érthető state |
| `CAM-P1-RESTORE` | restoration commit | hut és környezet átalakulása | rövid, megszakíthatatlan commit után skippelhető reveal | azonnali before/after váltás + banner |
| `CAM-P1-FARM-OPEN` | gate open | új keleti út | rövid path reveal, majd valid player return | statikus nyíl/goal update |

A kamera nem teleportálhatja a játékost, nem módosíthat World State-et és nem
indíthat új tranzakciót.

## 14. Collision, occlusion és boundary intent

- a map szélét sűrű növényzet, szikla, kerítés vagy terepátmenet indokolja;
- nincs önmagában álló láthatatlan fal;
- a főút legalább kényelmes mobilmozgási szélességű, exact értéke D4;
- nagy fa és hut alpha/occlusion viselkedést igényelhet, ha eltakarja a játékost;
- hut entrance, workbench anchor és resource approach körül kötelező tiszta
  interaction footprint marad;
- dekoráció nem kerülhet az elsődleges navigációs vagy kamera return pontra;
- collision shape és vizuális silhouette nem térhet el megtévesztően;
- a boundary forest fái nem keveredhetnek vizuálisan a harvestable node-okkal.

## 15. Világállapot-rétegek

Nem készül külön teljes térképkép minden állapothoz.

| Réteg | Tartalom | Mentés |
|---|---|---|
| `BASE-DEFINITION` | zónák, utak, stabil landmarkok, slotok, collision és seed | nem másolódik teljesen a save-be |
| `INSTANCE-DELTA` | workbench/hut/gate state, depleted node, pickup állapot | verziózott World State delta |
| `PRESENTATION-PROFILE` | romos/restored asset role, dekor- és effektfeloldás | logikai state-ből újragenerálható |
| `PLAYER-DELTA` | későbbi elhelyezés vagy személyre szabás | csak akkor, amikor a rendszer scope-ba kerül |

Kötelező stabil állapotkapcsolatok:

```text
workbench.damaged → workbench.repaired
hut.ruined → hut.restoring → hut.restored
farm_gate.blocked → farm_gate.open
tree.available → tree.reserved → tree.depleted/stump → tree.available
branch.available → branch.collected
```

## 16. Adatvezérelt layout contract

A későbbi runtime layout legalább az alábbi fogalmakat deklarálja:

```text
SceneDefinition
  sceneId
  layoutVersion
  bounds
  zones[]
  paths[]
  landmarks[]
  resourceSlots[]
  spawnPoints[]
  cameraAnchors[]
  progressionLinks[]
  presentationProfiles[]
```

Minden tartós landmark:

- stabil Object ID;
- definition/role/tag;
- position és D4-ben meghatározott pivot/footprint;
- interaction anchor;
- state machine hivatkozás;
- asset role és fallback;
- collision/occlusion metaadat;
- save delta és migrációs szabály.

A runtime nem a referencia-kép koordinátáit, nem fájlneveket és nem generált
háttérbe égetett collisiont használ.

## 17. Előtte–utána vizuális szerződés

| Terület | Kezdet | Restoration után |
|---|---|---|
| Forester Hut | romos, hideg/sötét, használaton kívüli | javított silhouette, melegebb fény, működő állapot |
| Hut clearing | elhanyagolt, törmelék/overgrowth | rendezettebb path edge, kis növényi/dekor reakció |
| Workbench | sérült/inaktív | javított, olvasható active feedback |
| Main spine | kopott, részben benőtt | ugyanaz az út, finoman tisztább vizuális vezetés |
| Farm gate | zárt, de olvasható jövőbeli irány | fizikailag nyitott út és új goal cue |
| Village clearing | csendes és ritkás | kis élet-/fényjel, nem hirtelen teljes végjátékfalu |

A változásnak `REF-009` érzelmi ígéretét kell kicsiben bizonyítania: ugyanaz a
hely emlékszik a játékos munkájára. A teljes endgame-sűrűség nem P1-kötelezettség.

## 18. Scope- és assetbudget-védelem

### P1 must

- egy összefüggő main-village scene;
- village meadow + forest floor ground family;
- egy path family;
- damaged/repaired workbench feedback;
- három Forester Hut állapot;
- loose branch és tree resource family;
- természetes boundary propok;
- blocked/open farm gate/path state;
- egy restoration celebration family;
- a D2-ben meghatározott world marker/promptcsalád.

### P1-ben nincs

- működő farm;
- harbor, mine, quarry vagy expedition;
- kötelező NPC;
- Player Home interior vagy kötelező production Home exterior;
- teljes village district;
- terrain editor vagy játékosi placement;
- dinamikus teljes open-world streaming;
- külön village és forest loading scene;
- endgame-épületsűrűség;
- teljes map/minimap UI.

### Elsőként vágható SHOULD

- extra side path;
- pihenőhely interakció;
- további díszkapu vagy sign;
- plusz ambient prop és virágvariáns;
- összetett camera reveal;
- restoration utáni extra állat/NPC reakció.

## 19. D3 acceptance és proofterv

### Dokumentációs acceptance

- minden zóna, landmark, path és progression beat stabil ID-val szerepel;
- a D1 gameplay flow térben megszakítás nélkül végigkövethető;
- a D2 HUD-safe és kézprofilkövetelményei hivatkozva vannak;
- a P1 budget és cut list egyértelmű;
- a state-driven before/after nem igényel teljes duplikált térképassetet;
- a Player Home, Farm és későbbi régiók bővítési helye ismert, de nincs P1
  scope-ként elrejtve;
- az exact pixel-, camera- és footprintértékek D4-be vannak továbbadva.

### Későbbi runtime/device proof

- új játékból 20–30 perc alatt bejárható teljes loop;
- nincs sequence break, softlock vagy kötelező elérhetetlen resource;
- jobb- és balkezes profilban nincs kritikus world target a kontrollok alatt;
- kis telefonon, iPhone 16 Pro-n és iPad portréban olvasható főút;
- safe spawn és fallback spawn minden state-ben működik;
- save/reload a kijelölt checkpointoknál ugyanazt a mapállapotot adja;
- a restoration before/after golden screenshot ugyanazon kamera- és
  landmarkkompozícióból elkészíthető;
- culling, aktív node- és textúrakeret megfelel a 265–266 céloknak;
- a farm gate nyílik, de nem vezet működés nélküli vagy üres képernyőre.

## 20. D4-nek átadott kötelező kérdések

- world unit ↔ draw pixel arány;
- karakter, ajtó, workbench, fa, út és hut relatív mérete;
- normál follow camera és milestone anchor zoom;
- portré viewportban látható terület;
- top/bottom HUD safe zone world-space következménye;
- minimum főút- és interaction-footprint szélesség;
- pivot, y-sort, alpha fade és occlusion threshold;
- collision shape és approach ring;
- kis telefon/iPhone/iPad zoom clamp;
- restored before/after golden camera anchor;
- map boundary culling margin és aktív assetbudget.

## 21. Tulajdonosi jóváhagyási kapu

`D3-OWN-001A` — A teljes fenti map topology, zóna- és landmarkrendszer,
village–forest egybefüggő jelenet, keleti farmösvény-jutalom és P1 cut list
2026-08-01-én tulajdonosilag elfogadva.

Az elfogadás nem zárja le a pontos vizuális arányt vagy assetkinézetet. Azt
rögzíti, hogy milyen helyekből, útvonalból és állapotváltozásból épül fel az
első játszható világdarab.
