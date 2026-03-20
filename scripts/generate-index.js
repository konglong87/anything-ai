#!/usr/bin/env node

/**
 * 自动生成交叉索引
 */

const fs = require('fs');
const path = require('path');
const { parseAllMarkdown } = require('./lib/parser');
const { groupBy, generateMarkdownIndex, generateJSONIndex } = require('./lib/indexer');

const INDEXES_DIR = 'indexes';

// 确保indexes目录存在
if (!fs.existsSync(INDEXES_DIR)) {
  fs.mkdirSync(INDEXES_DIR, { recursive: true });
}

console.log('📖 正在扫描所有Markdown文件...');
const entries = parseAllMarkdown();

console.log(`✅ 找到 ${entries.length} 个文件\n`);

// 过滤掉模板文件和README
const contentEntries = entries.filter(e =>
  !e.relativePath.includes('_templates') &&
  e.frontmatter.title
);

console.log('📊 生成按难度索引...');
const byDifficulty = groupBy(contentEntries, 'difficulty');
const difficultyMD = generateMarkdownIndex(byDifficulty, '按难度索引', process.cwd());
fs.writeFileSync(path.join(INDEXES_DIR, 'by-difficulty.md'), difficultyMD);

console.log('👥 生成按角色索引...');
const byRole = groupBy(contentEntries, 'roles');
const roleMD = generateMarkdownIndex(byRole, '按角色索引', process.cwd());
fs.writeFileSync(path.join(INDEXES_DIR, 'by-role.md'), roleMD);

console.log('🔧 生成按工具索引...');
const byTool = groupBy(contentEntries, 'tools');
const toolMD = generateMarkdownIndex(byTool, '按工具索引', process.cwd());
fs.writeFileSync(path.join(INDEXES_DIR, 'by-tool.md'), toolMD);

console.log('⏱️ 生成按时长索引...');
const byDuration = groupBy(contentEntries, 'duration');
const durationMD = generateMarkdownIndex(byDuration, '按时长索引', process.cwd());
fs.writeFileSync(path.join(INDEXES_DIR, 'by-duration.md'), durationMD);

console.log('🏷️ 生成按标签索引...');
const byTags = groupBy(contentEntries, 'tags');
const tagsMD = generateMarkdownIndex(byTags, '按标签索引', process.cwd());
fs.writeFileSync(path.join(INDEXES_DIR, 'by-tags.md'), tagsMD);

console.log('📦 生成JSON完整索引...');
const jsonIndex = generateJSONIndex(contentEntries);
fs.writeFileSync(
  path.join(INDEXES_DIR, 'full-index.json'),
  JSON.stringify(jsonIndex, null, 2)
);

console.log('\n✅ 所有索引生成完成！');
console.log(`📁 索引文件保存在: ${INDEXES_DIR}/`);