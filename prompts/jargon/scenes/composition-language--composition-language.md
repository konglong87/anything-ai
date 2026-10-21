---
title: "主体位置与视觉动线"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 主体位置与视觉动线

[专业提示词库](../README.md) / [AI/AIGC/元技能](/prompts/jargon/domains/ai-aigc-meta-skills.html) / 术语

用中心、三分、对称、留白、前中后景和视觉引导线描述构图。

**适用场景：** 需要主体位置和画面平衡可控时

<JargonPrompt id="composition-language--composition-language" />

## 如何把白话说具体

本条目将「需要主体位置和画面平衡可控时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 构图语言、camera-language、prompt-blocks、composition-language

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 主体位置与视觉动线

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
主体位置与视觉动线

【白话解释】
用中心、三分、对称、留白、前中后景和视觉引导线描述构图。

【适用场景】
需要主体位置和画面平衡可控时

【专业参数与锚点】
- subject placement
- negative space
- foreground/midground/background
- leading lines

【边界与约束】
- 构图要服务内容主角，不要为了术语堆叠

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/composition/composition-language.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/composition/composition-language.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/composition/composition-language.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "composition-language",
  "domain_id": "ai-aigc-meta-skills",
  "subdomain_id": "composition",
  "title": "构图语言",
  "knowledge_type": "term",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "write-image-prompt",
    "audit-image-prompt"
  ],
  "entries": [
    {
      "id": "composition-language",
      "name": "主体位置与视觉动线",
      "plain_language": "用中心、三分、对称、留白、前中后景和视觉引导线描述构图。",
      "when_to_use": "需要主体位置和画面平衡可控时",
      "parameters": [
        "subject placement",
        "negative space",
        "foreground/midground/background",
        "leading lines"
      ],
      "related": [
        "camera-language",
        "prompt-blocks"
      ],
      "constraints": [
        "构图要服务内容主角，不要为了术语堆叠"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
