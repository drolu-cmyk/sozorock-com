import { buildMessageThread } from "./message-thread.mjs";
import { buildMeetingSurface } from "./meeting-surface.mjs";
import { buildWorkItemDetail } from "./work-item-detail.mjs";

export function buildInteractiveWorkspace({
  employee,
  messages,
  meetings,
  workItem,
  context,
  evidence,
  waitingOn,
  systems,
  artifacts,
  now
}){
  return Object.freeze({
    messages:(messages??[]).map(t=>buildMessageThread({thread:t,employee_id:employee.employee_id})),
    meetings:buildMeetingSurface({meetings:meetings??[],now,employee_id:employee.employee_id}),
    work:workItem?buildWorkItemDetail({
      item:workItem,context,evidence:evidence??[],waiting_on:waitingOn??[],
      systems:systems??[],artifacts:artifacts??[]
    }):null
  });
}
