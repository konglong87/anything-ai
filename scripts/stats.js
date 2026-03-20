#!/usr/bin/env node

/**
 * 内容统计脚本
 * 统计项目的内容数据
 */

const fs = require('fs');
const path = require('path');
const { parseAllMarkdown } = require('./lib/parser');

console.log('📊 统计Anything-AI项目内容数据\n');
console.log('='.repeat(50) + '\n');

const entries = parseAllMarkdown();

// 过滤掉模板
const contentEntries = entries.filter(e =>
  !e.relativePath.includes('_templates')
);

// 统计文件数量
console.log(`📄 文件统计:`);
console.log(`   总Markdown文件: ${entries.length}`);
console.log(`   内容文件: ${contentEntries.length}`);
console.log('');

// 按目录统计
const byDir = {};
contentEntries.forEach(entry => {
  const dir = path.dirname(entry.relativePath).split('/')[0];
  byDir[dir] = (byDir[dir] || 0) + 1;
});

console.log('📁 按目录统计:');
Object.keys(byDir).sort().forEach(dir => {
  console.log(`   ${dir}: ${byDir[dir]} 个文件`);
});
console.log('');

// 按难度统计
const byDifficulty = {};
contentEntries.forEach(entry => {
  const difficulty = entry.frontmatter.difficulty || '未设置';
  byDifficulty[difficulty] = (byDifficulty[difficulty] || 0) + 1;
});

console.log('🎯 按难度统计:');
Object.keys(byDifficulty).sort().forEach(difficulty => {
  console.log(`   ${difficulty}: ${byDifficulty[difficulty]} 个文件`);
});
console.log('');

// 按类型统计
const byType = {};
contentEntries.forEach(entry => {
  const type = entry.frontmatter.type || '未设置';
  byType[type] = (byType[type] || 0) + 1;
});

console.log('📋 按类型统计:');
Object.keys(byType).sort().forEach(type => {
  console.log(`   ${type}: ${byType[type]} 个文件`);
});
console.log('');

// 按角色统计
const byRole = {};
contentEntries.forEach(entry => {
  const roles = entry.frontmatter.roles || [];
  roles.forEach(role => {
    byRole[role] = (byRole[role] || 0) + 1;
  });
});

console.log('👥 按角色统计:');
Object.keys(byRole).sort().forEach(role => {
  console.log(`   ${role}: ${byRole[role]} 个文件`);
});
console.log('');

// 按工具统计
const byTool = {};
contentEntries.forEach(entry => {
  const tools = entry.frontmatter.tools || [];
  tools.forEach(tool => {
    byTool[tool] = (byTool[tool] || 0) + 1;
  });
});

console.log('🔧 按工具统计:');
Object.keys(byTool).sort().forEach(tool => {
  console.log(`   ${tool}: ${byTool[tool]} 个文件`);
});
console.log('');

// 按时长统计
const byDuration = {};
contentEntries.forEach(entry => {
  const duration = entry.frontmatter.duration || '未设置';
  byDuration[duration] = (byDuration[duration] || 0) + 1;
});

console.log('⏱️  按时长统计:');
Object.keys(byDuration).sort().forEach(duration => {
  console.log(`   ${duration}: ${byDuration[duration]} 个文件`);
});
console.log('');

// 双语文件统计
const bilingualPairs = new Set();
contentEntries.forEach(entry => {
  const baseName = entry.relativePath.replace(/\.en\.md$/, '.md');
  if (baseName !== entry.relativePath) {
    // 这是英文版
    bilingualPairs.add(baseName);
  }
});

console.log('🌐 双语文件统计:');
console.log(`   中文文件: ${contentEntries.length - bilingualPairs.size}`);
console.log(`   英文文件: ${bilingualPairs.size}`);
console.log('');

console.log('='.repeat(50));
console.log('✅ 统计完成！');