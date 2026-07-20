# Readi World

Readi World is a mobile-first HTML/CSS/JavaScript canvas prototype for a cozy portrait village game.

## Current foundation

- Portrait PWA runtime in a single [index.html](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/index.html) shell.
- Manifest-driven asset activation through [data/assets_manifest.json](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/data/assets_manifest.json).
- Atlas metadata and sprite contracts in [data/sprite_registry.json](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/data/sprite_registry.json).
- Authored village placement in [data/village_layout.json](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/data/village_layout.json).
- Shared building behavior in [data/buildings.json](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/data/buildings.json).
- English UI strings in [data/localization_en.json](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/data/localization_en.json).

## Runtime flow

The current boot process loads and validates:

1. asset manifest
2. village layout
3. sprite registry
4. building definitions
5. localization

After validation, the runtime hydrates the authored layout with shared building definitions and localized interaction labels, then loads enabled atlases.

## Asset modules

Current manifest modules:

- village_buildings
- forest_environment
- ground_tiles
- tool_overlays
- effects

Required modules must load successfully or boot fails.

## Project structure

- [index.html](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/index.html): runtime shell, rendering, input, save, asset boot.
- [manifest.json](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/manifest.json): PWA manifest.
- [data](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/data): gameplay data, registries and contracts.
- [assets](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/assets): validated runtime art assets.
- [docs](c:/Users/Designer3/Documents/ReadiWorld/readi-world-main/docs): design and layout notes.

## Current direction

The project is moving from a monolithic prototype toward a clearer engine contract:

- manifest controls active asset modules
- registry defines atlas and sprite metadata
- layout defines authored placement
- building data defines shared building behavior
- localization provides player-facing text

The next major step is extracting more of the runtime shell into clearer engine-style modules while preserving the working web build.