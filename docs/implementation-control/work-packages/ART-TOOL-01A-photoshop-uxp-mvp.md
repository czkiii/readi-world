# ART-TOOL-01A — Photoshop UXP Readi Asset Prep MVP

Frissítve: 2026-08-02  
Állapot: `IMPLEMENTED / AUTOMATED-VERIFIED / HOST-ACCEPTANCE-BLOCKED`

## Egyetlen cél

Telepíthető, helyi Photoshop UXP panel készítése, amely a jóváhagyott family
profile alapján biztonságosan előkészíti és validálja a Readi World raster
asset mastereket, majd normalized PNG-t, review PNG-t, geometry sidecart és
passport draftot készít anélkül, hogy runtime assetet aktiválna.

## Módosítható fájlok

- `tools/photoshop/readi-asset-prep/` teljes plugin- és tesztforrása;
- `docs/art/Photoshop-automation-requirements.md` státusz- és kompatibilitási része;
- `docs/implementation-control/` ART-TOOL-01A státusz- és evidence sorai;
- ez a munkacsomag.

## Védett fájlok

- `runtime/` teljes tartalma;
- `art-source/` master-, normalized-, review- és registrytartalma;
- D8 family identity, prompt, méret-, pivot- és geometriaértékei;
- World State, Save Manager, gameplay, renderer és aktív asset manifest;
- Illustrator tooling és az ART-TOOL-01B/01C funkciók.

## Rögzített technikai irány

- UXP manifest v5, Photoshop host, `minVersion: 24.0.0`, API v2;
- a 24.0 minimum oka a DOM guide-koordináta javítása;
- minden Photoshop-módosítás `core.executeAsModal` alatt fut;
- az aktív mastert export közben nem flatteneli és nem írja felül;
- export temporary duplicate-on történik, amely mentés nélkül bezárul;
- host fájlrendszerhez csak explicit file/folder pickerrel fér hozzá;
- geometry sidecar és passport draft nem jelent `QA-PASS` vagy `INTEGRATED`
  státuszt.

## Host-kompatibilitási kapu

A helyi gépen észlelt Photoshop 2020 verzió `21.1`. Az Adobe hivatalos
dokumentációja szerint UXP plugin minimum Photoshop `22.0`, a használt DOM
guide API `23.0`, koordinátajavítása pedig `24.0`. Ezért:

- a plugin forrása és hostfüggetlen contracttesztje most elkészíthető;
- a Photoshopon belüli fixture acceptance ezen a telepítésen nem futtatható;
- `DONE` csak Photoshop 24+ és UXP Developer Tool kézi proof után adható;
- addig a legmagasabb állapot `IMPLEMENTED / AUTOMATED-VERIFIED / HOST-PROOF-MISSING`.

## ART-TOOL-01A scope

- bundled D8 pine standing/stump/shadow profile betöltése;
- Asset ID, revision, canvas, pivot, density és geometry validáció;
- aktív dokumentum RGB/8-bit/sRGB ellenőrzése és explicit korrekciója;
- canvas resize artwork skálázása nélkül, előzetes megerősítéssel;
- standard layer groupok és safe-padding/pivot/ground-line guide-ok;
- normalized PNG és review PNG explicit célfájllal;
- decoded texture MiB becslés;
- geometry sidecar v1 és passport draft JSON;
- overwrite-blokkolás és műveleti státusznapló;
- telepítési, frissítési és eltávolítási útmutató.

## Nem része

- runtime WebP/PNG candidate és manifestaktiválás;
- SHA-256 external CLI bridge;
- 3×3 seamless, 9-slice, zoom/state contact sheet és alpha-fringe QA;
- family report delta;
- Illustrator adapter;
- production pine kép generálása vagy utómunkája.

## Elfogadási feltételek

- manifest, panel és bundled profile JSON szintaktikailag valid;
- hibás Asset ID, revision, canvas, pivot és geometria blokkolt;
- standing/stump/shadow profil pontosan visszaadja a D8 értékeket;
- normalized pivot, decoded memory, sidecar és passport determinisztikus;
- exportnév revisiont tartalmaz és overwrite alapból tiltott;
- a Photoshop adapter nem ír közvetlenül runtime-ba;
- a tiszta core modul teljes automatizált tesztje sikeres;
- telepítési útmutató egyértelműen jelzi a Photoshop 24+ követelményt;
- Photoshop 24+ host proof hiánya külön látszik, és nem hamisít `DONE` állapotot.

## Regressziós ellenőrzések

- a `runtime/` worktree végig tiszta marad;
- nincs production asset vagy `art-source/` tartalmi módosítás;
- nincs hálózati, analitikai vagy automatikus adatküldés;
- nincs automatikus master-overwrite;
- nincs `INTEGRATED` vagy `QA-PASS` automatikus státusz;
- minden plugin-core teszt és JavaScript syntax check sikeres.

## Rollback

A plugin teljesen elkülönült `tools/photoshop/readi-asset-prep/` mappában készül.
Eltávolítása nem módosít runtime-ot vagy asset mastert. Photoshopból az UXP
Developer Tool workspace-bejegyzés eltávolításával és a plugin unloadjával
visszavonható.

## Eredmény

- UXP manifest v5, plugin `0.1.0`, Photoshop minimum `24.0.0`;
- panel UI és három bundled pine tooling-fixture;
- profile-, revision-, canvas-, pivot-, geometry- és document-validáció;
- standard layer group és guide adapter;
- temporary duplicate-on normalized/review PNG export;
- overwrite-blokkoló file workflow;
- decoded MiB, geometry sidecar v1 és passport draft;
- actual pivot csak explicit ground-contact confirmation után kerül passportba;
- 14/14 hostfüggetlen teszt és teljes JavaScript syntax check sikeres;
- runtime main worktree változatlan és tiszta;
- telepítési/eltávolítási útmutató és kézi acceptance checklist elkészült;
- Photoshop 24+ host proof a helyi 21.1 telepítés miatt nyitott.
