export function routeConversationTurn({
  text,
  preferred_modality="voice",
  voice_available=true,
  accessibility={}
}){
  if(!text?.trim()) throw new Error("Turn text required");

  if(accessibility.force_text===true){
    return {input:"text",output:"text",captions:true};
  }

  if(preferred_modality==="voice" && voice_available){
    return {input:"voice_or_text",output:"voice_and_text",captions:true};
  }

  return {input:"text",output:"text",captions:true};
}
