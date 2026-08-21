# Readi World — döntésváltozási napló

Frissítve: 2026-08-01

## Cél

A napló megkülönbözteti az új döntést, a pontosítást, a mérési hangolást és a
korábbi döntés felülírását. Egy könnyed beszélgetési ötlet önmagában nem
változtatja meg a kanonikus projektirányt.

## Eseménytípusok

- `DECISION`: új, jóváhagyott tulajdonosi döntés.
- `CLARIFICATION`: meglévő döntés jelentésének pontosítása.
- `MEASUREMENT`: lezárt elv konkrét értékének méréssel történő hangolása.
- `REOPEN-PROPOSAL`: felülvizsgálat felmerült, de a régi döntés még érvényes.
- `SUPERSEDED`: korábbi döntés kifejezetten felülírva.
- `EVIDENCE`: döntéshez új implementációs bizonyíték érkezett.

## Napló

| Dátum | Terület | Típus | Korábbi állapot | Új esemény / állapot | Kanonikus hatás |
|---|---|---|---|---|---|
| 2026-07-30 | Runtime alap | `SUPERSEDED` | Régi monolitikus prototype volt a látható oldal | Clean runtime lett az aktív alap | 284–287 rögzíti |
| 2026-07-30 | Platform | `CLARIFICATION` | Android is felmerült proofeszközként | iPhone 16 Pro + GitHub Pages webapp/PWA az első proof | 263, 265–266 rögzíti |
| 2026-07-30 | Joystick kézprofil | `DECISION` | Oldal nem volt tulajdonosilag lezárva | Jobbkezes alap, balkezes tükör | 111 rögzíti |
| 2026-07-30 | Undo | `DECISION` | Korábbi bible Undo-lehetőséget említett | Nincs általános Undo | 223 rögzíti |
| 2026-07-30 | Export/cloud | `DECISION` | Későbbi lehetőség nyitott | P0/P1-ben nincs, adapterhatár későbbre marad | 261 rögzíti |
| 2026-07-30 | Adatküldés | `DECISION` | Nem volt külön policy | P0/P1-ben nincs analitika vagy automatikus adatküldés | 251 és 292 rögzíti |
| 2026-07-30 | Implementáció | `DECISION` | Tervezési fázis | 298-as implementációs kapu lezárt | 298 rögzíti |
| 2026-07-31 | Karaktersebesség | `MEASUREMENT` | Mobilon túl gyors végsebesség | Maximum 20%-kal csökkentve: 215 → 172 | Runtime proof; általános végérték még mérendő |
| 2026-07-31 | Joystick működés | `CLARIFICATION` | Runtime fix jobb oldali joystick | Kívánt viselkedés: jobb oldali touch-origin floating, release-hide | Kanonikus pontosítás még szükséges |
| 2026-07-31 | Elsődleges nyelv | `CLARIFICATION` | Lokalizációs kulcs elve lezárt, source-locale nehezen visszakereshető | Angol az elsődleges játéknyelv | Kanonikus visszahivatkozás rendezendő |
| 2026-07-31 | Hibrid világ | `EVIDENCE` | Új kérdésnek tűnt | Megerősítve, hogy 9C-ben már locked | Nincs döntésváltozás |
| 2026-07-31 | Épületbelsők | `CLARIFICATION` | Pontos lista nem került elő a jelenlegi forrásokból | Tulajdonos szerint korábban lezárt, ezért nem tervezendő újra | D1 forrás-reconciliation szükséges |
| 2026-07-31 | Referenciaképek | `CLARIFICATION` | Chatmellékletek, tartós index nélkül | A vizuális irány részének tekintendők | Reference pack szükséges |
| 2026-07-31 | Grafikai masterek | `DECISION` | Tárolási hely nem volt lezárva | A projekt mellett, egy közös helyen legyenek; runtime exporttól elkülönítve | Asset pipeline-ban kanonizálandó |
| 2026-08-01 | Analitika/telemetria | `REOPEN-PROPOSAL` | 251C szerint nincs analitika/adatküldés | Az engedélyezés lehetősége felmerült | A régi döntés marad érvényes külön policy és új döntésig |
| 2026-08-01 | Tool-választás és automatikus munka | `CLARIFICATION` | Korábbi értelmezés szerint a kiválasztott fejsze mellett még külön kontextuális szándékjelzés kellett volna | A tool kiválasztása maga a munkaszándék: üres kéz = séta; fejsze kézben + érvényes fa közelében = automatikus favágás, újabb ACT/promptnyomás nélkül | 101 és 133–134 alapelvéhez D1-ben visszahivatkozandó; célpontprioritás és megszakítás mérendő |
| 2026-08-01 | Floating joystick és HUD-profil | `DECISION` | Jobbkezes oldal locked volt, de a touch-origin zóna nyitott maradt | Jobbkezes alapban jobb oldali szabad játéktér; balkezes tükör és későbbi HUD-elrendezési testreszabás megmarad | D1.2C–D1.3C rögzíti |
| 2026-08-01 | Épületbelsők | `DECISION` | A pontos whitelist nem volt visszakereshető | Csak a Player Home teljesen bejárható; minden további belső külön scope és assetbudget | D1.4C rögzíti |
| 2026-08-01 | D1 dokumentációs kapu | `EVIDENCE` | Döntések és referenciák több forrásban szétszórva | D1 lezárt; 9 képes reference pack és prototype parity inventory elkészült | D1.1C–D1.7C; `DOC-D1-001` |
| 2026-08-01 | D2 HUD–menu–screen map | `DECISION` | A HUD-vízió és menük több referencia és nyitott mérési pont között oszlottak meg | 1 shell + 4 működő P1 alnézet, adaptív HUD, kézprofil, későbbi custom layout route, dead button tiltás és egységes panelállapotok | D2.1C–D2.8C; `DOC-D2-001` |
| 2026-08-01 | D3 vertical-slice map | `DECISION` | A runtime technikai próbapálya volt, a vizuális referenciák pedig nem alkottak implementálható térképet | Egybefüggő arrival–village–workyard–forest–hut jelenet, farmösvény-jutalom, stabil zónák/landmarkok és state-driven before/after | D3.1C–D3.9C; `DOC-D3-001` |
| 2026-08-01 | D4 scale és kamera | `DECISION` | A perspektíva és assetméret képi referenciákból volt csak kikövetkeztethető | 55°±5° 3/4 top-down, WU/64 APU, 12–26 PPWU, 8 displayed/5 authored direction, külön pivot/footprint és stabil depth/occlusion contract | D4.1C–D4.10C; `DOC-D4-001` |
| 2026-08-02 | D5 art direction és referenciák | `DECISION` | Kilenc referencia és több vizuális elv rendelkezésre állt, de nem volt egyetlen gyártási hierarchia és mérhető art-QA | Hat vizuális pillér, 24 anchor token, semleges masterfény, A/B/C referenciahierarchia, family recipe, hard fail lista és 18/20 QA-kapu | `D5-OWN-001A`; D5.1C–D5.10C; `DOC-D5-001` |
| 2026-08-02 | D6 asset production pipeline | `DECISION` | A masterhely, export, provenance, backup és assetreport még csak különálló igény volt | Háromrétegű master/normalized/runtime folyamat, projektközeli `art-source/`, stabil ID + revisionök, technical spec, passport/report, hash, backup és rollback | `D6-OWN-001A`; D6.1C–D6.10C; `DOC-D6-001` |
| 2026-08-02 | D7 promptkönyvtár | `DECISION` | A fix assetpromptok igénye megvolt, de nem létezett verziózott, családokra bontott reprodukciós rendszer | 9 globális blokk, 7 family pack, 27 promptrecept, változó-/verziókontraktus, reference-role szabály és exact prompt-run log | `D7-OWN-001A`; D7.1C–D7.10C; `DOC-D7-001` |
| 2026-08-02 | Art tooling sorrend | `DECISION` | Photoshop- és Illustrator-automatizálás együtt szerepelt lehetséges irányként | `ART-TOOL-01A` Photoshop UXP Readi Asset Prep MVP készül elsőként; Illustrator csak későbbi igazolt UI/vector igénynél | Tulajdonosi elfogadás; `docs/art/Photoshop-automation-requirements.md` |
| 2026-08-02 | Asset pivot lánc | `DECISION` | A prompt és a PSD-guide tévesen exact runtime-pivot bizonyítékának tűnhetett | PSD-guide + profile/passport target + normalizált export actual + sidecar/manifest; a prompt csak talajkontaktust és margót kér | `PIVOT-OWN-001A`, tulajdonosilag elfogadva |
| 2026-08-02 | D8 manifest geometry gap | `IMPLEMENTATION-EVIDENCE` | A schema v1 nem választotta szét a rajzméretet, footprintet, interaction anchort és occludert | Schema v2 kötelező és validált külön mezőkkel, csendes v1-default nélkül | PR #9; merge `177d542`; 50/50 teszt; `DONE` |
| 2026-08-02 | ART-TOOL-01A UXP MVP | `IMPLEMENTATION-EVIDENCE` | Az elfogadott Photoshop-panel még csak követelmény volt | Telepíthető UXP v5 panel profile/canvas/pivot/guides/validate/export/memory/sidecar/passport funkcióval; 14/14 hostfüggetlen teszt | `tools/photoshop/readi-asset-prep/`; host proof Photoshop 24+ hiányában nyitott |
| 2026-08-02 | ART-TOOL-01A Photoshop 2020 kompatibilitás | `IMPLEMENTATION-EVIDENCE` | A kész UXP panel a helyi Photoshop 21.1 alatt nem futott | Actionből/gyorsbillentyűről indítható ES3 JSX/ScriptUI híd ugyanazzal a D8 profillal, validációval, duplicate exporttal, sidecarral és passporttal; 6/6 teszt | `tools/photoshop/readi-asset-prep-jsx/`; PS 21.1 kézi host proof nyitott, PS24+ már nem production blokk |
| 2026-08-02 | ART-TOOL-01A Photoshop 2020 host acceptance | `IMPLEMENTATION-EVIDENCE` | A JSX híd hostfüggetlenül tesztelt volt, de a teljes operatív Photoshop-bizonyíték még hiányzott | `ReadiWorldScript` Actionből indítás; mindhárom profil, validáció, normalized/review export, változatlan master, overwrite/profile/ground-contact blokkok, sidecar és passport két ága sikeresen ellenőrizve | `HOST-ARTTOOL-01A`; `ART-TOOL-01A DONE`; UXP marad későbbi kényelmi út |

## Új bejegyzés kötelező mezői

- dátum;
- érintett auditpont vagy rendszer;
- eseménytípus;
- korábbi állapot;
- új állapot vagy javaslat;
- indok;
- tulajdonosi jóváhagyás állapota;
- érintett dokumentumok;
- implementációs és mentéskompatibilitási hatás.

## Felülírási szabály

`SUPERSEDED` csak explicit tulajdonosi döntéssel és a kanonikus audit
frissítésével használható. Addig az eltérő ötlet `REOPEN-PROPOSAL`.
