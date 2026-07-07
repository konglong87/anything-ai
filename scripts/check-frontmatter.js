#!/usr/bin/env node

/**
 * Frontmatter检查脚本
 * 验证所有Markdown文件的frontmatter是否符合规范
 */

const fs = require('fs');
const path = require('path');
const { parseAllMarkdown } = require('./lib/parser');

// 必需字段
const REQUIRED_FIELDS = ['title', 'difficulty', 'roles', 'type', 'duration'];

// 字段值规范
const VALID_VALUES = {
  difficulty: ['beginner', 'intermediate', 'advanced'],
  type: ['concept', 'tutorial', 'guide', 'case', 'tool-reference', 'comparison']
};

let hasErrors = false;

console.log('🔍 检查所有Markdown文件的frontmatter...\n');

const entries = parseAllMarkdown();

// 过滤掉模板和特殊文件
const contentEntries = entries.filter(e =>
  !e.relativePath.includes('_templates') &&
  !e.relativePath.includes('indexes/') &&
  !e.relativePath.startsWith('memory/') &&
  !e.relativePath.startsWith('.github/') &&
  !['CLAUDE.md', 'PROGRESS.md', 'README.md', 'README.en.md'].includes(e.relativePath) &&
  !e.relativePath.startsWith('docs/')
);

console.log(`📄 共找到 ${contentEntries.length} 个内容文件\n`);

contentEntries.forEach(entry => {
  const fm = entry.frontmatter;
  const errors = [];

  // 检查必需字段
  REQUIRED_FIELDS.forEach(field => {
    if (!fm[field]) {
      errors.push(`缺少必需字段: ${field}`);
    }
  });

  // 检查字段值
  Object.keys(VALID_VALUES).forEach(field => {
    if (fm[field] && !VALID_VALUES[field].includes(fm[field])) {
      errors.push(
        `${field} 的值 "${fm[field]}" 不在有效值中: ${VALID_VALUES[field].join(', ')}`
      );
    }
  });

  // 检查数组字段
  if (fm.roles && !Array.isArray(fm.roles)) {
    errors.push('roles 应该是数组格式');
  }

  if (fm.tools && !Array.isArray(fm.tools)) {
    errors.push('tools 应该是数组格式');
  }

  if (fm.tags && !Array.isArray(fm.tags)) {
    errors.push('tags 应该是数组格式');
  }

  // 输出错误
  if (errors.length > 0) {
    hasErrors = true;
    console.log(`❌ ${entry.relativePath}`);
    errors.forEach(err => console.log(`   - ${err}`));
    console.log('');
  } else {
    console.log(`✅ ${entry.relativePath}`);
  }
});

// 调试信息：输出错误统计
if (hasErrors) {
  console.log('\n[调试信息] hasErrors为true，但上面可能没有显示具体错误文件');
  console.log('[调试信息] 这表明可能有隐藏的错误逻辑问题');
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.log('❌ 发现错误，请修复后再提交');
  process.exit(1);
} else {
  console.log('✅ 所有文件frontmatter检查通过！');
  process.exit(0);
}