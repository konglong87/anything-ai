---
title: GitHub Copilot User Guide
difficulty: beginner
roles: [programmer]
type: guide
duration: 20 min
tags: [Copilot, AI, Editor]
tools: [GitHub Copilot]
---

# GitHub Copilot User Guide

## What is GitHub Copilot

GitHub Copilot is an AI programming assistant jointly developed by GitHub and OpenAI, based on OpenAI's Codex model, capable of automatically generating code suggestions based on code context.

### Core Features

- **Intelligent Code Completion**: Generates code based on context
- **Multi-language Support**: Supports Python, JavaScript, TypeScript, etc.
- **IDE Integration**: Supports VS Code, JetBrains, etc.
- **Strong Learning Ability**: Learns patterns from codebases
- **Continuous Improvement**: Model constantly updated and optimized

### Copilot Features

| Feature | Description | Use Cases |
|------|------|---------|
| Intelligent Completion | Context-aware code suggestions | Daily programming |
| Multi-language Support | Supports multiple programming languages | Multi-language projects |
| IDE Integration | Seamless integration into development environment | Daily development |
| Code Generation | Generates code from descriptions | Rapid prototyping |

## Core Features of GitHub Copilot

### 1. Code Completion

**Capabilities**:
- Real-time code suggestions
- Context awareness
- Multi-line code generation
- Automatic function completion

**Use Cases**:
- Daily programming
- Rapid development
- Learning new languages
- Code refactoring

**Example**:
```python
# User input:
def calculate_average(numbers):
    # Copilot suggests:
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)
```

### 2. Code Generation

**Capabilities**:
- Generate code from comments
- Generate implementation from function signatures
- Generate code from tests
- Generate features from descriptions

**Use Cases**:
- Rapid prototyping
- Implementing test cases
- Generating boilerplate code
- Learning new frameworks

**Example**:
```python
# User input:
# Create a function to calculate the greatest common divisor of two numbers
def gcd(a, b):
    # Copilot suggests:
    while b:
        a, b = b, a % b
    return a
```

### 3. Code Explanation

**Capabilities**:
- Explain code functionality
- Describe algorithm logic
- Identify potential issues
- Provide improvement suggestions

**Use Cases**:
- Code review
- Learning new code
- Understanding complex logic
- Code optimization

**Example**:
```
# User selects code and asks:
# Explain what this code does

# Copilot explains:
This code implements the quicksort algorithm by selecting a pivot element
to partition the array into two parts, recursively sorting the subarrays,
and finally merging the results.
```

### 4. Test Generation

**Capabilities**:
- Generate unit tests
- Generate test cases
- Generate test data
- Generate assertions

**Use Cases**:
- Test-driven development
- Improve test coverage
- Quickly write tests
- Boundary condition testing

**Example**:
```python
# User input:
def calculate_discount(price, discount_rate):
    if price <= 0:
        raise ValueError("Price must be positive")
    if discount_rate < 0 or discount_rate > 1:
        raise ValueError("Discount rate must be between 0 and 1")
    return price * (1 - discount_rate)

# Copilot generates test:
import pytest

def test_calculate_discount_normal():
    assert calculate_discount(100, 0.1) == 90
    assert calculate_discount(50, 0.2) == 40

def test_calculate_discount_invalid_price():
    with pytest.raises(ValueError):
        calculate_discount(0, 0.1)
    with pytest.raises(ValueError):
        calculate_discount(-100, 0.1)
```

## GitHub Copilot Usage Tips

### 1. Installation and Setup

**Installation Steps**:
1. Visit https://github.com/features/copilot
2. Subscribe to Copilot service
3. Install Copilot plugin in IDE
4. Login to GitHub account
5. Start using

**Supported IDEs**:
- Visual Studio Code
- Visual Studio
- JetBrains IDEs
- Neovim
- Emacs

**Configuration Example**:
```json
// VS Code settings.json
{
  "github.copilot.enable": {
    "*": true,
    "yaml": false,
    "plaintext": false
  },
  "github.copilot.inlineSuggest.enable": true
}
```

### 2. Code Completion Tips

**Tips**:
- Write clear function names
- Add meaningful comments
- Provide type annotations
- Write docstrings

**Example**:
```python
# Good example:
def process_user_data(user_id: int, data: dict) -> dict:
    """
    Process user data, validate and format

    Args:
        user_id: User ID
        data: User data dictionary

    Returns:
        Processed data dictionary
    """
    # Copilot will generate better code based on this information
    ...

# Bad example:
def process(a, b):
    # Lacks types and documentation, Copilot has difficulty understanding intent
    ...
```

### 3. Code Generation Tips

**Tips**:
- Write clear descriptions
- Implement step by step
- Provide examples
- Iteratively optimize

**Example**:
```
# Step 1: Describe requirements
# Create a REST API endpoint for retrieving user information

# Step 2: Provide more details
# Use FastAPI framework, include user ID validation and error handling

# Step 3: Provide example
# GET /users/{user_id} returns user details

# Step 4: Optimize and adjust
# Adjust based on generated code
```

