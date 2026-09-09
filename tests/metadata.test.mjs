import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {ORIGIN, ROUTES} from '../src/site.mjs';

test('every indexable page has a unique title, canonical graph and valid social image',async()=>{
  const titles=new Set();
  for(const path of ROUTES){
    const html=await readFile(new URL('../dist/client'+(path==='/'?'':path)+'/index.html',import.meta.url),'utf8');
    const title=html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title,path);assert.ok(!titles.has(title),'duplicate title: '+title);titles.add(title);
    assert.ok(html.includes('rel="canonical" href="'+ORIGIN+path+'"'),path);
    assert.match(html,/<meta name="description" content="[^"]{20,}"/);
    const graph=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
    assert.ok(graph.some(x=>x['@id']===ORIGIN+path+'#page'&&x.url===ORIGIN+path),path);
    assert.equal(new Set(graph.map(x=>x['@id'])).size,graph.length,path);
    const share=html.match(/property="og:image" content="([^"]+)"/)[1];
    assert.ok(html.includes('name="twitter:image" content="'+share+'"'));
    const bytes=await readFile(new URL('../dist/client'+share.slice(ORIGIN.length),import.meta.url));
    let width,height;
    if(share.endsWith('.png')){
      assert.equal(bytes.toString('hex',0,8),'89504e470d0a1a0a');
      width=bytes.readUInt32BE(16);height=bytes.readUInt32BE(20);
    }else{
      assert.equal(bytes.readUInt16BE(0),0xffd8);
      for(let offset=2;offset+9<bytes.length;){
        assert.equal(bytes[offset],0xff);const marker=bytes[offset+1],length=bytes.readUInt16BE(offset+2);
        if([0xc0,0xc1,0xc2].includes(marker)){height=bytes.readUInt16BE(offset+5);width=bytes.readUInt16BE(offset+7);break;}
        assert.ok(length>=2);offset+=length+2;
      }
    }
    assert.equal(width,1200,share);assert.equal(height,630,share);
  }
  const sitemap=await readFile(new URL('../dist/client/sitemap.xml',import.meta.url),'utf8');
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]).sort(),ROUTES.map(x=>ORIGIN+x).sort());
  assert.ok(!sitemap.includes('admin'));
});

test('leadership profile and service schema are tied to canonical visible pages',async()=>{
  const about=await readFile(new URL('../dist/client/about/index.html',import.meta.url),'utf8');
  assert.match(about,/id="leadership"/);assert.match(about,/Director, Technology &amp; Strategic Initiatives/);
  assert.match(about,/src="\/media\/director.webp"/);
  const service=await readFile(new URL('../dist/client/what-we-do/cybersecurity-identity/index.html',import.meta.url),'utf8');
  const graph=JSON.parse(service.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
  assert.ok(graph.some(x=>x['@type']==='Service'));
  assert.ok(graph.find(x=>x['@type']==='BreadcrumbList').itemListElement.some(x=>x.item===ORIGIN+'/what-we-do'));
});
