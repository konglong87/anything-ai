---
title: "Claude Code创始人15条最新使用技巧（2026年3月）"
difficulty: advanced
roles: [programmer]
type: guide
duration: 30min
tools: [claude-code]
tags: [Claude Code, 使用技巧, Boris Cherny, 移动开发, 自动化, Hooks, Agent]
---

# Claude Code创始人15条最新使用技巧（2026年3月）

> Boris Cherny最新分享的Claude Code进阶技巧，展示CC在重新定义AI编程工具边界

## 概述

2026年3月，Claude Code创始人Boris Cherny再次分享了他的15条最新使用技巧。与1月份的13条相比，这次的内容完全不同，展示了CC在过去两个月的惊人进化速度。

**核心变化**：
- 🚀 移动端支持（iOS/Android）
- 🔄 跨设备无缝切换会话
- ⚙️ 自动化循环执行（/loop, /schedule）
- 🎯 大规模并行处理（/batch）
- 🌐 外部消息桥接（Channels）

**官方推文**：[Boris Cherny原文](https://x.com/bcherny/status/2038454336355999749)

---

## 1. Claude Code有移动端了

### 功能描述

Claude App集成了Code功能，iOS端在2025年10月就支持，Android在2026年初跟进。

**使用方式**：
1. 下载Claude iOS/Android App
2. 左侧切换到Code标签页
3. 即可查看和控制正在运行的会话

**限制**：
- 目前不能凭空启动全新会话
- 主要用于远程控制已在本地运行的会话
- 适合查看进度、批准权限请求、追加指令

**下载链接**：
- iOS: https://apps.apple.com/app/claude-by-anthropic/id6473753684
- Android: Google Play搜索"Claude by Anthropic"

**适用场景**：
- ✅ 通勤时查看AI工作进度
- ✅ 批准远程权限请求
- ✅ 追加简单指令
- ❌ 复杂编码工作（仍在电脑上完成）

---

## 2. 跨设备无缝切换会话

### Remote Control（远程控制）

**功能描述**：在终端生成QR码，手机扫码后即可在claude.ai或App上实时控制会话。

**使用方式**：
```bash
# 方式1：启动时开启
claude --remote-control

# 方式2：会话中开启
/rc
```

**关键点**：
- 会话始终在本地机器运行
- 手机只是远程控制面板
- 2月25日发布，v2.1.58版本

**官方文档**：https://code.claude.com/docs/en/remote-control

### Teleport（传送）

**功能描述**：把Web端的云端会话拉到本地终端继续。

**使用方式**：
```bash
# 启动时传送
claude --teleport

# 会话中传送
/teleport
```

**自动执行**：
- 验证仓库状态
- 切换到远程会话的分支
- 加载完整对话历史

**注意**：这是单向的，只能从Web拉到本地。

**实际场景**：
```bash
# 场景：公司电脑启动CC做重构
# 1. 公司电脑启动会话
claude --remote-control

# 2. 下班路上用手机看进度
# 手机扫码，批准权限请求，追加指令

# 3. 到家后在个人电脑继续
claude --teleport
# 从Web会话接手，继续工作
```

---

## 3. /loop和/schedule：自动化循环

### 功能描述

Boris称这两个功能是CC最强大的功能。

**/loop**：会话内循环执行
```bash
# 每5分钟处理code review
/loop 5m /babysit

# 每小时清理代码库
/loop 1h /tidy

# 每6小时升级依赖
/loop 6h /dep-upgrade
```

**特性**：
- 在当前CLI会话里运行
- 退出会话就消失
- 3天后自动过期
- 单会话最多50个loop

**/schedule**：持久化定时任务
- 在Desktop的Cowork里管理
- 重启后仍然在跑
- 云端执行

**选择原则**：
- 短期监控用/loop（盯一小时部署）
- 长期自动化用/schedule（每天早上跑测试）

**发布时间**：3月7日，v2.1.71版本

### 实战价值

**5分钟一次babysit**：
- 自动回复reviewer评论
- 自动rebase冲突
- 自动跑CI修错
- 这是一个永不下班的AI同事

**每天早上8点跑schedule**：
```bash
/schedule 8:00 "检查所有open的issue，把P0的整理成一个列表发给我"
```

---

## 4. Hooks：Agent生命周期植入

### 功能描述

在Agent做事的关键节点插入确定性逻辑。

**Boris的例子**：
- `SessionStart`：每次启动动态加载上下文
- `PreToolUse`：记录每条bash命令
- `PostToolUse`：自动运行lint/测试

**骚操作**：把权限请求路由到WhatsApp，远程审批。

### 25个生命周期事件

从SessionStart到WorktreeCreate全覆盖，支持：
- 正则匹配工具名
- 全局、项目、本地三个配置层级

**类比**：
- CI/CD是代码提交后的自动化
- Hooks是代码生成时的自动化

**官方文档**：https://code.claude.com/docs/en/hooks

---

## 5. Cowork Dispatch：不在电脑前也能干活

### 功能描述

Claude桌面应用里的功能，在Cowork标签页。

**工作方式**：
```bash
# 你发送任务
"帮我处理Slack和邮件"

# Dispatch自动判断：
# - 编码任务 → 开一个Code会话
# - 调研、文档、表格 → 在Cowork里处理
```

**关键特性**：
- 从手机发任务
- 在电脑上执行
- 完成后推送通知到手机

**发布时间**：3月17日，Research Preview

**支持Computer Use**：
- 点击、滚动、操作桌面应用
- Max用户（$100/月）先用
- Pro用户随后开放

---

## 6. Chrome扩展：前端开发利器

### Boris核心观点

> "使用Claude Code最重要的技巧是：给Claude一种验证输出的方式。"

**类比**：
- 让工程师做网站但不让用浏览器 → 结果不好
- 给Claude一个浏览器 → 它会写代码→看效果→改代码→循环

### Chrome扩展优势

比其他MCP方案更稳定可靠。

**之前的工作流**：
```
CC开发 → 启动本地服务器 → 我去浏览器查看 → 截图发给CC → 复制控制台报错 → 粘贴给CC
（我是CC的"人类脚手架"）
```

**现在的工作流**：
```
CC自己看页面 → 自己截图 → 自己读控制台报错 → 自己迭代修复
（我从"脚手架"变成"验收员"）
```

**官方文档**：https://code.claude.com/docs/en/chrome

**下载**：Chrome/Edge扩展

---

## 7. 桌面端内置浏览器预览

### 功能描述

与Chrome扩展类似，但集成度更高。

**自动执行**：
- 启动你的dev server
- 在内置浏览器里测试
- 自动截图、检查DOM
- 点击元素、填表单
- 发现问题自己修

**CLI vs 桌面端**：
- CLI：需要手动配置
- 桌面端：开箱即用

**官方文档**：https://code.claude.com/docs/en/desktop#preview-your-app

---

## 8. Fork会话

### 问题场景

和Claude聊了半小时，到了分叉路口，想试两个不同方向。

**以前**：复制粘贴开新会话，上下文全丢。

**现在**：两种方式
```bash
# 方式1：会话中
/branch

# 方式2：CLI
claude --resume <session-id> --fork-session
```

**效果**：
- 共享之前的上下文
- 各自往不同方向走
- 互不干扰

**实战场景**：
```bash
# Claude提了两个架构方案
# 我想两个都试试

/branch  # 试方案A
[执行一会儿]

# 开另一个终端
claude --resume <session-id> --fork-session  # 试方案B
```

---

## 9. /btw：边干活边问问题

### 功能描述

在agent工作的同时做旁路查询。

**发布时间**：3月17日，v2.1.77版本

### 工作原理

```
Claude在执行长任务（10分钟）
↓
我突然想问："对了，这个函数的返回类型是什么来着？"
↓
/btw 这个函数返回什么类型？
↓
生成一个临时的「幽灵Agent」回答问题
↓
特点：
- 只读模式，不触发工具、不修改文件
- 能看到当前对话的全部上下文
- 不保存到主对话历史
- 关闭后答案消失
- 复用父会话的Prompt缓存，成本极低
```

**Boris的使用场景**：
```bash
# 让Claude做重构，跑了10分钟
# 突然想问个快速问题

/btw 这个函数返回什么类型？
# 马上得到答案，不污染主上下文，不打断Claude工作
```

---

## 10. Git Worktrees深度支持

### 功能描述

Boris同时跑几十个Claude实例，靠的就是git worktrees。

**什么是Worktree**：
- Git允许同一个仓库创建多个独立工作目录
- 每个目录可以checkout不同分支
- 互不干扰

**使用方式**：
```bash
# 在新worktree中启动会话
claude -w

# 指定名称
claude -w feature-auth

# 加上tmux更香
claude -w feature-auth --tmux
# 自动创建tmux session，iTerm2用户还能用原生面板
```

**发布时间**：2月19日，v2.1.49版本

**为什么重要**：
```bash
# 如果在同一个仓库跑5个Claude做不同任务
# 它们会互相踩文件

# worktree给每个Claude一个独立沙箱
# 写坏了也不影响别人
```

---

## 11. /batch：扇出大规模变更

### 功能描述

**发布时间**：2月28日，v2.1.63版本

### 工作流程

```
1. 你告诉它想做什么（「访谈」阶段）
↓
2. 启动编排Agent进入Plan模式
↓
3. 发射Explore Agent调研影响范围
↓
4. 把工作拆分成5-30个独立执行单元
↓
5. 每个单元在自己的worktree里并行跑
```

**适用场景**：大规模代码迁移

### 实战示例

```bash
# CommonJS → ESM迁移，500个文件

/batch
# 我要把这个大型项目从CommonJS迁移到ESM

# Claude自动：
# 1. 分析哪些文件可以并行改
# 2. 同时开几十个agent各干各的
# 3. 完成后合并

# 这不是"AI辅助编程"
# 这是"AI军团式编程"
```

---

## 12. --bare：SDK启动加速10倍

### 功能描述

跳过所有自动发现，只保留基础工具。

**发布时间**：3月20日，v2.1.81版本

### 默认启动流程

```bash
claude -p
# 会搜索：
# - CLAUDE.md
# - settings
# - MCP服务器
# - hooks
# - skills
# - plugins
# ...
```

### --bare模式

```bash
claude --bare -p "你的查询"
# 跳过：
# - hooks
# - skills
# - plugins
# - MCP
# - 自动记忆
# - CLAUDE.md
# 只保留：
# - Bash
# - 文件读取
# - 文件编辑
```

**启动速度提升**：最高10倍（取决于你装了多少东西）

**注意**：
- bare模式下OAuth和钥匙串读取被跳过
- 需要通过`ANTHROPIC_API_KEY`环境变量或`--settings`认证

**适用场景**：
- 写自动化脚本
- 批量调用
- 每次省几百毫秒，大批量下来很可观

---

## 13. --add-dir：跨仓库协作

### 功能描述

告诉Claude另一个仓库的存在，并给它读写权限。

**使用方式**：
```bash
# 在一个仓库启动Claude
cd my-frontend

# 添加依赖的UI库
claude --add-dir ../ui-library

# 会话中添加
/add-dir ../ui-library
```

**发布时间**：v2.1.45版本起逐步完善（2月17日）

### 最新版本增强

```bash
# --add-dir目录下的内容也会被加载：
# - CLAUDE.md（理解规则和约定）
# - .claude/skills/（使用那个仓库的技能）
```

**实战场景**：
```bash
# 前端项目依赖内部UI库
# 你改了UI库的接口
# Claude能自动去前端项目里更新调用方式
```

---

## 14. --agent：自定义Agent

### 功能描述

Boris说这是"经常被忽视的强大原语"。

**实现方式**：
```bash
# 在.claude/agents/目录下定义agent文件
# 写好系统提示词和工具配置

claude --agent=<你的agent名称>
```

**与skills的区别**：
- skills：指令集
- agent：完整的"角色"
  - 有自己的性格
  - 有自己的工具集
  - 可以配不同的MCP服务器

**官方文档**：https://code.claude.com/docs/en/sub-agents

### 实战示例

```bash
# 创建专门做代码审查的agent
.claude/agents/code-reviewer.md

# 创建专门写文档的agent
.claude/agents/doc-writer.md

# 创建专门做安全扫描的agent
.claude/agents/security-scanner.md
```

---

## 15. /voice：语音输入写代码

### 功能描述

Boris说他大部分编码是说话给Claude，而不是打字。

**使用方式**：
```bash
# CLI里运行
/voice
# 按住空格键说话，松开发送

# 桌面端
# 点击语音按钮

# iOS设备
# 在设置中启用听写
```

**发布时间**：3月5日，v2.1.69版本

**支持语言**：20种

**细节**：
- 可以混合打字和语音
- 先打一半，按住空格说后一半
- 无缝拼接

**官方文档**：https://code.claude.com/docs/en/voice-dictation

### 意义

编程的交互方式正在从"打字"变成"对话"。

```bash
# 以前：准确描述每一个技术细节
# 现在：像和同事聊天一样

"把那个登录页面的按钮颜色改成蓝色，然后加一个loading状态"
```

---

## 额外发现：Channels（频道系统）

### 功能描述

通过Telegram、Discord、iMessage给正在运行的CC会话推送消息。

**关键点**：
- 不是开新会话
- 推到你已经打开的那个会话里

### 使用场景

```bash
# 终端里跑着CC做重构
# 你出门了

# 在Telegram上发消息：
"顺便把那个deprecated的API也处理了"

# 消息直接到达正在跑的会话
# Claude继续干
```

### 设置方式

```bash
# 安装Telegram插件
# 配置bot token

claude --channels plugin:telegram@claude-plugins-official
```

**发布状态**：Research Preview，需要v2.1.80以上版本

**官方文档**：https://code.claude.com/docs/en/channels

---

## 发布时间线（2026年2-3月）

| 功能 | 版本 | 日期 |
|------|------|------|
| --add-dir 多仓库 | v2.1.45 | 2月17日 |
| Git Worktrees | v2.1.49 | 2月19日 |
| Remote Control | v2.1.58 | 2月25日 |
| /batch 扇出执行 | v2.1.63 | 2月28日 |
| /voice 语音输入 | v2.1.69 | 3月5日 |
| /loop + /schedule | v2.1.71 | 3月7日 |
| /btw + /branch | v2.1.77 | 3月17日 |
| Dispatch | — | 3月17日 |
| --bare 加速启动 | v2.1.81 | 3月20日 |

**迭代速度**：平均每3天一个重大功能。

---

## 核心趋势分析

### 1. 编程不再绑定桌面

**变化**：
- 手机写代码、远程控制、Dispatch从任何地方发任务
- Boris自己就在沙发上用手机让Claude提PR

**意义**：
- 程序员不再是24小时坐在电脑前
- 但也意味着"下班时间"更模糊了

### 2. Agent正在变得更有自主性

**/loop和/schedule的本质**：
- 让AI持续运转，不需要你在场
- 5分钟babysit一次、6小时升级一次依赖
- 这是一个永不下班的AI同事

### 3. 并行是新的生产力倍增器

**Worktrees + /batch**：
- 可以同时让上千个Claude干活
- 一个人的产出可以相当于一个工程团队

### 4. OpenClaw的探索性创新正在被吸收

**概念映射**：
- 移动端
- 消息桥接
- 自动化巡逻
- Agent自主运转

这些概念OpenClaw先走了一步，CC在用更强的工程能力把它们做成稳定可用的产品功能。

---

## Boris的使用哲学

### 核心建议（第6条最重要）

> "使用Claude Code最重要的技巧是：给Claude一种验证输出的方式。"

**类比**：
- 让工程师做网站但不让用浏览器 → 结果不好
- 给Claude一个浏览器 → 它会迭代优化

### 实际工作流

Boris每天用Claude Code十几个小时：
- 写代码
- 写文章
- 做数据分析

**不完美**：
- 有时候还是会犯蠢
- 但CC团队确实在认真听用户反馈
- 迭代速度比任何人想象的都快

---

## 下一步

Boris在最后说："我本来想继续写下去但不得不打住了，之后会分享更多。"

**等待中...**

---

## 参考链接

- [Boris的原文推文](https://x.com/bcherny/status/2038454336355999749)
- [Chrome扩展](https://code.claude.com/docs/en/chrome)
- [桌面端预览](https://code.claude.com/docs/en/desktop#preview-your-app)
- [CLI完整参考](https://code.claude.com/docs/en/cli-reference)
- [自定义Agent](https://code.claude.com/docs/en/sub-agents)
- [Channels频道](https://code.claude.com/docs/en/channels)
- [Remote Control](https://code.claude.com/docs/en/remote-control)
- [Voice Dictation](https://code.claude.com/docs/en/voice-dictation)
- [Hooks](https://code.claude.com/docs/en/hooks)

---

**来源**：花叔微信公众号文章（2026年3月30日）
**原作者**：花叔
**原标题**：《Claude Code创始人分享了他最新的15条CC使用技巧！》
