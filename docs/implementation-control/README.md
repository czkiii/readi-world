# Readi World — implementációs irányítórendszer

Frissítve: 2026-08-01

## Cél

Ez a mappa a kanonikus döntések és a tényleges fejlesztés közötti
nyilvántartási réteg. Nem írja felül a `Dokumentumaudit.txt` döntéseit.

## Dokumentumok

| Dokumentum | Feladat |
|---|---|
| [Auditpont-lefedettsegi-jegyzek.md](Auditpont-lefedettsegi-jegyzek.md) | Az 1–299. pont és a 72.5 kiegészítés teljes, pontonkénti nyilvántartása. |
| [Tavlati-rendszerregister.md](Tavlati-rendszerregister.md) | A P1-en túli játékrendszerek látható backlogja és aktiválási kapuja. |
| [Dontesvaltozasi-naplo.md](Dontesvaltozasi-naplo.md) | Döntések pontosításának, felülírásának és újranyitásának története. |
| [Bizonyitek-jegyzek.md](Bizonyitek-jegyzek.md) | Commitok, PR-ek, tesztek, deploymentek, screenshotok és eszköztesztek nyilvántartása. |
| [Eszkoz-es-kepernyomatrix.md](Eszkoz-es-kepernyomatrix.md) | Támogatási szintek, viewportok, safe area és eszközös acceptance. |
| [Munkacsomag-hatasmatrix.md](Munkacsomag-hatasmatrix.md) | Kötelező scope-, függőség-, kockázat- és regressziós sablon. |
| [Nyitott-dontesek-es-meresek.md](Nyitott-dontesek-es-meresek.md) | A 69 tulajdonosi és 35 mérési kapu, valamint az újranyitási javaslatok. |
| [Dokumentacios-szinkronszabaly.md](Dokumentacios-szinkronszabaly.md) | Hogyan kerül egy chatben született döntés tartósan a projektbe. |
| [Produkcios-leltarak-index.md](Produkcios-leltarak-index.md) | A későbbi UI-, asset-, prompt-, audio-, localization-, map- és contentleltárak helye. |
| [Kockazati-nyilvantartas.md](Kockazati-nyilvantartas.md) | Pontozott produkciós kockázatok, korai triggerek, megelőzés és visszaesési terv. |
| [adr/README.md](adr/README.md) | Technikai Architecture Decision Record rendszer, sablon és kezdeti döntések. |
| [Fejlesztesi-backlog-es-milestone-board.md](Fejlesztesi-backlog-es-milestone-board.md) | Függőségvezérelt D/P/I munkasor, WIP-limit és P1 cut list. |
| [Bug-es-playtest-folyamat.md](Bug-es-playtest-folyamat.md) | Bug, UX finding, design gap és change request szétválasztása; playtestprotokoll. |
| [Debug-tooling-terv.md](Debug-tooling-terv.md) | Helyi, privacy-safe inspectorok, overlayek, profiler és golden save fixture terv. |
| [Build-es-release-runbook.md](Build-es-release-runbook.md) | Draft PR, teszt, Pages smoke, release-bizonyíték és rollback folyamat. |
| [Vertical-slice-content-es-assetbudget.md](Vertical-slice-content-es-assetbudget.md) | A 20–30 perces P1 maximális content-, art-, UI-, audio- és technikai kerete. |
| [D1-dontes-es-referencia-reconciliation.md](D1-dontes-es-referencia-reconciliation.md) | A D1 döntés-visszakeresése, a lezárt szabályok és a két még szükséges tulajdonosi választás. |
| [Prototype-behavior-parity-inventory.md](Prototype-behavior-parity-inventory.md) | A referencia-prototípus viselkedéseinek KEEP/RECREATE/REDESIGN/DISCARD besorolása. |
| [Reference-index.md](../art/reference-sheets/Reference-index.md) | A kilenc tulajdonosi referenciakép tartós katalógusa, hash-e és átvételi jegyzete. |
| [HUD-menu-screen-map.md](../design/HUD-menu-screen-map.md) | A D2 portré HUD-zónái, P1 képernyői, navigációja, kézprofilja és kötelező UI-állapotai. |
| [Vertical-slice-map-blueprint.md](../design/Vertical-slice-map-blueprint.md) | A D3 egybefüggő village–forest–Forester Hut térképe, zónái, útvonalai, state-rétegei és P1 cut listje. |
| [Visual-scale-and-camera-contract.md](../design/Visual-scale-and-camera-contract.md) | A D4 projekciója, zoomprofiljai, kamerakövetése, draw orderje, occlusionje és device-stratégiája. |
| [Visual-scale-sheet.md](../art/Visual-scale-sheet.md) | A D4 WU/APU assetléptéke, karakter-, növény-, prop- és épületméretei, pivot- és footprintszabályai. |
| [Art-direction-contract.md](../art/Art-direction-contract.md) | A D5 north-star, pillérek, anchor paletta, anyag-, fény-, UI-, effekt- és art-QA szerződése. |
| [Canonical-reference-sheet.md](../art/reference-sheets/Canonical-reference-sheet.md) | A kilenc referencia hierarchiája, családonkénti szerepe, KEEP/AVOID szabálya és D7 promptleképezése. |
| [Asset-production-pipeline.md](../art/Asset-production-pipeline.md) | A D6 source/master → normalized → runtime export folyamata, állapotgépe, backup-, provenance-, QA- és rollbackszabálya. |
| [Asset-technical-spec.md](../art/Asset-technical-spec.md) | A D6 sRGB/alpha, méret, WebP/PNG, atlasz, 9-slice, seamless és textúramemória szerződése. |
| [Asset-geometry-metadata-contract.md](../art/Asset-geometry-metadata-contract.md) | A PSD-guide, normalizált pixelpivot, geometry sidecar és runtime manifest közötti pivot-/geometrialánc; owner review alatt. |
| [Asset-passport-template.md](../art/Asset-passport-template.md) | Kitölthető identity-, geometria-, provenance-, revision-, export-, QA- és rollbackpassport. |
| [Asset-report-template.md](../art/Asset-report-template.md) | Egy assetcsalád scope-, inventory-, budget-, vizuális-, technikai- és regressziós reportja. |
| [Source-master-inventory.md](../art/Source-master-inventory.md) | A későbbi szerkeszthető masterrevisionök, hashek, previewk és backupok leltára. |
| [Asset-passport-registry.md](../art/Asset-passport-registry.md) | A stabil Asset ID-k és aktív passportpéldányok későbbi registryje. |
| [Prompt-library.md](../art/Prompt-library.md) | A D7 verziózott promptarchitektúrája és hét assetcsalád másolható promptpackje. |
| [Prompt-run-log-template.md](../art/Prompt-run-log-template.md) | A konkrét generálási futás exact prompt-, modell-, referencia-, output-, hash- és döntésnaplója. |
| [Asset-family-inventory.md](../art/Asset-family-inventory.md) | A D8-tól induló family-, role/state-, output-, dependency- és production-készültségi leltár. |
| [Forest-harvest-tree-family-spec.md](../art/families/Forest-harvest-tree-family-spec.md) | A D8 első pine tree/stump/shadow familyjének exact identity-, geometria-, budget-, QA- és integrációs szerződése. |
| [Forest-harvest-tree-exact-prompts.md](../art/families/Forest-harvest-tree-exact-prompts.md) | A D8 első family kitöltött standing-tree, matching-stump és shadow prompt/brief csomagja. |
| [Photoshop-automation-requirements.md](../art/Photoshop-automation-requirements.md) | Az `ART-TOOL-01` Readi Asset Prep Photoshop 2020 JSX/Action útja és későbbi UXP panelje. |
| [ART-TOOL-01A plugin README](../../tools/photoshop/readi-asset-prep/README.md) | A Readi Asset Prep MVP telepítése, biztonságos használata, tesztje és Photoshop 24+ host-kapuja. |
| [ART-TOOL-01A Photoshop 2020 JSX README](../../tools/photoshop/readi-asset-prep-jsx/README.md) | A jelenlegi PS 21.1-kompatibilis script telepítése, Action/gyorsbillentyűs használata és biztonsági szerződése. |

## Frissítési események

A csomagot frissíteni kell, ha:

- új tulajdonosi döntés születik;
- egy korábbi döntés újranyílik vagy pontosodik;
- dokumentációs csomag lezárul;
- runtime PR merge-elődik;
- új production asset kerül be;
- save-schema vagy tartalmi verzió változik;
- iPhone-os vagy más eszközös proof készül;
- egy későbbi rendszer scope-ba kerül;
- új `HIGH/CRITICAL` kockázat jelenik meg;
- architekturális, release- vagy contentbudget-döntés változik.

## Kötelező sorrend

1. A döntés bekerül vagy visszahivatkozik a kanonikus auditba.
2. Frissül a teljes auditpont-jegyzék.
3. Frissül a fő `Implementacios-ellenorzomatrix.md`.
4. Szükség szerint frissül a változásnapló, rendszerregister és nyitott kapulista.
5. Implementáció után bekerül a konkrét bizonyíték.

Egy döntés nem tekinthető tartósan rögzítettnek, ha csak a beszélgetésben
szerepel.
