# Readi World — vertical-slice content- és assetbudget v0.1

Frissítve: 2026-08-01  
Forrás: audit 277 és 284–285

## Cél

Ez a budget a 20–30 perces village–forest–Forester Hut slice legnagyobb
engedélyezett tartalmi kerete. Nem végleges assetmegrendelés: D3–D7 után a
konkrét kamera-, scale-, art- és promptspec alapján frissül. A budget felfelé
csak külön scope- és kockázatvizsgálattal változhat.

## Játékosi tartalmi ív

| Beat | Kötelező eredmény | Tervezett idő | Minimum evidence |
|---|---|---:|---|
| 1. Érkezés | Üres/elhagyott falurész, világos első cél, mozgás megtanulása. | 2–4 perc | Új játékos segítség nélkül elindul. |
| 2. Felfedezés | A sérült Forester Hut és a forest iránya felismerhető. | 3–5 perc | Nem kell szöveges navigációs magyarázat. |
| 3. Gathering | A játékos erdei alapanyagokat talál és összegyűjt. | 6–9 perc | Resource state menthető és olvasható. |
| 4. Crafting | Egy minimális javítóelem/recept elkészül. | 3–5 perc | Validált, atomi recipe tranzakció. |
| 5. Eszközös munka és restauráció | A játékos kiválasztja az elkészített fejszét; érvényes fa közelében a favágás automatikusan indul, majd a Forester Hut tartósan helyreáll. | 4–7 perc | Üres kézben nincs favágás; nincs második ACT/promptnyomás; költség egyszer vonódik le; resume stabil. |
| 6. Következmény | Jutalom, világváltozás és következő lehetőség érthető. | 2–4 perc | A játékos el tudja mondani, mi változott. |

Célösszeg: 20–30 perc. Várakoztatással vagy ismételt grinddal nem tölthető ki.

### Tool-intent szabály

- Üres kéz: szabad séta és nem eszközös, veszélytelen interakciók.
- Kiválasztott fejsze: maga a tartós favágási szándék.
- Érvényes fa hatótávba kerülésekor a karakter külön ACT vagy második tap
  nélkül automatikusan munkába kezd.
- Tool elrakása, eltávolodás, kontrollált megszakítás vagy érvénytelen célpont
  leállítja vagy megakadályozza a munkát.
- Több közeli fa célpontprioritását, célpontmegtartását és megszakításérzetét
  külön mobilos proof zárja le; ez nem kérdőjelezi meg a fenti szándékszabályt.

## Kötelező rendszertartalom

| Elem | Must budget | Megjegyzés |
|---|---:|---|
| Játszható fő falu-rész | 1 | Tartós jelenet, nem teljes végjátékfalu. |
| Érzékelhető forest zóna | 1 | Lehet a fő világgal összefüggő, de vizuálisan és gameplayben külön olvasható. |
| Forester Hut landmark | 1 | A slice egyetlen restaurálható épülete. |
| Forester Hut kötelező vizuális állapot | 3 | Romos, helyreállítás alatt/feedback, helyreállított. A footprint és bejárat stabil. |
| Field workbench/crafting pont | 1 | Egyértelmű, de nem permanens ACT gomb. |
| Crafting recipe | 1 | Repair timber vagy kanonikusan megfelelő javítóelem. |
| Elsődleges resource family | 1 | Forestből gyűjthető fa/ág család, több vizuális variánssal. |
| Restaurációs reward | 1 | Faluszint/világállapot és következő irány. |
| Save checkpoint class | legalább 4 | Kezdés, gathering/craft, restauráció előtt, restauráció után. |
| Main goal chain | 1 | Több beatből állhat, de egy világos fő ív. |

## World- és environment assetbudget

Az alábbi darabszámok production exportokra, nem masterrétegekre vonatkozó
kezdeti felső korlátok.

| Assetcsalád | Must | Should | Cut first | Megjegyzés |
|---|---:|---:|---:|---|
| Ground material family | 2 | 1 extra transition | szezonális variáns | Village meadow + forest floor; valódi 3×3 proof. |
| Út/path modul vagy vizuális készlet | 1 család | 4–8 szükséges forma | extra dekoratív út | A technikai forma D3/D4-ben záródik. |
| Forester Hut | 3 state | 1 rövid celebration overlay | további tier | Egy authored landmark. |
| Workbench | 1 | 1 active feedback state | több workstation | Stabil pivot/interaction footprint. |
| Gyűjthető ág/fa resource | 3 vizuális variáns | 2 extra | ritka variáns | Ugyanaz a logikai family/role. |
| Nagy fa | 4 variáns | 2 extra méret | szezonális készlet | Occlusion és collision külön metaadat. |
| Bokor/aljnövényzet | 4 variáns | 4 extra | ritka színek | Sűrűség a map blueprintből. |
| Kő/szikla | 3 variáns | 2 extra | külön biome-készlet | Tiszta silhouette, footprint metaadat. |
| Virág/kis növény | 3 variáns | 3 extra | animált változat | Restauráció utáni világváltozást is segítheti. |
| Kerítés/kapu | 1 család, closed/open | 2 variáns | extra díszkapu | Farm gameplayet nem nyit. |
| Kis dekor/prop | legfeljebb 12 | +8 | minden ezen felül | Pad, lámpa, hordó, láda, tábla stb. |
| Landmark környezeti effekt | 1 család | +1 | extra celebration | Reduced Motion kompatibilis. |

