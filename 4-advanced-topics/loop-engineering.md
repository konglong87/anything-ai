---
title: "Loop Engineering：从写提示词到设计自主工作流"
title_en: "Loop Engineering: From Writing Prompts to Designing Autonomous Workflows"
difficulty: advanced
roles: [programmer, everyone]
type: concept
duration: 30min
tools: [claude, codex, cursor]
tags: [Agent, Loop Engineering, 自动化, AI工程, Agentic AI]
author: "Anything-AI Team"
created: 2026-06-11
updated: 2026-06-11
version: 1.0
---

# Loop Engineering：从写提示词到设计自主工作流

> 你不再手动 prompt agent，而是设计一个系统来 prompt agent。

## 🤔 这个概念是什么

**Loop Engineering**（循环工程）是 2026 年 6 月由 Google 工程师 Addy Osmani 命名的 AI 工程新范式。它的核心思想是：**把"那个不停 prompt agent 的人"换成"一个不停 prompt agent 的系统"，而你负责设计这个系统。**

**通俗理解**：
过去两年，你用 coding agent 的方式是：写好 prompt → 看返回 → 敲下一条 → 再看返回。你全程握着工具，一轮接一轮。你是那个"回路里的调度器"。

Loop Engineering 不同。你定义一次目标，agent 在一个持续运行的循环里自行迭代：**生成 → 执行 → 验证 → 反馈 → 再生成**，直到任务真正完成。人的工作从"敲提示词"转变为"设计规则、状态和边界"。

**技术定义**：
Loop Engineering 是在 Prompt Engineering 和 Context Engineering 之上叠加的自主控制结构。它利用 Automations（自动化）、Worktrees（工作树）、Skills（技能）、Plugins（连接器）、Sub-agents（子 agent）、State（状态记忆）六块构件，构建跨多个 turn 的自运行周期。

> Anthropic Claude Code 负责人 Boris Cherny："我已经不 prompt Claude 了。我有一堆 loop 在跑、在 prompt Claude、在判断下一步该做什么。我的工作是写 loop。"

## 📖 为什么重要

### 1. 杠杆点发生了根本位移

| 层级 | 你优化的对象 | 工作单元 |
|------|-------------|---------|
| Prompt Engineering | 单条指令怎么措辞 | 你手敲的一个 turn |
| Context Engineering | 窗口里放什么（文档、历史、工具定义） | 一次回答的周边条件 |
| Loop Engineering | 决定 prompt 什么、何时 prompt、结果是否可接受的那个系统 | 跨多个 turn 的自运行周期 |

三层不是互相取代的关系。Loop 由 prompt 构成，Loop 的每个 turn 仍需上下文工程。Loop Engineering 增加的是包裹在这一切之上的**自主控制结构**。

### 2. AI Agent 天然需要循环

AI Agent 和普通聊天的区别在于它不只生成文本，还调用工具、读取状态、执行动作。只要进入工具调用和真实环境，单次 prompt 就很难覆盖所有分支：

- **代码修复**：改代码 → 跑测试 → 测试失败 → 分析报错 → 再改 → 再跑...直到全绿
- **库存补货**：读库存 → 判断阈值 → 查询供应商 → 生成订单 → 等待确认，失败时回滚
- **CI 分诊**：读昨天的失败 → 分析原因 → 分类 → 能自动修的修，不能修的丢给你

这些场景中，**真正重要的是流程和约束，而不是某一句提示词写得多漂亮。**

### 3. 从"冷启动"到"知识复利"

没有 Loop，每个会话从零开始，agent 会用一个自信的猜测填补你意图里的空缺。有了 Loop + Skills + Memory，知识和状态跨运行复利累积，每次都从上次停下的地方继续。

## 🎯 核心架构：六块构件

### 1. Automations（自动化）—— Loop 的心跳

Automations 是让 loop 真正成为 loop 的东西：按计划触发，自行发现工作、分诊结果。

