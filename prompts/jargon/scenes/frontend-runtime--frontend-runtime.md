---
title: "前端平台边界"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 前端平台边界

[专业提示词库](../README.md) / [软件工程与架构](/prompts/jargon/domains/software-engineering-architecture.html) / 术语

把组件、构建、运行时、发布和回滚能力作为平台契约。

**适用场景：** 后端或平台方案需要拆解质量属性时

<JargonPrompt id="frontend-runtime--frontend-runtime" />

## 如何把白话说具体

本条目将「后端或平台方案需要拆解质量属性时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 前端平台边界、high-availability、capacity-model、scaling-strategies、observability-contract、idempotency-contract

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 前端平台边界

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
前端平台边界

【白话解释】
把组件、构建、运行时、发布和回滚能力作为平台契约。

【适用场景】
后端或平台方案需要拆解质量属性时

【专业参数与锚点】
- component API
- build
- runtime
- release
- rollback

【边界与约束】
- 不要把质量属性当作无边界承诺

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/software-engineering/frontend-runtime.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/software-engineering/frontend-runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/software-engineering/frontend-runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "frontend-runtime",
  "domain_id": "software-engineering-architecture",
  "subdomain_id": "frontend-platform",
  "title": "前端平台边界",
  "knowledge_type": "term",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-frontend",
    "audit-frontend"
  ],
  "entries": [
    {
      "id": "frontend-runtime",
      "name": "前端平台边界",
      "plain_language": "把组件、构建、运行时、发布和回滚能力作为平台契约。",
      "when_to_use": "后端或平台方案需要拆解质量属性时",
      "parameters": [
        "component API",
        "build",
        "runtime",
        "release",
        "rollback"
      ],
      "related": [
        "high-availability",
        "capacity-model",
        "scaling-strategies",
        "observability-contract",
        "idempotency-contract"
      ],
      "constraints": [
        "不要把质量属性当作无边界承诺"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
