---
title: "景别/机位/焦段/运镜"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 景别/机位/焦段/运镜

[专业提示词库](../README.md) / [AI/AIGC/元技能](/prompts/jargon/domains/ai-aigc-meta-skills.html) / 术语

把电影感拆成可执行的景别、机位、焦段、景深和运动。

**适用场景：** 想要电影感但需要稳定复现时

<JargonPrompt id="camera-language--camera-language" />

## 如何把白话说具体

本条目将「想要电影感但需要稳定复现时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 镜头语言、video-direction、composition

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 景别/机位/焦段/运镜

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
景别/机位/焦段/运镜

【白话解释】
把电影感拆成可执行的景别、机位、焦段、景深和运动。

【适用场景】
想要电影感但需要稳定复现时

【专业参数与锚点】
- close/medium/wide
- high/low angle
- lens
- depth of field
- camera motion

【边界与约束】
- 不要用受版权保护的具体作品名作为唯一指令

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/camera-language/camera-language.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/camera-language/camera-language.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/camera-language/camera-language.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "camera-language",
  "domain_id": "ai-aigc-meta-skills",
  "subdomain_id": "camera-language",
  "title": "镜头语言",
  "knowledge_type": "term",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "write-image-prompt",
    "write-video-prompt"
  ],
  "entries": [
    {
      "id": "camera-language",
      "name": "景别/机位/焦段/运镜",
      "plain_language": "把电影感拆成可执行的景别、机位、焦段、景深和运动。",
      "when_to_use": "想要电影感但需要稳定复现时",
      "parameters": [
        "close/medium/wide",
        "high/low angle",
        "lens",
        "depth of field",
        "camera motion"
      ],
      "related": [
        "video-direction",
        "composition"
      ],
      "constraints": [
        "不要用受版权保护的具体作品名作为唯一指令"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
