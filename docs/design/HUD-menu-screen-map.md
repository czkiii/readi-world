# Readi World — D2 HUD–menu–screen map

Frissítve: 2026-08-01  
Állapot: `DONE`  
Hatókör: információs architektúra és UX-szerződés; runtime- és artmódosítás nélkül

## 1. Cél

Ez a dokumentum rögzíti a Readi World portré felületének képernyőit,
navigációját, adaptív HUD-állapotait, kézprofilját, rétegprioritását és kötelező
hibaállapotait. Nem pixelpontos látványterv: a méretet, zoomot, safe area-t,
touch targetet és vizuális léptéket a D4, majd az iPhone proof méri.

A D2 feladata, hogy a későbbi I1 HUD-shell implementáció ne találgassa:

- mi látható állandóan és mi csak kontextusban;
- mely képernyők működnek a P1 slice-ban;
- mely rendszerek rejtettek, zároltak vagy későbbiek;
- hogyan jut vissza a játékos biztonságosan a világba;
- hogyan tükröződik a jobb- és balkezes profil;
- hogyan bővíthető később a HUD új főrendszer átépítése nélkül.

## 2. Irányadó források

- `docs/Dokumentumaudit.txt`: 32–33, 41, 43, 46, 49, 55, 57, 60,
  101–103, 111–112, 116, 117–126, 145–153, 185–190, 227–230, 246,
  250, 255 és D1.1C–D1.7C;
- `docs/Gameplay-bible.txt`: 9.13–9.14, 17.10–17.23 és 21.10–21.13,
  kizárólag ahol az audit nem írja felül;
- `docs/implementation-control/D1-dontes-es-referencia-reconciliation.md`;
- `docs/implementation-control/Prototype-behavior-parity-inventory.md`;
- `docs/implementation-control/Vertical-slice-content-es-assetbudget.md`;
- `docs/art/reference-sheets/Reference-index.md`, főleg `REF-002`, `REF-003`,
  `REF-005`, `REF-006` és `REF-007`.

## 3. Lezárt D2 alapelvek

| ID | Szerződés |
|---|---|
| `D2-PR-001` | Portré mód az elsődleges. A HUD safe-area-t használ, a világ pedig felbontásfüggetlen kamerakivágás. |
| `D2-PR-002` | A HUD adaptív: csak az aktuális feladathoz, helyhez és kiválasztott toolhoz szükséges elemek jelennek meg. |
| `D2-PR-003` | Nincs permanens ACT, axe vagy általános action gomb. A tool kiválasztása munkaszándék; az érvényes automatikus munka külön gomb nélkül indul. |
| `D2-PR-004` | Jobbkezes alapban a touch-origin floating joystick a jobb oldali szabad játéktéren, a tool rail pedig bal alul van. Balkezes profil ezt tükrözi. |
| `D2-PR-005` | A kézprofil csak alapelrendezés. A későbbi HUD Layout Editor támogatott elemeket kijelölt safe zónák között mozgathat. |
| `D2-PR-006` | A P1-ben legfeljebb négy működő alnézet van: Goals/Project, Inventory & Tools, Workbench/Crafting és Settings. |
| `D2-PR-007` | Nem implementált későbbi rendszer alapból rejtett. Csak olyan locked elem látszhat, amelyet az aktuális build valóban fel fog oldani és meg tud magyarázni. Dead button nincs. |
| `D2-PR-008` | Gyakori funkció legfeljebb körülbelül két navigációs lépés. Ritka adminisztratív funkció nem kerül a normál HUD-ra. |
| `D2-PR-009` | Komplex tartalom teljes magasságú mobilpanelt vagy nagy bottom sheetet használ. Egymásra nyíló apró ablakok nem készülnek. |
| `D2-PR-010` | Menünél a mozgás és az új work-intent input blokkolt; a World Clock tovább fut. Aktív tranzakció csak saját megszakítási szerződése szerint állhat meg. |
| `D2-PR-011` | Kritikus állapot soha nem csak színnel, hanggal, haptikával vagy mozgással kommunikál. |
| `D2-PR-012` | Minden játékosszöveg angol source-locale string ID-ból érkezik. Képre égetett vagy gameplaykódba írt player-facing szöveg nincs. |

## 4. Portré HUD zónatérkép

Ez logikai elhelyezés; nem pixelméret.

