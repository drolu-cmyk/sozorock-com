import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {ROUTES,ORIGIN} from '../src/site.mjs';
test('public sitemap contains canonical, indexable documents with valid schema',()=>{
 const sitemap=readFileSync('public/sitemap.xml','utf8');
 for(const route of ROUTES){
  const html=readFileSync(route==='/'?'index.html':route==='/school'?'school/index.html':`public${route}/index.html`,'utf8');
  assert.ok(sitemap.includes(`<loc>${ORIGIN+route}</loc>`),route);
  assert.ok(html.includes(`rel="canonical" href="${ORIGIN+route}"`),route);
  assert.doesNotMatch(html,/<meta name="robots" content="noindex/);
  for(const [,json] of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)){
   const schema=JSON.parse(json);
   for(const item of schema['@graph']||[]) if(item['@type']==='Product')assert.ok(item.offers||item.review||item.aggregateRating,'Do not emit incomplete retail Product markup');
  }
 }
});
test('CB-CAP service metadata does not fabricate retail offers or reviews',()=>{
 const html=readFileSync('public/cb-cap/index.html','utf8');
 const graph=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
 assert.ok(graph.some(n=>n['@type']==='Service'&&n.name==='CB-CAP'));
 assert.ok(!graph.some(n=>['Product','Review','AggregateRating'].includes(n['@type'])));
});
