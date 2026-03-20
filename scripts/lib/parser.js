/**
 * Markdown文件解析器
 * 解析frontmatter和内容
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

/**
 * 解析单个Markdown文件
 * @param {string} filePath - 文件路径
 * @returns {Object} 解析结果
 */
function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);

  return {
    path: filePath,
    frontmatter: data,
    body: body,
    relativePath: path.relative(process.cwd(), filePath)
  };
}

/**
 * 递归扫描目录下的所有Markdown文件
 * @param {string} dir - 目录路径
 * @param {Array} fileList - 文件列表（递归使用）
 * @returns {Array} Markdown文件列表
 */
function scanMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // 跳过隐藏目录和node_modules
      if (!file.startsWith('.') && file !== 'node_modules') {
        scanMarkdownFiles(filePath, fileList);
      }
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * 解析所有Markdown文件
 * @param {string} rootDir - 根目录
 * @returns {Array} 所有解析结果
 */
function parseAllMarkdown(rootDir = process.cwd()) {
  const files = scanMarkdownFiles(rootDir);
  return files.map(parseMarkdownFile);
}

module.exports = {
  parseMarkdownFile,
  scanMarkdownFiles,
  parseAllMarkdown
};