export function createVoiceBenchmarkCase(input){
  const required=["case_id","name","prompt","expected_language"];
  for(const k of required) if(!input?.[k]) throw new Error("Missing "+k);
  return Object.freeze({
    interruption_required:false,
    background_noise:false,
    accent_profile:null,
    max_latency_ms:1200,
    ...input
  });
}

export function scoreVoiceRun(run){
  const required=["provider","case_id","round_trip_ms","stt_word_error_rate","caption_coverage","failure_recovered","cost_usd"];
  for(const k of required) if(run?.[k]===undefined) throw new Error("Missing "+k);

  return Object.freeze({
    provider:run.provider,
    case_id:run.case_id,
    latency_ok:run.round_trip_ms<=1200,
    stt_ok:run.stt_word_error_rate<=0.08,
    captions_ok:run.caption_coverage>=0.98,
    interruption_ok:run.interruption_required ? Boolean(run.interruption_success) : true,
    recovery_ok:Boolean(run.failure_recovered),
    naturalness_score:run.naturalness_score ?? null,
    cost_usd:run.cost_usd
  });
}

export function summarizeProviderRuns(runs){
  if(!runs.length) return null;
  const avg=(key)=>runs.reduce((s,r)=>s+(Number(r[key])||0),0)/runs.length;
  const passRate=(key)=>runs.filter(r=>r[key]===true).length/runs.length;
  return Object.freeze({
    provider:runs[0].provider,
    runs:runs.length,
    avg_round_trip_ms:Math.round(avg("round_trip_ms")),
    avg_stt_word_error_rate:Number(avg("stt_word_error_rate").toFixed(4)),
    avg_caption_coverage:Number(avg("caption_coverage").toFixed(4)),
    interruption_success_rate:Number(passRate("interruption_success").toFixed(4)),
    recovery_rate:Number(passRate("failure_recovered").toFixed(4)),
    avg_naturalness_score:Number(avg("naturalness_score").toFixed(2)),
    avg_cost_usd:Number(avg("cost_usd").toFixed(4))
  });
}
