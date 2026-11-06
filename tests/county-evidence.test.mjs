import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {validateCountySnapshot,countySource} from '../src/county-evidence.mjs';
const rows=JSON.parse(readFileSync(new URL('../public/assets/data/cbcap-counties-2025.json',import.meta.url)));
test('county evidence retains the complete existing source snapshot and rejects corrupted intervals',()=>{
  assert.equal(validateCountySnapshot(rows),rows);
  const missing=rows.find(r=>r.transport[0]===null);assert.ok(missing);assert.deepEqual(missing.transport,[null,null,null]);
  for(const invalid of [[8,9,10],[null,0,0],[1,0,101],[1,0,'2']]){
    const copy=structuredClone(rows);copy[0].transport=invalid;assert.throws(()=>validateCountySnapshot(copy));
  }
  const duplicate=structuredClone(rows);duplicate[1].fips=duplicate[0].fips;assert.throws(()=>validateCountySnapshot(duplicate));
  assert.throws(()=>validateCountySnapshot(rows.slice(1)));
});
test('visible release and snapshot provenance agree with the existing source manifest',()=>{
  const provenance=JSON.parse(readFileSync(new URL('../src/data/cbcap-provenance.json',import.meta.url)));
  assert.equal(countySource.released,provenance.sourceManifest.indicators.released);
  assert.equal(new Date(countySource.snapshot+' UTC').toISOString().slice(0,10),provenance.snapshot);
  assert.equal(countySource.url,provenance.sourceManifest.indicators.url);
});

test('the production build includes the reviewed public county snapshot without changing its bytes',()=>{
  const source=readFileSync(new URL('../public/assets/data/cbcap-counties-2025.json',import.meta.url));
  const built=readFileSync(new URL('../dist/client/assets/data/cbcap-counties-2025.json',import.meta.url));
  assert.deepEqual(built,source);
  assert.equal(validateCountySnapshot(JSON.parse(built)).length,3144);
});
