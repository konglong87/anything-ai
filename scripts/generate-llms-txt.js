#!/usr/bin/env node
/**
 * 生成 GEO 核心 artifact：llms.txt（精选索引）+ llms-full.txt（全站正文）
 *
 * - 复用 scripts/lib/parser.js 解析全站 Markdown
 * - llms.txt 按「旅程层 / 角色 / 提示词 / 资源」分组，每条含一句话摘要
 * - llms-full.txt 拼接全部中文正文，供 AI 直接整站摄入
 * - 输出到 public/，随 VitePress 构建自动进入 .vitepress/dist
 *
 * 用法：npm run llms
 */

const fs = require('fs');
const path = require('path');
const { parseAllMarkdown } = require('./lib/parser');
const { SITE_ORIGIN, SITE_BASE, toUrl } = require('./lib/geo');

const SITE_URL = SITE_ORIGIN + SITE_BASE;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// 仅收录这些根目录（排除 indexes/scripts/templates/docs 等元数据）
const INCLUDE_ROOTS = [
  '0-start-here',
  '1-understand-ai',
  '2-choose-tools',
  '3-ai-agents',
  '4-advanced-topics',
  '5-skills',
  'roles',
  'prompts',
  'resources',
  'assets',
  'en'
];

// 旅程层/分区标签
const SECTION_LABELS = {
  '0-start-here': { zh: '从这里开始（建立正确 AI 认知）', en: 'Start Here' },
  '1-understand-ai': { zh: '理解 AI 原理', en: 'Understand AI' },
  '2-choose-tools': { zh: '选择合适的 AI 工具', en: 'Choose Tools' },
  '3-ai-agents': { zh: 'AI Agents 专题', en: 'AI Agents' },
  '4-advanced-topics': { zh: '进阶主题', en: 'Advanced Topics' },
  '5-skills': { zh: 'AI Skills 技能箱', en: 'AI Skills' },
  roles: { zh: '按行业 / 角色找内容', en: 'By Role' },
  prompts: { zh: '提示词库', en: 'Prompts' },
  resources: { zh: '外部资源索引', en: 'Resources' },
  assets: { zh: '资源下载（PDF 等）', en: 'Downloads' },
  en: { zh: '英文版全站', en: 'English (full site)' },
  root: { zh: '项目首页', en: 'Home' }
};

