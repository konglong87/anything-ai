---
name: Agent设计模式整合设计方案
description: 整合Agent Design Patterns完整教程到anything-ai项目
type: design
created: 2026-04-18
---

# Agent设计模式整合设计方案

## 设计目标

将《Agentic Design Patterns》完整教程（21个核心章节 + 7个附录）整合到 anything-ai 项目，提供系统化的Agent设计模式学习资源。

## 内容来源

- **中文版本**：https://github.com/xindoo/agentic-design-patterns
- **英文版本**：https://github.com/Mathews-Tom/Agentic-Design-Patterns
- **内容状态**：开源项目，可直接获取源文件使用

**Why**: xindoo的中文翻译项目已完成21个核心章节和7个附录的完整翻译，Mathews-Tom维护英文原版，两个仓库都可以直接克隆获取Markdown源文件，无需手动抓取或翻译。

## 整合架构

### 主目录结构

```
5-skills/agent/design-patterns/
├── README.md                    # 中文版概述和索引
├── README.en.md                 # 英文版概述和索引
├── chapters/                    # 核心章节目录
│   ├── 01-prompt-chaining.md
│   ├── 01-prompt-chaining.en.md
│   ├── 02-routing.md
│   ├── 02-routing.en.md
│   ├── ...                      # (21个章节，共42个文件)
│   ├── 21-exploration-discovery.md
│   └── 21-exploration-discovery.en.md
└── appendix/                    # 附录目录
    ├── appendix-a-prompting.md
    ├── appendix-a-prompting.en.md
    ├── ...                      # (7个附录，共14个文件)
    └── appendix-g-coding-agents.en.md
```

**文件总数**：58个文件（主README 2个 + 核心42个 + 附录14个）

**How to apply**: 从两个GitHub仓库克隆获取源文件，按命名规范统一整理到对应目录，无需手动翻译。

### 命名规范

- **中文文件**：`章节名.md`
- **英文文件**：`章节名.en.md`
- **编号格式**：01-21（核心章节），appendix-a-g（附录章节）

**Why**: 符合项目双语文件命名规范，便于用户和系统识别语言版本，编号清晰便于排序和导航。

## 文件内容规范

### frontmatter 设计

每个文件添加统一的frontmatter元数据：

```yaml
---
title: "章节标题"
difficulty: intermediate          # 根据章节内容调整：beginner/intermediate/advanced
roles: [programmer, researcher, ai-developer]   # 适用角色
type: pattern                     # 内容类型：设计模式
duration: 30min                   # 阅读时长（估算）
tools: [claude, langchain, adk]   # 相关工具（根据章节内容调整）
tags: [agent, design-pattern, prompt-chaining]  # 标签（根据章节内容调整）
source:
  chinese: "https://github.com/xindoo/agentic-design-patterns"
  english: "https://github.com/Mathews-Tom/Agentic-Design-Patterns"
---
```

**Why**: frontmatter是索引系统的基础，确保内容能被正确分类和检索，tools和tags根据章节内容动态调整。

### README.md 内容结构

**`5-skills/agent/design-patterns/README.md`** 内容框架：

