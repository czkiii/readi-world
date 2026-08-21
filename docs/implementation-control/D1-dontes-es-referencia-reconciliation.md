# Readi World — D1 döntés- és referencia-reconciliation

Frissítve: 2026-08-01  
Állapot: `DONE`

## Cél

A korábbi döntések, prototype-viselkedések és tulajdonosi referenciák
visszakereshető rendezése. A D1 nem módosít runtime-ot és nem választ új
technológiát. A tulajdonosi jóváhagyás után a megerősített pontok kerülhetnek
a kanonikus auditba és a következő D2–D4 csomagokba.

## Vizsgált források

- `docs/Dokumentumaudit.txt`;
- `docs/Audit-terkep.txt`;
- `docs/Gameplay-bible.txt`;
- `docs/Engine-design-bible-felulvizsgalat.md`;
- `docs/history/Engine-design-bible.txt`;
- `reference/prototype/` és `reference/candidate/`;
- a 2026-07-31-én csatolt kilenc vizuális koncepció;
- a 2026-07-31 és 2026-08-01 közötti explicit tulajdonosi pontosítások.

## Reconciliált döntések

| ID | Terület | Visszanyert állítás | Forrás | D1 státusz | Következő lépés |
|---|---|---|---|---|---|
| `D1-DEC-001` | Elsődleges nyelv | Az angol az elsődleges source-locale; minden játékosszöveg localization keyből érkezik. | Owner confirmation; Gameplay Bible angol source; prototype `localization_en.json`; audit 255.3C | `LOCKED` — D1.1C | D2 után string inventory. |
| `D1-DEC-002` | Világstruktúra | Tartós, összefüggő fő falu; külön activity/régió jelenetek. | Audit 9C | `LOCKED-RECOVERED` | D3 map blueprint alkalmazza; nem új döntés. |
| `D1-DEC-003` | Maptechnika | Organikus látvány + adatvezérelt ground/object/landmark hibrid; saját map editor P1-ben nem szükséges. | Audit 8–11; owner discussion; ADR-0006 | `LOCKED-RECOVERED` | D3–D4 proof és tulajdonosi art-jóváhagyás. |
| `D1-DEC-004` | Jobbkezes profil | Joystick jobb oldali alap, balkezes tükrözés, konfigurálható méret/érzékenység. | Audit 111C | `LOCKED-RECOVERED` | I2 eszközös mérés. |
| `D1-DEC-005` | Floating viselkedés | Touch-origin megjelenés a választott kézprofilhoz tartozó szabad játéktéren, húzás, release-hide, UI-tap kizárása. Jobbkezes alapban ez a jobb oldal; a balkezes profil tükröz, a későbbi HUD-menü támogatott elemeket átrendezhet. | Történeti bible; prototype `startJoy/moveJoy/endJoy`; owner confirmation | `LOCKED` — D1.2C–D1.3C | I2 implementáció és eszközös mérés. |
| `D1-DEC-006` | Tool-intent | Üres kéz a sétát és egyszerű pickupot priorizálja. Kiválasztott fejsze maga a favágási szándék; érvényes fa közelében külön ACT/tap nélkül indul a munka. | Gameplay Bible 10.1; audit 106C; owner clarification 2026-08-01 | `LOCKED` — D1.5C | Célpontprioritás és megszakítás mérése. |
| `D1-DEC-007` | ACT-gomb | Nincs permanens ACT gomb; buildingnél egyetlen kontextuális prompt lehet. | Audit 101–103, történeti bible | `LOCKED-RECOVERED` | D2 UI state map. |
| `D1-DEC-008` | Első gameplay tanítási ív | Földi ág → munkapad javítása/elkészítése → további ág → fejsze craft → fejsze kiválasztás → automatikus favágás → Forester Hut restauráció → látható világváltozás. | Owner gameplay concept 2026-08-01; Gameplay Bible forest→hut korai ív; audit 277 | `LOCKED FLOW` — D1.7C | D3 map és későbbi content contract; konkrét költség/balansz mérendő. |
| `D1-DEC-009` | Adaptív HUD | A B+ képi irány referencia; a HUD progression/context szerint bővül, nem mutat egyszerre mindent. | Audit/UI irány; reference pack `REF-002`–`REF-007`; owner confirmation | `LOCKED PRINCIPLE / LAYOUT OPEN` | D2 screen map és iPhone prototype. |
| `D1-DEC-010` | Art direction | Meleg, cozy, kézzel festett/storybook, tiszta silhouette, enyhén döntött top-down, puha árnyék. | AGENTS, engine review, `REF-001`–`REF-009` | `LOCKED PRINCIPLE` | D4 scale, D5 art contract/reference sheets. |
| `D1-DEC-011` | Referenciaképek | A kilenc koncepció a vizuális szándék része; csak az indexelt KEEP tulajdonságok vihetők tovább. | Owner-provided files | `LOCKED-CATALOGUED` — D1.6C | D2–D5 hivatkozza stabil REF ID-val. |
| `D1-DEC-012` | Épületbelsők | Csak a Player Home kap teljes, bejárható belső teret. Más épületek külső building screent vagy külön activity scene-t használnak; további belső tér külön scope. | Gameplay Bible 9.9; prototype `Enter Home`; owner confirmation 2026-08-01 | `LOCKED` — D1.4C | A Forester Hut belseje nem része az első slice-nak. |
| `D1-DEC-013` | Régi prototype | Viselkedési és vizuális referencia, nem technikai alap; az értékes részek újraépítendők. | Audit 2–4, 287; ADR-0001 | `LOCKED-RECOVERED` — D1.6C | Parity inventory alapján csomagonként `RECREATE/REDESIGN`. |

