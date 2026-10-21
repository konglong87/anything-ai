---
title: "景深分层滚动"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 景深分层滚动

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

把内容拆为前、中、后三层，按滚动进度驱动不同速度、模糊和亮度，形成可控景深。

**适用场景：** 需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本

<JargonPrompt id="depth-layer-scroll--depth-layer-scroll" />

## 如何把白话说具体

本条目将「需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 景深分层滚动、performance-budget、progressive-degradation、reduced-motion

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 景深分层滚动

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
景深分层滚动

【白话解释】
把内容拆为前、中、后三层，按滚动进度驱动不同速度、模糊和亮度，形成可控景深。

【适用场景】
需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本

【专业参数与锚点】
- scroll progress
- translateY
- blur/brightness
- lerp

【边界与约束】
- 动效必须可中断
- 优先 transform/opacity
- 不得以视觉效果掩盖可读性

【性能预算】
- 后层速度更慢且更模糊
- 前层速度更快且更清晰
- 只动画 transform 和 opacity

【回退路径】
- 不支持滤镜时只保留位移层级
- 滚动性能不足时关闭实时 blur

【移动端降级】
- 移动端减少层数至两层
- 使用 requestAnimationFrame 合并滚动采样

【减少动态效果】
- 减少动态时取消视差和模糊变化，保留静态层级

【验收标准】
- 滚动或拖拽保持 60fps 目标
- 降级后主任务仍可完成
- 视觉层不影响文本对比度

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/visual-effects/depth-layer-scroll.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/visual-effects/depth-layer-scroll.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/visual-effects/depth-layer-scroll.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "depth-layer-scroll",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "visual-effects",
  "title": "景深分层滚动",
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
      "id": "depth-layer-scroll",
      "name": "景深分层滚动",
      "plain_language": "把内容拆为前、中、后三层，按滚动进度驱动不同速度、模糊和亮度，形成可控景深。",
      "when_to_use": "需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本",
      "parameters": [
        "scroll progress",
        "translateY",
        "blur/brightness",
        "lerp"
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
        "后层速度更慢且更模糊",
        "前层速度更快且更清晰",
        "只动画 transform 和 opacity"
      ],
      "fallback": [
        "不支持滤镜时只保留位移层级",
        "滚动性能不足时关闭实时 blur"
      ],
      "mobile_degradation": [
        "移动端减少层数至两层",
        "使用 requestAnimationFrame 合并滚动采样"
      ],
      "reduced_motion": [
        "减少动态时取消视差和模糊变化，保留静态层级"
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
