# Readi World — Photoshop egyszeri beállítási kártya

Kompatibilitás: Photoshop 2020 / Windows  
Időigény: egyszeri, körülbelül 5–10 perc  
Eredmény: a későbbi assetkörökben nincs menükeresés és script-böngészés.

Helyi beállítás állapota: `DONE`, 2026-08-02. A Photoshop a későbbi Readi
munkákban maximalizált ablakban indul; a szükséges panelek és a workspace elkészült.

## 1. Action

- Action set: `Readi World`
- Action: `ReadiWorldScript`
- Ajánlott gyorsbillentyű: `Ctrl+Shift+F12`, ha a Photoshop nem jelez ütközést.
- Beállított Photoshop-kijelzés: `Shift+Ctrl+F12`; ez ugyanaz a kombináció.
- Az Action kizárólag a stabil `tools/photoshop/ReadiWorldScript.jsx` dispatchert
  hívja. A meglévő működő Actiont nem kell újravenni csak a gyorsbillentyű kedvéért.

Ha az ajánlott kombináció foglalt, ne törölj meglévő kiosztást: válassz egy szabad,
könnyen megjegyezhető módosított Function Key kombinációt, és írd meg nekem. A
gépileg tárolt profilban utána ezt tesszük kanonikussá.

## 2. Workspace

Nyisd meg és rendezd egymás mellé:

- Layers;
- Properties;
- Actions;
- History;
- Navigator.

Mentsd a munkaterületet `Readi World` néven. A projekt nem követeli meg más Adobe
workspace-ek törlését vagy felülírását.

## 3. Napi minimum shortcutok

| Shortcut | Használat |
|---|---|
| `Ctrl+Shift+F12` | Readi Asset Prep indítása, ha ezt választottad |
| `Ctrl+0` | teljes sziluett |
| `Ctrl+1` | 100%-os peremellenőrzés |
| `Ctrl+J` | biztonságos rétegmásolat |
| `Ctrl+G` | csoportosítás |
| `Ctrl+T` | kézi transzformáció |
| `F7` | Layers panel |
| `F9` | Actions panel |

Ennél több billentyű megtanulása nem kötelező. A speed playbook tartalmaz további
opcionális kombinációkat, de a keretcsökkentést ez a nyolc már biztosítja.

## 4. Amit nem kell neked beállítani

- assetmappák és fájlnevek;
- normalized canvas és pivotérték;
- passport, geometry vagy hash;
- runtime manifest;
- automatikus eseményre induló mentés/export.

Ezeket Codex készíti elő vagy külön ellenőrzött munkacsomag végzi.

## 5. Opcionális egyszeri backup

Az Action set a panelmenü `Save Actions...` parancsával menthető ide:
`tools/photoshop/actions/Readi-World-PS2020.atn`. Ez Photoshop-reset után gyors
visszaállítást tesz lehetővé; a napi munkát nem blokkolja.
