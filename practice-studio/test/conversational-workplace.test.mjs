import test from "node:test";
import assert from "node:assert/strict";
import { buildPersonGrounding } from "../src/people/grounding.mjs";
import { createConversation, addConversationTurn } from "../src/people/conversation.mjs";
import { validatePersonResponse } from "../src/people/response-validation.mjs";
import { createLiveMeetingContext } from "../src/people/live-meeting.mjs";
import { routeConversationTurn } from "../src/people/turn-router.mjs";
import { shouldInterrupt } from "../src/people/interruptions.mjs";

const person={
  person_id:"mgr-1",name:"Maya Chen",role:"IAM Manager",team:"Identity",
  authority_scope:["approve-standard-access"],knowledge_scope:["identity","team-operations"]
};

test("person grounding only includes facts in knowledge scope",()=>{
  const g=buildPersonGrounding({
    person,
    worldFacts:[
      {fact_id:"f1",scope:["identity"],text:"Contractor access expires Friday"},
      {fact_id:"f2",scope:["finance"],text:"Quarterly revenue target"}
    ]
  });
  assert.deepEqual(g.authoritative_facts.map(f=>f.fact_id),["f1"]);
});

test("conversation maintains ordered turns",()=>{
  const c=createConversation({
    conversation_id:"c1",context_id:"ctx1",employee_id:"emp1",person_id:"mgr-1",started_at:"2026-10-01T09:00:00Z"
  });
  addConversationTurn(c,{speaker:"employee",text:"Can you confirm the requested access?",timestamp:"2026-10-01T09:01:00Z"});
  addConversationTurn(c,{speaker:"person",text:"Read access is sufficient.",timestamp:"2026-10-01T09:02:00Z"});
  assert.equal(c.turns.length,2);
});

test("person response cannot cite unknown authoritative facts",()=>{
  const g=buildPersonGrounding({person,worldFacts:[{fact_id:"f1",scope:["identity"],text:"Known"}]});
  const r=validatePersonResponse({response:{text:"Answer",source_refs:["f2"]},grounding:g});
  assert.equal(r.valid,false);
});

test("live meeting supports voice and text with captions",()=>{
  const m=createLiveMeetingContext({
    meeting:{meeting_id:"m1",title:"IAM check-in"},
    employee:{employee_id:"emp1"},
    people:[person],
    work_context:{context_id:"ctx1"}
  });
  assert.deepEqual(m.modalities,["voice","text"]);
  assert.equal(m.captions,true);
});

test("accessibility can force text-only interaction",()=>{
  const r=routeConversationTurn({text:"hello",preferred_modality:"voice",voice_available:true,accessibility:{force_text:true}});
  assert.equal(r.output,"text");
});

test("urgent or manager interruptions can occur naturally",()=>{
  assert.equal(shouldInterrupt({currentSpeaker:"employee",incomingPriority:"urgent"}),true);
  assert.equal(shouldInterrupt({currentSpeaker:"employee",roleAuthority:"manager",elapsed_ms:5000}),true);
});
