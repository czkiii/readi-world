# PRUN-20260802-001 — standing pine exploration prompt snapshot

Date: 2026-08-02  
Prompt family: `PROMPT.environment.harvest-tree.v001`  
Asset: `world.tree.pine.harvestable.standard`  
Tool route: OpenAI built-in image generation  
Reference roles: `REF-001 INSPIRE`, `REF-003 INSPIRE`, `REF-005 MATCH`

This is an immutable exploration snapshot. It does not grant `MASTERED`,
`QA-PASS`, `OWNER_APPROVED` or runtime activation status.

## Candidate A — exact executed prompt

```text
Use case: stylized-concept
Asset type: production-source exploration candidate for a mobile game environment sprite
Input images: Image 1 is REF-001, inspiration only for natural forest silhouette, canopy rhythm and cozy spacing; Image 2 is REF-003, inspiration only for controlled painted foliage richness; Image 3 is REF-005, match only the warm storybook material mood and mobile readability. Do not copy any exact tree, scene layout, UI, character, building, or generated detail.

Primary request: Create exactly one original Readi World standard harvestable pine tree for asset world.tree.pine.harvestable.standard, variant standard-a, exploration candidate A. It is a mature but not monumental cozy pine with a broad, slightly irregular, layered and softly rounded silhouette, not a perfect Christmas-tree cone. Build the foliage from one large coherent canopy mass, four to six controlled medium clusters, and very few fine needle accents. Keep the lower warm-brown trunk clearly visible and approachable from the south. The intended visible draw bounds are 4.5 world units wide and 6.0 world units tall; the trunk collision footprint is a 1.15-world-unit diameter circle centered on the trunk base.

Style/medium: original warm cozy hand-painted storybook game art; clean readable silhouette; soft dimensional volume; natural handcrafted materials; restrained natural saturation; large clear shapes with controlled medium detail; strong mobile-game readability without glossy mobile-ad rendering. Detail hierarchy: approximately 60% large clear mass, 30% structural detail, no more than 10% fine texture. Deep forest, pine and moss greens with small lichen highlights; warm timber and dark wood trunk.

Composition/framing: orthographic-looking three-quarter top-down game view, approximately 55 degrees visual elevation, zero yaw, north aligned to image top, no visible horizon, no perspective convergence, not rotated diamond-isometric, not eye-level. Center the trunk-base ground contact with a clear south approach. Portrait source composition with the full canopy, roots, trunk base and complete ground-contact region visible and generous clean padding on every side. Do not draw a pivot marker; Photoshop establishes exact pivot later.

Lighting/mood: neutral daylight production master with a very gentle warm bias, soft upper-left key light, subtle local ambient occlusion, no baked time-of-day tint, no weather tint, and absolutely no long cast shadow. The contact shadow will be authored separately.

Scene/backdrop: exactly one complete isolated tree centered on a perfectly plain warm light-neutral background, no floor plane, no terrain, no gradient, no texture, no background shadow.

Constraints: one coherent tree only; visible lower trunk; clear south access; full uncropped silhouette; clean separation from background; no grass terrain, rocks, flowers, animals, character, axe, stump, chips, scene, text, UI, border, logo, signature, or watermark.

Avoid: neon, harsh pixel art, photoreal leaves, photorealism, PBR realism, glossy generic 3D mobile-ad rendering, corporate vector clipart, sharp low-poly spikes, noisy individual-needle texture, hidden trunk, multiple trees, perfect symmetrical Christmas-tree cone, floating roots, cropped canopy, thick black outlines, fisheye, eye-level perspective, horizon, rotated diamond isometric geometry, strong sunset or night color, long shadow, text, letters, numbers, logos, signatures, watermarks, imitation of another game's identifiable tree, or imitation of any living artist.

Before finalizing verify: exactly one original coherent pine; correct Readi World three-quarter top-down projection; broad cozy mobile-readable silhouette; visible south-facing trunk-base region; neutral master light; natural painted materials; full padding; no unrequested element.
```

