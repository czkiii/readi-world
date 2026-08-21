# Readi World — debug tooling terv

Frissítve: 2026-08-01

## Cél

A debug eszközök a ritka állapot-, save-, input-, asset- és teljesítményhibák
gyors, helyi diagnosztikáját szolgálják. Nem játékosfunkciók, nem küldenek
adatot hálózaton, és alapállapotban nem módosítják a World State-et.

## Biztonsági elvek

- Public buildben minden debugfelület alapból kikapcsolt.
- A read-only inspector az alapértelmezett.
- Állapotmódosítás csak explicit `debug` parancson keresztül, validált
  tranzakcióval történhet.
- Debug input nem osztozhat a játékosi joystick/prompt érintési területével.
- Debug mező nem kerülhet production save-be.
- Diagnosztika helyi; nincs automatikus hálózati adatküldés.
- Debugeszköz nem lehet gameplayfüggőség.

## Prioritási terv

| ID | Eszköz | Funkció | Milestone | Függőség | Acceptance |
|---|---|---|---|---|---|
| `DBG-001` | Build badge | Commit/build/schema verzió megjelenítése fejlesztői módban. | P1 előtt | runtime config | Screenshoton egyértelmű SHA/verzió |
| `DBG-002` | World State inspector | Aktuális scene, player, inventory, progression és objektumstate read-only nézete. | P1 | World State | Nem mutál; invalid reference látható |
| `DBG-003` | Event/transaction log | Utolsó N parancs, esemény, commit/rollback és diagnosztikai ID. | P1 | command/event store | Duplikáció és rollback visszakereshető |
| `DBG-004` | Save inspector | Envelope/schema/checksum/backup/migration állapot és utolsó save idő. | P1 | Save Manager | Hibás save izolálható adatmutáció nélkül |
| `DBG-005` | Input visualizer | Touch ID, joystick origin/vector/dead zone, UI exclusion és focus reset. | I2 | input contract | Több touch és UI-tap egyértelműen látszik |
| `DBG-006` | Collision/trigger overlay | Footprint, collision, trigger, safe anchor és interaction radius kirajzolása. | I3 | map/collision | Gameplay pixeltől független shape-ek látszanak |
| `DBG-007` | Camera/viewport overlay | World/CSS/canvas koordináta, DPR, render scale, safe area és zoom. | D4/I3 | camera contract | iPhone/tablet eltérés mérhető |
| `DBG-008` | Asset inspector | Kért role/tag, feloldott Sprite ID, variant, fallback és draw metadata. | I4 | registry | Hiány/fallback oka látható |
| `DBG-009` | Performance panel | FPS/frame time, aktív objektumok, draw count, textúrabecslés, load time. | I4–P1 proof | renderer instrumentation | Normál/stressz eredmény rögzíthető |
| `DBG-010` | Time/weather controls | Fejlesztői időfázis- és időjárásváltás validált debug paranccsal. | I6 | time system | Nem ír hamis offline jutalmat |
| `DBG-011` | Progression checkpoint loader | Verziózott tesztfixture betöltése ismert milestone-állapotokra. | P1 QA | fixture library | Új/előtte/utána állapot reprodukálható |
| `DBG-012` | Missing-content report | Hiányzó asset-, localization-, audio- és content dependency lista. | P1 | registries/inventories | P1 release előtt üres vagy jóváhagyott fallback |

## Golden fixture-terv

| Fixture ID | Állapot | Fő ellenőrzés |
|---|---|---|
| `SAVE-NEW-001` | Tiszta új játék | Initial schema és spawn |
| `SAVE-GATHER-001` | Egy részben felvett erőforrás | Resource ID és resume |
| `SAVE-CRAFT-001` | Craft előtt elegendő fa | Recipe és inventory tranzakció |
| `SAVE-CRAFT-INTERRUPTED-001` | Craft megszakítási pont | Idempotencia és rollback |
| `SAVE-HUT-BEFORE-001` | Restauráció előtt | Költség és target state |
| `SAVE-HUT-AFTER-001` | Restauráció után | Reward egyszerisége és világváltozás |
| `SAVE-LEGACY-P004-001` | Régebbi schema | Migráció |
| `SAVE-CORRUPT-001` | Szándékosan sérült envelope | Recovery/backup |
| `SAVE-STRESS-001` | Későbbi sűrű világ | Performance és migráció |

## Nem része az első debugcsomagnak

- teljes vizuális map editor;
- élő production adminpanel;
- távoli játékosadat-lekérés;
- automatikus telemetry upload;
- csaláskódok a public UI-ban;
- save export/import játékosfunkcióként.

## Csomagolási sorrend

Elsőként csak `DBG-001`, `DBG-005` és `DBG-007` indokolt az I1–I3
player-facing munkához. A többi a függő rendszer megnyitásakor, külön
munkacsomagban készül.
