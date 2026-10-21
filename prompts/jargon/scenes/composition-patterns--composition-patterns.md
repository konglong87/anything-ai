---
title: "卡片错位/大图主导/非对称/层叠/留白/破格出血"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 卡片错位/大图主导/非对称/层叠/留白/破格出血

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

用比例、层级和安全区建立页面性格；每次只让少数元素破格。

**适用场景：** 首屏、活动页、详情页和内容信息流

<JargonPrompt id="composition-patterns--composition-patterns" />

## 如何把白话说具体

本条目将「首屏、活动页、详情页和内容信息流」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 高级布局六式、layout-patterns、design-tokens、composition-patterns、有质感、高级感、好看

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 卡片错位/大图主导/非对称/层叠/留白/破格出血

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
卡片错位/大图主导/非对称/层叠/留白/破格出血

【白话解释】
用比例、层级和安全区建立页面性格；每次只让少数元素破格。

【适用场景】
首屏、活动页、详情页和内容信息流

【专业参数与锚点】
- 错位按 8/12/16px 节奏
- 主图可占半屏或出血
- 使用 7:3 或 8:2 非对称
- 只破一处网格，内容留在安全区

【边界与约束】
- 错位无规律会像未对齐
- 出血过多会削弱秩序
- 留白必须仍有视觉焦点

【scope】
general

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/visual-layout/composition-patterns.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/visual-layout/composition-patterns.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/visual-layout/composition-patterns.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "composition-patterns",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "visual-layout",
  "title": "高级布局六式",
  "knowledge_type": "pattern",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-layout",
    "audit-layout"
  ],
  "entries": [
    {
      "id": "composition-patterns",
      "name": "卡片错位/大图主导/非对称/层叠/留白/破格出血",
      "plain_language": "用比例、层级和安全区建立页面性格；每次只让少数元素破格。",
      "when_to_use": "首屏、活动页、详情页和内容信息流",
      "parameters": [
        "错位按 8/12/16px 节奏",
        "主图可占半屏或出血",
        "使用 7:3 或 8:2 非对称",
        "只破一处网格，内容留在安全区"
      ],
      "related": [
        "layout-patterns",
        "design-tokens"
      ],
      "constraints": [
        "错位无规律会像未对齐",
        "出血过多会削弱秩序",
        "留白必须仍有视觉焦点"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
