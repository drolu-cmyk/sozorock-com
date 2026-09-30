import { authorize } from "../identity/authorization.mjs";

const ACTION_BY_SURFACE={
  today:"work.read",work:"work.read",people:"work.read",messages:"message.read",
  meetings:"meeting.join",files:"work.read",systems:"github.inspect",support:"support.read"
};

export function resolveWorkplaceSurface({surface,principal,resource={}}){
  const action=ACTION_BY_SURFACE[surface];
  if(!action) return {status:404};
  const auth=authorize({principal,action,resource:{tenant_id:principal.tenant_id,employee_id:principal.employee_id,...resource}});
  if(!auth.allowed) return {status:403,reason:auth.reason};
  return {status:200,surface};
}
