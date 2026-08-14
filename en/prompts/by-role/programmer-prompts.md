---
title: Programmer Practical Prompts
difficulty: intermediate
roles: [programmer]
type: guide
duration: 25 min
tags: [Prompts, Programming, Debugging, Code Review, Refactoring]
tools: [Claude, ChatGPT, DeepSeek, Cursor]
---

# Programmer Practical Prompts

> 8 ready-to-use prompts covering the most frequent programmer scenarios

## How to Use

- Each prompt is a **practical version** — copy and use directly
- Replace `[bracketed]` content with your actual situation
- Try the prompt as-is first, then fine-tune based on results
- Send the same question to different AI models for cross-validation against hallucinations

---

## 1. Error Diagnosis

**Scenario**: You hit an error message and don't know the root cause or fix

**Why it works**: Programmers encounter errors daily — this is the highest-frequency scenario. AI can pinpoint root causes far faster than digging through docs yourself.

```
I encountered the following error. Please diagnose the root cause and provide a fix:

【Error Message】
[Paste the full error message, including stack trace]

【Related Code】
[Paste the code snippet involved in the error]

【Runtime Environment】
- Language/Framework: [e.g., Python 3.11 / FastAPI 0.100]
- OS: [e.g., macOS 14 / Ubuntu 22.04]
- Other dependency versions: [e.g., numpy 1.24]

Please answer in this structure:
1. Root cause analysis: one sentence explaining the fundamental cause
2. Fix code: provide code that can directly replace the original
3. Prevention: how to avoid similar issues in the future
```

**Practical Example**:

```
I encountered the following error. Please diagnose the root cause and provide a fix:

【Error Message】
TypeError: Cannot read properties of undefined (reading 'map')

【Related Code】
function UserList({ users }) {
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
}

【Runtime Environment】
- Language/Framework: React 18 / Next.js 14
- Browser: Chrome 120

Please answer in this structure:
1. Root cause analysis
2. Fix code
3. Prevention
```

**Typical AI Response Points**:
- Root cause: `users` is `undefined` when `.map()` is called
- Fix: add default value `{ users = [] }` or conditional rendering
- Prevention: null-safe API responses, TypeScript strict mode

---

## 2. Code Review

**Scenario**: You've written code and want AI to review it for potential issues

**Why it works**: AI reviews faster than humans and catches security vulnerabilities, performance pitfalls, and edge-case gaps — essentially a free code reviewer.

```
Please perform a professional code review on the following code, focusing on security, performance, and edge cases:

【Code】
[Paste your code]

【Purpose】
[Briefly describe what this code does, e.g.: API endpoint for user registration]

Please review across these dimensions:
1. Security: injection, data leaks, permission vulnerabilities
2. Performance: unnecessary computation, memory leaks, N+1 queries
3. Edge cases: null values, extreme inputs, concurrency scenarios
4. Code quality: naming, structure, readability
5. Best practices: violations of language/framework conventions

For each issue, provide:
- Problem description (one sentence)
- Severity (🔴Critical / 🟡Medium / 🟢Minor)
- Fix suggestion (specific code)
```

**Practical Example**:

```
Please perform a professional code review on the following code, focusing on security, performance, and edge cases:

【Code】
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    user = db.execute(f"SELECT * FROM users WHERE username='{username}'")
    if user and user[0]['password'] == password:
        session['user_id'] = user[0]['id']
        return redirect('/dashboard')
    return 'Login failed', 401

【Purpose】
API endpoint for user login

Please review across these dimensions:
1. Security
2. Performance
3. Edge cases
4. Code quality
5. Best practices

For each issue: description, severity, fix suggestion
```

**Typical AI Response Points**:
- 🔴 SQL injection: use parameterized queries instead of string concatenation
- 🔴 Plaintext passwords: use bcrypt hash comparison instead of `==`
- 🟡 No input validation: username/password length/format checks
- 🟢 Missing logging and rate limiting

---

## 3. Refactoring Suggestions

