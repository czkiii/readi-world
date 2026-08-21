"use strict";

const { STANDARD_GROUPS } = require("./core.js");

const SRGB_PROFILE = "sRGB IEC61966-2.1";

function photoshop() {
  return require("photoshop");
}

function activeDocument() {
  const { app } = photoshop();
  if (!app.activeDocument) throw new Error("Open or create a Photoshop document first.");
  return app.activeDocument;
}

function enumText(value) {
  return String(value === undefined || value === null ? "" : value).toLowerCase();
}

function documentModeName(value) {
  return enumText(value).includes("rgb") ? "RGB" : String(value);
}

function bitDepthNumber(value) {
  const text = enumText(value);
  if (text.includes("eight") || text === "8") return 8;
  if (text.includes("sixteen") || text === "16") return 16;
  if (text.includes("thirtytwo") || text === "32") return 32;
  return Number(value);
}

function getDocumentSnapshot() {
  const doc = activeDocument();
  return Object.freeze({
    id: doc.id,
    name: doc.name || doc.title,
    width: Number(doc.width),
    height: Number(doc.height),
    mode: documentModeName(doc.mode),
    bitsPerChannel: bitDepthNumber(doc.bitsPerChannel),
    colorProfileName: String(doc.colorProfileName || ""),
    topLevelLayerNames: Array.from(doc.layers || []).map((layer) => layer.name)
  });
}

async function runModal(commandName, task) {
  return photoshop().core.executeAsModal(task, { commandName });
}

async function createDocumentFromOutput(output) {
  return runModal("Readi: Create document from profile", async () => {
    const { app } = photoshop();
    return app.createDocument({
      width: output.canvasPx.width,
      height: output.canvasPx.height,
      resolution: 72,
      mode: "RGBColorMode",
      fill: "transparent",
      name: `${output.key}-${output.canvasPx.width}x${output.canvasPx.height}`
    });
  });
}

async function applyColorContract() {
  return runModal("Readi: Apply RGB 8-bit sRGB", async () => {
    const { constants } = photoshop();
    const doc = activeDocument();
    if (documentModeName(doc.mode) !== "RGB") {
      await doc.changeMode(constants.ChangeMode.RGB);
    }
    if (bitDepthNumber(doc.bitsPerChannel) !== 8) {
      doc.bitsPerChannel = constants.BitsPerChannelType.EIGHT;
    }
    if (!String(doc.colorProfileName || "").toLowerCase().includes("srgb")) {
      await doc.convertProfile(SRGB_PROFILE, constants.Intent.RELATIVECOLORIMETRIC, true, true);
    }
  });
}

async function setCanvasWithoutScaling(output) {
  return runModal("Readi: Set canvas without scaling", async () => {
    const { constants } = photoshop();
    const doc = activeDocument();
    await doc.resizeCanvas(
      output.canvasPx.width,
      output.canvasPx.height,
      constants.AnchorPosition.MIDDLECENTER
    );
  });
}

async function createStandardLayerGroups() {
  return runModal("Readi: Create standard layer groups", async () => {
    const doc = activeDocument();
    const existing = new Set(Array.from(doc.layers || []).map((layer) => layer.name));
    for (const definition of [...STANDARD_GROUPS].reverse()) {
      if (existing.has(definition.name)) continue;
      const group = await doc.createLayerGroup({ name: definition.name });
      group.visible = definition.name === "10_ART" || definition.name === "20_OPTIONAL";
    }
  });
}

function hasGuide(doc, direction, coordinate) {
  return Array.from(doc.guides || []).some((guide) => {
    return enumText(guide.direction) === enumText(direction) && Math.abs(Number(guide.coordinate) - coordinate) < 0.01;
  });
}

async function addGuideIfMissing(doc, direction, coordinate) {
  if (!hasGuide(doc, direction, coordinate)) {
    await doc.guides.add(direction, coordinate);
  }
}

async function createProfileGuides(output) {
  return runModal("Readi: Create pivot and safe padding guides", async () => {
    const { constants } = photoshop();
    const doc = activeDocument();
    const vertical = constants.Direction.VERTICAL;
    const horizontal = constants.Direction.HORIZONTAL;
    const { width, height } = output.canvasPx;
    const padding = output.safePaddingPx;
    await addGuideIfMissing(doc, vertical, output.pivotPx.x);
    await addGuideIfMissing(doc, horizontal, output.pivotPx.y);
    await addGuideIfMissing(doc, vertical, padding.left);
    await addGuideIfMissing(doc, vertical, width - padding.right);
    await addGuideIfMissing(doc, horizontal, padding.top);
    await addGuideIfMissing(doc, horizontal, height - padding.bottom);
  });
}

function setExportVisibility(doc, exportKind) {
  const normalizedHidden = new Set(["00_GUIDES_DO_NOT_EXPORT", "90_REVIEW_DO_NOT_EXPORT"]);
  const reviewHidden = new Set(["00_GUIDES_DO_NOT_EXPORT"]);
  const hidden = exportKind === "normalized" ? normalizedHidden : reviewHidden;
  Array.from(doc.layers || []).forEach((layer) => {
    if (STANDARD_GROUPS.some((definition) => definition.name === layer.name)) {
      layer.visible = !hidden.has(layer.name);
    }
  });
}

async function exportPngToFile(outputFile, exportKind) {
  return runModal(`Readi: Export ${exportKind} PNG`, async (executionContext) => {
    const source = activeDocument();
    let duplicate = null;
    let registeredForAutoClose = false;
    try {
      duplicate = await source.duplicate(`__readi_export_${exportKind}`, false);
      await executionContext.hostControl.registerAutoCloseDocument(duplicate.id);
      registeredForAutoClose = true;
      setExportVisibility(duplicate, exportKind);
      await duplicate.saveAs.png(outputFile, { compression: 6, interlaced: false }, true);
      await executionContext.hostControl.unregisterAutoCloseDocument(duplicate.id);
      registeredForAutoClose = false;
      duplicate.closeWithoutSaving();
      duplicate = null;
    } finally {
      if (duplicate && !registeredForAutoClose) duplicate.closeWithoutSaving();
    }
  });
}

module.exports = {
  SRGB_PROFILE,
  applyColorContract,
  createDocumentFromOutput,
  createProfileGuides,
  createStandardLayerGroups,
  exportPngToFile,
  getDocumentSnapshot,
  setCanvasWithoutScaling
};
