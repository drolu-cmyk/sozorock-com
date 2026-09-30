import { requireFields } from "../domain/index.mjs";

export function createTenantDeployment(input) {
  requireFields(input, ["deployment_id", "tenant_id", "environment", "enterprise_id"]);
  return Object.freeze({
    status: "active",
    branding: {},
    integrations: [],
    model_policy: {},
    retention_policy: {},
    security_policy: {},
    billing_metadata: {},
    ...input
  });
}

export function assertTenantScope(resource, tenantId) {
  if (!resource || resource.tenant_id !== tenantId) {
    throw new Error("Tenant scope violation");
  }
  return resource;
}
