export function recordFeedbackResponse({
  employee_id,context_id,feedback_id,feedback_summary,
  response_action,evidence_refs=[],responded_at
}){
  if(!employee_id||!context_id||!feedback_id||!feedback_summary||!response_action||!responded_at){
    throw new Error("Incomplete feedback response");
  }
  return Object.freeze({
    employee_id,context_id,feedback_id,feedback_summary,response_action,
    evidence_refs,responded_at,type:"feedback-response"
  });
}