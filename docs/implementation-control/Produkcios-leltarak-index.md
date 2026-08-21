# Readi World — produkciós leltárak indexe

Frissítve: 2026-08-02

## Cél

A fő implementációs mátrix állapotot mutat; a részletes leltárak konkrét
képernyőket, asseteket, promptokat, hangokat, szövegeket, mapobjektumokat és
tartalmi függőségeket fognak felsorolni. Ez az index előre kijelöli a helyüket.

## Leltárak

| Leltár | Tervezett hely | Tartalom | Jelenlegi állapot | Létrehozási kapu |
|---|---|---|---|---|
| HUD/menu/screen inventory | `docs/design/HUD-menu-screen-map.md` | Képernyők, panelek, navigáció, unlock, empty/locked/error állapot | `D2-DONE` — 8 P1 screen/state, 10 HUD-modul, 10 panelállapot | I1 implementáció és device proof |
| Vertical-slice map/object inventory | `docs/design/Vertical-slice-map-blueprint.md` | Zónák, landmarkok, spawn, utak, resource, workbench, hut, kamera | `D3-DONE` — 8 zóna, 7 landmark/anchor, 3 path, 8 progression beat | D4 scale/camera, majd I3 proof |
| Reference image catalog | `docs/art/reference-sheets/Reference-index.md` + `Canonical-reference-sheet.md` | Reference ID, forrás, hierarchia, megtartandó/elvetendő elemek és family recipe | `D5-DONE` — 9/9 kép hash-ellenőrzött és kanonikus szerephez rendelt | D7 promptok és D8 family spec hivatkozza |
| Art direction inventory | `docs/art/Art-direction-contract.md` | North-star, pillérek, anchor paletta, anyagok, fény, családirányok, hard fail és scorecard | `D5-DONE` — 6 pillér, 24 színtoken, 10 QA-dimenzió | D6–D8 kötelező input |
| Visual scale inventory | `docs/art/Visual-scale-sheet.md` + `docs/design/Visual-scale-and-camera-contract.md` | Karakter, ajtó, fa, kő, ház, út, pivot, footprint, projekció és zoom | `D4-DONE` — 64 APU, 5 kameraprofil, 15 world role, 9 draw layer | Golden scale scene és családspecifikus D8 proof |
| Asset family inventory | `docs/art/Asset-family-inventory.md` | Család, role, tag, állapotok, darabszám, milestone, dependency | `D8-DONE` — első pine family: 3/3 owner-approved production output | Külön I4 runtime-integráció |
| Prompt template registry | `docs/art/Prompt-library.md` + `prompt-packs/` + `Prompt-run-log-template.md` | Global/style/camera/light/family/negative/output/QA blokkok, exact run log és verziók | `D7-DONE` — 9 globális blokk, 7 family pack, 27 promptrecept | D8 exact kitöltés |
| Asset passport + geometry metadata | `docs/art/Asset-passport-registry.md` + `Asset-passport-template.md` + `Asset-geometry-metadata-contract.md` | Stabil ID, forrás, prompt, export, pivot target/actual, geometry sidecar, footprint, licence, QA és rollback | `D8-FAMILY-VERIFIED` — 3/3 pine passport és geometry sidecar | I4 manifest/runtime evidence |
| Source-master inventory | `docs/art/Source-master-inventory.md` + `art-source/README.md` | Masterfájl helye, revision, hash, preview, backup és exportkapcsolat | `D8-FAMILY-VERIFIED` — 3 aktív master + 3 hash-azonos archive backup | Új revision csak külön family körben |
| Audio inventory | `docs/audio/Audio-inventory.md` | Music, ambience, SFX, event ID, loop, budget, fallback | `PLANNED` | Audio direction előtt |
| Localization/string inventory | `docs/localization/String-inventory.md` | Angol source key, fallback, képernyő, max hossz, státusz | `PLANNED` | HUD/menu map után |
| Content dependency inventory | `docs/content/Content-dependency-inventory.md` | System, asset, audio, localization, save, progression függőség | `PLANNED` | Első P1 content pack előtt |
| Test inventory | `docs/testing/Test-inventory.md` | Unit, integration, E2E, interruption, migration, device, visual | `PLANNED` | P1 DoD összeállításakor |

## Közös kötelező mezők

Minden leltárbejegyzés kapjon:

- stabil ID-t;
- rövid célt;
- forrást és tulajdonost;
- mérföldkövet;
- függőségeket;
- státuszt;
- acceptance feltételt;
- bizonyítékot;
- utolsó frissítési dátumot;
- felülíró vagy helyettesítő elemre mutató kapcsolatot.

## Assetcsaládok minimális listája

- karakterek, portrék és animációk;
- fák, kövek és gyűjthető erőforrások;
- épületek és fejlődési állapotok;
- ground, utak és transition/seamless elemek;
- dekorációk;
- UI-panelek, keretek és ikonok;
- effektek, árnyékok és részecskék;
- később állatok, belső terek, activity scene-ek és régiós landmarkok.

## Szabály

Egy leltárban szereplő `PLANNED` elem nem implementációs felhatalmazás. Csak
akkor kerülhet runtime-ba, ha a fő mátrix és a munkacsomag-hatásmátrix szerint
`READY`.
