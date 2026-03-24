---
title: "第7章：守护模式 - 安全边界设计"
difficulty: intermediate
roles: [developer, architect]
type: tutorial
duration: 55min
tools: [claude-code]
tags: [guardian-pattern, security, safety, skills]
---

# 第7章：守护模式 - 安全边界设计

> **防御性编程，分级保护，确保系统安全**

## 本章导读

守护模式是技能包安全防护的核心模式。它通过拦截危险操作、限制访问范围、提供撤销机制，确保系统在自动化执行中不会造成不可逆的损害。本章将深入解析守护模式的三级防护体系。

### 你将学到

- ✅ 守护模式的核心概念
- ✅ careful, freeze, guard 三级防护
- ✅ 如何识别和拦截危险操作
- ✅ 设计自己的安全守护技能

---

## 7.1 概念：防御性编程

### 三级防护体系

```
Level 1: careful - 轻量级警告
  功能：检测危险操作，弹出警告
  示例：rm -rf, DROP TABLE, force push

Level 2: freeze - 中量级限制
  功能：限制编辑目录范围
  示例：只允许编辑 /src/components/

Level 3: guard - 重量级保护
  功能：careful + freeze 组合
  示例：完整的安全模式
```

### 核心价值

| 价值维度 | 没有守护模式 | 有守护模式 |
|---------|------------|----------|
| **安全性** | 容易误操作 | 多层防护 |
| **可恢复性** | 不可逆损害 | 可撤销 |
| **风险控制** | 难以控制 | 分级保护 |
| **用户信心** | 不敢使用 | 安心使用 |

---

## 7.2 实现：三级防护机制

### Level 1: careful

```markdown
# careful 技能实现

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
# freeze 技能实现

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
# guard 技能实现

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

## 7.3 源码解析：危险操作识别

### 危险操作模式库

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

### 检测算法

```python
import re

def detect_dangerous_operation(command):
    """
    检测命令是否包含危险操作
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

## 7.4 对比：轻量警告 vs 完整保护

| 对比维度 | careful (轻量) | freeze (中量) | guard (重量) |
|---------|---------------|--------------|-------------|
| **保护范围** | 危险命令 | 目录限制 | 两者组合 |
| **用户负担** | 低（偶尔确认） | 中（注意边界） | 高（双重检查） |
| **灵活性** | 高 | 中 | 低 |
| **适用场景** | 一般开发 | 调试/审查 | 关键操作 |

---

## 7.5 实战：设计自己的守护技能

```markdown
# 示例：设计代码删除守护技能

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

## 本章小结

守护模式通过三级防护（careful, freeze, guard）确保系统安全：

1. **careful**：检测危险操作，弹出警告
2. **freeze**：限制编辑范围，防止越界
3. **guard**：组合保护，最高安全性

守护模式是技能包的安全基石，让用户可以安心使用自动化功能。

---

**下一章预告**：第8章将总结最佳实践与常见反模式，帮助你设计高质量的技能包。