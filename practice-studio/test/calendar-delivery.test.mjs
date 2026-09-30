import test from "node:test";
import assert from "node:assert/strict";
import { createWorkdayPolicy } from "../src/scheduling/work-hours.mjs";
import { classifyDelivery, delayWithinWorkday } from "../src/scheduling/delivery.mjs";
import { businessMinutesBetween, deadlineStatus } from "../src/scheduling/deadlines.mjs";
import { scheduleHumanLikeResponse } from "../src/people/response-timing.mjs";
import { createOvernightEvents } from "../src/orchestration/overnight-events.mjs";

test("routine after-hours events wait until next work period",()=>{
  const p=createWorkdayPolicy();
  const r=classifyDelivery({
    event:{occurred_at:"2026-10-01T19:30:00-04:00",urgent:false},
    policy:p
  });
  assert.equal(r.mode,"queued_next_work_period");
});

test("urgent after-hours events can surface immediately",()=>{
  const p=createWorkdayPolicy();
  const r=classifyDelivery({
    event:{occurred_at:"2026-10-01T19:30:00-04:00",urgent:true},
    policy:p
  });
  assert.equal(r.mode,"immediate");
});

test("long response delay rolls into next workday",()=>{
  const p=createWorkdayPolicy();
  const t=delayWithinWorkday({
    from:"2026-10-01T16:30:00-04:00",
    minutes:120,
    policy:p
  });
  assert.ok(new Date(t)>new Date("2026-10-01T17:00:00-04:00"));
});

test("deadline status counts business minutes only",()=>{
  const p=createWorkdayPolicy();
  const mins=businessMinutesBetween(
    "2026-10-02T16:00:00-04:00",
    "2026-10-05T10:00:00-04:00",
    p
  );
  assert.equal(mins,120);
  assert.equal(deadlineStatus({
    now:"2026-10-02T16:00:00-04:00",
    due_at:"2026-10-05T10:00:00-04:00",
    policy:p
  }).status,"attention");
});

test("simulated people have non-instant response timing",()=>{
  const p=createWorkdayPolicy();
  const t=scheduleHumanLikeResponse({
    received_at:"2026-10-01T10:00:00-04:00",
    responder:{role:"IAM Manager",availability:{response_delay_minutes:10}},
    policy:p,
    complexity:"normal"
  });
  assert.ok(new Date(t)>new Date("2026-10-01T10:00:00-04:00"));
});

test("overnight system events depend on prior world state",()=>{
  assert.equal(createOvernightEvents({
    employee_id:"emp-1",
    previousDayState:{monitoring_attention:false}
  }).length,0);
  assert.equal(createOvernightEvents({
    employee_id:"emp-1",
    previousDayState:{monitoring_attention:true}
  }).length,1);
});
