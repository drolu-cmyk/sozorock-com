import { requireFields } from "../domain/index.mjs";

export const EVENT_TYPES = Object.freeze([
  "contract.phase_changed",
  "contract.exited",
  "workday.started",
  "workday.ended",
  "meeting.scheduled",
  "meeting.started",
  "meeting.completed",
  "message.received",
  "message.sent",
  "email.received",
  "email.sent",
  "briefing.assigned",
  "training.required",
  "training.completed",
  "deliverable.requested",
  "deliverable.submitted",
  "debrief.scheduled",
  "debrief.completed",
  "identity.created",
  "identity.disabled",
  "identity.reenabled",
  "role.assigned",
  "role.changed",
  "access.requested",
  "access.approved",
  "access.denied",
  "access.granted",
  "access.revoked",
  "authentication.failed",
  "authentication.succeeded",
  "privilege.escalated",
  "mfa.changed",
  "repository.accessed",
  "branch.created",
  "commit.created",
  "pull_request.opened",
  "pull_request.reviewed",
  "workflow.failed",
  "workflow.succeeded",
  "secret.detected",
  "cloud.resource.created",
  "cloud.resource.modified",
  "cloud.resource.deleted",
  "policy.changed",
  "alert.raised",
  "log.reviewed",
  "finding.created",
  "finding.closed",
  "person.spoke",
  "person.asked_question",
  "person.responded",
  "person.escalated",
  "manager.feedback_given",
  "client.requirement_changed"
]);

export function createEvent(input) {
  requireFields(input, [
    "event_id",
    "occurred_at",
    "actor_type",
    "actor_id",
    "source_system",
    "event_type",
    "context_id"
  ]);

  if (!EVENT_TYPES.includes(input.event_type)) {
    throw new Error("Unsupported event type: " + input.event_type);
  }

  return Object.freeze({
    authoritative: false,
    visible_to: [],
    payload: {},
    causation_id: null,
    correlation_id: null,
    ...input
  });
}
