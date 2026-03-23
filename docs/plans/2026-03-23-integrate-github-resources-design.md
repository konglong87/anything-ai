# GitHub资源整合设计文档

**日期**：2026-03-23
**状态**：待实施
**相关仓库**：
- jamesmurdza/awesome-ai-devtools
- Leey21/awesome-ai-research-writing

---

## 🎯 目标

将两个GitHub仓库的优质资源整合到项目的 `resources/` 目录中，创建独立的中英文双语文档，便于用户查阅和使用。

---

## 📐 方案选择

### 选定方案：创建独立文件

**理由**：
1. 两个仓库内容都很丰富，值得独立成文件
2. 符合项目现有的文件组织方式
3. 便于用户查找和阅读
4. 易于后续维护和更新

### 文件位置

```
resources/
├── ai-tools/
│   ├── awesome-ai-devtools.md (中文)
│   └── awesome-ai-devtools.en.md (英文)
│
└── specialized/
    ├── ai-research-writing.md (中文)
    └── ai-research-writing.en.md (英文)
```

---

## 📋 内容设计

### 1. awesome-ai-devtools.md

**标题**：AI开发者工具集合

**来源**：https://github.com/jamesmurdza/awesome-ai-devtools

**内容结构**：

```markdown
---
title: AI开发者工具集合
difficulty: beginner
roles: [developer]
type: guide
duration: 15 min
tags: [AI, Developer Tools, IDE, Automation]
---

# AI开发者工具集合

## 📋 工具分类

### 1. IDE 与编辑器
- Cursor
- Replit Agent
- Windsurf
- Crystal

### 2. 命令行工具
- Aider
- models (TUI)
- GitHub CLI AI

### 3. PR 与代码审查
- Greptile
- claude-pr-reviewer

### 4. 应用生成器
- v0
- Bolt
- Lovable

### 5. 文档生成
- [相关工具]

## 💡 如何选择

[根据不同开发场景给出推荐]

## 🔗 资源链接

GitHub: https://github.com/jamesmurdza/awesome-ai-devtools
```

**提取重点**：
- IDE和编辑器（Cursor, Windsurf等）
- 命令行AI工具
- PR审查自动化
- 应用快速生成工具

---

### 2. ai-research-writing.md

**标题**：AI学术写作助手

**来源**：https://github.com/Leey21/awesome-ai-research-writing

**内容结构**：

```markdown
---
title: AI学术写作助手
difficulty: intermediate
roles: [researcher, student]
type: guide
duration: 20 min
tags: [AI, Academic Writing, Research, Prompts]
---

# AI学术写作助手

## 🎯 核心功能

### 1. 写作Prompt集合

#### 中转英
[完整Prompt + 使用说明]

#### 英转中
[完整Prompt + 使用说明]

#### 中转中
[Word场景下的中文润色]

#### 表达润色
- 英文论文润色
- 中文论文润色

#### 其他功能
- 缩写
- 扩写
- 逻辑检查
- 去AI味

## 💡 使用场景

- 论文翻译
- 润色优化
- 逻辑检查
- 去除AI痕迹

## 📝 最佳实践

[使用建议和注意事项]

## 🔗 资源链接

GitHub: https://github.com/Leey21/awesome-ai-research-writing
```

**提取重点**：
- 完整的Prompt模板（中转英、英转中等）
- 学术写作场景应用
- 使用建议和最佳实践

---

## 🎨 内容创作原则

### 1. 提取核心价值
- 工具列表和分类
- 核心Prompt模板
- 使用场景和建议

### 2. 添加原创点评
- 每个工具/功能的价值分析
- 适用场景说明
- 优缺点评价

### 3. 保持实用性
- 只提取最实用的部分
- 删除过于详细的技术细节
- 保留核心链接

### 4. 双语支持
- 中文版：详细说明 + 使用场景
- 英文版：对应的英文翻译

---

## 🔄 与现有资源的关系

### awesome-ai-devtools.md
- **补充** `ai-tools-resources.md`（更偏向具体工具介绍）
- **区别于** `ai-apps-resources.md`（开发工具 vs 应用工具）

### ai-research-writing.md
- **填补** `specialized/` 目录在学术写作方面的空白
- **补充** 专业化资源矩阵

---

## ✅ 验收标准

- [ ] 创建4个文件（2个中文 + 2个英文）
- [ ] 每个文件包含完整的frontmatter
- [ ] 内容结构清晰，分类合理
- [ ] 包含原创点评和使用建议
- [ ] 所有链接有效
- [ ] 更新 `resources/README.md` 的索引

---

## 📝 实施步骤

1. 使用Web搜索工具获取两个仓库的详细信息
2. 提取核心内容并整理分类
3. 创建中文版文档
4. 创建对应的英文版文档
5. 更新 `resources/README.md` 索引
6. 更新里程碑进度
7. 验证目标达成

---

## 📊 成功指标

- 文件创建完整（4个文件）
- 内容质量符合项目标准
- 双语版本对齐
- 链接有效可用
- 符合项目的"创建 → Review → 循环"工作模式