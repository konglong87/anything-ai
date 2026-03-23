---
title: Research Writing Scenario Prompts
difficulty: advanced
roles: [researcher, academic, writer]
type: guide
duration: 30 min
tags: [Prompts, Research, Writing, Academic]
tools: [Claude, ChatGPT, DeepSeek]
---

# Research Writing Scenario Prompts

## Paper Writing

### Paper Polishing

**Use Case**: Improve language quality and academic expression in papers

**Prompt Template**:
```
Please help me polish the following academic paper section:

[paper content]

Polishing requirements:
1. Improve accuracy of academic expression
2. Optimize sentence structure and flow
3. Enhance logical coherence
4. Improve word choice
5. Maintain original meaning
6. Match writing style of [target journal/conference]

Please provide:
1. Polished content
2. Modification explanation
3. List of improvements
4. Alternative expressions
```

**Example Input**:
```
Please help me polish the following academic paper section:

Original text:
In this paper, we propose a new method for image classification. The method is based on deep learning. We use a convolutional neural network to extract features from images. Then we use a classifier to classify the images. The results show that our method is better than other methods.

Polishing requirements:
1. Improve accuracy of academic expression
2. Optimize sentence structure and flow
3. Enhance logical coherence
4. Improve word choice
5. Maintain original meaning
6. Match CVPR writing style

Please provide:
1. Polished content
2. Modification explanation
3. List of improvements
4. Alternative expressions
```

**Example Output**:
```
## Polished Content

In this paper, we propose a novel deep learning-based approach for image classification. Our method leverages a convolutional neural network (CNN) architecture to extract discriminative features from input images, followed by a classifier for categorization. Experimental results demonstrate that our proposed method outperforms existing state-of-the-art approaches across multiple evaluation metrics.

## Modification Explanation

1. "new method" → "novel deep learning-based approach"
   - More specifically describes the method
   - Uses more academic vocabulary

2. "is based on" → "leverages"
   - Uses more active verb
   - Enhances expression strength

3. "extract features from images" → "extract discriminative features from input images"
   - Adds adjective "discriminative" to enhance description
   - Uses "input images" more precisely

4. "classify the images" → "categorization"
   - Avoids repeating "images"
   - Uses more formal vocabulary

5. "better than other methods" → "outperforms existing state-of-the-art approaches across multiple evaluation metrics"
   - Uses more specific academic expression
   - Adds "state-of-the-art" and "evaluation metrics" to enhance professionalism

## Improvements

- ✅ More academic vocabulary
- ✅ Richer sentence structures
- ✅ Better logical coherence
- ✅ More precise expression
- ✅ Matches top conference writing style

## Alternative Expressions

Alternative 1:
This paper presents a novel framework for image classification that employs a convolutional neural network for feature extraction, coupled with a classification module. Our empirical evaluations show superior performance compared to contemporary methods.

Alternative 2:
We introduce a deep learning methodology for image classification that utilizes CNN-based feature extraction followed by classification. Comparative analysis reveals that our approach achieves state-of-the-art performance on standard benchmarks.
```

**Notes**:
- Maintain core viewpoints of original text
- Match style of target journal/conference
- Avoid over-modification leading to distortion
- Maintain academic rigor

**Variation Suggestions**:
- Ask to adjust style for specific journal
- Ask how to enhance persuasiveness
- Ask to add transition words

### Abstract Writing

**Use Case**: Write or optimize paper abstracts

**Prompt Template**:
```
Please help me write/optimize a paper abstract:

[paper information: title, main content, methods, results, etc.]

Abstract requirements:
1. Word count: [word count requirement]
2. Include the following elements:
   - Research background and problem
   - Research method
   - Main results
   - Contributions and significance
3. Concise and powerful language
4. Clear logic
5. Attract reader interest

Please provide:
1. Abstract content
2. Structure explanation
3. Keyword list
```

