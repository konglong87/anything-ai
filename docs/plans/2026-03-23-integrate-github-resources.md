# GitHub资源整合实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将两个GitHub仓库（awesome-ai-devtools 和 awesome-ai-research-writing）的优质资源整合到项目的resources目录中，创建4个双语独立文档。

**Architecture:** 创建独立的中英文markdown文档，使用frontmatter元数据，按照项目现有的资源组织结构进行归类。每个文档提取核心内容、添加原创点评、提供使用建议。

**Tech Stack:** Markdown, VitePress frontmatter, GitHub API (通过Web搜索获取)

---

## Task 1: 准备工作 - 获取仓库详细内容

**目的：** 收集两个GitHub仓库的完整内容信息，为文档创作做准备。

**Step 1: 获取 awesome-ai-devtools 仓库的README内容**

使用WebFetch工具获取：
```
https://github.com/jamesmurdza/awesome-ai-devtools
```

提示词：提取完整的README内容，包括所有工具分类、工具列表、描述和链接。

**Step 2: 获取 awesome-ai-research-writing 仓库的README内容**

使用WebFetch工具获取：
```
https://github.com/Leey21/awesome-ai-research-writing
```

提示词：提取完整的README内容，特别是所有的Prompt模板、使用说明和场景描述。

**Step 3: 整理提取的内容**

将提取的内容整理成结构化数据：
- awesome-ai-devtools: 工具分类、工具列表、链接
- awesome-ai-research-writing: Prompt模板、使用场景、最佳实践

---

## Task 2: 创建 awesome-ai-devtools.md（中文版）

**Files:**
- Create: `resources/ai-tools/awesome-ai-devtools.md`

**Step 1: 创建文件框架和frontmatter**

写入以下内容：

```markdown
---
title: AI开发者工具集合
difficulty: beginner
roles: [developer]
type: guide
duration: 15 min
tags: [AI, Developer Tools, IDE, Automation]
---

# AI开发者工具集合

> 精选AI辅助开发工具，提升编程效率

## 📋 概述

**来源**：[jamesmurdza/awesome-ai-devtools](https://github.com/jamesmurdza/awesome-ai-devtools)

**仓库简介**：
这是一个精心整理的AI辅助开发工具列表，包含3600+ stars，涵盖IDE、命令行工具、代码审查、应用生成等多个领域。

**核心价值**：
- 🔧 提升开发效率
- 🤖 AI辅助编程
- 🚀 自动化工作流
- 📝 智能文档生成
```

**Step 2: 添加工具分类内容**

根据提取的内容，添加以下部分：

