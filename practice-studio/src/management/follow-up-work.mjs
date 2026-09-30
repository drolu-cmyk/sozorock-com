export function createFollowUpWorkFromConditions(conditions){
  return conditions.map(c=>Object.freeze({
    work_item_id:`work-${c.condition_id}`,
    type:"assignment",
    title:c.title,
    owner:c.owner,
    due_at:c.due_at,
    status:"open",
    source:"executive-decision",
    evidence_requirements:c.evidence_required
  }));
}
