/**
 * 索引生成器
 * 按不同维度生成分组索引
 */

/**
 * 按单一字段分组
 */
function groupBy(entries, field) {
  const groups = {};

  entries.forEach(entry => {
    let value = entry.frontmatter[field];

    // 处理数组字段
    if (Array.isArray(value)) {
      value.forEach(v => {
        if (!groups[v]) groups[v] = [];
        groups[v].push(entry);
      });
    } else {
      if (!groups[value]) groups[value] = [];
      groups[value].push(entry);
    }
  });

  return groups;
}

/**
 * 生成Markdown格式的索引
 */
function generateMarkdownIndex(groups, title, basePath) {
  let md = `# ${title}\n\n`;

  Object.keys(groups).sort().forEach(key => {
    md += `## ${key}\n\n`;

    groups[key].forEach(entry => {
      const relativePath = entry.relativePath.replace(/\.en\.md$/, '.md');
      const title = entry.frontmatter.title || entry.relativePath;
      const duration = entry.frontmatter.duration || '';
      const difficulty = entry.frontmatter.difficulty || '';

      md += `- [${title}](${relativePath})`;
      if (duration) md += ` - ${duration}`;
      if (difficulty) md += ` (${difficulty})`;
      md += '\n';
    });

    md += '\n';
  });

  return md;
}

/**
 * 生成JSON格式的完整索引
 */
function generateJSONIndex(entries) {
  return entries.map(entry => ({
    title: entry.frontmatter.title,
    path: entry.relativePath,
    difficulty: entry.frontmatter.difficulty,
    roles: entry.frontmatter.roles,
    type: entry.frontmatter.type,
    duration: entry.frontmatter.duration,
    tools: entry.frontmatter.tools,
    tags: entry.frontmatter.tags
  }));
}

module.exports = {
  groupBy,
  generateMarkdownIndex,
  generateJSONIndex
};