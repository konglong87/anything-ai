# Anything-AI 项目设计文档

**版本**: 1.0
**日期**: 2026-03-20
**作者**: Claude & 项目发起人

---

## 📋 项目概览

### 愿景

创建一个系统性的AI知识索引项目，帮助人们：
- 系统学习和认识AI
- 正确理解AI，不被焦虑裹挟
- 驾驭AI工具，提升工作效率
- 跨越认知障碍，建立AI思维

**核心口号**：Anything is AI, AI Native, Agent Native
**方法论**：实践出真知，时间是检验真理的唯一标准

### 目标用户

- 各行业从业者（程序员、自媒体、教师、财务、HR等）
- AI新手（想了解AI但不知从何开始）
- AI实践者（想在具体场景中应用AI）
- 学习者（想深入理解AI原理）

---

## 🏗️ 架构设计

### 核心设计理念

**混合矩阵式架构**：
- 用户旅程引导（0-4阶段）
- 角色快速入口（顶层roles目录）
- 六维标签系统（交叉索引）
- 单源内容 + 多视角入口

### 目录结构

```
anything-ai/
├── README.md                  # 项目总入口
├── README.en.md
│
├── 0-start-here/              # 阶段0：新手入口
│   ├── README.md
│   ├── README.en.md
│   ├── what-is-ai.md         # AI是什么
│   ├── ai-anxiety.md         # 不需要AI焦虑
│   ├── learning-path.md      # 学习路径
│   └── _templates/           # 内容模板
│
├── 1-understand-ai/          # 阶段1：理解AI原理
│   ├── README.md
│   ├── README.en.md
│   ├── llm-basics/
│   ├── how-ai-thinks/
│   └── agent-intro/
│
├── 2-choose-tools/            # 阶段2：工具选择矩阵
│   ├── README.md
│   ├── README.en.md
│   ├── tool-matrix.md        # 核心矩阵
│   ├── tools/                # 各工具详细指南
│   │   ├── chatgpt/
│   │   ├── deepseek/
│   │   ├── claude/
│   │   ├── gemini/
│   │   ├── doubao/
│   │   └── qianwen/
│   └── selection-guide/
│
├── roles/                     # 行业角色总入口
│   ├── README.md
│   ├── README.en.md
│   ├── programmer/
│   ├── content-creator/
│   ├── teacher/
│   ├── student/
│   ├── finance/
│   ├── hr/
│   ├── sales/
│   ├── designer/
│   ├── admin/
│   └── [更多行业]/
│
├── 4-advanced-topics/        # 阶段4：进阶主题
│   ├── README.md
│   ├── prompt-engineering/
│   ├── fine-tuning/
│   ├── rag/
│   └── agent-development/
│
├── prompts/                  # 提示词库
│   ├── README.md
│   ├── by-scene/
│   └── by-role/
│
├── resources/                # 外部资源索引
│   ├── awesome-lists.md
│   ├── courses.md
│   ├── tools.md
│   └── papers.md
│
├── indexes/                  # 自动生成的交叉索引
│   ├── by-difficulty.md
│   ├── by-role.md
│   ├── by-tool.md
│   ├── by-duration.md
│   └── full-index.json
│
├── .github/                  # GitHub配置
│   ├── CONTRIBUTING.md
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
│
├── docs/                     # 文档网站配置
│   └── site-config/
│
├── scripts/                  # 自动化脚本
│   ├── generate-index.js
│   ├── check-links.js
│   ├── check-frontmatter.js
│   ├── build-site.sh
│   ├── stats.js
│   └── lib/
│
├── assets/                   # 静态资源
│   └── images/
│
└── package.json
```

---

## 📚 内容系统设计

### 六维标签系统

每个内容文件都包含frontmatter元数据：

```yaml
---
# 必需字段
title: "标题"
title_en: "English Title"
difficulty: beginner          # beginner/intermediate/advanced
roles: [programmer]          # 角色列表
type: tutorial               # 内容类型
duration: 15min              # 阅读时长
tools: [claude]              # 涉及工具
prerequisites: []            # 前置知识

# 元数据
author: "Name"
created: 2026-03-20
updated: 2026-03-20
version: 1.0
---
```

#### 标签维度详解

**1. difficulty（难度）**
- `beginner` - 零基础可读
- `intermediate` - 需要基础概念
- `advanced` - 需要专业背景

**2. roles（适用角色）**
- `everyone` - 所有人
- `programmer` - 程序员
- `content-creator` - 内容创作者
- `teacher` - 教师
- `student` - 学生
- `finance` - 财务
- `hr` - HR
- `sales` - 销售
- `designer` - 设计师
- `admin` - 行政

**3. type（内容类型）**
- `tutorial` - 教程
- `guide` - 指南
- `case` - 实战案例
- `tool-reference` - 工具参考
- `concept` - 概念解释
- `comparison` - 对比分析

**4. duration（时长）**
- `5min` - 快速浏览
- `15min` - 适中阅读
- `30min` - 深度学习
- `1hour` - 完整教程

