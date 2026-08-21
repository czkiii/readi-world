"use strict";

function getFileSystem() {
  return require("uxp").storage.localFileSystem;
}

async function loadBundledJson(relativePath) {
  const fs = getFileSystem();
  const pluginFolder = await fs.getPluginFolder();
  const entry = await pluginFolder.getEntry(relativePath);
  return JSON.parse(await entry.read());
}

async function chooseOutputFolder() {
  return getFileSystem().getFolder();
}

async function createNewFile(folder, name) {
  if (!folder) throw new Error("Output folder selection was cancelled.");
  try {
    return await folder.createFile(name, { overwrite: false });
  } catch (error) {
    throw new Error(`Refusing to overwrite existing file: ${name}`);
  }
}

async function writeJson(folder, name, value) {
  const file = await createNewFile(folder, name);
  await file.write(`${JSON.stringify(value, null, 2)}\n`);
  return file;
}

module.exports = {
  chooseOutputFolder,
  createNewFile,
  loadBundledJson,
  writeJson
};
