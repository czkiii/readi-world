# Readi World — D6 asset technical specification

Frissítve: 2026-08-02  
Állapot: `DONE` — `D6-OWN-001A`, `PIVOT-OWN-001A`

## 1. Szín és alfa

- working és normalized színtér: `sRGB IEC61966-2.1`;
- normalized raster: 8 bit/channel RGBA PNG, beágyazott vagy egyértelmű sRGB;
- runtime alapértelmezett alpha: `straight`, a manifest deklarációjával egyezően;
- áttetsző szél RGB-je a látható perem színéből legyen extrudálva, ne fekete/fehér
  matte-ból;
- teljesen átlátszó zaj és generálási maradvány eltávolítandó;
- runtime premultiplied alpha csak külön renderer-proof és manifestérték mellett;
- HDR, CMYK és Display-P3 masterből normalizáláskor dokumentált sRGB conversion kell.

## 2. Méret és felbontás

- a geometriai igazságforrás D4 szerint WU, nem device pixel;
- production raster kezdő sűrűsége `64 source px/WU`;
- canvas a draw boundsot és a D8 paddinget követi, nem önkényes négyzet;
- pivot/footprint/interaction/occluder metaadat, nem alpha-boundsból becslés;
- exportot normal, minimum és maximum D4 zoomon kell ellenőrizni;
- kezdetben egy kanonikus runtime rendition/asset készül; további 0.5×/2× vagy
  DPR-változat csak méréssel, nem automatikus tartalmi szorzóként;
- maximális egyedi dimension és családbudget D8-ban zárul; `4096 px` feletti
  egyedi oldalhossz külön technikai felülvizsgálatot igényel.

### Pivotkonverzió

- a family profile target pixelpivotot ad a normalized canvasra;
- Photoshop guide ezt láthatóvá teszi, de nem az egyetlen adatforrás;
- exportkor `pivotNormalized = pivotPx / canvasPx` mindkét tengelyen;
- a geometry sidecar mindkét alakot tárolja és ellenőrzi;
- runtime manifest csak a normalized pivotot és world-local WU geometriát kapja;
- eltérő canvasú state-ek pixelpivotja eltérhet, world-local originjük azonos;
- promptból vagy alpha boundsból exact pivot nem fogadható el.

## 3. Fájlformátumprofilok

| Profil | Normalized | Runtime első jelölt | Szabály |
|---|---|---|---|
| transparent world sprite | PNG RGBA | lossless WebP | PNG csak edge/artifact vagy tool-kompatibilitási indokkal |
| opaque ground/large backdrop | PNG RGB/RGBA | lossy WebP, kezdő `quality 88` | screenshot diff és seam proof kötelező |
| UI panel/ikon | PNG RGBA | lossless WebP vagy PNG | kis méretű él- és kontrasztproof dönt |
| atlasz | PNG normalized frames | lossless WebP/PNG atlasz | frame meta külön, gameplay nem ismeri a csomagolást |
| emissive/mask | PNG gray/RGBA | lossless WebP/PNG | külön role, nem belefestett state |

A `quality 88`, WebP és atlaszméret kezdeti exportprofil, nem örök technológiai
döntés. Vizuális vagy iPhone-mérés indokoltan felülírhatja új exportrevisionnal.

## 4. Atlaszszabály

- nem atlaszolunk automatikusan minden assetet;
- atlasz csak azonos package/család, együtt töltődő és hasonló samplinget igénylő
  elemekből készül;
- landmark, nagy épület és ground külön maradhat, ha atlasz pazarló;
- kezdeti atlasz maximum `2048×2048`; nagyobb csak memória/device proof után;
- frame-ek között legalább `2 px` extrusion és `4 px` biztonsági padding;
- forgatott frame alapból tiltott, hogy pivot és kézi debug egyértelmű maradjon;
- trim csak akkor engedett, ha az eredeti source size, frame rect és pivot meta
  megőrzi az azonos animációs ground contactot;
- mip/zoom edge-bleed proof kötelező;
- atlasz átrendezése nem változtathat logikai Asset ID-t.

## 5. UI 9-slice

- skálázható panelen bitmap szöveg, szám és ikon nincs;
- a négy corner fix; edge csak saját tengelyén nyúlik; center kitölthető;
- inset, content-safe rect és minimum draw size passportmező;
- 100%, 125%, 150% text scale és iPhone safe-area screenshot szükséges;
- 1 px varrat, elmosódott corner vagy torz border technikai fail.

## 6. Seamless ground

- négy irányban valódi periodikus illeszkedés;
- 3×3 ismétlés natív méreten, normal/min/max zoomon;
- center, edge és corner varratvizsgálat;
- érték-, hue- és részleteloszlásban sem lehet ismétlődő „bélyeg”;
- variation patch külön asset/role, nem a seamless állítás bizonyítéka;
- generátor „seamless” címkéje proof nélkül nem acceptance.

## 7. Decoded textúramemória

Kezdő becslés atlasz vagy kép esetén:

```text
decoded bytes = width × height × 4
decoded MiB = decoded bytes / 1,048,576
```

A tömörített WebP fájlméret nem egyenlő a GPU/dekódolt textúramemóriával.
Minden report összesíti az egyedi exportokat, atlasz kihasználtságot és az aktív
jelenet becsült decoded memóriahatását. Projekt proof-budget: `128 MB` aktív
textúra; P1 belső cél kezdetben `80–90 MB`.

## 8. Kötelező automatikus vagy reprodukálható ellenőrzések

- fájl létezik, megnyitható és hash-elhető;
- width/height/channel/color profile megfelel;
- alpha edge és üres padding szabályos;
- fájlnév, stable ID, passport és manifest egyezik;
- pivot, drawSize, footprint és source rect megadott;
- WebP/PNG vizuális diff elfogadott;
- atlasz overlap/out-of-bounds nincs;
- 9-slice vagy 3×3 proof, ha releváns;
- becsült decoded memória és file size reportolt;
- iPhone Safari decode/render smoke az első family integrációjánál.

## 9. Runtime aktiválás

Csak `OWNER_APPROVED` és `TECH_QA_PASSED` export kerülhet külön I4 csomagban a
`runtime/assets/` megfelelő package-ébe. A böngésző nem szkennel mappát: az új
fájl csak manifest/registry bejegyzéssel, valid role/tag/fallback és sikeres
teszttel aktív.
