# Readi World — Architecture Decision Records

Frissítve: 2026-08-01

## Cél

Az audit azt mondja meg, milyen játék- és rendszerelv érvényes. Az ADR azt
rögzíti, hogyan és miért valósítjuk meg technikailag, milyen alternatívákat
vetettünk el, és milyen következményt vállalunk.

Az ADR nem írhatja felül a kanonikus auditot. Ha technikai lehetőség ütközik
vele, az ADR `BLOCKED`, és előbb döntés-reconciliation szükséges.

## Státuszok

- `PROPOSED`: megfontolható, implementációs felhatalmazás nélkül.
- `ACCEPTED`: jóváhagyott technikai irány.
- `EXPERIMENTAL`: idő- vagy scope-korlátos proof.
- `SUPERSEDED`: új ADR felülírta; történetként megmarad.
- `REJECTED`: megvizsgált, de nem választott irány.
- `DEPRECATED`: még létezhet, de új fejlesztés nem épülhet rá.

## Index

| ADR | Cím | Státusz | Kapcsolt döntés |
|---|---|---|---|
| [ADR-0001](ADR-0001-clean-runtime-es-vekony-bootstrap.md) | Clean runtime és vékony bootstrap | `ACCEPTED` | 2–4, 284–287 |
| [ADR-0002](ADR-0002-webapp-pwa-first-proof.md) | GitHub Pages webapp/PWA-first proof | `ACCEPTED` | 6, 263–266, 277 |
| [ADR-0003](ADR-0003-world-state-command-event-transaction.md) | Központi World State és parancs–esemény–tranzakció modell | `ACCEPTED` | 75–87, 293–298 |
| [ADR-0004](ADR-0004-local-first-versioned-save-manager.md) | Local-first, verziózott Save Manager és adapterhatár | `ACCEPTED` | 40–45, 220, 226, 261, 293 |
| [ADR-0005](ADR-0005-manifest-registry-role-resolution.md) | Manifest/registry és role/tag assetfeloldás | `ACCEPTED` | 88–100, 225, 234–239, 255 |
| [ADR-0006](ADR-0006-hybrid-data-driven-world-layout.md) | Hibrid, adatvezérelt world layout map editor nélkül P1-ben | `PROPOSED` | 8–11, 115–116, 276–277 |

## Új ADR folyamata

1. Ellenőrizni kell a kanonikus auditot és a meglévő ADR-eket.
2. Stabil, növekvő `ADR-####` azonosítót kell választani.
3. Az [ADR-template](ADR-template.md) minden kötelező mezőjét ki kell tölteni.
4. A rekord `PROPOSED` státuszban születik.
5. Hatásmátrix és szükség esetén spike/proof készül.
6. Csak explicit technikai/tulajdonosi jóváhagyás után lesz `ACCEPTED`.
7. Felülíráskor a régi ADR megmarad és az új rekordra mutat.

## Mikor kell ADR?

ADR szükséges, ha a választás:

- több rendszert vagy milestone-t érint;
- később drága lenne visszafordítani;
- save-, content- vagy assetformátumot rögzít;
- renderer-, map-, animáció-, build- vagy cache-stratégiát választ;
- jelentős teljesítmény-, biztonsági vagy platformtradeoffot vállal.

Nem kell ADR egy helyi bugfixhez, CSS-eltoláshoz, szövegjavításhoz vagy olyan
értékhangoláshoz, amelyet már mérési pont kezel.
