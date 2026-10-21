---
title: "底色/强调色/层级/材质/主角五变量"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 底色/强调色/层级/材质/主角五变量

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 参数

Dashboard 的审美方向主要由底色、强调色、布局层级、材质和内容主角决定。

**适用场景：** 需要让 AI 生成非模板化后台或设计系统

<JargonPrompt id="token-system--token-system" />

## 如何把白话说具体

本条目将「需要让 AI 生成非模板化后台或设计系统」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 设计令牌系统、dashboard-style-system、composition-patterns

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 底色/强调色/层级/材质/主角五变量

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
底色/强调色/层级/材质/主角五变量

【白话解释】
Dashboard 的审美方向主要由底色、强调色、布局层级、材质和内容主角决定。

【适用场景】
需要让 AI 生成非模板化后台或设计系统

【专业参数与锚点】
- 背景色
- 主强调色
- 文字层级
- 圆角/阴影
- 卡片材质
- 内容主角

【边界与约束】
- 先定 token 再定组件，不要每张卡单独发明规则

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/design-tokens/token-system.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/design-tokens/token-system.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/design-tokens/token-system.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "token-system",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "design-tokens",
  "title": "设计令牌系统",
  "knowledge_type": "parameter",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "define-tokens",
    "audit-tokens"
  ],
  "entries": [
    {
      "id": "token-system",
      "name": "底色/强调色/层级/材质/主角五变量",
      "plain_language": "Dashboard 的审美方向主要由底色、强调色、布局层级、材质和内容主角决定。",
      "when_to_use": "需要让 AI 生成非模板化后台或设计系统",
      "parameters": [
        "背景色",
        "主强调色",
        "文字层级",
        "圆角/阴影",
        "卡片材质",
        "内容主角"
      ],
      "related": [
        "dashboard-style-system",
        "composition-patterns"
      ],
      "constraints": [
        "先定 token 再定组件，不要每张卡单独发明规则"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
