---
title: "教育/体育/运动领域需求澄清术语包（草案） · 草稿参考"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 教育/体育/运动领域需求澄清术语包（草案）

[返回所属领域](/prompts/jargon/domains/education-sports.html) · [完整来源](../sources.md)

::: warning 草稿，非正式模板
本包在上游标记为 draft，未作为可执行提示词收录，不代表专业意见或已核验建议。
:::

## 原文


````json
{
  "schema_version": "1.0.0",
  "package_id": "education-sports-core",
  "domain_id": "education-sports",
  "title": "教育/体育/运动领域需求澄清术语包（草案）",
  "version": "0.1.0",
  "status": "draft",
  "intents": [
    {
      "id": "design",
      "action": "设计",
      "object": "教育/体育/运动相关产物"
    },
    {
      "id": "diagnose",
      "action": "排查",
      "object": "教育/体育/运动相关问题"
    }
  ],
  "dimensions": [
    {
      "id": "scope",
      "name": "学习目标",
      "definition": "学习目标的可确认方向。",
      "value_type": "selection"
    },
    {
      "id": "method",
      "name": "训练与评价",
      "definition": "训练与评价的可确认方向。",
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
      "term": "学习目标",
      "plain_language": "明确知识、技能或表现结果",
      "benefit": "方便设计活动",
      "cost": "需要定义水平",
      "dimension_id": "scope"
    },
    {
      "id": "core-2",
      "term": "学习者水平",
      "plain_language": "明确年龄、基础和差异",
      "benefit": "内容更合适",
      "cost": "需要收集背景",
      "dimension_id": "scope"
    },
    {
      "id": "core-3",
      "term": "训练活动",
      "plain_language": "明确练习、反馈和递进方式",
      "benefit": "过程更可执行",
      "cost": "准备成本更高",
      "dimension_id": "scope"
    },
    {
      "id": "core-4",
      "term": "评价方式",
      "plain_language": "明确测验、作品、表现或比赛",
      "benefit": "结果可检查",
      "cost": "评价需要时间",
      "dimension_id": "method"
    },
    {
      "id": "core-5",
      "term": "安全负荷",
      "plain_language": "明确运动强度、恢复和保护措施",
      "benefit": "降低训练风险",
      "cost": "进度可能更慢",
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


[查看固定版本来源](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/education-sports.json)
