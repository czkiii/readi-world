# Readi World — D5 art direction contract

Frissítve: 2026-08-02  
Állapot: `DONE` — `D5-OWN-001A`  
Kapcsolt reference sheet: `docs/art/reference-sheets/Canonical-reference-sheet.md`

## 1. North-star mondat

**Readi World egy meleg, cozy, kézzel festett/storybook világ, amely tiszta
sziluettekkel, puha térfogattal és természetes anyagokkal mutatja meg, hogyan
válik egy csendes, elhagyott hely a játékos munkájától élő és személyes
otthonná.**

Ez a mondat minden assetcsalád, UI-elem, effekt, prompt és vizuális QA közös
kiindulópontja.

## 2. Érzelmi és vizuális pillérek

| Pillér | Vizuális következmény | Nem jelentheti |
|---|---|---|
| `COZY` | meleg természetes színek, puha formák, emberi lépték, nyugodt animáció | cukormázas túlszaturáltság vagy infantilis játékosság |
| `HANDCRAFTED` | festett ecsetérzet, enyhe organikus szabálytalanság, anyagkarakter | zajos fotótextúra vagy következetlen AI-részlet |
| `READABLE` | erős silhouette, világos entrance/path/interaction tér, mobilon is tiszta forma | lapos, részlettelen clipart |
| `GROUNDED FANTASY` | ismerős fa, kő, vakolat, növény és eszköz; enyhén idealizált arány | sci-fi, neon, high-fantasy túlzás vagy történelmileg merev rekonstrukció |
| `REMEMBERS YOU` | ugyanazon hely tartós before/after állapotai, javított út, fény, növény és prop | teljesen új térkép betöltése minden fejlődési állapothoz |
| `CALM DEPTH` | puha térfogat, rétegzett növényzet, finom atmoszféra | ködbe, bloom-ba vagy effektzajba rejtett játéktér |

## 3. Formanyelv

### 3.1 Részlethierarchia

Javasolt vizuális arány egy asseten vagy kis kompozíción belül:

- `60%` nagy, tiszta tömeg és silhouette;
- `30%` közepes szerkezeti részlet;
- `10%` finom textúra, kopás, levél, szeg vagy dísz.

A finom részlet nem változtathatja meg a footprintet, interaction anchort vagy
state-olvashatóságot. Normál `20 PPWU` zoomon először a nagy tömegeknek és az
állapotnak kell olvashatónak lennie.

### 3.2 Él- és kontúrkezelés

- nincs minden objektum körül kemény fekete outline;
- silhouette elválasztását értékkülönbség, puha occlusion, anyagváltás és
  szükség esetén vékony színezett edge adja;
- foreground gameplay object kissé tisztább, hátterelem lágyabb lehet;
- apró dekor nem lehet kontrasztosabb a fő targetnél;
- kontúr vastagsága nem nőhet eszközpixellel, a D4 draw scale-hez igazodik.

### 3.3 Alaknyelv

| Család | Domináns alak |
|---|---|
| ember/karakter | lágy, enyhén kerekített, barátságos arány, tiszta kéz/tool |
| fák/növények | organikus csoportok, nagy lombtömeg + közepes cluster + kevés levélrészlet |
| épületek | stabil alsó tömeg, olvasható tető és déli bejárat, kézzel épített enyhe szabálytalanság |
| kő/szikla | lekerekített, tömbös, nem tűéles low-poly facet |
| utak/ground | alacsony kontrasztú alap, organikus edge, ritka fókuszpont |
| UI | lekerekített, sötét erdőzöld panel, meleg világos tartalom, arany fókusz |
| effekt | rövid, puha ív, kevés nagyobb részecske, nem konfetti- vagy kaszinóhatás |

## 4. Színrendszer

A hexértékek **anchor swatchok**, nem kötelező lapos kitöltőszínek. A festett
asset tartalmazhat hue/value variációt, de nem távolodhat el úgy, hogy a család
más játékból származónak tűnjön.

### 4.1 World anchor paletta

