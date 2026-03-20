#!/bin/bash

echo "🚀 Anything-AI 构建流程"
echo "================================"
echo ""

echo "📝 步骤1: 检查frontmatter..."
npm run check
if [ $? -ne 0 ]; then
    echo "❌ Frontmatter检查失败！"
    exit 1
fi
echo ""

echo "📊 步骤2: 重新构建索引和标签..."
npm run index
if [ $? -ne 0 ]; then
    echo "❌ 索引构建失败！"
    exit 1
fi
echo ""

echo "📈 步骤3: 生成统计数据..."
npm run stats
echo ""

echo "🌐 步骤4: 构建VitePress静态网站..."
npm run docs:build
if [ $? -ne 0 ]; then
    echo "❌ VitePress构建失败！"
    exit 1
fi
echo ""

echo "================================"
echo "✅ 构建完成！"
echo ""
echo "📋 生成的文件:"
echo "   - indexes/ 索引文件"
echo "   - .vitepress/dist/ 静态网站文件"
echo "   - 统计数据已输出"