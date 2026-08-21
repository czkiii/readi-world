# ART-TOOL-01A-JSX — Photoshop 2020 kompatibilitási híd

Frissítve: 2026-08-02  
Állapot: `DONE / AUTOMATED-VERIFIED / PS21-HOST-OPERATION-PASS`

## Egyetlen cél

Photoshop 2020 (`21.1`) alatt, fizetős vagy hálózati API nélkül futó,
Actionből és gyorsbillentyűről indítható ExtendScript (`.jsx`) elkészítése. A
script ugyanazt a D8 pine family profilt, pivot-, geometria-, fájlnév- és
passport-szerződést használja, mint az ART-TOOL-01A UXP panel.

## Módosítható fájlok

- `tools/photoshop/readi-asset-prep-jsx/` teljes kompatibilitási csomagja;
- ez a munkacsomag;
- az ART-TOOL-01A státusz- és bizonyítéksorai az implementációs kontrollban;
- a Photoshop automation követelménydokumentum kompatibilitási része.

## Védett fájlok

- `runtime/` teljes tartalma;
- `art-source/` master-, normalized-, review- és registrytartalma;
- `tools/photoshop/readi-asset-prep/` UXP-forrása;
- a D8 profile identity-, canvas-, pivot-, padding- és geometriaértékei;
- Illustrator tooling, ART-TOOL-01B és ART-TOOL-01C;
- World State, Save Manager, gameplay és aktív runtime manifest.

## Elfogadási feltételek

- a script Photoshop 2020-kompatibilis ES3/ExtendScript szintaxist használ;
- egyetlen Action/gyorsbillentyű megnyitja a ScriptUI műveleti ablakot;
- a standing, stump és shadow output pontosan a kanonikus D8 profilt követi;
- létrehozás, dokumentumvalidáció, RGB/8-bit/sRGB korrekció, canvas-beállítás,
  standard layer group és pivot/padding guide készítés elérhető;
- normalized és review PNG temporary duplicate-ról exportálódik, az eredeti
  master destruktív módosítása nélkül;
- exportnál, sidecarnál és passportnál az overwrite alapból blokkolt;
- geometry sidecar és passport draft készülhet, de nem állít automatikusan
  `QA-PASS` vagy `INTEGRATED` állapotot;
- nincs hálózat, analitika, kredit vagy runtime-írás;
- a hostfüggetlen contract- és csomagtesztek sikeresek;
- a Photoshop 21.1 kézi host proof külön, őszintén követett kapu.

## Regressziós ellenőrzések

- a `runtime/` Git-worktree tiszta és a meglévő runtime tesztek változatlanul
  sikeresek;
- nincs `art-source/` tartalmi módosítás;
- az embedded JSX profile gépileg egyezik az UXP canonical profile-lal;
- az UXP csomag meglévő 14 tesztje sikeres marad;
- a script nem tartalmaz hálózati vagy automatikus aktiválási útvonalat.

## Rollback

A teljes híd egy elkülönített `tools/photoshop/readi-asset-prep-jsx/` mappában
él. Photoshopból a bemásolt `.jsx` eltávolításával, a rögzített Actionből pedig
a scriptlépés törlésével visszavonható; runtime-ot és asset mastert nem érint.

## Funkcionális kompromisszum a UXP panelhez képest

A műveletek és kontraktusok nem csökkennek. A különbség kényelmi: nem
folyamatosan dokkolt panel, hanem az Action/gyorsbillentyű által megnyitott
ScriptUI ablak, és a műveletekhez Photoshop natív fájl- vagy mappaválasztója
nyílik meg.

## Eredmény

- egyetlen, önálló `Readi Asset Prep.jsx` Photoshop 2020/ExtendScript csomag;
- a projektmappában maradó scriptet hívó `ReadiWorldScript` Actionből
  megnyitható ScriptUI műveleti ablak; külön Function Key nem előfeltétel;
- a canonical UXP profillal gépileg egyező standing/stump/shadow fixture;
- profilból dokumentum, validáció, szín- és canvas-korrekció, layer groupok,
  pivot/ground/padding guide-ok;
- temporary duplicate-on normalized/review PNG, overwrite-blokkolással;
- geometry sidecar és passport draft, explicit ground-contact kapuval;
- nincs hálózat, runtime-írás, automatikus `QA-PASS` vagy aktiválás;
- 6/6 JSX contract/package teszt és 14/14 UXP regressziós teszt sikeres;
- telepítési/Action útmutató és Photoshop 21.1 kézi acceptance lista elkészült;
- a helyi Photoshop 2020 `21.1` a JSX-et ténylegesen betöltötte, és a teljes
  ScriptUI műveleti ablak megjelent;
- a hostteszten észlelt régi ExtendScript UTF-8 feliratprobléma ASCII-biztos
  kezelőfelülettel javítva;
- a Photoshop 21.1 kézi műveleti proof sikeres: mindhárom dokumentumprofil,
  validáció, duplicate PNG-export, változatlan master, overwrite-blokk,
  ground-contact kapu, geometry sidecar és mindkét passport-ág ellenőrizve;
- a létrejött hostbizonyítékok kizárólag a
  `tools/photoshop/readi-asset-prep-jsx/acceptance-output/` tesztmappába kerültek;
  runtime- és production assetintegráció nem történt.
