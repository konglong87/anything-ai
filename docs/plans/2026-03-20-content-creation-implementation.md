# 内容创作实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 创作22个高质量的内容文件，包括程序员案例、氛围编程指南、工具使用指南和提示词库

**Architecture:** 分4个阶段执行，每阶段完成后Review，遵循"搜索→验证→撰写→审查→修改"的内容创作流程

**Tech Stack:** Markdown, YAML Frontmatter, MCP Exa搜索工具, 双语创作

---

## 内容创作流程（重要！）

**每个内容文件必须遵循此流程**：

```
1. 信息收集 → 使用MCP Exa工具搜索相关资料
2. 交叉验证 → 多来源对比验证准确性
3. 撰写内容 → 只写事实，3000-4000字
4. 创建英文版 → 翻译为英文版本
5. Review审查 → 检查技术准确性和事实正确性
6. 修改完善 → 根据Review结果修改
7. 提交Git → 提交中英文双语版本
```

**重要提醒**：
- ❌ 不要编造案例，必须有真实来源
- ❌ 不要包含AI工具署名
- ✅ 只写经过验证的事实
- ✅ 所有内容必须中英文双语

---

## 阶段1：程序员案例（2个文件）

### Task 1: code-assistant.md（AI编程助手实战案例）

**Files:**
- Create: `roles/programmer/code-assistant.md`
- Create: `roles/programmer/code-assistant.en.md`

**Step 1: 信息收集 - 搜索AI编程助手案例**

使用MCP Exa工具搜索真实的AI编程助手使用案例：
- Claude编程案例
- DeepSeek重构案例
- ChatGPT学习框架案例

**Step 2: 撰写中文内容**

创建 `roles/programmer/code-assistant.md`，包含：
- Frontmatter元数据
- 3-5个真实编程案例
- 每个案例：需求背景 → 提示词 → AI输出 → 优化过程 → 最终代码
- 字数：3000-4000字

**Frontmatter模板**：
```yaml
---
title: "AI编程助手实战案例"
difficulty: intermediate
roles: [programmer]
type: tutorial
duration: 30min
tools: [claude, deepseek, chatgpt]
tags: [编程, AI助手, 代码生成, 实战案例]
---
```

**Step 3: 创建英文版本**

翻译为 `roles/programmer/code-assistant.en.md`

**Step 4: 提交**

```bash
git add roles/programmer/code-assistant.md roles/programmer/code-assistant.en.md
git commit -m "feat: 添加AI编程助手实战案例

- 包含3-5个真实编程案例
- 覆盖Claude、DeepSeek、ChatGPT
- 中英文双语"
```

---

### Task 2: code-review.md（AI代码审查实战案例）

**Files:**
- Create: `roles/programmer/code-review.md`
- Create: `roles/programmer/code-review.en.md`

**Step 1: 信息收集**

搜索AI代码审查的真实案例：
- AI发现bug的案例
- AI性能优化建议案例
- AI安全检查案例

**Step 2: 撰写中文内容**

创建 `roles/programmer/code-review.md`，包含：
- Frontmatter元数据
- 3-5个代码审查案例
- 每个案例：原始代码 → AI审查 → 发现问题 → 修复方案 → 验证
- 字数：3000-4000字

**Step 3: 创建英文版本**

翻译为 `roles/programmer/code-review.en.md`

**Step 4: 提交**

```bash
git add roles/programmer/code-review.md roles/programmer/code-review.en.md
git commit -m "feat: 添加AI代码审查实战案例

- 包含3-5个代码审查案例
- 覆盖bug发现、性能优化、安全检查
- 中英文双语"
```

---

## 阶段2：氛围编程（4个文件）

### Task 3: vibe-coding README（氛围编程入门指南）

**Files:**
- Create: `roles/vibe-coding/README.md`
- Create: `roles/vibe-coding/README.en.md`

**Step 1: 创建目录**

```bash
mkdir -p roles/vibe-coding
```

**Step 2: 信息收集**

搜索氛围编程相关资料：
- Vibe coding概念
- 轻松编程理念
- Flow状态编程

**Step 3: 撰写中文内容**

创建 `roles/vibe-coding/README.md`，包含：
- Frontmatter元数据
- 什么是氛围编程
- 核心理念：轻松、自然、有趣
- 适用人群
- 如何开始
- 字数：3000字左右

**Step 4: 创建英文版本**

翻译为 `roles/vibe-coding/README.en.md`

**Step 5: 提交**

```bash
git add roles/vibe-coding/
git commit -m "feat: 添加氛围编程入门指南

- 新增vibe-coding角色
- 介绍氛围编程理念
- 中英文双语"
```

---

### Task 4: vibe-coding workflow.md（工作流程详解）

**Files:**
- Create: `roles/vibe-coding/workflow.md`
- Create: `roles/vibe-coding/workflow.en.md`

**Step 1: 撰写中文内容**

创建 `roles/vibe-coding/workflow.md`，包含：
- 7步氛围编程流程
- 每步详细说明
- 配合工具使用
- 字数：2500-3000字

**Step 2: 创建英文版本**

翻译为 `roles/vibe-coding/workflow.en.md`

