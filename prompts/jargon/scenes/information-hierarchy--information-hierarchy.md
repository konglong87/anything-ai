---
title: "信息层级"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 信息层级

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 原则

先确定用户要做的决定，再按主次组织标题、数据、操作和辅助说明。

**适用场景：** 复杂后台、内容页和移动端首页

<JargonPrompt id="information-hierarchy--information-hierarchy" />

## 如何把白话说具体

本条目将「复杂后台、内容页和移动端首页」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 信息层级与密度、composition-patterns、token-system、information-hierarchy、有质感、高级感、好看

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 信息层级

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
信息层级

【白话解释】
先确定用户要做的决定，再按主次组织标题、数据、操作和辅助说明。

【适用场景】
复杂后台、内容页和移动端首页

【专业参数与锚点】
- 主任务优先
- 每屏保留一个视觉主角
- 用密度和留白表达层级

【边界与约束】
- 不要用颜色和图标堆叠替代结构

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/information-architecture/information-hierarchy.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/information-architecture/information-hierarchy.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/information-architecture/information-hierarchy.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "information-hierarchy",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "information-architecture",
  "title": "信息层级与密度",
  "knowledge_type": "principle",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-information",
    "audit-information"
  ],
  "entries": [
    {
      "id": "information-hierarchy",
      "name": "信息层级",
      "plain_language": "先确定用户要做的决定，再按主次组织标题、数据、操作和辅助说明。",
      "when_to_use": "复杂后台、内容页和移动端首页",
      "parameters": [
        "主任务优先",
        "每屏保留一个视觉主角",
        "用密度和留白表达层级"
      ],
      "related": [
        "composition-patterns",
        "token-system"
      ],
      "constraints": [
        "不要用颜色和图标堆叠替代结构"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
