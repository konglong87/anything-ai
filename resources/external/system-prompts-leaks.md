---
title: 系统提示词解密 - System Prompts Leaks
difficulty: intermediate
roles: [developer, researcher, advanced-user, ai-developer]
type: guide
duration: 30 min
tags: [System Prompt, Prompt Engineering, AI原理, Claude, ChatGPT, Gemini, LLM]
tools: [Claude, ChatGPT, Gemini, Copilot, Cursor]
---

# 系统提示词解密 - System Prompts Leaks

> **想看AI的"底牌"？这个项目把主流AI的系统提示词全扒出来了。**

## 🎯 这是什么

[system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) 是一个持续更新的开源项目，收集并公开了主流AI聊天机器人的**系统提示词（System Prompt）**——也就是AI在回答你之前，暗中收到的那些"幕后指令"。

**通俗理解**：你跟AI聊天时，AI不是"裸奔"的。每个AI背后都有一套系统提示词，告诉它"你是谁、该怎么回答、什么不能说"。这个项目把这些幕后指令全部扒了出来，让你能看到AI的"底牌"。

**项目数据**（截至2026年6月）：
- ⭐ GitHub Stars：45,886
- 📦 覆盖厂商：Anthropic、OpenAI、Google、xAI、Microsoft、Perplexity 等
- 🔄 持续更新，几乎每周都有新内容
- 📰 被《华盛顿邮报》报道

## 🤔 为什么值得看

### 1. 理解AI的"出厂设置"

系统提示词是AI的出厂配置。看了它，你就知道：
- AI为什么总是那么"礼貌"——因为提示词里写了"要友好、要尊重"
- AI为什么拒绝某些问题——因为提示词里有明确的红线
- AI为什么"偏科"——因为提示词给它设定了角色和能力边界

### 2. 学习提示词工程的顶级范例

这些系统提示词是**全球顶级AI团队**写的提示词——Anthropic、OpenAI、Google的工程师们亲手打磨的。看这些提示词，你能学到：
- 如何用提示词定义AI的角色和行为边界
- 如何用提示词控制AI的输出风格和质量
- 如何用提示词设置安全护栏（防止AI乱说话）
- 如何用提示词给AI注入工具使用能力

**这是提示词工程的"教科书级"素材。**

### 3. 看到AI厂商的设计哲学

不同厂商的系统提示词风格截然不同：
- **Anthropic（Claude）**：详细、严谨、强调安全和诚实，提示词非常长
- **OpenAI（ChatGPT）**：简洁、实用、注重通用性
- **Google（Gemini）**：结构化、工具导向、强调多模态能力

对比阅读，你能看出每家厂商对AI的不同理解和不同取舍。

## 📋 覆盖哪些AI

项目收录了以下主流AI的系统提示词（持续更新）：

| 厂商 | AI产品 | 说明 |
|------|--------|------|
| **Anthropic** | Claude Fable 5、Opus 4.8、Claude Code、Claude Design | 最详细的提示词，含工具定义 |
| **OpenAI** | GPT-5.5 Thinking、GPT-5.5 Instant、GPT-5.5 Codex | 含API版本和网页版本 |
| **Google** | Gemini 3.5 Flash、Gemini 3.1 Pro、Antigravity CLI | 含工具JSON定义 |
| **xAI** | Grok Expert | 风格独特 |
| **Microsoft** | GitHub Copilot、VS Code Copilot Agent、Copilot macOS App | 开发者工具提示词 |
| **Perplexity** | Perplexity Computer | 搜索增强型AI |
| **其他** | Cursor、Zed AI、Docker Gordon AI | 开发者工具 |

## 🔍 重点推荐阅读

### 入门必读

1. **[Claude Opus 4.8 系统提示词](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/claude-opus-4.8.md)** — Anthropic最新旗舰模型的完整提示词，长度惊人，细节丰富，是理解"安全优先"设计哲学的最佳案例

2. **[Claude Fable 5 系统提示词](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/claude-fable-5.md)** — 与Opus 4.8的[对比差异](https://www.diffchecker.com/QJn9jFNk/)非常有意思，能看到Anthropic在不同模型上的策略调整

3. **[GPT-5.5 Thinking 系统提示词](https://github.com/asgeirtj/system_prompts_leaks/blob/main/OpenAI/gpt-5.5-thinking.md)** — OpenAI的思考模型提示词，风格与Claude截然不同

### 开发者必读

4. **[Claude Code 系统提示词](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/Claude%20Code/claude-code-opus-4.8.md)** — Claude Code的完整提示词，包含所有工具定义，是理解AI编程助手设计的关键

5. **[VS Code Copilot Agent 系统提示词](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Microsoft/vscode-copilot-agent.md)** — 微软的AI编程助手提示词，与Claude Code对比阅读收获更大

6. **[Claude Design 系统提示词](https://github.com/asgeirtj/system_prompts_leaks/blob/main/Anthropic/claude-design.md)** — 含50个工具+16个技能+8个启动源，是AI工具集成设计的教科书

## 💡 怎么读最有收获

### 方法1：对比阅读

选两个同类型AI的提示词对比阅读：
- Claude vs ChatGPT → 理解"安全优先"vs"通用优先"的设计取舍
- Claude Code vs Copilot Agent → 理解AI编程助手的不同设计思路
- Gemini Flash vs Gemini Pro → 理解同一厂商不同定位模型的提示词差异

### 方法2：结构拆解

把一个系统提示词拆解成几个维度：
- **角色定义**：AI被设定成什么角色？
- **能力边界**：AI能做什么、不能做什么？
- **安全护栏**：哪些红线被明确设定？
- **工具集成**：AI被赋予了哪些工具？怎么调用？
- **输出控制**：AI的输出风格、格式、长度怎么控制？

### 方法3：版本追踪

项目会持续更新同一AI的不同版本提示词。追踪版本变化，你能看到：
- AI厂商在安全策略上的调整
- 新功能是如何通过提示词注入的
- 用户反馈如何影响提示词的修改

## ⚠️ 正确态度

看系统提示词是**学习**，不是**破解**：

- ✅ **学习提示词工程**：顶级团队的提示词写法是最好的学习素材
- ✅ **理解AI设计哲学**：不同厂商的取舍反映了不同的价值观
- ✅ **提升AI使用水平**：理解AI的出厂设置，能更好地与AI协作
- ❌ **不要试图绕过安全护栏**：系统提示词的安全限制是有意义的
- ❌ **不要迷信系统提示词**：提示词只是AI行为的一部分，不是全部
- ❌ **不要把提示词当"秘籍"**：理解原理比抄写提示词更重要

**记住我们项目的核心理念**：用AI，但不盲从。理解AI的底层逻辑，是为了更好地驾驭它，而不是为了破解它。

## 🔗 项目链接

- **GitHub仓库**：[asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)
- **在线浏览网站**：[system_prompts_leaks.github.io](https://asgeirtj.github.io/system_prompts_leaks/)
- **许可证**：CC0-1.0（公共领域，自由使用）

## 📚 相关学习

- [提示词工程](../../4-advanced-topics/prompt-engineering) — 系统学习提示词技术
- [AI如何思考](../../1-understand-ai/how-ai-thinks/reasoning) — 理解AI的推理机制
- [Claude详细指南](../../2-choose-tools/tools/claude/README) — 深入了解Claude的使用
- [提示词库](../../prompts/README) — 实用提示词模板

---

**去看AI的底牌，理解它，驾驭它。** 🦖
