---
title: "开发相关Skills"
difficulty: beginner
roles: [programmer]
type: concept
duration: 35min
tools: [gstack]
tags: [development, code-generation, tools]
---

# 开发相关Skills

> **分类**: 代码生成 | 开发工具 | 编程辅助

本目录收集了开发相关的AI Skills，帮助你：
- 快速生成代码
- 进行代码审查
- 解决编程问题
- 学习新技术

## 📚 Skills列表

### 1. GStack - 技术栈管理工具
- **GitHub**: [garrytan/gstack](https://github.com/garrytan/gstack)
- **功能**: 技术栈管理，项目脚手架
- **使用场景**: 项目创建、技术栈配置、快速开发
- **核心能力**: 多种项目模板、自动配置、代码生成
- **详细文档**: [查看详情](./gstack.md)

### 2. Gstack (Claude Code Skills) - YC创业方法论
- **GitHub**: [garrytau/gstack](https://github.com/garrytau/gstack)
- **作者**: Garry Tan（YC总裁）
- **功能**: Claude Code技能包，26个斜杠命令覆盖产品→发布全流程
- **使用场景**: 0→1 MVP设计、产品审查、架构设计、安全审计
- **核心命令**:
  - `/office-hours` - YC创业导师视角，深挖需求真实性
  - `/plan-ceo-review` - CEO/投资人视角，审定产品愿景
  - `/plan-eng-review` - 工程视角，确认技术架构
  - `/review` - 代码和安全审查
  - `/ship` - 一键发布
- **实测效果**: 2.5小时完成项目全流程设计
- **详细文档**: [查看详情](./gstack-claude-code.md)

### 3. Karpathy Guidelines - LLM编码行为指南
- **GitHub**: [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)
- **灵感来源**: Andrej Karpathy 对 LLM 编码陷阱的观察
- **功能**: 四大原则改善AI编码行为——编码前思考、简洁优先、精准修改、目标驱动执行
- **使用场景**: 代码审查、新功能开发、Bug修复、代码重构
- **核心原则**:
  - 编码前思考：不要假设，呈现权衡
  - 简洁优先：用最少的代码解决问题
  - 精准修改：只碰必须碰的代码
  - 目标驱动执行：定义成功标准，循环验证
- **支持工具**: Claude Code（插件）、Cursor（项目规则）、通用（CLAUDE.md）
- **详细文档**: [查看详情](./karpathy-guidelines.md)

### 4. awesome-agent-skills
- **GitHub**: [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)
- **功能**: Agent技能集合
- **使用场景**: Agent开发、自动化任务
- **详细文档**: [查看详情](../agent/awesome-agent-skills.md)

### 4. 代码生成Skill
- **功能**: 多语言代码生成
- **使用场景**: 快速原型、功能实现、代码补全
- **详细文档**: [查看详情](./code-generation.md)

### 5. 代码审查Skill
- **功能**: 自动代码审查和优化
- **使用场景**: 代码质量检查、性能优化、安全检测
- **详细文档**: [查看详情](./code-review.md)

### 6. 调试辅助Skill
- **功能**: 智能调试和问题诊断
- **使用场景**: Bug定位、错误分析、解决方案提供
- **详细文档**: [查看详情](./debugging.md)

### 7. 测试生成Skill
- **功能**: 自动生成测试用例
- **使用场景**: 单元测试、集成测试、端到端测试
- **详细文档**: [查看详情](./test-generation.md)

## 💡 使用建议

### 选择合适的Skill

**项目创建场景**：
- **GStack（技术栈工具）**：快速创建项目脚手架、配置技术栈
- **Gstack（Claude Code技能）**：YC创业方法论、产品设计审查、架构设计

**MVP产品设计场景**：
- 需求验证 → Gstack (Claude Code) `/office-hours`
- 产品审查 → Gstack (Claude Code) `/plan-ceo-review`
- 架构设计 → Gstack (Claude Code) `/plan-eng-review`
- 项目创建 → GStack（技术栈工具）

**技术学习场景**：
- 学习新技术 → GStack创建示例项目
- 最佳实践 → Gstack (Claude Code) 工程规范审查
- 技术对比 → 多技术栈并行测试

**项目重构场景**：
- 技术升级 → GStack新版本脚手架
- 架构优化 → Gstack (Claude Code) `/plan-eng-review`
- 代码迁移 → 标准化项目结构

### 配置和定制

**GStack配置**：
1. 选择适合的技术栈模板
2. 配置项目基本信息
3. 自定义项目结构
4. 集成开发工具（ESLint、Prettier等）

**最佳实践**：
- 使用最新稳定版本
- 遵循社区最佳实践
- 保持项目结构一致性
- 定期更新技术栈

### 验证生成代码

**代码质量检查**：
- 运行代码检查工具
- 查看生成的配置文件
- 测试项目启动流程
- 检查依赖兼容性

**安全审查**：
- 检查依赖安全性
- 审查配置文件
- 验证环境变量
- 测试构建流程

### 组合使用效果

**GStack + Planning with Files**：
- 项目搭建时间减少 **70%**
- 开发规范一致性 **95%**
- 团队协作效率提升 **50%**
- 技术债务减少 **60%**

**工作流示例**：
```bash
# 1. 使用GStack创建项目
gstack create my-project --template nextjs-ts

# 2. 进入项目目录
cd my-project

# 3. 查看生成的结构
tree -L 2

# 4. 启动开发服务器
npm run dev

# 5. 使用Planning with Files规划开发任务
# 创建任务文件，分解开发步骤
```

### 实际效果数据

**项目创建速度**：
- 传统方式：2-4小时
- 使用GStack：5-10分钟
- 效率提升：**95%**

**配置准确性**：
- 手动配置错误率：15-20%
- GStack配置错误率：< 2%
- 准确率提升：**90%**

**团队协作**：
- 新成员上手时间：1-2周 → 1-2天
- 项目结构一致性：60% → 95%
- 代码审查效率：提升 **40%**

## 🔗 相关资源

- [Claude官方文档](https://docs.anthropic.com/claude)
- [编程最佳实践](https://github.com/topics/best-practices)
- [代码审查工具](https://github.com/topics/code-review)

---

**开始使用开发类Skills，提升你的编程效率！** 🚀
