# ADR-0006 — Hibrid, adatvezérelt world layout map editor nélkül P1-ben

- Státusz: `PROPOSED`
- Dátum: 2026-08-01
- Döntéstulajdonos: `OWNER+TECH+ART`
- Kapcsolt auditpontok: 8–11, 115–116, 233–239, 276–277
- Kapcsolt munkacsomag: D3–D4, majd I3

## Kontextus

A fő falu tartós, összefüggő világ; a távoli activityk külön jelenetek. A
világnak festett, organikus hatásúnak kell lennie, ugyanakkor támogatnia kell
objektumállapotot, restaurációt, collisiont, kamerát és későbbi tereprendezést.
Külön saját map editor most nagy kerülőút lehet.

## Megfontolt lehetőségek

### A. Egyetlen nagy festett háttér

Gyorsan szép lehet, de nehezen változtatható, rosszul kezeli a mélységet,
collisiont, fejlődési állapotot és későbbi személyre szabást.

### B. Teljes tile-grid világ

Könnyen szerkeszthető és validálható, de túl szabályos vagy ismétlődő lehet a
kívánt storybook kompozícióhoz.

### C. Hibrid, adatvezérelt layout

Moduláris/seamless ground és útalap, külön objektum- és dekorációs sprite-ok,
authored landmarkok, deklarált footprint/pivot/collision/occlusion metaadattal.
A P1 pálya adatfájlból készül; saját vizuális editor csak mért fájdalompont
után.

## Javasolt döntés

A C irány. A D3 map blueprint és D4 scale/camera contract előtt nem
`ACCEPTED`. A P1-ben nem készül saját map editor. A pályaelrendezés
adatvezérelt, a tulajdonos pedig annotált képpel vagy layout-változattal tud
art directiont adni.

## Következmények

### Pozitív

- Megőrzi az organikus, festett kompozíciót.
- Objektumok, állapotok és assetek külön cserélhetők.
- Nem viszi el a P1-et egy editorprojekt.
- Később Tiled/saját editor adapter hozzáadható a scene-formátum megtartásával.

### Negatív

- A scene-adatformátumot és depth/occlusion szabályt gondosan kell tervezni.
- Kezdetben a layout módosítása technikai közreműködést igényel.
- Túl sok egyedi díszítés növelheti az asset- és draw budgetet.

## Elfogadási bizonyíték

- D3 jóváhagyott map blueprint;
- D4 visual scale/camera contract;
- egy kis village–forest–hut scene külön ground/object/landmark rétegekkel;
- collision és occlusion overlay;
- iPhone normál és stressz frame/memória mérés;
- layout módosítás gameplaykód átírása nélkül.

## Felülvizsgálati trigger

Az adatfájlos layout iterációja ismétlődően blokkolja az artmunkát, vagy a
terrain/occlusion proof nem teljesíti a látvány- és performance-kaput.
