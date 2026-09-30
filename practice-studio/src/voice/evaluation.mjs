export const VOICE_METRICS=Object.freeze([
  "connect_ms",
  "first_audio_ms",
  "round_trip_ms",
  "stt_word_error_rate",
  "barge_in_success",
  "caption_coverage",
  "turn_completion_rate",
  "provider_errors",
  "estimated_cost_per_active_hour"
]);

export function createVoiceTestRun({
  run_id,
  provider,
  model,
  scenario_id,
  started_at
}){
  if(!run_id||!provider||!scenario_id||!started_at) throw new Error("Incomplete voice test run");
  return {
    run_id,provider,model:model??null,scenario_id,started_at,
    turns:[],metrics:{},notes:[],status:"running"
  };
}

export function addVoiceTurn(run,turn){
  if(!turn?.turn_id||!turn?.speaker||!turn?.started_at) throw new Error("Invalid voice turn");
  run.turns.push({
    turn_id:turn.turn_id,
    speaker:turn.speaker,
    started_at:turn.started_at,
    completed_at:turn.completed_at??null,
    transcript:turn.transcript??null,
    expected_text:turn.expected_text??null,
    first_audio_ms:turn.first_audio_ms??null,
    round_trip_ms:turn.round_trip_ms??null,
    barge_in_attempted:Boolean(turn.barge_in_attempted),
    barge_in_success:turn.barge_in_success??null,
    captioned:Boolean(turn.captioned),
    error:turn.error??null
  });
  return run;
}

export function finalizeVoiceRun(run,{cost_usd=0,active_audio_minutes=0,human_ratings={}}={}){
  const turns=run.turns;
  const numeric=(key)=>turns.map(t=>t[key]).filter(v=>typeof v==="number");
  const avg=(xs)=>xs.length?xs.reduce((a,b)=>a+b,0)/xs.length:null;
  const barge=turns.filter(t=>t.barge_in_attempted);
  const captioned=turns.filter(t=>t.captioned).length;

  run.metrics={
    first_audio_ms:avg(numeric("first_audio_ms")),
    round_trip_ms:avg(numeric("round_trip_ms")),
    barge_in_success:barge.length?barge.filter(t=>t.barge_in_success===true).length/barge.length:null,
    caption_coverage:turns.length?captioned/turns.length:null,
    turn_completion_rate:turns.length?turns.filter(t=>!t.error).length/turns.length:null,
    provider_errors:turns.filter(t=>t.error).length,
    estimated_cost_per_active_hour:active_audio_minutes>0?cost_usd/(active_audio_minutes/60):null,
    human_ratings
  };
  run.status="complete";
  return Object.freeze(structuredClone(run));
}
