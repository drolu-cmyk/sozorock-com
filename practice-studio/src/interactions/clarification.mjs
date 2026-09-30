export function createClarificationRequest({
  context_id,
  employee_id,
  recipient,
  question,
  sent_at,
  channel="message"
}){
  if(!context_id||!employee_id||!recipient||!question?.trim()||!sent_at) throw new Error("Incomplete clarification request");
  return Object.freeze({
    clarification_id:crypto.randomUUID(),
    context_id,employee_id,recipient,
    question:question.trim(),
    sent_at,channel,
    status:"awaiting-response"
  });
}

export function resolveClarification(request,{response,responder,responded_at}){
  if(!response?.trim()||!responder||!responded_at) throw new Error("Incomplete clarification response");
  return Object.freeze({
    ...request,
    response:response.trim(),
    responder,
    responded_at,
    status:"resolved"
  });
}
