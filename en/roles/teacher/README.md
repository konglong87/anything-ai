---
title: "Teacher AI Application Guide"
difficulty: beginner
roles: [teacher]
type: guide
duration: 30min
tags: [teacher, teaching, lesson-prep, quiz-generation, personalized-education, classroom-management]
---

# 👨‍🏫 Teacher AI Application Guide

> Let AI be a teaching aid, but the core of education is always the teacher's guidance and care

## 🎯 What You'll Learn

- A complete workflow and practical prompts for AI-assisted lesson preparation
- Efficient methods for automated quiz generation and grading assistance
- How to use AI to design personalized teaching plans
- Techniques and boundaries for AI-generated teaching resources
- Ethical considerations for using AI in educational settings

## 📚 Core Content

### Lesson Prep Assistant

Lesson preparation is the most time-consuming daily task for teachers. AI can dramatically improve efficiency:

**Lesson Plan Design**:

```
Help me design a lesson plan for [subject] [grade level], with:
1. Learning objectives: knowledge, skills, and affective goals
2. Key and difficult points with breakthrough strategies
3. Teaching process: introduction → new content → practice → summary (with time allocations)
4. Board design suggestions
5. Homework design (tiered: basic / advanced / extension)

Topic: [fill in]
Duration: [1 period / 2 periods]
Student baseline: [fill in]
```

**Slide Outline Generation**:

```
Generate a PPT slide outline for [topic], with:
1. Core content and visual suggestions for each slide
2. Interactive elements (questions, group discussions, mini-games)
3. Image/animation suggestions for key knowledge points
4. Total slides控制在 [15-20]

Topic: [fill in]
```

**Introduction Design**:

A good lesson introduction captures student attention. Ask AI to design multiple approaches:

```
Design 3 different lesson introductions for [topic]:
1. Story introduction: use a relevant story or case
2. Question introduction: use a thought-provoking question
3. Life introduction: use a phenomenon from students' daily lives

Each introduction should be 3-5 minutes and naturally transition to the new lesson content.
```

### Automated Quiz Generation & Grading

**Quiz Generation System**:

```
Generate a quiz for [subject] [grade] [knowledge point], with:
1. Multiple choice: 5 questions (4 options each, mark correct answers with explanations)
2. Fill-in-the-blank: 5 questions (mark reference answers)
3. True/false: 5 questions (mark correct answers with explanations)
4. Application/short answer: 2 questions (mark scoring criteria and reference answers)
5. Difficulty distribution: basic 60% + intermediate 30% + advanced 10%

Knowledge point: [fill in]
Difficulty level: [fill in]
```

**Tiered Quiz Generation**:

For students at different levels, AI can generate tiered questions:

```
Generate three tiered practice sets for [knowledge point]:
- Tier A (Foundation): for students with weak basics, focusing on concept understanding and basic application
- Tier B (Improvement): for intermediate students, focusing on comprehensive application and variation training
- Tier C (Challenge): for advanced students, focusing on creative thinking and deep exploration

Each set: 10 questions, mark difficulty rating and reference answers.
```

**Grading Assistance**:

AI can assist with grading subjective questions, but **cannot replace teacher judgment**:

```
Help me evaluate the following student answer, providing:
1. Score suggestion (based on scoring criteria)
2. Strengths of the answer
3. Weaknesses and improvement suggestions
4. Common causes of similar errors

Scoring criteria: [fill in]
Student answer: [paste]
```

**Important Reminders**:
- AI grading is only a reference; final scores must be determined by the teacher
- AI may score creative answers low — it tends toward "standard answers"
- In essay grading, AI may overlook students' unique expressions and emotions
- For subjective assessments (essays, artwork), AI suggestions are仅供参考

### Personalized Teaching Plans

**Learning Situation Analysis**:

```
Based on the following student data, analyze the class learning situation:
1. Overall level distribution (excellent / good / average / weak percentages)
2. Knowledge point mastery (strong and weak areas)
3. Common error types and causes
4. Suggested teaching adjustment directions

Student data:
[paste test scores / homework completion data]
```

**Differentiated Instruction Design**:

```
Design a differentiated teaching plan for [topic]:
1. For students with weak basics: simplified concepts, more practice, lower difficulty
2. For intermediate students: standard teaching flow, moderate challenge
3. For advanced students: deeper exploration, self-directed inquiry, project-based learning

Each tier: mark learning objectives, core activities, assessment methods.
```

**Individual Tutoring Plan**:

```
Design an individual tutoring plan for the following student:
1. Current weakness analysis
2. Tutoring goals (short-term + long-term)
3. Weekly tutoring schedule (4 weeks)
4. Recommended practice resource types
5. Progress evaluation criteria

Student situation: [fill in weaknesses and existing baseline]
```

### Teaching Resource Generation

**Knowledge Explanation Scripts**:

Ask AI to explain complex concepts in plain language:

