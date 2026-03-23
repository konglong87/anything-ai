---
title: Cursor User Guide
difficulty: beginner
roles: [programmer]
type: guide
duration: 20 min
tags: [Cursor, AI, Editor]
tools: [Cursor]
---

# Cursor User Guide

## What is Cursor

Cursor is an AI-native code editor, built on VS Code, integrating powerful AI programming assistant features. It's not just a simple VS Code plugin, but an AI-first programming environment designed from the ground up.

### Core Features

- **AI Native**: Designed for AI programming
- **VS Code Compatible**: Supports VS Code plugins
- **Local Execution**: Supports local models
- **Privacy & Security**: Code processed locally
- **Free to Use**: Basic features are free

### Cursor Features

| Feature | Description | Use Cases |
|------|------|---------|
| AI Native Editor | Designed for AI programming | Daily programming |
| Multi-model Support | Supports multiple AI models | Flexible selection |
| Local Models | Supports local execution | Privacy sensitive |
| Cursor Rules | Custom rules | Personalized configuration |

## Core Features of Cursor

### 1. AI Code Generation

**Capabilities**:
- Intelligent code completion
- Code generation
- Code explanation
- Code refactoring

**Use Cases**:
- Rapid prototyping
- Code review
- Bug fixes
- Code learning

**Example**:
```
User: [Input requirement description]

Cursor: [Generate complete code implementation]
```

### 2. Cursor Rules

**Capabilities**:
- Customize AI behavior
- Project-specific rules
- Code style configuration
- Best practice enforcement

**Use Cases**:
- Team code standards
- Project-specific requirements
- Code style unification
- Best practice application

**Example**:
```
# .cursorrules
- Use TypeScript
- Follow ESLint rules
- Add JSDoc comments
- Write unit tests
```

### 3. Multi-model Support

**Supported Models**:
- GPT-4
- Claude
- Local models (Ollama, etc.)
- Other compatible models

**Use Cases**:
- Choose different models for different tasks
- Process sensitive code locally
- Cost optimization
- Performance optimization

### 4. AI Chat

**Capabilities**:
- Code-related conversations
- Technical Q&A
- Architecture discussions
- Best practice consultations

**Use Cases**:
- Technical learning
- Problem solving
- Solution discussions
- Knowledge acquisition

## Cursor Usage Tips

### 1. Installation and Setup

**Installation Steps**:
1. Download Cursor: https://cursor.sh
2. Install application
3. Configure AI model
4. Import VS Code settings (optional)

**Configuration Example**:
```json
// settings.json
{
  "cursor.ai.enabled": true,
  "cursor.ai.model": "gpt-4",
  "cursor.ai.temperature": 0.7
}
```

### 2. Using Cursor Rules

**Create Rules**:
1. Create `.cursorrules` file in project root
2. Add custom rules
3. Save file
4. Cursor automatically applies rules

**Rules Example**:
```
# Project Coding Standards

## Language
- Use TypeScript
- Follow ESLint rules

## Code Style
- Use 2-space indentation
- Use single quotes
- Add semicolons

## Comment Requirements
- Add JSDoc to all functions
- Add comments for complex logic
- Mark TODOs for pending items

## Testing Requirements
- Write unit tests
- Coverage > 80%
- Use Jest framework
```

### 3. AI Code Generation

**Tips**:
- Clearly describe requirements
- Provide context
- Generate step by step
- Iteratively optimize

**Example**:
```
Create a user authentication API:
1. Use Express and TypeScript
2. JWT authentication
3. Include registration and login features
4. Add error handling
5. Write test cases
```

### 4. Code Review

**Tips**:
- Select code range
- Clarify review points
- Request improvement suggestions
- Verify modifications

**Example**:
```
Review the following code:
1. Code quality
2. Performance issues
3. Security risks
4. Best practices

[Selected code]
```

## Cursor Best Practices

### 1. Project Configuration

**Suitable for**:
- New project initialization
- Team collaboration
- Code standardization

