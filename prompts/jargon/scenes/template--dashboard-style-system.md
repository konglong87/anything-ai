---
title: "Dashboard 审美 Skill"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# Dashboard 审美 Skill

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 场景模板

选择一个方向，展开共享规范，得到完整可复制模板。

**适用场景：** 需要完整场景模板与可调整参数时

::: warning 适用边界
- 这是原始结构化模板的可读展开版；工具参数保留原文，使用前请核验目标工具的支持情况。
- 原始资料第 5 例的执行逻辑待确认，第 6 例缺失；不补造案例，也不把候选逻辑默认落地。
:::

<JargonPrompt id="template--dashboard-style-system" />

## 如何把白话说具体

本条目将「需要完整场景模板与可调整参数时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词（含站点导引词）：** dashboard-style-system、有质感、高级感、好看

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# Dashboard 审美 Skill

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【适用边界】
- 这是原始结构化模板的可读展开版；工具参数保留原文，使用前请核验目标工具的支持情况。
- 原始资料第 5 例的执行逻辑待确认，第 6 例缺失；不补造案例，也不把候选逻辑默认落地。

【必要输入】
产品或使用场景：[待填写：产品或使用场景]
内容优先级：[待填写：内容优先级]

【选择的方向】
暖调留白型
【rule】
奶油底色、单一黄色强调、细边框和弱阴影，保留呼吸感。

【设计变量】
- #F7F3EA
- 一个主强调色
- 圆角克制
- 弱阴影

【输出要求】
- 页面结构
- 色彩规范
- 组件规范
- 可直接给 AI 的提示词

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
https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/templates/dashboard/dashboard-style-system.json
````

:::

## 原始资料与依赖

以下为锁定提交中的原始结构化内容；上方整理版与原文分开，不把本站整理误标为原作者成品。

