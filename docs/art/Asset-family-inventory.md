# Readi World — asset family inventory

Frissítve: 2026-08-02  
Állapot: `I4-DONE / FAMILY-ACTIVE`

| Family ID | Family | Scope/output | Role/state | Milestone | Függőség | Production kész | Státusz |
|---|---|---:|---|---|---|---:|---|
| `family.environment.harvest-tree.pine` | standard harvestable pine proof | 3: standing + matching stump + contact shadow | harvestable / depleted / presentation | P1, D8/I4 | D4–D7; `D8-GAP-001` lezárva | 3/3 owner-approved production asset | `INTEGRATED / ACTIVE` — PR #10, `864b74b` |
| `family.environment.loose-wood` | földről gyűjthető ág/fa | P1 budget szerint 3 variant | pickup | P1 | külön family spec | 0 | `PLANNED` |
| `family.building.forester-hut` | ruined/restoring/restored landmark | 3 state | restoration building | P1 | külön family spec | 0 | `PLANNED` |
| `family.ground.village-forest` | meadow, forest floor, transition/path | D8 előtt pontosítandó | ground/path | P1 | 3×3 proof | 0 | `PLANNED` |
| `family.character.player-base` | identity, idle, walk, first work | D8 előtt pontosítandó | player | P1 | animation proof | 0 | `PLANNED` |
| `family.ui.p1-shell` | panel, ikon és state assets | D2/D8 szerint | UI | P1 | 9-slice/size proof | 0 | `PLANNED` |

## Megjegyzés

A D8 pine proof a P1 nagyfa-budget későbbi négy kötelező variánsából egyetlen
standard identityt készít elő. A három szükséges output owner-approved és D6
technikai QA-n átment; runtime-aktiválásuk kizárólag a külön I4 csomagban történhet.
