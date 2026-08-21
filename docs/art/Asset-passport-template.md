# Readi World — D6 asset passport template

Frissítve: 2026-08-02  
Állapot: `DONE` — D6 template, `D6-OWN-001A`

Minden production Asset ID egy saját passportpéldányt kap. Több runtime frame
vagy state ugyanazon passportban csak akkor szerepelhet, ha egy logikai family
spec egyértelműen összetartozónak definiálja.

## Identity

| Mező | Érték |
|---|---|
| Asset ID | `TODO` |
| Display name | `TODO` |
| Family ID | `TODO` |
| Package ID | `TODO` |
| Role(s) | `TODO` |
| Tag(s) | `TODO` |
| State/variant | `TODO` |
| Owner | `TODO` |
| Status | `INBOX` |

## Contract

| Mező | Érték |
|---|---|
| D4 scale/profile | `TODO` |
| Draw size WU | `TODO` |
| Source density | `64 px/WU` vagy indokolt eltérés |
| Ground pivot | `TODO` |
| Target pivot px / normalized | `TODO / TODO` |
| Actual normalized-export pivot px / normalized | `TODO / TODO` |
| Geometry sidecar path + SHA-256 | `TODO` |
| Logical footprint | `TODO` |
| Interaction anchor | `TODO` |
| Occluder/sort metadata | `TODO` |
| D5 art direction/reference role | `TODO` |
| D7 prompt ID/version | `TODO` |
| D8 family spec | `TODO` |

## Provenance

| Mező | Érték |
|---|---|
| Origin category | `SELF-AUTHORED / AI-GENERATED / AI-ASSISTED / LICENSED / REFERENCE-ONLY` |
| Creator/operator | `TODO` |
| Tool/model/software + version | `TODO` |
| Prompt snapshot/path + version | `TODO` |
| Seed/job/reference input | `TODO/N/A` |
| Reference IDs + MATCH/INSPIRE/AVOID | `TODO` |
| Manual edits | `TODO` |
| Licence/terms/source URL | `TODO` |
| Creation date | `TODO` |
| Provenance review | `PENDING` |

## Source and revisions

| Mező | Érték |
|---|---|
| Inbox original path + SHA-256 | `TODO` |
| Active master path | `TODO` |
| Master revision + SHA-256 | `r001 / TODO` |
| Master format/software | `TODO` |
| Normalized path + SHA-256 | `TODO` |
| Preview/contact sheet | `TODO` |
| Backup location ID + verification date | `TODO` |
| Supersedes/superseded by | `N/A` |

## Runtime export

| Mező | Érték |
|---|---|
| Export revision | `e001` |
| Staged/runtime path | `TODO` |
| Format/profile | `TODO` |
| Width × height | `TODO` |
| Alpha mode/color profile | `straight / sRGB` |
| File bytes | `TODO` |
| Estimated decoded MiB | `TODO` |
| Atlas/frame/9-slice metadata | `N/A/TODO` |
| Runtime SHA-256 | `TODO` |
| Fallback ID | `TODO/N/A` |

## QA and approval

| Kapu | Eredmény | Bizonyíték | Dátum/tulajdonos |
|---|---|---|---|
| D5 art QA /20 | `PENDING` | `TODO` | `TODO` |
| Hard fail review | `PENDING` | `TODO` | `TODO` |
| Technical QA | `PENDING` | `TODO` | `TODO` |
| Normal/min/max zoom | `PENDING` | `TODO` | `TODO` |
| Family-specific proof | `PENDING` | `TODO` | `TODO` |
| Owner approval | `PENDING` | `TODO` | `TODO` |
| Manifest validation | `PENDING` | `TODO` | `TODO` |
| Device/memory proof | `PENDING` | `TODO` | `TODO` |

## Rollback

| Mező | Érték |
|---|---|
| Previous runtime export/hash | `TODO/N/A` |
| Previous manifest commit/SHA | `TODO/N/A` |
| Fallback behavior | `TODO` |
| Recovery instruction | `TODO` |

## Zárási szabály

`INTEGRATED` csak akkor adható, ha minden kötelező mező kitöltött, a passport a
runtime export pontos hashére mutat, a report és regresszió sikeres, és az asset
nem `LEGAL-HOLD` vagy `SOURCE-LOST` állapotú.
