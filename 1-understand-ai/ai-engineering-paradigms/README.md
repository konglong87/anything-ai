---
title: AI工程范式演进
difficulty: intermediate
roles: [developer, product-manager, ai-engineer]
type: concept
duration: 20 min
tags: [AI Engineering, Prompt Engineering, Context Engineering, Harness Engineering]
tools: [Claude, GPT, AI Agents]
---

# AI工程范式演进

> 从对话到系统：AI应用的三层工程体系

## 🎯 什么是AI工程范式

AI工程范式是指与AI模型协作的方法论体系。随着AI技术发展，我们与AI的交互方式也在不断演进：

- **Prompt Engineering** - 对话层：如何与AI沟通
- **Context Engineering** - 信息层：给AI提供什么信息
- **Harness Engineering** - 系统层：构建完整的AI工作系统
- **Loop Engineering** - 自主层：让系统自己 prompt agent（2026.6 兴起）

这四层不是替代关系，而是层层递进、相互支撑的体系。

> ⚠️ **深刻认知**：无论 Harness 还是 Loop Engineering，本质都是**给 AI 打补丁**——因为当前 AI 能力还不够强，无法独立执行长线任务，所以我们需要这些工程手段来约束、引导、验证 AI 的工作。随着大模型能力越来越强，人类对中间过程的介入会越来越少。**我们目前处于一个发展的中间态。** 理解了这一点，才能既不低估当下这些范式的实用价值，也不高估它们的长期必要性。

---

## 📊 四层范式对比

### Prompt Engineering（提示词工程）

**核心问题**：如何向AI提问才能得到最好的回答？

**关注点**：
- 提示词设计
- 任务分解
- 输出格式控制
- 角色设定

**典型应用**：
- 写作辅助
- 代码生成
- 翻译任务
- 问答系统

**局限**：
- 依赖单次对话
- 缺乏上下文记忆
- 难以处理复杂系统
- 质量不稳定

**示例**：
```
你是一位资深产品经理。请帮我分析以下用户反馈数据，
提取关键痛点，并按优先级排序。

[用户反馈数据]
```

### Context Engineering（上下文工程）

**核心问题**：给AI提供哪些信息才能让它做出正确决策？

**关注点**：
- 上下文窗口管理
- 知识库构建
- 信息检索
- 状态追踪

**典型应用**：
- 代码助手（需要整个代码库上下文）
- 文档问答系统
- 客服机器人
- 数据分析助手

**关键挑战**：
- 上下文窗口限制
- 信息相关性筛选
- 知识更新同步
- token成本控制

**示例**：
```
# 给AI提供完整的项目上下文

## 项目结构
- src/
  - components/
  - utils/
  - styles/

## 关键文件
- package.json（依赖管理）
- tsconfig.json（TypeScript配置）
- README.md（项目文档）

## 编码规范
- 使用函数式组件
- 遵循Airbnb风格指南
- 单元测试覆盖率 > 80%

## 当前任务
请帮我添加一个用户头像组件...
```

### Harness Engineering（驾驭AI工程）

**核心问题**：如何构建完整的AI工作系统，让它可靠、可维护、可扩展？

**关注点**：
- 系统架构设计
- 约束与反馈机制
- 多agent协作
- 质量保证体系
- 工作流自动化

**典型应用**：
- 自动化代码审查系统
- 端到端测试系统
- 持续集成/部署
- 大规模代码生成项目

**关键要素**：
1. **架构约束** - 硬性规则，必须遵守
2. **反馈循环** - AI查AI，互相检查
3. **知识管理** - 动态更新的知识库
4. **错误预防** - 每次犯错就加规则

**示例**：
```
# Harness系统架构

## 路由层（CLAUDE.md）
- 判断任务类型
- 分发到对应工作区
- 加载特定规则集

## 约束层（Hooks）
- 文件编辑前：自动linting
- 代码生成后：类型检查
- 提交前：测试验证

## 能力层（Skills）
- 小红书配图生成
- 飞书文档同步
- 代码审查自动化

## 监督层（Evaluator）
- 独立的评估agent
- 端到端测试
- 质量评分
```

### Loop Engineering（循环工程）

**核心问题**：如何让系统自己 prompt agent，而不是你手动 prompt agent？

