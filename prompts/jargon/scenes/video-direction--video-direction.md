---
title: "镜头/主体运动/声音三层描述"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 镜头/主体运动/声音三层描述

[专业提示词库](../README.md) / [AI/AIGC/元技能](/prompts/jargon/domains/ai-aigc-meta-skills.html) / 场景模板

视频提示词至少拆成景别、镜头运动、主体动作、节奏和声音。

**适用场景：** 文生视频和分镜生成

<JargonPrompt id="video-direction--video-direction" />

## 如何把白话说具体

本条目将「文生视频和分镜生成」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 视频镜头与运动描述、camera-language、motion-language

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 镜头/主体运动/声音三层描述

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
镜头/主体运动/声音三层描述

【白话解释】
视频提示词至少拆成景别、镜头运动、主体动作、节奏和声音。

【适用场景】
文生视频和分镜生成

【专业参数与锚点】
- shot
- camera_motion
- subject_motion
- tempo
- sound

【边界与约束】
- 不要只写电影感而不说明可观察的镜头行为

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/video-prompt/video-direction.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/video-prompt/video-direction.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/video-prompt/video-direction.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "video-direction",
  "domain_id": "ai-aigc-meta-skills",
  "subdomain_id": "video-prompt",
  "title": "视频镜头与运动描述",
  "knowledge_type": "template",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "write-video-prompt",
    "audit-video-prompt"
  ],
  "entries": [
    {
      "id": "video-direction",
      "name": "镜头/主体运动/声音三层描述",
      "plain_language": "视频提示词至少拆成景别、镜头运动、主体动作、节奏和声音。",
      "when_to_use": "文生视频和分镜生成",
      "parameters": [
        "shot",
        "camera_motion",
        "subject_motion",
        "tempo",
        "sound"
      ],
      "related": [
        "camera-language",
        "motion-language"
      ],
      "constraints": [
        "不要只写电影感而不说明可观察的镜头行为"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
