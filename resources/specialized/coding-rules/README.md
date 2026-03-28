---
title: 编码规则 - Coding Rules
description: 从 Everything Claude Code 精选的关键编码规则
difficulty: intermediate
roles: ['programmer', 'developer']
type: guide
duration: 20min
tags: ['规则', '编码', 'ECC']
---

# 编码规则 - Coding Rules

> **来源**: Everything Claude Code - `rules/`
> **外部链接**: [ECC 原始位置](https://github.com/affaan-m/everything-claude-code/tree/main/rules/)

## 📚 规则分类

### [通用规则](./common/)
- 编码风格
- 文件组织
- 性能优化
- Git 工作流

### [测试规则](./testing/)
- TDD 方法论
- 覆盖率要求（80%+）
- 测试命名规范

### [安全规则](./security/)
- OWASP Top 10
- 强制安全检查
- 敏感数据处理

### [设计模式规则](./patterns/)
- 常用设计模式
- 脚手架项目
- 架构决策

## 🔗 ECC 完整规则系统

ECC 提供了完整的规则系统，支持多语言：

- **Common** - 通用规则（适用于所有语言）
- **TypeScript/JavaScript** - 前端开发规则
- **Python** - 后端开发规则
- **Golang** - Go 语言规则
- **Swift** - iOS 开发规则
- **PHP** - Web 开发规则

### 安装 ECC 规则

```bash
# 安装通用规则（推荐）
./install.sh common

# 安装特定语言规则
./install.sh typescript python golang

# 安装到项目（而非全局）
./install.sh --project typescript
```

## 🚀 使用规则

### 在 Claude Code 中

ECC 规则会自动加载到 Claude Code 的上下文中，AI 会自动遵循这些规则。

### 在项目中

将规则文件复制到 `.claude/rules/`：

```bash
# 项目级规则
mkdir -p .claude/rules
cp -r everything-claude-code/rules/common/* .claude/rules/

# 全局规则（适用于所有项目）
mkdir -p ~/.claude/rules
cp -r everything-claude-code/rules/common/* ~/.claude/rules/
```

## 📖 进阶学习

### 相关技能包

- [编码标准](../../../5-skills/coding-standards/) - 编码规范详解
- [TDD 工作流](../../../5-skills/tdd-workflow/) - TDD 最佳实践
- [安全审查](../../../5-skills/security-review/) - 安全检查清单

### ECC 完整规则文档

- **ECC Rules**: [查看完整规则系统](https://github.com/affaan-m/everything-claude-code/tree/main/rules/)
- **Rules README**: [规则安装指南](https://github.com/affaan-m/everything-claude-code/blob/main/rules/README.md)

## 🔗 外部资源

- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) - 完整系统
- [ECC 精选资源](../../external/everything-claude-code/) - Anything-AI 的 ECC 精选

---

**下一步**: [通用规则](./common/) | [返回资源目录](../../)