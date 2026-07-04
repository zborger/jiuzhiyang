# 内容格式指南

本文档为化学教师网站的内容作者提供文章编写和化学公式格式化指南，帮助您创建格式规范、渲染正确的教学内容。

---

## 目录

1. [Markdown文章格式规范](#markdown文章格式规范)
2. [化学公式写法示例](#化学公式写法示例)
3. [最佳实践](#最佳实践)
4. [常见问题](#常见问题)

---

## Markdown文章格式规范

### 文章文件结构

每篇文章由两部分组成：**YAML Frontmatter（元信息）** 和 **Markdown正文内容**。

```markdown
---
title: 文章标题
date: 2024-01-15
category: 教学心得
tags: [标签1, 标签2, 高一化学]
---

# 文章标题

正文内容从这里开始...
```

### YAML Frontmatter 字段说明

| 字段 | 必填 | 类型 | 说明 |
|------|------|------|------|
| `title` | 是 | 字符串 | 文章标题，最多100字符 |
| `date` | 是 | 日期 | 发布日期，格式：YYYY-MM-DD |
| `category` | 是 | 字符串 | 文章分类，见下方分类列表 |
| `tags` | 否 | 数组 | 文章标签，便于分类检索 |

#### 文章分类（category）

请从以下分类中选择一个：

- `教学心得` - 教学方法、课堂经验分享
- `考试分析` - 高考、期中/期末考试分析
- `学习方法` - 学习技巧、备考策略
- `实验知识` - 化学实验原理、操作方法

#### 标签（tags）使用建议

- 建议每篇文章使用 2-5 个标签
- 标签应具体，便于检索
- 推荐使用年级标签：`高一化学`、`高二化学`、`高三化学`
- 可使用知识点标签：`氧化还原`、`有机化学`、`化学平衡` 等

### Markdown 正文格式

#### 标题层级

```markdown
# 一级标题（文章标题，每篇仅一个）

## 二级标题（主要章节）

### 三级标题（子章节）
```

**注意**：
- 每篇文章应只有一个一级标题（H1），通常与 frontmatter 中的 title 一致
- 标题层级应按顺序使用，不要跳过层级（如从 H1 直接跳到 H3）
- 标题应简洁明了，便于读者快速定位

#### 段落与换行

```markdown
这是第一段内容。

这是第二段内容。

段落内换行使用两个空格加回车：  
这是同一段落内的换行。
```

#### 文本强调

```markdown
**粗体文本** 用于强调重要概念

*斜体文本* 用于术语或特殊含义

~~删除线~~ 表示已废弃或不再使用的内容
```

#### 列表

**无序列表**：
```markdown
- 列表项一
- 列表项二
  - 子列表项
  - 子列表项
- 列表项三
```

**有序列表**：
```markdown
1. 第一步
2. 第二步
3. 第三步
```

**任务列表**：
```markdown
- [x] 已完成项
- [ ] 未完成项
```

#### 引用块

```markdown
> 升失氧，降得还；
> 若问剂，两相反。
> 
> — 记忆口诀
```

#### 链接与图片

**链接**：
```markdown
[链接文本](https://example.com)

[站内链接](/blog/other-article)
```

**图片**：
```markdown
![图片替代文本](/images/example.png)

![带标题的图片](/images/example.png "图片标题")
```

**注意**：所有图片应提供有意义的替代文本（alt），描述图片内容，便于无障碍访问。

#### 代码块

**行内代码**：
```markdown
化学式如 `H₂O` 可以使用行内代码标记。
```

**代码块**：
````markdown
```python
# 示例代码
def calculate_molar_mass(formula):
    return sum(atomic_mass[element] * count for element, count in formula.items())
```
````

#### 表格

```markdown
| 元素 | 符号 | 原子序数 |
|------|------|----------|
| 氢   | H    | 1        |
| 氧   | O    | 8        |
| 碳   | C    | 6        |
```

#### 分隔线

```markdown
---

以上内容与以下内容用分隔线分开。

---
```

---

## 化学公式写法示例

本站使用 **KaTeX** 渲染数学和化学公式。KaTeX 是 LaTeX 数学排版的快速实现，支持大多数常用的数学符号和结构。

### 公式语法基础

- **行内公式**：使用单个美元符号 `$公式$`
- **块级公式**：使用双美元符号 `$$公式$$`

```markdown
行内公式示例：水的分子式 $H_2O$ 在文中显示。

块级公式示例：
$$
\text{2H}_2 + \text{O}_2 \xrightarrow{\text{点燃}} \text{2H}_2\text{O}
$$
```

### 化学式写法

#### 基本化学式

使用 `\text{}` 包裹化学元素符号，下标使用 `_` 符号：

| 化学式 | 代码 | 效果 |
|--------|------|------|
| 水 | `$\text{H}_2\text{O}$` | $\text{H}_2\text{O}$ |
| 二氧化碳 | `$\text{CO}_2$` | $\text{CO}_2$ |
| 硫酸 | `$\text{H}_2\text{SO}_4$` | $\text{H}_2\text{SO}_4$ |
| 氢氧化钠 | `$\text{NaOH}$` | $\text{NaOH}$ |

#### 多原子团化学式

使用 `{}` 包裹需要组合的部分：

```markdown
氢氧化钙：$\text{Ca(OH)}_2$
碳酸钠：$\text{Na}_2\text{CO}_3$
硫酸铝：$\text{Al}_2(\text{SO}_4)_3$
```

渲染效果：
- 氢氧化钙：$\text{Ca(OH)}_2$
- 碳酸钠：$\text{Na}_2\text{CO}_3$
- 硫酸铝：$\text{Al}_2(\text{SO}_4)_3$

#### 上标与电荷

使用 `^` 表示上标，常用于离子电荷：

| 离子 | 代码 | 效果 |
|------|------|------|
| 钠离子 | `$\text{Na}^+$` | $\text{Na}^+$ |
| 氯离子 | `$\text{Cl}^-$` | $\text{Cl}^-$ |
| 钙离子 | `$\text{Ca}^{2+}$` | $\text{Ca}^{2+}$ |
| 硫酸根离子 | `$\text{SO}_4^{2-}$` | $\text{SO}_4^{2-}$ |
| 铵根离子 | `$\text{NH}_4^+$` | $\text{NH}_4^+$ |

### 化学方程式

#### 反应箭头

KaTeX 支持多种反应箭头：

| 箭头类型 | 代码 | 效果 |
|----------|------|------|
| 正反应箭头 | `$\rightarrow$` | $\rightarrow$ |
| 可逆反应 | `$\rightleftharpoons$` | $\rightleftharpoons$ |
| 双向箭头 | `$\leftrightarrow$` | $\leftrightarrow$ |
| 反应箭头（带文字） | `$\xrightarrow{\text{条件}}$` | $\xrightarrow{\text{条件}}$ |

#### 完整方程式示例

**示例 1：氢气燃烧**

```markdown
$$
\text{2H}_2 + \text{O}_2 \xrightarrow{\text{点燃}} \text{2H}_2\text{O}
$$
```

渲染效果：
$$
\text{2H}_2 + \text{O}_2 \xrightarrow{\text{点燃}} \text{2H}_2\text{O}
$$

**示例 2：铁与稀盐酸反应**

```markdown
$$
\text{Fe} + \text{2HCl} = \text{FeCl}_2 + \text{H}_2\uparrow
$$
```

渲染效果：
$$
\text{Fe} + \text{2HCl} = \text{FeCl}_2 + \text{H}_2\uparrow
$$

**示例 3：可逆反应（合成氨）**

```markdown
$$
\text{N}_2 + \text{3H}_2 \xrightarrow{\text{高温高压, 催化剂}} \text{2NH}_3
$$
```

渲染效果：
$$
\text{N}_2 + \text{3H}_2 \xrightarrow{\text{高温高压, 催化剂}} \text{2NH}_3
$$

**示例 4：沉淀反应**

```markdown
$$
\text{AgNO}_3 + \text{NaCl} = \text{AgCl}\downarrow + \text{NaNO}_3
$$
```

渲染效果：
$$
\text{AgNO}_3 + \text{NaCl} = \text{AgCl}\downarrow + \text{NaNO}_3
$$

#### 离子方程式

```markdown
$$
\text{Cu}^{2+} + \text{2OH}^- = \text{Cu(OH)}_2\downarrow
$$
```

渲染效果：
$$
\text{Cu}^{2+} + \text{2OH}^- = \text{Cu(OH)}_2\downarrow
$$

### 氧化还原反应标注

#### 电子转移标注

```markdown
$$
\overset{\text{失去2e}^-}{\ce{2Na}} + \overset{\text{得到2e}^-}{\ce{Cl2}} = \text{2NaCl}
$$
```

**注意**：如果使用 `\ce` 宏需要 mhchem 扩展，本站建议使用 `\text` 方式：

```markdown
$$
\underset{\text{失去2e}^-}{\text{2Na}} + \underset{\text{得到2e}^-}{\text{Cl}_2} = \text{2NaCl}
$$
```

渲染效果：
$$
\underset{\text{失去2e}^-}{\text{2Na}} + \underset{\text{得到2e}^-}{\text{Cl}_2} = \text{2NaCl}
$$

#### 化合价标注

```markdown
$$
\overset{+1}{\text{Na}}_2\overset{-2}{\text{O}}
$$
```

渲染效果：
$$
\overset{+1}{\text{Na}}_2\overset{-2}{\text{O}}
$$

### 数学公式

化学计算中常用的数学公式写法：

#### 分数

```markdown
$$
\frac{m}{M} = n
$$
```

渲染效果：
$$
\frac{m}{M} = n
$$

#### 根号

```markdown
$$
c = \sqrt{a^2 + b^2}
$$
```

渲染效果：
$$
c = \sqrt{a^2 + b^2}
$$

#### 求和与积分

```markdown
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$
```

渲染效果：
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

#### 希腊字母

| 符号 | 代码 | 效果 |
|------|------|------|
| Alpha | `$\alpha$` | $\alpha$ |
| Beta | `$\beta$` | $\beta$ |
| Gamma | `$\gamma$` | $\gamma$ |
| Delta | `$\Delta$` (大写) | $\Delta$ |
| Lambda | `$\lambda$` | $\lambda$ |
| Pi | `$\pi$` | $\pi$ |

---

## 最佳实践

### 1. 化学式书写原则

- **始终使用 `\text{}`** 包裹化学元素符号，确保正确显示为正体
- **下标和上标** 使用 `_` 和 `^`，多字符内容用 `{}` 包裹
- **系数放在 `\text{}` 外部**，如 `\text{2H}_2\text{O}` 而非 `\text{2H2O}`

### 2. 方程式对齐

对于多个方程式，可以使用 `aligned` 环境：

```markdown
$$
\begin{aligned}
\text{2H}_2 + \text{O}_2 &= \text{2H}_2\text{O} \\
\text{C} + \text{O}_2 &= \text{CO}_2 \\
\text{S} + \text{O}_2 &= \text{SO}_2
\end{aligned}
$$
```

渲染效果：
$$
\begin{aligned}
\text{2H}_2 + \text{O}_2 &= \text{2H}_2\text{O} \\
\text{C} + \text{O}_2 &= \text{CO}_2 \\
\text{S} + \text{O}_2 &= \text{SO}_2
\end{aligned}
$$

### 3. 条件标注

反应条件使用 `\xrightarrow{}` 或 `\xleftarrow{}`：

```markdown
$$
\text{CaCO}_3 \xrightarrow{\text{高温}} \text{CaO} + \text{CO}_2\uparrow
$$
```

渲染效果：
$$
\text{CaCO}_3 \xrightarrow{\text{高温}} \text{CaO} + \text{CO}_2\uparrow
$$

### 4. 特殊符号

| 符号 | 代码 | 用途 |
|------|------|------|
| ↑ | `$\uparrow$` | 气体生成 |
| ↓ | `$\downarrow$` | 沉淀生成 |
| Δ | `$\Delta$` | 加热条件 |
| ∘ | `$^\circ$` | 标准状态 |
| → | `$\rightarrow$` | 反应方向 |
| ⇌ | `$\rightleftharpoons$` | 可逆反应 |

### 5. 文章结构建议

```markdown
---
title: 文章标题
date: 2024-01-15
category: 教学心得
tags: [氧化还原, 高一化学]
---

# 文章标题

简短的文章引言，说明本文将讨论的内容。

## 概述

介绍基本概念和背景。

## 正文

### 小节标题

详细讲解...

### 另一个小节

继续讲解...

## 总结

总结要点，给出学习建议。
```

---

## 常见问题

### Q1: 为什么我的化学式显示为斜体？

**问题**：输入 `$H_2O$` 显示为斜体。

**解决**：使用 `\text{}` 包裹元素符号：`$\text{H}_2\text{O}$`

### Q2: 如何输入上下标同时存在的内容？

**问题**：想输入带有上标和下标的化学式。

**解决**：使用 `_` 和 `^` 分别表示，如 `$\text{SO}_4^{2-}$`

### Q3: 公式太长怎么办？

**问题**：复杂方程式在行内显示时被截断。

**解决**：使用块级公式 `$$...$$` 让公式单独成行。

### Q4: 如何输入条件在箭头上方和下方？

**解决**：使用 `\xrightarrow[\text{下方}]{\text{上方}}`：

```markdown
$$
\text{N}_2 + \text{3H}_2 \xrightarrow[\text{催化剂}]{\text{高温高压}} \text{2NH}_3
$$
```

渲染效果：
$$
\text{N}_2 + \text{3H}_2 \xrightarrow[\text{催化剂}]{\text{高温高压}} \text{2NH}_3
$$

### Q5: 为什么我的公式渲染不正确？

常见原因：
1. **缺少 `$` 符号**：确保公式用 `$...$` 或 `$$...$$` 包裹
2. **特殊字符未转义**：LaTeX 特殊字符如 `_` `^` `{` `}` 需要正确使用
3. **拼写错误**：检查 LaTeX 命令拼写是否正确

### Q6: 简单化学式可以用 HTML 标签吗？

可以！对于简单的下标和上标，可以使用 HTML 标签：

```markdown
水的分子式：H<sub>2</sub>O

钠离子：Na<sup>+</sup>
```

渲染效果：
- 水的分子式：H<sub>2</sub>O
- 钠离子：Na<sup>+</sup>

**建议**：简单化学式可用 HTML，复杂方程式推荐使用 KaTeX。

---

## 参考资源

- [KaTeX 官方文档](https://katex.org/docs/supported.html)
- [LaTeX 数学符号大全](https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols)
- [Markdown 语法指南](https://www.markdownguide.org/basic-syntax/)

---

**文档版本:** 1.0  
**最后更新:** 2024-02-01
