---
title: "多 Agent 协作实战：从单兵作战到团队协同"
title_en: "Multi-Agent Collaboration in Practice: From Solo to Team"
difficulty: advanced
roles: [programmer, developer, architect]
type: guide
duration: 30min
tools: [crewai, langchain, langgraph, metagpt, claude-code]
tags: [Agent, 多Agent协作, CrewAI, LangGraph, MetaGPT, Agent通信, 角色分工, 编排模式]
prerequisites: ["3-ai-agents/agent-types", "3-ai-agents/agent-workflow", "3-ai-agents/agent-frameworks"]
---

# 多 Agent 协作实战：从单兵作战到团队协同

> 单个 Agent 能完成简单任务，但复杂任务需要多个 Agent 协同——就像一个人能写代码，但造一个产品需要产品经理、设计师、工程师、QA 一起配合。

## 🤔 为什么需要多 Agent 协作

单个 Agent 的局限：

| 局限 | 表现 | 多 Agent 如何解决 |
|------|------|-------------------|
| **能力单一** | 一个 Agent 不擅长所有事 | 每个 Agent 专注擅长的领域 |
| **上下文过载** | 复杂任务信息太多，单个 Agent 处理不了 | 分工后每个 Agent 上下文更聚焦 |
| **质量不稳** | 单个 Agent 容易遗漏或犯错 | 多 Agent 交叉审查，互相纠错 |
| **效率瓶颈** | 串行处理，速度慢 | 并行处理，多个 Agent 同时干活 |

**核心类比**：单 Agent = 一个人干所有事；多 Agent = 一个团队各司其职。

## 📊 四种协作模式

### 模式 1：串行流水线（Pipeline）

**特征**：Agent 按顺序依次处理，前一个的输出是后一个的输入

```
[Research Agent] → [Writer Agent] → [Review Agent]
    搜集信息          写文章           审查质量
```

**适用场景**：
- 内容生产（研究→写作→审查）
- 代码开发（设计→编码→测试）
- 数据处理（采集→清洗→分析→报告）

**优点**：流程清晰，每步质量可控
**缺点**：串行执行，速度受限于最慢的环节

**CrewAI 实现**：
```python
from crewai import Agent, Task, Crew

researcher = Agent(
    role="研究员",
    goal="搜集关于 MCP 协议的最新信息",
    backstory="资深技术研究员，擅长信息搜集和交叉验证"
)

writer = Agent(
    role="技术作家",
    goal="基于研究结果写一篇科普文章",
    backstory="专业技术作家，擅长把复杂概念讲清楚"
)

reviewer = Agent(
    role="审查员",
    goal="审查文章的准确性和可读性",
    backstory="严格的编辑审查员，确保内容准确无误"
)

research_task = Task(description="研究 MCP 协议生态现状", agent=researcher)
write_task = Task(description="写 MCP 协议科普文章", agent=writer, context=[research_task])
review_task = Task(description="审查文章质量", agent=reviewer, context=[write_task])

crew = Crew(
    agents=[researcher, writer, reviewer],
    tasks=[research_task, write_task, review_task],
    process="sequential"  # 串行执行
)
result = crew.kickoff()
```

---

### 模式 2：并行分工（Parallel）

**特征**：多个 Agent 同时处理不同子任务，最后合并结果

```
[Frontend Agent] ──→ 合并 → [Integration Agent]
[Backend Agent]  ──→      → [测试]
[DB Agent]       ──→
```

**适用场景**：
- 全栈开发（前端+后端+数据库同时开发）
- 多源研究（同时搜索多个信息源）
- 多维度分析（同时做安全+性能+逻辑审查）

**优点**：速度快，多个 Agent 同时干活
**缺点**：合并结果需要协调，可能产生冲突

**LangGraph 实现**：
```python
from langgraph.graph import StateGraph

# 定义并行节点
def frontend_develop(state):
    """前端 Agent 开发 UI"""
    return {"frontend_code": generate_frontend(state["requirements"])}

def backend_develop(state):
    """后端 Agent 开发 API"""
    return {"backend_code": generate_backend(state["requirements"])}

def db_design(state):
    """数据库 Agent 设计表结构"""
    return {"db_schema": design_schema(state["requirements"])}

def integrate(state):
    """集成 Agent 合并所有部分"""
    return {"project": integrate_all(
        state["frontend_code"],
        state["backend_code"],
        state["db_schema"]
    )}

# 构建并行图
graph = StateGraph(ProjectState)
graph.add_node("frontend", frontend_develop)
graph.add_node("backend", backend_develop)
graph.add_node("db", db_design)
graph.add_node("integrate", integrate)

# 并行执行前端、后端、数据库
graph.add_edge("frontend", "integrate")
graph.add_edge("backend", "integrate")
graph.add_edge("db", "integrate")

app = graph.compile()
result = app.invoke({"requirements": "开发一个用户管理系统"})
```

