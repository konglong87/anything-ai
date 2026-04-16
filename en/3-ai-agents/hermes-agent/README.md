---
title: "Hermes Agent Complete Guide"
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
> **Official**: [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)
> **Chinese Community**: [hermesagent.org.cn](https://hermesagent.org.cn/)

## 📖 Introduction

**Hermes Agent** is an open-source AI Agent developed by [Nous Research](https://nousresearch.com), designed for long-term task execution and continuous operation. Unlike IDE assistants, Hermes emphasizes:

- **Cross-session Memory** - Long-term memory of your projects, preferences, and work habits
- **Reusable Skills** - Turn solved problems into reusable skills
- **Multi-platform Message Gateway** - Stay online through Telegram, Discord, Lark, and more
- **Self-hosted** - Full control over data and runtime environment

## ✨ Core Features

### 1. Long-term Memory & Skills

**Cross-session Memory**
- Remembers project context, code structure, personal preferences
- Continuously learns your work habits
- Every conversation builds on historical context

**Skills System**
- Turn solved problems into reusable skills
- Compatible with [agentskills.io](https://agentskills.io) open format
- Support team sharing and community contributions

### 2. MCP & Tool Integration

**40+ Built-in Tools**
- Terminal command execution
- File system operations
- Browser automation
- Image processing
- TTS (Text-to-Speech)
- Multi-model inference

**MCP Support**
- Compatible with Model Context Protocol
- Extensible custom tools
- Flexible toolset configuration

### 3. Multi-platform Message Gateway

**Social Platforms**
- Telegram
- Discord
- Slack
- WhatsApp
- Signal
- WeChat

**Enterprise Platforms**
- WeCom (Enterprise WeChat)
- Lark (Feishu)
- DingTalk

**Use Case**: Keep your Agent online across multiple platforms, receive tasks and push results anywhere, anytime.

### 4. Automation Scheduling

**Built-in Cron**
- Auto-generate daily reports
- Scheduled backups
- System health checks
- Timely reminders
- Information scraping

### 5. Model Compatibility

**Chinese Models**
- Qwen (Alibaba)
- GLM (Zhipu)
- Kimi (Moonshot)
- MiniMax

**International Models**
- Claude (Anthropic)
- Gemini (Google)
- Codex (OpenAI)

**Other Interfaces**
- OpenRouter and other proxies
- OpenAI-compatible APIs
- Local model support

## 🚀 Installation

### System Requirements

- Linux / macOS / WSL2 / Windows
- Internet connection (for downloads and model calls)
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

> **Note**: WSL2 is recommended for most Windows users as a long-term solution.

### Configure Model

```bash
# Launch setup wizard
hermes setup

# Configure model
hermes model
```

### Start Conversation

```bash
# Launch full TUI
hermes
```

Features include:
- Multi-line input
- Command completion
- Context compression
- Tool output streaming
- Session history

### Connect Message Gateway

```bash
# Configure message gateway
hermes gateway setup

# Start gateway
hermes gateway
```

## 📚 Use Cases

### Use Case 1: Terminal Task Execution

```bash
# Interact with Hermes directly in terminal
hermes

# Example: Analyze project code
> Help me analyze the code structure of this project and find potential optimization points

# Example: Generate daily report
> Generate a daily report based on today's git commits
```

### Use Case 2: Multi-platform Continuous Work

**Configure Telegram Bot**
```bash
hermes gateway setup telegram
```

**Usage Scenario**
- Send tasks to Hermes via Telegram
- Hermes pushes results when done
- Interact with your Agent anywhere, anytime

### Use Case 3: Automation Tasks

**Create Scheduled Tasks**
```bash
# Edit crontab
hermes cron edit

# Example: Generate daily report at 9 AM
0 9 * * * hermes task daily-report

# Example: System health check every hour
0 * * * * hermes task system-check
```

### Use Case 4: Long-term Project Assistant

**Project Initialization**
```bash
# Create project config
hermes project init my-project

# Set project context
hermes project config --name "My Project" --tech "Python, React"
```

**Continuous Collaboration**
- Hermes remembers project structure and code standards
- Every conversation builds on project context
- Skills accumulate project-specific knowledge

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
# Run tools in isolated containers
hermes config set sandbox.enabled true
hermes config set sandbox.image "hermes-sandbox:latest"
```

### Vision Capabilities

```bash
# Enable vision understanding
hermes config set vision.enabled true

# Use vision features
> Analyze the UI issues in this screenshot [upload image]
```

## 🆚 Comparison with OpenClaw

| Feature | Hermes Agent | OpenClaw |
|---------|-------------|----------|
| **Token Usage** | Lower (~30%) | Higher |
| **Transparency** | High, visible execution steps | Medium |
| **Long-term Memory** | Native support | Limited |
| **Skills System** | Built-in, agentskills.io compatible | Requires extra config |
| **Message Gateway** | Native multi-platform support | Requires extra integration |
| **Migration** | `hermes claw migrate` one-click | - |
| **Model Support** | Broad Chinese & international | Primarily Claude |
| **Community** | Active Chinese community | English community |

**Recommendations**:
- Need long-term memory & Skills → Hermes Agent
- Need multi-platform message gateway → Hermes Agent
- Need lower token consumption → Hermes Agent
- Primarily use Claude → Either works

## 🛠️ Migrating from OpenClaw

```bash
# One-click migration
hermes claw migrate

# Migrates:
# - Configuration files
# - Conversation history
# - Custom settings
```

## 📊 Best Practices

### 1. Project Initialization Workflow

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

### 2. Skills Development Workflow

```bash
# 1. Create skill
hermes skill create my-skill

# 2. Define skill functionality
# Edit ~/.hermes/skills/my-skill/skill.yaml

# 3. Test skill
hermes skill test my-skill

# 4. Publish skill (optional)
hermes skill publish my-skill
```

### 3. Team Collaboration Setup

```bash
# 1. Share project config
hermes project export > project-config.yaml

# 2. Team members import
git clone <project-repo>
cd project
hermes project import project-config.yaml

# 3. Share skills
hermes skill share --team
```

## 🔗 Related Resources

- **GitHub**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- **Official Docs**: [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/)
- **Chinese Community**: [hermesagent.org.cn](https://hermesagent.org.cn/)
- **Nous Research**: [nousresearch.com](https://nousresearch.com)

## 🆘 FAQ

### Q: What's the difference between Hermes Agent and IDE assistants?

**A**: Hermes emphasizes:
- Long-term context retention (cross-session memory)
- Reusable skills accumulation
- Multi-platform message gateway
- Self-hosting and data control

### Q: Where should Chinese users start?

**A**:
1. Visit Chinese community [hermesagent.org.cn](https://hermesagent.org.cn/)
2. Check Chinese installation tutorial
3. Windows users should check Windows installation guide first
4. Join WeChat/Lark community groups

### Q: What deployment methods are supported?

**A**:
- Local computer
- VPS server
- Docker container
- SSH remote environment
- Cloud dev environment (GitHub Codespaces, etc.)

### Q: How to reduce token consumption?

**A**:
- Enable context compression
- Use appropriate models (Chinese models are cheaper)
- Accumulate skills to reduce repeated reasoning
- Configure command approval to avoid mistakes

## 📝 Summary

Hermes Agent is an open-source AI Agent for long-term tasks and continuous operation, especially suitable for:

- ✅ Projects requiring long-term memory and context retention
- ✅ Scenarios needing multi-platform message gateway
- ✅ Teams wanting to accumulate reusable skills
- ✅ Scenarios concerned about token consumption and cost
- ✅ Users requiring self-hosting and data control

**Get Started**:
```bash
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash
hermes setup
hermes
```

---

**License**: MIT License · 2026 Nous Research
