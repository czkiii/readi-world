# Readi World — eszköz- és képernyőmátrix

Frissítve: 2026-08-01

## Alapelv

A játékszabály felbontásfüggetlen világkoordinátán működik. A HUD safe area,
reszponzív korlát és minimális érintési méret alapján rendeződik. Más
képernyőméret nem változtathat collisiont, jutalmat, időzítést vagy mentést.

## Támogatási szintek

| Eszköz/mód | Szint | Kötelező viselkedés | Release-bizonyíték |
|---|---|---|---|
| iPhone 16 Pro, Safari, portré | Elsődleges referencia | Teljes P1 loop, safe area, 60 FPS cél, tartós 30 FPS alatti fail | Kötelező fizikai E2E |
| iPhone 16 Pro, Home Screen, portré | Elsődleges referencia | Offline indulás, mentés, háttér/resume, safe area, legfeljebb 10 s time-to-action | Kötelező fizikai E2E |
| Más modern portré telefon | Reszponzív cél | Ne törjön a layout; világkoordináta és UI maradjon használható | Automatizált viewport + későbbi kézi teszt |
| Keskenyebb/rövidebb telefon | Edge-case cél | HUD ne fedje a kritikus világot; panel görgethető; touch target megmarad | Viewport screenshot teszt |
| iPad/tablet portré | Kompatibilitási cél, nem P1 release-kapu | Ne nyúljon szét a HUD; kamera mutathat több világot vagy korlátozott max szélességet használhat | Későbbi tablet proof |
| Landscape telefon/tablet | Egyelőre nem támogatott | Biztonságos szünet és átrendezés vagy egyértelmű portré-tájékoztatás; state nem változik | Támogatás előtt külön HUD/input/kamera proof |
| Android böngésző/PWA | Halasztott proof | Közös játékmag kompatibilis marad, de nincs támogatási ígéret fizikai eszköz nélkül | Android készülék beszerzése után |
| Capacitor iOS | Későbbi proof | Webmag csomagolható, de külön lifecycle/store teszt szükséges | P2/P3 döntés után |
| Desktop billentyűzet/egér | Fejlesztői útvonal | Alap mozgás és debug használható; nem elsődleges UX | Automatizált/kézi fejlesztői smoke |

## Kötelező viewport-ellenőrzések

| Profil | Cél | Ellenőrizendő |
|---|---|---|
| Referencia telefon | iPhone 16 Pro portré CSS-viewport | notch/Dynamic Island, alsó safe area, böngészős sáv |
| Keskeny telefon | minimális támogatott szélesség később mérve | HUD wrap, menüszélesség, joystick aktivációs zóna |
| Rövid telefon | csökkentett magasság | objective panel, bottom inventory, modal scroll |
| Magas telefon | szélsőséges portré arány | üres terület, kamera composition, bottom controls |
| Tablet portré | nagyobb CSS-szélesség | HUD max-width, nagyobb kamerakivágás, asset élesség |

## Kamera- és assetkövetkezmények

- Az assetek nem eszközpixelben, hanem deklarált világméretben jelennek meg.
- A Canvas belső renderfelbontása különválik a CSS-viewporttól.
- DPR és render scale felső korlátot kap a memória- és energia-budget miatt.
- Tablet nem automatikusan nagyítja fel a HUD-ot; max szélesség és nagyobb
  világkivágás használható.
- A normál kamera, szerkesztési kamera és activity scene külön zoomprofilt kap.
- Production assetet a legközelebbi és legtávolabbi engedélyezett zoomon is
  ellenőrizni kell.

## HUD- és inputkövetelmények

- jobb oldali touch-origin floating joystick alapértelmezés;
- balkezes tükrözhető profil;
- UI-érintés nem indíthat joystickot;
- menü, modal és dialógus explicit inputkontextust használ;
- minimális touch target és kontraszt a HUD-specben rögzítendő;
- orientáció- vagy fókuszváltás minden ideiglenes inputot töröl;
- Reduced Motion nem távolíthat el információt.

## Eszközteszt-jegyzőkönyv minimális mezői

Eszközmodell, OS-verzió, böngésző/mód, commit SHA, viewport, DPR, orientáció,
tesztidő, FPS, memória, kezdési idő, resume-ciklusok, safe-area eredmény,
képernyőképek, hibák és végső pass/fail.
