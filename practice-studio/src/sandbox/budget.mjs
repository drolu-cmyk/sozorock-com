export function createBudgetGuard({lease_id,limit_usd,spent_usd=0,soft_threshold=0.7,hard_threshold=1}){
  if(!lease_id||!Number.isFinite(limit_usd)||limit_usd<=0) throw new Error("Invalid budget guard");
  return Object.freeze({lease_id,limit_usd,spent_usd,soft_threshold,hard_threshold});
}

export function evaluateBudget(guard){
  const ratio=guard.spent_usd/guard.limit_usd;
  return Object.freeze({
    ratio,
    state:ratio>=guard.hard_threshold?"stop":ratio>=guard.soft_threshold?"warn":"ok",
    remaining_usd:Math.max(0,guard.limit_usd-guard.spent_usd)
  });
}
