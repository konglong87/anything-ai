---
title: "资源文件说明"
difficulty: beginner
roles: [everyone]
type: guide
duration: 5min
tools: []
tags: [Assets, 资源文件, 图片]
---

# 资源文件说明

> **目录**: assets/
>
> **分类**: 图片资源 | 文档资源 | 其他资源

## 📁 目录结构

```
assets/
├── images/           # 图片资源
│   ├── screenshots/  # 截图
│   ├── diagrams/     # 图表
│   └── logos/       # Logo
├── docs/            # 文档资源
└── README.md        # 本文件
```

## 🖼️ 图片资源

### 截图 (screenshots/)

用于展示工具界面和使用效果的截图：

- **Claude Code**: Claude Code界面截图
- **Cursor**: Cursor IDE界面截图
- **DeepSeek**: DeepSeek界面截图
- **豆包**: 豆包界面截图
- **其他工具**: 其他AI工具的截图

### 图表 (diagrams/)

用于说明概念和流程的图表：

- **架构图**: 系统架构图
- **流程图**: 工作流程图
- **关系图**: 概念关系图
- **时序图**: 时间序列图

### Logo (logos/)

各种工具和平台的Logo：

- **AI工具**: Claude、ChatGPT、DeepSeek等
- **框架**: React、Vue、Django等
- **平台**: GitHub、GitLab等

## 📄 使用规范

### 图片命名

- 使用小写字母
- 使用连字符分隔单词
- 添加描述性后缀
- 示例：`claude-code-interface-dark.png`

### 图片格式

- **截图**: PNG (推荐) 或 JPG
- **图表**: SVG (推荐) 或 PNG
- **Logo**: SVG (推荐) 或 PNG

### 图片大小

- **截图**: 宽度不超过1200px
- **图表**: 宽度不超过800px
- **Logo**: 宽度不超过200px

### 图片压缩

- PNG: 使用TinyPNG或类似工具
- JPG: 质量设置为80-90%
- SVG: 使用SVGO优化

## 📝 添加新图片

### 1. 准备图片

```bash
# 调整大小
convert input.png -resize 1200x output.png

# 压缩PNG
pngquant --quality=80-90 input.png

# 优化SVG
svgo input.svg -o output.svg
```

### 2. 放置图片

```bash
# 放置截图
cp screenshot.png assets/images/screenshots/

# 放置图表
cp diagram.svg assets/images/diagrams/

# 放置Logo
cp logo.svg assets/images/logos/
```

### 3. 在文档中使用

```markdown
![描述](../assets/images/screenshots/screenshot.png)

![架构图](../assets/images/diagrams/architecture.svg)

![Claude Logo](../assets/images/logos/claude.svg)
```

## 🔗 相关资源

- [TinyPNG](https://tinypng.com/) - PNG压缩工具
- [SVGO](https://github.com/svg/svgo) - SVG优化工具
- [ImageMagick](https://imagemagick.org/) - 图片处理工具

## 💬 常见问题

### Q1: 如何截取高质量截图？

A: 建议：
1. 使用系统自带的截图工具
2. 调整窗口到合适大小
3. 确保界面清晰可见
4. 保存为PNG格式

### Q2: 如何创建图表？

A: 推荐：
1. 使用Mermaid创建流程图
2. 使用Draw.io创建架构图
3. 使用Excalidraw创建手绘风格图
4. 使用专业工具创建复杂图表

### Q3: 如何获取Logo？

A: 建议：
1. 从官方网站下载SVG版本
2. 确保使用许可允许
3. 优化文件大小
4. 保持原始比例

---

**遵循规范，保持资源文件整洁！** 🚀
