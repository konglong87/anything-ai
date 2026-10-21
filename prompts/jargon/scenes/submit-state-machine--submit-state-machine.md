---
title: "提交状态反馈"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 提交状态反馈

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

按钮容器固定，通过状态机切换 loading、success 和 result，避免按钮位移。

**适用场景：** 需要状态切换连续、焦点稳定且避免跳页或突然替换容器的组件

<JargonPrompt id="submit-state-machine--submit-state-machine" />

## 如何把白话说具体

本条目将「需要状态切换连续、焦点稳定且避免跳页或突然替换容器的组件」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 提交状态反馈、state-machine-driven-ui、interruption

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 提交状态反馈

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
提交状态反馈

【白话解释】
按钮容器固定，通过状态机切换 loading、success 和 result，避免按钮位移。

【适用场景】
需要状态切换连续、焦点稳定且避免跳页或突然替换容器的组件

【专业参数与锚点】
- idle → loading → success → result
- 固定按钮宽度
- 只替换内部内容

【边界与约束】
- 动画必须可中断
- 支持 prefers-reduced-motion
- 状态变化不能重复触发回调

【交互状态机】
- idle
- loading
- success
- result

【验收标准】
- 状态切换无跳变
- 快速操作不产生竞态
- 键盘和触摸路径结果一致

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/submit-state-machine.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/continuous/submit-state-machine.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/submit-state-machine.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "submit-state-machine",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "continuous-interaction",
  "title": "提交状态反馈",
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
      "id": "submit-state-machine",
      "name": "提交状态反馈",
      "plain_language": "按钮容器固定，通过状态机切换 loading、success 和 result，避免按钮位移。",
      "when_to_use": "需要状态切换连续、焦点稳定且避免跳页或突然替换容器的组件",
      "parameters": [
        "idle → loading → success → result",
        "固定按钮宽度",
        "只替换内部内容"
      ],
      "related": [
        "state-machine-driven-ui",
        "interruption"
      ],
      "constraints": [
        "动画必须可中断",
        "支持 prefers-reduced-motion",
        "状态变化不能重复触发回调"
      ],
      "aliases": [],
      "state_machine": [
        "idle",
        "loading",
        "success",
        "result"
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
