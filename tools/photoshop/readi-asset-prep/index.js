"use strict";

const core = require("./src/core.js");
const ps = require("./src/photoshop-adapter.js");
const storage = require("./src/storage-adapter.js");

const state = {
  profile: null,
  output: null,
  busy: false,
  alignmentConfirmations: new Set()
};

function element(id) {
  return document.getElementById(id);
}

function setStatus(message, tone = "neutral") {
  element("status").textContent = message;
  document.querySelector(".status-section").dataset.tone = tone;
}

function formatNumber(value, digits = 6) {
  return Number(value).toFixed(digits).replace(/0+$/, "").replace(/\.$/, "");
}

function revision() {
  return core.validateRevision(element("revision").value.trim());
}

function alignmentKey() {
  return `${state.output.assetId}:${revision()}`;
}

function renderOutput() {
  const output = state.output;
  const pivot = core.calculateNormalizedPivot(output.canvasPx, output.pivotPx);
  element("asset-id").value = output.assetId;
  element("profile-facts").innerHTML = [
    `<strong>${output.canvasPx.width}×${output.canvasPx.height}px</strong> canvas`,
    `<strong>(${output.pivotPx.x}, ${output.pivotPx.y})</strong> pivot`,
    `<strong>(${formatNumber(pivot.x)}, ${formatNumber(pivot.y)})</strong> normalized`,
    `<strong>${output.drawSizeWU.width}×${output.drawSizeWU.height} WU</strong>`
  ].join(" • ");
  element("memory").innerHTML = `Decoded RGBA estimate: <strong>${formatNumber(core.estimateDecodedMiB(output.canvasPx), 3)} MiB</strong>`;
}

function selectOutput(key) {
  state.output = core.selectOutput(state.profile, key);
  renderOutput();
}

function setBusy(busy) {
  state.busy = busy;
  document.querySelectorAll("button, select").forEach((control) => {
    control.disabled = busy;
  });
}

async function runAction(label, action) {
  if (state.busy) return;
  setBusy(true);
  setStatus(`${label}…`);
  try {
    const result = await action();
    setStatus(result || `${label}: complete.`, "good");
  } catch (error) {
    console.error(error);
    setStatus(`${label}: FAILED\n${error.message || error}`, "bad");
  } finally {
    setBusy(false);
  }
}

function validationText(result) {
  if (result.issues.length === 0) return "Active document matches the selected profile.";
  return result.issues.map((issue) => `${issue.severity.toUpperCase()} ${issue.code}: ${issue.message}`).join("\n");
}

function validateActiveDocument() {
  const snapshot = ps.getDocumentSnapshot();
  const result = core.validateDocumentSnapshot(snapshot, state.output);
  return { snapshot, result };
}

function requireExportReady() {
  revision();
  const validation = validateActiveDocument();
  if (!validation.result.ok) {
    throw new Error(`Document is not export-ready:\n${validationText(validation.result)}`);
  }
  return validation;
}

async function exportPng(kind) {
  requireExportReady();
  const names = core.buildOutputNames(state.output, revision());
  const folder = await storage.chooseOutputFolder();
  const file = await storage.createNewFile(folder, names[kind]);
  try {
    await ps.exportPngToFile(file, kind);
  } catch (error) {
    if (typeof file.delete === "function") {
      try { await file.delete(); } catch (_) { /* preserve original error */ }
    }
    throw error;
  }
  return `Created ${names[kind]} without modifying the master.`;
}

async function writeGeometry() {
  requireExportReady();
  if (!window.confirm("Is the artwork ground contact visually aligned to the pivot guide?\n\nThis writes metadata only; it does not approve or integrate the asset.")) {
    throw new Error("Geometry write cancelled: ground-contact alignment was not confirmed.");
  }
  const currentRevision = revision();
  const names = core.buildOutputNames(state.output, currentRevision);
  const sidecar = core.buildGeometrySidecar(state.profile, state.output, currentRevision);
  const folder = await storage.chooseOutputFolder();
  await storage.writeJson(folder, names.geometry, sidecar);
  state.alignmentConfirmations.add(alignmentKey());
  return `Created ${names.geometry}. Status remains NOT_INTEGRATED.`;
}

async function writePassport() {
  requireExportReady();
  const currentRevision = revision();
  const names = core.buildOutputNames(state.output, currentRevision);
  const passport = core.buildPassportDraft(state.profile, state.output, currentRevision, {
    promptRunId: element("prompt-run").value.trim() || "TODO",
    photoshopVersion: (require("uxp").host && require("uxp").host.version) || "TODO",
    alignmentConfirmed: state.alignmentConfirmations.has(alignmentKey())
  });
  const folder = await storage.chooseOutputFolder();
  await storage.writeJson(folder, names.passport, passport);
  return `Created ${names.passport}. QA and owner approval remain PENDING.`;
}

function bindActions() {
  element("output").addEventListener("change", (event) => selectOutput(event.target.value));
  element("create-document").addEventListener("click", () => runAction("Create document", async () => {
    await ps.createDocumentFromOutput(state.output);
    await ps.createStandardLayerGroups();
    await ps.createProfileGuides(state.output);
    return "New transparent document, standard groups and profile guides created.";
  }));
  element("validate-document").addEventListener("click", () => runAction("Validate document", async () => {
    const { result } = validateActiveDocument();
    if (!result.ok) throw new Error(validationText(result));
    return validationText(result);
  }));
  element("apply-color").addEventListener("click", () => runAction("Apply color contract", async () => {
    if (!window.confirm("Convert the active document to RGB, 8-bit and sRGB?\n\nUse a saved master revision or backup before destructive color conversion.")) {
      throw new Error("Color conversion cancelled.");
    }
    await ps.applyColorContract();
  }));
  element("set-canvas").addEventListener("click", () => runAction("Set canvas", async () => {
    const { width, height } = state.output.canvasPx;
    if (!window.confirm(`Resize canvas to ${width}×${height}px without scaling artwork?`)) {
      throw new Error("Canvas resize cancelled.");
    }
    await ps.setCanvasWithoutScaling(state.output);
  }));
  element("create-groups").addEventListener("click", () => runAction("Create groups", () => ps.createStandardLayerGroups()));
  element("create-guides").addEventListener("click", () => runAction("Create guides", () => ps.createProfileGuides(state.output)));
  element("export-normalized").addEventListener("click", () => runAction("Export normalized PNG", () => exportPng("normalized")));
  element("export-review").addEventListener("click", () => runAction("Export review PNG", () => exportPng("review")));
  element("write-geometry").addEventListener("click", () => runAction("Write geometry sidecar", writeGeometry));
  element("write-passport").addEventListener("click", () => runAction("Create passport draft", writePassport));
}

async function initialize() {
  try {
    state.profile = core.validateFamilyProfile(await storage.loadBundledJson("profiles/pine-family-v1.json"));
    element("family").value = state.profile.familyId;
    element("owner-warning").hidden = !state.profile.ownerReviewRequired;
    const select = element("output");
    state.profile.outputs.forEach((output) => {
      const option = document.createElement("option");
      option.value = output.key;
      option.textContent = `${output.key} — ${output.assetId}`;
      select.appendChild(option);
    });
    selectOutput(state.profile.outputs[0].key);
    bindActions();
    setStatus("Bundled family profile loaded. Select an output and open or create a document.", "good");
  } catch (error) {
    setStatus(`Plugin initialization failed:\n${error.message || error}`, "bad");
    document.querySelectorAll("button, select").forEach((control) => { control.disabled = true; });
  }
}

document.addEventListener("DOMContentLoaded", initialize);