## Első slice gameplay flow — tulajdonosi szándék

```text
Üres kéz
  → földi ágak automatikus/simple pickupja
  → sérült vagy hiányos munkapad helyreállítása
  → további földi fa gyűjtése
  → első fejsze craftolása a munkapadnál
  → fejsze kiválasztása (work intent ON)
  → érvényes fa közelében automatikus favágás
  → rönk/javítóanyag megszerzése
  → Forester Hut restauráció
  → tartós, látványos világváltozás és következő irány
```

Kötelező viselkedési korlátok:

- fejsze nélkül nincs automatikus favágás;
- fejsze kiválasztása után nincs második ACT/tap követelmény;
- mozgás, tool elrakása vagy az interakciós fázis szerinti megszakítás visszaadja
  a kontrollt;
- jutalom csak commit után és pontosan egyszer jár;
- a földi ág és a kivágott fa külön resource/node állapot;
- a munkapad javítása és a fejsze craft két külön, látható progressionbeat;
- a végcél továbbra is a Forester Hut, nem a farm gameplay.

## Reference pack integritás

| REF | SHA-256 |
|---|---|
| `REF-001` | `9A8FC00DF26148CB251210ED9677AE203B6F163557D37A443DBEBEE2BA59C2D4` |
| `REF-002` | `DAA245B52C38F66A3A40B60FB24A5B11739B23E2F7A3904E64C3689B7B402D7C` |
| `REF-003` | `87A7B00A6552754F234EB5B406731C5F0E02F75C929C3F271CFEEB63D0FA9C02` |
| `REF-004` | `812C99B6F3A15580AF29923A70FAE3A786C2A7111C04EC34F81E5ACD86CF9027` |
| `REF-005` | `C98A4BE9B018A424221CA5415E06795C1041BBC82B746BEF644D75B6E85714BF` |
| `REF-006` | `6DBA3BF530ACBCBE340C27D13C4C4EBE365BD4D819524661772463785CFD54A8` |
| `REF-007` | `01DA78C666F91A8B1A5F2EC5517F3CE68F3DC3A0EAEC4F933D22B9D36C4FC7B7` |
| `REF-008` | `BAFC59E31FAF3EA26CE557D95E80421B6F366E28CC641813A84A2F92BBBACC11` |
| `REF-009` | `E4E8F48FA1CDCE660DAAF5282196342C3386FDC28A9D26135C906FB8D57ABA1B` |

`REF-005` későbbi külön chatmelléklete ugyanilyen hashű volt, ezért nem került
duplikált fájlként a packbe.

## Lezárt tulajdonosi D1-kapuk

### `D1-OWN-001` — floating joystick aktivációs zónája

**Elfogadva: A.** Jobbkezes alapban a jobb oldali, HUD-on kívüli world-touch
indítja a floating joystickot. Ez profilalapú default, nem végleges rögzítés:
a balkezes beállítás tükrözi, a későbbi HUD-testreszabási menü pedig a
támogatott vezérlők és HUD-elemek elhelyezését módosíthatja.

### `D1-OWN-002` — épületbelsők whitelistje

**Elfogadva: A.** Csak a Player Home kap teljes, bejárható belső teret. A többi
funkcionális épület külső interakciós/building screent vagy külön activity
scene-t használ, amíg egy későbbi, külön jóváhagyott belsőtér-scope meg nem nyílik.

A `Forester Hut` belső tere nem szükséges az első slice restaurációs
ígéretéhez. Ha később külön gameplayt kap, önálló scope- és assetbudget kell.

## D1 elfogadási feltételek

- A kilenc reference fájl változatlanul, stabil ID-val a projektben van.
- A reference index megnevezi a megtartandó és elvetendő elemeket.
- A prototype parity inventory minden lényeges régi viselkedést minősít.
- Angol, tool-intent, gameplay flow és artirány visszakereshető.
- `D1-OWN-001` és `D1-OWN-002` tulajdonosi választása rögzítve.
- A jóváhagyott eredmény bekerült a kanonikus auditba és a teljes auditledgerbe.
- A backlog D1 `DONE`, D2 pedig `READY` állapotú.
