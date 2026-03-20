# Anything-AI 项目实施计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 搭建一个系统性的AI知识索引项目，包含完整的目录结构、内容系统、导航系统、自动化工具和社区协作配置。

**Architecture:** 采用混合矩阵式架构，旅程式分层（0-4阶段）+ 角色顶层入口 + 六维标签系统。使用Markdown + YAML Frontmatter作为内容格式，Node.js脚本实现自动化，渐进式构建。

**Tech Stack:** Markdown, YAML, Node.js, npm, VitePress（可选）, GitHub Actions

---

## 文件结构规划

### 目录树（初期核心）

```
anything-ai/
├── README.md                          # 项目主入口
├── README.en.md                       # 英文版主入口
├── package.json                       # npm配置
├── .gitignore                         # Git忽略配置
│
├── 0-start-here/                      # 新手入口
│   ├── README.md
│   ├── README.en.md
│   ├── what-is-ai.md
│   ├── ai-anxiety.md
│   ├── learning-path.md
│   └── _templates/
│       ├── concept-template.md
│       ├── tool-guide-template.md
│       └── case-template.md
│
├── 1-understand-ai/                   # AI原理
│   ├── README.md
│   └── README.en.md
│
├── 2-choose-tools/                    # 工具矩阵
│   ├── README.md
│   ├── README.en.md
│   ├── tool-matrix.md
│   └── tools/
│       └── .gitkeep
│
├── roles/                             # 行业角色
│   ├── README.md
│   ├── README.en.md
│   ├── programmer/
│   │   ├── README.md
│   │   └── README.en.md
│   └── content-creator/
│       ├── README.md
│       └── README.en.md
│
├── 4-advanced-topics/                 # 进阶主题
│   ├── README.md
│   └── README.en.md
│
├── prompts/                           # 提示词库
│   ├── README.md
│   └── .gitkeep
│
├── resources/                         # 外部资源
│   ├── README.md
│   └── awesome-lists.md
│
├── indexes/                           # 自动生成的索引
│   └── .gitkeep
│
├── scripts/                           # 自动化脚本
│   ├── lib/
│   │   └── .gitkeep
│   └── package.json
│
├── docs/                              # 设计文档
│   └── superpowers/
│       ├── specs/
│       │   └── 2026-03-20-anything-ai-design.md
│       └── plans/
│           └── 2026-03-20-anything-ai-implementation.md
│
└── .github/                           # GitHub配置
    ├── CONTRIBUTING.md
    ├── PULL_REQUEST_TEMPLATE.md
    └── ISSUE_TEMPLATE/
        └── content-request.yml
```

---

## Chunk 1: 项目初始化与基础结构

### Task 1: 初始化Git和基础配置

**Files:**
- Create: `.gitignore`
- Create: `package.json`

- [ ] **Step 1: 创建 .gitignore**

```gitignore
# Dependencies
node_modules/
package-lock.json

# Build outputs
dist/
.vitepress/dist/
.vitepress/cache/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
*.log
npm-debug.log*

# Environment
.env
.env.local
```

- [ ] **Step 2: 创建 package.json**

```json
{
  "name": "anything-ai",
  "version": "0.1.0",
  "description": "系统性AI知识索引 - 帮助人们认识、理解和驾驭AI",
  "keywords": [
    "ai",
    "artificial-intelligence",
    "knowledge-base",
    "learning",
    "prompts",
    "llm"
  ],
  "author": "Anything-AI Community",
  "license": "MIT",
  "scripts": {
    "index": "node scripts/generate-index.js",
    "check": "node scripts/check-frontmatter.js",
    "check:links": "node scripts/check-links.js",
    "stats": "node scripts/stats.js",
    "build": "npm run check && npm run index",
    "test": "echo \"No tests yet\" && exit 0"
  },
  "devDependencies": {
    "gray-matter": "^4.0.3",
    "marked": "^12.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

- [ ] **Step 3: 创建基础目录结构**

```bash
mkdir -p 0-start-here/_templates
mkdir -p 1-understand-ai
mkdir -p 2-choose-tools/tools
mkdir -p roles/programmer
mkdir -p roles/content-creator
mkdir -p 4-advanced-topics
mkdir -p prompts
mkdir -p resources
mkdir -p indexes
mkdir -p scripts/lib
mkdir -p docs/superpowers/{specs,plans}
mkdir -p .github/ISSUE_TEMPLATE
mkdir -p assets/images
```

- [ ] **Step 4: 初始化Git仓库**

```bash
git init
git add .gitignore package.json
git commit -m "chore: initialize project with basic structure"
```

---

### Task 2: 创建主README文件

**Files:**
- Create: `README.md`
- Create: `README.en.md`

- [ ] **Step 1: 创建中文主README**

创建 `README.md`:

```markdown
# 🤖 Anything-AI

> **系统性AI知识索引 - 帮助人们认识、理解和驾驭AI**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 🎯 项目愿景

**Anything is AI, AI Native, Agent Native**

这是一个开放的知识库，旨在帮助每个人：
- 🌱 **系统认识AI** - 不被碎片化信息误导
- 🧠 **深入理解AI** - 掌握原理，避免盲目崇拜
- 🛠️ **实践应用AI** - 在工作中提升效率
- 🎯 **驾驭AI工具** - 不被AI焦虑裹挟

**核心理念**：实践出真知，时间是检验真理的唯一标准

---

## 🗺️ 快速导航

### 👥 按角色找内容

| 角色 | 核心场景 | 推荐工具 | 快速入口 |
|------|---------|---------|---------|
| 👨‍💻 程序员 | 代码助手、代码审查、TDD | Claude, Codex | [程序员专区](./roles/programmer/) |
| ✍️ 内容创作者 | 爆款标题、文章写作、视频 | DeepSeek, 豆包 | [创作者专区](./roles/content-creator/) |
| 👨‍🏫 教师 | 备课、出题、个性化教学 | ChatGPT, Claude | [教师专区](./roles/teacher/) |
| 🎓 学生 | 学习辅助、笔记整理 | MIC, ChatGPT | [学生专区](./roles/student/) |
| 📊 财务 | 报表分析、数据处理 | DeepSeek, 豆包 | [财务专区](./roles/finance/) |
| [更多角色...](./roles/) | | | |

### 🎯 按目标找内容

- 🌱 **我是新手，想了解AI** → [从这里开始](./0-start-here/)
- 🧠 **我想深入理解AI原理** → [理解AI](./1-understand-ai/)
- 🛠️ **我要选择合适的AI工具** → [工具矩阵](./2-choose-tools/)
- 🚀 **我想成为AI应用专家** → [进阶主题](./4-advanced-topics/)
- 💡 **我需要提示词模板** → [提示词库](./prompts/)

### 🔧 按工具找场景

| 工具 | 最擅长场景 | 详细指南 |
|------|----------|---------|
| Claude | 技术架构、深度推理 | [Claude使用指南](./2-choose-tools/tools/claude/) |
| DeepSeek | 文案创作、逻辑分析 | [DeepSeek使用指南](./2-choose-tools/tools/deepseek/) |
| ChatGPT | 通用对话、日常任务 | [ChatGPT使用指南](./2-choose-tools/tools/chatgpt/) |
| 豆包 | 文档整理、日常娱乐 | [豆包使用指南](./2-choose-tools/tools/doubao/) |
| [更多工具...](./2-choose-tools/) | | |

---

## 📚 内容特色

### ✅ 我们提供什么

- **通俗易读** - 用比喻代替术语，用故事代替概念
- **实践导向** - 每个知识点都配实际案例和可复用提示词
- **中立客观** - 承认AI局限性，不神话不妖魔化
- **交叉验证** - 标注如何验证AI输出的准确性
- **时效标注** - 重要信息标注更新时间

### 🎯 初期核心内容

1. **AI认知入门** - 建立正确心态，减少焦虑
2. **工具选择矩阵** - 快速找到最适合你的AI工具
3. **行业应用案例** - 各行业如何实际使用AI提升效率

---

## 🤝 如何贡献

我们欢迎所有形式的贡献！

- 📝 补充行业应用案例
- 🛠️ 添加AI工具介绍
- 💡 贡献高质量提示词
- 🌍 翻译英文版本
- 🐛 指出过时或不准确的信息

