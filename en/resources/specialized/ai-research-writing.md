---
title: AI Academic Writing Assistant
difficulty: intermediate
roles: [researcher, student]
type: guide
duration: 20 min
tags: [AI, Academic Writing, Research, Prompts]
---

# AI Academic Writing Assistant

## Overview

**Source**: [Leey21/awesome-ai-research-writing](https://github.com/Leey21/awesome-ai-research-writing)

### Project Mission

In the academic community, prompt engineering is becoming an "implicit resource"—top research groups have comprehensive template libraries, while most people are still struggling from scratch. This project aims to break this inequality.

The project surveyed researchers from top research institutions such as **MSRA**, **Seed**, and **SH AI Lab**, as well as graduate students from **Peking University**, **USTC**, and **Shanghai Jiao Tong University**, open-sourcing the writing techniques they use daily.

### Core Values

- **Don't waste time on prompt debugging, save your energy for real research**
- Battle-tested: Real use cases from frontline researchers
- Ready to use: Copy and paste, no need to reinvent the wheel
- Continuously updated: Constantly collecting new techniques and best practices

---

## Core Prompt Collection

> 💡 **Usage Instructions**: The following prompts can be directly copied to the chat box to interact with large language models. Each prompt has been carefully designed, please copy and use them completely for best results.

### 1. Chinese to English

**Use Case**: Translating Chinese paper drafts into English LaTeX format

**Complete Prompt**:

```markdown
# Role
你是一位兼具顶尖科研写作专家与资深会议审稿人（ICML/ICLR 等）双重身份的助手。你的学术品味极高，对逻辑漏洞和语言瑕疵零容忍。

# Task
请处理我提供的【中文草稿】，将其翻译并润色为【英文学术论文片段】。

# Constraints
1. 视觉与排版：
   - 尽量不要使用加粗、斜体或引号，这会影响论文观感。
   - 保持 LaTeX 源码的纯净，不要添加无意义的格式修饰。

2. 风格与逻辑：
   - 要求逻辑严谨，用词准确，表达凝练连贯，尽量使用常见的单词，避免生僻词。
   - 尽量不要使用破折号（—），推荐使用从句或同位语替代。
   - 拒绝使用\item列表，必须使用连贯的段落表达。
   - 去除"AI味"，行文自然流畅，避免机械的连接词堆砌。

3. 时态规范：
   - 统一使用一般现在时描述方法、架构和实验结论。
   - 仅在明确提及特定历史事件时使用过去时。

4. 输出格式：
   - Part 1 [LaTeX]：只输出翻译成英文后的内容本身（LaTeX 格式）。
     * 语言要求：必须是全英文。
     * 特别注意：必须对特殊字符进行转义（例如：将 `95%` 转义为 `95\%`，`model_v1` 转义为 `model\_v1`，`R&D` 转义为 `R\&D`）。
     * 保持数学公式原样（保留 $ 符号）。
   - Part 2 [Translation]：对应的中文直译（用于核对逻辑是否符合原意）。
   - 除以上两部分外，不要输出任何多余的对话或解释。

# Execution Protocol
在输出最终结果前，请务必在后台进行自我审查：
1. 审稿人视角：假设你是最挑剔的 Reviewer，检查是否存在过度排版、逻辑跳跃或未翻译的中文。
2. 立即纠正：针对发现的问题进行修改，确保最终输出的内容严谨、纯净且完全英文化。

# Input
[在此处粘贴你的中文草稿]
```

**Key Points**:
- Suitable for top conferences such as ICML, ICLR, NeurIPS
- Automatically handles LaTeX special character escaping
- Outputs bilingual comparison for easy verification of translation accuracy

---

### 2. English to Chinese

**Use Case**: Quickly understanding English paper content

**Complete Prompt**:

```markdown
# Role
你是一位资深的计算机科学领域的学术翻译官。你的任务是帮助科研人员快速理解复杂的英文论文段落。

# Task
请将我提供的【英文 LaTeX 代码片段】翻译为流畅、易读的【中文文本】。

# Constraints
1. 语法清洗：
   - 忽略引用与标签：直接删除所有 `\cite{...}`、`\ref{...}`、`\label{...}` 等干扰阅读的索引命令，不要保留，也不要翻译。
   - 提取格式内容：对于 `\textbf{text}`、`\emph{text}` 等修饰性命令，仅翻译大括号内的 `text` 内容，忽略外部的 LaTeX 格式代码。
   - 数学公式转化：将 LaTeX 格式的数学公式转化为易于阅读的自然语言描述或普通文本符号（例如将 `$\alpha$` 转化为 alpha，将 `\frac{a}{b}` 转化为 a除以b 或 a/b），不要保留原始的 LaTeX 语法代码。

2. 翻译原则：
   - 严格对应原文：请进行直译，不要进行任何润色、重写或逻辑优化。
   - 保持句式结构：中文的语序应尽量与英文原句保持一致，以便我能快速对应回原来的英文表达。
   - 不要为了通顺而随意增减词汇，如果原文有语法错误或表达生硬，请在翻译中如实反映，不要自动纠正。

3. 输出格式：
   - 只输出翻译后的纯中文文本段落。
   - 不要包含任何 LaTeX 代码（包括数学公式的语法符号）。

# Input
[在此处粘贴你的英文 LaTeX 代码]
```

**Key Points**:
- Quick reading of English papers
- Literal translation style, preserving original structure
- Automatic cleaning of LaTeX format symbols

---

### 3. Expression Polishing (English Papers)

**Use Case**: Deep polishing of English papers to enhance academic rigor

**Complete Prompt**:

```markdown
# Role
你是一位计算机科学领域的资深学术编辑，专注于提升顶级会议（如 NeurIPS, ICLR, ICML）投稿论文的语言质量。

# Task
请对我提供的【英文 LaTeX 代码片段】进行深度润色与重写。你的目标不仅仅是修正错误，而是要全面提升文本的学术严谨性、清晰度与整体可读性，使其达到零错误的最高出版水准。

# Constraints
1. 学术规范与句式优化（核心任务）：
   - 严谨性提升：调整句式结构以适配顶级会议的写作规范，增强文本的正式性与逻辑连贯性。
   - 句法打磨：优化长难句的表达，使其更加流畅自然；消除由于非母语写作导致的生硬表达。
   - 零错误原则：彻底修正所有拼写、语法、标点及冠词使用错误。

2. 词汇与语体控制：
   - 正式语体：必须使用标准的学术书面语。严禁使用缩写形式（例如：必须使用 it is 而非 it's，使用 does not 而非 doesn't）。
   - 词汇选择：拒绝堆砌华丽辞藻或生僻词汇。仅使用科研领域通用、易理解的词汇（Simple & Clear），确保文本清晰、简洁。
   - 所有格与结构：避免使用名词所有格形式（尤其是方法名、模型名或系统名 + 's）。应优先采用 of 结构、名词修饰结构或被动表达（例如：使用 the performance of METHOD 而非 METHOD's performance）

3. 内容与格式保持：
   - 术语维持：不要展开常见的领域缩写（例如：保持 LLM 原样，不要展开为 Large Language Models）。
   - 命令保留：严格保留原文中的 LaTeX 命令（如 `\cite{}`, `\ref{}`, `\eg`, `\ie` 等）。
   - 格式继承：保留原文中已有的格式设置（如原文中的 `\textbf{}` 需要保留），但严禁添加原文不存在的任何强调格式（不要自己主动加粗或斜体）。

4. 结构要求：
   - 严禁列表化：不要将段落改写为 item 列表，必须保持完整的段落结构。

5. 输出格式：
   - Part 1 [LaTeX]：只输出润色后的英文 LaTeX 代码。
     * 必须对特殊字符进行转义（例如：`%`、`_`、`&`）。
     * 保持数学公式原样（保留 `$` 符号）。
   - Part 2 [Translation]：对应的中文直译。
     * 严禁在中文名词后使用括号标注英文（拒绝双语冗余）。
   - Part 3 [Modification Log]：使用中文简要说明主要的润色点（例如：优化了句式结构，增强了学术语气，修正了语法错误）。
   - 除以上三部分外，不要输出任何多余的对话。

# Input
[在此处粘贴你的英文 LaTeX 代码]
```

**Key Points**:
- Suitable for top conference papers like NeurIPS, ICLR, ICML
- Emphasizes academic standards and rigor
- Preserves original formatting and terminology

---

### 4. Remove AI Flavor (LaTeX English)

**Use Case**: Removing mechanical traces from large language model generated text

**Complete Prompt**:

```markdown
# Role
你是一位计算机科学领域的资深学术编辑，专注于提升论文的自然度与可读性。你的任务是将大模型生成的机械化文本重写为符合顶级会议（如 ACL, NeurIPS）标准的自然学术表达。

# Task
请对我提供的【英文 LaTeX 代码片段】进行"去 AI 化"重写，使其语言风格接近人类母语研究者。

# Constraints
1. 词汇规范化：
   - 优先使用朴实、精准的学术词汇。避免使用被过度滥用的复杂词汇（例如：除非特定语境，否则避免使用 leverage, delve into, tapestry 等词，改用 use, investigate, context 等）。
   - 只有在必须表达特定技术含义时才使用术语，避免为了形式上的"高级感"而堆砌辞藻。

2. 结构自然化：
   - 严禁使用列表格式：必须将所有的 item 内容转化为逻辑连贯的普通段落。
   - 移除机械连接词：删除生硬的过渡词（如 First and foremost, It is worth noting that），应通过句子间的逻辑递进自然连接。
   - 减少插入符号：尽量减少破折号（—）的使用，建议使用逗号、括号或从句结构替代。

3. 排版规范：
   - 禁用强调格式：严禁在正文中使用加粗或斜体进行强调。学术写作应通过句式结构来体现重点。
   - 保持 LaTeX 纯净：不要引入无关的格式指令。

4. 修改阈值（关键）：
   - 宁缺毋滥：如果输入的文本已经非常自然、地道且没有明显的 AI 特征，请保留原文，不要为了修改而修改。
   - 正向反馈：对于高质量的输入，应在 Part 3 中给予明确的肯定和正向评价。

5. 输出格式：
   - Part 1 [LaTeX]：输出重写后的代码（如果原文已足够好，则输出原文）。
     * 语言要求：必须是全英文。
     * 必须对特殊字符进行转义（例如：`%`、`_`、`&`）。
     * 保持数学公式原样（保留 `$` 符号）。
   - Part 2 [Translation]：对应的中文直译。
   - Part 3 [Modification Log]：
     * 如果进行了修改：简要说明调整了哪些机械化表达。
     * 如果未修改：请直接输出中文评价："[检测通过] 原文表达地道自然，无明显 AI 味，建议保留。"
   - 除以上三部分外，不要输出任何多余的对话。

# Execution Protocol
在输出前，请自查：
1. 拟人度检查：确认文本语气自然。
2. 必要性检查：当前的修改是否真的提升了可读性？如果是为了换词而换词，请撤销修改并判定为"检测通过"。

# Input
[在此处粘贴你的英文 LaTeX 代码]
```

**Common AI Flavor Words List**:

Consider replacing the following words when they appear (for reference only):
- Accentuate, Ador, Amass, Ameliorate, Amplify, Alleviate, Ascertain, Advocate, Articulate
- Bear, Bolster, Bustling, Cherish, Conceptualize, Conjecture, Consolidate, Convey, Culminate
- Decipher, Demonstrate, Depict, Devise, Delineate, Delve, Delve Into, Diverge, Disseminate
- Elucidate, Endeavor, Engage, Enumerate, Envision, Enduring, Exacerbate, Expedite
- Foster, Galvanize, Harmonize, Hone, Innovate, Inscription, Integrate, Interpolate
- Intricate, Lasting, Leverage, Manifest, Mediate, Nurture, Nuance, Nuanced, Obscure
- Opt, Originates, Perceive, Perpetuate, Permeate, Pivotal, Ponder, Prescribe, Prevailing
- Profound, Recapitulate, Reconcile, Rectify, Rekindle, Reimagine, Scrutinize, Substantiate
- Tailor, Testament, Transcend, Traverse, Underscore, Unveil, Vibrant

**Key Points**:
- Replace mechanical expressions
- Avoid overusing connecting words
- Maintain natural academic writing style

---

### 5. Logic Check

**Use Case**: Final paper proofreading, checking for fatal errors

**Complete Prompt**:

```markdown
# Role
你是一位负责论文终稿校对的学术助手。你的任务是进行"红线审查"，确保论文没有致命错误。

# Task
请对我提供的【英文 LaTeX 代码片段】进行最后的一致性与逻辑核对。

# Constraints
1. 审查阈值（高容忍度）：
   - 默认假设：请预设当前的草稿已经经过了多轮修改与校正，质量较高。
   - 仅报错原则：只有在遇到阻碍读者理解的逻辑断层、引起歧义的术语混乱、或严重的语法错误时才提出意见。
   - 严禁优化：对于"可改可不改"的风格问题、或者仅仅是"换个词听起来更高级"的建议，请直接忽略，不要通过挑刺来体现你的存在感。

2. 审查维度：
   - 致命逻辑：是否存在前后完全矛盾的陈述？
   - 术语一致性：核心概念是否在没有说明的情况下换了名字？
   - 严重语病：是否存在导致句意不清的中式英语（Chinglish）或语法结构错误。

3. 输出格式：
   - 如果没有上述"必须修改"的错误，请直接输出中文：[检测通过，无实质性问题]。
   - 如果有问题，请使用中文分点简要指出，不要长篇大论。

# Input
[在此处粘贴你的英文 LaTeX 代码]
```

**Key Points**:
- Only report fatal errors
- No style optimization
- High tolerance review

---

### 6. Abbreviation

**Use Case**: Slightly reducing paper word count (reduce 5-15 words)

**Complete Prompt**:

```markdown
# Role
你是一位专注于简洁性的顶级学术编辑。你的特长是在不损失任何信息量的前提下，通过句法优化来压缩文本长度。

# Task
请将我提供的【英文 LaTeX 代码片段】进行微幅缩减。

# Constraints
1. 调整幅度：
   - 目标是少量减少字数（减少约 5-15 个单词）。
   - 严禁大删大改：必须保留原文所有核心信息、技术细节及实验参数，严禁改变原意。

2. 缩减手段：
   - 句法压缩：将从句转化为短语，或者将被动语态转化为主动语态（如果能更简练的话）。
   - 剔除冗余：删除无意义的填充词，例如将 "in order to" 简化为 "to"。

3. 视觉与风格：
   - 保持 LaTeX 源码纯净，不要使用加粗、斜体或引号。
   - 尽量不要使用破折号（—）。
   - 拒绝列表格式（Itemization），保持连贯段落。

4. 输出格式：
   - Part 1 [LaTeX]：只输出缩减后的英文 LaTeX 代码本身。
     * 语言要求：必须是全英文。
     * 必须对特殊字符进行转义（如 `%`、`_`、`&`）。
     * 保持数学公式原样（保留 `$` 符号）。
   - Part 2 [Translation]：对应的中文直译（用于核对核心信息是否完整保留）。
   - Part 3 [Modification Log]：使用中文简要说明你调整了哪些地方（例如：删除了冗余词 "XXX"，合并了 "YYY" 从句）。
   - 除以上三部分外，不要输出任何多余的对话。

# Execution Protocol
在输出前，请自查：
1. 信息完整性：是否不小心删除了某个实验参数或限定条件？（如有，请放回去）。
2. 字数检查：是否缩减过度？（目标只是微调，不要把一段话变成一句话）。

# Input
[在此处粘贴你的英文 LaTeX 代码]
```

**Key Points**:
- Fine-tune abbreviation, preserve original meaning
- No loss of core information
- Optimize sentence structure

---

### 7. Expansion

**Use Case**: Slightly expanding paper word count (increase 5-15 words)

**Complete Prompt**:

```markdown
# Role
你是一位专注于逻辑流畅度的顶级学术编辑。你的特长是通过深挖内容深度和增强逻辑连接，使文本更加饱满、充分。

# Task
请将我提供的【英文 LaTeX 代码片段】进行微幅扩写。

# Constraints
1. 调整幅度：
   - 目标是少量增加字数（增加约 5-15 个单词）。
   - 严禁恶意注水：不要添加无意义的形容词或重复废话。

2. 扩写手段：
   - 深度挖掘：仔细阅读原文，尝试挖掘并显式化原文中隐含的结论、前提或因果关系。将原本留白的部分补充完整。
   - 逻辑增强：增加必要的连接词（如 Furthermore, Notably）以明确句间关系。
   - 表达升级：将简单的描述替换为更精准、更具描述性的学术表达。

3. 视觉与风格：
   - 保持 LaTeX 源码纯净，不要使用加粗、斜体或引号。
   - 尽量不要使用破折号（—）。
   - 拒绝列表格式（Itemization），保持连贯段落。

4. 输出格式：
   - Part 1 [LaTeX]：只输出扩写后的英文 LaTeX 代码本身。
     * 语言要求：必须是全英文。
     * 必须对特殊字符进行转义（如 `%`、`_`、`&`）。
     * 保持数学公式原样（保留 `$` 符号）。
   - Part 2 [Translation]：对应的中文直译（用于核对新增的逻辑是否符合原意）。
   - Part 3 [Modification Log]：使用中文简要说明你调整了哪些地方（例如：补充了隐含结论 "XXX"，增加了连接词 "YYY"）。
   - 除以上三部分外，不要输出任何多余的对话。

# Execution Protocol
在输出前，请自查：
1. 内容价值检查：新增的内容是否是基于原文的合理推演？（严禁产生幻觉或编造数据）。
2. 风格检查：扩写后的文字是否依然凝练？（避免变成废话文学）。

# Input
[在此处粘贴你的英文 LaTeX 代码]
```

**Key Points**:
- Make implicit logic explicit
- Enhance logical connections
- No fluff, no fabrication

---

## Use Cases

### Scenario 1: Paper Translation (Chinese → English)

**Typical Workflow**:

1. Use "Chinese to English" prompt to translate Chinese draft to English
2. Use "Expression Polishing" prompt for deep polishing
3. Use "Remove AI Flavor" prompt to remove mechanical traces
4. Use "Logic Check" prompt for final proofreading

**Example**:

```bash
# Step 1: Chinese to English
Input: Chinese paper draft
Output: English LaTeX code + Chinese literal translation

# Step 2: Polishing
Input: English output from step 1
Output: Polished English + modification log

# Step 3: Remove AI flavor
Input: Polished result from step 2
Output: Natural and fluent English text

# Step 4: Logic check
Input: Final text from step 3
Output: Error report or "Check passed"
```

---

### Scenario 2: Paper Polishing (English)

**Typical Workflow**:

1. Use "Expression Polishing" prompt for deep polishing
2. Use "Remove AI Flavor" prompt to optimize expression
3. Use "Logic Check" prompt for final proofreading

**Applicable Situations**:
- Non-native English writers
- Need to improve paper quality
- Preparing for top conference submission

---

### Scenario 3: Understanding English Papers

**Typical Workflow**:

1. Use "English to Chinese" prompt for quick translation
2. Read Chinese to understand content
3. Cross-check with original text when necessary

**Applicable Situations**:
- Quick literature reading
- Understanding complex English expressions
- Saving reading time

---

### Scenario 4: Removing AI Traces

**Typical Workflow**:

1. Use "Remove AI Flavor" prompt to optimize text
2. Compare modification log to understand changes
3. Manual fine-tuning if necessary

**Applicable Situations**:
- After using AI-assisted writing
- Pre-submission check
- Avoid detection as AI-generated

---

## Best Practices

### Prompt Usage Principles

1. **Complete Copy**: Each prompt has been carefully designed, please copy and use it completely for best results
2. **Step by Step**: Follow the recommended workflow, don't skip intermediate steps
3. **Preserve Format**: Maintain LaTeX format and special character escaping
4. **Verify Output**: Compare Chinese literal translation to verify English output accuracy
5. **Human Review**: Final results need human review to ensure they match your research content

### Academic Writing Recommendations

#### 1. Writing Standards

- **Tense**: Use simple present tense for methods, architectures, and experimental conclusions
- **Format**: Avoid excessive formatting, keep LaTeX source code clean
- **Vocabulary**: Use common academic vocabulary, avoid obscure words
- **Structure**: Maintain coherent paragraphs, avoid listing

#### 2. Logic Requirements

- **Rigor**: Ensure complete logical chains, no jumps
- **Consistency**: Maintain consistent terminology usage
- **Clarity**: Clear expression, no ambiguity
- **Coherence**: Natural transitions between sentences

#### 3. Style Control

- **Remove AI flavor**: Avoid mechanical expressions and overuse of connecting words
- **Academic standards**: Conform to target conference writing standards
- **Natural fluency**: Close to native researcher writing style
- **Clear and concise**: No flowery language, clear expression

### Quality Assurance

#### 1. Self-check Checklist

- [ ] Is the core information of the original text preserved?
- [ ] Are special characters correctly escaped?
- [ ] Are mathematical formulas kept as is?
- [ ] Does it meet the target conference format requirements?
- [ ] Is the logic clear and coherent?
- [ ] Are AI traces removed?

#### 2. Common Problems

**Problem 1: Over-formatting**

- Manifestation: Excessive use of bold, italics, quotes
- Solution: Keep LaTeX clean, don't add meaningless formatting

**Problem 2: Mechanical expressions**

- Manifestation: Overuse of connecting words like "First and foremost"
- Solution: Use "Remove AI Flavor" prompt to make expression more natural

**Problem 3: Inconsistent terminology**

- Manifestation: Using different terms for the same concept
- Solution: Use "Logic Check" prompt to ensure consistency

**Problem 4: Unescaped special characters**

- Manifestation: Characters like `%`, `_`, `&` not escaped
- Solution: Manual escaping or use prompt for automatic handling

### Model Selection Recommendations

Based on project research, the top 10 models in Creative Writing capability perform best:

- **Gemini-3-pro/flash**: Daily idea interaction and paper writing
- **Claude-4.5 series**: Experimental code writing
- **Cursor built-in models**: Code-related tasks
- **GPT 5.1/5.2**: Average performance, lower usage frequency

**Recommended Combinations**:

- Paper translation and polishing: Gemini-3-pro + Claude-4.5
- Quick literature understanding: Gemini-3-flash
- Code assistance: Claude-4.5 + Cursor

---

## Resource Links

### Core Resources

- **Project Homepage**: [Leey21/awesome-ai-research-writing](https://github.com/Leey21/awesome-ai-research-writing)
- **Prompt Template Library**: Project Part I section
- **Agent Skills**: Project Part II section

### Related Tools

- **OpenSkills**: Agent Skills management tool
- **Cursor**: AI programming assistant with Skills support
- **Claude Code**: AI programming assistant with Skills support

### Learning Resources

- **MSRA**: Microsoft Research Asia
- **Seed**: ByteDance Seed team
- **SH AI Lab**: Shanghai AI Laboratory
- **Peking University/USTC/Shanghai Jiao Tong University**: Top university research experience

### Further Reading

- **Paper Architecture Diagram Generation**: Use prompts to automatically generate paper architecture diagrams
- **Experimental Plotting Recommendations**: Data visualization best practices
- **Reviewer Perspective Review**: Simulate top conference review comments

---

## Summary

AI Academic Writing Assistant helps researchers through open-sourcing prompt templates from top research institutions:

- **Save Time**: Don't waste time on prompt debugging, save your energy for real research
- **Improve Quality**: Use battle-tested templates to improve paper writing quality
- **Lower Barrier**: Break the "implicit resource" barrier and benefit more people

**Remember**: These are tools, final academic judgment and innovative ideas still need human researchers to review. AI makes mistakes and needs cross-validation and human review.

**Last Updated**: 2026-03-23