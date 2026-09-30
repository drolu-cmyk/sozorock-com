import test from "node:test";import assert from "node:assert/strict";
import{contextualSupport}from"../src/support/index.mjs";import{IAM_SUPPORT}from"../src/support/iam.mjs";
import{validateSupportBoundary}from"../src/support/boundary.mjs";import{buildSupportSurface}from"../src/ui/support-surface.mjs";
import{recordSupportUse}from"../src/support/usage.mjs";

test("support is contextual to role work and terms",()=>{
 const r=contextualSupport({resources:IAM_SUPPORT,role_id:"iam-analyst",work_type:"request",terms:["least privilege"]});
 assert.equal(r.length,1);assert.equal(r[0].resource_id,"iam-least-privilege");
});
test("support does not reveal assessment answer",()=>{
 assert.equal(validateSupportBoundary({title:"Help",body:"Choose approve for the correct answer."}).safe,false);
 assert.equal(IAM_SUPPORT.every(x=>validateSupportBoundary(x).safe),true);
});
test("support surface stays attached to current matter",()=>{
 const s=buildSupportSurface({resources:IAM_SUPPORT,employee:{role_id:"iam-analyst"},workItem:{type:"request",context_id:"ctx1"},encounteredTerms:["access request"]});
 assert.equal(s.context_id,"ctx1");assert.ok(s.resources.length>0);
});
test("using help is recorded without a score",()=>{
 const e=recordSupportUse({employee_id:"e1",context_id:"ctx1",resource_id:"iam-evidence",opened_at:"2026-10-01T11:00:00Z"});
 assert.equal(e.event_type,"support.resource_opened");assert.equal("score" in e,false);
});
