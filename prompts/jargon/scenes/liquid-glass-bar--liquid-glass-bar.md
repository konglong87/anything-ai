---
title: "液态玻璃栏"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 液态玻璃栏

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

固定导航使用背景模糊、轻微折射和随滚动位移的高光，底色与文字对比度随背景亮度平滑调整。

**适用场景：** 需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本

<JargonPrompt id="liquid-glass-bar--liquid-glass-bar" />

## 如何把白话说具体

本条目将「需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 液态玻璃栏、performance-budget、progressive-degradation、reduced-motion、liquid glass bar、backdrop-filter、SVG displacement、liquid-glass-bar

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 液态玻璃栏

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
液态玻璃栏

【白话解释】
固定导航使用背景模糊、轻微折射和随滚动位移的高光，底色与文字对比度随背景亮度平滑调整。

【适用场景】
需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本

【专业参数与锚点】
- backdrop-filter
- SVG displacement
- 高光层
- 亮度采样
- scroll-driven animation

【边界与约束】
- 动效必须可中断
- 优先 transform/opacity
- 不得以视觉效果掩盖可读性

【性能预算】
- 桌面端优先使用 GPU 合成
- 高光和折射必须限制在导航区域
- 文字对比度持续满足可读性

【回退路径】
- 不支持 backdrop-filter 时退化为不透明底色
- 低端设备关闭折射只保留模糊或纯色

【移动端降级】
- 移动端降低模糊半径
- 滚动中避免逐帧读取布局

【减少动态效果】
- prefers-reduced-motion 下停用高光流动，保留静态玻璃层

【验收标准】
- 滚动或拖拽保持 60fps 目标
- 降级后主任务仍可完成
- 视觉层不影响文本对比度

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/visual-effects/liquid-glass-bar.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/visual-effects/liquid-glass-bar.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/visual-effects/liquid-glass-bar.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "liquid-glass-bar",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "visual-effects",
  "title": "液态玻璃栏",
  "knowledge_type": "technique",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-visual-effect",
    "implement-visual-effect",
    "audit-performance"
  ],
  "entries": [
    {
      "id": "liquid-glass-bar",
      "name": "液态玻璃栏",
      "plain_language": "固定导航使用背景模糊、轻微折射和随滚动位移的高光，底色与文字对比度随背景亮度平滑调整。",
      "when_to_use": "需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本",
      "parameters": [
        "backdrop-filter",
        "SVG displacement",
        "高光层",
        "亮度采样",
        "scroll-driven animation"
      ],
      "related": [
        "performance-budget",
        "progressive-degradation",
        "reduced-motion"
      ],
      "constraints": [
        "动效必须可中断",
        "优先 transform/opacity",
        "不得以视觉效果掩盖可读性"
      ],
      "aliases": [],
      "performance_budget": [
        "桌面端优先使用 GPU 合成",
        "高光和折射必须限制在导航区域",
        "文字对比度持续满足可读性"
      ],
      "fallback": [
        "不支持 backdrop-filter 时退化为不透明底色",
        "低端设备关闭折射只保留模糊或纯色"
      ],
      "mobile_degradation": [
        "移动端降低模糊半径",
        "滚动中避免逐帧读取布局"
      ],
      "reduced_motion": [
        "prefers-reduced-motion 下停用高光流动，保留静态玻璃层"
      ],
      "acceptance": [
        "滚动或拖拽保持 60fps 目标",
        "降级后主任务仍可完成",
        "视觉层不影响文本对比度"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
