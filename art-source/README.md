# Readi World — art-source munkaterület

Ez a projektközeli mappa a későbbi szerkeszthető grafikai masterek helye. Nem a
kiadott játék része, és tartalma nem másolódhat automatikusan a `runtime/`
mappába.

Tervezett struktúra:

```text
00_inbox/
10_briefs/
20_masters/<family>/<asset-id>/
30_normalized/<family>/<asset-id>/
40_review/<family>/<asset-id>/
90_archive/<family>/<asset-id>/
_registry/
```

Az első tényleges family mappát csak D6–D8 elfogadása és célzott assetcsalád-
munkacsomag után hozzuk létre. Addig ez a README kizárólag a helyet és a
határszabályt rögzíti.

Kanonikus folyamat: [`docs/art/Asset-production-pipeline.md`](../docs/art/Asset-production-pipeline.md).
