---
title: Harness Engineering - 驾驭AI工程
difficulty: advanced
roles: [developer, ai-engineer, architect]
type: concept
duration: 25 min
tags: [Harness Engineering, AI Architecture, Agent System]
tools: [Claude, AI Agents, Automation]
---

# Harness Engineering - 驾驭AI工程

> 不只是让AI干活，而是让AI在系统中可靠、可维护地干活

## 🎯 核心理念

### 什么是Harness Engineering？

**Harness（缰绳、马具）**：不是马本身，而是套在马身上让它能拉车、能被引导的那整套东西。

**Harness Engineering**：构建完整的约束、反馈、管理系统，让AI在可控的框架内发挥最大能力。

### 三层关系

```
Prompt Engineering  →  你对马说的话："向左转、跑快点"
Context Engineering →  帮马看路的一切：地图、路标、地形
Harness Engineering →  缰绳、马鞍、围栏和道路本身
```

**关键区别**：
- Prompt是**建议**："请注意代码规范"
- Harness是**约束**：linting不通过就不让提交

---

## 💡 为什么需要Harness？

### 问题：AI很强，但不靠谱

**典型场景**：
```
1. AI生成代码 → 编译不通过
2. AI写文档 → 风格不一致
3. AI做重构 → 破坏现有功能
4. AI自动提交 → 出现严重bug
```

**根本原因**：
- AI只解决眼前任务，不考虑长期维护
- AI不会自我检查，经常犯错而不自知
- AI缺乏系统视角，不了解整体架构

### 解决：用Harness管住AI

**LangChain案例**：
- 模型完全没换
- 只改了系统提示词、工具配置、钩子
- 成绩从52.8%涨到66.5%
- 排名从Top 30跳到Top 5

**结论**：模型可能已经不是瓶颈了，瓶颈是你给它搭了个什么样的环境。

---

## 🏗️ Harness的三大支柱

### 1. 上下文工程（Context Engineering）

**核心原则**：给模型一张地图，不是一本1000页的说明书。

**关键要素**：
- **持续更新的知识库**：代码库、文档、架构设计
- **实时系统状态**：当前环境、依赖版本、运行状态
- **上下文压缩**：精简信息，避免"上下文焦虑"

**Claude的上下文焦虑**：
- 上下文太多，表现反而变差
- 必须定期清空重来
- 压缩不够，效率下降

**实践建议**：
```
✅ 好的上下文：
- 项目结构总览
- 关键约束清单
- 当前任务相关文件
- 最近变更记录

❌ 坏的上下文：
- 所有历史记录
- 无关的文档
- 未压缩的日志
- 冗余的信息
```

### 2. 架构约束（Architecture Constraints）

**核心原则**：不光靠AI自己检查，还有硬规则在旁边盯着。

**约束类型**：

**编译时约束**：
- TypeScript类型检查
- ESLint规则
- 单元测试
- 构建验证

**运行时约束**：
- API schema验证
- 性能阈值
- 安全策略
- 权限控制

**流程约束**：
- Git hooks
- CI/CD检查
- Code review要求
- 部署审批

**示例**：
```bash
# Git pre-commit hook
npm run lint        # 代码风格检查
npm run test        # 单元测试
npm run type-check  # 类型检查
# 任一失败，提交被阻止
```

### 3. 垃圾回收（Garbage Collection）

**核心原则**：专门有个agent周期性运行，不写代码不做功能，就干一件事：找茬。

**Anthropic的三agent架构**：
```
┌─────────────┐
│   Planner   │  规划者：把简单指令扩展成详细规格
└──────┬──────┘
       │
┌──────▼──────┐
│  Generator  │  生成者：按迭代一次做一个功能
└──────┬──────┘
       │
┌──────▼──────┐
│  Evaluator  │  评估者：跑端到端测试，专门挑刺
└─────────────┘
```

**为什么需要独立评估者**：
- 谁都不擅长批评自己，AI也一样
- GAN（生成对抗网络）思路
- 专门训练一个挑刺的AI比让生成者自查管用得多

**实践方法**：
```bash
# 简单实现：AI查AI
# 第一个AI完成任务后
claude --task "审查代码质量" --input "output_from_first_ai.md"

# 或者自动化脚本
npm run ai-generate  # AI生成
npm run ai-review    # AI审查
npm run ai-fix       # AI修复
```

