export function createConversation({
  conversation_id,
  context_id,
  employee_id,
  person_id,
  channel="text",
  started_at
}){
  if(!conversation_id||!context_id||!employee_id||!person_id||!started_at) throw new Error("Incomplete conversation");
  return Object.seal({
    conversation_id,context_id,employee_id,person_id,channel,started_at,
    turns:[],
    status:"active"
  });
}

export function addConversationTurn(conversation,turn){
  if(!turn?.speaker||!turn?.text?.trim()||!turn?.timestamp) throw new Error("Invalid conversation turn");
  conversation.turns.push(Object.freeze({
    turn_id:turn.turn_id ?? crypto.randomUUID(),
    speaker:turn.speaker,
    text:turn.text.trim(),
    timestamp:turn.timestamp,
    modality:turn.modality ?? "text",
    source_refs:turn.source_refs ?? []
  }));
  return conversation;
}
