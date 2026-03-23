#!/usr/bin/env node

/**
 * 修复 GitHub Pages URL 问题
 * 策略：复制 README.html 为 index.html，确保目录访问正常
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', '.vitepress', 'dist');

/**
 * 递归查找所有 README.html 文件并复制为 index.html
 */
function fixReadmeUrls(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 递归处理子目录
      fixReadmeUrls(fullPath);
    } else if (entry.name === 'README.html') {
      // 找到 README.html，复制为 index.html
      const indexPath = path.join(dir, 'index.html');

      if (!fs.existsSync(indexPath)) {
        fs.copyFileSync(fullPath, indexPath);
        console.log(`✅ 创建 index.html: ${path.relative(distDir, dir) || '/'}`);
      }
    }
  }
}

// 开始处理
console.log('🔧 修复 GitHub Pages URL 问题...\n');

if (!fs.existsSync(distDir)) {
  console.error('❌ 错误: dist 目录不存在，请先运行构建');
  process.exit(1);
}

fixReadmeUrls(distDir);

console.log('\n✅ 所有 README.html 已复制为 index.html');