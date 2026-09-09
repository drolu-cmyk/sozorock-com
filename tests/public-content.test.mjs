import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync,existsSync}from'node:fs';import{ROUTES,ORIGIN}from'../src/site.mjs';import{gzipSync}from'node:zlib';
test('all public routes have initial content, distinct canonicals and working local references',()=>{
 for(const route of ROUTES){
  const html=readFileSync('dist/client'+(route==='/'?'/index.html':route+'/index.html'),'utf8');
  assert.match(html,/<h1[ >]/);assert.ok(html.includes('rel="canonical" href="'+ORIGIN+route+'"'),route);
  for(const[,json]of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))JSON.parse(json);
  for(const[,url]of html.matchAll(/(?:src|href)="(\/[^"#?]*)(?:[^" ]*)"/g)){
   if(ROUTES.includes(url)||url==='/admin.html')continue;
   assert.ok(existsSync('dist/client'+url),route+' missing '+url);
  }
  assert.doesNotMatch(html,/[\u2013\u2014]/,route+' public dash');
  assert.doesNotMatch(html,/\b(?:TODO|placeholder|MVP|working copy)\b/i,route+' internal copy');
 }
});
test('corporate and School fonts and scripts are isolated within delivery budgets',()=>{
 const html=readFileSync('dist/client/index.html','utf8');assert.doesNotMatch(html,/school-[^" ]+\.(js|css)/);assert.doesNotMatch(html,/plus-jakarta|instrument-sans/);assert.match(html,/source-sans-3-latin/);
 assert.ok(gzipSync(readFileSync('dist/client/corporate.js')).length<80000);
 assert.ok(gzipSync(readFileSync('dist/client/corporate.css')).length<35000);
 assert.ok(readFileSync('dist/client/assets/fonts/source-sans-3-latin.woff2').length<100000);
 assert.ok(gzipSync(readFileSync('dist/client/assets/data/cbcap-counties-2025.json')).length<150000);
});
