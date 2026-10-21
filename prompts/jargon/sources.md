---
title: "Jargon 来源、覆盖与许可证"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 来源与覆盖清单

## 锁定版本

- 来源仓库：[feeling-to-jargon](https://github.com/konglong87/feeling-to-jargon)
- 提交：[4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d](https://github.com/konglong87/feeling-to-jargon/commit/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d)
- 上游提交时间：2026-10-21T10:02:37+08:00
- 导入时间：2026-10-21T02:15:58.967Z
- 许可：MIT，保留版权与许可原文。

导入从 Git 提交对象提取，不读取源仓库未提交文件。构建不访问上游网络，不会随上游 main 自动漂移。

## 覆盖核对

| 类型 | 数量 | 处理方式 |
|---|---:|---|
| 根领域 | 19 | 全部生成领域页 |
| 叶子包 | 105 | 全量读取 |
| 叶子内条目 | 120 | 各自生成阅读与复制页 |
| 独立模板文件 | 9 | 展开依赖，互斥方向单选 |
| 可浏览场景页 | 129 | 条目与模板合计，不冒充全是现成提示词 |
| 旧版领域包 | 19 | 保留完整原文，避免重复计数 |
| 其中草稿包 | 15 | 仅参考，不进入执行库 |
| 原仓库文件 | 215 | 逐文件 SHA256 校验并完整保留 |

[机器可读覆盖清单](/jargon/coverage.json) · [完整源码快照](/jargon/source.json) · [模板合集](/jargon/all-prompts.txt)

## 已知内容边界

- 19 个领域并不等于 19 个成熟提示词包；正式叶子目前集中在 UI/UX、软件架构、AIGC、职场沟通四类。
- Dashboard 第 5 例的执行逻辑待确认，第 6 例原文缺失。网站保留这些缺口，不补造案例。
- 工具专属、平台研究、待核验资料保留警示；平台研究和待确认内容不能加入执行组合。
- 复制内容属于规则化整理版，原始 JSON 和 Skill 原文独立展示。

## Skill 原文

Skill 中的脚本和文件路径用于安装后的运行环境，不能当成聊天窗口已有的附件。本站场景提示词已展开必要依赖。

::: details 查看锁定 Skill 原文

````text
---
name: feeling-to-jargon
description: 将用户的感觉和模糊表达翻译成专业术语，并按需补全为更具体、可执行的提示词。
---

# Feeling to Jargon

Feeling to Jargon 帮助用户把模糊感受翻译成专业术语，再按需补全成可执行的提示词。

## 渐进式加载协议

索引必须按以下顺序逐级收窄：

```text
根领域 → 专业子域 → 用户意图 → 叶子包 → 单条术语/技巧/模板
```

1. 读取 `index/root.json`，只判断候选根领域和加载上限。
2. 读取对应的 `index/domains/<domain_id>.json`，最多选择 `max_subdomains` 个子域。
3. 读取子域的 `index/intents/<domain_id>/<subdomain_id>.json`，最多选择 `max_intents` 个意图。
4. 读取 `index/runtime.json` 做关键词/语义路由，只加载命中的叶子路径；低于 `min_route_score` 的弱匹配直接丢弃，高置信度匹配使用更窄的分数差裁剪。
5. 每个叶子最多取 `max_entries_per_leaf` 条，优先取与用户表达最接近的条目。复杂交互优先读取同一叶子中的 `state_machine`、阈值、取消路径和 `acceptance`，不要只拿一段视觉描述。
6. 用语义匹配识别术语、同义词、相关维度和缺失参数。
7. 把匹配结果翻译成用户能看懂的解释，输出 3～6 个可执行方向。
8. 只询问会改变方案的问题；用户确认后再生成最终增强提示词。

运行时查询示例：

```bash
python3 scripts/query-index.py "删除列表项，5 秒内撤销并支持键盘"
```

不要直接读取 `terms/` 全目录，也不要把所有叶子包一次性塞进上下文。没有命中时，先说明覆盖不足；只有用户允许时才进行网络搜索。

## 知识类型

叶子包用 `knowledge_type` 区分：

- `term`：专业术语和白话解释
- `pattern`：可复用的设计/架构模式
- `technique`：实现技巧和参数锚点
- `guideline`：可访问性、质量和边界规范
- `parameter`：设计或运行参数
- `template`：可直接投喂给 AI 的提示词模板
- `platform-research`：平台专属研究，必须标注范围和核验状态

没有匹配到术语包时，说明覆盖不足；只有在用户允许时才进行网络搜索。搜索结果是本次临时参考，不写回术语列表。

## Dashboard 三层规范（合并分类）

Dashboard 布局变体优先放进已有 `terms/dashboard/layout-patterns.json` 的条目，不为每个配色、场景或布局再建索引叶子。命中后只取当前条目，再按 `contract_ref` 读取 `templates/dashboard/dashboard-style-system.json` 的共享协议；视觉方向复用已有相关叶子，仅在需要时加载，不展开全部变体。

按 `layout / termSkill / uiSkill / agentExec / state / tokens` 输出：术语定义信息结构，UI 定义视觉与栅格，Agent 定义交互状态机。分清共享状态与独立状态，写清每个事件改变什么、不改变什么，以及派生视图和验收断言。示例配色、比例和像素值不是全局默认值。

先检查条目 `evidence` 与模板 `source_gaps`。暖色三栏的执行逻辑仍待确认，可以使用已知布局，但不能把候选房间联动或模式/单位映射当作事实；第六例没有原文，不补造、不建空索引。不要求用户重复确认前四例。

## AIGC IP 模板

当请求涉及同一角色的多种材质、动作、表情或周边时，先读取 `templates/aigc/base-ip.json`，再按场景读取一个 `templates/aigc/*.json`。合并基础 IP、一致性约束、场景模块和目标工具参数；不要把七个场景全部加载到同一次请求中。中文文字建议预留排版区域，由后期工具叠加。

`terms/character-ip/character-ip.json` 只负责角色一致性和场景路由；镜头、构图、运动、负面约束和工具适配分别从对应子域加载。

## 交互、视觉效果与工具适配

连续交互和高级手势一次只加载一个模式。先读状态机、动画序列、触发阈值、空间锚点和取消/回退路径，再读可测参数、可访问性和验收标准；不要把整组交互一次性塞入上下文。遇到“细腻”“顺滑”“有质感”等感觉时，优先输出可观察的时间、速度、位移、旋转、缩放、吸附和先后关系。默认要求动画可中断、键盘和触摸结果一致，并遵守 `prefers-reduced-motion`。

视觉效果必须和性能一起加载。液态玻璃、景深、圆柱卷收、取色光晕和液态粘连都要同时读取 `performance_budget`、`fallback`、`mobile_degradation` 和 `reduced_motion` 字段；如果设备能力不足，先降级表现再保证主任务可用。

GSAP 适配只在用户明确指定 GSAP，或项目已经依赖 GSAP 时加载。优先使用工具对应叶子的生命周期、SSR 边界、`ctx.revert()`/销毁规则和 transform 性能约束；未指定 GSAP 时不要主动引入它。

设计系统预览优先加载 `living-style-guide-preview`，用 Light/Dark、token、组件状态和视觉验收清单指导实现。外部预览站、厂商文档和示例仓库必须保留 `verification_required`，未核验时只能作为参考线索。

## 平台研究边界

`platform-research` 叶子包只记录指定供应商或项目的研究信息。若 `verified_at` 为空，必须把内容说成待核验信息，不得推广为所有 GPU UI 框架或所有平台的通用事实。
````

:::

## 许可证原文

````text
MIT License

Copyright (c) 2026 konglong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````
