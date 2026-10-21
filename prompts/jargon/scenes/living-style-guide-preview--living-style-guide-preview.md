---
title: "Light/Dark 活样式指南"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# Light/Dark 活样式指南

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 规范

用可直接打开的预览把色板、字体层级、组件状态和设计令牌映射到真实页面效果。

**适用场景：** 需要让设计评审和 AI 在写代码前先确认视觉方向

::: warning 适用边界
- 含待核验的外部信息；使用前核验当前官方文档，不视为已验证事实。
:::

<JargonPrompt id="living-style-guide-preview--living-style-guide-preview" />

## 如何把白话说具体

本条目将「需要让设计评审和 AI 在写代码前先确认视觉方向」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** 设计系统活样式预览、design-tokens、dashboard-style-system、accessibility、活样式指南、Light、Dark、设计系统、预览、token、living-style-guide-preview、有质感、高级感、好看

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# Light/Dark 活样式指南

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【适用边界】
- 含待核验的外部信息；使用前核验当前官方文档，不视为已验证事实。

【名称】
Light/Dark 活样式指南

【白话解释】
用可直接打开的预览把色板、字体层级、组件状态和设计令牌映射到真实页面效果。

【适用场景】
需要让设计评审和 AI 在写代码前先确认视觉方向

【专业参数与锚点】
- Light/Dark 双主题
- 色板与语义色
- 字体排印层级
- 按钮/输入框/卡片
- hover/click/disabled
- token 到页面效果映射

【边界与约束】
- 预览状态必须可复现
- 颜色不能是唯一状态表达
- 外部预览站和品牌资料保持待核验标记

【核验清单】
- 色板、排印、组件状态齐全
- 浅色和深色对比度通过
- 交互状态与 token 一致
- 截图或浏览器验收后再发布

【外部参考（需核验）】
- kind：preview-site
  状态：pending-verification
  url：https://awesome-design-md-preview.vercel.app

【已核验日期】
未提供 / 待核验

【需要核验】
是

【scope】
general

【已核验日期】
未提供 / 待核验

【需要核验】
是

【外部参考政策】
外部预览资源只作待核验线索，不作为运行时事实

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/design-system/living-style-guide-preview.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/design-system/living-style-guide-preview.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/design-system/living-style-guide-preview.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "living-style-guide-preview",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "design-system",
  "title": "设计系统活样式预览",
  "knowledge_type": "guideline",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "build-design-system",
    "preview-design-system",
    "audit-design-system"
  ],
  "verification_required": true,
  "verified_at": null,
  "external_reference_policy": "外部预览资源只作待核验线索，不作为运行时事实",
  "entries": [
    {
      "id": "living-style-guide-preview",
      "name": "Light/Dark 活样式指南",
      "plain_language": "用可直接打开的预览把色板、字体层级、组件状态和设计令牌映射到真实页面效果。",
      "when_to_use": "需要让设计评审和 AI 在写代码前先确认视觉方向",
      "parameters": [
        "Light/Dark 双主题",
        "色板与语义色",
        "字体排印层级",
        "按钮/输入框/卡片",
        "hover/click/disabled",
        "token 到页面效果映射"
      ],
      "related": [
        "design-tokens",
        "dashboard-style-system",
        "accessibility"
      ],
      "constraints": [
        "预览状态必须可复现",
        "颜色不能是唯一状态表达",
        "外部预览站和品牌资料保持待核验标记"
      ],
      "aliases": [],
      "verification_checklist": [
        "色板、排印、组件状态齐全",
        "浅色和深色对比度通过",
        "交互状态与 token 一致",
        "截图或浏览器验收后再发布"
      ],
      "external_references": [
        {
          "kind": "preview-site",
          "status": "pending-verification",
          "url": "https://awesome-design-md-preview.vercel.app"
        }
      ],
      "verified_at": null,
      "verification_required": true
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
