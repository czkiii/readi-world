# Readi World — implementációs ellenőrzőmátrix

Frissítve: 2026-08-01  
Követett runtime baseline: `83dd8aa` (`main`)  
Aktív proof: `https://czkiii.github.io/readi-world/`

## 1. A dokumentum célja

Ez a fájl kapcsolja össze a lezárt tervezési döntéseket a tényleges
megvalósítással. Nem írja felül a kanonikus auditot, és nem jelent önmagában
implementációs felhatalmazást.

A mátrix feladata, hogy minden fontos területről megmutassa:

- mi a jóváhagyott játékosi és technikai elvárás;
- hol található a döntés forrása;
- mi valósult meg ténylegesen;
- mi csak ideiglenes vagy részleges;
- milyen bizonyíték alapján tekinthető késznek;
- melyik következő, elkülönített munkacsomag zárhatja le.

## 2. Forrásprioritás

Ellentmondás esetén az `AGENTS.md` szerinti sorrend érvényes:

1. `docs/Dokumentumaudit.txt`;
2. `docs/Audit-terkep.txt`;
3. `docs/Gameplay-bible.txt`, ahol az audit nem írja felül;
4. `docs/Fajl-es-kep-protokoll.txt` még érvényes munkafolyamata;
5. runtime- és referencia-README-k mint állapotleírások.

Az `Audit-tervezet.txt` ajánlásokat tartalmaz, de csak a kanonikus auditba
átvett pontjai számítanak lezárt döntésnek. A beszélgetésben megerősített, de
a kanonikus fájlban még nem visszakereshető döntéseket a mátrix külön jelöli;
ezeket nem szabad csendben elveszettnek vagy automatikusan kanonikusnak
tekinteni.

## 2.1 Kapcsolt implementációs nyilvántartások

A részletes nyilvántartások az
[`implementation-control/`](implementation-control/README.md) mappában
találhatók:

| Nyilvántartás | Szerep |
|---|---|
| [Teljes auditpont-lefedettségi jegyzék](implementation-control/Auditpont-lefedettsegi-jegyzek.md) | Az 1–299. pont és a 72.5 kiegészítés 300 bejegyzéses, pontonkénti követése. |
| [Távlati rendszerregister](implementation-control/Tavlati-rendszerregister.md) | A P1-en túli farming, fishing, mine, harbor, NPC, profession, economy, interior és más rendszerek scope-védett helye. |
| [Döntésváltozási napló](implementation-control/Dontesvaltozasi-naplo.md) | Pontosítások, mérések, újranyitások és felülírások története. |
| [Bizonyítékjegyzék](implementation-control/Bizonyitek-jegyzek.md) | Commit-, PR-, teszt-, deployment-, device-, visual- és assetproofok. |
| [Eszköz- és képernyőmátrix](implementation-control/Eszkoz-es-kepernyomatrix.md) | iPhone, Home Screen, más telefon, iPad, landscape, Android és desktop támogatási szintje. |
| [Munkacsomag-hatásmátrix](implementation-control/Munkacsomag-hatasmatrix.md) | Kötelező scope-, függőség-, kockázat- és regressziós sablon. |
| [Nyitott döntések és mérések](implementation-control/Nyitott-dontesek-es-meresek.md) | 69 tulajdonosi és 35 mérési kapu, plusz újranyitási javaslatok. |
| [Dokumentációs szinkronszabály](implementation-control/Dokumentacios-szinkronszabaly.md) | A chatben született döntés tartós projektmemóriává alakításának folyamata. |
| [Produkciós leltárak indexe](implementation-control/Produkcios-leltarak-index.md) | UI-, map-, reference-, asset-, prompt-, audio-, localization-, content- és tesztleltárak kijelölt helye. |
| [Központi kockázati nyilvántartás](implementation-control/Kockazati-nyilvantartas.md) | Pontozott kockázat, trigger, megelőzés, visszaesési terv és felelős. |
| [ADR-rendszer](implementation-control/adr/README.md) | A nagy technikai döntések indoka, alternatívái, következménye és újranyitási triggere. |
| [Fejlesztési backlog és milestone board](implementation-control/Fejlesztesi-backlog-es-milestone-board.md) | Függőségvezérelt munkasor, WIP-limit, readiness és P1 cut list. |
| [Bug- és playtest-folyamat](implementation-control/Bug-es-playtest-folyamat.md) | Hiba, UX finding, design gap, content gap és változtatási kérés kontrollált feldolgozása. |
| [Debug tooling terv](implementation-control/Debug-tooling-terv.md) | Privacy-safe inspectorok, overlayek, profiler és golden save fixture-ek terve. |
| [Build- és release-runbook](implementation-control/Build-es-release-runbook.md) | Draft PR-től Pages smoke-on át rollbackig tartó ismételhető kiadási útvonal. |
| [Vertical-slice content- és assetbudget](implementation-control/Vertical-slice-content-es-assetbudget.md) | A P1 20–30 perces tartalmi, art-, UI-, audio- és technikai felső kerete. |

