# Readi World — D7 verziózott promptkönyvtár

Frissítve: 2026-08-02  
Állapot: `DONE v1` — `D7-OWN-001A`, `PIVOT-OWN-001A`  
Függőség: D4–D6 `DONE`

## 1. Cél

Ez a könyvtár másolható, verziózott képgenerálási briefeket ad úgy, hogy a
Readi World perspektívája, léptéke, fénye, anyagnyelve és technikai kimenete
assetcsaládok között is következetes maradjon.

A prompt nem acceptance-bizonyíték. A generált kép a D6 szerint `INBOX`, majd
master-, art QA-, normalizálási és technical QA-lépésen halad át.

## 2. Könyvtár

| Csomag | Dokumentum | Tartalom |
|---|---|---|
| globális | [00-global-blocks.md](prompt-packs/00-global-blocks.md) | stílus, kamera, fény, output, negatív és QA blokkok |
| karakter | [01-characters-and-animation.md](prompt-packs/01-characters-and-animation.md) | identity, gameplay direction, animation pose, portrait |
| environment | [02-resources-and-vegetation.md](prompt-packs/02-resources-and-vegetation.md) | fa, tuskó, ág, kő, gyűjthető resource |
| building | [03-buildings-and-states.md](prompt-packs/03-buildings-and-states.md) | identity, ruined, restoring, restored, emissive |
| ground | [04-ground-paths-and-tiles.md](prompt-packs/04-ground-paths-and-tiles.md) | seamless tile, transition, útmodul, variation patch |
| dekor | [05-decorations.md](prompt-packs/05-decorations.md) | kis propok és rendezett family variánsok |
| UI | [06-ui-icons-and-portraits.md](prompt-packs/06-ui-icons-and-portraits.md) | 9-slice panel, ikon, badge és portrébeágyazás |
| effekt | [07-effects-shadows-and-particles.md](prompt-packs/07-effects-shadows-and-particles.md) | kontaktárnyék, hit/pickup/craft/restoration effekt |
| napló | [Prompt-run-log-template.md](Prompt-run-log-template.md) | pontos prompt, modell, input, eredmény, hash és döntés |

## 3. Prompt összeállítási sorrend

Minden production prompt ebben a sorrendben épül:

```text
TASK
+ GLOBAL_STYLE_v1
+ CAMERA_GEOMETRY_D4_v1
+ LIGHTING_NEUTRAL_D5_v1
+ FAMILY_<NAME>_v1
+ SUBJECT_AND_STATE
+ COMPOSITION_AND_SCALE
+ OUTPUT_<PROFILE>_v1
+ NEGATIVE_GLOBAL_v1
+ NEGATIVE_<FAMILY>_v1
+ QA_REMINDER_v1
```

Blokk nem hagyható el azért, mert „a modell úgyis emlékszik rá”. Egy új chat,
modell vagy futás nem tekinthető korábbi vizuális memória folytatásának.

## 4. Változók

A `{{UPPER_SNAKE_CASE}}` mezőket futtatás előtt ki kell tölteni.

| Változó | Példa | Forrás |
|---|---|---|
| `{{ASSET_ID}}` | `world.tree.pine.standard` | D8 family spec |
| `{{SUBJECT}}` | `mature harvestable pine tree` | D8 brief |
| `{{STATE}}` | `healthy-standing` | family state contract |
| `{{VARIANT}}` | `broad-canopy-a` | family inventory |
| `{{DRAW_SIZE_WU}}` | `3.0 WU wide, 5.0 WU tall` | D4/D8 |
| `{{FACING}}` | `south-east` | D4 authored direction |
| `{{MATERIALS}}` | `aged timber, mossy stone` | D5/D8 |
| `{{REFERENCE_ROLES}}` | `REF-005 MATCH mood; REF-001 INSPIRE foliage` | D5 sheet |
| `{{OUTPUT_SIZE}}` | `1024×1536 source canvas` | D8/D6 |
| `{{SAFE_PADDING}}` | `64 px on every side` | D8 |
| `{{SPECIAL_AVOID}}` | `no fruit, no snow` | family/variant |

