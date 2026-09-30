import test from "node:test";import assert from "node:assert/strict";
import{PRODUCT_IDENTITY,productIdentityForSurface}from"../src/product/identity.mjs";
import{validateCandidateName}from"../src/product/naming.mjs";
import{createProductTenant,SCHOOL_DEPLOYMENTS}from"../src/product/tenancy.mjs";

test("School is a licensee not the product owner",()=>{
 assert.equal(PRODUCT_IDENTITY.owner,"SozoRock Tech Inc.");
 assert.equal(PRODUCT_IDENTITY.school_relationship,"licensed-tenant");
 assert.equal(PRODUCT_IDENTITY.education_only,false);
});
test("working name is not exposed as settled commercial name",()=>{
 assert.equal(productIdentityForSurface("public").commercial_name,null);
});
test("known-colliding working directions are rejected",()=>{
 assert.equal(validateCandidateName("Praxis").valid,false);
 assert.equal(validateCandidateName("Workframe").valid,false);
});
test("School deployments remain product-independent tenants",()=>{
 const t=createProductTenant({tenant_id:"school-us",tenant_name:"SozoRock School US",tenant_type:SCHOOL_DEPLOYMENTS.US.tenant_type});
 assert.equal(t.product_brand_independent,true);
});
