---
title: "经济/管理/金融领域需求澄清术语包（草案） · 草稿参考"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 经济/管理/金融领域需求澄清术语包（草案）

[返回所属领域](/prompts/jargon/domains/economics-management-finance.html) · [完整来源](../sources.md)

::: warning 草稿，非正式模板
本包在上游标记为 draft，未作为可执行提示词收录，不代表专业意见或已核验建议。
:::

## 原文


````json
{
  "schema_version": "1.0.0",
  "package_id": "economics-management-finance-core",
  "domain_id": "economics-management-finance",
  "title": "经济/管理/金融领域需求澄清术语包（草案）",
  "version": "0.1.0",
  "status": "draft",
  "intents": [
    {
      "id": "design",
      "action": "设计",
      "object": "经济/管理/金融相关产物"
    },
    {
      "id": "diagnose",
      "action": "排查",
      "object": "经济/管理/金融相关问题"
    }
  ],
  "dimensions": [
    {
      "id": "scope",
      "name": "业务目标",
      "definition": "业务目标的可确认方向。",
      "value_type": "selection"
    },
    {
      "id": "method",
      "name": "指标与风险",
      "definition": "指标与风险的可确认方向。",
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
      "term": "业务目标",
      "plain_language": "明确增长、成本、现金流或投资目标",
      "benefit": "方案可衡量",
      "cost": "目标之间可能冲突",
      "dimension_id": "scope"
    },
    {
      "id": "core-2",
      "term": "指标口径",
      "plain_language": "明确收入、利润、转化或风险指标定义",
      "benefit": "避免数据争议",
      "cost": "需要统一数据源",
      "dimension_id": "scope"
    },
    {
      "id": "core-3",
      "term": "时间期限",
      "plain_language": "明确短期、中期或长期目标",
      "benefit": "方便匹配策略",
      "cost": "短期和长期可能冲突",
      "dimension_id": "scope"
    },
    {
      "id": "core-4",
      "term": "风险承受",
      "plain_language": "明确波动、损失和流动性容忍度",
      "benefit": "避免只谈收益",
      "cost": "需要完整背景",
      "dimension_id": "method"
    },
    {
      "id": "core-5",
      "term": "合规边界",
      "plain_language": "明确适用监管和披露要求",
      "benefit": "降低合规风险",
      "cost": "需要专业复核",
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


[查看固定版本来源](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/economics-management-finance.json)
