# Readi World — teljes auditpont-lefedettségi jegyzék

Frissítve: 2026-08-01

## Cél

Ez a jegyzék biztosítja, hogy az 1–299. auditpont és a 72.5 kiegészítés
egyike se maradjon pusztán beszélgetési vagy dokumentumtörténeti emlék.
A részletes döntésszöveg igazságforrása továbbra is a kanonikus audit;
ez a fájl a döntés, a lezárás módja és az implementációs bizonyíték közötti
kapcsolatot tartja nyilván.

A „kitöltendő” bizonyíték nem elveszett döntést jelent. Azt jelzi, hogy a
döntés már nyilvántartott, de még nem kapott önálló implementációt vagy
ellenőrzött bizonyítékot.

## Összesítés

- 1–105: 105 kanonikusan lezárt auditpont.
- 72.5: külön kanonikus anti-exploit kiegészítés.
- 106–299: 194 hiánytalanul számozott pont.
- A 106–299. tartomány jelenlegi forrásállapota: 88 kanonizált, 69
  tulajdonosi döntést igénylő, 35 prototípust vagy mérést igénylő és 2
  korábbi kanonikus ponttal már lefedett bejegyzés.
- Teljes nyilvántartott bejegyzésszám: 300.

## Jegyzék

| Pont | Rövid téma | Döntési státusz | Lezárás módja | Implementációs kapcsolat / bizonyíték |
|---:|---|---|---|---|
| 1 | Hogyan kezeljük a(z) „dokumentumhierarchia” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Dokumentumprioritás: `AGENTS.md` |
| 2 | Hogyan kezeljük a(z) „a jelenlegi kód szerepe” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Referencia/runtime szétválasztás |
| 3 | Hogyan kezeljük a(z) „az index.html szerepe” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | `runtime/index.html`, `src/bootstrap.js` |
| 4 | Hogyan kezeljük a(z) „clean runtime stratégia” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | PR #1 / `cd967b0` |
| 5 | Hogyan kezeljük a(z) „régi mentések kompatibilitása” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Clean runtime; legacy save nem importált |
| 6 | Hogyan kezeljük a(z) „platformirány” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | GitHub Pages webapp/PWA proofirány |
| 7 | Hogyan kezeljük a(z) „canvas és megjelenítési technológia” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 8 | Hogyan kezeljük a(z) „elhelyezési rendszer” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 9 | Hogyan kezeljük a(z) „világstruktúra” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Hibrid világ: map blueprint még hiányzik |
| 10 | Hogyan kezeljük a(z) „jelenetek közötti átjárás” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 11 | Hogyan kezeljük a(z) „kamera” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Követő kamera részleges runtime-proof |
| 12 | Hogyan kezeljük a(z) „építési és dekorációs mód alatti világállapot” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 13 | Hogyan kezeljük a(z) „mozgatható objektumok” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 14 | Hogyan kezeljük a(z) „épületelhelyezési szabályok” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 15 | Hogyan kezeljük a(z) „épületforgatás” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 16 | Hogyan kezeljük a(z) „elhelyezési pontosság” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 17 | Hogyan kezeljük a(z) „egymáshoz kapcsolódó elemek” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 18 | Hogyan kezeljük a(z) „objektumok átfedése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 19 | Hogyan kezeljük a(z) „visszavonás funkció” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 20 | Hogyan kezeljük a(z) „elhelyezés megerősítése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 21 | Hogyan kezeljük a(z) „tereprendezési mód elérése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 22 | Hogyan kezeljük a(z) „egyszerre szerkeszthető objektumok” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 23 | Hogyan kezeljük a(z) „objektum kijelölése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 24 | Hogyan kezeljük a(z) „objektum mozgatása” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 25 | Hogyan kezeljük a(z) „mozgatás közbeni előnézet” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 26 | Hogyan kezeljük a(z) „a régi hely mozgatás közben” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 27 | Hogyan kezeljük a(z) „mozgatás megszakítása” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 28 | Hogyan kezeljük a(z) „appmegszakítás mozgatás közben” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 29 | Hogyan kezeljük a(z) „tereprendezési mód mentése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 30 | Hogyan kezeljük a(z) „több egymás utáni mozgatás” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 31 | Hogyan kezeljük a(z) „tereprendezési mód lezárása” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 32 | Hogyan kezeljük a(z) „tereprendezési mód kezelőfelülete” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 33 | Hogyan kezeljük a(z) „új objektumok lerakása a katalógusból” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 34 | Hogyan kezeljük a(z) „katalógusból lerakott tárgyak kezelése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 35 | Hogyan kezeljük a(z) „objektum eltávolítása és tárolása” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 36 | Hogyan kezeljük a(z) „elrakott épületek és dekorációk tárolása” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 37 | Hogyan kezeljük a(z) „épületek lebontása és visszatérítés” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 38 | Hogyan kezeljük a(z) „tereprendezési jogosultságok és területek” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 39 | Hogyan kezeljük a(z) „tereprendezés és világfejlődés” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 40 | Hogyan kezeljük a(z) „következő auditblokk” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 41 | Hogyan kezeljük a(z) „a mentési rendszer alapmodellje” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 42 | Hogyan kezeljük a(z) „mentési adatok felépítése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Save Manager v1 / PR #3 |
| 43 | Hogyan kezeljük a(z) „hibás mentés és helyreállítás” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Save recovery tesztek |
| 44 | Hogyan kezeljük a(z) „mentés és jelenetváltás” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 45 | Hogyan kezeljük a(z) „offline folyamatok mentése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 46 | Hogyan kezeljük a(z) „offline visszatérés” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 47 | Hogyan kezeljük a(z) „mentésexport és átvitel” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 48 | Hogyan kezeljük a(z) „mentés mérete és régi adatok” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 49 | Hogyan kezeljük a(z) „játékosprofil és fejlődés” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 50 | Hogyan kezeljük a(z) „inventory, tárgyak és tárolók” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 51 | Hogyan kezeljük a(z) „crafting és termelés mentése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 52 | Hogyan kezeljük a(z) „épületek és világfejlődés mentése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 53 | Hogyan kezeljük a(z) „állatok, farm és növekedés” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 54 | Hogyan kezeljük a(z) „küldetések, world path és feloldások” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 55 | Hogyan kezeljük a(z) „beállítások és eszközfüggő adatok” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 56 | Hogyan kezeljük a(z) „mentési rendszer tesztelése” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 57 | Hogyan kezeljük a(z) „mentési blokk lezárása” tervezési területét? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 58 | Melyik nagy rendszert auditáljuk a mentési blokk után? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 59 | Milyen jelenetek állapota maradjon tartós, és mi történjen eltávolított jelenetekkel? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 60 | Hogyan történjen a jelenetek közötti átmenet és betöltés? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 61 | Hogyan kezeljük a jelenetek belépési pontjait és átjáróit? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 62 | Hogyan regenerálódjanak a jelenetek erőforrásai és hogyan tároljuk az állapotukat? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 63 | Hogyan épüljenek fel a régiók több összekapcsolt jelenetből? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 64 | Hogyan kezeljük az aktív jelenetet, az unloadot és a gyorsítótárat? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 65 | Hogyan működjön a világidő és az időjárás a jelenetek között? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 66 | Hogyan működjenek a regionális események és történeti világváltozások? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 67 | Hogyan kezeljük az újrajátszható vagy generált aktivitási jeleneteket? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 68 | Hogyan kapcsolódjon a fő falu az aktivitási jelenetekhez? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 69 | Hogyan működjenek a belépési költségek, a veszély és a kilépés? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 70 | Hogyan oldódjanak fel a jelenetek és hogyan maradjanak érthetők a lezárások? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 71 | Hogyan működjön a térkép, a felfedezés és a gyorsutazás? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 72 | Milyen korlátozásokkal és időhatással működjön a gyorsutazás? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 72.5 | Kiegészítő anti-exploit szabály | `LOCKED` | Gazdasági/progression implementáció és invariánsteszt | Kanonikus kiegészítés; későbbi rendszerkapcsolat |
| 73 | Hogyan változzon tartósan a dinamikus világ? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 74 | Hogyan működjön a háttérszimuláció és az offline fejlődés? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 75 | Mi legyen a World Simulation Core alaparchitektúrája? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 76 | Hogyan módosítsák a rendszerek a világállapotot és hogyan dolgozzuk fel az eseményeket? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | World State tranzakciók / PR #2 |
| 77 | Hogyan működjön a rendszerprioritás és a frissítési ciklus? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | World State események / PR #2 |
| 78 | Hogyan működjön a világobjektumok életciklusa? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Stabil ID-k a P0 kontraktusokban |
| 79 | Hogyan tároljuk, regeneráljuk és migráljuk az objektumállapotokat? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 80 | Hogyan kezeljük az összetett objektumokat, a hierarchiát és a tulajdonjogot? | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 81 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 82 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 83 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 84 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 85 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 86 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 87 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 88 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Asset registry/fallback / PR #4 |
| 89 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 90 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 91 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 92 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 93 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 94 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 95 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 96 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 97 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 98 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 99 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 100 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 101 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Minimal-loop közelségi interakció |
| 102 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 103 |  | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Minimal feedback; production UX hiányzik |
| 104 | Interakciós megszakítás, visszavonás és app-életciklus. | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Save/checkpoint alap működik |
| 105 | Interakciós célpont eltűnése, érvénytelenedése és egyidejű használata. | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Minimal target state működik |
| 106 | Kézi, eszközös és együttműködő interakció | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 107 | Hatótáv, helyzeti feltételek és Scenic Mode | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 108 | Játékosazonosság, pozíció és biztonságos helyreállítás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Mentett játékospozíció részlegesen működik |
| 109 | Mozgási állapotok és sebességmódosítók | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Mozgási intent részlegesen működik |
| 110 | Virtuális joystick érzete | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 111 | Egykezes, balkezes és későbbi alternatív irányítás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | D1.2C–D1.3C: jobb oldali floating alap; balkezes tükör és későbbi HUD-testreszabás megmarad; runtime még eltér |
| 112 | Egységes inputfeldolgozás és kontrollzárolás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Input layer részleges |
| 113 | Mozgási ütközés, triggerzónák és speciális terep | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 114 | Normál követő kamera | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 115 | Szerkesztési kamera és gesztusütközések | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 116 | Képernyőarány, orientáció és Reduced Motion | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Portrait CSS/Canvas részleges |
| 117 | Item- és resource-definíciók | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 118 | Stackek és egyedi tárgypéldányok | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 119 | Kulcs-, projekt- és védett tárgyak | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 120 | Hordozott inventory kapacitásmodellje | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 121 | Megtelt inventory, overflow és elveszett jutalom | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 122 | Tartós tárolók és épülethelyi készletek | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 123 | Közeli tárolás, storage network és távoli hozzáférés | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 124 | Tárgyáthelyezési műveletek | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 125 | Mobilos inventory- és storage-UI | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 126 | Inventory-migráció és integritásvédelem | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 127 | Alapeszközlista, Tool Collection és automatikus választás | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 128 | Tool tier és upgrade chain | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 129 | Tartósság, fuel és charge | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 130 | Tool module rendszer | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 131 | Eszközhatások és capability-gate-ek | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 132 | Eszközspecializáció és respec | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 133 | Különleges eszközök és vizuális fejlődés | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 134 | Quick access, activity preset és mobilos váltás | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 135 | Eszközhasználat mentése és megszakítása | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 136 | Resource node definíció és identitás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 137 | Node-állapot, depletion, respawn és újratelepítés | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 138 | Harvest művelet és jutalomcommit | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 139 | Véletlen drop és bad-luck protection | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 140 | Régió-, időjárás-, napszak- és szezonfeltételek | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 141 | Célzott megszerzési információ és alternatív források | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 142 | Ismétléscsökkentés, area harvest és helper | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 143 | Offline regeneráció, save delta és anti-exploit | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 144 | Nagy nodeszám és mobilos közelségi gyűjtés | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 145 | Receptdefiníció és verzió | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 146 | Craftingjogosultság és munkaállomás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 147 | Azonnali, hosszú és részleges crafting | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 148 | Queue, batch, Craft All és Repeat | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 149 | Machine state és működési függőségek | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 150 | Outputkapacitás és megtelt kimenet | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 151 | Offline crafting és véges automatizálás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 152 | Minőség és különleges kockázatos receptek | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 153 | Crafting-UI, értesítés és gazdasági előnézet | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 154 | Crafting anti-grind és automation | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 155 | Épületdefiníció és instance | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 156 | Restaurációs szakaszok és mérföldkő-akció | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 157 | Tierstruktúra és funkcionális fejlesztések | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 158 | Épületműködés, kapacitás és operating material | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 159 | Faluszint és vizuális világátalakulás | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 160 | Játékosotthon és személyre szabható terek | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 161 | Út-, víz-, energia- és storage-hálózat | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 162 | Több restaurációs projekt és részleges finanszírozás | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 163 | Épülettartalom migrációja és grafikai fallback | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 164 | Első épületi vertical slice: Forester Hut | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 165 | Soil plot és növényinstance | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 166 | Növekedési szimuláció | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 167 | Érés, betakarítás és offline növekedés | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 168 | Soros műveletek, öntözés és farmhelper | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 169 | Földterület, orchard és erdőgazdálkodási határ | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 170 | Állatdefiníció, instance és lakóhely | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 171 | Gondozás, hangulat és állati output | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 172 | Szaporodás, különleges állatok és távollét | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 173 | Farmkapcsolatok: tárolás, cooking és trade | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 174 | Mobilos farmműveletek és háttérteljesítmény | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 175 | Fontos és tömeges NPC-k adatmodellje | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 176 | Napi rutin, időjárás és jelenetek közötti mozgás | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 177 | Schedule conflict, háttérszimuláció és offline állapot | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 178 | Specialisták, szolgáltatások, kereskedők és workerek | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 179 | Kapcsolati állapot és ajándékozás | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 180 | Párbeszéd és nem blokkoló történeti kommunikáció | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 181 | NPC által kiváltott világ- és gazdasági változások | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 182 | NPC eltűnés, visszatérés és eseményütközés | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 183 | NPC-tulajdon és közösségi objektumok | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 184 | NPC-UI, hozzáférhetőség és nagy populáció teljesítménye | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 185 | Quest-adatmodell és életciklus | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 186 | Elfogadás, időzítés, sikertelenség és újrapróbálás | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 187 | World Path és függőségi gráf | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 188 | Történeti és felfedezési irány | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 189 | Tutorial, célkövetés és mobilos megjelenítés | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 190 | Jutalom, world event és tartalmi migráció | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 191 | Progression-adatmodell | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 192 | Professionstruktúra és érvényes életutak | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 193 | XP és anti-grind jutalmazás | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 194 | Perk, specializáció és respec | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 195 | Háromrétegű és látható fejlődés | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 196 | Progressziós tempó, capek és mérés | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 197 | Pénznem, ledger és tranzakció | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 198 | Pénz szerepe, kereskedők és boltok | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 199 | Order és contract rendszer | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 200 | Kereslet, kínálat és több megélhetési út | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 201 | Árak, infláció és balansz | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 202 | Offline kereskedelem és exploitvédelem | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 203 | Kanonikus világóra | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 204 | Világciklus és időablakok | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 205 | Időjárás, évszak és ritka jelenségek | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 206 | Offline folyamatok | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 207 | Pause, app-életciklus és utazás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 208 | Óramanipuláció, időzóna és teljesítményteszt | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 209 | Activity- és run-adatmodell | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 210 | Run-életciklus — kanonikusan már lefedett | `COVERED` | Korábbi kanonikus pontra hivatkozás | Egyedi implementációs kapcsolat még kitöltendő |
| 211 | Kockázat, vereség és nehézség | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 212 | Activity-portfólió és pályagenerálás | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 213 | Opcionális harc | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 214 | Exploitvédelem, mobilos irányítás és teljesítmény | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 215 | Sessionhossz és time-to-action | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 216 | Welcome-back és biztonságos folytatás | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 217 | Alacsony nyomású játékszabály | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 218 | Ajánlások és adaptív HUD | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 219 | Természetes megállási pontok, reminder és Scenic Mode | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 220 | Mobilos megszakítás és autosave | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Save lifecycle automatizált alap; mobil proof hiányzik |
| 221 | Kudarcfilozófia | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 222 | Craft-, event- és activity-kudarc | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 223 | Undo-szabály összehangolása | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Nincs Undo implementálva |
| 224 | Játékosvédelmi UX | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 225 | Stuck recovery és degradált mód | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Asset fallback alap működik |
| 226 | Crash, rollback és adatvesztés elleni teszt | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Save recovery tesztek részlegesek |
| 227 | Portrait-first adaptív HUD | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 228 | Információs architektúra és navigáció | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 229 | Touch, lista és egykezes használat | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 230 | Állapot- és hibavisszajelzés | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 231 | Scenic Mode és későbbi photo mode | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 232 | Lokalizáció, hozzáférhetőség és UI-elfogadás | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 233 | Art direction és assetcsaládok | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 234 | Sprite registry és szemantikus feloldás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Asset manifest/registry / PR #4 |
| 235 | Geometriai és atlaszmetaadat | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Registry metaadat-kontraktus részleges |
| 236 | Vizuális állapotok és variánsok | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Asset resolver/variáns/fallback alap |
| 237 | Seamless terrain és assetpipeline | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | 3×3 terrain proof még hiányzik |
| 238 | Renderer, draw order és mobilos teljesítmény | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 239 | Vizuális QA és Scenic Mode minőség | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 240 | Audio-event rendszer | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 241 | Zene és adaptív soundscape | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 242 | Interakciós és UI-visszajelző hangok | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 243 | App-életciklus és audiobeállítások | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 244 | Haptika és hozzáférhetőségi redundancia | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 245 | Audioasset-betöltés, budget és milestone-scope | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 246 | Hozzáférhetőségi minimumszerződés | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 247 | Vizuális hozzáférhetőség | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 248 | Input és motoros hozzáférhetőség | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 249 | Audio, felirat, haptika és reminder | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 250 | Beállításadat, profil és migráció | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 251 | Privacy és értesítési policy hiánya | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Nincs telemetria; újranyitási javaslat 2026-08-01 |
| 252 | Teljesítményprofilok és hozzáférhetőségi QA | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 253 | Definíciós formátum és csomaghatárok | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 254 | Stabil azonosítók, hivatkozások és dependency graph | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 255 | Role, tag, asset, lokalizáció és UI-metaadat | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Role/tag alap megvan; lokalizáció még nincs |
| 256 | Validáció, verziózás és szerkesztői munkafolyamat | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 257 | Mentési tárhely és atomi írás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 258 | Mentési ütemezés, megszakítás és több tab | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 259 | Mentésintegritás és javítási bizonyíték | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 260 | Migráció, méret és eltávolított tartalom | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 261 | Export, import és későbbi felhőmentés | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 262 | Platformhatár és csomagolás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 263 | Célplatform- és eszközmátrix | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | GitHub Pages + iPhone 16 Pro proofirány |
| 264 | Viewport, Canvas és adaptív megjelenítés | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Portrait runtime részleges; eszközmátrix készült |
| 265 | Teljesítmény-, memória- és energia-budget | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Budget lezárt; formális mérés hiányzik |
| 266 | Cache, lifecycle, offline és proof build | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | PWA/lifecycle részleges |
| 267 | Kötelező tesztrétegek | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | 45/45 legutóbbi ismert automatizált teszt |
| 268 | Determinisztikus replay és naplók | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 269 | Inspectorok és fejlesztői vezérlők | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 270 | Automatizált regresszió és szimuláció | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 271 | Mobilteszt, crashdiagnosztika és telemetria | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 272 | Strukturális döntés és tuning szétválasztása | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 273 | Pacing és gazdasági mérés | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 274 | Anti-grind, várakozás és automatizálás | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 275 | Ritkaság, hosszú távú relevancia és balanszrevízió | `MEASUREMENT` | Prototípus vagy valódi eszközös mérés | Egyedi implementációs kapcsolat még kitöltendő |
| 276 | Tartalmi taxonómia | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Vertical-slice content inventory hiányzik |
| 277 | Első vertical slice | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Minimal toy loop részleges; P1 nem kész |
| 278 | Korai vezetett szakasz és fő út | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 279 | Régióroadmap és elágazások | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 280 | Endgame, mastery és tartalmi mennyiség | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 281 | Első public demo | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 282 | Munkacsomag-szerződés | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | AGENTS.md munkacsomag-szerződés |
| 283 | Clean-runtime baseline — kanonikusan már lefedett | `COVERED` | Korábbi kanonikus pontra hivatkozás | Egyedi implementációs kapcsolat még kitöltendő |
| 284 | Mérföldkövek és P0–P3 | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | P0 alap + minimális loop elkészült; P1 folyamatban |
| 285 | Implementációs sorrend | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | PR #1–#8 sorrendi implementáció |
| 286 | Egységes Definition of Done | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | DoD csak részben bizonyított |
| 287 | Scope-fegyelem, Git és rollback | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Git history, tagek és Pages baseline |
| 288 | Játékidentitás és célközönség | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 289 | Név, tagline és vizuális identitás | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 290 | Store page, screenshot és trailer | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 291 | Demo-, platform- és lokalizációs kommunikáció | `OWNER-OPEN` | Tulajdonosi döntés a függő rendszer megnyitása előtt | Egyedi implementációs kapcsolat még kitöltendő |
| 292 | Privacy és monetizáció | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Külön policykapu; telemetria jelenleg tiltott |
| 293 | Identitás, verziózás, tranzakció és megszakítás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | World State/Save alap részleges |
| 294 | Offline, exploit, grind és helyreállítás | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 295 | Magyarázhatóság, teljesítmény, hozzáférhetőség és tesztelhetőség | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 296 | Audit-evidenciamátrix | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 297 | Architektúra- és gameplay-readiness | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Egyedi implementációs kapcsolat még kitöltendő |
| 298 | Implementációindítási kapu | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Implementációs kapu lezárt |
| 299 | Az audit célja és korlátja | `LOCKED` | Implementáció és bizonyíték, amikor scope-ba kerül | Kontrollált csomagokra bontott munkafolyamat |

