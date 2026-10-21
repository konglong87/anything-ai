---
title: "吸边悬浮球"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 吸边悬浮球

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

毛玻璃悬浮球跟手拖拽，释放后吸附到最近左右边缘，闲置后缩成半透明贴边状态。

**适用场景：** 需要可移动的悬浮入口，同时避免遮挡底部 Tab 和安全区内容

<JargonPrompt id="edge-docked-fab--edge-docked-fab" />

## 如何把白话说具体

本条目将「需要可移动的悬浮入口，同时避免遮挡底部 Tab 和安全区内容」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 吸边悬浮球、贴边悬浮按钮、edge docked fab、follow、velocity-inheritance、snap、interruption

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 吸边悬浮球

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
吸边悬浮球

【白话解释】
毛玻璃悬浮球跟手拖拽，释放后吸附到最近左右边缘，闲置后缩成半透明贴边状态。

【适用场景】
需要可移动的悬浮入口，同时避免遮挡底部 Tab 和安全区内容

【专业参数与锚点】
- 56px 圆球
- 0.02 惯性
- 距边 12px
- spring 300/30
- 无操作 3s 后缩小
- 滚动时 opacity 0.4
- 停止滚动 400ms 恢复
- 垂直位置限制在安全区

【边界与约束】
- 拖拽不能穿出安全区
- 吸附后仍保留可点击面积
- 页面滚动时不能遮挡底部 Tab
- 组件卸载时清理滚动监听和恢复定时器

【交互状态机】
- idle
- dragging
- snapping
- docked
- shrunk
- restoring

【动画顺序】
- follow pointer
- project release velocity
- snap to nearest edge
- shrink after idle
- restore after scroll

【空间锚点】
- 左右边缘为吸附锚点
- 距边 12px
- 垂直范围避开安全区和底部 Tab

【可访问性】
- 键盘焦点可达
- 方向键移动或提供设置入口替代拖拽
- aria-label 描述悬浮入口
- 减少动态时取消缩小和惯性

【验收标准】
- 拖拽 1:1 跟手
- 释放后稳定吸边
- 滚动透明度反馈及时
- 不遮挡关键导航
- 快速拖拽不产生双重吸附

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/advanced/edge-docked-fab.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/advanced/edge-docked-fab.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/advanced/edge-docked-fab.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "edge-docked-fab",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "gesture-interaction",
  "title": "吸边悬浮球",
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
      "id": "edge-docked-fab",
      "name": "吸边悬浮球",
      "plain_language": "毛玻璃悬浮球跟手拖拽，释放后吸附到最近左右边缘，闲置后缩成半透明贴边状态。",
      "when_to_use": "需要可移动的悬浮入口，同时避免遮挡底部 Tab 和安全区内容",
      "parameters": [
        "56px 圆球",
        "0.02 惯性",
        "距边 12px",
        "spring 300/30",
        "无操作 3s 后缩小",
        "滚动时 opacity 0.4",
        "停止滚动 400ms 恢复",
        "垂直位置限制在安全区"
      ],
      "related": [
        "follow",
        "velocity-inheritance",
        "snap",
        "interruption"
      ],
      "constraints": [
        "拖拽不能穿出安全区",
        "吸附后仍保留可点击面积",
        "页面滚动时不能遮挡底部 Tab",
        "组件卸载时清理滚动监听和恢复定时器"
      ],
      "aliases": [
        "吸边悬浮球",
        "贴边悬浮按钮",
        "edge docked fab"
      ],
      "state_machine": [
        "idle",
        "dragging",
        "snapping",
        "docked",
        "shrunk",
        "restoring"
      ],
      "animation_sequence": [
        "follow pointer",
        "project release velocity",
        "snap to nearest edge",
        "shrink after idle",
        "restore after scroll"
      ],
      "spatial_anchor": [
        "左右边缘为吸附锚点",
        "距边 12px",
        "垂直范围避开安全区和底部 Tab"
      ],
      "accessibility": [
        "键盘焦点可达",
        "方向键移动或提供设置入口替代拖拽",
        "aria-label 描述悬浮入口",
        "减少动态时取消缩小和惯性"
      ],
      "acceptance": [
        "拖拽 1:1 跟手",
        "释放后稳定吸边",
        "滚动透明度反馈及时",
        "不遮挡关键导航",
        "快速拖拽不产生双重吸附"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