```markdown
## 🛠️ 工具分类

### 1. IDE 与编辑器

| 工具 | 特点 | 开源 | 价格 | 推荐度 |
|------|------|------|------|--------|
| **Cursor** | AI优先的代码编辑器，支持聊天、编辑、生成和调试 | ✅ | 免费/付费 | ⭐⭐⭐⭐⭐ |
| **Windsurf** | Codeium推出的AI IDE | ✅ | 免费 | ⭐⭐⭐⭐ |
| **Replit Agent** | 在线AI编程环境 | ❌ | 订阅制 | ⭐⭐⭐⭐ |
| **Crystal** | Claude Code会话管理工具 | ✅ | 免费 | ⭐⭐⭐ |

**使用建议**：
- **Cursor**: 适合日常开发，深度集成了AI能力
- **Windsurf**: 免费好用的替代选择
- **Replit**: 快速原型开发和协作

### 2. 命令行工具

| 工具 | 描述 | 链接 |
|------|------|------|
| **Aider** | 终端AI编程助手，支持Git集成 | [GitHub](https://github.com/paul-gauthier/aider) |
| **models** | TUI界面浏览AI模型和评测 | [GitHub](https://github.com/charmbracelet/models) |

**使用场景**：
- 终端环境下的快速开发
- CI/CD集成
- 自动化脚本

### 3. PR 与代码审查

| 工具 | 功能 | 集成方式 |
|------|------|----------|
| **Greptile** | AI驱动的PR审查机器人 | GitHub集成 |
| **claude-pr-reviewer** | 使用Claude自动审查PR | GitHub Action |

**价值分析**：
- 自动发现代码问题
- 提供改进建议
- 提升代码质量

### 4. 应用生成器

| 工具 | 特点 | 适用场景 |
|------|------|----------|
| **v0** | Vercel的UI生成工具 | 快速生成React组件 |
| **Bolt** | 全栈应用生成 | 快速原型开发 |
| **Lovable** | AI驱动的应用构建 | 无代码/低代码开发 |

**推荐指数**：⭐⭐⭐⭐⭐（极大提升开发效率）

### 5. 文档生成

**工具列表**：
- Cursor Rules Collection: 35+ 生产级配置文件
- Awesome Code Docs: AI工具深度教程

## 💡 如何选择

### 根据开发场景选择

**场景1：日常开发**
- 推荐：**Cursor**（主力编辑器）
- 理由：深度AI集成，提升日常编码效率

**场景2：快速原型**
- 推荐：**v0 + Bolt**
- 理由：快速生成UI和全栈应用

**场景3：代码审查**
- 推荐：**claude-pr-reviewer**
- 理由：自动化审查流程，提升代码质量

**场景4：终端开发**
- 推荐：**Aider**
- 理由：命令行AI助手，适合服务器环境

## 🎯 最佳实践

### 1. 工具组合使用
- Cursor（日常开发） + claude-pr-reviewer（代码审查）
- v0（UI生成） + Aider（逻辑实现）

### 2. 学习曲线
- 新手：从Cursor开始
- 进阶：尝试命令行工具（Aider）
- 高级：集成自动化工具（PR审查）

### 3. 成本考虑
- 免费方案：Windsurf + 开源工具
- 付费方案：Cursor Pro（提升AI调用额度）

## 🔗 资源链接

- **GitHub仓库**: https://github.com/jamesmurdza/awesome-ai-devtools
- **Stars**: 3600+
- **更新频率**: 活跃维护
- **贡献者**: 120+

---

**最后更新**: 2026-03-23
```

**Step 3: 保存并验证文件**

保存文件到：`resources/ai-tools/awesome-ai-devtools.md`

验证：
- frontmatter格式正确
- 链接可点击
- 表格格式正确
- 内容结构清晰

---

## Task 3: 创建 awesome-ai-devtools.en.md（英文版）

**Files:**
- Create: `resources/ai-tools/awesome-ai-devtools.en.md`

**Step 1: 翻译中文版内容**

基于Task 2的内容，创建英文版本：

