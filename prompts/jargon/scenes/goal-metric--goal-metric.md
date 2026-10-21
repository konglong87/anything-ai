---
title: "目标与指标"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 目标与指标

[专业提示词库](../README.md) / [职场沟通与组织协作](/prompts/jargon/domains/workplace-communication.html) / 术语

把方向性目标拆成可观察结果、指标口径、范围和优先级。

**适用场景：** 用户说出职场模糊表达或需要改写协作要求时

<JargonPrompt id="goal-metric--goal-metric" />

## 如何把白话说具体

本条目将「用户说出职场模糊表达或需要改写协作要求时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 目标与指标、information-hierarchy、goal-metric

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 目标与指标

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
目标与指标

【白话解释】
把方向性目标拆成可观察结果、指标口径、范围和优先级。

【适用场景】
用户说出职场模糊表达或需要改写协作要求时

【专业参数与锚点】
- 目标
- 指标
- 口径
- 范围
- 优先级

【边界与约束】
- 不替用户猜测未提供的事实

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/workplace/goal-metric.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/workplace/goal-metric.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/workplace/goal-metric.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "goal-metric",
  "domain_id": "workplace-communication",
  "subdomain_id": "goal-alignment",
  "title": "目标与指标",
  "knowledge_type": "term",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "define-goal",
    "review-priority"
  ],
  "entries": [
    {
      "id": "goal-metric",
      "name": "目标与指标",
      "plain_language": "把方向性目标拆成可观察结果、指标口径、范围和优先级。",
      "when_to_use": "用户说出职场模糊表达或需要改写协作要求时",
      "parameters": [
        "目标",
        "指标",
        "口径",
        "范围",
        "优先级"
      ],
      "related": [
        "information-hierarchy",
        "goal-metric"
      ],
      "constraints": [
        "不替用户猜测未提供的事实"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
