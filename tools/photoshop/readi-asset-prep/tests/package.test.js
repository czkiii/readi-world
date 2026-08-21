"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const root = path.join(__dirname, "..");

test("UXP manifest is a local-only Photoshop 24+ panel", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
  assert.equal(manifest.manifestVersion, 5);
  assert.equal(manifest.host.app, "PS");
  assert.equal(manifest.host.minVersion, "24.0.0");
  assert.equal(manifest.host.data.apiVersion, 2);
  assert.deepEqual(manifest.requiredPermissions, { localFileSystem: "request" });
  assert.equal(manifest.entrypoints.length, 1);
  assert.equal(manifest.entrypoints[0].type, "panel");
});

test("plugin package contains every referenced local entry", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
  assert.equal(fs.existsSync(path.join(root, manifest.main)), true);
  for (const relativePath of [
    "index.js",
    "styles.css",
    "src/core.js",
    "src/photoshop-adapter.js",
    "src/storage-adapter.js",
    "profiles/pine-family-v1.json"
  ]) {
    assert.equal(fs.existsSync(path.join(root, relativePath)), true, `${relativePath} is missing`);
  }
});

test("plugin source contains no network or runtime write capability", () => {
  const sourceFiles = ["index.js", "src/core.js", "src/photoshop-adapter.js", "src/storage-adapter.js"];
  const source = sourceFiles.map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
  assert.doesNotMatch(source, /\bfetch\s*\(|XMLHttpRequest|WebSocket/);
  assert.doesNotMatch(source, /activationStatus\s*:\s*["']INTEGRATED["']/);
  assert.doesNotMatch(source, /runtime[\\/]/i);
});
