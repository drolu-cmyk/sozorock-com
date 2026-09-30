import test from "node:test";import assert from "node:assert/strict";
import{buildMessageThread,appendThreadReply}from"../src/ui/message-thread.mjs";
import{buildMeetingSurface}from"../src/ui/meeting-surface.mjs";
import{buildWorkItemDetail}from"../src/ui/work-item-detail.mjs";
import{buildEvidencePanel}from"../src/ui/evidence-panel.mjs";
import{createWaitingState,resolveWaitingState}from"../src/ui/waiting-state.mjs";
import{submitProfessionalArtifact}from"../src/ui/artifact-submission.mjs";

test("message threads preserve workplace context",()=>{const t=buildMessageThread({thread:{thread_id:"th1",messages:[{message_id:"m1",from:"mgr",to:"e1",text:"Review this",sent_at:"2026-10-01T09:00:00Z",unread:true}]},employee_id:"e1"});assert.equal(t.messages[0].unread,true);assert.equal(appendThreadReply({thread_id:"th1",messages:[]},{from:"e1",to:"mgr",text:"I’ll review it.",sent_at:"2026-10-01T09:05:00Z"}).messages.length,1);});
test("meeting surface separates upcoming and past",()=>{const m=buildMeetingSurface({meetings:[{meeting_id:"a",title:"Check-in",start_at:"2026-10-01T10:00:00Z",end_at:"2026-10-01T10:30:00Z",participants:["e1"]},{meeting_id:"b",title:"Old",start_at:"2026-09-30T10:00:00Z",end_at:"2026-09-30T10:30:00Z",participants:["e1"]}],now:"2026-10-01T09:00:00Z",employee_id:"e1"});assert.equal(m.upcoming.length,1);assert.equal(m.past.length,1);});
test("work detail exposes contextual systems and evidence",()=>{const w=buildWorkItemDetail({item:{work_item_id:"w1",title:"Review access",type:"request",status:"open"},context:{context_id:"c1"},evidence:[{source_system:"github",summary:"no access"}],waiting_on:[],systems:[{system_id:"github",name:"GitHub"}],artifacts:[]});assert.equal(w.actions.includes("open-systems"),true);assert.equal(w.evidence.length,1);});
test("evidence panel is not a scorecard",()=>{const p=buildEvidencePanel({context:{context_id:"c1"},evidence:[{source_system:"aws",summary:"none"}]});assert.equal("score" in p,false);});
test("waiting state can resolve",()=>{const s=createWaitingState({waiting_id:"w",context_id:"c1",reason:"manager approval",started_at:"2026-10-01T11:00:00Z"});assert.equal(resolveWaitingState(s,"2026-10-01T11:45:00Z").status,"resolved");});
test("artifact submission is professional output",()=>{const s=submitProfessionalArtifact({artifact:{title:"Access review",artifact_type:"access-review-note"},employee:{employee_id:"e1"},work_item:{work_item_id:"w1"},submitted_at:"2026-10-01T12:00:00Z"});assert.equal(s.status,"submitted");});
