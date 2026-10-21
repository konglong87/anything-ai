---
title: "惯性滚轮"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 惯性滚轮

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

时间或数值滚轮在释放后继承速度惯性减速，越界时阻尼回弹并吸附到最近刻度。

**适用场景：** 需要明确触发、阈值、取消、边界和键盘替代路径的复杂交互

<JargonPrompt id="inertial-wheel--inertial-wheel" />

## 如何把白话说具体

本条目将「需要明确触发、阈值、取消、边界和键盘替代路径的复杂交互」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 惯性滚轮、follow、threshold、snap、interruption

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 惯性滚轮

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
惯性滚轮

【白话解释】
时间或数值滚轮在释放后继承速度惯性减速，越界时阻尼回弹并吸附到最近刻度。

【适用场景】
需要明确触发、阈值、取消、边界和键盘替代路径的复杂交互

【专业参数与锚点】
- 手指阶段 1:1 跟手
- 释放后保存 velocity
- friction 衰减
- 越界阻尼
- spring 刚度/阻尼
- 最近刻度吸附
- 限制最大速度避免眩晕

【边界与约束】
- 未达到阈值不能触发
- 快速重复操作不叠加
- 组件卸载时清理定时器和动画

【交互状态机】
- dragging
- inertial
- decelerating
- overscrolling
- snapping
- settled

【可访问性】
- role=slider
- 键盘离散步进
- Home/End 到极值
- 减少动态时保留当前刻度

【验收标准】
- 60fps
- 手势和键盘结果一致
- 取消后状态完全复位

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/advanced/inertial-wheel.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/advanced/inertial-wheel.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/advanced/inertial-wheel.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "inertial-wheel",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "gesture-interaction",
  "title": "惯性滚轮",
  "knowledge_type": "pattern",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-gesture",
    "implement-gesture",
    "audit-gesture"
  ],
  "entries": [
    {
      "id": "inertial-wheel",
      "name": "惯性滚轮",
      "plain_language": "时间或数值滚轮在释放后继承速度惯性减速，越界时阻尼回弹并吸附到最近刻度。",
      "when_to_use": "需要明确触发、阈值、取消、边界和键盘替代路径的复杂交互",
      "parameters": [
        "手指阶段 1:1 跟手",
        "释放后保存 velocity",
        "friction 衰减",
        "越界阻尼",
        "spring 刚度/阻尼",
        "最近刻度吸附",
        "限制最大速度避免眩晕"
      ],
      "related": [
        "follow",
        "threshold",
        "snap",
        "interruption"
      ],
      "constraints": [
        "未达到阈值不能触发",
        "快速重复操作不叠加",
        "组件卸载时清理定时器和动画"
      ],
      "aliases": [],
      "state_machine": [
        "dragging",
        "inertial",
        "decelerating",
        "overscrolling",
        "snapping",
        "settled"
      ],
      "accessibility": [
        "role=slider",
        "键盘离散步进",
        "Home/End 到极值",
        "减少动态时保留当前刻度"
      ],
      "acceptance": [
        "60fps",
        "手势和键盘结果一致",
        "取消后状态完全复位"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
