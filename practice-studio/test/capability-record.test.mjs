import test from "node:test";
import assert from "node:assert/strict";
import {createCapabilityObservation} from "../src/capability/observation.mjs";
import {buildCapabilityRecord} from "../src/capability/record.mjs";
import {independenceTrend,demonstratedAcrossContexts} from "../src/capability/progression.mjs";
import {recordFeedbackResponse} from "../src/capability/feedback-response.mjs";
import {buildEvidencePortfolio} from "../src/capability/portfolio.mjs";

const observations=[
 createCapabilityObservation({observation_id:"o1",employee_id:"e1",dimension:"investigation",context_id:"c1",evidence_refs:["ev1"],observed_behavior:"Inspected nested group membership before deciding.",observer_type:"engine",observed_at:"2026-10-09T10:00:00Z",independence:"guided"}),
 createCapabilityObservation({observation_id:"o2",employee_id:"e1",dimension:"investigation",context_id:"c2",evidence_refs:["ev2"],observed_behavior:"Traced access path without prompting.",observer_type:"assessor",observer_id:"a1",observed_at:"2026-11-09T10:00:00Z",independence:"independent"})
];

test("capability record contains evidence not grades",()=>{
 const r=buildCapabilityRecord({employee_id:"e1",observations});
 assert.equal(r.grading_model,"none");
 assert.equal("score" in r,false);
 assert.deepEqual(r.dimensions.investigation.evidence_refs,["ev1","ev2"]);
});
test("independence can increase across real observations",()=>{
 const t=independenceTrend(observations);
 assert.equal(t.current,"independent");assert.equal(t.trend,"increasing");
 assert.equal(demonstratedAcrossContexts(observations),2);
});
test("feedback response becomes evidence-bearing work",()=>{
 const f=recordFeedbackResponse({employee_id:"e1",context_id:"c1",feedback_id:"f1",feedback_summary:"Verify before closing.",response_action:"Re-opened the access path and attached verification.",evidence_refs:["ev3"],responded_at:"2026-10-09T14:00:00Z"});
 assert.equal(f.type,"feedback-response");
});
test("portfolio explicitly distinguishes simulation from employment",()=>{
 const r=buildCapabilityRecord({employee_id:"e1",observations,artifacts:[],feedback:[]});
 const p=buildEvidencePortfolio({employee:{employee_id:"e1",preferred_name:"Olu",role_id:"iam-analyst",contract_start:"2026-10-01",contract_end:"2026-12-24"},record:r});
 assert.match(p.disclaimer,/simulated enterprise/);
 assert.match(p.disclaimer,/not a record of employment/);
});