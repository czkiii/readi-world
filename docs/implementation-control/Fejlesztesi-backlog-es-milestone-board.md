# Readi World — fejlesztési backlog és milestone board

Frissítve: 2026-08-01  
Aktív WIP-limit: 1 rendszer vagy 1 assetcsalád

## Állapotok

- `DONE`: acceptance és bizonyíték teljesült.
- `READY`: minden függőség és Definition of Ready teljesült.
- `NEXT`: a jelenlegi csomag után következő jelölt.
- `BLOCKED`: konkrét döntés, dokumentum, asset vagy mérés hiányzik.
- `BACKLOG`: nyilvántartott, de még nem aktivált.
- `OUT-OF-SLICE`: nem kerülhet az első vertical slice-ba.

## Milestone board

| Milestone | Játékosilag látható cél | Állapot | Belépési kapu | Kilépési kapu |
|---|---|---|---|---|
| P0 — technikai alap | Stabil clean runtime, mentés és egy minimális technikai loop. | `PARTIAL-DONE` | 298 kapu | P0 kontraktusok + alapszintű automatizált tesztek; PWA proof hiányai külön látszanak |
| D1–D8 — produkciós előkészítés | A player-facing és assetmunka nem emlékezetből indul. | `DONE` | D0 irányítórendszer kész | HUD/map/scale/art/pipeline/prompt és első assetcsalád ready |
| P1 — belső vertical slice | 20–30 perces village–forest–Forester Hut restauráció. | `BLOCKED` dokumentációs kapukon | D1–D7 releváns részei | 277.4 teljes leltár és iPhone E2E |
| P2 — külső webes demó | Más játékos magyarázat nélkül végig tudja játszani. | `BACKLOG` | P1 lezárt és playtesthibák javítva | Külső teszt, performance és release proof |
| P3 — világ- és rendszerbővítés | Bizonyított alapra farming, régiók és további rendszerek épülhetnek. | `OUT-OF-SLICE` | P2 eredmények és új scope-döntés | Rendszerenként külön DoD |

## Elkészült technikai csomagok

| ID | Csomag | Bizonyíték | Állapot |
|---|---|---|---|
| `P0-00` | Git baseline és clean runtime | PR #1, `cd967b0` | `DONE` |
| `P0-01` | World State v1 | PR #2, `3ac8874` | `DONE` |
| `P0-02` | Save Manager v1 | PR #3, `238d213` | `DONE` |
| `P0-03` | Asset manifest/registry/role resolution | PR #4, `85c2b83` | `DONE` |
| `P0-04` | Első minimális játékosi loop | PR #5, `ba95399` | `DONE` technikai proof |
| `P0-05` | Minimális crafting bridge | PR #6, `546310f` | `DONE` technikai proof |
| `P0-05F` | Resource discoverability hotfix | PR #7, `9992101` | `DONE` |
| `P0-06` | Restoration milestone reward | PR #8, `83dd8aa` | `DONE` technikai proof |
| `D0` | Implementációs irányítórendszer | főmátrix + control dokumentumok | `DONE` |

## Aktív dokumentációs sor

| Prioritás | ID | Egyetlen eredmény | Függőség | Döntéstulajdonos | Állapot |
|---:|---|---|---|---|---|
| 1 | `D1` | Korábbi döntések és referenciaképek tartós reconciliationje, beleértve a tool-selected = work-intent szabályt. | D0 | `OWNER+TECH` | `DONE` — D1.1C–D1.7C |
| 2 | `D2` | Portré HUD–menu–screen map, unlock-, adaptív HUD-, kézprofil- és későbbi layout-testreszabási állapotok. | D1 | `OWNER+UX` | `DONE` — D2.1C–D2.8C |
| 3 | `D3` | Vertical-slice village–forest–hut map blueprint. | D1–D2 | `OWNER+TECH` | `DONE` — D3.1C–D3.9C |
| 4 | `D4` | Visual scale, kamera, zoom, pivot, footprint és occlusion szerződés. | D2–D3 | `ART+TECH` | `DONE` — D4.1C–D4.10C |
| 5 | `D5` | Art direction contract és kanonikus reference sheets. | D4 | `OWNER+ART` | `DONE` — `D5-OWN-001A` |
| 6 | `D6` | Asset production pipeline, master/export/passport/provenance. | D4–D5 | `ART+TECH` | `DONE` — `D6-OWN-001A` |
| 7 | `D7` | Verziózott promptkönyvtár minden elsődleges assetcsaládhoz. | D5–D6 | `OWNER+ART` | `DONE` — `D7-OWN-001A` |
| 8 | `D8` | Első production assetcsalád teljes specifikációja és proofterve: standard pine + stump + shadow. | D6–D7 | `OWNER+ART+TECH` | `DONE / FAMILY READY` — `D8-OWN-001A`, `STUMP-R001`, `SHADOW-R001` |

## Art production tooling

