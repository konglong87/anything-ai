---
title: "Agent 框架选型指南：LangChain、CrewAI、AutoGPT 等"
title_en: "Agent Framework Guide: LangChain, CrewAI, AutoGPT & More"
difficulty: intermediate
roles: [programmer]
type: guide
duration: 25min
tools: [langchain, crewai, autogpt, metagpt]
tags: [Agent, 框架, LangChain, CrewAI, AutoGPT, MetaGPT, 选型]
prerequisites: ["1-understand-ai/agent-intro/agent-intro"]
---

# Agent 框架选型指南：LangChain、CrewAI、AutoGPT 等

> 选框架不是选"最好的"，而是选"最适合你的"。先明确需求，再看框架。

## 🤔 什么时候需要框架

不是所有 Agent 场景都需要框架：

| 场景 | 是否需要框架 | 原因 |
|------|-------------|------|
| 单工具 + 单模型 | ❌ | 直接用 API + Function Calling |
| 多工具编排 | ✅ | 需要工具选择和流程管理 |
| 多 Agent 协作 | ✅ | 需要角色分配和通信机制 |
| 生产级部署 | ✅ | 需要监控、日志、错误处理 |
| 快速实验 | ❌ | 先用现成 Agent 工具（Claude Code 等） |

**简单原则**：能用现成工具解决的，不要自己造框架。

## 📊 主流框架对比

### 1. LangChain / LangGraph

**定位**：最成熟的 Agent 开发框架，从链式调用到图式编排

**核心特点**：
- 丰富的工具生态（数百个集成）
- LangGraph 支持复杂状态图
- LangSmith 提供监控和调试
- 社区最大，文档最全

**适合**：
- 需要丰富工具集成的项目
- 需要复杂状态管理的 Agent
- 企业级部署（有 LangSmith 监控）

**不适合**：
- 简单场景（过度抽象）
- 追求极简代码（LangChain 层级多）

**代码示例**：
```python
from langchain.agents import AgentExecutor, create_react_agent
from langchain.tools import Tool
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4")
tools = [Tool(name="search", func=search_func, description="搜索网页")]
agent = create_react_agent(llm, tools, prompt_template)
executor = AgentExecutor(agent=agent, tools=tools)
result = executor.invoke({"input": "研究 MCP 协议生态"})
```

---

### 2. CrewAI

**定位**：多 Agent 协作框架，角色扮演式编排

**核心特点**：
- 每个 Agent 有明确角色和目标
- 任务自动分配和协作
- 支持顺序和并行执行
- 简洁的 API 设计

**适合**：
- 多人协作场景（研究+写作+审查）
- 角色明确的团队任务
- 快速搭建多 Agent 系统

**不适合**：
- 单 Agent 场景（不需要多角色）
- 需要复杂状态图（CrewAI 流程较简单）

**代码示例**：
```python
from crewai import Agent, Task, Crew

researcher = Agent(role="研究员", goal="搜集信息", backstory="资深研究员")
writer = Agent(role="作家", goal="写文章", backstory="专业作家")

research_task = Task(description="研究 MCP 协议", agent=researcher)
write_task = Task(description="写科普文章", agent=writer, context=[research_task])

crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
result = crew.kickoff()
```

---

### 3. AutoGPT

**定位**：自主 Agent，目标驱动，最小人类干预

**核心特点**：
- 给一个目标，Agent 自己规划执行
- 自动分解任务、选择工具
- 持续迭代直到目标达成
- 最早的自主 Agent 项目之一

**适合**：
- 探索性任务（目标明确但路径未知）
- 实验和学习（理解自主 Agent 的边界）
- 信息搜集和整理

**不适合**：
- 生产部署（自主性高，可控性低）
- 高风险任务（错误代价大）
- 需要精确控制的场景

---

### 4. MetaGPT

**定位**：模拟软件公司的多 Agent 系统

**核心特点**：
- Agent 模拟公司角色（产品经理、架构师、工程师、QA）
- 输入一句话需求，输出完整项目
- 标准化 SOP 流程
- 生成设计文档、代码、测试

**适合**：
- 从需求到代码的全流程自动化
- 学习多 Agent 协作的最佳实践
- 快速原型生成

**不适合**：
- 非软件开发场景
- 需要精细控制的开发任务

---

### 5. 其他值得关注

| 框架 | 定位 | 特点 |
|------|------|------|
| **Semantic Kernel** | 微软出品 | .NET/Python/Java，企业级 |
| **PydanticAI** | 类型安全 | Python，强类型验证 |
| **OpenAI Agents SDK** | OpenAI 官方 | 轻量，与 OpenAI API 深度集成 |
| **Smolagents** | HuggingFace | 极简，适合学习和实验 |
| **Agent Protocol** | AI Engineer Foundation | Agent 互操作标准 |

## 🆚 速查对比表

| 维度 | LangChain | CrewAI | AutoGPT | MetaGPT |
|------|-----------|--------|---------|---------|
| **成熟度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **易用性** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **灵活性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **多 Agent** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **监控** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **MCP 支持** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |
| **社区规模** | 最大 | 中大 | 大 | 中 |
| **适合场景** | 企业/复杂 | 多角色协作 | 探索/实验 | 软件开发 |

## 🎯 选型决策树

```
你的需求是什么？
│
├── 单 Agent + 多工具
│   ├── 需要丰富工具生态 → LangChain
│   ├── 需要简单快速 → PydanticAI / OpenAI Agents SDK
│   └── 需要类型安全 → PydanticAI
│
├── 多 Agent 协作
│   ├── 角色明确、流程简单 → CrewAI
│   ├── 角色明确、流程复杂 → LangGraph
│   ├── 模拟软件公司 → MetaGPT
│   └── 完全自主 → AutoGPT
│
├── 生产部署
│   ├── 需要监控 → LangChain + LangSmith
│   ├── .NET 生态 → Semantic Kernel
│   └── 极简部署 → OpenAI Agents SDK
│
└── 学习和实验
│   ├── 理解 Agent 基础 → Smolagents
│   ├── 理解自主 Agent → AutoGPT
│   └── 理解多 Agent → CrewAI
```

## ⚠️ 选型常见误区

| 误区 | 正确理解 |
|------|----------|
| "选最流行的" | 选最适合你场景的 |
| "框架越复杂越好" | 简单场景用简单方案 |
| "用了框架就不用把关" | 框架只是工具，人类仍需审查 |
| "框架能解决所有问题" | 框架解决编排，不解决 LLM 质量 |
| "一定要自己造 Agent" | 能用 Claude Code 等现成工具就先用 |

## 🔗 延伸阅读

- [Agent 类型全景 →](./agent-types.md) — 不同 Agent 擅长什么
- [Agent 工作原理 →](./agent-workflow.md) — Agent 内部怎么运转
- [MCP 与工具集成 →](./mcp-and-tools.md) — Agent 怎么连接外部世界
- [Agent 设计模式 →](../5-skills/agent/design-patterns/README.md) — 21 个设计模式深入
- [Agent 开发（进阶） →](../4-advanced-topics/agent-development.md) — 深入架构与开发
