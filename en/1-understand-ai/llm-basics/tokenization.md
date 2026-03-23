---
title: Tokenization
difficulty: beginner
roles: [student, programmer]
type: concept
duration: 15 min
tags: [LLM, Tokenization, NLP]
tools: []
---

# Tokenization

## What is Tokenization

Tokenization is the process of splitting text into smaller units (called Tokens). These tokens are the basic units that AI models understand and process text.

**Simple Understanding**: Tokenization is like breaking an article into individual words or characters, allowing AI to process and understand each one.

## Relationship Between Tokens, Characters, and Words

### English Text

In English:
- 1 token ≈ 0.75 words
- 1 token ≈ 4 characters

**Example**:
```
Text: "Hello, world!"
Tokens: ["Hello", ",", "world", "!"]
Word count: 2
Token count: 4
```

### Chinese Text

In Chinese:
- 1 token ≈ 1-2 Chinese characters
- Common words usually 1 token
- Rare words may be multiple tokens

**Example**:
```
Text: "你好，世界！"
Tokens: ["你好", "，", "世界", "！"]
Character count: 6
Token count: 4
```

## Common Tokenization Methods

### 1. BPE (Byte Pair Encoding)

BPE is a common tokenization method that builds vocabulary by counting common character pairs in text.

**Working Principle**:
1. Start from individual characters
2. Count most frequent character pairs
3. Merge most frequent character pairs
4. Repeat until vocabulary size limit is reached

**Advantages**:
- Strong ability to handle unknown words
- Controllable vocabulary size
- Suitable for multiple languages

**Disadvantages**:
- May produce non-intuitive splits
- Need to train vocabulary

**Example**:
```
Original: "hug"
Step 1: ["h", "u", "g"]
Step 2: ["h", "ug"] (merge u and g)
Step 3: ["hug"] (merge h and ug)
```

### 2. WordPiece

WordPiece is the tokenization method used by BERT and other models, similar to BPE but with some improvements.

**Working Principle**:
- Choose merge that maximizes training data likelihood
- Use "##" prefix to mark subwords

**Example**:
```
Text: "unhappiness"
Tokens: ["un", "##hap", "##pi", "##ness"]
```

### 3. SentencePiece

SentencePiece is a general tokenization tool supporting multiple tokenization algorithms.

**Features**:
- Language-agnostic
- Supports multiple tokenization algorithms
- Special handling of spaces

**Example**:
```
Text: "Hello world"
Tokens: ["▁Hello", "▁world"]
```

## Token Counting and Cost

### Token Billing

Most AI services bill by token:
- Input tokens: Content you send to the model
- Output tokens: Content the model generates

**Example**:
```
Input: 1000 tokens
Output: 500 tokens
Total tokens: 1500 tokens
```

### Cost Calculation

Different models have different pricing:

| Model | Input Cost | Output Cost |
|-------|-----------|------------|
| GPT-3.5 | $0.001/1K tokens | $0.002/1K tokens |
| GPT-4 | $0.03/1K tokens | $0.06/1K tokens |
| Claude | $0.015/1K tokens | $0.075/1K tokens |

**Calculation Example**:
```
Using GPT-4 to process 1000 input tokens and 500 output tokens:
Input cost: 1000 * $0.03/1000 = $0.03
Output cost: 500 * $0.06/1000 = $0.03
Total cost: $0.06
```

### Optimizing Token Usage

**Methods**:
1. Streamline input text
2. Remove redundant information
3. Use concise expressions
4. Avoid repeating content

**Example**:
```
❌ Verbose (about 100 tokens):
I want to ask you to help me analyze this article about artificial intelligence, this article mainly discusses the development history, current status and future trends of artificial intelligence, please read carefully and give me a detailed summary...

✅ Streamlined (about 30 tokens):
Summarize this article about AI development history, current status and future trends
```

## Multilingual Tokenization Challenges

### Challenge 1: Different Tokenization Methods for Different Languages

Different languages have different tokenization characteristics:
- English: Spaces between words
- Chinese: No spaces, requires intelligent splitting
- Japanese: Mixed kanji, kana, romaji
- Arabic: Right-to-left writing

