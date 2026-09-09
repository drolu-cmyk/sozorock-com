import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { dirname } from 'node:path';
import { ORIGIN, ROUTES, LEGACY } from '../src/site.mjs';
import { metadata } from './page-shell.mjs';
import { pages, nav, footer, link } from '../src/corporate-pages.mjs';

// Retired commercial architecture is not part of the public release.
for (const path of ['/work','/what-we-build','/company']) rmSync('public'+path,{recursive:true,force:true});
export {pages};
for(const [path,page] of Object.entries(pages)) {
 const file=path==='/'?'index.html':'public'+path+'/index.html';mkdirSync(dirname(file),{recursive:true});
 writeFileSync(file,`<!doctype html><html lang="en-US"><head>${metadata({path,...page})}<meta name="theme-color" content="#ffffff"><link rel="preload" href="/assets/fonts/source-sans-3-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/corporate.css"></head><body class="corporate"><a class="skip-link" href="#main">Skip to content</a>${nav}<main id="main">${page.body}</main>${footer}<script src="/corporate.js" defer></script>${page.scripts||''}</body></html>`);
}
const schoolFile='school/index.html';
writeFileSync(schoolFile,`<!doctype html><html lang="en-US"><head>${metadata({path:'/school',title:'SozoRockSchool | AI and Cybersecurity Programs',description:'Applied learning by SozoRock Technology. Four 12-week virtual AI and cybersecurity programs with applied projects and human assessment.',school:true})}<link rel="preload" href="/assets/open-school-us-wide.webp" as="image" media="(min-width:861px)"><link rel="preload" href="/assets/open-school-us-mobile.webp" as="image" media="(max-width:860px)"></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`);
writeFileSync('public/404.html',`<!doctype html><html lang="en-US"><head>${metadata({path:'/404',title:'Page Not Found | SozoRock Technology',description:'Find your way to SozoRock Technology or School.',noindex:true})}<link rel="preload" href="/assets/fonts/source-sans-3-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/corporate.css"></head><body class="corporate">${nav}<main id="main" class="page-intro"><h1>That page<br>is not here.</h1><p>Check the address, explore our work or find your School program.</p>${link('/','SozoRock Technology')}${link('/school','SozoRockSchool')}</main>${footer}<script src="/corporate.js" defer></script></body></html>`);
writeFileSync('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${ROUTES.map(p=>`<url><loc>${ORIGIN+p}</loc></url>`).join('')}</urlset>`);
writeFileSync('public/robots.txt',`User-agent: *\nAllow: /\nDisallow: /admin.html\nSitemap: ${ORIGIN}/sitemap.xml\n`);
// Legacy URLs are HTTP redirects, never alternate indexed HTML pages.
for(const old of Object.keys(LEGACY))if(old.endsWith('.html')&&old!=='/index.html'&&old!=='/school/index.html')rmSync('public'+old,{force:true});
writeFileSync('public/route-manifest.json',JSON.stringify({routes:ROUTES,redirects:LEGACY},null,2)+'\n');
