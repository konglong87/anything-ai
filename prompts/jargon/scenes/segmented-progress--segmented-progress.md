---
title: "分段进度条"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 分段进度条

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

按住暂停，点击左右区域切换上一项或下一项，进度与内容同步。

**适用场景：** 需要明确触发、阈值、取消、边界和键盘替代路径的复杂交互

<JargonPrompt id="segmented-progress--segmented-progress" />

## 如何把白话说具体

本条目将「需要明确触发、阈值、取消、边界和键盘替代路径的复杂交互」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 分段进度条、follow、threshold、snap、interruption、segmented progress、segmented-progress、顺滑、流畅、丝滑

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 分段进度条

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
分段进度条

【白话解释】
按住暂停，点击左右区域切换上一项或下一项，进度与内容同步。

【适用场景】
需要明确触发、阈值、取消、边界和键盘替代路径的复杂交互

【专业参数与锚点】
- 200ms 内抬起判定点击
- 左右 35% 切换
- 中间 30% 暂停
- 最后一项循环

【边界与约束】
- 未达到阈值不能触发
- 快速重复操作不叠加
- 组件卸载时清理定时器和动画

【交互状态机】
- playing
- paused
- switching

【可访问性】
- 左右箭头
- Space 暂停
- aria-live 当前项

【验收标准】
- 60fps
- 手势和键盘结果一致
- 取消后状态完全复位

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/advanced/segmented-progress.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/advanced/segmented-progress.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/advanced/segmented-progress.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "segmented-progress",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "gesture-interaction",
  "title": "分段进度条",
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
      "id": "segmented-progress",
      "name": "分段进度条",
      "plain_language": "按住暂停，点击左右区域切换上一项或下一项，进度与内容同步。",
      "when_to_use": "需要明确触发、阈值、取消、边界和键盘替代路径的复杂交互",
      "parameters": [
        "200ms 内抬起判定点击",
        "左右 35% 切换",
        "中间 30% 暂停",
        "最后一项循环"
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
        "playing",
        "paused",
        "switching"
      ],
      "accessibility": [
        "左右箭头",
        "Space 暂停",
        "aria-live 当前项"
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
