# Readi World — pine harvest tree family report r001

Frissítve: 2026-08-02  
Állapot: `PASS / I4-MERGED-AND-DEPLOYED`

## Scope contract

| Mező | Érték |
|---|---|
| Report ID | `ASSET-REPORT-D8-PINE-R001` |
| Family/package | `family.environment.harvest-tree.pine` / `package.p1.forest.core` |
| Egyetlen cél | standing pine + matching stump + külön contact shadow lezárása I4 előtt |
| Módosítható fájlok | `art-source/`, assetleltárak és D8 állapotdokumentumok |
| Védett fájlok | `runtime/`, manifest, registry és gameplay |
| Acceptance | 3/3 owner approval, technikai QA, exact pivot/canvas, budget, passport és visszaállítható master |
| Regressziós ellenőrzések | PNG/WebP pixelazonosság, alpha/bounds/postflight, master-backup hash, runtime dirty-state |
| Rollback baseline | a három hash-azonos `art-source/90_archive/` PSD backup |

## Inventory delta

| Asset ID | Master rev | Export rev | Állapot | File KiB | Decoded MiB | Owner gate |
|---|---:|---:|---|---:|---:|---|
| `world.tree.pine.harvestable.standard` | `r001` | `e001` | staged | 110.05 | 0.656 | `D8-OWN-001A` |
| `world.tree.pine.harvestable.standard.stump` | `r001` | `e001` | staged | 6.01 | 0.047 | `STUMP-R001` |
| `world.shadow.tree.pine.harvestable.standard` | `r001` | `e001` | staged | 0.65 | 0.031 | `SHADOW-R001` |

## Budget

| Mutató | Eredmény | Keret | Kapu |
|---|---:|---:|---|
| Runtime file size | 116.71 KiB | 380 KiB family target | `PASS` |
| Estimated decoded texture | 0.734 MiB | D8 family budget 0.734 MiB | `PASS` |
| Asset/output count | 3 | pontosan 3 | `PASS` |

Mindhárom runtime WebP lossless, és dekódolva pixelazonos a megfelelő normalized PNG-vel.

## Visual QA

- standing pine: `D8-OWN-001A`, contact sheet ellenőrizve;
- stump: `STUMP-R001`, a standing pine-nal mért family range-en belül;
- shadow: `SHADOW-R001`, puha, iránysemleges contact shadow, helyes ground contact;
- canvas/pivot: standing `(384×448; 192,416)`, stump `(128×96; 64,80)`, shadow `(128×64; 64,48)`;
- mindhárom output owner-approved.

## Technical and regression QA

- alpha, dimension, bounds és pivot postflight: `3/3 PASS`;
- normalized PNG → lossless WebP pixel equality: `3/3 PASS`;
- PSD master → helyi archive backup SHA-256 azonosság: `3/3 VERIFIED`;
- passport és geometry JSON parse: `PASS`;
- runtime/manifest/registry: I4 ágon integrálva, szemantikus 3/3 role resolution;
- World State és save compatibility: `UNCHANGED`;
- iPhone Safari/Home Screen és runtime performance: `I4 acceptance`, még nem futott.

## Result

`PASS — I4 MERGED AND GITHUB PAGES DEPLOYED`

Runtime evidence: PR #10, squash merge `864b74b`; GitHub Pages deployment
`30767213431` success; az élő manifest és mindhárom asset HTTP 200. Nyitott
follow-up kizárólag a fizikai iPhone Safari/Home Screen smoke.