**Scenario**: Code works but is messy; you want to refactor but fear introducing bugs

**Why it works**: AI provides multiple refactoring approaches with pros/cons explanations. You pick the best one — much safer than refactoring by intuition.

```
Please provide a refactoring plan for the following code. Requirements: preserve functionality, improve quality:

【Original Code】
[Paste the code to refactor]

【Refactoring Goal】
[e.g., improve readability / reduce coupling / boost performance / enable extensibility]

【Constraints】
[e.g., no new dependencies / must be compatible with existing interface / Python 3.9+]

Please provide:
1. Complete refactored code (can directly replace original)
2. Item-by-item explanation of each change and its reason
3. Before/after comparison (line count, structural changes)
4. Risk points to watch out for
```

**Practical Example**:

```
Please provide a refactoring plan for the following code. Requirements: preserve functionality, improve quality:

【Original Code】
def get_user_info(user_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name, email, age FROM users WHERE id=" + str(user_id))
    row = cursor.fetchone()
    cursor.close()
    conn.close()
    if row:
        return {"name": row[0], "email": row[1], "age": row[2]}
    return None

【Refactoring Goal】
Improve readability, security, maintainability

【Constraints】
Python 3.10+, no new dependencies

Please provide:
1. Complete refactored code
2. Item-by-item explanation
3. Before/after comparison
4. Risk points
```

**Typical AI Response Points**:
- Parameterized query to prevent SQL injection
- `with` context manager for automatic connection cleanup
- Dictionary unpacking instead of manual index `row[0]`
- Type annotations and docstrings

---

## 4. Unit Test Generation

**Scenario**: You've written feature code and need tests but don't want to write them manually

**Why it works**: Writing tests is the most tedious part of development. AI generates complete test suites covering normal/boundary/exception cases in one shot.

```
Please generate complete unit tests for the following code:

【Source Code】
[Paste the code to test]

【Test Framework】
[e.g., pytest / Jest / JUnit 5 / Go testing]

【Special Requirements】
[e.g., need to mock database / need parameterized tests / coverage target 80%+]

Please generate:
1. Complete test code (can run directly)
2. Description of each test case (what scenario it tests)
3. Coverage dimension checklist (normal/boundary/exception)
4. Run command example
```

**Practical Example**:

```
Please generate complete unit tests for the following code:

【Source Code】
class ShoppingCart:
    def __init__(self):
        self.items = {}

    def add_item(self, name, price, quantity=1):
        if price < 0 or quantity < 1:
            raise ValueError("Invalid price or quantity")
        self.items[name] = {"price": price, "quantity": quantity}

    def remove_item(self, name):
        if name not in self.items:
            raise KeyError(f"Item '{name}' not in cart")
        del self.items[name]

    def total(self):
        return sum(item["price"] * item["quantity"] for item in self.items.values())

【Test Framework】
pytest

【Special Requirements】
Parameterized tests, coverage target 90%+

Please generate:
1. Complete test code
2. Description of each test case
3. Coverage dimension checklist
4. Run command example
```

**Typical AI Response Points**:
- Normal scenarios: add/remove/calculate total
- Boundary scenarios: empty cart total=0, quantity=1 minimum
- Exception scenarios: negative price, zero quantity, remove nonexistent item
- Parameterized: multiple price×quantity combinations

---

## 5. API Interface Design

**Scenario**: You have requirements and need to design API endpoint definitions

**Why it works**: Translating requirements into API definitions is the most mentally taxing step. AI quickly produces RESTful-compliant definitions, saving you from endless deliberation.

```
Please design API endpoints based on the following requirements:

【Requirement Description】
[Describe the business need, e.g.: Users can create, view, update, and delete their own tasks. Tasks have title, status, and due date]

【Technical Constraints】
- Framework: [e.g., FastAPI / Spring Boot / Express]
- Database: [e.g., PostgreSQL / MongoDB]
- Authentication: [e.g., JWT / OAuth2]

Please provide:
1. Endpoint list (path, method, function, auth requirement)
2. Request/response examples for each endpoint (JSON format)
3. Data model definition (fields, types, constraints)
4. Error code definitions (common errors and corresponding HTTP status codes)
5. Relationship description between endpoints
```