Üres változóval prompt nem fut production célra. Ha egy mező nem releváns,
`N/A — reason` kerül a prompt snapshotba.

## 5. Prompt ID és verzió

Formátum:

```text
PROMPT.<family>.<purpose>.vNNN
```

Példák:

- `PROMPT.character.gameplay-direction.v001`;
- `PROMPT.environment.harvest-tree.v001`;
- `PROMPT.building.restoration-state.v001`;
- `PROMPT.ground.seamless-base.v001`.

`vNNN` akkor nő, ha a prompt jelentése, blokksorrendje vagy acceptance-e változik.
Egy konkrét kitöltött futás külön Run ID-t kap: `PRUN-YYYYMMDD-NNN`.

## 6. Referenciaképek használata

- csak a D5 referencialap szerinti `MATCH`, `INSPIRE`, `AVOID` vagy
  `SCOPE-ONLY-LATER` szereppel;
- csatolt koncepció nem másolandó pixel-, layout- vagy assetpontossággal;
- ugyanazon family identityhez az elfogadott saját master az elsődleges vizuális
  input, a koncepciók csak art direction inputok;
- más játék neve vagy élő művész neve nem használható stílusparancsként;
- ha a generátor nem tudja megkapni a szükséges referencia-inputot, a futás
  `EXPLORATION`, nem production candidate.

## 7. Generálási stratégia

- egy futás lehetőleg egy assetet vagy egy szorosan kapcsolt state-et céloz;
- a modellel generált contact sheet ötletelésre jó, de külön képként újra kell
  készíteni a kiválasztott elemet;
- karakterirányok és animációframe-ek külön futásokból vagy kontrollált
  szerkesztésből készülnek, közös identity master alapján;
- building state-eknél az elfogadott base master szerkesztése előnyösebb, mint
  három független újragenerálás;
- seamless, alpha, 9-slice és sprite-sheet állítás technikai proof nélkül nem
  fogadható el;
- átlátszó hátteret a prompt kérhet, de a D6 normalizálásnak ténylegesen
  ellenőriznie és tisztítania kell.

### 7.1 Pivotkorlát

A prompt kérheti a teljes ground contactot, a tiszta paddinget és a vizuális
state-azonosságot, de nem képes exact pixel- vagy normalized pivotot bizonyítani.
A promptban szereplő pivotérték **target brief**, nem generátori acceptance. A
pontos pivotot a D6 normalized canvas + geometry sidecar + passport zárja le.

Ez a tisztázás nem változtatja meg a D7 promptarchitektúrát; megakadályozza, hogy
a `preserve pivot` szöveget automatikus technikai garanciának olvassuk.

## 8. Variációs fegyelem

Egy family futássorban egyszerre csak egy változó módosuljon, például:

- silhouette;
- state;
- material accent;
- damage/age;
- colorway;
- prop attachment.

Kamera, lépték, fény, pivot és globális stílus nem lehet „variáció”. A jó variant
ugyanazon játék része, nem új art direction.

## 9. D7 acceptance

- globális style/camera/light/output/negative/QA blokkok rendelkezésre állnak;
- hét elsődleges assetcsalád külön promptpackot kap;
- minden packben legalább egy teljes copy-paste prompt van;
- character identity/animation és building state konzisztencia külön védett;
- seamless ground és 9-slice UI nem kap hamis automatikus acceptance-et;
- prompt ID, verzió, Run ID, modell/tool, reference input és output hash naplózható;
- D6 passport provenance mezői kitölthetők a run logból;
- ismert játék/művész stílusának közvetlen másolása tiltott;
- D8 egyetlen familyhez exact változókat és outputméreteket tud rögzíteni;
- runtime- és assetmódosítás nem történt.

## 10. Tulajdonosi kapu

`D7-OWN-001` — A globális promptarchitektúra, a hét assetcsalád másolható
promptcsomagja, a negatív/outputblokkok, a reference-role használat, a
verziózás és a prompt-run napló elfogadható.

Elfogadott döntés: **`D7-OWN-001A`**, 2026-08-02.
