import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateBrief,briefText} from '../src/decision-brief.mjs';
const input={area:'Test district',service:'Transport requests',source:'Published transport report, July 2026',sourceDate:'2026-07-31',owner:'Service planning team',outcome:'Completed requests per month',target:'120 requests',reviewDate:'2026-12-31',demand:'150',capacity:'100',added:'30',cost:'600',months:'3'};
test('a complete brief retains sources, units, responsibility and review with useful capacity arithmetic',()=>{
  const b=calculateBrief(input,'CAD');
  assert.deepEqual([b.currentGap,b.plannedGap,b.capacityApplied,b.totalCost,b.costPerRequest],[50,20,30,1800,20]);
  const text=briefText(b);for(const value of ['Test district','July 2026','2026-07-31','Service planning team','2026-12-31','CAD 1,800','requests/month','not a demand forecast'])assert.ok(text.includes(value),value);
});
test('excess capacity never creates a negative gap or pretends all added slots meet demand',()=>{
  const b=calculateBrief({...input,added:'80'});assert.equal(b.plannedGap,0);assert.equal(b.capacityApplied,50);assert.equal(b.costPerRequest,12);
  const noGap=calculateBrief({...input,capacity:'180'});assert.equal(noGap.currentGap,0);assert.equal(noGap.capacityApplied,0);assert.equal(noGap.costPerRequest,null);assert.match(briefText(noGap),/Not applicable: no reduction/);
});
test('zero is valid and is distinct from missing, while impossible or unbounded inputs fail closed',()=>{
  assert.equal(calculateBrief({...input,demand:'0',capacity:'0',added:'0',cost:'0'}).totalCost,0);
  for(const [key,value] of [['demand',''],['added','-1'],['cost','Infinity'],['demand','1e3'],['months','0'],['months','1.5'],['months','37'],['capacity','1000000001'],['source',''],['sourceDate','2026-02-30'],['reviewDate','2026-01-01'],['owner','a\nb']])assert.throws(()=>calculateBrief({...input,[key]:value}),`${key}: ${value}`);
});
test('separate currencies and decimal capacity remain explicit without implying unique people',()=>{
  const b=calculateBrief({...input,demand:'3.5',capacity:'1.5',added:'1.25',cost:'10.5'},'USD');assert.equal(b.capacityApplied,1.25);assert.equal(b.costPerRequest,8.4);assert.match(briefText(b),/USD 31.5/);assert.match(briefText(b),/Requests are not unique people/);
  assert.throws(()=>calculateBrief(input,'EUR'));
});

test('extreme fractional inputs cannot publish an infinite unit cost',()=>{
  assert.throws(()=>calculateBrief({...input,demand:'0.'+'0'.repeat(309)+'1',capacity:'0',added:'1',cost:'1000000000'}),/outside the supported range/);
});
