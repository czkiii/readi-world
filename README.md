# Readi World — clean runtime

This branch is the clean P0 runtime baseline for Readi World.

The previous monolithic prototype is preserved by Git history and the
`prototype-reference-2026-07-20` tag. No legacy runtime code, gameplay data,
or art asset is copied into this baseline automatically.

## Current scope

- thin `index.html` bootstrap shell;
- mobile-first portrait presentation;
- installable-web-app manifest;
- versioned runtime configuration;
- versioned World State v1 contract and immutable state snapshots;
- validated, deterministic commands, transactions, and events;
- atomic rollback and duplicate-command protection;
- versioned Save Manager v1 envelope with SHA-256 integrity validation;
- staged save activation with one verified active save and one automatic backup;
- platform-independent storage boundary and an IndexedDB/Web Locks adapter;
- corruption recovery, quota retry, and idempotent unchanged-state saves;
- versioned asset manifest, validated registry, and controlled role/tag vocabulary;
- deterministic semantic asset resolution with aliases, variants, fallbacks,
  and structured diagnostics;
- first playable portrait loop with right-side joystick and keyboard movement;
- proximity gathering, one stable/versioned repair-timber recipe at the field
  workbench, Forester Hut restoration, and persistent resume;
- P0-04 save compatibility through an idempotent P0-05 state migration;
- player maximum movement speed reduced by 20% after mobile play feedback;
- gatherable fallen branches start inside the first camera view and use a
  visible semantic highlight; existing saves migrate only still-available
  resource positions;
- Forester Hut completion grants Village Level 1, opens a persistent farm-path
  preview gate, and presents a short milestone celebration;
- temporary code-drawn proof visuals with no production asset dependency;
- no crafting queue, full inventory, economy, content pack, or production
  asset yet.

Run `npm test` to verify the World State contract and `npm run check` for
JavaScript syntax validation.

The next work package must deepen only one vertical-slice system or introduce
one approved asset family. It must not combine final art, export/import,
cloud sync, or unrelated world expansion.
