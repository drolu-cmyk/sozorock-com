/**
 * Produce grounded debrief prompts from recorded evidence.
 * This returns prompt material; a voice/model layer may render it conversationally.
 */
export function createDebriefPlan(episode){
  const questions=[];
  const evidence=episode?.evidence ?? [];

  if(!evidence.length){
    questions.push("Walk me through what you understood was happening.");
    return {context_id:episode?.context_id ?? null,questions,grounding:[]};
  }

  for(const record of evidence){
    if(record.employee_action){
      questions.push(`At ${record.timestamp}, you ${record.employee_action}. What evidence supported that decision?`);
    }
    if(record.downstream_consequence){
      questions.push(`That action was followed by: ${record.downstream_consequence}. Did you anticipate that outcome?`);
    }
  }

  questions.push("What alternative action did you consider?");
  questions.push("What would you do differently if the same situation happened again?");
  questions.push("What should happen next from an identity and access perspective?");

  return {
    context_id:episode.context_id,
    questions:[...new Set(questions)],
    grounding:evidence.map(r=>r.evidence_id)
  };
}
