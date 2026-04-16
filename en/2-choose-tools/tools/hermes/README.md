---
title: "Hermes Agent Guide"
difficulty: intermediate
roles: [programmer, developer, everyone]
type: guide
duration: 45min
tools: [hermes-agent]
tags: [Hermes, AI Agent, Self-hosted, Open Source, Long-term Memory, Nous Research]
---

# Hermes Agent Guide

> Open-source, self-hosted AI Agent with long-term memory and Skills system
>
> **GitHub**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

## What is Hermes Agent?

**Hermes Agent** is an open-source AI Agent developed by [Nous Research](https://nousresearch.com), designed for long-term task execution and continuous operation.

### Core Features

| Feature | Description |
|---------|-------------|
| **Open Source Self-hosted** | MIT license, full control over data and environment |
| **Long-term Memory** | Cross-session memory of projects, preferences, and habits |
| **Skills System** | Turn solved problems into reusable skills |
| **Multi-platform Gateway** | Support Telegram, Discord, Lark, WeChat, etc. |
| **40+ Tools** | Terminal, file, browser, image, TTS, etc. |
| **Model Compatible** | Support Qwen, GLM, Claude, Gemini, etc. |

## Quick Start

### Installation

**Linux / macOS / WSL2**
```bash
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash
```

**Windows PowerShell**
```powershell
irm https://res1.hermesagent.org.cn/install.ps1 | iex
```

### Configuration

```bash
# Launch setup wizard
hermes setup
hermes model
```

### Usage

```bash
# Launch interactive TUI
hermes
```

## Core Features

### 1. Long-term Memory

- Remember project code structure and standards
- Continuously learn your work habits
- Every conversation builds on historical context

### 2. Skills System

- Create reusable automation skills
- Compatible with [agentskills.io](https://agentskills.io) open format
- Support team sharing

### 3. Message Gateway

Supported platforms:
- **Social**: Telegram, Discord, Slack, WhatsApp, Signal, WeChat
- **Enterprise**: WeCom, Lark, DingTalk

### 4. Automation Scheduling

Built-in cron, supports:
- Daily report generation
- Scheduled backups
- System health checks
- Timely reminders

## Use Cases

| Scenario | Description |
|----------|-------------|
| Terminal Tasks | Complete complex tasks in terminal |
| Multi-platform Collaboration | Stay online via message gateway |
| Automation Workflow | Reports, backups, checks, reminders |
| Long-term Projects | Continuous project assistant |

## Model Support

**Chinese Models**: Qwen, GLM, Kimi, MiniMax
**International Models**: Claude, Gemini, Codex
**Others**: OpenRouter, Local models

## Comparison with OpenClaw

| Comparison | Hermes | OpenClaw |
|------------|--------|----------|
| Token Usage | Lower (~30%) | Higher |
| Long-term Memory | Native support | Limited |
| Skills System | Built-in | Requires config |
| Message Gateway | Native multi-platform | Requires integration |
| Migration Support | One-click migrate | - |

## Related Resources

- **Complete Guide**: [3-ai-agents/hermes-agent/](../../../3-ai-agents/hermes-agent/)
- **GitHub**: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
- **Chinese Community**: [hermesagent.org.cn](https://hermesagent.org.cn/)

## Get Started

```bash
curl -fsSL https://res1.hermesagent.org.cn/install.sh | bash
hermes setup
hermes
```