### Lefedettségi összesítés

- 1–105: 105 kanonikusan lezárt pont.
- 72.5: egy külön kanonikus anti-exploit kiegészítés.
- 106–299: 194 hiánytalanul nyilvántartott pont.
- A 106–299. tartomány tényleges jelenlegi állapota: 88 kanonizált, 69
  tulajdonosi döntést igénylő, 35 prototípust vagy mérést igénylő és 2
  korábbi kanonikus ponttal lefedett bejegyzés.
- Nyilvántartott auditbejegyzések összesen: 300.

## 3. Státuszjelölések

### Döntési státusz

| Jelölés | Jelentés |
|---|---|
| `LOCKED` | Kanonikus auditban lezárt döntés. |
| `OWNER-CONFIRMED` | A tulajdonos megerősítette, de pontos kanonikus hivatkozása még rendezendő. |
| `REOPEN-PROPOSAL` | Korábbi döntés felülvizsgálata felmerült, de még nincs új döntés. |
| `OPEN` | Tulajdonosi választás, prototípus vagy mérés szükséges. |

### Implementációs státusz

| Jelölés | Jelentés |
|---|---|
| `VERIFIED` | Megvalósítva, releváns teszttel vagy buildbizonyítékkal. |
| `PARTIAL` | Az alap működik, de a teljes szerződés még nem teljesül. |
| `PLACEHOLDER` | Csak technikai vagy vizuális helykitöltő. |
| `MISSING` | Nincs megvalósítva. |
| `ART-BLOCKED` | Jóváhagyott assetcsalád vagy art-specifikáció szükséges. |
| `MEASUREMENT` | Valódi eszközön vagy prototípuson mérendő. |
| `OUT-OF-SLICE` | Tudatosan nem része az első vertical slice-nak. |

`VERIFIED` csak akkor használható, ha a fájl, automatizált teszt, rögzített
kézi teszt, képernyőkép vagy deployment egyértelmű bizonyítékot ad.

## 4. A most helyreállított döntési emlékezet

