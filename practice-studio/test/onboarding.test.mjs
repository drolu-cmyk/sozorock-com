import test from "node:test";
import assert from "node:assert/strict";
import { prepareEmployeeOnboarding } from "../src/onboarding/provision.mjs";
import { createWorkplaceMailbox } from "../src/onboarding/workplace-accounts.mjs";
import { buildDayOneArrival } from "../src/onboarding/day-one.mjs";
import { onboardingReadiness } from "../src/onboarding/readiness.mjs";

const prepared=prepareEmployeeOnboarding({
  account_subject:"auth|1",
  tenant_id:"tenant-school-us",
  employee_id:"emp-1",
  registered_name:"Olu Adeyemo",
  preferred_name:"Olu",
  role_id:"iam-analyst",
  team_id:"identity",
  manager_id:"mgr-iam-001",
  contract_start:"2026-10-01T09:00:00-04:00",
  contract_end:"2026-12-24T17:00:00-05:00",
  sandbox_lease_id:"lease-1",
  sandbox_expires_at:"2026-10-01T17:00:00-04:00"
});

test("onboarding provisions employee and sandbox entitlement",()=>{
  assert.equal(prepared.employee.role_id,"iam-analyst");
  assert.equal(prepared.entitlements.systems.includes("github-sandbox"),true);
  assert.equal(prepared.lease.employee_id,"emp-1");
});

test("mailbox is internal and not externally deliverable",()=>{
  const mailbox=createWorkplaceMailbox({employee:prepared.employee});
  assert.equal(mailbox.external_delivery,false);
  assert.match(mailbox.address,/practice\.internal$/);
});

test("day one feels like workplace arrival",()=>{
  const day=buildDayOneArrival({employee:prepared.employee,tenant_id:"tenant-school-us"});
  assert.match(day.first_screen.heading,/Good morning, Olu/);
  assert.equal(day.required_training.includes("privileged-access"),true);
  assert.equal(day.work.some(w=>w.type==="required_training"),true);
});

test("readiness blocks incomplete onboarding",()=>{
  const day=buildDayOneArrival({employee:prepared.employee,tenant_id:"tenant-school-us"});
  const ready=onboardingReadiness({
    employee:prepared.employee,
    mailbox:day.mailbox,
    calendar:day.calendar,
    entitlements:prepared.entitlements,
    lease:prepared.lease
  });
  assert.equal(ready.ready,true);
  assert.equal(onboardingReadiness({
    employee:prepared.employee,
    mailbox:null,
    calendar:day.calendar,
    entitlements:prepared.entitlements,
    lease:prepared.lease
  }).ready,false);
});
