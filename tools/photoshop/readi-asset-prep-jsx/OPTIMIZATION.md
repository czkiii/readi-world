# Production indítás — kerettakarékos út

1. Az egyszer beállított `ReadiWorldScript` Photoshop Action kizárólag a
   `tools/photoshop/ReadiWorldScript.jsx` dispatchert hívja.
2. Production assetnél nincs `File > Scripts > Browse...`.
3. Photoshop előtt a path-plan alapján `asset-prep-scaffold.ps1`, majd
   `asset-prep-check.ps1 -Mode Preflight` fut.
4. Photoshop után ugyanaz az ellenőrző `-Mode Postflight` módban bizonyítja a méretet,
   alphát, pivotot, JSON-t, hash-t és a runtime érintetlenségét.
5. Legfeljebb három GUI-kép készül; első hiba után csak izolált proof engedélyezett.

Részletes szerződés: `docs/art/Asset-prep-optimization-runbook.md`.
Ismert hibák: `docs/art/Asset-prep-error-catalog.md`.
