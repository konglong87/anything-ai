---
title: Pretraining and Finetuning
difficulty: intermediate
roles: [student, programmer]
type: concept
duration: 25 min
tags: [LLM, Pretraining, Finetuning]
tools: []
---

# Pretraining and Finetuning

## What is Pretraining

Pretraining refers to training a base model on large-scale datasets, letting the model learn general knowledge and patterns. This base model can then be used for various downstream tasks.

**Analogy**: Pretraining is like letting a person extensively read various books first, learning general knowledge and thinking methods, then later learning specific domain expertise.

### Pretraining Data

Large language models' pretraining data typically includes:
- Web text (Wikipedia, news sites, blogs, etc.)
- Books
- Code repositories
- Papers
- Social media content

**Data Scale**: Modern large language models' pretraining data typically reaches trillion-level tokens.

### Pretraining Objectives

Main objectives of the pretraining phase are to let the model learn:
1. **Language Knowledge**: Grammar, vocabulary, semantics
2. **World Knowledge**: Facts, concepts, relationships
3. **Reasoning Ability**: Logic, causality, analogy
4. **General Capabilities**: Understanding, generation, reasoning, etc.

## Pretraining Objective Functions

### Masked Language Modeling (MLM)

**Representative Model**: BERT

**Method**:
1. Randomly mask some words in input sequence
2. Let model predict these masked words
3. Model needs to understand context to accurately predict

**Example**:
```
Input: The cat sat on the [MASK]
Prediction: mat
```

**Advantages**:
- Can utilize both directions of context
- Suitable for understanding tasks

**Disadvantages**:
- Not suitable for generation tasks
- Lower training efficiency

### Causal Language Modeling (CLM)

**Representative Models**: GPT series, Claude

**Method**:
1. Given preceding words, predict next word
2. Can only utilize preceding context
3. Autoregressive generation

**Example**:
```
Input: The cat sat on the
Prediction: mat
```

**Advantages**:
- Suitable for generation tasks
- High training efficiency

**Disadvantages**:
- Can only utilize unidirectional context

## What is Finetuning

Finetuning refers to further training a pretrained model using specific task data, making the model adapt to specific tasks or domains.

**Analogy**: Finetuning is like a person who has extensively read, now learning specific domain expertise (like medicine, law, etc.).

### Types of Finetuning

1. **Full Finetuning**: Update all parameters
   - Advantages: Best results
   - Disadvantages: High cost, requires large amounts of data

2. **Partial Finetuning**: Only update some parameters
   - Advantages: Lower cost
   - Disadvantages: Results may be slightly worse

3. **Parameter-Efficient Finetuning**: Only update a small number of parameters
   - Representative methods: LoRA, Prefix Tuning, Adapter
   - Advantages: Very low cost, minimal data requirements
   - Disadvantages: Results may be slightly worse

## Instruction Tuning

Instruction tuning is a special finetuning method that uses "instruction-response" pairs to train the model, enabling it to understand and follow natural language instructions.

### Instruction Tuning Data

Instruction tuning data typically contains:
- Instruction: Natural language description of task
- Input: Specific input for task
- Output: Expected output

**Example**:
```
Instruction: Translate the following sentence to English
Input: I like artificial intelligence
Output: I like artificial intelligence
```

### Role of Instruction Tuning

1. **Improve Instruction-following Ability**: Let model understand and execute natural language instructions
2. **Improve Conversation Ability**: Make model better at multi-round conversations
3. **Enhance Generalization**: Let model handle unseen instructions

## RLHF (Reinforcement Learning from Human Feedback)

RLHF is a method using human feedback to optimize models, making model outputs better align with human preferences.

### RLHF Steps

1. **Collect Human Preference Data**: Have humans rank different model outputs
2. **Train Reward Model**: Train a reward model based on human preference data
3. **Optimize with Reinforcement Learning**: Use reward model as reward signal to optimize language model

### Role of RLHF

1. **Improve Output Quality**: Make model outputs more helpful, honest, harmless
2. **Align with Human Preferences**: Make model outputs better match human values
3. **Reduce Harmful Outputs**: Lower probability of model generating harmful content

## Parameter-Efficient Finetuning Methods

### LoRA (Low-Rank Adaptation)

LoRA is a parameter-efficient finetuning method that adapts to new tasks by adding low-rank matrices rather than updating all parameters.

**Principle**:
- Add low-rank matrices beside original weight matrices
- Only train these low-rank matrices
- Original weights remain unchanged

**Advantages**:
- Few parameters (usually less than 1% of original model)
- Low training cost
- Can easily switch between different tasks

**Applications**:
- Adapt to specific domains
- Personalize models
- Rapid experimentation

### Other Methods

1. **Prefix Tuning**: Add learnable prompts before input
2. **Adapter**: Add small adapter layers in the model
3. **Prompt Tuning**: Optimize input prompts rather than model parameters

## Challenges and Limitations of Finetuning

### Challenges

1. **Data Requirements**: Need high-quality domain data
2. **Computational Resources**: Even parameter-efficient finetuning requires some resources
3. **Catastrophic Forgetting**: May forget knowledge learned during pretraining
4. **Overfitting**: Easy to overfit on small datasets

### Limitations

1. **Effect Limitations**: Parameter-efficient finetuning results may not match full finetuning
2. **Domain Drift**: Need frequent finetuning when domain changes quickly
3. **Evaluation Difficulty**: How to evaluate finetuning effects is a challenge

## Practical Applications

### Pretrained Models

- **GPT-4**: OpenAI's general large language model
- **Claude**: Anthropic's AI assistant
- **LLaMA**: Meta's open source model

### Finetuned Models

- **CodeLlama**: Finetuned model specifically for code
- **Med-PaLM**: Finetuned model for medical domain
- **BloombergGPT**: Finetuned model for financial domain

## Summary

Pretraining and finetuning are core processes of large language model development:

1. **Pretraining**: Learn general knowledge and capabilities on large-scale data
2. **Finetuning**: Adapt to specific tasks or domains
3. **Instruction Tuning**: Improve instruction-following ability
4. **RLHF**: Align with human preferences

Understanding pretraining and finetuning helps:
- Choose appropriate models
- Decide whether finetuning is needed
- Understand model capabilities and limitations

## Next Steps

- [Context Window](./context-window.md) - Learn how models process long texts
- [Tokenization](./tokenization.md) - Learn how models process text