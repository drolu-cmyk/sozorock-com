export function buildWorkItemDetail({
  item,context,evidence=[],waiting_on=[],systems=[],artifacts=[]
}){
  if(!item?.work_item_id) throw new Error("work item required");
  return Object.freeze({
    surface:"work-item",
    work_item_id:item.work_item_id,
    title:item.title,
    type:item.type,
    status:item.status??"open",
    due_at:item.due_at??null,
    context_id:context?.context_id??null,
    evidence,
    waiting_on,
    available_systems:systems,
    artifacts,
    actions:allowedWorkActions(item,waiting_on)
  });
}

function allowedWorkActions(item,waiting){
  const actions=[];
  if(["open","in_progress"].includes(item.status??"open")) actions.push("work");
  if(waiting.length) actions.push("review-waiting");
  if(item.type==="deliverable") actions.push("submit-artifact");
  if(item.type==="request"||item.type==="incident") actions.push("open-systems","contact-person");
  return actions;
}
