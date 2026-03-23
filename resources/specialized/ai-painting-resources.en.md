---
title: AI Painting Resources
difficulty: beginner
roles: [everyone]
type: resource
duration: 10 min
tags: [AI Painting, Image Generation, Resources]
tools: []
---

# AI Painting Resources

## Awesome AI Painting

**Repository**: https://github.com/hua1995116/awesome-ai-painting

**Introduction**:
This is a carefully curated list of AI painting resources, containing various AI painting tools, models, tutorials, and community resources, helping users quickly get started and advance in AI painting.

## Main Categories

### 1. AI Painting Platforms

**Online Platforms**:

| Platform | Features | Price | Use Cases |
|----------|----------|-------|-----------|
| Midjourney | Artistic, active community | $10+/month | Art creation, creative design |
| Stable Diffusion | Open-source, customizable | Free | Open-source applications, customization needs |
| DALL-E 3 | High quality, easy to use | Pay-per-use | Commercial applications, quick generation |
| Leonardo AI | Feature-rich, easy to use | Free+Paid | Quick prototyping, multiple styles |
| Adobe Firefly | Adobe integrated, safe | Pay-per-use | Adobe users, commercial applications |

**Local Deployment**:

| Platform | Features | Use Cases |
|----------|----------|-----------|
| Stable Diffusion WebUI | Comprehensive features, rich plugins | Local use, advanced features |
| ComfyUI | Node-based workflow | Professional users, complex workflows |
| InvokeAI | Easy to use, friendly interface | Beginners, quick start |
| Fooocus | Simplified Stable Diffusion | Quick generation, simple needs |
| Automatic1111 | Most popular WebUI | General scenarios, large community support |

**Usage Suggestions**:
- Art creation: Use Midjourney
- Open-source needs: Use Stable Diffusion
- Commercial applications: Use DALL-E 3 or Adobe Firefly
- Quick start: Use Fooocus or InvokeAI
- Professional needs: Use ComfyUI

### 2. Model Resources

**Base Models**:

| Model | Features | Use Cases |
|-------|----------|-----------|
| SD 1.5 | Classic, many plugins | General scenarios, plugin applications |
| SD 2.1 | Improved version, high quality | High quality needs |
| SDXL | High resolution, high quality | High resolution, professional needs |
| SD 3 | Latest, multilingual | Latest technology, multilingual |

**Fine-Tuned Models**:

| Model | Features | Use Cases |
|-------|----------|-----------|
| DreamShaper | Strong artistic style | Art creation |
| Realistic Vision | Strong realism | Realistic photos |
- Anime Pastel Dream: Anime style
- Deliberate: General high quality
- ChilloutMix: Asian portraits
- CounterfeitV: Anime style
- GhostMix: Artistic style
- Rev Animated: Animation style
- Majo Mix: Magic style
- Protogen: General style
- OpenJourney: Midjourney style

**Usage Suggestions**:
- General scenarios: Use SD 1.5 or SDXL
- Art creation: Use DreamShaper
- Realistic photos: Use Realistic Vision
- Anime style: Use Anime Pastel Dream or CounterfeitV
- Asian portraits: Use ChilloutMix

### 3. Prompt Engineering

**Prompt Structure**:

```
[Subject] [Style] [Details] [Quality Words] [Negative Prompts]
```

**Common Positive Prompts**:

**Quality Words**:
```
masterpiece, best quality, high quality, ultra-detailed,
highres, 8k, 4k, highly detailed
```

**Style Words**:
```
photorealistic, realistic, anime, illustration,
painting, drawing, sketch, 3d render, digital art
```

**Lighting Words**:
```
cinematic lighting, dramatic lighting, soft lighting,
natural lighting, volumetric lighting, studio lighting
```

**Composition Words**:
```
rule of thirds, golden ratio, wide angle, close up,
portrait, landscape, aerial view, bird's eye view
```

**Common Negative Prompts**:

