# Readi World — folytatási kontextus

Frissítve: 2026-07-30

## Rövid projektkép

A Readi World mobil-first, HTML/CSS/JavaScript és Canvas alapú, később Capacitorral iOS/Android alkalmazássá csomagolható cozy játék. A játékos egy elhagyott világot és falut állít helyre gyűjtéssel, craftinggal, farminggal, épület-restaurációval, felfedezéssel és látható világváltozással.

A fő élmény:

- nyugodt, alacsony nyomású játék;
- rövid mobilos sessionök, de hosszabb játékra is alkalmas;
- „még öt perc” érzés összekapcsolt célokból, nem FOMO-ból;
- kevés kötelező történet és párbeszéd;
- több egyenértékű fejlődési út;
- tartós, látható, személyes világfejlődés.

## Mi történt eddig?

1. Készült egy működő, monolitikusabb webes prototípus.
2. Asset-, registry- és integrációs problémák miatt világossá vált, hogy a grafika és a játékrendszer túl szorosan kapcsolódik.
3. Elkészült a Gameplay & Progression Bible v0.1.
4. A projekt kinőtte az Engine & Design Bible v0.3 kereteit.
5. Elindult egy részletes dokumentumaudit, amely a nagyobb játék szerződéseit kódolás előtt lezárja.
6. Az audit 1–105. pontja, a 72.5 szabály, a 106–299. tartomány
   jóváhagyott 75 pontos technikai csomagja, a 263. platformdöntés és a
   265–266. iPhone/webapp proof-szerződés, a 277. első vertical slice és
   a 284–285. P0–P3 végrehajtási sorrend és a 287. Git/rollback-szerződés
   lezárt; a következő sorrendi nyitott pont a 107.

## Legfontosabb lezárt irányváltás

A jelenlegi kód nem az új játék kötelező alapja, hanem referencia-prototípus. Külön clean runtime készül majd. A régi rendszerből csak egyenként ellenőrzött, bizonyított részek vehetők át.

Ezért jelenleg tilos:

- a teljes új játékot a régi `index.html`-ba tovább építeni;
- a referencia-prototípust vakon lemásolni clean runtime néven;
- a dokumentumaudit lezárása előtt nagy, több rendszert érintő implementációba kezdeni;
- több atlaszt, registryt, runtime-kódot és gameplay-rendszert egyszerre lecserélni.

## Workspace-térkép

- `docs/Dokumentumaudit.txt`: az egyetlen, stabil nevű kanonikus auditnyilvántartás.
- `docs/Audit-terkep.txt`: statikus, 40 fejezetes audit-scope és sorrendtérkép.
- `docs/Audit-tervezet.txt`: külön, nem kanonikus 106–299. auditjavaslat;
  194 ponttal, 776 C-ajánlással, lefedettségi indexszel, tulajdonosi
  döntési sorral, mérési kapukkal és konfliktuslistával. Egyik pontja sem
  Locked Decision pusztán attól, hogy ebben a fájlban szerepel.
- `docs/Gameplay-bible.txt`: részletes gameplay-forrás, az audit felülírásainak figyelembevételével.
- `docs/Fajl-es-kep-protokoll.txt`: munkafolyamatként hasznos, de clean-runtime szempontból frissítendő.
- `reference/prototype.zip`: érintetlen, teljes referencia-archívum.
- `reference/prototype/`: a ZIP-ből kibontott, vizsgálható runtime-referencia; a hozzá nem tartozó történeti dokumentumok nélkül.
- `reference/candidate/index.html`: külön feltöltött, újabb HTML-változat; összehasonlítási jelölt, nem automatikusan az aktív jövőbeli runtime.
- `docs/history/Engine-design-bible.txt`: történeti, részben elavult referenciaanyag.
- `docs/Engine-design-bible-felulvizsgalat.md`: a történeti Bible teljes
  tételes összevetése; nem talált új P0-blokkoló szerződést.
- `docs/history/Beszelgetesindito.txt`: történeti, elavult referenciaanyag.

## A referencia-prototípus jelenlegi technikai képe

A kibontott projekt tartalmaz:

- PWA `manifest.json`;
- vékonynek még nem nevezhető `index.html` runtime-ot;
- `src/engine/runtime-foundation.js` alapot;
- manifestvezérelt assetbetöltést;
- sprite registryt;
- village, forest, building, resource és localization adatokat;
- épület-, forest-, ground-, tool- és effect atlaszokat;
- alap mozgást, kamerát, HUD-ot, időt és localStorage-mentést.

Ez hasznos referencia, de nem bizonyítja, hogy a kód megfelel az 1–105. auditdöntésnek.

### Ellenőrzött referenciaállapot

- A hét `reference/prototype/data/*.json` fájl 2026-07-29-én sikeresen parse-olható volt.
- A `reference/prototype/src/engine/runtime-foundation.js` JavaScript-szintaxisellenőrzése sikeres volt.
- A kibontott prototípus helyi webszerverről betölt, és öt atlaszt érzékel.
- A render loop jelenleg hibázik: `ReferenceError: x is not defined` a kibontott `reference/prototype/index.html` `drawGround`/render útvonalán. A 253–255. sor körül egy régi, kontextuson kívül maradt tree-drawing kódrész hivatkozik a nem létező `t`, `x` és `y` változókra.
- A `reference/candidate/index.html` nem azonos a ZIP-ben lévő változattal, és nagyobb/újabb kódrészleteket tartalmaz. Jelenleg nem önállóan futó runtime, mert a relatív függőségei a referencia-prototípusban találhatók. Nem szabad automatikusan felülírni vele a referencia-prototípust; előbb külön baseline-döntés és összehasonlítás szükséges.
- A workspace jelenleg nem tartalmaz Git repository-metaadatot. Verziókezelési művelet előtt tisztázni kell a valódi repositoryt vagy új Git-történet indítását.