### 4. Test Generation Tips

**Tips**:
- Write clear test descriptions
- Specify test framework
- Explain test objectives
- Request boundary condition coverage

**Example**:
```python
# Write test description
# Generate unit tests for calculate_discount function
# Use pytest framework
# Cover normal cases, boundary conditions, and exceptions

# Copilot generates tests
import pytest

def test_calculate_discount_normal():
    """Test normal discount calculation"""
    assert calculate_discount(100, 0.1) == 90

def test_calculate_discount_boundary():
    """Test boundary cases"""
    assert calculate_discount(100, 0) == 100
    assert calculate_discount(100, 1) == 0

def test_calculate_discount_invalid():
    """Test exception cases"""
    with pytest.raises(ValueError):
        calculate_discount(0, 0.1)
```

## GitHub Copilot Best Practices

### 1. Project Configuration

**Suitable for**:
- New project initialization
- Team collaboration
- Code standardization

**Configuration Steps**:
1. Create `.github/copilot-instructions.md` file
2. Define project specifications
3. Add code style guidelines
4. Describe common patterns

**Example Configuration**:
```
# .github/copilot-instructions.md

## Project Information
- Project Name: MyApp
- Tech Stack: Python + FastAPI
- Architecture: RESTful API

## Coding Standards
- Use TypeScript type annotations
- Follow PEP 8 standards
- Add docstrings to functions
- Use pytest for testing

## Code Style
- Use 4-space indentation
- Use double quotes
- Add type hints
- Use snake_case for function names

## Common Patterns
- Use dependency injection
- Unified error handling
- Standardized logging
```

### 2. Daily Development

**Suitable for**:
- Daily programming
- Bug fixes
- Feature development

**Workflow**:
1. Write clear function signatures
2. Add docstrings
3. Use Copilot to generate implementation
4. Review and modify code
5. Run tests
6. Iteratively optimize

**Example**:
```python
# Step 1: Write function signature
def create_user(email: str, password: str) -> dict:
    """
    Create new user

    Args:
        email: User email
        password: User password

    Returns:
        Dictionary containing user information
    """
    # Step 2: Use Copilot to generate implementation
    ...

# Step 3: Review and modify
# Check generated code
# Add necessary validation
# Optimize error handling

# Step 4: Run tests
# Test normal cases
# Test exception cases
# Verify boundary conditions
```

### 3. Team Collaboration

**Suitable for**:
- Team projects
- Code review
- Knowledge sharing

**Collaboration Methods**:
1. Share Copilot configuration
2. Unify code style
3. Establish best practices
4. Regularly share tips

**Example**:
```
# Team Copilot Configuration

## Team Standards
- Follow team coding standards
- Use unified code style
- Add thorough documentation

## Code Review
- Review Copilot-generated code
- Verify code correctness
- Add necessary tests

## Knowledge Sharing
- Share effective prompts
- Document best practices
- Regularly update configuration
```

### 4. Learning and Exploration

**Suitable for**:
- Learning new technologies
- Exploring new frameworks
- Understanding code

**Learning Methods**:
1. Use Copilot to generate example code
2. Study generated code
3. Understand implementation methods
4. Practical application
5. Record learning notes

**Example**:
```python
# Learning new framework
# Step 1: Describe requirements
# Create a simple API endpoint using FastAPI

# Step 2: View generated code
# Understand how FastAPI is used
# Learn decorator usage
# Understand role of type annotations

# Step 3: Practical application
# Create your own API endpoints
# Add more features
# Implement error handling

# Step 4: Record notes
# Record key concepts
# Summarize best practices
# Document common patterns
```

## GitHub Copilot Suitable Scenarios

### Most Suitable Scenarios

1. **Daily Programming**
   - Code completion
   - Code generation
   - Bug fixes
   - Refactoring optimization

2. **Rapid Prototyping**
   - Quickly generate code
   - Implement test cases
   - Generate boilerplate code

3. **Learning Programming**
   - Learn new languages
   - Understand code patterns
   - Explore new frameworks

4. **Team Collaboration**
   - Unify code style
   - Improve development efficiency
   - Knowledge sharing

### Less Suitable Scenarios

1. **Complex Algorithm Design**
   - Requires deep thinking
   - Requires domain knowledge
   - Requires innovative thinking

2. **Architecture Design**
   - Requires global perspective
   - Requires experienced judgment
   - Requires trade-offs

3. **Security Sensitive Code**
   - Requires security audit
   - Requires rigorous testing
   - Requires expert review

## GitHub Copilot Practical Cases

### Case 1: Rapid REST API Development

**Scenario**: Create user management API using FastAPI

**Workflow**:
```python
# Step 1: Define data model
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    email: str

# Step 2: Use Copilot to generate API endpoints
from fastapi import FastAPI

app = FastAPI()

@app.post("/users/")
async def create_user(user: User):
    # Copilot generates implementation
    ...

# Step 3: Review and optimize
# Add database integration
# Implement error handling
# Add validation logic

# Step 4: Generate tests
# Use Copilot to generate test cases
# Verify API functionality
```