| Terület | Jelenlegi irány | Forrás / állapot | Következmény |
|---|---|---|---|
| Világstruktúra | Hibrid: tartós, összefüggő fő falu; távoli activityk és régiók külön jelenetek. | `Dokumentumaudit` 9C — `LOCKED` | Nem új kérdés. A vertical-slice map blueprintnek ezt kell alkalmaznia. |
| Elhelyezés | Nagy funkcionális objektumok szabályozott területen vagy rejtett rácson; kisebb dekorok szabadabban. | `Dokumentumaudit` 8C — `LOCKED` | A fejlesztői map layout és a későbbi játékosi tereprendezés külön eszköz/probléma. |
| Kamera | Ortografikus hatású 3/4 top-down; normál játékban követő kamera, milestone-nál context profile, későbbi szerkesztéskor szabadabb pan/zoom. | `Dokumentumaudit` 11C, 114–116, D4.1C–D4.10C; `docs/design/Visual-scale-and-camera-contract.md` — `D4-DONE` | Smoothing/look-ahead és pontos safe-area érték fizikai eszközön mérendő. |
| Jobbkezes joystick | Jobb oldali alapelrendezés, balkezes tükrözés, konfigurálható méret és érzékenység; a későbbi HUD-menü a támogatott vezérlők és HUD-elemek elhelyezését testre szabhatja. | `Dokumentumaudit` 111, D1.2C–D1.3C — `LOCKED` | I2 jobbkezes floating alap helyben kész; balkezes/configurable profil külön későbbi csomag. |
| Floating joystick | Érintés helyén jelenik meg az aktív kézprofilhoz tartozó szabad játékterületen, húzásra mozgat, elengedéskor eltűnik; UI-érintés nem aktiválja. Jobbkezes alapban ez a jobb oldal. | `Dokumentumaudit` D1.2C–D1.3C — `LOCKED` | `I2 LOCAL QA PASS`: touch-origin, drag, release-hide, UI exclusion és lifecycle reset kész. |
| Adaptív HUD | Csak az aktuális kontextushoz szükséges információ látszik; nincs permanens ACT gomb. | `Dokumentumaudit` 101–103, 227–230; `Gameplay-bible` 17.17 — `LOCKED` elv | A jelenlegi két számláló nem tekinthető kész HUD-nak. |
| Tool-választás és munkaszándék | Üres kézben a játékos szabadon sétál, és nem indul eszközös munka. Egy tool — például a fejsze — kiválasztása maga a tartós munkaszándék: érvényes célpont közelében a megfelelő munka automatikusan elindul, külön ACT vagy második megerősítés nélkül. Tool elrakása, eltávolodás vagy érvényes megszakítás leállítja. | `Dokumentumaudit` 101, 133–134 és D1.5C — `LOCKED` | Később célpontprioritás-, megszakítás- és mobilérzet-proof. |
| Menüstruktúra | Következetes főmenü-hierarchia; gyakori funkció kb. két lépésen belül; ritka adminisztratív elem nem terheli a HUD-ot. | 228. pont jelenleg tervezeti/mérési részlet; tulajdonosi megerősítés — `OWNER-CONFIRMED` | Külön HUD–menu–screen map szükséges, működő tartalom nélkül is megtervezhető. |
| Elsődleges nyelv | Angol; minden játékosszöveg lokalizációs kulcson keresztül jelenjen meg. | `Dokumentumaudit` 255.3C, D1.1C — `LOCKED` | A D2 képernyőszövegei már angol source keyekkel tervezendők. |
| Épületbelsők | Csak a Player Home kap teljes, bejárható belső teret; más épületek külső building screent vagy külön activity scene-t használnak. | `Dokumentumaudit` D1.4C — `LOCKED` | További belső tér külön scope- és assetbudget-döntés; Forester Hut-belső nincs az első slice-ban. |
| Referenciaképek | A tulajdonos több kedvelt látványtervet adott; ezek a vizuális szándék részét képezik. | `Reference-index.md` + `Canonical-reference-sheet.md`; 9 hash-ellenőrzött kép, háromszintű hierarchia és family recipe — `D5-DONE` | A bal oldali fix joystick és a permanens ACT ikon nem veendő át. |
| Szerkeszthető grafikai masterek | Projektközeli `art-source/` alatt, inbox/brief/master/normalized/review/archive rétegekben; runtime exporttól elkülönítve. | D6 pipeline és source inventory — `D6-DONE` | Tényleges master csak D8 family csomagban. |
| Analitika és adatküldés | Jelenleg nincs analitika vagy automatikus hálózati adatküldés. Ennek későbbi engedélyezése felmerült. | `Dokumentumaudit` 251.2C, 251.4C — jelenleg `LOCKED`; új felvetés: `REOPEN-PROPOSAL` | Addig semmi nem kapcsolható be. Új döntéshez külön privacy/telemetry dokumentum kell a 292. pont szerint; a játék telemetria nélkül is teljesen működőképes marad. |

## 5. Technikai alapok implementációs mátrixa

| Rendszer | Elvárás | Jelenlegi bizonyíték | Státusz | Hiány / következő csomag |
|---|---|---|---|---|
| Git baseline és rollback | Történeti prototype-tag, clean baseline, kis célzott commitok. | `prototype-reference-2026-07-20`, `p0-start`, PR #1, `cd967b0` | `VERIFIED` | Minden további csomagnál megőrzendő. |
| Vékony runtime shell | Az `index.html` ne tartalmazzon monolitikus játéklogikát. | `runtime/index.html`, `src/bootstrap.js` | `VERIFIED` | Új rendszer se növessze vissza a shellt. |
| PWA/webapp cél | GitHub Pages, iPhone Safari és Home Screen proofútvonal. | `runtime/manifest.json`, élő Pages URL | `PARTIAL` | A teljes offline/Home Screen acceptance és formális eszközjegyzőkönyv még hiányzik. |
| World State v1 | Verziózott igazságforrás, validált parancsok, tranzakciók, események. | `src/core/world-state/*`, tesztek, PR #2 | `VERIFIED` az aktuális P0-scope-ban | A további rendszerek csak ezen keresztül írhatnak tartós állapotot. |
| Save Manager v1 | Verziózott envelope, integritás, backup, migráció, platformadapter. | `src/core/save/*`, IndexedDB adapter, tesztek, PR #3 | `VERIFIED` az aktuális P0-scope-ban | Valódi tízciklusos iPhone resume-proof milestone előtt kötelező. |
| Asset manifest és registry | Stabil ID, role/tag kérés, fallback és validáció. | `data/assets-manifest.json`, `src/core/assets/*`, tesztek, PR #4 | `VERIFIED` alapszerződés | Production asset még nincs; pipeline, atlasz- és vizuális validáció hiányzik. |
| Minimális mozgás | Mobilos mozgás, menthető pozíció, frame-rate-független logika. | `minimal-loop-runtime.js`, `virtual-joystick.js`, PR #5 | `PARTIAL` | Joystick-viselkedés hibásan fix; collision, kameraérzet és eszközmérés nem teljes. |
| Gathering | Látható erőforrás, közelségi gyűjtés, tartós állapot. | PR #5 és #7, minimal-loop tesztek | `PLACEHOLDER` | Csak négy kódrajzolt ág; nincs erdőterület, respawn/balansz vagy production asset. |
| Inventory | A slice alapanyagai és craft-eredménye tartósan kezelhető. | minimal-loop state és HUD-számlálók | `PARTIAL` | Nincs valódi inventorymodell vagy felület; a `1/3` jelenleg receptszámlálóként félreérthető. |
| Crafting bridge | Stabil recept: 3 wood → 1 repair timber. | `minimal-crafting-contract.js`, PR #6, tesztek | `VERIFIED` minimális technikai híd | Crafting UX, receptnézet, feedback és tartalmi balansz hiányzik. |
| Forester Hut restoration | Repair timber felhasználása, tartós állapotváltozás és jutalom. | PR #6 és #8, tesztek | `VERIFIED` minimális technikai híd | A teljes 20–30 perces ív, production látvány és gazdagabb visszajelzés hiányzik. |
| Milestone/farm-path preview | Faluszint 1 és látható kapunyitás. | PR #8, persistent flag | `PLACEHOLDER` | Nem farmrendszer és nem új játszható terület; ezt a UI-nak egyértelműen kell kommunikálnia. |
| Automatizált tesztek | Logikai, mentési és regressziós alaptesztek. | `runtime/tests/*`; legutóbbi ismert eredmény: 45/45 | `VERIFIED` az aktuális kódra | Dokumentummódosítás után újrafuttatandó állapotellenőrzés; P1-hez további E2E és mobilteszt kell. |

