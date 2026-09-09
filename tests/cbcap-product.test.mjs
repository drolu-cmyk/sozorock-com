import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {pages} from '../src/corporate-pages.mjs';
const counties=JSON.parse(readFileSync('public/assets/data/cbcap-counties-2025.json','utf8'));

test('county snapshot retains geography, uncertainty and missingness',()=>{
  assert.equal(counties.length,3144);
  assert.equal(new Set(counties.map(c=>c.fips)).size,3144);
  for(const c of counties){
    assert.match(c.fips,/^\d{5}$/);
    for(const key of ['transport','uninsured','diabetes']){
      const [value,low,high]=c[key];
      if(value===null){assert.equal(low,null);assert.equal(high,null);continue;}
      assert.ok(low>=0 && low<=value && value<=high && high<=100,`${c.fips} ${key}`);
    }
  }
  assert.deepEqual(counties.find(c=>c.fips==='36001').transport,[7.2,6.1,8.5]);
  assert.deepEqual(counties.find(c=>c.fips==='36091').transport,[5.5,4.5,6.7]);
  assert.ok(counties.some(c=>c.transport[0]===null),'Missing estimates remain explicit');
});

test('commercial journeys stay in the Technology product architecture',()=>{
  for(const [path,page] of Object.entries(pages)){
    if(['/privacy','/terms','/legal','/accessibility'].includes(path))continue;
    assert.doesNotMatch(page.body,/sozorockfoundation\.org|Foundation initiative|Place Intelligence|assets\/evidence\//i,path);
  }
  assert.match(pages['/cb-cap'].body,/\/cb-cap\/request-demo/);
  assert.match(pages['/cb-cap'].body,/data-cbcap/);
  assert.match(pages['/cb-cap/request-demo'].body,/data-product="cb-cap"/);
});

test('the product has readable evidence and source limits without JavaScript',()=>{
  const html=readFileSync('dist/client/cb-cap/index.html','utf8');
  for(const expected of ['See where access breaks down.','ZIP Code Tabulation Areas','2010','synthetic','no resident records','not provide validated forecasts','CHA/CHIP'])assert.ok(html.includes(expected),expected);
  assert.doesNotMatch(html,/<iframe|<canvas|assets\/evidence\//);
});
