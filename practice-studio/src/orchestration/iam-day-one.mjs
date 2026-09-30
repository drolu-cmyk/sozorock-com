import { createWorkItem } from "../domain/index.mjs";
import { createPerson } from "../people/index.mjs";

export function createIamDayOne({tenant_id,employee_id,employee_name}){
  const manager=createPerson({
    person_id:"mgr-iam-001",
    name:"Maya Chen",
    person_type:"simulated_manager",
    role:"Identity & Access Manager",
    tenant_id,
    team:"Identity & Access"
  });

  const colleague=createPerson({
    person_id:"col-iam-001",
    name:"Jordan Ellis",
    person_type:"simulated_colleague",
    role:"Cloud Platform Engineer",
    tenant_id,
    team:"Cloud Platform"
  });

  const work=[
    createWorkItem({
      work_item_id:"iam-day1-orientation",
      type:"briefing",
      title:"Identity operations orientation",
      owner:employee_id,
      source:"manager",
      competency_tags:["identity-basics","access-boundaries"]
    }),
    createWorkItem({
      work_item_id:"iam-day1-training",
      type:"required_training",
      title:"Confidentiality and privileged access requirements",
      owner:employee_id,
      source:"employer",
      competency_tags:["confidentiality","privileged-access"]
    }),
    createWorkItem({
      work_item_id:"iam-day1-request",
      type:"request",
      title:"Review access request for analytics repository",
      owner:employee_id,
      source:"service-desk",
      related_systems:["github"],
      competency_tags:["least-privilege","access-review"]
    })
  ];

  const events=[
    {
      scheduled_id:"day1-0855-welcome",
      run_at:"2026-10-01T08:55:00-04:00",
      event:{
        event_id:"evt-day1-welcome",
        occurred_at:"2026-10-01T08:55:00-04:00",
        actor_type:"simulated_manager",
        actor_id:manager.person_id,
        source_system:"practice-studio",
        event_type:"message.received",
        context_id:"day1-onboarding",
        visible_to:[employee_id],
        payload:{text:`Good morning, ${employee_name}. Welcome to Identity & Access. Your first team check-in starts at 9:15.`}
      }
    },
    {
      scheduled_id:"day1-0915-meeting",
      run_at:"2026-10-01T09:15:00-04:00",
      event:{
        event_id:"evt-day1-meeting",
        occurred_at:"2026-10-01T09:15:00-04:00",
        actor_type:"system",
        actor_id:"calendar",
        source_system:"calendar",
        event_type:"meeting.started",
        context_id:"day1-team-checkin",
        visible_to:[employee_id,manager.person_id,colleague.person_id],
        payload:{title:"Identity & Access team check-in"}
      }
    },
    {
      scheduled_id:"day1-1040-request",
      run_at:"2026-10-01T10:40:00-04:00",
      event:{
        event_id:"evt-day1-access-request",
        occurred_at:"2026-10-01T10:40:00-04:00",
        actor_type:"system",
        actor_id:"service-desk",
        source_system:"service-desk",
        event_type:"access.requested",
        context_id:"iam-day1-request",
        visible_to:[employee_id],
        payload:{requestor:"contractor-17",resource:"analytics-repository",requested_role:"maintain"}
      }
    }
  ];

  return Object.freeze({manager,colleague,work,events});
}