| Prioritás | ID | Egyetlen eredmény | Függőség | Állapot | Scope-védelem |
|---:|---|---|---|---|---|
| 1 | `ART-TOOL-01A` | Readi Asset Prep: Photoshop 2020 JSX/Action operatív út és későbbi UXP panel; profile, canvas/pivot/guides, validate, normalized/review export, memory, geometry sidecar és passport draft. | D6 + `PIVOT-OWN-001A`; D8 profile csak owner-review tooling fixture | `DONE — JSX 6-TEST-PASS / PS21-HOST-OPERATION-PASS`; UXP `14-TEST-PASS / DEFERRED` | Funkcionális hátrány nincs; JSX nem dokkolt panel. Egyik változat sem exportál runtime-ba; Illustrator később. |
| 2 | `ART-TOOL-01B` | Zoom/state/seamless/9-slice QA automatizálás. | `ART-TOOL-01A` | `BACKLOG` | Külön toolingcsomag. |
| 3 | `ART-TOOL-02` | Illustrator adapter UI/vector source familyhez. | Igazolt UI/vector family igény | `LATER` | Environment asset miatt nem nyitható meg. |
| 4 | `D8-GAP-001` | Manifest geometry bővítése footprint/interaction/occluder metaadattal. | D4 + D8; I4 előtt | `DONE / MERGED` — PR #9, `177d542`, 50/50 | Külön runtime-contract csomag, assetfájl nélkül; az integrációs rés lezárva. |

## Player-facing implementációs sor

| Sorrend | ID | Csomag | Függőség | Állapot | Scope-védelem |
|---:|---|---|---|---|---|
| 1 | `I1` | Portré adaptív HUD és menü-navigációs shell. | D2 | `DESIGN-READY / IMPLEMENTATION-BLOCKED` | D2 elfogadva; külön I1 munkacsomag és vizuális/device acceptance kell. Dead button nem készülhet. |
| 2 | `I2` | Jobb oldali touch-origin floating joystick korrekció. | D1–D2, 110 mérési terv | `DONE / MERGED / DEPLOYED` — PR #11, `ad68415` | 57/57, 402×874 show/release-hide, UI exclusion és élő Pages marker. |
| 2b | `I2B` | Jobb-/balkezes Controls & HUD profile, méret, érzékenység és későbbi safe-zone layout. | I1 + I2 | `DESIGN-READY / BACKLOG / I1-DEPENDENT` | Inputfizikát nem módosíthat; külön preference schema és device proof kell. |
| 3 | `I3` | Adatvezérelt vertical-slice map layout. | D3–D4 | `DESIGN-READY / PACKAGE-BLOCKED` | D3–D4 elfogadva; külön I3 munkacsomaggal nyitható. Nincs saját map editor és production art ugyanebben a csomagban. |
| 4 | `I4` | Első jóváhagyott production assetcsalád integrációja. | D5–D8 + `D8-GAP-001` | `DONE / MERGED` — PR #10, `864b74b` | Pine standing + stump + shadow; 53/53, iPhone CSS viewport és tiszta konzol. |
| 4a | `STUMP-SCALE-01` | A production fenyőtuskó runtime-megjelenítése legyen a jelenlegi méret 2×-ese. | I4 | `BACKLOG / OWNER-REQUESTED` | A forrásasset nem változik automatikusan; a pivot, contact shadow, mélységi rendezés és interakciós terület együtt ellenőrzendő. |
| 5 | `I5` | A loop mélyítése 20–30 percre. | I1–I4 releváns részei | `BLOCKED` | Egy rendszer egyszerre; farm/harbor/mine/economy tilos. |
| 6 | `I6` | Production feedback, minimális audio és napszak proof. | Saját szerződések | `BACKLOG` | Audio, lighting és effect külön csomagok maradnak. |

## Produkciós védőhálók

| ID | Eredmény | Állapot |
|---|---|---|
| `CTRL-01` | Kockázati nyilvántartás | `DONE` |
| `CTRL-02` | ADR-rendszer és kezdeti rekordok | `DONE` |
| `CTRL-03` | Backlog/milestone board | `DONE` |
| `CTRL-04` | Bug- és playtest-folyamat | `DONE` |
| `CTRL-05` | Debug tooling terv | `DONE` |
| `CTRL-06` | Build/release-runbook | `DONE` dokumentációként; első végrehajtási proof később |
| `CTRL-07` | Vertical-slice content- és assetbudget | `DONE` v0.1; D3–D7 után frissítendő |

## Cut list — első vertical slice

A következők csak külön scope-döntéssel, a P1 lezárása után nyithatók meg:

- farm gameplay;
- harbor és hajózás;
- fishing;
- mine/quarry activity;
- teljes profession- és mastery rendszer;
- economy és trade;
- storage network;
- több restaurálható épület;
- teljes NPC relationship rendszer;
- cloud/export/import;
- monetizáció és telemetria.

## Backlogfelvételi szabály

Új ötlet először `BACKLOG` vagy `REOPEN-PROPOSAL`. Nem változtatja meg az
aktív csomagot. `READY` csak kitöltött hatásmátrix, lezárt függőségek és
elfogadott scope után lehet.
