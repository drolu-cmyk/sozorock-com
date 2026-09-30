/**
 * Practice Studio core domain contracts.
 * Pure product model: no School-specific enrollment or credential logic.
 */

export const WORK_ITEM_TYPES = Object.freeze([
  "assignment",
  "request",
  "incident",
  "engagement",
  "review",
  "approval",
  "research",
  "briefing",
  "required_training",
  "debrief",
  "deliverable"
]);

export const PERSON_TYPES = Object.freeze([
  "simulated_colleague",
  "simulated_manager",
  "simulated_client",
  "simulated_stakeholder",
  "human_practitioner",
  "participant_employee"
]);

export function createEmployee(input) {
  requireFields(input, ["employee_id", "registered_name", "role_id", "tenant_id"]);
  return Object.freeze({
    preferred_name: input.registered_name,
    employment_status: "active",
    current_workplace_day: 1,
    accessibility_preferences: {},
    communication_preferences: {},
    permissions_profile: [],
    ...input
  });
}

export function createTenant(input) {
  requireFields(input, ["tenant_id", "name", "operator_type"]);
  return Object.freeze({
    branding: {},
    model_policy: {},
    retention_policy: {},
    security_policy: {},
    integrations: [],
    ...input
  });
}

export function createWorkItem(input) {
  requireFields(input, ["work_item_id", "type", "title", "owner"]);
  if (!WORK_ITEM_TYPES.includes(input.type)) {
    throw new Error("Unsupported work item type: " + input.type);
  }
  return Object.freeze({
    stakeholders: [],
    dependencies: [],
    related_systems: [],
    evidence_requirements: [],
    competency_tags: [],
    status: "open",
    ...input
  });
}

export function requireFields(value, fields) {
  for (const field of fields) {
    if (value?.[field] === undefined || value?.[field] === null || value?.[field] === "") {
      throw new Error("Missing required field: " + field);
    }
  }
}
