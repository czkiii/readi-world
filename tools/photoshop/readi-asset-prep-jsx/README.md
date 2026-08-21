# Readi Asset Prep — Photoshop 2020 JSX

Ez az ART-TOOL-01A Photoshop 2020 (`21.1`) kompatibilitási változata. Helyi
ExtendScriptet használ: nincs előfizetéses API, kreditfogyasztás, hálózati
kapcsolat, analitika vagy automatikus runtime-írás.

A ScriptUI feliratai szándékosan egyszerű angol/ASCII szövegek. A helyi host
proof során kiderült, hogy a Photoshop 2020 régi ExtendScript motorja a modern
UTF-8 JSX magyar ékezeteit hibásan jeleníti meg; az ASCII UI ezt stabilan
elkerüli, miközben a teljes magyar használati útmutató ebben a fájlban marad.

## Telepítés Photoshop 2020-ba

1. Zárd be a Photoshopot.
2. Másold a `Readi Asset Prep.jsx` fájlt ide:
   `C:\Program Files\Adobe\Adobe Photoshop 2020\Presets\Scripts\`
3. Indítsd újra a Photoshopot.
4. A script a **File > Scripts > Readi Asset Prep (Photoshop 2020)** menüből
   indítható.

Az egyszeri kipróbáláshoz bemásolás nélkül is használható a
**File > Scripts > Browse...** útvonalon.

## Action és gyorsbillentyű

1. Nyisd meg a **Window > Actions** panelt.
2. Készíts új Actiont, például `Readi Asset Prep` néven, és rendelj hozzá
   szabad Function Key-t.
3. Indítsd el a rögzítést.
4. Válaszd a **File > Scripts > Readi Asset Prep (Photoshop 2020)** parancsot.
5. Amikor megjelenik a Readi ablak, zárd be, majd állítsd le a rögzítést.

Ezután a Function Key megnyitja a Readi kezelőablakot. A script egyetlen
Action-lépés; az ablakból választod ki az aktuális assetműveletet.

## Mit tud

- kanonikus D8 pine `standing`, `stump`, `shadow` profil;
- profilból új átlátszó master dokumentum;
- canvas-, RGB-, 8-bit-, sRGB- és layer group validáció;
- explicit színkontraktus- és canvas-korrekció, artwork-skálázás nélkül;
- idempotens standard layer groupok;
- idempotens pivot-, ground-line- és safe-padding segédvonalak;
- normalized és review PNG export temporary duplicate-ról;
- revisiont tartalmazó fájlnév és kötelező overwrite-blokkolás;
- geometry sidecar és passport draft;
- normalized pivot és decoded RGBA memória-becslés;
- ground-contact megerősítés nélkül nincs tényleges pivot a passportban;
- a draft státusza mindig `QA: PENDING` és `activation: NOT_INTEGRATED`.

## Kényelmi különbség a későbbi UXP panelhez képest

A funkcionális szerződés azonos. Photoshop 2020-ban az eszköz nem dokkolt
panelként él folyamatosan, hanem az Action/gyorsbillentyű megnyit egy ScriptUI
ablakot. Az export célmappáját Photoshop natív mappaválasztójával kell megadni.

## Biztonság

- export előtt a canvas, színmód és standard groupok blokkolóan ellenőrzöttek;
- az export duplicate-on történik, amely mentés nélkül bezárul;
- létező fájlt a script nem ír felül;
- sidecar csak megerősített ground-contact után készül;
- nincs automatikus assetaktiválás;
- a játék `runtime/` mappáját a script nem ismeri és nem módosítja.

## Fejlesztői ellenőrzés

A csomag gyökerében:

```powershell
npm test
```

A teszt ellenőrzi az ES3-kompatibilis csomagformát, a canonical UXP profillal
való gépi egyezést, a védelmi markereket és a hálózati/runtime útvonalak hiányát.
Photoshopon belüli elfogadáshoz lásd a `MANUAL-ACCEPTANCE.md` fájlt.

2026-08-02-án a scriptet a helyi Photoshop 2020 `21.1` a **File > Scripts >
Browse...** útvonalon sikeresen betöltötte, és a teljes ScriptUI ablak megjelent.
Ugyanezen a napon a `ReadiWorldScript` Actionből indított teljes kézi acceptance
is sikeresen lezárult: a három dokumentumprofil, a normalized/review export, a
sidecar/passport és a biztonsági blokkok hostban is bizonyítottak. A részletes
eredmény a `MANUAL-ACCEPTANCE.md` fájlban található.