```
Explain [concept] in easy-to-understand language, with:
1. One-sentence summary of the core meaning
2. A real-life analogy to aid understanding
3. List 3 common misconceptions and corrections
4. Provide 2-3 application examples

Target audience: [grade level] students
```

**Experiment/Activity Design**:

```
Design a classroom experiment/activity for [topic], with:
1. Experiment purpose and expected outcomes
2. Materials list (prefer everyday accessible materials)
3. Steps (students can operate independently)
4. Safety注意事项
5. Experiment record sheet template

Topic: [fill in]
Duration: [fill in]
```

**Review Materials**:

```
Generate a review outline for [subject] [chapter], with:
1. Knowledge framework diagram (core concepts and their relationships)
2. Key points for each concept (1-2 sentences)
3. Comparison table of easily confused concepts
4. Must-remember formulas/theorems list
5. 3-5 typical example problems with solutions

Chapter: [fill in]
```

### Classroom Management Assistance

**Classroom Interaction Design**:

```
Design 3 classroom interaction segments for [topic]:
1. Each segment: format (question/discussion/game/competition), duration, participation method
2. Interactions should test knowledge point mastery
3. Consider participation methods for different personality types (introverted students can also participate)

Topic: [fill in]
Class size: [fill in]
```

**Student Evaluation Comments**:

Writing end-of-term comments is heavy work for teachers. AI can assist with drafting:

```
Help me write end-of-term comments for the following student, with:
1. Warm, encouraging tone
2. First affirm strengths, then gently suggest improvement directions
3. Specific rather than generic (reference specific examples)
4. 100-150 words

Student performance highlights:
- Strengths: [fill in]
- Areas for improvement: [fill in]
- Personality traits: [fill in]
```

**Note**: Comments must reflect the teacher's genuine understanding of the student. AI only helps organize language — it cannot replace your observations and feelings.

## 🛠️ Recommended Tool Combinations

| Scenario | Recommended Tool | Reason |
|---|---|---|
| Lesson plan design | Claude | Good structured output, professional teaching design |
| Quiz generation & grading | DeepSeek | Strong logical reasoning, high question quality |
| Knowledge explanation | ChatGPT | Easy-to-understand expression, strong analogy ability |
| Slide materials | Doubao | Natural Chinese expression, free |
| Learning situation analysis | DeepSeek | Strong data analysis capability |
| Comment writing | Claude | Warm, encouraging language style |

**Beginner recommendation**: Start with Doubao (free) for daily lesson prep, DeepSeek for quiz generation and analytical tasks.

## ⚠️ Pitfall Guide

### AI Hallucination Traps (Especially Serious in Teaching)

- AI may fabricate nonexistent scientific facts — all knowledge points must be verified
- AI may give incorrect formula derivations — math/physics problems must be manually verified
- AI may reference outdated textbook content — ensure textbook version matching
- AI-generated quiz answers may be wrong — every question must be manually checked

### Educational Ethics Red Lines

- **Don't** use AI to replace genuine teacher-student interaction — education needs warmth
- **Don't** upload student personal information (grades, family situations) to AI platforms
- **Don't** let AI directly grade students — grading authority belongs to the teacher
- **Don't** send AI-generated comments directly to students — they must reflect your real observations
- AI-assisted teaching should be transparent to students — let them know which content was AI-assisted

### Over-Dependency Risk

- Lesson prep cannot be entirely delegated to AI — your understanding of students is something AI lacks
- Quiz generation cannot be entirely delegated to AI — questions must match your class's actual level
- Teaching design cannot be entirely delegated to AI — classroom pacing and interaction require your on-the-spot judgment
- AI is a "accelerator" for lesson prep, not "autopilot" for teaching

## 📊 Efficiency Improvement Reference

| Work Item | Traditional Time | AI-Assisted Time | Improvement |
|---|---|---|---|
| Lesson plan design | 2-3 hours | 30-45 min | 75%+ |
| Quiz generation (one set) | 1-2 hours | 15-20 min | 85%+ |
| Slide outline | 1-2 hours | 15-20 min | 85%+ |
| Grading assistance | 30-60 min/class | 10-15 min/class | 70%+ |
| Comment writing | 2-3 hours/class | 30-45 min/class | 80%+ |
| Review outline | 1-2 hours | 15-20 min | 85%+ |

*Data above is estimated from practical experience; actual results vary by individual*

## 🔗 Related Resources

- [AI Tool Selection Matrix](../../2-choose-tools/README.md) - How to choose the right AI tool for you
- [Learning Scene Prompts](../../prompts/by-scene/learning-prompts.md) - More learning-related prompts
- [Writing Scene Prompts](../../prompts/by-scene/writing-prompts.md) - Comment writing prompt templates
- [Student AI Application Guide](../student/README.md) - Also check the student perspective on using AI
- [AI Anxiety? Not Needed](../../0-start-here/ai-anxiety.md) - Understand AI correctly, no anxiety, no blind following

---

**AI assists teaching, but the warmth and guidance in education always come from the teacher** 👨‍🏫
