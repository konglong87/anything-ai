import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCatalog } from '../../scripts/jargon/normalize.mjs';
import { checkSelection, composePrompts, renderPrompt } from '../../scripts/jargon/prompt-core.mjs';
const catalog = buildCatalog();
const template = catalog.items.find(item => item.id === 'template--dashboard-style-system');
const pending = 'warm-three-column-dashboard';
const pendingValues = { [template.id]: { style_direction: pending } };
const queryMatches = (item, query) => [item.title,item.description,item.whenToUse,item.domainTitle,item.subdomainTitle,...item.aliases].join(' ').includes(query);

test('review: pending dashboard choices keep machine-readable reference status', () => {
  assert.equal(template.choices[0].options.find(option => option.value === pending).status, 'reference');
});
test('review: changing an already selected template to a pending direction blocks composition', () => {
  assert.equal(checkSelection([template], pendingValues).ok, false);
  assert.throws(() => composePrompts([template], pendingValues), /待确认|待核验/);
});
test('review: verified choices still work, and pending content remains readable as reference', () => {
  const values = { [template.id]: { style_direction: 'industrial-zones-dashboard' }, goal: '设计库存后台' };
  assert.equal(checkSelection([template], values).ok, true);
  assert.match(composePrompts([template], values), /工业分区布局/);
  assert.match(renderPrompt(template, pendingValues[template.id]), /needs_confirmation/);
});
test('review: promised plain-language searches lead to relevant real source entries', () => {
  assert.ok(catalog.items.some(item => item.domainId === 'digital-product-uiux' && queryMatches(item,'有质感')));
  assert.ok(catalog.items.some(item => item.subdomainId === 'interaction-motion' && queryMatches(item,'顺滑')));
  assert.ok(queryMatches(catalog.items.find(item => item.id === 'availability-patterns--availability-patterns'),'稳定'));
});
test('review: routing aliases are carried into browser search instead of discarded', () => {
  const item = catalog.items.find(item => item.id === 'capacity-model--capacity-model');
  assert.ok(item.aliases.includes('high-concurrency'));
  assert.ok(item.sourceFiles.includes('index/runtime.json'));
});
test('review: editorial discovery aliases do not rewrite original prompt semantics', () => {
  const item = catalog.items.find(item => item.id === 'availability-patterns--availability-patterns');
  assert.ok(!item.prompt.includes('大型后端'));
  assert.equal(new Set(item.aliases).size,item.aliases.length);
});
test('review: multi-entry leaf routing never aliases one concrete layout as another', () => {
  const colorful = catalog.items.find(item => item.id === 'layout-patterns--color-staggered-dashboard');
  const industrial = catalog.items.find(item => item.id === 'layout-patterns--industrial-zones-dashboard');
  assert.ok(queryMatches(colorful,'多彩错列'));
  assert.ok(!queryMatches(industrial,'多彩错列'));
});
