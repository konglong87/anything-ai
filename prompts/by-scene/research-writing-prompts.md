---
title: 研究写作场景提示词
difficulty: advanced
roles: [researcher, academic, writer]
type: guide
duration: 30 min
tags: [Prompts, Research, Writing, Academic]
tools: [Claude, ChatGPT, DeepSeek]
---

# 研究写作场景提示词

## 论文写作

### 论文润色

**使用场景**：提升论文的语言质量和学术表达

**提示词模板**：
```
请帮我润色以下学术论文段落：

[论文内容]

润色要求：
1. 提高学术表达的准确性
2. 优化句子结构和流畅度
3. 增强逻辑连贯性
4. 改进词汇选择
5. 保持原意不变
6. 符合[目标期刊/会议]的写作风格

请提供：
1. 润色后的内容
2. 修改说明
3. 改进点列表
4. 可选的替代表达
```

**示例输入**：
```
请帮我润色以下学术论文段落：

原文：
In this paper, we propose a new method for image classification. The method is based on deep learning. We use a convolutional neural network to extract features from images. Then we use a classifier to classify the images. The results show that our method is better than other methods.

润色要求：
1. 提高学术表达的准确性
2. 优化句子结构和流畅度
3. 增强逻辑连贯性
4. 改进词汇选择
5. 保持原意不变
6. 符合CVPR的写作风格

请提供：
1. 润色后的内容
2. 修改说明
3. 改进点列表
4. 可选的替代表达
```

**示例输出**：
```
## 润色后的内容

In this paper, we propose a novel deep learning-based approach for image classification. Our method leverages a convolutional neural network (CNN) architecture to extract discriminative features from input images, followed by a classifier for categorization. Experimental results demonstrate that our proposed method outperforms existing state-of-the-art approaches across multiple evaluation metrics.

## 修改说明

1. "new method" → "novel deep learning-based approach"
   - 更具体地描述方法
   - 使用更学术的词汇

2. "is based on" → "leverages"
   - 使用更主动的动词
   - 增强表达的力度

3. "extract features from images" → "extract discriminative features from input images"
   - 添加形容词"discriminative"增强描述
   - 使用"input images"更精确

4. "classify the images" → "categorization"
   - 避免重复使用"images"
   - 使用更正式的词汇

5. "better than other methods" → "outperforms existing state-of-the-art approaches across multiple evaluation metrics"
   - 使用更具体的学术表达
   - 添加"state-of-the-art"和"evaluation metrics"增强专业性

## 改进点

- ✅ 词汇更加学术化
- ✅ 句子结构更加丰富
- ✅ 逻辑更加连贯
- ✅ 表达更加精确
- ✅ 符合顶级会议的写作风格

## 可选的替代表达

替代1：
This paper presents a novel framework for image classification that employs a convolutional neural network for feature extraction, coupled with a classification module. Our empirical evaluations show superior performance compared to contemporary methods.

替代2：
We introduce a deep learning methodology for image classification that utilizes CNN-based feature extraction followed by classification. Comparative analysis reveals that our approach achieves state-of-the-art performance on standard benchmarks.
```

**注意事项**：
- 保持原文的核心观点
- 符合目标期刊/会议的风格
- 避免过度修改导致失真
- 保持学术严谨性

**变体建议**：
- 要求针对特定期刊调整风格
- 询问如何增强说服力
- 要求添加过渡词

### 摘要写作

**使用场景**：撰写或优化论文摘要

**提示词模板**：
```
请帮我撰写/优化论文摘要：

[论文信息：标题、主要内容、方法、结果等]

摘要要求：
1. 字数：[字数要求]
2. 包含以下要素：
   - 研究背景和问题
   - 研究方法
   - 主要结果
   - 贡献和意义
3. 语言简洁有力
4. 逻辑清晰
5. 吸引读者兴趣

请提供：
1. 摘要内容
2. 结构说明
3. 关键词列表
```

**示例输入**：
```
请帮我撰写论文摘要：

论文信息：
- 标题：A Novel Deep Learning Approach for Image Classification
- 方法：使用改进的CNN架构，包含注意力机制
- 数据集：ImageNet, CIFAR-10
- 结果：在ImageNet上达到85%的准确率，比SOTA高3%
- 贡献：提出了新的注意力模块，提高了分类性能

摘要要求：
1. 字数：200-250字
2. 包含以下要素：
   - 研究背景和问题
   - 研究方法
   - 主要结果
   - 贡献和意义
3. 语言简洁有力
4. 逻辑清晰
5. 吸引读者兴趣

请提供：
1. 摘要内容
2. 结构说明
3. 关键词列表
```

