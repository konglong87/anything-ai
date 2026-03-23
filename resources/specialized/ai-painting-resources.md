---
title: AI绘画资源
difficulty: beginner
roles: [everyone]
type: resource
duration: 10 min
tags: [AI Painting, Image Generation, Resources]
tools: []
---

# AI绘画资源

## Awesome AI Painting

**仓库地址**：https://github.com/hua1995116/awesome-ai-painting

**简介**：
这是一个精心整理的AI绘画资源列表，包含各种AI绘画工具、模型、教程和社区资源，帮助用户快速入门和进阶AI绘画。

## 主要分类

### 1. AI绘画平台

**在线平台**：

| 平台 | 特点 | 价格 | 适用场景 |
|------|------|------|---------|
| Midjourney | 艺术性强、社区活跃 | $10+/月 | 艺术创作、创意设计 |
| Stable Diffusion | 开源、可定制 | 免费 | 开源应用、定制化需求 |
| DALL-E 3 | 质量高、易用 | 按使用付费 | 商业应用、快速生成 |
| Leonardo AI | 功能多、易用 | 免费+付费 | 快速原型、多种风格 |
| Adobe Firefly | Adobe集成、安全 | 按使用付费 | Adobe用户、商业应用 |

**本地部署**：

| 平台 | 特点 | 适用场景 |
|------|------|---------|
| Stable Diffusion WebUI | 功能全面、插件丰富 | 本地使用、高级功能 |
| ComfyUI | 节点式工作流 | 专业用户、复杂工作流 |
| InvokeAI | 易用、界面友好 | 初学者、快速上手 |
| Fooocus | 简化版Stable Diffusion | 快速生成、简单需求 |
| Automatic1111 | 最流行的WebUI | 通用场景、社区支持大 |

**使用建议**：
- 艺术创作：使用Midjourney
- 开源需求：使用Stable Diffusion
- 商业应用：使用DALL-E 3或Adobe Firefly
- 快速上手：使用Fooocus或InvokeAI
- 专业需求：使用ComfyUI

### 2. 模型资源

**基础模型**：

| 模型 | 特点 | 适用场景 |
|------|------|---------|
| SD 1.5 | 经典、插件多 | 通用场景、插件应用 |
| SD 2.1 | 改进版、质量高 | 高质量需求 |
| SDXL | 高分辨率、质量高 | 高分辨率、专业需求 |
| SD 3 | 最新、多语言 | 最新技术、多语言 |

**微调模型**：

| 模型 | 特点 | 适用场景 |
|------|------|---------|
| DreamShaper | 艺术风格强 | 艺术创作 |
| Realistic Vision | 真实感强 | 真实照片 |
- Anime Pastel Dream：动漫风格
- Deliberate：通用高质量
- ChilloutMix：亚洲人像
- CounterfeitV：动漫风格
- GhostMix：艺术风格
- Rev Animated：动画风格
- Majo Mix：魔法风格
- Protogen：通用风格
- OpenJourney：Midjourney风格

**使用建议**：
- 通用场景：使用SD 1.5或SDXL
- 艺术创作：使用DreamShaper
- 真实照片：使用Realistic Vision
- 动漫风格：使用Anime Pastel Dream或CounterfeitV
- 亚洲人像：使用ChilloutMix

### 3. 提示词工程

**提示词结构**：

```
[主体] [风格] [细节] [质量词] [负面提示词]
```

**常用正向提示词**：

**质量词**：
```
masterpiece, best quality, high quality, ultra-detailed, 
highres, 8k, 4k, highly detailed
```

**风格词**：
```
photorealistic, realistic, anime, illustration, 
painting, drawing, sketch, 3d render, digital art
```

**光影词**：
```
cinematic lighting, dramatic lighting, soft lighting, 
natural lighting, volumetric lighting, studio lighting
```

**构图词**：
```
rule of thirds, golden ratio, wide angle, close up, 
portrait, landscape, aerial view, bird's eye view
```