```markdown
---
title: "Agent设计模式完整教程"
difficulty: intermediate
roles: [programmer, researcher, ai-developer]
type: course
duration: 10h
tools: [claude, langchain, agent-frameworks]
tags: [agent, design-patterns, systematic-learning]
source:
  chinese: "https://github.com/xindoo/agentic-design-patterns"
  english: "https://github.com/Mathews-Tom/Agentic-Design-Patterns"
---

# Agent设计模式完整教程

> **系统学习AI Agent的核心设计模式**

## 📚 教程简介

本教程整合了《Agentic Design Patterns》完整内容，系统介绍21个核心设计模式和7个附录章节，涵盖从基础到高级的Agent系统构建方法。

**内容来源**：
- 中文翻译：[xindoo/agentic-design-patterns](https://github.com/xindoo/agentic-design-patterns)
- 英文原版：[Mathews-Tom/Agentic-Design-Patterns](https://github.com/Mathews-Tom/Agentic-Design-Patterns)

## 🎯 学习路径

### 基础模式（第1-3章）
1. [提示词链](./chapters/01-prompt-chaining.md) - 将复杂任务分解为多个步骤
2. [路由](./chapters/02-routing.md) - 根据输入选择不同的处理路径
3. [并行化](./chapters/03-parallelization.md) - 同时执行多个任务提升效率

### 进阶模式（第4-6章）
4. [反思](./chapters/04-reflection.md) - Agent自我评估和改进
5. [工具使用](./chapters/05-tool-use.md) - 扩展Agent能力边界
6. [规划](./chapters/06-planning.md) - 制定执行策略

### 高级模式（第7-14章）
7. [多Agent协作](./chapters/07-multi-agent.md) - Agent间协同工作
8. [记忆管理](./chapters/08-memory.md) - 长期和短期记忆设计
9. [学习与适应](./chapters/09-learning.md) - 持续优化能力
10. [MCP协议](./chapters/10-mcp.md) - 模型上下文协议
11. [目标设定与监控](./chapters/11-goal-setting.md) - 目标管理
12. [异常处理与恢复](./chapters/12-error-handling.md) - 容错机制
13. [人机协同](./chapters/13-human-collaboration.md) - 人机交互设计
14. [知识检索RAG](./chapters/14-rag.md) - 知识库检索

### 实践模式（第15-21章）
15. [Agent间通信A2A](./chapters/15-a2a.md) - Agent通信协议
16. [资源感知优化](./chapters/16-resource-optimization.md) - 性能优化
17. [推理技术](./chapters/17-reasoning.md) - 推理方法
18. [护栏与安全模式](./chapters/18-guardrails.md) - 安全边界
19. [评估与监控](./chapters/19-evaluation.md) - 系统评估
20. [优先级排序](./chapters/20-prioritization.md) - 任务优先级
21. [探索与发现](./chapters/21-exploration.md) - 自主探索

### 附录章节
- [附录A：高级提示技术](./appendix/appendix-a-prompting.md)
- [附录B：AI智能体交互](./appendix/appendix-b-interaction.md)
- [附录C：智能体框架概览](./appendix/appendix-c-frameworks.md)
- [附录D：使用AgentSpace构建Agent](./appendix/appendix-d-agentspace.md)
- [附录E：命令行AI智能体](./appendix/appendix-e-cli.md)
- [附录F：智能体推理引擎](./appendix/appendix-f-reasoning-engine.md)
- [附录G：编程智能体](./appendix/appendix-g-coding-agents.md)

## 🎯 适用场景

### 程序员开发Agent
→ 重点学习：第1-10章 + 附录C/D/G
→ 实践应用：提示词链、多Agent协作、MCP协议

### AI研究者研究设计模式
→ 重点学习：第4-7章 + 第17-19章
→ 研究方向：反思、多Agent协作、推理技术、评估监控

### 产品经理设计AI产品
→ 重点学习：第6、11、13、18章
→ 应用场景：规划、目标设定、人机协同、安全模式

## 📊 学习建议

- **入门路径**：先学基础模式（1-3章）→ 进阶模式（4-6章）→ 选择性学习高级模式
- **实践路径**：学习理论 → 查看附录案例 → 实际开发Agent
- **研究路径**：重点学习高级和实践模式 → 附录F推理引擎

## 🔗 相关资源

- [Claude Agent开发](../../2-choose-tools/tools/claude/README.md)
- [Agent Skills目录](../README.md)
- [程序员角色指南](../../roles/programmer/README.md)

## 📝 版本说明

- 整合日期：2026-04-18
- 内容版本：基于两个GitHub仓库的最新版本
- 维护策略：定期同步上游更新
```

**How to apply**: README作为教程入口，提供完整的章节导航、学习路径建议和场景推荐，帮助用户快速定位所需内容。

## 相关目录更新

遵循项目规则6（智能内容整合标准流程），需要同步更新以下目录：

### 1. `5-skills/INDEX.md` 更新

在"Agent类"章节添加：

```markdown
### 🤖 Agent类
- [Awesome Agent Skills](./agent/awesome-agent-skills.md) - Agent技能集合
- [Skills Catalog](./agent/skills-catalog.md) - 完整Skills目录
- [Agent设计模式完整教程](./agent/design-patterns/README.md) ⭐⭐⭐⭐⭐ - 21个核心模式+7个附录，系统学习Agent开发

**适用场景**：
- Agent设计模式完整教程：系统学习Agent开发、掌握核心设计模式、从基础到高级完整路径

**详细文档**：[Agent Skills目录](./agent/README.md)
```

