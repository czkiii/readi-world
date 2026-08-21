# Readi World — Codex munkaszabályok

## Elsődleges irány

A projekt tervezési fázisban van. A dokumentumauditot kell folytatni mindaddig, amíg a következő implementációs mérföldkőhöz szükséges szerződések nincsenek lezárva. Ne kezdj nagyobb kódolásba pusztán azért, mert a referencia-prototípus már fut.

## Dokumentumprioritás

Ellentmondás esetén ez a sorrend érvényes:

1. `docs/Dokumentumaudit.txt`
2. `docs/Audit-terkep.txt`
3. `docs/Gameplay-bible.txt`, kizárólag ahol az audit nem írja felül
4. `docs/Fajl-es-kep-protokoll.txt`, kizárólag a biztonságos munkafolyamatra vonatkozó, még érvényes részei
5. `README.md` és a kibontott `reference/prototype/README.md`, mint a referencia-prototípus tényleges állapotának leírása

Az `docs/Audit-tervezet.txt` külön, nem kanonikus munkadokumentum. A
106–299. pontra készített ajánlásokat, mérési kapukat és tulajdonosi
kérdéseket tartalmazza, de nem része a fenti dokumentumprioritásnak, nem
jelent lezárt döntést, és önmagában nem ad implementációs felhatalmazást.

Az alábbi fájlok történeti források, nem irányadó dokumentumok:

- `docs/history/Engine-design-bible.txt`
- `docs/history/Beszelgetesindito.txt`

Ezek régi állításait — például hogy a jelenlegi `index.html` a megőrzendő végleges runtime shell, vagy hogy az Asset Loader v1 azonnal a következő aktív milestone — az audit felülírta.

## Runtime-szabály

- A kibontott `reference/prototype/` a referencia-prototípus.
- A `reference/prototype.zip` érintetlen archív referencia.
- A `reference/candidate/index.html` egy később kapott összehasonlítási jelölt, nem aktív runtime.
- A referencia-prototípus nem kötelező technikai alap az új játékhoz.
- A jövőbeli active runtime külön clean runtime legyen.
- A referencia-prototípusból semmit ne másolj át automatikusan.
- Minden átvételnél külön vizsgáld meg a működést, az új architektúrához való illeszkedést, az újraírás költségét és a régi hibák átvitelének kockázatát.
- Az új `index.html` vékony bootstrap shell legyen, ne monolitikus játéklogika.

## Munkafolyamat

Módosítás előtt mindig rögzítsd:

1. az egyetlen célt;
2. a módosítható fájlokat;
3. a védett fájlokat;
4. az elfogadási feltételeket;
5. a regressziós ellenőrzéseket.

Egyszerre csak egy rendszert vagy egy assetcsaládot módosíts. Ne kombinálj architektúra-refaktort, mentési változást és grafikacserét egyetlen körben.

## Kódolási alapelvek

- Központi, verziózott World State legyen az igazságforrás.
- A rendszerek validált parancsokkal, tranzakciókkal és eseményekkel kommunikáljanak.
- Az eredmény legyen determinisztikus, a tartós objektumok stabil ID-t használjanak.
- Definíció és instance state különüljön el.
- Összetett objektumok komponensekből és definiált állapotgépekből épüljenek.
- A mentés verziózott, validálható, visszaállítható és migrálható legyen.
- Mobil app-életciklus, háttérbe kerülés és megszakítás elsőrendű követelmény.
- A böngésző nem mappát szkennel: assetaktiválást manifest és registry vezéreljen.
- A stage-logika szerepet és taget kérjen, ne konkrét grafikai fájlt, kivéve az egyedi landmarkokat és pontos animációs állapotokat.

## UX- és artirány

- Mobil-first, elsősorban portré mód.
- Nincs permanens ACT gomb; egyetlen stabil kontextuális prompt legyen.
- A HUD alkalmazkodjon a játékoshoz, legyen hozzáférhető és később testreszabható.
- A kamera és a zoom legyen helyzetfüggő; tereprendezéskor nagyobb, szellős területet kell látni.
- A világ képernyője csak kamerakivágás egy nagyobb, bejárható faluból.
- A fő falu kezdetben jóval üresebb, endgame-ben láthatóan kiépített és személyes.
- Vizuális irány: meleg, cozy, kézzel festett/storybook jelleg, tiszta sziluettek, enyhén döntött top-down nézet, puha árnyékok, neon és kemény pixel-art nélkül.
- A valódi seamless ground tile technikailag négy irányban ismételhető, 3×3 teszttel ellenőrzött asset; az AI „seamless” állítása önmagában nem elfogadási bizonyíték.

## Aktuális auditállapot

- 1–105 és a 72.5 anti-exploit szabály: lezárt.
- A 106–299. tartományból 75, felhasználó által egyben jóváhagyott
  technikai auditpont 2026-07-30-án bekerült a kanonikus auditba.
- A 263. célplatform- és eszközmátrix külön tulajdonosi kapudöntésként
  lezárt: GitHub Pages webapp/PWA-first proof, iPhone 16 Pro Safari és
  Home Screen referenciaútvonal; Capacitor iOS és Android külön későbbi
  proof.