详见 [贡献指南](./.github/CONTRIBUTING.md)

---

## 📊 项目状态

🚧 **项目处于初期搭建阶段** - 核心内容持续完善中

当前进度：
- [x] 项目架构设计
- [x] 目录结构搭建
- [ ] 核心内容填充（进行中）
- [ ] 自动化工具开发
- [ ] 社区协作流程

---

## 📜 License

MIT License - 自由使用、修改和分发

---

## 🙏 致谢

感谢所有贡献者的付出！

### 参考资源

本项目从以下优秀资源中汲取灵感：
- [awesome-chatgpt-prompts-zh](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)
- [awesome-ai-painting](https://github.com/hua1995116/awesome-ai-painting)
- [awesome-generative-ai-guide](https://github.com/aishwaryanr/awesome-generative-ai-guide)
- [prompts.chat](https://github.com/f/prompts.chat)
- [awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps)
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)

---

**让我们一起，认识AI，理解AI，驾驭AI！** 🚀
```

- [ ] **Step 2: 创建英文主README**

创建 `README.en.md`:

```markdown
# 🤖 Anything-AI

> **A Systematic AI Knowledge Index - Helping People Understand and Master AI**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## 🎯 Vision

**Anything is AI, AI Native, Agent Native**

This is an open knowledge base designed to help everyone:
- 🌱 **Systematically Understand AI** - Not misled by fragmented information
- 🧠 **Deeply Grasp AI Principles** - Master the fundamentals, avoid blind worship
- 🛠️ **Practically Apply AI** - Boost efficiency in your work
- 🎯 **Master AI Tools** - Free from AI anxiety

**Core Philosophy**: Practice brings true knowledge, time is the ultimate test of truth

---

## 🗺️ Quick Navigation

### 👥 Browse by Role

| Role | Core Scenarios | Recommended Tools | Quick Access |
|------|---------------|------------------|--------------|
| 👨‍💻 Programmer | Code Assistant, Code Review, TDD | Claude, Codex | [Programmer Zone](./roles/programmer/) |
| ✍️ Content Creator | Viral Titles, Article Writing, Video | DeepSeek, Doubao | [Creator Zone](./roles/content-creator/) |
| 👨‍🏫 Teacher | Lesson Prep, Quiz Creation, Personalized Teaching | ChatGPT, Claude | [Teacher Zone](./roles/teacher/) |
| 🎓 Student | Study Assistant, Note Organization | MIC, ChatGPT | [Student Zone](./roles/student/) |
| 📊 Finance | Report Analysis, Data Processing | DeepSeek, Doubao | [Finance Zone](./roles/finance/) |
| [More Roles...](./roles/) | | | |

### 🎯 Browse by Goal

- 🌱 **I'm new, want to learn about AI** → [Start Here](./0-start-here/)
- 🧠 **I want to understand AI principles deeply** → [Understand AI](./1-understand-ai/)
- 🛠️ **I need to choose the right AI tool** → [Tool Matrix](./2-choose-tools/)
- 🚀 **I want to become an AI expert** → [Advanced Topics](./4-advanced-topics/)
- 💡 **I need prompt templates** → [Prompt Library](./prompts/)

### 🔧 Browse by Tool

| Tool | Best For | Guide |
|------|----------|-------|
| Claude | Technical Architecture, Deep Reasoning | [Claude Guide](./2-choose-tools/tools/claude/) |
| DeepSeek | Content Creation, Logical Analysis | [DeepSeek Guide](./2-choose-tools/tools/deepseek/) |
| ChatGPT | General Conversation, Daily Tasks | [ChatGPT Guide](./2-choose-tools/tools/chatgpt/) |
| Doubao | Document Organization, Daily Entertainment | [Doubao Guide](./2-choose-tools/tools/doubao/) |
| [More Tools...](./2-choose-tools/) | | |

---

## 📚 Content Features

### ✅ What We Provide

- **Easy to Read** - Metaphors over jargon, stories over concepts
- **Practice-Oriented** - Every concept comes with real cases and reusable prompts
- **Neutral & Objective** - Acknowledge AI limitations, neither mythologize nor demonize
- **Cross-Validation** - Mark how to verify AI outputs
- **Time-Sensitive** - Important information labeled with update dates

### 🎯 Initial Core Content

1. **AI Cognition Basics** - Build the right mindset, reduce anxiety
2. **Tool Selection Matrix** - Quickly find the best AI tool for you
3. **Industry Application Cases** - How various industries actually use AI to boost efficiency

---

## 🤝 How to Contribute

We welcome all forms of contribution!

- 📝 Add industry application cases
- 🛠️ Introduce AI tools
- 💡 Contribute high-quality prompts
- 🌍 Translate to English
- 🐛 Point out outdated or inaccurate information

See [Contributing Guide](./.github/CONTRIBUTING.md)

---

## 📊 Project Status

🚧 **Project in Early Stage** - Core content being actively developed

Current Progress:
- [x] Project architecture design
- [x] Directory structure setup
- [ ] Core content filling (in progress)
- [ ] Automation tools development
- [ ] Community collaboration process

---

## 📜 License

MIT License - Free to use, modify, and distribute

---

## 🙏 Acknowledgments

Thanks to all contributors!

### References

This project draws inspiration from these excellent resources:
- [awesome-chatgpt-prompts-zh](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)
- [awesome-ai-painting](https://github.com/hua1995116/awesome-ai-painting)
- [awesome-generative-ai-guide](https://github.com/aishwaryanr/awesome-generative-ai-guide)
- [prompts.chat](https://github.com/f/prompts.chat)
- [awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps)
- [awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)

---

**Let's understand, master, and harness AI together!** 🚀
```

- [ ] **Step 3: 提交主README文件**

```bash
git add README.md README.en.md
git commit -m "docs: add main README files (Chinese and English)"
```

---

## Chunk 2: 内容模板系统

### Task 3: 创建内容模板

**Files:**
- Create: `0-start-here/_templates/concept-template.md`
- Create: `0-start-here/_templates/tool-guide-template.md`
- Create: `0-start-here/_templates/case-template.md`

- [ ] **Step 1: 创建概念解释模板**

创建 `0-start-here/_templates/concept-template.md`:

```markdown
---
title: "{概念名称}"
title_en: "{Concept Name}"
difficulty: beginner           # beginner/intermediate/advanced
roles: [everyone]              # everyone/programmer/creator/teacher/student/...
type: concept                  # concept/tutorial/guide/case/tool-reference
duration: 10min                # 5min/15min/30min/1hour
tools: []                      # 涉及的工具: chatgpt/claude/deepseek/gemini/...
prerequisites: []              # 前置知识，如: ["0-start-here/what-is-ai"]
tags: []                       # 自由标签

author: "Your Name"
created: 2026-03-20
updated: 2026-03-20
version: 1.0
---

# {概念名称}

> 一句话通俗解释这个概念

## 🤔 这个概念是什么

（用比喻和生活化的语言解释，避免术语堆砌。100-200字）

**通俗理解**：
把AI想象成一个...

**技术定义**（可选）：
从技术角度看，...

## 📖 为什么重要

（说明这个概念的实际价值，为什么需要理解它）

1. **实际价值**：...
2. **应用场景**：...
3. **理解必要性**：...

## 🎯 如何应用

### 适用场景

- ✅ 场景1：xxx
- ✅ 场景2：xxx
- ❌ 不适用：xxx

### 实际案例

**场景**：xxx

**应用方式**：
```
具体操作步骤或提示词
```

**效果**：xxx

### 最佳实践

1. 实践建议1
2. 实践建议2

## ⚠️ 常见误解

- ❌ **误解1**：xxx
  - ✅ **正确理解**：xxx

- ❌ **误解2**：xxx
  - ✅ **正确理解**：xxx

## 📅 时效性说明

> 📅 本文最后更新于 2026-03-20
>
> AI领域发展迅速，部分信息可能已过时，请结合最新资料阅读。

## 🔗 延伸阅读

### 前置知识
- [前置概念1](../xxx.md) - 为什么需要先了解这个

### 相关概念
- [相关概念1](../xxx.md) - 与本概念的关系
- [相关概念2](../xxx.md) - 如何结合使用

### 深入学习
- [深入教程](../../1-understand-ai/xxx/) - 更详细的技术解读
- [实战案例](../../roles/xxx/) - 如何在实际中应用

---

**💡 提示**：本模板用于解释核心概念，重点在于通俗性和实践性。
```

- [ ] **Step 2: 创建工具指南模板**

创建 `0-start-here/_templates/tool-guide-template.md`:

```markdown
---
title: "{工具名称} 使用指南"
title_en: "{Tool Name} User Guide"
difficulty: beginner
roles: [everyone]
type: tool-reference
duration: 15min
tools: [{tool-id}]           # 如: [chatgpt]/[claude]/[deepseek]
prerequisites: ["2-choose-tools/tool-matrix"]
tags: [tool, guide]

author: "Your Name"
created: 2026-03-20
updated: 2026-03-20
version: 1.0
---

# {工具名称} 使用指南

> 一句话概括这个工具最擅长什么

## 🎯 最擅长什么

（3-5个最佳使用场景）

1. **场景1**：xxx
   - 为什么擅长：...
   - 效果：...

2. **场景2**：xxx
   为什么擅长：...
   效果：...

## 📊 对比其他工具

| 维度 | 本工具 | 竞品A | 竞品B |
|------|-------|-------|-------|
| 价格 | 免费/付费 | | |
| 速度 | 快/中/慢 | | |
| 质量 | 优/良/中 | | |
| 中文支持 | 好/中/差 | | |
| 推荐场景 | xxx | xxx | xxx |

**选择建议**：
- 选本工具的情况：...
- 选竞品A的情况：...

## 🚀 快速开始

### 1. 注册和访问

**访问地址**：https://xxx.com

**注册步骤**：
1. 步骤1
2. 步骤2

**免费额度**：xxx

### 2. 基础使用

**第一个提示词**：
```
你好，请介绍一下你自己
```

**预期回复**：...

### 3. 进阶技巧

**技巧1**：xxx
```
具体提示词或操作
```

## 💡 最佳实践

### 场景1：xxx

**问题**：xxx

**解决方案**：
```
提示词模板
```

**注意事项**：
- ⚠️ 注意点1
- ⚠️ 注意点2

**实际案例**：
用户xxx用这个方法实现了...

### 场景2：xxx

（类似结构）

## ⚠️ 局限性

### 已知问题

1. **问题1**：xxx
   - 影响：...
   - 规避方法：...

2. **问题2**：xxx
   - 影响：...
   - 规避方法：...

### 不适用场景

- ❌ 场景1：xxx
  原因：...
  替代方案：...

- ❌ 场景2：xxx
  原因：...
  替代方案：...

## 📅 更新日志

- 2026-03-20: xxx版本发布，新增xxx功能
- 2026-02-15: xxx版本发布，改进xxx

> 📅 本文最后更新于 2026-03-20
>
> 工具迭代很快，部分信息可能已过时，请查看官方最新公告。

## 🔗 相关资源

### 官方资源
- 官网：xxx
- 文档：xxx
- API文档：xxx

### 社区资源
- [Awesome Lists中的相关条目](../../resources/awesome-lists.md)
- [提示词库：本工具场景](../../prompts/by-tool/{tool-id}/)

### 对比阅读
- [工具选择矩阵](../tool-matrix.md) - 全面对比
- [其他工具指南](../) - 了解更多工具

---

**💡 提示**：本模板专注于工具的实用指南，重点说明"何时用、怎么用、注意什么"。
```

- [ ] **Step 3: 创建行业案例模板**

创建 `0-start-here/_templates/case-template.md`:

```markdown
---
title: "{行业/角色}如何用AI提升效率"
title_en: "How {Industry/Role} Can Boost Efficiency with AI"
difficulty: beginner
roles: [{role-id}]           # 如: [programmer]/[content-creator]/[teacher]
type: case
duration: 30min
tools: [chatgpt, claude]     # 本案例使用的工具
prerequisites: ["0-start-here/what-is-ai", "2-choose-tools/tool-matrix"]
tags: [industry-case, practical]

author: "Your Name"
created: 2026-03-20
updated: 2026-03-20
version: 1.0
---

# {行业/角色}如何用AI提升效率

> 一句话总结：AI能为这个行业带来什么价值

## 🎯 核心价值

**效率提升**：xxx倍

**主要收益**：
1. 收益1：xxx
2. 收益2：xxx

**适合人群**：
- xxx（新手/资深）
- xxx（xxx岗位）

## 📋 典型工作流

### 任务1：{具体任务名称}

**传统方式**：
1. 步骤1（耗时：xxx）
2. 步骤2（耗时：xxx）
3. 步骤3（耗时：xxx）
4. **总耗时**：xxx小时

**AI辅助方式**：
1. 步骤1：xxx（用AI做什么）
   - **提示词**：
     ```
     具体的提示词
     ```

2. 步骤2：xxx（人工做什么）

3. 步骤3：xxx（用AI做什么）

4. **总耗时**：xxx分钟

**效果对比**：
- ⏱️ 时间节省：xxx%
- 📈 质量提升：xxx
- 💡 其他收益：xxx

**注意事项**：
- ⚠️ 注意点1：xxx
- ⚠️ 注意点2：xxx

---

### 任务2：{具体任务名称}

（类似结构）

---

### 任务3：{具体任务名称}

（类似结构）

---

## 🛠️ 推荐工具组合

### 核心工具

**工具A**（用于xxx）
- 为什么选它：...
- 使用场景：...

**工具B**（用于xxx）
- 为什么选它：...
- 使用场景：...

### 辅助工具

**工具C**（用于xxx）
- 作用：...

### 工具选择决策树

```
是否需要xxx？
├─ 是 → 使用工具A
└─ 否 → 是否需要xxx？
         ├─ 是 → 使用工具B
         └─ 否 → 使用工具C
```

## ⚠️ 避坑指南

### 坑1：xxx

**问题描述**：xxx

**如何避免**：
1. 方法1：xxx
2. 方法2：xxx

**案例**：
有人xxx，导致xxx，后来通过xxx解决了。

### 坑2：xxx

（类似结构）

### 坑3：过度依赖AI

**问题**：xxx

**正确做法**：
- ✅ AI辅助 + 人工审核
- ✅ 关键决策人工把关
- ✅ 建立验证机制

## 📊 ROI分析

### 投入

- 学习时间：xxx小时
- 工具成本：xxx元/月（或免费）
- 整合成本：xxx

### 收益

- 时间节省：xxx小时/月
- 质量提升：xxx
- 其他收益：xxx

**回本周期**：xxx个月

## 🎓 学习路径

### 新手阶段（第1周）

**目标**：掌握基础用法

**任务**：
- [ ] 学习任务1
- [ ] 学习任务2

**预期成果**：xxx

### 进阶阶段（第2-4周）

**目标**：xxx

**任务**：
- [ ] 学习任务1
- [ ] 学习任务2

**预期成果**：xxx

### 精通阶段（1-3个月）

**目标**：xxx

**任务**：
- [ ] 学习任务1
- [ ] 学习任务2

**预期成果**：xxx

## 🔗 相关资源

### 提示词模板
- [本行业提示词库](../../prompts/by-role/{role-id}/) - 可直接复用
- [通用提示词技巧](../../4-advanced-topics/prompt-engineering/) - 提升效果

### 深入学习
- [理解AI原理](../../1-understand-ai/) - 知其然知其所以然
- [工具详细指南](../../2-choose-tools/tools/) - 深入掌握工具

### 社区案例
- [其他行业案例](../) - 跨界学习

---

**💡 提示**：本模板专注于实用性，每个案例都要有明确的"用时、效果、注意事项"。
```

- [ ] **Step 4: 提交模板文件**

```bash
git add 0-start-here/_templates/
git commit -m "docs: add content templates (concept, tool-guide, case)"
```

---

### Task 4: 创建各阶段README

**Files:**
- Create: `0-start-here/README.md`
- Create: `0-start-here/README.en.md`
- Create: `1-understand-ai/README.md`
- Create: `1-understand-ai/README.en.md`
- Create: `2-choose-tools/README.md`
- Create: `2-choose-tools/README.en.md`
- Create: `roles/README.md`
- Create: `roles/README.en.md`
- Create: `4-advanced-topics/README.md`
- Create: `4-advanced-topics/README.en.md`

- [ ] **Step 1: 创建 0-start-here 中文README**

创建 `0-start-here/README.md`:

```markdown
---
title: "从这里开始：AI认知入门"
difficulty: beginner
roles: [everyone]
type: guide
duration: 30min
---

# 🌱 从这里开始：AI认知入门

> 零基础友好，5分钟建立正确的AI认知

## 🎯 这个阶段帮你解决什么问题

- ❓ AI到底是什么？会不会取代我？
- 😰 为什么大家都在谈AI焦虑？
- 🤔 我应该从哪里开始学习AI？
- 🚀 如何正确看待和使用AI？

**阅读完本阶段内容，你将**：
- ✅ 建立正确的AI认知
- ✅ 摆脱AI焦虑
- ✅ 明确学习路径
- ✅ 准备好开始实践

---

## 📚 核心内容

### 必读（15分钟）

1. **[AI是什么](./what-is-ai.md)** - 5分钟
   - 通俗理解AI的本质
   - AI能做什么，不能做什么
   - 用一个比喻彻底理解AI

2. **[为什么不需要AI焦虑](./ai-anxiety.md)** - 5分钟
   - AI焦虑的来源
   - 为什么不需要焦虑
   - 如何正确看待AI

3. **[学习路径总览](./learning-path.md)** - 5分钟
   - 系统学习AI的路线图
   - 各阶段目标
   - 如何选择适合你的路径

### 延伸阅读（可选）

- [AI常见误解](./ai-myths.md) - 避免踩坑
- [AI发展简史](./ai-history.md) - 了解背景
- [AI术语速查](./ai-glossary.md) - 快速查阅

---

## 🎓 学习建议

### 时间安排

- **快速通道**：15分钟读完核心3篇文章
- **标准通道**：30分钟读完全部内容
- **深度通道**：1小时 + 动手实践

### 学习顺序

```
开始
  ↓
AI是什么
  ↓
不需要AI焦虑
  ↓
学习路径总览
  ↓
选择你的下一步
```

### 实践建议

1. **边读边思考**：每个概念都联系你的实际工作
2. **不要急于求成**：建立正确认知比快速掌握工具更重要
3. **保持开放心态**：AI在快速发展，保持学习

---

## 🚀 下一步

### 根据你的目标选择：

**我想快速上手用AI** → [工具选择矩阵](../2-choose-tools/)
- 了解主流AI工具
- 找到适合你的工具组合

**我想深入理解AI原理** → [理解AI原理](../1-understand-ai/)
- LLM是如何工作的
- AI为什么会犯错
- Agent是什么

**我想看实际应用案例** → [行业应用案例](../roles/)
- 选择你的行业
- 看看同行如何用AI

**我想直接用提示词** → [提示词库](../prompts/)
- 按场景查找
- 按角色查找

---

## 💬 常见问题

### Q: 我完全没有技术背景，能学会吗？

**A:** 完全可以！本阶段专门为零基础设计，用通俗语言解释概念，不涉及技术细节。

### Q: 学完这些就能在工作中用AI了吗？

**A:** 本阶段帮你建立认知基础。要在工作中使用，还需要：
1. 选择合适的工具（阶段2）
2. 学习行业案例（roles/）
3. 实践练习

### Q: AI发展这么快，这些内容会不会过时？

**A:** 本阶段讲的是AI的本质和正确认知，这些相对稳定。具体工具会更新，但思维方式长期有效。

---

## 📅 更新日志

- 2026-03-20: 初版发布

---

**准备好了吗？让我们从 [AI是什么](./what-is-ai.md) 开始！** 🚀
```

- [ ] **Step 2: 创建 0-start-here 英文README**

创建 `0-start-here/README.en.md`:

```markdown
---
title: "Start Here: AI Cognition Basics"
difficulty: beginner
roles: [everyone]
type: guide
duration: 30min
---

# 🌱 Start Here: AI Cognition Basics

> Beginner-friendly, build the right AI mindset in 5 minutes

## 🎯 What This Stage Helps You With

- ❓ What exactly is AI? Will it replace me?
- 😰 Why is everyone talking about AI anxiety?
- 🤔 Where should I start learning about AI?
- 🚀 How should I view and use AI correctly?

**After completing this stage, you will**:
- ✅ Build correct AI cognition
- ✅ Overcome AI anxiety
- ✅ Understand the learning path
- ✅ Be ready to start practicing

---

## 📚 Core Content

### Must Read (15 minutes)

1. **[What is AI](./what-is-ai.en.md)** - 5 min
   - Understand AI's essence in plain language
   - What AI can and cannot do
   - A metaphor to fully grasp AI

2. **[Why You Don't Need AI Anxiety](./ai-anxiety.en.md)** - 5 min
   - Where AI anxiety comes from
   - Why you don't need to be anxious
   - How to view AI correctly

3. **[Learning Path Overview](./learning-path.en.md)** - 5 min
   - Roadmap for systematic AI learning
   - Stage-by-stage goals
   - How to choose your path

### Extended Reading (Optional)

- [Common AI Misconceptions](./ai-myths.en.md) - Avoid pitfalls
- [Brief History of AI](./ai-history.en.md) - Background context
- [AI Glossary](./ai-glossary.en.md) - Quick reference

---

## 🎓 Learning Tips

### Time Allocation

- **Fast Track**: 15 minutes for 3 core articles
- **Standard Track**: 30 minutes for all content
- **Deep Track**: 1 hour + hands-on practice

### Learning Sequence

```
Start
  ↓
What is AI
  ↓
No AI Anxiety
  ↓
Learning Path Overview
  ↓
Choose Your Next Step
```

### Practice Suggestions

1. **Think While Reading**: Connect each concept to your actual work
2. **Don't Rush**: Building correct cognition is more important than quickly mastering tools
3. **Stay Open-minded**: AI is developing rapidly, keep learning

---

## 🚀 Next Steps

### Choose Based on Your Goal:

**I want to quickly start using AI** → [Tool Selection Matrix](../2-choose-tools/)
- Learn about mainstream AI tools
- Find the tool combination that suits you

**I want to deeply understand AI principles** → [Understand AI Principles](../1-understand-ai/)
- How LLMs work
- Why AI makes mistakes
- What is an Agent

**I want to see real application cases** → [Industry Application Cases](../roles/)
- Choose your industry
- See how peers use AI

**I want to use prompts directly** → [Prompt Library](../prompts/)
- Browse by scenario
- Browse by role

---

## 💬 FAQ

### Q: I have no technical background at all. Can I learn this?

**A:** Absolutely! This stage is specifically designed for beginners, explaining concepts in plain language without technical details.

### Q: After learning this, can I use AI in my work?

**A:** This stage builds your cognitive foundation. To use AI in work, you also need to:
1. Choose appropriate tools (Stage 2)
2. Learn industry cases (roles/)
3. Practice

### Q: AI develops so fast, will this content become outdated?

**A:** This stage covers AI's essence and correct cognition, which are relatively stable. Specific tools will update, but the mindset remains valuable long-term.

---

## 📅 Update Log

- 2026-03-20: Initial release

---

**Ready? Let's start with [What is AI](./what-is-ai.en.md)!** 🚀
```

- [ ] **Step 3: 提交阶段README文件**

```bash
git add 0-start-here/README.md 0-start-here/README.en.md
git commit -m "docs: add stage 0 (start-here) README files"
```

- [ ] **Step 4: 创建 1-understand-ai README**

创建 `1-understand-ai/README.md`:

```markdown
---
title: "理解AI：深入原理"
difficulty: intermediate
roles: [everyone]
type: guide
duration: 2hour
---

# 🧠 理解AI：深入原理

> 知其然，知其所以然

## 🎯 这个阶段帮你解决什么问题

- 🤔 AI到底是怎么工作的？
- 🧩 Transformer、Attention是什么意思？
- 🎭 AI为什么会"说谎"（幻觉）？
- 🤖 Agent和LLM有什么区别？

**完成本阶段学习，你将**：
- ✅ 理解LLM的核心原理
- ✅ 掌握关键概念的含义
- ✅ 理解AI的能力边界
- ✅ 能判断AI输出的可靠性

---

## 📚 核心内容

### 基础篇（60分钟）

1. **[LLM基础：Transformer](./llm-basics/transformer.md)** - 20分钟
   - Transformer架构简介
   - 为什么是革命性的
   - 通俗理解Attention机制

2. **[AI如何"思考"](./how-ai-thinks/context-window.md)** - 20分钟
   - 上下文窗口是什么
   - AI如何处理信息
   - 记忆和遗忘

3. **[AI的局限性](./how-ai-thinks/hallucination.md)** - 20分钟
   - 为什么会有幻觉
   - AI不理解，只是在预测
   - 如何识别AI的错误

### 进阶篇（60分钟）

4. **[Agent是什么](./agent-intro/what-is-agent.md)** - 20分钟
   - Agent vs LLM
   - Agent的组成：记忆+推理+工具
   - 实际应用场景

5. **[预训练和微调](./llm-basics/pretraining.md)** - 20分钟
   - AI是如何训练出来的
   - 预训练学到了什么
   - 微调改变了什么

6. **[向量空间和Embedding](./llm-basics/embedding.md)** - 20分钟
   - AI如何理解语义
   - 为什么AI能做类比
   - 向量检索的原理

---

## 🎓 学习路径建议

### 技术背景用户
按顺序学习所有内容 → 尝试解释给别人听 → 实践应用

### 非技术背景用户
优先学习：
1. LLM基础（通俗版）
2. AI的局限性
3. Agent是什么

跳过技术细节，重点理解"为什么这样设计"

---

## 🚀 前置要求

建议先完成：
- [AI是什么](../0-start-here/what-is-ai.md)
- [不需要AI焦虑](../0-start-here/ai-anxiety.md)

---

## 📅 更新日志

- 2026-03-20: 初版发布
```

创建 `1-understand-ai/README.en.md`:

```markdown
---
title: "Understand AI: Deep Principles"
difficulty: intermediate
roles: [everyone]
type: guide
duration: 2hour
---

# 🧠 Understand AI: Deep Principles

> Know the what, understand the why

## 🎯 What This Stage Helps You With

- 🤔 How does AI actually work?
- 🧩 What do Transformer and Attention mean?
- 🎭 Why does AI "lie" (hallucination)?
- 🤖 What's the difference between Agent and LLM?

**After completing this stage, you will**:
- ✅ Understand LLM core principles
- ✅ Master key concept meanings
- ✅ Understand AI's capability boundaries
- ✅ Judge AI output reliability

---

## 📚 Core Content

### Basics (60 minutes)

1. **[LLM Basics: Transformer](./llm-basics/transformer.en.md)** - 20 min
   - Transformer architecture overview
   - Why it's revolutionary
   - Understanding Attention mechanism

2. **[How AI "Thinks"](./how-ai-thinks/context-window.en.md)** - 20 min
   - What is context window
   - How AI processes information
   - Memory and forgetting

3. **[AI Limitations](./how-ai-thinks/hallucination.en.md)** - 20 min
   - Why hallucinations happen
   - AI doesn't understand, it predicts
   - How to identify AI errors

### Advanced (60 minutes)

4. **[What is an Agent](./agent-intro/what-is-agent.en.md)** - 20 min
   - Agent vs LLM
   - Agent components: memory + reasoning + tools
   - Real-world applications

5. **[Pretraining and Fine-tuning](./llm-basics/pretraining.en.md)** - 20 min
   - How AI is trained
   - What pretraining learns
   - What fine-tuning changes

6. **[Vector Space and Embedding](./llm-basics/embedding.en.md)** - 20 min
   - How AI understands semantics
   - Why AI can do analogies
   - Vector retrieval principles

---

## 🎓 Learning Path Suggestions

### Technical Background Users
Learn all content in order → Try explaining to others → Apply in practice

### Non-technical Background Users
Prioritize:
1. LLM Basics (plain version)
2. AI Limitations
3. What is an Agent

Skip technical details, focus on "why designed this way"

---

## 🚀 Prerequisites

Recommended prior completion:
- [What is AI](../0-start-here/what-is-ai.en.md)
- [No AI Anxiety](../0-start-here/ai-anxiety.en.md)

---

## 📅 Update Log

- 2026-03-20: Initial release
```

- [ ] **Step 5: 创建 2-choose-tools README**

创建 `2-choose-tools/README.md`:

```markdown
---
title: "工具选择矩阵"
difficulty: beginner
roles: [everyone]
type: guide
duration: 15min
---

# 🛠️ 工具选择矩阵

> 找到最适合你的AI工具组合

## 🎯 这个阶段帮你解决什么问题

- 🤔 市面上这么多AI工具，该选哪个？
- 💰 哪些工具免费？哪些付费？值不值得？
- 🎯 我的使用场景下，哪个工具最好用？
- 🔄 能不能多个工具组合使用？

**完成本阶段，你将**：
- ✅ 了解主流AI工具的特点
- ✅ 掌握工具选择的方法论
- ✅ 找到适合你的工具组合
- ✅ 避免工具选择的常见坑

---

## 📊 核心工具矩阵

### 按场景选择

| 场景 | 首选工具 | 备选工具 | 说明 |
|------|---------|---------|------|
| 代码开发 | Claude | GPT-4, DeepSeek | Claude架构能力强，DeepSeek性价比高 |
| 文案写作 | DeepSeek | 豆包, Claude | DeepSeek创意好，豆包中文地道 |
| 日常对话 | 豆包 | ChatGPT | 豆包免费且好用，ChatGPT通用性强 |
| 技术问答 | Claude | GPT-4 | Claude推理深，GPT-4知识广 |
| 数据分析 | DeepSeek | Claude | DeepSeek逻辑强，Claude分析细 |
| 学习辅助 | ChatGPT | Claude | ChatGPT解释通俗，Claude深入 |

### 按角色选择

| 角色 | 推荐组合 | 理由 |
|------|---------|------|
| 程序员 | Claude (架构) + Codex (实现) | Claude设计强，Codex写代码稳 |
| 内容创作者 | DeepSeek (文案) + 豆包 (日常) | 创意+地道的完美组合 |
| 教师 | ChatGPT (备课) + Claude (出题) | 通俗易懂+逻辑严密 |
| 学生 | MIC (学习) + ChatGPT (问答) | 清华出品+通用助手 |
| 财务 | DeepSeek (分析) + 豆包 (报表) | 逻辑推理+文档处理 |

---

## 📚 详细指南

### 主流工具

1. **[Claude使用指南](./tools/claude/)** - 技术架构、深度推理之王
2. **[DeepSeek使用指南](./tools/deepseek/)** - 文案创作、性价比之选
3. **[ChatGPT使用指南](./tools/chatgpt/)** - 通用对话、生态完善
4. **[豆包使用指南](./tools/doubao/)** - 中文友好、完全免费
5. **[Gemini使用指南](./tools/gemini/)** - 多模态、Google生态
6. **[千问使用指南](./tools/qianwen/)** - 阿里出品、企业应用

---

## 🎓 选择方法论

### 第一步：明确需求

- **主要场景**：你要用AI做什么？
- **使用频率**：每天/每周/偶尔？
- **预算**：免费 vs 付费？
- **语言**：中文为主还是英文？

### 第二步：对照矩阵

根据场景和角色，查看上面的矩阵推荐

### 第三步：实际测试

- 用同样的提示词测试2-3个工具
- 比较输出质量、速度、体验
- 选择最顺手的

### 第四步：组合使用

不同工具组合，取长补短

---

## ⚠️ 常见误区

### ❌ 误区1：只追求最强模型

**问题**：最强不一定最适合

**正确做法**：
- 简单任务用简单模型
- 复杂任务用强模型
- 考虑成本和速度

### ❌ 误区2：频繁换工具

**问题**：每个工具都要学习成本

**正确做法**：
- 先精通1-2个主力工具
- 了解其他工具特点
- 必要时才切换

### ❌ 误区3：忽视工具迭代

**问题**：工具更新很快，评价可能过时

**正确做法**：
- 关注工具更新动态
- 定期重新评估
- 查看最新对比评测

---

## 🚀 下一步

- **选定工具后** → [学习行业案例](../roles/)
- **想深入原理** → [理解AI原理](../1-understand-ai/)
- **需要提示词** → [提示词库](../prompts/)

---

## 📅 更新日志

- 2026-03-20: 初版发布

> 📅 工具迭代很快，本文最后更新于 2026-03-20
>
> 建议查看各工具官网获取最新信息
```

创建对应的英文版 `2-choose-tools/README.en.md`

- [ ] **Step 6: 创建 roles README**

创建 `roles/README.md`:

```markdown
---
title: "行业应用案例库"
difficulty: beginner
roles: [everyone]
type: guide
duration: 10min
---

# 👥 行业应用案例库

> 看看同行如何用AI提升效率

## 🎯 快速找到你的行业

点击下方行业入口，查看专属应用案例：

### 💼 商业与技术

- [👨‍💻 程序员](./programmer/) - 代码助手、代码审查、TDD、Debug
- [📊 财务](./finance/) - 报表分析、数据处理、审计辅助
- [💼 销售](./sales/) - 客户沟通、提案撰写、数据分析
- [👥 HR](./hr/) - 招聘筛选、员工培训、制度文档

### 🎨 创意与内容

- [✍️ 内容创作者](./content-creator/) - 爆款标题、文章写作、视频脚本
- [🎨 UI设计师](./designer/) - 设计灵感、素材生成、设计文档

### 🎓 教育与学习

- [👨‍🏫 教师](./teacher/) - 备课、出题、个性化教学
- [🎓 学生](./student/) - 学习辅助、笔记整理、论文写作
- [📚 行政](./admin/) - 文档整理、会议纪要、报表制作

---

## 📋 每个行业案例包含

1. **典型工作流对比**
   - 传统方式 vs AI辅助方式
   - 具体的时间节省
   - 质量提升数据

2. **提示词模板**
   - 可直接复用
   - 经过实际验证
   - 效果显著

3. **推荐工具组合**
   - 该行业最佳工具搭配
   - 工具选择决策树

4. **避坑指南**
   - 常见错误
   - 注意事项
   - 最佳实践

---

## 🎯 如何使用这些案例

### 新手用户

1. 找到你的行业
2. 阅读"新手必读"部分
3. 按照模板尝试
4. 记录效果并调整

### 进阶用户

1. 学习其他行业的思路
2. 跨界借鉴方法
3. 组合创新应用
4. 分享你的案例

---

## 💡 没找到你的行业？

你可以：

1. **参考相似行业**
   - 工作内容相似即可借鉴

2. **提交需求**
   - [提交Issue](https://github.com/your-repo/issues)
   - 说明你的行业和需求

3. **贡献案例**
   - 分享你的实践经验
   - 帮助更多人

---

## 🔗 相关资源

- [提示词库](../prompts/) - 按场景和角色的提示词
- [工具选择](../2-choose-tools/) - 找到适合的工具
- [理解AI原理](../1-understand-ai/) - 深入了解为什么

---

## 📅 更新日志

- 2026-03-20: 初版发布，包含程序员、内容创作者案例
```

创建对应的英文版和提交命令...

---

## Chunk 3: 核心内容编写（0-start-here核心文章）

### Task 5: 编写"AI是什么"文章

**Files:**
- Create: `0-start-here/what-is-ai.md`
- Create: `0-start-here/what-is-ai.en.md`

- [ ] **Step 1: 编写中文版**

创建 `0-start-here/what-is-ai.md`:

```markdown
---
title: "AI是什么：一个通俗易懂的解释"
title_en: "What is AI: A Beginner-Friendly Explanation"
difficulty: beginner
roles: [everyone]
type: concept
duration: 5min
tools: []
prerequisites: []
tags: [ai-basics, cognition]

author: "Anything-AI Team"
created: 2026-03-20
updated: 2026-03-20
version: 1.0
---

# AI是什么：一个通俗易懂的解释

> 把AI想象成一个博览群书但从未出过门的学者

## 🤔 AI到底是什么

### 一个比喻

想象一下，有一个人，他从出生就住在一个巨大的阅览室里。这个阅览室里有：
- 📚 所有的书籍
- 🎬 所有的电影
- 📰 所有的报纸
- 💻 所有的网页
- 🎵 所有的音乐

他花了一辈子时间阅读、观看、学习这些内容，**但他从未出过这个阅览室**。

- 他没见过太阳，但读过关于太阳的书
- 他没吃过饭，但知道所有菜谱
- 他没吹过风，但读过描写风的诗

**这就是AI**。

### 通俗理解

AI（特别是现在的大语言模型，如ChatGPT、Claude、DeepSeek）就像这个学者：

1. **读遍万卷书** - AI训练时"阅读"了互联网上几乎所有的文本
2. **足不出户** - AI没有真实世界的体验，只有文本中的知识
3. **知其然不知其所以然** - AI知道"什么是太阳"，但从未真正见过太阳
4. **擅长预测** - 你说"窗前明月光"，AI会说"疑似地上霜"，因为读得多

### 技术定义（可选）

AI是一个**大规模语言模型**，通过"阅读"海量文本，学会了预测下一个字。它不是在思考，而是在计算概率："在这个上下文中，下一个最可能出现的字是什么"。

---

## 📖 AI能做什么

### ✅ 擅长的

1. **文本生成** - 写文章、写代码、写诗
   - 为什么擅长：读过太多文本，模式识别能力强

2. **知识问答** - 解答各种问题
   - 为什么擅长：知识库庞大，覆盖面广

3. **语言翻译** - 中英互译、多语言
   - 为什么擅长：见过大量翻译范例

4. **对话交流** - 聊天、心理咨询
   - 为什么擅长：学过无数对话模式

### ❌ 不擅长的

1. **真实世界理解** - 没有身体，没有感受
   - AI知道"苹果是甜的"，但从未吃过苹果

2. **最新信息** - 训练数据有截止日期
   - 训练之后发生的事，AI不知道（除非联网查询）

3. **绝对准确** - 可能会"幻觉"
   - AI会自信地说错误的信息

4. **真正理解** - 只是在拟合模式
   - AI不理解概念，只是记住了用法

---

## 🎯 核心要点

### 1. AI是拟合怪，不是思考者

AI像一个超级读书人，能照本宣科，但不理解深层含义。

**例子**：
- 你问"什么是爱情"
- AI能引用无数诗词、小说、心理学著作
- 但AI从未恋爱过，不理解爱情的感受

### 2. AI会犯错，而且很自信

因为AI只是预测"下一个字"，如果训练数据有问题，或者预测出错，AI会一本正经地胡说八道。

**例子**：
- 你问一个不存在的图书馆
- AI可能会编造一个看起来很真实的地址和介绍
- 这叫"幻觉"（Hallucination）

### 3. AI没有主观感受

AI知道"痛苦"这个词在书中的用法，但AI没有真正感受过痛苦。

---

## 💡 如何正确看待AI

### ✅ AI是超级工具

- 强大的知识库
- 24/7在线
- 不知疲倦
- 跨领域知识

### ✅ AI需要人类把关

- 验证AI输出的准确性
- 理解真实世界的复杂情况
- 做出最终决策
- 承担责任

### ✅ AI + 人类 = 最强组合

- AI提供知识和可能性
- 人类提供理解和判断
- 各展所长，互补短板

---

## 🎬 实际例子

### 场景：写一篇关于"春天"的文章

**你的提示词**：
```
请写一篇关于春天的文章，300字左右，要有诗意
```

**AI的输出**：
AI会调用读过的所有关于春天的文字——诗词、散文、小说——然后生成一篇看起来很美的文章。

**但要注意**：
- AI可能引用不存在的诗
- AI的描写是拼凑的，不是真实感受
- 需要你判断文章质量

---

## ⚠️ 常见误解

### ❌ 误解1：AI有意识

**真相**：AI没有意识、情感、主观体验。它只是一个复杂的预测模型。

### ❌ 误解2：AI无所不知

**真相**：AI知道训练数据中的内容，有知识截止日期，而且会出错。

### ❌ 误解3：AI会取代人类

**真相**：AI是工具，不是替代品。它能完成很多任务，但需要人类引导和验证。

---

## 🔗 延伸阅读

### 下一步
- [为什么不需要AI焦虑](./ai-anxiety.md) - 了解AI的局限性
- [学习路径总览](./learning-path.md) - 系统学习AI

### 深入理解
- [LLM是如何工作的](../1-understand-ai/llm-basics/transformer.md) - 技术原理
- [为什么AI会幻觉](../1-understand-ai/how-ai-thinks/hallucination.md) - AI的局限

---

## 📅 时效性说明

> 📅 本文最后更新于 2026-03-20
>
> AI的本质相对稳定，但具体能力和应用在快速发展

---

**一句话总结**：AI是博览群书的学者，但从未出过门。它知道很多，但理解有限。用AI，但要验证AI。
```

- [ ] **Step 2: 编写英文版**

创建 `0-start-here/what-is-ai.en.md`（英文版内容，结构相同，按英文读者习惯重写）

- [ ] **Step 3: 提交**

```bash
git add 0-start-here/what-is-ai.md 0-start-here/what-is-ai.en.md
git commit -m "docs: add 'What is AI' article (Chinese and English)"
```

---

### Task 6: 编写"为什么不需要AI焦虑"文章

**Files:**
- Create: `0-start-here/ai-anxiety.md`
- Create: `0-start-here/ai-anxiety.en.md`

（类似结构，重点说明AI的局限性、人类的优势、正确的态度）

---

### Task 7: 编写"学习路径总览"文章

**Files:**
- Create: `0-start-here/learning-path.md`
- Create: `0-start-here/learning-path.en.md`

（系统学习路线图，各阶段目标）

---

## Chunk 4: 工具矩阵系统

### Task 8: 创建工具矩阵核心文件

**Files:**
- Create: `2-choose-tools/tool-matrix.md`
- Create: `2-choose-tools/tool-matrix.en.md`

- [ ] **Step 1: 创建核心矩阵（中文版）**

创建 `2-choose-tools/tool-matrix.md`:

```markdown
---
title: "AI工具选择矩阵"
title_en: "AI Tool Selection Matrix"
difficulty: beginner
roles: [everyone]
type: comparison
duration: 10min
tools: [chatgpt, claude, deepseek, gemini, doubao, qianwen]
prerequisites: []
tags: [tools, comparison, matrix]

author: "Anything-AI Team"
created: 2026-03-20
updated: 2026-03-20
version: 1.0
---

# AI工具选择矩阵

> 一张表看清所有主流AI工具

## 📊 综合对比表

### 核心能力对比

| 工具 | 推理能力 | 创意能力 | 代码能力 | 中文质量 | 速度 | 价格 |
|------|---------|---------|---------|---------|------|------|
| **Claude** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 中 | 付费 |
| **GPT-4** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 中 | 付费 |
| **DeepSeek** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 快 | 免费 |
| **Gemini** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | 快 | 部分免费 |
| **豆包** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 快 | 免费 |
| **千问** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 快 | 免费 |

### 场景推荐表

| 使用场景 | 首选 | 备选 | 原因 |
|---------|------|------|------|
| **技术开发** |
| 代码架构设计 | Claude | GPT-4 | Claude架构思维强 |
| 代码实现 | Claude/Codex | DeepSeek | Codex写代码bug少 |
| Code Review | Claude | DeepSeek | Claude发现问题准 |
| Debug | DeepSeek | Claude | DeepSeek逻辑推理好 |
| **内容创作** |
| 爆款标题 | DeepSeek | 豆包 | DeepSeek创意爆发 |
| 长篇文章 | Claude | DeepSeek | Claude逻辑清晰 |
| 视频脚本 | DeepSeek | GPT-4 | DeepSeek懂中文互联网 |
| 小红书文案 | 豆包 | DeepSeek | 豆包接地气 |
| **日常工作** |
| 文档整理 | 豆包 | ChatGPT | 豆包处理中文文档快 |
| 会议纪要 | 豆包 | Claude | 豆包总结准确 |
| 邮件撰写 | ChatGPT | 豆包 | 都好用 |
| **学习研究** |
| 概念解释 | ChatGPT | Claude | ChatGPT通俗易懂 |
| 技术问答 | Claude | GPT-4 | Claude深入细致 |
| 论文辅助 | Claude | GPT-4 | Claude学术性强 |
| **专业领域** |
| 数据分析 | DeepSeek | Claude | DeepSeek推理强 |
| 法律咨询 | Claude | GPT-4 | Claude严谨 |
| 医疗问答 | GPT-4 | Claude | 需多方验证！ |
| 算命（娱乐） | DeepSeek | 豆包 | DeepSeek逻辑组合 |

---

## 🎯 工具详细介绍

### Claude

**最擅长**：技术架构、深度推理、长文本

**优势**：
- 推理能力强，逻辑严密
- 代码质量高
- 长文本处理出色（200K上下文）
- 中文理解好

**劣势**：
- 价格较高
- 速度中等
- 需要海外账号

**最佳场景**：
- 架构设计
- 技术文档
- 研究分析
- 代码审查

**详细指南**：[Claude使用指南](./tools/claude/)

---

### DeepSeek

**最擅长**：文案创作、逻辑分析、性价比

**优势**：
- 完全免费（大部分功能）
- 中文地道
- 创意能力强
- 速度快

**劣势**：
- 推理深度略逊Claude
- 偶尔不稳定

**最佳场景**：
- 文案创作
- 日常对话
- 学习辅助
- 预算有限

**详细指南**：[DeepSeek使用指南](./tools/deepseek/)

---

### ChatGPT (GPT-4)

**最擅长**：通用对话、知识问答、生态完善

**优势**：
- 知识面广
- 插件生态强大
- 多模态（图片、语音）
- 通俗易懂

**劣势**：
- 价格高（Plus $20/月）
- 中文不如国产工具
- 国内访问不便

**最佳场景**：
- 通用问答
- 学习入门
- 英文内容
- 使用插件

**详细指南**：[ChatGPT使用指南](./tools/chatgpt/)

---

### 豆包

**最擅长**：中文日常、文档处理、完全免费

**优势**：
- 完全免费
- 中文非常地道
- 速度快
- 国内访问方便

**劣势**：
- 推理能力一般
- 代码能力有限

**最佳场景**：
- 日常对话
- 文档整理
- 简单任务
- 娱乐休闲

**详细指南**：[豆包使用指南](./tools/doubao/)

---

### Gemini

**最擅长**：多模态、Google生态

**优势**：
- 图片理解强
- 免费
- Google生态集成

**劣势**：
- 中文一般
- 国内访问不便

**最佳场景**：
- 图片分析
- Google用户
- 多模态需求

**详细指南**：[Gemini使用指南](./tools/gemini/)

---

### 千问（Qianwen）

**最擅长**：企业应用、阿里生态

**优势**：
- 中文优秀
- 企业级应用
- 免费

**劣势**：
- 国际化弱
- 社区较小

**最佳场景**：
- 企业应用
- 阿里云用户
- B端产品

**详细指南**：[千问使用指南](./tools/qianwen/)

---

## 💡 选择建议

### 按预算选择

**免费方案**：
- DeepSeek（主力）+ 豆包（日常）
- 能满足90%需求

**付费方案**：
- Claude（主力）+ DeepSeek（辅助）
- 追求极致效果

### 按角色选择

**程序员**：
- Claude（架构、Review）+ DeepSeek（日常）

**内容创作者**：
- DeepSeek（文案）+ 豆包（日常）

**学生**：
- DeepSeek（主力）+ ChatGPT（学习）

**教师**：
- ChatGPT（备课）+ Claude（出题）

### 按频率选择

**每天使用**：
- 选稳定付费工具（Claude/GPT-4）

**偶尔使用**：
- 免费工具足够（DeepSeek/豆包）

---

## ⚠️ 重要提醒

### 1. 时效性

> 📅 本矩阵最后更新于 2026-03-20

AI工具迭代极快，能力对比可能很快过时。建议：
- 查看工具官网最新信息
- 关注社区评测
- 定期重新对比

### 2. 数据验证

AI工具会犯错，特别是：
- 专业领域（医疗、法律）
- 最新信息
- 具体数据

**务必**交叉验证关键信息！

### 3. 隐私安全

注意：
- 不要上传敏感信息
- 了解工具的数据政策
- 企业用户注意合规

---

## 🔗 相关资源

- [各工具详细指南](./tools/)
- [行业应用案例](../roles/)
- [提示词库](../prompts/)

---

**一句话总结**：没有最好的工具，只有最适合的工具。先用免费工具，不够再升级付费。
```

- [ ] **Step 2: 创建英文版并提交**

---

## Chunk 5: 角色案例（程序员、内容创作者）

### Task 9: 创建程序员案例

**Files:**
- Create: `roles/programmer/README.md`
- Create: `roles/programmer/README.en.md`
- Create: `roles/programmer/code-assistant.md`
- Create: `roles/programmer/code-review.md`

（详细内容省略，按case-template编写）

---

### Task 10: 创建内容创作者案例

**Files:**
- Create: `roles/content-creator/README.md`
- Create: `roles/content-creator/README.en.md`
- Create: `roles/content-creator/viral-titles.md`
- Create: `roles/content-creator/article-writing.md`

（详细内容省略）

---

## Chunk 6: 提示词库初始化

### Task 11: 创建提示词库结构

**Files:**
- Create: `prompts/README.md`
- Create: `prompts/by-scene/writing/README.md`
- Create: `prompts/by-role/programmer/README.md`

（详细内容省略）

---

## Chunk 7: 外部资源索引

### Task 12: 创建外部资源索引

**Files:**
- Create: `resources/README.md`
- Create: `resources/awesome-lists.md`

（详细内容省略）

---

## Chunk 8: 自动化脚本开发

### Task 13: 开发索引生成脚本

**Files:**
- Create: `scripts/lib/parser.js`
- Create: `scripts/lib/indexer.js`
- Create: `scripts/generate-index.js`

- [ ] **Step 1: 创建解析器模块**

创建 `scripts/lib/parser.js`:

```javascript
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
```

- [ ] **Step 2: 创建索引生成器**

创建 `scripts/lib/indexer.js`:

```javascript
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
```

- [ ] **Step 3: 创建主脚本**

创建 `scripts/generate-index.js`:

```javascript
#!/usr/bin/env node

/**
 * 自动生成交叉索引
 */

const fs = require('fs');
const path = require('path');
const { parseAllMarkdown } = require('./lib/parser');
const { groupBy, generateMarkdownIndex, generateJSONIndex } = require('./lib/indexer');

const INDEXES_DIR = 'indexes';

// 确保indexes目录存在
if (!fs.existsSync(INDEXES_DIR)) {
  fs.mkdirSync(INDEXES_DIR, { recursive: true });
}

console.log('📖 正在扫描所有Markdown文件...');
const entries = parseAllMarkdown();

console.log(`✅ 找到 ${entries.length} 个文件\n`);

// 过滤掉模板文件和README
const contentEntries = entries.filter(e =>
  !e.relativePath.includes('_templates') &&
  e.frontmatter.title
);

console.log('📊 生成按难度索引...');
const byDifficulty = groupBy(contentEntries, 'difficulty');
const difficultyMD = generateMarkdownIndex(byDifficulty, '按难度索引', process.cwd());
fs.writeFileSync(path.join(INDEXES_DIR, 'by-difficulty.md'), difficultyMD);

console.log('👥 生成按角色索引...');
const byRole = groupBy(contentEntries, 'roles');
const roleMD = generateMarkdownIndex(byRole, '按角色索引', process.cwd());
fs.writeFileSync(path.join(INDEXES_DIR, 'by-role.md'), roleMD);

console.log('🔧 生成按工具索引...');
const byTool = groupBy(contentEntries, 'tools');
const toolMD = generateMarkdownIndex(byTool, '按工具索引', process.cwd());
fs.writeFileSync(path.join(INDEXES_DIR, 'by-tool.md'), toolMD);

console.log('⏱️ 生成按时长索引...');
const byDuration = groupBy(contentEntries, 'duration');
const durationMD = generateMarkdownIndex(byDuration, '按时长索引', process.cwd());
fs.writeFileSync(path.join(INDEXES_DIR, 'by-duration.md'), durationMD);

console.log('📦 生成JSON完整索引...');
const jsonIndex = generateJSONIndex(contentEntries);
fs.writeFileSync(
  path.join(INDEXES_DIR, 'full-index.json'),
  JSON.stringify(jsonIndex, null, 2)
);

console.log('\n✅ 所有索引生成完成！');
console.log(`📁 索引文件保存在: ${INDEXES_DIR}/`);
```

- [ ] **Step 4: 测试脚本**

```bash
# 安装依赖
npm install

# 运行索引生成
npm run index

# 预期输出：
# 📖 正在扫描所有Markdown文件...
# ✅ 找到 X 个文件
# 📊 生成按难度索引...
# 👥 生成按角色索引...
# 🔧 生成按工具索引...
# ⏱️ 生成按时长索引...
# 📦 生成JSON完整索引...
# ✅ 所有索引生成完成！
```

- [ ] **Step 5: 提交**

```bash
git add scripts/
git commit -m "feat: add index generation script"
```

---

### Task 14: 开发frontmatter检查脚本

**Files:**
- Create: `scripts/check-frontmatter.js`

（详细实现省略）

---

## Chunk 9: GitHub配置和社区流程

### Task 15: 创建贡献指南

**Files:**
- Create: `.github/CONTRIBUTING.md`
- Create: `.github/PULL_REQUEST_TEMPLATE.md`
- Create: `.github/ISSUE_TEMPLATE/content-request.yml`

（使用设计文档中的内容）

---

## 执行总结

### ✅ 已完成（2026-03-20更新）

**Phase 1: 宏观骨架** ✅
- Chunk 1-2：项目初始化和基础配置
- 主README（含项目初衷）
- 完整目录结构
- 所有阶段README骨架
- 所有行业角色README骨架

**文件统计**：
- 配置文件：4个
- README文件：26个（13中文 + 13英文）
- 设计文档：2个
- **总计**：32个文件

### ⏸️ 待执行

**Phase 2: 内容模板**
- Chunk 2.5：内容模板系统

**Phase 3: 核心内容**
- Chunk 3：核心文章（AI是什么、AI焦虑、学习路径）
- Chunk 4：工具矩阵详细内容
- Chunk 5：程序员、内容创作者详细案例
- Chunk 6-7：提示词库和外部资源

**Phase 4: 自动化工具**
- Chunk 8：自动化脚本开发

**Phase 5: 社区配置**
- Chunk 9：GitHub配置和社区流程

---

## 📝 更新的执行建议

### ✅ 阶段1（已完成，2026-03-20）
- Chunk 1-2：项目初始化和目录结构
- 所有阶段和角色README骨架
- **成果**：完整的项目框架和导航体系

### 🔄 阶段2（下一步，优先级1）
**目标**：填充核心内容，让用户能真正学习

**优先顺序**：
1. 内容模板（Chunk 2.5）- 建立内容标准
2. 核心文章（Chunk 3）- AI是什么、AI焦虑、学习路径
3. 工具矩阵（Chunk 4）- 快速选择工具

**预计时间**：1-2天

### 📋 阶段3（短期，本周内）
**目标**：完善实践案例

**内容**：
- 程序员详细案例（Chunk 5）
- 内容创作者详细案例
- 提示词库初始化
- 外部资源索引

**预计时间**：3-5天

### 🎯 阶段4（中期，2周内）
**目标**：自动化和社区

**内容**：
- 自动化脚本开发（Chunk 8）
- GitHub配置（Chunk 9）
- 更多行业案例

**预计时间**：3-5天

### 🚀 阶段5（长期，1个月内）
**目标**：优化和扩展

**内容**：
- 内容质量审核
- 社区贡献流程
- 文档网站（可选）

---

## 🎯 当前进度状态

**项目状态**：✅ Phase 1 完成，进入 Phase 2

**完成度**：
- 基础架构：100% ✅
- 导航体系：100% ✅
- 核心内容：0% ⏸️
- 自动化：0% ⏸️
- 社区配置：0% ⏸️

**下一个里程碑**：
- 完成核心文章（AI是什么、AI焦虑、学习路径）
- 用户能真正开始学习

---

**计划更新完成！继续执行 Phase 2。**