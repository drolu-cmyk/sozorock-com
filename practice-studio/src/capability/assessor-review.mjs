export function createAssessorReview({
  review_id,employee_id,period_start,period_end,
  evidence_refs=[],findings=[],uncertainties=[],reviewer_id,reviewed_at
}){
  if(!review_id||!employee_id||!period_start||!period_end||!reviewer_id||!reviewed_at){
    throw new Error("Incomplete assessor review");
  }
  return Object.freeze({
    review_id,employee_id,period_start,period_end,evidence_refs,findings,uncertainties,
    reviewer_id,reviewed_at,status:"recorded"
  });
}