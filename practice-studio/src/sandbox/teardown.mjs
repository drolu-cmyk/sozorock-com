export async function teardownSandbox({lease,adapters,reason="contract-end"}){
  const results=[];
  for(const adapter of adapters){
    try{
      results.push({provider:adapter.constructor.name,result:await adapter.teardown({employee_id:lease.employee_id})});
    }catch(error){
      results.push({provider:adapter.constructor.name,error:String(error)});
    }
  }
  return Object.freeze({
    lease_id:lease.lease_id,
    employee_id:lease.employee_id,
    reason,
    completed_at:new Date().toISOString(),
    results,
    fully_successful:results.every(x=>!x.error)
  });
}