- [templates/dashboard/dashboard-style-system.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/templates/dashboard/dashboard-style-system.json)
- [terms/dashboard/layout-patterns.json](https://github.com/konglong87/feeling-to-jargon/blob/4c245f7a43d143dcfbd194b768ee1c4d8aa8ff8d/terms/dashboard/layout-patterns.json)

::: details 展开当前条目原文

````json
{
  "schema_version": "1.0.0",
  "template_id": "dashboard-style-system",
  "name": "Dashboard 审美 Skill",
  "type": "template",
  "inputs": [
    "product_or_scene",
    "style_direction",
    "content_priority"
  ],
  "style_directions": [
    {
      "id": "warm-minimal",
      "name": "暖调留白型",
      "rule": "奶油底色、单一黄色强调、细边框和弱阴影，保留呼吸感。",
      "tokens": [
        "#F7F3EA",
        "一个主强调色",
        "圆角克制",
        "弱阴影"
      ]
    },
    {
      "id": "high-contrast",
      "name": "强对比视觉型",
      "rule": "一张主卡占据视觉中心，用高饱和对比和大数字建立层级。",
      "tokens": [
        "主卡占视觉中心",
        "硬阴影",
        "大数字",
        "非对称"
      ]
    },
    {
      "id": "minimal-data",
      "name": "极简数据型",
      "rule": "以灰阶和一个强调色组织数据，去网格线和多余标签。",
      "tokens": [
        "灰阶为主",
        "胶囊柱状图",
        "标签精简"
      ]
    },
    {
      "id": "immersive-atmosphere",
      "name": "氛围沉浸型",
      "rule": "深色底、雾面渐变、玻璃卡片和轻微动态光斑。",
      "tokens": [
        "GPU 负载预算",
        "移动端降级",
        "模糊光斑"
      ]
    },
    {
      "id": "image-led-content",
      "name": "图卡内容型",
      "rule": "让真实图片成为主角，文字叠加且只保留一个强调色。",
      "tokens": [
        "大图卡片",
        "文字叠加",
        "单一 CTA 色"
      ]
    },
    {
      "id": "layout-patterns",
      "name": "高级布局模式",
      "rule": "用错位、大图、非对称、层叠、留白和破格出血建立布局性格。",
      "tokens": [
        "错位按 8/12/16px 节奏",
        "7:3 或 8:2 比例",
        "只破一处网格",
        "安全区内留信息"
      ]
    },
    {
      "id": "grid-glass-dashboard",
      "name": "方格纸玻璃卡 Dashboard",
      "rule": "用 44px 方格纸做底，让半透明白玻璃卡透出底层网格，指标按数值形成阶梯。",
      "tokens": [
        "44px 网格底",
        "半透明白玻璃",
        "指标阶梯排列",
        "实心/斜纹/渐变填充"
      ]
    },
    {
      "id": "grouped-sidebar-dashboard",
      "name": "分组侧边栏 Dashboard",
      "rule": "把导航拆成三组并用大留白分隔，主区用超大细体字、三组数字和横向比例条建立节奏。",
      "tokens": [
        "三组导航",
        "10px 大写灰字组名",
        "底部头像/用量条",
        "横向比例条替代饼图"
      ]
    },
    {
      "id": "single-dark-accent-dashboard",
      "name": "单深色单强调色 Dashboard",
      "rule": "整页只保留一条深色侧边栏和一个强调色，当前项、主按钮和命中图表共享同一强调色。",
      "tokens": [
        "唯一深色侧边栏",
        "单一强调色",
        "侧栏底部强调色卡片",
        "其余区域保持浅色"
      ]
    },
    {
      "id": "tonal-dark-dashboard",
      "name": "暗底明度分层 Dashboard",
      "rule": "近黑底上只用明度区分卡片层级，不画描边；主读数放大，日期用圆点阵列表达。",
      "tokens": [
        "近黑底",
        "卡片亮一档",
        "无描边",
        "超大主读数",
        "圆点阵列+斜纹空格"
      ]
    }
  ],
  "output_contract": [
    "页面结构",
    "色彩规范",
    "组件规范",
    "可直接给 AI 的提示词"
  ],
  "field_contract": {
    "layout": "布局名称与信息结构；不新增同义叶子",
    "termSkill": "专业术语与结构关系；引用现有分类",
    "uiSkill": "视觉层级、栅格、材质、排版；不负责修改业务状态",
    "agentExec": "事件、前置条件、写入状态、派生视图与不受影响的状态",
    "state": "唯一事实源、派生关系、不变量；新增实现建议需明确标记",
    "tokens": "明确单位与适用范围；用户示例值不是全局默认值"
  },
  "shared_execution_contract": {
    "flow": [
      "事件",
      "校验/前置条件",
      "一次状态转换",
      "派生所有关联视图",
      "验收"
    ],
    "rules": [
      "共享的是选择 ID 与时间上下文，不是每个面板各自复制一份状态；独立控件不得误联动。",
      "展示读数由状态派生；请求失败、空数据与快速连续切换不得留下混合视图，异步结果需校验当前上下文。",
      "颜色/尺寸是当前示例的 token，不是行为触发条件；计数从集合派生，不写死 7→8。",
      "键盘与指针操作保持同样状态结果；选中/加载/错误不能只靠颜色，动态效果提供减少动态路径。",
      "固定栏不等于固定整个页面；窄屏策略与断点未提供时先标记建议，不臆造原稿数值。"
    ],
    "acceptance": [
      "事件前/后真实截图覆盖受影响与不受影响区域",
      "端到端验证状态联动、独立性、错误/快速切换与键盘路径",
      "截图只验证可见结果，状态一致性同时用断言验证"
    ]
  },
  "source_gaps": [
    {
      "slot": 5,
      "status": "needs_confirmation",
      "entry_id": "warm-three-column-dashboard",
      "missing": "完整点击逻辑、模式与单位映射；候选执行逻辑不得默认落地"
    },
    {
      "slot": 6,
      "status": "missing",
      "missing": "第六个 Dashboard 的三层提示词原文",
      "policy": "不创建空叶子、不生成虚构案例，不声称六例完整"
    }
  ],
  "pattern_refs": [
    {
      "entry_id": "color-staggered-dashboard",
      "path": "terms/dashboard/layout-patterns.json",
      "status": "provided"
    },
    {
      "entry_id": "industrial-zones-dashboard",
      "path": "terms/dashboard/layout-patterns.json",
      "status": "provided"
    },
    {
      "entry_id": "axial-observatory-dashboard",
      "path": "terms/dashboard/layout-patterns.json",
      "status": "provided"
    },
    {
      "entry_id": "glass-dot-matrix-dashboard",
      "path": "terms/dashboard/layout-patterns.json",
      "status": "provided"
    },
    {
      "entry_id": "warm-three-column-dashboard",
      "path": "terms/dashboard/layout-patterns.json",
      "status": "needs_confirmation"
    }
  ],
  "forbidden_defaults": [
    "默认蓝紫渐变",
    "所有卡片一样大",
    "满屏圆角矩形",
    "过多颜色和图标",
    "模板化侧边栏+顶栏+四张 KPI 卡"
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
