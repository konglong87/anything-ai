---
title: 编程场景提示词
difficulty: intermediate
roles: [programmer]
type: guide
duration: 20 min
tags: [Prompts, Coding, Programming]
tools: [Claude, ChatGPT, DeepSeek]
---

# 编程场景提示词

## 代码生成

### 生成REST API

**使用场景**：快速生成RESTful API代码

**提示词模板**：
```
你是一个经验丰富的后端开发工程师。请帮我生成一个[语言]的REST API，实现[功能描述]。

要求：
1. 使用[框架]框架
2. 包含以下端点：
   - [端点1]
   - [端点2]
   - [端点3]
3. 实现数据验证
4. 添加错误处理
5. 包含基本的认证机制

请提供：
1. 完整的代码实现
2. API文档
3. 测试用例示例
```

**示例输入**：
```
你是一个经验丰富的后端开发工程师。请帮我生成一个Python的REST API，实现用户管理功能。

要求：
1. 使用FastAPI框架
2. 包含以下端点：
   - POST /users - 创建用户
   - GET /users/{id} - 获取用户信息
   - PUT /users/{id} - 更新用户信息
   - DELETE /users/{id} - 删除用户
3. 实现数据验证
4. 添加错误处理
5. 包含基本的认证机制

请提供：
1. 完整的代码实现
2. API文档
3. 测试用例示例
```

**示例输出**：
```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# 数据模型
class User(BaseModel):
    id: Optional[int] = None
    name: str
    email: str
    password: str

# 模拟数据库
users_db = {}

# 创建用户
@app.post("/users")
async def create_user(user: User):
    user_id = len(users_db) + 1
    user.id = user_id
    users_db[user_id] = user
    return user

# 获取用户
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    return users_db[user_id]

# 更新用户
@app.put("/users/{user_id}")
async def update_user(user_id: int, user: User):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    user.id = user_id
    users_db[user_id] = user
    return user

# 删除用户
@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    del users_db[user_id]
    return {"message": "User deleted"}
```

**注意事项**：
- 根据实际需求调整框架和端点
- 生产环境需要更完善的认证和授权
- 考虑添加数据库集成
- 添加日志记录

**变体建议**：
- 添加数据库集成（如SQLAlchemy）
- 实现更复杂的认证（如JWT）
- 添加分页和过滤功能

### 生成算法实现

**使用场景**：快速实现常见算法

**提示词模板**：
```
请用[语言]实现[算法名称]算法。

要求：
1. 包含详细的注释
2. 说明时间复杂度和空间复杂度
3. 提供测试用例
4. 添加边界条件处理

请按以下格式提供：
1. 算法说明
2. 代码实现
3. 复杂度分析
4. 测试用例
```

**示例输入**：
```
请用Python实现快速排序算法。

要求：
1. 包含详细的注释
2. 说明时间复杂度和空间复杂度
3. 提供测试用例
4. 添加边界条件处理

请按以下格式提供：
1. 算法说明
2. 代码实现
3. 复杂度分析
4. 测试用例
```

**示例输出**：
```python
def quick_sort(arr):
    """
    快速排序算法实现

    参数:
        arr: 待排序的列表

    返回:
        排序后的列表
    """
    # 边界条件：空列表或单元素列表已排序
    if len(arr) <= 1:
        return arr

    # 选择基准元素（这里选择中间元素）
    pivot = arr[len(arr) // 2]

    # 分区
    left = [x for x in arr if x < pivot]   # 小于基准的元素
    middle = [x for x in arr if x == pivot]  # 等于基准的元素
    right = [x for x in arr if x > pivot]  # 大于基准的元素

    # 递归排序并合并
    return quick_sort(left) + middle + quick_sort(right)

# 测试用例
if __name__ == "__main__":
    # 正常情况
    assert quick_sort([3, 6, 8, 10, 1, 2, 1]) == [1, 1, 2, 3, 6, 8, 10]

    # 空列表
    assert quick_sort([]) == []

    # 单元素
    assert quick_sort([5]) == [5]

    # 已排序
    assert quick_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]

    # 逆序
    assert quick_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]

    print("所有测试用例通过！")

"""
复杂度分析：
- 时间复杂度：
  - 平均情况：O(n log n)
  - 最坏情况：O(n²)
  - 最好情况：O(n log n)

- 空间复杂度：
  - O(log n)（递归调用栈）
"""
```

**注意事项**：
- 根据具体需求选择基准元素选择策略
- 考虑使用原地排序以节省空间
- 大数据集时注意递归深度

