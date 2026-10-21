#!/usr/bin/env node
/** Validate the actual production HTML, not just the generated Markdown. */
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { buildCatalog, PROJECT_ROOT } from './normalize.mjs';
const dist=join(PROJECT_ROOT,'.vitepress/dist');
const owned=JSON.parse(readFileSync(join(PROJECT_ROOT,'.data/jargon/generated.json'),'utf8'));
const pages=owned.filter(path=>path.startsWith('prompts/jargon/')&&path.endsWith('.md')).map(path=>path.replace(/\.md$/,'.html'));
let checkedLinks=0;
for (const page of pages) {
  const file=join(dist,page);assert.ok(existsSync(file),`Missing HTML: ${page}`);
  const html=readFileSync(file,'utf8');
  assert.ok(!/<jargon(?:library|prompt)\b/i.test(html),`Unrendered component: ${page}`);
  assert.ok(!html.includes('/Users/'),`Private local path in ${page}`);
  for(const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const href=match[1].replace(/&amp;/g,'&');
    if(/^(?:https?:|mailto:|tel:|data:|#)/.test(href))continue;
    const path=decodeURIComponent(href.split(/[?#]/)[0]);if(!path)continue;
    assert.ok(!path.startsWith('/')||path.startsWith('/anything-ai/'),`Missing Pages base in ${page}: ${href}`);
    let local=path.startsWith('/')?join(dist,path.slice('/anything-ai/'.length)):resolve(dirname(file),path);
    if(existsSync(local)&&statSync(local).isDirectory())local=join(local,'index.html');
    assert.ok(local.startsWith(dist)&&existsSync(local),`Broken internal link in ${page}: ${href}`);checkedLinks++;
  }
}
const catalog=buildCatalog();
for(const item of catalog.items) {
  const html=readFileSync(join(dist,item.detailPath.slice(1)),'utf8');
  assert.ok(html.includes(`data-item-id="${item.id}"`),`No SSR detail: ${item.id}`);
  assert.ok(html.includes('data-testid="jargon-prompt-preview"'),`No SSR prompt text: ${item.id}`);
}
const library=readFileSync(join(dist,'prompts/jargon/README.html'),'utf8');
assert.ok(library.includes('data-testid="jargon-library"'),'No SSR library');
assert.ok(library.includes('129'),'No catalog in SSR output');
for(const path of ['jargon/coverage.json','jargon/source.json','jargon/all-prompts.txt','jargon/LICENSE.txt'])assert.ok(existsSync(join(dist,path)),`Missing download: ${path}`);
console.log(`Production HTML verified: ${pages.length} pages, ${catalog.items.length} SSR prompts, ${checkedLinks} internal links, base paths and downloads.`);
