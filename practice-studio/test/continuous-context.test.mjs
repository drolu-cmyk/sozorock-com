import test from "node:test";
import assert from "node:assert/strict";
import { createWorkContext } from "../src/work-context/index.mjs";
import { createContextualLaunch } from "../src/integrations/contextual-launch.mjs";
import { inspectGitHubAccess } from "../src/integrations/github-inspection.mjs";
import { inspectAwsIdentity } from "../src/integrations/aws-inspection.mjs";
import { returnFromProfessionalSystem } from "../src/integrations/return-bridge.mjs";
import { createClarificationRequest, resolveClarification } from "../src/interactions/clarification.mjs";

test("professional system launch preserves work context",()=>{
  const c=createWorkContext({context_id:"ctx-1",employee_id:"emp-1",work_item_id:"req-1",tenant_id:"t1"});
  const launch=createContextualLaunch({
    context:c,
    system:{system_id:"github",environment:"sandbox"}
  });
  assert.equal(launch.context_id,"ctx-1");
  assert.equal(launch.return_path,"/work/req-1");
});

test("GitHub inspection returns normalized evidence",()=>{
  const o=inspectGitHubAccess({
    requestor:"contractor-17",resource:"analytics-repository",permission:"read",
    observed_at:"2026-10-01T11:00:00-04:00"
  });
  assert.equal(o.source_system,"github");
  assert.equal(o.role,"read");
});

test("AWS inspection uses the same evidence shape",()=>{
  const o=inspectAwsIdentity({
    principal:"contractor-17",resource:"analytics-data",role:"none",
    observed_at:"2026-10-01T11:05:00-04:00"
  });
  assert.equal(o.observation_type,"permission");
  assert.equal(o.source_system,"aws");
});

test("return bridge attaches evidence and resumes same work item",()=>{
  const c=createWorkContext({context_id:"ctx-1",employee_id:"emp-1",work_item_id:"req-1",tenant_id:"t1"});
  const o=inspectGitHubAccess({
    requestor:"contractor-17",resource:"analytics-repository",permission:"read",
    observed_at:"2026-10-01T11:00:00-04:00"
  });
  const r=returnFromProfessionalSystem({context:c,observation:o});
  assert.equal(r.context.evidence_refs.length,1);
  assert.equal(r.resume.route,"/work/req-1");
});

test("clarification remains part of the same professional matter",()=>{
  const q=createClarificationRequest({
    context_id:"ctx-1",employee_id:"emp-1",recipient:"mgr-iam-001",
    question:"Can you confirm whether this contractor needs write access?",
    sent_at:"2026-10-01T11:10:00-04:00"
  });
  const resolved=resolveClarification(q,{
    response:"Read access is sufficient for the engagement.",
    responder:"mgr-iam-001",
    responded_at:"2026-10-01T11:55:00-04:00"
  });
  assert.equal(resolved.context_id,"ctx-1");
  assert.equal(resolved.status,"resolved");
});
