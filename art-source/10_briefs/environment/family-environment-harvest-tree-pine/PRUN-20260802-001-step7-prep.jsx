#target photoshop

(function () {
    var MASTER_NAME = "world-tree-pine-harvestable-standard__r001__master";
    var MASTER_PATH = "C:/Users/bobaa/Documents/ReadiWorldGameDeskopt/art-source/20_masters/environment/world-tree-pine-harvestable-standard/world-tree-pine-harvestable-standard__master-r001.psd";
    var SOURCE_NAME = "world-tree-pine-harvestable-standard__exploration-prun-20260802-001-d-cutout-ps2020";
    var SOURCE_PATH = "C:/Users/bobaa/Documents/ReadiWorldGameDeskopt/art-source/00_inbox/environment/family-environment-harvest-tree-pine/PRUN-20260802-001/world-tree-pine-harvestable-standard__exploration-prun-20260802-001-d-cutout-ps2020.png";

    function findDocument(nameFragment) {
        for (var i = 0; i < app.documents.length; i += 1) {
            if (app.documents[i].name.indexOf(nameFragment) !== -1) {
                return app.documents[i];
            }
        }
        return null;
    }

    function px(value) {
        return value.as("px");
    }

    function findRootGroup(document, groupName) {
        for (var i = 0; i < document.layerSets.length; i += 1) {
            if (document.layerSets[i].name === groupName) {
                return document.layerSets[i];
            }
        }
        return null;
    }

    function removeEmptyPlaceholder(document) {
        for (var i = document.artLayers.length - 1; i >= 0; i -= 1) {
            if (document.artLayers[i].name === "Layer 1") {
                document.artLayers[i].remove();
            }
        }
    }

    function removeGeneratedArtwork(container) {
        for (var i = container.layers.length - 1; i >= 0; i -= 1) {
            var layer = container.layers[i];
            if (layer.typename === "LayerSet") {
                removeGeneratedArtwork(layer);
            } else if (layer.name === "standing-candidate-d__subject-cutout") {
                layer.remove();
            }
        }
    }

    var master = findDocument(MASTER_NAME);
    if (!master) {
        throw new Error("Nem talalom a standing master dokumentumot.");
    }

    app.activeDocument = master;
    removeEmptyPlaceholder(master);
    removeGeneratedArtwork(master);
    var artGroup = findRootGroup(master, "10_ART");
    if (!artGroup) {
        throw new Error("Hianyzik a 10_ART csoport.");
    }

    var placeDescriptor = new ActionDescriptor();
    placeDescriptor.putPath(charIDToTypeID("null"), new File(SOURCE_PATH));
    placeDescriptor.putEnumerated(charIDToTypeID("FTcs"), charIDToTypeID("QCSt"), charIDToTypeID("Qcsa"));
    executeAction(charIDToTypeID("Plc "), placeDescriptor, DialogModes.NO);
    var artwork = master.activeLayer;
    artwork.name = "standing-candidate-d__subject-cutout";

    var bounds = artwork.bounds;
    var width = px(bounds[2]) - px(bounds[0]);
    var height = px(bounds[3]) - px(bounds[1]);
    if (width <= 0 || height <= 0) {
        throw new Error("A kijelolt fa merete ervenytelen.");
    }

    var scale = Math.min(288 / width, 384 / height) * 100;
    artwork.resize(scale, scale, AnchorPosition.MIDDLECENTER);

    bounds = artwork.bounds;
    var centerX = (px(bounds[0]) + px(bounds[2])) / 2;
    var bottomY = px(bounds[3]);
    artwork.translate(UnitValue(192 - centerX, "px"), UnitValue(416 - bottomY, "px"));
    artwork.move(artGroup, ElementPlacement.INSIDE);

    app.activeDocument = master;
    master.activeLayer = artwork;

    var masterOptions = new PhotoshopSaveOptions();
    master.saveAs(new File(MASTER_PATH), masterOptions, true, Extension.LOWERCASE);

    alert("Step 7 master kesz: D cutout beagyazott fajlkent, pivot (192,416). A soft-alpha PNG-ket a helyi vesztesegmentes normalizalo kezeli.");
}());
