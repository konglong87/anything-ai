---
title: "AI Agents 全景指南"
title_en: "AI Agents: A Complete Guide"
difficulty: beginner
roles: [programmer, student, everyone]
type: concept
duration: 20min
tools: [claude, chatgpt, deepseek, hermes-agent, agent-frameworks]
tags: [Agent, AI Agent, 智能体, MCP, Agent框架, Agent设计模式, Coding Agent]
prerequisites: ["1-understand-ai/agent-intro/agent-intro"]
---

# AI Agents 全景指南

> 2026 年，AI Agent 不再是一个概念，而是每个开发者、创作者、知识工作者日常使用的工具。
> 本指南帮你从零到一，理解 Agent、用好 Agent、甚至自己造 Agent。

## 📖 这是什么

AI Agent（智能体）是能自主感知环境、规划行动、执行任务、反思结果的 AI 系统。它不再是"你问一句、它答一句"的聊天机器人，而是会**主动干活**的数字助手。

如果你对 Agent 还没有基本概念，先看：[Agent 入门 →](../1-understand-ai/agent-intro/agent-intro.md)

## 🗺️ 学习路径

```
[理解 Agent 是什么] → [区分 Agent 类型] → [搞懂工作原理] → [选框架/工具] → [看设计模式] → [动手实战]
     ↓                      ↓                  ↓                ↓               ↓              ↓
 agent-intro.md       agent-types.md    agent-workflow.md  agent-frameworks 设计模式教程  Hermes Agent
                                                           mcp-and-tools                   实战案例
```

## 📚 本章内容

### 1. [Agent 类型全景](./agent-types.md)
Coding Agent、Research Agent、Creative Agent、Analysis Agent——不同类型 Agent 的适用场景和能力边界。

### 2. [Agent 工作原理](./agent-workflow.md)
感知→规划→工具调用→执行→反思的循环，以及 LLM+记忆+工具三件套如何协同工作。

### 3. [MCP 协议与工具集成](./mcp-and-tools.md)
MCP（Model Context Protocol）如何让 Agent 连接外部世界，以及常见工具集成方案。

### 4. [Agent 框架选型](./agent-frameworks.md)
LangChain、CrewAI、AutoGPT、MetaGPT 等主流框架对比与选型建议。

### 5. [Hermes Agent 完整指南](./hermes-agent/README.md)
开源、自托管、支持长期记忆和 Skills 的 AI Agent，从安装到高级配置。

### 6. [Agent 设计模式教程](../5-skills/agent/design-patterns/README.md)
21 个 Agent 设计模式，覆盖提示词链、路由、并行化、反思、工具使用、多 Agent 协作等。

## 🔗 相关资源

- [Agent 入门（理解 AI）](../1-understand-ai/agent-intro/agent-intro.md) — 什么是 Agent，基础概念
- [Agent 开发（进阶主题）](../4-advanced-topics/agent-development.md) — 深入 Agent 架构与开发
- [Agent Skills 元指南](../2-choose-tools/agent-skills-guide.md) — SKILL.md 是什么，怎么自己造
- [MCP 协议详解](../4-advanced-topics/mcp.md) — MCP 协议深入
- [AI 编程 Agent 2026](../2-choose-tools/ai-coding-agents-2026.md) — 2026 年 Coding Agent 格局

## 💡 2026 年为什么 Agent 很重要

- **Coding Agent 爆发**：Claude Code、Cursor、Codex CLI、GitHub Copilot 等，2026 年已经深度嵌入开发流程
- **MCP 协议标准化**：已移交 Linux Foundation，变成 AI 连接工具的"USB-C 接口"
- **Agent Skills 生态成型**：Anthropic 开源 Agent Skills 标准，3 天 138k Star
- **多 Agent 协作**：多个 Agent 协同完成复杂任务成为现实
- **Agent 走向生产**：从玩具 Demo 到企业级部署，安全、监控、治理成为刚需

---

**下一步**：从 [Agent 类型全景](./agent-types.md) 开始，了解不同 Agent 能干什么。