**变体建议**：
- 实现原地快速排序
- 添加随机化基准选择
- 实现三路快速排序（处理重复元素）

## 代码解释

### 解释复杂代码逻辑

**使用场景**：理解复杂的代码片段

**提示词模板**：
```
请详细解释以下代码的逻辑：

[代码内容]

请按以下结构解释：
1. 代码整体功能
2. 关键部分说明
3. 执行流程
4. 潜在问题
5. 改进建议
```

**示例输入**：
```
请详细解释以下代码的逻辑：

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

请按以下结构解释：
1. 代码整体功能
2. 关键部分说明
3. 执行流程
4. 潜在问题
5. 改进建议
```

**示例输出**：
```
1. 代码整体功能
   这段代码实现了一个Python装饰器(decorator)，用于在函数执行前后添加额外的行为。

2. 关键部分说明
   - `decorator`函数：这是装饰器函数，接收一个函数作为参数
   - `wrapper`函数：内部函数，包装原始函数，添加额外行为
   - `*args, **kwargs`：接收任意位置参数和关键字参数
   - `@decorator`语法糖：将`say_hello`函数传递给`decorator`

3. 执行流程
   步骤1: 定义`decorator`函数
   步骤2: 使用`@decorator`装饰`say_hello`函数
   步骤3: 调用`say_hello()`时，实际调用的是`wrapper`函数
   步骤4: `wrapper`函数执行：
        - 打印"Before function call"
        - 调用原始`say_hello`函数
        - 打印"After function call"
        - 返回结果

4. 潜在问题
   - 没有保留原始函数的元信息（如`__name__`、`__doc__`）
   - 没有处理异常
   - 不支持带参数的装饰器

5. 改进建议
   ```python
   from functools import wraps

   def decorator(func):
       @wraps(func)  # 保留原始函数的元信息
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

**注意事项**：
- 提供完整的代码上下文
- 说明代码的预期行为
- 指出代码中的潜在问题

**变体建议**：
- 要求解释特定部分而非整个代码
- 询问代码的优缺点
- 询问替代实现方案

## 代码重构

### 优化代码结构

**使用场景**：改进代码质量和可维护性

**提示词模板**：
```
请重构以下代码，提高代码质量：

[代码内容]

重构目标：
1. 提高可读性
2. 改善代码结构
3. 增强可维护性
4. 优化性能（如适用）

请提供：
1. 重构后的代码
2. 重改说明
3. 改进点列表
```

**示例输入**：
```
请重构以下代码，提高代码质量：

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

重构目标：
1. 提高可读性
2. 改善代码结构
3. 增强可维护性
4. 优化性能（如适用）

请提供：
1. 重构后的代码
2. 重改说明
3. 改进点列表
```

**示例输出**：
```python
from typing import List, Dict

def process_data(data: List[Dict]) -> List:
    """
    根据类型处理数据

    参数:
        data: 包含类型和值的数据列表

    返回:
        处理后的数据列表
    """
    # 定义类型到乘数的映射
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

**重构说明**：
1. 添加了类型注解，提高代码可读性
2. 添加了文档字符串，说明函数用途
3. 使用字典映射替代多个if-elif，提高可维护性
4. 使用`dict.get()`方法处理默认情况

**改进点**：
- ✅ 代码更简洁
- ✅ 更容易添加新类型
- ✅ 类型注解提高IDE支持
- ✅ 文档字符串提高可维护性

**注意事项**：
- 保持原有功能不变
- 确保重构后代码正确
- 考虑添加测试用例

**变体建议**：
- 要求使用设计模式重构
- 询问性能优化建议
- 要求添加错误处理

## Bug修复

### 诊断和修复bug

**使用场景**：快速定位和修复代码问题

**提示词模板**：
```
以下代码有问题，请帮我诊断并修复：

[代码内容]

问题描述：
[描述问题]

请提供：
1. 问题分析
2. 修复后的代码
3. 修复说明
4. 预防类似问题的建议
```

**示例输入**：
```
以下代码有问题，请帮我诊断并修复：

```python
def calculate_average(numbers):
    total = 0
    for num in numbers:
        total += num
    return total / len(numbers)

print(calculate_average([1, 2, 3, 4, 5]))
print(calculate_average([]))
```

问题描述：
当输入空列表时，程序报错：ZeroDivisionError

请提供：
1. 问题分析
2. 修复后的代码
3. 修复说明
4. 预防类似问题的建议
```

**示例输出**：
```
1. 问题分析
   问题出在`calculate_average`函数中，当输入空列表时：
   - `len(numbers)`返回0
   - `total / 0`导致ZeroDivisionError