| 工具 | 实现方式 |
|------|---------|
| **Claude Code** | `/loop` 按间隔排成 cron；`/goal` 跨 turn 跑到条件满足；hooks；GitHub Actions |
| **OpenAI Codex** | Automations 标签页：选项目、prompt、节奏、环境；`/goal` 跑到完成 |

**`/goal` 的关键设计**：每个 turn 之后，由一个独立的、更小的模型来判断是否完成——写代码的 agent 不是给自己打分的那个。这就是"造/验分离"应用到停止条件本身。

```bash
# Claude Code 示例
/goal "test/auth 下所有测试通过，且 lint 干净"

# 每个工作日 9 点跑分诊
/loop "读昨天的 CI 失败和未关闭 issue，写进 TODO.md" --schedule "0 9 * * 1-5"
```

### 2. Worktrees（工作树）—— 并行不打架

两个 agent 写同一个文件 = 两个工程师没打招呼就往同一行提交。`git worktree` 给每个 agent 独立的 checkout，物理上碰不到对方的文件。

- **Claude Code**：`--worktree` 开关，子 agent 上 `isolation: worktree`
- **Codex**：每个 thread 内建 worktree 支持

> ⚠️ Worktree 消除机械碰撞，但不消除 review 瓶颈。你能读懂并批准多少个合并改动，才决定你能跑多少个并行 agent。

### 3. Skills（技能）—— 别每次都重新解释项目

Skill 是你不必每个会话都重新解释同一份项目上下文的办法。

```
Skill = 持久知识（怎么构建、约定是什么、为什么不那么做）
格式：文件夹 + SKILL.md（指令 + 元数据）+ 可选脚本/引用/资产
两个工具用同一种格式
```

没有 Skill，loop 每个周期把整个项目从零重新推导；有 Skill，知识跨运行复利累积。

### 4. Plugins & Connectors（连接器）—— Loop 摸到你的真实工具

Connectors 基于 MCP（Model Context Protocol），让 agent 读 issue tracker、查数据库、打 staging API、往 Slack 丢消息。

这是"这是修复方案"的 agent 和"CI 一绿就自己开 PR、关联工单、在频道里 @ 一声"的 loop 之间的区别。

### 5. Sub-agents（子 agent）—— "造的"和"验的"分开

Loop 里最有用的一条结构规则：**写代码的 agent 和检查的 agent 永远是两个**。

| 角色 | 模型要求 | 工具权限 |
|------|---------|---------|
| Explorer（探索者） | 快速、只读 | 读文件、搜索 |
| Implementer（实现者） | 适中 | 读写文件、执行命令 |
| Reviewer（校验者） | 强模型、高 effort | 读文件、跑测试、对照规格 |

```markdown
# .claude/agents/reviewer.md 示例
---
name: spec-reviewer
description: 对照项目 skills 与测试，review 改动草稿
model: opus
isolation: worktree
---
你是一个对抗性 reviewer。跑测试套件，对照 CONVENTIONS.md 检查 diff。
任何无法被可验证地判定为"完成"的，一律驳回。
```

> 为什么子 agent 更费 token？每个子 agent 各自跑模型和工具调用。把它们花在"第二意见值这个钱"的地方。

### 6. Memory / State（状态记忆）—— Loop 的脊柱

模型在两次运行之间会忘掉一切。状态必须落在**磁盘上**，不在上下文窗口里。

```
# TODO.md —— 跨运行存活的 memory 文件
## Open
- [ ] test/auth/login.spec.ts 里的 flaky 测试（CI #4821）
## Done
- [x] axios 升到已打补丁版本（PR #312，已 merge）
```

## 🔧 一个完整的 Loop 长什么样

把六块构件拼起来：

> 一个 automation 每个工作日早上在仓库上跑 → 调一个分诊 skill → skill 读昨天的 CI 失败、未关闭 issue、近期 commit → 把发现写进 memory 文件 → 对每个值得做的发现，开 worktree 派子 agent 起草修复 → 第二个子 agent 对照项目 skills 和测试 review → Connectors 开 PR、更新工单 → 处理不了的落进 triage 收件箱给你

