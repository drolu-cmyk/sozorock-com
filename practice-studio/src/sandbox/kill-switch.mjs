export class EmergencyKillSwitch {
  #disabledTenants=new Set();
  #disabledEmployees=new Set();

  disableTenant(tenantId){this.#disabledTenants.add(tenantId);}
  disableEmployee(employeeId){this.#disabledEmployees.add(employeeId);}
  enableTenant(tenantId){this.#disabledTenants.delete(tenantId);}
  enableEmployee(employeeId){this.#disabledEmployees.delete(employeeId);}

  assertAllowed({tenant_id,employee_id}){
    if(this.#disabledTenants.has(tenant_id)) throw new Error("Tenant disabled by emergency control");
    if(this.#disabledEmployees.has(employee_id)) throw new Error("Employee disabled by emergency control");
    return true;
  }
}