**Practical Example**:

```
Please design API endpoints based on the following requirements:

【Requirement Description】
Task management system: Users can create, view, update, and delete their own tasks. Tasks have title, description, status (todo/in-progress/done), priority (low/medium/high), and due date. Support filtering by status and priority, support pagination.

【Technical Constraints】
- Framework: FastAPI
- Database: PostgreSQL
- Authentication: JWT Bearer Token

Please provide:
1. Endpoint list
2. Request/response examples
3. Data model definition
4. Error code definitions
5. Endpoint relationship description
```

**Typical AI Response Points**:
- CRUD 5 endpoints + filter/pagination parameter design
- Task model: id, title, description, status, priority, due_date, created_at, updated_at
- 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Validation Error
- Status transition constraints (e.g., done cannot revert to in-progress)

---

## 6. SQL Optimization

**Scenario**: A query is too slow and needs optimization

**Why it works**: Slow queries are a perennial backend pain point. AI analyzes execution plans, suggests indexes, and rewrites SQL — far more efficient than grinding through docs yourself.

```
The following SQL query is too slow. Please help optimize it:

【Original SQL】
[Paste the slow query]

【Table Structure】
[Paste relevant table DDL, or describe table names, columns, approximate row counts]

【Current Performance】
- Execution time: [e.g., 3.2 seconds]
- Data volume: [e.g., orders table 5M rows]
- Database: [e.g., MySQL 8.0 / PostgreSQL 15]

Please provide:
1. Performance bottleneck analysis (why it's slow)
2. Optimized SQL (can directly replace original)
3. Recommended indexes (with CREATE INDEX statements)
4. Expected before/after comparison
5. Further optimization suggestions (e.g., table partitioning, caching)
```

**Practical Example**:

```
The following SQL query is too slow. Please help optimize it:

【Original SQL】
SELECT o.id, o.total, u.name, p.title
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id
WHERE o.created_at > '2025-01-01'
  AND u.region = 'East China'
  AND p.category = 'Electronics'
ORDER BY o.created_at DESC
LIMIT 20;

【Table Structure】
orders: id, user_id, product_id, total, created_at (5M rows)
users: id, name, region (100K rows)
products: id, title, category (10K rows)

【Current Performance】
- Execution time: 4.5 seconds
- Data volume: orders 5M rows
- Database: MySQL 8.0

Please provide:
1. Performance bottleneck analysis
2. Optimized SQL
3. Recommended indexes
4. Expected before/after comparison
5. Further optimization suggestions
```

**Typical AI Response Points**:
- Bottleneck: three-table JOIN + full table scan without indexes
- Indexes: orders(created_at, user_id), users(region), products(category)
- Optimized SQL: subquery to filter small tables first, then JOIN; covering indexes
- Further: hot/cold data partitioning, query caching

---

## 7. Technical Solution Comparison

**Scenario**: You're torn between technical options and need an objective comparison

**Why it works**: People tend to favor solutions they're familiar with. AI provides objective multi-dimensional comparisons to help you make rational decisions.

```
Please compare the following technical solutions and help me make a selection decision:

【Candidate Solutions】
[List solutions to compare, e.g., Redis vs Memcached / React vs Vue / REST vs GraphQL]

【Use Case】
[Describe your specific scenario, e.g., 100K QPS session cache with complex data structures]

【Decision Dimensions】
[e.g., performance, ease of use, community ecosystem, ops cost, team skill match]

【Team Context】
[e.g., 5-person team, primarily Python, no dedicated ops]

Please provide:
1. Detailed comparison per dimension (table format)
2. Pros and cons of each solution (3 items each)
3. Recommended solution for my scenario with reasoning
4. Implementation notes for the recommended solution
```

