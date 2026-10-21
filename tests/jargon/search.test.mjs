import test from 'node:test';
import assert from 'node:assert/strict';
import { buildCatalog } from '../../scripts/jargon/normalize.mjs';
import { createJargonSearch, normalizeSearch, tokenizeQuery, SEARCH_EXAMPLES } from '../../scripts/jargon/search.mjs';
const catalog = buildCatalog();
const search = createJargonSearch(catalog.items);
const UI = 'digital-product-uiux';
const SOFTWARE = 'software-engineering-architecture';
const ids = result => result.items.map(item => item.id);

for (const query of ['简洁', '大方', '简约', '清爽', '干净', '极简']) {
  test(`search: everyday style ${query} retrieves minimal layouts, not every UI entry`, () => {
    const result = search(query);
    assert.ok(result.items.length > 0 && result.items.length < 20);
    assert.ok(result.items.slice(0, 4).every(item => item.domainId === UI));
    assert.ok(ids(result).slice(0, 4).includes('minimal-data--minimal-data'));
    assert.ok(!ids(result).includes('burst-feedback--burst-feedback'));
  });
}
for (const query of ['界面', '页面', '网页', '网站', '用户界面']) {
  test(`search: interface vocabulary ${query} stays within UI`, () => {
    const result = search(query);
    assert.ok(result.items.length > 0);
    assert.ok(result.items.every(item => item.domainId === UI));
    assert.ok(result.items.slice(0, 3).some(item => ['dashboard-design', 'visual-layout', 'information-architecture'].includes(item.subdomainId)));
  });
}
for (const query of ['后台', '管理后台', '管理系统', '控制台', '仪表盘', 'admin']) {
  test(`search: backend UI intent ${query} includes dashboards and server boundaries`, () => {
    const result = search(query);
    assert.ok(ids(result).includes('minimal-data--minimal-data'));
    assert.ok(ids(result).includes('service-boundary--service-boundary'));
    assert.equal(result.items[0].subdomainId, 'dashboard-design');
  });
}
for (const query of ['简洁大方的后台界面', '做一个简洁大方的后台界面', '我想做一个简洁大方的后台界面',
  '请帮我设计一个简洁的后台界面', '简洁、大方，后台。界面', '简洁 大方 后台 界面', '简洁后台设计']) {
  test(`search: Chinese sentence/conjunctions ${query}`, () => {
    const result = search(query);
    assert.ok(result.items.length >= 4 && result.items.length < 20);
    assert.ok(result.items.every(item => item.domainId === UI));
    assert.equal(result.items[0].id, 'minimal-data--minimal-data');
    assert.ok(!ids(result).includes('service-boundary--service-boundary'));
  });
}
test('search: screenshot case preserves term filter and diagnoses hidden layout matches', () => {
  const result = search('简洁', { kind: 'term' });
  assert.equal(result.items.length, 0);
  assert.ok(result.total >= 4);
  assert.equal(result.hiddenCount, result.total);
  assert.deepEqual(ids(search('简洁')), ids(search('简洁', { kind: '' })));
});
test('search: domain/type and query remain AND constraints, never silently broadened', () => {
  const result = search('后台', { kind: 'term', domain: SOFTWARE });
  assert.ok(result.items.length > 0 && result.hiddenCount > 0);
  assert.ok(result.items.every(item => item.domainId === SOFTWARE && item.kind === 'term'));
  const wrongDomain = search('简洁', { domain: SOFTWARE, kind: 'term' });
  assert.equal(wrongDomain.items.length, 0);
  assert.ok(wrongDomain.total > 0);
});
test('search: empty query preserves browse order, filters still apply', () => {
  assert.deepEqual(ids(search('')), catalog.items.map(item => item.id));
  assert.deepEqual(ids(search('  ', { kind: 'principle' })), catalog.items.filter(item => item.kind === 'principle').map(item => item.id));
});
for (const query of ['qzxnoexist999', '简洁 qzxnoexist999', '简洁火星数据库', '的', '、、、', '<script>alert(9999)</script>']) {
  test(`search: unknown/punctuation-only input never manufactures results: ${query}`, () => {
    const result = search(query);
    assert.equal(result.total, 0);
  });
}
test('search: professional and fullwidth identifiers survive normalization with exact ranking', () => {
  assert.equal(search('ＲＴＯ').items[0].id, 'availability-patterns--availability-patterns');
  assert.equal(search('high-concurrency').items[0].id, 'capacity-model--capacity-model');
  assert.equal(search('多彩错列').items[0].id, 'layout-patterns--color-staggered-dashboard');
  assert.equal(search('warm-minimal').items[0].id, 'warm-minimal--warm-minimal');
  assert.deepEqual(ids(search('ＤＡＳＨＢＯＡＲＤ')), ids(search('dashboard')));
});
test('search: exact title/alias outranks a broad related concept', () => {
  assert.equal(search('高可用').items[0].id, 'availability-patterns--availability-patterns');
  assert.equal(search('极简数据型').items[0].id, 'minimal-data--minimal-data');
  assert.equal(search('工业分区布局').items[0].id, 'layout-patterns--industrial-zones-dashboard');
});
test('search: source parameters and template options are searchable without boilerplate', () => {
  assert.ok(ids(search('RPO')).includes('availability-patterns--availability-patterns'));
  assert.ok(ids(search('subject placement')).includes('composition-language--composition-language'));
  assert.ok(ids(search('F7F3EA')).includes('warm-minimal--warm-minimal'));
  assert.equal(search('不是原作者逐字提供').total, 0);
  assert.equal(search(catalog.source.commit).total, 0);
});
test('search: unknown English words do not match inside other words', () => {
  assert.equal(search('capacit').total, 0); // not capacity
});
test('search: no synonym/ranking metadata mutates source content or executable prompts', () => {
  const before = JSON.stringify(catalog);
  search('简洁大方的后台界面');
  assert.equal(JSON.stringify(catalog), before);
  const minimal = catalog.items.find(item => item.id === 'minimal-data--minimal-data');
  assert.ok(!minimal.prompt.includes('简洁大方'));
  assert.ok(!minimal.aliases.includes('简洁大方'));
});
for (const query of SEARCH_EXAMPLES) {
  test(`search: every displayed example is backed by relevant results: ${query}`, () => assert.ok(search(query).total > 0));
}
test('search: backend and frontend remain distinct', () => {
  assert.ok(search('后端稳定性').items.every(item => item.domainId === SOFTWARE));
  assert.ok(!ids(search('后端稳定性')).includes('warm-minimal--warm-minimal'));
});
test('search: normalization and tokenizer use a single implementation shared with the UI', () => {
  assert.equal(normalizeSearch(' ＵＩ、后台。 '), 'ui 后台');
  assert.deepEqual(tokenizeQuery('做一个简洁大方的后台界面'), ['简洁大方', '后台', '界面']);
});

test('search: compatibility fallback keeps key Chinese queries usable without Intl.Segmenter', async () => {
  const original = Intl.Segmenter;
  try {
    Intl.Segmenter = undefined;
    const fallback = await import('../../scripts/jargon/search.mjs?without-segmenter');
    const legacySearch = fallback.createJargonSearch(catalog.items);
    assert.equal(legacySearch('简洁大方的后台界面').items[0].id, 'minimal-data--minimal-data');
    assert.equal(legacySearch('qzxnoexist999').total, 0);
  } finally { Intl.Segmenter = original; }
});

test('search: all 129 complete source titles retrieve their own item first', () => {
  for (const item of catalog.items) assert.equal(search(item.title).items[0]?.id, item.id, item.title);
});
test('search: every source/discovery alias can still retrieve its originating item', () => {
  for (const item of catalog.items) for (const alias of item.aliases) {
    assert.ok(ids(search(alias)).includes(item.id), `${item.id}: ${alias}`);
  }
});