**Example Input**:
```
Please help me write a paper abstract:

Paper information:
- Title: A Novel Deep Learning Approach for Image Classification
- Method: Uses improved CNN architecture, includes attention mechanism
- Datasets: ImageNet, CIFAR-10
- Results: Achieved 85% accuracy on ImageNet, 3% higher than SOTA
- Contribution: Proposed new attention module, improved classification performance

Abstract requirements:
1. Word count: 200-250 words
2. Include the following elements:
   - Research background and problem
   - Research method
   - Main results
   - Contributions and significance
3. Concise and powerful language
4. Clear logic
5. Attract reader interest

Please provide:
1. Abstract content
2. Structure explanation
3. Keyword list
```

**Example Output**:
```
## Abstract Content

Image classification remains a fundamental challenge in computer vision, with existing methods struggling to balance accuracy and computational efficiency. This paper presents a novel deep learning approach that addresses these limitations through an enhanced convolutional neural network (CNN) architecture incorporating attention mechanisms. Our proposed method introduces a new attention module that enables the model to focus on discriminative image regions, thereby improving classification performance. Extensive experiments on ImageNet and CIFAR-10 datasets demonstrate that our approach achieves 85% top-1 accuracy on ImageNet, outperforming state-of-the-art methods by 3%. The key contributions of this work include: (1) a novel attention mechanism for feature refinement, (2) improved classification accuracy without significant computational overhead, and (3) comprehensive analysis demonstrating the effectiveness of our approach across multiple benchmarks. These results suggest that our method offers a promising direction for advancing image classification systems.

## Structure Explanation

1. **Research Background and Problem** (Sentence 1)
   - Points out importance of image classification
   - Explains limitations of existing methods

2. **Research Method** (Sentences 2-3)
   - Introduces proposed CNN architecture
   - Explains role of attention mechanism

3. **Main Results** (Sentence 4)
   - Lists experimental datasets
   - Provides specific performance metrics
   - Compares with existing methods

4. **Contributions and Significance** (Sentences 5-6)
   - Lists main contribution points
   - Explains research significance and impact

## Keyword List

- Image Classification
- Deep Learning
- Convolutional Neural Network
- Attention Mechanism
- Feature Extraction
```

**Notes**:
- Ensure abstract covers all important parts of paper
- Control word count to meet requirements
- Use active voice to enhance expression
- Avoid too many technical details

**Variation Suggestions**:
- Ask to generate different length abstract versions
- Ask how to enhance attractiveness
- Ask to add research significance

### Introduction Writing

**Use Case**: Write paper introduction section

**Prompt Template**:
```
Please help me write a paper introduction:

[research topic, background, problem, etc.]

Introduction requirements:
1. Include the following elements:
   - Research background
   - Research problem
   - Existing methods and limitations
   - Contributions of this paper
2. Clear logic, progressive layers
3. Cite relevant literature
4. Word count: [word count requirement]

Please provide:
1. Introduction content
2. Structure explanation
3. Literature citation suggestions
```

**Example Input**:
```
Please help me write a paper introduction:

Research information:
- Topic: Attention mechanisms in image classification
- Background: CNN widely used in image classification
- Problem: Traditional CNNs struggle to capture long-range dependencies
- Existing methods: SENet, CBAM, etc., but high computational cost
- Our method: Lightweight attention module
- Contribution: Improve performance while reducing computational cost

Introduction requirements:
1. Include the following elements:
   - Research background
   - Research problem
   - Existing methods and limitations
   - Contributions of this paper
2. Clear logic, progressive layers
3. Cite relevant literature
4. Word count: 400-500 words

Please provide:
1. Introduction content
2. Structure explanation
3. Literature citation suggestions
```

