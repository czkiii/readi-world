# Readi World — D6 asset production pipeline

Frissítve: 2026-08-02  
Állapot: `DONE` — `D6-OWN-001A`, `PIVOT-OWN-001A`  
Függőség: D4 `DONE`, D5 `DONE`

## 1. Egyetlen cél

Minden grafikai asset reprodukálható úton jusson el a briefből vagy generálásból
a szerkeszthető masteren, normalizált képen, art- és technikai QA-n át a
manifestből aktiválható runtime-exportig úgy, hogy a forrás, a jogi eredet és a
rollback végig visszakereshető maradjon.

### Módosítható a D6 dokumentációs csomagban

- `docs/art/` D6 pipeline-, technical-, passport-, report- és registryfájljai;
- `art-source/README.md` mint a későbbi masterterület szerződése;
- dokumentációs kontroll- és evidencianyilvántartások.

### Védett

- `runtime/` teljes tartalma;
- a kilenc eredeti referenciakép;
- D1–D5 lezárt UX-, map-, geometria- és artdöntések;
- minden tényleges production master és export, amíg nincs külön D8/I4 csomag.

## 2. A három kötelező grafikai réteg

| Réteg | Igazságforrás erre | Példa | Runtime-ba kerülhet? |
|---|---|---|---|
| source/master | szerkeszthetőség, rétegek, maszkok, generálási forrás | PSD/PSB, KRA, AFDESIGN/AFPHOTO, ASEPRITE, eredeti PNG | nem |
| normalized | egységes vászon, színprofil, alpha, pivot körüli képgeometria | veszteségmentes sRGB RGBA PNG | nem közvetlenül |
| runtime export | betöltés, memória, atlasz, manifest URI | WebP vagy indokolt PNG/atlasz | csak jóváhagyva |

Runtime-exportból tilos mastert „visszafejteni”. Ha a master elveszett, az asset
`SOURCE-LOST` állapotú, és kiadási kockázatként kezelendő.

## 3. Projektközeli source-terület

A szerkeszthető masterek gyökere:

```text
ReadiWorldGameDeskopt/
  art-source/
    00_inbox/
    10_briefs/
    20_masters/<family>/<asset-id>/
    30_normalized/<family>/<asset-id>/
    40_review/<family>/<asset-id>/
    90_archive/<family>/<asset-id>/
    _registry/
  docs/
  runtime/
```

- `00_inbox`: beérkezett vagy generált, még nem megbízható anyag;
- `10_briefs`: jóváhagyott D7/D8 brief és prompt snapshot;
- `20_masters`: aktív szerkeszthető igazságforrás;
- `30_normalized`: veszteségmentes, technikailag egységes köztes képek;
- `40_review`: art/tech/owner review screenshot, contact sheet és report;
- `90_archive`: felülírt, de megőrzendő masterrevision;
- `_registry`: inventory- és hash-exportok, nem maga a kanonikus dokumentáció.

A nagy bináris mastereket nem kell automatikusan a runtime Git repositoryba
commitolni. A `runtime/` kizárólag jóváhagyott, optimalizált exportot kaphat külön
integrációs munkacsomagban.

## 4. Asset állapotgép

```text
INBOX
  → BRIEFED
  → GENERATED_OR_DRAWN
  → MASTERED
  → NORMALIZED
  → ART_QA_PASSED
  → TECH_QA_PASSED
  → OWNER_APPROVED
  → STAGED
  → INTEGRATED
```

Oldalállapotok: `REJECTED`, `REVISION_REQUIRED`, `SUPERSEDED`, `SOURCE-LOST`,
`LEGAL-HOLD`.

Állapotot csak bizonyíték léptethet tovább. A szép kép önmagában nem
`TECH_QA_PASSED`; a helyes pivot önmagában nem `ART_QA_PASSED`.

## 5. Azonosító és verziózás

Három külön számot nem szabad összekeverni:

- stabil logikai Asset ID, például `world.tree.pine.standard`;
- master revision: `r001`, `r002` — szerkesztési történet;
- export revision: `e001`, `e002` — ugyanazon jóváhagyott master más technikai
  exportja.

Ajánlott fájlnév:

```text
<asset-id-kebab>__master-r001.psd
<asset-id-kebab>__normalized-r001.png
<asset-id-kebab>__runtime-e001.webp
<asset-id-kebab>__review-r001.png
```

Az Asset ID nem tartalmaz fájlformátumot, atlasznevet, napszakot vagy DPR-t. Az
azonos ID alatti grafikai csere is új exportrevisiont, QA-t, reportot és hash-t
igényel.

### 5.1 Pivot nem képadat

A master PSD helper guide-ja csak szerkesztési segéd. A kanonikus exportgeometriát
a D8 family profile, majd az exact normalized exporthoz tartozó geometry sidecar
és asset passport tárolja. A runtime manifest v2 ebből kap normalized pivotot és
world-local footprint/interaction/occluder értéket. Látható pivotmarkert tilos a
runtime képre sütni; alpha boundsból pivot nem számítható.

