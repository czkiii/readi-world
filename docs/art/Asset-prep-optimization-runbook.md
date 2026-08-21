# Readi World — Asset Prep Optimization v1

Frissítve: 2026-08-02  
Állapot: `OPERATIONAL`  
Elsődleges cél: a heti keret és az emberi idő védelme reprodukálható asset-előkészítéssel.

## Kötelező olcsó útvonal

```text
path scaffold → preflight → ReadiWorldScript Action → helyi normalizálás → postflight → legfeljebb 1 vizuális review
```

Production futás közben a `File > Scripts > Browse...` útvonal tilos. Az egyszer
beállított `ReadiWorldScript` Action a stabil `tools/photoshop/ReadiWorldScript.jsx`
dispatchert hívja; a dispatcher tölti be az aktuális fő JSX-et.

## Heti keretbudget

- legfeljebb 3 GUI-képernyőkép egy assetfutásban: indulás, valódi döntési pont, végső vizuális QA;
- ugyanaz a teljes pipeline legfeljebb egyszer ismételhető;
- első hiba után csak izolált proof futhat, teljes újrafuttatás nem;
- méretet, alphát, pivotot, hash-t és JSON-t fájlellenőrzés bizonyít, nem screenshot;
- Photoshop csak művészi/master feladatot végez; a bizonyítottan hibás PS2020 release-alpha útvonalat nem próbáljuk újra.

Gépi policy: `art-source/_registry/asset-prep-policy.json`.
Photoshop munkagyorsítás és shortcut-szabályok:
`docs/art/Photoshop-speed-playbook.md`.
Ember–Codex munkamegosztás és a tíz gyorsítás státusza:
`docs/art/Asset-prep-delegation-map.md`.
Az egyszeri helyi Photoshop-beállítás rövid lapja:
`docs/art/Photoshop-one-time-setup-card.md`.
Gépi workflow-profil:
`art-source/_registry/photoshop-workflow-profile.json`.
Egységes PSD-réteg-, state-, review- és pivot-sablonszerződés:
`docs/art/Photoshop-master-template-contract.md`.
Egyparancsos QA-lap, stílusjelzés, resume session és közös control packet:
`tools/art-pipeline/asset-prep-control-packet.ps1`, használata:
`docs/art/Asset-prep-control-packet.md`.

## Előre létrehozott mappák és útvonaltérkép

Minden assetrevision kap egy kanonikus path-plan JSON-t az
`art-source/_registry/path-plans/` alatt. Photoshop előtt egyszer fut:

```powershell
./tools/art-pipeline/asset-prep-scaffold.ps1 -PathPlan '<path-plan.json>'
```

Ez idempotensen létrehozza az inbox, brief, master, normalized, review és archive
mappákat, majd abszolút útvonalakkal `PATH-MAP.json` fájlt ment az adott inbox-run
mellé. A terv nem mutathat a `runtime/` vagy az `art-source/` területén kívülre.
Photoshop-mentésnél és automatizálásnál ez a térkép az útvonal igazságforrása;
nem kell új mappát létrehozni vagy elérési utat találgatni.

## Indítás

```powershell
./tools/art-pipeline/asset-prep-check.ps1 -Mode Preflight -SourcePath '<source>'
```

Ez elmenti a forráshash-t és a runtime Git-állapotát. Ezután egyetlen
Action/gyorsbillentyű nyitja meg a Photoshop eszközt.

```powershell
./tools/art-pipeline/asset-prep-check.ps1 -Mode Postflight `
  -SourcePath '<source>' -NormalizedPath '<normalized.png>' `
  -GeometryPath '<geometry.json>' -PassportPath '<passport.json>' `
  -ExpectedWidth 384 -ExpectedHeight 448 `
  -ExpectedPivotX 192 -ExpectedPivotY 416 `
  -ExpectedAssetId 'world.tree.pine.harvestable.standard'
```

`PASS` nélkül nincs kész státusz. A postflight blokkol üres alphánál, hibás
méretnél/pivotnál, hibás JSON-nál vagy megváltozott runtime-állapotnál.

## Photoshop 2020 alpha-szerződés

- PSD-master: kompatibilis bináris alpha megengedett;
- normalized/release PNG: tiszta lágy-alpha forrás helyi veszteségmentes normalizálása;
- Photoshop-vágólapos pixelátadás tilos;
- eltolás mindig explicit `UnitValue(..., "px")`;
- kanonikus célmappát nem a natív mappaválasztóban gépelünk be.

## Megállási szabály

Első hiba után: hibakatalógus → legkisebb izolált proof → javítás bizonyítása →
legfeljebb egy új teljes futás. Nincs „próbáljuk meg még egyszer” diagnózis nélkül.

## Védett határ

Az Asset Prep nem írhat a `runtime/` alá, nem aktiválhat manifestet és nem állíthat
`INTEGRATED` státuszt. Runtime-integráció külön munkacsomag.
