import test from "node:test";import assert from "node:assert/strict";
import{ATLAS_ACTIONS_ROLLOUT}from"../src/world/developments/atlas-actions-rollout.mjs";
import{buildRoleDevelopmentView}from"../src/world/role-view.mjs";
import{discoverFact}from"../src/world/discovery.mjs";
import{evaluateCrossFunctionalState}from"../src/world/cross-functional-state.mjs";

test("IAM and AI employees begin with different information",()=>{
 const iam=buildRoleDevelopmentView({development:ATLAS_ACTIONS_ROLLOUT,principal:{employee_id:"e1",role_id:"iam-analyst"},system_access:["entra"],discoveries:[]});
 const ai=buildRoleDevelopmentView({development:ATLAS_ACTIONS_ROLLOUT,principal:{employee_id:"e2",role_id:"ai-systems-engineer"},system_access:[],discoveries:[]});
 assert.ok(iam.known_facts.some(x=>x.fact_id==="former-contractor-signal"));
 assert.equal(iam.known_facts.some(x=>x.fact_id==="restricted-eval"),false);
 assert.ok(ai.known_facts.some(x=>x.fact_id==="restricted-eval"));
});
test("hidden truth is not exposed before discovery",()=>{
 const v=buildRoleDevelopmentView({development:ATLAS_ACTIONS_ROLLOUT,principal:{employee_id:"e1",role_id:"iam-analyst"},system_access:["entra"],discoveries:[]});
 assert.equal(v.known_facts.some(x=>x.fact_id==="nested-residual"),false);
 assert.ok(v.hidden_fact_count>0);
});
test("authorized role can discover hidden fact",()=>{
 const d=discoverFact({development:ATLAS_ACTIONS_ROLLOUT,fact_id:"nested-residual",principal:{employee_id:"e1",role_id:"iam-analyst"},source_system:"github",observed_at:"2026-10-09T10:00:00-04:00",evidence_reference:"gh-1"});
 assert.equal(d.fact_id,"nested-residual");
});
test("unresolved cross-functional facts can block launch conditions",()=>{
 const s=evaluateCrossFunctionalState({discoveries:["nested-residual","misclassified-doc"],actions:["residual-access-revoked"]});
 assert.equal(s.launch_state,"conditions-unmet");
 assert.ok(s.open_conditions.includes("retrieval-risk-open"));
});
test("resolved critical conditions do not manufacture a block",()=>{
 const s=evaluateCrossFunctionalState({discoveries:["nested-residual","misclassified-doc"],actions:["residual-access-revoked","classification-corrected"]});
 assert.equal(s.launch_state,"conditions-satisfied");
});