**示例输出**：
```
## 摘要内容

Image classification remains a fundamental challenge in computer vision, with existing methods struggling to balance accuracy and computational efficiency. This paper presents a novel deep learning approach that addresses these limitations through an enhanced convolutional neural network (CNN) architecture incorporating attention mechanisms. Our proposed method introduces a new attention module that enables the model to focus on discriminative image regions, thereby improving classification performance. Extensive experiments on ImageNet and CIFAR-10 datasets demonstrate that our approach achieves 85% top-1 accuracy on ImageNet, outperforming state-of-the-art methods by 3%. The key contributions of this work include: (1) a novel attention mechanism for feature refinement, (2) improved classification accuracy without significant computational overhead, and (3) comprehensive analysis demonstrating the effectiveness of our approach across multiple benchmarks. These results suggest that our method offers a promising direction for advancing image classification systems.

## 结构说明

1. **研究背景和问题**（第1句）
   - 指出图像分类的重要性
   - 说明现有方法的局限性

2. **研究方法**（第2-3句）
   - 介绍提出的CNN架构
   - 说明注意力机制的作用

3. **主要结果**（第4句）
   - 列出实验数据集
   - 给出具体性能指标
   - 与现有方法对比

4. **贡献和意义**（第5-6句）
   - 列出主要贡献点
   - 说明研究的意义和影响

## 关键词列表

- Image Classification
- Deep Learning
- Convolutional Neural Network
- Attention Mechanism
- Feature Extraction
```

**注意事项**：
- 确保摘要涵盖论文所有重要部分
- 控制字数符合要求
- 使用主动语态增强表达力
- 避免过多技术细节

**变体建议**：
- 要求生成不同长度的摘要版本
- 询问如何增强吸引力
- 要求添加研究意义

### 引言写作

**使用场景**：撰写论文引言部分

**提示词模板**：
```
请帮我撰写论文引言：

[研究主题、背景、问题等]

引言要求：
1. 包含以下要素：
   - 研究背景
   - 研究问题
   - 现有方法及局限性
   - 本文贡献
2. 逻辑清晰，层层递进
3. 引用相关文献
4. 字数：[字数要求]

请提供：
1. 引言内容
2. 结构说明
3. 文献引用建议
```

**示例输入**：
```
请帮我撰写论文引言：

研究信息：
- 主题：图像分类中的注意力机制
- 背景：CNN在图像分类中广泛应用
- 问题：传统CNN难以捕捉长距离依赖
- 现有方法：SENet、CBAM等，但计算开销大
- 本文方法：轻量级注意力模块
- 贡献：提高性能同时降低计算量

引言要求：
1. 包含以下要素：
   - 研究背景
   - 研究问题
   - 现有方法及局限性
   - 本文贡献
2. 逻辑清晰，层层递进
3. 引用相关文献
4. 字数：400-500字

请提供：
1. 引言内容
2. 结构说明
3. 文献引用建议
```

**示例输出**：
```
## 引言内容

Convolutional neural networks (CNNs) have achieved remarkable success in image classification tasks, demonstrating superior performance across various benchmarks [1,2]. However, traditional CNN architectures often struggle to capture long-range dependencies within images due to their localized receptive fields [3]. To address this limitation, attention mechanisms have been introduced to enable models to focus on informative regions and capture global context [4,5].

Recent advances in attention-based CNNs have shown promising results. Squeeze-and-Excitation Networks (SENet) [6] introduced channel-wise attention to adaptively recalibrate feature responses. Convolutional Block Attention Module (CBAM) [7] extended this idea by incorporating both channel and spatial attention. While these methods have improved classification performance, they often introduce significant computational overhead, limiting their practical deployment in resource-constrained environments [8].

In this paper, we propose a lightweight attention module that addresses these challenges. Our module is designed to capture long-range dependencies efficiently while maintaining computational efficiency. The main contributions of this work are threefold: (1) We introduce a novel attention mechanism that effectively captures global context with minimal computational cost; (2) We demonstrate that our approach achieves state-of-the-art performance on standard benchmarks; (3) We provide comprehensive analysis showing the efficiency of our method compared to existing approaches.

## 结构说明

1. **研究背景**（第1段）
   - 介绍CNN的成功
   - 指出局限性
   - 引入注意力机制

2. **现有方法及局限性**（第2段）
   - 介绍SENet和CBAM
   - 说明它们的贡献
   - 指出计算开销问题

3. **本文贡献**（第3段）
   - 提出解决方案
   - 列出主要贡献
   - 说明研究意义

## 文献引用建议

[1] Krizhevsky et al., "ImageNet Classification with Deep Convolutional Neural Networks", NIPS 2012
[2] He et al., "Deep Residual Learning for Image Recognition", CVPR 2016
[3] Luo et al., "Understanding the Effective Receptive Field in Deep CNNs", ICML 2016
[4] Vaswani et al., "Attention Is All You Need", NIPS 2017
[5] Woo et al., "CBAM: Convolutional Block Attention Module", ECCV 2018
[6] Hu et al., "Squeeze-and-Excitation Networks", CVPR 2018
[7] Woo et al., "CBAM: Convolutional Block Attention Module", ECCV 2018
[8] Howard et al., "EfficientNet: Rethinking Model Scaling for CNNs", ICML 2019
```

