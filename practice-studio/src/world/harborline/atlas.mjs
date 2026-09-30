export const ATLAS_SYSTEM=Object.freeze({
 system_id:"atlas",
 name:"Atlas",
 owner:"data-ai",
 executive_sponsor:"exec-data",
 product_manager:"ai-pm",
 engineering_owner:"ai-eng",
 purpose:"Enterprise knowledge retrieval and assisted work.",
 architecture:{
  sources:["approved-document-repositories","policy-library","selected-client-operations-knowledge"],
  retrieval:"managed-vector-search",
  application:"atlas-app",
  evaluations:"atlas-evals",
  production_identity:"svc-atlas-prod"
 },
 data_classes:["internal","confidential","restricted"],
 actions:{
  system_id:"atlas-actions",
  status:"controlled-rollout",
  principle:"explicitly constrained actions with authorization and human approval where required"
 },
 governance:{
  inventory_status:"registered",
  risk_classification:"high",
  deployment_gate_required:true,
  monitoring_plan_required:true,
  evaluation_evidence_required:true
 }
});