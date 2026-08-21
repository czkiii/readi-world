# Readi Asset Prep — Photoshop UXP MVP

Állapot: `IMPLEMENTED / AUTOMATED-VERIFIED / HOST-PROOF-MISSING`  
Munkacsomag: `ART-TOOL-01A`  
Plugin verzió: `0.1.0`

## Mire való?

A panel a Readi World family profile alapján előkészíti és ellenőrzi a raster
asset dokumentumot. Canvas-, pivot-, layer-, export- és metadatafeladatokat
automatizál, de nem hoz művészi döntést, nem ír a runtime-ba és nem integrál
assetet.

Az első bundled tooling-fixture a D8 pine standing/stump/shadow family. A profil
`ownerReviewRequired: true`, tehát használata nem jelenti a D8 elfogadását.

## Követelmény

- Adobe Photoshop **24.0 vagy újabb**;
- Adobe UXP Developer Tool;
- fejlesztői betöltéshez ez a pluginmappa és benne a `manifest.json`.

A manifest v5 elméleti minimuma Photoshop 23.3, de a plugin 24.0-t kér, mert az
Adobe guide API 24.0-ban kapott fontos koordinátajavítást. A jelenlegi helyi
Photoshop 2020 `21.1`, ezért azon a plugin nem tölthető be.

Hivatalos Adobe hivatkozások:

- https://developer.adobe.com/photoshop/uxp/2021/devtool/plugin-management/
- https://developer.adobe.com/photoshop/uxp/2022/guides/uxp-guide/uxp-misc/manifest-v5/
- https://developer.adobe.com/photoshop/uxp/2022/ps-reference/classes/guides/
- https://developer.adobe.com/photoshop/uxp/2022/ps-reference/media/executeasmodal/

## Fejlesztői betöltés

1. Telepítsd és indítsd el a Photoshop 24+ verziót.
2. Telepítsd és indítsd el az Adobe UXP Developer Toolt.
3. Válaszd az **Add Plugin** lehetőséget.
4. Tallózd be ennek a mappának a `manifest.json` fájlját.
5. Nyomd meg a **Load** gombot.
6. Photoshopban nyisd meg: **Plugins → Readi Asset Prep**.

A Developer Toolból a **Reload** frissíti a kódot, a **Debug** megnyitja a plugin
konzolját.

## Biztonságos használat

1. Válassz output profilt: standing, stump vagy shadow.
2. Használj új dokumentumot, vagy nyiss meg külön mentett masterrevisiont.
3. Futtasd a `Validate Active Document` ellenőrzést.
4. A color/canvas műveleteket csak a megerősítő ablak után alkalmazd.
5. Igazítsd kézzel a valódi ground contactot a pivot guide-ra.
6. Export előtt ismét validálj.
7. Válassz explicit output mappát.
8. Írd ki a geometry sidecart és passport draftot.

A panel létező outputfájlt nem ír felül. Ismételt exporthoz új revisiont vagy
másik üres célmappát kell választani.

## MVP funkciók

- bundled family profile betöltés és outputválasztás;
- exact canvas, pivot, WU és decoded memory kijelzés;
- aktív dokumentum canvas/RGB/8-bit/sRGB/layer validáció;
- új transparent profildokumentum;
- artworköt nem skálázó canvas resize;
- standard layer groupok;
- pivot, ground line és safe-padding guide-ok;
- temporary duplicate-on normalized és review PNG export;
- overwrite-blokkolás;
- geometry sidecar v1;
- passport draft, minden QA- és integrációs mező `PENDING/NOT_INTEGRATED`.

## Nem része az MVP-nek

- runtime candidate/WebP vagy manifestaktiválás;
- SHA-256 CLI bridge;
- 3×3 seamless, 9-slice, zoom/state sheet és alpha-fringe QA;
- Illustrator adapter;
- production asset létrehozása.

## Automatizált ellenőrzés

PowerShellből ebben a mappában:

```powershell
npm test
npm run check
```

A tesztek host nélkül ellenőrzik a profile-, pivot-, geometry-, memory-,
fájlnév-, passport- és document-validation contractot. Nem bizonyítják a
Photoshop DOM tényleges működését.

## Eltávolítás

1. UXP Developer Toolban válaszd a plugin melletti menüt.
2. Előbb **Unload**, majd **Remove**.
3. Ha nincs szükség a forrásra, ez a teljes pluginmappa törölhető.

Az eltávolítás nem érinti a runtime-ot vagy a Photoshop mastereket. A már
explicit módon exportált PNG/JSON fájlokat külön kell archiválni vagy törölni.

## Kötelező host acceptance

A részletes lépések: [MANUAL-ACCEPTANCE.md](MANUAL-ACCEPTANCE.md).
