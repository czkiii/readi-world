# Readi World — távlati rendszerregister

Frissítve: 2026-08-01

## Cél

Ez a register láthatóan megőrzi a P1 vertical slice-on kívüli rendszereket.
Az `OUT-OF-SLICE` nem elutasítást jelent, hanem scope-védelmet: a rendszer
csak a saját aktiválási kapuja után nyitható meg.

## Státuszok

- `P1`: az első vertical slice része.
- `P2-CANDIDATE`: a külső tesztelhető demóhoz mérlegelhető.
- `P3-LATER`: csak bizonyított slice után nyitható.
- `OPEN`: további tulajdonosi döntés szükséges.
- `MEASUREMENT`: prototípus vagy balanszmérés szükséges.
- `POLICY`: külön jogi/privacy/üzleti dokumentum szükséges.

## Rendszerregister

| Terület | Játékosi ígéret | Auditkapcsolat | Scope | Aktiválási kapu | Lezáró szerep |
|---|---|---|---|---|---|
| Fő falu és tartós világ | A világ megőrzi és láthatóan visszatükrözi a játékos változtatásait. | 9–12, 60–66, 277 | `P1` részleges | Vertical-slice map blueprint, World State és save-proof | `TECHNICAL + OWNER` |
| Forester Hut restauráció | Gathering–crafting–restoration első teljes hurok. | 101–105, 164–166, 277, 285 | `P1` | 20–30 perces E2E, production UX és látható before/after | `OWNER + MOBILE-PROOF` |
| Farming | Birtok, termesztés, fejlődés és kapcsolódó profession. | 136–144, 277.3, 285.4 | `P3-LATER` | P1 lezárva; külön farming scope és assetlista | `OWNER` |
| Fishing | Nyugodt, hely- és időfüggő activity. | 141–144, activity döntések, 277.3 | `P3-LATER` | P1 lezárva; input- és activity proof | `OWNER + MEASUREMENT` |
| Mine és quarry | Külön activity scene, erőforrások és kockázat. | 67–69, 209–215, 277.3 | `P3-LATER` | Scene transition/save/run kontraktus és külön content pack | `TECHNICAL + OWNER` |
| Harbor, hajózás és expedíció | Régiók elérése, kereskedelem és felfedezés. | 67–69, 198–203, 209–215, 277.3 | `P3-LATER` | World Path és activity rendszer bizonyított | `OWNER` |
| World Path és régiók | Érthető világkapcsolatok, követelmények és gyorsutazás. | 185–190, 276–279 | `P3-LATER` | Fő falu stabil; régió-content dependency report | `OWNER + TECHNICAL` |
| Tereprendezés és építés | Szabadnak érződő, technikailag rendezett világépítés. | 8, 12–39, 115, 155–166 | `P3-LATER` | Placement/camera prototípus és mobil UX-teszt | `OWNER + MEASUREMENT` |
| Játékosotthon és belső terek | Tartósan személyre szabható otthon és funkcionális szobák. | Gameplay bible 9.9; 160; korábbi tulajdonosi döntés | `P3-LATER` | Pontos belsőtér-lista reconciliation, interior asset/collision spec | `OWNER + ART` |
| Inventory és storage network | Biztonságos, érthető tárgykezelés helyi és később hálózatos tárolással. | 117–125, 277.2–277.3 | `P1` minimális / `P3` teljes | P1 inventory UX; storage network csak slice után | `OWNER + TECHNICAL` |
| Crafting és processing | Átlátható receptek, queue-k és épületkapcsolatok. | 126–135, 277 | `P1` minimális / `P3` teljes | Egy recipe E2E kész; teljes modell külön scope | `OWNER + TECHNICAL` |
| Toolok és automatikus interakció | Helyzetfüggő eszközválasztás permanens ACT gomb nélkül. | 101–106, 132–135 | `P1` alap / később bővül | Interaction UX spec és animációs/tool asset contract | `OWNER + ART` |
| NPC-k, kapcsolatok és közösség | Élő falu, emlékező és jelentős szereplők. | 167–184 | `P3-LATER` | NPC persistence, schedule, dialogue és crowd budget | `OWNER` |
| Quest, történet és journal | A restaurációt támogató, nem sürgető célvezetés. | 167–190, 227–230 | `P1` minimális goal / `P3` teljes | HUD/menu map, localization és narrative content contract | `OWNER` |
| Profession, skill és mastery | Hosszú távú fejlődés látható választásokkal. | 185–201, 277.3 | `P3-LATER` | P1 lezárva; roster és balansz tulajdonosi döntés | `OWNER + MEASUREMENT` |
| Economy és trade | Érthető, exploitbiztos, nem sürgető gazdaság. | 194–203, 277.3 | `P3-LATER` | Resource-flow modell, sessionteszt, invariánsok | `OWNER + MEASUREMENT` |
| Állatok és petek | Élőbb világ és opcionális társak/funkciók. | 145–154 | `P3-LATER` | Viselkedési, pathfinding-, persistence- és assetbudget | `OWNER` |
| Idő, napszak és időjárás | Fokozatos, hangulatos és olvasható világváltozás. | 65–66, 204–208 | `P1` vizuális proof / később teljes | Lighting contract, teljesítmény- és olvashatósági mérés | `ART + MEASUREMENT` |
| Évszakok | A világ hosszabb távú változása tartalmi túlnövekedés nélkül. | 140, 204–208 | `P3-LATER` | Napszak/időjárás stabil; assetvariáns-budget | `OWNER + ART` |
| Offline progress és visszatérés | A játék tiszteletben tartja a játékos idejét, duplikáció nélkül. | 204–220 | `P1` save/resume alap / később mélyebb | Mobil lifecycle és gazdasági anti-exploit proof | `TECHNICAL + MEASUREMENT` |
| Collection és endgame | A világ restaurációja, személyesség és mastery ad hosszú távú célt. | 191, 280 | `P3-LATER` | Core progression bizonyított; külön tartalmi scope | `OWNER` |
| Scenic Mode | HUD nélküli világélmény és képkészítésre alkalmas nézet. | 107, 231 | `P2-CANDIDATE` | HUD és input stabil; külön UX/mérés | `OWNER + MEASUREMENT` |
| Audio és adaptív soundscape | Cozy ambience régió, napszak, időjárás és beltér szerint. | 241–245 | `P1` alap ambience / később teljes | Audio direction és budget | `OWNER + ART` |
| Lokalizáció | Angol elsődleges tartalom, cserélhető localization kulcsokkal. | 255.3, 277.4 | `P1` | Angol source-locale kanonikus rögzítése és string inventory | `OWNER + TECHNICAL` |
| Analitika/telemetria | Csak célhoz kötött, átlátható és opcionális mérés lehet. | 251, 270, 292 | `POLICY` | Külön privacy/telemetry dokumentum, consent és explicit új döntés | `OWNER + POLICY` |
| Cloud/export/import | Helyi játék marad az alap; későbbi adapterrel bővíthető. | 261 | `P3-LATER` | Külön security, privacy és migration proof | `OWNER + TECHNICAL` |
| Monetizáció | Nem épülhet FOMO-ra, pay-to-skipre vagy kötelező várakozásra. | 292 | `POLICY` | Külön jóváhagyott üzleti és jogi dokumentum | `OWNER + POLICY` |

## Aktiválási szabály

Új rendszer csak akkor kerülhet aktív implementációs csomagba, ha:

1. a függő korábbi milestone bizonyítottan lezárt;
2. a hozzá tartozó nyitott auditpontok lezártak vagy tudatosan halasztottak;
3. tartalom-, asset-, audio-, lokalizációs, save- és progressionhatása ismert;
4. önálló munkacsomagja és rollbackpontja van;
5. a fő implementációs mátrixban `READY` állapotot kapott.
