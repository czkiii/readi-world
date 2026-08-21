# Readi World — D5 kanonikus referencialap

Frissítve: 2026-08-02  
Állapot: `DONE` — `D5-OWN-001A`  
Kapcsolt szerződés: `docs/art/Art-direction-contract.md`

## 1. Cél és használati sorrend

Ez a lap nem új funkciókat olvas ki a koncepcióképekből, hanem pontosan
meghatározza, melyik vizuális tulajdonsághoz melyik referencia használható.

Ütközéskor a sorrend:

1. `docs/Dokumentumaudit.txt` kanonikus döntései;
2. D1–D4 lezárt UX-, map-, perspektíva- és léptékszerződései;
3. `docs/art/Art-direction-contract.md` D5 stílus-, szín-, anyag- és fényszabályai;
4. ez a referencialap;
5. az egyes képek esetleges, nem kanonikus részletei.

A generált felirat, ikonjelentés, vezérlőpozíció, feature-lista és pontos
épületmennyiség egyik képen sem válik automatikusan játékdöntéssé.

## 2. Referenciahierarchia

### A szint — north-star referenciák

| ID | Kanonikus szerep | Kötelezően megtartandó | Kötelezően elvetendő vagy újratervezendő |
|---|---|---|---|
| `REF-005` | Elsődleges pillanatról pillanatra gameplay- és hangulati referencia | Meleg storybook világ, karakter–világ léptékérzet, sötét zöld/meleg arany panelnyelv, top státuszritmus, main-goal és in-world állapotjelzés vizuális kapcsolata | Bal oldali fix joystick, permanens axe/ACT gomb, minden rendszer egyidejű mutatása, farm/harbor/event/offline funkcióígéret |
| `REF-001` | Elsődleges portré világkompozíciós referencia | Organikus főút, landmarkritmus, erdő–falu átmenet, függőleges bejárási ritmus, világosan olvasható útvonal | Nem a P1 térképe; harbor, mine, farm és kész falu nem másolandó; a D3 topológiát nem írhatja felül |
| `REF-009` | Elsődleges restaurációs és „a világ emlékszik rád” referencia | Ugyanazon földrajz és landmarkok erős, tartós before/after változása; elhagyottból élő hely érzelmi íve | Pontos épületszám, endgame-terjedelem és teljes képernyős térképsűrűség nem P1-kötelezettség |

### B szint — támogató vizuális referenciák

| ID | Használható erre | Nem használható erre |
|---|---|---|
| `REF-002` | Top információs hierarchia, avatar/resource/idő csoportosítás, világcímkék és világosabb HUD-változat | Joystickoldal, permanens ACT, generált szöveg vagy pontos runtime layout |
| `REF-003` | Sötét, puha panelnyelv; HUD–world kontraszt; napszakhangulat | P1 környezeti sűrűség, bal oldali joystick vagy zsúfolt képernyő |
| `REF-007` | Moduláris rendszerolvashatóság, zöld–arany paletta, progress vizuális nyelve | Konkrét runtime controls, farm scope vagy teljes HUD-customization P1-ben |

### C szint — rendszer- és távlati koncepció

| ID | Használható erre | Korlát |
|---|---|---|
| `REF-004` | Rendszerek kapcsolatának, building state-eknek, restorationnek és day/nightnak a kommunikálása | Nem runtime-képernyő és nem egyszerre megépítendő feature-lista |
| `REF-006` | Zoom-, kamera-, placement- és hosszú távú HUD-variációs gondolkodás | Nem végleges UI, nem P1 scope és nem acceptance screenshot |
| `REF-008` | Hosszú távú településszerkezet, district- és landmarkritmus, parti kapcsolat | Csak későbbi scope-ban; nem kezdőtérkép és nem P1 sűrűség |

## 3. Kötelező konfliktusfeloldás

| Ha a referencia ezt mutatja… | Akkor ez az irányadó |
|---|---|
| eltérő kamera vagy izometrikus szög | D4: ortografikus hatású 3/4 top-down, `55°±5°`, zéró yaw |
| eltérő karakter-, fa- vagy épületlépték | D4 WU/APU skálalap és `Visual-scale-sheet.md` |
| más útvonal, több régió vagy más landmark | D3 vertical-slice topológia és P1 cut list |
| bal oldali vagy fix joystick | D1–D2: kézprofilhoz kötött touch-origin floating joystick; jobbkezes alapban jobb oldalt |
| permanens ACT/axe gomb | D1–D2: nincs permanens ACT; a kiválasztott tool a munkaszándék |
| minden menü és rendszer egyszerre látszik | D2 adaptív HUD és unlock-driven screen map |
| erős belefestett naplemente vagy éjszaka | D5 semleges masterfény; napszak runtime réteg és külön emissive role |
| eltérő zöld, barna, panel vagy anyagkezelés | D5 anchor tokenek és anyagszabályok |
| képre generált szöveg, logó vagy szám | elvetendő; runtime lokalizációs/UI-réteg rajzolja |

## 4. Assetcsaládonkénti referencerecept