**Effects**:
- Quickly generate initial code
- Automatically follow project standards
- Improve development efficiency
- Reduce repetitive work

### Case 2: Implementing Test Cases

**Scenario**: Generate comprehensive tests for existing code

**Workflow**:
```python
# Original code
def calculate_discount(price, discount_rate):
    if price <= 0:
        raise ValueError("Price must be positive")
    if discount_rate < 0 or discount_rate > 1:
        raise ValueError("Discount rate must be between 0 and 1")
    return price * (1 - discount_rate)

# Use Copilot to generate tests
import pytest

def test_calculate_discount_normal():
    assert calculate_discount(100, 0.1) == 90
    assert calculate_discount(50, 0.2) == 40

def test_calculate_discount_boundary():
    assert calculate_discount(100, 0) == 100
    assert calculate_discount(100, 1) == 0

def test_calculate_discount_invalid():
    with pytest.raises(ValueError):
        calculate_discount(0, 0.1)
    with pytest.raises(ValueError):
        calculate_discount(-100, 0.1)
```

**Effects**:
- Quickly generate test cases
- Cover multiple scenarios
- Improve test coverage
- Save testing time

### Case 3: Code Refactoring

**Scenario**: Optimize code structure and readability

**Workflow**:
```python
# Original code
def process_data(data):
    result = []
    for item in data:
        if item['type'] == 'A':
            result.append(item['value'] * 2)
        elif item['type'] == 'B':
            result.append(item['value'] * 3)
        elif item['type'] == 'C':
            result.append(item['value'] * 4)
        else:
            result.append(item['value'])
    return result

# Use Copilot to refactor
from typing import List, Dict

def process_data(data: List[Dict]) -> List:
    """
    Process data based on type

    Args:
        data: List of data containing type and value

    Returns:
        Processed data list
    """
    type_multiplier = {
        'A': 2,
        'B': 3,
        'C': 4
    }

    result = []
    for item in data:
        multiplier = type_multiplier.get(item['type'], 1)
        result.append(item['value'] * multiplier)

    return result
```

**Effects**:
- Improve code readability
- Improve code structure
- Enhance maintainability
- Add type annotations and documentation

## GitHub Copilot Common Questions

### Installation and Setup

**Question**: How to install GitHub Copilot?

**Answer**:
1. Visit https://github.com/features/copilot
2. Subscribe to Copilot service
3. Install Copilot plugin in IDE
4. Login to GitHub account
5. Start using

**Question**: Which IDEs does Copilot support?

**Answer**:
- Visual Studio Code
- Visual Studio
- JetBrains IDEs (IntelliJ IDEA, PyCharm, etc.)
- Neovim
- Emacs

### Usage Tips

**Question**: How to improve Copilot's suggestion quality?

**Answer**:
1. Write clear function names
2. Add meaningful comments
3. Provide type annotations
4. Write docstrings
5. Follow consistent code style

**Question**: How to help Copilot better understand the project?

**Answer**:
1. Create `.github/copilot-instructions.md` file
2. Define project specifications
3. Describe common patterns
4. Add code style guidelines

### Performance and Efficiency

**Question**: Will Copilot affect IDE performance?

**Answer**:
- Usually minimal impact
- Large projects may have slight delay
- Performance options can be adjusted in settings

**Question**: How to improve Copilot's response speed?

**Answer**:
1. Reduce project size
2. Exclude unnecessary files
3. Adjust Copilot settings
4. Use faster network connection

## GitHub Copilot Pricing Plans

### Individual Version

- Price: $10/month or $100/year
- Features:
  - Basic code completion
  - Multi-language support
  - IDE integration
  - 60-day free trial

### Business Version

- Price: $19/user/month
- Features:
  - All individual features
  - Enterprise support
  - Admin console
  - Security and compliance

### Student Version

- Price: Free
- Features:
  - All individual features
  - Requires GitHub Student Pack

## Awesome GitHub Copilot

**Repository**: https://github.com/github/awesome-copilot

**Introduction**:
This is a carefully curated list of GitHub Copilot resources, including various tools, tutorials, tips, and best practices.

**Main Content**:

1. **Official Resources**
   - Official documentation
   - Blog posts
   - Video tutorials

2. **Community Resources**
   - Tutorials and guides
   - Best practices
   - Usage tips

3. **Tools and Plugins**
   - IDE plugins
   - Extension tools
   - Integration solutions

4. **Examples and Templates**
   - Project templates
   - Code examples
   - Configuration files

**How to Use**:
1. Browse resources in the repository
2. Select appropriate resources
3. Learn best practices
4. Apply to actual projects

## Next Steps

- [Cursor User Guide](../cursor/README.en.md) - Learn about Cursor's features
- [Tool Comparison](../../tool-matrix.en.md) - Compare different tools
- [Coding Scene Prompts](../../prompts/by-scene/coding-prompts.en.md) - Learn programming prompts