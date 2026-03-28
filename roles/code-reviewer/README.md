---
title: 代码审查员 - Code Reviewer
description: 专业的代码审查角色，检查代码质量、安全性和可维护性
difficulty: intermediate
roles: ['programmer', 'developer']
type: guide
duration: 45min
tags: ['代码审查', '质量', '安全', 'ECC']
---

# 代码审查员 - Code Reviewer

> **来源**: Everything Claude Code - `agents/code-reviewer.md`
> **外部链接**: [ECC 原始位置](https://github.com/affaan-m/everything-claude-code/tree/main/agents/code-reviewer.md)

## 🎯 角色定位

代码审查员是一个专业化的 AI 子代理，专注于：

- ✅ **代码质量审查** - 检查代码风格、可读性
- ✅ **安全性检查** - 识别潜在的安全漏洞
- ✅ **性能优化** - 发现性能瓶颈
- ✅ **最佳实践** - 确保遵循编码标准

## 📚 审查维度

### 1. **代码质量**

检查项目：
- [ ] 代码是否符合编码规范？
- [ ] 命名是否清晰表达意图？
- [ ] 函数是否单一职责？
- [ ] 是否有重复代码？
- [ ] 错误处理是否完善？

### 2. **安全性**

检查项目：
- [ ] 是否有注入漏洞风险？
- [ ] 敏感数据是否加密？
- [ ] 输入验证是否完整？
- [ ] 权限控制是否到位？
- [ ] 是否有 XSS/CSRF 风险？

### 3. **性能**

检查项目：
- [ ] 是否有 N+1 查询问题？
- [ ] 是否有不必要的循环？
- [ ] 缓存策略是否合理？
- [ ] 数据库索引是否优化？
- [ ] 是否有内存泄漏风险？

### 4. **可维护性**

检查项目：
- [ ] 代码是否易于理解？
- [ ] 是否有清晰的注释？
- [ ] 测试覆盖率是否足够？
- [ ] 依赖关系是否清晰？
- [ ] 是否易于扩展？

## 🔍 审查流程

### 步骤 1: 收集上下文

```typescript
// 需要审查的文件
const files = ['src/user.ts', 'src/user.test.ts'];

// 相关的配置文件
const config = ['tsconfig.json', '.eslintrc.json'];

// 最近的变更
const changes = await git.diff('main');
```

### 步骤 2: 自动化检查

```bash
# 代码风格检查
npx eslint src/**/*.ts

# 类型检查
npx tsc --noEmit

# 测试覆盖率
npm test -- --coverage

# 安全扫描
npm audit
```

### 步骤 3: 人工审查要点

#### 示例 1: 函数审查

```typescript
// 原始代码
function calc(a, b) {
  return a + b;
}

// 审查意见
/*
❌ 问题：
1. 函数名不清晰（calc 是什么？）
2. 缺少类型定义
3. 没有参数验证
4. 缺少文档注释

✅ 改进建议：
*/
function calculateSum(a: number, b: number): number {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('参数必须是数字');
  }
  return a + b;
}
```

#### 示例 2: 安全审查

```typescript
// 原始代码（危险）
app.get('/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
  db.query(query, (err, result) => {
    res.json(result);
  });
});

// 审查意见
/*
🔴 严重安全漏洞：
1. SQL 注入风险（直接拼接参数）
2. 没有权限验证
3. 错误信息可能泄露数据库结构

✅ 修复方案：
*/
app.get('/user/:id', authenticate, async (req, res) => {
  try {
    const userId = req.params.id;

    // 权限验证
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // 参数化查询
    const user = await db.query(
      'SELECT id, name, email FROM users WHERE id = ?',
      [userId]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    logger.error('Failed to fetch user', { error, userId: req.params.id });
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

#### 示例 3: 性能审查

```typescript
// 原始代码（性能问题）
async function getUserPosts(userId: string) {
  const posts = await Post.findAll({ where: { userId } });

  for (const post of posts) {
    post.comments = await Comment.findAll({ where: { postId: post.id } });
    post.author = await User.findById(post.userId);
  }

  return posts;
}

// 审查意见
/*
⚠️ 性能问题 - N+1 查询：
1. 每个帖子都查询一次评论（N 次查询）
2. 每个帖子都查询一次作者（N 次查询）
3. 总查询次数：1 + 2N（严重的性能问题）

✅ 优化方案：
*/
async function getUserPosts(userId: string) {
  const posts = await Post.findAll({
    where: { userId },
    include: [
      { model: Comment },
      { model: User, as: 'author' }
    ]
  });

  return posts;
}
// 总查询次数：3（JOIN 查询）
```

## 📋 审查清单模板

```markdown
## Code Review Checklist

### 代码质量
- [ ] 命名清晰，符合规范
- [ ] 函数职责单一
- [ ] 无重复代码
- [ ] 错误处理完善
- [ ] 边界情况考虑

### 安全性
- [ ] 无注入漏洞
- [ ] 输入验证完整
- [ ] 权限控制到位
- [ ] 敏感数据加密
- [ ] 无敏感信息泄露

### 性能
- [ ] 无 N+1 查询
- [ ] 缓存策略合理
- [ ] 数据库索引优化
- [ ] 无内存泄漏
- [ ] 异步操作正确

### 测试
- [ ] 单元测试覆盖
- [ ] 边界测试
- [ ] 错误路径测试
- [ ] 覆盖率 ≥ 80%

### 文档
- [ ] 函数注释完整
- [ ] 复杂逻辑说明
- [ ] API 文档更新
- [ ] README 更新（如需要）
```

## 🚀 使用 ECC Code Reviewer

### 通过 Claude Code 使用

```bash
# 在 Claude Code 中执行代码审查
/code-review

# 或指定文件
/code-review src/user.ts src/auth.ts
```

### 通过 ECC 完整系统

```bash
# 安装 ECC 插件
/plugin install everything-claude-code@everything-claude-code

# 使用 code-reviewer 代理
# Claude Code 会自动委托给 code-reviewer 代理
```

## 📖 进阶学习

### 相关角色

- [实现规划师](../planner/) - 功能实现规划
- [TDD 指导员](../tdd-guide/) - TDD 方法论
- [安全审计员](../security-reviewer/) - 专注安全审查

### 相关技能包

- [编码标准](../../5-skills/coding-standards/) - 编码规范
- [安全审查](../../5-skills/security-review/) - 安全检查清单
- [TDD 工作流](../../5-skills/tdd-workflow/) - 测试驱动开发

### ECC 完整 Code Reviewer

想要使用完整的 code-reviewer 代理，请访问：

- **ECC Code Reviewer Agent**: [查看完整代理定义](https://github.com/affaan-m/everything-claude-code/tree/main/agents/code-reviewer.md)
- **ECC Code Review Command**: [查看命令文档](https://github.com/affaan-m/everything-claude-code/tree/main/commands/code-review.md)

## 🔗 外部资源

- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) - 完整的 Claude Code 性能优化系统
- [ECC 精选资源](../../resources/external/everything-claude-code/) - Anything-AI 的 ECC 精选内容

---

**下一步**: [实现规划师](../planner/) | [返回角色目录](../)