---

## 🚀 实战案例

### 案例1：OpenAI Codex百万行代码项目

**背景**：
- 3-7个工程师，5个月
- 100万行代码的beta产品
- 零行人工手写
- 每人每天3.5个PR
- 估算速度是传统方式的10倍

**他们的Harness**：

**上下文管理**：
- 维护代码库知识库
- 实时更新架构文档
- 自动提取API规范

**约束系统**：
- 类型检查必须通过
- 单元测试必须覆盖
- 集成测试必须通过

**质量保证**：
- 多agent交叉验证
- 自动代码审查
- 端到端测试

**未解问题**：
- 速度快了10倍，但产出质量如何？
- 六个月后维护成本如何？
- AI写的代码是否好改？

**启示**：
- ✅ Harness能让AI写得快
- ⚠️ 但长期维护还需要时间验证

### 案例2：Mitchell Hashimoto的Ghostty项目

**方法**：极其朴素的进化策略

```
每次agent犯错
    → 工程化一个方案
    → 让它再也犯不了同样的错
    → 加到配置文件里
```

**结果**：
- 配置文件每一行都对应agent过去犯过的一次错
- 文件是活的，一直在长
- 高度定制，因为全是真实场景里出过的问题

**关键洞察**：
- 不要试图一开始就设计完美的Harness
- 从空文件开始
- 让Harness在实战中自然生长

### 案例3：花叔的Claude Code工作流

**架构设计**：

```
CLAUDE.md（路由器）
    ↓ 判断任务类型
    ↓ 加载对应规则集
    ↓
Hooks（拦截器）
    ↓ 编辑前自动linting
    ↓ 生成后自动类型检查
    ↓
Skills（能力包）
    ↓ 小红书配图生成
    ↓ 飞书文档同步
    ↓
知识库（地图）
    └ 项目结构、编码规范、历史决策
```

**核心组件**：

**1. CLAUDE.md作为路由器**
```markdown
# 任务路由
- 写公众号 → 加载公众号规则
- iOS开发 → 加载Swift规则
- Web开发 → 加载React规则
```

**2. Hooks作为硬约束**
```bash
# 编辑文件前
pre-edit: npm run lint

# 代码生成后
post-generate: npm run type-check

# 提交前
pre-commit: npm run test
```

**3. Skills作为模块化能力**
- 独立的能力包
- 平时不占context
- 需要时才调用

---

## 📐 设计原则

### 原则1：给地图不给说明书

**✅ 好的CLAUDE.md**：
```markdown
# 项目结构
- src/components/ - React组件
- src/utils/ - 工具函数
- src/styles/ - 样式文件

# 关键约束
- 使用函数式组件
- 遵循Airbnb风格
- 测试覆盖率 > 80%

# 编码规范
[链接到详细规范文档]
```

**❌ 坏的CLAUDE.md**：
```markdown
# 第一步
创建文件src/components/Button.tsx

# 第二步
写入以下代码：
import React from 'react';
...
```

**为什么**：
- AI需要方向感，不需要僵化步骤
- 说明书写死了，失去灵活性
- 地图提供全局视角，AI自己找路

### 原则2：每次犯错加一条规则

**工作流**：
```
AI犯错
    → 分析原因
    → 设计规则
    → 加到Harness
    → 测试验证
```

**示例**：
```bash
# AI犯了：忘记导入依赖
# 解决：pre-generate hook自动检查imports

# AI犯了：破坏了现有功能
# 解决：pre-commit hook强制运行测试

# AI犯了：生成了不兼容的API
# 解决：API schema验证
```

**三个月后**：
- 那个文件就是你的Harness
- 高度定制
- 全是真实场景里出过的问题

### 原则3：让AI查AI

**简单实现**：
```bash
# 第一个AI完成任务
claude --task "写一个React组件" > output.md

# 开一个新对话
# 让第二个AI审查
claude --task "找出所有问题" --input output.md
```

**你会惊讶**：
- 第二个AI能发现多少第一个漏掉的
- 批评别人比自我批评容易
- AI也一样

