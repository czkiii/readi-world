import {
  assertJsonValue,
  assertPlainRecord,
  assertStableId,
  deepFreeze,
  validateWorldState
} from "./world-state-contract.js";

const COMMAND_TYPE_PATTERN = /^[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+$/;

export class WorldStateCommandError extends Error {
  constructor(code, message, options = {}) {
    super(message, options);
    this.name = "WorldStateCommandError";
    this.code = code;
  }
}

export function createWorldStateStore({ initialState, commandHandlers }) {
  validateWorldState(initialState);
  assertPlainRecord(commandHandlers, "commandHandlers");

  const handlers = new Map();

  for (const [commandType, handler] of Object.entries(commandHandlers)) {
    assertCommandType(commandType, "registered command type");

    if (typeof handler !== "function") {
      throw new WorldStateCommandError(
        "INVALID_COMMAND_HANDLER",
        `Handler for ${commandType} must be a function.`
      );
    }

    handlers.set(commandType, handler);
  }

  let currentState = deepFreeze(structuredClone(initialState));

  return Object.freeze({
    getState() {
      return currentState;
    },

    dispatch(command) {
      validateCommand(command);

      if (currentState.metadata.appliedCommandIds.includes(command.id)) {
        return deepFreeze({
          status: "duplicate",
          commandId: command.id,
          fromRevision: currentState.revision,
          toRevision: currentState.revision,
          state: currentState,
          events: []
        });
      }

      if (command.expectedRevision !== currentState.revision) {
        throw new WorldStateCommandError(
          "REVISION_CONFLICT",
          `Command ${command.id} expected revision ${command.expectedRevision}, ` +
            `but the current revision is ${currentState.revision}.`
        );
      }

      const handler = handlers.get(command.type);

      if (!handler) {
        throw new WorldStateCommandError(
          "UNKNOWN_COMMAND",
          `No handler is registered for ${command.type}.`
        );
      }

      const fromRevision = currentState.revision;
      const draft = structuredClone(currentState);
      const pendingEvents = [];

      const transactionContext = Object.freeze({
        emit(type, payload = {}) {
          assertCommandType(type, "event type");
          assertJsonValue(payload, `event ${type} payload`);
          pendingEvents.push({ type, payload: structuredClone(payload) });
        }
      });

      try {
        const handlerResult = handler(
          draft,
          structuredClone(command.payload),
          transactionContext
        );

        if (
          handlerResult !== undefined &&
          typeof handlerResult === "object" &&
          typeof handlerResult.then === "function"
        ) {
          throw new WorldStateCommandError(
            "ASYNC_HANDLER_NOT_SUPPORTED",
            "World State command handlers must be synchronous and deterministic."
          );
        }

        draft.revision = fromRevision + 1;
        draft.metadata.lastCommandId = command.id;
        draft.metadata.appliedCommandIds.push(command.id);
        validateWorldState(draft);
      } catch (error) {
        if (error instanceof WorldStateCommandError) {
          throw error;
        }

        throw new WorldStateCommandError(
          "COMMAND_REJECTED",
          `Command ${command.id} was rejected without changing World State.`,
          { cause: error }
        );
      }

      const nextRevision = draft.revision;
      const committedEvents = pendingEvents.map((event, index) => ({
        id: `${command.id}.event.${index + 1}`,
        type: event.type,
        revision: nextRevision,
        payload: event.payload
      }));

      currentState = deepFreeze(draft);

      return deepFreeze({
        status: "committed",
        commandId: command.id,
        fromRevision,
        toRevision: nextRevision,
        state: currentState,
        events: committedEvents
      });
    }
  });
}

function validateCommand(command) {
  assertPlainRecord(command, "command");
  assertStableId(command.id, "command.id");
  assertCommandType(command.type, "command.type");

  if (!Number.isInteger(command.expectedRevision) || command.expectedRevision < 0) {
    throw new WorldStateCommandError(
      "INVALID_EXPECTED_REVISION",
      "command.expectedRevision must be a non-negative integer."
    );
  }

  assertPlainRecord(command.payload, "command.payload");
  assertJsonValue(command.payload, "command.payload");
}

function assertCommandType(value, fieldName) {
  if (typeof value !== "string" || !COMMAND_TYPE_PATTERN.test(value)) {
    throw new WorldStateCommandError(
      "INVALID_COMMAND_TYPE",
      `${fieldName} must be a namespaced lowercase type.`
    );
  }
}
