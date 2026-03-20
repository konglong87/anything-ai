# VitePress静态网站实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 配置VitePress静态网站，实现GitHub Pages自动部署，支持中英文双语切换

**Architecture:** 使用VitePress作为静态站点生成器，通过GitHub Actions自动构建和部署到GitHub Pages。保留现有内容结构，配置i18n实现中英文切换。

**Tech Stack:** VitePress 1.x, GitHub Actions, GitHub Pages, Node.js 18+

---

## Task 1: 安装VitePress依赖

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (auto-generated)

**Step 1: 安装VitePress和Vue**

Run:
```bash
npm install --save-dev vitepress
```

Expected: VitePress安装成功，package.json更新

**Step 2: 验证安装**

Run:
```bash
npx vitepress --version
```

Expected: 显示VitePress版本号（如1.0.0）

---

## Task 2: 创建VitePress配置文件

**Files:**
- Create: `.vitepress/config.mts`

**Step 1: 创建.vitepress目录**

Run:
```bash
mkdir -p .vitepress
```

Expected: .vitepress目录创建成功

**Step 2: 创建配置文件**

Write `.vitepress/config.mts`:

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  // GitHub Pages部署配置
  base: '/anything-ai/',

  // 站点元数据
  title: 'Anything-AI',
  description: '系统性AI知识索引 - 帮助人们认识、理解和驾驭AI',

  // 排除不需要的目录
  srcExclude: [
    'indexes/**',
    'scripts/**',
    'node_modules/**',
    'docs/superpowers/**',
    '0-start-here/_templates/**',
    'PROGRESS.md',
    'CLAUDE.md'
  ],

  // i18n多语言配置
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
      themeConfig: {
        nav: [
          { text: '从这里开始', link: '/0-start-here/' },
          { text: '理解AI', link: '/1-understand-ai/' },
          { text: '选择工具', link: '/2-choose-tools/' },
          { text: '行业案例', link: '/roles/' },
          { text: '进阶主题', link: '/4-advanced-topics/' },
          { text: '提示词库', link: '/prompts/' },
          { text: '外部资源', link: '/resources/' }
        ],
        sidebar: {
          '/': [
            {
              text: '从这里开始',
              collapsed: false,
              items: [
                { text: 'AI是什么', link: '/0-start-here/what-is-ai' },
                { text: '为什么不需要AI焦虑', link: '/0-start-here/ai-anxiety' },
                { text: '学习路径总览', link: '/0-start-here/learning-path' }
              ]
            },
            {
              text: '理解AI',
              collapsed: true,
              items: [
                { text: '深入原理', link: '/1-understand-ai/' }
              ]
            },
            {
              text: '选择工具',
              collapsed: true,
              items: [
                { text: '工具选择矩阵', link: '/2-choose-tools/tool-matrix' }
              ]
            },
            {
              text: '行业案例',
              collapsed: true,
              items: [
                { text: '程序员', link: '/roles/programmer/' },
                { text: '内容创作者', link: '/roles/content-creator/' },
                { text: '教师', link: '/roles/teacher/' },
                { text: '学生', link: '/roles/student/' },
                { text: '财务', link: '/roles/finance/' },
                { text: 'HR', link: '/roles/hr/' },
                { text: '销售', link: '/roles/sales/' },
                { text: '设计师', link: '/roles/designer/' },
                { text: '行政', link: '/roles/admin/' }
              ]
            },
            {
              text: '进阶主题',
              collapsed: true,
              items: [
                { text: '概览', link: '/4-advanced-topics/' }
              ]
            },
            {
              text: '提示词库',
              collapsed: true,
              items: [
                { text: '概览', link: '/prompts/' }
              ]
            },
            {
              text: '外部资源',
              collapsed: true,
              items: [
                { text: '概览', link: '/resources/' }
              ]
            }
          ]
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        nav: [
          { text: 'Start Here', link: '/en/0-start-here/' },
          { text: 'Understand AI', link: '/en/1-understand-ai/' },
          { text: 'Choose Tools', link: '/en/2-choose-tools/' },
          { text: 'Industry Cases', link: '/en/roles/' },
          { text: 'Advanced Topics', link: '/en/4-advanced-topics/' },
          { text: 'Prompts', link: '/en/prompts/' },
          { text: 'Resources', link: '/en/resources/' }
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Start Here',
              collapsed: false,
              items: [
                { text: 'What is AI', link: '/en/0-start-here/what-is-ai' },
                { text: 'Why No AI Anxiety', link: '/en/0-start-here/ai-anxiety' },
                { text: 'Learning Path', link: '/en/0-start-here/learning-path' }
              ]
            },
            {
              text: 'Understand AI',
              collapsed: true,
              items: [
                { text: 'Deep Principles', link: '/en/1-understand-ai/' }
              ]
            },
            {
              text: 'Choose Tools',
              collapsed: true,
              items: [
                { text: 'Tool Matrix', link: '/en/2-choose-tools/tool-matrix' }
              ]
            },
            {
              text: 'Industry Cases',
              collapsed: true,
              items: [
                { text: 'Programmer', link: '/en/roles/programmer/' },
                { text: 'Content Creator', link: '/en/roles/content-creator/' },
                { text: 'Teacher', link: '/en/roles/teacher/' },
                { text: 'Student', link: '/en/roles/student/' },
                { text: 'Finance', link: '/en/roles/finance/' },
                { text: 'HR', link: '/en/roles/hr/' },
                { text: 'Sales', link: '/en/roles/sales/' },
                { text: 'Designer', link: '/en/roles/designer/' },
                { text: 'Admin', link: '/en/roles/admin/' }
              ]
            },
            {
              text: 'Advanced Topics',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/4-advanced-topics/' }
              ]
            },
            {
              text: 'Prompts',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/prompts/' }
              ]
            },
            {
              text: 'Resources',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/en/resources/' }
              ]
            }
          ]
        }
      }
    }
  },

  // 主题配置
  themeConfig: {
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/konglong87/anything-ai' }
    ],

    // 本地搜索
    search: {
      provider: 'local'
    },

    // 页脚
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2026 Anything-AI Community'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/konglong87/anything-ai/edit/main/:path',
      text: '在GitHub上编辑此页'
    }
  }
})
```

Expected: 配置文件创建成功

**Step 3: 提交配置文件**

Run:
```bash
git add .vitepress/config.mts
git commit -m "feat: 添加VitePress配置文件

