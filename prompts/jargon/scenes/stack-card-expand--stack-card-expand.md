---
title: "叠卡展开"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 叠卡展开

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 实现技巧

叠放卡片点击或下滑后扇出成完整铺排，再沿原空间路径叠回，展开期间锁定下方卡片误触。

**适用场景：** 用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时

<JargonPrompt id="stack-card-expand--stack-card-expand" />

## 如何把白话说具体

本条目将「用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 叠卡展开、stack card expand、follow、snap、interruption、reduced-motion、卡片铺开、卡片扇出、卡片叠回、stack-card-expand、顺滑、流畅、丝滑

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 叠卡展开

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
叠卡展开

【白话解释】
叠放卡片点击或下滑后扇出成完整铺排，再沿原空间路径叠回，展开期间锁定下方卡片误触。

【适用场景】
用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时

【专业参数与锚点】
- Y 轴位移按卡片间距递增
- 旋转角度按扇出方向分配
- 缩放比例逐层收敛到 1
- Z 轴层级从前到后重排
- 展开/收回使用同一锚点

【边界与约束】
- 避免生硬切换
- 动画顺序必须可验证
- 必须支持中断和反向回退

【交互状态机】
- collapsed stack
- fan out
- content reveal
- expanded layout
- reverse stack

【动画顺序】
- collapsed stack
- fan out
- content reveal
- expanded layout
- reverse stack

【空间锚点】
- 首张卡片作为展开原点
- 卡片沿预设扇形或垂直轨迹排列
- 每张卡片保留可点击区域
- 关闭时回到原重叠位置

【可访问性】
- 键盘 Enter/Space 展开
- aria-expanded 表达状态
- 减少动态时直接切换布局但保留层级

【验收标准】
- 展开前后首张卡位置连续
- 卡片不互相遮挡关键内容
- 展开期间下层卡片不可误触
- 关闭沿原路回叠

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/stack-card-expand.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/interaction/continuous/stack-card-expand.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/interaction/continuous/stack-card-expand.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "stack-card-expand",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "continuous-interaction",
  "title": "叠卡展开",
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
      "id": "stack-card-expand",
      "name": "叠卡展开",
      "plain_language": "叠放卡片点击或下滑后扇出成完整铺排，再沿原空间路径叠回，展开期间锁定下方卡片误触。",
      "when_to_use": "用户用自然语言描述联动、叠卡、吸附画线或圆形转场的感觉时",
      "parameters": [
        "Y 轴位移按卡片间距递增",
        "旋转角度按扇出方向分配",
        "缩放比例逐层收敛到 1",
        "Z 轴层级从前到后重排",
        "展开/收回使用同一锚点"
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
        "叠卡展开",
        "stack card expand"
      ],
      "state_machine": [
        "collapsed stack",
        "fan out",
        "content reveal",
        "expanded layout",
        "reverse stack"
      ],
      "animation_sequence": [
        "collapsed stack",
        "fan out",
        "content reveal",
        "expanded layout",
        "reverse stack"
      ],
      "spatial_anchor": [
        "首张卡片作为展开原点",
        "卡片沿预设扇形或垂直轨迹排列",
        "每张卡片保留可点击区域",
        "关闭时回到原重叠位置"
      ],
      "accessibility": [
        "键盘 Enter/Space 展开",
        "aria-expanded 表达状态",
        "减少动态时直接切换布局但保留层级"
      ],
      "acceptance": [
        "展开前后首张卡位置连续",
        "卡片不互相遮挡关键内容",
        "展开期间下层卡片不可误触",
        "关闭沿原路回叠"
      ]
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
