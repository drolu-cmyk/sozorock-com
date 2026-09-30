import test from "node:test";
import assert from "node:assert/strict";
import { createSandboxLease, isLeaseActive, expireLease } from "../src/sandbox/lifecycle.mjs";
import { createContainmentPolicy, authorizeSandboxAction } from "../src/sandbox/policy.mjs";
import { createBudgetGuard, evaluateBudget } from "../src/sandbox/budget.mjs";
import { EmergencyKillSwitch } from "../src/sandbox/kill-switch.mjs";

test("sandbox lease expires by time",()=>{
  const l=createSandboxLease({
    lease_id:"l1",tenant_id:"t1",employee_id:"e1",provider:"aws",resource_scope:["iam"],
    starts_at:"2026-10-01T09:00:00Z",expires_at:"2026-10-01T10:30:00Z"
  });
  assert.equal(isLeaseActive(l,"2026-10-01T09:30:00Z"),true);
  assert.equal(isLeaseActive(l,"2026-10-01T11:00:00Z"),false);
  assert.equal(expireLease(l).status,"expired");
});

test("containment policy blocks cross-account and public IP actions",()=>{
  const p=createContainmentPolicy();
  assert.equal(authorizeSandboxAction({action:{service:"ec2",operation:"run",region:"us-east-1",requests_public_ip:true},policy:p}).allowed,false);
  assert.equal(authorizeSandboxAction({action:{service:"iam",operation:"attach",region:"us-east-1",cross_account:true},policy:p}).allowed,false);
});

test("budget hard threshold stops work",()=>{
  const g=createBudgetGuard({lease_id:"l1",limit_usd:10,spent_usd:10});
  assert.equal(evaluateBudget(g).state,"stop");
});

test("kill switch can disable an employee",()=>{
  const k=new EmergencyKillSwitch();
  k.disableEmployee("e1");
  assert.throws(()=>k.assertAllowed({tenant_id:"t1",employee_id:"e1"}),/disabled/);
});
