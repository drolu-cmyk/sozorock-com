import { createWorkdayPolicy } from "../scheduling/work-hours.mjs";
import { WorkplaceScheduler } from "../scheduling/index.mjs";
import { createIamDayOne } from "../orchestration/iam-day-one.mjs";
import { createIamDaysTwoToFive } from "../orchestration/iam-days-two-five.mjs";
import { createOvernightEvents } from "../orchestration/overnight-events.mjs";
import { createWorkContext } from "../work-context/index.mjs";
import { inspectGitHubAccess } from "../integrations/github-inspection.mjs";
import { inspectAwsIdentity } from "../integrations/aws-inspection.mjs";
import { returnFromProfessionalSystem } from "../integrations/return-bridge.mjs";
import { createClarificationRequest, resolveClarification } from "../interactions/clarification.mjs";
import { createAccessRequestCase, evaluateRequestEvidence } from "../workflows/access-request.mjs";
import { decideAccess } from "../workflows/access-decision.mjs";
import { completeAccessReview } from "../workflows/access-review.mjs";
import { InMemoryEventStore, InMemoryEvidenceStore } from "../persistence/memory.mjs";
import { createEvidenceRecord } from "../evidence/index.mjs";
import { reconstructEpisode } from "../evidence/reconstruct.mjs";
import { createDebriefPlan } from "../evidence/debrief.mjs";

export async function runIamWorkweek({
  employee,
  tenant_id,
  decisionMode="sound"
}){
  const policy=createWorkdayPolicy();
  const scheduler=new WorkplaceScheduler("2026-10-01T08:30:00-04:00");
  const eventStore=new InMemoryEventStore();
  const evidenceStore=new InMemoryEvidenceStore();

  const day1=createIamDayOne({
    tenant_id,
    employee_id:employee.employee_id,
    employee_name:employee.preferred_name ?? employee.registered_name
  });
  const later=createIamDaysTwoToFive({
    employee_id:employee.employee_id,
    employee_name:employee.preferred_name ?? employee.registered_name
  });

  for(const item of [...day1.events,...later.events]) scheduler.schedule(item);

  const initialDue=scheduler.advanceTo("2026-10-01T10:45:00-04:00");
  for(const event of initialDue) await eventStore.append(event);

  const workContext=createWorkContext({
    context_id:"ctx-access-001",
    employee_id:employee.employee_id,
    work_item_id:"req-1",
    tenant_id
  });

  const request=createAccessRequestCase({
    request_id:"req-1",
    employee_id:employee.employee_id,
    requestor:"contractor-17",
    resource:"analytics-repository",
    requested_role:"read",
    business_reason:decisionMode==="sound"?"Review analytics pipeline documentation":null,
    approver:decisionMode==="sound"?"mgr-iam-001":null,
    created_at:"2026-10-01T10:40:00-04:00"
  }).request;

  const gh=inspectGitHubAccess({
    requestor:"contractor-17",
    resource:"analytics-repository",
    permission:"none",
    observed_at:"2026-10-01T11:00:00-04:00"
  });
  const afterGh=returnFromProfessionalSystem({context:workContext,observation:gh}).context;

  const aws=inspectAwsIdentity({
    principal:"contractor-17",
    resource:"analytics-data",
    role:"none",
    observed_at:"2026-10-01T11:05:00-04:00"
  });
  const afterAws=returnFromProfessionalSystem({context:afterGh,observation:aws}).context;

  const clarification=createClarificationRequest({
    context_id:workContext.context_id,
    employee_id:employee.employee_id,
    recipient:"mgr-iam-001",
    question:"Can you confirm the minimum access required for this engagement?",
    sent_at:"2026-10-01T11:10:00-04:00"
  });

  const resolved=resolveClarification(clarification,{
    response:decisionMode==="sound"?"Read access is sufficient for the engagement.":"Proceed as requested.",
    responder:"mgr-iam-001",
    responded_at:"2026-10-01T11:55:00-04:00"
  });

  const evidence=evaluateRequestEvidence({
    request,
    repositoryAccess:{current_role:gh.role},
    cloudRole:{current_role:aws.role},
    managerConfirmation:{approved:decisionMode==="sound"}
  });

  const decision=decisionMode==="sound"
    ? decideAccess({
        request,evidence,decision:"approve",
        rationale:"Business need and approval were verified, and read access matches the work required."
      })
    : decideAccess({
        request,evidence,decision:"modify",granted_role:"maintain",
        rationale:"Granted broader access before completing full verification."
      });

  const completed=completeAccessReview({employee,request,evidence,decision});

  await evidenceStore.append(createEvidenceRecord({
    evidence_id:"ev-access-review",
    employee_id:employee.employee_id,
    timestamp:"2026-10-01T12:05:00-04:00",
    workplace_day:1,
    source_system:"practice-studio",
    context_id:workContext.context_id,
    event_type:"access.approved",
    information_available:[
      ...afterAws.evidence_refs.map(x=>x.summary),
      resolved.response
    ],
    employee_action:`${decision.decision} access request`,
    artifact_or_target:request.resource,
    immediate_result:decision.granted_role ? `granted ${decision.granted_role}` : decision.decision,
    downstream_consequence:completed.consequence.risk,
    evidence_reference:"req-1",
    competency_tags:["least-privilege","access-review","evidence-use"]
  }));

  const overnight=createOvernightEvents({
    employee_id:employee.employee_id,
    previousDayState:completed.consequence.statePatch
  });
  for(const item of overnight) scheduler.schedule(item);

  const laterDue=scheduler.advanceTo("2026-10-05T11:05:00-04:00");
  for(const event of laterDue) await eventStore.append(event);

  const episode=await reconstructEpisode({
    employee_id:employee.employee_id,
    context_id:workContext.context_id,
    eventStore,
    evidenceStore
  });

  const debrief=createDebriefPlan(episode);

  return Object.freeze({
    policy,
    request,
    evidence,
    decision,
    consequence:completed.consequence,
    artifact:completed.artifact,
    work_context:afterAws,
    clarification:resolved,
    overnight_events:overnight,
    episode,
    debrief
  });
}
