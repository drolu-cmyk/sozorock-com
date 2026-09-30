export function createWaitingState({
  waiting_id,
  context_id,
  reason,
  waiting_on_person,
  started_at,
  expected_after=null
}){
  if(!waiting_id||!context_id||!reason||!started_at) throw new Error("Incomplete waiting state");
  return Object.freeze({
    waiting_id,context_id,reason,waiting_on_person:waiting_on_person??null,
    started_at,expected_after,status:"waiting"
  });
}

export function resolveWaitingState(state,resolved_at){
  return Object.freeze({...state,status:"resolved",resolved_at});
}
