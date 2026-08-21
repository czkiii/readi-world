# Readi World — Asset Prep hibakatalógus

Frissítve: 2026-08-02  
Állapot: `ACTIVE`

| ID | Jelenség | Bizonyított ok | Kötelező megoldás | Tiltott ismétlés |
|---|---|---|---|---|
| `PS2020-CLIPBOARD-001` | a beillesztett réteg üres | Photoshop 2020 vágólapos pixelátadás megbízhatatlan | fájl beágyazása vagy helyi fájlalapú normalizálás | újabb `copy/paste` próbálkozás |
| `PS2020-ALPHA-001` | sötét téglalapok a lágy alpha körül | PS2020 smart-object/PNG alpha renderút | bináris alpha a PSD-masterhez; lágy alpha helyi release-normalizáláshoz | PS2020 duplicate-export ugyanabból a soft-alpha smart objectből |
| `PS-UNIT-001` | asset jobb alsó irányba elcsúszik | a numerikus eltolást a ruler unit szerint értelmezi | `UnitValue(delta, "px")` | egység nélküli `translate(number, number)` |
| `WIN-FOLDER-001` | export rossz mappába kerül | a natív mappaválasztó nem vette át a begépelt útvonalat | profilvezérelt/fix célút; postflight | kézi útvonalbegépelés production exportnál |
| `GUI-CAPTURE-001` | fekete vászon vagy másik app látszik | GPU/capture vagy fókuszhiba | fájlszintű QA; GUI csak művészi review-ra | screenshot technikai bizonyítékként |
| `PROCESS-RETRY-001` | sok teljes újrafuttatás | izolált proof és retry-limit hiánya | első hiba után izolált proof; max. 1 teljes retry | diagnózis nélküli teljes újrafuttatás |

Új hiba csak akkor kap új ID-t, ha a meglévő sorok egyike sem fedi. A megoldás
akkor bizonyított, ha izolált proof és postflight eredmény tartozik hozzá.
