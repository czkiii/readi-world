export const REPAIR_TIMBER_RECIPE = deepFreeze({
  id: "recipe.forester-repair-timber",
  contentVersion: 1,
  inputs: [
    { itemId: "item.wood", quantity: 3 }
  ],
  outputs: [
    { itemId: "item.repair-timber", quantity: 1 }
  ],
  requirements: {
    workstationCapability: "crafting.basic-woodworking"
  },
  durationSeconds: 1.4
});

export function validateMinimalCraftingRecipe(recipe) {
  if (
    !recipe ||
    recipe.id !== "recipe.forester-repair-timber" ||
    !Number.isInteger(recipe.contentVersion) ||
    recipe.contentVersion < 1
  ) {
    throw craftingContractError("INVALID_RECIPE_IDENTITY");
  }

  validateItemList(recipe.inputs, "INVALID_RECIPE_INPUTS");
  validateItemList(recipe.outputs, "INVALID_RECIPE_OUTPUTS");

  if (
    recipe.requirements?.workstationCapability !==
    "crafting.basic-woodworking"
  ) {
    throw craftingContractError("INVALID_WORKSTATION_CAPABILITY");
  }

  if (
    !Number.isFinite(recipe.durationSeconds) ||
    recipe.durationSeconds <= 0
  ) {
    throw craftingContractError("INVALID_CRAFT_DURATION");
  }

  return recipe;
}

function validateItemList(items, errorCode) {
  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    items.some(
      (item) =>
        !item ||
        typeof item.itemId !== "string" ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
    )
  ) {
    throw craftingContractError(errorCode);
  }
}

function craftingContractError(code) {
  return Object.assign(new Error(code), { code });
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }

  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}