- 配置GitHub Pages路径
- 配置中英文i18n
- 配置导航和侧边栏
- 配置本地搜索"
```

Expected: 配置文件提交成功

---

## Task 3: 更新package.json脚本

**Files:**
- Modify: `package.json`

**Step 1: 添加VitePress脚本**

Read current `package.json` scripts section, then update:

```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview",
    "index": "node scripts/generate-index.js",
    "check": "node scripts/check-frontmatter.js",
    "check:links": "node scripts/check-links.js",
    "stats": "node scripts/stats.js",
    "build": "npm run check && npm run index && npm run docs:build",
    "test": "echo \"No tests yet\" && exit 0"
  }
}
```

**Step 2: 提交更新**

Run:
```bash
git add package.json
git commit -m "feat: 添加VitePress构建脚本

- docs:dev: 本地开发服务器
- docs:build: 生产构建
- docs:preview: 本地预览
- build: 整合构建流程"
```

Expected: package.json更新成功

---

## Task 4: 本地测试VitePress

**Files:**
- None (测试阶段)

**Step 1: 启动开发服务器**

Run:
```bash
npm run docs:dev
```

Expected:
- 开发服务器启动成功
- 显示本地访问地址：http://localhost:5173/anything-ai/
- 按Ctrl+C停止服务器

**Step 2: 验证核心功能**

手动验证：
1. 访问 http://localhost:5173/anything-ai/
2. 检查首页是否显示README.md内容
3. 点击语言切换器，验证中英文切换
4. 点击导航链接，验证页面跳转
5. 测试搜索功能（Ctrl/Cmd + K）

Expected: 所有功能正常工作

**Step 3: 停止服务器**

Run: 按Ctrl+C

Expected: 服务器停止

---

## Task 5: 创建GitHub Actions部署配置

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: 创建workflows目录**

Run:
```bash
mkdir -p .github/workflows
```

Expected: .github/workflows目录创建成功

**Step 2: 创建部署配置文件**

Write `.github/workflows/deploy.yml`:

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Expected: 部署配置文件创建成功

**Step 3: 提交部署配置**

Run:
```bash
git add .github/workflows/deploy.yml
git commit -m "feat: 添加GitHub Actions自动部署配置

- 触发条件：push到main分支
- 构建流程：check → index → docs:build
- 部署目标：GitHub Pages
- 访问地址：https://konglong87.github.io/anything-ai/"
```

Expected: 部署配置提交成功

---

## Task 6: 更新.gitignore

**Files:**
- Modify: `.gitignore`

**Step 1: 添加VitePress缓存目录**

Read current `.gitignore`, then append:

```
# VitePress
.vitepress/dist/
.vitepress/cache/
```

**Step 2: 提交更新**

Run:
```bash
git add .gitignore
git commit -m "chore: 更新.gitignore排除VitePress构建产物"
```

Expected: .gitignore更新成功

---

## Task 7: 更新build.sh脚本

**Files:**
- Modify: `build.sh`

**Step 1: 更新构建脚本**

Read current `build.sh`, then replace the last step:

```bash
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
```

**Step 2: 提交更新**

Run:
```bash
git add build.sh
git commit -m "feat: 更新build.sh集成VitePress构建"
```

Expected: build.sh更新成功

---

## Task 8: 推送代码并触发部署

**Files:**
- None (部署阶段)

**Step 1: 推送所有提交到远程仓库**

Run:
```bash
git push origin main
```

Expected:
- 代码成功推送到GitHub
- GitHub Actions自动触发部署

**Step 2: 查看GitHub Actions状态**

Run:
```bash
gh run list --limit 1
```

Expected: 显示最新的workflow run状态

**Step 3: 等待部署完成**

访问：https://github.com/konglong87/anything-ai/actions

Expected:
- 查看workflow运行状态
- 等待构建和部署完成（约2-3分钟）

**Step 4: 验证网站访问**

访问：https://konglong87.github.io/anything-ai/

Expected:
- 网站成功访问
- 首页显示README.md内容
- 中英文切换正常
- 所有导航链接正常

---

## Task 9: 更新项目文档

**Files:**
- Modify: `CLAUDE.md`
- Modify: `PROGRESS.md`

**Step 1: 更新CLAUDE.md**

在"## 🔗 Git操作"部分后添加：

```markdown
## 🌐 网站部署

