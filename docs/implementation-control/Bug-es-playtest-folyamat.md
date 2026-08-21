# Readi World — bug- és playtest-folyamat

Frissítve: 2026-08-01

## Cél

A hibát, a hiányzó funkciót, a designváltoztatást és a személyes ötletet külön
kezeli. Így egy playtest-megjegyzés nem változtatja meg észrevétlenül a
scope-ot vagy a kanonikus döntést.

## Bejelentéstípusok

| Típus | Példa | Kezelés |
|---|---|---|
| `BUG` | A karakter átmegy a házon vagy duplán kap jutalmat. | Reprodukció, súlyosság, javítócsomag. |
| `UX-FINDING` | A játékos nem érti, mit jelent az `1/3`. | Feladatteszt és UX-döntés; nem feltétlen kódhiba. |
| `DESIGN-GAP` | A floating joystick döntése nincs implementálva. | Mátrixeltérés; tervezett külön csomag. |
| `CONTENT-GAP` | A forest még nem érződik erdőnek. | Content/map/art backlog. |
| `PERFORMANCE` | Tartós 30 FPS alá esik vagy melegszik. | Mérési protokoll és profiler evidence. |
| `CHANGE-REQUEST` | Másképp szeretnénk a menü felépítését. | Döntésnapló + hatásmátrix az implementáció előtt. |
| `IDEA` | Később legyen hajós kereskedő. | Távlati backlog; nem kerül aktív milestone-ba. |

## Súlyosság

| Szint | Definíció | Release-hatás |
|---|---|---|
| `BLOCKER` | Nem indul, adatvesztés, betölthetetlen mentés vagy progression blocker. | Minden merge/release blokkolva. |
| `CRITICAL` | Duplikáció, súlyos state-hiba, gyakori crash vagy nincs biztonságos folytatás. | Érintett release blokkolva. |
| `MAJOR` | Fontos gameplay/UX funkció hibás, de kerülőút lehet. | P1 acceptance előtt kötelező javítani. |
| `MINOR` | Korlátozott vizuális, szöveges vagy kényelmi hiba. | Ütemezhető. |
| `POLISH` | Érzet-, animáció-, hang- vagy vizuális finomítás. | Prioritás és budget alapján. |

## Bugrekord kötelező mezői

| Mező | Tartalom |
|---|---|
| Bug ID | `BUG-###` |
| Cím | Rövid, eredményt leíró mondat |
| Build | Commit SHA és Pages URL/verzió |
| Környezet | Eszköz, OS, Safari/Home Screen, orientáció |
| Előfeltétel | Save állapot, scene, inventory, progression |
| Lépések | Minimális reprodukció |
| Elvárt | Mit kellett volna történnie |
| Tényleges | Mi történt |
| Gyakoriság | mindig / gyakori / ritka / egyszeri |
| Súlyosság | blocker–polish |
| Bizonyíték | screenshot, videó, log, save fixture |
| Érintett döntés/rendszer | Auditpont és mátrixsor |
| Regresszió | Korábban működött-e, melyik SHA-n |
| Állapot | new / confirmed / ready / fixed / verified / deferred |

## Triage-folyamat

1. A visszajelzés típusának meghatározása.
2. Build és környezet rögzítése.
3. Reprodukció ugyanazon, majd tiszta mentésen.
4. Súlyosság és érintett rendszer meghatározása.
5. Korábbi döntés ellenőrzése.
6. `BUG` esetén minimális javítócsomag; `CHANGE-REQUEST` esetén előbb
   hatásmátrix és döntés.
7. Automatizált regressziós teszt hozzáadása, ha technikailag ésszerű.
8. Eredeti eszközön visszaellenőrzés.
9. Bizonyítékjegyzék és mátrix frissítése.

## Playtest-szintek

| Szint | Résztvevő | Cél |
|---|---|---|
| `PT-0` | fejlesztői smoke | Indul, mozgás, save, loop alapjai. |
| `PT-1` | projekt tulajdonosa iPhone-on | Érzet, vizuális irány, jobbkezes input, világosság. |
| `PT-2` | új, nem instruált játékos | Megérti-e a célt, navigációt és feedbacket. |
| `PT-3` | több külső tesztelő | Ismétlődő UX-problémák és eszközkülönbségek. |
| `PT-4` | release-candidate regression | Teljes acceptance és ismert hibák újratesztje. |

## Moderált playtest-protokoll

- A tesztelő először magyarázat nélkül indul.
- Nem mondjuk meg, hova menjen vagy mire nyomjon.
- Hangosan elmondhatja, mit gondol, de nem javítjuk ki azonnal.
- Rögzítjük az első cél felismerésének idejét, elakadást, félrenyomást,
  joystickfogást, félreértett ikont és a restauráció megértését.
- A végén kérdezünk, nem közben vezetjük.
- Egyetlen résztvevő véleménye finding; ismétlődő minta vagy súlyos blokk kap
  prioritást.

## P1 alapfeladatok

1. Indíts új játékot segítség nélkül.
2. Értsd meg az első célt.
3. Találd meg a forest irányát.
4. Gyűjtsd össze a szükséges alapanyagot.
5. Ismerd fel, hol és mit lehet craftolni.
6. Restauráld a Forester Hutot.
7. Mondd el, mi változott a világban és mi a következő lehetőség.
8. Zárd be/hátterezd a játékot, majd folytasd adatvesztés nélkül.

## Manuális adatkezelés

A 251C érvényessége alatt a playtestjegyzet helyi és kézi. Nincs rejtett
analitika vagy automatikus hibajelentés. Külső résztvevő személyes adatát csak
külön jóváhagyott policy szerint szabad rögzíteni.
