# Readi World — nyitott döntések és mérési kapuk

Frissítve: 2026-08-01

## Cél

Ez a fájl nem új kérdéssort hoz létre. A nem P0-blokkoló tulajdonosi
döntéseket és a csak működő prototípussal vagy valódi eszközön lezárható
méréseket tartja láthatóan, hogy ne kerüljenek túl korán implementációba és
ne vesszenek el.

## Összesítés

- Tulajdonosi döntést igényel: 69 pont.
- Prototípust vagy mérést igényel: 35 pont.
- Összes nyitott kapu: 104.
- Következő sorrendi nyitott auditpont: 107.

## Lezárási szerepek

- `OWNER`: a projekt tulajdonosa választ az érthetően bemutatott opciók közül.
- `MEASUREMENT`: a technikai/UX értéket előre rögzített prototípus és mérés zárja le.
- `POLICY`: privacy, jogi, adatkezelési vagy monetizációs dokumentum szükséges.
- `ART`: vizuális összehasonlítás és tulajdonosi art-jóváhagyás szükséges.

## Kapulista

| Pont | Téma | Lezáró szerep | Kötelező lezárási mód | Aktiválási feltétel | Állapot |
|---:|---|---|---|---|---|
| 107 | Hatótáv, helyzeti feltételek és Scenic Mode | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 110 | Virtuális joystick érzete | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 114 | Normál követő kamera | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 115 | Szerkesztési kamera és gesztusütközések | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 120 | Hordozott inventory kapacitásmodellje | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 121 | Megtelt inventory, overflow és elveszett jutalom | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 123 | Közeli tárolás, storage network és távoli hozzáférés | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 125 | Mobilos inventory- és storage-UI | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 127 | Alapeszközlista, Tool Collection és automatikus választás | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 128 | Tool tier és upgrade chain | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 129 | Tartósság, fuel és charge | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 130 | Tool module rendszer | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 132 | Eszközspecializáció és respec | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 133 | Különleges eszközök és vizuális fejlődés | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 134 | Quick access, activity preset és mobilos váltás | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 139 | Véletlen drop és bad-luck protection | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 140 | Régió-, időjárás-, napszak- és szezonfeltételek | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 141 | Célzott megszerzési információ és alternatív források | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 142 | Ismétléscsökkentés, area harvest és helper | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 144 | Nagy nodeszám és mobilos közelségi gyűjtés | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 147 | Azonnali, hosszú és részleges crafting | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 149 | Machine state és működési függőségek | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 152 | Minőség és különleges kockázatos receptek | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 153 | Crafting-UI, értesítés és gazdasági előnézet | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 154 | Crafting anti-grind és automation | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 156 | Restaurációs szakaszok és mérföldkő-akció | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 157 | Tierstruktúra és funkcionális fejlesztések | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 158 | Épületműködés, kapacitás és operating material | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 159 | Faluszint és vizuális világátalakulás | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 160 | Játékosotthon és személyre szabható terek | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 161 | Út-, víz-, energia- és storage-hálózat | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 162 | Több restaurációs projekt és részleges finanszírozás | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 164 | Első épületi vertical slice: Forester Hut | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 167 | Érés, betakarítás és offline növekedés | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 168 | Soros műveletek, öntözés és farmhelper | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 169 | Földterület, orchard és erdőgazdálkodási határ | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 171 | Gondozás, hangulat és állati output | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 172 | Szaporodás, különleges állatok és távollét | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 173 | Farmkapcsolatok: tárolás, cooking és trade | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 174 | Mobilos farmműveletek és háttérteljesítmény | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 176 | Napi rutin, időjárás és jelenetek közötti mozgás | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 178 | Specialisták, szolgáltatások, kereskedők és workerek | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 179 | Kapcsolati állapot és ajándékozás | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 180 | Párbeszéd és nem blokkoló történeti kommunikáció | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 181 | NPC által kiváltott világ- és gazdasági változások | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 183 | NPC-tulajdon és közösségi objektumok | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 184 | NPC-UI, hozzáférhetőség és nagy populáció teljesítménye | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 186 | Elfogadás, időzítés, sikertelenség és újrapróbálás | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 188 | Történeti és felfedezési irány | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 189 | Tutorial, célkövetés és mobilos megjelenítés | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 192 | Professionstruktúra és érvényes életutak | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 193 | XP és anti-grind jutalmazás | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 194 | Perk, specializáció és respec | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 195 | Háromrétegű és látható fejlődés | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 196 | Progressziós tempó, capek és mérés | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 198 | Pénz szerepe, kereskedők és boltok | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 199 | Order és contract rendszer | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 200 | Kereslet, kínálat és több megélhetési út | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 201 | Árak, infláció és balansz | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 204 | Világciklus és időablakok | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 205 | Időjárás, évszak és ritka jelenségek | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 211 | Kockázat, vereség és nehézség | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 212 | Activity-portfólió és pályagenerálás | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 213 | Opcionális harc | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 214 | Exploitvédelem, mobilos irányítás és teljesítmény | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 215 | Sessionhossz és time-to-action | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 216 | Welcome-back és biztonságos folytatás | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 217 | Alacsony nyomású játékszabály | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 218 | Ajánlások és adaptív HUD | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 219 | Természetes megállási pontok, reminder és Scenic Mode | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 221 | Kudarcfilozófia | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 222 | Craft-, event- és activity-kudarc | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 224 | Játékosvédelmi UX | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 227 | Portrait-first adaptív HUD | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 228 | Információs architektúra és navigáció | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 229 | Touch, lista és egykezes használat | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 231 | Scenic Mode és későbbi photo mode | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 232 | Lokalizáció, hozzáférhetőség és UI-elfogadás | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 233 | Art direction és assetcsaládok | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 238 | Renderer, draw order és mobilos teljesítmény | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 239 | Vizuális QA és Scenic Mode minőség | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 241 | Zene és adaptív soundscape | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 242 | Interakciós és UI-visszajelző hangok | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 244 | Haptika és hozzáférhetőségi redundancia | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 245 | Audioasset-betöltés, budget és milestone-scope | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 247 | Vizuális hozzáférhetőség | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 248 | Input és motoros hozzáférhetőség | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 249 | Audio, felirat, haptika és reminder | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 252 | Teljesítményprofilok és hozzáférhetőségi QA | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 256 | Validáció, verziózás és szerkesztői munkafolyamat | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 260 | Migráció, méret és eltávolított tartalom | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 270 | Automatizált regresszió és szimuláció | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 271 | Mobilteszt, crashdiagnosztika és telemetria | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 273 | Pacing és gazdasági mérés | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 274 | Anti-grind, várakozás és automatizálás | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 275 | Ritkaság, hosszú távú relevancia és balanszrevízió | `MEASUREMENT` | Célzott prototípus, mérőszám és acceptance | Függő rendszer megnyitásakor | `OPEN` |
| 278 | Korai vezetett szakasz és fő út | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 279 | Régióroadmap és elágazások | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 280 | Endgame, mastery és tartalmi mennyiség | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 281 | Első public demo | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 288 | Játékidentitás és célközönség | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 289 | Név, tagline és vizuális identitás | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 290 | Store page, screenshot és trailer | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |
| 291 | Demo-, platform- és lokalizációs kommunikáció | `OWNER` | Opciók + következmények + tulajdonosi jóváhagyás | Függő rendszer megnyitásakor | `OPEN` |

## Újranyitott vagy újrarögzítendő pontok

| Terület | Eredeti forrás | Jelenlegi állapot | Következő lépés |
|---|---|---|---|
| Analitika és automatikus adatküldés | 251C, 292C | `REOPEN-PROPOSAL`; jelenleg továbbra is tiltott | Külön privacy/telemetry dokumentum és explicit tulajdonosi döntés |

## Szabály

Nyitott pont csak akkor válthat `LOCKED` állapotra, ha a lezárás eredménye
bekerült a kanonikus auditba, a teljes auditpont-jegyzékbe és a fő
implementációs mátrixba is.
