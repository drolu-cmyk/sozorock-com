export function buildMeetingRoom(meeting,employeeId){
  if(!meeting?.participants?.includes(employeeId)) throw new Error("Employee is not invited");
  return Object.freeze({
    meeting_id:meeting.meeting_id,
    title:meeting.title,
    start_at:meeting.start_at,
    end_at:meeting.end_at,
    participants:meeting.participants,
    agenda:meeting.agenda ?? [],
    materials:meeting.materials ?? [],
    modalities:["voice","text","captions"],
    can_join:true
  });
}
