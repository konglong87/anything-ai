---
title: "勾选联动"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 勾选联动

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

一次勾选按明确先后驱动顶部背景、进度环和数字滚动，多个反馈共享同一完成结果。

**适用场景：** 用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时

<JargonPrompt id="checkbox-cascade--checkbox-cascade" />

## 如何把白话说具体

本条目将「用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 勾选联动、checkbox cascade、follow、snap、interruption、reduced-motion

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 勾选联动

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
勾选联动

【白话解释】
一次勾选按明确先后驱动顶部背景、进度环和数字滚动，多个反馈共享同一完成结果。

【适用场景】
用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时

【专业参数与锚点】
- 勾选反馈 80–160ms
- 背景渐变 180–300ms
- 进度环绘制 400–700ms
- 数字滚动 300–500ms
- stroke-dashoffset
- 数字 Y 轴偏移

【边界与约束】
- 避免生硬切换
- 动画顺序必须可验证
- 必须支持中断和反向回退

【交互状态机】
- checkbox checked
- top background transition
- progress ring draw
- count update
- settled

【动画顺序】
- checkbox checked
- top background transition
- progress ring draw
- count update
- settled

【空间锚点】
- 复选框是触发源
- 顶部背景覆盖状态区域
- 进度环围绕当前任务指标
- 数字与进度环保持同一视觉组

【可访问性】
- 键盘 Space/Enter 可勾选
- aria-checked 与视觉状态同步
- 减少动态时保留最终进度和数字

【验收标准】
- 勾选后所有反馈都出现
- 进度环不早于触发状态
- 数字与进度百分比一致
- 快速连续勾选不会叠加旧动画

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/checkbox-cascade.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/continuous/checkbox-cascade.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/checkbox-cascade.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "checkbox-cascade",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "continuous-interaction",
  "title": "勾选联动",
  "knowledge_type": "technique",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-continuous",
    "implement-continuous",
    "audit-continuous"
  ],
  "entries": [
    {
      "id": "checkbox-cascade",
      "name": "勾选联动",
      "plain_language": "一次勾选按明确先后驱动顶部背景、进度环和数字滚动，多个反馈共享同一完成结果。",
      "when_to_use": "用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时",
      "parameters": [
        "勾选反馈 80–160ms",
        "背景渐变 180–300ms",
        "进度环绘制 400–700ms",
        "数字滚动 300–500ms",
        "stroke-dashoffset",
        "数字 Y 轴偏移"
      ],
      "related": [
        "follow",
        "snap",
        "interruption",
        "reduced-motion"
      ],
      "constraints": [
        "避免生硬切换",
        "动画顺序必须可验证",
        "必须支持中断和反向回退"
      ],
      "aliases": [
        "勾选联动",
        "checkbox cascade"
      ],
      "state_machine": [
        "checkbox checked",
        "top background transition",
        "progress ring draw",
        "count update",
        "settled"
      ],
      "animation_sequence": [
        "checkbox checked",
        "top background transition",
        "progress ring draw",
        "count update",
        "settled"
      ],
      "spatial_anchor": [
        "复选框是触发源",
        "顶部背景覆盖状态区域",
        "进度环围绕当前任务指标",
        "数字与进度环保持同一视觉组"
      ],
      "accessibility": [
        "键盘 Space/Enter 可勾选",
        "aria-checked 与视觉状态同步",
        "减少动态时保留最终进度和数字"
      ],
      "acceptance": [
        "勾选后所有反馈都出现",
        "进度环不早于触发状态",
        "数字与进度百分比一致",
        "快速连续勾选不会叠加旧动画"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
