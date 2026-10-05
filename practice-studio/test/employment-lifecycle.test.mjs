import test from 'node:test';
import assert from 'node:assert/strict';
import { createEmploymentContract, contractProgressionReadiness, advanceEmploymentContract,
  beginContractHandover, closeEmploymentContract, contractAllowsWork, createContractManagerReview, contractWorkItems } from '../src/employment/lifecycle.mjs';
import { completeManagerReview } from '../src/management/manager-review.mjs';
import { InMemoryEventStore } from '../src/persistence/memory.mjs';
const employee={employee_id:'e1',tenant_id:'t1',registered_name:'Olu',role_id:'iam-analyst',manager_id:'m1',contract_start:'2026-10-01T13:00:00Z',contract_end:'2026-12-24T22:00:00Z'};
const principal={tenant_id:'t1',employee_id:'m1',role_id:'iam-manager'};
const make=()=>createEmploymentContract({employee,contract_id:'contract-1',created_at:'2026-09-30T13:00:00Z'});
function observed(level,at){
  return ['execution','judgment'].map((dimension,i)=>({observation_id:`${level}-${i}`,employee_id:'e1',dimension,context_id:`${level}-context-${i}`,
    evidence_refs:[`${level}-ev-${i}`],observed_behavior:`Verified ${dimension} during assigned work`,observed_at:at,independence:level}));
}
function reviewed(contract,observations,now){
  return completeManagerReview(createContractManagerReview({contract,review_id:`review-${contract.version}`,context_id:contract.contract_id,created_at:now,
    evidence_refs:observations.flatMap(o=>o.evidence_refs)}),{summary:'Work verified; responsibility can increase.',completed_at:now});
}
function advance(contract,next,now,inputs={}){
  return advanceEmploymentContract({contract,principal,event_id:`phase-${next}`,now,...inputs});
}

test('employee contract persists across workdays, evidence reviews, handover and exit',async()=>{
  const store=new InMemoryEventStore();
  let contract=make();
  assert.equal(contractAllowsWork(contract,employee.contract_start),false);
  let result=advance(contract,'guided',employee.contract_start,{onboarding_ready:true});
  contract=result.contract;await store.append(result.event);
  const all=[];
  for(const [phase,level,now] of [
    ['supported','supported','2026-10-09T14:00:00Z'],
    ['independent','independent','2026-11-06T15:00:00Z'],
    ['cross_functional','independent','2026-11-20T15:00:00Z']
  ]){
    const observations=observed(level,now).map(o=>({...o,context_id:phase+'-'+o.context_id,evidence_refs:phase==='cross_functional'?['cross-'+o.observation_id]:o.evidence_refs}));
    all.push(...observations);
    result=advance(contract,phase,now,{observations,review:reviewed(contract,observations,now)});
    // A reload must preserve the lifecycle rather than resetting the employee to Day 1.
    contract=JSON.parse(JSON.stringify(result.contract));await store.append(result.event);
    assert.equal(contract.phase,phase);
  }
  assert.equal(contract.responsibility_level,'independent');
  assert.equal(contractAllowsWork(contract,employee.contract_end),false);
  result=beginContractHandover({contract,principal,event_id:'handover',now:employee.contract_end,reason:'Contract completed',
    work:[{work_item_id:'unfinished',owner:'e1',tenant_id:'t1',status:'waiting'}]});
  contract=result.contract;await store.append(result.event);
  const episode={context_id:'contract-1',evidence:[{evidence_id:'debrief-evidence',employee_id:'e1',tenant_id:'t1',timestamp:employee.contract_end,employee_action:'handed over unresolved verification work'}]};
  const now='2026-12-24T22:30:00Z';
  const exit_review=completeManagerReview(createContractManagerReview({contract,review_id:'exit-review',context_id:'contract-1',created_at:employee.contract_end,evidence_refs:['debrief-evidence']}),{summary:'Handover and work history reviewed.',completed_at:now});
  result=closeEmploymentContract({contract,employee,principal,event_id:'exit',now,observations:all,episode,exit_review,
    handover:{artifact_id:'handover-note',tenant_id:'t1',employee_id:'e1',accepted_by:'m1',evidence_refs:['handover-evidence'],assignments:[{work_item_id:'unfinished',successor_id:'e2'}]},
    teardown:{status:'completed',tenant_id:'t1',employee_id:'e1',evidence_refs:['revocation-log']}});
  await store.append(result.event);
  assert.equal(result.contract.phase,'exited');
  assert.equal(result.employee.employment_status,'exited');
  assert.equal(result.portfolio.demonstrated_work.length,6);
  assert.deepEqual(result.debrief.grounding,['debrief-evidence']);
  assert.equal(contractAllowsWork(result.contract,now),false);
  assert.equal((await store.listByContext('contract-1')).length,6);
  assert.equal(contractWorkItems({contract:result.contract,now}).length,0);
});

