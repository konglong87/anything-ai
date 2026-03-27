---
title: Context Engineering - 上下文工程
difficulty: intermediate
roles: [developer, ai-engineer, product-manager]
type: concept
duration: 20 min
tags: [Context Engineering, Context Window, Knowledge Management]
tools: [Claude, AI Agents, Knowledge Base]
---

# Context Engineering - 上下文工程

> 给AI一张地图，不是一本1000页的说明书

## 🎯 什么是上下文工程

**上下文工程**：管理和优化提供给AI的信息，让它在有限窗口内做出最佳决策。

**核心问题**：给AI提供哪些信息，才能让它理解任务并给出正确答案？

### 与Prompt Engineering的区别

```
Prompt Engineering  →  "如何问问题"
Context Engineering  →  "提供什么信息"
```

**示例对比**：

**Prompt Engineering关注**：
```
你是一位代码审查员，请审查这段代码...
```

**Context Engineering关注**：
```
项目信息：
- 使用React 18.2.0
- TypeScript 5.0
- 当前文件在src/components/
- 依赖package.json中的库
- 遵循Airbnb编码规范

[代码]
```

---

## 💡 为什么需要Context Engineering

### 问题：AI的上下文窗口有限

**Claude的限制**：
- Claude 3.5 Sonnet：200K tokens（约15万单词）
- Claude 3 Opus：200K tokens
- Claude 3 Haiku：200K tokens

**实际情况**：
- 一个中型项目：可能超过100万tokens
- 所有历史记录：可能几十万tokens
- 完整文档：可能几万tokens

**结果**：
- 不能把所有信息都塞进去
- 需要精心选择相关信息
- 必须压缩和提炼

### 问题：信息过载反而降低效果

**Claude的"上下文焦虑"**：
- Anthropic发现：上下文太多，Claude表现反而变差
- 信息过载导致注意力分散
- 无关信息干扰决策

**实验数据**：
```
上下文数量    准确率
-----------  --------
适中          85%
过多          65%
过少          60%
```

**结论**：需要平衡，不是越多越好。

---

## 🏗️ Context Engineering的核心要素

### 1. 信息层次化

**金字塔结构**：

```
           ┌─────────────┐
           │ 核心任务信息 │  ← 最高优先级
           └──────┬──────┘
                  │
         ┌────────▼────────┐
         │  关键上下文信息  │  ← 高优先级
         └────────┬────────┘
                  │
    ┌─────────────▼─────────────┐
    │   项目结构和约束条件      │  ← 中优先级
    └─────────────┬─────────────┘
                  │
┌─────────────────▼─────────────────┐
│      背景知识和参考资料            │  ← 低优先级
└───────────────────────────────────┘
```

**实践示例**：

**核心任务信息**（必须提供）：
```
任务：修复用户登录bug
问题描述：用户点击登录按钮后，页面卡死
当前文件：src/pages/Login.tsx
```

**关键上下文信息**（重要提供）：
```
相关文件：
- src/services/auth.ts（认证服务）
- src/hooks/useAuth.ts（认证hook）
- src/api/user.ts（用户API）

最近修改：
- 昨天修改了auth服务
- 添加了新的token刷新逻辑
```

**项目结构**（选择性提供）：
```
项目使用：
- React 18.2.0
- TypeScript 5.0
- Tailwind CSS

编码规范：
- 函数式组件
- Hooks优先
- TypeScript严格模式
```

**背景知识**（按需提供）：
```
JWT认证流程：
[详细文档链接]
```

### 2. 动态上下文管理

**原则**：根据任务动态调整上下文

**示例**：

**任务1：修复样式问题**
```
提供：
- 当前组件文件
- 样式文件
- Tailwind配置

不需要：
- API文件
- 认证逻辑
- 后端代码
```

**任务2：添加新API**
```
提供：
- API目录结构
- 现有API示例
- TypeScript类型定义

不需要：
- 组件代码
- 样式文件
```

**实现方法**：
```bash
# 自动化脚本示例
function get_context() {
  task_type=$1

  case $task_type in
    "style")
      find src -name "*.css" -o -name "*.scss"
      ;;
    "api")
      find src/api -name "*.ts"
      ;;
    "component")
      find src/components -name "*.tsx"
      ;;
  esac
}
```

### 3. 上下文压缩

**目标**：在有限空间内包含最多有效信息

**压缩技巧**：

**技巧1：结构化摘要**
```
❌ 不压缩：
这是一个React项目，使用TypeScript编写，
采用函数式组件的风格，使用Hooks来管理状态，
遵循Airbnb编码规范，测试覆盖率要求80%以上...

✅ 压缩后：
React + TypeScript
- 函数式组件 + Hooks
- Airbnb规范
- 测试覆盖率 > 80%
```

