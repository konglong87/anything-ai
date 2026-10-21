---
title: "项目依赖对齐"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 项目依赖对齐

[专业提示词库](../README.md) / [职场沟通与组织协作](/prompts/jargon/domains/workplace-communication.html) / 术语

明确依赖方、输入、输出、阻塞风险和升级路径。

**适用场景：** 用户说出职场模糊表达或需要改写协作要求时

<JargonPrompt id="dependency-alignment--dependency-alignment" />

## 如何把白话说具体

本条目将「用户说出职场模糊表达或需要改写协作要求时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 项目依赖对齐、information-hierarchy、goal-metric

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 项目依赖对齐

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
项目依赖对齐

【白话解释】
明确依赖方、输入、输出、阻塞风险和升级路径。

【适用场景】
用户说出职场模糊表达或需要改写协作要求时

【专业参数与锚点】
- 依赖方
- 输入
- 输出
- 截止时间
- 升级路径

【边界与约束】
- 不替用户猜测未提供的事实

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/workplace/dependency-alignment.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/workplace/dependency-alignment.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/workplace/dependency-alignment.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "dependency-alignment",
  "domain_id": "workplace-communication",
  "subdomain_id": "project-collaboration",
  "title": "项目依赖对齐",
  "knowledge_type": "term",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "align-collaboration",
    "resolve-dependency"
  ],
  "entries": [
    {
      "id": "dependency-alignment",
      "name": "项目依赖对齐",
      "plain_language": "明确依赖方、输入、输出、阻塞风险和升级路径。",
      "when_to_use": "用户说出职场模糊表达或需要改写协作要求时",
      "parameters": [
        "依赖方",
        "输入",
        "输出",
        "截止时间",
        "升级路径"
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
