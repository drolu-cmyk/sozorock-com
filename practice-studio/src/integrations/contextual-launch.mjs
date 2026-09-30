export function createContextualLaunch({context,system,return_path}){
  if(!context||!system) throw new Error("context and system required");
  return Object.freeze({
    launch_id:crypto.randomUUID(),
    context_id:context.context_id,
    work_item_id:context.work_item_id,
    employee_id:context.employee_id,
    system_id:system.system_id,
    environment:system.environment,
    requested_scope:"least_privileged",
    return_path:return_path ?? `/work/${context.work_item_id}`,
    context_token_policy:"opaque-short-lived",
    opened_at:new Date().toISOString()
  });
}
