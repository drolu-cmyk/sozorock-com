import { createWorkItem } from "../domain/index.mjs";

export function createIamDaysTwoToFive({employee_id,employee_name}){
  const work=[
    createWorkItem({
      work_item_id:"iam-day2-review",
      type:"review",
      title:"Review yesterday's access decision",
      owner:employee_id,
      source:"manager",
      related_systems:["github","aws"],
      competency_tags:["access-review","evidence-use"]
    }),
    createWorkItem({
      work_item_id:"iam-day2-change",
      type:"request",
      title:"Apply approved access change",
      owner:employee_id,
      source:"service-desk",
      related_systems:["github"],
      competency_tags:["least-privilege","change-control"]
    }),
    createWorkItem({
      work_item_id:"iam-day3-audit",
      type:"research",
      title:"Check unusual access activity",
      owner:employee_id,
      source:"monitoring",
      related_systems:["aws","github"],
      competency_tags:["investigation","identity-monitoring"]
    }),
    createWorkItem({
      work_item_id:"iam-day4-incident",
      type:"incident",
      title:"Investigate access anomaly affecting analytics systems",
      owner:employee_id,
      source:"security-operations",
      related_systems:["aws","github","email"],
      competency_tags:["incident-response","identity-investigation","communication"]
    }),
    createWorkItem({
      work_item_id:"iam-day5-deliverable",
      type:"deliverable",
      title:"Prepare access incident summary",
      owner:employee_id,
      source:"manager",
      competency_tags:["documentation","executive-communication"]
    }),
    createWorkItem({
      work_item_id:"iam-day5-debrief",
      type:"debrief",
      title:"Manager debrief",
      owner:employee_id,
      source:"manager",
      competency_tags:["reflection","judgment","communication"]
    })
  ];

  const events=[
    {
      scheduled_id:"day2-0930-review",
      run_at:"2026-10-02T09:30:00-04:00",
      event:{
        event_id:"evt-day2-review",
        occurred_at:"2026-10-02T09:30:00-04:00",
        actor_type:"simulated_manager",
        actor_id:"mgr-iam-001",
        source_system:"practice-studio",
        event_type:"manager.feedback_given",
        context_id:"iam-day2-review",
        visible_to:[employee_id],
        payload:{text:`${employee_name}, walk me through the evidence behind yesterday's repository access decision.`}
      }
    },
    {
      scheduled_id:"day3-1010-alert",
      run_at:"2026-10-03T10:10:00-04:00",
      event:{
        event_id:"evt-day3-alert",
        occurred_at:"2026-10-03T10:10:00-04:00",
        actor_type:"system",
        actor_id:"monitoring",
        source_system:"security-monitoring",
        event_type:"alert.raised",
        context_id:"iam-day3-audit",
        visible_to:[employee_id],
        payload:{signal:"repository and cloud access outside expected pattern",severity:"low"}
      }
    },
    {
      scheduled_id:"day4-0845-email",
      run_at:"2026-10-04T08:45:00-04:00",
      event:{
        event_id:"evt-day4-email",
        occurred_at:"2026-10-04T08:45:00-04:00",
        actor_type:"simulated_colleague",
        actor_id:"col-iam-001",
        source_system:"email",
        event_type:"email.received",
        context_id:"iam-day4-incident",
        visible_to:[employee_id],
        payload:{subject:"Can you check this access issue?",text:"We have unexpected activity in the analytics environment. I’m not sure whether it is related to repository permissions."}
      }
    },
    {
      scheduled_id:"day4-0910-incident",
      run_at:"2026-10-04T09:10:00-04:00",
      event:{
        event_id:"evt-day4-incident",
        occurred_at:"2026-10-04T09:10:00-04:00",
        actor_type:"system",
        actor_id:"security-operations",
        source_system:"security-operations",
        event_type:"finding.created",
        context_id:"iam-day4-incident",
        visible_to:[employee_id],
        payload:{finding:"privileged access anomaly",status:"open"}
      }
    },
    {
      scheduled_id:"day5-1100-debrief",
      run_at:"2026-10-05T11:00:00-04:00",
      event:{
        event_id:"evt-day5-debrief",
        occurred_at:"2026-10-05T11:00:00-04:00",
        actor_type:"simulated_manager",
        actor_id:"mgr-iam-001",
        source_system:"meeting",
        event_type:"debrief.scheduled",
        context_id:"iam-day5-debrief",
        visible_to:[employee_id],
        payload:{title:"Access incident debrief"}
      }
    }
  ];

  return Object.freeze({work,events});
}