```text
┌──────────────── SAFE AREA TOP ────────────────┐
│ [Player]   [relevant resources]  [time] [≡] │  H1 top status rail
│ [tracked main goal — collapsible]            │  H2 goal card
│                                              │
│              WORLD / CAMERA                  │
│       [in-world label / target progress]     │  H3 context layer
│                                              │
│ [empty hand/tool rail]        floating zone │  H4 hand controls
│ [toast / milestone, when needed]      (joy) │  H5 feedback rail
└─────────────── SAFE AREA BOTTOM ─────────────┘
```

Balkezes profilban csak a kézhez kötött H4 elemek és az ezekhez kapcsolt
reachable anchorok tükröződnek. A világ irányai, szövegek, menühierarchia és
értelmezési sorrend nem fordul meg.

### 4.1 HUD-modulok

| ID | Modul | Alapállapot | Tartalom | Interakció |
|---|---|---|---|---|
| `HUD-01` | Player capsule | tömör, látható | avatar, aktuális szint vagy fejlődési jel | profilrészlet csak későbbi scope-ban; P1-ben információs |
| `HUD-02` | Relevant resource capsule | adaptív | legfeljebb 1–3 aktuálisan fontos resource vagy project input | tap → `SCR-INV` releváns filtere |
| `HUD-03` | World status | tömör | napszak/idő; időjárás csak ha érdemi | nincs kötelező tap P1-ben |
| `HUD-04` | Menu | látható | hamburger/menu ikon, szöveges accessibility name | tap → `SCR-MENU` |
| `HUD-05` | Tracked goal | adaptív, összecsukható | egy fő cél, egy következő lépés, tömör progress | tap → `SCR-GOAL`; collapse állapota menthető profilpreferencia |
| `HUD-06` | Context target | csak érvényes célpontnál | név, állapot, locked ok, progress vagy egyetlen manuális prompt | targetválasztás a 101–103 szerint |
| `HUD-07` | Tool rail | amikor tool elérhető | Empty Hands + legfeljebb két P1 quick slot; kiválasztási állapot | tap toolra = work intent váltás; nem action input |
| `HUD-08` | Floating joystick | world-touch idejére | base, knob, irány/erő vizuális visszajelzés | touch-origin, drag, release-hide; UI-tap kizárva |
| `HUD-09` | Feedback rail | eseménykor | toast, warning, success, milestone; egyszerre korlátozott szám | fontos eredmény naplózható; nem takarhat kontrollt |
| `HUD-10` | Save indicator | csak mentéskor/hibánál | saving, saved röviden, retry/error tartósabban | hiba → részletes recovery útvonal |

### 4.2 Nem állandó HUD-elemek

Az alábbiak nem maradhatnak permanensen a world view-n:

- teljes inventory vagy tartós resource footer;
- állandó axe/ACT/action gomb;
- Map, Journal, NPC, Farm, Harbor és Event oldalsó ikonoszlop;
- offline earning kártya;
- több párhuzamos goal card;
- nem feloldott későbbi rendszer promóciós gombja;
- debug, FPS, save slot vagy fejlesztői kontroll.

## 5. Adaptív HUD állapotgép

| Állapot | Trigger | Látható prioritás | Rejtendő/csökkentendő |
|---|---|---|---|
| `HUD-S0 START` | új játék, még nincs tool | goal card kibontva; branch progress; Empty Hands | toolválaszték, későbbi resource, farm/map |
| `HUD-S1 GATHER-BRANCH` | földi ág a következő cél | branch számláló; pickup feedback; célútmutatás | nem releváns kő/coin és minden későbbi rendszer |
| `HUD-S2 WORKBENCH-REPAIR` | munkapad elérhető | workbench név/állapot; szükséges branch; egy manuális repair prompt, ha a definíció ezt kéri | tree harvest és hut project részletei |
| `HUD-S3 CRAFT-AXE` | workbench működik | crafting context; receptkövetelmény; elkészült tool feedback | általános resource-sor |
| `HUD-S4 AXE-WORK` | fejsze kiválasztva | selected axe; érvényes fa highlight; helyi work progress; wood/project input | külön Chop/ACT gomb |
| `HUD-S5 HUT-PROJECT` | Forester Hut javítható | project requirements; hiányzó következő lépés; restoration progress | más goal és passzív counter |
| `HUD-S6 RESTORED` | restauráció commitált | rövid milestone; látható világváltozás; új fő irány | régi repair progress, folyamatos ünneplő overlay |
| `HUD-S7 MENU` | bármely UI-panel nyitva | panel header, back/close, szükséges státusz | joystick, world prompt, új tool work input |
| `HUD-S8 INTERRUPTED` | focus loss/resume | biztonságos resume vagy rövid recovery üzenet | régi touch/drag/progress vizuális inputállapot |

