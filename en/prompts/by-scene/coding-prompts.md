---
title: Coding Scenario Prompts
difficulty: intermediate
roles: [programmer]
type: guide
duration: 20 min
tags: [Prompts, Coding, Programming]
tools: [Claude, ChatGPT, DeepSeek]
---

# Coding Scenario Prompts

## Code Generation

### Generate REST API

**Use Case**: Quickly generate RESTful API code

**Prompt Template**:
```
You are an experienced backend developer. Please help me generate a [language] REST API that implements [feature description].

Requirements:
1. Use [framework] framework
2. Include the following endpoints:
   - [endpoint1]
   - [endpoint2]
   - [endpoint3]
3. Implement data validation
4. Add error handling
5. Include basic authentication mechanism

Please provide:
1. Complete code implementation
2. API documentation
3. Test case examples
```

**Example Input**:
```
You are an experienced backend developer. Please help me generate a Python REST API that implements user management functionality.

Requirements:
1. Use FastAPI framework
2. Include the following endpoints:
   - POST /users - Create user
   - GET /users/{id} - Get user information
   - PUT /users/{id} - Update user information
   - DELETE /users/{id} - Delete user
3. Implement data validation
4. Add error handling
5. Include basic authentication mechanism

Please provide:
1. Complete code implementation
2. API documentation
3. Test case examples
```

**Example Output**:
```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# Data model
class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    password: str

# Mock database
users_db = {}

# Create user
@app.post("/users")
async def create_user(user: User):
    user_id = len(users_db) + 1
    user.id = user_id
    users_db[user_id] = user
    return user

# Get user
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    return users_db[user_id]

# Update user
@app.put("/users/{user_id}")
async def update_user(user_id: int, user: User):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    user.id = user_id
    users_db[user_id] = user
    return user

# Delete user
@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    del users_db[user_id]
    return {"message": "User deleted"}
```

**Notes**:
- Adjust framework and endpoints according to actual needs
- Production environments require more robust authentication and authorization
- Consider adding database integration
- Add logging

**Variation Suggestions**:
- Add database integration (e.g., SQLAlchemy)
- Implement more complex authentication (e.g., JWT)
- Add pagination and filtering functionality

### Generate Algorithm Implementation

**Use Case**: Quickly implement common algorithms

**Prompt Template**:
```
Please implement [algorithm name] algorithm in [language].

Requirements:
1. Include detailed comments
2. Explain time and space complexity
3. Provide test cases
4. Add boundary condition handling

Please provide in the following format:
1. Algorithm explanation
2. Code implementation
3. Complexity analysis
4. Test cases
```

**Example Input**:
```
Please implement quick sort algorithm in Python.

Requirements:
1. Include detailed comments
2. Explain time and space complexity
3. Provide test cases
4. Add boundary condition handling

Please provide in the following format:
1. Algorithm explanation
2. Code implementation
3. Complexity analysis
4. Test cases
```

**Example Output**:
```python
def quick_sort(arr):
    """
    Quick sort algorithm implementation

    Args:
        arr: List to be sorted

    Returns:
        Sorted list
    """
    # Boundary condition: empty or single-element list is already sorted
    if len(arr) <= 1:
        return arr

    # Select pivot element (choose middle element here)
    pivot = arr[len(arr) // 2]

    # Partition
    left = [x for x in arr if x < pivot]   # Elements less than pivot
    middle = [x for x in arr if x == pivot]  # Elements equal to pivot
    right = [x for x in arr if x > pivot]  # Elements greater than pivot

    # Recursively sort and merge
    return quick_sort(left) + middle + quick_sort(right)

# Test cases
if __name__ == "__main__":
    # Normal case
    assert quick_sort([3, 6, 8, 10, 1, 2, 1]) == [1, 1, 2, 3, 6, 8, 10]

    # Empty list
    assert quick_sort([]) == []

    # Single element
    assert quick_sort([5]) == [5]

    # Already sorted
    assert quick_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]

    # Reverse order
    assert quick_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]

    print("All test cases passed!")

"""
Complexity Analysis:
- Time Complexity:
  - Average case: O(n log n)
  - Worst case: O(n²)
  - Best case: O(n log n)

- Space Complexity:
  - O(log n) (recursive call stack)
"""
```

**Notes**:
- Choose pivot selection strategy based on specific needs
- Consider using in-place sorting to save space
- Watch out for recursion depth with large datasets

**Variation Suggestions**:
- Implement in-place quick sort
- Add randomized pivot selection
- Implement three-way quick sort (handle duplicate elements)

## Code Explanation

### Explain Complex Code Logic

**Use Case**: Understand complex code snippets

**Prompt Template**:
```
Please explain the logic of the following code in detail:

[code content]

Please explain in the following structure:
1. Overall functionality of the code
2. Key parts explanation
3. Execution flow
4. Potential issues
5. Improvement suggestions
```