```
lowres, bad anatomy, bad hands, text, error, missing fingers,
extra digit, fewer digits, cropped, worst quality, low quality,
normal quality, jpeg artifacts, signature, watermark, username,
blurry, ugly, duplicate, morbid, mutilated, out of frame, extra fingers
```

**Prompt Techniques**:

1. **Weight Control**
   - Use `(word)` to increase weight
   - Use `[word]` to decrease weight
   - Use `(word:1.5)` to specify weight

2. **Combination Techniques**
   - Use `|` to separate options
   - Use `BREAK` to separate sections
   - Use `AND` to combine elements

3. **Iterative Optimization**
   - Start with simple prompts
   - Gradually add details
   - Test different combinations
   - Record effective prompts

### 4. ControlNet

**ControlNet Types**:

| Type | Function | Use Cases |
|------|----------|-----------|
| Canny | Edge detection | Outline control |
| Depth | Depth map | Spatial control |
| OpenPose | Pose control | Character poses |
| Segmentation | Segmentation control | Regional control |
| Normal | Normal map | Surface control |
| Lineart | Line art control | Line art coloring |
| Shuffle | Color control | Color transfer |
| IP-Adapter | Image reference | Style transfer |

**Usage Scenarios**:

1. **Canny**
   - Preserve outlines
   - Change style
   - Line art coloring

2. **Depth**
   - Control space
   - Maintain perspective
   - Depth editing

3. **OpenPose**
   - Pose control
   - Action generation
   - Character arrangement

4. **Segmentation**
   - Regional control
   - Local editing
   - Scene construction

**Usage Suggestions**:
- Line art coloring: Use Canny or Lineart
- Character poses: Use OpenPose
- Spatial control: Use Depth
- Style transfer: Use IP-Adapter

### 5. LoRA

**LoRA Types**:

| Type | Function | Examples |
|------|----------|----------|
| Character LoRA | Specific characters | Celebrities, OC |
| Style LoRA | Specific styles | Artists, styles |
| Concept LoRA | Specific concepts | Objects, scenes |
| Action LoRA | Specific actions | Poses, actions |

**Common LoRAs**:

**Character LoRA**:
- Celebrity characters
- OC characters
- Anime characters

**Style LoRA**:
- Artist styles
- Painting styles
- Photography styles

**Concept LoRA**:
- Clothing
- Scenes
- Objects

**Usage Techniques**:

1. **Weight Adjustment**
   - Start from 0.5
   - Gradually adjust
   - Test effects

2. **Combined Use**
   - Combine multiple LoRAs
   - Pay attention to weight distribution
   - Avoid conflicts

3. **Train LoRA**
   - Prepare dataset
   - Choose appropriate parameters
   - Test and optimize

### 6. Workflows

**Simple Workflow**:

```
1. Write prompts
2. Select model
3. Generate images
4. Adjust parameters
5. Iterate and optimize
```

**Advanced Workflow**:

```
1. Prepare reference images
2. Use ControlNet for control
3. Apply LoRA
4. Generate initial images
5. Use img2img for optimization
6. Local repainting
7. Final adjustments
```

**Professional Workflow**:

```
1. Requirement analysis
2. Collect references
3. Design workflow
4. Prepare models and LoRAs
5. Configure ControlNet
6. Batch generation
7. Filter and optimize
8. Post-processing
9. Delivery
```

### 7. Tutorial Resources

**Beginner Tutorials**:

1. **Basic Concepts**
   - What is AI painting
   - Main platforms introduction
   - Basic terminology

2. **Quick Start**
   - Installation and deployment
   - Basic operations
   - Prompt writing

3. **Advanced Techniques**
   - Prompt engineering
   - ControlNet usage
   - LoRA application

**Advanced Tutorials**:

1. **Model Training**
   - Data preparation
   - Training methods
   - Optimization techniques

2. **Workflow Design**
   - Node workflows
   - Automation
   - Batch processing

3. **Advanced Applications**
   - Commercial applications
   - Creative projects
   - Art creation

**Recommended Resources**:

