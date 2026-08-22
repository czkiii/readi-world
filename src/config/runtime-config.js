export const VISUAL_SCALE = Object.freeze({
  worldPixelsPerUnit: 32,
  camera: Object.freeze({
    normalCssPixelsPerWU: 20,
    playerScreenAnchorY: 0.6
  }),
  drawSizeWU: Object.freeze({
    character: Object.freeze({ width: 1.5, height: 2.35 }),
    workbench: Object.freeze({ width: 3.0, height: 2.3 }),
    foresterHut: Object.freeze({ width: 10.5, height: 12.0 })
  }),
  doorWU: Object.freeze({ width: 1.1, height: 2.3 }),
  pathWidthRangesWU: Object.freeze({
    main: Object.freeze({ min: 3.5, max: 5.0 }),
    secondary: Object.freeze({ min: 2.6, max: 4.0 })
  })
});

export const RUNTIME_CONFIG = Object.freeze({
  runtimeVersion: "0.5.1-d4-scale-contract",
  worldStateSchemaVersion: 1,
  definitionSchemaVersion: 1,
  primaryOrientation: "portrait",
  proofPlatform: "github-pages-pwa",
  proofDevice: "iphone-16-pro"
});
