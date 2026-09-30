import { createEvent } from "../events/index.mjs";

function clone(value) {
  return structuredClone(value);
}

export class WorldState {
  #state;
  #events = [];

  constructor(initialState = {}) {
    this.#state = clone({
      version: 0,
      employees: {},
      people: {},
      systems: {},
      work_items: {},
      facts: {},
      ...initialState
    });
  }

  snapshot() {
    return clone(this.#state);
  }

  events() {
    return clone(this.#events);
  }

  record(rawEvent) {
    const event = createEvent(rawEvent);
    this.#events.push(event);
    return event;
  }

  applyConsequence(input) {
    const { target_collection, target_id, patch, triggering_event_id } = input;
    if (!target_collection || !target_id || !patch || !triggering_event_id) {
      throw new Error("Consequence requires target_collection, target_id, patch and triggering_event_id");
    }

    const collection = this.#state[target_collection];
    if (!collection || typeof collection !== "object") {
      throw new Error("Unknown target collection: " + target_collection);
    }

    const before = clone(collection[target_id] ?? {});
    const after = { ...before, ...clone(patch) };
    collection[target_id] = after;
    this.#state.version += 1;

    return Object.freeze({
      consequence_id: input.consequence_id,
      triggering_event_id,
      applied_at: input.applied_at,
      target_type: target_collection,
      target_id,
      before_state: before,
      after_state: clone(after),
      reversible: input.reversible ?? true,
      severity: input.severity ?? "normal",
      visibility: input.visibility ?? "system",
      state_version: this.#state.version
    });
  }
}
