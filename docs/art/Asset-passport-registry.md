# Readi World — asset passport registry

Frissítve: 2026-08-02  
Állapot: `I4-INTEGRATED / ACTIVE`

| Asset ID | Family | Passport path | Master rev | Export rev | Provenance | Art QA | Tech QA | Owner | Runtime | Status |
|---|---|---|---:|---:|---|---:|---|---|---|---|
| `world.tree.pine.harvestable.standard` | `family.environment.harvest-tree.pine` | `art-source/30_normalized/environment/world-tree-pine-harvestable-standard/world-tree-pine-harvestable-standard__r001__passport-draft.json` | `r001` | `e001` | AI-assisted + Photoshop prep | `PASS` | `PASS` | `D8-OWN-001A` | `PR #10 / 864b74b` | `INTEGRATED / ACTIVE` |
| `world.tree.pine.harvestable.standard.stump` | `family.environment.harvest-tree.pine` | `art-source/30_normalized/environment/world-tree-pine-harvestable-standard-stump/world-tree-pine-harvestable-standard-stump__r001__passport-draft.json` | `r001` | `e001` | AI-generated + Photoshop prep | `PASS` | `PASS` | `STUMP-R001` | `PR #10 / 864b74b` | `INTEGRATED / ACTIVE` |
| `world.shadow.tree.pine.harvestable.standard` | `family.environment.harvest-tree.pine` | `art-source/30_normalized/environment/world-shadow-tree-pine-harvestable-standard/world-shadow-tree-pine-harvestable-standard__r001__passport-draft.json` | `r001` | `e001` | self-authored procedural | `PASS` | `PASS` | `SHADOW-R001` | `PR #10 / 864b74b` | `INTEGRATED / ACTIVE` |

## Szabály

- egy stabil Asset ID pontosan egy aktív passporthoz mutat;
- state/variant csak a family spec szerint lehet közös passportban;
- `OWNER_APPROVED` nem jelent automatikus runtime-integrációt;
- `INTEGRATED` sorhoz manifest ID, runtime hash, report és evidence kötelező;
- `SUPERSEDED` passport megmarad és utódjára hivatkozik.
