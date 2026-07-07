---
title: "Reasoning Models & Slow Thinking: How AI Learned to Think Before Answering"
difficulty: intermediate
roles: [everyone]
type: concept
duration: 30min
tools: [chatgpt, claude, deepseek, gemini]
tags: [Reasoning, Chain-of-Thought, RL, Test-Time Compute]
author: "konglong"
created: 2026-07-07
updated: 2026-07-07
version: 1.0
---

# Reasoning Models & Slow Thinking: How AI Learned to Think Before Answering

> In one sentence: before giving an answer, a reasoning model generates a long internal "thinking process" (a long chain of thought), trained into a capability through reinforcement learning.

## 🤔 What is this

**Plain explanation**: A normal model "blurts out" — it answers the moment you finish asking. A reasoning model "does the math on scratch paper first" — it writes a long internal reasoning trace, then gives the final answer. This "think-then-answer" style makes it far more accurate on math, coding, and logic.

**Technical definition**: A Reasoning Model is a class of models trained with **large-scale Reinforcement Learning (RL)** and **Test-Time Compute**. Key milestones:

- **OpenAI o1** (released Sep 2024, started the paradigm) → **o3** (stronger)
- **DeepSeek-R1** (Jan 2025, open-source, ignited the community)
- **Google Gemini** thinking mode
- **Claude** extended thinking

Its core mechanism is the **Long Chain-of-Thought (Long CoT)**: the model spontaneously decomposes a problem into steps, tries multiple paths, self-corrects, and only then outputs the answer.

## 📖 Why it matters

1. **Step-change on hard tasks**: math proofs, competitive programming, and complex planning beat non-reasoning models by a wide margin
2. **Paradigm shift**: from "who has the biggest model / most data" to "who computes deepest at inference" — i.e. test-time scaling
3. **Open-source access**: after DeepSeek-R1, individuals and small teams can run strong reasoning models locally

## 🎯 How to apply

### When to use

- ✅ Math / competitive programming / algorithm problems
- ✅ Multi-step logic, debugging, architecture design
- ✅ Decisions that need a traceable reasoning trail
- ❌ Small talk, simple classification, low-latency needs (a normal model is cheaper)

### Impact on prompting

- Give the model "space to think"; don't rush it
- Use fewer examples (few-shot can disturb its autonomous reasoning)
- Instead of commanding "think step by step", just ask the hard question — it will expand on its own
- Budget time and cost: reasoning is slower and more expensive

### Best practices

1. Use reasoning models for hard tasks, normal models for easy ones — switch as needed
2. For critical conclusions, ask the model to "show verification steps" to improve reliability
3. Watch the context window: long CoT consumes tokens

## ⚠️ Common misconceptions

- ❌ **Reasoning models just "output more words"**
  - ✅ The reasoning trace is an RL-optimized strategy, not padding
- ❌ **Every question should use a reasoning model**
  - ✅ On simple tasks it is slower, costlier, with limited gain
- ❌ **The thinking process is always visible**
  - ✅ Some models hide the chain-of-thought (showing only a summary), for safety and business reasons

## 📅 Timeliness note

> 📅 Last updated 2026-07-07. Reasoning models evolve extremely fast; new versions keep improving accuracy, context, and cost. Follow official benchmarks.

## 🔗 Further reading

### Prerequisites

- [Transformer Architecture Intro](../1-understand-ai/llm-basics/transformer-intro.md) - the foundation under LLMs

### Deep dive

- [OpenAI o1](https://openai.com/o1/) - where reasoning models began
- [DeepSeek-R1 on GitHub](https://github.com/deepseek-ai/DeepSeek-R1) - open-source reasoning model
- [Claude Extended Thinking Docs](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) - how to use it

---

**💡 Tip**: The key to reasoning models is distinguishing "generation speed" from "thinking depth" — they are not smarter, they just think longer.
