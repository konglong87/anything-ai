---
title: "场景增量模块"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 场景增量模块

[专业提示词库](../README.md) / [AI/AIGC/元技能](/prompts/jargon/domains/ai-aigc-meta-skills.html) / 场景模板

把材质、动作、镜头或周边作为独立模块叠加到基础 IP。

**适用场景：** 需要复用角色但更换表现目标

<JargonPrompt id="character-ip--scene-module" />

## 如何把白话说具体

本条目将「需要复用角色但更换表现目标」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 角色 IP 一致性、base-ip

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 场景增量模块

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
场景增量模块

【白话解释】
把材质、动作、镜头或周边作为独立模块叠加到基础 IP。

【适用场景】
需要复用角色但更换表现目标

【专业参数与锚点】
- scene_id
- aspect_ratio
- tool_adapter

【边界与约束】
- 不要重复复制完整基础 IP

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
      "id": "scene-module",
      "name": "场景增量模块",
      "plain_language": "把材质、动作、镜头或周边作为独立模块叠加到基础 IP。",
      "when_to_use": "需要复用角色但更换表现目标",
      "parameters": [
        "scene_id",
        "aspect_ratio",
        "tool_adapter"
      ],
      "related": [
        "base-ip"
      ],
      "constraints": [
        "不要重复复制完整基础 IP"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