**Step 3: 提交**

```bash
git add roles/vibe-coding/workflow.md roles/vibe-coding/workflow.en.md
git commit -m "feat: 添加氛围编程工作流程详解"
```

---

### Task 5: vibe-coding tools.md（工具推荐）

**Files:**
- Create: `roles/vibe-coding/tools.md`
- Create: `roles/vibe-coding/tools.en.md`

**Step 1: 信息收集**

搜索各工具的官方资料：
- Cursor
- GitHub Copilot
- Codeium
- Claude Code
- VSCode + AI插件
- Codex
- Trae

**Step 2: 撰写中文内容**

创建 `roles/vibe-coding/tools.md`，包含：
- 各工具详细介绍
- 特点、适用场景
- 对比表格
- 字数：3000-3500字

**Step 3: 创建英文版本**

翻译为 `roles/vibe-coding/tools.en.md`

**Step 4: 提交**

```bash
git add roles/vibe-coding/tools.md roles/vibe-coding/tools.en.md
git commit -m "feat: 添加氛围编程工具推荐

- 覆盖Cursor、Copilot、Claude Code等7个工具
- 包含对比表格
- 中英文双语"
```

---

## 阶段3：工具使用指南（8个文件）

### Task 6: Claude使用指南

**Files:**
- Create: `2-choose-tools/tools/claude/README.md`
- Create: `2-choose-tools/tools/claude/README.en.md`

**Step 1: 创建目录**

```bash
mkdir -p 2-choose-tools/tools/claude
```

**Step 2: 信息收集**

搜索Claude官方资料：
- Anthropic官网
- Claude功能介绍
- 使用技巧和最佳实践

**Step 3: 撰写中文内容**

创建 `2-choose-tools/tools/claude/README.md`，包含：
- Frontmatter
- 工具介绍
- 核心功能
- 使用技巧（10个）
- 最佳实践
- 适用场景
- 实战案例（3-5个）
- 常见问题
- 价格方案
- 字数：2000-3000字

**Step 4: 创建英文版本**

翻译为 `2-choose-tools/tools/claude/README.en.md`

**Step 5: 提交**

```bash
git add 2-choose-tools/tools/claude/
git commit -m "feat: 添加Claude使用指南

- 详细介绍Claude功能和使用技巧
- 包含实战案例
- 中英文双语"
```

---

### Task 7: DeepSeek使用指南

**Files:**
- Create: `2-choose-tools/tools/deepseek/README.md`
- Create: `2-choose-tools/tools/deepseek/README.en.md`

**Step 1: 创建目录**

```bash
mkdir -p 2-choose-tools/tools/deepseek
```

**Step 2: 信息收集**

搜索DeepSeek官方资料

**Step 3: 撰写中文内容**

创建 `2-choose-tools/tools/deepseek/README.md`
（结构同Claude指南）

**Step 4: 创建英文版本**

翻译为 `2-choose-tools/tools/deepseek/README.en.md`

**Step 5: 提交**

```bash
git add 2-choose-tools/tools/deepseek/
git commit -m "feat: 添加DeepSeek使用指南

- 详细介绍DeepSeek功能和使用技巧
- 强调编程能力和中文理解
- 中英文双语"
```

---

### Task 8: ChatGPT使用指南

**Files:**
- Create: `2-choose-tools/tools/chatgpt/README.md`
- Create: `2-choose-tools/tools/chatgpt/README.en.md`

**Step 1: 创建目录**

```bash
mkdir -p 2-choose-tools/tools/chatgpt
```

**Step 2: 信息收集**

搜索ChatGPT官方资料

**Step 3: 撰写中文内容**

创建 `2-choose-tools/tools/chatgpt/README.md`
（结构同Claude指南）

**Step 4: 创建英文版本**

翻译为 `2-choose-tools/tools/chatgpt/README.en.md`

**Step 5: 提交**

```bash
git add 2-choose-tools/tools/chatgpt/
git commit -m "feat: 添加ChatGPT使用指南

- 详细介绍ChatGPT功能和使用技巧
- 覆盖GPT-4/GPT-4o区别
- 中英文双语"
```

---

### Task 9: Codex使用指南

**Files:**
- Create: `2-choose-tools/tools/codex/README.md`
- Create: `2-choose-tools/tools/codex/README.en.md`

**Step 1: 创建目录**

```bash
mkdir -p 2-choose-tools/tools/codex
```

**Step 2: 信息收集**

搜索Codex官方资料

**Step 3: 撰写中文内容**

创建 `2-choose-tools/tools/codex/README.md`
（结构同Claude指南）

**Step 4: 创建英文版本**

翻译为 `2-choose-tools/tools/codex/README.en.md`

**Step 5: 提交**

```bash
git add 2-choose-tools/tools/codex/
git commit -m "feat: 添加Codex使用指南

- 详细介绍Codex功能和API使用
- 覆盖与GitHub Copilot集成
- 中英文双语"
```

---

## 阶段4：提示词库（8个文件）

### Task 10: 编程场景提示词库

**Files:**
- Create: `prompts/coding-prompts.md`
- Create: `prompts/coding-prompts.en.md`

