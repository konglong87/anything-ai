---
title: Everything Claude Code - Curated Resources
description: ECC is a performance optimization system for Claude Code, providing skills, agents, rules, and automated hooks
difficulty: intermediate
roles: ['programmer', 'developer']
type: guide
duration: 30min
tags: ['ECC', 'Claude Code', 'skills', 'agents']
---

# Everything Claude Code - Curated Resources

> **Source**: [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
> **Stars**: 112k+ ⭐ | **Contributors**: 30+ | **Status**: Actively Maintained

## 🎯 What is Everything Claude Code?

Everything Claude Code (ECC) is a **performance optimization system for Claude Code**, developed by an Anthropic Hackathon winner. It's not just a collection of config files—it's a complete system:

- **Skills**: 125+ workflow definitions and domain knowledge
- **Agents**: 28+ specialized subagents for delegated tasks
- **Rules**: 34+ always-follow guidelines
- **Commands**: 60+ quick execution commands
- **Hooks**: Automated triggers for session management, code checks, etc.
- **Cross-Platform**: Claude Code, Cursor, OpenCode, Codex

## 📚 ECC Core Values

ECC has been battle-tested over 10+ months and validated in multiple production applications:

### 1. **Token Optimization**
- Model selection strategy (Sonnet vs Opus)
- System prompt slimming
- Background process management
- **Save 60%+ costs**

### 2. **Memory Persistence**
- Auto-save/load context across sessions
- Session lifecycle management
- Strategic compaction suggestions

### 3. **Continuous Learning**
- Auto-extract patterns from sessions
- Instinct learning and evolution
- Confidence scoring

### 4. **Verification Loops**
- Checkpoint vs continuous verification
- Grader types
- Pass@k metrics

### 5. **Parallelization**
- Git Worktrees
- Cascade method
- Instance scaling strategies

## 🎓 Why ECC Fits Anything-AI Audience?

ECC's core philosophy aligns perfectly with Anything-AI:

✅ **Practice Makes Perfect** - ECC comes from real project development, not theory
✅ **Time-Tested** - 10+ months of continuous iteration and optimization
✅ **Dialectical Unity** - No AI mythologizing, provides verification and review mechanisms
✅ **Systematic Learning** - Structured skills and workflows

## 📦 ECC Curated Content Index

Anything-AI has curated the following content to help beginners get started:

### 🛠️ Skills

We've integrated these foundational skills in `5-skills/`:

| Skill | Description | ECC Original Location |
|-------|-------------|----------------------|
| [TDD Workflow](../../5-skills/tdd-workflow/) | Test-driven development basics | `skills/tdd-workflow/` |
| [Coding Standards](../../5-skills/coding-standards/) | Universal coding standards | `skills/coding-standards/` |
| [Security Review](../../5-skills/security-review/) | Security checklist | `skills/security-review/` |
| [Backend Patterns](../../5-skills/backend-patterns/) | API, database, caching patterns | `skills/backend-patterns/` |
| [Frontend Patterns](../../5-skills/frontend-patterns/) | React, Next.js patterns | `skills/frontend-patterns/` |
| [API Design](../../5-skills/api-design/) | REST API design patterns | `skills/api-design/` |
| [E2E Testing](../../5-skills/e2e-testing/) | Playwright E2E testing | `skills/e2e-testing/` |
| [Verification Loop](../../5-skills/verification-loop/) | Continuous verification mechanism | `skills/verification-loop/` |

### 👥 Agents

We've integrated these core agents in `roles/`:

| Agent | Description | ECC Original Location |
|-------|-------------|----------------------|
| [Code Reviewer](../../roles/code-reviewer/) | Quality and security review | `agents/code-reviewer.md` |
| [Planner](../../roles/planner/) | Implementation planning | `agents/planner.md` |
| [TDD Guide](../../roles/tdd-guide/) | TDD methodology guidance | `agents/tdd-guide.md` |
| [Security Reviewer](../../roles/security-reviewer/) | Vulnerability analysis | `agents/security-reviewer.md` |

### 📏 Rules

We've integrated key rules in `resources/specialized/`:

| Rule Category | Description | ECC Original Location |
|---------------|-------------|----------------------|
| [Common Rules](../../resources/specialized/coding-rules/common/) | Language-agnostic principles | `rules/common/` |
| [Testing Rules](../../resources/specialized/coding-rules/testing/) | TDD, coverage requirements | `rules/common/testing.md` |
| [Security Rules](../../resources/specialized/coding-rules/security/) | Mandatory security checks | `rules/common/security.md` |
| [Pattern Rules](../../resources/specialized/coding-rules/patterns/) | Design patterns and scaffolding | `rules/common/patterns.md` |

## 🚀 How to Start Using ECC?

### Option 1: Install as Plugin (Recommended)

```bash
# Add marketplace
/plugin marketplace add affaan-m/everything-claude-code

# Install plugin
/plugin install everything-claude-code@everything-claude-code
```

### Option 2: Manual Installation

```bash
# Clone repository
git clone https://github.com/affaan-m/everything-claude-code.git

# Install dependencies
npm install  # or: pnpm install | yarn install | bun install

# Install rules (choose based on your tech stack)
./install.sh typescript  # or: python, golang, swift, php
```

### Option 3: Learn via Anything-AI

Start with Anything-AI's curated content:

1. Read [TDD Workflow](../../5-skills/tdd-workflow/)
2. Learn [Coding Standards](../../5-skills/coding-standards/)
3. Practice [Code Review](../../roles/code-reviewer/)
4. Master and migrate to full ECC system

## 📖 ECC Learning Path

### Beginner Level (Recommended to Start)

1. **Coding Standards** - Understand basic code quality requirements
2. **TDD Workflow** - Learn test-driven development
3. **Security Review** - Master basic security checks
4. **Verification Loop** - Understand continuous verification mechanisms

### Intermediate Level

1. **Backend/Frontend Patterns** - Learn architectural patterns
2. **API Design** - Master REST API design
3. **E2E Testing** - Practice E2E testing
4. **Agent Usage** - Learn delegation strategies

### Advanced Level

1. **Hook System** - Configure automated triggers
2. **Continuous Learning** - Extract patterns from sessions
3. **Token Optimization** - Optimize cost and performance
4. **Parallelization** - Multi-instance scaling strategies

## 🔗 Important Links

- **GitHub Repository**: [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- **Shorthand Guide**: [The Shorthand Guide](https://github.com/affaan-m/everything-claude-code/blob/main/the-shortform-guide.md)
- **Longform Guide**: [The Longform Guide](https://github.com/affaan-m/everything-claude-code/blob/main/the-longform-guide.md)
- **Security Guide**: [The Security Guide](https://github.com/affaan-m/everything-claude-code/blob/main/the-security-guide.md)
- **AgentShield**: [Security Auditor Tool](https://github.com/affaan-m/everything-claude-code/tree/main/agentshield)

## 💡 ECC and Anything-AI Relationship

**Anything-AI** is a curated and localized version of ECC content:

| Dimension | Anything-AI | Everything Claude Code |
|-----------|-------------|------------------------|
| Audience | AI beginners, non-technical users | Developers, engineers |
| Content Volume | Curated 10-15 skills | Full 125+ skills |
| Learning Curve | Progressive, starts from basics | In-depth, requires technical background |
| Positioning | Systematic introductory learning | Production-grade performance optimization |
| Relationship | **ECC Curated Edition** | **Complete Edition** |

## 🎯 When to Migrate from Anything-AI to ECC?

We recommend migrating to full ECC after completing:

✅ Mastered TDD basic workflow
✅ Understood coding standards and security review
✅ Familiar with at least one agent's usage
✅ Need advanced features (Hooks, continuous learning, parallelization)

## ⚠️ Important Notes

1. **Don't install everything at once** - ECC has massive content, install as needed
2. **Token Consumption** - Using ECC consumes more tokens, configure token optimization
3. **Version Requirements** - ECC requires Claude Code CLI v2.1.0+
4. **Learning Curve** - Full ECC system takes time to master, start with Anything-AI curated content

## 📝 Version Information

- **ECC Current Version**: v1.9.0 (March 2026)
- **Anything-AI Curated Version**: Based on v1.9.0
- **Update Frequency**: ECC actively maintained, Anything-AI periodically syncs core content

---

**Back to**: [External Resources](../) | [Anything-AI Home](../../)
