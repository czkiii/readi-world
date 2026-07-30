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
- no gameplay system, save schema, content definition, or production asset yet.

The next work package must introduce only the approved P0 contract layer. It
must not add vertical-slice gameplay, final art, or deferred systems.
