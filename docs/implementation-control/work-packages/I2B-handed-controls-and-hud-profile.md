# I2B — handed controls és későbbi HUD-profile

Frissítve: 2026-08-02  
Állapot: `DESIGN-READY / BACKLOG / I1-DEPENDENT`

## Rögzített tulajdonosi szerződés

- alapértelmezett profil: jobbkezes;
- balkezes preset tükrözi a joystick- és tool-intent zónát, de a világ
  mozgásirányait nem fordítja meg;
- joystick méret és érzékenység konfigurálható;
- a későbbi HUD Layout Editor csak támogatott elemeket és kijelölt safe zónákat
  mozgathat;
- frissítés nem írhatja felül észrevétlenül a játékos saját elrendezését;
- reset mindig visszaállítja a kiválasztott kézprofil kanonikus presetjét.

## Miért nem az I2 része

Az I2 csak az inputfizikát és a touch-origin lifecycle-t zárta le. A profilhoz
Controls & HUD menü, preferenciatárolás, safe-zone layout schema, migráció és
hozzáférhetőségi proof kell; ezek az I1 HUD/menu shell után nyithatók meg úgy,
hogy az inputmotorhoz ne kelljen újra hozzányúlni.

## Belépési kapu

1. I1 `Controls & HUD` route és panelállapot elkészül;
2. külön preference schema és migrációs döntés;
3. jobb-/balkezes 402×874 overlay proof;
4. fizikai iPhone 16 Pro egykezes tesztterv.

## Védett terület

Az I2 `virtual-joystick.js` vektor-, capture- és release-logikája nem változik;
az I2B csak konfigurációt és zónageometriát ad át neki.
