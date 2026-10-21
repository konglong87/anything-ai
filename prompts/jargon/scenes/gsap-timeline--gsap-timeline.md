---
title: "GSAP Timeline"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# GSAP Timeline

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

用时间线、label 和 position parameter 编排连续动效，保持顺序可读且可复用。

**适用场景：** 用户明确指定 GSAP，或项目已经采用 GSAP 作为动效实现层

::: warning 适用边界
- 工具专属：GSAP；不能推广为所有工具的通用行为。
- 含待核验的外部信息；使用前核验当前官方文档，不视为已验证事实。
:::

<JargonPrompt id="gsap-timeline--gsap-timeline" />

## 如何把白话说具体

本条目将「用户明确指定 GSAP，或项目已经采用 GSAP 作为动效实现层」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** GSAP、gsap timeline、GSAP Timeline、continuous-interaction、performance-budget、interruption

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# GSAP Timeline

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【适用边界】
- 工具专属：GSAP；不能推广为所有工具的通用行为。
- 含待核验的外部信息；使用前核验当前官方文档，不视为已验证事实。

【名称】
GSAP Timeline

【白话解释】
用时间线、label 和 position parameter 编排连续动效，保持顺序可读且可复用。

【适用场景】
用户明确指定 GSAP，或项目已经采用 GSAP 作为动效实现层

【专业参数与锚点】
- timeline
- label
- position parameter
- nested timeline
- play/pause/reverse

【边界与约束】
- 时间线必须有明确生命周期
- 组件卸载时杀掉 timeline

【适用工具】
GSAP

【工具专属】
是

【需要核验】
是

【核验说明】
- 复杂时间线应拆为可测试片段

【验收标准】
- 动画创建和销毁可追踪
- 快速交互不产生重复回调
- 未指定 GSAP 时不强制引入

【scope】
provider-specific

【适用工具】
GSAP

【不得泛化】
是

【已核验日期】
未提供 / 待核验

【需要核验】
是

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/animation-tool-adapter/gsap-timeline.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/animation-tool-adapter/gsap-timeline.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/animation-tool-adapter/gsap-timeline.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "gsap-timeline",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "animation-tool-adapter",
  "title": "GSAP Timeline",
  "knowledge_type": "technique",
  "scope": "provider-specific",
  "status": "published",
  "intent_ids": [
    "implement-gsap",
    "audit-gsap"
  ],
  "do_not_generalize": true,
  "provider": "GSAP",
  "verified_at": null,
  "verification_required": true,
  "entries": [
    {
      "id": "gsap-timeline",
      "name": "GSAP Timeline",
      "plain_language": "用时间线、label 和 position parameter 编排连续动效，保持顺序可读且可复用。",
      "when_to_use": "用户明确指定 GSAP，或项目已经采用 GSAP 作为动效实现层",
      "parameters": [
        "timeline",
        "label",
        "position parameter",
        "nested timeline",
        "play/pause/reverse"
      ],
      "related": [
        "continuous-interaction",
        "performance-budget",
        "interruption"
      ],
      "constraints": [
        "时间线必须有明确生命周期",
        "组件卸载时杀掉 timeline"
      ],
      "aliases": [
        "GSAP",
        "gsap timeline"
      ],
      "provider": "GSAP",
      "provider_specific": true,
      "verification_required": true,
      "verification_note": [
        "复杂时间线应拆为可测试片段"
      ],
      "acceptance": [
        "动画创建和销毁可追踪",
        "快速交互不产生重复回调",
        "未指定 GSAP 时不强制引入"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