## 6. Játékos számára látható réteg

| Terület | Célállapot | Jelenlegi állapot | Státusz | Lezáró bizonyíték |
|---|---|---|---|---|
| Portré HUD-shell | Avatar/szint, releváns erőforrások, idő/napszak, menü és kontextushoz igazodó modulok. | Technikai felső sáv és számlálók. | `PLACEHOLDER` | Jóváhagyott mobil wireframe + iPhone screenshot + állapotvariációk. |
| Adaptív feloldások | A HUD a progressionnel bővül, a még nem releváns funkciók rejtve vagy érthetően zárolva. | Nincs általános unlock-driven HUD. | `MISSING` | Kezdő, köztes és Forester-restored HUD-állapot tesztje. |
| Főmenü és alnézetek | P1: Goals/Project, Inventory & Tools, Workbench/Crafting és Settings; későbbi rendszerek stabil, bővíthető hierarchiában, de dead button nélkül. | `docs/design/HUD-menu-screen-map.md`, D2.1C–D2.8C; runtime nincs. | `D2-DONE / IMPLEMENTATION-MISSING` | Külön I1 shell és telefonos navigációs proof. |
| Kontextuális interakció | Nincs permanens ACT; automatikus vagy egyetlen stabil, helyzeti prompt. | Az automatikus minimal-loop működik, production prompt nincs. | `PARTIAL` | Normal, locked, progress, interrupted, success és error állapotok. |
| Floating joystick | Jobb oldali szabad területen touch-origin, release-hide, UI exclusion; balkezes tükör. | I2 jobbkezes viselkedés PR #11-ben merge-elve és Pages-en publikálva; 57/57 + 402×874 proof. | `DONE / MERGED / DEPLOYED` — `ad68415` | Fizikai iPhone hangolás; I2B kézprofil I1 után. |
| Kamera és zoom | 55°±5° vizuális eleváció, 20 PPWU normál cél, 12–26 hard guard, öt profil, safe framing, stable bounds és Reduced Motion. | D4.1C–D4.10C; runtime csak egyszerű követés. | `D4-DONE / RUNTIME-PARTIAL` | Camera proof több viewporton. |
| Térképkompozíció | Egybefüggő arrival/village → workyard → forest edge/grove → Forester Hut főgerinc, restoration után megnyíló keleti farmösvénnyel. | `docs/design/Vertical-slice-map-blueprint.md`, D3.1C–D3.9C; runtime továbbra is kis technikai próbapálya. | `D3-DONE / RUNTIME-PLACEHOLDER` | D4 scale/camera contract, majd I3 útvonalproof. |
| Világállapot-változás | A restauráció látványosan és tartósan megváltoztatja a helyet. | Kapunyitás, virágok és banner. | `PARTIAL` | Előtte/utána production kompozíció és mentés-visszatöltési összehasonlítás. |
| Napszak/időjárás | Fokozatos, olvasható hangulatváltozás, globális idő és regionális időjárás. | Nincs játékos számára kész rendszer. | `MISSING` | Art/lighting contract + működő, teljesítménymért prototípus. |
| Scenic Mode | HUD elrejthető, a világ és ambience tovább él. | Nincs. | `OUT-OF-SLICE` / későbbi | Külön UX- és inputcsomag. |

