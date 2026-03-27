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

这三层不是替代关系，而是层层递进、相互支撑的体系。

---

## 📊 三层范式对比

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

---

## 🔄 三层关系

```
┌─────────────────────────────────────────┐
│        Harness Engineering              │  ← 系统层
│  ┌───────────────────────────────────┐  │
│  │      Context Engineering          │  │  ← 信息层
│  │  ┌─────────────────────────────┐  │  │
│  │  │    Prompt Engineering       │  │  │  ← 对话层
│  │  │                             │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**关系说明**：
- **Harness包含Context**：Harness管理整个系统，Context是其中的一部分
- **Context支撑Prompt**：好的上下文让提示词更有效
- **Prompt是基础**：无论系统多复杂，最终还是要通过对话与AI交互

**不是替代，而是升级**：
- 掌握Prompt Engineering → 学会Context Engineering
- 掌握Context Engineering → 学习Harness Engineering
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

**第4-6周：Harness Engineering**
- 学习系统架构
- 掌握约束机制
- 实践复杂项目

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

AI工程范式的演进，标志着我们从「与AI对话」走向「构建AI系统」：

**核心认知**：
- ✅ Prompt Engineering是基础
- ✅ Context Engineering是升级
- ✅ Harness Engineering是体系化

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

**下一步**：选择你最感兴趣的方向深入学习 🚀