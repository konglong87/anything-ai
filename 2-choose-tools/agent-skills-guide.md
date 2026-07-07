---
title: "Agent Skills 元指南：SKILL.md 是什么，怎么自己造一个"
title_en: "Agent Skills Meta-Guide: What is SKILL.md and How to Build Your Own"
difficulty: intermediate
roles: [programmer]
type: concept
duration: 25min
tools: [claude, chatgpt, deepseek]
prerequisites: ["1-understand-ai/agent-intro/agent-intro"]
tags: [Agent, Skills, SKILL.md, Claude Code]
author: "konglong"
created: 2026-07-07
updated: 2026-07-07
version: 1.0
---

# Agent Skills 元指南：SKILL.md 是什么，怎么自己造一个

> 一句话：Skill 是"教 AI 怎么干一件具体事"的标准化封装——一个 SKILL.md，让 AI 稳定、可复用地完成任务。

## 🤔 这个概念是什么

**通俗理解**
你每次都给 AI 写一长段提示词才能让它"按规矩办事"，换个人、换次对话又得重来。Agent Skills 把这套"做事方法论"固化成一个文件包：下次直接说"用 XX skill"，AI 就自动按既定流程干活，不用你重复教。

**技术定义**
**Agent Skills** 是 Anthropic 牵头发起、被 Claude Code、Codex、OpenClaw、Hermes Agent 等广泛采用的开放标准。它用标准化的目录结构与 `SKILL.md` 描述文件，把"某项能力的执行方法"封装起来，支持**渐进式加载（progressive loading）**——只在用到时才把内容喂给模型，省 token。

## 💡 为什么 2026 年它火了

- **2026 年 5 月 17 日**，Anthropic 正式开源官方 Claude Agent Skills 仓库，3 天斩获 138k Star，成为 GitHub 热门；
- **复用刚需**：单纯提示词解决不了"任务执行不稳定、流程不统一、无法复用"；
- **生态成型**：主流 Agent 工具纷纷支持，Skill 成为"AI 的能力插件"。

## 🔧 一个 Skill 长什么样

标准 Skill 目录：

```
my-skill/
├── SKILL.md          # 必须：能力描述与执行指引（frontmatter + 正文）
├── scripts/          # 可选：可执行的脚本（Python/JS/Shell）
├── references/       # 可选：长文档、模板、知识库
└── assets/           # 可选：图片、样例等
```

**SKILL.md 结构**：
- **Frontmatter**：`name`（唯一名）、`description`（何时用、触发条件——这是匹配的关键）
- **正文**：逐步的执行说明、约束、示例

## 🛠️ 怎么自己造一个

1. **定场景**：选一件你反复要 AI 做的事（如"按模板写周报""审查代码安全"）；
2. **写 SKILL.md**：用 frontmatter 写清 `name` 和 `description`，正文写清步骤与边界；
3. **加 scripts/references**：把可程序化的部分放脚本，长知识放 references；
4. **本地放好**：用户级 `~/.workbuddy/skills/` 或项目级 `.workbuddy/skills/`；
5. **调用**：对话里说"用 XX skill"或直接描述需求让 Agent 自动匹配。

## 🆚 Skill vs Prompt vs Template

| 对比 | 提示词 | 模板 | Skill |
|------|------|------|------|
| 复用性 | 低（易丢） | 中 | 高（文件化） |
| 渐进加载 | 否 | 否 | 是 |
| 可执行脚本 | 否 | 否 | 是 |
| 跨工具 | 难 | 难 | 易（开放标准） |

## 🎯 对你的价值

- 如果你是**重度 AI 用户**（程序员、创作者），把常用工作流固化成 Skill，效率倍增；
- 如果你在做**自己的 Skill**（如把写作风格蒸馏成 skill），这份元指南帮你对齐开放标准，少走弯路；
- Skill 是"AI Native"工作方式的积木——**可复用、可分享、可组合**。

## 📚 延伸学习

- Anthropic 官方 Claude Agent Skills 仓库（GitHub）
- `SKILL.md` 编写规范与各 Agent 工具的安装方式
- 社区 Skill 市场（如 ClawHub 等）

## ✅ 小结

Agent Skills 把"教 AI 做事"从一次性对话变成**可沉淀的资产**。一个 `SKILL.md` + 合理的 `scripts/references`，就能让 AI 稳定复用你的方法论。**理解它，是进入 AI Native 工作流的一把钥匙。**
