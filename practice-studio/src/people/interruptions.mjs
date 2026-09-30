export function shouldInterrupt({
  currentSpeaker,
  incomingPriority="normal",
  roleAuthority="peer",
  elapsed_ms=0
}){
  if(incomingPriority==="urgent") return true;
  if(roleAuthority==="manager" && elapsed_ms>4000) return true;
  if(currentSpeaker==="none") return true;
  return false;
}
