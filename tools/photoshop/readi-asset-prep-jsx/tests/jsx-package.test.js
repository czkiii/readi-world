const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const jsxPath = path.join(root, "Readi Asset Prep.jsx");
const jsx = fs.readFileSync(jsxPath, "utf8");
const canonical = JSON.parse(fs.readFileSync(
  path.resolve(root, "..", "readi-asset-prep", "profiles", "pine-family-v1.json"),
  "utf8"
));

function embeddedProfile() {
  const match = jsx.match(/\/\* READI_PROFILE_BEGIN\s*([\s\S]*?)\s*READI_PROFILE_END \*\//);
  assert.ok(match, "embedded canonical profile marker missing");
  return JSON.parse(match[1]);
}

test("JSX source is parseable after ExtendScript directives are stripped", () => {
  const parseable = jsx.replace(/^#target[^\r\n]*[\r\n]+/, "");
  assert.doesNotThrow(() => new vm.Script(parseable, { filename: "Readi Asset Prep.jsx" }));
});

test("embedded Photoshop 2020 profile exactly matches the UXP canonical profile", () => {
  assert.deepEqual(embeddedProfile(), canonical);
});

test("package contains Photoshop 2020 UI, document, guide and duplicate export paths", () => {
  const required = [
    "#target photoshop",
    'new Window("dialog"',
    "00_GUIDES_DO_NOT_EXPORT",
    "10_ART",
    "20_OPTIONAL",
    "90_REVIEW_DO_NOT_EXPORT",
    "resizeCanvas",
    "Direction.VERTICAL",
    "Direction.HORIZONTAL",
    ".duplicate(",
    "PNGSaveOptions",
    "Folder.selectDialog",
    "SaveOptions.DONOTSAVECHANGES"
  ];
  for (const marker of required) assert.ok(jsx.includes(marker), `missing ${marker}`);
});

test("overwrite, revision, ground-contact and non-activation guards are present", () => {
  const required = [
    "file.exists",
    "/^r\\d{3}$/",
    "groundContactConfirmed",
    'data.qaStatus = "PENDING"',
    'data.activationStatus = "NOT_INTEGRATED"',
    "PENDING_VISUAL_CONFIRMATION"
  ];
  for (const marker of required) assert.ok(jsx.includes(marker), `missing ${marker}`);
});

test("script has no network or runtime write path", () => {
  const forbidden = ["fetch(", "XMLHttpRequest", "WebSocket", "http://", "https://", "runtime/", "runtime\\\\"];
  for (const marker of forbidden) assert.equal(jsx.includes(marker), false, `forbidden ${marker}`);
});

test("installation and host acceptance documents ship with the adapter", () => {
  assert.ok(fs.existsSync(path.join(root, "README.md")));
  assert.ok(fs.existsSync(path.join(root, "MANUAL-ACCEPTANCE.md")));
});

test("stable Action dispatcher and optimization controls ship with the adapter", () => {
  const dispatcherPath = path.resolve(root, "..", "ReadiWorldScript.jsx");
  const policyPath = path.resolve(root, "..", "..", "..", "art-source", "_registry", "asset-prep-policy.json");
  const checkPath = path.resolve(root, "..", "..", "art-pipeline", "asset-prep-check.ps1");
  const scaffoldPath = path.resolve(root, "..", "..", "art-pipeline", "asset-prep-scaffold.ps1");
  const workflowProfilePath = path.resolve(root, "..", "..", "..", "art-source", "_registry", "photoshop-workflow-profile.json");
  const controlPacketToolPath = path.resolve(root, "..", "..", "art-pipeline", "asset-prep-control-packet.ps1");
  assert.ok(fs.existsSync(dispatcherPath));
  assert.ok(fs.existsSync(policyPath));
  assert.ok(fs.existsSync(checkPath));
  assert.ok(fs.existsSync(scaffoldPath));
  assert.ok(fs.existsSync(workflowProfilePath));
  assert.ok(fs.existsSync(controlPacketToolPath));

  const dispatcher = fs.readFileSync(dispatcherPath, "utf8");
  assert.ok(dispatcher.includes("$.evalFile(main)"));
  assert.equal(dispatcher.includes("runtime/"), false);

  const policy = JSON.parse(fs.readFileSync(policyPath, "utf8"));
  assert.equal(policy.productionLaunch.allowBrowseDuringProduction, false);
  assert.equal(policy.weeklyBudget.maxGuiScreenshotsPerAssetRun, 3);
  assert.equal(policy.weeklyBudget.maxFullPipelineRetries, 1);
  assert.equal(policy.paths.createBeforePhotoshop, true);
  assert.equal(policy.paths.requireResolvedPathMap, true);
  assert.equal(policy.delegation.preferCodexFilePreparation, true);
  assert.equal(policy.readiness.requireSeparateRuntimeIntegrationPackage, true);
  assert.equal(policy.controlPacket.ownerAbsenceDoesNotBlockSafeAutonomousSteps, true);

  const workflowProfile = JSON.parse(fs.readFileSync(workflowProfilePath, "utf8"));
  assert.equal(workflowProfile.action.name, "ReadiWorldScript");
  assert.equal(workflowProfile.action.verifyConflictBeforeAssignment, true);
  assert.ok(workflowProfile.workspace.requiredPanels.includes("Actions"));
  assert.ok(workflowProfile.automation.codexOwns.includes("CONTACT_AND_QA_SHEET_PREPARATION"));
  assert.ok(workflowProfile.automation.forbiddenAutomaticMutations.includes("RUNTIME_ACTIVATION"));
});
