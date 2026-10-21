---
title: "占位与真实节点回插"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 占位与真实节点回插

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

节点暂时移除后保留占位，撤销时按原索引插回真实节点。

**适用场景：** DOM 节点生命周期较短的列表

<JargonPrompt id="flip-reentry--placeholder" />

## 如何把白话说具体

本条目将「DOM 节点生命周期较短的列表」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** FLIP 反向归位、flip

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 占位与真实节点回插

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
占位与真实节点回插

【白话解释】
节点暂时移除后保留占位，撤销时按原索引插回真实节点。

【适用场景】
DOM 节点生命周期较短的列表

【专业参数与锚点】
- 恢复原索引
- 其他项让位动画

【边界与约束】
- 不能把 ghost 当作最终业务节点

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
      "id": "placeholder",
      "name": "占位与真实节点回插",
      "plain_language": "节点暂时移除后保留占位，撤销时按原索引插回真实节点。",
      "when_to_use": "DOM 节点生命周期较短的列表",
      "parameters": [
        "恢复原索引",
        "其他项让位动画"
      ],
      "related": [
        "flip"
      ],
      "constraints": [
        "不能把 ghost 当作最终业务节点"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
