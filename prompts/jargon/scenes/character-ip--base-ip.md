---
title: "基础 IP 设定"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 基础 IP 设定

[专业提示词库](../README.md) / [AI/AIGC/元技能](/prompts/jargon/domains/ai-aigc-meta-skills.html) / 场景模板

先锁定角色体型、配色、五官、材质和负面约束，再按场景增量加载。

**适用场景：** 同一角色需要生成三视图、动作、服装、表情或周边

<JargonPrompt id="character-ip--base-ip" />

## 如何把白话说具体

本条目将「同一角色需要生成三视图、动作、服装、表情或周边」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 角色 IP 一致性、lineart-to-3d、plush-texture、merchandise-set

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 基础 IP 设定

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
基础 IP 设定

【白话解释】
先锁定角色体型、配色、五官、材质和负面约束，再按场景增量加载。

【适用场景】
同一角色需要生成三视图、动作、服装、表情或周边

【专业参数与锚点】
- 主体描述
- 一致性规则
- 负面提示词
- 参考图

【边界与约束】
- 一次只加载一个场景模板

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/character-ip/character-ip.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/character-ip/character-ip.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/character-ip/character-ip.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "character-ip",
  "domain_id": "ai-aigc-meta-skills",
  "subdomain_id": "character-ip",
  "title": "角色 IP 一致性",
  "knowledge_type": "template",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "generate-character",
    "extend-character"
  ],
  "entries": [
    {
      "id": "base-ip",
      "name": "基础 IP 设定",
      "plain_language": "先锁定角色体型、配色、五官、材质和负面约束，再按场景增量加载。",
      "when_to_use": "同一角色需要生成三视图、动作、服装、表情或周边",
      "parameters": [
        "主体描述",
        "一致性规则",
        "负面提示词",
        "参考图"
      ],
      "related": [
        "lineart-to-3d",
        "plush-texture",
        "merchandise-set"
      ],
      "constraints": [
        "一次只加载一个场景模板"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
