---
title: "卡片层叠轮播"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 卡片层叠轮播

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

三张卡片以缩放和 Y 轴偏移形成层叠，顶层跟随拖拽并轻微旋转，达到距离或速度阈值后飞出，下层补位。

**适用场景：** 需要卡片层级、拖拽跟手、飞出切换和循环补位的移动端轮播

<JargonPrompt id="perspective-carousel--stacked-card-carousel" />

## 如何把白话说具体

本条目将「需要卡片层级、拖拽跟手、飞出切换和循环补位的移动端轮播」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 卡片层叠轮播、叠卡轮播、卡片堆叠轮播、stacked card carousel、景随图换轮播、stack-card、stack-card-expand、follow、threshold、snap、velocity-inheritance

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 卡片层叠轮播

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
卡片层叠轮播

【白话解释】
三张卡片以缩放和 Y 轴偏移形成层叠，顶层跟随拖拽并轻微旋转，达到距离或速度阈值后飞出，下层补位。

【适用场景】
需要卡片层级、拖拽跟手、飞出切换和循环补位的移动端轮播

【专业参数与锚点】
- scale 0.92/0.96/1
- Y 偏移 16/8/0
- 顶层最大旋转 8°
- 拖过 1/3 宽度或速度 > 500 触发
- spring 280/26
- 只剩一张时循环补位

【边界与约束】
- 未达距离和速度阈值时回弹
- 顶层飞出后下层平滑补位
- 快速连滑不叠加旧回调
- 卡片内容和操作区不能因旋转不可达

【交互状态机】
- idle
- dragging
- projecting
- flying-out
- promoting
- snapping
- settled

【动画顺序】
- top card follows pointer
- threshold decision
- fly out or spring back
- next card promotes
- loop refill

【空间锚点】
- 三层卡片共享中心轴
- Y 偏移按层级递减
- 下层露边保持层级可见

【可访问性】
- 键盘左右切换
- aria-roledescription=carousel
- aria-current 标记当前卡片
- 减少动态时取消旋转和飞出

【验收标准】
- 拖拽 1:1 跟手
- 阈值判断稳定
- 飞出后下层无跳帧补位
- 只剩一张时循环不中断

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/advanced/perspective-carousel.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/advanced/perspective-carousel.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/advanced/perspective-carousel.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "perspective-carousel",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "gesture-interaction",
  "title": "景随图换轮播",
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
      "id": "stacked-card-carousel",
      "name": "卡片层叠轮播",
      "plain_language": "三张卡片以缩放和 Y 轴偏移形成层叠，顶层跟随拖拽并轻微旋转，达到距离或速度阈值后飞出，下层补位。",
      "when_to_use": "需要卡片层级、拖拽跟手、飞出切换和循环补位的移动端轮播",
      "parameters": [
        "scale 0.92/0.96/1",
        "Y 偏移 16/8/0",
        "顶层最大旋转 8°",
        "拖过 1/3 宽度或速度 > 500 触发",
        "spring 280/26",
        "只剩一张时循环补位"
      ],
      "related": [
        "stack-card",
        "stack-card-expand",
        "follow",
        "threshold",
        "snap",
        "velocity-inheritance"
      ],
      "constraints": [
        "未达距离和速度阈值时回弹",
        "顶层飞出后下层平滑补位",
        "快速连滑不叠加旧回调",
        "卡片内容和操作区不能因旋转不可达"
      ],
      "aliases": [
        "卡片层叠轮播",
        "叠卡轮播",
        "卡片堆叠轮播",
        "stacked card carousel"
      ],
      "state_machine": [
        "idle",
        "dragging",
        "projecting",
        "flying-out",
        "promoting",
        "snapping",
        "settled"
      ],
      "animation_sequence": [
        "top card follows pointer",
        "threshold decision",
        "fly out or spring back",
        "next card promotes",
        "loop refill"
      ],
      "spatial_anchor": [
        "三层卡片共享中心轴",
        "Y 偏移按层级递减",
        "下层露边保持层级可见"
      ],
      "accessibility": [
        "键盘左右切换",
        "aria-roledescription=carousel",
        "aria-current 标记当前卡片",
        "减少动态时取消旋转和飞出"
      ],
      "acceptance": [
        "拖拽 1:1 跟手",
        "阈值判断稳定",
        "飞出后下层无跳帧补位",
        "只剩一张时循环不中断"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
