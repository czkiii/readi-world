import { RUNTIME_CONFIG } from "./config/runtime-config.js";
import { startMinimalLoopRuntime } from "./gameplay/minimal-loop/minimal-loop-runtime.js?v=mobile-scale-proof";

const app = document.querySelector("#app");
const canvas = document.querySelector("#world-canvas");
const status = document.querySelector("#runtime-status");
const woodCount = document.querySelector("#wood-count");
const repairTimberCount = document.querySelector("#repair-timber-count");
const objective = document.querySelector("#objective-text");
const prompt = document.querySelector("#context-prompt");
const toast = document.querySelector("#toast");
const milestoneBanner = document.querySelector("#milestone-banner");
const joystickZone = document.querySelector("#joystick-zone");
const joystickRoot = document.querySelector("#joystick");
const joystickKnob = document.querySelector("#joystick-knob");

if (!(app instanceof HTMLElement)) {
  throw new Error("Missing required #app bootstrap root.");
}

if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error("Missing required #world-canvas render target.");
}

if (!(status instanceof HTMLElement)) {
  throw new Error("Missing required #runtime-status element.");
}

for (const [name, element] of [
  ["wood-count", woodCount],
  ["repair-timber-count", repairTimberCount],
  ["objective-text", objective],
  ["context-prompt", prompt],
  ["toast", toast],
  ["milestone-banner", milestoneBanner],
  ["joystick-zone", joystickZone],
  ["joystick", joystickRoot],
  ["joystick-knob", joystickKnob]
]) {
  if (!(element instanceof HTMLElement)) {
    throw new Error(`Missing required #${name} element.`);
  }
}

document.documentElement.dataset.runtimeVersion = RUNTIME_CONFIG.runtimeVersion;

startMinimalLoopRuntime({
  canvas,
  status,
  woodCount,
  repairTimberCount,
  objective,
  prompt,
  toast,
  milestoneBanner,
  joystickZone,
  joystickRoot,
  joystickKnob
}).catch((error) => {
  status.textContent = "A játék indítása sikertelen";
  console.error("Runtime bootstrap failed", error);
});
