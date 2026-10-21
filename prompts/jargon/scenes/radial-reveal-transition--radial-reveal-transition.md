---
title: "圆形扩散转场"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 圆形扩散转场

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

从真实点击位置捕获圆心，以 clip-path circle 扩散覆盖屏幕，完全覆盖后再显示新页面内容。

**适用场景：** 用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时

<JargonPrompt id="radial-reveal-transition--radial-reveal-transition" />

## 如何把白话说具体

本条目将「用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 圆形扩散转场、radial reveal transition、follow、snap、interruption、reduced-motion

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 圆形扩散转场

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
圆形扩散转场

【白话解释】
从真实点击位置捕获圆心，以 clip-path circle 扩散覆盖屏幕，完全覆盖后再显示新页面内容。

【适用场景】
用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时

【专业参数与锚点】
- 捕获 pointer x/y
- 最大半径覆盖最远屏幕角
- 扩散 duration 300–500ms
- easing ease-out
- 新页面在覆盖完成后进入

【边界与约束】
- 避免生硬切换
- 动画顺序必须可验证
- 必须支持中断和反向回退

【交互状态机】
- capture origin
- circle expand
- screen covered
- new content enter
- settled
- reverse on back

【动画顺序】
- capture origin
- circle expand
- screen covered
- new content enter
- settled
- reverse on back

【空间锚点】
- 圆心等于触点坐标
- 半径取触点到最远角距离
- 新旧页面共享同一转场层
- 返回时沿反向路径收回

【可访问性】
- 键盘触发使用按钮中心作为安全圆心
- 焦点在新页面可交互后移动
- prefers-reduced-motion 时取消扩散但保留状态切换

【验收标准】
- 圆心不偏离触点
- 覆盖完成前不暴露新旧页面混合帧
- 返回操作可逆
- 视口变化时重新计算最大半径

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/radial-reveal-transition.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/continuous/radial-reveal-transition.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/radial-reveal-transition.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "radial-reveal-transition",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "continuous-interaction",
  "title": "圆形扩散转场",
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
      "id": "radial-reveal-transition",
      "name": "圆形扩散转场",
      "plain_language": "从真实点击位置捕获圆心，以 clip-path circle 扩散覆盖屏幕，完全覆盖后再显示新页面内容。",
      "when_to_use": "用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时",
      "parameters": [
        "捕获 pointer x/y",
        "最大半径覆盖最远屏幕角",
        "扩散 duration 300–500ms",
        "easing ease-out",
        "新页面在覆盖完成后进入"
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
        "圆形扩散转场",
        "radial reveal transition"
      ],
      "state_machine": [
        "capture origin",
        "circle expand",
        "screen covered",
        "new content enter",
        "settled",
        "reverse on back"
      ],
      "animation_sequence": [
        "capture origin",
        "circle expand",
        "screen covered",
        "new content enter",
        "settled",
        "reverse on back"
      ],
      "spatial_anchor": [
        "圆心等于触点坐标",
        "半径取触点到最远角距离",
        "新旧页面共享同一转场层",
        "返回时沿反向路径收回"
      ],
      "accessibility": [
        "键盘触发使用按钮中心作为安全圆心",
        "焦点在新页面可交互后移动",
        "prefers-reduced-motion 时取消扩散但保留状态切换"
      ],
      "acceptance": [
        "圆心不偏离触点",
        "覆盖完成前不暴露新旧页面混合帧",
        "返回操作可逆",
        "视口变化时重新计算最大半径"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
