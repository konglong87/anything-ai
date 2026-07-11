---
title: "Hermes Agent Complete Guide"
title_en: "Hermes Agent Complete Guide"
difficulty: intermediate
roles: [programmer, developer, everyone]
type: guide
duration: 60min
tools: [hermes-agent, mcp, terminal]
tags: [Hermes, AI Agent, Self-hosted, Open Source, Long-term Memory, Skills, Nous Research]
---

# Hermes Agent Complete Guide

> Open-source, self-hosted AI Agent with long-term memory and Skills system
>
> **GitHub**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
> **Official Site**: [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)
> **Chinese Community**: [hermesagent.org.cn](https://hermesagent.org.cn/)

## 📖 Introduction

**Hermes Agent** is an open-source AI Agent developed by [Nous Research](https://nousresearch.com), designed for long-term task execution and continuous operation scenarios. Unlike IDE assistants, Hermes emphasizes:

- **Cross-session memory** - Remembers your projects, preferences, and work habits long-term
- **Reusable Skills** - Distill solved problems into reusable skills
- **Multi-platform messaging gateways** - Stay online via Telegram, Discord, Feishu, etc.
- **Self-hosted** - Full control over data and runtime environment

## ✨ Core Features

### 1. Long-term Memory & Skills

**Cross-session memory**
- Remembers project context, code structure, personal preferences
- Continuously learns your work habits
- Every conversation builds on historical context

**Skills system**
- Distill solved problems into reusable Skills
- Compatible with [agentskills.io](https://agentskills.io) open format
- Supports team sharing and community contributions

### 2. MCP & Tool Integration

**40+ built-in tools**
- Terminal command execution
- File system operations
- Browser automation
- Image processing
- TTS (text-to-speech)
- Multi-model inference

**MCP support**
- Compatible with Model Context Protocol
- Extensible custom tools
- Flexible toolset configuration

### 3. Multi-platform Messaging Gateways

**Social platforms**
- Telegram
- Discord
- Slack
- WhatsApp
- Signal
- WeChat

**Business platforms**
- Enterprise WeChat
- Feishu (Lark)
- DingTalk

**Use case**: Keep the Agent online across multiple platforms, receiving tasks and pushing results anytime, anywhere.

### 4. Automated Scheduling

**Built-in Cron**
- Auto-generate daily reports
- Scheduled backups
- System health checks
- Timed reminders
- Information scraping

### 5. Model Compatibility

**Chinese models**
- Qwen (Tongyi Qianwen)
- GLM (Zhipu)
- Kimi (Moonshot)
- MiniMax

**International models**
- Claude (Anthropic)
- Gemini (Google)
- Codex (OpenAI)

**Other interfaces**
- OpenRouter and other relay services
- OpenAI-compatible interfaces
- Local model support

## 🚀 Installation

### System Requirements

- Linux / macOS / WSL2 / Windows
- Network connection (for downloads and model calls)
- Optional: Docker environment

### Quick Install

**Linux / macOS / WSL2**

```bash
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash
```

**Windows PowerShell**

```powershell
irm https://res1.hermesagent.org.cn/install.ps1 | iex
```

> **Note**: WSL2 is the recommended long-term solution for most Windows users.

### Configure Model

```bash
# Start setup wizard
hermes setup

# Configure model
hermes model
```

### Start Conversation

```bash
# Start full TUI
hermes
```

After launch, includes:
- Multi-line input
- Command completion
- Context compression
- Tool output streaming
- Session history

### Connect Messaging Gateway

```bash
# Configure messaging gateway
hermes gateway setup

# Start gateway
hermes gateway
```

## 📚 Use Cases

### Case 1: Terminal Task Execution

```bash
# Interact with Hermes directly in terminal
hermes

# Example: Ask Hermes to analyze project code
> Analyze this project's code structure and find potential optimizations

# Example: Generate daily report
> Generate a daily report based on today's git commits
```

### Case 2: Multi-platform Continuous Work

**Configure Telegram Bot**
```bash
hermes gateway setup telegram
```

**Use case**
- Send tasks to Hermes via Telegram
- Hermes processes and pushes results
- Interact with Agent anytime, anywhere

### Case 3: Automated Tasks

**Create scheduled tasks**
```bash
# Edit crontab
hermes cron edit

# Example: Generate daily report at 9am
0 9 * * * hermes task daily-report

# Example: System health check every hour
0 * * * * hermes task system-check
```

### Case 4: Long-term Project Assistant

**Project initialization**
```bash
# Create project config
hermes project init my-project

# Set project context
hermes project config --name "My Project" --tech "Python, React"
```

**Continuous collaboration**
- Hermes remembers project structure and code conventions
- Every conversation builds on project context
- Skills distill project-specific knowledge

## 🔧 Advanced Configuration

### Environment Isolation

```bash
# Create isolated environments
hermes profile create work
hermes profile create personal

# Switch environment
hermes profile switch work
```

### Command Approval

```bash
# Configure commands requiring approval
hermes config set approval.required "rm,git push,docker"

# Set approval timeout
hermes config set approval.timeout 300
```

### Container Isolation

```bash
# Run tools in isolated container
hermes config set sandbox.enabled true
hermes config set sandbox.image "hermes-sandbox:latest"
```

### Vision Features

```bash
# Enable visual understanding
hermes config set vision.enabled true

# Use vision feature
> Analyze UI issues in this screenshot [upload image]
```

## 🆚 Hermes Agent vs OpenClaw

| Feature | Hermes Agent | OpenClaw |
|---------|-------------|----------|
| **Token consumption** | Lower (~30%) | Higher |
| **Process transparency** | High, execution steps visible | Medium |
| **Long-term memory** | Native support | Limited |
| **Skills system** | Built-in, compatible with agentskills.io | Needs extra config |
| **Messaging gateways** | Multi-platform native support | Needs extra integration |
| **Migration support** | `hermes claw migrate` one-click | - |
| **Model support** | Broad Chinese & international models | Primarily Claude |
| **Community** | Active Chinese community | English community |

**Selection advice**:
- Need long-term memory and Skills → Hermes Agent
- Need multi-platform messaging gateways → Hermes Agent
- Need lower Token consumption → Hermes Agent
- Primarily use Claude → Both work

## 🛠️ Migrating from OpenClaw

```bash
# One-click migration command
hermes claw migrate

# Migration includes:
# - Config files
# - Historical sessions
# - Custom settings
```

## 📊 Best Practices

### 1. Project Initialization Flow

```bash
# 1. Create project directory
mkdir my-project && cd my-project

# 2. Initialize Hermes project
hermes project init

# 3. Configure project info
hermes project config --name "My Project" --description "Project description"

# 4. Set tech stack
hermes project config --tech "Python, FastAPI, PostgreSQL"

# 5. Start collaborating
hermes
```

### 2. Skills Development Flow

```bash
# 1. Create Skill
hermes skill create my-skill

# 2. Define Skill functionality
# Edit ~/.hermes/skills/my-skill/skill.yaml

# 3. Test Skill
hermes skill test my-skill

# 4. Publish Skill (optional)
hermes skill publish my-skill
```

### 3. Team Collaboration Config

```bash
# 1. Export project config
hermes project export > project-config.yaml

# 2. Team members import
git clone <project-repo>
cd project
hermes project import project-config.yaml

# 3. Share Skills
hermes skill share --team
```

## 🔗 Related Resources

- **GitHub**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- **Official Docs**: [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)
- **Chinese Community**: [hermesagent.org.cn](https://hermesagent.org.cn/)
- **Nous Research**: [nousresearch.com](https://nousresearch.com)

## 🆘 FAQ

### Q: How is Hermes Agent different from IDE assistants?

**A**: Hermes emphasizes:
- Long-term context retention (cross-session memory)
- Reusable Skills distillation
- Multi-platform messaging gateways
- Self-hosting and data control

### Q: Where should Chinese users start?

**A**:
1. Visit the Chinese community at [hermesagent.org.cn](https://hermesagent.org.cn/)
2. Check the Chinese installation guide
3. Windows users should prioritize the Windows installation guide
4. Join WeChat/Feishu community groups

### Q: What deployment methods are supported?

**A**:
- Local computer
- VPS server
- Docker container
- SSH remote environment
- Cloud dev environments (GitHub Codespaces etc.)

### Q: How to reduce Token consumption?

**A**:
- Enable context compression
- Use appropriate models (Chinese models cost less)
- Distill Skills to reduce repeated inference
- Configure command approval to avoid accidental operations

## 📝 Summary

Hermes Agent is an open-source AI Agent designed for long-term tasks and continuous operation, especially suitable for:

- ✅ Projects needing long-term memory and context retention
- ✅ Scenarios needing multi-platform messaging gateways
- ✅ Teams wanting to distill reusable Skills
- ✅ Scenarios concerned about Token consumption and cost
- ✅ Users needing self-hosting and data control

**Get started now**:
```bash
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash
hermes setup
hermes
```

---

**License**: MIT License · 2026 Nous Research
