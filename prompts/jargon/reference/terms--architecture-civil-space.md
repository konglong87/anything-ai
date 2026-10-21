---
title: "建筑/土木/空间领域需求澄清术语包（草案） · 草稿参考"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 建筑/土木/空间领域需求澄清术语包（草案）

[返回所属领域](/prompts/jargon/domains/architecture-civil-space.html) · [完整来源](../sources.md)

::: warning 草稿，非正式模板
本包在上游标记为 draft，未作为可执行提示词收录，不代表专业意见或已核验建议。
:::

## 原文


````json
{
  "schema_version": "1.0.0",
  "package_id": "architecture-civil-space-core",
  "domain_id": "architecture-civil-space",
  "title": "建筑/土木/空间领域需求澄清术语包（草案）",
  "version": "0.1.0",
  "status": "draft",
  "intents": [
    {
      "id": "design",
      "action": "设计",
      "object": "建筑/土木/空间相关产物"
    },
    {
      "id": "diagnose",
      "action": "排查",
      "object": "建筑/土木/空间相关问题"
    }
  ],
  "dimensions": [
    {
      "id": "scope",
      "name": "空间功能",
      "definition": "空间功能的可确认方向。",
      "value_type": "selection"
    },
    {
      "id": "method",
      "name": "规范与材料",
      "definition": "规范与材料的可确认方向。",
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
      "term": "功能分区",
      "plain_language": "按使用者和活动组织空间",
      "benefit": "减少动线冲突",
      "cost": "需要先梳理场景",
      "dimension_id": "scope"
    },
    {
      "id": "core-2",
      "term": "动线组织",
      "plain_language": "人流、物流和疏散路径",
      "benefit": "空间使用更顺畅",
      "cost": "可能占用面积",
      "dimension_id": "scope"
    },
    {
      "id": "core-3",
      "term": "结构体系",
      "plain_language": "明确承重和结构形式",
      "benefit": "降低结构返工",
      "cost": "需要专业计算",
      "dimension_id": "scope"
    },
    {
      "id": "core-4",
      "term": "材料耐久",
      "plain_language": "按环境选择材料耐候性",
      "benefit": "维护周期更清楚",
      "cost": "初始成本可能更高",
      "dimension_id": "method"
    },
    {
      "id": "core-5",
      "term": "消防无障碍",
      "plain_language": "纳入疏散、消防和无障碍要求",
      "benefit": "降低合规风险",
      "cost": "需按当地规范核验",
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


[查看固定版本来源](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/architecture-civil-space.json)
