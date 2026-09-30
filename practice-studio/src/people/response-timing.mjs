import { delayWithinWorkday } from "../scheduling/delivery.mjs";

export function scheduleHumanLikeResponse({
  received_at,
  responder,
  policy,
  complexity="normal"
}){
  const base = complexity==="simple"?15:complexity==="complex"?120:45;
  const roleDelay = responder?.role?.toLowerCase().includes("manager") ? 20 : 0;
  const availabilityDelay = responder?.availability?.response_delay_minutes ?? 0;
  const total=base+roleDelay+availabilityDelay;
  return delayWithinWorkday({from:received_at,minutes:total,policy});
}
