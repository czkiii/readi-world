# ADR-0003 — Központi World State és parancs–esemény–tranzakció modell

- Státusz: `ACCEPTED`
- Dátum: 2026-07-30
- Döntéstulajdonos: `TECH`
- Kapcsolt auditpontok: 75–87, 293–298
- Bizonyíték: PR #2, `3ac8874`, World State tesztek

## Kontextus

A tartós, fejlődő világ sok rendszere ugyanazokat az objektumokat, inventoryt,
jutalmakat és progressionállapotot érinti. Közös igazságforrás nélkül rejtett
duplikáció, részleges művelet és mentési eltérés keletkezne.

## Megfontolt lehetőségek

1. Rendszerenként saját, közvetlenül módosított state.
2. Események nélküli közös mutable objektum.
3. Verziózott központi World State, validált parancsokkal, atomi
   tranzakciókkal és eredményeseményekkel.

## Döntés

A World State az igazságforrás. A rendszerek validált parancsokon és
tranzakciókon keresztül változtatják; az eredmény eseményként válik láthatóvá.
A determinisztikus sorrend, stabil ID és idempotencia kötelező.

## Következmények

- Save, rollback és tesztelés egységes alapot kap.
- A gameplayrendszerek nem írhatnak közvetlenül tartós mezőket.
- Az egyszerű funkcióhoz is explicit kontraktus szükséges.
- A UI megjelenítési tanács, nem állapot-igazságforrás.

## Felülvizsgálati trigger

Csak bizonyított skálázási vagy konzisztenciaprobléma; helyi kényelmi igény
nem indokolhat közvetlen state-mutációt.