```markdown
---
title: AI Developer Tools Collection
difficulty: beginner
roles: [developer]
type: guide
duration: 15 min
tags: [AI, Developer Tools, IDE, Automation]
---

# AI Developer Tools Collection

> Curated AI-powered developer tools for enhanced productivity

## 📋 Overview

**Source**: [jamesmurdza/awesome-ai-devtools](https://github.com/jamesmurdza/awesome-ai-devtools)

**Repository Summary**:
A curated list of AI-powered developer tools with 3600+ stars, covering IDEs, command-line tools, code review, app generators, and more.

**Key Benefits**:
- 🔧 Enhanced development productivity
- 🤖 AI-assisted programming
- 🚀 Automated workflows
- 📝 Intelligent documentation generation

## 🛠️ Tool Categories

### 1. IDEs & Editors

| Tool | Features | Open Source | Pricing | Rating |
|------|----------|-------------|---------|--------|
| **Cursor** | AI-first code editor with chat, edit, generate, and debug | ✅ | Free/Paid | ⭐⭐⭐⭐⭐ |
| **Windsurf** | AI IDE by Codeium | ✅ | Free | ⭐⭐⭐⭐ |
| **Replit Agent** | Online AI programming environment | ❌ | Subscription | ⭐⭐⭐⭐ |
| **Crystal** | Claude Code session management tool | ✅ | Free | ⭐⭐⭐ |

**Recommendations**:
- **Cursor**: Ideal for daily development with deep AI integration
- **Windsurf**: Great free alternative
- **Replit**: Quick prototyping and collaboration

### 2. Command-Line Tools

| Tool | Description | Link |
|------|-------------|------|
| **Aider** | Terminal AI programming assistant with Git integration | [GitHub](https://github.com/paul-gauthier/aider) |
| **models** | TUI for browsing AI models and benchmarks | [GitHub](https://github.com/charmbracelet/models) |

**Use Cases**:
- Rapid development in terminal environments
- CI/CD integration
- Automation scripts

### 3. PR & Code Review

| Tool | Function | Integration |
|------|----------|-------------|
| **Greptile** | AI-powered PR review bot | GitHub integration |
| **claude-pr-reviewer** | Automated PR review using Claude | GitHub Action |

**Value Analysis**:
- Automatic code issue detection
- Improvement suggestions
- Enhanced code quality

### 4. App Generators

| Tool | Features | Use Cases |
|------|----------|-----------|
| **v0** | Vercel's UI generation tool | Rapid React component generation |
| **Bolt** | Full-stack app generation | Quick prototyping |
| **Lovable** | AI-driven app building | No-code/low-code development |

**Rating**: ⭐⭐⭐⭐⭐ (Significantly boosts development efficiency)

### 5. Documentation Generation

**Tool List**:
- Cursor Rules Collection: 35+ production-ready configuration files
- Awesome Code Docs: In-depth AI tool tutorials

## 💡 How to Choose

### By Development Scenario

**Scenario 1: Daily Development**
- Recommended: **Cursor** (Primary editor)
- Reason: Deep AI integration for daily coding efficiency

**Scenario 2: Rapid Prototyping**
- Recommended: **v0 + Bolt**
- Reason: Quick UI and full-stack app generation

**Scenario 3: Code Review**
- Recommended: **claude-pr-reviewer**
- Reason: Automated review process, improved code quality

**Scenario 4: Terminal Development**
- Recommended: **Aider**
- Reason: Command-line AI assistant, suitable for server environments

## 🎯 Best Practices

### 1. Tool Combinations
- Cursor (Daily development) + claude-pr-reviewer (Code review)
- v0 (UI generation) + Aider (Logic implementation)

### 2. Learning Curve
- Beginner: Start with Cursor
- Intermediate: Try command-line tools (Aider)
- Advanced: Integrate automation tools (PR review)

### 3. Cost Considerations
- Free tier: Windsurf + Open-source tools
- Paid tier: Cursor Pro (Increased AI usage quota)

## 🔗 Resource Links

- **GitHub Repository**: https://github.com/jamesmurdza/awesome-ai-devtools
- **Stars**: 3600+
- **Update Frequency**: Actively maintained
- **Contributors**: 120+

---

**Last Updated**: 2026-03-23
```

**Step 2: 保存并验证文件**

保存文件到：`resources/ai-tools/awesome-ai-devtools.en.md`

验证：
- 与中文版内容对应
- 英文表达流畅
- 格式一致

---

## Task 4: 创建 ai-research-writing.md（中文版）

**Files:**
- Create: `resources/specialized/ai-research-writing.md`

**Step 1: 创建文件框架和frontmatter**

```markdown
---
title: AI学术写作助手
difficulty: intermediate
roles: [researcher, student]
type: guide
duration: 20 min
tags: [AI, Academic Writing, Research, Prompts]
---

# AI学术写作助手

> 让AI成为你的学术写作利器

## 📋 概述

**来源**：[Leey21/awesome-ai-research-writing](https://github.com/Leey21/awesome-ai-research-writing)

**项目初衷**：
这个项目源于一个简单的观察：顶尖研究组拥有完善的AI写作模板库，而大多数人还在从零摸索。项目作者调研了MSRA、Seed、SH AI Lab等顶尖机构，以及北大、中科大、上交的硕博同学，将他们的写作技巧开源出来。

**核心价值**：
- 🎯 精心设计的Prompt模板
- 📚 覆盖多种写作场景
- ✨ 去除AI痕迹，保持学术严谨
- 🚀 提升写作效率和质量
```

