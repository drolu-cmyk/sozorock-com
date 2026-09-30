import test from "node:test";
import assert from "node:assert/strict";
import { createProvisioningRecord } from "../src/identity/provisioning.mjs";
import { resolvePrincipal } from "../src/identity/principal.mjs";
import { authorize } from "../src/identity/authorization.mjs";
import { entitlementsForPrincipal } from "../src/identity/entitlements.mjs";
import { createTemporaryCredentialRequest } from "../src/identity/temporary-credentials.mjs";

const record=createProvisioningRecord({
  account_subject:"auth0|123",tenant_id:"t1",employee_id:"e1",role_id:"iam-analyst",team_id:"identity",manager_id:"mgr1"
});
const directory={"auth0|123":record};
const principal=resolvePrincipal({session:{subject:"auth0|123",auth_strength:"mfa"},identityDirectory:directory});

test("principal is resolved from server-side mapping",()=>{
  assert.equal(principal.tenant_id,"t1");
  assert.equal(principal.employee_id,"e1");
  assert.equal(principal.role_id,"iam-analyst");
});

test("participant cannot cross tenant boundary",()=>{
  const r=authorize({principal,action:"work.read",resource:{tenant_id:"t2",employee_id:"e1"}});
  assert.equal(r.allowed,false);
  assert.equal(r.reason,"tenant-mismatch");
});

test("participant cannot read another employee's scoped work",()=>{
  const r=authorize({principal,action:"work.read",resource:{tenant_id:"t1",employee_id:"e2"}});
  assert.equal(r.allowed,false);
});

test("IAM analyst receives only role entitlements",()=>{
  const e=entitlementsForPrincipal(principal);
  assert.equal(e.systems.includes("github-sandbox"),true);
  assert.equal(e.systems.includes("finance-production"),false);
});

test("temporary credential request must match active lease identity",()=>{
  const req=createTemporaryCredentialRequest({
    principal,system_id:"github-sandbox",
    lease:{lease_id:"l1",tenant_id:"t1",employee_id:"e1",expires_at:"2026-10-01T10:30:00Z"},
    requested_at:"2026-10-01T09:00:00Z"
  });
  assert.equal(req.employee_id,"e1");
  assert.throws(()=>createTemporaryCredentialRequest({
    principal,system_id:"github-sandbox",
    lease:{lease_id:"l2",tenant_id:"t1",employee_id:"e2",expires_at:"2026-10-01T10:30:00Z"},
    requested_at:"2026-10-01T09:00:00Z"
  }),/scope mismatch/);
});