| Token | Hex | Szerep |
|---|---|---|
| `RW-DEEP-FOREST` | `#183328` | legsötétebb természetes mélység, UI/world kapcsolat |
| `RW-PINE` | `#2E563B` | fenyő, sötétebb lomb, keret |
| `RW-MOSS` | `#637B3F` | moss, középtónusú növény és accent |
| `RW-MEADOW` | `#8EA65B` | naposabb grass/meadow alapszín |
| `RW-LICHEN` | `#B4BA78` | világos természetes highlight |
| `RW-PARCHMENT` | `#F0E2BE` | meleg világos UI/text és vakolathighlight |
| `RW-WARM-GOLD` | `#D4A347` | jutalom, fókusz, napfényes accent |
| `RW-TIMBER` | `#785034` | faanyag középtónus |
| `RW-DARK-WOOD` | `#493526` | mély fa, szerkezeti árnyék |
| `RW-CLAY-ROOF` | `#B5653F` | terrakotta, meleg építészeti fókusz |
| `RW-STONE` | `#85867A` | semleges kő |
| `RW-COOL-STONE` | `#66716D` | árnyékos/ködös kővariáns |
| `RW-WATER` | `#347985` | későbbi víz/part, nem P1-kötelezettség |
| `RW-NIGHT-BLUE` | `#19283D` | runtime éjszakai mélység |

### 4.2 UI és funkcionális paletta

| Token | Hex | Használat |
|---|---|---|
| `UI-PANEL` | `#102B22` | sötét, enyhén áttetsző panelalap |
| `UI-PANEL-RAISED` | `#1A3A2D` | kiemelt kártya/sheet |
| `UI-BORDER` | `#6E8353` | puha keret és separator |
| `UI-TEXT` | `#F2E7CA` | elsődleges szöveg |
| `UI-TEXT-MUTED` | `#C6C3A9` | másodlagos szöveg |
| `UI-ACCENT` | `#D6A64B` | fókusz, tracked goal, kiválasztás |
| `UI-SUCCESS` | `#7FA34B` | success ikon + szöveg, nem egyedüli csatorna |
| `UI-WARNING` | `#D08D39` | warning ikon + szöveg |
| `UI-ERROR` | `#B8564D` | error ikon + szöveg |
| `UI-LOCKED` | `#8C8E82` | locked state ikon + ok |

A végleges UI-kontrasztot és colorblind-safe párokat renderelt D2 komponensen
kell mérni. A tokennév és funkció stabilabb, mint egy később finomított hex.

## 5. Szaturáció, érték és fókusz

- alapvilág közepesen telített, természetes;
- legtelítettebb színt a gameplay-fókusz, meleg fény vagy milestone kaphatja;
- háttér- és boundary foliage kissé hűvösebb/sötétebb lehet;
- interactable resource nem neon glow-val, hanem silhouette-tel, környezeti
  spacinggel, finom highlighttal és D2 feedbackkel válik olvashatóvá;
- romos állapot kisebb szaturációt, több hideg/semleges anyagot és vizuális
  rendezetlenséget használhat;
- restored állapot melegebb, tisztább és élőbb, de nem ugrik más art style-ba;
- kritikus UI-state nem csak hue-különbség.

## 6. Anyagnyelv

| Anyag | Kezelés | Kerülendő |
|---|---|---|
| timber | széles, festett erezet; kopott él; meleg középtónus | fotórealista mikrozaj, műanyag fény |
| plaster | matt, enyhén foltos, nagy nyugodt felület | steril fehér vagy túlrepedezett zaj |
| stone | lekerekített tömeg, kevés nagy facet, moss/age accent | éles low-poly kristály minden kövön |
| roof tile/shingle | ismétlődés megtörve 2–4 nagy variációval | minden cserép külön kontrasztos részlet |
| metal | sötét, enyhén öregített, kis highlight | chrome, sci-fi kék specular |
| foliage | nagy lombmassza, közepes cluster, kevés finom levél | egyenként rajzolt zajos levéltenger |
| ground | alacsony frekvenciájú festett alap + kontrollált variation patch | erős középpont, varrat, ismétlődő virágminta |
| cloth/banner | puha festett redő, meleg tompa accent | fotós textúra vagy merev műanyag |

## 7. Fény- és napszakszerződés

### 7.1 Production master