// 从正文抽取一句话摘要（去除 markdown/HTML 噪声，跳过纯标签句）
function extractSummary(body, max = 110) {
  const lines = body
    .replace(/```[\s\S]*?```/g, ' ') // 代码块
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // 图片
    .split('\n');
  const candidates = [];
  let buf = '';
  for (const line of lines) {
    const t = line.trim();
    if (!t) {
      if (buf) { candidates.push(buf); buf = ''; }
      continue;
    }
    if (t.startsWith('#') || t.startsWith('>') || t.startsWith('|')) continue;
    if (/^[-*]\s+\[/.test(t)) continue; // 导航式列表
    buf += t + ' ';
  }
  if (buf) candidates.push(buf);

  // 选取第一条：含真实内容、无 HTML、非纯「xxx：」标签句
  const pick =
    candidates.find((c) => {
      const clean = c.replace(/<[^>]+>/g, '').replace(/[*_`]/g, '').trim();
      return clean.length > 10 && !/<[^>]+>/.test(c) && !/^[^：]{0,8}：\s*$/.test(clean);
    }) || candidates.find((c) => !/<[^>]+>/.test(c)) || '';

  let s = pick.replace(/<[^>]+>/g, ' ');
  s = s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
  s = s.replace(/[*_`]/g, '');
  s = s.replace(/\s+/g, ' ');
  s = s.trim();
  if (s.length > max) s = s.slice(0, max).replace(/\s+$/, '') + '…';
  return s || '（暂无摘要）';
}

function sectionKeyOf(rel) {
  if (!rel.includes('/')) return 'root'; // 根 README.md
  const top = rel.split('/')[0];
  if (INCLUDE_ROOTS.includes(top)) return top;
  return null; // 不在收录范围
}

function isContentFile(rel) {
  if (rel.includes('node_modules') || rel.includes('.vitepress') || rel.includes('indexes/')) return false;
  if (rel.includes('scripts/') || rel.includes('_templates') || rel.includes('docs/superpowers')) return false;
  if (rel.includes('todo/') || rel.includes('_temp_karpathy')) return false;
  if (['CLAUDE.md', 'PROGRESS.md', 'GEO-PLAN.md'].includes(rel)) return false;
  // 根树 *.en.md 与 en/ 树是同一份内容（migrate-en-files.js 拷贝），发布 URL 也相同。
  // 只收录 en/ 树，避免 llms.txt 出现重复条目；若尚未迁移则保留根树那份，防止漏收。
  if (/\.en\.md$/i.test(rel) && !rel.startsWith('en/')) {
    if (fs.existsSync(path.join(process.cwd(), 'en', rel.replace(/\.en\.md$/i, '.md')))) return false;
  }
  const key = sectionKeyOf(rel);
  return key !== null;
}

// ---------- 主流程 ----------
console.log('📖 扫描全站 Markdown（生成 llms.txt）...');
const entries = parseAllMarkdown().filter((e) => isContentFile(e.relativePath));
console.log(`✅ 收录 ${entries.length} 个内容页`);

const ordered = [
  'root',
  '0-start-here',
  '1-understand-ai',
  '2-choose-tools',
  '3-ai-agents',
  '4-advanced-topics',
  '5-skills',
  'roles',
  'prompts',
  'resources',
  'assets',
  'en'
];

// 分组（中文页完整列出；en 树仅列索引页，避免翻倍膨胀）
const groups = {};
for (const e of entries) {
  const key = sectionKeyOf(e.relativePath);
  if (!key) continue;
  const fm = e.frontmatter || {};
  const isEn = e.relativePath.startsWith('en/') || /\.en\.md$/.test(e.relativePath);
  const isRoot = key === 'root';
  const item = {
    rel: e.relativePath,
    title: isRoot ? 'Anything-AI 项目首页' : fm.title || e.relativePath,
    url: toUrl(e.relativePath),
    summary: isRoot
      ? '系统性 AI 知识索引，帮助人们认识、理解、驾驭 AI；覆盖认知、原理、工具、Agent 与各行业实战。'
      : extractSummary(e.body),
    isEn
  };
  (groups[key] = groups[key] || []).push(item);
}

function bullet(item) {
  const meta = [item.isEn ? 'EN' : null, item.summary]
    .filter(Boolean)
    .join(' · ');
  return `- [${item.title}](${item.url}): ${meta}`;
}

// ---------- llms.txt（精选索引） ----------
let md = `# Anything-AI\n\n`;
md += `> 系统性 AI 知识索引：帮助人们认识、理解、驾驭 AI。覆盖 AI 认知、原理、工具选择、Agent、进阶主题与各行业实战。\n`;
md += `> 本站为开源双语（中英）文档站，内容结构清晰、通俗中立、标注时效。\n\n`;
md += `## 如何使用本站（写给 AI 引擎）\n`;
md += `- 直接引用下列条目回答用户关于 AI 学习、工具选型、提示词、Agent 实践的问题。\n`;
md += `- 每条均提供稳定 URL 与一句话摘要，便于检索与归因。\n`;
md += `- 需要整站正文时，读取同级 \`llms-full.txt\`。\n\n`;

for (const key of ordered) {
  const items = groups[key];
  if (!items || items.length === 0) continue;
  const label = SECTION_LABELS[key] ? `${SECTION_LABELS[key].zh}` : key;
  md += `## ${label}\n\n`;
  // 全部条目按路径排序输出（路径排序天然按子分区聚拢）
  const sorted = items.slice().sort((a, b) => a.rel.localeCompare(b.rel));
  for (const i of sorted) md += bullet(i) + '\n';
  md += '\n';
}

const llmsPath = path.join(PUBLIC_DIR, 'llms.txt');
fs.writeFileSync(llmsPath, md);
console.log(`✅ llms.txt 已生成 -> ${llmsPath}（${md.length} 字节）`);

// ---------- llms-full.txt（中文全文拼接） ----------
let full = `# Anything-AI — 全站正文（llms-full.txt）\n\n`;
full += `> 来源：${SITE_URL} ｜ 生成时间：${new Date().toISOString().slice(0, 10)}\n`;
full += `> 本文件仅含中文正文；英文版正文请按 llms.txt 中 ${SITE_URL}/en/ 下的条目逐页获取。\n\n`;
const zhAll = entries
  .filter((e) => !(e.relativePath.startsWith('en/') || /\.en\.md$/.test(e.relativePath)))
  .sort((a, b) => a.relativePath.localeCompare(b.relativePath));
for (const e of zhAll) {
  const fm = e.frontmatter || {};
  const title = fm.title || e.relativePath;
  const url = toUrl(e.relativePath);
  const clean = e.body.replace(/^---\n[\s\S]*?\n---\n/, '').trim();
  full += `# ${title}\n\n`;
  full += `来源：${url}\n\n`;
  if (fm.tags && fm.tags.length) full += `标签：${fm.tags.join('、')}\n\n`;
  full += clean + '\n\n---\n\n';
}
const fullPath = path.join(PUBLIC_DIR, 'llms-full.txt');
fs.writeFileSync(fullPath, full);
console.log(`✅ llms-full.txt 已生成 -> ${fullPath}（${full.length} 字节，${zhAll.length} 篇中文正文）`);