### Challenge 2: Vocabulary Size Limitations

Vocabulary size needs balance:
- Too small: Many words need multiple tokens
- Too large: Model parameters increase, training cost high

**Example**:
```
Small vocabulary (10K):
"artificial" -> ["art", "##ifi", "##cial"] (3 tokens)

Large vocabulary (100K):
"artificial" -> ["artificial"] (1 token)
```

### Challenge 3: Handling Unknown Words

How to handle words not seen during training:
- Use subword splitting
- Use special markers (like [UNK])
- Dynamically extend vocabulary

**Example**:
```
Unknown word: "bioinformatics"
Small vocabulary: ["bio", "##info", "##rm", "##atics"]
Large vocabulary: ["bioinformatics"]
```

## How to Optimize Token Usage

### 1. Choose Appropriate Model

Choose appropriate model based on task:
- Simple tasks: Use small models (small vocabulary, high token efficiency)
- Complex tasks: Use large models (large vocabulary, strong understanding)

### 2. Streamline Expression

Use concise expression methods:
```
❌ Verbose:
I want to ask you to help me analyze this code, this code's main function is implementing a user login function, including username and password verification...

✅ Streamlined:
Analyze this user login verification code: [code]
```

### 3. Remove Redundancy

Remove unnecessary information:
- Repeated explanations
- Overly long background introductions
- Irrelevant details

### 4. Use Structured Formats

Use structured formats to reduce tokens:
```
❌ Unstructured:
User Zhang San, age 25, male, engineer, lives in Beijing...

✅ Structured:
User info:
- Name: Zhang San
- Age: 25
- Gender: Male
- Occupation: Engineer
- Location: Beijing
```

### 5. Batch Processing

Batch process similar tasks:
```
❌ Process individually:
Translate this sentence: Hello
Translate this sentence: World
Translate this sentence: AI

✅ Batch process:
Translate the following sentences:
1. Hello
2. World
3. AI
```

## Practical Application Cases

### Case 1: Code Analysis

**Scenario**: Analyze a piece of code

**Before optimization** (about 200 tokens):
```
I want to ask you to help me analyze the following code, this code is written in Python, main function is implementing a quicksort algorithm, please read carefully and tell me this code's time complexity, space complexity and possible optimization directions...
```

**After optimization** (about 50 tokens):
```
Analyze this Python quicksort code:
[code content]

Please explain:
1. Time complexity
2. Space complexity
3. Optimization directions
```

### Case 2: Text Translation

**Scenario**: Translate multiple paragraphs

**Before optimization** (each about 100 tokens):
```
Translate this sentence: Hello world
Translate this sentence: How are you
Translate this sentence: Good morning
```

**After optimization** (about 80 tokens):
```
Translate the following sentences to Chinese:
1. Hello world
2. How are you
3. Good morning
```

### Case 3: Long Document Processing

**Scenario**: Process long document

**Before optimization** (one-time processing, may exceed context window):
```
Analyze this 10,000-word article: [full text]
```

**After optimization** (segment processing):
```
Analyze article part 1: [Part 1]
Analyze article part 2: [Part 2]
...
Integrate above analyses, summarize full text
```

## Summary

Tokenization is the foundation of AI text processing:

**Key Points**:
- ✅ Tokens are the basic units of AI text processing
- ✅ Different languages have different tokenization methods
- ✅ Token count directly affects usage cost
- ✅ Optimizing token usage can reduce costs

**Best Practices**:
1. Understand relationship between tokens and characters/words
2. Choose appropriate tokenization method
3. Optimize expression to reduce token usage
4. Batch process similar tasks
5. Segment process long documents

**Cost Optimization**:
- Streamline input
- Remove redundancy
- Use structured formats
- Choose appropriate models

Understanding tokenization helps use AI tools more efficiently and control usage costs.

## Next Steps

- [How AI Thinks](../how-ai-thinks/) - Deep dive into AI's thinking process
- [Probabilistic Prediction](../how-ai-thinks/probabilistic-prediction.md) - Learn how AI predicts the next word