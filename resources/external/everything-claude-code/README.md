---
title: Everything Claude Code 精选资源
description: ECC 是 Claude Code 性能优化系统，提供技能包、子代理、规则和自动化 Hook
difficulty: intermediate
roles: ['programmer', 'developer']
type: guide
duration: 30min
tags: ['ECC', 'Claude Code', '技能包', '子代理']
---

# Everything Claude Code 精选资源

> **项目来源**: [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
> **Star 数**: 112k+ ⭐ | **贡献者**: 30+ | **更新状态**: 持续活跃

## 🎯 什么是 Everything Claude Code?

Everything Claude Code（ECC）是一个**Claude Code 性能优化系统**，由 Anthropic Hackathon 获奖者开发。它不是简单的配置文件合集，而是一个完整的系统：

- **技能包 (Skills)**: 125+ 工作流定义和领域知识
- **子代理 (Agents)**: 28+ 专业化的子代理，用于委托特定任务
- **规则 (Rules)**: 34+ 始终遵循的指导原则
- **命令 (Commands)**: 60+ 快速执行命令
- **Hooks**: 自动化触发器，用于会话管理、代码检查等
- **跨平台支持**: Claude Code、Cursor、OpenCode、Codex

## 📚 ECC 核心价值

ECC 经过 10+ 个月的实战打磨，已在多个生产应用中验证：

### 1. **Token 优化**
- 模型选择策略（Sonnet vs Opus）
- 系统提示词精简
- 后台进程管理
- **节省 60%+ 成本**

### 2. **内存持久化**
- 跨会话自动保存/加载上下文
- 会话生命周期管理
- 战略性压缩建议

### 3. **持续学习**
- 从会话中自动提取模式
- 本能（Instinct）学习和演化
- 置信度评分

### 4. **验证循环**
- 检查点 vs 连续验证
- 分级评估器
- Pass@k 指标

### 5. **并行化**
- Git Worktrees
- Cascade 方法
- 实例扩展策略

## 🎓 为什么 ECC 适合 Anything-AI 受众？

ECC 的核心理念与 Anything-AI 完全一致：

✅ **实践出真知** - ECC 来源于真实项目开发，不是纸上谈兵
✅ **时间检验** - 10+ 个月的持续迭代和优化
✅ **辩证统一** - 不神话 AI，提供验证和审查机制
✅ **系统学习** - 结构化的技能包和工作流

## 📦 ECC 精选内容索引

Anything-AI 从 ECC 精选了以下内容，帮助初学者快速上手：

### 🛠️ 技能包（Skills）

我们在 `5-skills/` 整合了以下基础技能包：

| 技能包 | 说明 | ECC 原始位置 |
|--------|------|-------------|
| [TDD 工作流](../../5-skills/tdd-workflow/) | 测试驱动开发基础 | `skills/tdd-workflow/` |
| [编码标准](../../5-skills/coding-standards/) | 通用编码规范 | `skills/coding-standards/` |
| [安全审查](../../5-skills/security-review/) | 安全检查清单 | `skills/security-review/` |
| [后端模式](../../5-skills/backend-patterns/) | API、数据库、缓存模式 | `skills/backend-patterns/` |
| [前端模式](../../5-skills/frontend-patterns/) | React、Next.js 模式 | `skills/frontend-patterns/` |
| [API 设计](../../5-skills/api-design/) | REST API 设计模式 | `skills/api-design/` |
| [端到端测试](../../5-skills/e2e-testing/) | Playwright E2E 测试 | `skills/e2e-testing/` |
| [验证循环](../../5-skills/verification-loop/) | 持续验证机制 | `skills/verification-loop/` |

### 👥 子代理（Agents）

我们在 `roles/` 整合了以下核心子代理：

| 子代理 | 说明 | ECC 原始位置 |
|--------|------|-------------|
| [代码审查员](../../roles/code-reviewer/) | 质量和安全审查 | `agents/code-reviewer.md` |
| [实现规划师](../../roles/planner/) | 功能实现规划 | `agents/planner.md` |
| [TDD 指导员](../../roles/tdd-guide/) | TDD 方法论指导 | `agents/tdd-guide.md` |
| [安全审计员](../../roles/security-reviewer/) | 漏洞分析 | `agents/security-reviewer.md` |

### 📏 规则（Rules）

我们在 `resources/specialized/` 整合了关键规则：

| 规则分类 | 说明 | ECC 原始位置 |
|----------|------|-------------|
| [通用规则](../../resources/specialized/coding-rules/common/) | 语言无关的原则 | `rules/common/` |
| [测试规则](../../resources/specialized/coding-rules/testing/) | TDD、覆盖率要求 | `rules/common/testing.md` |
| [安全规则](../../resources/specialized/coding-rules/security/) | 强制安全检查 | `rules/common/security.md` |
| [设计模式规则](../../resources/specialized/coding-rules/patterns/) | 设计模式和脚手架 | `rules/common/patterns.md` |

## 🚀 如何开始使用 ECC？

### 方式一：作为插件安装（推荐）

```bash
# 添加市场
/plugin marketplace add affaan-m/everything-claude-code

# 安装插件
/plugin install everything-claude-code@everything-claude-code
```

### 方式二：手动安装

```bash
# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git

# 安装依赖
npm install  # 或 pnpm install | yarn install | bun install

# 安装规则（根据你的技术栈选择）
./install.sh typescript  # 或 python、golang、swift、php
```

### 方式三：通过 Anything-AI 学习

从 Anything-AI 的精选内容开始：

1. 阅读 [TDD 工作流](../../5-skills/tdd-workflow/)
2. 学习 [编码标准](../../5-skills/coding-standards/)
3. 实践 [代码审查](../../roles/code-reviewer/)
4. 掌握后迁移到完整的 ECC 系统

## 📖 ECC 学习路径

### 入门级（推荐先学习）

1. **编码标准** - 理解基本代码质量要求
2. **TDD 工作流** - 学习测试驱动开发
3. **安全审查** - 掌握基础安全检查
4. **验证循环** - 理解持续验证机制

### 进阶级

1. **后端/前端模式** - 学习架构模式
2. **API 设计** - 掌握 REST API 设计
3. **端到端测试** - 实践 E2E 测试
4. **子代理使用** - 学习委托策略

### 高级

1. **Hook 系统** - 配置自动化触发器
2. **持续学习** - 从会话中提取模式
3. **Token 优化** - 优化成本和性能
4. **并行化** - 多实例扩展策略

## 🔗 重要链接

- **GitHub 仓库**: [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- **简明指南**: [The Shorthand Guide](https://github.com/affaan-m/everything-claude-code/blob/main/the-shortform-guide.md)
- **详细指南**: [The Longform Guide](https://github.com/affaan-m/everything-claude-code/blob/main/the-longform-guide.md)
- **安全指南**: [The Security Guide](https://github.com/affaan-m/everything-claude-code/blob/main/the-security-guide.md)
- **AgentShield**: [安全审计工具](https://github.com/affaan-m/everything-claude-code/tree/main/agentshield)

## 💡 ECC 与 Anything-AI 的关系

**Anything-AI** 是 ECC 内容的精选和本地化版本：

| 维度 | Anything-AI | Everything Claude Code |
|------|-------------|------------------------|
| 受众 | AI 初学者、非技术用户 | 开发者、工程师 |
| 内容量 | 精选 10-15 个技能包 | 完整 125+ 技能包 |
| 学习曲线 | 渐进式，从基础开始 | 深入，需要技术背景 |
| 定位 | 系统化入门学习 | 生产级性能优化 |
| 关系 | **ECC 精选版** | **完整版** |

## 🎯 何时从 Anything-AI 迁移到 ECC？

当你完成以下学习后，建议迁移到完整的 ECC：

✅ 掌握 TDD 基础工作流
✅ 理解编码标准和安全审查
✅ 熟悉至少一个子代理的使用
✅ 需要更高级的功能（Hook、持续学习、并行化）

## ⚠️ 注意事项

1. **不要一次性安装所有内容** - ECC 内容量巨大，建议按需安装
2. **Token 消耗** - 使用 ECC 会消耗更多 Token，建议配置 Token 优化
3. **版本要求** - ECC 需要 Claude Code CLI v2.1.0+
4. **学习曲线** - 完整的 ECC 系统需要时间掌握，建议从 Anything-AI 精选内容开始

## 📝 版本信息

- **ECC 当前版本**: v1.9.0（2026年3月）
- **Anything-AI 精选版本**: 基于 v1.9.0
- **更新频率**: ECC 持续活跃更新，Anything-AI 定期同步核心内容

---

**回到**: [外部资源](../) | [Anything-AI 首页](../../)
