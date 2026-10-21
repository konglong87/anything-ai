---
title: "暖色三栏布局"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tags: [提示词, Jargon]
---

# 暖色三栏布局

[专业提示词库](../README.md) / [数字产品与交互设计（UI/UX）](/prompts/jargon/domains/digital-product-uiux.html) / 设计模式

深浅分区；三栏控制台；模式与单位同步

**适用场景：** 需要暖色三栏布局的信息结构、视觉参数与交互联动规范时

::: warning 适用边界
- 实现建议，不宣称为原始产品已有逻辑
- 执行逻辑尚未确认：仅已确认的布局和视觉可参考；候选联动不得直接实现。
:::

<JargonPrompt id="layout-patterns--warm-three-column-dashboard" />

## 如何把白话说具体

本条目将「需要暖色三栏布局的信息结构、视觉参数与交互联动规范时」拆解为专业维度、参数和约束。先替换自己的任务与输入，再检查边界和验收标准；示例值不是承诺，也不是所有项目的默认值。

**检索词：** 暖色三栏、三栏控制台、卧室房间联动、模式单位同步、高级布局模式、warm-minimal、single-dark-accent-dashboard

::: details 阅读完整文字版（保留待填写项，可直接复制）

````text
# 暖色三栏布局

我的任务：[待填写：任务目标与实际约束]

下面是基于原始资料整理的执行提示词，不是原作者逐字提供的完整成品。请保留用户已给出的条件；未填写项先澄清，不虚构数值、业务逻辑或核验结果。示例参数不是全局默认或效果保证。候选方向按任务选择，不要求全部叠加。

【适用边界】
- 实现建议，不宣称为原始产品已有逻辑
- 执行逻辑尚未确认：仅已确认的布局和视觉可参考；候选联动不得直接实现。

【名称】
暖色三栏布局

【白话解释】
深浅分区；三栏控制台；模式与单位同步

【适用场景】
需要暖色三栏布局的信息结构、视觉参数与交互联动规范时

【专业参数与锚点】
- column_sizing

【边界与约束】
- 布局、视觉和执行状态分层；具体参数只属于本例，不作为同类页面默认值

【布局与信息结构】
暖色三栏布局

【专业术语】
- 深浅分区
- 三栏控制台
- 模式与单位同步

【视觉规范】
background：奶油
sidebar：炭黑
accent：琥珀
布局与信息结构：两侧固定，中间自适应；缺少固定宽度与窄屏断点数值

【执行与事件】
- 事件：select_room
  状态：needs_confirmation
  待确认候选逻辑（不得默认执行）：点击卧室房名、照片或温度卡，联动中间房间详情与右侧控制
  写入状态：
    - selectedRoomId
  更新视图：
    - roomDetails
    - roomControls
- 事件：change_mode
  状态：needs_confirmation
  待确认候选逻辑（不得默认执行）：切换模式同步单位与读数，但模式枚举、单位映射与换算规则未知
  写入状态：
    - mode
  更新视图：
    - displayUnit
    - displayReading
  前置条件：确认映射前不推定模式切换等于摄氏/华氏切换

【状态模型】
model_status：proposed_implementation
来源：
  selectedRoomId：候选共享房间 ID，待确认
  mode：模式枚举待确认
  canonicalReading：基础物理量与存储单位待确认
derived：
  roomDetails：candidate: rooms[selectedRoomId]
  roomControls：candidate: rooms[selectedRoomId]
  displayUnit：blocked: mode-to-unit mapping required
  displayReading：blocked: unit conversion rule required
invariants：
  - 交互建议不得当成已确认需求
  - 单位变化时数值必须按明确规则同步换算；不可只替换单位文字
  - 确认前只使用已提供的布局与视觉信息

【设计变量】
scope：provided_example
values：
  column_sizing：
    - fixed
    - fluid
    - fixed

【证据与确认状态】
状态：needs_confirmation
来源：user_dashboard_brief
状态模型边界：实现建议，不宣称为原始产品已有逻辑
已确认层：
  - layout
  - termSkill
  - uiSkill
待确认输入：
  - 房名/照片/温度卡点击后的完整逻辑
  - 模式枚举及单位映射、换算规则

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
      "id": "warm-three-column-dashboard",
      "name": "暖色三栏布局",
      "plain_language": "深浅分区；三栏控制台；模式与单位同步",
      "when_to_use": "需要暖色三栏布局的信息结构、视觉参数与交互联动规范时",
      "parameters": [
        "column_sizing"
      ],
      "related": [
        "warm-minimal",
        "single-dark-accent-dashboard"
      ],
      "constraints": [
        "布局、视觉和执行状态分层；具体参数只属于本例，不作为同类页面默认值"
      ],
      "aliases": [
        "暖色三栏",
        "三栏控制台",
        "卧室房间联动",
        "模式单位同步"
      ],
      "contract_ref": "templates/dashboard/dashboard-style-system.json",
      "layout": "暖色三栏布局",
      "termSkill": [
        "深浅分区",
        "三栏控制台",
        "模式与单位同步"
      ],
      "uiSkill": {
        "background": "奶油",
        "sidebar": "炭黑",
        "accent": "琥珀",
        "layout": "两侧固定，中间自适应；缺少固定宽度与窄屏断点数值"
      },
      "agentExec": [
        {
          "event": "select_room",
          "status": "needs_confirmation",
          "candidate": "点击卧室房名、照片或温度卡，联动中间房间详情与右侧控制",
          "writes": [
            "selectedRoomId"
          ],
          "updates": [
            "roomDetails",
            "roomControls"
          ]
        },
        {
          "event": "change_mode",
          "status": "needs_confirmation",
          "candidate": "切换模式同步单位与读数，但模式枚举、单位映射与换算规则未知",
          "writes": [
            "mode"
          ],
          "updates": [
            "displayUnit",
            "displayReading"
          ],
          "guard": "确认映射前不推定模式切换等于摄氏/华氏切换"
        }
      ],
      "state": {
        "model_status": "proposed_implementation",
        "source": {
          "selectedRoomId": "候选共享房间 ID，待确认",
          "mode": "模式枚举待确认",
          "canonicalReading": "基础物理量与存储单位待确认"
        },
        "derived": {
          "roomDetails": "candidate: rooms[selectedRoomId]",
          "roomControls": "candidate: rooms[selectedRoomId]",
          "displayUnit": "blocked: mode-to-unit mapping required",
          "displayReading": "blocked: unit conversion rule required"
        },
        "invariants": [
          "交互建议不得当成已确认需求",
          "单位变化时数值必须按明确规则同步换算；不可只替换单位文字",
          "确认前只使用已提供的布局与视觉信息"
        ]
      },
      "tokens": {
        "scope": "provided_example",
        "values": {
          "column_sizing": [
            "fixed",
            "fluid",
            "fixed"
          ]
        }
      },
      "evidence": {
        "status": "needs_confirmation",
        "source": "user_dashboard_brief",
        "state_model": "实现建议，不宣称为原始产品已有逻辑",
        "confirmed_layers": [
          "layout",
          "termSkill",
          "uiSkill"
        ],
        "missing_inputs": [
          "房名/照片/温度卡点击后的完整逻辑",
          "模式枚举及单位映射、换算规则"
        ]
      }
    }
  ]
}
````

:::

[查看覆盖清单与许可证](../sources.md) · 来源提交：`4c245f7`