- A 265–266. mobil mérési és proof-build kapu lezárt: iPhone 16 Pro
  készüléken 60 FPS cél és tartós 30 FPS alatti hibakapu, 350 MB
  folyamat- és 128 MB aktív textúrakeret, tíz resume-ciklus és legfeljebb
  10 másodperces kezdeti time-to-action cél.
- A 277. első vertical slice lezárt: 20–30 perces
  village–forest–Forester Hut gathering–crafting–restoration hurok,
  GitHub Pages-en elérhető, iPhone 16 Pro készüléken végigtesztelt
  webapp/PWA proofként.
- A 284–285. kapu lezárt: P0–P3 elfogadási feltételekhez kötött,
  függőségvezérelt sorrend; az első implementációs munkacsomag csak a
  Git-baseline után nyithatja meg a clean runtime-ot.
- A 287. kapu lezárt: a `czkiii/readi-world` repository
  és a `https://czkiii.github.io/readi-world/` Pages cím lesz az új clean
  runtime aktív célja. A `5b79fb0b735ad2b04713437df59820290c066713`
  commit és a felhasználó RAR-backupja visszaállítási pont. A régi kód
  nem implementációs alap és nem másolható át automatikusan.
- A történeti `docs/history/Engine-design-bible.txt` teljes, tételes
  felülvizsgálata 2026-07-30-án elkészült a
  `docs/Engine-design-bible-felulvizsgalat.md` fájlban. Nem maradt új
  P0-blokkoló állítás; a joystickérzet, a négyórás világciklus és az
  opcionális harc továbbra is későbbi mérési vagy tulajdonosi pont.
- A 111. pont lezárt: jobbkezes profilban a joystick jobb oldalon van,
  balkezes tükrözés beállítható; méretét és érzékenységét iPhone 16 Pro
  készüléken kell hangolni.
- A 223. pont lezárt: nincs általános Undo. A 261. pont lezárt: P0/P1-ben
  nincs export/import vagy cloud save, de adapterhatára későbbi
  integrációt enged. A 292. pont lezárt: privacy, jogi és monetizációs
  funkciók előtt külön jóváhagyott dokumentum szükséges.
- A 251. pont lezárt: P0/P1-ben minden játékadat helyben marad; nincs
  analitika, automatikus hibajelentés, reklámkövetés, push értesítés vagy
  más hálózati adatküldés.
- A Git-baseline ténylegesen elkészült a helyi `runtime/` klónban.
  Referencia: `5b79fb0b735ad2b04713437df59820290c066713` és
  `prototype-reference-2026-07-20` tag. Clean baseline:
  `20f9900ec348fa564a5f7948d612fb40e1e8735b` és `p0-start` tag.
  A PR #1 `cd967b0bed5b4b6121af1146d4367bc4a563d9e9` squash commitként
  merge-elve; a GitHub Pages deployment sikeres, az élő oldal már a clean
  baseline-t szolgálja ki.
- A 298. implementációindítási kapu lezárt. A P0 implementáció a 284–285.
  sorrendben megkezdhető, de a draft PR merge-elése továbbra is külön
  külső állapotváltoztatási döntés.
- Következő sorrendi nyitott pont: 107.
- A 105. auditpontban a célpont újravalidálása, stabil Object ID-ja, egyidejű foglalása és explicit folytathatósága C döntései lezárásra kerültek.
- A `docs/Audit-tervezet.txt` a teljes 106–299. javasolt folytatást külön
  fájlban előkészíti: 194 számozott bejegyzés, 776 C-sor, 75 már
  kanonizált technikai döntés, 69 nem P0-blokkoló tulajdonosi, 35 későbbi
  mérési, 0 konfliktusos
  és 2 kanonikusan már korábban lefedett pont.
- A következő felelős lépés az első P0 kontraktus-munkacsomag megnyitása.

## Kommunikáció

A felhasználó magyarul dolgozik. Magyarázz közérthetően, és ne feltételezd, hogy ismeri a Git, buildrendszer vagy architektúra szakszavait. Fájlmódosításkor adj konkrét, ellenőrizhető eredményt, ne csak kódblokkot vagy általános tanácsot.

### Heti keret és munkaméret jelzése

Minden feladat megkezdése előtt, még az első eszközhívás előtt jelezd a
várható munkaméretet az alábbi kategóriák egyikével:

- 🟢 **Beszélgetés** — nincs eszközhasználat; várhatóan minimális fogyasztás.
- 🟡 **Könnyű munka** — néhány célzott fájlművelet vagy egy rövid ellenőrzés.
- 🔴 **Nagy munkamenet** — kódolás, több teszt, böngésző-/Photoshop-vezérlés,
  GitHub-, PR-, merge- vagy deployment-folyamat.
- ⛔ **Nem éri meg most** — a várható eredményhez képest aránytalanul sok
  keretet használna.

A pontos keretfogyasztás nem ismert, ezért ne ígérj számszerű költséget.
🔴 munkamenetet csak a felhasználó egyértelmű jóváhagyása után kezdj. Ha a
feladat végrehajtás közben magasabb kategóriába kerül, állj meg, jelezd az új
besorolást és kérj új jóváhagyást. Kerüld az ismételt, azonos bizonyítékot adó
ellenőrzéseket; egy sikertelen módszert legfeljebb egyszer javíts, utána válts
megközelítést vagy jelezd a blokkot.