**Configuration Steps**:
1. Create `.cursorrules` file
2. Define project specifications
3. Configure AI model
4. Set keyboard shortcuts

**Example Configuration**:
```
# .cursorrules

## Project Information
- Project Name: MyApp
- Tech Stack: React + TypeScript
- Architecture: Component-based

## Coding Standards
- Use functional components
- Use Hooks
- Follow Airbnb style guide
- Add PropTypes

## File Organization
- Components in components/
- Utility functions in utils/
- Type definitions in types/
- Test files with same name as source
```

### 2. Daily Development

**Suitable for**:
- Daily programming
- Bug fixes
- Feature development

**Workflow**:
1. Use AI to generate initial code
2. Review and modify code
3. Run and test
4. Iteratively optimize

**Example**:
```
1. Describe requirements
"Create a user list component"

2. Cursor generates code
[Generate component code]

3. Review and modify
[Check code quality]
[Modify parts that don't meet standards]

4. Run tests
[Run test cases]

5. Iteratively optimize
[Optimize based on feedback]
```

### 3. Team Collaboration

**Suitable for**:
- Team projects
- Code review
- Knowledge sharing

**Collaboration Methods**:
1. Share `.cursorrules` file
2. Unify AI configuration
3. Establish best practices
4. Regularly update rules

**Example**:
```
# Team .cursorrules

## Team Standards
- Follow team coding standards
- Use team toolchain
- Follow Git workflow

## Code Review
- All code needs review
- Use AI-assisted review
- Record review comments

## Documentation Requirements
- Update README
- Add API documentation
- Write changelog
```

### 4. Learning and Exploration

**Suitable for**:
- Learning new technologies
- Exploring new frameworks
- Understanding code

**Learning Methods**:
1. Use AI to explain code
2. Ask about best practices
3. Explore different solutions
4. Record learning notes

**Example**:
```
1. Ask about concepts
"Explain React Hooks' useEffect"

2. Cursor provides explanation
[Detailed explanation and examples]

3. Ask about best practices
"What are the best practices for useEffect?"

4. Cursor provides recommendations
[Best practices list and examples]

5. Practical application
[Apply in project]
```

## Cursor Suitable Scenarios

### Most Suitable Scenarios

1. **Daily Programming**
   - Code generation
   - Code review
   - Bug fixes
   - Refactoring optimization

2. **Team Collaboration**
   - Code standardization
   - Knowledge sharing
   - Best practice application

3. **Learning Programming**
   - Code explanation
   - Best practices
   - Technical learning

4. **Privacy Sensitive Projects**
   - Local model execution
   - Code processed locally
   - Data security

### Less Suitable Scenarios

1. **Non-programming Tasks**
   - Text generation
   - Content creation
   - Data analysis

2. **Simple Editing**
   - Lightweight editing
   - Quick modifications
   - Simple tasks

## Cursor Practical Cases

### Case 1: Using Cursor Rules

**Scenario**: Configure React project standards

**.cursorrules File**:
```
# React Project Standards

## Tech Stack
- React 18
- TypeScript
- Tailwind CSS
- Vite

## Component Standards
- Use functional components
- Use Hooks
- Component files use PascalCase
- Style files use kebab-case.module.css

## Code Style
- Use 2-space indentation
- Use single quotes
- Add semicolons
- Import order: React, third-party, local

## Testing Requirements
- Use Vitest
- Component test coverage > 80%
- Critical features must have tests
```

**Effects**:
- Cursor-generated code automatically follows standards
- Team code style unified
- Reduced code review work
- Improved code quality

### Case 2: AI-assisted Development

**Scenario**: Develop user authentication feature

**Workflow**:
```
1. Describe requirements
"Create user authentication feature, including registration and login"

2. Cursor generates code
[Generate complete authentication code]

3. Review code
[Check code quality]
[Verify security]

4. Run tests
[Run test cases]

5. Iteratively optimize
[Optimize code based on feedback]
```