**Example Output**:
```
## Introduction Content

Convolutional neural networks (CNNs) have achieved remarkable success in image classification tasks, demonstrating superior performance across various benchmarks [1,2]. However, traditional CNN architectures often struggle to capture long-range dependencies within images due to their localized receptive fields [3]. To address this limitation, attention mechanisms have been introduced to enable models to focus on informative regions and capture global context [4,5].

Recent advances in attention-based CNNs have shown promising results. Squeeze-and-Excitation Networks (SENet) [6] introduced channel-wise attention to adaptively recalibrate feature responses. Convolutional Block Attention Module (CBAM) [7] extended this idea by incorporating both channel and spatial attention. While these methods have improved classification performance, they often introduce significant computational overhead, limiting their practical deployment in resource-constrained environments [8].

In this paper, we propose a lightweight attention module that addresses these challenges. Our module is designed to capture long-range dependencies efficiently while maintaining computational efficiency. The main contributions of this work are threefold: (1) We introduce a novel attention mechanism that effectively captures global context with minimal computational cost; (2) We demonstrate that our approach achieves state-of-the-art performance on standard benchmarks; (3) We provide comprehensive analysis showing the efficiency of our method compared to existing approaches.

## Structure Explanation

1. **Research Background** (Paragraph 1)
   - Introduces CNN success
   - Points out limitations
   - Introduces attention mechanism

2. **Existing Methods and Limitations** (Paragraph 2)
   - Introduces SENet and CBAM
   - Explains their contributions
   - Points out computational cost issues

3. **Contributions of This Paper** (Paragraph 3)
   - Proposes solution
   - Lists main contributions
   - Explains research significance

## Literature Citation Suggestions

[1] Krizhevsky et al., "ImageNet Classification with Deep Convolutional Neural Networks", NIPS 2012
[2] He et al., "Deep Residual Learning for Image Recognition", CVPR 2016
[3] Luo et al., "Understanding the Effective Receptive Field in Deep CNNs", ICML 2016
[4] Vaswani et al., "Attention Is All You Need", NIPS 2017
[5] Woo et al., "CBAM: Convolutional Block Attention Module", ECCV 2018
[6] Hu et al., "Squeeze-and-Excitation Networks", CVPR 2018
[7] Woo et al., "CBAM: Convolutional Block Attention Module", ECCV 2018
[8] Howard et al., "EfficientNet: Rethinking Model Scaling for CNNs", ICML 2019
```

**Notes**:
- Ensure consistent citation format
- Balance background introduction and paper contributions
- Avoid too many technical details
- Maintain logical flow

**Variation Suggestions**:
- Ask to generate different length introductions
- Ask how to enhance persuasiveness
- Ask to add research motivation

## Literature Review

### Literature Search

**Use Case**: Search and organize relevant literature

**Prompt Template**:
```
Please help me search and organize relevant literature on [research topic].

Search requirements:
1. Time range: [year range]
2. Focus areas: [focus points]
3. Exclude: [irrelevant content]
4. Quantity: [number of papers]

Please provide:
1. Literature list (ranked by importance)
2. Brief summary of each paper
3. Research trend analysis
4. Research gap identification
```

**Example Input**:
```
Please help me search and organize relevant literature on "attention mechanisms in image classification".

Search requirements:
1. Time range: 2017-2024
2. Focus areas: Attention mechanisms in CNNs
3. Exclude: Transformer-related
4. Quantity: 10-15 papers

Please provide:
1. Literature list (ranked by importance)
2. Brief summary of each paper
3. Research trend analysis
4. Research gap identification
```

