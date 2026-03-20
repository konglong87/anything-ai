/**
 * Exa 搜索工具
 * 用于内容创作前的搜索和验证
 */

const Exa = require('exa-js');

// 检查是否设置了 EXA_API_KEY
if (!process.env.EXA_API_KEY) {
  console.error('请设置 EXA_API_KEY 环境变量');
  console.error('获取 API key: https://exa.ai');
  process.exit(1);
}

const exa = new Exa(process.env.EXA_API_KEY);

/**
 * 搜索并返回结果
 * @param {string} query - 搜索查询
 * @param {object} options - 搜索选项
 */
async function search(query, options = {}) {
  try {
    const results = await exa.searchAndContents(query, {
      contents: {
        text: true,
      },
      ...options
    });

    return results;
  } catch (error) {
    console.error('搜索错误:', error.message);
    throw error;
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  const query = process.argv[2];
  if (!query) {
    console.log('使用方法: node scripts/exa-search.js "搜索查询"');
    process.exit(1);
  }

  search(query)
    .then(results => {
      console.log(JSON.stringify(results, null, 2));
    })
    .catch(error => {
      console.error('搜索失败:', error);
      process.exit(1);
    });
}

module.exports = { search };