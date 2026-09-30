const LEVELS=["guided","supported","independent"];

export function independenceTrend(observations){
  const ordered=[...observations].sort((a,b)=>new Date(a.observed_at)-new Date(b.observed_at));
  if(!ordered.length) return {current:null,trend:"insufficient-evidence"};
  const first=LEVELS.indexOf(ordered[0].independence);
  const last=LEVELS.indexOf(ordered.at(-1).independence);
  return Object.freeze({
    current:ordered.at(-1).independence,
    trend:last>first?"increasing":last<first?"decreasing":"stable",
    observation_count:ordered.length
  });
}

export function demonstratedAcrossContexts(observations){
  return new Set(observations.map(x=>x.context_id)).size;
}