# Readi World — Photoshop master template contract

Frissítve: 2026-08-02  
Állapot: `SPECIFIED`  
Cél: minden új assetcsalád ugyanabból az érthető, scriptelhető PSD-szerkezetből induljon.

## Kötelező csoportok

```text
00_GUIDES_DO_NOT_EXPORT
  CANVAS_SAFE_AREA
  PIVOT_GUIDES
  SCALE_REFERENCE
10_ART
  BASE
  DETAIL
  MANUAL_FIXES
20_OPTIONAL
  VARIANTS
  STATE_OVERLAYS
90_REVIEW_DO_NOT_EXPORT
  LIGHT_BACKGROUND
  DARK_BACKGROUND
  CHROMA_BACKGROUND
  SILHOUETTE
```

A family profile szűkítheti vagy bővítheti a `10_ART` és `20_OPTIONAL` tartalmát,
de a négy felső szintű csoport nevét nem változtathatja meg.

## Layer Comps

Ha az assetnek több állapota van, a következő névséma használható:

```text
STATE__standing
STATE__damaged
STATE__depleted
REVIEW__light
REVIEW__dark
REVIEW__silhouette
```

Nem minden assethez kell minden állapot. A family spec mondja meg a kötelező
state-eket; hiányzó állapotot nem szabad üres réteggel színlelni.

## Pivot és export

- a pivot guide látható szerkesztési segítség;
- az exact érték a family profile és geometry sidecar adata;
- review helper nem kerülhet normalized exportba;
- a master soha nem írható felül új revision nélkül;
- a pine `r001` master az első működő referencia, nem univerzális vizuális sablon.

## Template létrehozási sorrend

1. Codex elkészíti a family profile-t és a pontos fájl-/rétegneveket.
2. A scaffold előre létrehozza a célmappákat.
3. Photoshopban a Readi Action felépíti vagy ellenőrzi a szerkezetet.
4. A grafikus csak a `10_ART` és engedélyezett `20_OPTIONAL` tartalmat módosítja.
5. A postflight igazolja, hogy review helper nem szivárgott az exportba.