**Why**: 索引文件是导航的核心，必须在主索引中添加新内容的链接和简介，确保用户能够通过分类导航发现教程。

### 2. `5-skills/agent/README.md` 更新

添加新章节：

```markdown
### 📚 Agent设计模式系统教程

**完整教程**：[Agent设计模式完整教程](./design-patterns/README.md) ⭐⭐⭐⭐⭐

**核心内容**：
- 21个设计模式：从提示词链到探索发现，完整覆盖Agent开发
- 7个附录章节：高级提示技术、框架概览、实战案例
- 中英文双语：支持双语学习对照

**学习路径**：
- 入门：提示词链 → 路由 → 并行化
- 进阶：反思 → 工具使用 → 规划
- 高级：多Agent协作 → 记忆管理 → MCP协议
- 实践：安全模式 → 评估监控 → 编程Agent

**适用人群**：
- 程序员：系统学习Agent开发，掌握核心模式
- AI研究者：深入研究设计模式原理和应用
- 产品经理：了解Agent能力边界和设计原则

**GitHub链接**：
- 中文版：[xindoo/agentic-design-patterns](https://github.com/xindoo/agentic-design-patterns)
- 英文版：[Mathews-Tom/Agentic-Design-Patterns](https://github.com/Mathews-Tom/Agentic-Design-Patterns)
```

**How to apply**: 在Agent Skills目录中突出显示设计模式教程，提供学习路径建议和适用人群说明。

### 3. `roles/programmer/README.md` 更新

在"Agent开发"章节添加：

```markdown
### 🤖 Agent开发系统学习

**推荐教程**：[Agent设计模式完整教程](../../5-skills/agent/design-patterns/README.md)

**核心价值**：
- 系统掌握21个设计模式，从基础到高级
- 学习多Agent协作、MCP协议、安全模式等核心内容
- 实战案例丰富，包含编程Agent实践

**学习建议**：
1. 基础模式（1-3章）：提示词链、路由、并行化
2. 进阶模式（4-6章）：反思、工具使用、规划
3. 高级模式（7-10章）：多Agent协作、记忆管理、MCP
4. 实践应用：附录C框架概览、附录G编程Agent

**推荐工具**：
- [Claude Agent开发](../../2-choose-tools/tools/claude/README.md)
- LangChain框架（附录C）
- AgentSpace实战（附录D）
```

**Why**: 程序员是Agent开发的主要角色，必须在角色指南中提供明确的学习路径和资源推荐。

### 4. `.vitepress/config.mts` 更新

添加到侧边栏：

```typescript
// 中文侧边栏
sidebar: {
  '/': [
    {
      text: 'Agent设计模式',
      collapsible: true,
      collapsed: false,
      items: [
        { text: '教程概述', link: '/5-skills/agent/design-patterns/README.html' },
        { text: '第1章：提示词链', link: '/5-skills/agent/design-patterns/chapters/01-prompt-chaining.html' },
        { text: '第2章：路由', link: '/5-skills/agent/design-patterns/chapters/02-routing.html' },
        { text: '第3章：并行化', link: '/5-skills/agent/design-patterns/chapters/03-parallelization.html' },
        { text: '查看完整目录', link: '/5-skills/agent/design-patterns/README.html#学习路径' }
      ]
    }
  ]
}

// 英文侧边栏
sidebar: {
  '/en/': [
    {
      text: 'Agent Design Patterns',
      collapsible: true,
      collapsed: false,
      items: [
        { text: 'Course Overview', link: '/en/5-skills/agent/design-patterns/README.en.html' },
        { text: 'Chapter 1: Prompt Chaining', link: '/en/5-skills/agent/design-patterns/chapters/01-prompt-chaining.en.html' },
        { text: 'Chapter 2: Routing', link: '/en/5-skills/agent/design-patterns/chapters/02-routing.en.html' },
        { text: 'Chapter 3: Parallelization', link: '/en/5-skills/agent/design-patterns/chapters/03-parallelization.en.html' },
        { text: 'Full Catalog', link: '/en/5-skills/agent/design-patterns/README.en.html#learning-path' }
      ]
    }
  ]
}
```