**注意事项**：
- 确保引用格式统一
- 平衡背景介绍和本文贡献
- 避免过多技术细节
- 保持逻辑流畅

**变体建议**：
- 要求生成不同长度的引言
- 询问如何增强说服力
- 要求添加研究动机

## 文献综述

### 文献搜索

**使用场景**：搜索和整理相关文献

**提示词模板**：
```
请帮我搜索和整理关于[研究主题]的相关文献。

搜索要求：
1. 时间范围：[年份范围]
2. 重点关注：[关注点]
3. 排除：[不相关的内容]
4. 数量：[文献数量]

请提供：
1. 文献列表（按重要性排序）
2. 每篇文献的简要总结
3. 研究趋势分析
4. 研究空白识别
```

**示例输入**：
```
请帮我搜索和整理关于"图像分类中的注意力机制"的相关文献。

搜索要求：
1. 时间范围：2017-2024
2. 重点关注：CNN中的注意力机制
3. 排除：Transformer相关
4. 数量：10-15篇

请提供：
1. 文献列表（按重要性排序）
2. 每篇文献的简要总结
3. 研究趋势分析
4. 研究空白识别
```

**示例输出**：
```
## 文献列表

### 1. SENet (CVPR 2018)
**标题**：Squeeze-and-Excitation Networks
**作者**：Hu et al.
**总结**：首次引入通道注意力机制，通过自适应地重新校准通道特征响应来提高网络性能。
**重要性**：⭐⭐⭐⭐⭐ 开创性工作

### 2. CBAM (ECCV 2018)
**标题**：CBAM: Convolutional Block Attention Module
**作者**：Woo et al.
**总结**：结合通道和空间注意力，提供更全面的信息表示。
**重要性**：⭐⭐⭐⭐⭐ 广泛应用

### 3. BAM (BMVC 2018)
**标题**：BAM: Bottleneck Attention Module
**作者**：Park et al.
**总结**：提出轻量级注意力模块，通过瓶颈结构平衡性能和效率。
**重要性**：⭐⭐⭐⭐ 效率优化

### 4. ECANet (CVPR 2020)
**标题**：ECA-Net: Efficient Channel Attention for Deep CNNs
**作者**：Wang et al.
**总结**：简化SENet，使用一维卷积降低计算复杂度。
**重要性**：⭐⭐⭐⭐ 效率改进

### 5. GSoP-Net (ICCV 2019)
**标题**：GSoP-Net: Global Second-order Pooling Convolutional Networks
**作者**：Li et al.
**总结**：使用二阶池化捕获全局上下文信息。
**重要性**：⭐⭐⭐ 新颖方法

### 6. AA-Net (CVPR 2020)
**标题**：An Attention-Augmented Convolutional Network
**作者**：Bello et al.
**总结**：将自注意力与卷积结合，增强长距离依赖建模。
**重要性**：⭐⭐⭐ 混合架构

### 7. CoordAttention (ICCV 2021)
**标题**：Coordinate Attention for Efficient Mobile Network Design
**作者**：Hou et al.
**总结**：引入坐标注意力，捕获位置信息同时保持效率。
**重要性**：⭐⭐⭐⭐ 移动端优化

### 8. HaloNet (NeurIPS 2020)
**标题**：HaloNet for Mobile Semantic Image Segmentation
**作者**：Vaswani et al.
**总结**：使用局部注意力降低计算复杂度。
**重要性**：⭐⭐⭐ 效率优化

### 9. Shuffle Attention (CVPR 2021)
**标题**：SA-Net: Shuffle Attention for Deep CNN
**作者**：Zhang et al.
**总结**：结合通道和空间注意力，使用混洗操作提高效率。
**重要性**：⭐⭐⭐ 效率改进

### 10. EMA (ICCV 2023)
**标题**：Efficient Multi-Scale Attention Module with Cross-Spatial Learning
**作者**：Li et al.
**总结**：提出多尺度注意力机制，捕获不同尺度的特征。
**重要性**：⭐⭐⭐⭐ 最新进展

## 研究趋势分析

1. **早期阶段（2017-2018）**
   - SENet和CBAM奠定基础
   - 通道和空间注意力成为主流

2. **发展阶段（2019-2020）**
   - 关注效率优化
   - 出现轻量级模块

3. **成熟阶段（2021-2023）**
   - 多尺度注意力兴起
   - 移动端优化成为重点

## 研究空白识别

1. **效率与性能的平衡**
   - 现有方法难以同时达到高性能和高效率
   - 需要更优化的注意力机制

2. **长距离依赖建模**
   - 局部注意力难以捕获全局信息
   - 需要更有效的全局建模方法

3. **跨模态注意力**
   - 大多数工作专注于单模态
   - 跨模态注意力研究不足

4. **自适应注意力**
   - 静态注意力机制缺乏灵活性
   - 需要动态调整的注意力机制
```

