import test from "node:test";
import assert from "node:assert/strict";
import { createTenantDeployment, assertTenantScope } from "../src/tenancy/index.mjs";
import { WorkplaceScheduler } from "../src/scheduling/index.mjs";
import { createPerson, PersonMemory } from "../src/people/index.mjs";
import { createIamDayOne } from "../src/orchestration/iam-day-one.mjs";

test("tenant deployment remains product-level, not School-specific",()=>{
  const d=createTenantDeployment({
    deployment_id:"dep-1",
    tenant_id:"tenant-school-us",
    environment:"sandbox",
    enterprise_id:"enterprise-1"
  });
  assert.equal(d.environment,"sandbox");
});

test("tenant scope violations are rejected",()=>{
  assert.throws(()=>assertTenantScope({tenant_id:"a"},"b"),/Tenant scope violation/);
});

test("workplace scheduler emits due events in order",()=>{
  const s=new WorkplaceScheduler("2026-10-01T08:00:00-04:00");
  s.schedule({
    scheduled_id:"two",
    run_at:"2026-10-01T10:00:00-04:00",
    event:{
      event_id:"e2",occurred_at:"2026-10-01T10:00:00-04:00",
      actor_type:"system",actor_id:"calendar",source_system:"calendar",
      event_type:"meeting.started",context_id:"c2"
    }
  });
  s.schedule({
    scheduled_id:"one",
    run_at:"2026-10-01T09:00:00-04:00",
    event:{
      event_id:"e1",occurred_at:"2026-10-01T09:00:00-04:00",
      actor_type:"system",actor_id:"calendar",source_system:"calendar",
      event_type:"meeting.started",context_id:"c1"
    }
  });
  const due=s.advanceTo("2026-10-01T09:30:00-04:00");
  assert.deepEqual(due.map(x=>x.event_id),["e1"]);
  assert.equal(s.pending().length,1);
});

test("people have persistent explicit memory separate from model memory",()=>{
  const p=createPerson({
    person_id:"mgr-1",name:"Maya Chen",person_type:"simulated_manager",
    role:"IAM Manager",tenant_id:"tenant-1"
  });
  const memory=new PersonMemory();
  memory.remember(p.person_id,"employee-decision",{action:"revoked-access"},{source:"evidence"});
  assert.equal(memory.recall(p.person_id,"employee-decision").value.action,"revoked-access");
});

test("IAM day one contains ordinary work before any incident",()=>{
  const day=createIamDayOne({
    tenant_id:"tenant-school-us",
    employee_id:"emp-1",
    employee_name:"Olu"
  });
  assert.equal(day.work.some(w=>w.type==="incident"),false);
  assert.equal(day.work.some(w=>w.type==="required_training"),true);
  assert.equal(day.events[0].event.payload.text.includes("Olu"),true);
});
