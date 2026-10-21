---
title: "数理/化学/统计领域需求澄清术语包（草案） · 草稿参考"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 数理/化学/统计领域需求澄清术语包（草案）

[返回所属领域](/prompts/jargon/domains/math-chemistry-statistics.html) · [完整来源](../sources.md)

::: warning 草稿，非正式模板
本包在上游标记为 draft，未作为可执行提示词收录，不代表专业意见或已核验建议。
:::

## 原文


````json
{
  "schema_version": "1.0.0",
  "package_id": "math-chemistry-statistics-core",
  "domain_id": "math-chemistry-statistics",
  "title": "数理/化学/统计领域需求澄清术语包（草案）",
  "version": "0.1.0",
  "status": "draft",
  "intents": [
    {
      "id": "design",
      "action": "设计",
      "object": "数理/化学/统计相关产物"
    },
    {
      "id": "diagnose",
      "action": "排查",
      "object": "数理/化学/统计相关问题"
    }
  ],
  "dimensions": [
    {
      "id": "scope",
      "name": "问题与变量",
      "definition": "问题与变量的可确认方向。",
      "value_type": "selection"
    },
    {
      "id": "method",
      "name": "方法与不确定性",
      "definition": "方法与不确定性的可确认方向。",
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
      "term": "问题定义",
      "plain_language": "明确求什么、变量和边界",
      "benefit": "避免算错问题",
      "cost": "需先整理条件",
      "dimension_id": "scope"
    },
    {
      "id": "core-2",
      "term": "模型假设",
      "plain_language": "明确独立性、分布和近似条件",
      "benefit": "结论更可解释",
      "cost": "模型适用范围变窄",
      "dimension_id": "scope"
    },
    {
      "id": "core-3",
      "term": "测量口径",
      "plain_language": "明确单位、采样和统计窗口",
      "benefit": "结果可复核",
      "cost": "数据准备更复杂",
      "dimension_id": "scope"
    },
    {
      "id": "core-4",
      "term": "误差不确定性",
      "plain_language": "记录误差、区间和置信度",
      "benefit": "避免过度精确",
      "cost": "表达更谨慎",
      "dimension_id": "method"
    },
    {
      "id": "core-5",
      "term": "验证复算",
      "plain_language": "提供样本、公式和复算步骤",
      "benefit": "便于发现错误",
      "cost": "文档工作增加",
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


[查看固定版本来源](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/math-chemistry-statistics.json)
