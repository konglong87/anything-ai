---
title: "Xuanxue Skills - Chinese Metaphysics Skill Pack (BaZi, Feng Shui, Palmistry, Qi Men)"
difficulty: beginner
roles: [all]
type: guide
duration: 30min
tools: [claude-code, codex, cursor, trae]
tags: [skills, xuanxue, bazi, fengshui, palmistry, qimen, chinese-metaphysics]
---

# 🔮 Xuanxue Skills - Chinese Metaphysics Skill Pack

> **GitHub**: [konglong87/xuanxue-skills](https://github.com/konglong87/xuanxue-skills)
>
> **Version**: v0.2.0 | **License**: MIT
>
> **Positioning**: Give your AI Agent the ability to read BaZi (Eight Characters), love & marriage, wealth & career, palmistry, and Qi Men charts

## 📖 Introduction

**Xuanxue Skills** is an all-in-one Chinese traditional metaphysics skill pack covering fortune telling, Da Yun (decade luck cycles), feng shui, palm reading, marriage & relationships, and career & wealth.

Its design philosophy differs from ordinary prompts:

- **No need to remember skill names**: No need to memorize commands like `bazi` or `qimen`; just ask in everyday language
- **No need to understand metaphysics jargon**: You can use it without knowing what "day boundary" (换日), "luck start" (起运), or "chart structure" (格局) mean
- **Code computation instead of mental math**: Four Pillars, solar terms, true solar time, Da Yun, and GanZhi relations are computed by a shared calculation core, not by the model guessing from memory
- **For entertainment & research only**: Does not constitute medical, investment, career, or legal advice

## ✨ Current Capabilities

| Capability | Status | Boundaries You Should Know |
|---|---|---|
| **BaZi Comprehensive** (bazi) | Open | Code-based chart calculation, presenting school differences on day boundary, luck start, strength, structure, and favorable elements side by side |
| **Love & Marriage** (love-marriage) | Open | Analyzes tendencies and interaction patterns; never asserts certain marriage/divorce or others' private facts |
| **Wealth & Career** (wealth-career) | Open | Analyzes direction, rhythm, and risks; does not guarantee returns or replace investment/career advice |
| **Palmistry** (palm) | Open | Host Agent handles multimodal observation (viewing images), code verifies observation structure; conclusions must correspond to actual features in the photos |
| **Qi Men Chart** (qimen) | Open | Only interprets complete charts cast by trusted external apps; does not currently cast charts itself |
| **Face Reading** (face-reading) | Planned | Not open yet due to facial privacy concerns |
| **Feng Shui NaQi** (fengshui-naqi) | Planned | Calculation core has partial capability; full user skill not yet released |
| **Divination** (divination) | Planned | Not yet implemented; not in the current installation list |

## 🚀 Quick Start (30 seconds)

As long as your Agent can execute terminal commands, installation is complete in seconds.

**Step 1**: In WorkBuddy, Codex, Claude Code, Cursor, or Trae, just say:

```
Help me install https://github.com/konglong87/xuanxue-skills
```

**Step 2**: After installation, say:

```
Please verify whether xuanxue-skills is installed successfully and tell me what capabilities I can use now.
```

If your Agent cannot execute terminal commands, use Manual Installation below.

## 💻 Manual Installation (Technical Users)

Requires **Node.js 18 or higher**. Example below uses Codex personal install:

```bash
# Install
npx --yes github:konglong87/xuanxue-skills install --agent codex --scope user

# Verify
npx --yes github:konglong87/xuanxue-skills verify --agent codex --scope user
```

- Replace `codex` with `claude-code`, `cursor`, `trae`, or `workbuddy`
- `--scope user` installs to your personal environment; use `--scope project` in a target project directory to install to the current project
- The installer copies the complete `core/`, `vendor/`, and `skills/` to a stable versioned directory, then creates host-discoverable skill entries. Ordinary single-skill copy tools miss the shared computation core, so they don't work for this project

**Safe uninstall**:

```bash
npx --yes github:konglong87/xuanxue-skills uninstall --agent codex --scope user
```

The uninstaller only removes entries still owned by this project; it does not remove user-modified paths or other skills.

**Claude Code marketplace method**:

```bash
claude plugin marketplace add konglong87/xuanxue-skills
claude plugin install xuanxue-skills@xuanxue-skills
```

**Local development loading**:

```bash
git clone https://github.com/konglong87/xuanxue-skills.git
claude --plugin-dir /absolute/path/to/xuanxue-skills
```

## 💬 What You Can Ask

Copy the phrases below and replace with your own information.

| You Want To Know | Ask Like This | What To Prepare |
|---|---|---|
| BaZi Comprehensive | Please do a complete comprehensive BaZi analysis based on my birth information, and explain the differences between schools. | Birth date, time, place, gender |
| Love & Marriage | Please analyze my love/marriage tendencies, interaction patterns, and phase changes; do not conclude certain marriage or divorce. | Full birth info + specific question |
| Wealth & Career | Please analyze my career direction, work characteristics, and wealth rhythm; do not promise returns. | Full birth info + specific question |
| Palmistry | Please analyze hand shape, mounts, main lines, and special markings from these two palm photos. | Clear photos of both palms |
| Qi Men Chart | Please interpret this Qi Men chart and explain the reasoning for each palace. | Complete chart cast by an external Qi Men app |

**BaZi question example**:

```
Please do a complete comprehensive BaZi analysis based on my birth information.
Birth date: 1990-01-01
Birth time: 12:00
Birth place: Shanghai
Gender: Male
Focus: personality, love/marriage, wealth/career, and 2026 trends
Please list the different school conclusions on day boundary, luck start, strength, and structure; don't secretly choose a school for me.
```

When information is incomplete, the skill asks once for what's missing; it never guesses birth time or place.

### Preparation Before Use

| Scenario | Best To Provide |
|---|---|
| BaZi, Love & Marriage, Wealth & Career | Gregorian birth date, as accurate birth time as possible, birth city, gender; for overseas or historical records, best to add the timezone at the time |
| Palmistry | Left and right hands photographed separately, palm up, natural light, clear image, no beauty filter, palm lines unobstructed |
| Qi Men | Complete chart screenshot from a trusted app, or palace-by-palace text transcription; this project does not cast charts itself |

## 🏗️ Why Not Just a Normal Prompt

| Design | Explanation |
|---|---|
| **Code computation** | Four Pillars, solar terms, true solar time, Da Yun, and GanZhi relations are computed by a shared calculation core, not by the model mentally |
| **School parallelism** | When schools differ on day boundary, luck start, strength, structure, or favorable elements, present method, basis, and result together |
| **Reality checking** | Framed as tendencies and questions you can check against reality; never fabricates life events that have already happened |
| **Safety boundaries** | No return guarantees, no certain marriage/divorce assertions, no medical diagnosis, no packaging traditional cultural interpretation as established fact |

## 🧩 Architecture & Verification

```
core/ganzhi <- core/calendar <- skills/bazi <- skills/love-marriage <- skills/wealth-career
core/direction <- core/naqi
core/ganzhi + core/direction <- skills/qimen
host vision -> skills/palm contract
```

- `core/` does not depend on `skills`; five hosts share the same computation core and runtime
- Runtime has **zero external dependencies**; inlined `lunar-javascript` retains MIT license and source attribution
- Dev verification: `npm install && npm test -- --runInBand && node scripts/e2e-smoke.js`

### Agent Compatibility Status

`verified` means host discovery and real invocation are complete; `experimental` means the installer is verified but real-device evidence on the host is incomplete.

| Agent | Status | Current Evidence |
|---|---|---|
| claude-code | verified | All five skills discovered; BaZi, love/marriage, wealth/career, and dual-domain routing passed real-model acceptance |
| codex | experimental | Official path and installer probes pass; test machine CLI exits abnormally, host discovery not completed |
| cursor | experimental | Install lifecycle and runtime probes pass; real discovery blocked by test machine login state |
| trae | experimental | Path mapping and install lifecycle pass; no usable Trae real device available |
| workbuddy | experimental | Skill directory and import logic confirmed; in-host discovery and invocation still pending |

## ⚠️ Safety Boundaries (Read First)

- This project is for **Chinese traditional numerology culture research & entertainment**; it does not constitute medical, investment, career, legal, or other professional advice
- Birth data, palm photos, and charts are processed by the Agent host of your choice. This project itself does not upload or persist this data; host platform data policies still apply
- Celebrity cases are only used to verify chart calculation correctness, not to prove that life experiences can be accurately predicted by numerology
- Health-related observations in palmistry can only express physical constitution or energy tendencies; they do not constitute medical diagnosis

## 🔗 Related Resources

- [AI Fortune Teller Application Guide](../../roles/fortune-teller/README.md) - Understand fortune-telling chart principles and prompt templates
- [Tool Matrix](../../2-choose-tools/tool-matrix.md) - Fortune-telling entertainment tool selection reference