你看清楚你实际做了什么：**你把这套系统设计了一次，没有手动 prompt 其中任何一步。**

## ⚠️ Loop 不替你解决的那些问题

### 1. 验证仍然落在你头上

无人值守跑的 loop 也是无人值守犯错的 loop。"完成"是一个声明，不是证明。你的职责是**发布你确认能跑的代码**。

### 2. 理解债（Comprehension Debt）增长更快

Loop 越快发布你没写的代码，仓库里"实际存在的东西"和你"真正理解的东西"之间的鸿沟越大。除非你去读 loop 产出的东西。

### 3. 认知投降（Cognitive Surrender）是那个舒适的失败

当 loop 自己跑起来，停止持有观点、照单全收，很有诱惑力。带着判断设计 loop 是解药；为了逃避思考设计 loop 是助燃剂。**同一个动作，相反的结果。**

### 4. Token 成本不可忽视

定时 loop + 每 turn 后校验模型 + 派生子 agent = token 快速燃烧。**起步：** 慢节奏 + 紧目标条件 → 观察几天 → 确认产出后再放大。

## 📋 第一次搭 Loop 的起点

| 步骤 | 做什么 | 验证 |
|------|--------|------|
| 1 | 一个每天早上把 CI 失败分诊进 markdown 文件、**不自动 merge** 的 automation | 看几天分诊结果准不准 |
| 2 | 加一个简单的 triage skill，把项目约定写进去 | 分诊更精准了？ |
| 3 | 对标记为 `quick-win` 的项派子 agent 起草修复，第二个子 agent review | 修复质量如何？ |
| 4 | 连接 Linear/GitHub，自动开 PR 但不自动 merge | 跑一周，看 merge 率 |
| 5 | 逐步扩容：更多触发条件、更多子 agent、更多 connector | 控制成本，守住验证 |

**核心原则：搭 loop，但继续做那个工程师。** 手动直接 prompt agent 依然有效。目标是平衡：反复的、可验证的工作交给 loop，你的判断才是价值的部分留给直接控制。

## 🆚 Loop Engineering vs 相关工作模式

| 模式 | 核心特征 | 适合场景 |
|------|---------|---------|
| **Prompt Engineering** | 单次一问一答，优化措辞 | 问答、摘要、简单代码片段 |
| **Agent Harness** | 单次 agent 运行的环境 | 定义 agent 在一个会话内的行为 |
| **Loop Engineering** | 多 turn 自运行、自我喂料、派生 agent | 长周期、可验证、多步任务 |
| **Multi-Agent** | 多个 agent 协作完成一个任务 | 需要不同专业角色的复杂任务 |

## 📅 时效性说明

> 📅 本文最后更新于 2026-06-11
>
> Loop Engineering 是 2026 年 6 月兴起的新范式。Claude Code 和 OpenAI Codex 已内置全部六块构件，但具体命令和产品能力可能变化，请以官方文档为准。

## 🔗 延伸阅读

### 前置知识
- [Agent 介绍](../../1-understand-ai/agent-intro/) - 理解 AI Agent 基础概念

### 相关概念
- [Agent 开发](./agent-development.md) - Agent 架构与开发
- [提示词工程](./prompt-engineering.md) - Prompt 设计原则与技巧

### 外部参考
- [Addy Osmani: Loop Engineering](https://addyo.substack.com/p/loop-engineering) - 概念提出者的原文
- [Loop Engineering 深度解析（中文）](https://juejin.cn/post/7649738148373889065) - 中文详解
- [Loops 取代 Prompts（中文）](https://knightli.com/2026/06/10/loops-replace-prompts-agent-loop-engineering/) - 中文解读

---

**💡 核心要记住的**：Loop Engineering 不是让工作变简单，而是**最高价值的事情变了**——从写 prompt 的品质，变成设计"生成并校验 prompt 的系统"。搭好你的 loop。但要像一个打算继续当工程师的人那样搭它。