# Readi World — source master inventory

Frissítve: 2026-08-02  
Állapot: `D8-FAMILY-VERIFIED / 3 ACTIVE MASTERS`

Ez a leltár a szerkeszthető masterek és backupjuk indexe. Nem helyettesíti az
assetről assetre kitöltött passportot.

| Asset ID | Family | Active master | Revision | SHA-256 | Preview | Backup ID / verified | Status | Updated |
|---|---|---|---:|---|---|---|---|---|
| `world.tree.pine.harvestable.standard` | `family.environment.harvest-tree.pine` | `art-source/20_masters/environment/world-tree-pine-harvestable-standard/world-tree-pine-harvestable-standard__master-r001.psd` | `r001` | `4E851FBADB19CDA346BD3E72306F160040260E04D5A1C966F88EC951C029561D` | `art-source/40_review/environment/world-tree-pine-harvestable-standard/world-tree-pine-harvestable-standard__r001__qa-contact-sheet.png` | `world-tree-pine-harvestable-standard__master-r001__backup.psd / VERIFIED` | `ACTIVE` | 2026-08-02 |
| `world.tree.pine.harvestable.standard.stump` | `family.environment.harvest-tree.pine` | `art-source/20_masters/environment/world-tree-pine-harvestable-standard-stump/world-tree-pine-harvestable-standard-stump__master-r001.psd` | `r001` | `C9DD9820851D57E35CC6752A2AFC108404EA0DAE1FF4EA22373F12678A13C2FF` | `art-source/40_review/environment/world-tree-pine-harvestable-standard-stump/world-tree-pine-harvestable-standard-stump__r001__qa-contact-sheet.png` | `world-tree-pine-harvestable-standard-stump__master-r001__backup.psd / VERIFIED` | `ACTIVE` | 2026-08-02 |
| `world.shadow.tree.pine.harvestable.standard` | `family.environment.harvest-tree.pine` | `art-source/20_masters/environment/world-shadow-tree-pine-harvestable-standard/world-shadow-tree-pine-harvestable-standard__master-r001.psd` | `r001` | `51D96CFE1E4B1323E074BFECDF748A77D44D586CF8ACF8D66C960E900CAD8250` | `art-source/40_review/environment/world-shadow-tree-pine-harvestable-standard/world-shadow-tree-pine-harvestable-standard__r001__qa-contact-sheet.png` | `world-shadow-tree-pine-harvestable-standard__master-r001__backup.psd / VERIFIED` | `ACTIVE` | 2026-08-02 |

## Szabály

- új sor csak stabil Asset ID és D8 family spec után;
- útvonal a projekt gyökeréhez képest relatív;
- minden revision új hash-t kap, régi sor nem törlődik, hanem `SUPERSEDED`;
- backup `VERIFIED` csak hash vagy próba-visszaolvasás után;
- `REFERENCE-ONLY` fájl nem lehet aktív production master.
