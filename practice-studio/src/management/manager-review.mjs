export function createManagerReview({
  review_id,
  employee_id,
  manager_id,
  context_id,
  evidence_refs=[],
  questions=[],
  created_at
}){
  if(!review_id||!employee_id||!manager_id||!context_id||!created_at){
    throw new Error("Incomplete manager review");
  }
  return Object.freeze({
    review_id,employee_id,manager_id,context_id,evidence_refs,questions,
    created_at,status:"scheduled"
  });
}

export function completeManagerReview(review,{
  summary,
  strengths=[],
  concerns=[],
  follow_up=[],
  completed_at
}){
  if(!summary?.trim()||!completed_at) throw new Error("Incomplete manager review outcome");
  return Object.freeze({
    ...review,
    summary:summary.trim(),strengths,concerns,follow_up,completed_at,status:"completed"
  });
}