---

### 模式 3：层级管理（Hierarchical）

**特征**：一个"管理者" Agent 分配任务给多个"执行者" Agent

```
[Manager Agent]
    ├── [Worker Agent 1] — 前端开发
    ├── [Worker Agent 2] — 后端开发
    ├── [Worker Agent 3] — 测试
    └── [Worker Agent 4] — 文档
```

**适用场景**：
- 大型项目开发（管理者分配模块给不同 Agent）
- 复杂研究任务（管理者规划研究方向）
- 企业级自动化（管理者协调多个专业 Agent）

**优点**：管理者统一协调，避免冲突和重复
**缺点**：管理者本身可能出错，决策质量依赖管理者

**MetaGPT 实现**：
```python
from metagpt.software_company import generate_repo, ProjectRole

# MetaGPT 模拟软件公司角色
# 产品经理 → 架构师 → 工程师 → QA
project = generate_repo(
    idea="开发一个在线教育平台",
    roles=[
        ProjectRole.PRODUCT_MANAGER,
        ProjectRole.ARCHITECT,
        ProjectRole.PROJECT_MANAGER,
        ProjectRole.ENGINEER,
        ProjectRole.QA_ENGINEER
    ]
)
```

---

### 模式 4：辩论对抗（Debate）

**特征**：多个 Agent 从不同角度辩论，最终达成共识或由裁判决定

```
[Pro Agent] ──→ 辩论 ──→ [Judge Agent] → 最终决策
[Con Agent] ──→
```

**适用场景**：
- 方案评审（正方支持 vs 反方质疑）
- 安全审查（攻击方 vs 防御方）
- 决策分析（乐观分析 vs 风险分析）

**优点**：多角度审视，减少盲区
**缺点**：消耗更多 Token，需要裁判机制

**实现思路**：
```python
# 辩论模式：两个 Agent 从不同角度分析同一问题
pro_agent = Agent(
    role="方案支持者",
    goal="论证方案的优点和可行性",
    backstory="乐观的技术分析师"
)

con_agent = Agent(
    role="方案质疑者",
    goal="找出方案的风险和缺陷",
    backstory="严格的风险分析师"
)

judge_agent = Agent(
    role="裁判",
    goal="综合双方观点，做出最终判断",
    backstory="公正的技术决策者"
)

# 先让正方和反方各自分析
pro_analysis = pro_agent.execute("分析这个技术方案的优点")
con_analysis = con_agent.execute("分析这个技术方案的风险")

# 裁判综合判断
final_decision = judge_agent.execute(
    f"综合以下分析做出判断：\n正方：{pro_analysis}\n反方：{con_analysis}"
)
```

## 🆚 协作模式对比

| 维度 | 串行流水线 | 并行分工 | 层级管理 | 辩论对抗 |
|------|-----------|---------|---------|---------|
| **速度** | 慢（串行） | 快（并行） | 中 | 慢（多轮辩论） |
| **质量** | 高（逐步审查） | 中（合并可能冲突） | 中（依赖管理者） | 高（多角度审视） |
| **复杂度** | 低 | 中 | 高 | 中 |
| **Token消耗** | 低 | 中 | 高 | 高 |
| **适合场景** | 内容生产 | 全栈开发 | 大型项目 | 方案评审 |
| **框架** | CrewAI | LangGraph | MetaGPT | 自定义 |

## 🎯 实战案例：用多 Agent 开发一个完整功能

### 案例：开发用户认证模块

**单 Agent 方式**（慢、质量不稳）：
```
一个 Agent 从头到尾完成：
设计 → 写模型 → 写路由 → 写中间件 → 写测试 → 写文档
问题：上下文过载，容易遗漏，质量不稳定
```

**多 Agent 协作方式**（快、质量高）：

```
[架构 Agent] — 设计认证方案和数据库模型
    ↓
[前端 Agent] — 开发登录/注册页面（并行）
[后端 Agent] — 开发 API 路由和中间件（并行）
    ↓
[QA Agent] — 编写和执行测试
    ↓
[审查 Agent] — 安全审查 + 代码审查
```