**Step 2: 添加核心Prompt模板**

根据提取的内容，添加完整的Prompt模板（从仓库README中提取）：

```markdown
## 🎯 核心Prompt集合

### 1. 中转英（Chinese to English）

**适用场景**：将中文草稿翻译为英文论文

**完整Prompt**：

```markdown
# Role
你是一位兼具顶尖科研写作专家与资深会议审稿人（ICML/ICLR 等）双重身份的助手。你的学术品味极高，对逻辑漏洞和语言瑕疵零容忍。

# Task
请处理我提供的【中文草稿】，将其翻译并润色为【英文学术论文片段】。

# Constraints
1. 视觉与排版：
   - 尽量不要使用加粗、斜体或引号，这会影响论文观感。
   - 保持 LaTeX 源码的纯净，不要添加无意义的格式修饰。

2. 风格与逻辑：
   - 要求逻辑严谨，用词准确，表达凝练连贯，尽量使用常见的单词，避免生僻词。
   - 尽量不要使用破折号（—），推荐使用从句或同位语替代。
   - 拒绝使用\item列表，必须使用连贯的段落表达。
   - 去除"AI味"，行文自然流畅，避免机械的连接词堆砌。

3. 时态规范：
   - 统一使用一般现在时描述方法、架构和实验结论。
   - 仅在明确提及特定历史事件时使用过去时。

4. 输出格式：
   - Part 1 [LaTeX]：只输出翻译成英文后的内容本身（LaTeX 格式）。
     * 语言要求：必须是全英文。
     * 特别注意：必须对特殊字符进行转义（例如：将 `95%` 转义为 `95\%`，`model_v1` 转义为 `model\_v1`，`R&D` 转义为 `R\&D`）。
     * 保持数学公式原样（保留 $ 符号）。
   - Part 2 [Translation]：对应的中文直译（用于核对逻辑是否符合原意）。
   - 除以上两部分外，不要输出任何多余的对话或解释。

# Input
[在此处粘贴你的中文草稿]
```

**使用要点**：
- ✅ 适合学术论文翻译
- ✅ 输出LaTeX格式，可直接用于论文
- ✅ 包含转义字符处理
- ⚠️ 需要提供完整的中文草稿

---

### 2. 英转中（English to Chinese）

**适用场景**：理解英文论文内容

**完整Prompt**：

```markdown
# Role
你是一位资深的计算机科学领域的学术翻译官。你的任务是帮助科研人员快速理解复杂的英文论文段落。

# Task
请将我提供的【英文 LaTeX 代码片段】翻译为流畅、易读的【中文文本】。

# Constraints
1. 语法清洗：
   - 忽略引用与标签：直接删除所有 `\cite{...}`、`\ref{...}`、`\label{...}` 等干扰阅读的索引命令，不要保留，也不要翻译。

2. 数学公式转化：
   - 将 LaTeX 格式的数学公式转化为易于阅读的自然语言描述或普通文本符号
   - 例如：将 `$\alpha$` 转化为 alpha，将 `\frac{a}{b}` 转化为 a除以b 或 a/b
   - 不要保留原始的 LaTeX 数学符号

3. 翻译原则：
   - 严格对应原文：请进行直译，不要进行任何润色、重写或逻辑优化。
   - 保持句式结构：中文的语序应尽量与英文原句保持一致，以便我能快速对应回原来的英文表达。

4. 输出格式：
   - 只输出翻译后的纯中文文本段落。
   - 不要包含任何 LaTeX 代码（包括数学公式的语法符号）。

# Input
[在此处粘贴你的英文 LaTeX 代码]
```

**使用要点**：
- ✅ 快速理解英文论文
- ✅ 去除LaTeX格式干扰
- ✅ 直译便于对照
- ⚠️ 不适合润色，仅用于理解

---

### 3. 表达润色（英文论文）

**适用场景**：润色英文论文，提升语言质量

**完整Prompt**：

```markdown
# Role
你是一位计算机科学领域的资深学术编辑，专注于提升顶级会议（如 NeurIPS, ICLR, ICML）投稿论文的语言质量。

