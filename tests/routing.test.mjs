import test from 'node:test';import assert from 'node:assert/strict';import vm from 'node:vm';
import {routingSource} from '../scripts/build-routing.mjs';import {LEGACY,ROUTES} from '../src/site.mjs';
const context={};vm.createContext(context);vm.runInContext(routingSource('a'.repeat(40)),context);
const request=(uri,host='www.sozorock.com',querystring={},method='GET')=>context.handler({request:{uri,method,headers:{host:{value:host}},querystring}});
test('every legacy URL and apex variant redirects directly, retaining repeated values',()=>{
 for(const [old,path]of Object.entries(LEGACY))for(const host of ['www.sozorock.com','sozorock.com']){
  const r=request(old,host,{program:{value:'ai-governance'},tag:{value:'a',multiValue:[{value:'a'},{value:'b%20c'}]}});
  assert.equal(r.statusCode,301);assert.equal(r.headers.location.value,'https://www.sozorock.com'+path+'?program=ai-governance&tag=a&tag=b%20c');
 }
});
test('canonical routes resolve inside the matching immutable artifact',()=>{
 for(const path of ROUTES){assert.equal(request(path).uri,'/releases/'+'a'.repeat(40)+(path==='/'?'/index.html':path+'/index.html'));if(path!=='/')assert.equal(request(path+'/').headers.location.value,'https://www.sozorock.com'+path);}
});
test('unknown paths return useful 404 and never the homepage',()=>{for(const path of ['/missing','/thinking','/releases/secret','/assets/../private'])assert.equal(request(path).statusCode,404);});
test('POST APIs and callback URLs do not enter marketing redirects',()=>{assert.equal(request('/apply.html','sozorock.com',{},'POST').uri,'/apply.html');assert.equal(request('/api/test','sozorock.com').uri,'/api/test');assert.equal(request('/admin.html','sozorock.com',{code:{value:'x'}}).statusCode,undefined);});
test('mutable operational configuration remains outside artifacts',()=>{for(const file of ['/applications-config.js','/engagement-config.js'])assert.equal(request(file).uri,file);});
test('old documents retain access to their original asset release without exposing HTML or configs',()=>{
 const prefix='/releases/'+'b'.repeat(40);
 for(const asset of ['/assets/school-old.js','/media/director.webp','/corporate.css'])assert.equal(request(prefix+asset).uri,prefix+asset);
 for(const path of ['/admin.html','/index.html','/applications-config.js','/engagement-config.js'])assert.equal(request(prefix+path).statusCode,404);
});