Az adaptivitás World State- és prezentációs selector-eredményből származik. A
HUD nem írhat progresszt, inventoryt, kiválasztott toolt vagy unlockot.

## 6. Kontextuális promptcsalád

| Állapot | Megjelenés | Példa jelentés | Kötelező viselkedés |
|---|---|---|---|
| `AUTO-READY` | halk target label/highlight | a kiválasztott fejsze használható | nincs „Chop” gomb; érvényes közelségnél automatikus indulás |
| `MANUAL-READY` | egyetlen stabil prompt | Enter Home, Open Workbench, Repair | csak olyan művelet, amelyet az interaction definition manuálisnak jelöl |
| `LOCKED` | lock ikon + rövid ok | Axe required / Need 2 more branches | tap vagy részletes nézet megmutatja a következő lépést |
| `PROGRESS` | helyi progress és megszakíthatóság | chopping / crafting / restoring | a cél közelében; nem duplikált HUD-cardként |
| `INTERRUPTED` | rövid ok és biztonságos állapot | moved away / target unavailable | nem állítja, hogy sikerült; jutalmat nem ad |
| `SUCCESS` | rövid vizuális + opcionális audio/haptika | item acquired / tool crafted | ismétlődésszűrés és összevonás |
| `ERROR` | játékosbarát ok + következő lépés | inventory full / save failed | strukturált hibakódból; kritikus hiba tartósan elérhető |

## 7. Képernyőjegyzék

### 7.1 P1 kötelező képernyők

| Screen ID | Név | Belépés | Tartalom | Kilépés / back | Státusz |
|---|---|---|---|---|---|
| `SCR-BOOT` | Boot / Load / Recovery | appindítás | brand, loading state, save validation; hiba esetén recovery | siker → `SCR-WORLD`; hiba → recovery flow | P1 required |
| `SCR-WORLD` | Normal World View | sikeres load/resume | adaptív HUD + kamera + world input | menu → `SCR-MENU`; context → megfelelő panel | P1 required |
| `SCR-MENU` | Main Menu Shell | `HUD-04` | Continue, Goals, Inventory & Tools, Settings, Save Now; csak valóban támogatott tile-ok | Continue/back → world | P1 required shell |
| `SCR-GOAL` | Goals & Current Project | goal card vagy menu | egy tracked main goal, beatek, Forester Hut project, requirements és látható következő lépés | back → előző panel/menu; close → world | P1 working 1/4 |
| `SCR-INV` | Inventory & Tools | resource capsule, tool rail vagy menu | kategóriás itemlista; mennyiség; tool tab; selected tool; empty/full/locked states | back → előző; close → world | P1 working 2/4 |
| `SCR-CRAFT` | Workbench / Crafting | érvényes workbench context | P1 recept, inputok, output, hiányzó követelmény, craft/progress/result | back → world vagy hívó panel; input csak commitkor változik | P1 working 3/4 |
| `SCR-SET` | Settings | menu | Controls & HUD, Accessibility/Display, Audio, System/Save tab | változás típusa szerint azonnali preview vagy explicit Apply; back biztonságos | P1 working 4/4 |
| `SCR-RESUME` | Return / Recovery Summary | resume, ha fontos eredmény vagy korrekció van | csak fontos változás; dismiss; hiba esetén részletek | dismiss → world vagy előző biztonságos screen | P1 state component |

### 7.2 `SCR-GOAL` belső szerkezete

- `Current Goal`: egyetlen kiemelt fő cél;
- `Next Step`: rövid, konkrét teendő;
- `Requirements`: rendelkezésre áll / szükséges, színfüggetlen állapottal;
- `Project State`: Forester Hut romos, folyamatban vagy restored;
- `Why locked?`: hiányzó tool, material vagy előfeltétel;
- `Completed Beats`: visszanézhető, de alapból összecsukott;
- későbbi journal/quest lista csak külön content scope után jelenik meg.

### 7.3 `SCR-INV` belső szerkezete

