---
title: "Chapter 7: Guardian Pattern - Security Boundary Design"
difficulty: intermediate
roles: [developer, architect]
type: tutorial
duration: 55min
tools: [claude-code]
tags: [guardian-pattern, security, safety, skills]
---

# Chapter 7: Guardian Pattern - Security Boundary Design

> **Defensive programming, tiered protection, ensure system safety**

## Chapter Overview

The Guardian Pattern is the core pattern for skill security protection. It intercepts dangerous operations, restricts access scopes, and provides undo mechanisms to ensure systems don't suffer irreversible damage during automated execution. This chapter deeply analyzes the Guardian Pattern's three-tier protection system.

### What You'll Learn

- ✅ Core concepts of the Guardian Pattern
- ✅ Three-tier protection: careful, freeze, guard
- ✅ How to identify and intercept dangerous operations
- ✅ Design your own security guardian skills

---

## 7.1 Concept: Defensive Programming

### Three-Tier Protection System

```
Level 1: careful - Lightweight Warning
  Function: Detect dangerous operations, show warning
  Examples: rm -rf, DROP TABLE, force push

Level 2: freeze - Medium Restriction
  Function: Restrict edit directory scope
  Example: Only allow editing /src/components/

Level 3: guard - Heavy Protection
  Function: careful + freeze combined
  Example: Complete safety mode
```

### Core Value

| Value Dimension | Without Guardian Pattern | With Guardian Pattern |
|----------------|-------------------------|----------------------|
| **Security** | Easy to misoperate | Multi-layer protection |
| **Recoverability** | Irreversible damage | Undo possible |
| **Risk Control** | Hard to control | Tiered protection |
| **User Confidence** | Afraid to use | Use with confidence |

---

## 7.2 Implementation: Three-Tier Protection Mechanism

### Level 1: careful

```markdown
# careful skill implementation

---
name: careful
description: Safety guardrails for destructive commands
---

# Careful Mode

## Detect Dangerous Operations

Monitor for these patterns:

**File System:**
- `rm -rf`
- `rm -rf /`
- `rm -rf *`

**Database:**
- `DROP DATABASE`
- `DROP TABLE`
- `TRUNCATE TABLE`

**Git:**
- `git push --force`
- `git reset --hard`
- `git clean -fd`

**System:**
- `sudo rm`
- `chmod 777`
- `kill -9`

## Warning Mechanism

When dangerous operation detected:

1. **Stop execution**
2. **Show warning:**
   ```
   ⚠️ WARNING: Dangerous operation detected!

   Command: rm -rf /

   Impact: This will delete ALL files in root directory.

   Are you sure you want to continue?

   [Yes, I understand the risk] [No, cancel operation]
   ```

3. **Wait for user confirmation**

4. **If confirmed:**
   - Execute with logging
   - Record in audit log

5. **If cancelled:**
   - Abort operation
   - Show safe alternatives
```

### Level 2: freeze

```markdown
# freeze skill implementation

---
name: freeze
description: Restrict file edits to a specific directory
---

# Freeze Mode

## Set Boundary

Example:
```
Allow edits only in: /src/components/
Block edits outside this directory
```

## Check Mechanism

Before any edit operation:

```python
def check_boundary(file_path):
    allowed_directory = "/src/components/"

    if not file_path.startswith(allowed_directory):
        raise PermissionError(
            f"Edit blocked: {file_path} is outside allowed directory\n"
            f"Allowed: {allowed_directory}\n"
            f"Use /unfreeze to remove restriction"
        )
```

## Use Cases

- Debugging: Limit changes to specific module
- Review: Only edit files in review scope
- Safety: Prevent accidental edits to critical files
```

### Level 3: guard

```markdown
# guard skill implementation

---
name: guard
description: Full safety mode - careful + freeze combined
---

# Guard Mode

## Combined Protection

Activates both:

1. **Careful mode:**
   - Warn on dangerous operations
   - Require confirmation

2. **Freeze mode:**
   - Restrict edit directory
   - Block unauthorized access

## Example Session

```
User: "Delete all node_modules"

