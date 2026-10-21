---
title: "撕线弹出面板"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 撕线弹出面板

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 场景模板

面板顶部用虚线撕口和锯齿 SVG 表达可拖拽边界，下拉跟手映射撕裂进度，超过阈值弹簧展开，未达则回弹。

**适用场景：** 需要通过撕口下拉打开局部面板，并把撕裂感转成可衡量的位移和开口进度

<JargonPrompt id="damped-bottom-sheet--tear-line-panel" />

## 如何把白话说具体

本条目将「需要通过撕口下拉打开局部面板，并把撕裂感转成可衡量的位移和开口进度」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 撕线面板、撕口弹出、tear line panel、阻尼弹性抽屉、damped-bottom-sheet、follow、threshold、snap、interruption、撕线弹出面板、撕口下拉

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 撕线弹出面板

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
撕线弹出面板

【白话解释】
面板顶部用虚线撕口和锯齿 SVG 表达可拖拽边界，下拉跟手映射撕裂进度，超过阈值弹簧展开，未达则回弹。

【适用场景】
需要通过撕口下拉打开局部面板，并把撕裂感转成可衡量的位移和开口进度

【专业参数与锚点】
- 顶部 2px 虚线撕口
- SVG path 锯齿
- 下拉超过 80px 展开
- 展开到 40% 屏高
- spring stiffness 260
- damping 28

【边界与约束】
- 展开时页面禁止滚动
- 快速甩动按释放速度判定
- 中途松手未达阈值必须回弹
- 锯齿开口宽度与拖拽进度 0→1 同步

【交互状态机】
- closed
- dragging
- expanded
- returning

【动画顺序】
- grab tear line
- follow drag
- threshold decision
- spring expand or return

【空间锚点】
- 撕口是唯一拖拽起点
- 面板从顶部边界展开
- 展开高度以视口百分比表达

【可访问性】
- 键盘 Enter/Space 打开
- aria-expanded 表达面板状态
- 减少动态时直接切换并保留抓手提示

【验收标准】
- 跟手位移无延迟
- 80px 阈值稳定
- 未达阈值回弹无跳变
- 展开时不发生背景滚动

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/component-design/damped-bottom-sheet.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/component-design/damped-bottom-sheet.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/component-design/damped-bottom-sheet.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "damped-bottom-sheet",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "component-design",
  "title": "阻尼弹性抽屉",
  "knowledge_type": "template",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "generate-component",
    "spec-component"
  ],
  "entries": [
    {
      "id": "tear-line-panel",
      "name": "撕线弹出面板",
      "plain_language": "面板顶部用虚线撕口和锯齿 SVG 表达可拖拽边界，下拉跟手映射撕裂进度，超过阈值弹簧展开，未达则回弹。",
      "when_to_use": "需要通过撕口下拉打开局部面板，并把撕裂感转成可衡量的位移和开口进度",
      "parameters": [
        "顶部 2px 虚线撕口",
        "SVG path 锯齿",
        "下拉超过 80px 展开",
        "展开到 40% 屏高",
        "spring stiffness 260",
        "damping 28"
      ],
      "related": [
        "damped-bottom-sheet",
        "follow",
        "threshold",
        "snap",
        "interruption"
      ],
      "constraints": [
        "展开时页面禁止滚动",
        "快速甩动按释放速度判定",
        "中途松手未达阈值必须回弹",
        "锯齿开口宽度与拖拽进度 0→1 同步"
      ],
      "aliases": [
        "撕线面板",
        "撕口弹出",
        "tear line panel"
      ],
      "state_machine": [
        "closed",
        "dragging",
        "expanded",
        "returning"
      ],
      "animation_sequence": [
        "grab tear line",
        "follow drag",
        "threshold decision",
        "spring expand or return"
      ],
      "spatial_anchor": [
        "撕口是唯一拖拽起点",
        "面板从顶部边界展开",
        "展开高度以视口百分比表达"
      ],
      "accessibility": [
        "键盘 Enter/Space 打开",
        "aria-expanded 表达面板状态",
        "减少动态时直接切换并保留抓手提示"
      ],
      "acceptance": [
        "跟手位移无延迟",
        "80px 阈值稳定",
        "未达阈值回弹无跳变",
        "展开时不发生背景滚动"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