- P1 tabok: `Items`, `Tools`;
- item row: icon, localized name, quantity, szükség esetén project marker;
- tool row: icon, állapot, capability és selected jelzés;
- `Empty Hands` valódi választható állapot, nem hiányzó tool;
- full inventory esetén ok, érintett reward és következő biztonságos lépés;
- keresés, filter és rendezés csak akkor aktiválódik, amikor a tartalommennyiség
  indokolja; a komponenshely előre fenntartható, P1-ben nem kötelező;
- romboló itemművelet és trade nincs a P1 inventoryban.

### 7.4 `SCR-CRAFT` belső szerkezete

- workbench identity és működési állapot;
- egyetlen P1 recept: Axe vagy a kanonikusan kapcsolt szükséges recipe;
- input availability, output, capability és esetleges idő;
- hiányzó feltétel játékosbarát következő lépéssel;
- craft CTA csak itt lehet, mert ez deklarált manuális tranzakció, nem ACT gomb;
- progress, interruption, success és output-capacity state;
- recipe és inventory állapot a rendszerből érkezik; a panel nem számol saját
  alternatív igazságot.

### 7.5 `SCR-SET` belső szerkezete

| Tab | P1-ben látható | Későbbi, de előkészített |
|---|---|---|
| `Controls & HUD` | Right/Left-handed preset; joystick size; sensitivity; reset controls | `SCR-HUD-EDIT` egyedi anchoros layout editor; támogatott HUD-modulok mozgatása |
| `Accessibility / Display` | text scale alaphely; Reduced Motion; visszajelzési minimumok | color/contrast profilok, további camera comfort |
| `Audio` | Music, Ambience, SFX, UI hangerő/mute | további kategória csak tényleges contenttel |
| `System / Save` | Save Now, save status, local-only tájékoztatás, buildverzió | export/import és cloud csak új policy/scope után |

A Right/Left preset nem törli a későbbi custom layoutot. Profilváltáskor csak
azok az anchorok tükröződnek, amelyeket a játékos nem rögzített külön custom
helyre. A pontos szerkesztési szabály a későbbi HUD Layout Editor csomag része.

### 7.6 Későbbi vagy rejtett képernyők

| Screen ID | Rendszer | P1 szabály | Aktiválási kapu |
|---|---|---|---|
| `SCR-HUD-EDIT` | HUD Layout Editor | route és setting-határ előkészített, UI rejtett | stabil I1 HUD + touch/safe-area proof |
| `SCR-MAP` | World Map | rejtett | D3 map + későbbi map scope |
| `SCR-PATH` | World Path | rejtett | dependency graph és P3 content |
| `SCR-BUILD` | Building catalog / terrain mode | rejtett | külön placement csomag; audit 23–39 |
| `SCR-FARM` | Farming | legfeljebb unlock feedback, dead screen nincs | stabil restoration loop + farming package |
| `SCR-STORAGE` | Storage transfer | rejtett | inventory/storage contract |
| `SCR-TRADE` | Trade | rejtett | economy scope és policy |
| `SCR-PROF` | Professions | rejtett | progression content scope |
| `SCR-COLLECT` | Collections | rejtett | collection content scope |
| `SCR-SCENIC` | Scenic Mode | rejtett P1-ben | 107/219/231 tulajdonosi döntés + input proof |

## 8. Főmenü információs architektúrája

```text
MAIN MENU
├─ Continue
├─ Goals & Project                 [P1 active]
├─ Inventory & Tools              [P1 active]
├─ World                           [group appears only with real content]
│  ├─ Map                          [later]
│  └─ World Path                   [later]
├─ Build & Manage                  [group appears only with real content]
│  ├─ Buildings / Terrain          [later]
│  ├─ Recipes                      [later global view]
│  ├─ Storage                      [later]
│  ├─ Farm                         [later]
│  └─ Trade                        [later]
├─ Growth                          [later]
│  ├─ Professions
│  └─ Collections
└─ Settings                        [P1 active]
   ├─ Controls & HUD
   ├─ Accessibility / Display
   ├─ Audio
   └─ System / Save
```

P1-ben a főmenü nem mutat üres `World`, `Build & Manage` vagy `Growth`
csoportot. A Workbench/Crafting a világban lévő munkapadból nyílik. A Goals és
Inventory a HUD-ról egy lépésben, a menüből legfeljebb két lépésben elérhető.

## 9. Navigációs és inputstack

### 9.1 Rétegsorrend

1. kritikus recovery/safety modal;
2. explicit confirmation modal;
3. aktív teljes képernyős panel;
4. main menu shell;
5. context prompt/progress;
6. tracked goal;
7. toast és passzív HUD;
8. world és floating joystick.

