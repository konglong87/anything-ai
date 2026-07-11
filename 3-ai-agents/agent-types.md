---
title: "Agent 类型全景：从 Coding Agent 到 Research Agent"
title_en: "Agent Types: From Coding Agents to Research Agents"
difficulty: beginner
roles: [programmer, student, everyone]
type: concept
duration: 15min
tools: [claude, chatgpt, deepseek, cursor, copilot]
tags: [Agent, Coding Agent, Research Agent, Creative Agent, Analysis Agent, Agent类型]
prerequisites: ["1-understand-ai/agent-intro/agent-intro"]
---

# Agent 类型全景：从 Coding Agent 到 Research Agent

> 不同类型的 Agent 解决不同问题。选错类型，就像用锤子拧螺丝——工具再好也白搭。

## 🤔 为什么需要分类

Agent 不是一种东西，而是**一类东西**。就像"车"包括轿车、卡车、公交车一样，Agent 也分多种类型，各有擅长的场景。理解类型，才能选对工具、设对期望。

## 📊 四大 Agent 类型

### 1. Coding Agent（编程 Agent）

**一句话**：帮你写代码、改代码、测代码的 Agent。

**核心能力**：
- 代码生成与补全
- 代码审查与重构
- 自动测试与调试
- 项目级理解（跨文件上下文）

**代表工具**：
| 工具 | 特点 | 适合谁 |
|------|------|--------|
| Claude Code | 终端 Agent，项目级理解，支持 MCP | 重度开发者 |
| Cursor | IDE 内嵌，实时补全+对话 | 日常开发者 |
| GitHub Copilot | 行级补全，轻量集成 | 所有开发者 |
| Codex CLI | OpenAI 出品，沙箱执行 | 实验型开发者 |

**典型场景**：
```
用户: "给这个项目加一个用户认证模块"
Coding Agent:
1. 分析现有代码结构
2. 设计认证方案
3. 编写代码（路由、中间件、数据库模型）
4. 添加测试
5. 更新文档
```

**局限**：
- 需要人类审查产出代码（Agent 会犯错）
- 对复杂架构决策仍需人类主导
- 长期维护需要人类把关

**深入学习**：[AI 编程 Agent 2026 →](../2-choose-tools/ai-coding-agents-2026.md)

---

### 2. Research Agent（研究 Agent）

**一句话**：帮你搜集信息、分析文献、生成报告的 Agent。

**核心能力**：
- 多源信息检索（网页、论文、数据库）
- 信息提取与摘要
- 交叉验证与事实核查
- 结构化报告生成

**代表工具**：
| 工具 | 特点 | 适合谁 |
|------|------|--------|
| Deep Research（OpenAI） | 多步推理，深度搜索 | 研究者、分析师 |
| Perplexity | 实时搜索+引用 | 快速查证 |
| Gemini Deep Research | Google 生态，多源整合 | Google 用户 |

**典型场景**：
```
用户: "研究 2026 年 MCP 协议的生态现状"
Research Agent:
1. 搜索官方文档和社区讨论
2. 提取关键数据（Server 数量、支持厂商）
3. 交叉验证多个来源
4. 生成结构化研究报告
```

**局限**：
- 信息时效性依赖搜索源（可能滞后）
- 无法访问付费/私有数据库
- 需要人类判断结论的可信度

**深入学习**：[深度研究指南 →](../4-advanced-topics/deep-research-guide.md)

---

### 3. Creative Agent（创意 Agent）

**一句话**：帮你生成内容、优化创意、多模态创作的 Agent。

**核心能力**：
- 文案/文章/故事生成
- 视觉内容创作（图片、视频）
- 风格调整与润色
- 多模态组合（文字+图片+音频）

**代表工具**：
| 工具 | 特点 | 适合谁 |
|------|------|--------|
| ChatGPT | 通用创作，多模态 | 内容创作者 |
| Claude | 长文写作，风格控制 | 作家、编辑 |
| Midjourney/DALL-E | 图像生成 | 设计师 |
| Sora/Runway | 视频生成 | 视频创作者 |

