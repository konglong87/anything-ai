---
title: "MCP & Tool Integration: Connecting Agents to the World"
title_en: "MCP & Tool Integration: Connecting Agents to the World"
difficulty: intermediate
roles: [programmer]
type: concept
duration: 25min
tools: [claude, chatgpt, deepseek, hermes-agent]
tags: [MCP, Agent, Tool Use, Model Context Protocol, Tool Integration]
prerequisites: ["1-understand-ai/agent-intro/agent-intro"]
---

# MCP & Tool Integration: Connecting Agents to the World

> An Agent without tools is just a chatbot. MCP gives Agents a standardized "plug" — connect once, work everywhere.

## 🤔 Why Agents Need Tools

LLMs alone can only generate text. To make Agents **actually do work** — read files, query databases, call APIs, operate browsers — they need **tools**.

The problem: N models × M tools = N×M custom integrations. Every model connecting to every tool needs bespoke code. This is **integration hell**.

MCP (Model Context Protocol) solves this.

## 📖 What MCP Is

MCP is an open protocol originally released by Anthropic in November 2024, transferred to the Linux Foundation in late 2025. It defines a unified standard for AI applications to connect to external tools and data sources.

**Analogy**: USB-C. Every phone maker used to have their own charging port. Now it's all USB-C. MCP is the USB-C of the AI world.

**Three core primitives**:
| Primitive | What it does | Example |
|-----------|--------------|---------|
| **Resources** | Provides readable data | File contents, DB records, API responses |
| **Tools** | Provides callable functions | `list_issues`, `send_email`, `run_query` |
| **Prompts** | Provides reusable prompt templates | "Code review template", "Daily report template" |

**Three roles**:
```
Host (e.g., Claude Desktop, IDE plugin)
  → Client (connection handler inside the host)
    → Server (service providing capabilities)
```

**Learn more**: [MCP Protocol Deep Dive →](../4-advanced-topics/mcp.md)

## 🔧 How to Use MCP

### Scenario 1: Connect GitHub to Claude

```bash
# 1. Install GitHub MCP Server
npm install -g @modelcontextprotocol/server-github

# 2. Configure Claude Desktop
# Add to claude_desktop_config.json:
{
  "mcpServers": {
    "github": {
      "command": "node",
      "args": ["@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "your-token" }
    }
  }
}

# 3. Restart Claude Desktop
# Now Claude can directly check Issues, create PRs
```

### Scenario 2: Connect a Database to Hermes Agent

```bash
# 1. Install PostgreSQL MCP Server
hermes mcp add postgres --command "node" --args ["@modelcontextprotocol/server-postgres"]

# 2. Configure connection
hermes mcp config postgres --env "DATABASE_URL=postgresql://..."

# 3. Use it
> Query last month's order data
# Hermes queries the database directly via MCP Server
```

### Scenario 3: Build Your Own MCP Server

```python
# Minimal MCP Server example (Python)
from mcp.server import Server

server = Server("my-tool")

@server.tool()
def get_weather(city: str) -> str:
    """Get weather for a city"""
    # Call weather API
    return f"{city}: sunny, 25°C today"

server.run()
```

**Key point**: Tools must declare parameters with JSON Schema so the LLM knows how to call them.

## 📊 MCP Server Ecosystem

| Category | Server | What it does |
|----------|--------|--------------|
| **Dev** | GitHub | Issues, PRs, code search |
| **Dev** | GitLab | Project management, code review |
| **Database** | PostgreSQL | Query, analyze |
| **Database** | SQLite | Local data operations |
| **Search** | Brave Search | Web search |
| **Browser** | Puppeteer | Web operations, screenshots |
| **Files** | FileSystem | Read/write local files |
| **Communication** | Slack | Send messages, read channels |
| **Communication** | Email | Send emails |
| **AI** | Hugging Face | Model inference |

More servers: [MCP Official Repository →](https://github.com/modelcontextprotocol)

## 🆚 MCP vs Other Integration Approaches

| Approach | Pros | Cons | Best for |
|----------|------|------|----------|
| **MCP** | Standardized, reusable, rich ecosystem | Need to learn the protocol | Multi-tool, multi-model scenarios |
| **Direct API** | Simple and direct | Custom integration per tool | Single, one-off integrations |
| **Function Calling** | Native model support | Different format per model | Single-model scenarios |
| **Framework built-in** | Out of the box | Locked to framework | Quick prototyping |

**Selection advice**:
- 1-2 tools + 1 model → Direct API or Function Calling
- Many tools + many models → MCP
- Quick experiment → Framework built-in tools
- Production deployment → MCP + permission controls

## ⚠️ MCP Security Considerations

MCP Servers can execute **real operations** (delete files, send emails, modify databases). Security matters:

| Risk | Defense |
|------|---------|
| Agent calls dangerous operations | Set approval mechanisms (high-risk ops need human confirmation) |
| MCP Server has excessive permissions | Least privilege principle (only grant needed permissions) |
| Data leakage | Server-side filtering of sensitive information |
| Supply chain risk | Only use trusted MCP Servers, audit source code |

**Best practices**:
1. High-risk operations (delete, push, pay) must require human approval
2. Minimize MCP Server permissions
3. Log all tool calls
4. Regularly audit MCP Server sources

## 🔗 Further Reading

- [MCP Protocol Deep Dive →](../4-advanced-topics/mcp.md) — Protocol specification in detail
- [How Agents Work →](./agent-workflow.md) — Where tools fit in the Agent loop
- [Agent Framework Guide →](./agent-frameworks.md) — Framework MCP support comparison
- [Hermes Agent →](./hermes-agent/README.md) — An open-source Agent with MCP support
- [Tool Use Pattern →](../5-skills/agent/design-patterns/chapters/05-tool-use.md) — How Agents choose and use tools
