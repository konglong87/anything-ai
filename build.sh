#!/bin/bash

# Anything-AI 项目构建脚本
# 每次更新内容后运行此脚本

echo "🚀 Anything-AI 构建流程"
echo "================================"
echo ""

# 1. 检查frontmatter
echo "📝 步骤1: 检查frontmatter..."
npm run check
if [ $? -ne 0 ]; then
    echo "❌ Frontmatter检查失败，请修复后再构建"
    exit 1
fi
echo ""

# 2. 重新构建索引和标签
echo "📊 步骤2: 重新构建索引和标签..."
npm run index
if [ $? -ne 0 ]; then
    echo "❌ 索引构建失败"
    exit 1
fi
echo ""

# 3. 生成统计数据
echo "📈 步骤3: 生成统计数据..."
npm run stats
if [ $? -ne 0 ]; then
    echo "❌ 统计生成失败"
    exit 1
fi
echo ""

# 4. 网站渲染 (待配置)
echo "🌐 步骤4: 静态网站渲染..."
# npm run docs:build  # 待VitePress配置后启用
echo "   (待配置VitePress后启用)"
echo ""

echo "================================"
echo "✅ 构建完成！"
echo ""
echo "📋 生成的文件:"
echo "   - indexes/ 索引文件"
echo "   - 统计数据已输出"
echo ""