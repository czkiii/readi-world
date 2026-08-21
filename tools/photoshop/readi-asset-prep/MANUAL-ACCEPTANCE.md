# ART-TOOL-01A — Photoshop 24+ kézi acceptance

Állapot: `PENDING — LOCAL HOST IS PHOTOSHOP 21.1`

## Környezetjegyzőkönyv

- Photoshop exact version: `TODO`;
- UXP Developer Tool exact version: `TODO`;
- Windows version: `TODO`;
- plugin version: `0.1.0`;
- tesztelő és dátum: `TODO`;

## Standing fixture

- [ ] plugin manifest hiba nélkül betöltődik;
- [ ] a panel megjelenik a Plugins menüben;
- [ ] pine family és három output megjelenik;
- [ ] owner-review figyelmeztetés látható;
- [ ] `Create From Profile` 384×448 transparent RGB dokumentumot hoz létre;
- [ ] négy standard top-level group pontos névvel létrejön;
- [ ] pivot guide `(192,416)` helyen látható;
- [ ] padding guide-ok 48/48/32/32 px értéket követnek;
- [ ] validáció RGB/8-bit/sRGB és exact canvas mellett sikeres;
- [ ] eltérő canvas/mode/bit depth/profile blokkoló hibát ad;
- [ ] canvas resize nem skálázza az artworköt;
- [ ] normalized export temporary duplicate-on készül;
- [ ] export után az eredeti master layer- és visibility-állapota változatlan;
- [ ] második, azonos nevű export overwrite helyett hibát ad;
- [ ] review export tartalmazhatja a `90_REVIEW_DO_NOT_EXPORT` tartalmát;
- [ ] normalized export nem tartalmazza a review/guides group tartalmát;
- [ ] geometry JSON pivotNormalized `(0.5,0.928571...)`;
- [ ] passport `DRAFT`, `NOT_INTEGRATED`, minden QA `PENDING`;
- [ ] decoded estimate `0.65625 MiB`.

## Stump fixture

- [ ] canvas 128×96;
- [ ] pivot `(64,80)` és normalized `(0.5,0.833333...)`;
- [ ] decoded estimate `0.046875 MiB`;
- [ ] footprint radius `0.45 WU`;
- [ ] interaction és occluder explicit `none`.

## Shadow fixture

- [ ] canvas 128×64;
- [ ] pivot `(64,48)` és normalized `(0.5,0.75)`;
- [ ] decoded estimate `0.03125 MiB`;
- [ ] footprint/interaction/occluder explicit `none`.

## Biztonsági regresszió

- [ ] a plugin nem kínál runtime exportot;
- [ ] a plugin nem ír automatikusan `art-source/` vagy `runtime/` mappába;
- [ ] nincs hálózati kérés, analitika vagy adatküldés;
- [ ] cancel után az aktív dokumentum nem sérül;
- [ ] exporthiba után temporary dokumentum nem marad nyitva;
- [ ] a plugin unload/remove nem érinti a mastereket.

## Zárás

Host acceptance eredménye: `PENDING`  
Screenshot vagy screen recording: `TODO`  
Eltérés/bug ID: `TODO/NONE`  
Jóváhagyó: `TODO`
