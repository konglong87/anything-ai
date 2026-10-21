---
title: "执行项"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 执行项

[专业提示词库](../README.md) / [职场沟通与组织协作](/prompts/jargon/domains/workplace-communication.html) / 术语

每个执行项写清负责人、下一步、截止时间和完成证据。

**适用场景：** 用户说出职场模糊表达或需要改写协作要求时

<JargonPrompt id="action-item--action-item" />

## 如何把白话说具体

本条目将「用户说出职场模糊表达或需要改写协作要求时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 执行项、information-hierarchy、goal-metric、action-item

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 执行项

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
执行项

【白话解释】
每个执行项写清负责人、下一步、截止时间和完成证据。

【适用场景】
用户说出职场模糊表达或需要改写协作要求时

【专业参数与锚点】
- owner
- next step
- due date
- evidence

【边界与约束】
- 不替用户猜测未提供的事实

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/workplace/action-item.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/workplace/action-item.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/workplace/action-item.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "action-item",
  "domain_id": "workplace-communication",
  "subdomain_id": "execution-language",
  "title": "执行项",
  "knowledge_type": "term",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "write-action",
    "review-status"
  ],
  "entries": [
    {
      "id": "action-item",
      "name": "执行项",
      "plain_language": "每个执行项写清负责人、下一步、截止时间和完成证据。",
      "when_to_use": "用户说出职场模糊表达或需要改写协作要求时",
      "parameters": [
        "owner",
        "next step",
        "due date",
        "evidence"
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
