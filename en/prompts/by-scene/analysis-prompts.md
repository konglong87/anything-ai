---
title: Analysis Scenario Prompts
difficulty: intermediate
roles: [analyst, researcher]
type: guide
duration: 25 min
tags: [Prompts, Analysis, Data]
tools: [Claude, ChatGPT, DeepSeek]
---

# Analysis Scenario Prompts

## Data Analysis

### Trend Analysis

**Use Case**: Analyze data trends and patterns

**Prompt Template**:
```
Please analyze the trends in the following data:

[data description or data]

Analysis requirements:
1. Identify main trends
2. Find anomalies
3. Analyze causes
4. Predict future trends
5. Provide visualization suggestions

Please output in the following format:
## Trend Overview
## Key Findings
## Anomaly Analysis
## Cause Analysis
## Future Predictions
## Visualization Suggestions
```

**Example Input**:
```
Please analyze the trends in the following data:

Company monthly sales in 2023 (10,000 yuan):
Jan: 120
Feb: 115
Mar: 130
Apr: 145
May: 150
Jun: 165
Jul: 160
Aug: 175
Sep: 190
Oct: 185
Nov: 200
Dec: 220

Analysis requirements:
1. Identify main trends
2. Find anomalies
3. Analyze causes
4. Predict future trends
5. Provide visualization suggestions

Please output in the following format:
## Trend Overview
## Key Findings
## Anomaly Analysis
## Cause Analysis
## Future Predictions
## Visualization Suggestions
```

**Example Output**:
```
## Trend Overview

Company sales showed an overall upward trend in 2023, growing from 1.2 million yuan in January to 2.2 million yuan in December, an 83.3% increase for the year. Growth trend was relatively stable with seasonal fluctuations.

## Key Findings

1. **Strong Overall Growth**
   - Average annual growth rate around 5.2%
   - Significant growth from Q1 to Q4
   - Accelerated growth in second half of year

2. **Seasonal Patterns**
   - Q1 (Jan-Mar): Relatively stable
   - Q2 (Apr-Jun): Starting to accelerate
   - Q3 (Jul-Sep): Continued growth
   - Q4 (Oct-Dec): Reaching peak

3. **Key Turning Points**
   - April showed noticeable growth (+12.1%)
   - September reached new high of 1.9 million yuan
   - December hit yearly high of 2.2 million yuan

## Anomaly Analysis

1. **Slight Decline in February**
   - Dropped from 120 in January to 115 in February (-4.2%)
   - Possible cause: Chinese New Year holiday impact

2. **Small Retreat in July**
   - Dropped from 165 in June to 160 in July (-3.0%)
   - Possible cause: Seasonal adjustment or market fluctuations

## Cause Analysis

1. **Market Expansion**
   - New product line launched
   - Increased market share
   - Expanded customer base

2. **Seasonal Factors**
   - Q4 is typically peak sales season
   - Year-end promotional activities
   - Budget cycle impacts

3. **Operational Optimization**
   - Supply chain improvements
   - Marketing strategy optimization
   - Sales team expansion

## Future Predictions

Based on current trends, predictions for 2024:

1. **Conservative Forecast**
   - Annual growth rate: 15-20%
   - Annual sales: 2.5-2.6 million yuan

2. **Optimistic Forecast**
   - Annual growth rate: 25-30%
   - Annual sales: 2.7-2.85 million yuan

3. **Key Assumptions**
   - Stable market environment
   - No major competitive changes
   - Continued marketing investment

## Visualization Suggestions

1. **Trend Line Chart**
   - X-axis: Months
   - Y-axis: Sales
   - Add trend line

2. **Seasonal Decomposition Chart**
   - Show trend, seasonality, residuals

3. **Year-over-Year Growth Chart**
   - Compare with same period in 2022
   - Highlight growth patterns

4. **Prediction Interval Chart**
   - Show prediction range
   - Mark confidence intervals
```

**Notes**:
- Provide complete data context
- Specify time range of data
- Consider external factor impacts
- Validate reasonableness of predictions

**Variation Suggestions**:
- Ask to compare multiple data sets
- Ask about specific influencing factors
- Ask to add data cleaning suggestions

### Comparative Analysis

**Use Case**: Compare different options or solutions

**Prompt Template**:
```
Please perform a comparative analysis of the following [options/solutions]:

[option1 description]
[option2 description]
[option3 description]

Comparison dimensions:
1. [dimension1]
2. [dimension2]
3. [dimension3]

Please provide:
1. Comparison table
2. Pros and cons analysis
3. Use cases
4. Recommendation suggestions
```

