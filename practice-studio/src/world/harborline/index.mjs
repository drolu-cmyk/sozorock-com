import {HARBORLINE} from "./company.mjs";
import {HARBORLINE_FUNCTIONS,HARBORLINE_PEOPLE} from "./organization.mjs";
import {HARBORLINE_TECHNOLOGY,HARBORLINE_REPOSITORIES} from "./technology.mjs";
import {HARBORLINE_IMPERFECTIONS} from "./imperfections.mjs";
import {HARBORLINE_CONVENTIONS} from "./conventions.mjs";

export function createHarborlineWorld(){
 return Object.freeze({
  company:HARBORLINE,
  functions:HARBORLINE_FUNCTIONS,
  people:HARBORLINE_PEOPLE,
  technology:HARBORLINE_TECHNOLOGY,
  repositories:HARBORLINE_REPOSITORIES,
  imperfections:HARBORLINE_IMPERFECTIONS,
  conventions:HARBORLINE_CONVENTIONS,
  world_version:"1.0.0"
 });
}