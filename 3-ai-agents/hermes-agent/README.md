---
title: "Hermes Agent 完整指南"
difficulty: intermediate
roles: [programmer, developer, everyone]
type: guide
duration: 60min
tools: [hermes-agent, mcp, terminal]
tags: [Hermes, AI Agent, 自托管, 开源, 长期记忆, Skills, Nous Research]
---

# Hermes Agent 完整指南

> 开源、自托管的 AI Agent，支持长期记忆与 Skills 技能系统
>
> **GitHub**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
> **官网**: [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)
> **中文社区**: [hermesagent.org.cn](https://hermesagent.org.cn/)

## 📖 简介

**Hermes Agent** 是由 [Nous Research](https://nousresearch.com) 开发的开源 AI Agent，专为长期任务执行和持续运行场景设计。与 IDE 助手不同，Hermes 更强调：

- **跨会话记忆** - 长期记住你的项目、偏好与工作习惯
- **可复用 Skills** - 把解决过的问题沉淀成可复用技能
- **多平台消息网关** - 通过 Telegram、Discord、飞书等平台持续在线
- **自托管** - 完全掌控数据和运行环境

## ✨ 核心特性

### 1. 长期记忆与 Skills

**跨会话记忆**
- 记住项目背景、代码结构、个人偏好
- 持续学习你的工作习惯
- 每次对话都能基于历史上下文

**Skills 技能系统**
- 把解决过的问题沉淀成可复用 Skill
- 兼容 [agentskills.io](https://agentskills.io) 开放格式
- 支持团队共享和社区贡献

### 2. MCP 与工具集成

**40+ 内置工具**
- 终端命令执行
- 文件系统操作
- 浏览器自动化
- 图片处理
- TTS（文字转语音）
- 多模型推理

**MCP 支持**
- 兼容 Model Context Protocol
- 可扩展自定义工具
- 工具集配置灵活

### 3. 多平台消息网关

**社交平台**
- Telegram
- Discord
- Slack
- WhatsApp
- Signal
- 微信

**办公平台**
- 企业微信
- 飞书
- 钉钉

**使用场景**：让 Agent 在多个平台持续在线，随时随地接收任务和推送结果。

### 4. 自动化调度

**内置 Cron**
- 日报自动生成
- 定时备份
- 系统巡检
- 定时提醒
- 信息抓取

### 5. 模型兼容

**国内模型**
- Qwen（通义千问）
- GLM（智谱）
- Kimi（Moonshot）
- MiniMax

**国外模型**
- Claude（Anthropic）
- Gemini（Google）
- Codex（OpenAI）

**其他接口**
- OpenRouter 等中转站
- OpenAI 兼容接口
- 本地模型支持

## 🚀 安装教程

### 系统要求

- Linux / macOS / WSL2 / Windows
- 网络连接（用于下载和模型调用）
- 可选：Docker 环境

### 快速安装

**Linux / macOS / WSL2**

```bash
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash
```

**Windows PowerShell**

```powershell
irm https://res1.hermesagent.org.cn/install.ps1 | iex
```

> **注意**：WSL2 是大多数 Windows 用户更推荐的长期方案。

### 配置模型

```bash
# 启动配置向导
hermes setup

# 配置模型
hermes model
```

### 启动对话

```bash
# 启动完整 TUI
hermes
```

启动后包含：
- 多行输入
- 命令补全
- 上下文压缩
- 工具输出流
- 会话历史

### 接入消息网关

```bash
# 配置消息网关
hermes gateway setup

# 启动网关
hermes gateway
```

## 📚 使用场景

### 场景1：终端任务执行

```bash
# 直接在终端中与 Hermes 交互
hermes

# 示例：让 Hermes 分析项目代码
> 帮我分析这个项目的代码结构，找出潜在的优化点

# 示例：生成日报
> 根据今天的 git 提交记录生成一份日报
```

### 场景2：多平台持续工作

**配置 Telegram Bot**
```bash
hermes gateway setup telegram
```

**使用场景**
- 在 Telegram 中给 Hermes 发送任务
- Hermes 处理完成后推送结果
- 随时随地与 Agent 交互

### 场景3：自动化任务

**创建定时任务**
```bash
# 编辑 crontab
hermes cron edit

# 示例：每天早上9点生成日报
0 9 * * * hermes task daily-report

# 示例：每小时巡检系统
0 * * * * hermes task system-check
```

### 场景4：长期项目助手

**项目初始化**
```bash
# 创建项目配置
hermes project init my-project

# 设置项目上下文
hermes project config --name "My Project" --tech "Python, React"
```

**持续协作**
- Hermes 记住项目结构和代码规范
- 每次对话基于项目上下文
- Skills 沉淀项目特定知识

## 🔧 高级配置

### 环境隔离

```bash
# 创建独立环境
hermes profile create work
hermes profile create personal

# 切换环境
hermes profile switch work
```

### 命令审批

```bash
# 配置需要审批的命令
hermes config set approval.required "rm,git push,docker"

# 设置审批超时
hermes config set approval.timeout 300
```

### 容器隔离

```bash
# 在隔离容器中运行工具
hermes config set sandbox.enabled true
hermes config set sandbox.image "hermes-sandbox:latest"
```

### 视觉功能

```bash
# 启用视觉理解
hermes config set vision.enabled true

# 使用视觉功能
> 分析这张截图中的 UI 问题 [上传图片]
```

## 🆚 与 OpenClaw 对比

| 特性 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **Token 消耗** | 更低（约30%） | 较高 |
| **过程透明度** | 高，可看懂执行步骤 | 中等 |
| **长期记忆** | 原生支持 | 有限 |
| **Skills 系统** | 内置，兼容 agentskills.io | 需额外配置 |
| **消息网关** | 多平台原生支持 | 需额外集成 |
| **迁移支持** | `hermes claw migrate` 一键迁移 | - |
| **模型支持** | 国内外模型广泛支持 | 主要支持 Claude |
| **社区** | 中文社区活跃 | 英文社区 |

**选择建议**：
- 需要长期记忆和 Skills → Hermes Agent
- 需要多平台消息网关 → Hermes Agent
- 需要更低 Token 消耗 → Hermes Agent
- 主要使用 Claude → 两者皆可

## 🛠️ 从 OpenClaw 迁移

```bash
# 一键迁移命令
hermes claw migrate

# 迁移内容包括：
# - 配置文件
# - 历史会话
# - 自定义设置
```

## 📊 最佳实践

### 1. 项目初始化流程

```bash
# 1. 创建项目目录
mkdir my-project && cd my-project

# 2. 初始化 Hermes 项目
hermes project init

# 3. 配置项目信息
hermes project config --name "My Project" --description "项目描述"

# 4. 设置技术栈
hermes project config --tech "Python, FastAPI, PostgreSQL"

# 5. 开始协作
hermes
```

### 2. Skills 开发流程

```bash
# 1. 创建 Skill
hermes skill create my-skill

# 2. 定义 Skill 功能
# 编辑 ~/.hermes/skills/my-skill/skill.yaml

# 3. 测试 Skill
hermes skill test my-skill

# 4. 发布 Skill（可选）
hermes skill publish my-skill
```

### 3. 团队协作配置

```bash
# 1. 共享项目配置
hermes project export > project-config.yaml

# 2. 团队成员导入
git clone <project-repo>
cd project
hermes project import project-config.yaml

# 3. 共享 Skills
hermes skill share --team
```

## 🔗 相关资源

- **GitHub**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- **官方文档**: [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)
- **中文社区**: [hermesagent.org.cn](https://hermesagent.org.cn/)
- **Nous Research**: [nousresearch.com](https://nousresearch.com)

## 🆘 常见问题

### Q: Hermes Agent 与 IDE 助手有什么区别？

**A**: Hermes 更强调：
- 长期上下文保持（跨会话记忆）
- 可复用 Skills 沉淀
- 多平台消息网关
- 自托管和数据掌控

### Q: 中文用户从哪里开始？

**A**: 
1. 访问中文社区 [hermesagent.org.cn](https://hermesagent.org.cn/)
2. 查看中文安装教程
3. Windows 用户优先看 Windows 安装指南
4. 加入微信/飞书社区群

### Q: 支持哪些部署方式？

**A**:
- 本地电脑
- VPS 服务器
- Docker 容器
- SSH 远程环境
- 云端开发环境（GitHub Codespaces 等）

### Q: 如何降低 Token 消耗？

**A**:
- 启用上下文压缩
- 使用合适的模型（国产模型成本更低）
- 沉淀 Skills 减少重复推理
- 配置命令审批避免误操作

## 📝 总结

Hermes Agent 是一个面向长期任务和持续运行场景的开源 AI Agent，特别适合：

- ✅ 需要长期记忆和上下文保持的项目
- ✅ 需要多平台消息网关的场景
- ✅ 希望沉淀可复用 Skills 的团队
- ✅ 关注 Token 消耗和成本的场景
- ✅ 需要自托管和数据掌控的用户

**立即开始**：
```bash
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash
hermes setup
hermes
```

---

**许可证**: MIT License · 2026 Nous Research
