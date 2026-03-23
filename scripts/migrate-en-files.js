#!/usr/bin/env node

/**
 * 迁移英文文件到VitePress多语言目录结构
 * 从: path/to/file.en.md
 * 到: en/path/to/file.md
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const enDir = path.join(rootDir, 'en');

/**
 * 递归查找所有 .en.md 文件
 */
function findEnFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // 跳过不需要的目录
    if (entry.name === 'node_modules' || entry.name === '.vitepress' || entry.name === 'en') {
      continue;
    }

    if (entry.isDirectory()) {
      // 递归查找子目录
      files.push(...findEnFiles(fullPath));
    } else if (entry.name.endsWith('.en.md')) {
      // 找到英文文件
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * 迁移文件
 */
function migrateFile(sourcePath) {
  // 计算相对路径
  const relativePath = path.relative(rootDir, sourcePath);

  // 去掉 .en.md 后缀，改为 .md
  const relativePathWithoutEn = relativePath.replace('.en.md', '.md');

  // 目标路径: en/path/to/file.md
  const targetPath = path.join(enDir, relativePathWithoutEn);

  // 创建目标目录
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`📁 创建目录: ${path.relative(rootDir, targetDir)}`);
  }

  // 复制文件（保留原文件作为备份）
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`✅ 复制: ${relativePath} → en/${relativePathWithoutEn}`);
}

// 开始迁移
console.log('🚀 开始迁移英文文件...\n');

if (fs.existsSync(enDir)) {
  console.log('⚠️  en/ 目录已存在，跳过创建');
} else {
  fs.mkdirSync(enDir, { recursive: true });
  console.log('📁 创建 en/ 目录');
}

const enFiles = findEnFiles(rootDir);
console.log(`\n📝 找到 ${enFiles.length} 个英文文件\n`);

if (enFiles.length === 0) {
  console.log('✅ 没有需要迁移的文件');
  process.exit(0);
}

// 执行迁移
enFiles.forEach(file => migrateFile(file));

console.log(`\n✅ 复制完成！共复制 ${enFiles.length} 个文件`);
console.log('\n💡 提示：');
console.log('   1. 检查 en/ 目录结构是否正确');
console.log('   2. 运行 npm run docs:dev 测试本地开发');
console.log('   3. 运行 npm run build 测试构建');
console.log('   4. 确认无误后可删除原 .en.md 文件');