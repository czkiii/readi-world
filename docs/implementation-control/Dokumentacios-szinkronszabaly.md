# Readi World — dokumentációs szinkronszabály

Frissítve: 2026-08-01

## Alapelv

Egy beszélgetésben megszületett döntés addig nem tartós projektmemória, amíg
nem került visszakereshető fájlba. A chat fontos forrás, de nem lehet az
egyetlen igazságforrás.

## Döntési szinkronfolyamat

1. **Felismerés:** meg kell jelölni, hogy ötlet, kérdés, pontosítás,
   mérési visszajelzés vagy explicit döntés hangzott el.
2. **Forrásellenőrzés:** keresni kell, van-e már kanonikus auditpont. Ha igen,
   nem szabad új döntésként újratervezni.
3. **Eltéréskezelés:** ellentmondásnál a régi döntés marad érvényben, az új
   felvetés `REOPEN-PROPOSAL`, amíg explicit felülírás nem történik.
4. **Kanonikus rögzítés:** új vagy felülíró döntés a dokumentumprioritás
   szerinti igazságforrásba kerül.
5. **Traceability:** frissül az auditpont-lefedettségi jegyzék és a fő
   implementációs mátrix.
6. **Változásnapló:** pontosítás, mérés, újranyitás vagy felülírás bekerül a
   döntésváltozási naplóba.
7. **Munkacsomag:** csak ezután nyílhat implementáció, külön scope- és
   hatásmátrixszal.
8. **Bizonyíték:** merge vagy dokumentumelfogadás után bekerül a konkrét
   commit, teszt, screenshot, asset report vagy device proof.

## Mondatok értelmezése

| Példa | Besorolás | Automatikus hatás |
|---|---|---|
| „Lehet mégis engedni kéne…” | `REOPEN-PROPOSAL` | Nincs döntésváltozás |
| „Ezt elfogadom.” | `DECISION`, ha az opció egyértelmű | Kanonikus rögzítés szükséges |
| „Ezt már megbeszéltük.” | `SOURCE-RECONCILIATION` | Forráskeresés; nem újratervezés |
| „Telefonon túl gyors.” | `MEASUREMENT-FEEDBACK` | Hangolási csomag nyitható, ha scope engedi |
| „Legyen jobb oldalon.” | `OWNER-DECISION` | Audit + mátrix frissítendő |
| „Tetszik ez a kép.” | `ART-REFERENCE` | Reference indexbe kerül; nem automatikus teljes átvétel |

## Referenciaképek szinkronja

Minden tartós art reference kapjon:

- reference ID-t;
- eredeti fájlt vagy ellenőrzött helyet;
- dátumot és eredetet;
- „mit tartunk meg” listát;
- „mit nem veszünk át” listát;
- kapcsolt HUD-, map-, karakter- vagy assetcsaládot;
- tulajdonosi jóváhagyási státuszt.

Példa: a kedvelt portré village-HUD képből megmaradhat a vizuális nyelv,
információs hierarchia és cozy kompozíció, de nem vehető át a bal oldali fix
joystick vagy a permanens ACT/axe gomb.

## Frissítési felelősség

- Tulajdonosi döntés: a projekt tulajdonosa hagyja jóvá.
- Technikai leképezés és bizonyíték: az implementáló rögzíti.
- Art reference és vizuális acceptance: tulajdonosi jóváhagyás szükséges.
- Mérési pont: előre rögzített protokoll és tényleges eredmény szükséges.
- Policy: külön jóváhagyott dokumentum nélkül nem implementálható.

## Kész állapot

A szinkron csak akkor kész, ha a döntés forrása, státusza, implementációs
kapcsolata és következő lépése egy új beszélgetésben is visszakereshető a
projektfájlokból.
