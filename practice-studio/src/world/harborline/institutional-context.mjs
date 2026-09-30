import {HARBORLINE_HISTORY} from "./history.mjs";
import {HARBORLINE_CLIENTS,HARBORLINE_VENDORS} from "./relationships.mjs";
import {HARBORLINE_POLICIES} from "./policies.mjs";
import {HARBORLINE_IDENTITY_MODEL} from "./identity-model.mjs";
import {ATLAS_SYSTEM} from "./atlas.mjs";

export function createHarborlineInstitutionalContext(){
 return Object.freeze({
  history:HARBORLINE_HISTORY,
  clients:HARBORLINE_CLIENTS,
  vendors:HARBORLINE_VENDORS,
  policies:HARBORLINE_POLICIES,
  identity:HARBORLINE_IDENTITY_MODEL,
  atlas:ATLAS_SYSTEM
 });
}

export function traceInstitutionalFact({fact,context=createHarborlineInstitutionalContext()}){
 const history=context.history.filter(h=>h.effects.includes(fact));
 return Object.freeze({fact,history});
}