**常用负面提示词**：

```
lowres, bad anatomy, bad hands, text, error, missing fingers, 
extra digit, fewer digits, cropped, worst quality, low quality, 
normal quality, jpeg artifacts, signature, watermark, username, 
blurry, ugly, duplicate, morbid, mutilated, out of frame, extra fingers
```

**提示词技巧**：

1. **权重控制**
   - 使用`(word)`增加权重
   - 使用`[word]`降低权重
   - 使用`(word:1.5)`指定权重

2. **组合技巧**
   - 使用`|`分隔选项
   - 使用`BREAK`分隔段落
   - 使用`AND`组合元素

3. **迭代优化**
   - 从简单提示词开始
   - 逐步添加细节
   - 测试不同组合
   - 记录有效提示词

### 4. ControlNet

**ControlNet类型**：

| 类型 | 功能 | 适用场景 |
|------|------|---------|
| Canny | 边缘检测 | 轮廓控制 |
| Depth | 深度图 | 空间控制 |
| OpenPose | 姿态控制 | 人物姿态 |
| Segmentation | 分割控制 | 区域控制 |
| Normal | 法线图 | 表面控制 |
| Lineart | 线稿控制 | 线稿上色 |
| Shuffle | 色彩控制 | 色彩迁移 |
| IP-Adapter | 图像参考 | 风格迁移 |

**使用场景**：

1. **Canny**
   - 保留轮廓
   - 改变风格
   - 线稿上色

2. **Depth**
   - 控制空间
   - 保持透视
   - 深度编辑

3. **OpenPose**
   - 姿态控制
   - 动作生成
   - 人物编排

4. **Segmentation**
   - 区域控制
   - 局部编辑
   - 场景构建

**使用建议**：
- 线稿上色：使用Canny或Lineart
- 人物姿态：使用OpenPose
- 空间控制：使用Depth
- 风格迁移：使用IP-Adapter

### 5. LoRA

**LoRA类型**：

| 类型 | 功能 | 示例 |
|------|------|------|
| 人物LoRA | 特定人物 | 明星、OC |
| 风格LoRA | 特定风格 | 艺术家、风格 |
| 概念LoRA | 特定概念 | 物体、场景 |
| 动作LoRA | 特定动作 | 姿态、动作 |

**常用LoRA**：

**人物LoRA**：
- 明星人物
- OC角色
- 动漫角色

**风格LoRA**：
- 艺术家风格
- 绘画风格
- 摄影风格

**概念LoRA**：
- 服装
- 场景
- 物体

**使用技巧**：

1. **权重调整**
   - 从0.5开始
   - 逐步调整
   - 测试效果

2. **组合使用**
   - 多个LoRA组合
   - 注意权重分配
   - 避免冲突

3. **训练LoRA**
   - 准备数据集
   - 选择合适参数
   - 测试和优化

### 6. 工作流

**简单工作流**：

```
1. 编写提示词
2. 选择模型
3. 生成图像
4. 调整参数
5. 迭代优化
```

**高级工作流**：

```
1. 准备参考图
2. 使用ControlNet控制
3. 应用LoRA
4. 生成初始图像
5. 使用图生图优化
6. 局部重绘
7. 最终调整
```

**专业工作流**：

```
1. 需求分析
2. 收集参考
3. 设计工作流
4. 准备模型和LoRA
5. 配置ControlNet
6. 批量生成
7. 筛选和优化
8. 后期处理
9. 交付
```

### 7. 教程资源

**入门教程**：

1. **基础概念**
   - 什么是AI绘画
   - 主要平台介绍
   - 基本术语

2. **快速上手**
   - 安装部署
   - 基本操作
   - 提示词编写

3. **进阶技巧**
   - 提示词工程
   - ControlNet使用
   - LoRA应用

**进阶教程**：

1. **模型训练**
   - 数据准备
   - 训练方法
   - 优化技巧

2. **工作流设计**
   - 节点工作流
   - 自动化
   - 批量处理

