---
title: "3D 卡片翻面"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 3D 卡片翻面

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

正反面围绕同一中心翻转，保持透视和背面隐藏。

**适用场景：** 需要高级反馈但仍要保持可理解的操作结果

<JargonPrompt id="card-flip--card-flip" />

## 如何把白话说具体

本条目将「需要高级反馈但仍要保持可理解的操作结果」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 3D 卡片翻面、follow、threshold、snap、interruption、card flip、card-flip、顺滑、流畅、丝滑

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 3D 卡片翻面

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
3D 卡片翻面

【白话解释】
正反面围绕同一中心翻转，保持透视和背面隐藏。

【适用场景】
需要高级反馈但仍要保持可理解的操作结果

【专业参数与锚点】
- perspective 800–1200
- backface-visibility hidden
- iOS 加 webkit 前缀

【边界与约束】


【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/card-flip.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/card-flip.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/card-flip.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "card-flip",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "interaction-motion",
  "title": "3D 卡片翻面",
  "knowledge_type": "pattern",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-interaction",
    "implement-animation"
  ],
  "entries": [
    {
      "id": "card-flip",
      "name": "3D 卡片翻面",
      "plain_language": "正反面围绕同一中心翻转，保持透视和背面隐藏。",
      "when_to_use": "需要高级反馈但仍要保持可理解的操作结果",
      "parameters": [
        "perspective 800–1200",
        "backface-visibility hidden",
        "iOS 加 webkit 前缀"
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
