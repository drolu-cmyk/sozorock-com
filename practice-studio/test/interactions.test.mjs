import test from "node:test";
import assert from "node:assert/strict";
import { performEmployeeAction } from "../src/interactions/employee-actions.mjs";
import { buildInbox, createReply } from "../src/interactions/inbox.mjs";
import { buildMeetingRoom } from "../src/interactions/meetings.mjs";
import { buildSystemsDirectory } from "../src/interactions/systems.mjs";
import { buildContextualSupport } from "../src/interactions/support.mjs";
import { WorkplaceController } from "../src/interactions/controller.mjs";
import { InMemoryEventStore, InMemoryEvidenceStore } from "../src/persistence/memory.mjs";

const employee={employee_id:"emp-1",role_id:"iam-analyst",current_workplace_day:2};

test("opening a message is not treated as competency evidence",()=>{
  const r=performEmployeeAction({
    action:"message.open",employee,tenant_id:"t1",context_id:"c1",
    occurred_at:"2026-10-02T09:00:00-04:00",payload:{object_id:"m1"}
  });
  assert.equal(r.evidence,null);
});

test("replying to workplace communication creates evidence",()=>{
  const r=performEmployeeAction({
    action:"message.reply",employee,tenant_id:"t1",context_id:"c1",
    occurred_at:"2026-10-02T09:05:00-04:00",
    payload:{object_id:"m1",competency_tags:["communication"]}
  });
  assert.equal(r.event.event_type,"message.sent");
  assert.equal(r.evidence.competency_tags[0],"communication");
});

test("inbox only exposes messages visible to employee",()=>{
  const inbox=buildInbox([
    {id:"a",from:"Maya",text:"Hello",received_at:"2026-10-02T09:00:00Z",visible_to:["emp-1"],unread:true},
    {id:"b",from:"Other",text:"Secret",received_at:"2026-10-02T09:01:00Z",visible_to:["emp-2"],unread:true}
  ],"emp-1");
  assert.deepEqual(inbox.map(x=>x.id),["a"]);
});

test("reply validates substantive content",()=>{
  assert.throws(()=>createReply({thread_id:"t",to:"Maya",text:" ",sent_at:"2026-10-02T09:00:00Z"}));
});

test("meeting room supports voice text and captions",()=>{
  const room=buildMeetingRoom({
    meeting_id:"m1",title:"Team check-in",
    start_at:"2026-10-02T09:15:00Z",end_at:"2026-10-02T09:35:00Z",
    participants:["emp-1","mgr-1"]
  },"emp-1");
  assert.deepEqual(room.modalities,["voice","text","captions"]);
});

test("systems directory is role scoped",()=>{
  const systems=buildSystemsDirectory([
    {system_id:"github",name:"GitHub",purpose:"Source control",environment:"sandbox",authorized_roles:["iam-analyst"]},
    {system_id:"finance",name:"Finance",purpose:"Billing",environment:"sandbox",authorized_roles:["finance-analyst"]}
  ],employee);
  assert.deepEqual(systems.map(x=>x.system_id),["github"]);
});

test("contextual support explains without deciding",()=>{
  const support=buildContextualSupport({
    term:"least privilege",
    context:{plain_language:"Give only the access needed for the work.",why_it_matters:"Extra access increases risk."}
  });
  assert.match(support.disclosure,/does not make the decision/);
});

test("controller persists meaningful actions and evidence",async()=>{
  const eventStore=new InMemoryEventStore();
  const evidenceStore=new InMemoryEvidenceStore();
  const controller=new WorkplaceController({eventStore,evidenceStore,worldState:null});
  await controller.dispatch({
    action:"work.submit",employee,tenant_id:"t1",context_id:"c1",
    occurred_at:"2026-10-02T15:00:00-04:00",
    payload:{title:"Access review note",competency_tags:["documentation"]}
  });
  assert.equal((await eventStore.listByEmployee("emp-1")).length,1);
  assert.equal((await evidenceStore.listByEmployee("emp-1")).length,1);
});
