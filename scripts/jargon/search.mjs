/** Browser/Node shared retrieval. No network, persistence or prompt rewriting. */
const UI = 'digital-product-uiux';
const SOFTWARE = 'software-engineering-architecture';
const MINIMAL_ITEMS = ['minimal-data--minimal-data', 'warm-minimal--warm-minimal',
  'single-dark-accent-dashboard--single-dark-accent-dashboard', 'tonal-dark-dashboard--tonal-dark-dashboard'];
// Curated discovery vocabulary is separate from the locked source and executable prompts.
const CONCEPTS = [
  { words: ['简洁', '简约', '简约风', '极简', '清爽', '干净', '简洁大方', '大方', '简约大方', 'minimal', 'minimalist'],
    domain: UI, items: MINIMAL_ITEMS, anchors: ['极简', '留白', '克制', '少即是多'] },
  { words: ['界面', '页面', '网页', '网站', 'ui', 'ux', '前端', '用户界面', '设计', 'design'], domain: UI, preferredSubdomains: ['dashboard-design', 'visual-layout', 'information-architecture', 'design-system', 'design-tokens'] },
  { words: ['后台', '管理后台', '管理系统', '控制台', '仪表盘', 'dashboard', 'admin'],
    domain: UI, subdomains: ['dashboard-design', 'information-architecture', 'design-tokens'], preferredSubdomains: ['dashboard-design'], alsoDomain: SOFTWARE },
  { words: ['后端', '服务端', 'backend', 'server'], domain: SOFTWARE },
  { words: ['排版', '布局', 'layout'], domain: UI, subdomains: ['visual-layout', 'dashboard-design', 'information-architecture'] },
  { words: ['颜色', '配色', '色彩', 'color', 'colour'], domain: UI,
    subdomains: ['design-tokens', 'design-system', 'dashboard-design'], anchors: ['强调色', '配色'] },
  { words: ['顺滑', '流畅', '丝滑', '跟手'], domain: UI,
    subdomains: ['interaction-motion', 'continuous-interaction', 'gesture-interaction'], anchors: ['跟手'] },
  { words: ['动效', '动画', 'animation'], domain: UI,
    subdomains: ['interaction-motion', 'continuous-interaction', 'gesture-interaction', 'animation-tool-adapter'] },
  { words: ['稳定', '稳定性', '可靠', '高可用', '不宕机'], domain: SOFTWARE,
    subdomains: ['high-availability', 'high-concurrency', 'idempotency', 'observability', 'scalability', 'backend-architecture'] },
  { words: ['有质感', '高级感', '好看'], domain: UI,
    subdomains: ['visual-layout', 'information-architecture', 'design-system', 'design-tokens', 'dashboard-design'] },
];
export const SEARCH_EXAMPLES = ['简洁大方的后台界面', '排版 配色', '顺滑交互', '后端稳定性'];
const STOP_WORDS = new Set(['的', '地', '得', '了', '和', '与', '或', '而', '且', '我', '我们', '你',
  '请', '帮', '帮我', '给', '给我', '想', '想要', '希望', '需要', '要', '做', '做个', '做成', '制作',
  '一个', '一种', '一些', '一下', '这个', '怎么', '如何', '能', '可以', '比较', '很', '更', '一点',
  '我想', '我想要', '想做', '请帮我', '帮我做', '帮我设计', 'please', 'make', 'create', 'a', 'an', 'the', 'and', 'for', 'me', 'with']);
const WEIGHT = { title: 120, aliases: 80, description: 45, content: 12, taxonomy: 8, concept: 24, preferred: 60, exact: 200 };
const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('zh-CN', { granularity: 'word' }) : null;
export function normalizeSearch(text = '') {
  return String(text).normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}
