import { createEvent } from "../events/index.mjs";
import { createEvidenceRecord } from "../evidence/index.mjs";

const EVIDENCE_ACTIONS=new Set([
  "message.reply",
  "meeting.join",
  "support.request",
  "system.launch",
  "work.submit",
  "access.decision",
  "artifact.create"
]);

export function performEmployeeAction({
  action,
  employee,
  tenant_id,
  context_id,
  occurred_at,
  payload={},
  information_available=[]
}){
  if(!action || !employee?.employee_id || !tenant_id || !context_id || !occurred_at){
    throw new Error("Incomplete employee action");
  }

  const event=createEvent({
    event_id:payload.event_id ?? crypto.randomUUID(),
    occurred_at,
    workplace_day:employee.current_workplace_day ?? 1,
    actor_type:"participant_employee",
    actor_id:employee.employee_id,
    source_system:payload.source_system ?? "practice-studio",
    event_type:mapEventType(action),
    object_type:payload.object_type ?? null,
    object_id:payload.object_id ?? null,
    context_id,
    visible_to:payload.visible_to ?? [employee.employee_id],
    payload:{...payload,action}
  });

  const evidence=EVIDENCE_ACTIONS.has(action)
    ? createEvidenceRecord({
        evidence_id:payload.evidence_id ?? crypto.randomUUID(),
        employee_id:employee.employee_id,
        timestamp:occurred_at,
        workplace_day:employee.current_workplace_day ?? 1,
        source_system:event.source_system,
        context_id,
        event_type:event.event_type,
        information_available,
        employee_action:describeAction(action,payload),
        artifact_or_target:payload.object_id ?? null,
        immediate_result:payload.immediate_result ?? null,
        downstream_consequence:null,
        evidence_reference:event.event_id,
        competency_tags:payload.competency_tags ?? []
      })
    : null;

  return Object.freeze({event,evidence});
}

function mapEventType(action){
  return ({
    "message.open":"message.received",
    "message.reply":"message.sent",
    "meeting.join":"meeting.started",
    "support.request":"person.asked_question",
    "system.launch":"repository.accessed",
    "work.submit":"deliverable.submitted",
    "access.decision":"access.approved",
    "artifact.create":"deliverable.submitted"
  })[action] ?? "person.responded";
}

function describeAction(action,payload){
  return ({
    "message.reply":`replied to ${payload.object_id ?? "a workplace message"}`,
    "meeting.join":`joined ${payload.title ?? "a workplace meeting"}`,
    "support.request":`requested support: ${payload.topic ?? "workplace guidance"}`,
    "system.launch":`opened ${payload.system_name ?? "a professional system"}`,
    "work.submit":`submitted ${payload.title ?? "a work deliverable"}`,
    "access.decision":`${payload.decision ?? "made a decision on"} access for ${payload.subject ?? "a request"}`,
    "artifact.create":`created ${payload.title ?? "a professional artifact"}`
  })[action] ?? action;
}
