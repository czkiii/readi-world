# Readi World — implementációs bizonyítékjegyzék

Frissítve: 2026-08-01

## Cél

A „kész” állapotot konkrét, visszakereshető bizonyítékhoz köti. Egy élő oldal
vagy egy sikeres tesztszám önmagában nem bizonyít minden acceptance feltételt.

## Bizonyítékazonosítók

- `GIT-*`: commit, tag vagy rollbackpont.
- `PR-*`: review- és merge-bizonyíték.
- `TEST-*`: automatizált teszt vagy ellenőrzés.
- `DEPLOY-*`: GitHub Pages/build bizonyíték.
- `DEVICE-*`: fizikai készülékes tesztjegyzőkönyv.
- `VISUAL-*`: screenshot, golden scene vagy art-jóváhagyás.
- `ASSET-*`: asset report, manifest és memóriaeredmény.
- `DOC-*`: dokumentációs teljesség- és hivatkozásellenőrzés.

## Jelenlegi bizonyítékok

| ID | Terület | Bizonyíték | Baseline | Állapot | Mit nem bizonyít még? |
|---|---|---|---|---|---|
| `GIT-001` | Történeti prototype | `5b79fb0`, `prototype-reference-2026-07-20`, külön RAR backup | prototype | `VERIFIED` | A backup tényleges visszaállításának rendszeres próbáját |
| `GIT-002` | Clean P0 baseline | `20f9900`, `p0-start` | clean baseline | `VERIFIED` | Későbbi rendszerek készültségét |
| `PR-001` | Clean runtime | PR #1, merge `cd967b0` | main | `VERIFIED` | Teljes PWA/offline acceptance-et |
| `PR-002` | World State v1 | PR #2, merge `3ac8874` | main | `VERIFIED` | Minden későbbi rendszer integrációját |
| `PR-003` | Save Manager v1 | PR #3, merge `238d213` | main | `VERIFIED` | Tíz fizikai iPhone resume-ciklust |
| `PR-004` | Asset manifest/registry | PR #4, merge `85c2b83` | main | `VERIFIED` | Production asset pipeline-t és atlaszproofot |
| `PR-005` | Minimális játékosi loop | PR #5, merge `ba95399` | main | `VERIFIED` technikai proof | Kész vertical slice-ot vagy production UX-et |
| `PR-006` | Crafting bridge | PR #6, merge `546310f` | main | `VERIFIED` technikai proof | Teljes craftingrendszert vagy recept-UX-et |
| `PR-007` | Resource discoverability | PR #7, merge `9992101` | main | `VERIFIED` hotfix | Production forest layoutot |
| `PR-008` | Restoration milestone | PR #8, merge `83dd8aa` | main | `VERIFIED` technikai proof | Farmrendszert vagy 20–30 perces loopot |
| `PR-009` | Asset manifest geometry v2 | PR #9, squash merge `177d542` | main | `VERIFIED` | Production assetet, renderert vagy I4 runtime-integrációt |
| `TEST-001` | Automatizált P0 tesztek | `npm run check` és 45/45 teszt | `83dd8aa` | `VERIFIED` 2026-08-01 | Eszközös UX-, performance- és vizuális acceptance-et |
| `DEPLOY-001` | Élő clean runtime | `https://czkiii.github.io/readi-world/` | `83dd8aa` | `VERIFIED` | Cache-elt kliens mindig aktuális verzióját és teljes PWA proofot |
| `DEPLOY-009` | Élő asset manifest geometry v2 | `data/assets-manifest.json` HTTP 200, `schemaVersion: 2` | `177d542` | `VERIFIED` 2026-08-02 | Production assetet vagy I4 renderer-integrációt |
| `VISUAL-001` | Mobil kézi megtekintés | Tulajdonosi iPhone screenshot és visszajelzések | PR #8 környéke | `PARTIAL` | Formális safe-area, Home Screen, performance és E2E jegyzőkönyvet |
| `DOC-001` | Implementációs/produkciós kontrollrendszer | 25 kapcsolt Markdown-fájl, 0 hibás belső link; 300 auditbejegyzés és 104 nyitott kapu ellenőrizve | 2026-08-01 | `VERIFIED` | A jövőbeli karbantartás automatikus betartását |
| `DOC-D1-001` | D1 döntés- és referencia-reconciliation | D1.1C–D1.7C, lezárt D1 riport, prototype parity inventory, reference index és 9/9 SHA-256-tal ellenőrzött kép | 2026-08-01 | `VERIFIED` / `DONE` | A floating joystick tényleges runtime-implementációját, iPhone-os hangolását vagy a D2 HUD-layoutot |
| `DOC-D2-001` | D2 HUD–menu–screen map | D2.1C–D2.8C; 10 HUD-modul, 8 P1 screen/state, 4 működő alnézet, 9 adaptív HUD-state, navigációs/back/input stack és 10 kötelező panelállapot | 2026-08-01 | `VERIFIED` / `DONE` | Pixelméretet, production artot, runtime-implementációt és fizikai iPhone acceptance-et |
| `DOC-D3-001` | D3 vertical-slice map blueprint | D3.1C–D3.9C; 8 stabil zóna, 7 landmark/anchor, 3 path, 8 beat, resource-supply invariáns, sequence-break védelem, state layer és D4 handoff | 2026-08-01 | `VERIFIED` / `DONE` | Pixel/world scale-t, production layoutot, gameplay runtime-ot, performance-ot vagy device E2E-t |
| `DOC-D4-001` | D4 visual scale és camera contract | D4.1C–D4.10C; 64 APU WU-rendszer, 15 world role range, 8 displayed/5 authored character direction, 5 kameraprofil, 9 draw layer, pivot/footprint/occlusion/device contract | 2026-08-01 | `VERIFIED` / `DONE` | Production assetet, rendererbenchmarkot, camera feelt, golden scene-t vagy fizikai device acceptance-et |
| `DOC-D5-001` | D5 art direction és kanonikus referencialap | North-star, 6 pillér, 14 world + 10 UI anchor token, semleges masterfény, 10 dimenziós art QA; 9/9 referencia A/B/C szerephez és assetcsalád-recepthez rendelve | 2026-08-02 | `VERIFIED` / `DONE` — `D5-OWN-001A` | Konkrét promptkönyvtárat, production assetet, nappal/éjjel proofot vagy runtime-integrációt |
| `DOC-D6-001` | D6 asset production pipeline | 3 grafikai réteg, projektközeli source-struktúra, 10 fő pipeline-state, stable ID/master/export revision, 5 provenance-kategória, technical spec, passport/report/registry/inventory és rollback | 2026-08-02 | `VERIFIED` / `DONE` — `D6-OWN-001A` | Promptkönyvtárat, production mastert/exportot, iPhone memória- vagy runtime-integrációs proofot |
| `DOC-D7-001` | D7 verziózott promptkönyvtár | 9 globális style/camera/light/output/negative/QA blokk; 7 family pack, 27 karakter/environment/building/ground/decor/UI/effect promptrecept, változó- és verziókontraktus, prompt-run log | 2026-08-02 | `VERIFIED` / `DONE` — `D7-OWN-001A` | D8 exact family briefet, tényleges generálást, art/technical QA-t vagy runtime-integrációt |
| `DOC-D8-001` | D8 első production family spec | Standard harvestable pine + matching stump + contact shadow; 3 Asset ID, exact D4 WU/APU/canvas/pivot/footprint, kitöltött promptok, 0.734 MiB decoded budget, file/profile/QA/rollback és `D8-GAP-001` | 2026-08-02 | `VERIFIED / DONE` — `D8-OWN-001A` | Runtime-integrációt vagy iPhone/device proofot |
| `ASSET-D8-PINE-R001` | Első production pine family | 3/3 PSD master + normalized PNG + lossless WebP + geometry/passport + QA; owner gate: `D8-OWN-001A`, `STUMP-R001`, `SHADOW-R001`; 116.71 KiB runtime file és 0.734 MiB decoded family budget | PR #10, merge `864b74b` | `VERIFIED / I4 MERGED` | Fizikai iPhone smoke-ot vagy új asset familyt |
| `PR-010` | I4 production pine family runtime-integráció | PR #10, squash merge `864b74b`; standing + stump + shadow manifest/renderer | main | `VERIFIED / MERGED / DEPLOYED` | Fizikai iPhone smoke-ot vagy új asset familyt |
| `PR-011` | I2 touch-origin floating joystick | PR #11, squash merge `ad68415`; 4 célzott teszt, 57/57 suite, 402×874 proof | main | `VERIFIED / MERGED / DEPLOYED` | Fizikai iPhone érzékenységet, balkezes profilt vagy HUD Layout Editort |
| `DEPLOY-011` | Élő I4 + I2 Pages proof | deployment `30767694622`; HTML, CSS, joystick modul, pine WebP és manifest HTTP 200; I2/I4 markerek igazoltak | `ad68415` | `VERIFIED` 2026-08-02 | Fizikai iPhone Safari/Home Screen gesztusproofot |
| `TEST-D8GAP-001` | Asset manifest geometry v2 | PR #9, merge `177d542`; schema v2 kötelező pivot/drawSize/logicalFootprint/interactionAnchor/occluderShape validáció; 50/50 teszt, syntax check és diff check sikeres | main | `VERIFIED / MERGED` | Production assetet vagy renderer-integrációt |
| `TEST-ARTTOOL-01A` | Readi Asset Prep UXP MVP | UXP manifest v5; D8 pine 3-output tooling fixture; profile/pivot/memory/geometry/passport/document/package safety contract; 14/14 Node teszt és JS syntax check | plugin `0.1.0`, 2026-08-02 | `VERIFIED / HOST-INDEPENDENT` | Photoshop DOM viselkedést, PNG exportot vagy host UI-t |
| `TEST-ARTTOOL-01A-JSX` | Readi Asset Prep Photoshop 2020 híd | ES3 JSX/ScriptUI csomag; UXP canonical profile exact match; Action-indítási, duplicate PNG-, overwrite-, ground-contact-, sidecar/passport- és local-only markerek; 6/6 Node teszt | JSX `0.1.0`, 2026-08-02 | `VERIFIED / HOST-INDEPENDENT` | Photoshop 21.1 DOM viselkedést, tényleges PNG/JSON exportot vagy Action hotkey-t |
| `HOST-ARTTOOL-01A` | Helyi Photoshop kompatibilitás | Photoshop 2020 `21.1`; `ReadiWorldScript` Actionből indított JSX; standing 384×448/pivot 192,416, stump 128×96/pivot 64,80 és shadow 128×64/pivot 64,48; normalized/review 32 bpp alpha PNG; geometry/passport JSON; változatlan master; overwrite-, hibás profil- és ground-contact blokk; `PENDING` + `NOT_INTEGRATED` státuszok | Windows, 2026-08-02 | `VERIFIED / JSX-HOST-OPERATION-PASS / ART-TOOL-01A DONE / UXP-DEFERRED` | Valódi production artwork vizuális QA-ját, runtime-integrációt vagy a későbbi UXP host proofot |