## Candidate B — executed change from A

The full A contract remained in force. The targeted change requested a
distinctly broader, asymmetric, softly rounded canopy; only four to six
oversized painted masses; maximum five percent fine texture; and a stronger
55-degree top-down read. Result: broadleaf/oak identity hard fail, rejected.

## Candidate C — executed change from B

The full family contract remained in force. The targeted change explicitly
required unmistakable conifer identity, flattened umbrella-like pine branch
clusters, pointed conifer edges, an irregular open rhythm and visible top-facing
surfaces. Result: bonsai/broadleaf identity hard fail, rejected.

## Candidate D — exact executed edit prompt

Image 1 was Candidate A. Images 2–4 were `REF-001`, `REF-003`, `REF-005` in the
roles declared above.

```text
Use case: style-transfer
Asset type: refined production-source exploration candidate for a mobile game environment sprite
Input images: Image 1 is the edit target, exploration candidate A; Image 2 is REF-001, inspiration only for natural pine silhouette and canopy rhythm; Image 3 is REF-003, inspiration only for controlled painted foliage richness; Image 4 is REF-005, match only warm storybook material mood and mobile readability.

Primary request: Refine Image 1 into exploration candidate D for Readi World asset world.tree.pine.harvestable.standard. Preserve Image 1's unmistakable pine species, warm-brown trunk identity, deep pine palette, cozy hand-painted material and single isolated-tree composition. Change only these three weaknesses: make the outer silhouette 15–20% broader and naturally asymmetric instead of a perfect Christmas-tree cone; consolidate the many tiny needle clumps into five or six larger readable layered pine-bough clusters; adjust the rendering to read as a clear orthographic-looking 55-degree three-quarter top-down game sprite, showing more top-facing surfaces of the bough layers and trunk-base region.

Keep a modest central pine leader so the species remains clearly coniferous, but offset two major side boughs and break the triangular symmetry. The crown should be broad and softly rounded while retaining pointed conifer edges. Reduce fine needle texture substantially: 60% large mass, 30% structural cluster detail, maximum 10% fine accents. Keep the lower trunk clearly visible and the south side open for player approach.

Lighting/mood: preserve neutral daylight with a gentle warm bias and soft upper-left key; subtle local ambient occlusion only; no long cast shadow and no time-of-day tint.

Scene/backdrop: exactly one complete isolated pine on a perfectly plain warm light-neutral background, no floor plane, terrain, gradient, texture or background shadow. Keep generous padding and the full ground contact visible. Do not draw a pivot marker.

Constraints: change only silhouette balance, foliage clustering and top-down readability; preserve pine species, trunk thickness, bark language, palette, material mood and single-subject composition. No oak/broadleaf cloud balls, no perfect cone, no hundreds of individual needles, no grass, rocks, flowers, animals, character, axe, stump, chips, text, UI, border, logo, signature or watermark.

Avoid: eye-level front portrait, Christmas-tree decoration, broadleaf tree, bonsai, cedar hedge, photorealism, PBR, glossy 3D mobile-ad look, low-poly spikes, pixel art, thick outlines, horizon, long shadow, text, logo, watermark, imitation of another game or living artist.

Before finalizing verify: unmistakable pine identity from Image 1; broader asymmetric silhouette; five or six large conifer-bough masses; stronger top-down read; visible warm trunk base and south access; neutral master light; full padding; no unrequested element.
```

## Reference files

- `docs/art/reference-sheets/visual/REF-001-village-world-composition-portrait.jpg`
- `docs/art/reference-sheets/visual/REF-003-hud-layout-dense-village-concept.jpg`
- `docs/art/reference-sheets/visual/REF-005-primary-portrait-gameplay-hud.jpg`

The references are reference-only inputs. No reference image is an edit target or
eligible runtime asset.