Felsőbb réteg blokkolja az alatta lévő inputot. Egy fizikai érintés csak egy
normalizált parancsot hozhat létre.

### 9.2 Back-szerződés

```text
confirmation modal
  → nested detail
  → active screen
  → main menu
  → world
```

- a screen header mindig tartalmaz egyértelmű Back vagy Close elemet;
- bezáráskor az utolsó biztonságos world context áll vissza;
- mentetlen kritikus változás megerősítést kér;
- sima tab-, filter- vagy nem kritikus settingváltozás nem épít feleslegesen
  új back-stack szintet;
- eltávolított vagy hibás route a legközelebbi biztonságos szülőre esik vissza;
- böngésző/PWA history integráció külön technikai proof, de ugyanazt a logikai
  back-sorrendet kell követnie.

### 9.3 Menünyitás aktív munka közben

- új mozgási és tool-work input nem indul;
- a futó művelet a saját `interruptible/commit/recovery` szabálya szerint
  befejeződik, megszakad vagy checkpointol;
- a World Clock nem áll meg;
- menüzáráskor nincs megőrzött touch, pointer, drag vagy joystick kontakt;
- a játékos csak validált állapot után kapja vissza az irányítást.

## 10. Állapotmátrix minden panelhez

| Állapot | Kötelező tartalom | Tiltott viselkedés |
|---|---|---|
| `LOADING` | skeleton/spinner + rövid label; back csak ha biztonságos | üres, inputképes panel |
| `EMPTY` | miért üres + hogyan kerülhet ide tartalom | puszta üres doboz |
| `LOCKED` | lock, ok, követelmény és ahol van következő lépés | néma disabled gomb |
| `READY` | fő információ és egyértelmű elsődleges művelet | több azonos prioritású CTA |
| `PROGRESS` | folyamat, idő vagy fázis, cancel ha engedett | hamis 100% vagy jutalomcommit |
| `SUCCESS` | mi változott + következő értelmes lépés | végtelen ünneplő overlay |
| `WARNING` | kockázat, következmény, biztonságos választások | kizárólag sárga/piros szín |
| `ERROR` | játékosbarát ok, retry/recovery és szükség esetén details | nyers exception mint fő üzenet |
| `OFFLINE` | mi működik helyben; külső funkció csak ha tényleg van | alapjáték blokkolása |
| `RESUME` | utolsó valid állapot és fontos változás | régi input vagy toastlavina visszajátszása |

## 11. Notification- és prioritásszabály

| Prioritás | Példa | Megjelenés |
|---|---|---|
| `P0 SAFETY` | save/recovery hiba, elveszthető kritikus állapot | blokkoló modal, amíg a játékos érti a lehetőségeket |
| `P1 MILESTONE` | Forester Hut restored, új út megnyílt | banner/celebration + tartós goal history |
| `P2 ACTION` | axe crafted, inventory full, work interrupted | egy rövid toast vagy context feedback |
| `P3 PASSIVE` | branch picked up, repeat resource gain | összevont számláló/ikon feedback |

Egyszerre legfeljebb egy blocking modal és egy aktív nem blokkoló toast látszik.
Az ismétlődő pickupok összevonódnak. Fontos eredmény a Goals/Project historyból
vagy recovery summaryból később is elérhető.

## 12. Lokalizációs és accessibility szerződés

- screen-, component-, state- és action label stabil string ID-t kap;
- angol a source-locale, de a layout nem épül fix angol karakterszámra;
- két sor fölé növő HUD-szöveg rövidített változatot vagy panelre vezető
  részletes nézetet használ;
- nagyobb text scale-nél a top rail két sorra törhet, a world view nem válhat
  használhatatlanná;
- icon-only vezérlő accessibility nevet és fókuszállapotot kap;
- minimum touch target, kontraszt és töréspont számszerű értéke D4/device proof;
- Reduced Motion nem távolíthat el információt;
- minden success/error/locked állapot ikon + szöveg kombinációval működik;
- haptika és audio kiegészítő csatorna, nem egyetlen jelzés.

## 13. Reszponzív viselkedés

