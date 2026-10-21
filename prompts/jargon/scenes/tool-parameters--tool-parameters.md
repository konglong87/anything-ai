---
title: "通用/Midjourney/SD 适配"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 通用/Midjourney/SD 适配

[专业提示词库](../README.md) / [AI/AIGC/元技能](/prompts/jargon/domains/ai-aigc-meta-skills.html) / 场景模板

把同一套提示词拆成通用正文、画幅参数和工具专用控制字段。

**适用场景：** 需要在多个生图工具间复用提示词

<JargonPrompt id="tool-parameters--tool-parameters" />

## 如何把白话说具体

本条目将「需要在多个生图工具间复用提示词」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 工具参数适配、prompt-blocks、negative-constraints、tool-parameters

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 通用/Midjourney/SD 适配

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
通用/Midjourney/SD 适配

【白话解释】
把同一套提示词拆成通用正文、画幅参数和工具专用控制字段。

【适用场景】
需要在多个生图工具间复用提示词

【专业参数与锚点】
- aspect_ratio
- style
- negative_prompt
- controlnet

【边界与约束】
- 工具参数是适配层，不改变核心语义

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/tool-adapter/tool-parameters.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/tool-adapter/tool-parameters.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/tool-adapter/tool-parameters.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "tool-parameters",
  "domain_id": "ai-aigc-meta-skills",
  "subdomain_id": "tool-adapter",
  "title": "工具参数适配",
  "knowledge_type": "template",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "write-image-prompt",
    "write-video-prompt"
  ],
  "entries": [
    {
      "id": "tool-parameters",
      "name": "通用/Midjourney/SD 适配",
      "plain_language": "把同一套提示词拆成通用正文、画幅参数和工具专用控制字段。",
      "when_to_use": "需要在多个生图工具间复用提示词",
      "parameters": [
        "aspect_ratio",
        "style",
        "negative_prompt",
        "controlnet"
      ],
      "related": [
        "prompt-blocks",
        "negative-constraints"
      ],
      "constraints": [
        "工具参数是适配层，不改变核心语义"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
