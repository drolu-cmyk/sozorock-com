import { createProvisioningRecord } from "../identity/provisioning.mjs";
import { createEmployee } from "../domain/index.mjs";
import { createSandboxLease } from "../sandbox/lifecycle.mjs";
import { entitlementsForPrincipal } from "../identity/entitlements.mjs";

export function prepareEmployeeOnboarding({
  account_subject,
  tenant_id,
  employee_id,
  registered_name,
  preferred_name,
  role_id,
  team_id,
  manager_id,
  contract_start,
  contract_end,
  sandbox_lease_id,
  sandbox_expires_at
}){
  const provisioning=createProvisioningRecord({
    account_subject,tenant_id,employee_id,role_id,team_id,manager_id
  });

  const employee=createEmployee({
    employee_id,
    registered_name,
    preferred_name:preferred_name??registered_name,
    role_id,
    tenant_id,
    team_id,
    manager_id,
    contract_start,
    contract_end
  });

  const principal={
    ...provisioning,
    account_subject,
    tenant_id,
    employee_id,
    role_id,
    team_id,
    manager_id
  };

  const entitlements=entitlementsForPrincipal(principal);

  const lease=createSandboxLease({
    lease_id:sandbox_lease_id,
    tenant_id,
    employee_id,
    provider:"multi",
    resource_scope:entitlements.systems,
    starts_at:contract_start,
    expires_at:sandbox_expires_at,
    budget_usd:null
  });

  return Object.freeze({provisioning,employee,entitlements,lease});
}