**进阶实现**：
- Anthropic的Evaluator agent
- 专门的评估模型
- 自动化测试pipeline

---

## ⚠️ 关键挑战

### 挑战1：经验传承问题

**Martin Fowler的担忧**：
> 如果太早把人类从"in the loop"移到"on the loop"，
> 将来可能没人真正懂得怎么回事，也就没人能设计好的harness。

**现状**：
- 现在设计Harness的人，都是写过很多年代码的老手
- Mitchell Hashimoto能给Ghostty写好harness，因为他理解终端模拟器的每个细节
- OpenAI工程师能驾驭百万行代码，因为他们知道什么架构是好的

**问题**：
- 下一代呢？
- 新手程序员从第一天起就不写代码，只写CLAUDE.md
- 他能设计出好的harness吗？

### 挑战2：经验能否迁移

**花叔的案例**：
- 从没手写过代码
- 所有产品都是AI写的
- 小猫补光灯上了AppStore付费榜Top 1
- Harness从零开始，在和AI互动中长出来

**关键洞察**：
- 能设计harness，不是因为有编程经验
- 而是有和AI反复较劲的经验
- 观察到AI的行为模式：什么时候偷懒、什么时候幻觉、什么时候需要硬约束

**问题**：
- 这种经验能教吗？
- 很多决定是直觉做的
- 直觉来自踩坑，踩坑来自时间

### 挑战3：长期维护成本

**OpenAI实验的未解问题**：
- 速度快了10倍，质量如何？
- 六个月后好改吗？
- AI写的代码有人写的代码好维护吗？

**关键区别**：
- 人写代码时会无意识地留下结构线索
- 方便将来的自己理解
- AI不会，只解决眼前任务
- 不考虑六个月后维护这段代码的人会不会骂娘

---

## 🎯 实践指南

### 从零开始构建Harness

**第一周：最小系统**
```bash
# 1. 创建CLAUDE.md
echo "# 项目规则" > CLAUDE.md

# 2. 加第一个hook
# .git/hooks/pre-commit
npm run lint && npm run test

# 3. 开始用AI
# 每次犯错就记录
```

**第二周：观察模式**
```
记录AI常犯的错误：
- 忘记导入
- 破坏现有功能
- 风格不一致
- 类型错误
```

**第三周：逐步增强**
```
针对每个错误：
- 设计规则
- 加到CLAUDE.md
- 加hook验证
- 测试效果
```

**三个月后**：
- 你有了自己的Harness
- 高度定制
- 稳定可靠

### 已有项目的Harness设计

**第一步：分析现状**
```
- 项目结构
- 关键约束
- 常见问题
- 团队规范
```

**第二步：设计架构**
```
- CLAUDE.md结构
- Hooks配置
- Skills拆分
- 知识库组织
```

**第三步：逐步实施**
```
- 先加最关键的约束
- 观察效果
- 持续优化
```

---

## 🔮 未来展望

### Harness Engineering的演进

**趋势**：
- 从手动配置到自动生成
- 从单一agent到多agent协作
- 从规则约束到智能约束
- 从人工监督到AI监督

**可能的方向**：
- Harness即服务（HaaS）
- 可视化Harness设计工具
- Harness模板市场
- AI自动优化Harness

### 经验工程（Experience Engineering）

**新问题**：
- 如何在AI写所有代码的时代培养新人？
- 如何传承设计Harness的经验？
- 如何让新手快速积累"AI协作经验"？

**可能的方向**：
- AI协作训练营
- Harness设计pattern库
- 实战案例库
- 导师制（老手带新手）

---

## 总结

Harness Engineering标志着我们与AI协作方式的升级：

**核心价值**：
- ✅ 让AI可靠地工作
- ✅ 让AI可维护地产出
- ✅ 让AI规模化地应用

**关键原则**：
1. 给地图不给说明书
2. 每次犯错加一条规则
3. 让AI查AI

**记住**：
- Harness是活的系统，持续进化
- 没有完美的设计，只有不断改进
- 问题驱动，不要过度设计

**最重要的**：
- 不要为了技术而技术
- 让真实问题驱动解决方案
- 让Harness自然生长

---

**下一步**：从你当前遇到的问题开始，构建你的第一个Harness 🚀