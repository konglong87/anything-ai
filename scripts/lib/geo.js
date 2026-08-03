/**
 * GEO 共享工具：仓库相对路径 → 已发布 URL
 *
 * 由 .vitepress/config.mts（JSON-LD canonical / hreflang）与
 * scripts/generate-llms-txt.js（llms.txt 条目）共用，保证两处 URL 一致。
 *
 * 站点实际产物（见 .vitepress/config.mts 的 rewrites 与 scripts/fix-readme-urls.js）：
 *   README.md          → index.html            真实内容页 → /
 *   en/README.md       → en/index.html         真实内容页 → /en/
 *   <dir>/README.md    → <dir>/README.html     真实内容页
 *   <dir>/index.html   → meta-refresh 跳板，无正文，不可作为 canonical
 *   <dir>/<page>.md    → <dir>/<page>.html     GitHub Pages 支持省略 .html
 *   <path>.en.md       → <path>.en.html        仅当 migrate-en-files.js 已同步到
 *                                              en/ 树时才另有 /en/<path> 路由
 */

const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://konglong87.github.io';
const SITE_BASE = '/anything-ai';
const ROOT = path.join(__dirname, '..', '..');

function toUrl(rel) {
  const prefix = SITE_ORIGIN + SITE_BASE + '/';
  let core = rel.replace(/\.md$/i, '');

  // 根树 *.en.md：只有已被 migrate-en-files.js 拷进 en/ 树，/en/<path> 才是真实页面。
  // 未同步的那些，VitePress 产物就是 <path>.en.html —— 指向 /en/<path> 会 404。
  if (/\.en$/i.test(core) && !core.startsWith('en/')) {
    const bare = core.replace(/\.en$/i, '');
    if (fs.existsSync(path.join(ROOT, 'en', bare + '.md'))) {
      core = 'en/' + bare;
    } else {
      return prefix + core + '.html';
    }
  }

  const parts = core.split('/');
  const isIndexLike = /^(README|index)$/i.test(parts[parts.length - 1]);
  if (!isIndexLike) return prefix + core;

  // 站点根与英文站根被 rewrites 映射成 index.html，是真实内容页
  if (parts.length === 1) return prefix;
  const lower = core.toLowerCase();
  if (lower === 'en/readme' || lower === 'en/index') return prefix + 'en/';

  // 其余目录索引页必须指向 <dir>/README.html：
  // 省略 .html 会命中 fix-readme-urls.js 生成的 meta-refresh 空壳页。
  // 保留 core 原始大小写（GitHub Pages 区分大小写，仓库里存在小写 readme.md）。
  return prefix + core + '.html';
}

module.exports = { SITE_ORIGIN, SITE_BASE, toUrl };
