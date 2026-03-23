#!/usr/bin/env node

/**
 * 修复 GitHub Pages URL 问题
 * 策略：创建 index.html 自动重定向到 README.html
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', '.vitepress', 'dist');

/**
 * 递归查找所有 README.html 文件并创建 index.html 重定向
 */
function fixReadmeUrls(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // 递归处理子目录
      fixReadmeUrls(fullPath);
    } else if (entry.name === 'README.html') {
      // 找到 README.html，创建 index.html 重定向
      const indexPath = path.join(dir, 'index.html');

      if (!fs.existsSync(indexPath)) {
        // 创建一个简单的HTML文件，自动重定向到 README.html
        const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script>
    // SPA兼容：直接替换路径，不触发VitePress路由
    window.location.replace('./README.html');
  </script>
  <meta http-equiv="refresh" content="0; url=./README.html">
</head>
<body>
  <p>Redirecting to <a href="./README.html">./README.html</a>...</p>
</body>
</html>`;
        fs.writeFileSync(indexPath, redirectHtml, 'utf-8');
        console.log(`✅ 创建重定向 index.html: ${path.relative(distDir, dir) || '/'}`);
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

console.log('\n✅ 所有 index.html 重定向文件已创建');