## 7. Art- és assetfelkészültségi mátrix

| Szerződés / család | Már rögzített alap | Hiányzó konkrétum | Státusz | Tervezett dokumentum vagy proof |
|---|---|---|---|---|
| Globális art direction | Meleg, cozy, kézzel festett/storybook; tiszta sziluett; enyhén döntött top-down; puha árnyék; nincs neon vagy kemény pixel-art. | D5 contract: north-star, 6 pillér, 24 anchor token, anyag-/fény-/family irány, hard fail és 20 pontos QA. | `D5-DONE` — `D5-OWN-001A` | D6–D8 kötelező input |
| Referenciaképek | Több tulajdonosi látványterv rendelkezésre állt a beszélgetésben. | `Reference-index.md` + `Canonical-reference-sheet.md`, 9/9 tartós kép, SHA-256, A/B/C hierarchia, KEEP/AVOID és family recipe. | `D5-DONE` | D7 prompt- és D8 family input |
| Perspektíva és lépték | Ortografikus hatású 3/4 top-down, 55°±5° eleváció, 64 source px/WU, karaktertől hutig közös scale sheet. | `docs/art/Visual-scale-sheet.md` + `docs/design/Visual-scale-and-camera-contract.md`, D4.1C–D4.10C | `D4-DONE` | Golden scale scene és D8 családspecifikációk |
| Világépítési módszer | Hibrid világ és hibrid elhelyezés lezárt. | Ground/út modulok, authored landmarkok, dekorációs réteg és scene boundary pontos szerződése. | `MISSING` | Vertical-slice map blueprint + ground proof |
| Fény és napszak | Semleges, enyhén meleg production master; puha felső-bal key, kontaktárnyék; külön runtime tint/light és emissive role. | D5 szerződés elfogadva; nappal/éjjel proof scene még nincs. | `D5-DONE / PROOF-MISSING` | Későbbi lighting proof |
| Promptarchitektúra | Egységes, reprodukálható assetcsaládok tulajdonosi igénye. | D7 global/style/camera/light/output/negative/QA blokkok, változókontraktus, run log, 7 family pack és 27 promptrecept elkészült. | `D7-DONE` — `D7-OWN-001A` | D8 kötelező input |
| Karakterek és portrék | Emberi, barátságos, tiszta sziluettű irány; 8 displayed/5 authored direction. | Identity, gameplay direction, animation key pose és portrait prompt kész; exact frame/canvas/output family spec még nincs. | `D7-PROMPT-READY / SPEC-MISSING` | Character family spec + animációs proof |
| Fák, kövek, gyűjthetők | Szemantikus role/tag és fallback alap működik. | D8 standard pine: standing `384×448`, stump `128×96`, shadow `128×64`; PR #10-ben manifestvezérelt, pivothelyes runtime-integráció elkészült. | `I4-DONE / MERGED` — `864b74b` | Fizikai iPhone smoke és későbbi új family külön csomag |
| Épületek és fejlődési állapotok | Definíció/instance szétválasztás, stabil ID és tartós state. | Identity base, geometry-preserving restoration edit és emissive prompt kész; exact Forester Hut spec még nincs. | `D7-PROMPT-READY / SPEC-MISSING` | Building family spec; elsőként mérlegelendő Forester Hut |
| Ground, utak, seamless tile | Négyirányú ismétlés és valódi 3×3 teszt kötelező. | Seamless candidate, transition, path és variation prompt kész; tile-méret és proof D8/I4 feladat. | `D7-PROMPT-READY / PROOF-MISSING` | Ground family spec + 3×3 proof |
| Dekoráció | Kisebb dekorok szabadabb elhelyezése. | Single prop, family variant és cluster preview prompt kész; exact inventory/snap D8 után. | `D7-PROMPT-READY / SPEC-MISSING` | Decoration family spec |
| UI-panelek és ikonok | Adaptív, portrait-first HUD; generált szöveg nem lehet a kép része. | 9-slice panel, icon, portrait cutout és state marker prompt kész; exact grid/inset family spec még nincs. | `D7-PROMPT-READY / PROOF-MISSING` | UI asset spec + stretch/size proof |
| Effektek, árnyékok, részecskék | Információ nem közölhető kizárólag effekttel; Reduced Motion támogatás. | Contact shadow, hit, pickup, restoration és Reduced Motion prompt kész; blend/timing/atlasz spec még nincs. | `D7-PROMPT-READY / SPEC-MISSING` | Effects family spec |
| Masterforrások | Projektközeli `art-source/` gyökér; külön inbox, brief, master, normalized, review és archive; runtime-tól elválasztva. | A pine family 3/3 PSD mastere, normalized exportja és hash-azonos helyi archive backupja elkészült. | `D8-FAMILY-VERIFIED` | I4 csak runtime-másolatot készíthet |
| Export és optimalizálás | Manifest/registry, 128 MB aktív textúrakeret, egy assetcsalád/kör. | D6 sRGB/straight-alpha, PNG normalized, WebP/PNG runtime, 2048 atlaszkezdőprofil, 9-slice, seamless és decoded-memory szabály elfogadva. | `D6-DONE / DEVICE-PROOF-MISSING` | Első D8/I4 family report |
| Asset passport/report | Stabil ID, master/export revision, provenance, geometry, QA, fallback, performance és rollback. | Pine family: 3/3 passport, registry, report és PR #10 runtime evidence; merge `864b74b`. | `I4-DONE / MERGED` | Deploy/device evidence hozzáadása |

