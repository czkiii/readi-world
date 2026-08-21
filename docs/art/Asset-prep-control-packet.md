# Readi World — egyparancsos Asset Prep control packet

Frissítve: 2026-08-02  
Állapot: `OPERATIONAL V1`

## Cél

Egyetlen parancs készítsen olyan csomagot, amelyből Codex napokkal később is pontosan
tudja a következő biztonságos lépést, a tulajdonos pedig csak valódi vizuális
döntésnél legyen szükséges.

## Futtatás

```powershell
./tools/art-pipeline/asset-prep-control-packet.ps1 `
  -PathPlan './art-source/_registry/path-plans/<asset>__rNNN.json'
```

Ha már van elfogadott családtag, mérési referenciaként hozzáadható:

```powershell
./tools/art-pipeline/asset-prep-control-packet.ps1 `
  -PathPlan '<path-plan.json>' `
  -ReferencePath '<accepted-family-asset-1.png>','<accepted-family-asset-2.png>'
```

## Kimenetek

- `__qa-contact-sheet.png`: checker, világos, sötét, chroma, sziluett, pivot/bounds;
- `__style-report.json`: szín-, fény-, telítettség-, occupancy-, bounds- és éljel;
- `__resume-session.json`: machine-readable „folytasd innen” állapot;
- `__control-packet.md`: közös Codex/tulajdonosi rövid vezérlőlap.

## Stílusdetektor határa

A detektor mérhető eltérést jelez, nem mondja ki önállóan, hogy egy kép szép vagy
stílushelyes. Egyetlen családtagnál baseline készül. További elfogadott családtagoknál
`CLOSE`, `REVIEW` vagy `STRONG_DEVIATION` jelzés adható. Ezek owner/art review
priorizálására szolgálnak, nem automatikus elutasításra.

## Biztonság

- csak `art-source/` alatt olvas és ír;
- a `runtime/` minden esetben védett;
- mastert és normalized képet nem ír felül;
- a generált review/report/session fájlok reprodukálható származékok;
- a control packet nem ad runtime-aktiválási felhatalmazást.

