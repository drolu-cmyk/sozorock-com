import test from "node:test";
import assert from "node:assert/strict";
import { runIamWorkweek } from "../src/orchestration/iam-workweek.mjs";

const employee={
  employee_id:"emp-1",
  registered_name:"Olu Adeyemo",
  preferred_name:"Olu",
  role_id:"iam-analyst",
  current_workplace_day:1
};

test("sound IAM workweek closes without manufactured incident",async()=>{
  const r=await runIamWorkweek({employee,tenant_id:"tenant-school-us",decisionMode:"sound"});
  assert.equal(r.decision.decision,"approve");
  assert.equal(r.consequence.risk,"low");
  assert.equal(r.overnight_events.length,0);
  assert.equal(r.artifact.artifact_type,"access-review-note");
  assert.ok(r.debrief.questions.some(q=>q.includes("approve access request")));
});

test("weak IAM decision can alter the later workplace",async()=>{
  const r=await runIamWorkweek({employee,tenant_id:"tenant-school-us",decisionMode:"weak"});
  assert.equal(r.consequence.risk,"high");
  assert.equal(r.overnight_events.length,1);
  assert.equal(r.overnight_events[0].event.event_type,"alert.raised");
  assert.ok(r.debrief.grounding.includes("ev-access-review"));
});

test("external-system evidence remains attached to the same work context",async()=>{
  const r=await runIamWorkweek({employee,tenant_id:"tenant-school-us",decisionMode:"sound"});
  assert.equal(r.work_context.context_id,"ctx-access-001");
  assert.equal(r.work_context.evidence_refs.length,2);
  assert.deepEqual(r.work_context.evidence_refs.map(x=>x.source_system),["github","aws"]);
});
