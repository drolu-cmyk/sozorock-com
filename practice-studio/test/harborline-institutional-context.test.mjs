import test from "node:test";import assert from "node:assert/strict";
import{createHarborlineInstitutionalContext,traceInstitutionalFact}from"../src/world/harborline/institutional-context.mjs";
import{policyByRequirement}from"../src/world/harborline/policies.mjs";
test("legacy conditions have institutional history",()=>{assert.ok(traceInstitutionalFact({fact:"legacy-groups"}).history.length>=2);});
test("policy requirements can be traced",()=>{assert.ok(policyByRequirement("least-privilege").some(p=>p.policy_id==="access-control"));});
test("Atlas is shared cross-pathway infrastructure",()=>{const c=createHarborlineInstitutionalContext();assert.equal(c.atlas.architecture.production_identity,"svc-atlas-prod");assert.equal(c.atlas.governance.deployment_gate_required,true);});
test("fictional relationships are marked",()=>{const c=createHarborlineInstitutionalContext();assert.equal(c.clients.every(x=>x.fictional),true);assert.equal(c.vendors.every(x=>x.fictional),true);});
test("identity model includes humans and service identities",()=>{const c=createHarborlineInstitutionalContext();assert.ok(c.identity.groups.length>0);assert.ok(c.identity.service_identities.some(x=>x.identity_id==="svc-atlas-prod"));});