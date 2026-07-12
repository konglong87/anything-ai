---
title: "Implementation Planner"
description: Professional feature implementation planning role, helping create detailed execution plans
difficulty: intermediate
roles: [programmer, developer]
type: guide
duration: 30min
tags: [planning, architecture, implementation, ECC, requirements-analysis, task-breakdown]
---

# 🗺️ Implementation Planner

> Plan first, execute with confidence. Good planning is half of successful implementation

## 🎯 Role Definition

The Implementation Planner focuses on transforming vague requirements into executable implementation plans:

- ✅ **Requirements Analysis** — Understand functional requirements and technical constraints, eliminate ambiguity
- ✅ **Architecture Design** — Define system architecture solutions, clarify technology choices
- ✅ **Task Breakdown** — Decompose large tasks into executable subtasks, estimate effort
- ✅ **Risk Assessment** — Identify technical risks and dependencies, develop mitigation strategies
- ✅ **Verification Planning** — Define acceptance criteria and testing strategies

**Source**: Everything Claude Code - `agents/planner.md`
**External Link**: [ECC Original Location](https://github.com/affaan-m/everything-claude-code/tree/main/agents/planner.md)

## 📚 Planning Process Details

### 1. Understanding Requirements

The first step in planning is thoroughly understanding requirements and eliminating all ambiguity:

**Requirements Clarification Checklist**:

```
Help me analyze the following requirements description, identifying and clarifying:
1. Ambiguous expressions (which words have unclear meanings)
2. Implicit assumptions (which premises are not explicitly stated)
3. Contradictions (which descriptions conflict with each other)
4. Questions that need to be confirmed with the requirements owner
5. Boundary conditions (under what circumstances the requirements don't apply)

Requirements description:
[paste requirements]
```

**Requirements Decomposition**:

Break large requirements into functional points:

```
Decompose the following requirements into specific functional points, with:
1. Each functional point described in one sentence of core behavior
2. Dependencies between functional points marked
3. Priority for each functional point (P0/P1/P2)
4. Complexity for each functional point (low/medium/high)
5. Identify functional points that can be developed in parallel

Requirements description:
[paste requirements]
```

### 2. Technical Research

Before finalizing a solution, research technical feasibility:

**Technology Selection Analysis**:

```
Help me analyze the following technology selection options, with:
1. Pros and cons comparison for each option
2. Compatibility assessment with existing systems
3. Team tech stack match
4. Community support and ecosystem maturity
5. Long-term maintenance cost assessment
6. Final recommendation with reasoning

Technology options:
[fill in]
Existing tech stack:
[fill in]
```

**Dependency Risk Assessment**:

```
Help me assess the risks of the following technical dependencies:
1. Dependency stability (update frequency, breaking change history)
2. Dependency security (known vulnerabilities, security update response speed)
3. Dependency replaceability (are there alternatives)
4. Dependency license risks
5. Recommended risk mitigation strategies

Dependency list:
[fill in]
```

### 3. Architecture Design

**Architecture Solution Generation**:

```
Help me design a system architecture solution for [feature], with:
1. Overall architecture description (module division, data flow)
2. Core module responsibility definitions
3. Inter-module interface definitions (input/output/protocol)
4. Data model design (core entities and relationships)
5. Key technical decisions and reasoning
6. Performance and scalability considerations

Feature requirements:
[fill in]
Technical constraints:
[fill in]
```

**Architecture Review Checklist**:

Ask AI to generate an architecture review checklist:
- Does it satisfy all functional requirements?
- Are performance bottlenecks considered?
- Is failure recovery considered?
- Is data consistency considered?
- Are security and compliance considered?
- Is observability considered?

### 4. Task Breakdown

Transform the architecture solution into an executable task list:

**Task Breakdown Template**:

```
Decompose the following architecture solution into an executable task list, with:
1. Each task described in one sentence (starting with a verb, e.g., "Implement XX interface")
2. Estimated effort for each task (hours)
3. Dependencies on prerequisite tasks for each task
4. Responsible role for each task (frontend/backend/ops/testing)
5. Mark tasks on the critical path
6. Identify task groups that can be executed in parallel

Architecture solution:
[paste]
```

**Milestone Planning**:

```
Based on the following task list, plan project milestones, with:
1. Each milestone: objectives, included tasks, acceptance criteria
2. Dependencies between milestones
3. Estimated completion time for each milestone
4. Risk points for key milestones
5. Overall project timeline

Task list:
[paste]
```

### 5. Verification Planning

**Acceptance Criteria Definition**:

```
Help me define acceptance criteria for [feature], with:
1. Functional acceptance criteria (acceptance conditions for each functional point)
2. Performance acceptance criteria (response time, throughput, concurrency)
3. Security acceptance criteria (access control, data encryption, audit logs)
4. Compatibility acceptance criteria (browser/device/API versions)
5. Observability acceptance criteria (monitoring metrics, alert rules)

Feature requirements:
[fill in]
```

**Test Strategy Design**:

```
Help me design a test strategy for [feature], with:
1. Unit test scope and focus
2. Integration test scenario design
3. E2E test critical paths
4. Performance test plan
5. Security test要点
6. Test environment requirements

Feature description:
[fill in]
```

## 🛠️ Recommended Tool Combinations

| Scenario | Recommended Tool | Reason |
|---|---|---|
| Requirements analysis | Claude | Strong logical reasoning, accurate ambiguity identification |
| Technical research | DeepSeek | Strong information retrieval, accurate comparative analysis |
| Architecture design | Claude | Good structured output, professional solution design |
| Task breakdown | ChatGPT | Detailed task decomposition, reasonable effort estimation |
| Risk assessment | Claude | Comprehensive risk identification, practical mitigation strategies |
| Document generation | Claude | High document quality, standardized formatting |

## ⚠️ Pitfall Guide

### Planning Hallucination Trap

- AI may fabricate nonexistent technical solutions — all technology choices must be verified for feasibility
- AI may give overly optimistic effort estimates — must be adjusted based on team's actual capability
- AI may overlook implicit dependencies — dependency relationships must be manually梳理
- AI may miss critical risks — risk assessment must incorporate project-specific context

### The Planning-Execution Gap

- No matter how perfect the plan, execution always encounters surprises — plans should leave room for flexibility
- Don't let AI make decisions for you — technology selection and architecture decisions must be discussed by the team
- Planning documents aren't set in stone — adjust based on actual conditions during execution
- AI-generated plans are only a starting point — you need to customize based on team and project characteristics

### Over-Planning Trap

- Don't plan every detail — over-planning反而 reduces flexibility
- The purpose of planning is to guide execution, not replace it
- 80/20 rule: planning covers 80% of scenarios, leave 20% for flexible handling during execution
- Planning time should not exceed 20% of execution time

## 📊 Efficiency Improvement Reference

| Work Item | Traditional Time | AI-Assisted Time | Improvement |
|---|---|---|---|
| Requirements clarification analysis | 2-3 hours | 20-30 min | 85%+ |
| Technology selection comparison | 4-6 hours | 30-60 min | 85%+ |
| Architecture solution design | 4-8 hours | 1-2 hours | 75%+ |
| Task breakdown | 2-3 hours | 20-30 min | 85%+ |
| Acceptance criteria definition | 1-2 hours | 15-20 min | 85%+ |
| Test strategy design | 2-3 hours | 20-30 min | 85%+ |

*Data above is estimated from practical experience; actual results vary by individual*

## 🔗 Related Resources

- [Everything Claude Code](https://github.com/affaan-m/everything-claude-code) - Complete system
- [ECC Planner Agent](https://github.com/affaan-m/everything-claude-code/tree/main/agents/planner.md) - Original planner definition
- [Agent Design Patterns](../../5-skills/agent/design-patterns/README.md) - Agent architecture design reference
- [Programmer AI Application Guide](../programmer/README.md) - Programmer perspective on using AI
- [TDD Workflow](../../5-skills/tdd-workflow/README.md) - Test-driven development process

---

**Plan first, execute with confidence. Good planning is half of successful implementation** 🗺️