3. **高级应用**
   - 商业应用
   - 创意项目
   - 艺术创作

**推荐资源**：

- **YouTube频道**：
  - AI绘画教程
  - Stable Diffusion教程
  - Midjourney教程

- **在线课程**：
  - Coursera AI绘画课程
  - Udemy AI绘画课程
  - B站AI绘画教程

- **社区资源**：
  - Civitai
  - Hugging Face
  - Reddit社区

### 8. 社区资源

**模型分享**：

| 平台 | 特点 | 内容 |
|------|------|------|
| Civitai | 最大模型社区 | 模型、LoRA、Embedding |
| Hugging Face | 开源模型 | 模型、数据集 |
| LiblibAI | 中文社区 | 模型、教程、资源 |

**教程分享**：

- YouTube
- B站
- Medium
- 知乎

**社区讨论**：

- Reddit
- Discord
- Telegram
- 微信群

**灵感来源**：

- Pinterest
- ArtStation
- Behance
- Dribbble

## 与本项目的结合

### 1. 工具选择

**本项目的工具指南**：
- AI工具对比
- 使用建议
- 最佳实践

**与AI绘画结合**：
- 了解绘画平台
- 选择合适工具
- 优化工作流程
- 提高创作效率

### 2. 提示词工程

**本项目的提示词库**：
- 提示词技巧
- 场景应用
- 最佳实践

**与AI绘画结合**：
- 应用提示词技巧
- 优化绘画提示词
- 提高生成质量
- 探索创意可能

### 3. 创意应用

**本项目的创意应用**：
- 创意场景
- 实战案例
- 最佳实践

**与AI绘画结合**：
- 探索创意场景
- 应用实战案例
- 学习最佳实践
- 创新应用方式

## 学习路径建议

### 初学者路径

**第1周：了解基础**
- 了解AI绘画概念
- 浏览主要平台
- 尝试在线工具
- 记录使用体验

**第2-3周：实践应用**
- 选择一个平台
- 学习提示词
- 生成图像
- 优化效果

**第4周：进阶学习**
- 学习ControlNet
- 尝试LoRA
- 优化工作流
- 分享作品

### 进阶者路径

**第1-2周：深入学习**
- 本地部署
- 学习高级功能
- 研究模型
- 探索工作流

**第3-4周：专业应用**
- 训练LoRA
- 设计工作流
- 商业应用
- 创意项目

**第5-6周：创新分享**
- 创新应用
- 分享经验
- 贡献社区
- 持续学习

## 常见问题

### Q1: 如何选择AI绘画平台？

**A**: 
1. 明确需求
2. 评估成本
3. 考虑技术门槛
4. 测试效果

### Q2: 在线平台和本地部署如何选择？

**A**: 
- 在线平台：快速上手、无需配置
- 本地部署：功能强大、隐私安全

### Q3: 如何提高生成质量？

**A**: 
1. 优化提示词
2. 选择合适模型
3. 使用ControlNet
4. 应用LoRA

### Q4: 如何训练自己的LoRA？

**A**: 
1. 准备数据集
2. 选择训练工具
3. 配置参数
4. 测试和优化

## 总结

AI绘画资源是学习和应用AI绘画的重要参考：

**核心资源**：
- ✅ AI绘画平台
- ✅ 模型资源
- ✅ 提示词工程
- ✅ ControlNet
- ✅ LoRA
- ✅ 工作流
- ✅ 教程资源
- ✅ 社区资源

**最佳实践**：
1. 从简单开始
2. 循序渐进
3. 实践为主
4. 持续学习
5. 参与社区

**记住**：
- 技术是工具
- 创意是核心
- 实践是关键
- 社区是财富

## 下一步学习

- [AI应用资源](./ai-apps-resources) - 了解更多AI应用
- [现代生成式AI资源](../1-understand-ai/awesome-generative-ai-resources.md) - 了解生成式AI
- [提示词库](../../prompts/) - 学习提示词技巧
