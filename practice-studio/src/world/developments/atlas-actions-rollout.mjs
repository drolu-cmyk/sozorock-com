import { createEnterpriseDevelopment } from "../enterprise-development.mjs";

export const ATLAS_ACTIONS_ROLLOUT=createEnterpriseDevelopment({
 development_id:"atlas-actions-rollout-001",
 title:"Atlas Actions controlled production rollout",
 starts_at:"2026-10-09T09:07:00-04:00",
 source:"data-ai",
 summary:"Atlas Actions is scheduled for a limited production release Friday morning. Teams are completing normal launch-readiness work.",
 facts:[
  {fact_id:"launch-friday",statement:"Atlas Actions is planned for limited production release Friday morning.",visibility:"public"},
  {fact_id:"former-contractor-signal",statement:"A monitoring review flagged activity associated with a former contractor identity 18 days after termination.",visibility:"role",roles:["iam-analyst","iam-manager","security-analyst"]},
  {fact_id:"primary-disabled",statement:"The former contractor's primary workforce account is disabled.",visibility:"discoverable",systems:["entra"],discoverable_by:["iam-analyst","iam-manager"]},
  {fact_id:"nested-residual",statement:"A legacy nested group still provides residual repository access.",visibility:"hidden",discoverable_by:["iam-analyst"]},
  {fact_id:"service-excess",statement:"svc-atlas-prod has broader document access than the current Atlas production design requires.",visibility:"hidden",discoverable_by:["iam-analyst","ai-systems-engineer"]},
  {fact_id:"restricted-eval",statement:"An Atlas evaluation returned content classified as restricted.",visibility:"role",roles:["ai-systems-engineer","ai-governance-analyst","grc-analyst"]},
  {fact_id:"misclassified-doc",statement:"One source document is incorrectly classified and included in an approved retrieval collection.",visibility:"hidden",discoverable_by:["ai-systems-engineer","ai-governance-analyst"]},
  {fact_id:"vendor-token",statement:"A third-party integration uses a long-lived API token.",visibility:"hidden",discoverable_by:["ai-systems-engineer","grc-analyst"]},
  {fact_id:"public-ai-use",statement:"A team used an unapproved public AI service while preparing launch material.",visibility:"hidden",discoverable_by:["ai-governance-analyst","grc-analyst"]}
 ],
 work_triggers:[
  {trigger_id:"iam-review",roles:["iam-analyst"],work_type:"review",title:"Review identity and access signal",requires_fact_ids:["former-contractor-signal"]},
  {trigger_id:"ai-reproduce",roles:["ai-systems-engineer"],work_type:"investigation",title:"Reproduce restricted retrieval result",requires_fact_ids:["restricted-eval"]},
  {trigger_id:"grc-launch-evidence",roles:["grc-analyst"],work_type:"review",title:"Assess launch control evidence",requires_fact_ids:["restricted-eval"]},
  {trigger_id:"aigov-gate",roles:["ai-governance-analyst"],work_type:"review",title:"Review deployment conditions and monitoring",requires_fact_ids:["restricted-eval"]}
 ]
});