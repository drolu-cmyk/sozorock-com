/**
 * Reconstruct a professional episode from immutable events and evidence.
 * This is used by assessor review and grounded debriefing.
 */
export async function reconstructEpisode({
  employee_id,
  context_id,
  eventStore,
  evidenceStore
}){
  const [events,evidence]=await Promise.all([
    eventStore.listByContext(context_id,{limit:1000}),
    evidenceStore.listByEmployee(employee_id,{limit:1000})
  ]);

  const relatedEvidence=evidence.filter(r=>r.context_id===context_id);
  const ordered=[...events].sort((a,b)=>new Date(a.occurred_at)-new Date(b.occurred_at));

  return Object.freeze({
    employee_id,
    context_id,
    started_at: ordered[0]?.occurred_at ?? null,
    ended_at: ordered.at(-1)?.occurred_at ?? null,
    events: ordered,
    evidence: relatedEvidence,
    information_timeline: relatedEvidence.map(r=>({
      timestamp:r.timestamp,
      information_available:r.information_available,
      action:r.employee_action,
      result:r.immediate_result,
      consequence:r.downstream_consequence
    }))
  });
}