**Example Input**:
```
Please explain the logic of the following code in detail:

```python
def decorator(func):
    def wrapper(*args, **kwargs):
        print("Before function call")
        result = func(*args, **kwargs)
        print("After function call")
        return result
    return wrapper

@decorator
def say_hello():
    print("Hello!")

say_hello()
```

Please explain in the following structure:
1. Overall functionality of the code
2. Key parts explanation
3. Execution flow
4. Potential issues
5. Improvement suggestions
```

**Example Output**:
```
1. Overall Functionality
   This code implements a Python decorator that adds extra behavior before and after function execution.

2. Key Parts Explanation
   - `decorator` function: This is the decorator function that takes a function as argument
   - `wrapper` function: Inner function that wraps the original function and adds extra behavior
   - `*args, **kwargs`: Accepts any positional and keyword arguments
   - `@decorator` syntax sugar: Passes the `say_hello` function to `decorator`

3. Execution Flow
   Step 1: Define `decorator` function
   Step 2: Decorate `say_hello` function with `@decorator`
   Step 3: When calling `say_hello()`, actually calling `wrapper` function
   Step 4: `wrapper` function executes:
        - Prints "Before function call"
        - Calls original `say_hello` function
        - Prints "After function call"
        - Returns result

4. Potential Issues
   - Original function metadata not preserved (e.g., `__name__`, `__doc__`)
   - No exception handling
   - Doesn't support decorators with parameters

5. Improvement Suggestions
   ```python
   from functools import wraps

   def decorator(func):
       @wraps(func)  # Preserve original function metadata
       def wrapper(*args, **kwargs):
           try:
               print("Before function call")
               result = func(*args, **kwargs)
               print("After function call")
               return result
           except Exception as e:
               print(f"Error: {e}")
               raise
       return wrapper
   ```
```

**Notes**:
- Provide complete code context
- Explain expected behavior of the code
- Point out potential issues in the code

**Variation Suggestions**:
- Ask to explain specific parts rather than entire code
- Ask about pros and cons of the code
- Ask for alternative implementation approaches

## Code Refactoring

### Optimize Code Structure

**Use Case**: Improve code quality and maintainability

**Prompt Template**:
```
Please refactor the following code to improve code quality:

[code content]

Refactoring goals:
1. Improve readability
2. Improve code structure
3. Enhance maintainability
4. Optimize performance (if applicable)

Please provide:
1. Refactored code
2. Refactoring explanation
3. List of improvements
```

**Example Input**:
```
Please refactor the following code to improve code quality:

```python
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
```

Refactoring goals:
1. Improve readability
2. Improve code structure
3. Enhance maintainability
4. Optimize performance (if applicable)

Please provide:
1. Refactored code
2. Refactoring explanation
3. List of improvements
```

**Example Output**:
```python
from typing import List, Dict

def process_data(data: List[Dict]) -> List:
    """
    Process data based on type

    Args:
        data: List of data containing type and value

    Returns:
        List of processed data
    """
    # Define mapping from type to multiplier
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

**Refactoring Explanation**:
1. Added type annotations to improve code readability
2. Added docstring to explain function purpose
3. Used dictionary mapping instead of multiple if-elif to improve maintainability
4. Used `dict.get()` method to handle default case

**Improvements**:
- ✅ Code is more concise
- ✅ Easier to add new types
- ✅ Type annotations improve IDE support
- ✅ Docstring improves maintainability

**Notes**:
- Maintain original functionality
- Ensure refactored code is correct
- Consider adding test cases

**Variation Suggestions**:
- Ask to refactor using design patterns
- Ask for performance optimization suggestions
- Ask to add error handling

## Bug Fixing

### Diagnose and Fix Bugs

**Use Case**: Quickly locate and fix code issues

**Prompt Template**:
```
The following code has a problem, please help me diagnose and fix it:

[code content]

Problem description:
[describe the problem]

Please provide:
1. Problem analysis
2. Fixed code
3. Fix explanation
4. Suggestions to prevent similar issues
```

**Example Input**:
```
The following code has a problem, please help me diagnose and fix it:

```python
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

print(calculate_average([1, 2, 3, 4, 5]))
print(calculate_average([]))
```

Problem description:
When input is an empty list, the program errors: ZeroDivisionError

Please provide:
1. Problem analysis
2. Fixed code
3. Fix explanation
4. Suggestions to prevent similar issues
```

**Example Output**:
```
1. Problem Analysis
   The problem is in the `calculate_average` function. When input is an empty list:
   - `len(numbers)` returns 0
   - `total / 0` causes ZeroDivisionError

