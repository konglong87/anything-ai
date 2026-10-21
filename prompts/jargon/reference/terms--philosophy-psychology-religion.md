---
title: "哲学/心理/宗教领域需求澄清术语包（草案） · 草稿参考"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 哲学/心理/宗教领域需求澄清术语包（草案）

[返回所属领域](/prompts/jargon/domains/philosophy-psychology-religion.html) · [完整来源](../sources.md)

::: warning 草稿，非正式模板
本包在上游标记为 draft，未作为可执行提示词收录，不代表专业意见或已核验建议。
:::

## 原文


````json
{
  "schema_version": "1.0.0",
  "package_id": "philosophy-psychology-religion-core",
  "domain_id": "philosophy-psychology-religion",
  "title": "哲学/心理/宗教领域需求澄清术语包（草案）",
  "version": "0.1.0",
  "status": "draft",
  "intents": [
    {
      "id": "design",
      "action": "设计",
      "object": "哲学/心理/宗教相关产物"
    },
    {
      "id": "diagnose",
      "action": "排查",
      "object": "哲学/心理/宗教相关问题"
    }
  ],
  "dimensions": [
    {
      "id": "scope",
      "name": "问题与传统",
      "definition": "问题与传统的可确认方向。",
      "value_type": "selection"
    },
    {
      "id": "method",
      "name": "解释边界",
      "definition": "解释边界的可确认方向。",
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
      "term": "问题范围",
      "plain_language": "明确讨论概念、经验、信仰或实践",
      "benefit": "避免混淆问题",
      "cost": "需要承认多种观点",
      "dimension_id": "scope"
    },
    {
      "id": "core-2",
      "term": "理论传统",
      "plain_language": "说明使用的学派、经典或研究框架",
      "benefit": "讨论更有出处",
      "cost": "不适合强行统一",
      "dimension_id": "scope"
    },
    {
      "id": "core-3",
      "term": "事实观点区分",
      "plain_language": "区分可验证事实、解释和价值判断",
      "benefit": "减少过度推断",
      "cost": "结论更谨慎",
      "dimension_id": "scope"
    },
    {
      "id": "core-4",
      "term": "文化语境",
      "plain_language": "说明语言、群体和历史背景",
      "benefit": "降低误读",
      "cost": "需要更多背景",
      "dimension_id": "method"
    },
    {
      "id": "core-5",
      "term": "专业边界",
      "plain_language": "区分哲学讨论、心理教育和临床判断",
      "benefit": "避免越界建议",
      "cost": "不能替代专业服务",
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


[查看固定版本来源](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/philosophy-psychology-religion.json)
