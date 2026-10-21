---
title: "Spring 按压回弹"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# Spring 按压回弹

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

按下缩到 0.96–0.98，松手用弹簧回到 1 并允许 1.02–1.04 的轻微过冲。

**适用场景：** 需要高级反馈但仍要保持可理解的操作结果

<JargonPrompt id="spring-press--spring-press" />

## 如何把白话说具体

本条目将「需要高级反馈但仍要保持可理解的操作结果」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** Spring 按压回弹、follow、threshold、snap、interruption

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# Spring 按压回弹

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
Spring 按压回弹

【白话解释】
按下缩到 0.96–0.98，松手用弹簧回到 1 并允许 1.02–1.04 的轻微过冲。

【适用场景】
需要高级反馈但仍要保持可理解的操作结果

【专业参数与锚点】
- scale 0.96–0.98
- overshoot 2%–4%
- 可叠加内阴影或明度变化

【边界与约束】


【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/spring-press.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/spring-press.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/spring-press.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "spring-press",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "interaction-motion",
  "title": "Spring 按压回弹",
  "knowledge_type": "pattern",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-interaction",
    "implement-animation"
  ],
  "entries": [
    {
      "id": "spring-press",
      "name": "Spring 按压回弹",
      "plain_language": "按下缩到 0.96–0.98，松手用弹簧回到 1 并允许 1.02–1.04 的轻微过冲。",
      "when_to_use": "需要高级反馈但仍要保持可理解的操作结果",
      "parameters": [
        "scale 0.96–0.98",
        "overshoot 2%–4%",
        "可叠加内阴影或明度变化"
      ],
      "related": [
        "follow",
        "threshold",
        "snap",
        "interruption"
      ],
      "constraints": [],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