- semleges, melegbe enyhén hajló nappali alapszín;
- puha, felső-bal irányból olvasható key light;
- kis kontaktárnyék és helyi ambient occlusion;
- nincs hosszú, visszavonhatatlan baked cast shadow;
- nincs erős reggel/este/éjszaka tint a persistent sprite-ban;
- emissive ablak, lámpa vagy tűz külön role/state lehet.

### 7.2 Runtime időprofilok

| Profil | Vizuális irány | Assetduplikáció |
|---|---|---|
| Morning | friss, enyhén arany, hűvös árnyék | nincs teljes duplikáció |
| Afternoon | legsemlegesebb és legolvashatóbb masterközeli állapot | nincs |
| Evening | melegebb amber key, mélyebb zöld/kék árnyék | emissive opcionális |
| Night | kontrollált kék mélység, meleg lámpafókusz, silhouette megmarad | emissive/ablak variáns megengedett |
| Weather | tompított kontraszt, köd/eső külön réteg | persistent object nem újrafestendő |

A runtime tint nem moshatja össze az UI-state-et, targetet, entrance-t vagy
pathot. Night proofban a játék nem lehet egyszerűen „sötét nappali screenshot”.

## 8. Karakter- és portréképirány

- vizuális magasság és facing a D4 scale sheet szerint;
- barátságos, enyhén stilizált testarány; fej kb. a teljes magasság `25–30%`-a;
- szem és mimika mobilméreten olvasható, de nem extrém anime/chibi;
- kéz, tool és munkapóz silhouette-ben érthető;
- ruházat természetes anyagú, rétegezett, cozy practical;
- színblokkok nagyok és tiszták, mikrorészlet csak közelibb portrén;
- portrait azonos character identityt, hajformát, színeket és jellegzetes
  részleteket tart, de nem egyszerű felnagyított gameplay sprite;
- 8 displayed/5 authored direction; tükrözés csak a D4 szabály szerint;
- skin tone, haj és testalkat változatok ugyanazt a világ- és fénykontraktust
  használják;
- nincs fotórealista bőr, műanyag 3D-render vagy generált extra kéz/tool.

## 9. Növény-, kő- és resource-irány

- fák silhouette-je már lombszinten különbözzön, ne csak levélszínben;
- standard harvest tree trunk approach és ground pivot tisztán olvasható;
- boundary tree lehet nagyobb/sűrűbb, de nem tűnhet használható P1 node-nak, ha
  nincs interaction role-ja;
- stump ugyanazon trunk pivotra illeszkedik;
- pickup branch kis méreten is felismerhető, de nem világít neonként;
- rock family tömbös, puha, földbe ülő; nem minden kő ritka kristály;
- undergrowth a járható út széleit segíti, nem rejti el a collisiont;
- variation ugyanazon family formanyelvét és D4 scale range-ét tartja.

## 10. Épület- és restoration-irány

- kézzel épített, praktikus, meleg és kissé tömbös architecture;
- olvasható tetőforma, déli bejárat és működési terület;
- enyhe organikus aszimmetria megengedett, footprint és entrance nem sodródik;
- Forester Hut `ruined`, `restoring`, `restored` state ugyanazon D4 ground
  anchoron és kompozícióban készül;
- romos state: hiányzó elem, elhasználódás, hidegebb érték, kontrollált
  overgrowth — nem felismerhetetlen törmelékhalom;
- restoring state: scaffold, progress overlay vagy részleges javítás; nem új
  épülettípus;
- restored state: javított szerkezet, meleg fény, tisztább környezet, működő
  prop — nem azonnali palota;
- további tier csak későbbi building family scope;
- Player Home és más épület nem másolhatja át változtatás nélkül a Forester Hut
  silhouette-jét.

## 11. Ground, út és environment composition

- village meadow és forest floor külön material family, közös projekcióval;
- ground low-contrast marad, hogy karakter és resource olvasható legyen;
- főút világosabb/value-separated gerinc, organikus edge-dzsel;
- path nem sárga „tutorial csík”; természetes kopás, kő, fűszél vezeti;
- seamless állítás csak 3×3 proof után fogadható el;
- variation patch megtöri az ismétlést, de nem hoz új collisiont;
- virág és kis prop klaszter ritmusban jelenik meg, nem egyenletes zajként;
- D3 critical corridor körül alacsonyabb sűrűség;
- restored állapot ugyanazon groundon finom tisztulást és életet ad, nem teljes
  textúracserét.

