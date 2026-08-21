#target photoshop

(function () {
    var SOURCE_PATH = "C:/Users/bobaa/Documents/ReadiWorldGameDeskopt/art-source/30_normalized/environment/world-shadow-tree-pine-harvestable-standard/world-shadow-tree-pine-harvestable-standard__r001__normalized.png";
    var MASTER_PATH = "C:/Users/bobaa/Documents/ReadiWorldGameDeskopt/art-source/20_masters/environment/world-shadow-tree-pine-harvestable-standard/world-shadow-tree-pine-harvestable-standard__master-r001.psd";
    var source = new File(SOURCE_PATH);
    var masterFile = new File(MASTER_PATH);
    if (!source.exists) { throw new Error("Normalized contact shadow is missing."); }
    if (masterFile.exists) { throw new Error("Shadow master already exists; overwrite blocked."); }

    var master = app.documents.add(128, 64, 72, "world-shadow-tree-pine-harvestable-standard__r001__master", NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
    try {
        try { master.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, false); } catch (profileError) {}
        var reviewGroup = master.layerSets.add(); reviewGroup.name = "90_REVIEW_DO_NOT_EXPORT";
        var optionalGroup = master.layerSets.add(); optionalGroup.name = "20_OPTIONAL";
        var artGroup = master.layerSets.add(); artGroup.name = "10_ART";
        var guideGroup = master.layerSets.add(); guideGroup.name = "00_GUIDES_DO_NOT_EXPORT";
        for (var i = master.artLayers.length - 1; i >= 0; i -= 1) { master.artLayers[i].remove(); }

        var descriptor = new ActionDescriptor();
        descriptor.putPath(charIDToTypeID("null"), source);
        descriptor.putEnumerated(charIDToTypeID("FTcs"), charIDToTypeID("QCSt"), charIDToTypeID("Qcsa"));
        executeAction(charIDToTypeID("Plc "), descriptor, DialogModes.NO);
        var artwork = master.activeLayer;
        artwork.name = "pine-contact-shadow__procedural-r001";
        artwork.move(artGroup, ElementPlacement.INSIDE);

        master.guides.add(Direction.VERTICAL, UnitValue(64, "px"));
        master.guides.add(Direction.HORIZONTAL, UnitValue(48, "px"));
        master.guides.add(Direction.VERTICAL, UnitValue(16, "px"));
        master.guides.add(Direction.VERTICAL, UnitValue(112, "px"));
        master.guides.add(Direction.HORIZONTAL, UnitValue(8, "px"));

        master.activeLayer = artwork;
        var options = new PhotoshopSaveOptions();
        master.saveAs(masterFile, options, true, Extension.LOWERCASE);
        alert("Readi contact-shadow master ready: 128x64 px, pivot (64,48), editable source in 10_ART.");
    } catch (error) {
        try { master.close(SaveOptions.DONOTSAVECHANGES); } catch (closeError) {}
        throw error;
    }
}());

