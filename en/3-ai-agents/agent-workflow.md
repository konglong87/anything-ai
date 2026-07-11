---
title: "How Agents Work: Perceive → Plan → Act → Reflect"
title_en: "How Agents Work: Perceive → Plan → Act → Reflect"
difficulty: intermediate
roles: [programmer, student]
type: concept
duration: 20min
tools: [claude, chatgpt, deepseek]
tags: [Agent, ReAct, CoT, Planning, Reflection, Memory, Tool Use]
prerequisites: ["1-understand-ai/agent-intro/agent-intro"]
---

# How Agents Work: Perceive → Plan → Act → Reflect

> Agents aren't magic. They run a loop: observe → plan → act → check results → adjust. Understanding this loop means understanding all Agents.

## 🔄 The Core Loop

Every Agent runs an **Observe-Orient-Act** loop. The more complete version:

```
Perceive → Plan → Act → Reflect
     ↑                          ↓
     └──────────────────────────┘
```

This isn't a theoretical model — it's how all Agents actually work, from Claude Code to AutoGPT.

## 🧠 The Three Pillars: LLM + Memory + Tools

Agents need three core components. Missing any one makes it not a real Agent:

### 1. LLM (The Brain)

**Role**: Understanding, reasoning, decision-making, generation

**Key abilities**:
- Understand user intent ("Refactor this module" → break into concrete steps)
- Plan execution path (read code → analyze structure → make plan → modify step by step)
- Generate action instructions (which tool to call, what parameters)
- Process execution results (did it work? errors? need adjustments?)

**2026 trends**:
- Reasoning models (o3, DeepSeek-R1) make planning more accurate
- Long context (200k+ tokens) lets Agents see more project code
- Multi-modal understanding lets Agents "see" screenshots, UI, charts

### 2. Memory (Experience)

**Role**: Store historical information, avoid starting from scratch every time

| Type | What it stores | Lifespan | Example |
|------|---------------|----------|---------|
| Short-term | Current conversation context | Single session | "User wants Python" |
| Working | Intermediate state of current task | During task | "Modified 3 files, 2 remaining" |
| Long-term | Project knowledge, user preferences | Permanent | "This project uses FastAPI + PostgreSQL" |

**Key memory management questions**:
- **Capacity**: Context window is limited, need compression and filtering
- **Retrieval**: How to find relevant info from large memory (vector vs keyword search)
- **Update**: When to write new memory, when to clear old ones
- **Priority**: Which information is more important and can't be compressed away

**Learn more**: [Memory Management Pattern →](../5-skills/agent/design-patterns/chapters/08-memory-management.md)

### 3. Tools (Hands & Feet)

**Role**: Execute concrete actions, connect to the outside world

**Common tool types**:
| Category | Tools | What they do |
|----------|-------|--------------|
| Code | Terminal, file I/O | Write code, run tests |
| Search | Web search, knowledge base | Find info, docs |
| Data | Database queries, API calls | Fetch data, analyze |
| Browser | Web operations, screenshots | View pages, QA |
| Communication | Email, messaging | Send notifications, coordinate |

**Key tool-use questions**:
- **Selection**: How does the Agent know which tool to use? (LLM reasoning + tool descriptions)
- **Parameters**: How to pass correct parameters? (JSON Schema descriptions + LLM generation)
- **Errors**: What if a tool call fails? (Retry, fallback, human intervention)
- **Security**: Agents can execute real operations — need permission controls

**Learn more**: [Tool Use Pattern →](../5-skills/agent/design-patterns/chapters/05-tool-use.md) | [MCP Protocol →](./mcp-and-tools.md)

## 📐 Four Reasoning Modes

How does an Agent "think"? Four mainstream patterns:

### 1. CoT (Chain of Thought) — Step-by-step reasoning

```
Question: "Why does this function throw an error?"
Thinking:
1. Check error message → TypeError: 'NoneType' object is not subscriptable
2. Find the failing line → line 42, data['key']
3. Analyze cause → data might be None
4. Trace upstream → get_data() sometimes returns None
5. Conclusion → Need to add None check
```

**Best for**: Tasks requiring logical reasoning (debugging, analysis, planning)

### 2. ReAct (Reasoning + Acting) — Think while doing

```
Think: Need to check project structure → Act: ls project directory
Observe: See src/, tests/, config/ → Think: Check src/ files first
Act: cat src/main.py → Observe: Uses FastAPI
Think: Need to see route definitions → Act: cat src/routes.py
...
```

**Best for**: Tasks requiring environment interaction (code modification, information retrieval)

### 3. Plan-and-Execute — Plan first, then execute

```
Planning phase:
1. Analyze requirements → Need user authentication
2. Make plan → [Design model → Write routes → Add middleware → Write tests]
3. Confirm plan → User approves, then start

Execution phase:
1. Execute step 1 → Create User model
2. Execute step 2 → Write /auth routes
3. ...
```

**Best for**: Complex, multi-step tasks (project development, system refactoring)

### 4. Reflection — Look back after doing

```
Execute: Write some code
Reflect: What's wrong with this code?
1. Performance → Query lacks index, might be slow
2. Security → No input validation
3. Maintainability → Hardcoded config values
Improve: Add index, add validation, extract config
```

**Best for**: Tasks needing quality assurance (code review, solution optimization)

**Learn more**: [Reflection Pattern →](../5-skills/agent/design-patterns/chapters/04-reflection.md) | [Planning Pattern →](../5-skills/agent/design-patterns/chapters/06-planning.md)

## ⚠️ How Agents Fail

Understanding how Agents work also means understanding their failure modes:

| Error type | Cause | Example | Defense |
|------------|-------|---------|---------|
| **Hallucination** | LLM generates non-existent info | Fabricates an API that doesn't exist | Cross-validation, tool confirmation |
| **Looping** | Bad planning, repeatedly tries same approach | 5 attempts to fix a bug with the same method | Set max iteration count |
| **Tool misuse** | Wrong tool or wrong parameters | Uses search tool to check local files | Clear tool descriptions + Schema |
| **Context overflow** | Too much memory, loses key info | Forget the user's original request | Context compression, priority management |
| **Over-autonomy** | Makes high-risk decisions alone | Deletes production database directly | Human approval, permission boundaries |

**Key insight**: Agent reliability = LLM quality × Tool reliability × Human oversight. Missing any one makes the Agent unreliable.

## 🔗 Further Reading

- [Agent Types Overview →](./agent-types.md) — What different Agents excel at
- [MCP & Tool Integration →](./mcp-and-tools.md) — How Agents connect to the outside world
- [Agent Framework Guide →](./agent-frameworks.md) — What framework to build with
- [Agent Design Patterns Course →](../5-skills/agent/design-patterns/README.md) — 21 patterns in depth