**5. tools（涉及工具）**
- `chatgpt`、`claude`、`deepseek`、`gemini`、`doubao`、`qianwen` 等

**6. prerequisites（前置知识）**
- 相对路径数组，指向需要先读的文件

### 双语内容规范

**命名规则**：
- 中文版：`filename.md` 或 `README.md`
- 英文版：`filename.en.md` 或 `README.en.md`

**内容原则**：
- 共享相同的frontmatter标签
- 正文独立撰写（按英文读者习惯重写）
- 保持相同的章节结构

---

## 🔍 导航系统设计

### 主README快速导航

```markdown
## 🗺️ 快速导航

### 👥 按角色找内容

| 角色 | 核心场景 | 推荐工具 | 快速入口 |
|------|---------|---------|---------|
| 程序员 | 代码助手、代码审查、TDD | Claude, Codex | [程序员专区](./roles/programmer/) |
| 内容创作者 | 爆款标题、文章写作、视频 | DeepSeek, 豆包 | [创作者专区](./roles/content-creator/) |
...

### 🎯 按目标找内容

- 🌱 我是新手 → [从这里开始](./0-start-here/)
- 🧠 我想深入理解 → [理解AI](./1-understand-ai/)
...

### 🔧 按工具找场景

| 工具 | 最擅长场景 | 详细指南 |
|------|----------|---------|
| Claude | 技术架构、深度推理 | [Claude指南](./2-choose-tools/tools/claude/) |
...
```

### 角色专属导航页

每个角色目录下的 `README.md` 作为该角色的专属入口：

```markdown
# 👨‍💻 程序员AI应用指南

## 🎯 你能学到什么

## 📚 核心内容

### 新手必读
1. [AI编程助手入门](./code-assistant.md) - 15分钟
2. [选择适合编程的AI工具](../../2-choose-tools/tools/claude/) - 10分钟

### 进阶实战
3. [AI辅助代码审查](./code-review.md) - 30分钟
...

## 🔗 相关资源
```

### 自动生成交叉索引

**`scripts/generate-index.js`** 会生成：

1. **`indexes/by-difficulty.md`** - 按难度索引所有内容
2. **`indexes/by-role.md`** - 按角色索引
3. **`indexes/by-tool.md`** - 按工具索引
4. **`indexes/by-duration.md`** - 按时长索引
5. **`indexes/full-index.json`** - JSON格式，供网站搜索使用

---

## 📝 内容质量规范

### 核心原则

1. **通俗优先**
   - ✅ "AI像一个博览群书但从未出过门的学者"
   - ❌ "AI是基于大规模预训练语言模型的概率生成系统"

2. **交叉验证**
   - AI推荐的内容需标注验证方法
   - 提供检查步骤和判断标准

3. **时效性标注**
   - 标注内容的创建/更新日期
   - 过时信息及时标记

4. **实践导向**
   - 每个知识点配实际案例
   - 提供可复用的提示词

5. **中立客观**
   - 承认AI的局限性
   - 不神话，不妖魔化

### 内容模板

提供标准模板：
- `concept-template.md` - 概念解释
- `tool-guide-template.md` - 工具指南
- `case-template.md` - 行业案例

详见 `0-start-here/_templates/`

### 外部资源点评格式

```markdown
## 📚 资源名称

**链接**：URL
**类型**：提示词/工具/课程
**适合人群**：xxx
**核心价值**：xxx
**推荐程度**：⭐⭐⭐⭐⭐

**点评**：
这个资源的优势和特点...
需要注意的问题...

**关联内容**：
- [我们的相关内容](link)
```

---

## 🤖 自动化工具链

### 脚本功能

**1. `generate-index.js`** - 生成交叉索引
- 扫描所有Markdown文件
- 解析frontmatter
- 按不同维度生成分组索引
- 输出JSON供网站使用

**2. `check-frontmatter.js`** - 验证格式
- 检查必需字段
- 验证枚举值
- 检查双语对齐

**3. `check-links.js`** - 链接健康检查
- 内部链接存在性
- 外部链接有效性（可选）

**4. `stats.js`** - 内容统计
- 总量统计
- 分布分析
- 覆盖率报告

**5. `build-site.sh`** - 构建文档网站
- 调用VitePress/Docusaurus
- 生成静态网站

### NPM Scripts

```json
{
  "scripts": {
    "index": "node scripts/generate-index.js",
    "check": "node scripts/check-frontmatter.js && node scripts/check-links.js",
    "stats": "node scripts/stats.js",
    "build": "npm run check && npm run index && bash scripts/build-site.sh",
    "dev": "vitepress dev docs",
    "preview": "vitepress preview docs"
  }
}
```

### CI/CD

**GitHub Actions**：
- 自动检查frontmatter格式
- 自动生成索引
- 自动提交索引更新
- 构建文档网站（可选）

---

## 🤝 社区协作

### 贡献类型