**Example Input**:
```
Please perform a comparative analysis of the following three cloud service providers:

AWS:
- Market share: 32%
- Main advantage: Comprehensive services, mature and stable
- Price: Medium to high
- Learning curve: Steep

Azure:
- Market share: 23%
- Main advantage: Good enterprise integration
- Price: Medium
- Learning curve: Moderate

Google Cloud:
- Market share: 10%
- Main advantage: Strong AI/ML capabilities
- Price: Flexible
- Learning curve: Gentle

Comparison dimensions:
1. Cost
2. Features
3. Ease of use
4. Ecosystem

Please provide:
1. Comparison table
2. Pros and cons analysis
3. Use cases
4. Recommendation suggestions
```

**Example Output**:
```
## Comparison Table

| Dimension | AWS | Azure | Google Cloud |
|------|-----|-------|--------------|
| Cost | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Features | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Ease of Use | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Ecosystem | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

## Pros and Cons Analysis

### AWS

**Pros**:
- Most comprehensive services, covers almost all cloud services
- Mature and stable, high reliability
- Large community and ecosystem
- Rich documentation and tutorials

**Cons**:
- Relatively high prices
- Complex interface, steep learning curve
- Complex pricing model

**Use Cases**:
- Large enterprises
- Projects needing comprehensive services
- Scenarios requiring high stability

### Azure

**Pros**:
- Good integration with Microsoft products
- Strong enterprise support
- Excellent hybrid cloud solutions
- Relatively transparent pricing

**Cons**:
- Some services not as mature as AWS
- Slightly smaller ecosystem
- Mixed documentation quality

**Use Cases**:
- Enterprises using Microsoft technology stack
- Need for hybrid cloud solutions
- Enterprise applications

### Google Cloud

**Pros**:
- Strongest AI/ML capabilities
- Flexible pricing, good value
- User-friendly interface, easy to use
- Native Kubernetes support

**Cons**:
- Smaller market share
- Some enterprise features lacking
- Relatively smaller ecosystem

**Use Cases**:
- AI/ML projects
- Kubernetes applications
- Startups

## Recommendation Suggestions

### Choose AWS if:
- Need most comprehensive services
- Enterprise applications
- Require extremely high stability
- Have sufficient budget

### Choose Azure if:
- Using Microsoft technology stack
- Need hybrid cloud
- Strong enterprise support requirements
- Moderate budget

### Choose Google Cloud if:
- Primarily AI/ML projects
- Using Kubernetes
- Limited budget
- Prioritize ease of use
```

**Notes**:
- Provide objective comparisons
- Consider different scenario needs
- Specify data sources
- Provide concrete recommendations

**Variation Suggestions**:
- Ask to add cost calculations
- Ask about migration suggestions
- Ask to add risk assessment

## Text Analysis

### Sentiment Analysis

**Use Case**: Analyze sentiment倾向 in text

**Prompt Template**:
```
Please analyze the sentiment倾向 in the following text:

[text content]

Analysis requirements:
1. Overall sentiment (positive/negative/neutral)
2. Sentiment intensity (1-10 scale)
3. Key sentiment words
4. Sentiment changes
5. Sentiment causes

Please output in the following format:
## Sentiment Overview
## Sentiment Intensity
## Key Sentiment Words
## Sentiment Changes
## Sentiment Causes
```

**Example Input**:
```
Please analyze the sentiment倾向 in the following text:

"This product really disappointed me. Although the design is beautiful, the features are too few, and the price is so expensive. Customer service attitude is also bad, took forever to reply to a question. I was originally looking forward to it, now I regret buying it."

Analysis requirements:
1. Overall sentiment (positive/negative/neutral)
2. Sentiment intensity (1-10 scale)
3. Key sentiment words
4. Sentiment changes
5. Sentiment causes

Please output in the following format:
## Sentiment Overview
## Sentiment Intensity
## Key Sentiment Words
## Sentiment Changes
## Sentiment Causes
```

**Example Output**:
```
## Sentiment Overview

Overall sentiment: Negative

User is overall very dissatisfied with the product. While acknowledging some advantages (design), mainly expresses disappointment and regret.

## Sentiment Intensity

Sentiment intensity: 8/10

High sentiment intensity, user used strong negative words ("disappointed", "regret"), expressing clear dissatisfaction.

## Key Sentiment Words

Negative words:
- Disappointed
- Too few features
- Expensive price
- Bad attitude
- Regret

Positive words:
- Beautiful design
- Looking forward to

## Sentiment Changes

Sentiment trajectory:
1. Expectation ("originally looking forward to it")
2. Disappointment ("really disappointed me")
3. Dissatisfaction ("too few features", "expensive price", "bad attitude")
4. Regret ("regret buying it")

Sentiment changed from initial expectation to disappointment, finally to regret, showing clear negative trend.

## Sentiment Causes

1. **Insufficient Features**
   - Expected features not implemented
   - "Too few features" directly led to disappointment

2. **Unreasonable Pricing**
   - Price doesn't match value
   - "Price is so expensive" intensified negative sentiment

3. **Poor Service Experience**
   - Slow customer service response
   - "Attitude is also bad" affected overall experience

4. **Gap Between Expectation and Reality**
   - "Originally looking forward to it" shows high user expectations
   - Large gap between actual experience and expectations led to disappointment

## Suggestions

For this type of negative feedback, suggest:
1. Improve customer service response speed
2. Add product features
3. Optimize pricing strategy
4. Manage user expectations
```