## 8. További, könnyen elfelejthető produkciós területek

| Terület | Már meglévő elv | Hiány | Prioritás |
|---|---|---|---|
| Lokalizáció | Minden játékosszöveg lokalizációs kulcsot használ. | Angol source-locale rögzítése, font/ékezet, szöveghossz és fallback workflow. | P1 előtt |
| Audio | Régió-, napszak-, időjárás- és beltérfüggő rétegzés tervezett. | Audio direction, loop/export/budget és SFX eseménylista. | A production art mellett indítható |
| Hozzáférhetőség | Safe area, Reduced Motion, többcsatornás visszajelzés, balkezes profil. | Kontraszt, touch target, szövegméret, haptika és beállítási képernyő proof. | HUD-spec része |
| UI-állapotok | Loading/progress/saving/success/warning/error külön komponens. | Empty, locked, offline, interrupted, resume és recovery képernyők. | HUD/menu spec része |
| Assetjog és eredet | Külön policykapu szükséges a kiadás előtt. | AI/reference/licenc provenance nyilvántartás. | Az első production assettől |
| Kézi playtest | iPhone proofkapu és 10 resume-ciklus lezárt elv. | Verziózott tesztlap, megfigyelések, screenshotok és eszközadatok. | Minden player-facing csomagnál |
| Analitika/telemetria | Jelenleg tiltott; offline működés kötelező. | Cél, adatminimalizálás, consent, retention, szolgáltató, törlés és opt-out döntése. | Csak külön újranyitott policy után |
| Photoshop/Illustrator automatizálás | D6 asset pipeline, jóváhagyott pivot-contract és D8 exact profile rendelkezésre áll. | `ART-TOOL-01A` lezárt operatív út: Photoshop 2020 JSX/Action profile/canvas/pivot/guides/validate/export/memory/sidecar/passport. Az Asset Prep Optimization v1 stabil Action-dispatchert, max. 3 GUI-képes budgetet, egyetlen teljes retryt, hibakatalógust és runtime-védett preflight/postflight QA-t ad; automata teszt 7/7, D standing pine postflight PASS. A 14/14 tesztes UXP panel későbbi kényelmi út, Photoshop 24+ host proofja csak annak aktiválását blokkolja. Illustrator később. | `DONE / OPTIMIZED / JSX PS21 HOST-ACCEPTED / UXP DEFERRED` |

## 9. Első vertical slice megfelelési mátrix

Forrás: `Dokumentumaudit` 277C. A technikai toy loop nem azonos a kész
vertical slice-szal.

| Követelmény | Jelenlegi állapot | Státusz |
|---|---|---|
| 20–30 perces első játékosi ív | A jelenlegi hurok néhány perc alatt teljesíthető. | `MISSING` |
| Kezdetben üres fő falu korlátozott része | Egyszerű technikai pálya van. | `PLACEHOLDER` |
| Külön érzékelhető forest terület | Nincs valódi erdőterület vagy átmenet. | `MISSING` |
| Sérült Forester Hut felfedezése | Feliratozott egyszerű épületforma. | `PLACEHOLDER` |
| Mozgás és interakció | Működik, de az input UX nem végleges. | `PARTIAL` |
| Gathering | Négy ág közelségi felvétele működik. | `PARTIAL` |
| Inventory | Csak minimális számlálók és state mezők. | `PARTIAL` |
| Egy crafting recept | Működő 3 wood → 1 repair timber recept. | `VERIFIED` minimális kontraktus |
| Épület-helyreállítás | Működő tartós állapotváltás. | `VERIFIED` minimális kontraktus |
| Jutalom és látható világváltozás | Faluszint, kapu és virág placeholder. | `PARTIAL` |
| Mentés–kilépés–folytatás | Technikai mentés működik. | `VERIFIED` automatizáltan; mobil E2E még hiányzik |
| Production HUD/UX | Nincs. | `MISSING` |
| Production asset- és hangkészlet | Nincs. | `ART-BLOCKED` |
| iPhone Safari/Home Screen E2E proof | Informális kézi megtekintés történt; teljes jegyzőkönyv nincs. | `MEASUREMENT` |
| Tartalom-, asset-, lokalizáció- és tesztleltár | Nincs teljes P1-leltár. | `MISSING` |