| Assetcsalád | Elsődleges vizuális forrás | Kiegészítő forrás | Kötelező szerződés |
|---|---|---|---|
| karakterek és animációk | `REF-005` karakter–világ arány és hangulat | `REF-002` avatarolvashatóság | D4 karakterlépték/irány + D5 karakterirány |
| portrék | `REF-005` identitás és melegség | `REF-002` HUD-beágyazás | D2 UI-hierarchia + D5 portrészabály |
| fák, kövek, gyűjthetők | `REF-001` természetes környezet és spacing | `REF-003` gazdagabb clusterkezelés | D3 járható folyosók + D4 pivot/footprint + D5 silhouette |
| épületek és állapotaik | `REF-005` gameplay-lépték és anyag | `REF-009` állapotváltozás | D3 landmark + D4 anchor/footprint + D5 restoration |
| talaj, utak, seamless elemek | `REF-001` organikus főút és átmenet | `REF-003` textúragazdagság | D3 path + D4 scale + kötelező 3×3 seamless proof |
| dekorációk | `REF-001` organikus ritmus | `REF-009` restored gazdagodás | D3 density + D5 60/30/10 részlethierarchia |
| UI-panelek és ikonok | `REF-005` elsődleges sötét panelnyelv | `REF-002`, `REF-003`, `REF-007` | D2 screen map + D5 UI tokenek; bitmap szöveg tilos |
| effektek és részecskék | `REF-005` visszafogott gameplay-fókusz | `REF-009` milestone-hangulat | D5 effektirány + Reduced Motion |
| hosszú távú világtérkép | `REF-008` district/landmark kompozíció | `REF-004`, `REF-006` rendszerkapcsolat | csak külön későbbi scope-döntés után |

## 5. Referenciahasználati címkék

Minden D7/D8 prompt és asset passport legalább egy referencia-ID-t és egy
felhasználási címkét kap:

- `MATCH`: a megnevezett vizuális tulajdonságot szorosan követni kell;
- `INSPIRE`: hangulati vagy kompozíciós segítség, nem pixel- vagy layoutmásolás;
- `AVOID`: a képen látható tulajdonságot kifejezetten nem szabad átvenni;
- `SCOPE-ONLY-LATER`: távlati vízió, az aktuális assetnek nem része.

Példa: `REF-005 MATCH: panel mood; AVOID: left fixed joystick; AVOID: ACT axe`.

## 6. Gyors KEEP / DISCARD összefoglaló

### KEEP

- meleg, cozy, festett storybook világ;
- tiszta, mobilon olvasható silhouette és landmark;
- organikus, de vezetett út- és növényritmus;
- sötét erdőzöld, meleg világos és arany UI-hierarchia;
- ugyanazon hely tartós, látványos restoration állapotai;
- kezdetben üresebb, később élőbb és személyesebb világ;
- természetes anyagok és puha térfogat.

### DISCARD / REDESIGN

- bal oldali vagy fix joystick;
- permanens ACT/tool gomb;
- nem P1 rendszerek állandó HUD-jelenléte;
- generált feliratok és funkcióígéretek;
- túlzsúfolt kezdővilág;
- eltérő perspektíva, footprint vagy napszakba sütött sprite;
- pontos képmásolás vagy ismert védett játékstílus utánzása.

## 7. Art review kérdések

1. Egy mondatban megnevezhető, mely `REF-*` tulajdonságot követi a jelölt?
2. A D4 kamera, lépték, pivot és footprint változatlan?
3. Normál mobil zoomon a fő silhouette és state segítség nélkül olvasható?
4. Az anyag, paletta és semleges masterfény megfelel a D5 contractnak?
5. Nem került bele képről átvett tiltott input, feature vagy bitmap szöveg?
6. A ruined/restored variáns ugyanazt az objektumot és földrajzi anchort mutatja?
7. Dokumentált a promptverzió, forrás, reference ID és felhasználási címke?

A válaszok nem helyettesítik a D5 `18/20` scorecardot vagy a D6 technikai QA-t.

## 8. D7 prompttoken-leképezés

| Promptblokk | Kötelező forrás |
|---|---|
| `GLOBAL_STYLE_v1` | D5 north-star, pillérek, pozitív/negatív jelentésblokk |
| `CAMERA_GEOMETRY_D4` | D4 projection, facing, scale, pivot |
| `LIGHTING_NEUTRAL_D5` | D5 production master és külön runtime időprofil |
| `REFERENCE_ROLE` | `REF-*` + `MATCH/INSPIRE/AVOID/SCOPE-ONLY-LATER` |
| `FAMILY_*` | e lap 4. fejezete + későbbi családspecifikáció |
| `OUTPUT_*` | D6 export-, alpha-, méret-, passport- és fájlnévszabály |
| `NEGATIVE_*` | D5 hard fail lista + családspecifikus hibák |

## 9. Eredet és másolásvédelem

Az eredeti kilenc fájl, méretük és SHA-256 kapcsolatuk a
[`Reference-index.md`](Reference-index.md) és a D1 reconciliation riport része.
Ezek koncepcióreferenciák, nem exportálható production assetek. Az új assetnek
önálló Readi World-megoldásnak kell lennie; a referencia képi vagy jogi eredetét
az asset passportban nyomon kell követni.

## 10. D5 tulajdonosi kapu

`D5-OWN-001` a kapcsolt art direction contracttal együtt fogadható el.

Elfogadott döntés: **`D5-OWN-001A`**, 2026-08-02.