## 6. Kötelező gyártási folyamat

1. **Munkacsomag:** egy assetcsalád, scope, védett fájlok, acceptance és rollback.
2. **Brief:** D4 scale/camera, D5 art, D7 prompt és D8 family paraméter rögzítése.
3. **Inbox:** eredeti generálás/rajz változatlan megőrzése, forrás és hash felvétele.
4. **Master:** rétegek, maszkok, pivot guide, safe padding és state-kapcsolat.
5. **Art QA:** D5 scorecard, normal/min/max zoom contact sheet, owner review.
6. **Normalizálás:** sRGB, méret, alpha, canvas, pivot és elnevezés ellenőrzése.
7. **Tech QA:** dimension, decoded memory, edge fringe, atlasz/9-slice/seam proof.
8. **Owner approval:** pontos masterrevision és review-kép jóváhagyása.
9. **Export staging:** runtime profile elkészítése; passport és report lezárása.
10. **I4 integráció:** export másolása runtime-ba, manifest/registry frissítés,
    automatikus teszt, screenshot, memória és rollback proof.

Egy körben csak egy assetcsalád változhat. Képalkotás, normalizálás és runtime
integráció külön ellenőrizhető lépés, még ha gyors egymásutánban történik is.

## 7. Master- és backup-szabály

- aktív master soha nem íródik felül visszaállítható revision nélkül;
- minden elfogadott revisionhoz preview, SHA-256 és inventory-bejegyzés tartozik;
- minimum két példány kell: projektközeli working copy és külön backuphely;
- release-képes assetnél ajánlott harmadik, eszközön kívüli vagy verziózott
  backup; az útvonal nem kerülhet public manifestbe;
- backup után próba-visszaolvasás vagy hash-egyezés szükséges;
- a runtime Git history nem helyettesíti a master backupot;
- a backup nem tartalmazhat kizárólag exportot master helyett.

## 8. Provenance és jogi eredet

Minden passport pontosan egy elsődleges eredetkategóriát kap:

- `SELF-AUTHORED`;
- `AI-GENERATED`;
- `AI-ASSISTED`;
- `LICENSED`;
- `REFERENCE-ONLY` — runtime-exportként nem aktiválható.

Kötelező a készítő/eszköz, modell vagy szoftververzió, promptverzió, referencia-
ID és címke, kézi módosítás, licenc/felhasználási feltétel, dátum és hash. Hiányzó
vagy kétes eredet `LEGAL-HOLD`; release-be és public screenshotba nem kerülhet.

## 9. QA és jóváhagyási kapuk

| Kapu | Minimum bizonyíték |
|---|---|
| brief ready | D4/D5/D7/D8 hivatkozás és outputlista |
| art QA | D5 legalább 18/20, hard fail nélkül, owner-review kép |
| technical QA | valid méret/alpha/pivot; memória; family-spec proof |
| owner approval | pontos asset ID + masterrevision + review-hash |
| staging | passport, report, runtime export hash, rollback export |
| integration | manifest validáció, automated check, golden screenshot, memory report |

## 10. Hibakezelés és rollback

- hibás art: `REVISION_REQUIRED`, masterből javítás vagy újragenerálás;
- hibás export: master változatlan, új `eNNN` export;
- hibás manifest/integráció: előző export és manifest visszaállítható;
- hiányzó runtime asset: deklarált fallback, a logikai World State megmarad;
- kompatibilitást törő ID-váltás: alias, migráció vagy új ID külön döntéssel;
- rollback nem törli az új mastert, csak a runtime aktiválást fordítja vissza.

## 11. D6 acceptance

- source/master, normalized és runtime export szétválik;
- fix projektközeli mastergyökér és könyvtárszerződés van;
- stabil ID, masterrevision és exportrevision elkülönül;
- file format, alpha, szín, atlasz, 9-slice és memory szabály rögzített;
- source-master inventory, passport registry és kitölthető sablon rendelkezésre áll;
- provenance, licenc, prompt/reference kapcsolat kötelező;
- art QA, tech QA, owner approval és integráció külön kapu;
- backup, hash, report és rollback ismételhető;
- egy assetcsalád/WIP szabály megmarad;
- D7 pontos output- és provenance-blokkokat tud örökölni;
- tényleges runtime- vagy assetmódosítás nem történt.

## 12. Tulajdonosi jóváhagyási kapu

`D6-OWN-001` — A teljes source/master → normalized → runtime export folyamat,
projektközeli `art-source/` struktúra, verziózás, technikai export, passport,
provenance, backup, QA, report és rollback szerződés elfogadható.

Elfogadott döntés: **`D6-OWN-001A`**, 2026-08-02.