**Step 1: 撰写中文内容**

创建 `prompts/coding-prompts.md`，包含：
- Frontmatter
- 10-15个编程提示词模板
- 每个模板：使用场景 + 提示词模板 + 示例输入输出 + 注意事项

**提示词类型**：
- 代码生成
- 代码解释
- 代码重构
- Bug修复
- 单元测试
- 文档生成
- 代码转换
- 代码审查

**Step 2: 创建英文版本**

翻译为 `prompts/coding-prompts.en.md`

**Step 3: 提交**

```bash
git add prompts/coding-prompts.md prompts/coding-prompts.en.md
git commit -m "feat: 添加编程场景提示词库

- 包含10-15个编程提示词模板
- 即拿即用
- 中英文双语"
```

---

### Task 11: 写作场景提示词库

**Files:**
- Create: `prompts/writing-prompts.md`
- Create: `prompts/writing-prompts.en.md`

**Step 1: 撰写中文内容**

创建 `prompts/writing-prompts.md`
（结构同编程提示词库）

**提示词类型**：
- 文章大纲生成
- 内容扩展
- 标题优化
- 风格调整
- 摘要生成
- 多语言翻译
- SEO优化
- 内容润色

**Step 2: 创建英文版本**

翻译为 `prompts/writing-prompts.en.md`

**Step 3: 提交**

```bash
git add prompts/writing-prompts.md prompts/writing-prompts.en.md
git commit -m "feat: 添加写作场景提示词库"
```

---

### Task 12: 分析场景提示词库

**Files:**
- Create: `prompts/analysis-prompts.md`
- Create: `prompts/analysis-prompts.en.md`

**Step 1: 撰写中文内容**

创建 `prompts/analysis-prompts.md`
（结构同编程提示词库）

**提示词类型**：
- 数据分析
- 文本分析
- 报告生成
- 竞品分析
- 市场调研
- 用户反馈分析

**Step 2: 创建英文版本**

翻译为 `prompts/analysis-prompts.en.md`

**Step 3: 提交**

```bash
git add prompts/analysis-prompts.md prompts/analysis-prompts.en.md
git commit -m "feat: 添加分析场景提示词库"
```

---

### Task 13: 学习场景提示词库

**Files:**
- Create: `prompts/learning-prompts.md`
- Create: `prompts/learning-prompts.en.md`

**Step 1: 撰写中文内容**

创建 `prompts/learning-prompts.md`
（结构同编程提示词库）

**提示词类型**：
- 概念解释
- 学习路径
- 练习题生成
- 知识测试
- 项目建议
- 资源推荐

**Step 2: 创建英文版本**

翻译为 `prompts/learning-prompts.en.md`

**Step 3: 提交**

```bash
git add prompts/learning-prompts.md prompts/learning-prompts.en.md
git commit -m "feat: 添加学习场景提示词库"
```

---

## 阶段5：更新索引和验证

### Task 14: 更新项目索引

**Step 1: 运行构建脚本**

```bash
./build.sh
```

Expected:
- Frontmatter验证通过
- 索引生成成功
- 统计数据更新
- VitePress构建成功

**Step 2: 本地预览验证**

```bash
npm run docs:preview
```

访问 http://localhost:4173/anything-ai/ 验证：
- 所有新页面可访问
- 中英文切换正常
- 导航链接正确

**Step 3: 提交构建更新**

```bash
git add indexes/
git commit -m "chore: 更新索引和统计数据

- 新增22个内容文件
- 更新索引文件
- 验证构建成功"
```

---

## 验收清单

### 文件完整性
- [ ] 2个程序员案例文件创建完成
- [ ] 4个氛围编程文件创建完成
- [ ] 8个工具指南文件创建完成
- [ ] 8个提示词文件创建完成
- [ ] 共22个文件全部创建

### 内容质量
- [ ] 所有内容经过搜索验证
- [ ] 所有案例真实可信
- [ ] 所有内容中英文双语
- [ ] 所有frontmatter正确
- [ ] 所有代码示例可运行

### 技术验证
- [ ] 索引成功更新
- [ ] 本地VitePress预览正常
- [ ] 所有链接可访问
- [ ] frontmatter验证通过

---

## 时间预估

- **阶段1**：程序员案例（2个任务）- 2天
- **阶段2**：氛围编程（3个任务）- 2-3天
- **阶段3**：工具指南（4个任务）- 4天
- **阶段4**：提示词库（4个任务）- 2天
- **阶段5**：更新验证（1个任务）- 0.5天

**总计**：约11个工作日

---

## 故障排查

### 问题1：搜索不到真实案例
**解决**：
- 扩大搜索范围（英文搜索）
- 使用官方文档和博客
- 明确标注"示例案例"

### 问题2：内容不够深入
**解决**：
- 增加更多实战细节
- 添加代码示例
- 补充最佳实践

### 问题3：翻译质量不佳
**解决**：
- 使用专业翻译工具
- 母语者Review
- 参考官方英文文档

---

**计划创建日期**：2026-03-20
**预估实施时间**：11个工作日
**关键要求**：只写事实，中英文双语，搜索验证