# Readi World — központi kockázati nyilvántartás

Frissítve: 2026-08-01  
Következő kötelező felülvizsgálat: D1 reconciliation lezárása

## Cél

A register nem azt próbálja megígérni, hogy nem lesz meglepetés. Azt biztosítja,
hogy a fontos kockázatoknak legyen korai jele, felelőse, megelőzése és
visszaesési terve, mielőtt blokkolnák a fejlesztést.

## Pontozás

- Valószínűség: 1 = ritka, 5 = szinte biztos.
- Hatás: 1 = kicsi, 5 = milestone- vagy adatvesztési szintű.
- Pontszám: valószínűség × hatás.
- `CRITICAL`: 20–25; `HIGH`: 12–19; `MEDIUM`: 6–11; `LOW`: 1–5.

Az `OWNER` a tulajdonosi választást, a `TECH` a technikai megelőzést, az
`ART` a vizuális gyártást, a `QA` a tesztbizonyítékot, a `POLICY` pedig külön
adatkezelési/jogi döntést jelenti.

## Aktív kockázatok

| ID | Kockázat | V | H | Szint | Korai jel / trigger | Megelőzés | Visszaesési terv | Felelős | Állapot |
|---|---|---:|---:|---|---|---|---|---|---|
| `R-001` | Scope creep miatt a P1 sosem ér véget. | 5 | 5 | `CRITICAL` | Farm, harbor, mine vagy teljes economy bekerülne a slice-ba. | 277.3/285.4, cut list, egy rendszer/csomag, WIP-limit 1. | Extra funkció vissza `P3-LATER` státuszba. | `OWNER+TECH` | Aktív |
| `R-002` | Korábbi döntés csak chatben marad és újra elveszik. | 2 | 5 | `MEDIUM` | „Ezt már megbeszéltük” forráshivatkozás nélkül. | Dokumentációs szinkronszabály, 300 pontos ledger, változásnapló. | D1 reconciliation; implementáció megáll a forrás tisztázásáig. | `TECH+OWNER` | Kontrollált |
| `R-003` | AI-val készülő assetek stílusa és perspektívája szétesik. | 4 | 5 | `CRITICAL` | Ugyanazon családban eltérő kamera, fény, outline vagy arány. | Reference sheet, visual scale, verziózott promptblokkok, családonkénti spec. | Asset elutasítása; újragenerálás vagy kézi korrekció. | `ART+OWNER` | Aktív |
| `R-004` | Szép asset technikailag nem implementálható. | 4 | 4 | `HIGH` | Hibás pivot, footprint, transzparencia, állapotgeometria vagy túl nagy fájl. | Asset passport, export template, egy család proofja, manifest-validáció. | Master megőrzése; új export/normalizálás, runtime rollback. | `ART+TECH` | Aktív |
| `R-005` | Kamera-, zoom- és assetlépték későn ütközik. | 4 | 5 | `CRITICAL` | Karakter, ajtó, fa és ház más arányban készül; tablet/zoom életlen. | D3 map blueprint, D4 visual scale és camera contract minden production art előtt. | Az érintett család gyártásának megállítása; scale proof újranyitása. | `ART+TECH` | Aktív |
| `R-006` | iPhone-on textúramemória-, FPS- vagy melegedési probléma. | 3 | 5 | `HIGH` | Tartós 30 FPS alatt, újratöltés, gyors melegedés, textúra >128 MB. | Családbudget, atlaszreport, DPR/render-scale cap, normál/stressz proof. | Minőségi profil, kisebb export/atlasz, jelenetasset felszabadítása. | `TECH+QA` | Aktív |
| `R-007` | Safari/PWA lifecycle vagy cache hibás verziót/mentést okoz. | 4 | 4 | `HIGH` | Régi build marad cache-ben; resume után beragadt input vagy duplikált jutalom. | Buildazonosító, cache-policy, 10 resume-ciklus, idempotens save és interaction. | Előző Pages commit visszaállítása; recovery mód; cache-verzió emelése. | `TECH+QA` | Aktív |
| `R-008` | Save-schema változás régi mentést sért vagy duplikál. | 3 | 5 | `HIGH` | Migrációs hiba, invalid reference, ismételt reward. | Verziózott schema, golden save fixtures, invariáns- és migration teszt. | Backupból recovery; hibás release rollback; javító migráció külön csomagban. | `TECH+QA` | Aktív |
| `R-009` | HUD és floating joystick összeakad vagy eltakarja a világot. | 4 | 4 | `HIGH` | UI-tap mozgást indít; kritikus objektum kontroll alatt; félrenyomás. | HUD screen map, safe zone, input context, UI exclusion, iPhone egykezes teszt. | Layoutprofil visszaállítása; érintett csomag rollback. | `UX+TECH` | Aktív |
| `R-010` | A technikai toy loop kész vertical slice-nak látszik. | 3 | 4 | `HIGH` | Néhány perces loop, placeholder map/HUD, mégis `DONE` státusz. | P1 megfelelési mátrix, bizonyítékjegyzék, pontos státuszszókincs. | Visszaminősítés `PARTIAL/PLACEHOLDER` státuszra. | `TECH+OWNER` | Kontrollált |
| `R-011` | A content- és assetmennyiség túlterheli az egyszemélyes artgyártást. | 4 | 5 | `CRITICAL` | Variánsok száma nő, több család indul egyszerre, nincs kész család. | Vertical-slice budget, WIP-limit 1 assetcsalád, must/should/cut lista. | Variánsszám csökkentése; placeholder/fallback; következő család halasztása. | `ART+OWNER` | Aktív |
| `R-012` | Külső playtest nélkül számunkra érthető, új játékosnak zavaros UX készül. | 4 | 4 | `HIGH` | Számlálók félreérthetők; cél/útvonal magyarázatot igényel. | Feladatalapú moderált playtest, nem vezető kérdések, megfigyelési jegyzet. | HUD/onboarding újratervezés külön csomagban. | `QA+OWNER` | Aktív |
| `R-013` | Analitika újranyitása privacy- vagy scope-problémát hoz. | 2 | 5 | `MEDIUM` | SDK vagy hálózati küldés policy előtt bekerülne. | 251/292 kapu, local-first működés, külön telemetry threat/privacy review. | Funkció eltávolítása; hálózati adapter kikapcsolása; release blokkolása. | `POLICY+OWNER` | Kontrollált |
| `R-014` | Szerkeszthető master vagy prompt/provenance elveszik. | 3 | 5 | `HIGH` | Csak optimalizált export marad; nem reprodukálható asset. | Source-master inventory, backup, promptverzió, asset passport. | Backup visszaállítás; asset újragyártás; release asset befagyasztása. | `ART+OWNER` | Aktív |
| `R-015` | Saját map editor túl korai építése elviszi a fejlesztési időt. | 3 | 3 | `MEDIUM` | Több editorfunkció készül, mint játszható pálya. | P1 adatvezérelt layout; fájdalompontok mérése; editor csak bizonyított szükségre. | Editor scope lezárása; kézi/adatfájlos layout folytatása. | `TECH+OWNER` | Kontrollált |
| `R-016` | A webes build-, cache- vagy releasefolyamat nincs reprodukálva. | 3 | 4 | `HIGH` | „Nálam működik”, de Pages más SHA-t vagy régi assetet szolgál. | Release-runbook, commit-marker, smoke check, rollback drill. | Utolsó bizonyított SHA redeploy; release stop. | `TECH+QA` | Aktív |
| `R-017` | Jogilag vagy eredetileg bizonytalan AI/reference asset kerül kiadásba. | 3 | 4 | `HIGH` | Hiányzó forrás, licenc, prompt vagy referenciaeredet. | Provenance mezők az asset passportban; release előtti jogi leltár. | Asset eltávolítása/fallback; tiszta újragyártás. | `ART+POLICY` | Aktív |
| `R-018` | Audio túl későn kerül be, ezért a feedback és cozy érzet rosszul ítélhető meg. | 3 | 3 | `MEDIUM` | A vizuális rendszer késznek tűnik, de interakciók súlytalanok. | Minimális P1 ambience/SFX budget és külön audio proof. | Ideiglenes jogtiszta audio placeholder, majd külön csere. | `ART+OWNER` | Figyelt |
| `R-019` | A helyi Photoshop verzió nem tudja futtatni a jóváhagyott UXP asset panelt. | 2 | 3 | `MEDIUM` | Telepített Photoshop 21.1, miközben a UXP panel minimum 24.0. | PS 2020-kompatibilis JSX/ScriptUI híd ugyanazzal a profillal és biztonsági szerződéssel; 6/6 contractteszt és sikeres PS21 host-operation proof. | A bizonyított JSX/Action út használata; PS24+/UXP csak későbbi kényelmi fejlesztés. | `OWNER+ART+TECH` | Lezárt — JSX operatív út bizonyított |
| `R-020` | A projektközeli docs/art/tooling forrás nincs ugyanabban a Git-baseline-ban, mint a runtime. | 4 | 4 | `HIGH` | Fontos tool csak egy helyi workspace-ben létezik; nincs commit/rollback SHA. | Külön tools/docs repository vagy jóváhagyott project-root Git-baseline még production használat előtt. | Ellenőrzött archív backup, majd repositoryba import megőrzött hashekkel. | `OWNER+TECH` | Aktív |

## Top prioritás

Az aktuális legfontosabb megelőző lépések:

1. D1 reference- és döntésreconciliation (`R-002`, `R-003`, `R-014`).
2. HUD/menu map és floating joystick szerződés (`R-009`, `R-012`).
3. Vertical-slice map + visual scale (`R-005`, `R-011`).
4. Asset pipeline és promptkönyvtár (`R-003`, `R-004`, `R-014`, `R-017`).
5. iPhone build/performance proof (`R-006`, `R-007`, `R-016`).

## Karbantartás

- Minden munkacsomag előtt ellenőrizni kell, mely kockázatok változnak.
- `CRITICAL` kockázathoz megelőző feladat nélkül függő implementáció nem indulhat.
- Új kockázat stabil `R-###` ID-t kap; törlés helyett `CLOSED` vagy
  `ACCEPTED` státuszra vált.
- A pontszám nem érzésből csökkenthető: bizonyíték vagy lezárt megelőző csomag kell.
