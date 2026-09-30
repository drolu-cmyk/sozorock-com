export function buildEvidencePanel({context,evidence=[]}){
  return Object.freeze({
    context_id:context.context_id,
    items:evidence.map(e=>({
      evidence_id:e.evidence_id??null,
      source_system:e.source_system,
      summary:e.summary??e.employee_action??null,
      observed_at:e.observed_at??e.timestamp??null,
      reference_id:e.reference_id??e.evidence_reference??null
    }))
  });
}