| Környezet | D2 szabály |
|---|---|
| iPhone 16 Pro portré | elsődleges referenciaút; jobbkezes egykezes proof kötelező |
| kisebb telefon portré | kevesebb egyidejű HUD-adat; resource capsule és goal card agresszívebben tömörül |
| nagy telefon portré | nem nő aránytalanul a panel; több világ marad látható |
| iPad portré | középre korlátozott panel-szélesség; oldalsó világterület nem válik új HUD-dumppá |
| landscape | unsupported, amíg külön HUD/input/camera proof nem készül |
| Home Screen PWA | safe area és browser chrome nélküli mód külön screenshot-proofot kap |
| Safari böngésző | alsó browser chrome és viewportváltozás nem fedhet kontrollt |

## 14. P1 unlock- és láthatósági szabály

| Elem | Kezdet | Beat közben | Slice végén |
|---|---|---|---|
| Goals | látható | frissül | restored history + következő irány |
| Inventory | látható, akár empty | feltöltődik | megmarad |
| Tools tab | Empty Hands | axe recipe után locked/preview indokolt lehet | Axe elérhető és választható |
| Workbench/Crafting | world contextben locked/damaged | javítás után megnyílik | működő marad |
| Forester Project | known/locked vagy aktuális goal | requirements frissülnek | completed |
| Farm | rejtett | rejtett | unlock feedback vagy új cél; dead Farm screen nincs |
| Map/World Path | rejtett | rejtett | rejtett, amíg nincs működő tartalom |
| HUD Layout Editor | rejtett | rejtett | rejtett; route/setting-határ előkészített |

## 15. Implementációs komponenshatárok

A későbbi I1 csomag legalább az alábbi prezentációs komponensekre bontható:

- `HudRoot` és deklarált layout profile;
- `TopStatusRail`;
- `TrackedGoalCard`;
- `ContextFeedback`;
- `ToolIntentRail`;
- `VirtualJoystickHost` — az I2 inputcsomag tulajdona;
- `NotificationHost`;
- `SaveStatusIndicator`;
- `ScreenRouter` és `ModalStack`;
- `MainMenuShell`;
- négy P1 screen adapter;
- `UiStatePresenter`, amely World State/selectoreredményt olvas, de nem ír
  gameplayállapotot;
- localization resolver és missing-key fallback.

Az I1 és I2 külön munkacsomag. A HUD-shell nem valósíthat meg saját joystick-
fizikát, a joystick pedig nem döntheti el a menü- vagy gameplayállapotot.

## 16. D2-ből nyitott mérési pontok

Ezek nem blokkolják a D2 logikai screen map elfogadását, de blokkolják a végleges
production UI acceptance-et:

- top rail pontos töréspontjai és kétsoros viselkedése;
- touch target és gesture threshold;
- joystick dead zone, sensitivity, size és aktivációs téglalap;
- goal card alapmérete és automatikus collapse időzítése;
- egyszerre látható resource-ok pontos maximuma kisebb telefonon;
- panel transition hossza és Reduced Motion variánsa;
- hosszú angol és későbbi fordítások layoutproofja;
- Safari chrome, Home Screen safe area és iPad panel max-width;
- browser back/history integráció;
- task completion, félrenyomás és egykezes reach teszt.

## 17. D2 elfogadási feltételek

- a P1 screenlista belefér az 1 shell + legfeljebb 4 működő alnézet budgetbe;
- minden HUD-modulnak van trigger-, priority- és interakciós szabálya;
- jobb- és balkezes profil, valamint későbbi custom HUD route dokumentált;
- nincs permanens ACT/action gomb;
- a tool rail választ, de nem hajt végre külön actiont;
- minden panelre érvényes loading/empty/locked/progress/error/recovery modell;
- a későbbi rendszerek nem jelennek meg dead buttonként;
- a navigáció és back-stack deklarált;
- World State/save/localization/input határ nem sérül;
- D3 megkapja a HUD safe zónáit és a world-space markerigényt;
- D4 megkapja a még mérendő méret-, touch-, safe-area- és responsive pontokat;
- a tulajdonosi jóváhagyás megtörtént: D2 `DONE`, D3 megnyitható, I1 pedig a
  D3/D4 vizuális függőségeitől elkülönítve előkészíthető.

## 18. Tulajdonosi jóváhagyási kapu

`D2-OWN-001A` — A teljes fenti screen map, P1 képernyőbudget és navigációs
hierarchia 2026-08-01-én tulajdonosilag elfogadva.

Az elfogadás nem jelenti, hogy a pixelméret, a végleges grafika vagy minden
későbbi menüfunkció lezárult. Azt rögzíti, hogy a felület szerkezete és
bővítési helye nem emlékezetből készül.
