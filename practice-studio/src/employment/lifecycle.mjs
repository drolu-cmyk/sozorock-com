import { CAPABILITY_DIMENSIONS } from '../capability/observation.mjs';
import { requireFields, createWorkItem } from '../domain/index.mjs';
import { createEvent } from '../events/index.mjs';
import { assertAuthorized } from '../identity/authorization.mjs';
import { buildCapabilityRecord } from '../capability/record.mjs';
import { buildEvidencePortfolio } from '../capability/portfolio.mjs';
import { createManagerReview } from '../management/manager-review.mjs';
import { createDebriefPlan } from '../evidence/debrief.mjs';

export const CONTRACT_PHASES=Object.freeze(['onboarding','guided','supported','independent','cross_functional','handover','exited']);
const NEXT=Object.freeze({onboarding:'guided',guided:'supported',supported:'independent',independent:'cross_functional'});

export function createEmploymentContract({employee,contract_id,created_at,policy={}}){
  requireFields(employee,['employee_id','tenant_id','role_id','manager_id','contract_start','contract_end']);
  requireFields({contract_id,created_at},['contract_id','created_at']);
  const start=instant(employee.contract_start), end=instant(employee.contract_end);
  if(end<=start || instant(created_at)>end) throw new Error('Invalid contract period');
  const rules={minimum_contexts:2,required_dimensions:['execution','judgment'],...structuredClone(policy)};
  if(!Number.isInteger(rules.minimum_contexts) || rules.minimum_contexts<1 || !Array.isArray(rules.required_dimensions) ||
    !rules.required_dimensions.length || !rules.required_dimensions.every(d=>CAPABILITY_DIMENSIONS.includes(d))) throw new Error('Invalid progression policy');
  return Object.freeze({
    contract_id,tenant_id:employee.tenant_id,employee_id:employee.employee_id,manager_id:employee.manager_id,
    role_id:employee.role_id,starts_at:employee.contract_start,ends_at:employee.contract_end,
    phase:'onboarding',version:0,updated_at:created_at,history:[],
    responsibility_level:'guided',
    policy:rules
  });
}

// Inputs are authoritative engine records, never evidence claims submitted directly by the browser.
export function contractProgressionReadiness({contract,now,onboarding_ready=false,observations=[],review=null}){
  const next=NEXT[contract.phase];
  const blockers=[];
  if(!next) blockers.push('no-next-work-phase');
  const t=instant(now);
  if(t<instant(contract.starts_at)) blockers.push('contract-not-started');
  if(t>=instant(contract.ends_at)) blockers.push('contract-ended');
  if(contract.phase==='onboarding'){
    if(!onboarding_ready) blockers.push('onboarding-incomplete');
  } else {
    const since=instant(contract.updated_at);
    const scoped=observations.filter(o=>o.employee_id===contract.employee_id &&
      o.evidence_refs?.length && instant(o.observed_at)>=since && instant(o.observed_at)<=t);
    const level=['supported','independent'].includes(next)?next:'independent';
    const relevant=scoped.filter(o=>o.independence===level);
    if(new Set(relevant.map(o=>o.context_id)).size<contract.policy.minimum_contexts) blockers.push('insufficient-work-contexts');
    if(!contract.policy.required_dimensions.every(d=>relevant.some(o=>o.dimension===d))) blockers.push('missing-capability-dimensions');
    const evidence=new Set(relevant.flatMap(o=>o.evidence_refs));
    if(!review || !review.summary?.trim() || review.status!=='completed' || review.employee_id!==contract.employee_id ||
      review.manager_id!==contract.manager_id || !review.evidence_refs?.length ||
      !review.evidence_refs.every(ref=>evidence.has(ref)) ||
      instant(review.completed_at??0)<since || instant(review.completed_at??0)>t){
      blockers.push('manager-review-required');
    } else if(review.concerns?.length || review.follow_up?.length) blockers.push('manager-follow-up-open');
  }
  return Object.freeze({ready:!blockers.length,next_phase:next??null,blockers});
}

export function advanceEmploymentContract({contract,principal,event_id,now,...inputs}){
  checkManager(contract,principal);
  const readiness=contractProgressionReadiness({contract,now,...inputs});
  if(!readiness.ready) throw new Error('Contract progression blocked: '+readiness.blockers.join(', '));
  return transition(contract,readiness.next_phase,{principal,event_id,now,
    evidence_refs:inputs.review?.evidence_refs??[],review_id:inputs.review?.review_id??null});
}

export function beginContractHandover({contract,principal,event_id,now,work=[],reason}){
  checkManager(contract,principal);
  if(['onboarding','handover','exited'].includes(contract.phase)) throw new Error('Cannot start handover in current phase');
  if(!reason?.trim()) throw new Error('Handover reason required');
  const openWork=work.filter(w=>!['closed','completed','cancelled'].includes(w.status));
  if(openWork.some(w=>w.owner!==contract.employee_id || w.tenant_id!==contract.tenant_id)) throw new Error('Handover work scope mismatch');
  const result=transition(contract,'handover',{principal,event_id,now});
  return {...result,contract:Object.freeze({...result.contract,handover:{reason:reason.trim(),open_work_ids:openWork.map(w=>w.work_item_id)}})};
}