**关注点**：
- 自动化调度（Automations）
- 并行隔离（Worktrees）
- 项目知识固化（Skills）
- 外部工具连接（Connectors）
- 造/验分离（Sub-agents）
- 跨运行状态记忆（Memory）

**典型应用**：
- 每日 CI 失败自动分诊与修复
- 跨 turn 持续跑到目标满足的 `/goal`
- 自动化代码审查 + 开 PR + 关联工单
- 无人值守的长周期任务

**关键要素**：
1. **Automations** - 按计划触发，自行发现工作
2. **Worktrees** - 并行 agent 不打架
3. **Skills** - 项目知识写下来，不靠猜
4. **Connectors** - 接入真实工具链
5. **Sub-agents** - 造的验的分开
6. **Memory** - 状态落磁盘，跨运行存活

**示例**：
```
# Claude Code
/goal "test/auth 下所有测试通过，且 lint 干净"

# 每个工作日早上自动分诊
/loop "读昨天 CI 失败和未关闭 issue，写进 TODO.md" --schedule "0 9 * * 1-5"
```

> 📖 详见 [Loop Engineering 完整教程](../../4-advanced-topics/loop-engineering.md)

---

## 🔄 四层关系

```
┌─────────────────────────────────────────────────┐
│           Loop Engineering                      │  ← 自主层
│  ┌───────────────────────────────────────────┐  │
│  │        Harness Engineering                │  │  ← 系统层
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │      Context Engineering            │  │  │  ← 信息层
│  │  │  ┌───────────────────────────────┐  │  │  │
│  │  │  │    Prompt Engineering         │  │  │  │  ← 对话层
│  │  │  │                               │  │  │  │
│  │  │  └───────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**关系说明**：
- **Loop 包裹 Harness**：Loop 让 Harness 跑在定时器上、自我喂料、派生 agent
- **Harness 包含 Context**：Harness 管理整个系统，Context 是其中的一部分
- **Context 支撑 Prompt**：好的上下文让提示词更有效
- **Prompt 是基础**：无论系统多复杂，最终还是要通过对话与 AI 交互

**不是替代，而是升级**：
- 掌握 Prompt Engineering → 学会 Context Engineering
- 掌握 Context Engineering → 学习 Harness Engineering
- 掌握 Harness Engineering → 探索 Loop Engineering
- 每一层都建立在前一层的基础上

---

## 💡 为什么需要理解这些范式

### 1. 突破单次对话限制

**问题**：
- AI记不住之前的内容
- 每次都要重新解释背景
- 无法处理复杂项目

**解决**：
- Prompt：设计更好的提示词
- Context：维护项目知识库
- Harness：构建持续运行的系统

### 2. 提高输出质量

**问题**：
- 输出质量不稳定
- 经常犯错
- 难以预测结果

**解决**：
- Prompt：明确任务要求
- Context：提供完整信息
- Harness：硬性约束 + 反馈检查

### 3. 实现规模化应用

**问题**：
- 只能做小任务
- 难以自动化
- 无法批量处理

**解决**：
- Prompt：模板化任务
- Context：标准化信息流
- Harness：自动化工作流

---

## 🚀 学习路径

### 初学者路径

**第1周：Prompt Engineering**
- 学习提示词基础
- 掌握常见模式
- 实践简单任务

**第2-3周：Context Engineering**
- 理解上下文管理
- 学习知识库构建
- 实践中等复杂度任务

**第4-5周：Harness Engineering**
- 学习系统架构
- 掌握约束机制
- 实践复杂项目

**第6-8周：Loop Engineering**
- 理解自动化调度
- 学习子 agent 协作
- 实践 `/goal` 和 `/loop`

### 进阶者路径

**已有编程经验**：
1. 直接从Context Engineering开始
2. 快速掌握Harness概念
3. 结合实际项目实践

**无编程经验**：
1. 扎实学习Prompt Engineering
2. 理解AI行为模式
3. 逐步构建自己的Harness

---

## 📚 延伸阅读

### 各范式详细指南

- [提示词工程详解](./prompt-engineering/README.md)
- [上下文工程详解](./context-engineering/README.md)
- [驾驭AI工程详解](./harness-engineering/README.md)
- [Loop Engineering 详解](../../4-advanced-topics/loop-engineering.md) 🆕

### 实战案例

- [LangChain性能提升实践](./harness-engineering/langchain-case.md)
- [OpenAI Codex百万行代码项目](./harness-engineering/openai-codex-case.md)
- [Anthropic三agent架构](./harness-engineering/anthropic-three-agent.md)

### 相关资源

- [Claude使用指南](../../2-choose-tools/tools/claude/)
- [Agent架构详解](../agent-intro/agent-architecture.md)
- [超级产品经理技能包](../../roles/product-manager/README.md)

---

## ⚠️ 常见误区

### 1. 认为新范式替代旧范式

❌ **错误**：学了Context Engineering就不需要Prompt Engineering了

✅ **正确**：三层范式是递进关系，每一层都是下一层的基础

### 2. 过早追求复杂系统

❌ **错误**：刚开始就用Harness Engineering

✅ **正确**：从Prompt开始，逐步升级，让需求驱动技术选择

### 3. 忽视工程纪律

❌ **错误**：认为AI能解决一切，不需要约束

✅ **正确**：AI需要约束、反馈、监督，好的Harness是关键

---

## 总结

AI工程范式的演进，标志着我们从「与AI对话」走向「构建AI系统」，再到「设计自主运行的系统」：

**核心认知**：
- ✅ Prompt Engineering 是基础
- ✅ Context Engineering 是升级
- ✅ Harness Engineering 是体系化
- ✅ Loop Engineering 是自动化

**实践建议**：
1. 从简单任务开始
2. 根据需求选择范式
3. 让系统自然生长
4. 持续优化改进

**记住**：
- 没有最好的范式，只有最适合的
- 不要为了技术而技术
- 让问题驱动解决方案

---

## 🔮 深层反思：我们正处在一个"中间态"

### 所有工程范式，本质上都是在给 AI 打补丁

Harness Engineering 也好，Loop Engineering 也好，要解决的其实都是同一个问题：**当前 AI 的能力还不够。**

- **Prompt Engineering**：AI 不够聪明，需要你精心措辞
- **Context Engineering**：AI 记不住，需要你把信息喂到嘴边
- **Harness Engineering**：AI 不可靠，需要硬约束、反馈循环、AI 查 AI
- **Loop Engineering**：AI 不能自己跑长线任务，需要系统来调度

这些范式都是**补丁**——在 AI 能力不足以独立完成长线任务时，人类用来填补空白的手段。

### 趋势：人类介入越来越少

```
过去：人写每一行代码
  ↓
