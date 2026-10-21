---
title: "Squash 弹性开关"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# Squash 弹性开关

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

开关起步横向拉伸、纵向压缩，再回到正常比例。

**适用场景：** 需要高级反馈但仍要保持可理解的操作结果

<JargonPrompt id="squash-toggle--squash-toggle" />

## 如何把白话说具体

本条目将「需要高级反馈但仍要保持可理解的操作结果」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** Squash 弹性开关、follow、threshold、snap、interruption、squash toggle、squash-toggle、顺滑、流畅、丝滑

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# Squash 弹性开关

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
Squash 弹性开关

【白话解释】
开关起步横向拉伸、纵向压缩，再回到正常比例。

【适用场景】
需要高级反馈但仍要保持可理解的操作结果

【专业参数与锚点】
- scaleX 1.08
- scaleY 0.94
- 180–240ms
- transform-origin 与方向一致

【边界与约束】


【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/squash-toggle.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/squash-toggle.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/squash-toggle.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "squash-toggle",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "interaction-motion",
  "title": "Squash 弹性开关",
  "knowledge_type": "pattern",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-interaction",
    "implement-animation"
  ],
  "entries": [
    {
      "id": "squash-toggle",
      "name": "Squash 弹性开关",
      "plain_language": "开关起步横向拉伸、纵向压缩，再回到正常比例。",
      "when_to_use": "需要高级反馈但仍要保持可理解的操作结果",
      "parameters": [
        "scaleX 1.08",
        "scaleY 0.94",
        "180–240ms",
        "transform-origin 与方向一致"
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
