export function buildInbox(messages,employeeId){
  return messages
    .filter(m=>m.visible_to?.includes(employeeId))
    .sort((a,b)=>new Date(b.received_at)-new Date(a.received_at))
    .map(m=>({
      id:m.id,
      from:m.from,
      subject:m.subject ?? null,
      preview:m.text?.slice(0,140) ?? "",
      received_at:m.received_at,
      unread:Boolean(m.unread),
      thread_id:m.thread_id ?? m.id,
      actions:["open","reply"]
    }));
}

export function createReply({thread_id,to,text,sent_at}){
  if(!thread_id||!to||!text?.trim()||!sent_at) throw new Error("Incomplete reply");
  return Object.freeze({thread_id,to,text:text.trim(),sent_at});
}