现在：人写 prompt，AI 写代码；人写 harness，AI 在有约束的框架里写代码
  ↓
正在：人设计 loop，系统 prompt agent，人只看结果
  ↓
未来：大模型能力越来越强 → 补丁一层层剥落 → 人类只需要定义目标
```

**Boris Cherny 说"我已经不 prompt Claude 了，我的工作是写 loop"，这是现在。但再往前一步——当模型本身就能理解上下文、自我验证、记住状态、跑长线任务——loop 也会变成过时的补丁。**

### 承认我们处于中间态

这不是否定 Harness 和 Loop 的价值。恰恰相反：

- **正是因为我们处于中间态，这些范式才极其重要。** 它们是在当前 AI 能力边界下，最大化效能的工程手段。
- **正是因为 AI 还会长期处于中间态，这些范式才值得严肃对待。** AGI 没那么快来，补丁还要打很久。
- **正是因为知道它们是补丁，才不会过度设计。** 你需要一个能跑的系统，不是一座宏伟的纪念碑。

**核心态度**：
- ✅ 认真用好当前的范式——它们今天能让你快 10 倍
- ✅ 理解它们的本质——它们是过渡期的产物
- ✅ 保持敏锐——当模型能力跨越某个阈值时，勇敢地扔掉不再需要的补丁
- ❌ 不要把补丁当真理——别把 Harness 或 Loop 当成"唯一正确的方式"

> **Anything is AI, AI Native, Agent Native。未来都是 AI Agent、智能体、智能体蜂群。** 我们正在路上，但还没到终点。保持实践，保持清醒，保持辩证。

---

**下一步**：选择你最感兴趣的方向深入学习 🚀