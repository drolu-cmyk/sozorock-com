import { requireFields } from "../domain/index.mjs";

export function createEvidenceRecord(input) {
  requireFields(input, [
    "evidence_id",
    "employee_id",
    "timestamp",
    "source_system",
    "context_id",
    "event_type",
    "employee_action"
  ]);

  return Object.freeze({
    information_available: [],
    immediate_result: null,
    downstream_consequence: null,
    evidence_reference: null,
    competency_tags: [],
    confidence: null,
    assessor_visibility: "reviewable",
    integrity_hash: null,
    ...input
  });
}