Guard detects: rm -rf node_modules

⚠️ WARNING: Potentially destructive operation
This will delete all node_modules directories.

Impact: Need to reinstall dependencies (npm install)

Continue? [Yes] [No]

User: "Yes"

Executing: rm -rf node_modules
✓ Deleted: node_modules in /src/
✓ Deleted: node_modules in /tests/
```
```

---

## 7.3 Source Code Analysis: Dangerous Operation Identification

### Dangerous Operation Pattern Library

```python
dangerous_patterns = {
    'filesystem': [
        r'rm\s+-rf\s+/',
        r'rm\s+-rf\s+\*',
        r'sudo\s+rm',
        r'chmod\s+777',
    ],
    'database': [
        r'DROP\s+DATABASE',
        r'DROP\s+TABLE',
        r'TRUNCATE\s+TABLE',
        r'DELETE\s+FROM\s+\w+\s*;',  # DELETE without WHERE
    ],
    'git': [
        r'git\s+push\s+--force',
        r'git\s+reset\s+--hard',
        r'git\s+clean\s+-fd',
    ],
    'system': [
        r'kill\s+-9\s+1',
        r'shutdown',
        r'reboot',
    ]
}
```

### Detection Algorithm

```python
import re

def detect_dangerous_operation(command):
    """
    Detect if command contains dangerous operations
    """

    for category, patterns in dangerous_patterns.items():
        for pattern in patterns:
            if re.search(pattern, command, re.IGNORECASE):
                return {
                    'is_dangerous': True,
                    'category': category,
                    'pattern': pattern,
                    'command': command
                }

    return {
        'is_dangerous': False
    }

# Example usage
result = detect_dangerous_operation("rm -rf /")

if result['is_dangerous']:
    show_warning(result)
```

---

## 7.4 Comparison: Lightweight Warning vs Complete Protection

| Comparison Dimension | careful (Light) | freeze (Medium) | guard (Heavy) |
|---------------------|----------------|----------------|--------------|
| **Protection Scope** | Dangerous commands | Directory restriction | Both combined |
| **User Burden** | Low (occasional confirmation) | Medium (mind boundaries) | High (double checks) |
| **Flexibility** | High | Medium | Low |
| **Use Cases** | General development | Debugging/review | Critical operations |

---

## 7.5 Practice: Design Your Own Guardian Skill

```markdown
# Example: Design code deletion guardian skill

---
name: delete-guardian
description: Protect against accidental code deletion
---

# Delete Guardian

## Protection Rules

1. **Never delete without backup**
   - Create backup before deletion
   - Store in .trash/ directory

2. **Never delete entire module**
   - Block deletion of entire directories
   - Require file-by-file deletion

3. **Require confirmation**
   - Show what will be deleted
   - Require explicit confirmation

## Implementation

```python
def safe_delete(file_path):
    # Check 1: Is it a directory?
    if os.path.isdir(file_path):
        print(f"⚠️ Cannot delete directory: {file_path}")
        print("Please delete files individually.")
        return False

    # Check 2: Create backup
    backup_path = create_backup(file_path)

    # Check 3: Confirm
    print(f"About to delete: {file_path}")
    print(f"Backup created: {backup_path}")
    print("Continue? [Yes/No]")

    if input() == "Yes":
        os.remove(file_path)
        return True
    else:
        return False
```
```

---

## Chapter Summary

The Guardian Pattern ensures system safety through three-tier protection (careful, freeze, guard):

1. **careful**: Detect dangerous operations, show warnings
2. **freeze**: Restrict edit scope, prevent boundary violations
3. **guard**: Combined protection, maximum security

The Guardian Pattern is the safety cornerstone of skill packages, allowing users to confidently use automation features.

---

**Next Chapter Preview**: Chapter 8 will summarize best practices and common anti-patterns to help you design high-quality skill packages.