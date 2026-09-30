export function buildMessageThread({thread,employee_id}){
  if(!thread?.thread_id) throw new Error("thread required");
  return Object.freeze({
    thread_id:thread.thread_id,
    subject:thread.subject??null,
    participants:thread.participants??[],
    messages:(thread.messages??[]).map(m=>({
      message_id:m.message_id,
      from:m.from,
      to:m.to,
      text:m.text,
      sent_at:m.sent_at,
      unread:m.to===employee_id?Boolean(m.unread):false,
      attachments:m.attachments??[]
    })),
    actions:["reply"]
  });
}

export function appendThreadReply(thread,{from,to,text,sent_at}){
  if(!from||!to||!text?.trim()||!sent_at) throw new Error("Incomplete thread reply");
  return Object.freeze({
    ...thread,
    messages:[...(thread.messages??[]),{
      message_id:crypto.randomUUID(),from,to,text:text.trim(),sent_at,unread:false,attachments:[]
    }]
  });
}