**Example Output**:
```
## Literature List

### 1. SENet (CVPR 2018)
**Title**: Squeeze-and-Excitation Networks
**Authors**: Hu et al.
**Summary**: First introduced channel attention mechanism, adaptively recalibrating channel feature responses to improve network performance.
**Importance**: ⭐⭐⭐⭐⭐ Pioneering work

### 2. CBAM (ECCV 2018)
**Title**: CBAM: Convolutional Block Attention Module
**Authors**: Woo et al.
**Summary**: Combines channel and spatial attention, providing more comprehensive information representation.
**Importance**: ⭐⭐⭐⭐⭐ Widely applied

### 3. BAM (BMVC 2018)
**Title**: BAM: Bottleneck Attention Module
**Authors**: Park et al.
**Summary**: Proposed lightweight attention module, balancing performance and efficiency through bottleneck structure.
**Importance**: ⭐⭐⭐⭐ Efficiency optimization

### 4. ECANet (CVPR 2020)
**Title**: ECA-Net: Efficient Channel Attention for Deep CNNs
**Authors**: Wang et al.
**Summary**: Simplified SENet, using 1D convolution to reduce computational complexity.
**Importance**: ⭐⭐⭐⭐ Efficiency improvement

### 5. GSoP-Net (ICCV 2019)
**Title**: GSoP-Net: Global Second-order Pooling Convolutional Networks
**Authors**: Li et al.
**Summary**: Uses second-order pooling to capture global context information.
**Importance**: ⭐⭐⭐ Novel method

### 6. AA-Net (CVPR 2020)
**Title**: An Attention-Augmented Convolutional Network
**Authors**: Bello et al.
**Summary**: Combines self-attention with convolution, enhances long-range dependency modeling.
**Importance**: ⭐⭐⭐ Hybrid architecture

### 7. CoordAttention (ICCV 2021)
**Title**: Coordinate Attention for Efficient Mobile Network Design
**Authors**: Hou et al.
**Summary**: Introduced coordinate attention, captures positional information while maintaining efficiency.
**Importance**: ⭐⭐⭐⭐ Mobile optimization

### 8. HaloNet (NeurIPS 2020)
**Title**: HaloNet for Mobile Semantic Image Segmentation
**Authors**: Vaswani et al.
**Summary**: Uses local attention to reduce computational complexity.
**Importance**: ⭐⭐⭐ Efficiency optimization

### 9. Shuffle Attention (CVPR 2021)
**Title**: SA-Net: Shuffle Attention for Deep CNN
**Authors**: Zhang et al.
**Summary**: Combines channel and spatial attention, uses shuffle operation to improve efficiency.
**Importance**: ⭐⭐⭐ Efficiency improvement

### 10. EMA (ICCV 2023)
**Title**: Efficient Multi-Scale Attention Module with Cross-Spatial Learning
**Authors**: Li et al.
**Summary**: Proposed multi-scale attention mechanism, captures features at different scales.
**Importance**: ⭐⭐⭐⭐ Latest advances

## Research Trend Analysis

1. **Early Stage (2017-2018)**
   - SENet and CBAM laid the foundation
   - Channel and spatial attention became mainstream

2. **Development Stage (2019-2020)**
   - Focus on efficiency optimization
   - Lightweight modules emerged

3. **Mature Stage (2021-2023)**
   - Multi-scale attention emerged
   - Mobile optimization became focus

## Research Gap Identification

1. **Balance Between Efficiency and Performance**
   - Existing methods struggle to achieve both high performance and high efficiency
   - Need better optimized attention mechanisms

2. **Long-range Dependency Modeling**
   - Local attention struggles to capture global information
   - Need more effective global modeling methods

3. **Cross-modal Attention**
   - Most work focuses on single modality
   - Cross-modal attention research insufficient

4. **Adaptive Attention**
   - Static attention mechanisms lack flexibility
   - Need dynamically adjusted attention mechanisms
```

**Notes**:
- Ensure literature relevance
- Rank reasonably by importance
- Provide accurate summaries
- Identify real research gaps

**Variation Suggestions**:
- Ask to generate literature review table
- Ask about research hotspot analysis
- Ask to add future direction suggestions

### Literature Review Writing

**Use Case**: Write literature review section

**Prompt Template**:
```
Please help me write a literature review:

[literature list, research topic, etc.]

Review requirements:
1. Organize by topic/method
2. Highlight development trajectory
3. Point out research gaps
4. Clear logic
5. Word count: [word count requirement]

Please provide:
1. Review content
2. Structure explanation
3. Research gap summary
```

