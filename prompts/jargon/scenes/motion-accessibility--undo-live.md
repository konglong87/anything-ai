---
title: "轻量状态播报"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 轻量状态播报

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 规范

用 aria-live=polite 提示已删除、可撤销等关键状态。

**适用场景：** 操作结果需要被读屏用户感知

<JargonPrompt id="motion-accessibility--undo-live" />

## 如何把白话说具体

本条目将「操作结果需要被读屏用户感知」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 动效可访问性、undo-aria、aria、读屏

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 轻量状态播报

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
轻量状态播报

【白话解释】
用 aria-live=polite 提示已删除、可撤销等关键状态。

【适用场景】
操作结果需要被读屏用户感知

【专业参数与锚点】
- 只播报状态变化
- 焦点不被撤销条抢走

【边界与约束】
- 不重复播报相同状态

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/accessibility.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/accessibility.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/accessibility.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "motion-accessibility",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "accessibility",
  "title": "动效可访问性",
  "knowledge_type": "guideline",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "audit-accessibility",
    "implement-accessibility"
  ],
  "entries": [
    {
      "id": "undo-live",
      "name": "轻量状态播报",
      "plain_language": "用 aria-live=polite 提示已删除、可撤销等关键状态。",
      "when_to_use": "操作结果需要被读屏用户感知",
      "parameters": [
        "只播报状态变化",
        "焦点不被撤销条抢走"
      ],
      "related": [
        "undo-aria"
      ],
      "constraints": [
        "不重复播报相同状态"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
