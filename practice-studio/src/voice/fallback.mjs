export function selectConversationMode({voice_health,user_preference="voice",accessibility={},network_quality="good"}){
 if(accessibility.force_text===true)return{mode:"text",reason:"accessibility"};
 if(user_preference==="text")return{mode:"text",reason:"preference"};
 if(!voice_health?.ok)return{mode:"text",reason:"voice-provider-unavailable"};
 if(network_quality==="poor")return{mode:"text",reason:"network-quality"};
 return{mode:"voice_and_text",reason:"available"};
}
export function recoverFromVoiceFailure({activeConversation,partialTranscript="",failure_reason}){
 return Object.freeze({conversation_id:activeConversation.conversation_id,fallback_mode:"text",preserved_transcript:partialTranscript,notice:"Voice is unavailable. Continue here by text; your work context and conversation are preserved.",failure_reason});
}