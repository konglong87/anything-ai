#!/usr/bin/env node
/**
 * 生成 sitemap.xml —— 在 `npm run build` 的 docs:build 之后运行，
 * 扫描 .vitepress/dist 下所有 .html 页面，输出 sitemap.xml 到 dist 根。
 * 用途：提升 GitHub Pages 站点的 SEO 与搜索引擎收录。
 */
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://konglong87.github.io/anything-ai/';
const DIST_DIR = path.join(__dirname, '..', '.vitepress', 'dist');

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

// fix-readme-urls.js 会在每个目录放一个跳转到 README.html 的 index.html 空壳页。
// 这些页面没有正文，收进 sitemap 等于向爬虫申报一批重复的空 URL。
function isRedirectStub(file) {
  const head = fs.readFileSync(file, 'utf8').slice(0, 800);
  return /http-equiv="refresh"/i.test(head) && /Redirecting/i.test(head);
}

const htmlFiles = walk(DIST_DIR).filter((f) => !isRedirectStub(f));
const urls = htmlFiles.map((f) => {
  let rel = path.relative(DIST_DIR, f).split(path.sep).join('/');
  rel = rel.replace(/\.html$/, '');
  // 目录索引页用目录形式，与 config.mts 注入的 canonical 保持一致
  // （index / en/index 都要处理，否则 sitemap 与 canonical 互相打架）
  rel = rel.replace(/(^|\/)index$/, '$1');
  return BASE_URL + rel;
});

const today = new Date().toISOString().split('T')[0];
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`;

const outPath = path.join(DIST_DIR, 'sitemap.xml');
fs.writeFileSync(outPath, xml);
console.log(`✅ sitemap.xml 已生成：${urls.length} 个 URL -> ${outPath}`);
