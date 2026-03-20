# VitePress静态网站设计方案

> 设计日期：2026-03-20
> 设计者：孔龙🦖
> 状态：待实施

---

## 一、设计目标

将Anything-AI项目配置为VitePress静态网站，通过GitHub Pages部署，支持中英文双语切换。

---

## 二、技术选型

### 核心技术栈
- **VitePress 1.x** - Vue驱动的静态站点生成器
- **GitHub Pages** - 免费静态网站托管
- **GitHub Actions** - 自动化CI/CD部署

### 技术优势
- ✅ 开箱即用的文档主题
- ✅ 内置i18n多语言支持
- ✅ 自动路由和导航
- ✅ 本地搜索功能
- ✅ 响应式设计
- ✅ Markdown增强功能

---

## 三、架构设计

### 目录结构
```
anything-ai/
├── .vitepress/
│   ├── config.mts              # 主配置文件
│   ├── theme/
│   │   └── index.ts            # 主题定制（可选）
│   └── cache/                  # 构建缓存（自动生成）
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions部署配置
├── docs/                        # 现有文档目录
├── 0-start-here/               # 内容目录（保持不变）
├── 1-understand-ai/
├── 2-choose-tools/
├── roles/
├── 4-advanced-topics/
├── prompts/
├── resources/
├── indexes/                    # 索引文件（VitePress排除）
├── scripts/                    # 构建脚本（VitePress排除）
└── package.json                # 添加VitePress依赖和脚本
```

### 文件映射规则
- `README.md` → 网站首页
- `0-start-here/README.md` → `/0-start-here/`
- `0-start-here/what-is-ai.md` → `/0-start-here/what-is-ai.html`
- `0-start-here/what-is-ai.en.md` → `/en/0-start-here/what-is-ai.html`

---

## 四、核心配置

### 4.1 VitePress主配置

```typescript
// .vitepress/config.mts
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

### 4.2 package.json更新

```json
{
  "scripts": {
    "docs:dev": "vitepress dev",
    "docs:build": "vitepress build",
    "docs:preview": "vitepress preview",
    "index": "node scripts/generate-index.js",
    "check": "node scripts/check-frontmatter.js",
    "stats": "node scripts/stats.js",
    "build": "npm run check && npm run index && npm run docs:build"
  },
  "devDependencies": {
    "vitepress": "^1.0.0",
    "exa-js": "^2.8.0",
    "gray-matter": "^4.0.3",
    "marked": "^12.0.0"
  }
}
```

### 4.3 GitHub Actions部署

```yaml
# .github/workflows/deploy.yml
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

---

## 五、功能特性

### 5.1 多语言支持
- **语言切换器**：右上角自动显示
- **路由映射**：中文`/` + 英文`/en/`
- **内容匹配**：xxx.md / xxx.en.md自动对应

### 5.2 导航系统
- **顶部导航**：7个主导航项
- **全局侧边栏**：所有章节可见，支持折叠
- **面包屑导航**：自动生成

### 5.3 搜索功能
- **本地搜索**：内置全文搜索
- **快捷键**：Ctrl/Cmd + K
- **多语言**：支持中英文搜索

### 5.4 用户体验
- **响应式设计**：移动端友好
- **深色模式**：自动切换
- **返回顶部**：自动显示
- **页面预加载**：提升导航速度

---

## 六、部署流程

### 6.1 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 访问 http://localhost:5173/anything-ai/
```

### 6.2 生产构建
```bash
# 完整构建流程
npm run build

# 本地预览
npm run docs:preview
```

### 6.3 自动部署
1. 推送代码到main分支
2. GitHub Actions自动触发
3. 执行构建命令
4. 部署到GitHub Pages
5. 访问：https://konglong87.github.io/anything-ai/

---

## 七、文件排除策略

### 需要排除的内容
- `indexes/**` - 生成的索引文件
- `scripts/**` - 构建脚本
- `0-start-here/_templates/**` - 内容模板
- `docs/superpowers/**` - 设计文档
- `PROGRESS.md` - 进度追踪
- `CLAUDE.md` - 项目规则
- `node_modules/**` - 依赖包

### 排除原因
- 保持网站内容纯净
- 避免冗余页面
- 保护内部文档

---

## 八、性能优化

### VitePress内置优化
- ✅ 代码分割
- ✅ 静态资源压缩
- ✅ 预加载关键资源
- ✅ 懒加载图片

### 可选优化（后续）
- 图片压缩和WebP转换
- CDN加速
- Service Worker缓存

---

## 九、后续扩展

### Phase 2（可选）
1. **自定义域名**
   - 绑定独立域名
   - 配置DNS解析

2. **Algolia搜索**
   - 更快的搜索体验
   - 需要申请DocSearch

3. **Google Analytics**
   - 流量分析
   - 用户行为追踪

4. **自定义主题**
   - 品牌色定制
   - 自定义组件

---

## 十、维护说明

### 日常维护
- 添加新内容：直接创建.md文件
- 更新导航：修改`.vitepress/config.mts`
- 重新部署：push到main分支自动触发

### 版本控制
- 配置文件纳入Git版本控制
- `.vitepress/dist/` 目录不提交（自动生成）
- `.vitepress/cache/` 目录不提交

---

## 十一、关键决策记录

### 决策1：使用GitHub Pages默认域名
- **理由**：免费、简单、自动HTTPS
- **备选**：自定义域名（后续可迁移）

### 决策2：保留现有目录结构
- **理由**：无需重构、易于维护
- **备选**：重新组织内容（成本高）

### 决策3：VitePress默认主题
- **理由**：开箱即用、专业美观
- **备选**：自定义主题（工作量大）

### 决策4：全局侧边栏
- **理由**：方便用户跨章节浏览
- **备选**：局部侧边栏（需要多次点击）

### 决策5：本地搜索
- **理由**：免费、简单、无需申请
- **备选**：Algolia搜索（更快但需申请）

### 决策6：保持README作为首页
- **理由**：内容丰富、项目介绍完整
- **备选**：创建简洁首页（需要重新设计）

---

## 十二、风险评估

### 潜在风险
1. **构建时间过长**
   - 风险：内容增多后构建时间变长
   - 缓解：GitHub Actions有足够的构建时间

2. **搜索性能**
   - 风险：本地搜索在内容多时可能较慢
   - 缓解：后续可迁移到Algolia

3. **文件路径变化**
   - 风险：URL路径与文件路径不一致
   - 缓解：遵循VitePress路由规则

### 应对策略
- 监控GitHub Actions构建时间
- 收集用户反馈优化体验
- 定期review配置文件

---

## 十三、验收标准

### 功能验收
- ✅ 网站可以通过 https://konglong87.github.io/anything-ai/ 访问
- ✅ 中英文可以正常切换
- ✅ 所有导航链接正常工作
- ✅ 本地搜索功能正常
- ✅ 移动端显示正常
- ✅ 深色模式正常切换

### 性能验收
- ✅ 首页加载时间 < 3秒
- ✅ 页面切换流畅
- ✅ 搜索响应时间 < 500ms

### 内容验收
- ✅ 所有内容文件正确渲染
- ✅ Frontmatter元数据正确显示
- ✅ 排除文件不显示在网站上

---

**设计完成日期**：2026-03-20
**下一步**：创建实施计划