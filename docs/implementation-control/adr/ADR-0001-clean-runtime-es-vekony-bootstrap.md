# ADR-0001 — Clean runtime és vékony bootstrap

- Státusz: `ACCEPTED`
- Dátum: 2026-07-30
- Döntéstulajdonos: `OWNER+TECH`
- Kapcsolt auditpontok: 2–4, 284–287
- Bizonyíték: PR #1, `cd967b0`, `p0-start`

## Kontextus

A történeti prototype működött, de monolitikus és elavult alap volt. Az új,
összetettebb projekt döntéseit nem lehetett biztonságosan ráépíteni anélkül,
hogy a régi hibák és rejtett függőségek átkerüljenek.

## Megfontolt lehetőségek

1. A prototype fokozatos továbbfoltozása.
2. A prototype automatikus átemelése modulokba.
3. Külön clean runtime, a prototype kizárólag viselkedési referenciaként.

## Döntés

Külön clean runtime készül. Az `index.html` vékony bootstrap shell; a játék-
és rendszerlogika modulokban él. A prototype-ból sem kód, sem asset nem kerül
át automatikusan.

## Következmények

- Az architektúra nem örökli a régi monolit korlátait.
- A hasznos prototype-viselkedéseket külön újra kell értékelni és megírni.
- A látható haladás eleinte lassabbnak tűnhetett, mert az alapok készültek.
- A történeti commit és RAR backup biztosítja a visszaállíthatóságot.

## Felülvizsgálati trigger

Csak akkor nyitható újra, ha a clean runtime bizonyítottan nem tudja teljesíteni
a P1 szerződéseit; egy hiányzó prototype-funkció önmagában nem trigger.
