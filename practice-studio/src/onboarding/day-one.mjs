import { createIamDayOne } from "../orchestration/iam-day-one.mjs";
import { createWorkplaceMailbox, createWorkplaceCalendar } from "./workplace-accounts.mjs";
import { requiredDayOneTraining, DAY_ONE_POLICIES } from "./policies.mjs";

export function buildDayOneArrival({employee,tenant_id}){
  const mailbox=createWorkplaceMailbox({employee});
  const calendar=createWorkplaceCalendar({employee});
  const iam=createIamDayOne({
    tenant_id,
    employee_id:employee.employee_id,
    employee_name:employee.preferred_name??employee.registered_name
  });

  return Object.freeze({
    employee,
    mailbox,
    calendar,
    manager_id:employee.manager_id,
    team_id:employee.team_id,
    required_training:requiredDayOneTraining(employee.role_id),
    policies:DAY_ONE_POLICIES,
    work:iam.work,
    events:iam.events,
    first_screen:{
      heading:`Good morning, ${employee.preferred_name??employee.registered_name}.`,
      summary:"Your workplace access is ready. Your first team check-in starts at 9:15.",
      actions:["Open messages","View calendar","Review required training","Start first work item"]
    }
  });
}
