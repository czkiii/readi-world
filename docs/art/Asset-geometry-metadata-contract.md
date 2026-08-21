# Readi World — asset geometry metadata és pivotlánc

Frissítve: 2026-08-02  
Állapot: `DONE` — `PIVOT-OWN-001A`
Kapcsolat: D4, D6, D7, D8, manifest geometry schema v2

## 1. A legfontosabb állítás

**A gameplay-pivot nem képpixel és nem Photoshop-native játékszabvány.**

A PSD tárolhat látható guide-ot, pathot vagy helper layert, de a runtime ezekből
nem olvas. A transparent PNG/WebP pedig önmagában nem tartalmazza, hogy melyik
pixel a fa törzsének world-space talppontja.

## 2. A kanonikus pivotlánc

| Réteg | Mit tárol? | Autoritás |
|---|---|---|
| D8 family profile | célcanvas, target pixelpivot, normalized pivot, WU draw size | tervezési igazságforrás |
| PSD helper | guide/layer/path ugyanazon pixelpontra | művészi vizuális segéd, nem önálló igazságforrás |
| geometry sidecar JSON | actual normalized export pontos canvas- és geometriaadata | production export igazságforrás |
| asset passport | sidecar/master/export hash és jóváhagyás | provenance/QA igazságforrás |
| runtime manifest v2 | normalized pivot + world-local geometry | runtime aktiválási igazságforrás |

Ha eltérés van, az export nem aktiválható. A guide nem írhatja felül csendben a
family profile-t vagy sidecart.

## 3. Koordináták és képletek

### Source/normalized kép

- pixel origin: bal felső sarok;
- `+x`: jobbra;
- `+y`: lefelé;
- pixelpivot lehet egész vagy szükség esetén tört szám;
- normalized pivot komponense `0..1`.

```text
normalizedX = pivotPixelX / canvasWidthPx
normalizedY = pivotPixelY / canvasHeightPx

pivotPixelX = normalizedX × canvasWidthPx
pivotPixelY = normalizedY × canvasHeightPx
```

### Runtime world-local geometria

- origin: a pivot;
- egység: WU;
- `+x`: kelet/jobbra;
- `+y`: dél/lefelé;
- footprint, interaction és occluder nem source pixelben tárolódik.

## 4. Geometry sidecar v1

Ajánlott fájlnév:

```text
<asset-id-kebab>__geometry-rNNN.json
```

Példa a D8 standing pine profile-ra:

```json
{
  "schemaVersion": 1,
  "assetId": "world.tree.pine.harvestable.standard",
  "masterRevision": "r001",
  "sourceDensityPxPerWU": 64,
  "canvasPx": { "width": 384, "height": 448 },
  "pivotPx": { "x": 192, "y": 416 },
  "pivotNormalized": { "x": 0.5, "y": 0.9285714286 },
  "drawSizeWU": { "width": 6, "height": 7 },
  "logicalFootprint": {
    "type": "circle",
    "center": { "x": 0, "y": 0 },
    "radius": 0.575
  },
  "interactionAnchor": {
    "type": "radius",
    "point": { "x": 0, "y": 0 },
    "radius": 1.45
  },
  "occluderShape": {
    "type": "polygon",
    "points": [
      { "x": -0.8, "y": -5.8 },
      { "x": 0.8, "y": -5.8 },
      { "x": 2.2, "y": -3.8 },
      { "x": 2.0, "y": -1.2 },
      { "x": 0.8, "y": -0.6 },
      { "x": -0.8, "y": -0.6 },
      { "x": -2.0, "y": -1.2 },
      { "x": -2.2, "y": -3.8 }
    ]
  }
}
```

A fenti occluder csak D8 pine kezdőprofil. A production master elkészülte után
authored overlayben finomítandó, majd ugyanazon revision sidecarjában és
manifestjében azonos pontlistával rögzítendő.

## 5. Mit csinál majd a Photoshop-panel?

1. betölti a family profile target canvas/pivot értékét;
2. guide-ot, ground line-t és helper layert készít;
3. az artworköt nem mozgatja automatikusan megerősítés nélkül;
4. validálja, hogy a ground contact a target pivotra került;
5. export-duplicate-on készíti a normalized PNG-t;
6. kiírja a geometry sidecart;
7. ellenőrzi a pixel- és normalized pivot képlet egyezését;
8. passport draftba átadja az értékeket és hasheket.

Photoshop-dokumentummetaadat vagy XMP később kényelmi tükör lehet, ha a választott
UXP API-val megbízhatóan bizonyítható. Nem lehet egyetlen igazságforrás.

## 6. Mit tud és mit nem tud a prompt?

### Tudja kérni

- a teljes ground-contact terület látszódjon;
- ne legyen levágva a törzs/láb/alap;
- legyen elegendő tiszta padding;
- az objektum hozzávetőleg kívánt helyen álljon;
- state-ek ugyanazt a ground contactot tartsák vizuálisan.

### Nem tudja bizonyítani

- exact `(192,416)` pixelpivot;
- exact normalized pivot;
- exact WU footprint;
- collision, interaction vagy occluder metaadat;
- alpha-fringe és exportcanvas technikai helyességét.

Ezért a prompt output mindig `INBOX`. A pontos pivotot a D6 normalizálás zárja.

## 7. D8 pine példa

| Output | Canvas | Target pivot px | Normalized pivot |
|---|---:|---:|---:|
| standing | `384×448` | `(192,416)` | `(0.5,0.928571)` |
| stump | `128×96` | `(64,80)` | `(0.5,0.833333)` |
| shadow | `128×64` | `(64,48)` | `(0.5,0.75)` |

Az álló és stump külön canvas/pixelpivotot használhat, miközben ugyanarra a
world-local `(0,0)` ground pointra kerül. Ez a lényeg: a pixelkoordinátájuk nem
azonos, a világbeli pivotjuk igen.

## 8. Tulajdonosi tisztázási kapu

`PIVOT-OWN-001` — A pivot nem képre sütött jel és nem kizárólag Photoshop-
metaadat. A D8 family profile adja a célt, a PSD guide segít, a geometry sidecar
és passport rögzíti az exportot, a manifest v2 pedig a runtime értéket. A prompt
csak ground-contact/padding szándékot kér, exact pivotot nem bizonyít.

Elfogadott döntés: **`PIVOT-OWN-001A`**, 2026-08-02.
