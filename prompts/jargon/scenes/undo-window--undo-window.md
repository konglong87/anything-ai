---
title: "可逆操作时间窗口"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 可逆操作时间窗口

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

删除后保留一段明确的可撤销时间，让用户有机会反悔。

**适用场景：** 删除、归档、批量移除等可逆操作

<JargonPrompt id="undo-window--undo-window" />

## 如何把白话说具体

本条目将「删除、归档、批量移除等可逆操作」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 撤销时间窗口、progress-feedback、reverse-animation

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 可逆操作时间窗口

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
可逆操作时间窗口

【白话解释】
删除后保留一段明确的可撤销时间，让用户有机会反悔。

【适用场景】
删除、归档、批量移除等可逆操作

【专业参数与锚点】
- 窗口默认 5s；高风险操作 8–10s
- 过期后按钮禁用并完成最终删除

【边界与约束】
- 不要让过期后仍看起来可点击

【scope】
general

【加载说明】
撤销功能只需加载本叶子和反向动画，不加载全部动效

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/undo-window.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/undo-window.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/undo-window.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "undo-window",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "interaction-motion",
  "title": "撤销时间窗口",
  "knowledge_type": "technique",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-interaction",
    "audit-motion"
  ],
  "loading_note": "撤销功能只需加载本叶子和反向动画，不加载全部动效",
  "entries": [
    {
      "id": "undo-window",
      "name": "可逆操作时间窗口",
      "plain_language": "删除后保留一段明确的可撤销时间，让用户有机会反悔。",
      "when_to_use": "删除、归档、批量移除等可逆操作",
      "parameters": [
        "窗口默认 5s；高风险操作 8–10s",
        "过期后按钮禁用并完成最终删除"
      ],
      "related": [
        "progress-feedback",
        "reverse-animation"
      ],
      "constraints": [
        "不要让过期后仍看起来可点击"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
