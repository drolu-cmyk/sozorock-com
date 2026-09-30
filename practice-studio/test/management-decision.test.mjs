import test from "node:test";
import assert from "node:assert/strict";
import {createEscalation,escalationRequired} from "../src/management/escalation.mjs";
import {createManagerReview,completeManagerReview} from "../src/management/manager-review.mjs";
import {canExerciseAuthority} from "../src/management/authority.mjs";
import {makeExecutiveDecision,validateDecisionOwnership} from "../src/management/executive-decision.mjs";
import {assignDecisionConditions,resolveDecisionCondition} from "../src/management/decision-conditions.mjs";
import {createFollowUpWorkFromConditions} from "../src/management/follow-up-work.mjs";

test("critical unresolved conditions require escalation without final authority",()=>{
  assert.equal(escalationRequired({open_conditions:["retrieval-risk-open"],authority_scope:[]}),true);
  assert.equal(escalationRequired({open_conditions:["retrieval-risk-open"],authority_scope:["final-launch-decision"]}),false);
});

test("manager review produces follow-up grounded in evidence",()=>{
  const r=createManagerReview({review_id:"r1",employee_id:"e1",manager_id:"m1",context_id:"c1",evidence_refs:["ev1"],created_at:"2026-10-09T12:00:00Z"});
  const done=completeManagerReview(r,{summary:"Good evidence, verify removal.",follow_up:["verify access removal"],completed_at:"2026-10-09T12:20:00Z"});
  assert.equal(done.status,"completed");
  assert.deepEqual(done.evidence_refs,["ev1"]);
});

test("CIO has final launch authority",()=>{
  assert.equal(canExerciseAuthority("exec-cio","final-launch-decision"),true);
  assert.equal(canExerciseAuthority("risk-dir","final-launch-decision"),false);
});

test("executive decision requires legitimate owner authority",()=>{
  const ok=validateDecisionOwnership({decision_owner:"exec-cio",authority_checker:canExerciseAuthority});
  assert.equal(ok,true);
  const d=makeExecutiveDecision({
    decision_id:"d1",development_id:"dev1",decision_owner:"exec-cio",
    position:"conditional-launch",rationale:"Proceed only after verification.",
    conditions:["verify-access"],decided_at:"2026-10-09T15:00:00Z"
  });
  assert.equal(d.position,"conditional-launch");
});

test("decision conditions become follow-up work",()=>{
  const conditions=assignDecisionConditions({
    decision_id:"d1",created_at:"2026-10-09T15:00:00Z",
    conditions:[{title:"Verify access removal",owner:"e1",evidence_required:["verification log"]}]
  });
  const work=createFollowUpWorkFromConditions(conditions);
  assert.equal(work.length,1);
  assert.equal(work[0].owner,"e1");
  assert.equal(resolveDecisionCondition(conditions[0],{evidence_refs:["ev2"],resolved_at:"2026-10-09T16:00:00Z"}).status,"resolved");
});
