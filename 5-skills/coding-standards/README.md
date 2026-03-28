---
title: 编码标准 - 通用编码规范
description: 学习通用的编码标准和最佳实践，提升代码质量和可维护性
difficulty: beginner
roles: [programmer, developer]
type: guide
duration: 45min
tags: [编码标准, 最佳实践, ECC]
---


# 编码标准 - 通用编码规范

> **来源**: Everything Claude Code - `skills/coding-standards/`
> **外部链接**: [ECC 原始位置](https://github.com/affaan-m/everything-claude-code/tree/main/skills/coding-standards/)

## 🎯 为什么需要编码标准?

统一的编码标准可以：

- ✅ 提高代码可读性
- ✅ 降低维护成本
- ✅ 减少 Bug 和错误
- ✅ 促进团队协作
- ✅ 便于 Code Review

## 📚 核心编码原则

### 1. **不可变性优先**

优先使用不可变数据和纯函数：

```typescript
// 好的做法 - 不可变
const newUser = { ...user, name: 'New Name' };

// 不好的做法 - 可变
user.name = 'New Name';
```

### 2. **单一职责原则**

每个函数/模块只做一件事：

```typescript
// 好的做法 - 单一职责
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createUser(email: string, name: string): User {
  if (!validateEmail(email)) {
    throw new Error('Invalid email');
  }
  return { email, name };
}

// 不好的做法 - 多重职责
function createUserAndSendEmail(email: string, name: string) {
  // 验证邮箱
  // 创建用户
  // 发送邮件
  // 所有逻辑混在一起
}
```

### 3. **清晰的命名**

命名应该表达意图：

```typescript
// 好的命名
function calculateDiscount(price: number, discountRate: number): number {
  return price * (1 - discountRate);
}

const activeUsers = users.filter(u => u.isActive);

// 不好的命名
function calc(p, d) {
  return p * (1 - d);
}

const x = users.filter(u => u.a);
```

### 4. **避免魔法数字**

使用常量代替硬编码的数字：

```typescript
// 好的做法
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT_MS = 5000;

for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
  // 重试逻辑
}

// 不好的做法
for (let i = 0; i < 3; i++) {
  // 3 是什么意思？
}
```

## 📁 文件组织结构

### 推荐的项目结构

```
src/
├── components/     # UI 组件
├── services/       # 业务逻辑
├── models/         # 数据模型
├── utils/          # 工具函数
├── constants/      # 常量定义
├── types/          # 类型定义
└── tests/          # 测试文件
```

### 文件命名规范

- **组件**: PascalCase（`UserProfile.tsx`）
- **工具函数**: camelCase（`dateUtils.ts`）
- **常量**: UPPER_SNAKE_CASE（`API_ENDPOINTS.ts`）
- **类型**: PascalCase + `.types.ts`（`user.types.ts`）

## 🔧 代码格式化

### 使用 Prettier 和 ESLint

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "no-console": "warn",
    "prefer-const": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### 自动格式化

```bash
# 格式化所有文件
npx prettier --write "src/**/*.{ts,tsx}"

# 检查代码规范
npx eslint "src/**/*.{ts,tsx}"
```

## 🧪 测试标准

### 测试文件命名

- 单元测试: `*.test.ts` 或 `*.spec.ts`
- 集成测试: `*.integration.test.ts`
- E2E 测试: `*.e2e.test.ts`

### 测试覆盖率要求

ECC 推荐：
- **最低**: 80%
- **推荐**: 90%+
- **关键路径**: 100%

```bash
# 运行覆盖率检查
npm test -- --coverage --coverageThreshold='{"global":{"branches":80,"functions":80,"lines":80}}'
```

## 📝 注释规范

### 什么时候写注释？

✅ **应该写注释**：
- 复杂的业务逻辑
- 非显而易见的实现
- 公共 API 文档
- TODO 和 FIXME

❌ **不应该写注释**：
- 显而易见的代码
- 解释语法的注释
- 过时的注释

### 注释示例

```typescript
/**
 * 计算用户折扣价格
 * @param price - 原价
 * @param discountRate - 折扣率（0-1之间）
 * @returns 折扣后的价格
 * @throws Error 如果折扣率不在 0-1 之间
 */
function calculateDiscount(price: number, discountRate: number): number {
  if (discountRate < 0 || discountRate > 1) {
    throw new Error('Discount rate must be between 0 and 1');
  }
  return price * (1 - discountRate);
}

// 好的注释 - 解释为什么
// 使用 setTimeout 而不是 requestAnimationFrame，
// 因为需要确保 DOM 完全渲染后再执行
setTimeout(() => {
  updateLayout();
}, 0);

// 不好的注释 - 解释是什么
// 设置 name 为 'John'
const name = 'John';
```

## 🚀 Git 提交规范

### Commit Message 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响逻辑）
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建/工具链

### 示例

```bash
# 好的提交
git commit -m "feat(user): add email validation"
git commit -m "fix(auth): resolve token expiration issue"
git commit -m "docs(api): update authentication guide"

# 不好的提交
git commit -m "fix bug"
git commit -m "update code"
git commit -m "asdf"
```

## 📖 进阶学习

### 相关技能包

- [TDD 工作流](../tdd-workflow/) - 测试驱动开发
- [安全审查](../security-review/) - 安全检查清单
- [后端模式](../backend-patterns/) - 后端设计模式

### ECC 完整编码标准

想要学习完整的编码标准，请访问：

- **ECC Coding Standards**: [查看完整技能包](https://github.com/affaan-m/everything-claude-code/tree/main/skills/coding-standards/)
- **ECC Rules**: [查看规则文档](https://github.com/affaan-m/everything-claude-code/tree/main/rules/)

## 🔗 外部资源

- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) - 完整的 Claude Code 性能优化系统
- [ECC 精选资源](../../resources/external/everything-claude-code/) - Anything-AI 的 ECC 精选内容

---

**下一步**: [安全审查](../security-review/) | [返回技能包目录](../)