**Practical Example**:

```
Please compare the following technical solutions and help me make a selection decision:

【Candidate Solutions】
Redis vs Memcached

【Use Case】
100K QPS session cache, needs to store complex user state (nested JSON), needs persistence

【Decision Dimensions】
Performance, data structure support, persistence, ops complexity, community ecosystem

【Team Context】
5-person Python team, no dedicated ops, limited budget

Please provide:
1. Detailed comparison per dimension (table format)
2. Pros and cons of each solution
3. Recommended solution with reasoning
4. Implementation notes
```

**Typical AI Response Points**:
- Redis wins: supports complex data structures, has persistence, single-threaded handles 100K QPS
- Memcached advantage: simpler, multi-threaded higher throughput (but only strings)
- Recommendation: Redis because nested JSON and persistence are required
- Notes: Redis memory management, eviction policy config, master-replica HA

---

## 8. Regex Generation

**Scenario**: You need a regex but can't write it or can't write it accurately

**Why it works**: Regex is one of the things programmers fear most. AI writes regex very well and explains each part's meaning — no more staring at regex patterns in confusion.

```
Please generate a regular expression for me:

【Match Target】
[Describe what you want to match, e.g., US phone numbers / URLs / emails / JSON keys]

【Specific Rules】
[e.g., 10 digits starting with area code / must include https / allow subdomains]

【Test Cases】
Should match: [list 3-5 examples that should match]
Should NOT match: [list 3-5 examples that should NOT match]

【Environment】
[e.g., Python re module / JavaScript / Go regexp / grep]

Please provide:
1. The regex with comments explaining each part
2. Usage code example in the specified environment
3. Verification against test cases
4. Common variants (e.g., more lenient / stricter versions)
```

**Practical Example**:

```
Please generate a regular expression for me:

【Match Target】
US phone numbers

【Specific Rules】
10 digits, optional leading +1 country code, optional dashes/spaces between groups

【Test Cases】
Should match: +1-555-123-4567, 5551234567, 555-123-4567
Should NOT match: 12345, 555-123, +44-555-123-4567

【Environment】
Python re module

Please provide:
1. The regex with comments
2. Python usage code example
3. Verification against test cases
4. Common variants
```

**Typical AI Response Points**:
- Regex: `^(\+1[-\s]?)?\d{3}[-\s]?\d{3}[-\s]?\d{4}$`
- Comments: `^` start → `(\+1[-\s]?)?` optional country code → `\d{3}` area code → `[-\s]?` optional separator → `\d{3}` exchange → `\d{4}$` subscriber end
- Python code: `re.match(r'^(\+1[-\s]?)?\d{3}[-\s]?\d{3}[-\s]?\d{4}$', phone)`
- Variants: strict (no separators), lenient (allow parentheses around area code)

---

## Usage Tips

### Prompt Fine-Tuning

1. **Add context**: Tell AI your project background, tech stack, and constraints for more precise answers
2. **Specify format**: Explicitly request tables, code blocks, step-by-step format for more readable output
3. **Cross-validate**: Send the same question to Claude and DeepSeek, compare answers to spot differences
4. **Iterate**: If the first answer isn't satisfactory, follow up with "be more specific" or "give alternative approaches"

### Anti-Hallucination Tips

1. **Request sources**: Add "please cite information sources"
2. **Request uncertainty**: Add "explicitly state where you're uncertain"
3. **Verify code**: Always run AI-generated code yourself before deploying
4. **Check logic**: Walk through AI's logic yourself, especially for security-related suggestions

---

## Related Resources

- [Coding Scene Prompts](../by-scene/coding-prompts.md) — Programming prompts by scenario
- [System Prompts Guide](../system-prompts.md) — System prompt design methodology
- [Programmer AI Guide](../../roles/programmer/README.md) — Complete guide for programmers using AI
- [Writing Scene Prompts](../by-scene/writing-prompts.md) — Writing-related prompts
