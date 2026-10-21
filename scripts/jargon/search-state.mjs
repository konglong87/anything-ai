/** Shared entry links and URL state. No DOM, catalog payload, network or storage. */
export const LIBRARY_PATH = '/prompts/jargon/README.html';
export const GUIDE_PATH = '/prompts/jargon/guide.html';
export const SEARCH_ANCHOR = 'jargon-search-panel';
export const QUERY_LIMIT = 300;
export const HISTORY_DELAY = 350;
export const NAVIGATION_EVENT = 'anything-ai:route-changed';
export const HOME_EXAMPLES = ['简洁', '大方', '界面', '后台', '后端稳定性'];
export const SEARCH_SHORTCUTS = [
  { label: '设计界面与后台', query: '', domain: 'digital-product-uiux' },
  { label: '做顺滑交互', query: '顺滑交互', domain: 'digital-product-uiux' },
  { label: '改善后端稳定性', query: '后端稳定性', domain: 'software-engineering-architecture' },
  { label: '创作角色与图片', query: '', domain: 'ai-aigc-meta-skills' },
];
export function cleanQuery(value = '') {
  return String(value).trim().slice(0, QUERY_LIMIT);
}
export function readSearchState(search = '', { domains = [], kinds = [], defaultDomain = '' } = {}) {
  const params = new URLSearchParams(search);
  // An explicit empty domain means “all”, even on a domain-specific page.
  const domain = params.has('domain') ? params.get('domain') : defaultDomain;
  const kind = params.get('kind') || '';
  return { query: cleanQuery(params.get('q') || ''),
    domain: domains.includes(domain) ? domain : '', kind: kinds.includes(kind) ? kind : '' };
}
export function writeSearchParams(search = '', state = {}, { defaultDomain = '' } = {}) {
  const params = new URLSearchParams(search);
  const query = cleanQuery(state.query);
  if (query) params.set('q', query); else params.delete('q');
  if ((state.domain || '') === defaultDomain) params.delete('domain');
  else params.set('domain', state.domain || '');
  if (state.kind) params.set('kind', state.kind); else params.delete('kind');
  return params.toString();
}
export function buildSearchHref(state = {}) {
  const search = writeSearchParams('', state);
  return `${LIBRARY_PATH}${search ? `?${search}` : ''}#${SEARCH_ANCHOR}`;
}
export function buildSearchUrl(href, state, options, { hash } = {}) {
  const url = new URL(href);
  url.search = writeSearchParams(url.search, state, options);
  if (hash) url.hash = hash.startsWith('#') ? hash : `#${hash}`;
  return url.href;
}
