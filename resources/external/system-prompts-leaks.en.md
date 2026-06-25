---
title: System Prompts Leaks - Decoding AI's Hidden Instructions
difficulty: intermediate
roles: [developer, researcher, advanced-user, ai-developer]
type: guide
duration: 30 min
tags: [System Prompt, Prompt Engineering, AI Principles, Claude, ChatGPT, Gemini, LLM]
tools: [Claude, ChatGPT, Gemini, Copilot, Cursor]
---

# System Prompts Leaks - Decoding AI's Hidden Instructions

> **Want to see AI's "hidden cards"? This project exposes the system prompts of all major AI chatbots.**

## 🎯 What Is This

[system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) is a continuously updated open-source project that collects and publishes the **System Prompts** of major AI chatbots — the hidden instructions AI receives before responding to you.

**In plain terms**: When you chat with AI, it's not "running naked." Every AI has a set of system prompts telling it "who you are, how to respond, what you can't say." This project exposes all those behind-the-scenes instructions, letting you see AI's "hidden cards."

**Project stats** (as of June 2026):
- ⭐ GitHub Stars: 45,886
- 📦 Covered vendors: Anthropic, OpenAI, Google, xAI, Microsoft, Perplexity, and more
- 🔄 Continuously updated, new content almost weekly
- 📰 Featured in The Washington Post

## 🤔 Why It's Worth Reading

### 1. Understand AI's "Factory Settings"

System prompts are AI's factory configuration. Reading them reveals:
- Why AI is always so "polite" — because the prompt says "be friendly, be respectful"
- Why AI refuses certain questions — because the prompt has explicit red lines
- Why AI has "specialties" — because the prompt defines its role and capability boundaries

### 2. Learn Top-Tier Prompt Engineering Examples

These system prompts are written by **the world's top AI teams** — engineers at Anthropic, OpenAI, and Google. Reading them teaches you:
- How to define AI's role and behavioral boundaries via prompts
- How to control AI's output style and quality via prompts
- How to set safety guardrails (preventing AI from saying inappropriate things)
- How to inject tool-use capabilities via prompts

**This is "textbook-level" material for prompt engineering.**

### 3. See AI Vendors' Design Philosophies

Different vendors have distinctly different prompt styles:
- **Anthropic (Claude)**: Detailed, rigorous, emphasizes safety and honesty, very long prompts
- **OpenAI (ChatGPT)**: Concise, practical, focuses on versatility
- **Google (Gemini)**: Structured, tool-oriented, emphasizes multimodal capabilities

Comparative reading reveals each vendor's different understanding and trade-offs for AI.

## 📋 Covered AI Products

The project includes system prompts for these major AI products (continuously updated):

| Vendor | AI Products | Notes |
|--------|-------------|-------|
| **Anthropic** | Claude Fable 5, Opus 4.8, Claude Code, Claude Design | Most detailed prompts, includes tool definitions |
| **OpenAI** | GPT-5.5 Thinking, GPT-5.5 Instant, GPT-5.5 Codex | Includes API and web versions |
| **Google** | Gemini 3.5 Flash, Gemini 3.1 Pro, Antigravity CLI | Includes tool JSON definitions |
| **xAI** | Grok Expert | Unique style |
| **Microsoft** | GitHub Copilot, VS Code Copilot Agent, Copilot macOS App | Developer tool prompts |
| **Perplexity** | Perplexity Computer | Search-enhanced AI |
| **Others** | Cursor, Zed AI, Docker Gordon AI | Developer tools |

## 🔍 Recommended Reading

### Must-Read for Beginners

1. **[Claude Opus 4.8 System Prompt](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/claude-opus-4.8.md)** — Anthropic's latest flagship model's complete prompt. Remarkably long and rich in detail. The best case study for understanding "safety-first" design philosophy.

2. **[Claude Fable 5 System Prompt](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/claude-fable-5.md)** — The [diff vs Opus 4.8](https://www.diffchecker.com/QJn9jFNk/) is fascinating, showing Anthropic's strategy adjustments across models.

3. **[GPT-5.5 Thinking System Prompt](https://github.com/asgeirtj/system_prompts_leaks/blob/main/OpenAI/gpt-5.5-thinking.md)** — OpenAI's thinking model prompt, with a distinctly different style from Claude.

### Must-Read for Developers

4. **[Claude Code System Prompt](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/Claude%20Code/claude-code-opus-4.8.md)** — Claude Code's complete prompt with all tool definitions. Key to understanding AI coding assistant design.

5. **[VS Code Copilot Agent System Prompt](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Microsoft/vscode-copilot-agent.md)** — Microsoft's AI coding assistant prompt. Most insightful when compared with Claude Code.

6. **[Claude Design System Prompt](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/claude-design.md)** — Contains 50 tools + 16 skills + 8 starter sources. A textbook for AI tool integration design.

## 💡 How to Read for Maximum Insight

### Method 1: Comparative Reading

Pick two similar AI prompts and compare:
- Claude vs ChatGPT → Understand "safety-first" vs "versatility-first" design trade-offs
- Claude Code vs Copilot Agent → Understand different design approaches for AI coding assistants
- Gemini Flash vs Gemini Pro → Understand prompt differences for same vendor's differently-positioned models

### Method 2: Structural Deconstruction

Deconstruct a system prompt into dimensions:
- **Role definition**: What role is AI set to play?
- **Capability boundaries**: What can AI do, what can't it do?
- **Safety guardrails**: Which red lines are explicitly set?
- **Tool integration**: What tools is AI given? How are they invoked?
- **Output control**: How is AI's output style, format, and length controlled?

### Method 3: Version Tracking

The project continuously updates prompts for the same AI across versions. Tracking changes reveals:
- How vendors adjust safety strategies
- How new features are injected via prompts
- How user feedback influences prompt modifications

## ⚠️ The Right Attitude

Reading system prompts is about **learning**, not **hacking**:

- ✅ **Learn prompt engineering**: Top teams' prompt writing is the best learning material
- ✅ **Understand AI design philosophy**: Different vendors' trade-offs reflect different values
- ✅ **Improve AI usage**: Understanding AI's factory settings helps you collaborate better
- ❌ **Don't try to bypass safety guardrails**: Safety limits in system prompts are meaningful
- ❌ **Don't over-rely on system prompts**: Prompts are only part of AI behavior, not all of it
- ❌ **Don't treat prompts as "secret recipes"**: Understanding principles is more important than copying prompts

**Remember our project's core principle**: Use AI, but don't blindly follow it. Understanding AI's underlying logic is for better mastery, not for breaking it.

## 🔗 Project Links

- **GitHub Repository**: [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)
- **Online Browse Site**: [system_prompts_leaks.github.io](https://asgeirtj.github.io/system_prompts_leaks/)
- **License**: CC0-1.0 (Public domain, free to use)

## 📚 Related Learning

- [Prompt Engineering](../../4-advanced-topics/prompt-engineering) — Systematically learn prompt techniques
- [How AI Thinks](../../1-understand-ai/how-ai-thinks/reasoning) — Understand AI's reasoning mechanism
- [Claude Guide](../../2-choose-tools/tools/claude/README) — Deep dive into Claude usage
- [Prompt Library](../../prompts/README) — Practical prompt templates

---

**See AI's hidden cards, understand it, master it.** 🦖
