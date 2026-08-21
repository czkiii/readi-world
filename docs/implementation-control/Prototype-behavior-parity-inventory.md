# Readi World — reference prototype behavior/parity inventory

Frissítve: 2026-08-01  
Vizsgált forrás: `reference/prototype/` és `reference/candidate/`

## Státuszok

- `KEEP-CONTRACT`: az elv az új rendszerben is érvényes.
- `RECREATE`: a játékosi érték új architektúrán újraépítendő.
- `REDESIGN`: az ötlet hasznos, de a régi viselkedés hibás vagy hiányos.
- `REFERENCE-ONLY`: csak vizuális/technikai tanulság, közvetlen átvétel nélkül.
- `DISCARD`: tudatosan nem vihető tovább.
- `DEFER`: későbbi milestone vagy mérés.

## Parity inventory

| Terület | Régi prototype bizonyíték | Érték | D1 minősítés | Új cél / következő csomag |
|---|---|---|---|---|
| Portré canvas | 720×1280 logikai nézet, DPR 2. | Mobil fókusz és kompozíciós referencia. | `REDESIGN` | Felbontásfüggetlen világ, CSS/Canvas szétválasztás, D4 camera/scale proof. |
| Touch-origin floating joystick | `startJoy()` az érintés helyére tette és elengedéskor elrejtette. | Az elsüllyesztett referenciaérzet alapja. | `RECREATE` | D1.2C–D1.3C: jobbkezes jobb oldali zóna, balkezes tükör, UI exclusion és későbbi HUD-testreszabás; I2 proof. |
| Joystick teljes képernyős aktiváció | Bármely nem-button touch elindította. | Gyors elérés. | `REDESIGN` | Nem zavarhat in-world/UI tapot; az aktív kézprofilhoz tartozó szabad játéktérre korlátozott. |
| Mozgás | Analóg vektor, max `SPEED=240`. | Egyszerű, közvetlen mozgás. | `RECREATE/MEASUREMENT` | Új runtime 172 max speed; végleges görbe/dead zone iPhone-mérés. |
| Követő kamera | A játékosra simított camera offset. | Stabil mobilos követés. | `RECREATE` | Scene- és eszközprofil, occlusion és zoom D4/I3 után. |
| Felső HUD | Avatar, level, wood/stone/coin, time/day, menu. | Erős, könnyen olvasható alapinformáció. | `REDESIGN` | Adaptív HUD, csak releváns resource; D2. |
| Menü shell | Save, Inventory, Village, Settings/Debug gombok. | Navigációs proof. | `RECREATE` shellként | D2 screen map; nem működő funkció rejtett vagy locked. |
| Angol lokalizáció | `data/localization_en.json`, `language: en`. | Bizonyítja az angol source-locale korábbi használatát. | `KEEP-CONTRACT` | Angol elsődleges source, minden runtime text keyből; D1 kanonizálás, később string inventory. |
| Authored village layout | `village_layout.json` stabil building ID-kkel és pozíciókkal. | Landmarkok adatból, nem festett háttérből. | `KEEP-CONTRACT` | Új hibrid mapformátum D3/D4; régi koordináták nem másolandók. |
| Manifest/registry | Manifest, sprite registry, role/tag, fallback. | Cserélhető assetkapcsolat. | `KEEP-CONTRACT` | Új runtime-ban PR #4 már újraépítette. |
| Forest node definíció | Role-based tree/bush, loot, respawn, stump state. | Adatvezérelt resource-node alap. | `REDESIGN` | Stabil node state, tool capability és P1 respawn-politika külön döntés. |
| Automatikus favágás | 350 ms nyugalom után a legközelebbi harvest node automatikusan indult. | ACT nélküli, folytonos munkaérzet. | `REDESIGN` | Csak kiválasztott fejszével; tool selected = intent; üres kéznél nincs favágás. |
| Célpontválasztás | Legközelebbi aktív node a hatótávon belül. | Egyszerű automatikus célzás. | `RECREATE/MEASUREMENT` | Stabil prioritás, highlight, megtartás és megszakítás mobilteszttel. |
| Mozgással megszakítás | Aktív input törölte a harvestet. | Azonnali kontrollérzet. | `KEEP-CONTRACT` | Interakciós fázis és commitpont szerint, jutalomduplikáció nélkül. |
| Axe idle overlay | Közeli fa mellett automatikusan megjelent az `axe_idle`. | Látható tool-ready visszajelzés. | `REDESIGN` | A kiválasztott tool legyen kézben; ne pusztán közelség jelenítse meg. |
| Axe swing animáció | `axe_swing` overlay + procedurális fallback, 850 ms proof. | Azonnali, látványos munkafeedback. | `RECREATE` | Character/tool family spec, frame/timing és irányszám után. |
| Wood hit effect | `wood_hit`, pulse és progress ring. | Találat és folyamat olvashatósága. | `RECREATE` | Effects/audio/haptic family; Reduced Motion és budget. |
| Stump és respawn | Kivágott node stumpra váltott, idővel visszatért. | Látható nodeállapot. | `DEFER/REDESIGN` | P1-ben a kivágott fa állapota kötelező; respawn tempó külön gameplaydöntés. |
| Automatikus mentés háttérnél | `visibilitychange` localStorage save. | Mobil lifecycle fontosságát bizonyította. | `DISCARD` technika / `KEEP-CONTRACT` szándék | Új Save Manager/IndexedDB/checkpoint útvonal; localStorage technika nem vihető át. |
| Building context prompt | Legközelebbi épület promptja; funkció `Coming Soon`. | Egyetlen kontextuális prompt elve. | `REDESIGN` | Valódi state/locked/error/building screen D2 és interaction contract szerint. |
| Building collision | Egyszerű körsugár és stuck recovery. | A blokkolás/recovery proofja. | `DISCARD` geometria / `KEEP-CONTRACT` recovery | Logikai collision shape, safe anchor és debug overlay. |
| Napszak overlay | Morning/Afternoon/Evening/Night színezés, 4 órás nap. | Hangulati proof. | `DEFER/MEASUREMENT` | Semleges asset + runtime lighting; a pontos ciklus külön mérési/tulajdonosi pont. |
| Debug text | Input, player coordinate és atlaszszám. | Gyors helyi diagnosztika. | `RECREATE` | `DBG-001`, `DBG-005`, `DBG-007`, public buildben kikapcsolva. |
| Régi atlaszok | Building, forest, ground, tool overlay, effects PNG-k. | Bizonyítják az assetpipeline és a látványosabb proof lehetőségét. | `REFERENCE-ONLY` | Családonként vizsgálni; automatikus vagy közvetlen másolás tilos. |
| Régi monolit runtime | Gameplay/UI/render/save nagyrészt egy `index.html`-ben. | Gyors prototype-iteráció. | `DISCARD` | Clean moduláris runtime marad az alap. |

## Összegzés

A régi prototype nem új implementációs baseline, de öt különösen értékes
játékosi bizonyítékot adott:

1. touch-origin floating joystick;
2. ACT nélküli proximity munka;
3. axe idle/swing és impact feedback;
4. angol, adatvezérelt UI-szöveg;
5. authored layout + manifest/registry + role-based forest.

Ezeket az új architektúrán `RECREATE/REDESIGN` módon kell visszahozni. A
localStorage save, monolit runtime, automatikus tool-előfeltétel nélküli
favágás és egyszerű kör-collision nem vihető tovább.
