---
title: "MCP 协议与工具集成：让 Agent 连通万物"
title_en: "MCP & Tool Integration: Connecting Agents to the World"
difficulty: intermediate
roles: [programmer]
type: concept
duration: 25min
tools: [claude, chatgpt, deepseek, hermes-agent]
tags: [MCP, Agent, 工具调用, Model Context Protocol, 工具集成]
prerequisites: ["1-understand-ai/agent-intro/agent-intro"]
---

# MCP 协议与工具集成：让 Agent 连通万物

> Agent 没有"手脚"就是个聊天机器人。MCP 给 Agent 装上了标准化的"插头"——一次接入，处处可用。

## 🤔 为什么 Agent 需要工具

LLM 本身只能生成文本。要让 Agent **真正干活**——读文件、查数据库、调 API、操作浏览器——它需要**工具**。

问题来了：N 个模型 × M 个工具 = N×M 次适配。每个模型接每个工具都得写一套定制代码。这就是**集成地狱**。

MCP（Model Context Protocol）解决了这个问题。

## 📖 MCP 是什么

MCP 是 Anthropic 于 2024 年 11 月开源、2025 年底移交 Linux Foundation 的开放协议。它定义了 AI 应用连接外部工具和数据源的统一标准。

**通俗类比**：USB-C 接口。以前每个手机厂商有自己的充电口，现在统一用 USB-C。MCP 就是 AI 世界的 USB-C。

**三种核心原语**：
| 原语 | 做什么 | 例子 |
|------|--------|------|
| **Resources** | 提供可读取的数据 | 文件内容、数据库记录、API 响应 |
| **Tools** | 提供可调用的函数 | `list_issues`、`send_email`、`run_query` |
| **Prompts** | 提供可复用的提示模板 | "代码审查模板"、"日报生成模板" |

**三种角色**：
```
Host（宿主，如 Claude Desktop、IDE 插件）
  → Client（宿主内的连接方）
    → Server（提供能力的服务方）
```

**深入学习**：[MCP 协议详解 →](../4-advanced-topics/mcp.md)

## 🔧 MCP 怎么用

### 场景 1：给 Claude 接 GitHub

```bash
# 1. 安装 GitHub MCP Server
npm install -g @modelcontextprotocol/server-github

# 2. 配置 Claude Desktop
# 在 claude_desktop_config.json 中添加：
{
  "mcpServers": {
    "github": {
      "command": "node",
      "args": ["@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "your-token" }
    }
  }
}

# 3. 重启 Claude Desktop
# 现在可以直接让 Claude 查 Issues、创建 PR
```

### 场景 2：给 Hermes Agent 接数据库

```bash
# 1. 安装 PostgreSQL MCP Server
hermes mcp add postgres --command "node" --args ["@modelcontextprotocol/server-postgres"]

# 2. 配置连接信息
hermes mcp config postgres --env "DATABASE_URL=postgresql://..."

# 3. 使用
> 查询上个月的订单数据
# Hermes 通过 MCP Server 直接查询数据库
```

### 场景 3：自己造一个 MCP Server

```python
# 最简 MCP Server 示例（Python）
from mcp.server import Server

server = Server("my-tool")

@server.tool()
def get_weather(city: str) -> str:
    """获取城市天气"""
    # 调用天气 API
    return f"{city} 今天晴，25°C"

server.run()
```

**关键**：Tool 必须用 JSON Schema 声明参数，让 LLM 知道怎么调用。

## 📊 常见 MCP Server 生态

| 类别 | Server | 能做什么 |
|------|--------|----------|
| **开发** | GitHub | Issues、PR、代码搜索 |
| **开发** | GitLab | 项目管理、代码审查 |
| **数据库** | PostgreSQL | 查询、分析 |
| **数据库** | SQLite | 本地数据操作 |
| **搜索** | Brave Search | 网页搜索 |
| **浏览器** | Puppeteer | 网页操作、截图 |
| **文件** | FileSystem | 读写本地文件 |
| **通信** | Slack | 发消息、读频道 |
| **通信** | Email | 发邮件 |
| **AI** | Hugging Face | 模型推理 |

更多 Server：[MCP 官方仓库 →](https://github.com/modelcontextprotocol)

## 🆚 MCP vs 其他集成方式

| 方式 | 优点 | 缺点 | 适合 |
|------|------|------|------|
| **MCP** | 标准化、可复用、生态丰富 | 需要学习协议 | 多工具、多模型场景 |
| **直接 API** | 简单直接 | 每个工具单独适配 | 单一、一次性集成 |
| **Function Calling** | 模型原生支持 | 每个模型格式不同 | 单模型场景 |
| **Agent 框架内置** | 开箱即用 | 锁定框架 | 快速原型 |

**选择建议**：
- 1-2 个工具 + 1 个模型 → 直接 API 或 Function Calling
- 多工具 + 多模型 → MCP
- 快速实验 → Agent 框架内置工具
- 生产部署 → MCP + 权限控制

## ⚠️ MCP 的安全考量

MCP Server 能执行**真实操作**（删文件、发邮件、改数据库），安全必须重视：

| 风险 | 防御 |
|------|------|
| Agent 调用危险操作 | 设置审批机制（高风险操作需人类确认） |
| MCP Server 权限过大 | 最小权限原则（只给需要的权限） |
| 数据泄露 | Server 端过滤敏感信息 |
| 供应链风险 | 只用可信的 MCP Server，审查源码 |

**最佳实践**：
1. 高风险操作（删除、推送、支付）必须人类审批
2. MCP Server 权限最小化
3. 记录所有工具调用日志
4. 定期审查 MCP Server 来源

## 🔗 延伸阅读

- [MCP 协议详解 →](../4-advanced-topics/mcp.md) — 协议规范深入
- [Agent 工作原理 →](./agent-workflow.md) — 工具在 Agent 循环中的位置
- [Agent 框架选型 →](./agent-frameworks.md) — 各框架对 MCP 的支持
- [Hermes Agent →](./hermes-agent/README.md) — 支持 MCP 的开源 Agent
- [工具使用设计模式 →](../5-skills/agent/design-patterns/chapters/05-tool-use.md) — Agent 怎么选择和使用工具
