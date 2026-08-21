#target photoshop
/*
<javascriptresource>
<name>Readi Asset Prep (Photoshop 2020)</name>
<category>Readi World</category>
<enableinfo>true</enableinfo>
</javascriptresource>
*/

(function () {
    app.bringToFront();

    /* READI_PROFILE_BEGIN
{
  "schemaVersion": 1,
  "profileId": "profile.family.environment.harvest-tree.pine.v1",
  "familyId": "family.environment.harvest-tree.pine",
  "packageId": "package.p1.forest.core",
  "displayName": "D8 Harvest Pine Family v1",
  "ownerReviewRequired": true,
  "sourceDensityPxPerWU": 64,
  "outputs": [
    {
      "key": "standing",
      "assetId": "world.tree.pine.harvestable.standard",
      "role": "world.resource.tree.harvestable",
      "tags": ["biome.forest", "species.pine", "material.wood", "state.standing", "variant.standard", "milestone.p1"],
      "state": "available",
      "canvasPx": { "width": 384, "height": 448 },
      "pivotPx": { "x": 192, "y": 416 },
      "drawSizeWU": { "width": 6, "height": 7 },
      "safePaddingPx": { "top": 32, "right": 48, "bottom": 32, "left": 48 },
      "logicalFootprint": { "type": "circle", "center": { "x": 0, "y": 0 }, "radius": 0.575 },
      "interactionAnchor": { "type": "radius", "point": { "x": 0, "y": 0 }, "radius": 1.45 },
      "occluderShape": {
        "type": "polygon",
        "points": [
          { "x": -0.8, "y": -5.8 }, { "x": 0.8, "y": -5.8 },
          { "x": 2.2, "y": -3.8 }, { "x": 2.0, "y": -1.2 },
          { "x": 0.8, "y": -0.6 }, { "x": -0.8, "y": -0.6 },
          { "x": -2.0, "y": -1.2 }, { "x": -2.2, "y": -3.8 }
        ]
      }
    },
    {
      "key": "stump",
      "assetId": "world.tree.pine.harvestable.standard.stump",
      "role": "world.resource.tree.stump",
      "tags": ["biome.forest", "species.pine", "material.wood", "state.depleted", "variant.standard", "milestone.p1"],
      "state": "depleted",
      "canvasPx": { "width": 128, "height": 96 },
      "pivotPx": { "x": 64, "y": 80 },
      "drawSizeWU": { "width": 2, "height": 1.5 },
      "safePaddingPx": { "top": 16, "right": 25, "bottom": 16, "left": 26 },
      "logicalFootprint": { "type": "circle", "center": { "x": 0, "y": 0 }, "radius": 0.45 },
      "interactionAnchor": { "type": "none" },
      "occluderShape": { "type": "none" }
    },
    {
      "key": "shadow",
      "assetId": "world.shadow.tree.pine.harvestable.standard",
      "role": "world.shadow.contact",
      "tags": ["biome.forest", "species.pine", "variant.standard", "milestone.p1"],
      "state": "presentation",
      "canvasPx": { "width": 128, "height": 64 },
      "pivotPx": { "x": 64, "y": 48 },
      "drawSizeWU": { "width": 2, "height": 1 },
      "safePaddingPx": { "top": 8, "right": 16, "bottom": 16, "left": 16 },
      "logicalFootprint": { "type": "none" },
      "interactionAnchor": { "type": "none" },
      "occluderShape": { "type": "none" }
    }
  ]
}
READI_PROFILE_END */

    var PROFILE = {
        schemaVersion: 1,
        profileId: "profile.family.environment.harvest-tree.pine.v1",
        familyId: "family.environment.harvest-tree.pine",
        packageId: "package.p1.forest.core",
        displayName: "D8 Harvest Pine Family v1",
        ownerReviewRequired: true,
        sourceDensityPxPerWU: 64,
        outputs: [
            {
                key: "standing", assetId: "world.tree.pine.harvestable.standard",
                role: "world.resource.tree.harvestable",
                tags: ["biome.forest", "species.pine", "material.wood", "state.standing", "variant.standard", "milestone.p1"],
                state: "available", canvasPx: {width: 384, height: 448}, pivotPx: {x: 192, y: 416},
                drawSizeWU: {width: 6, height: 7}, safePaddingPx: {top: 32, right: 48, bottom: 32, left: 48},
                logicalFootprint: {type: "circle", center: {x: 0, y: 0}, radius: 0.575},
                interactionAnchor: {type: "radius", point: {x: 0, y: 0}, radius: 1.45},
                occluderShape: {type: "polygon", points: [
                    {x: -0.8, y: -5.8}, {x: 0.8, y: -5.8}, {x: 2.2, y: -3.8}, {x: 2.0, y: -1.2},
                    {x: 0.8, y: -0.6}, {x: -0.8, y: -0.6}, {x: -2.0, y: -1.2}, {x: -2.2, y: -3.8}
                ]}
            },
            {
                key: "stump", assetId: "world.tree.pine.harvestable.standard.stump", role: "world.resource.tree.stump",
                tags: ["biome.forest", "species.pine", "material.wood", "state.depleted", "variant.standard", "milestone.p1"],
                state: "depleted", canvasPx: {width: 128, height: 96}, pivotPx: {x: 64, y: 80},
                drawSizeWU: {width: 2, height: 1.5}, safePaddingPx: {top: 16, right: 25, bottom: 16, left: 26},
                logicalFootprint: {type: "circle", center: {x: 0, y: 0}, radius: 0.45},
                interactionAnchor: {type: "none"}, occluderShape: {type: "none"}
            },
            {
                key: "shadow", assetId: "world.shadow.tree.pine.harvestable.standard", role: "world.shadow.contact",
                tags: ["biome.forest", "species.pine", "variant.standard", "milestone.p1"],
                state: "presentation", canvasPx: {width: 128, height: 64}, pivotPx: {x: 64, y: 48},
                drawSizeWU: {width: 2, height: 1}, safePaddingPx: {top: 8, right: 16, bottom: 16, left: 16},
                logicalFootprint: {type: "none"}, interactionAnchor: {type: "none"}, occluderShape: {type: "none"}
            }
        ]
    };

    var GROUPS = ["00_GUIDES_DO_NOT_EXPORT", "10_ART", "20_OPTIONAL", "90_REVIEW_DO_NOT_EXPORT"];
    var sessionGroundConfirmed = {};
    var win = new Window("dialog", "Readi Asset Prep - Photoshop 2020");
    win.orientation = "column";
    win.alignChildren = "fill";
    win.spacing = 8;
    win.margins = 14;

    var profilePanel = win.add("panel", undefined, PROFILE.displayName);
    profilePanel.orientation = "column";
    profilePanel.alignChildren = "fill";
    profilePanel.margins = 12;
    var outputRow = profilePanel.add("group");
    outputRow.add("statictext", undefined, "Output:");
    var outputList = outputRow.add("dropdownlist", undefined, ["standing", "stump", "shadow"]);
    outputList.selection = 0;
    outputList.preferredSize.width = 180;
    outputRow.add("statictext", undefined, "Revision:");
    var revisionInput = outputRow.add("edittext", undefined, "r001");
    revisionInput.characters = 7;
    var runRow = profilePanel.add("group");
    runRow.add("statictext", undefined, "Prompt Run ID (optional):");
    var runInput = runRow.add("edittext", undefined, "");
    runInput.characters = 34;

    var docPanel = win.add("panel", undefined, "Master preparation");
    docPanel.orientation = "column";
    docPanel.alignChildren = "fill";
    docPanel.margins = 10;
    var row1 = docPanel.add("group");
    addButton(row1, "Create document from profile", createFromProfile);
    addButton(row1, "Validate active document", validateActive);
    var row2 = docPanel.add("group");
    addButton(row2, "RGB / 8-bit / sRGB", applyColorContract);
    addButton(row2, "Set canvas (no artwork scaling)", setCanvas);
    var row3 = docPanel.add("group");
    addButton(row3, "Create standard layer groups", createGroups);
    addButton(row3, "Create pivot + padding guides", createGuides);

    var exportPanel = win.add("panel", undefined, "Safe export and metadata files");
    exportPanel.orientation = "column";
    exportPanel.alignChildren = "fill";
    exportPanel.margins = 10;
    var row4 = exportPanel.add("group");
    addButton(row4, "Normalized PNG", function () { exportPng("normalized"); });
    addButton(row4, "Review PNG", function () { exportPng("review"); });
    var row5 = exportPanel.add("group");
    addButton(row5, "Geometry sidecar", writeSidecar);
    addButton(row5, "Passport draft", writePassport);

    var status = win.add("edittext", undefined, "Ready. This script uses no network and never writes to the game runtime.", {multiline: true, readonly: true});
    status.preferredSize = [660, 105];
    var footer = win.add("group");
    footer.alignment = "right";
    var closeButton = footer.add("button", undefined, "Close", {name: "cancel"});
    closeButton.onClick = function () { win.close(); };

    function addButton(parent, label, handler) {
        var button = parent.add("button", undefined, label);
        button.onClick = function () {
            try { handler(); } catch (error) { fail(error); }
        };
        return button;
    }

    function selectedOutput() { return PROFILE.outputs[outputList.selection.index]; }
    function selectedRevision() {
        var value = trim(revisionInput.text);
        if (!/^r\d{3}$/.test(value)) { throw new Error("Revision must use the r001-r999 format."); }
        return value;
    }
    function activeDocument() {
        if (app.documents.length === 0) { throw new Error("There is no active Photoshop document."); }
        return app.activeDocument;
    }
    function trim(value) { return String(value).replace(/^\s+|\s+$/g, ""); }
    function round(value, digits) {
        var factor = Math.pow(10, digits);
        return Math.round(value * factor) / factor;
    }
    function normalizedPivot(output) {
        return {x: round(output.pivotPx.x / output.canvasPx.width, 6), y: round(output.pivotPx.y / output.canvasPx.height, 6)};
    }
    function decodedMiB(output) { return round(output.canvasPx.width * output.canvasPx.height * 4 / 1048576, 3); }
    function stem(output) { return output.assetId.replace(/\./g, "-"); }
    function log(message) { status.text = message; }
    function fail(error) {
        var message = error && error.message ? error.message : String(error);
        status.text = "HIBA: " + message;
        alert("Readi Asset Prep\n\n" + message);
    }
    function confirmChange(message) { return confirm(message + "\n\nThis operation affects only the active document."); }

    function createFromProfile() {
        var output = selectedOutput();
        var revision = selectedRevision();
        var name = stem(output) + "__" + revision + "__master";
        var doc = app.documents.add(
            UnitValue(output.canvasPx.width, "px"), UnitValue(output.canvasPx.height, "px"), 72,
            name, NewDocumentMode.RGB, DocumentFill.TRANSPARENT, 1, BitsPerChannelType.EIGHT, "sRGB IEC61966-2.1"
        );
        app.activeDocument = doc;
        ensureGroups(doc);
        ensureGuides(doc, output);
        log("Created: " + name + " - " + output.canvasPx.width + "x" + output.canvasPx.height + " px, pivot " + output.pivotPx.x + "," + output.pivotPx.y + ".");
    }

    function validateDocument(doc, output, requireGroups) {
        var errors = [];
        var width = Math.round(doc.width.as("px"));
        var height = Math.round(doc.height.as("px"));
        if (width !== output.canvasPx.width || height !== output.canvasPx.height) {
            errors.push("Canvas: " + width + "x" + height + " px; expected: " + output.canvasPx.width + "x" + output.canvasPx.height + " px.");
        }
        if (doc.mode !== DocumentMode.RGB) { errors.push("Document mode is not RGB."); }
        if (doc.bitsPerChannel !== BitsPerChannelType.EIGHT) { errors.push("Document is not 8 bit/channel."); }
        var profileName = "";
        try { profileName = String(doc.colorProfileName).toLowerCase(); } catch (ignoreProfile) {}
        if (profileName.indexOf("srgb") < 0) { errors.push("Color profile is not sRGB: " + (profileName || "unknown") + "."); }
        if (requireGroups) {
            var i;
            for (i = 0; i < GROUPS.length; i += 1) {
                if (!findLayerSet(doc, GROUPS[i])) { errors.push("Missing layer group: " + GROUPS[i] + "."); }
            }
        }
        return errors;
    }

    function validateActive() {
        var output = selectedOutput();
        var errors = validateDocument(activeDocument(), output, true);
        if (errors.length) { log("BLOCKED:\r\n- " + errors.join("\r\n- ")); }
        else {
            var pivot = normalizedPivot(output);
            log("VALID - " + output.assetId + "\r\nNormalized pivot: " + pivot.x + ", " + pivot.y + " | Decoded RGBA: " + decodedMiB(output) + " MiB");
        }
    }

    function applyColorContract() {
        var doc = activeDocument();
        if (!confirmChange("Apply the RGB / 8-bit / sRGB IEC61966-2.1 color contract?")) { return; }
        if (doc.mode !== DocumentMode.RGB) { doc.changeMode(ChangeMode.RGB); }
        if (doc.bitsPerChannel !== BitsPerChannelType.EIGHT) { doc.bitsPerChannel = BitsPerChannelType.EIGHT; }
        var profileName = "";
        try { profileName = String(doc.colorProfileName).toLowerCase(); } catch (ignoreProfile) {}
        if (profileName.indexOf("srgb") < 0) {
            doc.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, true);
        }
        log("Color contract applied: RGB / 8-bit / sRGB.");
    }

    function setCanvas() {
        var output = selectedOutput();
        var doc = activeDocument();
        if (!confirmChange("Set canvas to " + output.canvasPx.width + "x" + output.canvasPx.height + " px from the center?\nArtwork will NOT be scaled.")) { return; }
        doc.resizeCanvas(UnitValue(output.canvasPx.width, "px"), UnitValue(output.canvasPx.height, "px"), AnchorPosition.MIDDLECENTER);
        log("Canvas set without artwork scaling: " + output.canvasPx.width + "x" + output.canvasPx.height + " px.");
    }

    function findLayerSet(doc, name) {
        var i;
        for (i = 0; i < doc.layerSets.length; i += 1) {
            if (doc.layerSets[i].name === name) { return doc.layerSets[i]; }
        }
        return null;
    }

    function ensureGroups(doc) {
        var i, group;
        for (i = GROUPS.length - 1; i >= 0; i -= 1) {
            group = findLayerSet(doc, GROUPS[i]);
            if (!group) { group = doc.layerSets.add(); group.name = GROUPS[i]; }
            group.visible = GROUPS[i] !== "00_GUIDES_DO_NOT_EXPORT" && GROUPS[i] !== "90_REVIEW_DO_NOT_EXPORT";
        }
    }

    function createGroups() {
        ensureGroups(activeDocument());
        log("All four standard layer groups are ready; repeated runs do not duplicate them.");
    }

    function hasGuide(doc, direction, coordinate) {
        var i, guideCoordinate;
        for (i = 0; i < doc.guides.length; i += 1) {
            guideCoordinate = Math.round(doc.guides[i].coordinate.as("px"));
            if (doc.guides[i].direction === direction && guideCoordinate === Math.round(coordinate)) { return true; }
        }
        return false;
    }

    function addGuide(doc, direction, coordinate) {
        if (!hasGuide(doc, direction, coordinate)) { doc.guides.add(direction, UnitValue(coordinate, "px")); }
    }

    function ensureGuides(doc, output) {
        var padding = output.safePaddingPx;
        addGuide(doc, Direction.VERTICAL, output.pivotPx.x);
        addGuide(doc, Direction.HORIZONTAL, output.pivotPx.y);
        addGuide(doc, Direction.VERTICAL, padding.left);
        addGuide(doc, Direction.VERTICAL, output.canvasPx.width - padding.right);
        addGuide(doc, Direction.HORIZONTAL, padding.top);
        addGuide(doc, Direction.HORIZONTAL, output.canvasPx.height - padding.bottom);
    }

    function createGuides() {
        var output = selectedOutput();
        ensureGuides(activeDocument(), output);
        log("Pivot, ground-line and safe-padding guides are ready; repeated runs do not duplicate them.");
    }

    function exportReady(doc, output) {
        var errors = validateDocument(doc, output, true);
        if (errors.length) { throw new Error("Export blocked:\n- " + errors.join("\n- ")); }
    }

    function setReviewVisibility(doc, mode) {
        var guides = findLayerSet(doc, "00_GUIDES_DO_NOT_EXPORT");
        var review = findLayerSet(doc, "90_REVIEW_DO_NOT_EXPORT");
        if (guides) { guides.visible = false; }
        if (review) { review.visible = mode === "review"; }
    }

    function exportPng(mode) {
        var output = selectedOutput();
        var revision = selectedRevision();
        var doc = activeDocument();
        exportReady(doc, output);
        var folder = Folder.selectDialog("Select the destination folder for the " + mode + " PNG");
        if (!folder) { return; }
        var file = new File(folder.fsName + "/" + stem(output) + "__" + revision + "__" + mode + ".png");
        refuseOverwrite(file);
        var duplicate = null;
        try {
            duplicate = doc.duplicate(stem(output) + "__TEMP_" + mode, false);
            app.activeDocument = duplicate;
            setReviewVisibility(duplicate, mode);
            var options = new PNGSaveOptions();
            options.interlaced = false;
            duplicate.saveAs(file, options, true, Extension.LOWERCASE);
        } finally {
            if (duplicate) { duplicate.close(SaveOptions.DONOTSAVECHANGES); }
            app.activeDocument = doc;
        }
        log("Export complete; the original master is unchanged: " + file.fsName);
    }

    function refuseOverwrite(file) {
        if (file.exists) { throw new Error("Destination already exists; overwrite is blocked:\n" + file.fsName); }
    }

    function confirmGround(output) {
        if (sessionGroundConfirmed[output.key]) { return true; }
        var accepted = confirm(
            "Ground-contact check\n\nIs the visual ground contact exactly on the pivot/ground-line (" +
            output.pivotPx.x + ", " + output.pivotPx.y + " px)?\n\nChoose Yes only after a real visual check."
        );
        if (accepted) { sessionGroundConfirmed[output.key] = true; }
        return accepted;
    }

    function commonMetadata(output, revision) {
        return {
            schemaVersion: 1,
            profileId: PROFILE.profileId,
            familyId: PROFILE.familyId,
            packageId: PROFILE.packageId,
            outputKey: output.key,
            assetId: output.assetId,
            role: output.role,
            revision: revision,
            tags: output.tags,
            state: output.state,
            canvasPx: output.canvasPx,
            pivotPx: output.pivotPx,
            pivotNormalized: normalizedPivot(output),
            drawSizeWU: output.drawSizeWU,
            sourceDensityPxPerWU: PROFILE.sourceDensityPxPerWU,
            safePaddingPx: output.safePaddingPx,
            decodedRgbaMiB: decodedMiB(output),
            logicalFootprint: output.logicalFootprint,
            interactionAnchor: output.interactionAnchor,
            occluderShape: output.occluderShape
        };
    }

    function writeSidecar() {
        var output = selectedOutput();
        var revision = selectedRevision();
        if (!confirmGround(output)) { throw new Error("Sidecar not written: ground-contact confirmation is required."); }
        var folder = Folder.selectDialog("Select the geometry sidecar destination folder");
        if (!folder) { return; }
        var file = new File(folder.fsName + "/" + stem(output) + "__" + revision + "__geometry.json");
        refuseOverwrite(file);
        var data = commonMetadata(output, revision);
        data.geometrySchema = "readi.geometry-sidecar.v1";
        data.groundContactConfirmed = true;
        writeJson(file, data);
        log("Geometry sidecar written: " + file.fsName);
    }

    function writePassport() {
        var output = selectedOutput();
        var revision = selectedRevision();
        var groundConfirmed = confirmGround(output);
        var folder = Folder.selectDialog("Select the passport draft destination folder");
        if (!folder) { return; }
        var file = new File(folder.fsName + "/" + stem(output) + "__" + revision + "__passport-draft.json");
        refuseOverwrite(file);
        var data = commonMetadata(output, revision);
        data.passportSchema = "readi.asset-passport-draft.v1";
        data.promptRunId = trim(runInput.text) || null;
        data.ownerReviewRequired = true;
        data.qaStatus = "PENDING";
        data.activationStatus = "NOT_INTEGRATED";
        data.groundContactConfirmed = groundConfirmed;
        if (!groundConfirmed) {
            delete data.pivotPx;
            delete data.pivotNormalized;
            data.actualPivotStatus = "PENDING_VISUAL_CONFIRMATION";
        } else {
            data.actualPivotStatus = "CONFIRMED_IN_CURRENT_SESSION";
        }
        writeJson(file, data);
        log("Passport draft written (QA: PENDING, activation: NOT_INTEGRATED): " + file.fsName);
    }

    function writeJson(file, value) {
        file.encoding = "UTF8";
        file.lineFeed = "Unix";
        if (!file.open("w")) { throw new Error("Cannot open for writing: " + file.fsName); }
        try { file.write(stringify(value, 0)); }
        finally { file.close(); }
    }

    function stringify(value, depth) {
        var indent = repeat("  ", depth);
        var nextIndent = repeat("  ", depth + 1);
        var i, parts, key;
        if (value === null) { return "null"; }
        if (typeof value === "string") { return quote(value); }
        if (typeof value === "number" || typeof value === "boolean") { return String(value); }
        if (value instanceof Array) {
            if (!value.length) { return "[]"; }
            parts = [];
            for (i = 0; i < value.length; i += 1) { parts.push(nextIndent + stringify(value[i], depth + 1)); }
            return "[\n" + parts.join(",\n") + "\n" + indent + "]";
        }
        parts = [];
        for (key in value) {
            if (value.hasOwnProperty(key) && typeof value[key] !== "undefined") {
                parts.push(nextIndent + quote(key) + ": " + stringify(value[key], depth + 1));
            }
        }
        return parts.length ? "{\n" + parts.join(",\n") + "\n" + indent + "}" : "{}";
    }

    function repeat(text, count) {
        var result = "";
        while (count > 0) { result += text; count -= 1; }
        return result;
    }

    function quote(value) {
        return "\"" + String(value)
            .replace(/\\/g, "\\\\").replace(/\"/g, "\\\"")
            .replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "\"";
    }

    win.center();
    win.show();
}());
