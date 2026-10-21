---
title: "归位确认高亮"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 归位确认高亮

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

元素回到原位后增加短暂高亮或脉冲，确认它确实回来了。

**适用场景：** 撤销后的状态需要被快速识别

<JargonPrompt id="reverse-animation--reentry-highlight" />

## 如何把白话说具体

本条目将「撤销后的状态需要被快速识别」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 撤销反向动画、reverse-path

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 归位确认高亮

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
归位确认高亮

【白话解释】
元素回到原位后增加短暂高亮或脉冲，确认它确实回来了。

【适用场景】
撤销后的状态需要被快速识别

【专业参数与锚点】
- 高亮 500–700ms
- 不改变布局

【边界与约束】
- 不要用强烈闪烁造成干扰

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/reverse-animation.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/reverse-animation.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/reverse-animation.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "reverse-animation",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "interaction-motion",
  "title": "撤销反向动画",
  "knowledge_type": "technique",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "implement-animation",
    "audit-motion"
  ],
  "entries": [
    {
      "id": "reentry-highlight",
      "name": "归位确认高亮",
      "plain_language": "元素回到原位后增加短暂高亮或脉冲，确认它确实回来了。",
      "when_to_use": "撤销后的状态需要被快速识别",
      "parameters": [
        "高亮 500–700ms",
        "不改变布局"
      ],
      "related": [
        "reverse-path"
      ],
      "constraints": [
        "不要用强烈闪烁造成干扰"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
