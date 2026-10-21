---
title: "材质与反射"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 材质与反射

[专业提示词库](../README.md) / [AI/AIGC/元技能](/prompts/jargon/domains/ai-aigc-meta-skills.html) / 术语

用可观察的表面属性描述材质，例如高光泽釉面、短植绒、哑光纸张和半通透胶带。

**适用场景：** 产品渲染、角色周边和材质迁移

<JargonPrompt id="material-library--material-library" />

## 如何把白话说具体

本条目将「产品渲染、角色周边和材质迁移」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 材质风格词、prompt-blocks、character-ip

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 材质与反射

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
材质与反射

【白话解释】
用可观察的表面属性描述材质，例如高光泽釉面、短植绒、哑光纸张和半通透胶带。

【适用场景】
产品渲染、角色周边和材质迁移

【专业参数与锚点】
- roughness
- specular
- translucency
- texture

【边界与约束】
- 材质词不能替代主体和结构约束

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/material-style/material-library.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/material-style/material-library.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/material-style/material-library.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "material-library",
  "domain_id": "ai-aigc-meta-skills",
  "subdomain_id": "material-style",
  "title": "材质风格词",
  "knowledge_type": "term",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "write-image-prompt"
  ],
  "entries": [
    {
      "id": "material-library",
      "name": "材质与反射",
      "plain_language": "用可观察的表面属性描述材质，例如高光泽釉面、短植绒、哑光纸张和半通透胶带。",
      "when_to_use": "产品渲染、角色周边和材质迁移",
      "parameters": [
        "roughness",
        "specular",
        "translucency",
        "texture"
      ],
      "related": [
        "prompt-blocks",
        "character-ip"
      ],
      "constraints": [
        "材质词不能替代主体和结构约束"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