## Az audit által már lefektetett technikai gerinc

- dokumentumhierarchia és hatáskörök;
- clean runtime és referencia-prototípus viszonya;
- thin bootstrap shell;
- platform és Canvas-irány;
- világ-, régió- és jelenetstruktúra;
- központi World State;
- parancs-, esemény- és tranzakciós modell;
- determinisztikus rendszerfrissítés;
- stabil objektum- és jelenetazonosítók;
- verziózott mentés, migráció, backup és recovery;
- háttér- és offline szimuláció;
- komponensalapú objektumok és state machine-ek;
- collision, shape, ownership és object lifecycle;
- egységes játékos/NPC Interaction Request és Interaction Plan;
- reservation, commit, rollback és idempotens eredményfeldolgozás;
- kontextuális célpontválasztás, visszajelzés és hozzáférhetőség.

## Legutóbb lezárt döntés: 105

Téma: interakciós célpont eltűnése, érvénytelenedése és egyidejű használata.

- `105.1C`: meghatározott fázisokban célpont-újravalidálás, definícióvezérelt folytatás, szünet, megszakítás vagy véglegesítés.
- `105.2C`: stabil Object ID és életciklus-esemény; érvénytelen runtime-hivatkozás nem maradhat aktív.
- `105.3C`: determinisztikus reservation/foglalás, várólista, újratervezés vagy játékosbarát elutasítás.
- `105.4C`: megszakított kérés nem éled újra automatikusan; menthető folytatáshoz érvényes folytatási azonosító kell.

Státusz: Locked Decision.

Következő sorrendi nyitott döntés: 107.

### Elkészült auditfolytatás

A `docs/Audit-tervezet.txt` 106–299. között végigvezeti a
`docs/Audit-terkep.txt` hátralévő 9–40. fejezetét. Összesen 194
számozott bejegyzést és 776 C-sort tartalmaz:

- 88 kanonizált döntés: 75 technikai alapdöntés, 8 implementációs kapupont
  és 5 további felhasználói döntés;
- 69 nyitott tulajdonosi döntést igénylő pont;
- 35 nyitott prototípust vagy mérést igénylő pont;
- 0 nyitott konfliktus- vagy hiánypont;
- 2 kanonikusan már lefedett, nem új döntés.

A fájl végén a 75 pontos elfogadott technikai csomag pontos listája, az
eredeti tulajdonosi és mérési döntési csomagok, valamint a 2 már lefedett
kereszthivatkozás szerepel.
A fennmaradó nyitott pontok továbbra is review-alapok; a 75 elfogadott pont
kanonikus szövege a `docs/Dokumentumaudit.txt` fájlban található.

## Korábbi beszélgetésekből származó munkapreferenciák

- Egy változtatási körben egyetlen rendszer vagy assetcsalád.
- Mindig legyen ismert baseline és visszaállítási pont.
- Letölthető/kész fájl kérésekor tényleges fájl készüljön, ne csak kódblokk.
- A nem érintett fájlok és funkciók maradjanak változatlanok.
- Kép/atlasz esetén pontos méret, cellatérkép, transzparencia, pivot, validáció és játékbeli teszt kell.
- A dizájn ne igényeljen állandó engine-kódmódosítást; manifest, registry, role/tag és adatvezérelt stage-szabály kezelje.
- A játék világa legyen nagyobb és szellősebb, mint a korábbi mockupok sugallták.
- Külön érdemes vizualizálni a kezdeti, üresebb falut és a teljesen kiépített endgame állapotot.

## Következő felelős lépés

Alapértelmezés szerint még ne kódoljunk tovább. A 75 pontos technikai csomag
elfogadása és kanonizálása, a 263. GitHub Pages webapp/PWA-first
platformdöntés, a 265–266. iPhone 16 Pro mérési szerződés és a 277. első
vertical slice, valamint a 284–285. mérföldkő- és implementációs sorrend
és a 287. repository/rollback-szerződés lezárása megtörtént. A meglévő
`czkiii/readi-world` repository és Pages cím lesz az új clean runtime
aktív célja; a régi kód nem technikai alap, a `5b79fb0...` commit és a
felhasználó RAR-backupja visszaállítási pont. A következő lépés a
298. indítási kapu lezárása után a draft PR külön merge-döntése, majd az
első P0 kontraktus-munkacsomag. A 298. kapu 2026-07-30-án lezárult.

### Tényleges Git-baseline

- Helyi klón: `runtime/`.
- Védett referencia-commit: `5b79fb0b735ad2b04713437df59820290c066713`.
- Távoli referencia-tag: `prototype-reference-2026-07-20`.
- Clean-runtime branch: `agent/clean-runtime-p0-start`.
- Clean P0 commit: `20f9900ec348fa564a5f7948d612fb40e1e8735b`.
- Clean baseline tag: `p0-start`.
- Merge-elt PR: `https://github.com/czkiii/readi-world/pull/1`.
- Deployolt `main` commit:
  `cd967b0bed5b4b6121af1146d4367bc4a563d9e9`.
- A GitHub Pages deployment sikeres; az élő webapp már a clean P0
  baseline-t szolgálja ki.
