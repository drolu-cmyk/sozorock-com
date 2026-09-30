export function createSystemActionLink({work_item_id,context_id,system}){
  if(!work_item_id||!context_id||!system?.system_id) throw new Error("Incomplete system action link");
  return Object.freeze({
    label:`Open ${system.name}`,
    system_id:system.system_id,
    href:`/practice-studio/work/${work_item_id}/systems/${system.system_id}`,
    context_id
  });
}
