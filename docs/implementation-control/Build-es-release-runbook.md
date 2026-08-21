# Readi World — build- és release-runbook

Frissítve: 2026-08-01  
Aktív cél: `czkiii/readi-world` → GitHub Pages

## Cél

Minden deployment azonosítható, ellenőrzött és visszaállítható legyen. A
„nálam működik” nem release-bizonyíték.

## Release-típusok

| Típus | Cél | Kötelező kapu |
|---|---|---|
| `DOCS` | Csak helyi projekt-dokumentáció. | Link- és teljességi ellenőrzés; runtime nem változik. |
| `INTERNAL-PROOF` | Egy technikai rendszer vagy assetcsalád Pages proofja. | Tesztek, draft PR, smoke, rollbackpont. |
| `P1-CANDIDATE` | Teljes belső vertical slice. | 277.4, iPhone E2E, leltárak, no blocker. |
| `P2-EXTERNAL` | Külső tesztelőnek átadható webes demo. | P1 + playtestjavítások + policy- és release-review. |
| `HOTFIX` | Egy reprodukált blocker/critical hiba. | Minimális scope, regresszió, előző release referenciája. |

## 1. Előkészítés

1. Egyetlen csomagcél és ID.
2. Baseline SHA rögzítése.
3. Módosítható/védett fájlok, acceptance és regresszió rögzítése.
4. Kapcsolt auditpontok és ADR-ek ellenőrzése.
5. Hatásmátrix kitöltése.
6. `BLOCKED` vagy kezeletlen `CRITICAL` kockázat esetén nincs implementáció.
7. Külön branch; a `main` nem közvetlen munkaterület.

## 2. Helyi ellenőrzés

Runtime-kódnál minimum:

```text
npm run check
npm test
```

Ezen felül az érintett csomaghoz:

- célzott unit/integration/loop teszt;
- mentés- és migrációs ellenőrzés, ha state érintett;
- viewport/input smoke, ha player-facing;
- asset report és vizuális összehasonlítás, ha asset érintett;
- nincs váratlan fájl vagy más rendszer változása;
- a working tree diffje megfelel az előre rögzített scope-nak.

## 3. Commit és draft PR

1. Csak a csomaghoz tartozó fájlok kerülnek commitba.
2. A commitüzenet eredményt ír le.
3. Branch push után draft PR készül.
4. A PR tartalmazza:
   - célt és out-of-scope listát;
   - kapcsolt auditpontot/ADR-t;
   - hatásmátrixot;
   - teszteredményt;
   - mobil/visual evidence-et, ha szükséges;
   - migration és rollback tervet;
   - ismert korlátozásokat.
5. Sikertelen check mellett nincs merge.

## 4. Review és merge-kapu

- A diff scope-ját össze kell vetni a munkacsomag-szerződéssel.
- Save-, asset-, content- és architektúraváltozás nem rejtőzhet egy másik
  csomagban.
- Draftból csak teljes acceptance után lehet ready.
- A merge külön külső állapotváltoztatás; a projekt aktuális jóváhagyási
  szabálya szerint történik.
- A merge SHA bekerül a bizonyítékjegyzékbe.

## 5. Pages deployment és smoke

1. Azonosítani kell a merge SHA-t és a deployment run eredményét.
2. Cache-bypass verzióparaméterrel ellenőrizni kell az élő oldalt.
3. Ellenőrizni kell a runtime/manifest és érintett modul HTTP-elérését.
4. Meg kell erősíteni, hogy a buildmarker az új SHA/verzió.
5. Kötelező smoke:
   - oldal betölt;
   - új játék vagy meglévő mentés folytatható;
   - mozgás/input működik;
   - érintett új rendszer működik;
   - save és reload nem veszít adatot;
   - nincs konzolban blocker hiba;
   - cache-elt régi kliens kezelése biztonságos.

## 6. Release-bizonyíték

Rögzítendő:

- release/build ID;
- merge SHA;
- Pages URL;
- deployment run;
- tesztösszesítés;
- tesztelt eszköz és mód;
- screenshot vagy videó player-facing változásnál;
- ismert hibák;
- rollback SHA;
- mátrix és backlog státuszfrissítése.

## 7. Rollback

Rollback szükséges, ha:

- save corruption vagy progression blocker jelentkezik;
- indulás vagy betöltés tömegesen hibás;
- tartós 30 FPS alatti állapot vagy memória-reload jelenik meg;
- kritikus input/HUD blokk van;
- hibás cache/schema miatt régi kliens veszélyesen írhat állapotot.

Eljárás:

1. új merge/deployment megállítása;
2. pontos hibás és utolsó jó SHA rögzítése;
3. visszaállító commit vagy bizonyított előző release deploymentje;
4. élő smoke;
5. save-visszaállíthatóság ellenőrzése;
6. `BLOCKER/CRITICAL` bugrekord és incidentjegyzet;
7. javítás külön branchben, nem közvetlenül az élő mainen.

## 8. Hotfix-szabály

Hotfix csak a reprodukált hibát javíthatja. Nem tartalmazhat refaktort,
artcserét, új funkciót vagy schema-bővítést, hacsak maga a biztonságos javítás
nem követeli meg és ezt külön jóvá nem hagyták.

## Első hiányzó végrehajtási proof

A runbook dokumentációként kész. A következő runtime PR-nél végig kell
futtatni, és `RELEASE-PROOF-001` bizonyítékként rögzíteni kell az eltéréseket.