**Notes**:
- Consider cultural differences
- Pay attention to context and tone
- Analyze sentiment changes
- Provide actionable suggestions

**Variation Suggestions**:
- Ask to analyze multiple texts
- Ask for sentiment improvement suggestions
- Ask to add sentiment visualization

### Topic Extraction

**Use Case**: Extract main topics from text

**Prompt Template**:
```
Please extract main topics from the following text:

[text content]

Extraction requirements:
1. Identify 3-5 main topics
2. Provide keywords for each topic
3. Explain importance of each topic
4. Provide relationships between topics

Please output in the following format:
## Main Topics
## Topic Details
## Topic Relationships
```

**Example Input**:
```
Please extract main topics from the following text:

"Artificial intelligence is changing every industry. In healthcare, AI helps doctors diagnose diseases; in finance, AI is used for risk assessment and fraud detection; in education, AI provides personalized learning. However, AI also brings challenges like privacy protection, employment impact, and ethical issues. We need to balance AI's pros and cons and formulate appropriate policies."

Extraction requirements:
1. Identify 3-5 main topics
2. Provide keywords for each topic
3. Explain importance of each topic
4. Provide relationships between topics

Please output in the following format:
## Main Topics
## Topic Details
## Topic Relationships
```

**Example Output**:
```
## Main Topics

1. AI Applications
2. Industry Impact
3. Challenges and Issues
4. Policy and Regulation

## Topic Details

### 1. AI Applications
**Keywords**: Diagnosis, risk assessment, fraud detection, personalized learning

**Importance**: This is the core of the text, demonstrating specific AI applications in different fields, foundation for understanding AI value.

### 2. Industry Impact
**Keywords**: Healthcare, finance, education, every industry

**Importance**: Explains breadth of AI impact, emphasizing its transformative role.

### 3. Challenges and Issues
**Keywords**: Privacy protection, employment impact, ethical issues

**Importance**: Balances positive impacts of AI, reminding readers to focus on potential risks.

### 4. Policy and Regulation
**Keywords**: Balance, pros and cons, policy

**Importance**: Provides solutions, guiding readers to think about how to address AI challenges.

## Topic Relationships

```
AI Applications ──→ Industry Impact
    │
    ├──→ Challenges and Issues ──→ Policy and Regulation
    │
    └──→ (Brings both opportunities and challenges)
```

**Relationship Explanation**:

1. **AI Applications → Industry Impact**
   - Specific AI applications directly lead to industry transformation
   - Different industries have different application levels

2. **AI Applications → Challenges and Issues**
   - AI applications bring convenience but also produce problems
   - Wider applications, more obvious challenges

3. **Challenges and Issues → Policy and Regulation**
   - Problems need to be solved through policy and regulation
   - Policies aim to balance AI's pros and cons

4. **Overall Relationships**
   - AI applications are the starting point
   - Industry impact and challenges are parallel results
   - Policy regulation is the response measure
```

**Notes**:
- Extracted topics should be comprehensive
- Keywords should be accurate
- Explain topic importance
- Clearly show topic relationships

**Variation Suggestions**:
- Ask to extract more topics
- Ask about topic weights
- Ask to add topic visualization

## Summary

Analysis scenario prompts can help you:

**Core Scenarios**:
- ✅ Data Analysis: Trend analysis, comparative analysis
- ✅ Text Analysis: Sentiment analysis, topic extraction

**Best Practices**:
1. Provide complete data or text
2. Clearly specify analysis requirements and dimensions
3. Request structured output format
4. Validate analysis results
5. Build your own analysis frameworks

**Remember**:
- Analysis results need human verification
- Consider multi-angle analysis
- Combine domain knowledge
- Continuously optimize analysis methods

## Next Steps

- [Learning Scenario Prompts](./learning-prompts.en.md) - Learn prompt techniques for learning scenarios
- [Creative Scenario Prompts](./creative-prompts.en.md) - Learn prompt techniques for creative scenarios