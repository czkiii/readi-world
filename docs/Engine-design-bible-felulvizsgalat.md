# Readi World — Engine & Design Bible v0.3 felülvizsgálata

Felülvizsgálat dátuma: 2026-07-30  
Vizsgált történeti forrás: `docs/history/Engine-design-bible.txt`  
Irányadó forrás: `docs/Dokumentumaudit.txt`

## Cél

Annak ellenőrzése, hogy a történeti Engine & Design Bible v0.3 mely
állításai maradtak érvényesek, melyeket írta felül a dokumentumaudit, és
melyek igényelnek későbbi tulajdonosi döntést vagy mérést.

A történeti Bible nem párhuzamos igazságforrás. Az új Engine &
Architecture Bible később kizárólag a lezárt kanonikus auditból vezethető
le.

## Tételes eredmény

| Bible-rész | Státusz | Audit szerinti értelmezés |
|---|---|---|
| Core Promise | Megtartva | A tartósan emlékező, láthatóan fejlődő, visszatérésre hívó világ továbbra is a projekt alapígérete. |
| Purpose / governing source of truth | Felülírva | A történeti Bible már nem irányadó. Elsőbbsége a kanonikus dokumentumauditnak van. |
| Current GitHub files as implementation baseline | Felülírva | A régi GitHub runtime referencia-prototípus. A repository és a Pages cím újrahasználható, de az új runtime tisztán épül újra. |
| New conversation contract | Megtartva | Egyetlen cél, módosítható és védett fájlok, elfogadási feltételek és regressziós ellenőrzés minden munkacsomag előtt kötelező. |
| Platform decision | Megtartva, pontosítva | HTML/CSS/JavaScript és Canvas alap, GitHub Pages webapp/PWA proof, iPhone 16 Pro Safari és Home Screen tesztútvonal. Capacitor és Android későbbi külön proof. |
| Stable `index.html` runtime shell | Felülírva | A régi monolitikus `index.html` nem megőrzendő alap. Az új `index.html` vékony bootstrap shell. |
| Manifest, registry, validator és role resolver | Megtartva követelményszinten | Az assetaktiválást manifest és registry vezérli; a konkrét osztálynevek és belső implementációk nem önmagukban kanonikusak. |
| Stage Generator | Megtartva későbbi rendszerként | Determinisztikus, szabályvezérelt világadatot készíthet, de csak akkor és olyan sorrendben, ahogyan a vertical slice függősége igazolja. |
| Core services felsorolása | Részben megtartva | A szolgáltatási felelősségek relevánsak, de nem minden felsorolt szolgáltatás P0-követelmény, és a végleges modulhatárokat a kanonikus kontraktusok szabják meg. |
| Browser does not scan folders | Megtartva | Asset csak manifest- és registry-bejegyzésen keresztül aktiválható. |
| Atlas contract | Megtartva, pontosítva | Méret, forrásterület, pivot, draw size, alpha, szerep/tag és releváns collision-metaadat deklarált. A 1536×1024 / 3×2 profil csak történeti példa, nem univerzális szabály. |
| Role-based content | Megtartva | A stage szerepet és taget kér; pontos sprite ID csak egyedi landmarkhoz vagy egzakt animációs állapothoz használható. |
| Persistent village és activity scenes | Megtartva | A fő falu tartós világ, a képernyő kamerakivágás; a további régiók és activityk scope-ja külön döntésekhez kötött. |
| Portrait-first HUD és contextual prompt | Megtartva | Mobil-first portré mód, nincs permanens ACT gomb, egyetlen stabil kontextuális prompt. |
| Floating joystick pontos érzete | Későbbi mérés | A joystick létjogosultsága megmaradt, de sugara, érzékenysége és működési érzete a 110. mérési pont része. |
| Automatic proximity harvesting | Későbbi prototípus | Csak ott alkalmazható, ahol az interakciós és hibamegelőzési tesztek igazolják; nem általános kötelező alapértelmezés. |
| Four-hour real-time world day | Későbbi mérés | A négyórás ciklus csak ajánlott kiinduló érték; a 204. pont szerint sessionteszt előtt nem végleges. |
| Versioned save, backup és migration | Megtartva | A mentés verziózott, validálható, migrálható, visszaállítható és mobil életciklus-biztos. |
| Categorized inventory | Megtartva elvi szinten | A definíció és instance state különül el; a konkrét inventory-UX és kapacitás további audit- és tesztpontokhoz kötött. |
| Optional combat | P3 / tulajdonosi döntés | Nem P0- vagy P1-követelmény. A 213. pont szerint a harci scope külön későbbi jóváhagyásig nyitott. |
| Art direction | Megtartva | Meleg, cozy, kézzel festett/storybook irány, tiszta sziluettek, enyhén döntött top-down nézet és puha árnyékok. |
| Asset pipeline | Megtartva | Egyszerre egy assetcsalád, pontos specifikáció, normalizálás, validáció, valós telefonos teszt és jóváhagyás vagy visszaállítás. |
| Workflow rule | Megtartva | Architektúra-refaktor, artcsere és save-schema változás külön munkacsomag. Verziótörténet Gitben, nem fájlnévben. |
| M0–M8 current priority | Felülírva | A régi Asset Loader-first sorrendet a 284–285. döntés váltotta fel: Git-baseline, clean bootstrap és kontraktusok, World State, Save Manager, asset/role alap, majd egyetlen end-to-end loop. |
| Stable project paths | Felülírva részben | A régi elérési utak referenciaállapotot írnak le. Az új vékony `index.html`, manifest és moduláris struktúra külön clean runtime-ban készül; régi fájl nem másolható át automatikusan. |
| Foundation statement | Megtartva elvi szinten | Adatvezérelt, validált és determinisztikus bővíthetőség marad a cél, de a régi működő rendszerek megőrzése nem előzi meg a clean-runtime döntést. |

## P0-ra gyakorolt következmény

A felülvizsgálat nem talált új, eddig hiányzó P0-blokkoló szerződést.

A P0 előtt már lezárt:

- GitHub Pages webapp/PWA és iPhone 16 Pro proof-útvonal;
- vertical slice scope és kizárt rendszerek;
- P0–P3 mérföldkőhatárok;
- clean-runtime és implementációs sorrend;
- Git-, scope- és rollback-szerződés;
- World State, mentés, assetaktiválás, validáció és determinisztikus
  működés technikai alapelvei.

Nem blokkolja a P0-t, ezért deferred marad:

- joystick pontos érzete és paraméterei — 110;
- négyórás világciklus végleges értéke — 204;
- opcionális harc identitása és scope-ja — 213;
- távoli P2/P3 tartalmi és marketingdöntések.

## Következtetés

Az Engine & Design Bible v0.3 felülvizsgálata megtörtént. A dokumentumból
nem kell külön régi architektúrát átvenni. A clean runtime a kanonikus
auditból indulhat, feltéve hogy a 298. implementációindítási kapu tényleges
Git-baseline és P0-start állapot alapján sikeresen lezárható.