- **YouTube Channels**:
  - AI painting tutorials
  - Stable Diffusion tutorials
  - Midjourney tutorials

- **Online Courses**:
  - Coursera AI painting courses
  - Udemy AI painting courses
  - Bilibili AI painting tutorials

- **Community Resources**:
  - Civitai
  - Hugging Face
  - Reddit communities

### 8. Community Resources

**Model Sharing**:

| Platform | Features | Content |
|----------|----------|---------|
| Civitai | Largest model community | Models, LoRAs, Embeddings |
| Hugging Face | Open-source models | Models, datasets |
| LiblibAI | Chinese community | Models, tutorials, resources |

**Tutorial Sharing**:

- YouTube
- Bilibili
- Medium
- Zhihu

**Community Discussions**:

- Reddit
- Discord
- Telegram
- WeChat groups

**Inspiration Sources**:

- Pinterest
- ArtStation
- Behance
- Dribbble

## Integration with This Project

### 1. Tool Selection

**This Project's Tool Guides**:
- AI tool comparisons
- Usage suggestions
- Best practices

**Integration with AI Painting**:
- Understand painting platforms
- Choose appropriate tools
- Optimize workflows
- Improve creation efficiency

### 2. Prompt Engineering

**This Project's Prompt Library**:
- Prompt techniques
- Scenario applications
- Best practices

**Integration with AI Painting**:
- Apply prompt techniques
- Optimize painting prompts
- Improve generation quality
- Explore creative possibilities

### 3. Creative Applications

**This Project's Creative Applications**:
- Creative scenarios
- Practical cases
- Best practices

**Integration with AI Painting**:
- Explore creative scenarios
- Apply practical cases
- Learn best practices
- Innovate application methods

## Learning Path Recommendations

### Beginner Path

**Week 1: Understand Basics**
- Understand AI painting concepts
- Browse main platforms
- Try online tools
- Record usage experience

**Weeks 2-3: Practical Application**
- Choose one platform
- Learn prompts
- Generate images
- Optimize effects

**Week 4: Advanced Learning**
- Learn ControlNet
- Try LoRA
- Optimize workflows
- Share works

### Advanced Path

**Weeks 1-2: Deep Learning**
- Local deployment
- Learn advanced features
- Research models
- Explore workflows

**Weeks 3-4: Professional Application**
- Train LoRA
- Design workflows
- Commercial applications
- Creative projects

**Weeks 5-6: Innovation and Sharing**
- Innovative applications
- Share experiences
- Contribute to community
- Continuous learning

## Frequently Asked Questions

### Q1: How to choose an AI painting platform?

**A**:
1. Clarify needs
2. Evaluate costs
3. Consider technical barriers
4. Test effects

### Q2: How to choose between online platforms and local deployment?

**A**:
- Online platforms: Quick start, no configuration needed
- Local deployment: Powerful features, privacy and security

### Q3: How to improve generation quality?

**A**:
1. Optimize prompts
2. Choose appropriate models
3. Use ControlNet
4. Apply LoRA

### Q4: How to train my own LoRA?

**A**:
1. Prepare dataset
2. Choose training tools
3. Configure parameters
4. Test and optimize

## Summary

AI painting resources are important references for learning and applying AI painting:

**Core Resources**:
- ✅ AI painting platforms
- ✅ Model resources
- ✅ Prompt engineering
- ✅ ControlNet
- ✅ LoRA
- ✅ Workflows
- ✅ Tutorial resources
- ✅ Community resources

**Best Practices**:
1. Start simple
2. Progress gradually
3. Practice is primary
4. Continuous learning
5. Participate in community

**Remember**:
- Technology is a tool
- Creativity is core
- Practice is key
- Community is wealth

## Next Steps

- [AI Application Resources](./ai-apps-resources) - Learn more AI applications
- [Modern Generative AI Resources](../1-understand-ai/awesome-generative-ai-resources.md) - Learn about generative AI
- [Prompt Library](../../prompts/) - Learn prompt techniques