**Effects**:
- Quickly generate initial code
- Automatically follow project standards
- Improve development efficiency
- Reduce errors

### Case 3: Code Review

**Scenario**: Review Pull Request

**Workflow**:
```
1. Select code range
[Select code in PR]

2. Request AI review
"Review this code:
1. Code quality
2. Performance issues
3. Security risks
4. Best practices"

3. Cursor provides review comments
[Detailed review report]

4. Apply improvement suggestions
[Modify code based on suggestions]

5. Verify modifications
[Run tests]
[Confirm functionality works]
```

**Effects**:
- Quickly discover code issues
- Provide improvement suggestions
- Improve code quality
- Learn best practices

## Cursor Common Questions

### Installation and Setup

**Question**: How to install Cursor?

**Answer**:
1. Visit https://cursor.sh
2. Download the installer for your platform
3. Install application
4. Configure AI model

**Question**: How to import VS Code settings?

**Answer**:
1. Open Cursor settings
2. Select import settings
3. Choose VS Code settings file
4. Apply settings

### Cursor Rules

**Question**: How to create Cursor Rules?

**Answer**:
1. Create `.cursorrules` file in project root
2. Add custom rules
3. Save file
4. Cursor automatically applies

**Question**: What rules do Cursor Rules support?

**Answer**:
- Coding standards
- Code style
- Testing requirements
- Documentation requirements
- Project-specific rules

### AI Models

**Question**: How to switch AI models?

**Answer**:
1. Open Cursor settings
2. Select AI model
3. Choose model type
4. Save settings

**Question**: How to use local models?

**Answer**:
1. Install Ollama or other local models
2. Configure local model in Cursor
3. Select local model
4. Start using

## Cursor Pricing Plans

### Free Version

- Price: Free
- Features:
  - Basic AI features
  - Limited AI requests
  - Basic Cursor Rules

### Pro Version

- Price: $20/month
- Features:
  - Unlimited AI requests
  - Advanced Cursor Rules
  - Priority support
  - Local model support

### Team Version

- Price: $30/user/month
- Features:
  - Team management
  - Shared configuration
  - Admin console
  - Advanced security

## Awesome Cursor Rules

**Repository**: https://github.com/PatrickJS/awesome-cursorrules

**Introduction**:
This is a carefully curated collection of Cursor Rules configuration files, including configuration examples for various projects and scenarios.

**Main Content**:

1. **Language-specific Rules**
   - TypeScript
   - Python
   - JavaScript
   - Other languages

2. **Framework-specific Rules**
   - React
   - Vue
   - Angular
   - Next.js

3. **Project Type Rules**
   - Web applications
   - Mobile applications
   - API services
   - Other types

4. **Team Standard Rules**
   - Code style
   - Testing requirements
   - Documentation standards
   - Best practices

**How to Use**:
1. Browse rules files in the repository
2. Select appropriate rules
3. Copy to project's `.cursorrules` file
4. Adjust as needed
5. Save and apply

**Example Rules**:

**React Project Rules**:
```
# React Project Rules

## Component Standards
- Use functional components
- Use Hooks
- Component files use PascalCase
- Style files use kebab-case.module.css

## Code Style
- Use 2-space indentation
- Use single quotes
- Add semicolons
- Import order: React, third-party, local

## Performance Optimization
- Use React.memo to optimize components
- Use useMemo and useCallback
- Avoid unnecessary re-renders
- Optimize list rendering

## Testing Requirements
- Use React Testing Library
- Component test coverage > 80%
- Critical features must have tests
- Use snapshot testing
```

**Summary**:
- Cursor is an AI-native code editor
- Cursor Rules can customize AI behavior
- Awesome Cursor Rules provides rich configuration examples
- Proper use can significantly improve development efficiency

## Next Steps

- [Claude User Guide](../claude/README.en.md) - Learn about Claude's features
- [DeepSeek User Guide](../deepseek/README.en.md) - Learn about DeepSeek's features
- [Tool Comparison](../../tool-matrix.en.md) - Compare different tools