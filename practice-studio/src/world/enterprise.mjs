import { HARBORLINE } from "./harborline/company.mjs";

export const ENTERPRISE_WORLD=Object.freeze({
  world_id:"enterprise-001",
  name_status:"fictional-enterprise",
  working_name:HARBORLINE.display_name,
  legal_form:"fictional-private-company",
  employee_count:HARBORLINE.workforce.employees,
  contractor_count:HARBORLINE.workforce.contractors,
  operating_regions:["United States","Canada"],
  headquarters:"Albany, New York",
  industry_model:"business services and technology",
  description:"A mid-sized business-services and technology company serving regulated and operationally complex clients.",
  world_is_synthetic:true
});

export const LOCATIONS=Object.freeze([
  {location_id:"albany",city:"Albany",region:"New York",country:"United States",functions:["executive","technology","risk","client-operations"]},
  {location_id:"toronto",city:"Toronto",region:"Ontario",country:"Canada",functions:["client-operations","technology","data-ai"]},
  {location_id:"remote",label:"Distributed workforce",country:"United States and Canada",functions:["multiple"]}
]);
