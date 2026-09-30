import {selectConversationMode,recoverFromVoiceFailure} from "../voice/fallback.mjs";
export function prepareLiveMeeting({meeting,conversation,voice_health,user_preference,accessibility,network_quality}){
 const s=selectConversationMode({voice_health,user_preference,accessibility,network_quality});
 return Object.freeze({meeting_id:meeting.meeting_id,conversation_id:conversation.conversation_id,mode:s.mode,mode_reason:s.reason,captions:true,transcript_visible:true,can_switch_to_text:true,can_switch_to_voice:s.mode!=="text"||s.reason==="preference"});
}
export function handleMeetingVoiceFailure({conversation,partialTranscript,reason}){return recoverFromVoiceFailure({activeConversation:conversation,partialTranscript,failure_reason:reason});}