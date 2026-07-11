---
title: "Agent Types: From Coding Agents to Research Agents"
title_en: "Agent Types: From Coding Agents to Research Agents"
difficulty: beginner
roles: [programmer, student, everyone]
type: concept
duration: 15min
tools: [claude, chatgpt, deepseek, cursor, copilot]
tags: [Agent, Coding Agent, Research Agent, Creative Agent, Analysis Agent]
prerequisites: ["1-understand-ai/agent-intro/agent-intro"]
---

# Agent Types: From Coding Agents to Research Agents

> Different Agent types solve different problems. Picking the wrong type is like using a hammer to turn a screw — great tool, wrong job.

## 🤔 Why Types Matter

Agents aren't one thing — they're **a category of things**. Just like "vehicles" include cars, trucks, and buses, Agents come in multiple types, each excelling at specific scenarios. Understanding types helps you pick the right tool and set realistic expectations.

## 📊 Four Major Agent Types

### 1. Coding Agent

**In one sentence**: An Agent that writes, modifies, and tests code for you.

**Core capabilities**:
- Code generation and completion
- Code review and refactoring
- Automated testing and debugging
- Project-level understanding (cross-file context)

**Representative tools**:
| Tool | Strength | Best for |
|------|----------|----------|
| Claude Code | Terminal Agent, project-level understanding, MCP support | Heavy-duty developers |
| Cursor | IDE-embedded, real-time completion + chat | Everyday developers |
| GitHub Copilot | Line-level completion, lightweight integration | All developers |
| Codex CLI | OpenAI's offering, sandbox execution | Experimental developers |

**Typical scenario**:
```
User: "Add a user authentication module to this project"
Coding Agent:
1. Analyze existing code structure
2. Design auth scheme
3. Write code (routes, middleware, DB models)
4. Add tests
5. Update docs
```

**Limitations**:
- Requires human review of output code (Agents make mistakes)
- Complex architecture decisions still need human leadership
- Long-term maintenance needs human oversight

**Learn more**: [AI Coding Agents 2026 →](../2-choose-tools/ai-coding-agents-2026.md)

---

### 2. Research Agent

**In one sentence**: An Agent that gathers information, analyzes literature, and generates reports.

**Core capabilities**:
- Multi-source information retrieval (web, papers, databases)
- Information extraction and summarization
- Cross-validation and fact-checking
- Structured report generation

**Representative tools**:
| Tool | Strength | Best for |
|------|----------|----------|
| Deep Research (OpenAI) | Multi-step reasoning, deep search | Researchers, analysts |
| Perplexity | Real-time search + citations | Quick verification |
| Gemini Deep Research | Google ecosystem, multi-source integration | Google users |

**Typical scenario**:
```
User: "Research the MCP protocol ecosystem in 2026"
Research Agent:
1. Search official docs and community discussions
2. Extract key data (Server count, supporting vendors)
3. Cross-validate multiple sources
4. Generate structured research report
```

**Limitations**:
- Information timeliness depends on search sources (may lag)
- Cannot access paid/private databases
- Requires human judgment on conclusion credibility

**Learn more**: [Deep Research Guide →](../4-advanced-topics/deep-research-guide.md)

---

### 3. Creative Agent

**In one sentence**: An Agent that generates content, optimizes ideas, and creates across modalities.

**Core capabilities**:
- Copy/article/story generation
- Visual content creation (images, video)
- Style adjustment and polishing
- Multi-modal composition (text + image + audio)

**Representative tools**:
| Tool | Strength | Best for |
|------|----------|----------|
| ChatGPT | General creation, multi-modal | Content creators |
| Claude | Long-form writing, style control | Writers, editors |
| Midjourney/DALL-E | Image generation | Designers |
| Sora/Runway | Video generation | Video creators |

**Typical scenario**:
```
User: "Write a popular science article about AI Agents for non-technical readers"
Creative Agent:
1. Choose narrative angle (analogy, storyline)
2. Generate first draft
3. Adjust tone and style
4. Suggest illustrations
5. Final polish
```

**Limitations**:
- Creative quality still needs human aesthetic judgment
- Style consistency requires iterative adjustment
- Originality is limited (recombination of existing materials)

---

### 4. Analysis Agent

**In one sentence**: An Agent that processes data, discovers trends, and supports decision-making.

**Core capabilities**:
- Data cleaning and preprocessing
- Statistical analysis and trend discovery
- Visualization and report generation
- Risk assessment and decision recommendations

**Representative tools**:
| Tool | Strength | Best for |
|------|----------|----------|
| ChatGPT Code Interpreter | Python data analysis | General analysts |
| Claude + MCP | Connect to databases/APIs | Enterprise analysts |
| Julius AI | Dedicated data analysis | Non-technical analysts |

**Typical scenario**:
```
User: "Analyze last quarter's sales data, find reasons for the decline"
Analysis Agent:
1. Fetch sales data (via MCP database connection)
2. Clean and preprocess
3. Statistical analysis (YoY, MoM, regional comparison)
4. Identify anomalies and trends
5. Generate analysis report and visualizations
```

**Limitations**:
- Data quality determines analysis quality (garbage in, garbage out)
- Requires human verification of logical conclusions
- Limited causal inference ability (good at correlation, not causation)

---

## 🆚 Quick Comparison

| Dimension | Coding | Research | Creative | Analysis |
|------------|---------|----------|----------|----------|
| **Input** | Code/requirements | Question/topic | Idea/style | Data/question |
| **Output** | Code/docs | Report/summary | Copy/images | Analysis/charts |
| **Autonomy** | High | Medium-high | Medium | Medium |
| **Human oversight** | Required | Required | Recommended | Required |
| **Error cost** | High (code bugs) | Medium (wrong info) | Low (editable) | High (bad decisions) |
| **2026 hype** | 🔥🔥🔥🔥🔥 | 🔥🔥🔥🔥 | 🔥🔥🔥 | 🔥🔥🔥 |

## 🔄 Types Aren't Isolated

In practice, Agent types often **combine**:

- **Coding + Research**: Research best practices first, then implement in code
- **Research + Analysis**: Gather data first, then analyze trends
- **Creative + Research**: Research素材 first, then create content
- **Coding + Analysis**: Analyze performance data first, then optimize code

Multi-Agent collaboration is a 2026 trend — [Multi-Agent Collaboration Pattern →](../5-skills/agent/design-patterns/chapters/07-multi-agent-collaboration.md)

## 🎯 How to Choose

**Three-step selection**:

1. **Identify task type**: What are you doing? (code/search/create/analyze)
2. **Assess autonomy needs**: Should the Agent run independently, or do you guide step-by-step?
3. **Consider error cost**: How bad is a mistake? High cost → more human oversight

**Simple decision tree**:
```
What's your task?
├── Write/modify code → Coding Agent
├── Search info/write report → Research Agent
├── Write copy/design → Creative Agent
├── Analyze data/decide → Analysis Agent
└── Mixed → Multi-Agent collaboration
```

## 🔗 Further Reading

- [How Agents Work →](./agent-workflow.md) — The internal Agent loop
- [MCP & Tool Integration →](./mcp-and-tools.md) — How Agents connect to the outside world
- [Agent Framework Guide →](./agent-frameworks.md) — What framework to build with
- [AI Coding Agents 2026 →](../2-choose-tools/ai-coding-agents-2026.md) — Coding Agent landscape