欢迎的贡献：
- 补充新AI工具介绍
- 添加行业应用案例
- 贡献高质量提示词
- 改进内容可读性
- 指出过时信息
- 翻译英文版本

避免的内容：
- 复制受版权保护内容
- 过度吹捧AI
- 制造焦虑
- 未经验证的推荐
- 商业推广

### 贡献流程

1. Fork仓库
2. 创建分支
3. 使用模板编写内容
4. 本地验证（`npm run check`）
5. 提交PR

### 审核标准

- 内容质量（通俗、实用、客观）
- 格式规范（frontmatter完整）
- 链接有效
- 定位准确

### 社区治理

**维护者职责**：
- 3天内响应Issue
- 7天内审核PR
- 友好沟通
- 质量把控
- 持续维护

**贡献者认可**：
- README列出所有贡献者
- 重要贡献者授予Collaborator权限
- 年度优秀贡献者致谢

---

## 🎯 初期实施优先级

### Phase 1: 核心骨架（第1-2周）

1. **搭建基础结构**
   - 创建目录结构
   - 编写README和核心导航
   - 设置模板库

2. **AI认知入门** (0-start-here/)
   - AI是什么
   - 不需要AI焦虑
   - 学习路径

3. **工具矩阵** (2-choose-tools/)
   - 核心矩阵表
   - 3-5个主流工具指南

### Phase 2: 行业案例（第3-4周）

4. **程序员案例** (roles/programmer/)
   - 代码助手
   - 代码审查
   - TDD工作流

5. **内容创作者案例** (roles/content-creator/)
   - 爆款标题
   - 文章写作
   - 视频脚本

6. **提示词库初始版** (prompts/)
   - 按场景分类
   - 高质量模板

### Phase 3: 扩展与自动化（第5-6周）

7. **更多行业案例**
   - 教师、学生、财务等

8. **自动化工具**
   - 索引生成脚本
   - 验证脚本
   - CI/CD配置

9. **外部资源索引**
   - 精选awesome lists
   - 点评和推荐

### Phase 4: 文档网站（可选，后续）

10. **构建网站**
    - VitePress/Docusaurus配置
    - 搜索功能
    - 主题定制

---

## 🔮 扩展性设计

### 新增角色

在 `roles/` 下创建新目录，按模板编写内容即可。

### 新增维度

扩展frontmatter，添加新字段，更新索引生成脚本。

### 内容增长

内容越多，交叉索引价值越大，不影响维护成本。

### 社区扩展

贡献者越多，内容越丰富，质量通过CI/CD保障。

---

## 📊 成功指标

### 内容质量

- 通俗易懂（用户反馈）
- 实践导向（有案例占比）
- 中立客观（标注局限性）

### 用户价值

- 帮助新手入门
- 解决实际问题
- 减少AI焦虑

### 社区活跃

- GitHub Star数
- 贡献者数量
- PR/Issue活跃度

### 内容覆盖

- 角色覆盖度
- 工具覆盖度
- 场景覆盖度

---

## 🚀 技术栈

- **内容格式**：Markdown + YAML Frontmatter
- **索引生成**：Node.js + gray-matter
- **文档网站**：VitePress 或 Docusaurus（可选）
- **CI/CD**：GitHub Actions
- **包管理**：npm

---

## 📌 关键决策记录

1. **为什么选择旅程式分层 + 角色顶层？**
   - 旅程引导符合学习心理
   - 角色顶层满足快速查找需求
   - 两者结合，新手老手都友好

2. **为什么用单源内容 + 多入口索引？**
   - 维护简单，避免版本不一致
   - 通过标签实现灵活访问
   - 渐进式自动化

3. **为什么选择并排文件的双语方式？**
   - 最简洁直观
   - 维护方便
   - 不依赖构建工具

4. **为什么初期优先这三个模块？**
   - AI认知：帮用户建立正确心态
   - 工具矩阵：快速上手实践
   - 行业案例：解决实际问题

---

## 🎨 设计哲学

### 用户中心

- 新手友好（0阶段入口）
- 角色友好（快速找到自己的内容）
- 学习友好（清晰路径）

### 内容为王

- 通俗易读
- 实践导向
- 持续更新

### 社区驱动

- 开放贡献
- 协作共建
- 质量保障

### 渐进增强

- 先手动，后自动化
- 先核心，后扩展
- 先GitHub，后网站

---

## 📝 附录

### 参考资料

- https://github.com/PlexPt/awesome-chatgpt-prompts-zh
- https://github.com/hua1995116/awesome-ai-painting
- https://github.com/aishwaryanr/awesome-generative-ai-guide
- https://github.com/f/prompts.chat
- https://github.com/Shubhamsaboo/awesome-llm-apps
- https://github.com/ComposioHQ/awesome-claude-skills

### 相关技术

- Markdown
- YAML
- Node.js
- VitePress/Docusaurus
- GitHub Actions

---

**文档版本**: 1.0
**最后更新**: 2026-03-20
**下一步**: 创建实施计划