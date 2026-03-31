---
title: "Claude Code Founder's 15 Latest Tips (March 2026)"
difficulty: advanced
roles: [programmer]
type: guide
duration: 30min
tools: [claude-code]
tags: [Claude Code, Tips, Boris Cherny, Mobile, Automation, Hooks, Agent]
---

# Claude Code Founder's 15 Latest Tips (March 2026)

> Boris Cherny shares his latest 15 advanced tips, showcasing CC redefining AI programming tool boundaries

## Overview

In March 2026, Claude Code founder Boris Cherny shared his latest 15 tips. Unlike the 13 tips from January, this content is completely different, demonstrating CC's惊人的evolution over the past two months.

**Core Changes**:
- 🚀 Mobile Support (iOS/Android)
- 🔄 Cross-device Seamless Session Switching
- ⚙️ Automated Loop Execution (/loop, /schedule)
- 🎯 Large-scale Parallel Processing (/batch)
- 🌐 External Message Bridging (Channels)

**Original Tweet**: [Boris Cherny's Thread](https://x.com/bcherny/status/2038454336355999749)

---

## 1. Claude Code Has a Mobile App

### Feature Description

Claude App integrates Code functionality. iOS support was added in October 2025, and Android in early 2026.

**How to Use**:
1. Download Claude iOS/Android App
2. Switch to the Code tab on the left
3. View and control running sessions

**Limitations**:
- Cannot start brand new sessions
- Primarily for remote control of sessions running locally
- Suitable for checking progress, approving permission requests, appending instructions

**Download Links**:
- iOS: https://apps.apple.com/app/claude-by-anthropic/id6473753684
- Android: Search "Claude by Anthropic" on Google Play

**Use Cases**:
- ✅ Check AI work progress while commuting
- ✅ Approve remote permission requests
- ✅ Append simple instructions
- ❌ Complex coding work (still done on computer)

---

## 2. Cross-device Seamless Session Switching

### Remote Control

**Feature**: Generate a QR code in terminal, scan with phone to control session in real-time.

**Usage**:
```bash
# Method 1: Enable on startup
claude --remote-control

# Method 2: Enable during session
/rc
```

**Key Points**:
- Session always runs on local machine
- Phone is just remote control panel
- Released Feb 25, v2.1.58

**Official Docs**: https://code.claude.com/docs/en/remote-control

### Teleport

**Feature**: Pull web-based cloud sessions to local terminal to continue.

**Usage**:
```bash
# Teleport on startup
claude --teleport

# Teleport during session
/teleport
```

**Auto-execution**:
- Verify repository status
- Switch to remote session's branch
- Load complete conversation history

**Note**: One-way only, can only pull from Web to local.

**Real Scenario**:
```bash
# Scenario: Start CC on work computer for refactoring
# 1. Start session on work computer
claude --remote-control

# 2. Check progress on phone while commuting home
# Scan QR, approve permission requests, append instructions

# 3. Continue on personal computer at home
claude --teleport
# Take over from Web session, continue working
```

---

## 3. /loop and /schedule: Automated Loops

### Feature Description

Boris calls these two features CC's most powerful capabilities.

**/loop**: Loop execution within session
```bash
# Handle code review every 5 minutes
/loop 5m /babysit

# Clean codebase every hour
/loop 1h /tidy

# Upgrade dependencies every 6 hours
/loop 6h /dep-upgrade
```

**Characteristics**:
- Runs in current CLI session
- Disappears when session exits
- Auto-expires after 3 days
- Max 50 loops per session

**/schedule**: Persistent scheduled tasks
- Managed in Desktop's Cowork
- Still runs after restart
- Cloud execution

**Selection Principle**:
- Short-term monitoring use /loop (watch deployment for an hour)
- Long-term automation use /schedule (run tests every morning)

**Release Date**: March 7, v2.1.71

### Practical Value

**5-minute babysit loop**:
- Auto-reply to reviewer comments
- Auto-rebase conflicts
- Auto-run CI and fix errors
- This is an AI colleague who never rests

**Daily 8am schedule**:
```bash
/schedule 8:00 "Check all open issues, compile P0 items into a list and send to me"
```

---

## 4. Hooks: Agent Lifecycle Integration

### Feature Description

Inject deterministic logic at key Agent action points.

**Boris's Examples**:
- `SessionStart`: Dynamically load context on every startup
- `PreToolUse`: Log every bash command
- `PostToolUse`: Auto-run lint/tests

**Cool Trick**: Route permission requests to WhatsApp for remote approval.

### 25 Lifecycle Events

Covers everything from SessionStart to WorktreeCreate, supporting:
- Regex matching of tool names
- Global, project, local configuration levels

**Analogy**:
- CI/CD is automation after code commit
- Hooks is automation during code generation

**Official Docs**: https://code.claude.com/docs/en/hooks

---

## 5. Cowork Dispatch: Work Without Being at Computer

### Feature Description

Feature in Claude desktop app, in the Cowork tab.

**How it Works**:
```bash
# You send a task
"Help me handle Slack and emails"

# Dispatch automatically judges:
# - Coding task → Opens a Code session
# - Research, docs, spreadsheets → Processes in Cowork
```

**Key Features**:
- Send task from phone
- Executes on computer
- Pushes notification to phone when done

**Release Date**: March 17, Research Preview

**Supports Computer Use**:
- Click, scroll, operate desktop apps
- Max users ($100/mo) get it first
- Pro users to follow

---

## 6. Chrome Extension: Frontend Development Powerhouse

### Boris's Core View

> "The most important tip for using Claude Code: Give Claude a way to verify its output."

**Analogy**:
- Let engineer build website but not use browser → Bad results
- Give Claude a browser → It will write code→see effect→fix code→loop

### Chrome Extension Advantages

More stable and reliable than other MCP solutions.

**Previous Workflow**:
```
CC develops → Starts local server → I check browser → Screenshot to CC → Copy console errors → Paste to CC
(I am CC's "human scaffolding")
```

**Current Workflow**:
```
CC views page itself → Takes screenshots itself → Reads console errors itself → Iterates and fixes itself
(I transform from "scaffolding" to "validator")
```

**Official Docs**: https://code.claude.com/docs/en/chrome

**Download**: Chrome/Edge extension

---

## 7. Desktop Built-in Browser Preview

### Feature Description

Similar to Chrome extension, but more integrated.

**Auto-execution**:
- Start your dev server
- Test in built-in browser
- Auto screenshot, check DOM
- Click elements, fill forms
- Discover and fix issues itself

**CLI vs Desktop**:
- CLI: Requires manual configuration
- Desktop: Works out of the box

**Official Docs**: https://code.claude.com/docs/en/desktop#preview-your-app

---

## 8. Fork Session

### Problem Scenario

Chat with Claude for half an hour, reach a fork, want to try two different directions.

**Before**: Copy-paste to new session, lose all context.

**Now**: Two ways
```bash
# Method 1: During session
/branch

# Method 2: CLI
claude --resume <session-id> --fork-session
```

**Effect**:
- Share previous context
- Each goes different direction
- Don't interfere with each other

**Practical Scenario**:
```bash
# Claude proposes two architecture solutions
# I want to try both

/branch  # Try solution A
[Execute for a while]

# Open another terminal
claude --resume <session-id> --fork-session  # Try solution B
```

---

## 9. /btw: Ask Questions While Working

### Feature Description

Do parallel queries while agent is working.

**Release Date**: March 17, v2.1.77

### How it Works

```
Claude executing long task (10 minutes)
↓
I suddenly want to ask: "By the way, what's the return type of this function?"
↓
/btw What type does this function return?
↓
Generates a temporary "Ghost Agent" to answer question
↓
Characteristics:
- Read-only mode, doesn't trigger tools, doesn't modify files
- Can see full context of current conversation
- Not saved to main conversation history
- Disappears after closing
- Reuses parent session's Prompt cache, minimal cost
```

**Boris's Use Case**:
```bash
# Let Claude do refactoring, running for 10 minutes
# Suddenly want to ask a quick question

/btw What type does this function return?
# Get answer immediately, doesn't pollute main context, doesn't interrupt Claude's work
```

---

## 10. Git Worktrees Deep Support

### Feature Description

Boris runs dozens of Claude instances simultaneously, relying on git worktrees.

**What is Worktree**:
- Git allows multiple independent working directories in same repo
- Each directory can checkout different branches
- Don't interfere with each other

**Usage**:
```bash
# Start session in new worktree
claude -w

# Specify name
claude -w feature-auth

# Add tmux for better experience
claude -w feature-auth --tmux
# Auto-creates tmux session, iTerm2 users can use native panels
```

**Release Date**: Feb 19, v2.1.49

**Why Important**:
```bash
# If running 5 Claudes doing different tasks in same repo
# They will step on each other's files

# worktree gives each Claude an independent sandbox
# Even if something breaks, doesn't affect others
```

---

## 11. /batch: Fan-out Large-scale Changes

### Feature Description

**Release Date**: Feb 28, v2.1.63

### Workflow

```
1. You tell it what you want to do ("interview" phase)
↓
2. Starts orchestration Agent entering Plan mode
↓
3. Launches Explore Agent to research impact scope
↓
4. Splits work into 5-30 independent execution units
↓
5. Each unit runs in parallel in its own worktree
```

**Use Case**: Large-scale code migration

### Practical Example

```bash
# CommonJS → ESM migration, 500 files

/batch
# I want to migrate this large project from CommonJS to ESM

# Claude automatically:
# 1. Analyzes which files can be changed in parallel
# 2. Opens dozens of agents working separately
# 3. Merges after completion

# This isn't "AI-assisted programming"
# This is "AI legion programming"
```

---

## 12. --bare: SDK Startup Speedup 10x

### Feature Description

Skip all auto-discovery, only keep basic tools.

**Release Date**: March 20, v2.1.81

### Default Startup Process

```bash
claude -p
# Will search for:
# - CLAUDE.md
# - settings
# - MCP servers
# - hooks
# - skills
# - plugins
# ...
```

### --bare Mode

```bash
claude --bare -p "your query"
# Skips:
# - hooks
# - skills
# - plugins
# - MCP
# - auto memory
# - CLAUDE.md
# Only keeps:
# - Bash
# - File reading
# - File editing
```

**Startup Speed Improvement**: Up to 10x (depends on how much you have installed)

**Note**:
- OAuth and keychain reading skipped in bare mode
- Need to authenticate via `ANTHROPIC_API_KEY` env var or `--settings`

**Use Cases**:
- Writing automation scripts
- Batch calls
- Saving a few hundred milliseconds each time adds up

---

## 13. --add-dir: Cross-repo Collaboration

### Feature Description

Tell Claude about another repo and give it read/write access.

**Usage**:
```bash
# Start Claude in one repo
cd my-frontend

# Add dependency UI library
claude --add-dir ../ui-library

# Add during session
/add-dir ../ui-library
```

**Release Date**: v2.1.45 onwards (Feb 17)

### Latest Version Enhancement

```bash
# Content under --add-dir directory also gets loaded:
# - CLAUDE.md (understand rules and conventions)
# - .claude/skills/ (use that repo's skills)
```

**Practical Scenario**:
```bash
# Frontend project depends on internal UI library
# You changed UI library's interface
# Claude can automatically update calls in frontend project
```

---

## 14. --agent: Custom Agents

### Feature Description

Boris calls this an "often overlooked powerful primitive."

**Implementation**:
```bash
# Define agent file in .claude/agents/ directory
# Write system prompt and tool configuration

claude --agent=<your-agent-name>
```

**Difference from skills**:
- skills: Command set
- agent: Complete "role"
  - Has its own personality
  - Has its own tool set
  - Can configure different MCP servers

**Official Docs**: https://code.claude.com/docs/en/sub-agents

### Practical Examples

```bash
# Create agent specialized in code review
.claude/agents/code-reviewer.md

# Create agent specialized in writing docs
.claude/agents/doc-writer.md

# Create agent specialized in security scanning
.claude/agents/security-scanner.md
```

---

## 15. /voice: Voice Input for Coding

### Feature Description

Boris says he mostly codes by talking to Claude, not typing.

**Usage**:
```bash
# Run in CLI
/voice
# Hold spacebar to talk, release to send

# Desktop
# Click voice button

# iOS
# Enable dictation in settings
```

**Release Date**: March 5, v2.1.69

**Language Support**: 20 languages

**Details**:
- Can mix typing and voice
- Type half, hold spacebar say the other half
- Seamless splicing

**Official Docs**: https://code.claude.com/docs/en/voice-dictation

### Significance

Programming interaction is shifting from "typing" to "conversation".

```bash
# Before: Accurately describe every technical detail
# Now: Chat like with a colleague

"Change that login page button color to blue, then add a loading state"
```

---

## Bonus Discovery: Channels

### Feature Description

Push messages to running CC sessions via Telegram, Discord, iMessage.

**Key Point**:
- Not starting new session
- Pushing to your already open session

### Use Case

```bash
# Running CC in terminal doing refactoring
# You go out

# Send message on Telegram:
"Also handle that deprecated API"

# Message directly reaches running session
# Claude continues working
```

### Setup

```bash
# Install Telegram plugin
# Configure bot token

claude --channels plugin:telegram@claude-plugins-official
```

**Release Status**: Research Preview, requires v2.1.80+

**Official Docs**: https://code.claude.com/docs/en/channels

---

## Release Timeline (Feb-Mar 2026)

| Feature | Version | Date |
|---------|---------|------|
| --add-dir multi-repo | v2.1.45 | Feb 17 |
| Git Worktrees | v2.1.49 | Feb 19 |
| Remote Control | v2.1.58 | Feb 25 |
| /batch fan-out | v2.1.63 | Feb 28 |
| /voice input | v2.1.69 | Mar 5 |
| /loop + /schedule | v2.1.71 | Mar 7 |
| /btw + /branch | v2.1.77 | Mar 17 |
| Dispatch | — | Mar 17 |
| --bare speedup | v2.1.81 | Mar 20 |

**Iteration Speed**: Average one major feature every 3 days.

---

## Core Trend Analysis

### 1. Programming No Longer Desktop-bound

**Changes**:
- Code on phone, remote control, Dispatch tasks from anywhere
- Boris himself uses phone on couch to have Claude submit PRs

**Implication**:
- Programmers no longer need to sit at computers 24/7
- But also means "off-hours" become more blurred

### 2. Agents Becoming More Autonomous

**Essence of /loop and /schedule**:
- Let AI run continuously without you being present
- Babysit every 5 minutes, upgrade dependencies every 6 hours
- This is an AI colleague who never sleeps

### 3. Parallelization is New Productivity Multiplier

**Worktrees + /batch**:
- Can have thousands of Claudes working simultaneously
- One person's output can equal an engineering team

### 4. OpenClaw's Exploratory Innovation Being Absorbed

**Concept Mapping**:
- Mobile
- Message bridging
- Automated patrolling
- Agent autonomous operation

These concepts OpenClaw pioneered, CC is turning into stable product features with stronger engineering capabilities.

---

## Boris's Usage Philosophy

### Core Advice (Point 6 Most Important)

> "The most important tip for using Claude Code: Give Claude a way to verify its output."

**Analogy**:
- Let engineer build website but not use browser → Bad results
- Give Claude a browser → It will iterate and optimize

### Actual Workflow

Boris uses Claude Code for over ten hours daily:
- Coding
- Writing
- Data analysis

**Not Perfect**:
- Sometimes still makes mistakes
- But CC team really listens to user feedback
- Iteration speed faster than anyone imagined

---

## Next Steps

Boris ended with: "I wanted to keep writing but had to stop, will share more later."

**Waiting...**

---

## Reference Links

- [Boris's Original Tweet](https://x.com/bcherny/status/2038454336355999749)
- [Chrome Extension](https://code.claude.com/docs/en/chrome)
- [Desktop Preview](https://code.claude.com/docs/en/desktop#preview-your-app)
- [CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Custom Agents](https://code.claude.com/docs/en/sub-agents)
- [Channels](https://code.claude.com/docs/en/channels)
- [Remote Control](https://code.claude.com/docs/en/remote-control)
- [Voice Dictation](https://code.claude.com/docs/en/voice-dictation)
- [Hooks](https://code.claude.com/docs/en/hooks)

---

**Source**: WeChat article by Hua Shu (March 30, 2026)
**Original Author**: Hua Shu
**Original Title**: "Claude Code Founder Shared His Latest 15 CC Tips!"
