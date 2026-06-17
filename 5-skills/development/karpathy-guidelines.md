---
title: "Karpathy Guidelines 详细指南"
title_en: "Karpathy Guidelines Detailed Guide"
difficulty: intermediate
roles: [programmer]
type: guide
duration: 30min
tools: [claude, cursor]
prerequisites: []
tags: [coding-guidelines, simplicity, surgical-changes, goal-driven, LLM-best-practices]
author: "konglong"
created: 2026-06-17
updated: 2026-06-17
version: 1.0
---

# Karpathy Guidelines 详细指南

> **GitHub**: [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)
>
> **灵感来源**: [Andrej Karpathy](https://x.com/karpathy/status/2015883857489522876) 对 LLM 编码陷阱的观察
>
> **星级**: ⭐⭐⭐⭐⭐ 高星推荐
>
> **分类**: 编码行为指南 | LLM最佳实践 | 代码质量

## 📖 简介

**Karpathy Guidelines** 是一套源自 Andrej Karpathy 观察的行为指南，旨在减少 LLM 编码中的常见错误。通过一个 `CLAUDE.md` 文件即可改善 Claude Code 的行为，也支持 Cursor 和其他 AI 编码工具。

### 解决的核心问题

来自 Andrej Karpathy 的观察：

> "模型会代你做错误假设，然后不假思索地执行。它们不管理自身的困惑，不寻求澄清，不呈现矛盾，不展示权衡，在应该提出异议时也不反驳。"

> "它们真的很喜欢把代码和 API 搞复杂，堆砌抽象概念，不清理死代码……明明 100 行能搞定的事情，非要实现成 1000 行的臃肿架构。"

> "它们有时仍会改动或删除自己理解不足的代码和注释，即使这些内容与任务本身无关。"

## ✨ 四大核心原则

### 原则1：编码前思考（Think Before Coding）

**不要假设。不要隐藏困惑。呈现权衡。**

LLM 经常默默选择一种解释然后执行。这个原则强制明确推理：

- **明确说明假设** — 如果不确定，询问而不是猜测
- **呈现多种解释** — 当存在歧义时，不要默默选择
- **适时提出异议** — 如果存在更简单的方法，说出来
- **困惑时停下来** — 指出不清楚的地方并要求澄清

**示例**：用户说"添加导出用户数据功能"

❌ 错误做法：直接实现一个导出所有用户的函数，假设格式、字段、范围

✅ 正确做法：
```
在实现之前，我需要澄清：
1. 范围：导出所有用户还是筛选子集？（隐私影响）
2. 格式：你说的"导出"是指——浏览器下载？后台任务+邮件通知？API返回？
3. 字段：哪些用户字段？（有些可能敏感）
4. 数据量：通常多少用户？（影响方案选择）
```

### 原则2：简洁优先（Simplicity First）

**用最少的代码解决问题。不要过度推测。**

对抗过度工程的倾向：

- 不要添加要求之外的功能
- 不要为一次性代码创建抽象
- 不要添加未要求的"灵活性"或"可配置性"
- 不要为不可能发生的场景做错误处理
- 如果 200 行代码可以写成 50 行，重写它

**检验标准**：资深工程师会觉得这过于复杂吗？如果是，简化。

**示例**：用户说"添加折扣计算功能"

❌ 错误做法：创建 DiscountStrategy 抽象类、PercentageDiscount、FixedDiscount、DiscountConfig、DiscountCalculator... 30+ 行设置代码

✅ 正确做法：
```python
def calculate_discount(amount: float, percent: float) -> float:
    """计算折扣金额。percent 范围 0-100。"""
    return amount * (percent / 100)
```

### 原则3：精准修改（Surgical Changes）

**只碰必须碰的。只清理自己造成的混乱。**

编辑现有代码时：

- 不要"改进"相邻的代码、注释或格式
- 不要重构没坏的东西
- 匹配现有风格，即使你更倾向于不同的写法
- 如果注意到无关的死代码，提一下 —— 不要删除它

当你的改动产生孤儿代码时：

- 删除因你的改动而变得无用的导入/变量/函数
- 不要删除预先存在的死代码，除非被要求

**检验标准**：每一行修改都应该能直接追溯到用户的请求。

**示例**：用户说"修复空邮箱导致验证器崩溃的bug"

❌ 错误做法：顺便"改进"了邮箱验证逻辑、添加了用户名验证、改了注释、加了docstring

✅ 正确做法：只修改处理空邮箱的那几行代码

### 原则4：目标驱动执行（Goal-Driven Execution）

**定义成功标准。循环验证直到达成。**

将指令式任务转化为可验证的目标：

| 不要这样做 | 转化为 |
|-----------|--------|
| "添加验证" | "为无效输入编写测试，然后让它们通过" |
| "修复 bug" | "编写重现 bug 的测试，然后让它通过" |
| "重构 X" | "确保重构前后测试都能通过" |

对于多步骤任务，说明一个简短的计划：
```
1. [步骤] → 验证: [检查]
2. [步骤] → 验证: [检查]
3. [步骤] → 验证: [检查]
```

强有力的成功标准让 LLM 能够独立循环执行。弱标准（"让它工作"）需要不断澄清。

**示例**：用户说"给API添加限流"

❌ 错误做法：一次性实现300行的完整限流系统（Redis、多策略、配置、监控）

✅ 正确做法：
```
限流计划：
1. 添加基础内存限流（单端点）
   验证：100个请求 → 前10个成功，其余返回429
2. 提取为中间件（应用到所有端点）
   验证：限流对 /users 和 /posts 都生效
3. 添加Redis后端（多服务器场景）
   验证：限流在应用重启后依然有效
4. 添加配置（按端点设置速率）
   验证：/search 10次/分，/users 100次/分
```

## 🚀 安装教程

### 方式1：Claude Code 插件（推荐）

在 Claude Code 中，首先添加插件市场：
```
/plugin marketplace add forrestchang/andrej-karpathy-skills
```

然后安装插件：
```
/plugin install andrej-karpathy-skills@karpathy-skills
```

这会将指南安装为 Claude Code 插件，使其在你所有项目中可用。

### 方式2：CLAUDE.md（按项目）

新项目：
```bash
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

已有项目（追加）：
```bash
echo "" >> CLAUDE.md
curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md
```

### 方式3：Cursor 项目规则

将 `.cursor/rules/karpathy-guidelines.mdc` 复制到目标项目的 `.cursor/rules/` 目录即可。

### 方式4：Agent Skills

将 `skills/karpathy-guidelines/SKILL.md` 复制或链接到 `~/.cursor/skills` 目录。

## 🎯 适用场景

### 场景1：代码审查
使用"精准修改"原则审查PR，确保没有多余的改动

### 场景2：新功能开发
使用"编码前思考"原则，在动手前明确需求和假设

### 场景3：Bug修复
使用"目标驱动执行"原则，先写测试重现bug，再修复

### 场景4：代码重构
使用"简洁优先"原则，避免过度抽象和过度工程

## 💡 如何判断它在起作用

如果你看到以下情况，说明这些指南正在发挥作用：

- **diff 中不必要的改动更少** —— 只有请求的改动出现
- **因过度复杂而导致的重写更少** —— 代码第一次就写得简洁
- **澄清问题在实现之前提出** —— 而不是在犯错之后
- **干净、精简的 PR** —— 没有顺带的重构或"改进"

## ⚖️ 权衡说明

这些指南倾向于**谨慎而非速度**。对于琐碎的任务（简单的拼写错误修复、显而易见的一行修改），请自行判断 —— 并非每个改动都需要完整的严谨流程。

目标是减少非琐碎工作中的代价高昂的错误，而不是拖慢简单任务。

## 🔗 相关资源

- [Andrej Karpathy 原始推文](https://x.com/karpathy/status/2015883857489522876)
- [GitHub 仓库](https://github.com/forrestchang/andrej-karpathy-skills)
- [示例文档](https://github.com/forrestchang/andrej-karpathy-skills/blob/main/EXAMPLES.md)

---

**使用 Karpathy Guidelines，让你的 AI 编码助手更加精准、简洁、高效！** 🚀
