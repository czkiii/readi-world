# ADR-0002 — GitHub Pages webapp/PWA-first proof

- Státusz: `ACCEPTED`
- Dátum: 2026-07-30
- Döntéstulajdonos: `OWNER+TECH`
- Kapcsolt auditpontok: 6, 263–266, 277
- Bizonyíték: aktív GitHub Pages URL, PR #1–#8

## Kontextus

A projekt tulajdonosának fizikai referenciaeszköze iPhone 16 Pro; Android
tesztkészülék nincs. A proofnak gyorsan elérhetőnek és valós telefonon
ellenőrizhetőnek kell lennie.

## Megfontolt lehetőségek

1. Android-first natív build.
2. Azonnali Capacitor iOS-csomagolás.
3. GitHub Pages-en futó webapp/PWA, későbbi natív proofhatárral.

## Döntés

P0/P1 első proofja GitHub Pages webapp/PWA. Elsődleges útvonal iPhone 16 Pro
Safari és Home Screen. Capacitor iOS és Android külön, későbbi proof.

## Következmények

- Gyors, linkkel elérhető iteráció.
- Safari lifecycle, cache, safe area és PWA-korlátok elsőrendűek.
- A közös játékmag nem függhet böngészőspecifikus UI-trükktől.
- Android-támogatás fizikai bizonyíték nélkül nem állítható.

## Felülvizsgálati trigger

Natív képesség válik P1/P2 blokkolóvá, vagy a webes útvonal bizonyítottan nem
teljesíti a teljesítmény-, lifecycle- vagy store-célt.
