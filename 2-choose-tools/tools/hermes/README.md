---
title: "Hermes Agent 使用指南"
difficulty: intermediate
roles: [programmer, developer, everyone]
type: guide
duration: 45min
tools: [hermes-agent]
tags: [Hermes, AI Agent, 自托管, 开源, 长期记忆, Nous Research]
---

# Hermes Agent 使用指南

> 开源、自托管的 AI Agent，支持长期记忆与 Skills 技能系统
>
> **GitHub**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

## 什么是 Hermes Agent？

**Hermes Agent** 是由 [Nous Research](https://nousresearch.com) 开发的开源 AI Agent，专为长期任务执行和持续运行场景设计。

### 核心特点

| 特性 | 说明 |
|------|------|
| **开源自托管** | MIT 许可证，完全掌控数据和运行环境 |
| **长期记忆** | 跨会话记住项目、偏好与工作习惯 |
| **Skills 技能** | 把解决过的问题沉淀成可复用技能 |
| **多平台网关** | 支持 Telegram、Discord、飞书、微信等 |
| **40+ 工具** | 终端、文件、浏览器、图片、TTS 等 |
| **模型兼容** | 支持 Qwen、GLM、Claude、Gemini 等 |

## 快速开始

### 安装

**Linux / macOS / WSL2**
```bash
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash
```

**Windows PowerShell**
```powershell
irm https://res1.hermesagent.org.cn/install.ps1 | iex
```

### 配置

```bash
# 启动配置向导
hermes setup
hermes model
```

### 使用

```bash
# 启动交互式 TUI
hermes
```

## 核心功能

### 1. 长期记忆

- 记住项目代码结构和规范
- 持续学习你的工作习惯
- 每次对话基于历史上下文

### 2. Skills 技能系统

- 创建可复用的自动化技能
- 兼容 [agentskills.io](https://agentskills.io) 开放格式
- 支持团队共享

### 3. 消息网关

支持平台：
- **社交**: Telegram、Discord、Slack、WhatsApp、Signal、微信
- **办公**: 企业微信、飞书、钉钉

### 4. 自动化调度

内置 cron，支持：
- 日报生成
- 定时备份
- 系统巡检
- 定时提醒

## 适用场景

| 场景 | 说明 |
|------|------|
| 终端任务 | 在终端中完成复杂任务 |
| 多平台协作 | 通过消息网关持续在线 |
| 自动化工作流 | 日报、备份、巡检、提醒 |
| 长期项目 | 持续运行的项目助手 |

## 模型支持

**国内模型**: Qwen、GLM、Kimi、MiniMax
**国外模型**: Claude、Gemini、Codex
**其他**: OpenRouter、本地模型

## 与 OpenClaw 对比

| 对比项 | Hermes | OpenClaw |
|--------|--------|----------|
| Token 消耗 | 更低（约30%） | 较高 |
| 长期记忆 | 原生支持 | 有限 |
| Skills 系统 | 内置 | 需配置 |
| 消息网关 | 多平台原生 | 需集成 |
| 迁移支持 | 一键迁移 | - |

## 相关资源

- **完整指南**: [3-ai-agents/hermes-agent/](../../../3-ai-agents/hermes-agent/)
- **GitHub**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- **中文社区**: [hermesagent.org.cn](https://hermesagent.org.cn/)

## 立即开始

```bash
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash
hermes setup
hermes
```
