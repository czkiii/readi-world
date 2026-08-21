# PRUN-20260802-001 — standing pine exploration

## Run identity

| Field | Value |
|---|---|
| Prompt ID/version | `PROMPT.environment.harvest-tree.v001` |
| Asset/family | `world.tree.pine.harvestable.standard` / `family.environment.harvest-tree.pine` |
| Purpose | `EXPLORATION` |
| Operator/date | Codex / 2026-08-02 |
| Tool/provider | OpenAI built-in image generation |
| Model/version | Not exposed by the built-in route |
| Mode | A–C generation; D targeted edit of A |
| Seed/job ID | `N/A`; generated file IDs retained in source provenance below |
| Actual output | four PNG files, each `1086×1448` |
| Prompt snapshot | `art-source/10_briefs/environment/family-environment-harvest-tree-pine/PRUN-20260802-001-prompt-snapshot.md` |
| References | `REF-001 INSPIRE`; `REF-003 INSPIRE`; `REF-005 MATCH` |

Reference hashes: `REF-001`
`9A8FC00DF26148CB251210ED9677AE203B6F163557D37A443DBEBEE2BA59C2D4`;
`REF-003` `87A7B00A6552754F234EB5B406731C5F0E02F75C929C3F271CFEEB63D0FA9C02`;
`REF-005` `C98A4BE9B018A424221CA5415E06795C1041BBC82B746BEF644D75B6E85714BF`.

Built-in generated source IDs: A
`exec-1dd5ddc4-cbf7-4581-93e8-7ca139b80597`; B
`exec-fa2cf4e5-10fe-4834-8c82-1225f68cf58e`; C
`exec-abe299b4-b456-405d-83c2-0a46d953eca2`; D
`exec-3320ef5a-c4e2-4310-96c5-32450ba31491`.

## Outputs and decision

| Candidate | SHA-256 | Quick score | Decision | Reason |
|---|---|---:|---|---|
| A | `145FD76070B1B503550A05694D3B0F6FA6BE83A981D74553BA7258C4741D753C` | `16/20` | `KEEP` | Strongest clean pine identity; too conical, too much needle detail, projection needs work. |
| B | `C3AB41BA9C6994135518E8E63F4739CC5F3F456FEBA645C7955B6B4E2C74896C` | `14/20` | `REJECT` | Broadleaf/oak identity; family/gameplay-state hard fail. |
| C | `277B27C7AAE647D3864410F0136EC10AA3BEDAA0799BCFFE5F5F4E66AC7078A3` | `13/20` | `REJECT` | Bonsai/broadleaf identity; family/gameplay-state hard fail. |
| D | `F5697B61403FE14D49FA38FAF7B6021B0B2E965809055EB70C485A74EDB79799` | `17/20` | `REVISE / SELECTED FOR OWNER REVIEW` | Best balance and pine identity; still slightly conical, too detailed and not yet fully D4 top-down. |

## Score note

Scores use the ten D5 dimensions at 0–2 each. None reaches the `18/20` art QA
gate yet. D is the current working candidate, not an accepted master.

## Handoff

- Current state: `INBOX / GENERATED_OR_DRAWN / REVISION_REQUIRED`.
- Selected output: Candidate D, pending owner review.
- Manual/next changes: reduce foliage microdetail; break the cone silhouette;
  strengthen top-facing cluster planes; preserve trunk and pine identity.
- Stump generation is forbidden until a standing-tree master is accepted.
- No passport, normalized export, runtime copy or manifest activation exists.

## Step 7 technical-preparation update — 2026-08-02

- Owner decision: Candidate D accepted as the standing-pine source for Step 7.
- Transparent extraction source: built-in targeted image edit followed by local chroma removal; no API key, paid API credit or network upload from Photoshop was used.
- Photoshop 2020 master: embedded source artwork in the standard `10_ART` group.
- The PSD embeds a Photoshop-2020-safe binary-alpha derivative made from the clean cutout colors; the release PNG retains the cleaner soft-alpha edge.
- Canvas: `384×448 px`; visual content bounds: `x=57..325`, `y=32..415`.
- Pivot/ground contact: `(192,416)`; normalized pivot: `(0.5,0.928571)`.
- Normalized and review PNGs contain non-empty RGBA pixels and passed visual inspection.
- Photoshop 2020 rendered the soft-alpha source with dark smart-object artifacts, so release PNG normalization uses a local lossless Sharp pass from the clean cutout. The editable PSD remains available separately.
- Passport status: `STEP7_TECHNICAL_PREP_COMPLETE`; activation status remains `NOT_INTEGRATED`.
- Runtime, manifest and registry were not modified.
