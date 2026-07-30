export const WORLD_STATE_SCHEMA_VERSION = 1;

const STABLE_ID_PATTERN = /^[a-z0-9]+(?:[._-][a-z0-9]+)*$/;

export class WorldStateContractError extends Error {
  constructor(code, message) {
    super(message);
    this.name = "WorldStateContractError";
    this.code = code;
  }
}

export function createInitialWorldState({ worldId }) {
  assertStableId(worldId, "worldId");

  return deepFreeze({
    schemaVersion: WORLD_STATE_SCHEMA_VERSION,
    revision: 0,
    world: {
      id: worldId
    },
    clock: {
      tick: 0
    },
    entities: {},
    systems: {},
    metadata: {
      lastCommandId: null,
      appliedCommandIds: []
    }
  });
}

export function validateWorldState(state) {
  assertPlainRecord(state, "world state");
  assertJsonValue(state, "world state");

  if (state.schemaVersion !== WORLD_STATE_SCHEMA_VERSION) {
    throw new WorldStateContractError(
      "UNSUPPORTED_SCHEMA_VERSION",
      `Expected World State schema ${WORLD_STATE_SCHEMA_VERSION}.`
    );
  }

  assertNonNegativeInteger(state.revision, "revision");
  assertPlainRecord(state.world, "world");
  assertStableId(state.world.id, "world.id");
  assertPlainRecord(state.clock, "clock");
  assertNonNegativeInteger(state.clock.tick, "clock.tick");
  assertPlainRecord(state.entities, "entities");
  assertPlainRecord(state.systems, "systems");
  assertPlainRecord(state.metadata, "metadata");

  for (const [instanceId, instance] of Object.entries(state.entities)) {
    assertStableId(instanceId, "entity instance key");
    assertPlainRecord(instance, `entity ${instanceId}`);

    if (instance.id !== instanceId) {
      throw new WorldStateContractError(
        "ENTITY_ID_MISMATCH",
        `Entity ${instanceId} must contain the same stable id.`
      );
    }

    assertStableId(instance.definitionId, `entity ${instanceId}.definitionId`);
    assertJsonValue(instance, `entity ${instanceId}`);
  }

  assertJsonValue(state.systems, "systems");

  if (
    state.metadata.lastCommandId !== null &&
    typeof state.metadata.lastCommandId !== "string"
  ) {
    throw new WorldStateContractError(
      "INVALID_LAST_COMMAND_ID",
      "metadata.lastCommandId must be a string or null."
    );
  }

  if (state.metadata.lastCommandId !== null) {
    assertStableId(state.metadata.lastCommandId, "metadata.lastCommandId");
  }

  if (!Array.isArray(state.metadata.appliedCommandIds)) {
    throw new WorldStateContractError(
      "INVALID_COMMAND_LEDGER",
      "metadata.appliedCommandIds must be an array."
    );
  }

  const uniqueCommandIds = new Set();

  for (const commandId of state.metadata.appliedCommandIds) {
    assertStableId(commandId, "applied command id");

    if (uniqueCommandIds.has(commandId)) {
      throw new WorldStateContractError(
        "DUPLICATE_COMMAND_LEDGER_ENTRY",
        `Command ${commandId} appears more than once in the ledger.`
      );
    }

    uniqueCommandIds.add(commandId);
  }

  if (
    state.metadata.lastCommandId !== null &&
    !uniqueCommandIds.has(state.metadata.lastCommandId)
  ) {
    throw new WorldStateContractError(
      "LAST_COMMAND_NOT_APPLIED",
      "metadata.lastCommandId must appear in the applied command ledger."
    );
  }

  return state;
}

export function assertStableId(value, fieldName) {
  if (typeof value !== "string" || !STABLE_ID_PATTERN.test(value)) {
    throw new WorldStateContractError(
      "INVALID_STABLE_ID",
      `${fieldName} must be a lowercase stable id.`
    );
  }
}

export function assertPlainRecord(value, fieldName) {
  if (
    value === null ||
    typeof value !== "object" ||
    Array.isArray(value) ||
    Object.getPrototypeOf(value) !== Object.prototype
  ) {
    throw new WorldStateContractError(
      "INVALID_RECORD",
      `${fieldName} must be a plain object.`
    );
  }
}

export function assertJsonValue(value, fieldName) {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    (typeof value === "number" && Number.isFinite(value))
  ) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => assertJsonValue(item, `${fieldName}[${index}]`));
    return;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  ) {
    for (const [key, item] of Object.entries(value)) {
      assertJsonValue(item, `${fieldName}.${key}`);
    }
    return;
  }

  throw new WorldStateContractError(
    "NON_SERIALIZABLE_VALUE",
    `${fieldName} must contain only JSON-compatible values.`
  );
}

export function deepFreeze(value) {
  if (value === null || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }

  Object.freeze(value);

  for (const child of Object.values(value)) {
    deepFreeze(child);
  }

  return value;
}

function assertNonNegativeInteger(value, fieldName) {
  if (!Number.isInteger(value) || value < 0) {
    throw new WorldStateContractError(
      "INVALID_NON_NEGATIVE_INTEGER",
      `${fieldName} must be a non-negative integer.`
    );
  }
}
