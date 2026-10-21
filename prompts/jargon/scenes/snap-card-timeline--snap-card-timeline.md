---
title: "吸附卡加画线"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 吸附卡加画线

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

卡片先减速吸附到最近目标，停稳后时间线再从起点逐段绘制到对应卡片位置。

**适用场景：** 用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时

<JargonPrompt id="snap-card-timeline--snap-card-timeline" />

## 如何把白话说具体

本条目将「用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 吸附卡加画线、snap card timeline、follow、snap、interruption、reduced-motion

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 吸附卡加画线

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
吸附卡加画线

【白话解释】
卡片先减速吸附到最近目标，停稳后时间线再从起点逐段绘制到对应卡片位置。

【适用场景】
用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时

【专业参数与锚点】
- 先吸附后绘制
- 卡片停止后延迟 80–160ms
- timeline duration 300–600ms
- stroke-dasharray
- stroke-dashoffset
- 卡片最终 Y 轴位置

【边界与约束】
- 避免生硬切换
- 动画顺序必须可验证
- 必须支持中断和反向回退

【交互状态机】
- drag or scroll
- decelerating
- snap to nearest card
- settled
- timeline draw
- complete

【动画顺序】
- drag or scroll
- decelerating
- snap to nearest card
- settled
- timeline draw
- complete

【空间锚点】
- 吸附目标由最近卡片决定
- 时间线起点固定在轨道起点
- 终点对齐卡片中心或锚点
- 线段绘制方向与滚动方向一致

【可访问性】
- 键盘切换卡片时同样触发落位反馈
- aria-current 标记当前卡片
- 减少动态时显示完整时间线

【验收标准】
- 时间线绝不早于卡片停稳
- 吸附目标稳定不抖动
- 线终点准确对齐卡片
- 取消或快速切换不会残留旧线段

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/snap-card-timeline.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/continuous/snap-card-timeline.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/snap-card-timeline.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "snap-card-timeline",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "continuous-interaction",
  "title": "吸附卡加画线",
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
      "id": "snap-card-timeline",
      "name": "吸附卡加画线",
      "plain_language": "卡片先减速吸附到最近目标，停稳后时间线再从起点逐段绘制到对应卡片位置。",
      "when_to_use": "用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时",
      "parameters": [
        "先吸附后绘制",
        "卡片停止后延迟 80–160ms",
        "timeline duration 300–600ms",
        "stroke-dasharray",
        "stroke-dashoffset",
        "卡片最终 Y 轴位置"
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
        "吸附卡加画线",
        "snap card timeline"
      ],
      "state_machine": [
        "drag or scroll",
        "decelerating",
        "snap to nearest card",
        "settled",
        "timeline draw",
        "complete"
      ],
      "animation_sequence": [
        "drag or scroll",
        "decelerating",
        "snap to nearest card",
        "settled",
        "timeline draw",
        "complete"
      ],
      "spatial_anchor": [
        "吸附目标由最近卡片决定",
        "时间线起点固定在轨道起点",
        "终点对齐卡片中心或锚点",
        "线段绘制方向与滚动方向一致"
      ],
      "accessibility": [
        "键盘切换卡片时同样触发落位反馈",
        "aria-current 标记当前卡片",
        "减少动态时显示完整时间线"
      ],
      "acceptance": [
        "时间线绝不早于卡片停稳",
        "吸附目标稳定不抖动",
        "线终点准确对齐卡片",
        "取消或快速切换不会残留旧线段"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
