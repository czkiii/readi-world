# Readi World — munkacsomag-hatásmátrix

Frissítve: 2026-08-01

## Használat

Minden kód-, tartalom-, dokumentációs vagy assetcsomag előtt egy példányt kell
kitölteni. A cél, hogy egy egyszerűnek tűnő változtatás rejtett save-, input-,
performance- vagy artregressziója látható legyen.

## Kötelező scope-szerződés

| Mező | Kitöltendő |
|---|---|
| Csomag ID és cím | — |
| Egyetlen cél | — |
| Baseline commit/dokumentumverzió | — |
| Módosítható fájlok | — |
| Védett fájlok | — |
| Kapcsolt auditpontok | — |
| Döntéstulajdonos | `OWNER / TECHNICAL / ART / MEASUREMENT / POLICY` |
| Elfogadási feltételek | — |
| Regressziós ellenőrzések | — |
| Rollbackpont | — |
| Out-of-scope | — |

## Hatásvizsgálat

Minden sort `NONE`, `READ-ONLY`, `COMPATIBLE`, `MIGRATION`, `RISK` vagy
`BLOCKED` értékkel kell ellátni.

| Hatásterület | Érték | Kötelező magyarázat / bizonyíték |
|---|---|---|
| World State schema | — | Mezők, ID-k, invariánsok |
| Save schema és migráció | — | Régi mentés, backup, rollback |
| Parancs/esemény/tranzakció | — | Commit- és idempotenciaszabály |
| Gameplay és progression | — | Blokkoló, reward, exploitkockázat |
| Inventory/economy | — | Duplikáció, overflow, ár/recipe |
| Input és joystick | — | Touch, pointer, UI exclusion, focus |
| Kamera és collision | — | Világkoordináta, footprint, occlusion |
| HUD/menü/accessibility | — | Safe area, touch target, contrast, Reduced Motion |
| Asset manifest/registry | — | ID, role, tag, fallback, passport |
| Aktív textúramemória | — | Fájlméret, drawSize, atlasz, 128 MB budget |
| FPS/energia/indulási idő | — | Normál/stressz mérés |
| Audio | — | Event, loop, budget, fallback |
| Lokalizáció | — | Kulcs, angol source, fallback, text overflow |
| Offline/PWA/cache | — | Versioning, cache invalidation, Home Screen |
| Mobil lifecycle | — | Background, resume, kill, lock |
| Privacy/network | — | Küldött adat, consent, policykapu |
| Jog/licenc/provenance | — | Forrás, prompt, referencia, felhasználási jog |
| Tesztek és bizonyíték | — | Unit, integration, E2E, device, visual |

## Függőségek és blokkolók

| Típus | Elem | Állapot | Következmény |
|---|---|---|---|
| Dokumentumdöntés | — | — | — |
| Másik rendszer | — | — | — |
| Assetcsalád | — | — | — |
| Audio | — | — | — |
| Lokalizáció | — | — | — |
| Eszköz/mérés | — | — | — |
| Policy/jog | — | — | — |

## Lezárási szabály

`RISK` csak dokumentált elfogadással és célzott regresszióval zárható.
`BLOCKED` állapotú hatásterülettel implementáció nem indulhat. A kitöltött
hatásmátrix linkje bekerül a fő implementációs mátrixba és a PR leírásába.
