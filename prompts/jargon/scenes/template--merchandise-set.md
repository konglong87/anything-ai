---
title: "周边整合"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 周边整合

[专业提示词库](../README.md) / [AI/AIGC/元技能](/prompts/jargon/domains/ai-aigc-meta-skills.html) / 场景模板

生成统一 IP 的文创周边整套陈列效果图

**适用场景：** 生成统一 IP 的文创周边整套陈列效果图

::: warning 适用边界
- 这是原始结构化模板的可读展开版；工具参数保留原文，使用前请核验目标工具的支持情况。
:::

<JargonPrompt id="template--merchandise-set" />

## 如何把白话说具体

本条目将「生成统一 IP 的文创周边整套陈列效果图」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** merchandise-set

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 周边整合

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【适用边界】
- 这是原始结构化模板的可读展开版；工具参数保留原文，使用前请核验目标工具的支持情况。

【基础角色设定（已展开依赖）】
【名称】
珠光浅蓝 Q 版小胖恐龙

【说明】
亮面珠光浅蓝 Q 版小胖恐龙，圆润身形，米白色肚皮与背刺，黑色大圆眼睛，粉嘟嘟圆形腮红，弯弯微笑小嘴，简约治愈卡通形象，马卡龙浅蓝与奶白柔和配色。

【角色一致性】
- 保持体型、头身比例、眼睛大小、腮红位置、背刺数量和核心配色一致
- 不得改变角色年龄感、体型和基础表情气质
- 不得增加写实恐龙特征、尖牙、锋利爪子或攻击性造型
- 不得出现额外肢体、比例失衡、颜色漂移或重复角色

【负面约束】
- 写实恐龙
- 尖牙
- 锋利爪子
- 攻击性表情
- 身体变形
- 额外肢体
- 颜色漂移
- 重复角色
- 模糊
- 低清晰度

【必要输入】
参考图说明（请在目标 AI 中另行上传图片）：[待填写：参考图说明（请在目标 AI 中另行上传图片）]

【目标】
生成统一 IP 的文创周边整套陈列效果图

【提示词模块】
主体：
  - 亮面珠光浅蓝 Q 版小胖恐龙，圆润身形，米白色肚皮与背刺，黑色大圆眼睛，粉嘟嘟圆形腮红，弯弯微笑小嘴，简约治愈卡通形象，马卡龙浅蓝与奶白柔和配色。
构图：
  - 钥匙扣、胶带、徽章、卡片、手办和立牌
  - 分区陈列
  - 材质区分清晰
  - 商业品牌 IP 延展效果图
材质：

光线：
  - 柔和均匀的商业棚拍光线
质量：
  - 高细节
  - 清晰边缘
  - 统一比例
边界与约束：
  - 保持体型、头身比例、眼睛大小、腮红位置、背刺数量和核心配色一致
  - 不得改变角色年龄感、体型和基础表情气质
  - 不得增加写实恐龙特征、尖牙、锋利爪子或攻击性造型
  - 不得出现额外肢体、比例失衡、颜色漂移或重复角色

【画幅比例】
16:9

【负面约束】
- 写实恐龙
- 尖牙
- 锋利爪子
- 攻击性表情
- 身体变形
- 额外肢体
- 颜色漂移
- 重复角色
- 模糊
- 低清晰度

【工具适配】
通用（不绑定工具）
【工具参数】
画幅比例 16:9，高质量商业效果图

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/templates/aigc/merchandise-set.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [templates/aigc/merchandise-set.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/templates/aigc/merchandise-set.json)
- [templates/aigc/base-ip.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/templates/aigc/base-ip.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "scene_id": "merchandise-set",
  "name": "周边整合",
  "purpose": "生成统一 IP 的文创周边整套陈列效果图",
  "required_inputs": [
    "reference_image"
  ],
  "base_ip_ref": "templates/aigc/base-ip.json",
  "prompt_blocks": {
    "subject": [
      "亮面珠光浅蓝 Q 版小胖恐龙，圆润身形，米白色肚皮与背刺，黑色大圆眼睛，粉嘟嘟圆形腮红，弯弯微笑小嘴，简约治愈卡通形象，马卡龙浅蓝与奶白柔和配色。"
    ],
    "composition": [
      "钥匙扣、胶带、徽章、卡片、手办和立牌",
      "分区陈列",
      "材质区分清晰",
      "商业品牌 IP 延展效果图"
    ],
    "material": [],
    "lighting": [
      "柔和均匀的商业棚拍光线"
    ],
    "quality": [
      "高细节",
      "清晰边缘",
      "统一比例"
    ],
    "constraints": [
      "保持体型、头身比例、眼睛大小、腮红位置、背刺数量和核心配色一致",
      "不得改变角色年龄感、体型和基础表情气质",
      "不得增加写实恐龙特征、尖牙、锋利爪子或攻击性造型",
      "不得出现额外肢体、比例失衡、颜色漂移或重复角色"
    ]
  },
  "aspect_ratio": "16:9",
  "negative_prompt": [
    "写实恐龙",
    "尖牙",
    "锋利爪子",
    "攻击性表情",
    "身体变形",
    "额外肢体",
    "颜色漂移",
    "重复角色",
    "模糊",
    "低清晰度"
  ],
  "tool_adapters": {
    "generic": {
      "suffix": "画幅比例 16:9，高质量商业效果图"
    },
    "midjourney": {
      "suffix": "--ar 16:9 --stylize 150"
    },
    "stable_diffusion": {
      "positive_prompt_mode": "按 prompt_blocks 合并",
      "negative_prompt_mode": "使用 negative_prompt",
      "controlnet_hint": "参考图优先使用线稿或角色结构控制"
    }
  }
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