## Kiegészítő dokumentációs kapuk

| Kapu | Téma | Állapot | Kanonikus forrás | Implementációs kapcsolat |
|---|---|---|---|---|
| D1 | Döntés- és referencia-reconciliation | `LOCKED` / `DONE` | `Dokumentumaudit.txt` D1.1C–D1.7C | D2 `READY`; I1/I2 a saját kapuik után nyithatók |
| D2 | HUD–menu–screen map | `LOCKED` / `DONE` | `Dokumentumaudit.txt` D2.1C–D2.8C | D3 `READY`; I1 külön munkacsomagban előkészíthető |
| D3 | Vertical-slice map blueprint | `LOCKED` / `DONE` | `Dokumentumaudit.txt` D3.1C–D3.9C | D4 `READY`; I3 a D4 után nyitható |
| D4 | Visual scale és camera contract | `LOCKED` / `DONE` | `Dokumentumaudit.txt` D4.1C–D4.10C | D5 `READY`; D6–D8 a stabil geometriára épül |
| D5 | Art direction és kanonikus referencialap | `LOCKED` / `DONE` | `Dokumentumaudit.txt` D5.1C–D5.10C | D6 `READY`; D7 örökli a stílus-, fény- és reference-role blokkokat |
| D6 | Asset production pipeline | `LOCKED` / `DONE` | `Dokumentumaudit.txt` D6.1C–D6.10C | D7 `READY`; D8 passport/report/technical output szerződésre épül |
| D7 | Verziózott promptkönyvtár | `LOCKED` / `DONE` | `Dokumentumaudit.txt` D7.1C–D7.10C | D8 `READY`; exact familyváltozók és outputméretek kitölthetők |

## Karbantartás

Minden elfogadott döntésnél vagy merge-nél az érintett sor utolsó oszlopát
konkrét dokumentumra, commitra, PR-re, tesztre vagy eszközös jegyzőkönyvre
kell cserélni. A fő állapotösszesítést a
`docs/Implementacios-ellenorzomatrix.md` tartalmazza.
