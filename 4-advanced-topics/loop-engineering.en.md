---
title: "Loop Engineering: From Writing Prompts to Designing Autonomous Workflows"
title_en: "Loop Engineering: From Writing Prompts to Designing Autonomous Workflows"
difficulty: advanced
roles: [programmer, everyone]
type: concept
duration: 30min
tools: [claude, codex, cursor]
tags: [Agent, Loop Engineering, Automation, AI Engineering, Agentic AI]
author: "Anything-AI Team"
created: 2026-06-11
updated: 2026-06-11
version: 1.0
---

# Loop Engineering: From Writing Prompts to Designing Autonomous Workflows

> You no longer prompt agents manually. You design the system that prompts them.

## 🤔 What Is It?

**Loop Engineering** is a new AI engineering paradigm named by Google engineer Addy Osmani in June 2026. The core idea: **replace "the person who constantly prompts the agent" with "a system that constantly prompts the agent" — and you design that system.**

**In Plain Terms**:
For the past two years, using a coding agent meant: write a good prompt → read the response → type the next prompt → repeat. You held the tool the entire time. You were the dispatcher in the loop.

Loop Engineering is different. You define a goal once, and the agent iterates autonomously in a continuous cycle: **generate → execute → verify → feedback → regenerate**, until the task is truly complete. Your job shifts from "crafting prompts" to "designing rules, state, and boundaries."

**Technical Definition**:
Loop Engineering adds an autonomous control layer on top of Prompt Engineering and Context Engineering. It uses six building blocks — Automations, Worktrees, Skills, Plugins/Connectors, Sub-agents, and State/Memory — to construct self-running cycles that span multiple turns.

> Boris Cherny, head of Claude Code at Anthropic: "I don't prompt Claude anymore. I have loops running that prompt Claude and figuring out what to do. My job is to write loops."

## 📖 Why It Matters

### 1. The Leverage Point Has Shifted

| Layer | What You Optimize | Unit of Work |
|-------|-------------------|-------------|
| Prompt Engineering | How to phrase a single instruction | One turn, manually typed |
| Context Engineering | What goes in the window (docs, history, tools) | Conditions around a single response |
| Loop Engineering | The system that decides what to prompt, when, and whether results are acceptable | Self-running cycles across multiple turns |

These three layers don't replace each other. Loops are built from prompts, and each turn in a loop still needs context engineering. Loop Engineering adds an **autonomous control structure** wrapping everything above.

### 2. AI Agents Naturally Require Loops

Unlike chatbots, AI agents don't just generate text — they call tools, read state, and execute actions. A single prompt can't cover all branches:

- **Bug fixing**: change code → run tests → tests fail → analyze errors → fix again → rerun... until green
- **Inventory replenishment**: read stock → check threshold → query supplier → generate order → wait for confirmation, rollback on failure
- **CI triage**: read yesterday's failures → analyze causes → categorize → auto-fix what you can, hand off the rest

**In these scenarios, what matters is the process and constraints, not how beautifully a single prompt is written.**

### 3. From "Cold Start" to "Knowledge Compounding"

Without a loop, every session starts from zero — the agent fills gaps in your intent with confident guesses. With Loop + Skills + Memory, knowledge and state compound across runs, picking up where you left off.

## 🎯 Core Architecture: Six Building Blocks

### 1. Automations — The Heartbeat

Automations are what make a loop a loop, not just a one-time run: trigger on schedule, discover work, triage results autonomously.

| Tool | Implementation |
|------|---------------|
| **Claude Code** | `/loop` schedules as cron; `/goal` runs across turns until condition met; hooks; GitHub Actions |
| **OpenAI Codex** | Automations tab: pick project, prompt, cadence, environment; `/goal` runs until complete |

**Key design of `/goal`**: After each turn, a separate, smaller model checks whether the task is done — the agent that wrote the code is NOT the one grading it. This is the "maker/checker split" applied to the stop condition itself.

```bash
# Claude Code examples
/goal "all tests in test/auth pass and lint is clean"

# Run triage every weekday at 9am
/loop "read yesterday's CI failures and open issues, write to TODO.md" --schedule "0 9 * * 1-5"
```

### 2. Worktrees — Parallelism Without Chaos

Two agents writing to the same file = two engineers committing to the same lines without talking. `git worktree` gives each agent an isolated checkout where their edits physically cannot touch.

- **Claude Code**: `--worktree` flag, `isolation: worktree` on sub-agents
- **Codex**: built-in worktree support per thread

> ⚠️ Worktrees eliminate mechanical collisions, not review bottlenecks. Your bandwidth to read and approve merged changes determines how many agents you can actually run — not how many worktrees the tool can spin up.

### 3. Skills — Stop Re-explaining Your Project Every Time

Skills are how you stop re-explaining the same project context every session.

```
Skill = persistent knowledge (how to build, conventions, "why we don't do it that way")
Format: folder + SKILL.md (instructions + metadata) + optional scripts/references/assets
Both tools use the same format
```

Without skills, the loop re-derives your entire project from scratch every cycle. With skills, knowledge compounds across runs.

### 4. Plugins & Connectors — The Loop Touches Your Real Tools

Connectors, built on MCP (Model Context Protocol), let the agent read your issue tracker, query databases, hit staging APIs, and drop messages in Slack.

This is the difference between an agent that says "here's the fix" and a loop that **opens the PR, links the ticket, and pings the channel once CI goes green — all by itself.**

