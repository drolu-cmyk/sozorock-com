import test from "node:test";
import assert from "node:assert/strict";
import {createCrossFunctionalHandoff,resolveCrossFunctionalHandoff} from "../src/collaboration/handoff.mjs";
import {createWorkDependency,evaluateWorkDependency} from "../src/collaboration/dependencies.mjs";
import {createLaunchPosition,aggregateLaunchPositions} from "../src/collaboration/launch-position.mjs";
import {buildCrossFunctionalDecisionRecord} from "../src/collaboration/decision-record.mjs";

test("handoff preserves shared development context",()=>{
  const h=createCrossFunctionalHandoff({
    handoff_id:"h1",development_id:"d1",from_role:"iam-analyst",to_role:"ai-systems-engineer",
    from_employee_id:"e1",context_id:"ctx1",subject:"svc-atlas-prod",
    request:"Confirm minimum document access required",created_at:"2026-10-09T10:00:00Z"
  });
  const r=resolveCrossFunctionalHandoff(h,{
    response:"Restricted policy library is not required for the production retrieval path.",
    resolved_at:"2026-10-09T10:45:00Z"
  });
  assert.equal(r.status,"resolved");
  assert.equal(r.development_id,"d1");
});

test("dependencies unlock from completed work",()=>{
  const d=createWorkDependency({
    dependency_id:"dep1",upstream_context_id:"iam1",downstream_context_id:"grc1",
    condition:"residual-access-revoked",description:"GRC needs remediation evidence"
  });
  assert.equal(evaluateWorkDependency(d,{completed_actions:[]}).status,"waiting");
  assert.equal(evaluateWorkDependency(d,{completed_actions:["residual-access-revoked"]}).status,"ready");
});

test("roles can disagree without a global score",()=>{
  const positions=[
    createLaunchPosition({
      role_id:"iam-analyst",employee_id:"e1",position:"conditional-launch",
      rationale:"Access issue remediated but verification is pending.",
      conditions:["verify-access-removal"]
    }),
    createLaunchPosition({
      role_id:"ai-systems-engineer",employee_id:"e2",position:"delay",
      rationale:"Restricted retrieval still reproduces.",
      conditions:["fix-retrieval-boundary"]
    })
  ];
  const agg=aggregateLaunchPositions(positions);
  assert.equal(agg.consensus,false);
  assert.equal("score" in agg,false);
});

test("decision record aggregates evidence and uncertainty",()=>{
  const p=createLaunchPosition({
    role_id:"grc-analyst",employee_id:"e3",position:"conditional-launch",
    rationale:"Control evidence supports limited release.",
    evidence_refs:["ev1"],uncertainties:["vendor token age"],conditions:["rotate-token"]
  });
  const r=buildCrossFunctionalDecisionRecord({
    development_id:"d1",positions:[p],world_state:{},decision_owner:"exec-cio"
  });
  assert.deepEqual(r.evidence_refs,["ev1"]);
  assert.equal(r.status,"pending-owner-decision");
});
