# Readi World — projektmunkatér

Ez a repository a Readi World közös projektmunkatere: a jelenlegi clean runtime, a kanonikus dokumentáció, az art/asset előkészítés, a fejlesztői eszközök és a referenciaanyagok egy helyen kezelhetők.

A korábbi monolitikus prototípus referencia marad; nem kötelező technikai alapja a jelenlegi clean runtime-nak.

## Fő projektterületek

- `index.html`, `src/`, `data/`, `assets/`, `tests/` — az aktív clean runtime a repository gyökerében.
- `RUNTIME_README.md` — a clean runtime aktuális technikai összefoglalója.
- `docs/` — kanonikus tervezési, audit-, implementációs és art dokumentáció.
- `art-source/` — forrás- és munkapéldányok az asset pipeline számára.
- `tools/` — projekt- és assetelőkészítő eszközök, köztük Photoshop workflow-k.
- `reference/` — történeti prototípusok és összehasonlító referenciaanyagok.
- `PROJECT_CONTEXT.md` — rövid folytatási állapot és technikai kontextus.
- `AGENTS.md` — agent/Codex munkaszabályok.

## Aktív dokumentumok

- [`docs/Dokumentumaudit.txt`](docs/Dokumentumaudit.txt) — az egyetlen kanonikus auditfájl; mindig ezt frissítjük.
- [`docs/Audit-terkep.txt`](docs/Audit-terkep.txt) — az audit témáinak és sorrendjének térképe.
- [`docs/Gameplay-bible.txt`](docs/Gameplay-bible.txt) — gameplay- és progression-forrás.
- [`docs/Fajl-es-kep-protokoll.txt`](docs/Fajl-es-kep-protokoll.txt) — biztonságos fájl- és assetmunkafolyamat.
- [`docs/Engine-design-bible-felulvizsgalat.md`](docs/Engine-design-bible-felulvizsgalat.md) — a történeti Engine & Design Bible tételes audit-összevetése.
- [`docs/implementation-control/Readi_World_Mobile_Progress_Mode.md`](docs/implementation-control/Readi_World_Mobile_Progress_Mode.md) — laptop nélküli, production-safe placeholder munkamód.

## Történeti dokumentumok

- [`docs/history/Engine-design-bible.txt`](docs/history/Engine-design-bible.txt) — korábbi technikai elképzelések; nem irányadó.
- [`docs/history/Beszelgetesindito.txt`](docs/history/Beszelgetesindito.txt) — elavult beszélgetésindító; nem irányadó.

Ezeket csak előzményként őrizzük.

## Referenciaanyagok

- `reference/prototype/` — a korábbi prototípus kibontott runtime-munkapéldánya.
- `reference/prototype.zip` — az érintetlen eredeti archívum.
- `reference/candidate/index.html` — később kapott HTML-jelölt összehasonlításhoz; nem aktív runtime és önmagában nem teljes projekt.

## Clean runtime

A clean runtime közvetlenül a repository gyökerében marad, így a GitHub Pages és a meglévő runtime fájlútvonalak nem változnak. A technikai runtime-leírás a [`RUNTIME_README.md`](RUNTIME_README.md) fájlban található.

A projektmunkatér és a runtime Git verziózása mostantól ugyanabban a repositoryban történik; külön helyi `runtime/.git` repositoryt nem kell projektforrásként kezelni.

## Stabil fájlnevek

Az aktív dokumentumok nevében nincs szükség folyamatos `final`, `v2`, `v3` jelölésekre. A dokumentumok belső fejléce jelzi az aktuális állapotot, a változástörténetet pedig Git kezeli.

Nagyobb implementáció továbbra is csak a szükséges audit- és architektúraszerződések lezárása után indul, és egyszerre egy jól körülhatárolt rendszer- vagy assetcsalád-változás legyen aktív.