## 10. Dokumentációs munkasor

Ezek önálló dokumentációs csomagok. Egy csomag sem módosíthat runtime-kódot.

| Sorrend | Csomag | Eredmény | Függőség |
|---:|---|---|---|
| D0 | Implementációs és produkciós irányítórendszer | Főmátrix + auditjegyzék + rendszerregister + változásnapló + bizonyíték-, eszköz-, hatás-, kockázat-, ADR-, backlog-, bug/playtest-, debug-, release- és budgetrendszer. | elkészült dokumentációs baseline |
| D1 | Döntés- és referencia-reconciliation | Angol source-locale, tool-szándék, gameplay-beatek, jobb/balkezes floating profil és Player Home-only belsőtér lezárva; prototype parity inventory és 9 képes reference pack elkészült. | `DONE` — D1.1C–D1.7C, `DOC-D1-001` |
| D2 | HUD–menu–screen map | 10 HUD-modul, 8 P1 screen/state, négy működő alnézet, adaptív gameplay-state-ek, back/input stack, kézprofil, későbbi HUD Layout Editor route és egységes panelállapotok dokumentálva. | `DONE` — D2.1C–D2.8C, `DOC-D2-001` |
| D3 | Vertical-slice map blueprint | 8 zóna, 7 landmark/anchor, 3 path, 8 progression beat, resource-supply invariánsok, HUD-safe composition, state-driven before/after és P1 cut list dokumentálva. | `DONE` — D3.1C–D3.9C, `DOC-D3-001` |
| D4 | Visual scale és camera contract | WU/APU rendszer, 15 world role scale range, 8 displayed/5 authored character direction, öt kameraprofil, 9 draw layer, safe framing, occlusion és device/render-scale stratégia dokumentálva. | `DONE` — D4.1C–D4.10C, `DOC-D4-001` |
| D5 | Art direction és reference sheets | North-star, paletta, anyag, fény, családirány, reference hierarchy és art QA elkészült. | `DONE` — `D5-OWN-001A`, `DOC-D5-001` |
| D6 | Asset production pipeline | Source/master → normalized → runtime export, technikai profil, passport, report, registry, backup, provenance és rollback elkészült. | `DONE` — `D6-OWN-001A`, `DOC-D6-001` |
| D7 | Verziózott promptkönyvtár | Global/style/camera/light/output/negative/QA blokkok, hét family pack, 27 promptrecept és run log elkészült. | `DONE` — `D7-OWN-001A`, `DOC-D7-001` |
| D8 | Első assetcsalád specifikációja | Standard harvestable pine standing + matching stump + contact shadow: exact prompt, canvas, pivot, footprint, budget, QA és integration gap. | `DONE / FAMILY READY` — `D8-OWN-001A`, `STUMP-R001`, `SHADOW-R001`, 2026-08-02 |

Javasolt első production assetcsalád csak a D3–D7 lezárása után választható
ki. A választást a vertical slice legnagyobb vizuális kockázata, nem a
legkönnyebben generálható kép határozza meg.

## 11. Implementációs munkasor a dokumentáció után

| Sorrend | Elkülönített csomag | Megjegyzés |
|---:|---|---|
| I1 | Portré HUD és menü-navigációs shell | Placeholder ikonokkal is elkészíthető; nincs szükség minden menü működésére. |
| I2 | Jobb oldali floating joystick korrekció | Külön inputcsomag, iPhone-on hangolandó. |
| I3 | Vertical-slice map layout | Adatvezérelt layout; külön map editor egyelőre nem szükséges. |
| I4 | Első jóváhagyott assetcsalád integrációja | Egyetlen család, manifest, report és vizuális regresszió. |
| I5 | Játékosi loop tartalmi mélyítése | A 20–30 perces ív felé, scope-on kívüli farm/harbor/mine nélkül. |
| I6 | Production feedback, audio és napszak proof | Csak a hozzájuk tartozó szerződések után. |

Az I1 és I2 sorrendje a D2 lezárásakor felcserélhető, de egy munkacsomagban
nem kombinálhatók. Az assetcsere, runtime-architektúra, save-schema és
tartalombővítés továbbra is külön commitot igényel.

### D8 után javasolt külön art-tool csomag

