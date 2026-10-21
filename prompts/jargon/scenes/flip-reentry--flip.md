---
title: "First Last Invert Play"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# First Last Invert Play

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

记录删除前后布局，撤销时把真实节点插回原索引，再播放反向变换。

**适用场景：** 列表重排、共享元素和复杂布局撤销

<JargonPrompt id="flip-reentry--flip" />

## 如何把白话说具体

本条目将「列表重排、共享元素和复杂布局撤销」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** FLIP 反向归位、reverse-path、shared-element-transition

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# First Last Invert Play

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
First Last Invert Play

【白话解释】
记录删除前后布局，撤销时把真实节点插回原索引，再播放反向变换。

【适用场景】
列表重排、共享元素和复杂布局撤销

【专业参数与锚点】
- First 记录原位置尺寸
- Last 记录重排后位置
- Invert 计算差值
- Play 播放反向变换

【边界与约束】
- 节点已移除时保留 ghost/clone 或占位符

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/flip-reentry.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/flip-reentry.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/flip-reentry.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "flip-reentry",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "interaction-motion",
  "title": "FLIP 反向归位",
  "knowledge_type": "technique",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "implement-animation"
  ],
  "entries": [
    {
      "id": "flip",
      "name": "First Last Invert Play",
      "plain_language": "记录删除前后布局，撤销时把真实节点插回原索引，再播放反向变换。",
      "when_to_use": "列表重排、共享元素和复杂布局撤销",
      "parameters": [
        "First 记录原位置尺寸",
        "Last 记录重排后位置",
        "Invert 计算差值",
        "Play 播放反向变换"
      ],
      "related": [
        "reverse-path",
        "shared-element-transition"
      ],
      "constraints": [
        "节点已移除时保留 ghost/clone 或占位符"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