## Karakter- és animációbudget

| Elem | Must | Feltétel |
|---|---:|---|
| Játszható karakter base | 1 | Kanonikus reference identity szükséges. |
| Idle | 1 loop / támogatott irány | Frame- és irányszám a character specben záródik. |
| Walk | 1 loop / támogatott irány | Az irányszámot nem ez a budget dönti el. |
| Gather/work action | 1 közös vagy family-specifikus proof | Eszközréteg döntése szükséges. |
| Craft feedback | 1 rövid animáció vagy kontextuális feedback | Nem kötelező külön teljes body animation, ha UX másképp tiszta. |
| Restoration celebration | 1 rövid reakció/effekt | Reduced Motion alternatívával. |
| Kötelező NPC | 0 | A 277 nem követel NPC-t; csak bizonyított szükség esetén nyitható. |

## UI asset- és screenbudget

| Elem | Must budget | Megjegyzés |
|---|---:|---|
| Normál adaptive HUD state | 3 | Kezdő, gathering/crafting, restored. |
| Főmenü shell | 1 | A nem slice-funkciók rejtve vagy locked állapotban. |
| P1 működő alnézet | legfeljebb 4 | Goal/journal, inventory, crafting, settings vagy D2 alapján. |
| Context prompt family | 1 | Auto/manual/locked/progress/error állapotok. |
| Resource/item icon | legfeljebb 8 | Csak P1-ben ténylegesen használt itemek. |
| Navigation/system icon | legfeljebb 12 | Text labellel és accessibility állapottal. |
| Toast/banner family | 1 | Success/warning/error/milestone variáns ugyanazon rendszerben. |
| Loading/save/offline indicator | 1 family | Állapotkomponensek, nem külön vizuális rendszer. |

## Audio budget

| Család | Must | Should | Cut first |
|---|---:|---:|---:|
| Village ambience | 1 loop | 1 napszakvariáns | további rétegek |
| Forest ambience | 1 loop | 1 napszakvariáns | időjárásvariáns |
| Zenei loop | 1 | 1 restaurációs réteg/stinger | régiós album |
| Lépés | 2–3 surface variáns | további randomizálás | extra shoe set |
| Pickup/gather SFX | 2–4 | material variáns | ritka effekt |
| Craft SFX | 1–2 | eszközréteg | több workstation |
| Restoration/milestone | 1 stinger | környezeti reakció | hosszú cutscene audio |
| UI SFX | legfeljebb 6 | accessibility hangerőprofil | díszítő hangok |

## Szöveg- és lokalizációbudget

| Elem | Kezdeti felső keret | Szabály |
|---|---:|---|
| Angol source string | 40–80 | Minden játékosszöveg kulcsból jön. |
| Main goal/step text | 8–16 | Rövid mobilos változat kötelező. |
| Item/recipe/building text | 10–20 | Stabil content ID-hez kötve. |
| Tutorial/context prompt | 8–16 | Nem írhatja le folyamatosan a nyilvánvalót. |
| Error/locked/recovery text | 8–20 | Ok + következő értelmes lépés. |
| Második nyelv | 0 a P1 source-ban | A pipeline legyen kész, fordítás külön scope. |

## Technikai budgetek

- iPhone 16 Pro: 60 FPS cél; tartós 30 FPS alatt fail.
- Folyamatmemória proof-budget: 350 MB.
- Aktív textúra proof-budget: 128 MB.
- Kezdeti time-to-action: legfeljebb 10 másodperc.
- A production slice kezdeti belső célja legfeljebb 80–90 MB becsült aktív
  textúra, hogy maradjon mérési és runtime-headroom; ez `PROVISIONAL`, és az
  első valós assetcsalád után újraszámolandó.
- Egyszerre csak az aktuális jelenet teljes assetkészlete aktív.
- Egy assetcsalád integrációja külön reportot és memóriaösszesítést kap.

## Hard cut list

Nem kerülhet a P1 asset- vagy contentbudgetbe:

- működő farm;
- harbor, hajó, fishing vagy mine activity;
- több profession teljes animációs/contentkészlete;
- teljes NPC relationship roster;
- economy/trade/storage network UI;
- szezononként teljes külön environment készlet;
- több restaurálható landmark;
- belső terek teljes production készlete;
- monetizáció, cloud vagy telemetry UI.

## Budgetváltoztatás

Új must-have csak akkor adható hozzá, ha:

1. kapcsolt audit- és játékosi szükség bizonyított;
2. megnevezzük, mi kerül ki vagy mi nő;
3. artidő-, memória-, load-, save- és teszthatás dokumentált;
4. a kockázati és backlognyilvántartás frissül;
5. a tulajdonos explicit jóváhagyja.
