import test from "node:test";
import assert from "node:assert/strict";
import { createIamDaysTwoToFive } from "../src/orchestration/iam-days-two-five.mjs";
import { evaluateIamAccessDecision } from "../src/engine/iam-consequences.mjs";

test("later IAM workdays include escalation only after ordinary work",()=>{
  const later=createIamDaysTwoToFive({employee_id:"emp-1",employee_name:"Olu"});
  assert.equal(later.work[0].type,"review");
  assert.equal(later.work.some(w=>w.type==="incident"),true);
  assert.equal(later.work.at(-1).type,"debrief");
});

test("unsafe access decisions create deterministic follow-on risk",()=>{
  const result=evaluateIamAccessDecision({
    requestedRole:"read",
    grantedRole:"maintain",
    verifiedNeed:false,
    verifiedApprover:false
  });
  assert.equal(result.risk,"high");
  assert.equal(result.followOn.includes("day4-privileged-anomaly"),true);
});

test("properly verified least-privilege decision does not force an incident",()=>{
  const result=evaluateIamAccessDecision({
    requestedRole:"read",
    grantedRole:"read",
    verifiedNeed:true,
    verifiedApprover:true
  });
  assert.equal(result.risk,"low");
  assert.deepEqual(result.followOn,[]);
});
