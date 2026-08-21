# I2 — touch-origin floating joystick

Frissítve: 2026-08-02  
Állapot: `DONE / MERGED / DEPLOYED` — PR #11, `ad68415`

## Scope contract

1. Egyetlen cél: jobbkezes alapban a jobb oldali szabad world-touch zónában
   az érintés helyén megjelenő, húzásra irányt/erőt adó és elengedéskor eltűnő
   floating joystick.
2. Módosítható: `virtual-joystick.js`, annak DOM/CSS/bootstrap kötése, célzott
   teszt, runtime README és I2 evidence.
3. Védett: World State, save envelope/storage, crafting, restoration, asset
   manifest/renderer és teljes HUD/menu implementáció.
4. Acceptance: touch-origin show, drag vector, radius clamp, release-hide,
   pointercancel/lost capture/background reset, idegen pointer kizárása,
   keyboard regresszió nélkül; UI-réteg nem indít joystickot.
5. Regresszió: teljes tesztcsomag, syntax, 402×874 vizuális/gesture proof,
   jobb oldali reachability és beragadt input ellenőrzés.

## Későbbi külön scope

- balkezes tükrözés;
- joystick méret és érzékenység;
- Controls & HUD menü;
- támogatott elemek HUD Layout Editor safe-zónák közötti mozgatása.

Ezek szerződése lezárt, de nem kerülhetnek észrevétlenül ebbe az I2 inputfixbe.

## Megvalósítási eredmény

- a jobb oldali szabad world-touch zóna a HUD alatt, saját alacsonyabb
  z-indexen aktiválható;
- a base az első pointer koordinátájára kerül, az app szélein belül tartva;
- a knob normalizált irányt/erőt ad, a maximális sugarat clampeli;
- release, cancel, lost capture, blur és background minden inputot nulláz;
- a base nyugalomban `aria-hidden`, `opacity: 0`, `visibility: hidden`;
- UI-réteg tapje nem jut el a world-touch zónához;
- a cache-bust verziózott CSS-, bootstrap-, runtime- és joystick belépési határt
  ad, ezért a korábbi fix implementáció nem maradhat böngészőcache-ből aktív.

## Bizonyíték

| Kapu | Eredmény |
|---|---|
| Automatizált teszt | `57/57 PASS`, ebből 4 célzott joystickteszt |
| JavaScript syntax | `PASS` |
| 402×874 nyugalmi vizuális proof | joystick nem látható |
| World-zone pointer click | activate + release lefut, knob reset marker igazolt |
| HUD-tap exclusion | nincs aktiválás, knob érintetlen |
| Konzol | 0 warning, 0 error |
| World State/save/crafting/assets | `UNCHANGED` |

GitHub Pages deployment `30767694622`: `success`; élő HTML/CSS/joystick modul
HTTP 200 és I2 marker igazolt. Hátralévő kapu kizárólag a fizikai iPhone 16 Pro
egykezes érzékenység-/méret-hangolás.