## 12. Vizuális sűrűség és hierarchia

| Zóna/állapot | Kezdő cél |
|---|---|
| Arrival/Village start | nyitott, kb. `35–45%` vizuális kitöltöttség; főút azonnal olvasható |
| Workyard | egy erős workbench fókusz + kevés támogató prop |
| Forest Edge | közepes sűrűség, tiszta training tree és loose resource spacing |
| Forest Grove | gazdagabb `55–65%` érzet, de járható loop és trunk approach tiszta |
| Forester Hut ruined | landmark dominál, kontrollált overgrowth/törmelék |
| Forester Hut restored | `10–20%`-kal gazdagabb környezeti érzet, nem assetdarabszám-végtelenítés |
| Boundary | sűrűbb, sötétebb, alacsonyabb részletprioritás |

Egy képernyőkivágásban elsődlegesen egy fő gameplay-fókusz, 2–3 másodlagos
landmark/útjel és sokkal halkabb háttérréteg legyen.

## 13. UI-, ikon- és portrépanel-irány

### UI-panelek

- sötét deep-forest alap, enyhe áttetszőség;
- meleg parchment text;
- moss border és gold focus;
- lekerekített sarkok, puha belső/alsó árnyék;
- kevés dekoratív vonal, nagy tiszta tartalomterület;
- nincs sci-fi glassmorphism, neon edge vagy fényes mobilkaszinó-panel;
- panelasset 9-slice/skalázható rendszerhez készül, nem fix szövegméretre;
- generált szöveg, szám vagy localization nincs a bitmapben.

### Ikonok

- egy erős silhouette, 1–3 belső nagy részlet;
- azonos nézeti logika és fényirány;
- tompa természetes alapszín + state overlay;
- locked/success/error nem csak színnel, külön jellel is;
- kis HUD-méreten screenshot proof kötelező;
- resource icon és world sprite rokon, de nem azonos kivágás kötelezően.

### Tipográfiai irány

- logó/fejezetcím: meleg, storybook serif vagy humanista display, nem gothic;
- UI/body: nyitott betűformájú humanista rounded sans, több súllyal;
- Latin Extended, számok, írásjelek és későbbi lokalizáció támogatása kötelező;
- exact font csak licenc-, performance- és kis méretű proof után zárható;
- szöveg nem válhat dekoratív textúrává vagy túl vékony arany felirattá.

## 14. Effekt-, árnyék- és részecskeirány

- pickup: rövid, kicsi, targethez kötött;
- work hit: 2–5 nagyobb olvasható chip/leaf/spark, nem részecskefelhő;
- craft: puha material/tool feedback, nem mágikus robbanás;
- restoration: meleg fény, por/levél és környezeti reakció, rövid milestone;
- shadow: földelt, puha, külön role; nem kemény fekete folt;
- effekt nem takarhat collisiont, targetet vagy pathot;
- Reduced Motion variáns kevesebb mozgást, rövidebb ívet vagy statikus highlightot
  használ, információvesztés nélkül;
- nincs screen shake alapértelmezett gatheringhez;
- blend és atlaszbudget D6/D8 specifikáció.

## 15. Tiltott stíluseltérések

Hard fail, ha egy production asset:

- neon vagy cyberpunk színvilágú;
- kemény pixel-art;
- fotórealista/PBR render;
- fényes, generikus 3D mobile-ad megjelenés;
- lapos corporate vector/clipart;
- extrém anime/chibi irány;
- minden élen vastag fekete kontúrt használ;
- erős fisheye, eye-level vagy eltérő izometrikus perspektíva;
- egyetlen napszak erős fényét visszavonhatatlanul belefesti;
- zajos mikrorészlettel elveszíti a silhouette-et;
- generált szöveget, vízjelet, logót vagy UI-t tartalmaz;
- levágja a D4 ground-contact pivotot;
- a family más state-jeihez képest méretet, footprintet vagy entrance-t vált;
- más ismert játék konkrét assetjét vagy védett stílusazonosítóját próbálja
  közvetlenül lemásolni.

