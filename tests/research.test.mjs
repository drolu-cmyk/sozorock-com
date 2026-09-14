import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { commercialPages, commercialNav, commercialFooter } from '../src/commercial-content.mjs';
import { researchPages, researchScenarios, RESEARCH_PATH } from '../src/research-content.mjs';
import { CORPORATE_ROUTES, ORIGIN } from '../src/site.mjs';
import { metadata } from '../scripts/page-shell.mjs';

test('research is discoverable without changing the primary navigation or product positioning', () => {
  assert.ok(CORPORATE_ROUTES.includes(RESEARCH_PATH));
  for (const path of ['/', '/insights', '/what-we-do/ai-intelligent-systems', '/what-we-do/cybersecurity-identity']) {
    assert.ok(commercialPages[path].body.includes(`href="${RESEARCH_PATH}"`), path);
  }
  assert.ok(commercialFooter.includes(`href="${RESEARCH_PATH}"`));
  assert.ok(!commercialNav.includes(RESEARCH_PATH));
  assert.ok(!commercialPages['/cb-cap'].body.includes(RESEARCH_PATH));
  assert.equal((commercialPages['/'].body.match(/class="section insight-feature research-feature"/g) || []).length, 1);
});

test('every synthetic scenario has a complete static decision path and a qualified outcome', () => {
  assert.deepEqual(researchScenarios.map(s => s.outcome), ['ALLOW', 'VERIFY', 'HUMAN AUTHORIZATION', 'DENY', 'ISOLATE']);
  const deployments = researchScenarios.filter(s => s.action === 'Deploy code');
  assert.equal(deployments.length, 2);
  assert.notEqual(deployments[0].outcome, deployments[1].outcome);
  assert.notEqual(deployments[0].context, deployments[1].context);
  const body = researchPages[RESEARCH_PATH].body;
  for (const scenario of researchScenarios) {
    assert.equal(scenario.steps.length, 7);
    for (const step of scenario.steps) assert.ok(body.includes(step));
    assert.ok(body.includes(scenario.reason));
  }
  assert.equal((body.match(/<details class="assurance-scenario"/g) || []).length, 5);
  assert.equal((body.match(/<h1>/g) || []).length, 1);
  assert.match(body, /not a completed commercial product/);
  assert.match(body, /do not execute actions, connect to systems or evaluate visitor data/);
  assert.doesNotMatch(body, /<script|<canvas|<iframe|<form/);
});

test('research metadata describes a research page without product or unsupported scientific claims', () => {
  const html = metadata({ path: RESEARCH_PATH, ...researchPages[RESEARCH_PATH] });
  assert.ok(html.includes(`rel="canonical" href="${ORIGIN}${RESEARCH_PATH}"`));
  for (const field of ['og:title', 'og:description', 'og:image', 'twitter:title', 'twitter:description', 'twitter:image']) assert.ok(html.includes(`"${field}"`));
  const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
  assert.ok(graph.some(item => item['@type'] === 'WebPage'));
  assert.ok(graph.some(item => item['@type'] === 'BreadcrumbList'));
  assert.ok(!graph.some(item => ['Product', 'SoftwareApplication', 'Review', 'AggregateRating', 'ScholarlyArticle'].includes(item['@type'])));
  assert.ok(readFileSync('public/assets/social/corporate-v2.jpg').length > 0);
});