**技巧2：关键词提取**
```
❌ 不压缩：
用户点击登录按钮后，输入用户名和密码，
然后系统会验证这些信息，如果正确就跳转到首页，
如果错误就显示错误提示...

✅ 压缩后：
登录流程：
输入 → 验证 → 成功跳转/失败提示
```

**技巧3：代码片段代替全文**
```
❌ 提供全文：
[粘贴整个500行文件]

✅ 提供关键部分：
相关代码（第45-55行）：
```typescript
const handleSubmit = async (e) => {
  e.preventDefault();
  await login(username, password);
}
```

### 4. 知识库构建

**长期知识库**：
```
knowledge-base/
├── project-structure.md      # 项目结构
├── coding-standards.md       # 编码规范
├── api-documentation.md      # API文档
├── architecture-decisions.md # 架构决策
└── common-patterns.md        # 常用模式
```

**动态更新**：
```bash
# 自动更新脚本
npm run build:knowledge-base
# 自动提取：
# - 最新API
# - 类型定义
# - 文档结构
```

**使用方式**：
```markdown
# CLAUDE.md

## 项目知识库
- [项目结构](./knowledge-base/project-structure.md)
- [编码规范](./knowledge-base/coding-standards.md)
- [API文档](./knowledge-base/api-documentation.md)
```

---

## 🛠️ 实践方法

### 方法1：CLAUDE.md设计

**好的CLAUDE.md结构**：

```markdown
# 项目规则

## 项目信息
- 框架：React 18.2.0 + TypeScript 5.0
- 样式：Tailwind CSS
- 状态管理：Zustand

## 目录结构
```
src/
├── components/    # 可复用组件
├── pages/         # 页面组件
├── hooks/         # 自定义Hooks
├── services/      # API服务
├── utils/         # 工具函数
└── types/         # 类型定义
```

## 编码规范
1. 使用函数式组件
2. 遵循Airbnb风格指南
3. 单元测试覆盖率 > 80%
4. 使用TypeScript严格模式

## 常见任务模板

### 添加新组件
1. 在 src/components/ 创建文件
2. 添加 TypeScript 类型定义
3. 编写单元测试
4. 导出组件

### 添加新API
1. 在 src/services/ 定义服务
2. 在 src/types/ 添加类型
3. 编写集成测试

## 重要约束
- 所有API调用必须有错误处理
- 敏感信息不能提交到代码库
- 性能关键路径需要优化
```

**不好的CLAUDE.md**：

```markdown
# 项目规则

第一步：创建文件...
第二步：写代码...
[500行详细步骤]
```

**为什么不好**：
- 太详细，失去灵活性
- 难以维护
- 浪费context空间
- AI无法自主决策

### 方法2：上下文注入

**场景1：文件编辑**
```bash
# 编辑前自动注入
pre-edit-hook() {
  # 获取相关文件
  related_files=$(find_related_files $current_file)

  # 获取类型定义
  type_definitions=$(extract_types $related_files)

  # 注入上下文
  echo "相关文件：$related_files"
  echo "类型定义：$type_definitions"
}
```

**场景2：代码生成**
```bash
# 生成前自动注入
pre-generate-hook() {
  # 项目结构
  project_structure=$(tree -L 2 -I 'node_modules')

  # 依赖信息
  dependencies=$(cat package.json | jq '.dependencies')

  # 注入上下文
  echo "项目结构：$project_structure"
  echo "依赖：$dependencies"
}
```

### 方法3：智能检索

**RAG（检索增强生成）**：

```
用户查询
    ↓
向量检索
    ↓
找到相关文档
    ↓
提取关键信息
    ↓
构建上下文
    ↓
发送给AI
```

**实现示例**：
```python
def get_relevant_context(query):
    # 1. 向量化查询
    query_vector = embed(query)

    # 2. 检索相关文档
    relevant_docs = vector_search(query_vector, top_k=5)

    # 3. 提取关键信息
    context = extract_key_info(relevant_docs)

    # 4. 压缩上下文
    compressed = compress(context, max_tokens=2000)

    return compressed
```

---

## 💼 实战案例

### 案例1：大型代码库的上下文管理

**问题**：
- 代码库：50万行代码
- 上下文窗口：200K tokens
- 无法包含所有代码

**解决方案**：

**1. 分层上下文**
```
L1：项目概览（500 tokens）
- 项目结构
- 关键技术栈
- 主要模块

L2：模块详情（2000 tokens）
- 当前模块结构
- 相关文件列表
- 关键类型定义

L3：具体文件（5000 tokens）
- 当前编辑文件
- 直接依赖文件
- 相关测试文件
```

**2. 动态加载**
```bash
# 根据任务加载不同层级
task_type="add-component"

if [ "$task_type" == "add-component" ]; then
  load L1  # 项目概览
  load L2  # components模块
  load L3  # 目标文件
fi
```

**3. 智能过滤**
```python
def filter_context(all_files, task):
    # 根据任务类型过滤
    if task.type == "style":
        return [f for f in all_files if f.endswith('.css') or f.endswith('.scss')]
    elif task.type == "api":
        return [f for f in all_files if 'api' in f or 'service' in f]
    # ...