`ART-TOOL-01A`: Photoshop UXP **Readi Asset Prep** MVP profilebetöltéssel,
canvas/pivot/guide validációval, normalized/review exporttal, memória-becsléssel
geometry sidecarral és passport drafttal. A tulajdonos 2026-08-02-án elfogadta;
implementációja a pivot-contract jóváhagyása után külön munkacsomag. Nem része az
I4 runtime-integrációnak. Illustrator adapter csak külön későbbi UI/vector family
igénye után készül.

### Nyitott integrációs rés

`D8-GAP-001`: a runtime manifest geometry v2 külön logical footprintet,
interaction anchort és occluder shape-et tárol. A PR #9 a `177d542` squash
commitként mainre merge-elve; 50/50 teszt sikeres. Az integrációs rés lezárt.

### Pivot- és generálási pontosítás

`PIVOT-OWN-001`: a production pivot négyrétegű lánc: nem exportált PSD-guide,
family profile/passport numerikus cél, normalizált export tényleges pixelérték,
majd geometry sidecar/runtime manifest normalizált érték. A prompt teljes
talajkontaktust és biztonságos margót kérhet, de exact pixelpivotot nem bizonyít.
Állapot: `DONE`; elfogadott döntés: `PIVOT-OWN-001A`, 2026-08-02.

## 12. Definition of Ready — mikor kezdhető nagyobb player-facing munka?

Egy rendszer vagy assetcsalád akkor nyitható meg, ha:

- van egyetlen, világos célja;
- minden releváns kanonikus döntés hivatkozva van;
- a szükséges tulajdonosi döntések nem csak emlékezetből következnek;
- ismert a módosítható és védett fájlkör;
- van képernyő-, állapot- vagy asset-specifikáció;
- ismert a World State-, save-, asset-, audio- és lokalizációs hatás;
- rögzített az elfogadás és a regressziós ellenőrzés;
- van visszaállítási pont;
- player-facing munkánál szerepel iPhone-os ellenőrzés;
- production assetnél van forrás, promptverzió, export, passport és
  vizuális acceptance;
- nincs kezeletlen `CRITICAL` kockázat vagy `BLOCKED` hatásterület;
- drága vagy több rendszert érintő technikai választáshoz elfogadott ADR van;
- a csomag szerepel a backlogban, és nem sérti a WIP-limitet vagy a P1 cut listet.

Ha ezek közül valamelyik hiányzik, az elem nem „elfelejtett”, hanem láthatóan
`OPEN`, `MISSING`, `ART-BLOCKED` vagy `MEASUREMENT` állapotban marad.

## 13. Aktív eltérések és döntési kapuk

1. **A jelenlegi joystick fix, miközben a tulajdonosi cél floating.** Ezt nem
   vizuális finomításként, hanem inputviselkedési korrekcióként kell kezelni.
2. **A jelenlegi HUD nem a referencia-kompozíció implementációja.** A B+ irány
   és az adaptív HUD megmaradt, de a layout még nincs lezárva.
3. **A jelenlegi map nem a vertical slice térképe.** Technikai próbaterület.
4. **A referencia-képek D1-ben tartósan katalogizálva lettek.** A kilenc eredeti
   kép hash-ellenőrzött; vizuális szerződéssé és production acceptance-szabállyá
   emelésük D5 feladata.
5. **A D1 korábbi bizonytalanságai lezárultak.** Angol source-locale; jobbkezes
   jobb oldali floating alap balkezes és későbbi HUD-testreszabási lehetőséggel;
   kizárólag Player Home teljes belső térként; tool-selected = work-intent.
6. **Az analitika esetleges engedélyezése újranyitási javaslat.** A 251. és
   292. döntés változatlanul érvényes, amíg külön jóváhagyott adatkezelési
   döntés nem születik.

## 14. Karbantartási szabály

Minden merge vagy elfogadott dokumentumdöntés után frissíteni kell legalább:

- a követett baseline commitot;
- az érintett sor státuszát;
- a bizonyíték hivatkozását;
- a még hiányzó feltételt;
- a következő önálló munkacsomagot;
- az auditpont-lefedettségi jegyzéket;
- döntésváltozásnál a változásnaplót;
- új scope esetén a távlati rendszerregistert és a nyitott kapulistát;
- merge vagy eszközteszt után a bizonyítékjegyzéket;
- új kockázatnál vagy megváltozott valószínűség/hatás esetén a risk registert;
- technikai irányváltásnál az ADR-indexet és a kapcsolt rekordot;
- új ötletnél, feladatnál vagy scope-változásnál a backlogot;
- release után a runbook végrehajtási bizonyítékát és ismert hibákat;
- content- vagy assetmennyiség változásakor a vertical-slice budgetet.

A mátrix nem lehet optimista státuszlista. A `PARTIAL` és `PLACEHOLDER`
megjelölés addig marad, amíg a teljes játékosi szerződés és annak bizonyítéka
nem áll rendelkezésre.
