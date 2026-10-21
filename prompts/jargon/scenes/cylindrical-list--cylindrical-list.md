---
title: "圆柱卷收列表"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 圆柱卷收列表

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

根据列表项距视区中心的距离插值旋转、缩放、亮度和透明度，让中心项突出、边缘项自然卷入。

**适用场景：** 需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本

<JargonPrompt id="cylindrical-list--cylindrical-list" />

## 如何把白话说具体

本条目将「需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 圆柱卷收列表、performance-budget、progressive-degradation、reduced-motion、圆柱卷收、cylindrical list、rotateX/rotateY、scale、cylindrical-list

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 圆柱卷收列表

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
圆柱卷收列表

【白话解释】
根据列表项距视区中心的距离插值旋转、缩放、亮度和透明度，让中心项突出、边缘项自然卷入。

【适用场景】
需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本

【专业参数与锚点】
- rotateX/rotateY
- scale
- opacity
- 中心距离
- scroll snap

【边界与约束】
- 动效必须可中断
- 优先 transform/opacity
- 不得以视觉效果掩盖可读性

【性能预算】
- 中心项必须保持清晰可读
- 旋转角度随距离连续变化
- 滚动停止后再交给 snap 接管

【回退路径】
- 不支持 3D 时退化为缩放和透明度
- 低端设备关闭实时滤镜

【移动端降级】
- 移动端限制透视深度和可见项数量
- 虚拟列表避免为不可见项计算变换

【减少动态效果】
- 减少动态时保留中心突出，不播放卷收路径

【验收标准】
- 滚动或拖拽保持 60fps 目标
- 降级后主任务仍可完成
- 视觉层不影响文本对比度

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/visual-effects/cylindrical-list.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/visual-effects/cylindrical-list.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/visual-effects/cylindrical-list.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "cylindrical-list",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "visual-effects",
  "title": "圆柱卷收列表",
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
      "id": "cylindrical-list",
      "name": "圆柱卷收列表",
      "plain_language": "根据列表项距视区中心的距离插值旋转、缩放、亮度和透明度，让中心项突出、边缘项自然卷入。",
      "when_to_use": "需要有视觉表现但必须同时控制 GPU、移动端和减少动态成本",
      "parameters": [
        "rotateX/rotateY",
        "scale",
        "opacity",
        "中心距离",
        "scroll snap"
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
        "中心项必须保持清晰可读",
        "旋转角度随距离连续变化",
        "滚动停止后再交给 snap 接管"
      ],
      "fallback": [
        "不支持 3D 时退化为缩放和透明度",
        "低端设备关闭实时滤镜"
      ],
      "mobile_degradation": [
        "移动端限制透视深度和可见项数量",
        "虚拟列表避免为不可见项计算变换"
      ],
      "reduced_motion": [
        "减少动态时保留中心突出，不播放卷收路径"
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
