# 实施计划：化学教师个人品牌与AI教学网站

## 概述

基于简化设计文档，采用Vibe Coding快速开发模式，预计10小时开发时间，1-2天上线。核心原则：YAGNI、AI Friendly Architecture、MVP优先。

---

## 任务清单

### 阶段一：环境搭建与项目初始化（约1.5小时）

- [x] 1. 初始化Next.js项目并安装依赖
  - 使用create-next-app创建项目，启用TypeScript、Tailwind CSS、App Router
  - 安装react-markdown、remark-math、rehype-katex、gray-matter、katex
  - 配置tailwind.config.ts和next.config.js
  - _Requirements: 15.1, 15.4_

- [x] 1.1 创建目录结构和基础配置文件
  - 创建content/articles、content/profile.json、content/resources.json
  - 创建public/images、public/files/pdf、public/files/ppt目录
  - 创建lib/content.ts内容加载工具
  - _Requirements: 11.5, 11.6_

---

### 阶段二：内容准备（约1小时）

- [x] 2. 创建示例内容文件
  - 创建content/profile.json（教师信息：姓名、照片、简介、教学理念、联系方式）
  - 创建content/resources.json（资源列表：PDF、PPT元数据）
  - 创建2-3篇示例博客文章（content/articles/*.md）
  - _Requirements: 2.1, 2.2, 3.1, 3.4, 6.1_

- [x] 2.1 实现内容加载工具lib/content.ts
  - 实现getProfile()获取教师信息
  - 实现getResources()获取资源列表
  - 实现getArticles()获取所有文章
  - 实现getArticle(slug)获取单篇文章
  - _Requirements: 11.6_

---

### 阶段三：布局与导航（约1.5小时）

- [x] 3. 实现全局布局和导航系统
  - 创建app/layout.tsx（SEO元数据、全局样式）
  - 实现响应式导航菜单（桌面水平导航、移动端汉堡菜单）
  - 实现页脚组件
  - 实现汉堡菜单点击外部区域自动收起
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 9.1, 9.2, 9.7_

- [x] 3.1 创建全局样式文件app/globals.css
  - 配置Tailwind基础样式
  - 引入KaTeX CSS
  - 配置prose样式（文章排版）
  - _Requirements: 8.1, 12.4_

---

### 阶段四：页面开发（约4小时）

- [x] 4. 实现首页
  - 教师介绍区域（照片、姓名、简介）
  - 教学理念展示
  - 课程方向卡片（高一/高二/高三化学）
  - 精选内容展示（最近3篇文章或资源）
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [x] 5. 实现关于我页面
  - 教育背景展示
  - 教学经历时间线
  - 奖项和资格证书
  - 联系方式（邮箱、微信二维码、社交媒体链接）
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [x] 6. 实现博客系统
  - [x] 6.1 实现博客列表页
    - 文章列表展示（标题、日期、分类、摘要）
    - 文章卡片点击跳转详情
    - 按时间倒序排列
    - _Requirements: 5.1, 5.2, 5.5_

  - [x] 6.2 实现博客详情页
    - 文章内容渲染（使用ReactMarkdown + remark-math + rehype-katex）
    - 支持H1-H3标题、段落、代码块、图片、化学公式
    - 文章元信息展示（日期、分类）
    - _Requirements: 5.3, 17.1, 17.2, 17.3, 17.4_

- [x] 7. 实现课程资源页面
  - 课程分类展示（高一/高二/高三化学）
  - 各分类内容项列表
  - 内容项展示（标题、描述、类型）
  - 空状态提示
  - _Requirements: 4.1, 4.2, 4.3, 4.5, 4.6_

- [x] 8. 实现资源中心页面
  - 资源文件列表（PDF、PPT）
  - 资源信息展示（标题、描述、类型、大小）
  - 下载按钮
  - 分类和类型分组展示
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 9. 实现联系方式页面
  - 微信二维码展示（带加载失败替代文本）
  - 邮箱mailto链接
  - 社交媒体链接
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

---

### 阶段五：SEO优化（约1小时）

- [x] 10. 实现SEO优化
  - [x] 10.1 配置页面元数据
    - 每个页面设置唯一meta标题和描述
    - 实现Open Graph标签
    - 配置规范URL
    - _Requirements: 9.1, 9.2, 9.3, 9.8_

  - [x] 10.2 实现sitemap和结构化数据
    - 创建app/sitemap.ts生成sitemap.xml
    - 关于我页面添加Person模式JSON-LD
    - 博客文章页面添加Article模式JSON-LD
    - _Requirements: 9.4, 9.6_

---

### 阶段六：错误处理与无障碍（约0.5小时）

- [x] 11. 实现错误处理和无障碍访问
  - 创建app/not-found.tsx自定义404页面
  - 创建app/error.tsx自定义错误页面
  - 为图片添加alt属性
  - 确保焦点指示器可见
  - 检查颜色对比度
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 16.1, 16.2_

---

### 阶段七：部署与文档（约1小时）

- [x] 12. 准备部署
  - 创建.env.local.example环境变量示例文件
  - 验证Vercel部署配置
  - 执行npm run build确保构建成功
  - _Requirements: 15.1, 15.4_

- [x] 13. 创建项目文档
  - [x] 13.1 编写README.md
    - 项目介绍和快速开始
    - 内容更新指南（发布新文章、修改个人信息、添加资源文件）
    - 部署指南
    - _Requirements: 15.5_

  - [x] 13.2 创建内容格式指南
    - Markdown文章格式规范
    - 化学公式写法示例（LaTeX/KaTeX）
    - _Requirements: 17.5_

---

### 阶段八：检查点与验证

- [x] 14. 检查点 - 功能验证
  - 所有页面正常访问
  - 导航菜单响应式正常
  - 文章列表和详情页正常
  - 资源下载功能正常
  - 图片懒加载正常

- [x] 15. 检查点 - 性能验证
  - 运行Lighthouse检查（性能评分≥90）
  - 验证Core Web Vitals（LCP < 2.5秒, FID < 100毫秒, CLS < 0.1）
  - 检查图片优化和代码分割
  - _Requirements: 2.8, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

- [x] 16. 最终检查点 - 部署就绪
  - 构建成功无错误
  - 所有测试页面正常
  - 准备部署到Vercel

---

## 任务依赖图

```json
{
  "waves": [
    { "id": 0, "tasks": ["1", "1.1"] },
    { "id": 1, "tasks": ["2", "2.1"] },
    { "id": 2, "tasks": ["3", "3.1"] },
    { "id": 3, "tasks": ["4", "5"] },
    { "id": 4, "tasks": ["6.1", "7", "8", "9"] },
    { "id": 5, "tasks": ["6.2", "10.1"] },
    { "id": 6, "tasks": ["10.2", "11"] },
    { "id": 7, "tasks": ["12", "13.1", "13.2"] },
    { "id": 8, "tasks": ["14"] },
    { "id": 9, "tasks": ["15"] },
    { "id": 10, "tasks": ["16"] }
  ]
}
```

---

## 开发时间估算

| 阶段 | 任务 | 预计时间 |
|------|------|----------|
| 阶段一 | 环境搭建 | 1.5小时 |
| 阶段二 | 内容准备 | 1小时 |
| 阶段三 | 布局与导航 | 1.5小时 |
| 阶段四 | 页面开发 | 4小时 |
| 阶段五 | SEO优化 | 1小时 |
| 阶段六 | 错误处理与无障碍 | 0.5小时 |
| 阶段七 | 部署与文档 | 1小时 |
| 阶段八 | 检查点验证 | 0.5小时（可并行） |
| **总计** | | **约10小时** |

---

## 备注

- 任务按依赖关系排列，Wave N的任务依赖Wave 0..N-1的完成
- 页面开发阶段（阶段四）采用直接编写JSX的方式，不封装组件
- V1版本不实现：搜索功能、分类筛选、API路由、CMS后台
- 教师内容更新通过编辑Markdown和JSON文件，Git提交后自动部署
