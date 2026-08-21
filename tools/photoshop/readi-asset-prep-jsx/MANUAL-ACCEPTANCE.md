# Photoshop 2020 kézi elfogadási lista

Környezeti cél: Adobe Photoshop 2020, `21.1`.

## Indítás

- [x] `File > Scripts > Browse...` útvonalon a script hiba nélkül elindul.
- [x] A standing/stump/shadow és `r001` mezők láthatók.
- [x] A rögzített `ReadiWorldScript` Actionből ugyanaz az ablak nyílik meg. A
  külön Function Key nem kötelező: a tulajdonos az Actiont közvetlenül a projekt
  mappájában maradó scriptre rögzítette.

## Profil és dokumentum

- [x] Standingből 384×448 px, RGB, 8-bit, sRGB, átlátszó dokumentum készül.
- [x] Stumpból 128×96 px dokumentum készül, pivot: 64,80.
- [x] Shadowból 128×64 px dokumentum készül, pivot: 64,48.
- [x] A négy standard layer group egyszer készül el, ismétléskor sem duplázódik.
- [x] A pivot-, ground-line- és padding-guide ismétléskor sem duplázódik.
- [x] Hibás canvas vagy hiányzó group esetén az export blokkolt. A hostpróbán a
  128×64 shadow dokumentum stump profilként való validálása `BLOCKED` állapotot
  adott, és 128×96 px elvárást jelzett.

## Destruktív műveletek védelme

- [x] Canvas-korrekció előtt megerősítést kér és külön jelzi, hogy nem skáláz
  artworköt.
- [x] Színkontraktus-korrekció előtt megerősítést kér.
- [x] Normalized exportnál a guide és review group rejtett.
- [x] Review exportnál a guide rejtett, a review group látható.
- [x] Export után az eredeti dokumentum aktív, rétegei és láthatósága változatlan.
- [x] Létező célfájlt nem ír felül; az ismételt normalized export explicit
  overwrite-blokkoló hibaüzenetet adott.

## Metaadat

- [x] Ground-contact elutasításakor sidecar nem készül.
- [x] Ground-contact elutasításakor a passportban nincs tényleges pivot; az
  `actualPivotStatus` értéke `PENDING_VISUAL_CONFIRMATION`.
- [x] Megerősítéskor a sidecar/passport normalized pivotja megfelel a profilnak.
- [x] A passport `qaStatus` értéke `PENDING`.
- [x] A passport `activationStatus` értéke `NOT_INTEGRATED`.
- [x] A JSON UTF-8 és érvényesen megnyitható.

## Eredményrögzítés

- Photoshop pontos verzió: Adobe Photoshop 2020 `21.1`
- Teszt dátuma: 2026-08-02
- Tesztelő: Codex a tulajdonos helyi Photoshop-környezetében
- Eredmény: `PASS`
- Action neve: `ReadiWorldScript`
- Bizonyíték: `acceptance-output/` alatt 384×448 px, 32 bpp alpha normalized és
  review PNG; megerősített standing geometry/passport; elutasított stump
  ground-contactból pivot nélküli passport és sidecar-hiány.
- Megjegyzés: a három üres fixture dokumentum nyitva maradt, a teszt nem mentette
  masterként és nem írt a runtime-ba vagy az `art-source/` mappába.