const concepts = CONCEPTS.map(rule => ({ ...rule, words: rule.words.map(normalizeSearch) }));
const conceptByWord = new Map(concepts.flatMap(rule => rule.words.map(word => [word, rule])));
// Longest phrase first preserves Chinese concepts such as 管理后台 / 简洁大方.
const queryWords = [...conceptByWord.keys(), ...STOP_WORDS].filter(word => /\p{Script=Han}/u.test(word)).sort((a, b) => b.length - a.length);
function contains(text, word) {
  if (!word || !text.includes(word)) return false;
  if (/[^\x00-\x7F]/u.test(word)) return true;
  return (` ${text} `).includes(` ${word} `);
}
export function tokenizeQuery(query) {
  const normalized = normalizeSearch(query);
  const tokens = [];
  // Keep recognized concepts within Chinese sentences, but never discard unknown text.
  for (const chunk of normalized.split(' ').filter(Boolean)) {
    if (/^[a-z0-9]+$/.test(chunk)) { tokens.push(chunk); continue; }
    let rest = chunk;
    while (rest) {
      const word = queryWords.find(word => rest.startsWith(word));
      if (word) { tokens.push(word); rest = rest.slice(word.length); continue; }
      const next = segmenter ? segmenter.segment(rest)[Symbol.iterator]().next().value.segment : [...rest][0];
      tokens.push(next); rest = rest.slice(next.length);
    }
  }
  return [...new Set(tokens.filter(token => !STOP_WORDS.has(token)))];
}
function conceptMatches(rule, entry) {
  if (rule.alsoDomain === entry.item.domainId) return true;
  if (rule.domain && rule.domain !== entry.item.domainId) return false;
  if (rule.items || rule.anchors) return Boolean(rule.items?.includes(entry.item.id)
    || rule.anchors?.some(anchor => contains(entry.title, anchor) || contains(entry.description, anchor)));
  return !rule.subdomains || rule.subdomains.includes(entry.item.subdomainId);
}
function scoreTerm(entry, term) {
  let score = 0;
  for (const field of ['title', 'aliases', 'description', 'content', 'taxonomy']) {
    if (contains(entry[field], term)) score += WEIGHT[field];
  }
  const rule = conceptByWord.get(term);
  if (rule && conceptMatches(rule, entry)) {
    score += WEIGHT.concept;
    if (rule.items?.includes(entry.item.id) || (entry.item.domainId === rule.domain && rule.preferredSubdomains?.includes(entry.item.subdomainId))) score += WEIGHT.preferred;
  }
  return score;
}
const matchesFilters = (item, filters) => (!filters.domain || item.domainId === filters.domain)
  && (!filters.kind || item.kind === filters.kind);
export function createJargonSearch(items) {
  const entries = items.map(item => ({ item,
    title: normalizeSearch(item.title), aliases: normalizeSearch(item.aliases.join(' ')),
    description: normalizeSearch([item.description, item.whenToUse].join(' ')),
    // Only source-specific material, not shared prompt boilerplate or source URLs.
    content: normalizeSearch(item.searchText || ''),
    taxonomy: normalizeSearch([item.domainTitle, item.subdomainTitle].join(' ')),
  }));
  return function search(query = '', filters = {}) {
    const normalized = normalizeSearch(query);
    const tokens = tokenizeQuery(query);
    const ranked = !String(query).trim() ? entries.map(entry => ({ item: entry.item, score: 0 }))
      : !tokens.length ? [] : entries.flatMap(entry => {
        const scores = tokens.map(term => scoreTerm(entry, term));
        if (scores.some(score => !score)) return [];
        const exact = entry.title === normalized || entry.item.aliases.some(alias => normalizeSearch(alias) === normalized);
        return [{ item: entry.item, score: scores.reduce((sum, score) => sum + score, 0) + (exact ? WEIGHT.exact : 0) }];
      }).sort((a, b) => b.score - a.score);
    const matchedItems = ranked.map(result => result.item);
    const filteredItems = matchedItems.filter(item => matchesFilters(item, filters));
    return { items: filteredItems, total: matchedItems.length, hiddenCount: matchedItems.length - filteredItems.length,
      tokens };
  };
}