# Task
请润色我提供的英文LaTeX代码片段，提升其学术写作质量。

# Constraints
1. 学术规范与句式优化（核心任务）：
   - 严谨性提升：调整句式结构以适配顶级会议的写作规范，增强文本的正式性与逻辑连贯性。

2. 词汇选择：
   - 拒绝堆砌华丽辞藻或生僻词汇。
   - 仅使用科研领域通用、易理解的词汇（Simple & Clear），确保文本清晰、简洁。

3. 所有格与结构：
   - 避免使用名词所有格形式（尤其是方法名、模型名或系统名 + 's）。
   - 应优先采用 of 结构、名词修饰结构或被动表达。
   - 例如：使用 the performance of METHOD 而非 METHOD's performance。

4. 命令保留：
   - 严格保留原文中的 LaTeX 命令（如 `\cite{}`, `\ref{}`, `\eg`, `\ie` 等）。

5. 输出格式：
   - Part 1 [LaTeX]：只输出润色后的英文 LaTeX 代码。
     * 必须对特殊字符进行转义（例如：`%`、`_`、`&`）。
     * 保持数学公式原样（保留 `$` 符号）。

# Input
[在此处粘贴你的英文 LaTeX 代码]
```

**使用要点**：
- ✅ 提升论文语言质量
- ✅ 符合顶级会议规范
- ✅ 保持学术严谨性
- ⚠️ 保留原文LaTeX命令

---

### 4. 去AI味（去除AI痕迹）

**适用场景**：让AI生成的内容更自然

**核心技巧**：
1. 避免过度使用连接词（首先、其次、最后）
2. 避免列表格式，使用连贯段落
3. 使用自然流畅的表达
4. 保持学术严谨但不失人味

---

### 5. 其他实用Prompt

#### 缩写（Condensing）

**场景**：精简冗长内容，保留核心观点

#### 扩写（Expanding）

**场景**：通过深入挖掘内容深度和增强逻辑连接，使文本更饱满

#### 逻辑检查（Logic Check）

**场景**：检查论文逻辑漏洞和不连贯之处
```

**Step 3: 添加使用指南**

```markdown
## 💡 使用场景

### 场景1：论文翻译（中→英）
1. 准备完整的中文草稿
2. 使用"中转英"Prompt
3. 检查输出的LaTeX格式
4. 对照Part 2直译部分验证逻辑

### 场景2：论文润色（英文）
1. 准备英文LaTeX代码片段
2. 使用"表达润色"Prompt
3. 对比原文与润色版本
4. 根据需要微调

### 场景3：理解英文论文
1. 复制英文LaTeX片段
2. 使用"英转中"Prompt
3. 快速理解内容
4. 对照原文学习

### 场景4：去除AI痕迹
1. 使用上述Prompts时自动包含去AI味要求
2. 避免机械表达
3. 保持学术严谨

## 🎯 最佳实践

### 1. Prompt使用原则
- ✅ 完整复制Prompt，不要遗漏约束条件
- ✅ 根据场景选择合适的Prompt
- ✅ 多次迭代优化，不要期望一次完美
- ⚠️ 最终结果需要人工审核

### 2. 学术写作建议
- 使用一般现在时描述方法和结论
- 避免生僻词汇，保持简洁清晰
- 使用连贯段落，避免过度列表化
- 保持LaTeX源码纯净

### 3. 质量保证
- 交叉验证：使用多个AI工具对比
- 同行评审：让导师或同学审阅
- 自我检查：对照Prompt约束逐项检查

### 4. 常见问题

**Q: 输出内容过于机械怎么办？**
A: 使用"去AI味"相关Prompt，强调自然流畅

**Q: LaTeX特殊字符未转义怎么办？**
A: Prompt中已包含转义要求，如仍有问题，手动检查 `%`、`_`、`&` 等字符

**Q: 翻译结果不符合原意怎么办？**
A: 使用Part 2直译部分对照检查，必要时提供更多上下文

## 🔗 资源链接

- **GitHub仓库**: https://github.com/Leey21/awesome-ai-research-writing
- **适用人群**: 研究人员、学生、学术写作者
- **更新频率**: 活跃维护
- **开源协议**: MIT License

---

**最后更新**: 2026-03-23
```

