# 张老师化学课堂 — 网站运维与迭代指南

## 一、项目概览

| 项目 | 信息 |
|------|------|
| 网站地址 | https://jiuzhiyang-web.pages.dev |
| 备用地址 | https://jiuzhiyang-web.vercel.app（需梯子） |
| 代码仓库 | https://github.com/zborger/jiuzhiyang-web |
| 技术栈 | Next.js 14 + Tailwind CSS + Markdown |
| 部署平台 | Cloudflare Pages（自动部署） |
| 内容格式 | JSON + Markdown（无数据库） |

---

## 二、快速更新内容（给张老师或非技术人员）

### 方式 1：Vibe Coding（推荐）

在 Kiro/Cursor 中用自然语言操作：
- "帮我加一篇关于电解质的文章"
- "把我的邮箱改成 xxx@163.com"
- "添加一个高三化学的PPT资源"

AI 会自动修改对应文件，然后推送部署。

### 方式 2：直接编辑文件

#### 修改个人信息
编辑 `content/profile.json`：
```json
{
  "name": "张老师的真实姓名",
  "photo": "/images/teacher-photo.jpg",  // 把照片放到 public/images/ 下
  "bio": "个人简介",
  "email": "真实邮箱",
  "wechatQR": "/images/wechat-qr.png",  // 微信二维码图片
  ...
}
```

#### 发布新文章
在 `content/articles/` 下创建 `.md` 文件：
```markdown
---
title: 文章标题
date: 2024-07-06
category: 高一化学
tags: [氧化还原, 化学方程式]
---

文章正文内容...

化学公式用 KaTeX 语法：$H_2O$, $2H_2 + O_2 \rightarrow 2H_2O$
```

#### 添加资源文件
1. 把 PDF/PPT 放到 `public/files/pdf/` 或 `public/files/ppt/`
2. 编辑 `content/resources.json` 添加记录

### 方式 3：GitHub 网页编辑
直接在 https://github.com/zborger/jiuzhiyang-web 上编辑文件，保存即自动部署。

---

## 三、部署流程（自动）

```
编辑代码 → git push → GitHub 仓库更新 → Cloudflare 自动拉取 → 构建 → 上线
```

整个过程约 1-2 分钟，无需手动操作。

---

## 四、个人信息定制化清单

张老师需要提供以下材料来完善网站：

### 必须提供
- [ ] 个人照片（正面照，建议 400x400 以上）
- [ ] 真实姓名
- [ ] 个人简介（2-3句话）
- [ ] 教学理念（1段话）
- [ ] 邮箱地址
- [ ] 微信二维码图片

### 建议提供
- [ ] 教育背景（学校、学位、年份）
- [ ] 教学经历（时间段、学校、职位）
- [ ] 获奖情况
- [ ] 社交媒体链接（B站/微博等）
- [ ] 教学资源文件（PDF/PPT）

### 操作方法
收到材料后：
1. 照片和二维码放到 `public/images/` 目录
2. 修改 `content/profile.json` 中对应字段
3. `git push` 自动部署

---

## 五、后续迭代开发路线图

### Phase 1: MVP 上线 ✅（已完成）
- [x] 首页、关于、博客、课程、资源、联系页面
- [x] 导航栏和页脚
- [x] Cloudflare Pages 部署
- [x] 微信域名验证

### Phase 2: 内容完善（1-2天）
- [ ] 替换占位数据为张老师真实信息
- [ ] 上传 2-3 个真实教学资源
- [ ] 发布 2-3 篇真实教学文章
- [ ] 添加网站 favicon 图标

### Phase 3: AI 化学答疑功能（2-3天）⭐ 论文核心
- [ ] 集成大模型 API（通义千问/OpenAI）
- [ ] 创建 /ai-tutor 页面
- [ ] 学生输入化学问题 → AI 回答
- [ ] 限制回答范围为高中化学
- [ ] 记录问答历史（本地存储）

### Phase 4: 数据收集与分析（1天）
- [ ] 添加页面访问统计
- [ ] 记录 AI 问答频次和热门问题
- [ ] 生成使用数据报表

### Phase 5: 在线测验（2天）
- [ ] 创建化学选择题测验
- [ ] 自动判分 + 答案解析
- [ ] 错题记录

---

## 六、论文产出方案

### 论文标题建议
《基于大语言模型的高中化学智能教学平台设计与实践研究》

### 论文结构

#### 1. 引言（背景）
- 教育数字化转型政策背景（教育部文件）
- AI+教育研究现状
- 高中化学教学痛点

#### 2. 平台设计
- 系统架构图（Next.js + AI API + 静态部署）
- 功能模块说明（个人展示、资源共享、AI答疑、在线测验）
- 技术选型理由

#### 3. AI 答疑模块设计
- 大模型选型与 Prompt 工程
- 化学知识边界限制
- 安全性保障措施

#### 4. 教学实践
- 实验设计（对照组 vs 实验组）
- 使用周期（建议 4-8 周）
- 数据收集方法
  - 问卷调查：学生满意度
  - 测验成绩：前后对比
  - 平台数据：使用频次、热门问题

#### 5. 结果与分析
- 学生学习兴趣提升数据
- AI 答疑使用情况统计
- 测验成绩对比分析

#### 6. 结论与展望
- 成果总结
- 不足与改进方向
- 推广建议

### 论文可投期刊
- 《化学教育》
- 《中学化学教学参考》
- 《中国教育信息化》
- 《教育技术研究》

### 时间规划
| 阶段 | 时间 | 内容 |
|------|------|------|
| 平台开发 | 第 1-2 周 | 完善网站 + AI 功能 |
| 教学实验 | 第 3-10 周 | 让学生使用，收集数据 |
| 数据分析 | 第 11 周 | 整理数据、做图表 |
| 论文撰写 | 第 12-14 周 | 写论文 |
| 投稿修改 | 第 15+ 周 | 投稿、根据审稿意见修改 |

---

## 七、常见问题

### Q: 修改了代码怎么更新网站？
```bash
git add -A
git commit -m "描述修改内容"
git push origin main
git push cloudflare main
```
等 1-2 分钟自动更新。

### Q: 微信里打不开网站？
需要通过微信域名验证，验证文件已部署（d337fea3dc697a16f02c0768fd2e2212.txt）。

### Q: 想换域名怎么办？
在 Cloudflare Pages 项目的 "Custom domains" 里添加自己买的域名。

### Q: 网站打开慢怎么办？
Cloudflare 有全球 CDN，正常情况下国内访问速度可接受。如果太慢可以考虑绑国内域名或迁移到国内服务器。

---

## 八、项目文件结构

```
jiuzhiyang/
├── app/                    # 页面组件
│   ├── page.tsx           # 首页
│   ├── about/page.tsx     # 关于
│   ├── blog/page.tsx      # 博客列表
│   ├── blog/[slug]/page.tsx # 博客详情
│   ├── courses/page.tsx   # 课程资源
│   ├── resources/page.tsx # 资料中心
│   ├── contact/page.tsx   # 联系方式
│   ├── components/        # 公共组件（导航栏、页脚）
│   └── layout.tsx         # 全局布局
├── content/               # 内容数据（修改这里更新内容）
│   ├── profile.json       # 教师个人信息
│   ├── resources.json     # 资源列表
│   └── articles/          # 博客文章（Markdown）
├── public/                # 静态文件
│   ├── images/            # 图片（照片、二维码等）
│   └── files/             # 下载文件（PDF、PPT）
├── lib/content.ts         # 内容读取工具
└── docs/guide.md          # 本文档
```
