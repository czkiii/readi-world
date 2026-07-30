import { RUNTIME_CONFIG } from "./config/runtime-config.js";

const app = document.querySelector("#app");
const canvas = document.querySelector("#world-canvas");
const status = document.querySelector("#runtime-status");

if (!(app instanceof HTMLElement)) {
  throw new Error("Missing required #app bootstrap root.");
}

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Missing required #world-canvas render target.");
}

if (!(status instanceof HTMLElement)) {
  throw new Error("Missing required #runtime-status element.");
}

document.documentElement.dataset.runtimeVersion = RUNTIME_CONFIG.runtimeVersion;
status.textContent = `Clean runtime ${RUNTIME_CONFIG.runtimeVersion} készen áll.`;
