---
title: "图卡内容型"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 图卡内容型

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

让真实图片成为主角，文字叠加且只保留一个强调色。

**适用场景：** Dashboard 需要有明确审美方向且避免模板化

<JargonPrompt id="image-led-content--image-led-content" />

## 如何把白话说具体

本条目将「Dashboard 需要有明确审美方向且避免模板化」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 图卡内容型、design-tokens、layout-patterns

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 图卡内容型

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
图卡内容型

【白话解释】
让真实图片成为主角，文字叠加且只保留一个强调色。

【适用场景】
Dashboard 需要有明确审美方向且避免模板化

【专业参数与锚点】
- 大图卡片
- 文字叠加
- 单一 CTA 色

【边界与约束】
- 不要所有卡片一样大
- 不要默认蓝紫渐变
- 不要模板化侧边栏+四张 KPI 卡

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/dashboard/image-led-content.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/dashboard/image-led-content.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/dashboard/image-led-content.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "image-led-content",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "dashboard-design",
  "title": "图卡内容型",
  "knowledge_type": "pattern",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-dashboard",
    "audit-dashboard"
  ],
  "entries": [
    {
      "id": "image-led-content",
      "name": "图卡内容型",
      "plain_language": "让真实图片成为主角，文字叠加且只保留一个强调色。",
      "when_to_use": "Dashboard 需要有明确审美方向且避免模板化",
      "parameters": [
        "大图卡片",
        "文字叠加",
        "单一 CTA 色"
      ],
      "related": [
        "design-tokens",
        "layout-patterns"
      ],
      "constraints": [
        "不要所有卡片一样大",
        "不要默认蓝紫渐变",
        "不要模板化侧边栏+四张 KPI 卡"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
