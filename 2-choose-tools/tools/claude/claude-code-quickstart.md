---
title: "Claude Code 快速开始指南"
difficulty: beginner
roles: [programmer, developer]
type: tutorial
duration: 10min
tools: [claude-code]
tags: [Claude Code, 快速开始, 安装配置, 使用教程]
---

# Claude Code 快速开始指南

> **适合人群**：初次使用Claude Code的用户
>
> **阅读时间**：10分钟

## 🎯 学习目标

完成本指南后，你将能够：
- ✅ 安装和配置Claude Code
- ✅ 使用基本命令
- ✅ 完成第一个编程任务
- ✅ 掌握基本使用技巧

## 📦 安装Claude Code

### 方式一：NPM安装（推荐）

```bash
# 全局安装Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 验证安装
claude --version
```

### 方式二：Python安装

```bash
pip install claude-code
```

## 🔑 配置API密钥

### 步骤1：获取API密钥

1. 访问 [Claude官网](https://claude.ai)
2. 注册或登录账户
3. 进入API设置页面
4. 生成API密钥
5. **保存密钥**（只显示一次）

### 步骤2：配置环境变量

**macOS/Linux**：
```bash
# 临时设置（当前会话）
export ANTHROPIC_API_KEY="your-api-key-here"

# 永久设置（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

**Windows**：
```powershell
# 临时设置
set ANTHROPIC_API_KEY=your-api-key-here

# 永久设置（系统环境变量）
# 1. 右键"此电脑" → 属性 → 高级系统设置
# 2. 环境变量 → 新建用户变量
# 3. 变量名：ANTHROPIC_API_KEY
# 4. 变量值：your-api-key-here
```

## 🚀 第一个任务

### 任务：生成Python函数

```bash
# 启动Claude Code
claude

# 输入提示词
You: 帮我写一个Python函数，计算斐波那契数列的第n项
```

**Claude输出示例**：
```python
def fibonacci(n):
    """
    计算斐波那契数列的第n项

    参数:
        n (int): 要计算的项数

    返回:
        int: 斐波那契数列的第n项

    示例:
        >>> fibonacci(10)
        55
    """
    if n <= 0:
        raise ValueError("n必须为正整数")
    elif n == 1:
        return 0
    elif n == 2:
        return 1
    else:
        a, b = 0, 1
        for _ in range(2, n):
            a, b = b, a + b
        return b

# 使用示例
if __name__ == "__main__":
    for i in range(1, 11):
        print(f"fibonacci({i}) = {fibonacci(i)}")
```

### 任务：代码审查

```bash
You: 审查这段代码，指出潜在问题

[Paste your code here]
```

**Claude会提供**：
- 🔍 潜在bug分析
- ⚡ 性能优化建议
- 🔒 安全漏洞检测
- 📝 代码风格改进

## 💡 基本使用技巧

### 技巧1：提供清晰的上下文

**❌ 不好的提示词**：
```
写一个登录功能
```

**✅ 好的提示词**：
```
创建一个用户认证模块，要求：
1. 使用JWT进行身份验证
2. 支持密码加密存储
3. 包含注册、登录、登出功能
4. 添加输入验证
5. 使用Python和Flask框架
```

### 技巧2：分步骤实现

```
阶段1：设计数据模型
阶段2：实现用户认证
阶段3：创建API接口
阶段4：添加测试用例

先从阶段1开始...
```

### 技巧3：使用项目上下文

```
这是一个电商网站的后端项目，使用以下技术栈：
- 后端：Python + Flask
- 数据库：PostgreSQL
- 认证：JWT
- 任务队列：Celery

请帮我实现用户认证模块。
```

## 🎯 常用命令

### 代码生成
```bash
claude ask "生成一个React组件"
```

### 代码审查
```bash
claude review src/app.py
```

### 生成测试
```bash
claude test src/utils.js
```

### 生成文档
```bash
claude docs src/api.py
```

## 📚 下一步学习

完成本指南后，建议：

1. ✅ **实践练习**：尝试不同的编程任务
2. ✅ **阅读进阶技巧**：[Claude Code进阶技巧](./claude-code-advanced.md)
3. ✅ **探索高级应用**：[Claude Code高级应用](./claude-code-expert.md)

## 🔗 相关资源

- [Claude官方文档](https://docs.anthropic.com/claude)
- [Claude API文档](https://docs.anthropic.com/api)
- [everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- [Claude Code常见问题](https://docs.anthropic.com/claude/faq)

## 💬 常见问题

### Q1: 安装失败怎么办？

A: 检查以下几点：
1. Node.js版本是否 >= 16
2. npm版本是否最新
3. 网络连接是否正常
4. 是否有管理员权限

### Q2: API密钥无效？

A: 确认：
1. API密钥是否正确复制
2. 账户是否有效（未过期）
3. API密钥是否有足够权限

### Q3: 如何选择模型？

A: 推荐：
- **日常使用**：Claude Sonnet 4.6（平衡性能和速度）
- **复杂任务**：Claude Opus 4.6（最强推理能力）
- **简单任务**：Claude Haiku 4.5（快速响应）

---

**恭喜你完成了快速开始指南！** 🎉

继续学习：[Claude Code进阶技巧](./claude-code-advanced.md)