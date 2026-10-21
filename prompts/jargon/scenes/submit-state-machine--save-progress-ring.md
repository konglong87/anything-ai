---
title: "保存按钮变进度环"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 保存按钮变进度环

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

胶囊保存按钮点击后收缩为正圆，文字淡出并在同一容器内绘制进度环，完成后画勾并展开为已保存。

**适用场景：** 保存、上传或提交操作需要把进行中、完成和结果连续表达在同一按钮内

<JargonPrompt id="submit-state-machine--save-progress-ring" />

## 如何把白话说具体

本条目将「保存、上传或提交操作需要把进行中、完成和结果连续表达在同一按钮内」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 保存按钮进度环、保存转进度、save progress ring、提交状态反馈、draw-success、progress-feedback、interruption

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 保存按钮变进度环

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
保存按钮变进度环

【白话解释】
胶囊保存按钮点击后收缩为正圆，文字淡出并在同一容器内绘制进度环，完成后画勾并展开为已保存。

【适用场景】
保存、上传或提交操作需要把进行中、完成和结果连续表达在同一按钮内

【专业参数与锚点】
- 按钮 120×44、圆角 22
- 收缩到 44×44
- 文字淡出 240ms ease-out
- 进度环 1.2s linear
- stroke 3、round cap
- 完成勾选 200ms
- 已保存展开 300ms spring

【边界与约束】
- 进行中禁用重复点击
- 中途取消必须清理进度动画和回调
- 按钮宽度变化不能造成周围布局跳动
- 减少动态时保留进行中与完成状态

【交互状态机】
- idle
- saving
- progress-ring
- success-check
- saved
- cancelled

【动画顺序】
- capsule to circle
- label fade out
- ring draw
- check draw
- expand to saved

【空间锚点】
- 进度环沿按钮外圈绘制
- 勾选与圆环共享中心
- 文字恢复在原容器内

【可访问性】
- 键盘 Enter/Space 触发
- aria-busy 表达保存中
- 完成状态通过 aria-live=polite 通知

【验收标准】
- 保存中只触发一次
- 取消后可再次保存
- 进度环不提前完成
- 完成后按钮回到可读结果

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
      "id": "save-progress-ring",
      "name": "保存按钮变进度环",
      "plain_language": "胶囊保存按钮点击后收缩为正圆，文字淡出并在同一容器内绘制进度环，完成后画勾并展开为已保存。",
      "when_to_use": "保存、上传或提交操作需要把进行中、完成和结果连续表达在同一按钮内",
      "parameters": [
        "按钮 120×44、圆角 22",
        "收缩到 44×44",
        "文字淡出 240ms ease-out",
        "进度环 1.2s linear",
        "stroke 3、round cap",
        "完成勾选 200ms",
        "已保存展开 300ms spring"
      ],
      "related": [
        "draw-success",
        "progress-feedback",
        "interruption"
      ],
      "constraints": [
        "进行中禁用重复点击",
        "中途取消必须清理进度动画和回调",
        "按钮宽度变化不能造成周围布局跳动",
        "减少动态时保留进行中与完成状态"
      ],
      "aliases": [
        "保存按钮进度环",
        "保存转进度",
        "save progress ring"
      ],
      "state_machine": [
        "idle",
        "saving",
        "progress-ring",
        "success-check",
        "saved",
        "cancelled"
      ],
      "animation_sequence": [
        "capsule to circle",
        "label fade out",
        "ring draw",
        "check draw",
        "expand to saved"
      ],
      "spatial_anchor": [
        "进度环沿按钮外圈绘制",
        "勾选与圆环共享中心",
        "文字恢复在原容器内"
      ],
      "accessibility": [
        "键盘 Enter/Space 触发",
        "aria-busy 表达保存中",
        "完成状态通过 aria-live=polite 通知"
      ],
      "acceptance": [
        "保存中只触发一次",
        "取消后可再次保存",
        "进度环不提前完成",
        "完成后按钮回到可读结果"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
