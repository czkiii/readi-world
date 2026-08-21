# ADR-0005 — Manifest/registry és role/tag assetfeloldás

- Státusz: `ACCEPTED`
- Dátum: 2026-07-30
- Döntéstulajdonos: `TECH+ART`
- Kapcsolt auditpontok: 88–100, 225, 234–239, 255
- Bizonyíték: PR #4, `85c2b83`, asset registry tesztek

## Kontextus

A böngésző nem szkennel mappát, az assetek nagy számban cserélődnek, és a
gameplaynek nem szabad konkrét fájlnevekre épülnie. A production artot
placeholderről kódátírás nélkül kell cserélni.

## Megfontolt lehetőségek

1. Fájlutak közvetlen hardkódolása a stage-ben.
2. Könyvtárnév-konvencióra épülő automatikus betöltés.
3. Verziózott manifest és registry, szemantikus role/tag kéréssel,
   deklarált variant/fallback lánccal.

## Döntés

Csak manifestben aktivált és registryben validált asset használható. A
gameplay alapból role-t és taget kér. Exact Sprite ID authored landmarkhoz
vagy pontos animációs állapothoz használható.

## Következmények

- Assetcsere nem igényel gameplay-refaktort.
- Minden production assethez metaadat és passport szükséges.
- Hiányzó asset a logikai state elvesztése nélkül fallbackelhető.
- Egy assetcsalád integrációja külön reportot és regressziót kap.

## Felülvizsgálati trigger

A kiválasztott renderer/atlaszrendszer csak akkor indokol új ADR-t, ha a
logikai manifest/registry szerződést bizonyítottan nem tudja megtartani.

## 2026-08-02 kiegészítés — geometry schema v2

A D4–D8 szerződések feltárták, hogy a v1 `hitShape` mező nem különítette el a
logical footprintet, interaction anchort és occluder shape-et, a pivot
koordinátaterét pedig nem validálta. A manifest schema v2 ezért:

- `pivot` értékét normalized source-rect `0..1` koordinátaként rögzíti;
- `drawSize` értékét world-unit canvasméretként rögzíti;
- külön kötelező `logicalFootprint`, `interactionAnchor` és `occluderShape`
  mezőt használ world-local WU-ban;
- explicit `none` értéket követel a nem interaktív vagy nem takaró assetnél;
- nem migrál v1 assetet csendes alpha-alapú vagy null defaulttal.

Production asset még nem létezett a váltáskor, ezért save- vagy contentmigráció
nem szükséges. A role/tag/fallback registry contract változatlan.