2. Fixed Code
```python
def calculate_average(numbers):
    if not numbers:  # Check for empty list
        return 0  # Or return None, depending on requirements

    total = sum(numbers)  # Use built-in sum function
    return total / len(numbers)

print(calculate_average([1, 2, 3, 4, 5]))  # Output: 3.0
print(calculate_average([]))  # Output: 0
```

3. Fix Explanation
   - Added empty list check
   - Used `sum()` function instead of manual summation
   - Return 0 as average for empty list (can be adjusted based on requirements)

4. Suggestions to Prevent Similar Issues
   - Always check boundary conditions (e.g., empty lists, None values)
   - Consider using exception handling
   - Add unit tests to cover boundary cases
   - Use type annotations to improve code quality
```

**Notes**:
- Provide complete error information
- Explain expected behavior of the code
- Consider adding test cases

**Variation Suggestions**:
- Ask to add exception handling
- Ask for performance optimization suggestions
- Ask to add logging

## Unit Testing

### Generate Test Cases

**Use Case**: Generate comprehensive test cases for code

**Prompt Template**:
```
Please generate unit tests for the following code:

[code content]

Requirements:
1. Use [testing framework]
2. Cover normal cases
3. Cover boundary cases
4. Cover exception cases
5. Include test data

Please provide:
1. Test code
2. Test case explanation
3. Execution examples
```

**Example Input**:
```
Please generate unit tests for the following code:

```python
def calculate_discount(price, discount_rate):
    if price <= 0:
        raise ValueError("Price must be positive")
    if discount_rate < 0 or discount_rate > 1:
        raise ValueError("Discount rate must be between 0 and 1")
    return price * (1 - discount_rate)
```

Requirements:
1. Use pytest framework
2. Cover normal cases
3. Cover boundary cases
4. Cover exception cases
5. Include test data

Please provide:
1. Test code
2. Test case explanation
3. Execution examples
```

**Example Output**:
```python
import pytest

def test_calculate_discount_normal():
    """Test normal discount calculation"""
    assert calculate_discount(100, 0.1) == 90
    assert calculate_discount(50, 0.2) == 40
    assert calculate_discount(200, 0.5) == 100

def test_calculate_discount_boundary():
    """Test boundary cases"""
    # 0% discount
    assert calculate_discount(100, 0) == 100
    # 100% discount
    assert calculate_discount(100, 1) == 0
    # Minimum price
    assert calculate_discount(0.01, 0.5) == 0.005

def test_calculate_discount_invalid_price():
    """Test invalid price"""
    with pytest.raises(ValueError):
        calculate_discount(0, 0.1)
    with pytest.raises(ValueError):
        calculate_discount(-100, 0.1)

def test_calculate_discount_invalid_discount_rate():
    """Test invalid discount rate"""
    with pytest.raises(ValueError):
        calculate_discount(100, -0.1)
    with pytest.raises(ValueError):
        calculate_discount(100, 1.5)
```

**Test Case Explanation**:
1. `test_calculate_discount_normal`: Test normal discount calculation
2. `test_calculate_discount_boundary`: Test boundary cases (0% and 100% discount)
3. `test_calculate_discount_invalid_price`: Test invalid price (0 and negative)
4. `test_calculate_discount_invalid_discount_rate`: Test invalid discount rate (negative and greater than 1)

**Execution Example**:
```bash
$ pytest test_discount.py -v
============================= test session starts ==============================
collected 4 items

test_discount.py::test_calculate_discount_normal PASSED
test_discount.py::test_calculate_discount_boundary PASSED
test_discount.py::test_calculate_discount_invalid_price PASSED
test_discount.py::test_calculate_discount_invalid_discount_rate PASSED

============================== 4 passed in 0.12s ===============================
```

**Notes**:
- Adjust testing framework based on actual needs
- Consider adding parameterized tests
- Add test data generators

**Variation Suggestions**:
- Ask to use mock testing
- Add performance tests
- Ask for test coverage report

## Summary

Coding scenario prompts can help you:

**Core Scenarios**:
- ✅ Code Generation: Quickly generate code implementations
- ✅ Code Explanation: Understand complex code logic
- ✅ Code Refactoring: Optimize code quality
- ✅ Bug Fixing: Diagnose and fix issues
- ✅ Unit Testing: Generate comprehensive test cases

**Best Practices**:
1. Provide clear context and requirements
2. Specify programming language and framework
3. Explain expected behavior of the code
4. Request detailed explanations and documentation
5. Verify generated code

**Remember**:
- AI-generated code needs review and testing
- Adjust prompts based on actual needs
- Build your own prompt library
- Continuously optimize and improve

## Next Steps

- [Writing Scenario Prompts](./writing-prompts.en.md) - Learn prompt techniques for writing scenarios
- [Analysis Scenario Prompts](./analysis-prompts.en.md) - Learn prompt techniques for analysis scenarios