### 5. Sub-agents — Separate the Maker from the Checker

The most useful structural rule in a loop: **the agent that writes code and the agent that checks it are always two different agents.**

| Role | Model Requirement | Tool Permissions |
|------|------------------|-----------------|
| Explorer | Fast, read-only | Read files, search |
| Implementer | Moderate | Read/write files, execute commands |
| Reviewer | Strong model, high effort | Read files, run tests, verify against spec |

```markdown
# .claude/agents/reviewer.md example
---
name: spec-reviewer
description: Review a draft change against project skills and tests
model: opus
isolation: worktree
---
You are an adversarial reviewer. Run the test suite. Check the diff against CONVENTIONS.md.
Reject anything that cannot be verifiably judged as "done."
```

> Why do sub-agents burn more tokens? Each runs its own model and tool calls. Spend them where a second opinion is worth paying for.

### 6. Memory / State — The Spine of the Loop

The model forgets everything between runs. State must live on **disk**, not in the context window.

```
# TODO.md — memory file that survives across runs
## Open
- [ ] flaky test in test/auth/login.spec.ts (CI #4821)
## Done
- [x] axios upgraded to patched version (PR #312, merged)
```

## 🔧 What a Complete Loop Looks Like

Put all six pieces together:

> An automation runs every weekday morning on the repo → calls a triage skill → the skill reads yesterday's CI failures, open issues, recent commits → writes findings to a memory file → for each finding worth acting on, opens a worktree and dispatches a sub-agent to draft the fix → a second sub-agent reviews the draft against project skills and tests → connectors open the PR and update the ticket → anything the loop can't handle lands in the triage inbox for you

Notice what you actually did: **you designed this system once. You did not manually prompt any of those steps.**

## ⚠️ What the Loop Still Doesn't Do for You

### 1. Verification Is Still on You

A loop running unattended is also a loop making mistakes unattended. "Done" is a claim, not a proof. Your job is to **ship code you confirmed works.**

### 2. Comprehension Debt Grows Faster

The faster the loop ships code you didn't write, the bigger the gap between what exists in the repo and what you actually understand. A smooth loop only makes this gap grow faster — unless you read what the loop produced.

### 3. Cognitive Surrender Is the Comfortable Failure

When the loop runs itself, it's very tempting to stop having an opinion and just take whatever it gives back. Designing the loop with judgment is the cure; designing it to avoid thinking is the accelerant. **Same action, opposite result.**

### 4. Token Costs Are Non-Trivial

Scheduled loop + post-turn verification model + spawned sub-agents = tokens burn fast. **Start:** slow cadence + tight goal conditions → observe for a few days → scale up only after confirming the output is worth merging.

## 📋 Starting Points for Your First Loop

| Step | What to Do | Verification |
|------|-----------|-------------|
| 1 | An automation that triages CI failures into a markdown file each morning, **no auto-merge** | Watch triage accuracy for a few days |
| 2 | Add a simple triage skill with your project conventions | Is triage more accurate? |
| 3 | For `quick-win` items, dispatch a sub-agent to draft fixes, a second to review | How's the fix quality? |
| 4 | Connect Linear/GitHub, auto-open PRs but don't auto-merge | Run for a week, check merge rate |
| 5 | Gradually scale: more triggers, more sub-agents, more connectors | Control costs, guard verification |

**Core principle: build the loop, but stay the engineer.** Directly prompting agents is still effective. The goal is balance: hand off repetitive, verifiable work to the loop; keep your judgment where it's the real value through direct control.

## 🆚 Loop Engineering vs. Related Patterns

| Pattern | Core Characteristic | Best For |
|---------|-------------------|----------|
| **Prompt Engineering** | Single-turn Q&A, optimize wording | Q&A, summaries, simple code snippets |
| **Agent Harness** | Environment for a single agent run | Defining agent behavior within one session |
| **Loop Engineering** | Multi-turn self-running, self-feeding, spawning agents | Long-running, verifiable, multi-step tasks |
| **Multi-Agent** | Multiple agents collaborating on one task | Complex tasks requiring different specialized roles |

## 📅 Timeliness Note

> 📅 Last updated: 2026-06-11
>
> Loop Engineering is a paradigm emerging in June 2026. Both Claude Code and OpenAI Codex have shipped all six building blocks, but specific commands and capabilities may change — refer to official documentation.

## 🔗 Further Reading

### Prerequisites
- [AI Engineering Paradigm Evolution](../../1-understand-ai/ai-engineering-paradigms/) - Understand the Prompt → Context → Harness → Loop four-layer relationship
- [Agent Introduction](../../1-understand-ai/agent-intro/) - AI Agent fundamentals

### Related Concepts
- [Agent Development](./agent-development.md) - Agent architecture and development
- [Prompt Engineering](./prompt-engineering.md) - Prompt design principles and techniques

### External References
- [Addy Osmani: Loop Engineering](https://addyo.substack.com/p/loop-engineering) - Original concept article
- [Loop Engineering Deep Dive (Chinese)](https://juejin.cn/post/7649738148373889065) - Detailed Chinese analysis
- [Loops Replace Prompts (Chinese)](https://knightli.com/2026/06/10/loops-replace-prompts-agent-loop-engineering/) - Chinese interpretation

---

**💡 The Core Takeaway**: Loop Engineering doesn't make the work easier — it shifts **where the highest-value work is**. From the quality of prompt writing, to designing the system that generates and verifies prompts. Build your loops. But build them like someone who intends to stay the engineer.