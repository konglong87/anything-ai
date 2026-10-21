---
title: "阻尼弹性抽屉"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 阻尼弹性抽屉

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 场景模板

Bottom Sheet 根据位移和速度在 closed/peek/half/full 锚点间吸附，越界呈 rubber band 回弹。

**适用场景：** 需要给 AI 编程或设计工具描述可复用组件

<JargonPrompt id="damped-bottom-sheet--damped-bottom-sheet" />

## 如何把白话说具体

本条目将「需要给 AI 编程或设计工具描述可复用组件」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 阻尼弹性抽屉、follow、interruption

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 阻尼弹性抽屉

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
阻尼弹性抽屉

【白话解释】
Bottom Sheet 根据位移和速度在 closed/peek/half/full 锚点间吸附，越界呈 rubber band 回弹。

【适用场景】
需要给 AI 编程或设计工具描述可复用组件

【专业参数与锚点】
- rubber band
- velocity projection
- snap points
- spring snap

【边界与约束】


【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/component-design/damped-bottom-sheet.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/component-design/damped-bottom-sheet.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/component-design/damped-bottom-sheet.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "damped-bottom-sheet",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "component-design",
  "title": "阻尼弹性抽屉",
  "knowledge_type": "template",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "generate-component",
    "spec-component"
  ],
  "entries": [
    {
      "id": "damped-bottom-sheet",
      "name": "阻尼弹性抽屉",
      "plain_language": "Bottom Sheet 根据位移和速度在 closed/peek/half/full 锚点间吸附，越界呈 rubber band 回弹。",
      "when_to_use": "需要给 AI 编程或设计工具描述可复用组件",
      "parameters": [
        "rubber band",
        "velocity projection",
        "snap points",
        "spring snap"
      ],
      "related": [
        "follow",
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
