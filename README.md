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
- no gameplay system, content definition, or production asset yet.

Run `npm test` to verify the World State contract and `npm run check` for
JavaScript syntax validation.

The next work package must follow the approved dependency order. It must not
mix asset resolution, vertical-slice gameplay, final art, export/import, or
cloud sync into this Save Manager package.