## 16. Art QA scorecard

Minden jelölt 0–2 pontot kap dimenziónként:

| Dimenzió | 0 | 1 | 2 |
|---|---|---|---|
| projection | eltér | kisebb korrekció | D4-kompatibilis |
| scale/pivot | hibás | normalizálható | kész meta szerint |
| silhouette | mobilon szétesik | részben olvasható | azonnal olvasható |
| palette | idegen | közelít | tokenrendszerbe illik |
| material | műanyag/zajos | vegyes | festett, természetes |
| lighting | erősen baked | javítható | semleges master |
| family consistency | más stílus | részben egységes | azonos család |
| gameplay state | félreérthető | segítséggel olvasható | magától olvasható |
| mobile detail | túl finom/zajos | kompromisszumos | normal zoomon tiszta |
| provenance/cleanliness | hibás/vízjeles | tisztítandó | dokumentálható és tiszta |

Elfogadási minimum: `18/20`, és projection, scale/pivot, silhouette,
provenance/cleanliness dimenzióban nem lehet `0`. A score nem írhatja felül a
hard fail listát.

## 17. D7 promptvocabulary handoff

A verziózott promptkönyvtár minden family promptjában használja vagy örökli:

### Globális pozitív jelentésblokk

```text
warm cozy hand-painted storybook game art,
clean readable silhouette, soft dimensional volume,
natural handcrafted materials, restrained natural saturation,
large clear shapes with controlled medium detail,
mobile-game readability without generic mobile-ad gloss,
neutral daylight master, soft upper-left key light,
grounded contact shadow, consistent Readi World art direction
```

### Globális negatív jelentésblokk

```text
no neon, no harsh pixel art, no photorealism,
no glossy generic 3D mobile-ad render, no corporate vector clipart,
no extreme anime or chibi proportions, no thick black outline on every edge,
no fisheye or eye-level perspective, no baked text, logo or watermark,
no strong time-of-day tint, no cropped ground contact,
no noisy microdetail, no floating object, no mismatched art style
```

A D7 modell- és családspecifikus, másolható prompttá alakítja ezt. A D5 blokk
jelentése kanonikus; a prompt pontos szóhasználata verziózható.

## 18. D6–D8 továbbadás

### D6 kapja

- master/runtime export szétválasztás;
- alpha, 9-slice, atlasz, file format és tömörítés;
- asset passport, provenance és backup;
- QA-score és golden screenshot folyamat;
- prompt-, source- és normalized fájlok helye.

### D7 kapja

- globális stílus- és negatív blokk;
- D4 fix geometria-/kamerablokk;
- family promptok változómezői;
- lighting, material, state és output blokkok;
- copy-paste promptcsokor és verzióazonosító.

### D8 kapja

- egy kiválasztott family konkrét D4 mérete;
- state-, variáns- és darabszám;
- exact promptok és negatív promptok;
- source/output fájlnév;
- pivot, footprint, atlasz és acceptance;
- első valódi normalizálási és runtime-integrációs proof.

## 19. D5 acceptance

- egyértelmű north-star, érzelmi és vizuális pillérek;
- world és UI palettatokenek;
- anyag-, él-, silhouette- és részlethierarchia;
- semleges masterfény és runtime napszaklogika;
- karakter, environment, building, ground, UI és effect családirány;
- visual density és restoration before/after szabály;
- hard fail lista és 20 pontos QA scorecard;
- D4 perspektíva/scale változatlan;
- a kilenc referencia szerepe nem mosódik össze;
- D7 számára pozitív/negatív promptjelentésblokk rendelkezésre áll;
- D6 és D8 technikai handoff egyértelmű;
- tulajdonosi elfogadás után D5 `DONE`, D6 `READY`.

## 20. Tulajdonosi jóváhagyási kapu

`D5-OWN-001` — A teljes art direction, anchor paletta, anyag- és fényrendszer,
karakter/environment/building/UI/effect irány, reference hierarchy, tiltólista és
QA-scorecard a kapcsolt kanonikus reference sheettel együtt elfogadható.

Elfogadott döntés: **A — `D5-OWN-001A`**, 2026-08-02.