```

### 案例2：文档问答系统

**需求**：
- 用户提问：如何使用API？
- 系统回答：基于项目文档

**实现**：

**1. 文档预处理**
```bash
# 构建知识库
python build_knowledge_base.py \
  --input docs/ \
  --output knowledge-base.json \
  --chunk-size 500 \
  --overlap 100
```

**2. 检索相关内容**
```python
def answer_question(question):
    # 检索相关文档片段
    chunks = retrieve_relevant_chunks(question, top_k=3)

    # 构建上下文
    context = "\n\n".join([chunk.content for chunk in chunks])

    # 调用AI
    prompt = f"""
    基于以下文档回答问题：

    {context}

    问题：{question}
    """

    return ai.generate(prompt)
```

**3. 上下文优化**
```python
# 去重
chunks = deduplicate(chunks)

# 压缩
context = compress(context, max_tokens=1000)

# 排序
chunks = rank_by_relevance(chunks, question)
```

### 案例3：Claude Code工作流

**花叔的实践**：

**CLAUDE.md作为路由器**：
```markdown
# 任务路由

## 公众号写作
- 加载：prompts/wechat-rules.md
- 知识库：knowledge/wechat-articles/

## iOS开发
- 加载：prompts/swift-rules.md
- 知识库：knowledge/ios/

## Web开发
- 加载：prompts/react-rules.md
- 知识库：knowledge/web/
```

**动态上下文加载**：
```bash
# 任务开始时
task_type=$(detect_task_type)

case $task_type in
  "wechat")
    cat prompts/wechat-rules.md >> CLAUDE.md
    ;;
  "ios")
    cat prompts/swift-rules.md >> CLAUDE.md
    ;;
esac
```

**上下文清理**：
```bash
# 任务结束后
reset_claude_md() {
  # 恢复基础配置
  git checkout CLAUDE.md

  # 清空临时上下文
  rm -rf .claude/temp-context/
}
```

---

## ⚠️ 常见误区

### 误区1：上下文越多越好

**❌ 错误**：
```
把整个项目、所有历史记录、所有文档都塞给AI
```

**✅ 正确**：
```
精心选择相关信息
- 核心任务信息
- 关键依赖文件
- 必要的上下文
```

**原因**：
- 上下文焦虑：太多反而效果差
- 浪费token成本
- AI注意力分散

### 误区2：静态上下文一劳永逸

**❌ 错误**：
```
写一个CLAUDE.md，然后永远不更新
```

**✅ 正确**：
```
持续更新：
- 项目结构变化时更新
- 新增模块时添加
- 发现问题就优化
```

**原因**：
- 项目在演化
- 上下文需要同步
- 活的系统才有效

### 误区3：忽视信息质量

**❌ 错误**：
```
随便粘贴一些文档片段
```

**✅ 正确**：
```
精心组织信息：
- 结构化表达
- 去除冗余
- 提炼关键点
```

**原因**：
- 质量比数量重要
- AI依赖信息做决策
- 错误信息导致错误输出

---

## 📊 效果评估

### 评估指标

**1. 任务成功率**
```bash
成功率 = 成功任务数 / 总任务数
```

**2. 上下文利用率**
```bash
利用率 = 有效信息量 / 总上下文量
```

**3. Token成本**
```bash
成本 = 输入token数 × 单价
```

**4. 迭代次数**
```bash
效率 = 1 / 需要调整的次数
```

### A/B测试

```
测试组A：提供完整文档（5000 tokens）
测试组B：提供精简摘要（1000 tokens）

结果：
- 成功率：A=75%, B=85%
- Token成本：A=5x, B=1x
- 响应时间：A=10s, B=6s

结论：精简上下文效果更好
```

---

## 🔗 相关资源

### 进一步学习

- [提示词工程详解](../prompt-engineering/README.md) - 基础沟通技巧
- [驾驭AI工程详解](../harness-engineering/README.md) - 系统构建方法
- [Agent架构](../../agent-intro/agent-architecture.md) - 多Agent协作

### 实践工具

- [Claude使用指南](../../../2-choose-tools/tools/claude/)
- [知识库管理工具](../../../resources/specialized/)
- [RAG实现方案](../../../resources/specialized/langchain-resources.md)

---

## 总结

Context Engineering是AI协作的关键技能：

**核心原则**：
- ✅ 给地图不给说明书
- ✅ 动态调整上下文
- ✅ 精心压缩信息
- ✅ 构建知识库

**关键技巧**：
- ✅ 信息层次化
- ✅ 智能检索
- ✅ 上下文注入
- ✅ 持续优化

**记住**：
- 质量比数量重要
- 相关性是关键
- 定期清理和更新
- 让上下文自然生长

**下一步**：从你的项目开始，构建第一个知识库 🚀