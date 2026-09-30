import test from "node:test";
import assert from "node:assert/strict";
import { createAccessRequestCase, evaluateRequestEvidence } from "../src/workflows/access-request.mjs";
import { decideAccess } from "../src/workflows/access-decision.mjs";
import { buildAccessReviewArtifact, renderAccessReviewOnePager } from "../src/workflows/access-artifact.mjs";
import { completeAccessReview } from "../src/workflows/access-review.mjs";
import { IAM_SUPPORT_LIBRARY } from "../src/support/iam-library.mjs";

const employee={employee_id:"emp-1",registered_name:"Olu Adeyemo"};
const request=createAccessRequestCase({
  request_id:"req-1",
  employee_id:"emp-1",
  requestor:"contractor-17",
  resource:"analytics-repository",
  requested_role:"read",
  business_reason:"Review analytics pipeline documentation",
  approver:"mgr-iam-001",
  created_at:"2026-10-01T10:40:00-04:00"
}).request;

test("access review gathers evidence across systems",()=>{
  const evidence=evaluateRequestEvidence({
    request,
    repositoryAccess:{current_role:"none"},
    cloudRole:{current_role:null},
    managerConfirmation:{approved:true}
  });
  assert.equal(evidence.business_need_verified,true);
  assert.equal(evidence.approver_verified,true);
});

test("decision requires rationale",()=>{
  assert.throws(()=>decideAccess({request,evidence:{},decision:"approve",rationale:" "}),/Rationale required/);
});

test("modified access must be explicit",()=>{
  const evidence=evaluateRequestEvidence({
    request,
    repositoryAccess:{current_role:"none"},
    cloudRole:{current_role:null},
    managerConfirmation:{approved:true}
  });
  const d=decideAccess({
    request,evidence,decision:"modify",granted_role:"triage",
    rationale:"Triage is sufficient for the requested review and limits unnecessary write capability."
  });
  assert.equal(d.granted_role,"triage");
});

test("completed review produces artifact and consequence",()=>{
  const evidence=evaluateRequestEvidence({
    request,
    repositoryAccess:{current_role:"none"},
    cloudRole:{current_role:null},
    managerConfirmation:{approved:true}
  });
  const decision=decideAccess({
    request,evidence,decision:"approve",
    rationale:"The business need and approver were verified, and read access matches the stated task."
  });
  const result=completeAccessReview({employee,request,evidence,decision});
  assert.equal(result.consequence.risk,"low");
  assert.equal(result.artifact.artifact_type,"access-review-note");
  assert.deepEqual(result.next_events,[]);
});

test("unverified excessive access can create later consequences",()=>{
  const weakRequest={...request,business_reason:null,approver:null,requested_role:"read"};
  const evidence=evaluateRequestEvidence({
    request:weakRequest,
    repositoryAccess:{current_role:"none"},
    cloudRole:{current_role:null},
    managerConfirmation:{approved:false}
  });
  const decision=decideAccess({
    request:weakRequest,evidence,decision:"modify",granted_role:"maintain",
    rationale:"Granted broader access without completing verification."
  });
  const result=completeAccessReview({employee,request:weakRequest,evidence,decision});
  assert.equal(result.consequence.risk,"high");
  assert.equal(result.next_events.includes("day4-privileged-anomaly"),true);
});

test("one-page artifact is professional and evidence-based",()=>{
  const evidence=evaluateRequestEvidence({
    request,
    repositoryAccess:{current_role:"read"},
    cloudRole:{current_role:null},
    managerConfirmation:{approved:true}
  });
  const decision=decideAccess({
    request,evidence,decision:"approve",
    rationale:"Existing access already matches the approved need."
  });
  const artifact=buildAccessReviewArtifact({employee,request,evidence,decision});
  const text=renderAccessReviewOnePager(artifact);
  assert.match(text,/Business need verified: Yes/);
  assert.match(text,/Decision: approve/);
  assert.equal(text.includes("Score:"),false);
});

test("contextual IAM support explains concepts without supplying a decision",()=>{
  assert.match(IAM_SUPPORT_LIBRARY["least-privilege"].plain_language,/only the access/);
  assert.equal("recommended_decision" in IAM_SUPPORT_LIBRARY["least-privilege"],false);
});
