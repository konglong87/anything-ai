#!/usr/bin/env node

/**
 * 修复 GitHub Pages URL 问题
 * 策略：
 * 1. 创建 index.html 自动重定向到 README.html
 * 2. 修改 404.html，添加URL自动修复机制
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

      // 对于根目录的特殊处理：直接复制README.html为index.html
      const isRoot = (dir === distDir);
      if (isRoot) {
        // 根目录：直接复制README.html为index.html，避免重定向循环
        if (!fs.existsSync(indexPath)) {
          const readmeContent = fs.readFileSync(fullPath, 'utf-8');
          // 移除VitePress的SPA路由脚本，改为普通HTML
          const fixedContent = readmeContent.replace(/<script type="module"[^>]*>[\s\S]*?<\/script>/g, '');
          fs.writeFileSync(indexPath, fixedContent, 'utf-8');
          console.log(`✅ 创建首页 index.html（复制自README.html）`);
        }
      } else {
        // 其他目录：创建重定向文件
        if (!fs.existsSync(indexPath)) {
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
          console.log(`✅ 创建重定向 index.html: ${path.relative(distDir, dir)}`);
        }
      }
    }
  }
}

/**
 * 修改 404.html，添加URL自动修复机制
 */
function fix404Page() {
  const file404Path = path.join(distDir, '404.html');

  if (!fs.existsSync(file404Path)) {
    console.log('⚠️  404.html 不存在，跳过处理');
    return;
  }

  let content404 = fs.readFileSync(file404Path, 'utf-8');

  // 注入URL自动修复脚本（增强版）
  const autoFixScript = `
<script>
// URL自动修复机制：检测并修复多种URL问题
(function() {
  const path = window.location.pathname;
  const base = '/anything-ai/';

  // 去除base路径
  const relativePath = path.replace(base, '');

  // 1. 如果路径以/结尾（目录路径），尝试重定向到README.html
  if (relativePath.endsWith('/')) {
    const readmePath = path + 'README.html';
    const indexPath = path + 'index.html';

    // 优先尝试README.html
    fetch(readmePath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // 找到README.html，直接跳转
          window.location.replace(readmePath);
        } else {
          // 回退到index.html
          return fetch(indexPath, { method: 'HEAD' });
        }
      })
      .then(response => {
        if (response && response.ok) {
          window.location.replace(indexPath);
        }
      })
      .catch(() => {
        // 静默失败，保持在404页面
      });
    return;
  }

  // 2. 如果路径没有.html后缀，尝试添加.html
  if (!relativePath.endsWith('.html') && !relativePath.endsWith('.md')) {
    // 先尝试添加.html
    const htmlPath = path + '.html';

    fetch(htmlPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // 找到.html文件，直接跳转
          window.location.replace(htmlPath);
        } else {
          // 尝试作为目录，添加/README.html
          const dirReadmePath = path + '/README.html';
          return fetch(dirReadmePath, { method: 'HEAD' });
        }
      })
      .then(response => {
        if (response && response.ok) {
          window.location.replace(path + '/README.html');
        }
      })
      .catch(() => {
        // 静默失败，保持在404页面
      });
  }
})();
</script>
`;

  // 在 </head> 之前插入脚本
  if (!content404.includes('URL自动修复机制')) {
    content404 = content404.replace('</head>', autoFixScript + '</head>');
    fs.writeFileSync(file404Path, content404, 'utf-8');
    console.log('✅ 已注入URL自动修复脚本到 404.html');
  }
}

// 开始处理
console.log('🔧 修复 GitHub Pages URL 问题...\n');

if (!fs.existsSync(distDir)) {
  console.error('❌ 错误: dist 目录不存在，请先运行构建');
  process.exit(1);
}

fixReadmeUrls(distDir);
fix404Page();

console.log('\n✅ 所有修复完成！');