**典型场景**：
```
用户: "写一篇关于 AI Agent 的科普文章，面向非技术读者"
Creative Agent:
1. 确定叙事角度（类比、故事线）
2. 生成初稿
3. 调整语气和风格
4. 添加配图建议
5. 最终润色
```

**局限**：
- 创意质量仍需人类审美把关
- 风格一致性需要反复调整
- 原创性有限（基于已有素材重组）

---

### 4. Analysis Agent（分析 Agent）

**一句话**：帮你处理数据、发现趋势、辅助决策的 Agent。

**核心能力**：
- 数据清洗与预处理
- 统计分析与趋势发现
- 可视化与报告生成
- 风险评估与决策建议

**代表工具**：
| 工具 | 特点 | 适合谁 |
|------|------|--------|
| ChatGPT Code Interpreter | Python 数据分析 | 通用分析师 |
| Claude + MCP | 连接数据库/API | 企业分析师 |
| Julius AI | 专用数据分析 | 非技术分析师 |

**典型场景**：
```
用户: "分析上季度销售数据，找出下滑原因"
Analysis Agent:
1. 获取销售数据（通过 MCP 连接数据库）
2. 清洗和预处理
3. 统计分析（同比、环比、区域对比）
4. 识别异常和趋势
5. 生成分析报告和可视化
```

**局限**：
- 数据质量决定分析质量（垃圾进垃圾出）
- 需要人类验证结论的逻辑合理性
- 对因果推断能力有限（擅长相关，不擅长因果）

---

## 🆚 类型对比速查表

| 维度 | Coding | Research | Creative | Analysis |
|------|---------|----------|----------|----------|
| **输入** | 代码/需求 | 问题/主题 | 创意/风格 | 数据/问题 |
| **输出** | 代码/文档 | 报告/摘要 | 文案/图片 | 分析/图表 |
| **自主性** | 高 | 中高 | 中 | 中 |
| **人类把关** | 必须 | 必须 | 建议 | 必须 |
| **出错代价** | 高（代码 bug） | 中（信息错误） | 低（可修改） | 高（决策失误） |
| **2026 热度** | 🔥🔥🔥🔥🔥 | 🔥🔥🔥🔥 | 🔥🔥🔥 | 🔥🔥🔥 |

## 🔄 类型不是孤立的

实际工作中，Agent 类型经常**组合使用**：

- **Coding + Research**：先研究最佳实践，再写代码实现
- **Research + Analysis**：先搜集数据，再分析趋势
- **Creative + Research**：先调研素材，再创作内容
- **Coding + Analysis**：先分析性能数据，再优化代码

多 Agent 协作正是 2026 年的趋势——[多 Agent 协作设计模式 →](../5-skills/agent/design-patterns/chapters/07-multi-agent-collaboration.md)

## 🎯 如何选择

**三步选型法**：

1. **明确任务类型**：你要干什么？（写代码/查信息/创作/分析）
2. **评估自主性需求**：需要 Agent 自己跑，还是你逐步指导？
3. **考虑出错代价**：错了后果严重吗？严重 → 人类多把关

**简单决策树**：
```
你的任务是什么？
├── 写代码/改代码 → Coding Agent
├── 搜信息/写报告 → Research Agent
├── 写文案/做设计 → Creative Agent
├── 分析数据/做决策 → Analysis Agent
└── 多种混合 → 多 Agent 协作
```

## 🔗 延伸阅读

- [Agent 工作原理 →](./agent-workflow.md) — Agent 内部怎么运转
- [MCP 与工具集成 →](./mcp-and-tools.md) — Agent 怎么连接外部世界
- [Agent 框架选型 →](./agent-frameworks.md) — 用什么框架造 Agent
- [AI 编程 Agent 2026 →](../2-choose-tools/ai-coding-agents-2026.md) — Coding Agent 格局
