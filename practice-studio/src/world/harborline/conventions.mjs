export const HARBORLINE_CONVENTIONS=Object.freeze({
 email_domain:"harborline.internal",
 employee_id_format:"HL-######",
 repository_prefix:"hl-",
 ticket_prefixes:{identity:"IAM",security:"SEC",risk:"RSK",ai:"AI",client:"OPS"},
 meeting_norms:{
  default_minutes:25,
  decision_meetings_require_pre_read:true,
  action_items_require_owner_and_date:true
 },
 communication:{
  routine:"message-or-email",
  urgent_security:"incident-channel-and-page",
  approvals:"system-of-record-required"
 }
});