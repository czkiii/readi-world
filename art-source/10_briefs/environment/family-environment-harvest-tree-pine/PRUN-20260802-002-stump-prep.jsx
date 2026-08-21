#target photoshop

(function () {
    var SOURCE_PATH = "C:/Users/bobaa/Documents/ReadiWorldGameDeskopt/art-source/00_inbox/environment/family-environment-harvest-tree-pine/PRUN-20260802-002/world-tree-pine-harvestable-standard-stump__exploration-prun-20260802-002-a-cutout-ps2020.png";
    var MASTER_PATH = "C:/Users/bobaa/Documents/ReadiWorldGameDeskopt/art-source/20_masters/environment/world-tree-pine-harvestable-standard-stump/world-tree-pine-harvestable-standard-stump__master-r001.psd";
    var MASTER_NAME = "world-tree-pine-harvestable-standard-stump__r001__master";
    var ART_LAYER_NAME = "stump-candidate-a__subject-cutout";

    function px(value) { return value.as("px"); }
    function addGuide(document, direction, position) {
        document.guides.add(direction, UnitValue(position, "px"));
    }

    var source = new File(SOURCE_PATH);
    var masterFile = new File(MASTER_PATH);
    if (!source.exists) { throw new Error("Prepared stump source is missing: " + source.fsName); }
    if (masterFile.exists) { throw new Error("Master already exists; overwrite blocked: " + masterFile.fsName); }

    var master = app.documents.add(128, 96, 72, MASTER_NAME, NewDocumentMode.RGB, DocumentFill.TRANSPARENT);
    try {
        try { master.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, false); } catch (profileError) {}

        var reviewGroup = master.layerSets.add();
        reviewGroup.name = "90_REVIEW_DO_NOT_EXPORT";
        var optionalGroup = master.layerSets.add();
        optionalGroup.name = "20_OPTIONAL";
        var artGroup = master.layerSets.add();
        artGroup.name = "10_ART";
        var guideGroup = master.layerSets.add();
        guideGroup.name = "00_GUIDES_DO_NOT_EXPORT";

        for (var i = master.artLayers.length - 1; i >= 0; i -= 1) {
            master.artLayers[i].remove();
        }

        var placeDescriptor = new ActionDescriptor();
        placeDescriptor.putPath(charIDToTypeID("null"), source);
        placeDescriptor.putEnumerated(charIDToTypeID("FTcs"), charIDToTypeID("QCSt"), charIDToTypeID("Qcsa"));
        executeAction(charIDToTypeID("Plc "), placeDescriptor, DialogModes.NO);
        var artwork = master.activeLayer;
        artwork.name = ART_LAYER_NAME;

        var bounds = artwork.bounds;
        var width = px(bounds[2]) - px(bounds[0]);
        var height = px(bounds[3]) - px(bounds[1]);
        if (width <= 0 || height <= 0) { throw new Error("Placed stump bounds are invalid."); }

        var scale = Math.min(77 / width, 51 / height) * 100;
        artwork.resize(scale, scale, AnchorPosition.MIDDLECENTER);
        bounds = artwork.bounds;
        var centerX = (px(bounds[0]) + px(bounds[2])) / 2;
        var bottomY = px(bounds[3]);
        artwork.translate(UnitValue(64 - centerX, "px"), UnitValue(80 - bottomY, "px"));
        artwork.move(artGroup, ElementPlacement.INSIDE);

        addGuide(master, Direction.VERTICAL, 64);
        addGuide(master, Direction.HORIZONTAL, 80);
        addGuide(master, Direction.VERTICAL, 26);
        addGuide(master, Direction.VERTICAL, 103);
        addGuide(master, Direction.HORIZONTAL, 16);

        master.activeLayer = artwork;
        var options = new PhotoshopSaveOptions();
        master.saveAs(masterFile, options, true, Extension.LOWERCASE);
        alert("Readi stump master ready: 128x96 px, pivot (64,80), source placed in 10_ART. Master saved; normalized PNG will use the local alpha-safe path.");
    } catch (error) {
        try { master.close(SaveOptions.DONOTSAVECHANGES); } catch (closeError) {}
        throw error;
    }
}());

