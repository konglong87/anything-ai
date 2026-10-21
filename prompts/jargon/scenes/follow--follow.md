---
title: "跟随"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 跟随

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 原则

元素连续继承输入位置或速度，不瞬间跳到新状态。

**适用场景：** 拖拽、滚动、转场和惯性动作

<JargonPrompt id="follow--follow" />

## 如何把白话说具体

本条目将「拖拽、滚动、转场和惯性动作」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 跟随、threshold、velocity-inheritance、跟手、速度跟随、follow、顺滑、流畅、丝滑

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 跟随

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
跟随

【白话解释】
元素连续继承输入位置或速度，不瞬间跳到新状态。

【适用场景】
拖拽、滚动、转场和惯性动作

【专业参数与锚点】
- 位置或速度 1:1 跟随
- 必要时使用 lerp 或 spring 收敛

【边界与约束】
- 高频输入不能依赖昂贵布局重排

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/follow.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/follow.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/follow.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "follow",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "gesture-interaction",
  "title": "跟随",
  "knowledge_type": "principle",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-gesture",
    "implement-gesture",
    "audit-gesture"
  ],
  "entries": [
    {
      "id": "follow",
      "name": "跟随",
      "plain_language": "元素连续继承输入位置或速度，不瞬间跳到新状态。",
      "when_to_use": "拖拽、滚动、转场和惯性动作",
      "parameters": [
        "位置或速度 1:1 跟随",
        "必要时使用 lerp 或 spring 收敛"
      ],
      "related": [
        "threshold",
        "velocity-inheritance"
      ],
      "constraints": [
        "高频输入不能依赖昂贵布局重排"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