export function closeEmploymentContract({contract,employee,principal,event_id,now,observations=[],artifacts=[],feedback=[],episode,handover,teardown,exit_review}){
  checkManager(contract,principal);
  if(contract.phase!=='handover') throw new Error('Handover required before exit');
  if(employee.employee_id!==contract.employee_id || employee.tenant_id!==contract.tenant_id) throw new Error('Employee scope mismatch');
  if(!handover?.artifact_id || !handover.evidence_refs?.length || !handover.accepted_by ||
    handover.accepted_by!==contract.manager_id || handover.employee_id!==contract.employee_id ||
    handover.tenant_id!==contract.tenant_id) throw new Error('Accepted handover required');
  const assignments=handover.assignments??[];
  if(!contract.handover.open_work_ids.every(id=>assignments.some(a=>a.work_item_id===id && a.successor_id && a.successor_id!==contract.employee_id))) throw new Error('Open work needs a successor');
  if(!teardown || teardown.status!=='completed' || teardown.tenant_id!==contract.tenant_id || teardown.employee_id!==contract.employee_id || !teardown.evidence_refs?.length) throw new Error('Verified access teardown required');
  if(observations.some(o=>o.employee_id!==contract.employee_id || instant(o.observed_at)<instant(contract.starts_at) || instant(o.observed_at)>instant(now)) ||
    [...artifacts,...feedback].some(o=>o.employee_id!==contract.employee_id || o.tenant_id!==contract.tenant_id)) throw new Error('Portfolio scope mismatch');
  if(!episode?.evidence?.length || episode.evidence.some(e=>e.employee_id!==contract.employee_id || e.tenant_id!==contract.tenant_id)) throw new Error('Scoped debrief evidence required');
  if(!exit_review || exit_review.status!=='completed' || exit_review.employee_id!==contract.employee_id ||
    exit_review.manager_id!==contract.manager_id || !exit_review.summary?.trim() ||
    !exit_review.evidence_refs?.length || !exit_review.evidence_refs.every(ref=>episode.evidence.some(e=>e.evidence_id===ref)) ||
    instant(exit_review.completed_at)<instant(contract.updated_at) || instant(exit_review.completed_at)>instant(now)) throw new Error('Completed grounded exit review required');
  const result=transition(contract,'exited',{principal,event_id,now,evidence_refs:[...handover.evidence_refs,...teardown.evidence_refs]});
  const record=buildCapabilityRecord({employee_id:contract.employee_id,observations,artifacts,feedback});
  return {...result,
    employee:Object.freeze({...employee,employment_status:'exited',contract_exited_at:now}),
    portfolio:buildEvidencePortfolio({employee,record}),debrief:createDebriefPlan(episode),
    access_disposition:'revoked-and-verified'};
}

export function contractAllowsWork(contract,now){
  const t=instant(now);
  return !['onboarding','exited'].includes(contract.phase) && t>=instant(contract.starts_at) && t<instant(contract.ends_at);
}

export function createContractManagerReview({contract,review_id,context_id,created_at,evidence_refs=[]}){
  return createManagerReview({review_id,employee_id:contract.employee_id,manager_id:contract.manager_id,context_id,created_at,evidence_refs});
}

export function contractWorkItems({contract,now}){
  const common={owner:contract.employee_id,tenant_id:contract.tenant_id,context_id:contract.contract_id};
  if(contract.phase==='exited') return [];
  if(contract.phase==='handover' || instant(now)>=instant(contract.ends_at)) return [createWorkItem({
    ...common,work_item_id:`${contract.contract_id}:handover`,type:'deliverable',
    title:'Prepare handover and account for unfinished work',evidence_requirements:['work ownership','verification evidence','access teardown']
  })];
  if(contract.phase==='onboarding') return [createWorkItem({
    ...common,work_item_id:`${contract.contract_id}:arrival`,type:'required_training',
    title:'Complete workplace arrival and required training',evidence_requirements:['identity readiness','policy acknowledgments']
  })];
  return [createWorkItem({
    ...common,work_item_id:`${contract.contract_id}:review:${contract.version}`,type:'review',
    title:'Prepare for your manager review',evidence_requirements:['evidence of work','response to feedback','uncertainties']
  })];
}

function transition(contract,phase,{principal,event_id,now,evidence_refs=[],review_id=null}){
  if(instant(now)<instant(contract.updated_at)) throw new Error('Contract clock cannot move backwards');
  if(contract.history.some(h=>h.event_id===event_id)) throw new Error('Contract event already applied');
  const entry={event_id,from:contract.phase,to:phase,occurred_at:now,evidence_refs,review_id};
  const next=Object.freeze({...structuredClone(contract),phase,version:contract.version+1,updated_at:now,
    responsibility_level:['guided','supported','independent'].includes(phase)?phase:contract.responsibility_level,
    history:[...structuredClone(contract.history),entry]});
  const event=createEvent({event_id,tenant_id:contract.tenant_id,employee_id:contract.employee_id,
    occurred_at:now,actor_type:'simulated_manager',actor_id:principal.employee_id,
    source_system:'practice-studio',event_type:phase==='exited'?'contract.exited':'contract.phase_changed',
    context_id:contract.contract_id,authoritative:true,visible_to:[contract.employee_id],payload:entry});
  return {contract:next,event};
}

function checkManager(contract,principal){
  assertAuthorized({principal,action:'employee.review',resource:{tenant_id:contract.tenant_id}});
  if(principal.employee_id!==contract.manager_id) throw new Error('Assigned manager required');
}
function instant(value){
  const t=new Date(value).getTime();
  if(Number.isNaN(t)) throw new Error('Invalid contract timestamp');
  return t;
}
