---
title: "语言/文学/写作领域需求澄清术语包（草案） · 草稿参考"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 语言/文学/写作领域需求澄清术语包（草案）

[返回所属领域](/prompts/jargon/domains/language-literature-writing.html) · [完整来源](../sources.md)

::: warning 草稿，非正式模板
本包在上游标记为 draft，未作为可执行提示词收录，不代表专业意见或已核验建议。
:::

## 原文


````json
{
  "schema_version": "1.0.0",
  "package_id": "language-literature-writing-core",
  "domain_id": "language-literature-writing",
  "title": "语言/文学/写作领域需求澄清术语包（草案）",
  "version": "0.1.0",
  "status": "draft",
  "intents": [
    {
      "id": "design",
      "action": "设计",
      "object": "语言/文学/写作相关产物"
    },
    {
      "id": "diagnose",
      "action": "排查",
      "object": "语言/文学/写作相关问题"
    }
  ],
  "dimensions": [
    {
      "id": "scope",
      "name": "写作目的",
      "definition": "写作目的的可确认方向。",
      "value_type": "selection"
    },
    {
      "id": "method",
      "name": "体裁与读者",
      "definition": "体裁与读者的可确认方向。",
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
      "term": "写作目的",
      "plain_language": "明确说明、说服、叙事或表达情绪",
      "benefit": "内容更聚焦",
      "cost": "需舍弃无关内容",
      "dimension_id": "scope"
    },
    {
      "id": "core-2",
      "term": "体裁结构",
      "plain_language": "明确报道、议论文、小说或诗歌结构",
      "benefit": "形式更符合场景",
      "cost": "格式限制更多",
      "dimension_id": "scope"
    },
    {
      "id": "core-3",
      "term": "读者语境",
      "plain_language": "明确年龄、知识背景和阅读场景",
      "benefit": "表达更容易理解",
      "cost": "受众范围变窄",
      "dimension_id": "scope"
    },
    {
      "id": "core-4",
      "term": "语气风格",
      "plain_language": "明确正式、口语、克制或抒情",
      "benefit": "声音更统一",
      "cost": "个性空间受约束",
      "dimension_id": "method"
    },
    {
      "id": "core-5",
      "term": "证据引用",
      "plain_language": "明确事实、引文和出处关系",
      "benefit": "可信度更高",
      "cost": "整理成本更高",
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


[查看固定版本来源](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/language-literature-writing.json)
