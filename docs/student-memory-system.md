# 学生记忆系统方案（Cloudflare KV）

## 功能概述

为 AI 化学助教添加学生身份识别和行为记录能力，实现：
- 学生输入姓名/学号即可使用
- 对话历史持久化保存（跨设备）
- 张老师可查看全班使用数据
- 热门问题统计、使用频次分析

---

## 技术方案

### 存储：Cloudflare KV（免费层）
- 每天 10 万次读写，40 个学生绰绰有余
- Key-Value 存储，不需要 SQL
- 和 Cloudflare Pages 在同一平台，直接集成

### 后端：Cloudflare Pages Functions
- 在项目 `functions/` 目录下写 API 路由
- 自动部署，不需要额外服务器
- 路径 `/api/xxx` 自动映射

### 前端：现有 Next.js 项目

---

## 数据结构设计

### KV 键值设计

```
# 学生信息
student:{studentId}:profile → { name, class, createdAt }

# 学生对话历史（最近 50 条）
student:{studentId}:history → [{ role, content, timestamp }]

# 学生统计
student:{studentId}:stats → { 
  totalQuestions, 
  lastActiveAt, 
  thumbsUp, 
  thumbsDown,
  topTopics: ["氧化还原", "化学平衡", ...]
}

# 全局统计
global:stats → { 
  totalQuestions, 
  totalStudents, 
  dailyActive: { "2026-07-15": 12, ... }
}

# 热门问题
global:hot-questions → [{ question, count, topic }]

# 学生名单
global:student-list → [{ id, name, class }]
```

---

## 页面设计

### 1. 学生登录页（首次使用）
- 路由：`/ai-tutor` 首次打开时弹出
- 输入：姓名 + 学号（或班级+姓名）
- 存入 localStorage + KV
- 之后自动识别（localStorage 记住 studentId）

### 2. AI 对话页（现有，增强）
- 对话记录同步到 KV（每次发消息时）
- 满意度反馈同步到 KV
- 显示历史对话（从 KV 加载）

### 3. 老师后台页
- 路由：`/admin`（简单密码保护）
- 功能：
  - 查看学生名单和使用次数
  - 查看热门问题排行
  - 查看使用时段分布图
  - 导出数据为 CSV（论文用）

---

## API 设计

### POST /api/student/login
```json
// 请求
{ "name": "张三", "studentId": "2025001" }
// 响应
{ "success": true, "studentId": "2025001" }
```

### POST /api/chat/log
```json
// 请求
{ "studentId": "2025001", "messages": [...], "feedback": "up" }
// 响应
{ "success": true }
```

### GET /api/admin/stats
```json
// 响应
{
  "totalStudents": 38,
  "totalQuestions": 520,
  "dailyActive": { "2026-07-15": 12, "2026-07-16": 15 },
  "hotQuestions": [
    { "topic": "氧化还原", "count": 45 },
    { "topic": "化学平衡", "count": 38 }
  ]
}
```

### GET /api/admin/students
```json
// 响应
[
  { "name": "张三", "totalQuestions": 25, "lastActive": "2026-07-15" },
  { "name": "李四", "totalQuestions": 18, "lastActive": "2026-07-14" }
]
```

---

## 开发步骤

1. **Cloudflare KV 创建** — 在 Cloudflare 面板创建 KV namespace
2. **Pages Functions 配置** — 创建 `functions/api/` 目录
3. **学生登录组件** — 首次使用弹出输入框
4. **对话日志上报** — 每次对话结束写 KV
5. **满意度反馈** — 👍👎 按钮 + 写 KV
6. **老师后台页** — `/admin` 展示统计数据
7. **数据导出** — CSV 下载按钮

预计开发时间：1 天

---

## 注意事项

- 需要把 `next.config.js` 的 `output: 'export'` 去掉（Pages Functions 不支持纯静态）
- 或者改用 Cloudflare Workers 单独做 API，前端保持静态
- 隐私：不收集敏感信息，只记录姓名+对话内容+时间
- 密码保护 admin 页面（环境变量存密码）

---

## 与论文的关系

这个系统提供的数据直接用于论文第 4 章"结果与分析"：
- 使用频次 → 图 4.1 日活跃用户趋势
- 热门问题 → 表 4.2 高频知识点统计
- 满意度 → 图 4.3 AI 回答满意度分布
- 学生对比 → 表 4.4 高频使用者 vs 低频使用者成绩对比
