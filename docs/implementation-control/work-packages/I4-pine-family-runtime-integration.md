# I4 — pine family runtime-integráció

Frissítve: 2026-08-02  
Állapot: `DONE / MERGED / DEPLOYED` — PR #10, `864b74b`

## Scope contract

1. Egyetlen cél: a jóváhagyott standard harvestable pine standing, matching
   stump és contact shadow manifestvezérelt runtime-integrációja és látható
   pályaproofja.
2. Módosítható: `runtime/assets/environment/pine/`, asset manifest,
   asset image loader/render helper, minimális loop kizárólagos renderútja,
   tesztek, README és I4 evidence/report.
3. Védett: World State, Save Manager, crafting, restoration, input és joystick.
4. Acceptance: 3/3 kontrollált role feloldódik, 3/3 kép betöltődik, pivot és
   drawSize szerint rajzolódik, standing/stump/shadow látható, hibás kép esetén
   a code-drawn fallback megőrzi a futást, teljes regresszió zöld.
5. Regresszió: mentés és gameplay state változatlan; 116.71 KiB family budget;
   asset/manifest teszt, syntax, helyi böngészős vizuális proof és runtime diff.

## Rollback

- branch baseline: `main` az I4 ág megnyitásakor;
- a három runtime WebP törölhető, a manifest visszaállítható az üres baseline-ra;
- a kanonikus PSD/normalized/backup források az `art-source/` alatt változatlanok.

## Scope-védelem

Az I2 floating joystick korrekció ebben a csomagban nem módosítható. Az I4
lezárása után külön inputcsomagként következhet, így a képi és inputregresszió
külön mérhető marad.

## Megvalósítási eredmény

- 3 lossless WebP bekerült az `assets/environment/pine/` mappába;
- a schema v2 manifest 3 stabil Asset ID-t, 3 kontrollált role-t, tageket,
  pivotot, drawSize-t, footprintet, interaction anchort és occludert aktivál;
- a külön image loader minden role-t szemantikusan old fel és hibánként izolált
  code-drawn fallbacket tart fenn;
- a minimális loop a manifest drawSize/pivot alapján, 32 runtime px/WU skálán
  rajzol; a y-alapú két réteg helyes karakter–fa takarást ad;
- 18 standing pine és 2 stump alkot erdőkeretet, közülük több az induló portré
  kamerában látható anélkül, hogy a fő ösvényt vagy az ágakat lezárná.

## Bizonyíték

| Kapu | Eredmény |
|---|---|
| Automatizált teszt | `53/53 PASS` |
| JavaScript syntax | `PASS` |
| Manifest role resolution | `3/3 PASS` |
| Runtime asset HTTP | `3/3 HTTP 200` |
| iPhone 16 Pro CSS viewport | `402×874`, vizuális proof `PASS` |
| Böngészőkonzol | 0 warning, 0 error |
| Runtime family file budget | 116.71 KiB, `PASS` |
| World State/save/gameplay/input diff | `UNCHANGED` |

## Hátralévő külső kapu

Commit, draft PR, CI, GitHub Pages deployment és fizikai iPhone Safari/Home
Screen smoke még nem történt meg; ezek nem tekinthetők automatikusan
engedélyezett merge-nek.
