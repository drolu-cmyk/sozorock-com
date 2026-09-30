import test from "node:test";
import assert from "node:assert/strict";
import { InMemoryEventStore, InMemoryEvidenceStore } from "../src/persistence/memory.mjs";
import { reconstructEpisode } from "../src/evidence/reconstruct.mjs";
import { createDebriefPlan } from "../src/evidence/debrief.mjs";

test("reconstructs a professional episode in chronological order", async ()=>{
  const es=new InMemoryEventStore();
  const vs=new InMemoryEvidenceStore();

  await es.append({event_id:"e2",occurred_at:"2026-10-04T09:20:00-04:00",actor_id:"emp-1",context_id:"c1",visible_to:["emp-1"]});
  await es.append({event_id:"e1",occurred_at:"2026-10-04T09:00:00-04:00",actor_id:"system",context_id:"c1",visible_to:["emp-1"]});
  await vs.append({
    evidence_id:"v1",employee_id:"emp-1",timestamp:"2026-10-04T09:10:00-04:00",
    context_id:"c1",employee_action:"reviewed CloudTrail activity",
    information_available:["unexpected login"],immediate_result:"identified anomalous session",
    downstream_consequence:"privileged access was revoked"
  });

  const ep=await reconstructEpisode({employee_id:"emp-1",context_id:"c1",eventStore:es,evidenceStore:vs});
  assert.deepEqual(ep.events.map(x=>x.event_id),["e1","e2"]);
  assert.equal(ep.evidence.length,1);
});

test("debrief is grounded in evidence rather than generic scoring", async ()=>{
  const es=new InMemoryEventStore();
  const vs=new InMemoryEvidenceStore();
  await vs.append({
    evidence_id:"v1",employee_id:"emp-1",timestamp:"2026-10-04T09:10:00-04:00",
    context_id:"c1",employee_action:"revoked privileged repository access",
    downstream_consequence:"repository access was removed"
  });
  const ep=await reconstructEpisode({employee_id:"emp-1",context_id:"c1",eventStore:es,evidenceStore:vs});
  const plan=createDebriefPlan(ep);
  assert.equal(plan.grounding[0],"v1");
  assert.equal(plan.questions.some(q=>q.includes("revoked privileged repository access")),true);
  assert.equal(plan.questions.some(q=>q.includes("score")),false);
});
