# Readi World — vizuális referenciaindex

Frissítve: 2026-08-01  
Reference pack: D1 owner-provided concepts

## Használati szabály

Ezek a képek vizuális és kompozíciós referenciák, nem production assetek és
nem adnak önálló implementációs felhatalmazást. Egy képből csak a külön
`KEEP` mezőben megnevezett tulajdonság vihető tovább. A generált szöveg,
ikonjelentés, joystickoldal, ACT gomb és képen látható funkciólista nem válik
automatikusan játékdöntéssé.

Az eredeti chatmellékletek változatlan másolatai találhatók a `visual/`
mappában. A rövidebb fájlnevek stabil reference ID-ként szolgálnak.

## Referenciák

| ID | Fájl | Méret | Elsődleges szerep | KEEP | REDESIGN / DISCARD |
|---|---|---:|---|---|---|
| `REF-001` | [Village world composition](visual/REF-001-village-world-composition-portrait.jpg) | 720×1280 | Portré világkompozíció | Organikus útvezetés, landmarkritmus, coastal–village–forest átmenet, cozy sűrűség és tiszta főút. | Nem a P1 pontos térképe; mine/harbor/farm és kiépített világ későbbi scope. |
| `REF-002` | [HUD layout light concept](visual/REF-002-hud-layout-light-concept.jpg) | 853×1280 | HUD-információs hierarchia | Felső állapotsáv, avatar/szint, releváns resource, idő/napszak, világban elhelyezett címkék, tiszta safe area. | Bal oldali joystick nem vihető át; statikus ACT nincs; generált szöveg és funkciólista nem kanonikus. |
| `REF-003` | [HUD layout dense village concept](visual/REF-003-hud-layout-dense-village-concept.jpg) | 720×1280 | HUD + gazdagabb világ kapcsolat | A UI sötét, puha panelnyelve; világ és HUD erős kontrasztja; napszak-összehasonlítás. | Túlzsúfolt P1-világ csökkentendő; joystick jobbkezes/floating lesz. |
| `REF-004` | [System vision board](visual/REF-004-system-vision-board.jpg) | 1280×853 | Teljes játék vízió és rendszerkapcsolatok | Restauráció előtte/utána, World Path, placement, building progression, day/night és cozy palette együttélése. | Nem egyetlen runtime-képernyő; panelek és rendszerek nem nyílhatnak meg egyszerre P1-ben. |
| `REF-005` | [Primary portrait gameplay HUD](visual/REF-005-primary-portrait-gameplay-hud.jpg) | 720×1280 | Elsődleges player-facing hangulat- és HUD-referencia | Meleg storybook világ, karakterlépték, top bar, main goal kártya, in-world building state, jobb oldali gyors navigáció vizuális nyelve, bottom resource strip. | Bal oldali fix joystick, permanens axe/action gomb, egyszerre látható túl sok rendszer, farm/harbor/event/offline card P1-ben nem veendő át. Adaptív HUD szükséges. |
| `REF-006` | [Gameplay system board](visual/REF-006-gameplay-system-board.jpg) | 1280×853 | Kamera-, placement-, activity- és HUD-variáció | Kezdő/fejlődő világ kontraszt, zoomprofilok, terrain mode, building states, day/weather és HUD-testreszabás mint hosszú távú rendszer. | Nem P1 featurelista; a candidate képernyők nem acceptance screenshotok. |
| `REF-007` | [Clean system board](visual/REF-007-clean-system-board.jpg) | 1280×853 | Egyszerűbb vizuális rendszerkommunikáció | Jól olvasható moduláris rendszerbemutatás, world progress, building/farm fejlődési sor és zöld–arany palette. | Konkrét joystick/action elhelyezés nem vihető át; P1-ben farm és teljes HUD-customization nincs. |
| `REF-008` | [Developed village world map](visual/REF-008-developed-village-world-map.jpg) | 1280×853 | Hosszú távú world composition | Sugárirányú utak, felismerhető district/landmarkok, coastal kapcsolat, fő fa/guild hall mint vizuális középpont. | Endgame-sűrűség; nem kezdőfalu és nem közvetlenül játszható P1-layout. |
| `REF-009` | [Start versus endgame comparison](visual/REF-009-start-versus-endgame-comparison.jpg) | 1280×720 | A világ emlékszik rád / restaurációs ígéret | Ugyanazon földrajz erős előtte–utána változása, üresből élő világ, landmarkok tartós fejlődése. | A pontos épületmennyiség és elrendezés nem tartalmi kötelezettség; endgame csak P3 után. |

## Közös vizuális nevező

Mind a kilenc referencia az alábbi irányt erősíti:

- meleg, cozy, festett/storybook világ;
- enyhén döntött top-down perspektíva;
- olvasható utak és landmarkok;
- organikus, de nem kaotikus növényzet;
- puha árnyék és földközeli, természetes paletta;
- a világ fejlődése látható legyen;
- mobil portré HUD sötét, áttetsző, lekerekített panelnyelvvel;
- a UI ne takarja el a világ fontos útvonalait;
- a játék kezdetben sokkal üresebb, később gazdagabb és személyesebb.

## Kötelező eltérések a referenciáktól

- Jobbkezes profilban a joystick jobb oldali és floating.
- Nincs permanens ACT/axe gomb.
- A tool kiválasztása aktiválja a hozzá tartozó munkaszándékot.
- A HUD adaptív; nem mutat egyszerre minden későbbi rendszert.
- A P1-ben nincs működő farm, harbor, fishing, mine, economy vagy teljes
  professionrendszer.
- A runtime szöveget lokalizációs kulcsból rajzolja, nem képre generálva.

## Eredet és integritás

| ID-tartomány | Forrás | Másolási mód | Eredeti módosult? |
|---|---|---|---|
| `REF-001`–`REF-009` | Tulajdonos által 2026-07-31-én csatolt kilenc JPG koncepció | Változatlan bináris másolat, új stabil fájlnévvel | Nem |

Az egyedi SHA-256 értékek a D1 reconciliation riportban találhatók.