test('time alone and unrelated or earlier evidence cannot advance responsibility',()=>{
  const contract=advance(make(),'guided',employee.contract_start,{onboarding_ready:true}).contract;
  const now='2026-10-09T14:00:00Z';
  assert.equal(contractProgressionReadiness({contract,now}).ready,false);
  for(const observations of [observed('supported',now).map(o=>({...o,employee_id:'other'})),observed('supported','2026-09-29T14:00:00Z'),observed('supported','2026-10-10T14:00:00Z')]){
    assert.equal(contractProgressionReadiness({contract,now,observations,review:reviewed(contract,observations,now)}).ready,false);
  }
  const observations=observed('supported',now);
  const review={...reviewed(contract,observations,now),follow_up:['Verify unresolved permission']};
  assert.throws(()=>advance(contract,'supported',now,{observations,review}),/manager-follow-up-open/);
  assert.equal(contract.phase,'guided');
});

test('tenant scope, assigned manager, clock and contract end govern lifecycle commands',()=>{
  assert.throws(()=>advanceEmploymentContract({contract:make(),principal:{...principal,tenant_id:'other'},event_id:'x',now:employee.contract_start,onboarding_ready:true}),/tenant-mismatch/);
  assert.throws(()=>advanceEmploymentContract({contract:make(),principal:{...principal,employee_id:'other'},event_id:'x',now:employee.contract_start,onboarding_ready:true}),/Assigned manager/);
  assert.throws(()=>advance(make(),'guided','2026-09-29T13:00:00Z',{onboarding_ready:true}),/contract-not-started/);
  assert.throws(()=>advance(make(),'guided',employee.contract_end,{onboarding_ready:true}),/contract-ended/);
  const contract=advance(make(),'guided',employee.contract_start,{onboarding_ready:true}).contract;
  assert.throws(()=>beginContractHandover({contract,principal,event_id:'x',now:'2026-09-30T13:00:00Z',reason:'exit'}),/clock/);
  assert.throws(()=>beginContractHandover({contract,principal,event_id:'phase-guided',now:'2026-10-02T13:00:00Z',reason:'exit'}),/already applied/);
  assert.equal(contractWorkItems({contract,now:employee.contract_end})[0].type,'deliverable');
});

test('exit requires accepted handover, successor, teardown and recorded debrief',()=>{
  const active=advance(make(),'guided',employee.contract_start,{onboarding_ready:true}).contract;
  const contract=beginContractHandover({contract:active,principal,event_id:'handover',now:'2026-10-02T13:00:00Z',reason:'Early withdrawal',work:[{work_item_id:'w1',owner:'e1',tenant_id:'t1',status:'open'}]}).contract;
  const input={contract,employee,principal,event_id:'exit',now:'2026-10-02T14:00:00Z'};
  assert.throws(()=>closeEmploymentContract(input),/Accepted handover/);
  const handover={artifact_id:'h',tenant_id:'t1',employee_id:'e1',accepted_by:'m1',evidence_refs:['h1']};
  assert.throws(()=>closeEmploymentContract({...input,handover}),/successor/);
  handover.assignments=[{work_item_id:'w1',successor_id:'e2'}];
  assert.throws(()=>closeEmploymentContract({...input,handover}),/teardown/);
  const teardown={status:'completed',tenant_id:'t1',employee_id:'e1',evidence_refs:['t1']};
  assert.throws(()=>closeEmploymentContract({...input,handover,teardown,episode:{evidence:[{employee_id:'other',tenant_id:'t1'}]}}),/Scoped debrief/);
  assert.throws(()=>closeEmploymentContract({...input,handover,teardown,episode:{evidence:[{employee_id:'e1',tenant_id:'t1',evidence_id:'ev1'}]}}),/exit review/);
  assert.throws(()=>closeEmploymentContract({...input,handover,teardown,artifacts:[{employee_id:'other',tenant_id:'t1'}]}),/Portfolio scope/);
});