**注意事项**：
- 确保文献的相关性
- 按重要性合理排序
- 提供准确的总结
- 识别真实的研究空白

**变体建议**：
- 要求生成文献综述表格
- 询问研究热点分析
- 要求添加未来方向建议

### 文献综述写作

**使用场景**：撰写文献综述部分

**提示词模板**：
```
请帮我撰写文献综述：

[文献列表、研究主题等]

综述要求：
1. 按主题/方法分类
2. 突出发展脉络
3. 指出研究空白
4. 逻辑清晰
5. 字数：[字数要求]

请提供：
1. 综述内容
2. 结构说明
3. 研究空白总结
```

**示例输入**：
```
请帮我撰写文献综述：

文献列表：
- SENet: 通道注意力
- CBAM: 通道+空间注意力
- BAM: 轻量级注意力
- ECANet: 高效通道注意力
- CoordAttention: 坐标注意力
- EMA: 多尺度注意力

综述要求：
1. 按主题/方法分类
2. 突出发展脉络
3. 指出研究空白
4. 逻辑清晰
5. 字数：500-600字

请提供：
1. 综述内容
2. 结构说明
3. 研究空白总结
```

**示例输出**：
```
## 文献综述内容

Attention mechanisms have become a fundamental component in modern CNN architectures for image classification. Early work in this area focused primarily on channel-wise attention. Squeeze-and-Excitation Networks (SENet) pioneered this approach by introducing a mechanism to adaptively recalibrate channel-wise feature responses, demonstrating significant performance improvements with minimal computational overhead. Building upon this foundation, Convolutional Block Attention Module (CBAM) extended the concept by incorporating both channel and spatial attention, enabling the network to focus on "what" and "where" are important.

As research progressed, attention has evolved towards more efficient and diverse implementations. BAM addressed computational efficiency through a lightweight bottleneck structure, while ECANet further reduced complexity by replacing fully connected layers with one-dimensional convolutions. Recent advances have introduced novel attention paradigms: CoordAttention captures positional information through coordinate attention, and EMA proposes multi-scale attention to capture features at different scales.

Despite these advances, several research gaps remain. First, existing methods struggle to balance performance and efficiency, often achieving one at the expense of the other. Second, most attention mechanisms operate at a fixed scale, limiting their ability to capture multi-scale features effectively. Third, dynamic attention mechanisms that adapt to input characteristics remain underexplored. These gaps present opportunities for future research in developing more efficient, flexible, and adaptive attention mechanisms.

## 结构说明

1. **早期工作**（第1段）
   - 介绍SENet和CBAM
   - 说明基础概念

2. **发展演进**（第2段）
   - 介绍效率优化方法
   - 说明新注意力范式

3. **研究空白**（第3段）
   - 列出主要研究空白
   - 指出未来方向

## 研究空白总结

1. **效率与性能的平衡**
   - 难以同时达到高性能和高效率

2. **多尺度特征捕获**
   - 固定尺度限制特征表示能力

3. **动态自适应机制**
   - 缺乏根据输入动态调整的能力
```

**注意事项**：
- 确保引用格式统一
- 突出发展脉络
- 避免简单罗列
- 指出真实的研究空白

**变体建议**：
- 要求生成表格对比
- 询问如何增强逻辑性
- 要求添加未来方向

## 总结

研究写作场景提示词可以帮助你：

**核心场景**：
- ✅ 论文润色：提升学术表达
- ✅ 摘要写作：撰写吸引人的摘要
- ✅ 引言写作：撰写引人入胜的引言
- ✅ 文献搜索：搜索和整理文献
- ✅ 文献综述：撰写全面的综述

**最佳实践**：
1. 明确写作目标和读者
2. 提供详细的背景信息
3. 要求具体的输出格式
4. 保持学术严谨性
5. 持续迭代和优化

**记住**：
- AI生成的内容需要人工审核
- 根据目标期刊/会议调整风格
- 保持学术诚信
- 引用格式要统一
- 逻辑要清晰连贯

## 下一步学习

- [写作场景提示词](./writing-prompts.md) - 学习写作场景的提示词技巧
- [分析场景提示词](./analysis-prompts.md) - 学习分析场景的提示词技巧
- [按角色提示词](../by-role/) - 了解针对不同角色的提示词
