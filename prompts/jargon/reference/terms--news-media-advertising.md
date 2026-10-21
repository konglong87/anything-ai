---
title: "新闻/传媒/广告领域需求澄清术语包（草案） · 草稿参考"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 新闻/传媒/广告领域需求澄清术语包（草案）

[返回所属领域](/prompts/jargon/domains/news-media-advertising.html) · [完整来源](../sources.md)

::: warning 草稿，非正式模板
本包在上游标记为 draft，未作为可执行提示词收录，不代表专业意见或已核验建议。
:::

## 原文


````json
{
  "schema_version": "1.0.0",
  "package_id": "news-media-advertising-core",
  "domain_id": "news-media-advertising",
  "title": "新闻/传媒/广告领域需求澄清术语包（草案）",
  "version": "0.1.0",
  "status": "draft",
  "intents": [
    {
      "id": "design",
      "action": "设计",
      "object": "新闻/传媒/广告相关产物"
    },
    {
      "id": "diagnose",
      "action": "排查",
      "object": "新闻/传媒/广告相关问题"
    }
  ],
  "dimensions": [
    {
      "id": "scope",
      "name": "受众与目标",
      "definition": "受众与目标的可确认方向。",
      "value_type": "selection"
    },
    {
      "id": "method",
      "name": "事实与渠道",
      "definition": "事实与渠道的可确认方向。",
      "value_type": "selection"
    },
    {
      "id": "symptom",
      "name": "问题现象",
      "definition": "用户观察到的具体问题、时间、范围和影响。",
      "value_type": "free_text"
    }
  ],
  "terms": [
    {
      "id": "core-1",
      "term": "受众目标",
      "plain_language": "明确给谁看和希望行动什么",
      "benefit": "传播更有针对性",
      "cost": "覆盖面可能变窄",
      "dimension_id": "scope"
    },
    {
      "id": "core-2",
      "term": "事实核查",
      "plain_language": "记录来源、交叉验证和未确认信息",
      "benefit": "降低误导风险",
      "cost": "制作周期更长",
      "dimension_id": "scope"
    },
    {
      "id": "core-3",
      "term": "叙事结构",
      "plain_language": "明确倒金字塔、故事线或短视频节奏",
      "benefit": "内容更易理解",
      "cost": "表达自由度下降",
      "dimension_id": "scope"
    },
    {
      "id": "core-4",
      "term": "渠道规格",
      "plain_language": "适配新闻稿、公众号、短视频或广告位",
      "benefit": "发布更顺畅",
      "cost": "需要多版本制作",
      "dimension_id": "method"
    },
    {
      "id": "core-5",
      "term": "广告标识",
      "plain_language": "区分报道、推广、赞助和用户内容",
      "benefit": "降低误认风险",
      "cost": "商业表达更受限",
      "dimension_id": "method"
    }
  ],
  "mappings": [
    {
      "expression": "专业一点/做好一点",
      "level": "L3",
      "intent_ids": [
        "design"
      ],
      "dimension_ids": [
        "scope",
        "method"
      ],
      "reason": "需要先明确领域对象和方法约束。"
    }
  ]
}
````


[查看固定版本来源](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/news-media-advertising.json)
