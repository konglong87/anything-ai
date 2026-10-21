---
title: "方向/速度/幅度/节奏"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 方向/速度/幅度/节奏

[专业提示词库](../README.md) / [AI/AIGC/元技能](/prompts/jargon/domains/ai-aigc-meta-skills.html) / 实现技巧

明确主体怎么动、镜头怎么动、速度和幅度如何变化。

**适用场景：** 文生视频、产品动效和角色动作延展

<JargonPrompt id="motion-language--motion-language" />

## 如何把白话说具体

本条目将「文生视频、产品动效和角色动作延展」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 动作与运动控制、video-direction、velocity-inheritance、motion-language

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 方向/速度/幅度/节奏

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
方向/速度/幅度/节奏

【白话解释】
明确主体怎么动、镜头怎么动、速度和幅度如何变化。

【适用场景】
文生视频、产品动效和角色动作延展

【专业参数与锚点】
- direction
- speed
- amplitude
- rhythm
- follow

【边界与约束】
- 动作必须可观察，避免只写情绪形容词

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/motion-control/motion-language.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/motion-control/motion-language.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/motion-control/motion-language.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "motion-language",
  "domain_id": "ai-aigc-meta-skills",
  "subdomain_id": "motion-control",
  "title": "动作与运动控制",
  "knowledge_type": "technique",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "write-video-prompt"
  ],
  "entries": [
    {
      "id": "motion-language",
      "name": "方向/速度/幅度/节奏",
      "plain_language": "明确主体怎么动、镜头怎么动、速度和幅度如何变化。",
      "when_to_use": "文生视频、产品动效和角色动作延展",
      "parameters": [
        "direction",
        "speed",
        "amplitude",
        "rhythm",
        "follow"
      ],
      "related": [
        "video-direction",
        "velocity-inheritance"
      ],
      "constraints": [
        "动作必须可观察，避免只写情绪形容词"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