**How to apply**: 侧边栏只显示前3章和概述，避免侧边栏过长影响用户体验，完整目录通过README查看。

## 实施流程

### 步骤1：克隆源仓库

```bash
# 克隆中文版本到临时目录
git clone https://github.com/xindoo/agentic-design-patterns.git /tmp/adp-chinese

# 克隆英文版本到临时目录
git clone https://github.com/Mathews-Tom/Agentic-Design-Patterns.git /tmp/adp-english
```

**Why**: 直接从GitHub获取源文件，避免手动抓取和格式转换，确保内容准确性。

### 步骤2：创建目标目录结构

```bash
mkdir -p 5-skills/agent/design-patterns/chapters
mkdir -p 5-skills/agent/design-patterns/appendix
```

### 步骤3：复制和重命名文件

从中文仓库提取21个章节文件和7个附录文件，重命名为标准命名格式（如 `01-prompt-chaining.md`）。

从英文仓库提取对应的英文文件，添加 `.en.md` 后缀。

**How to apply**: 需要根据源仓库的文件命名规范，统一转换为项目的命名格式，确保中英文文件名一致。

### 步骤4：添加frontmatter

为每个文件添加统一的frontmatter元数据，调整difficulty、tools、tags等字段。

### 步骤5：创建README文档

创建中英文双语的README.md和README.en.md，包含完整的教程介绍和学习路径。

### 步骤6：更新相关目录

按照上述设计，更新以下文件：
- `5-skills/INDEX.md`
- `5-skills/agent/README.md`
- `roles/programmer/README.md`
- `.vitepress/config.mts`

### 步骤7：构建和验证

**遵循项目规则5（索引更新铁律）**：

```bash
# 1. 构建项目（自动检查frontmatter、更新索引、构建网站、修复URL）
npm run build

# 2. 验证索引更新
grep "design-patterns" indexes/*.md

# 3. 本地测试
npm run docs:dev
# 访问 http://localhost:5173/anything-ai/
# 检查所有链接是否正常

# 4. 检查导航侧边栏
# 确保Agent设计模式出现在正确位置
```

**Why**: 规则5强调，更新内容后必须立即构建并验证索引，确保新内容能被导航系统发现。

### 步骤8：提交代码

```bash
git add .
git commit -m "feat: 整合Agent设计模式完整教程（21章节+7附录中英双语）"
git push
```

## 特色亮点

- ✅ **系统性完整**：21个核心模式 + 7个附录，从基础到高级完整覆盖
- ✅ **双语支持**：中英文对照学习，满足不同语言偏好
- ✅ **实战导向**：包含框架概览、编程Agent等实践内容
- ✅ **易于导航**：清晰的章节结构、学习路径建议、场景推荐
- ✅ **GitHub链接**：方便用户查看源码和参与贡献
- ✅ **智能整合**：遵循规则6，一次性完整整合所有相关目录

## 维护策略

- **定期同步**：每季度检查上游仓库更新，同步重要改进
- **链接维护**：确保GitHub链接始终有效
- **用户反馈**：收集用户学习反馈，优化学习路径建议

## 风险和挑战

1. **文件数量多**：58个文件，需要仔细管理frontmatter和命名规范
   - **应对措施**：使用脚本批量处理frontmatter，逐个验证

2. **命名规范统一**：源仓库文件名可能与项目规范不一致
   - **应对措施**：手动检查和重命名，确保一致性

3. **内容更新同步**：上游仓库可能持续更新
   - **应对措施**：记录整合版本，定期同步重要更新

4. **侧边栏长度**：完整显示所有章节会导致侧边栏过长
   - **应对措施**：侧边栏只显示前3章 + 概述，完整目录通过README查看

## 成功标准

- ✅ 所有58个文件创建完成，frontmatter正确
- ✅ 所有相关目录更新完成（INDEX、agent/README、programmer/README、config.mts）
- ✅ 构建成功，索引包含新内容
- ✅ 本地测试所有链接正常，侧边栏显示正确
- ✅ GitHub链接准确有效
- ✅ 中英文双语内容完整对齐

---

**设计完成日期**：2026-04-18
**下一步**：调用 writing-plans skill 创建详细实施计划