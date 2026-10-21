---
title: "政法/军事/法律领域需求澄清术语包（草案） · 草稿参考"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 政法/军事/法律领域需求澄清术语包（草案）

[返回所属领域](/prompts/jargon/domains/law-politics-military.html) · [完整来源](../sources.md)

::: warning 草稿，非正式模板
本包在上游标记为 draft，未作为可执行提示词收录，不代表专业意见或已核验建议。
:::

## 原文


````json
{
  "schema_version": "1.0.0",
  "package_id": "law-politics-military-core",
  "domain_id": "law-politics-military",
  "title": "政法/军事/法律领域需求澄清术语包（草案）",
  "version": "0.1.0",
  "status": "draft",
  "intents": [
    {
      "id": "design",
      "action": "设计",
      "object": "政法/军事/法律相关产物"
    },
    {
      "id": "diagnose",
      "action": "排查",
      "object": "政法/军事/法律相关问题"
    }
  ],
  "dimensions": [
    {
      "id": "scope",
      "name": "法域与事项",
      "definition": "法域与事项的可确认方向。",
      "value_type": "selection"
    },
    {
      "id": "method",
      "name": "证据与程序",
      "definition": "证据与程序的可确认方向。",
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
      "term": "法域事项",
      "plain_language": "明确国家地区、法律部门和具体事项",
      "benefit": "避免套用错误规则",
      "cost": "必须补充事实",
      "dimension_id": "scope"
    },
    {
      "id": "core-2",
      "term": "权利义务",
      "plain_language": "明确各方身份、责任和限制",
      "benefit": "方便识别问题",
      "cost": "需要完整合同或法条",
      "dimension_id": "scope"
    },
    {
      "id": "core-3",
      "term": "证据材料",
      "plain_language": "明确事实、文件、时间线和来源",
      "benefit": "便于专业分析",
      "cost": "整理成本更高",
      "dimension_id": "scope"
    },
    {
      "id": "core-4",
      "term": "程序期限",
      "plain_language": "明确申报、答复、诉讼或审批期限",
      "benefit": "减少程序错误",
      "cost": "必须核对最新规则",
      "dimension_id": "method"
    },
    {
      "id": "core-5",
      "term": "专业意见",
      "plain_language": "明确需要律师、监管或官方决定的节点",
      "benefit": "降低误导风险",
      "cost": "不能由普通提示替代",
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


[查看固定版本来源](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/law-politics-military.json)
