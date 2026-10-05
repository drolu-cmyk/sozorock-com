import test from 'node:test';
import assert from 'node:assert/strict';
import { createWorkdayPolicy, isWithinWorkday } from '../src/scheduling/work-hours.mjs';
import { businessMinutesBetween } from '../src/scheduling/deadlines.mjs';
import { classifyDelivery, delayWithinWorkday } from '../src/scheduling/delivery.mjs';
import { buildTodaySurface } from '../src/ui/today-surface.mjs';
import { buildWorkplaceView } from '../src/ui/workplace-view.mjs';
import { InMemoryEventStore, InMemoryEvidenceStore } from '../src/persistence/memory.mjs';
const policy=createWorkdayPolicy();

test('workplace greetings and date use configured timezone for equivalent instants',()=>{
  const employee={employee_id:'e1',registered_name:'Olu'};
  for(const now of ['2026-10-01T08:47:00-04:00','2026-10-01T12:47:00Z',new Date('2026-10-01T12:47:00Z')]){
    assert.equal(buildTodaySurface({employee,now}).greeting,'Good morning, Olu.');
    assert.equal(buildWorkplaceView({employee,now}).today.greeting,'Good morning, Olu.');
  }
  const tokyo={...employee,timezone:'Asia/Tokyo'};
  assert.equal(buildTodaySurface({employee:tokyo,now:'2026-10-01T00:47:00Z'}).greeting,'Good morning, Olu.');
  assert.equal(buildTodaySurface({employee,now:'2026-10-02T00:30:00Z'}).date_label,'Thursday, October 1');
});

test('business minutes preserve workplace hours across DST and holidays',()=>{
  for(const [start,end] of [
    ['2026-03-06T16:00:00-05:00','2026-03-09T10:00:00-04:00'],
    ['2026-10-30T16:00:00-04:00','2026-11-02T10:00:00-05:00']
  ]) assert.equal(businessMinutesBetween(start,end,policy),120);
  assert.equal(businessMinutesBetween('2026-10-02T20:00:00Z','2026-10-06T14:00:00Z',createWorkdayPolicy({holidays:['2026-10-05']})),120);
});

test('routine delivery queues to local start and delay consumes only working hours',()=>{
  assert.equal(classifyDelivery({event:{occurred_at:'2026-10-01T20:30:00Z'},policy}).mode,'immediate');
  assert.equal(classifyDelivery({event:{occurred_at:'2026-10-01T21:00:00Z'},policy}).deliver_at,'2026-10-02T13:00:00.000Z');
  assert.equal(classifyDelivery({event:{occurred_at:'2026-10-31T22:00:00Z'},policy}).deliver_at,'2026-11-02T14:00:00.000Z');
  assert.equal(delayWithinWorkday({from:'2026-10-30T16:30:00-04:00',minutes:120,policy}),'2026-11-02T15:30:00.000Z');
  assert.equal(delayWithinWorkday({from:'2026-10-02T18:00:00-04:00',minutes:1020,policy}),'2026-10-07T14:00:00.000Z');
  assert.equal(isWithinWorkday('2026-10-02T03:00:00Z',policy),false);
});

test('memory queries return isolated copies for multiple events and evidence records',async()=>{
  const events=new InMemoryEventStore(), evidence=new InMemoryEvidenceStore();
  for(let n=0;n<3;n++){
    await events.append({event_id:`e${n}`,actor_id:'employee',context_id:'ctx',payload:{value:n}});
    await evidence.append({evidence_id:`v${n}`,employee_id:'employee',competency_tags:['judgment'],details:{value:n}});
  }
  for(const rows of [await events.listByEmployee('employee'),await events.listByContext('ctx')]){
    assert.equal(rows.length,3);rows[0].payload.value=99;
  }
  for(const rows of [await evidence.listByEmployee('employee'),await evidence.listByCompetency('employee','judgment')]){
    assert.equal(rows.length,3);rows[0].details.value=99;
  }
  assert.equal((await events.listByEmployee('employee'))[0].payload.value,0);
  assert.equal((await evidence.listByEmployee('employee'))[0].details.value,0);
});