2. 修复后的代码
```python
def calculate_average(numbers):
    if not numbers:  # 检查空列表
        return 0  # 或返回None，根据需求

    total = sum(numbers)  # 使用内置sum函数
    return total / len(numbers)

print(calculate_average([1, 2, 3, 4, 5]))  # 输出: 3.0
print(calculate_average([]))  # 输出: 0
```

3. 修复说明
   - 添加了空列表检查
   - 使用`sum()`函数替代手动求和
   - 返回0作为空列表的平均值（可根据需求调整）

4. 预防类似问题的建议
   - 总是检查边界条件（如空列表、None值）
   - 考虑使用异常处理
   - 添加单元测试覆盖边界情况
   - 使用类型注解提高代码质量
```

**注意事项**：
- 提供完整的错误信息
- 说明代码的预期行为
- 考虑添加测试用例

**变体建议**：
- 要求添加异常处理
- 询问性能优化建议
- 要求添加日志记录

## 单元测试

### 生成测试用例

**使用场景**：为代码生成全面的测试用例

**提示词模板**：
```
请为以下代码生成单元测试：

[代码内容]

要求：
1. 使用[测试框架]
2. 覆盖正常情况
3. 覆盖边界情况
4. 覆盖异常情况
5. 包含测试数据

请提供：
1. 测试代码
2. 测试用例说明
3. 运行示例
```

**示例输入**：
```
请为以下代码生成单元测试：

```python
def calculate_discount(price, discount_rate):
    if price <= 0:
        raise ValueError("Price must be positive")
    if discount_rate < 0 or discount_rate > 1:
        raise ValueError("Discount rate must be between 0 and 1")
    return price * (1 - discount_rate)
```

要求：
1. 使用pytest框架
2. 覆盖正常情况
3. 覆盖边界情况
4. 覆盖异常情况
5. 包含测试数据

请提供：
1. 测试代码
2. 测试用例说明
3. 运行示例
```

**示例输出**：
```python
import pytest

def test_calculate_discount_normal():
    """测试正常折扣计算"""
    assert calculate_discount(100, 0.1) == 90
    assert calculate_discount(50, 0.2) == 40
    assert calculate_discount(200, 0.5) == 100

def test_calculate_discount_boundary():
    """测试边界情况"""
    # 0%折扣
    assert calculate_discount(100, 0) == 100
    # 100%折扣
    assert calculate_discount(100, 1) == 0
    # 最小价格
    assert calculate_discount(0.01, 0.5) == 0.005

def test_calculate_discount_invalid_price():
    """测试无效价格"""
    with pytest.raises(ValueError):
        calculate_discount(0, 0.1)
    with pytest.raises(ValueError):
        calculate_discount(-100, 0.1)

def test_calculate_discount_invalid_discount_rate():
    """测试无效折扣率"""
    with pytest.raises(ValueError):
        calculate_discount(100, -0.1)
    with pytest.raises(ValueError):
        calculate_discount(100, 1.5)
```

**测试用例说明**：
1. `test_calculate_discount_normal`: 测试正常折扣计算
2. `test_calculate_discount_boundary`: 测试边界情况（0%和100%折扣）
3. `test_calculate_discount_invalid_price`: 测试无效价格（0和负数）
4. `test_calculate_discount_invalid_discount_rate`: 测试无效折扣率（负数和大于1）

**运行示例**：
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

**注意事项**：
- 根据实际需求调整测试框架
- 考虑添加参数化测试
- 添加测试数据生成器

**变体建议**：
- 要求使用mock测试
- 添加性能测试
- 要求测试覆盖率报告

## 总结

编程场景提示词可以帮助你：

**核心场景**：
- ✅ 代码生成：快速生成代码实现
- ✅ 代码解释：理解复杂代码逻辑
- ✅ 代码重构：优化代码质量
- ✅ Bug修复：诊断和修复问题
- ✅ 单元测试：生成全面测试用例

**最佳实践**：
1. 提供清晰的上下文和要求
2. 指定编程语言和框架
3. 说明代码的预期行为
4. 要求详细的解释和说明
5. 验证生成的代码

**记住**：
- AI生成的代码需要审查和测试
- 根据实际需求调整提示词
- 建立自己的提示词库
- 持续优化和改进

## 下一步学习

- [写作场景提示词](./writing-prompts.md) - 学习写作场景的提示词技巧
- [分析场景提示词](./analysis-prompts.md) - 学习分析场景的提示词技巧