**Example Input**:
```
Please help me write a literature review:

Literature list:
- SENet: Channel attention
- CBAM: Channel + spatial attention
- BAM: Lightweight attention
- ECANet: Efficient channel attention
- CoordAttention: Coordinate attention
- EMA: Multi-scale attention

Review requirements:
1. Organize by topic/method
2. Highlight development trajectory
3. Point out research gaps
4. Clear logic
5. Word count: 500-600 words

Please provide:
1. Review content
2. Structure explanation
3. Research gap summary
```

**Example Output**:
```
## Literature Review Content

Attention mechanisms have become a fundamental component in modern CNN architectures for image classification. Early work in this area focused primarily on channel-wise attention. Squeeze-and-Excitation Networks (SENet) pioneered this approach by introducing a mechanism to adaptively recalibrate channel-wise feature responses, demonstrating significant performance improvements with minimal computational overhead. Building upon this foundation, Convolutional Block Attention Module (CBAM) extended the concept by incorporating both channel and spatial attention, enabling the network to focus on "what" and "where" are important.

As research progressed, attention has evolved towards more efficient and diverse implementations. BAM addressed computational efficiency through a lightweight bottleneck structure, while ECANet further reduced complexity by replacing fully connected layers with one-dimensional convolutions. Recent advances have introduced novel attention paradigms: CoordAttention captures positional information through coordinate attention, and EMA proposes multi-scale attention to capture features at different scales.

Despite these advances, several research gaps remain. First, existing methods struggle to balance performance and efficiency, often achieving one at the expense of the other. Second, most attention mechanisms operate at a fixed scale, limiting their ability to capture multi-scale features effectively. Third, dynamic attention mechanisms that adapt to input characteristics remain underexplored. These gaps present opportunities for future research in developing more efficient, flexible, and adaptive attention mechanisms.

## Structure Explanation

1. **Early Work** (Paragraph 1)
   - Introduces SENet and CBAM
   - Explains basic concepts

2. **Development Evolution** (Paragraph 2)
   - Introduces efficiency optimization methods
   - Explains new attention paradigms

3. **Research Gaps** (Paragraph 3)
   - Lists main research gaps
   - Points out future directions

## Research Gap Summary

1. **Balance Between Efficiency and Performance**
   - Difficult to achieve both high performance and high efficiency

2. **Multi-scale Feature Capture**
   - Fixed scale limits feature representation capability

3. **Dynamic Adaptive Mechanisms**
   - Lack of ability to dynamically adjust based on input
```

**Notes**:
- Ensure consistent citation format
- Highlight development trajectory
- Avoid simple listing
- Point out real research gaps

**Variation Suggestions**:
- Ask to generate comparison table
- Ask how to enhance logical flow
- Ask to add future directions

## Summary

Research writing scenario prompts can help you:

**Core Scenarios**:
- ✅ Paper Polishing: Improve academic expression
- ✅ Abstract Writing: Write engaging abstracts
- ✅ Introduction Writing: Write compelling introductions
- ✅ Literature Search: Search and organize literature
- ✅ Literature Review: Write comprehensive reviews

**Best Practices**:
1. Clearly define writing goals and readers
2. Provide detailed background information
3. Request specific output formats
4. Maintain academic rigor
5. Continuously iterate and optimize

**Remember**:
- AI-generated content needs human review
- Adjust style based on target journal/conference
- Maintain academic integrity
- Keep citation format consistent
- Ensure clear and coherent logic

## Next Steps

- [Writing Scenario Prompts](./writing-prompts.en.md) - Learn prompt techniques for writing scenarios
- [Analysis Scenario Prompts](./analysis-prompts.en.md) - Learn prompt techniques for analysis scenarios
- [Prompts by Role](../by-role/) - Learn prompts for different roles