---
title: 安全审查 - 安全检查清单
description: 学习 Web 应用安全基础知识，掌握常见安全漏洞的防范方法
difficulty: advanced
roles: [programmer, developer]
type: guide
duration: 60min
tags: [安全, OWASP, 审查, ECC]
---


# 安全审查 - 安全检查清单

> **来源**: Everything Claude Code - `skills/security-review/`
> **外部链接**: [ECC 原始位置](https://github.com/affaan-m/everything-claude-code/tree/main/skills/security-review/)

## 🎯 为什么需要安全审查?

Web 应用面临多种安全威胁：

- 🔴 **数据泄露** - 敏感信息被窃取
- 🔴 **注入攻击** - SQL、XSS、命令注入
- 🔴 **身份伪造** - 越权访问、会话劫持
- 🔴 **服务中断** - DDoS、拒绝服务

## 📚 OWASP Top 10 - 十大安全风险

### 1. **注入攻击 (Injection)**

**风险**: SQL、NoSQL、OS 命令注入

**防范措施**:

```typescript
// ❌ 危险 - SQL 注入
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ 安全 - 参数化查询
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);

// ✅ 安全 - 使用 ORM
const user = await User.findById(userId);
```

### 2. **失效的身份认证**

**风险**: 弱密码、会话管理不当

**防范措施**:

```typescript
// ✅ 强密码策略
const passwordSchema = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSymbols: true
};

// ✅ 多因素认证
async function login(email: string, password: string, otp?: string) {
  const user = await authenticate(email, password);
  if (user.requiresMFA && !verifyOTP(otp)) {
    throw new Error('MFA required');
  }
  return user;
}

// ✅ 会话过期
const sessionConfig = {
  maxAge: 3600000, // 1小时
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
};
```

### 3. **敏感数据泄露**

**风险**: 明文存储、不安全的传输

**防范措施**:

```typescript
// ✅ 加密存储
import bcrypt from 'bcrypt';

const hashedPassword = await bcrypt.hash(password, 12);

// ✅ 数据脱敏
function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  return `${name.substring(0, 2)}***@${domain}`;
}

// ✅ HTTPS 强制
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});
```

### 4. **XML 外部实体 (XXE)**

**风险**: XML 解析器漏洞

**防范措施**:

```typescript
// ✅ 禁用外部实体
const xmlParserOptions = {
  noent: false,
  doctype: undefined,
  loadDTD: false
};
```

### 5. **失效的访问控制**

**风险**: 越权访问、URL 篡改

**防范措施**:

```typescript
// ✅ 权限检查
function canAccessResource(user: User, resource: Resource): boolean {
  return user.role === 'admin' || resource.ownerId === user.id;
}

// ✅ 路由保护
app.get('/admin/*', authenticate, authorize('admin'), adminRoutes);

// ✅ 资源所有权验证
async function getUserResource(userId: string, resourceId: string) {
  const resource = await Resource.findById(resourceId);
  if (resource.ownerId !== userId) {
    throw new ForbiddenError('Access denied');
  }
  return resource;
}
```

### 6. **安全配置错误**

**风险**: 默认配置、错误信息泄露

**防范措施**:

```typescript
// ✅ 安全的 HTTP Headers
app.use(helmet());

// ✅ 禁用详细错误
if (process.env.NODE_ENV === 'production') {
  app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal server error' });
  });
}

// ✅ 移除敏感 Header
app.use((req, res, next) => {
  res.removeHeader('X-Powered-By');
  next();
});
```

### 7. **跨站脚本 (XSS)**

**风险**: 恶意脚本注入

**防范措施**:

```typescript
// ✅ 输入验证和清理
import DOMPurify from 'dompurify';

function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input);
}

// ✅ 输出编码
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ✅ Content Security Policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://trusted.cdn.com'],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:']
    }
  })
);
```

### 8. **不安全的反序列化**

**风险**: 对象注入攻击

**防范措施**:

```typescript
// ❌ 危险 - 不安全的反序列化
const obj = eval('(' + jsonString + ')');

// ✅ 安全 - 使用 JSON.parse
const obj = JSON.parse(jsonString);

// ✅ 数据验证
import Ajv from 'ajv';

const ajv = new Ajv();
const validate = ajv.compile(userSchema);

if (!validate(userData)) {
  throw new Error('Invalid user data');
}
```

### 9. **使用含有已知漏洞的组件**

**风险**: 依赖包漏洞

**防范措施**:

```bash
# 定期检查依赖漏洞
npm audit

# 修复漏洞
npm audit fix

# 使用 Dependabot 自动更新
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: 'npm'
    directory: '/'
    schedule:
      interval: 'daily'
```

### 10. **日志和监控不足**

**风险**: 无法及时发现攻击

**防范措施**:

```typescript
// ✅ 记录安全事件
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'security.log' })
  ]
});

// 记录登录失败
logger.warn('Failed login attempt', {
  email: userEmail,
  ip: req.ip,
  timestamp: new Date().toISOString()
});

// ✅ 异常检测
if (failedAttempts > 5) {
  logger.error('Possible brute force attack', {
    ip: req.ip,
    attempts: failedAttempts
  });
  blockIP(req.ip);
}
```

## 🔒 安全检查清单

### 认证和授权

- [ ] 使用强密码策略
- [ ] 实现多因素认证（如适用）
- [ ] 会话超时机制
- [ ] 密码加密存储（bcrypt/scrypt）
- [ ] 实现 CSRF 保护

### 输入验证

- [ ] 验证所有用户输入
- [ ] 使用参数化查询
- [ ] 清理和转义输出
- [ ] 文件上传验证（类型、大小）
- [ ] 防止路径遍历

### 数据保护

- [ ] HTTPS 强制
- [ ] 敏感数据加密
- [ ] 数据脱敏（日志、响应）
- [ ] 安全的 Cookie 设置
- [ ] API 密钥和秘密管理

### 错误处理

- [ ] 不泄露敏感错误信息
- [ ] 自定义错误页面
- [ ] 记录详细错误日志
- [ ] 优雅的错误处理

### 依赖管理

- [ ] 定期更新依赖
- [ ] 使用 `npm audit` 检查漏洞
- [ ] 锁定依赖版本
- [ ] 移除未使用的依赖

## 🚀 安全工具

### 自动化安全扫描

```bash
# OWASP ZAP - Web 应用扫描
docker run -t owasp/zap2docker-stable zap-baseline.py -t https://your-app.com

# npm audit - 依赖漏洞检查
npm audit

# Snyk - 漏洞数据库
npx snyk test

# SonarQube - 代码质量扫描
sonar-scanner
```

### ECC AgentShield

ECC 提供的安全审计工具：

```bash
# 快速扫描
npx ecc-agentshield scan

# 深度分析
npx ecc-agentshield scan --opus --stream
```

## 📖 进阶学习

### 相关技能包

- [TDD 工作流](../tdd-workflow/) - 测试驱动开发
- [编码标准](../coding-standards/) - 通用编码规范
- [验证循环](../verification-loop/) - 持续验证机制

### ECC 完整安全资源

想要深入学习安全，请访问：

- **ECC Security Review**: [查看完整技能包](https://github.com/affaan-m/everything-claude-code/tree/main/skills/security-review/)
- **AgentShield**: [ECC 安全审计工具](https://github.com/affaan-m/everything-claude-code/tree/main/agentshield)
- **Security Guide**: [ECC 安全指南](https://github.com/affaan-m/everything-claude-code/blob/main/the-security-guide.md)

## 🔗 外部资源

- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) - 完整的 Claude Code 性能优化系统
- [ECC 精选资源](../../resources/external/everything-claude-code/) - Anything-AI 的 ECC 精选内容
- [OWASP](https://owasp.org/) - 开放式 Web 应用安全项目

---

**下一步**: [后端模式](../backend-patterns/) | [返回技能包目录](../)