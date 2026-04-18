#!/usr/bin/env node

/**
 * 修复英文版Markdown文件的图片引用
 * 将描述性文件名替换为实际的图片文件名（从对应的中文版文件中获取）
 */

const fs = require('fs');
const path = require('path');

const baseDir = '5-skills/agent/design-patterns';

// 找出所有英文版Markdown文件
const enFiles = [];
const zhFiles = [];

// 扫描chapters目录
const chaptersDir = path.join(baseDir, 'chapters');
fs.readdirSync(chaptersDir).forEach(file => {
  if (file.endsWith('.en.md')) {
    enFiles.push(path.join(chaptersDir, file));
  } else if (file.endsWith('.md') && !file.endsWith('.en.md')) {
    zhFiles.push(path.join(chaptersDir, file));
  }
});

// 扫描appendix目录
const appendixDir = path.join(baseDir, 'appendix');
fs.readdirSync(appendixDir).forEach(file => {
  if (file.endsWith('.en.md')) {
    enFiles.push(path.join(appendixDir, file));
  } else if (file.endsWith('.md') && !file.endsWith('.en.md')) {
    zhFiles.push(path.join(appendixDir, file));
  }
});

console.log(`找到 ${enFiles.length} 个英文版文件`);
console.log(`找到 ${zhFiles.length} 个中文版文件`);

// 创建文件映射（英文版 → 中文版）
const fileMapping = {};
enFiles.forEach(enFile => {
  const zhFile = enFile.replace('.en.md', '.md');
  if (fs.existsSync(zhFile)) {
    fileMapping[enFile] = zhFile;
  }
});

console.log(`\n开始修复图片引用...\n`);

let totalFixed = 0;

// 对每个英文版文件，读取对应的中文版文件，提取图片引用
Object.keys(fileMapping).forEach(enFile => {
  const zhFile = fileMapping[enFile];

  // 读取中文版文件，提取所有图片引用
  const zhContent = fs.readFileSync(zhFile, 'utf-8');
  const zhImageRefs = [];

  // 提取直接引用：![](../images/...)
  const directRefRegex = /!\[.*?\]\((\.\.\/images\/[^)]+)\)/g;
  let match;
  while ((match = directRefRegex.exec(zhContent)) !== null) {
    zhImageRefs.push(match[1]);
  }

  // 提取脚注引用定义：[image1]: ../images/...
  const footnoteRefRegex = /^\[image\d+\]:\s+(.+)$/gm;
  while ((match = footnoteRefRegex.exec(zhContent)) !== null) {
    zhImageRefs.push(match[1]);
  }

  if (zhImageRefs.length === 0) {
    console.log(`${enFile}: 中文版无图片引用`);
    return;
  }

  // 读取英文版文件
  let enContent = fs.readFileSync(enFile, 'utf-8');
  const originalContent = enContent;

  // 替换所有图片引用为实际的图片文件名
  let imgIndex = 0;
  const imgRefRegex = /!\[(.*?)\]\((\.\.\/images\/[^)]+)\)/g;

  enContent = enContent.replace(imgRefRegex, (fullMatch, altText, oldPath) => {
    if (imgIndex < zhImageRefs.length) {
      const newPath = zhImageRefs[imgIndex];
      imgIndex++;
      console.log(`  ${enFile}: ${oldPath} → ${newPath}`);
      return `![${altText}](${newPath})`;
    }
    return fullMatch;
  });

  if (enContent !== originalContent) {
    fs.writeFileSync(enFile, enContent, 'utf-8');
    totalFixed += imgIndex;
  }
});

console.log(`\n✅ 共修复了 ${totalFixed} 处图片引用`);