---
title: "结构/材质/一致性负面词"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 结构/材质/一致性负面词

[专业提示词库](../README.md) / [AI/AIGC/元技能](/prompts/jargon/domains/ai-aigc-meta-skills.html) / 规范

把不希望出现的变形、额外肢体、颜色漂移、重复主体和低清晰度写成约束。

**适用场景：** 角色一致性、产品渲染和批量出图

<JargonPrompt id="negative-constraints--negative-constraints" />

## 如何把白话说具体

本条目将「角色一致性、产品渲染和批量出图」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 负面约束、character-ip、prompt-blocks、negative-constraints

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 结构/材质/一致性负面词

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
结构/材质/一致性负面词

【白话解释】
把不希望出现的变形、额外肢体、颜色漂移、重复主体和低清晰度写成约束。

【适用场景】
角色一致性、产品渲染和批量出图

【专业参数与锚点】
- 结构禁用
- 材质禁用
- 画面质量禁用

【边界与约束】
- 负面词不能掩盖主体描述不完整

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/negative-prompt/negative-constraints.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/negative-prompt/negative-constraints.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/negative-prompt/negative-constraints.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "negative-constraints",
  "domain_id": "ai-aigc-meta-skills",
  "subdomain_id": "negative-prompt",
  "title": "负面约束",
  "knowledge_type": "guideline",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "write-image-prompt",
    "audit-image-prompt"
  ],
  "entries": [
    {
      "id": "negative-constraints",
      "name": "结构/材质/一致性负面词",
      "plain_language": "把不希望出现的变形、额外肢体、颜色漂移、重复主体和低清晰度写成约束。",
      "when_to_use": "角色一致性、产品渲染和批量出图",
      "parameters": [
        "结构禁用",
        "材质禁用",
        "画面质量禁用"
      ],
      "related": [
        "character-ip",
        "prompt-blocks"
      ],
      "constraints": [
        "负面词不能掩盖主体描述不完整"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
