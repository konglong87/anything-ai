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

const htmlFiles = walk(DIST_DIR);
const urls = htmlFiles.map((f) => {
  let rel = path.relative(DIST_DIR, f).split(path.sep).join('/');
  rel = rel.replace(/\.html$/, '');
  if (rel === 'index') rel = '';
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
