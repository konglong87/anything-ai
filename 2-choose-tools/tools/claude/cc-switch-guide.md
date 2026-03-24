---
title: "CC Switch 国内大模型切换教程"
difficulty: intermediate
roles: [programmer, developer]
type: guide
duration: 20min
tools: [claude-code, deepseek, qianwen]
tags: [Claude Code, 国内模型, DeepSeek, 通义千问, 文心一言]
---

# CC Switch 国内大模型切换教程

> **GitHub**: [farion1231/cc-switch](https://github.com/farion1231/cc-switch)
>
> **分类**: 工具配置 | 模型切换 | 国内使用

## 📖 简介

**cc-switch** 是一个强大的工具，允许你将Claude Code切换到国内大模型，解决国内访问Claude的问题。

## ✨ 核心功能

- 支持多种国内大模型（DeepSeek、通义千问、文心一言等）
- 无缝切换，无需修改代码
- 保持Claude Code的使用体验
- 支持自定义API端点

## 🚀 安装教程

### 前置要求
- Node.js 16+
- Claude Code已安装
- 国内大模型API密钥

### 安装步骤

#### 1. 安装cc-switch

```bash
# 使用npm安装
npm install -g cc-switch

# 或使用yarn安装
yarn global add cc-switch
```

#### 2. 配置API密钥

```bash
# 设置DeepSeek API密钥
cc-switch config set deepseek.api_key "your-deepseek-api-key"

# 设置通义千问API密钥
cc-switch config set qianwen.api_key "your-qianwen-api-key"

# 设置文心一言API密钥
cc-switch config set wenxin.api_key "your-wenxin-api-key"
```

#### 3. 配置API端点

```bash
# 设置DeepSeek API端点
cc-switch config set deepseek.endpoint "https://api.deepseek.com/v1"

# 设置通义千问API端点
cc-switch config set qianwen.endpoint "https://dashscope.aliyuncs.com/api/v1"

# 设置文心一言API端点
cc-switch config set wenxin.endpoint "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop"
```

#### 4. 切换模型

```bash
# 切换到DeepSeek
cc-switch use deepseek

# 切换到通义千问
cc-switch use qianwen

# 切换到文心一言
cc-switch use wenxin

# 查看当前使用的模型
cc-switch current
```

## 💡 使用方法

### 场景1：基本使用

```bash
# 1. 切换到DeepSeek
cc-switch use deepseek

# 2. 正常使用Claude Code
claude ask "帮我写一个Python函数"
```

### 场景2：项目配置

```bash
# 1. 在项目目录创建配置文件
cd your-project
cc-switch init

# 2. 编辑配置文件
cat .cc-switch.json
```

配置文件示例：
```json
{
  "model": "deepseek",
  "api_key": "your-deepseek-api-key",
  "endpoint": "https://api.deepseek.com/v1",
  "temperature": 0.7,
  "max_tokens": 2000
}
```

### 场景3：多模型切换

```bash
# 1. 查看可用模型
cc-switch list

# 输出示例：
# Available models:
# - deepseek (DeepSeek)
# - qianwen (通义千问)
# - wenxin (文心一言)

# 2. 根据任务切换模型
# 代码生成：使用DeepSeek
cc-switch use deepseek
claude ask "生成一个React组件"

# 文案创作：使用通义千问
cc-switch use qianwen
claude ask "写一个产品介绍"

# 问答：使用文心一言
cc-switch use wenxin
claude ask "解释什么是机器学习"
```

## 🎯 最佳实践

### 1. 根据任务选择模型

| 任务类型 | 推荐模型 | 原因 |
|---------|---------|------|
| 代码生成 | DeepSeek | 代码质量高，速度快 |
| 文案创作 | 通义千问 | 中文表达地道 |
| 问答咨询 | 文心一言 | 知识库丰富 |
| 数据分析 | DeepSeek | 逻辑推理强 |
| 翻译任务 | 通义千问 | 翻译质量好 |

### 2. 性能优化

```bash
# 调整温度参数
cc-switch config set temperature 0.5  # 更确定性的输出

# 调整最大token数
cc-switch config set max_tokens 1000  # 控制输出长度

# 启用缓存
cc-switch config set cache.enabled true
```

### 3. 错误处理

```bash
# 查看日志
cc-switch logs

# 清除缓存
cc-switch cache clear

# 重置配置
cc-switch reset
```

## ⚠️ 注意事项

1. **API密钥安全**
   - 不要在代码中硬编码API密钥
   - 使用环境变量
   - 定期更换密钥

2. **使用限制**
   - 注意API调用频率限制
   - 监控API使用量
   - 合理规划使用

3. **模型差异**
   - 不同模型能力不同
   - 输出风格可能有差异
   - 根据任务选择合适的模型

## 🔗 相关资源

- [GitHub仓库](https://github.com/farion1231/cc-switch)
- [DeepSeek API文档](https://platform.deepseek.com/api-docs/)
- [通义千问API文档](https://help.aliyun.com/zh/dashscope/)
- [文心一言API文档](https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html)

## 💬 常见问题

### Q1: 如何获取API密钥？

A: 
1. DeepSeek: 访问 [DeepSeek开放平台](https://platform.deepseek.com/) 注册
2. 通义千问: 访问 [阿里云百炼](https://bailian.console.aliyun.com/) 注册
3. 文心一言: 访问 [百度智能云](https://cloud.baidu.com/) 注册

### Q2: 切换模型后需要重启Claude Code吗？

A: 不需要。cc-switch会自动处理模型切换，无需重启。

### Q3: 支持哪些国内大模型？

A: 目前支持：
- DeepSeek
- 通义千问
- 文心一言
- 智谱AI
- 月之暗面

### Q4: 如何解决连接问题？

A: 
1. 检查网络连接
2. 验证API密钥是否正确
3. 确认API端点是否可访问
4. 查看日志获取详细错误信息

## 📚 进阶技巧

### 1. 自定义模型

```bash
# 添加自定义模型
cc-switch model add custom   --name "my-model"   --endpoint "https://api.example.com/v1"   --api-key "your-api-key"

# 使用自定义模型
cc-switch use my-model
```

### 2. 环境变量配置

```bash
# 在~/.bashrc或~/.zshrc中添加
export CC_SWITCH_MODEL="deepseek"
export CC_SWITCH_API_KEY="your-api-key"
export CC_SWITCH_ENDPOINT="https://api.deepseek.com/v1"

# 重新加载配置
source ~/.bashrc
```

### 3. 脚本自动化

```bash
#!/bin/bash
# auto-switch.sh

# 根据任务自动切换模型
case "$1" in
  "code")
    cc-switch use deepseek
    ;;
  "writing")
    cc-switch use qianwen
    ;;
  "qa")
    cc-switch use wenxin
    ;;
  *)
    echo "Usage: $0 {code|writing|qa}"
    exit 1
esac
```

使用：
```bash
./auto-switch.sh code  # 切换到DeepSeek
./auto-switch.sh writing  # 切换到通义千问
./auto-switch.sh qa  # 切换到文心一言
```

### 4. 集成到工作流

```json
// package.json
{
  "scripts": {
    "code:review": "cc-switch use deepseek && claude review",
    "doc:generate": "cc-switch use qianwen && claude docs",
    "test:generate": "cc-switch use wenxin && claude test"
  }
}
```

使用：
```bash
npm run code:review  # 使用DeepSeek进行代码审查
npm run doc:generate  # 使用通义千问生成文档
npm run test:generate  # 使用文心一言生成测试
```

---

**开始使用cc-switch，在国内畅快使用Claude Code！** 🚀
