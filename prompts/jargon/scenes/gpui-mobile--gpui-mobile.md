---
title: "GPUIX 移动端平台研究"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# GPUIX 移动端平台研究

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 平台研究

移动端支持状态需以官方仓库和版本为准；社区实现不能等同官方支持。

**适用场景：** 用户明确询问指定平台或组件目录

::: warning 适用边界
- 工具专属：原文指定平台；不能推广为所有工具的通用行为。
- 含待核验的外部信息；使用前核验当前官方文档，不视为已验证事实。
:::

<JargonPrompt id="gpui-mobile--gpui-mobile" />

## 如何把白话说具体

本条目将「用户明确询问指定平台或组件目录」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** GPUIX 移动端平台研究、GPUIX、iOS、Android、移动端、gpui-mobile

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# GPUIX 移动端平台研究

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【适用边界】
- 工具专属：原文指定平台；不能推广为所有工具的通用行为。
- 含待核验的外部信息；使用前核验当前官方文档，不视为已验证事实。

【名称】
GPUIX 移动端平台研究

【白话解释】
移动端支持状态需以官方仓库和版本为准；社区实现不能等同官方支持。

【适用场景】
用户明确询问指定平台或组件目录

【专业参数与锚点】
- iOS/Metal
- Android/Vulkan 或 GL
- 触摸、软键盘、安全区

【边界与约束】
- 必须标注 provider-specific
- 检索时优先官方来源
- verified_at 未设置时不得当作确定事实

【scope】
provider-specific

【不得泛化】
是

【已核验日期】
未提供 / 待核验

【需要核验】
是

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/platform-research/gpui-mobile.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/platform-research/gpui-mobile.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/platform-research/gpui-mobile.json)
- [index/runtime.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/index/runtime.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "gpui-mobile",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "3d-web-interface",
  "title": "GPUIX 移动端平台研究",
  "knowledge_type": "platform-research",
  "scope": "provider-specific",
  "status": "published",
  "intent_ids": [
    "compare-platform",
    "choose-renderer"
  ],
  "do_not_generalize": true,
  "verified_at": null,
  "verification_required": true,
  "entries": [
    {
      "id": "gpui-mobile",
      "name": "GPUIX 移动端平台研究",
      "plain_language": "移动端支持状态需以官方仓库和版本为准；社区实现不能等同官方支持。",
      "when_to_use": "用户明确询问指定平台或组件目录",
      "parameters": [
        "iOS/Metal",
        "Android/Vulkan 或 GL",
        "触摸、软键盘、安全区"
      ],
      "related": [],
      "constraints": [
        "必须标注 provider-specific",
        "检索时优先官方来源",
        "verified_at 未设置时不得当作确定事实"
      ],
      "aliases": []
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
