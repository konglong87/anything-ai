---
title: "搜索框展开"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 搜索框展开

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

图标与输入框共用容器，展开后自动聚焦，关闭时沿原路径收回。

**适用场景：** 需要状态切换连续、焦点稳定且避免跳页或突然替换容器的组件

<JargonPrompt id="search-expand--search-expand" />

## 如何把白话说具体

本条目将「需要状态切换连续、焦点稳定且避免跳页或突然替换容器的组件」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 搜索框展开、focus-continuity、same-container-transition

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 搜索框展开

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
搜索框展开

【白话解释】
图标与输入框共用容器，展开后自动聚焦，关闭时沿原路径收回。

【适用场景】
需要状态切换连续、焦点稳定且避免跳页或突然替换容器的组件

【专业参数与锚点】
- transform-origin: left
- focus 延迟 80–120ms
- 图标淡出
- 关闭后焦点返回触发器

【边界与约束】
- 动画必须可中断
- 支持 prefers-reduced-motion
- 状态变化不能重复触发回调

【交互状态机】
- idle
- expanded
- closing

【验收标准】
- 状态切换无跳变
- 快速操作不产生竞态
- 键盘和触摸路径结果一致

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/search-expand.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/continuous/search-expand.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/search-expand.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "search-expand",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "continuous-interaction",
  "title": "搜索框展开",
  "knowledge_type": "pattern",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-continuous",
    "implement-continuous",
    "audit-continuous"
  ],
  "entries": [
    {
      "id": "search-expand",
      "name": "搜索框展开",
      "plain_language": "图标与输入框共用容器，展开后自动聚焦，关闭时沿原路径收回。",
      "when_to_use": "需要状态切换连续、焦点稳定且避免跳页或突然替换容器的组件",
      "parameters": [
        "transform-origin: left",
        "focus 延迟 80–120ms",
        "图标淡出",
        "关闭后焦点返回触发器"
      ],
      "related": [
        "focus-continuity",
        "same-container-transition"
      ],
      "constraints": [
        "动画必须可中断",
        "支持 prefers-reduced-motion",
        "状态变化不能重复触发回调"
      ],
      "aliases": [],
      "state_machine": [
        "idle",
        "expanded",
        "closing"
      ],
      "acceptance": [
        "状态切换无跳变",
        "快速操作不产生竞态",
        "键盘和触摸路径结果一致"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
