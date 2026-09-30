const REQUIRED_EVENT_FIELDS = [
  "event_id",
  "occurred_at",
  "actor_type",
  "actor_id",
  "source_system",
  "event_type",
  "context_id",
];

function requireFields(name, value, fields) {
  if (!value || typeof value !== "object") {
    throw new TypeError(`${name} must be an object`);
  }
  for (const field of fields) {
    if (value[field] === undefined || value[field] === null || value[field] === "") {
      throw new Error(`${name}.${field} is required`);
    }
  }
}

export function createEmployee(input) {
  requireFields("employee", input, [
    "employee_id",
    "registered_name",
    "role_id",
    "pathway_id",
    "team_id",
    "manager_id",
    "contract_start",
    "contract_end",
  ]);
  return Object.freeze({
    preferred_name: input.registered_name,
    employment_status: "active",
    current_workplace_day: 1,
    accessibility_preferences: {},
    communication_preferences: { voice: true, text: true },
    permissions_profile: "least-privilege",
    ...input,
  });
}

export function createEnterprise(input) {
  requireFields("enterprise", input, ["enterprise_id", "legal_fiction_name"]);
  return {
    business_units: [],
    locations: [],
    teams: [],
    people: [],
    clients: [],
    vendors: [],
    policies: [],
    systems: [],
    repositories: [],
    data_assets: [],
    current_state_version: 1,
    ...structuredClone(input),
  };
}

export function createWorldState({ enterprise, employees = [] }) {
  return {
    version: 1,
    enterprise: structuredClone(enterprise),
    employees: new Map(employees.map((employee) => [employee.employee_id, employee])),
    events: [],
    consequences: [],
    evidence: [],
  };
}

export function appendEvent(state, event) {
  requireFields("event", event, REQUIRED_EVENT_FIELDS);
  if (state.events.some((item) => item.event_id === event.event_id)) {
    throw new Error(`Duplicate event_id: ${event.event_id}`);
  }
  const normalized = Object.freeze({
    workplace_day: null,
    object_type: null,
    object_id: null,
    visible_to: [],
    payload: {},
    authoritative: false,
    causation_id: null,
    correlation_id: null,
    ...structuredClone(event),
  });
  state.events.push(normalized);
  state.version += 1;
  return normalized;
}

export function applyConsequence(state, consequence) {
  requireFields("consequence", consequence, [
    "consequence_id",
    "triggering_event_id",
    "applied_at",
    "target_type",
    "target_id",
    "after_state",
  ]);
  if (!state.events.some((event) => event.event_id === consequence.triggering_event_id)) {
    throw new Error("Consequence must reference an existing triggering event");
  }
  state.consequences.push(Object.freeze({
    before_state: null,
    reversible: true,
    severity: "normal",
    visibility: [],
    follow_on_event_ids: [],
    ...structuredClone(consequence),
  }));
  state.version += 1;
}

export function recordEvidence(state, input) {
  requireFields("evidence", input, [
    "evidence_id",
    "employee_id",
    "timestamp",
    "source_system",
    "context_id",
    "event_type",
    "employee_action",
    "evidence_reference",
  ]);
  if (!state.employees.has(input.employee_id)) {
    throw new Error("Evidence must belong to a known employee");
  }
  const evidence = Object.freeze({
    workplace_day: null,
    information_available: [],
    artifact_or_target: null,
    immediate_result: null,
    downstream_consequence: null,
    competency_tags: [],
    confidence: 1,
    assessor_visibility: "reviewable",
    integrity_hash: null,
    ...structuredClone(input),
  });
  state.evidence.push(evidence);
  return evidence;
}

export function employeeTimeline(state, employeeId) {
  const employee = state.employees.get(employeeId);
  if (!employee) throw new Error("Unknown employee");
  return {
    employee,
    events: state.events.filter((event) =>
      event.actor_id === employeeId ||
      event.visible_to.includes(employeeId)
    ),
    evidence: state.evidence.filter((item) => item.employee_id === employeeId),
    consequences: state.consequences.filter((item) =>
      item.visibility.includes(employeeId)
    ),
  };
}

export function replayEvents(initialState, events) {
  const replay = createWorldState({
    enterprise: initialState.enterprise,
    employees: [...initialState.employees.values()],
  });
  for (const event of events) appendEvent(replay, event);
  return replay;
}
