import { createServer } from 'vite';
import { readFileSync, writeFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

// Render the same component that the client hydrates, without running a browser.
const server = await createServer({ optimizeDeps: { noDiscovery: true, include: [] }, server: { middlewareMode: true, warmup: { clientFiles: [] } }, appType: 'custom' });
try {
  const { SozoRockSchoolHomepage } = await server.ssrLoadModule('/src/SozoRockSchoolHomepage.jsx');
  const markup = renderToString(createElement(SozoRockSchoolHomepage));
  if (!markup.includes('id="hero-title"') || !markup.includes('SozoRock Tech Inc.')) {
    throw new Error('Homepage prerender is incomplete');
  }
  const file = 'dist/client/index.html';
  const html = readFileSync(file, 'utf8');
  const fallback = '<noscript><style>.scene-motion{display:none!important}@media(max-width:860px){.home .primary-nav{display:flex;position:static;flex-wrap:wrap}.home .site-header{position:relative;background:#132b42}.nav-shell{flex-wrap:wrap}.home .menu-toggle,.scene-motion{display:none}}</style></noscript>';
  writeFileSync(file, html.replace('<div id="root"></div>', '<div id="root">' + markup + '</div>' + fallback));
  console.log('Prerendered US homepage content and navigation.');
} finally {
  await server.close();
}
