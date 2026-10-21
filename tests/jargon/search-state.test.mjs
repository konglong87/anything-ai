import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildCatalog } from '../../scripts/jargon/normalize.mjs';
import { createJargonSearch } from '../../scripts/jargon/search.mjs';
import { buildSearchHref, buildSearchUrl, cleanQuery, readSearchState, writeSearchParams,
  HOME_EXAMPLES, SEARCH_SHORTCUTS, LIBRARY_PATH, SEARCH_ANCHOR, QUERY_LIMIT } from '../../scripts/jargon/search-state.mjs';
const catalog = buildCatalog();
const options = { domains: catalog.domains.filter(d => d.count).map(d => d.id), kinds: [...new Set(catalog.items.map(i => i.kind))] };
const search = createJargonSearch(catalog.items);
const decode = href => readSearchState(new URL(href, 'https://example.com').search, options);

test('URL: empty entry opens the whole library at the search panel', () => {
  assert.equal(buildSearchHref(), `${LIBRARY_PATH}#${SEARCH_ANCHOR}`);
  assert.deepEqual(decode(buildSearchHref()), { query: '', domain: '', kind: '' });
});
for (const query of ['简洁大方的后台界面', '后台 & Dashboard + UI #1', 'ＲＴＯ', '🙂 中文/English', '<script>alert("x")</script>', '配色？蓝色=红色']) {
  test(`URL: query encoding round trip ${query}`, () => {
    const href = buildSearchHref({ query, domain: options.domains[0], kind: 'term' });
    assert.deepEqual(decode(href), { query, domain: options.domains[0], kind: 'term' });
    assert.ok(href.startsWith(LIBRARY_PATH));
    assert.ok(href.endsWith(`#${SEARCH_ANCHOR}`));
    assert.ok(!href.includes('<script>'));
  });
}
test('URL: unknown filter IDs and malformed percent encoding never crash or hide valid filters', () => {
  assert.deepEqual(readSearchState('?q=%ZZ&domain=unknown&kind=unknown', options), { query: '%ZZ', domain: '', kind: '' });
  assert.deepEqual(readSearchState('?q=后台&kind=term', options), { query: '后台', domain: '', kind: 'term' });
});
test('URL: empty q removes it and duplicate owned parameters become canonical', () => {
  assert.equal(writeSearchParams('?q=one&q=two&kind=term&domain=unknown', { query: ' ', domain: '', kind: '' }), '');
  assert.equal(new URLSearchParams(writeSearchParams('?q=one&q=two', { query: '后台' })).getAll('q').length, 1);
});
test('URL: max input is centralized, whitespace cleaned and q cannot be unbounded', () => {
  assert.equal(cleanQuery(' 简洁 '), '简洁');
  assert.equal(readSearchState(`?q=${'x'.repeat(1000)}`, options).query.length, QUERY_LIMIT);
  assert.equal(decode(buildSearchHref({ query: 'x'.repeat(1000) })).query.length, QUERY_LIMIT);
});
test('URL: default domain preserved on reload, explicit empty domain means all', () => {
  const opts = { ...options, defaultDomain: 'digital-product-uiux' };
  assert.equal(readSearchState('', opts).domain, opts.defaultDomain);
  assert.equal(readSearchState('?domain=', opts).domain, '');
  const cleared = writeSearchParams('', { query: '简洁', domain: '', kind: '' }, opts);
  assert.equal(new URLSearchParams(cleared).get('domain'), '');
  assert.equal(readSearchState(cleared, opts).domain, '');
  assert.equal(writeSearchParams('', { domain: opts.defaultDomain }, opts), '');
});
test('URL: library state retains Pages base and unknown parameters with a search-anchor override', () => {
  const result = new URL(buildSearchUrl('https://example.com/anything-ai/prompts/jargon/README.html?utm_source=home#compose', { query: '后台', domain: 'digital-product-uiux', kind: 'pattern' }, undefined, { hash: SEARCH_ANCHOR }));
  assert.equal(result.pathname, '/anything-ai/prompts/jargon/README.html');
  assert.equal(result.searchParams.get('utm_source'), 'home');
  assert.equal(result.hash, `#${SEARCH_ANCHOR}`);
  assert.deepEqual(readSearchState(result.search, options), { query: '后台', domain: 'digital-product-uiux', kind: 'pattern' });
});
for (const word of HOME_EXAMPLES) {
  test(`Home: keyword example ${word} passes the same URL codec and real search`, () => {
    const state = decode(buildSearchHref({ query: word }));
    assert.equal(state.query, word);
    assert.ok(search(state.query, state).items.length > 0);
  });
}
for (const shortcut of SEARCH_SHORTCUTS) {
  test(`Home: shortcut ${shortcut.label} actually retrieves the intended domain`, () => {
    const state = decode(buildSearchHref(shortcut));
    assert.equal(state.domain, shortcut.domain);
    const result = search(state.query, state);
    assert.ok(result.items.length > 0);
    assert.ok(result.items.every(item => item.domainId === shortcut.domain));
  });
}
test('Home: generated lightweight discovery metadata tracks catalog without full prompts', () => {
  const metadata = JSON.parse(readFileSync(new URL('../../.vitepress/theme/jargon/discovery.json', import.meta.url)));
  assert.equal(metadata.total, catalog.items.length);
  assert.deepEqual(metadata.domains.map(d => d.id), options.domains);
  assert.deepEqual(metadata.kinds, options.kinds);
  assert.ok(JSON.stringify(metadata).length < 4096);
  assert.ok(!JSON.stringify(metadata).includes('searchText'));
});
test('Home: GitHub-readable fallback index remains and entry precedes the downloads', () => {
  const readme = readFileSync(new URL('../../README.md', import.meta.url), 'utf8');
  assert.ok(readme.indexOf('<JargonSearchEntry />') < readme.indexOf('## 📥 免费下载'));
  assert.ok(readme.includes('[提示词搜索与组合](./prompts/jargon/README.md#jargon-search-panel)'));
});

test('URL: copied search state always points back to the search panel', () => {
  const result = new URL(buildSearchUrl('https://example.com/anything-ai/prompts/jargon/README.html?q=后台', { query: '后台' }, options, { hash: SEARCH_ANCHOR }));
  assert.equal(result.hash, `#${SEARCH_ANCHOR}`);
});