### 本地开发
```bash
npm run docs:dev
```
访问：http://localhost:5173/anything-ai/

### 生产构建
```bash
npm run build
```

### 部署地址
- 网站：https://konglong87.github.io/anything-ai/
- 状态：https://github.com/konglong87/anything-ai/actions

### 部署流程
1. Push到main分支
2. GitHub Actions自动触发
3. 执行构建（check → index → docs:build）
4. 部署到GitHub Pages
5. 自动更新网站内容
```

**Step 2: 更新PROGRESS.md**

在"### Phase 4: 自动化工具"后添加：

```markdown
### Phase 5: VitePress静态网站 ✅ (已完成)

**目标**：配置静态网站，实现GitHub Pages部署

**完成内容**：
- [x] 安装VitePress依赖 ✅ 2026-03-20
- [x] 创建VitePress配置文件 ✅ 2026-03-20
- [x] 配置中英文i18n ✅ 2026-03-20
- [x] 配置导航和侧边栏 ✅ 2026-03-20
- [x] 配置GitHub Actions自动部署 ✅ 2026-03-20
- [x] 本地测试验证 ✅ 2026-03-20
- [x] 部署到GitHub Pages ✅ 2026-03-20
```

更新完成进度：
```markdown
**Phase 1**：✅ 100%（宏观骨架）
**Phase 2**：✅ 100%（内容模板）
**Phase 3**：✅ 100%（核心内容）
**Phase 4**：✅ 100%（自动化工具）
**Phase 5**：✅ 100%（静态网站）
```

**Step 3: 提交文档更新**

Run:
```bash
git add CLAUDE.md PROGRESS.md
git commit -m "docs: 更新项目文档记录VitePress部署完成

- Phase 5: VitePress静态网站配置完成
- 更新网站部署流程说明
- 添加本地开发和生产构建指南"
```

Expected: 文档更新成功

---

## 验收清单

完成后，验证以下内容：

### 功能验收
- [ ] 网站可以通过 https://konglong87.github.io/anything-ai/ 访问
- [ ] 首页正确显示README.md内容
- [ ] 中英文切换功能正常
- [ ] 所有导航链接正常工作
- [ ] 侧边栏正确显示所有章节
- [ ] 本地搜索功能正常
- [ ] 移动端显示正常
- [ ] 深色模式正常切换

### 技术验收
- [ ] GitHub Actions构建成功
- [ ] 构建产物正确部署到GitHub Pages
- [ ] 本地开发服务器正常运行
- [ ] 所有配置文件正确提交到Git

### 文档验收
- [ ] CLAUDE.md更新部署说明
- [ ] PROGRESS.md记录完成状态
- [ ] 设计文档和实施文档完整

---

## 故障排查

### 问题1：本地开发服务器启动失败
**原因**：VitePress依赖未安装或版本不兼容
**解决**：
```bash
rm -rf node_modules package-lock.json
npm install
npm run docs:dev
```

### 问题2：GitHub Actions构建失败
**原因**：Node版本不匹配或依赖缺失
**解决**：
- 检查Node版本是否为18+
- 检查GitHub Actions日志
- 本地运行 `npm run build` 验证

### 问题3：网站404错误
**原因**：base路径配置错误或GitHub Pages未启用
**解决**：
- 确认 `.vitepress/config.mts` 中 `base: '/anything-ai/'`
- 确认GitHub仓库Settings → Pages已启用
- 确认部署分支为gh-pages或main

### 问题4：语言切换不工作
**原因**：i18n配置错误或文件命名不规范
**解决**：
- 确认 `.en.md` 文件命名正确
- 确认locales配置正确
- 检查文件路径映射

---

## 实施说明

### 时间预估
- Task 1-2: 5分钟
- Task 3: 2分钟
- Task 4: 5分钟
- Task 5-6: 3分钟
- Task 7: 2分钟
- Task 8: 10分钟（包含等待部署）
- Task 9: 3分钟
- **总计**: 约30分钟

### 关键里程碑
1. ✅ VitePress本地运行成功
2. ✅ GitHub Actions部署成功
3. ✅ 网站访问验证通过

### 后续优化
- 添加自定义域名（可选）
- 集成Algolia搜索（可选）
- 添加Google Analytics（可选）
- 自定义主题样式（可选）

---

**计划创建日期**：2026-03-20
**预估实施时间**：30分钟
**关键技能**：VitePress配置、GitHub Actions、Git操作