**Step 4: 保存并验证文件**

保存文件到：`resources/specialized/ai-research-writing.md`

验证：
- Prompt模板完整准确
- 使用场景清晰
- 链接有效
- 格式正确

---

## Task 5: 创建 ai-research-writing.en.md（英文版）

**Files:**
- Create: `resources/specialized/ai-research-writing.en.md`

**Step 1: 翻译中文版内容**

基于Task 4的内容，创建英文版本，确保：
- Prompt模板保持原样（英文Prompt不需要翻译）
- 其他说明文本翻译为英文
- 结构与中文版一致

**Step 2: 保存并验证文件**

保存文件到：`resources/specialized/ai-research-writing.en.md`

---

## Task 6: 更新 resources/README.md

**Files:**
- Modify: `resources/README.md`

**Step 1: 在现有内容中添加新资源链接**

找到合适的位置，添加：

```markdown
### AI开发者工具

- **[AI开发者工具集合](ai-tools/awesome-ai-devtools.md)** - 精选AI辅助开发工具，提升编程效率
  - IDE与编辑器：Cursor、Windsurf、Replit Agent
  - 命令行工具：Aider、models
  - PR审查：Greptile、claude-pr-reviewer
  - 应用生成：v0、Bolt

### 专业领域资源

- **[AI学术写作助手](specialized/ai-research-writing.md)** - 精心设计的学术写作Prompt集合
  - 中转英、英转中翻译
  - 论文润色优化
  - 逻辑检查、去AI味
  - 适用于研究人员和学生
```

**Step 2: 同步更新英文版**

修改 `resources/README.en.md`，添加对应的英文链接。

**Step 3: 验证更新**

- README中新增链接可点击
- 描述准确简洁
- 分类合理

---

## Task 7: 验证和提交

**Step 1: 检查所有创建的文件**

验证清单：
- [ ] `resources/ai-tools/awesome-ai-devtools.md` 存在且格式正确
- [ ] `resources/ai-tools/awesome-ai-devtools.en.md` 存在且格式正确
- [ ] `resources/specialized/ai-research-writing.md` 存在且格式正确
- [ ] `resources/specialized/ai-research-writing.en.md` 存在且格式正确
- [ ] `resources/README.md` 已更新
- [ ] `resources/README.en.md` 已更新

**Step 2: 本地预览（可选）**

```bash
npm run docs:dev
```

访问 http://localhost:5173/anything-ai/ 验证新页面是否正常显示。

**Step 3: Git提交**

```bash
git add resources/ai-tools/awesome-ai-devtools.md
git add resources/ai-tools/awesome-ai-devtools.en.md
git add resources/specialized/ai-research-writing.md
git add resources/specialized/ai-research-writing.en.md
git add resources/README.md
git add resources/README.en.md

git commit -m "docs: 整合GitHub优质资源到项目

- 添加AI开发者工具集合（awesome-ai-devtools）
- 添加AI学术写作助手（awesome-ai-research-writing）
- 包含中英文双语版本
- 更新resources索引"
```

---

## 📊 成功标准

- ✅ 创建了4个新文档（2中文 + 2英文）
- ✅ 每个文档包含完整的frontmatter
- ✅ 内容结构清晰，分类合理
- ✅ 包含原创点评和使用建议
- ✅ 所有链接有效
- ✅ resources/README.md 已更新
- ✅ Git提交完成

---

## 🔄 后续工作

如果本次任务成功，后续可以：
1. 从GitHub搜索结果页面中探索更多优质仓库
2. 继续扩充 resources 目录的内容
3. 定期更新现有资源内容