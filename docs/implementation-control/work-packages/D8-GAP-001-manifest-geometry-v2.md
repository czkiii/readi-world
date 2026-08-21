# D8-GAP-001 — asset manifest geometry v2 munkacsomag

Frissítve: 2026-08-02  
Állapot: `DONE / MERGED` — PR #9, `177d542`

## Egyetlen cél

A runtime asset manifest külön, kötelező és validált mezőben tárolja a
normalized source pivotot, world-unit draw size-t, logical footprintet,
interaction anchort és occluder shape-et, hogy a D4/D6/D8 geometria ne képi
alphából vagy Photoshop-guide-ból legyen kikövetkeztetve.

## Módosítható fájlok

- `runtime/src/core/assets/asset-manifest.js`;
- `runtime/data/assets-manifest.json`;
- `runtime/data/README.md`;
- `runtime/tests/asset-registry.test.js`;
- `docs/implementation-control/adr/ADR-0005-manifest-registry-role-resolution.md`;
- a gap és evidence státuszát tartalmazó kontrollfájlok.

## Védett fájlok

- World State és Save Manager;
- gameplay/minimal-loop;
- renderer és kamera;
- minden assetkép és `art-source/` tartalom;
- D8 family identity, méret és prompt, amely továbbra is owner review alatt áll;
- Photoshop UXP implementáció, amely külön `ART-TOOL-01A` csomag.

## Kontraktus

- manifest schema `1 → 2`; v1 nem aktiválható csendes defaultokkal;
- `sourceRect`: source pixel koordináta;
- `pivot`: `0..1` normalized source-rect koordináta;
- `drawSize`: a teljes source canvas world-unit mérete;
- `logicalFootprint` és `occluderShape`: world-local WU, origin a pivot, `+x`
  jobbra/kelet, `+y` lefelé/dél;
- `interactionAnchor`: `none` vagy world-local point + pozitív radius;
- a shape `none`, `rect`, `circle` vagy nem degenerált `polygon`;
- egyik mező sem vezethető le automatikusan az alpha boundsból.

## Elfogadási feltételek

- a schema v2 üres manifest valid;
- valid sprite külön footprint/interaction/occluderrel elfogadott;
- hiányzó kötelező geometriai mező fail;
- `0..1` tartományon kívüli pivot fail;
- hibás vagy degenerált polygon fail;
- non-interactive/non-occluding asset explicit `none` értékkel valid;
- registry role/tag/fallback működése változatlan;
- minden runtime teszt és syntax check sikeres.

## Regressziós ellenőrzések

- asset registry determinisztikus resolution és variant/fallback teszt;
- teljes `npm test`;
- teljes `npm run check`;
- `data/assets-manifest.json` schema-marker;
- runtime worktree csak a felsorolt fájlokat módosítja.

## Rollback

A csomag külön Git-branchen készül. Sikertelen acceptance esetén nem merge-elhető;
a main schema v1 változatlan marad. Production asset még nincs, ezért save- vagy
contentmigráció nem szükséges.

## Eredmény

- helyi ág: `feat/manifest-geometry-v2`;
- commit: `c92f0fc` (`feat: add asset geometry manifest v2`);
- squash merge commit: `177d542`;
- teljes runtime teszt: **50/50 sikeres**;
- `npm run check`: sikeres;
- `git diff --check`: sikeres;
- GitHub PR: [#9](https://github.com/czkiii/readi-world/pull/9), squash-merge-elve;
- GitHub Pages smoke: HTTP 200, élő `data/assets-manifest.json` schemaVersion `2`;
- a D8-GAP-001 kapu lezárt; az I4-et már nem ez, hanem a D8 tulajdonosi
  elfogadása és az első production family tényleges elkészülte tartja vissza.