## Hiányzó milestone-bizonyítékok

| Szükséges ID | Követelmény | Mikor kötelező? |
|---|---|---|
| `DEVICE-P1-001` | iPhone 16 Pro Safari teljes 20–30 perces E2E | P1 lezárás |
| `DEVICE-P1-002` | iPhone Home Screen offline + 10 resume-ciklus | P1 lezárás |
| `DEVICE-P1-003` | 30 perces FPS-, memória-, melegedés- és akkumulátormérés | P1/P2 proof |
| `VISUAL-P1-001` | Jóváhagyott HUD állapotok több safe-area mellett | HUD-csomag lezárás |
| `VISUAL-P1-002` | Vertical-slice map before/after golden screenshot | Map/art milestone |
| `ASSET-P1-001` | Első production assetcsalád report, manifest és memória | Első assetintegráció |
| `ASSET-P1-002` | Ground tile 3×3 seamless proof | Ground milestone |
| `TEST-P1-001` | Vertical-slice E2E és save-resume regresszió | P1 lezárás |
| `LOC-P1-001` | Angol string inventory és missing-key report | P1 lezárás |
| `HOST-ARTTOOL-01A-UXP-PROOF` | Photoshop 24+ + UXP Developer Tool standing/stump/shadow kézi acceptance | Csak a dokkolt UXP út későbbi aktiválása előtt |

## Új bizonyíték sablonja

| Mező | Tartalom |
|---|---|
| ID | Stabil bizonyítékazonosító |
| Dátum | A mérés vagy build ideje |
| Commit/build | Pontos SHA vagy verzió |
| Környezet | Eszköz, OS, böngésző, mód |
| Eljárás | Ismételhető tesztlépések |
| Elvárt eredmény | Előre rögzített acceptance |
| Tényleges eredmény | Szám, screenshot vagy napló |
| Következtetés | Pass, fail vagy korlátozott bizonyíték |
| Kapcsolt döntés | Auditpont és mátrixsor |

## Szabály

Az újabb bizonyíték nem törli a korábbit. Ha egy eredmény elavul, `SUPERSEDED`
jelölést és az új bizonyíték ID-ját kapja.