**CrewAI 完整实现**：
```python
from crewai import Agent, Task, Crew

# 定义角色
architect = Agent(
    role="架构师",
    goal="设计认证方案",
    backstory="资深架构师，擅长安全设计",
    tools=[database_tool, api_tool]
)

frontend_dev = Agent(
    role="前端工程师",
    goal="开发认证页面",
    backstory="React 专家",
    tools=[code_tool, browser_tool]
)

backend_dev = Agent(
    role="后端工程师",
    goal="开发认证 API",
    backstory="FastAPI 专家",
    tools=[code_tool, terminal_tool]
)

qa_engineer = Agent(
    role="QA工程师",
    goal="测试认证功能",
    backstory="严格的测试工程师",
    tools=[test_tool, terminal_tool]
)

security_reviewer = Agent(
    role="安全审查员",
    goal="审查认证安全性",
    backstory="安全专家，擅长发现漏洞",
    tools=[code_tool, security_tool]
)

# 定义任务
design_task = Task(description="设计 JWT 认证方案和数据库模型", agent=architect)
frontend_task = Task(description="开发登录注册页面", agent=frontend_dev, context=[design_task])
backend_task = Task(description="开发认证 API 和中间件", agent=backend_dev, context=[design_task])
test_task = Task(description="编写和执行认证测试", agent=qa_engineer, context=[frontend_task, backend_task])
review_task = Task(description="安全审查认证模块", agent=security_reviewer, context=[frontend_task, backend_task])

crew = Crew(
    agents=[architect, frontend_dev, backend_dev, qa_engineer, security_reviewer],
    tasks=[design_task, frontend_task, backend_task, test_task, review_task],
    process="sequential"
)
result = crew.kickoff()
```

## ⚠️ 多 Agent 协作的坑

### 常见问题

| 坑 | 表现 | 防御 |
|----|------|------|
| **通信混乱** | Agent 之间信息传递不一致 | 定义清晰的接口和数据格式 |
| **重复劳动** | 多个 Agent 做了相同的事 | 管理者分配明确，任务不重叠 |
| **合并冲突** | 并行 Agent 的产出互相矛盾 | 定义合并规则和冲突解决机制 |
| **质量失控** | 某个 Agent 产出质量差，影响下游 | 每步设置质量门槛，不合格不传递 |
| **Token爆炸** | 多 Agent 消耗大量 Token | 控制每个 Agent 的上下文大小，避免冗余 |
| **管理者失误** | 管理者 Agent 分配错误 | 人类审查管理者决策，关键节点人类介入 |

### 防御原则

1. **接口清晰** — Agent 之间的输入输出格式必须明确定义
2. **任务不重叠** — 每个任务只分配给一个 Agent，避免重复
3. **质量门槛** — 每步产出必须达到标准才能传递给下一步
4. **人类介入** — 关键决策节点由人类审查
5. **Token 控制** — 每个 Agent 的上下文大小有上限

## 📐 选择决策树

```
你的任务是什么？
│
├── 内容生产（研究→写作→审查） → 串行流水线（CrewAI）
│
├── 全栈开发（前端+后端+数据库） → 并行分工（LangGraph）
│
├── 大型项目（多模块协调） → 层级管理（MetaGPT）
│
├── 方案评审（多角度分析） → 辩论对抗（自定义）
│
└── 简单任务 → 单 Agent 就够了，不要过度设计
│
└── 不确定 → 先用串行流水线，最简单最可控
```

## 🔗 延伸阅读

- [Agent 类型全景 →](./agent-types.md) — 不同 Agent 擅长什么
- [Agent 工作原理 →](./agent-workflow.md) — Agent 内部怎么运转
- [Agent 框架选型 →](./agent-frameworks.md) — 各框架的多 Agent 支持
- [多 Agent 协作设计模式 →](../5-skills/agent/design-patterns/chapters/07-multi-agent-collaboration.md) — 设计模式深入
- [Agent 间通信设计模式 →](../5-skills/agent/design-patterns/chapters/15-inter-agent-communication.en.md) — Agent 通信机制
- [Agent 安全与治理 →](./agent-safety-governance.md) — 多 Agent 的安全挑战

---

**下一步**：选一个你正在做的项目，尝试用串行流水线模式（最简单）拆分成 2-3 个 Agent 角色，感受多 Agent 协作的效果。
