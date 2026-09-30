import { buildNavigation } from "./navigation.mjs";
import { buildTodaySurface } from "./today-surface.mjs";
import { renderWorkplaceShell } from "./shell-renderer.mjs";

export function buildEmployeeWorkplace({
  principal,employee,now,messages=[],meetings=[],work=[],training=[],waitingOn=[]
}){
  const unread=messages.filter(m=>m.unread);
  const navigation=buildNavigation({principal,counts:{messages:unread.length,meetings:meetings.length}});
  const today=buildTodaySurface({
    employee,now,unreadMessages:unread,meetings,activeWork:work,requiredTraining:training,waitingOn
  });
  return Object.freeze({navigation,today,html:renderWorkplaceShell({navigation,today,employee})});
}
