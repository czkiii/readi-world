# Readi World — Photoshop 2020 speed playbook

Frissítve: 2026-08-02  
Állapot: `ACTIVE / PS2020-SAFE`  
Cél: kevesebb menükeresés és GUI-lépés az assetek művészi utómunkájánál, a
kanonikus path-, pivot-, alpha- és QA-szerződés fellazítása nélkül.

## 1. Kötelező gyorsindítás

- `ReadiWorldScript` Action: egyetlen Function Key vagy Action-panel gomb;
- az Action a `tools/photoshop/ReadiWorldScript.jsx` stabil dispatchert hívja;
- production futásban nincs `File > Scripts > Browse...`;
- a Function Key legyen olyan, amely nem ütközik a Photoshop alapfunkcióival.

Az Adobe Actions panel támogat Function Key hozzárendelést, csoportosítást és
színes gombot. A saját billentyűkészlet az `Alt+Shift+Ctrl+K` ablakkal szerkeszthető
és külön készletként menthető vagy HTML-ben összefoglalható.

Az egyszeri, rövid telepítési útvonal és az ajánlott `Ctrl+Shift+F12` Action-kombináció
a `docs/art/Photoshop-one-time-setup-card.md` fájlban található. A kombináció csak
akkor állítandó be, ha a helyi Photoshop nem jelez ütközést; működő Actiont nem
veszünk fel újra pusztán a shortcut módosítása miatt.

### Readi World workspace

A napi assetmunkához a Layers, Properties, Actions, History és Navigator panelekből
mentett `Readi World` workspace az ajánlott. Ez egyszeri tulajdonosi beállítás; a
pipeline nem írja át automatikusan a grafikus személyes Photoshop-környezetét.

## 2. Readi alap-shortcut készlet — Windows

| Művelet | Shortcut | Readi használat |
|---|---|---|
| Fit on Screen | `Ctrl+0` | gyors teljes sziluett-ellenőrzés |
| 100% zoom | `Ctrl+1` | alpha/perem/mikrorészlet QA |
| Free Transform | `Ctrl+T` | kézi art-korrekció; végső pivotot továbbra is profil állít |
| Duplicate layer/selection | `Ctrl+J` | nem romboló variáció |
| Group layers | `Ctrl+G` | standard art/state csoportok |
| Deselect | `Ctrl+D` | félbehagyott selection elkerülése |
| Invert selection | `Shift+Ctrl+I` | háttér és tárgy közti maszkmunka |
| Feather selection | `Shift+F6` | csak kézi maszkfinomítás, nem technikai alpha-QA |
| Fill | `Shift+F5` | proof-háttér és maszkellenőrzés |
| Layers panel | `F7` | rétegstruktúra |
| Actions panel | `F9` | Readi action futtatása |
| Brush size | `[` / `]` | gyors maszkszél-korrekció |
| Tool family váltás | `Shift` + tool key | azonos billentyűn lévő eszközök közti váltás |
| Keyboard Shortcuts | `Alt+Shift+Ctrl+K` | saját Readi shortcut set karbantartása |

Rétegpanel-trükkök:

- `Ctrl`-kattintás a layer thumbnailen: a nem átlátszó pixelek kijelölése;
- `Alt`-kattintás a Layer Mask ikonon: teljesen rejtő maszk létrehozása;
- `Alt`-húzás egy mask thumbnailről másik layerre: maszk másolása;
- Move toolnál jobb kattintás a vásznon: a kurzor alatti réteg kiválasztása listából;
- layernévre dupla kattintás: azonnali átnevezés a kanonikus rétegnévre.

## 3. Layer Comps — nagy érték, kevés kézi munka

Egy PSD-ben Layer Comp tárolhatja a layer visibility, position és appearance
állapotot. Readi célok:

- standing/damaged/depleted művészi variációk;
- min/normal/max zoom review állapotok;
- nappali proof-háttér variációk, ha nem kerülnek a production artba;
- owner-review nézetek gyors váltása.

Layer Comps to Files használható review-exporthoz. A kanonikus normalized export
és pivot továbbra is a Readi postflight útján készül és ellenőrződik.

## 4. Gyors export: csak preview

A Photoshop Quick Export egy lépésben használja az előre beállított formátumot,
transparency-, sRGB-, metadata- és célmappa-beállítást. Readi szabály:

- `40_review` ideiglenes preview: megengedett;
- `30_normalized` és runtime candidate: nem kanonikus út;
- a `Smaller File (8-bit)` opció transparent production sprite-nál nem kapcsolható
  be automatikusan, mert palettázott/korlátozott alpha lehet;
- Quick Export nem helyettesíti a geometry/passport/postflight ellenőrzést.

## 5. Batch, Droplet és Image Processor

### Használható

- már elfogadott review-k tömeges átméretezése;
- kontaktlaphoz egységes proof-kópiák;
- olyan mechanikus művelet, amely nem módosít pivotot, ID-t, revisiont vagy alphát;
- hibák fájlba naplózásával, nem rejtett továbbhaladással.

### Nem használható

- production master létrehozására;
- kanonikus normalized export mentési útjának eldöntésére;
- `Save and Close` módban eredeti inbox/master fájlokon;
- hardcoded Open/Save As fájlnévvel;
- owner/art QA megkerülésére.

Droplet csak későbbi, bizonyított mechanikus részfolyamhoz készülhet. Az Adobe
figyelmeztetése alapján a hardcoded fájlnevek és az Open/Save As override hibás
beállítása rossz fájlt vagy rossz célmappát dolgozhat fel.

## 6. Script Events Manager — jelenleg tiltott automatikus mutációra

Photoshop eseményhez — például Open, Save vagy Export — script vagy Action
rendelhető. Readi-ben ez később csak passzív ellenőrzésre lehet hasznos. Automatikus
resize, export, átnevezés vagy mastermentés eseményből jelenleg tilos, mert rejtett
állapotváltozást és felesleges futásokat okozhat.

## 7. Keretvédő használati sorrend

1. path scaffold és preflight fájlszinten;
2. Function Key → `ReadiWorldScript`;
3. kézi artmunka shortcutokkal;
4. `Ctrl+0` sziluett-check, `Ctrl+1` perem-check;
5. egyetlen review-kép;
6. postflight fájlszinten;
7. Photoshop újranyitása csak postflight által igazolt művészi hiba esetén.

## 8. Hivatalos Adobe források

- Keyboard Shortcuts and Menus: https://helpx.adobe.com/photoshop/desktop/get-started/settings-and-preferences/view-keyboard-shortcuts.html
- Actions panel: https://helpx.adobe.com/photoshop/desktop/automate-tasks/automation-settings-and-presets/use-the-actions-panel.html
- Scripting és Script Events Manager: https://helpx.adobe.com/photoshop/using/scripting.html
- Batch/Droplet: https://helpx.adobe.com/photoshop/desktop/automate-tasks/process-a-batch-of-files/batch-and-droplet-processing-options.html
- Layer Comps: https://helpx.adobe.com/in/photoshop/using/layer-comps.html
- Quick Export: https://helpx.adobe.com/photoshop/desktop/save-and-export/export-files-to-different-formats/export-your-work-using-the-quick-export-as-option.html
- Layer selection: https://helpx.adobe.com/photoshop/desktop/create-manage-layers/transform-manipulate-layers/select-layers.html
- Layer masks: https://helpx.adobe.com/photoshop/desktop/create-masks/layer-masks/add-layer-masks.html
