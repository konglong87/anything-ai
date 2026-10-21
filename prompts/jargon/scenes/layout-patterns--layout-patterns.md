---
title: "高级布局模式"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 高级布局模式

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

用错位、大图、非对称、层叠、留白和破格出血建立布局性格。

**适用场景：** Dashboard 需要有明确审美方向且避免模板化

<JargonPrompt id="layout-patterns--layout-patterns" />

## 如何把白话说具体

本条目将「Dashboard 需要有明确审美方向且避免模板化」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** Dashboard三层规范、术语视觉执行分层、高级布局模式、design-tokens、layout-patterns

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 高级布局模式

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【名称】
高级布局模式

【白话解释】
用错位、大图、非对称、层叠、留白和破格出血建立布局性格。

【适用场景】
Dashboard 需要有明确审美方向且避免模板化

【专业参数与锚点】
- 错位按 8/12/16px 节奏
- 7:3 或 8:2 比例
- 只破一处网格
- 安全区内留信息

【边界与约束】
- 不要所有卡片一样大
- 不要默认蓝紫渐变
- 不要模板化侧边栏+四张 KPI 卡

【scope】
general

【字段含义】
布局与信息结构：布局名称与信息结构；不新增同义叶子
专业术语：专业术语与结构关系；引用现有分类
视觉规范：视觉层级、栅格、材质、排版；不负责修改业务状态
执行与事件：事件、前置条件、写入状态、派生视图与不受影响的状态
状态模型：唯一事实源、派生关系、不变量；新增实现建议需明确标记
设计变量：明确单位与适用范围；用户示例值不是全局默认值

【共享执行规范】
执行流程：
  - 事件
  - 校验/前置条件
  - 一次状态转换
  - 派生所有关联视图
  - 验收
规则：
  - 共享的是选择 ID 与时间上下文，不是每个面板各自复制一份状态；独立控件不得误联动。
  - 展示读数由状态派生；请求失败、空数据与快速连续切换不得留下混合视图，异步结果需校验当前上下文。
  - 颜色/尺寸是当前示例的 token，不是行为触发条件；计数从集合派生，不写死 7→8。
  - 键盘与指针操作保持同样状态结果；选中/加载/错误不能只靠颜色，动态效果提供减少动态路径。
  - 固定栏不等于固定整个页面；窄屏策略与断点未提供时先标记建议，不臆造原稿数值。
验收标准：
  - 事件前/后真实截图覆盖受影响与不受影响区域
  - 端到端验证状态联动、独立性、错误/快速切换与键盘路径
  - 截图只验证可见结果，状态一致性同时用断言验证

【原始资料缺口（不得补造）】
- 原稿位置：5
  状态：needs_confirmation
  条目：warm-three-column-dashboard
  缺失项：完整点击逻辑、模式与单位映射；候选执行逻辑不得默认落地
- 原稿位置：6
  状态：missing
  缺失项：第六个 Dashboard 的三层提示词原文
  处理边界：不创建空叶子、不生成虚构案例，不声称六例完整

【禁止的默认做法】
- 默认蓝紫渐变
- 所有卡片一样大
- 满屏圆角矩形
- 过多颜色和图标
- 模板化侧边栏+顶栏+四张 KPI 卡

【输出要求】
先说明采用的方向与待确认项，再给出满足约束的方案或内容，并附可验证的检查清单。

【来源】
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/dashboard/layout-patterns.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [terms/dashboard/layout-patterns.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/dashboard/layout-patterns.json)
- [templates/dashboard/dashboard-style-system.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/templates/dashboard/dashboard-style-system.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "leaf_id": "layout-patterns",
  "domain_id": "digital-product-uiux",
  "subdomain_id": "dashboard-design",
  "title": "高级布局模式",
  "knowledge_type": "pattern",
  "scope": "general",
  "status": "published",
  "intent_ids": [
    "design-dashboard",
    "audit-dashboard"
  ],
  "default_entry_id": "layout-patterns",
  "entries": [
    {
      "id": "layout-patterns",
      "name": "高级布局模式",
      "plain_language": "用错位、大图、非对称、层叠、留白和破格出血建立布局性格。",
      "when_to_use": "Dashboard 需要有明确审美方向且避免模板化",
      "parameters": [
        "错位按 8/12/16px 节奏",
        "7:3 或 8:2 比例",
        "只破一处网格",
        "安全区内留信息"
      ],
      "related": [
        "design-tokens",
        "layout-patterns"
      ],
      "constraints": [
        "不要所有卡片一样大",
        "不要默认蓝紫渐变",
        "不要模板化侧边栏+四张 KPI 卡"
      ],
      "aliases": [
        "Dashboard三层规范",
        "术语视觉执行分层"
      ],
      "contract_ref": "templates/dashboard/dashboard-style-system.json"
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
