# Readi World — Asset Prep delegálási és automatizálási térkép

Frissítve: 2026-08-02  
Állapot: `ACTIVE`  
Cél: a Photoshop előtt és után elvégezhető munkát Codex készítse elő fájlszinten;
a grafikusnak csak a valódi vizuális döntések és az egyszeri helyi beállítások maradjanak.

## Alapszabály

Az alapértelmezett működés nem az, hogy a tulajdonos megtanulja a teljes pipeline-t.
Codex készíti el a neveket, mappákat, path-plant, prompt snapshotot, geometriai
metaadatot, ellenőrzési parancsot és review-csomagot. A tulajdonos akkor ül Photoshop
elé, amikor művészi utómunka vagy szemmel eldöntendő jóváhagyás szükséges.

## Felelősségek

| Terület | Codex alapértelmezett feladata | Tulajdonosi feladat | Automatizálási határ |
|---|---|---|---|
| Photoshop Workspace | telepítési lap és ajánlott panelkiosztás | egyszer elmenti `Readi World` néven | Codex nem írja át vakon a helyi PS-beállítást |
| PSD-master sablon | rétegszerződés, nevek, guide/pivot és family profile | vizuális rétegek szerkesztése | runtime-aktiválás nincs |
| vizuális QA-lap | hátterek, zoomok és kötelező nézetek specifikálása/generálása | artminőség jóváhagyása | automata mérés nem helyettesít ízlést |
| kontaktlap | variációk rendezése, azonosító és fájlnév | választás vagy korrekció | forrás nem íródhat felül |
| névellenőrzés | fájl-, layer-, ID- és revision-validáció | kivétel jóváhagyása | csendes automatikus átnevezés tilos |
| méret/memória | canvas, kihasználtság és decoded MiB számítása | családbudget felülírása csak indokkal | runtime budget külön proof |
| alpha-fringe | több kontrasztháttér és alpha-mérés | perem művészi javítása | automata háttér csak review |
| prompt–master–export kapcsolat | promptRunId, path-plan, hash, passport összekötése | forrás/provenance megerősítése | hiányos eredet `LEGAL-HOLD` |
| Ready for game | technikai kapuk és bizonyítékok összesítése | pontos revision owner approvalja | nem jelent automatikus runtime-integrációt |
| shortcutprofil | ajánlott kiosztás és egyoldalas beállítási lap | egyszer beállítja Photoshopban | meglévő ütközést előbb ellenőrizni kell |

## Bevezetési státusz

| Elem | Státusz | Következő bizonyíték |
|---|---|---|
| stabil Action-dispatcher | `OPERATIONAL` | meglévő `ReadiWorldScript` Action |
| path scaffold és PATH-MAP | `OPERATIONAL` | pine referencia path-plan |
| preflight/postflight | `OPERATIONAL` | pine technikai PASS |
| prompt–export kapcsolat | `OPERATIONAL_V1` | pine promptRunId + passport + geometry |
| shortcut install card | `READY_FOR_OWNER_SETUP` | egyszeri helyi beállítás |
| Workspace preset | `READY_FOR_OWNER_SETUP` | `Readi World` workspace mentése |
| PSD-master sablonszerződés | `SPECIFIED` | következő assetcsalád sablonproofja |
| automatikus QA-/kontaktlap | `OPERATIONAL_V1` | pine egyparancsos proof |
| mérhető family stílusjelzés | `OPERATIONAL_V1` | baseline után több elfogadott családtag |
| folytasd-innen session és control packet | `OPERATIONAL_V1` | pine resume proof |
| név/layer/méret/alpha kibővített validator | `SPECIFIED_NEXT_AUTOMATION` | negatív tesztesetek |
| Ready for game kapu | `PARTIAL` | ART QA + owner approval + I4 külön csomag |

A PSD-szerkezet részletes neveit a
`docs/art/Photoshop-master-template-contract.md`, az egyszeri helyi beállítást a
`docs/art/Photoshop-one-time-setup-card.md`, a gépi felelősségprofilt pedig az
`art-source/_registry/photoshop-workflow-profile.json` rögzíti.

## Keretoptimalizált kommunikáció

Egy normál assetkörben Codex egyetlen tömör owner packetet ad:

1. mit kell megnyitni;
2. mit kell vizuálisan javítani vagy kiválasztani;
3. melyik Action/shortcut fut;
4. melyik review-képet kell elfogadni;
5. minden más ellenőrzés gépi eredménye.

Nem kérünk képernyőképet olyan adatról, amely fájlból bizonyítható. Nem kérjük a
tulajdonostól fájlnevek, célmappák, pivotértékek vagy parancssorok kitalálását.
