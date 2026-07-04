# 技术设计文档（优化版）

## 设计理念

### 问题分析

当前设计存在的问题：
1. **过度抽象**：ContentLoader类为"未来CMS迁移"预留接口，但教师一年内可能只需要直接编辑Markdown文件
2. **组件颗粒度过细**：Button、Card等基础组件封装，增加了理解和维护成本
3. **API路由预留**：创建了三个AI接口占位（501状态），但这些功能可能永远不会实现
4. **YAML配置文件**：课程分类用YAML存储，增加了学习成本，教师可能更习惯直接编辑页面
5. **复杂的类型系统**：定义了大量接口，但实际使用场景很少

### 优化原则

**YAGNI（You Aren't Gonna Need It）原则**：
- 只实现当前需求，不为"可能的未来"预留代码
- 抽象层应该在有第二次使用场景时再引入，而不是提前创建

**AI Friendly Architecture原则**：
- 文件结构扁平化，减少嵌套层级
- 避免过度封装，代码直接写在需要的地方
- 使用简单的数据结构（JSON优于复杂类型）
- 文件命名清晰，一眼就能看出用途

**MVP优先原则**：
- 快速上线：从开发到部署在1-2天内完成
- 易于维护：教师本人能进行基础的内容更新
- 渐进增强：需要新功能时再添加，而不是提前预留

---

## 简化后的架构

### 核心理念：直接编辑 + 静态生成

```
教师编辑Markdown文件
        ↓
Next.js构建时读取
        ↓
生成静态HTML页面
        ↓
部署到Vercel或静态托管
        ↓
用户访问（快速加载）
```

**关键简化**：
- 不需要数据库，不需要CMS
- 内容更新 = 编辑Markdown + 重新部署
- 部署流程：Git提交 → 自动构建 → 上线

### 目录结构（扁平化）

```
chemistry-teacher-website/
├── app/                      # Next.js App Router页面
│   ├── layout.tsx           # 全局布局（包含导航和页脚）
│   ├── page.tsx             # 首页
│   ├── about/
│   │   └── page.tsx         # 关于我
│   ├── blog/
│   │   ├── page.tsx         # 文章列表
│   │   └── [slug]/
│   │       └── page.tsx     # 文章详情（动态路由）
│   ├── courses/
│   │   └── page.tsx         # 课程资源（单页面，分区域展示）
│   ├── resources/
│   │   └── page.tsx         # 资源中心
│   └── contact/
│       └── page.tsx         # 联系方式
│
├── content/                  # 内容文件（直接编辑）
│   ├── profile.json         # 教师简介（姓名、照片、理念等）
│   ├── articles/            # 博客文章
│   │   ├── h2o-structure.md
│   │   └── exam-tips-2024.md
│   └── resources.json       # 资源列表（PDF、PPT等元数据）
│
├── public/                   # 静态资源
│   ├── images/
│   │   ├── profile.jpg      # 教师照片
│   │   └── wechat-qr.png     # 微信二维码
│   └── files/                # 可下载文件
│       ├── pdf/
│       └── ppt/
│
├── lib/                      # 工具函数（最小化）
│   └── content.ts           # 内容加载（单个文件，不拆分）
│
├── next.config.js           # Next.js配置
├── tailwind.config.ts       # Tailwind配置
└── README.md                # 项目说明（包含内容更新指南）
```

**删除的内容**：
- `/components/` 目录 → 直接在页面组件中写JSX，需要复用时再提取
- `/types/` 目录 → 使用简单的接口定义，直接写在文件中
- `/api/` 目录 → V1不需要API路由，未来需要时再添加
- `/content/courses/`、`/content/about/` → 直接硬编码在页面中
- `/scripts/` 目录 → 不需要迁移脚本
- `/docs/` 目录 → 文档写在README中

### 数据模型（极简）

#### profile.json（教师信息）

```json
{
  "name": "教师姓名",
  "photo": "/images/profile.jpg",
  "bio": "高中化学教师，专注化学教育10年...",
  "philosophy": "让化学变得简单有趣...",
  "email": "teacher@example.com",
  "wechatQR": "/images/wechat-qr.png",
  "socialLinks": [
    { "name": "微博", "url": "https://weibo.com/..." },
    { "name": "B站", "url": "https://bilibili.com/..." }
  ]
}
```

#### 文章Markdown格式

```markdown
---
title: 水分子的结构
date: 2024-01-15
category: 实验知识
tags: [分子结构, 氢键, 高一化学]
---

# 水分子的结构

水分子（H₂O）是最常见的化合物之一...

## 水分子的V型结构

氧原子采用sp³杂化...
```

#### resources.json（资源列表）

```json
{
  "pdfFiles": [
    {
      "title": "高一化学知识点总结",
      "description": "必修一核心概念汇总",
      "file": "/files/pdf/chem-basics.pdf",
      "size": "2MB"
    }
  ],
  "pptFiles": [
    {
      "title": "氧化还原反应PPT",
      "description": "详细讲解氧化还原概念",
      "file": "/files/ppt/redox.pptx",
      "size": "5MB"
    }
  ]
}
```

---

## 页面设计（直接编写，不封装）

### 首页（app/page.tsx）

```typescript
import { profile } from '@/lib/content';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* 教师介绍 */}
      <section className="flex flex-col md:flex-row items-center gap-8 mb-16">
        <Image
          src={profile.photo}
          alt={profile.name}
          width={200}
          height={200}
          className="rounded-full"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{profile.name}</h1>
          <p className="text-xl text-gray-600">{profile.bio}</p>
        </div>
      </section>

      {/* 教学理念 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-4">教学理念</h2>
        <p className="text-lg">{profile.philosophy}</p>
      </section>

      {/* 课程方向 */}
      <section>
        <h2 className="text-3xl font-bold mb-8">课程方向</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['高一化学', '高二化学', '高三化学'].map((grade) => (
            <div key={grade} className="p-6 border rounded-lg">
              <h3 className="text-xl font-semibold">{grade}</h3>
              <p className="text-gray-600 mt-2">点击查看详情</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
```

**设计理由**：
- 没有封装HeroSection、CourseOverview等组件
- 课程方向硬编码，因为只有三个固定选项
- 教师需要修改时，直接编辑这个文件，不需要跳转多个文件

### 博客列表页（app/blog/page.tsx）

```typescript
import { getArticles } from '@/lib/content';
import Link from 'next/link';

export default async function BlogListPage() {
  const articles = await getArticles();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">教学博客</h1>
      
      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-2">{article.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{article.date}</span>
              <span>{article.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
```

**设计理由**：
- 没有封装ArticleCard、ArticleList组件
- 搜索功能暂不实现（V1不需要），后续有需求再加
- 分类筛选暂不实现，直接显示全部文章列表

### 博客详情页（app/blog/[slug]/page.tsx）

```typescript
import { getArticle, getArticles } from '@/lib/content';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>{article.date}</span>
            <span>{article.category}</span>
          </div>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
```

**设计理由**：
- 没有封装ArticleContent组件
- 相关文章推荐功能暂不实现（V1不需要）
- 化学公式渲染集成在ReactMarkdown中（通过rehype-katex插件）

---

## 内容加载工具（lib/content.ts）

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import profileData from '@/content/profile.json';
import resourcesData from '@/content/resources.json';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles');

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
}

/**
 * 获取教师信息
 */
export function getProfile() {
  return profileData;
}

/**
 * 获取资源列表
 */
export function getResources() {
  return resourcesData;
}

/**
 * 获取所有文章列表
 */
export async function getArticles(): Promise<Article[]> {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  
  const articles = files.map((file) => {
    const filePath = path.join(CONTENT_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    return {
      slug: file.replace('.md', ''),
      title: data.title,
      date: data.date,
      category: data.category,
      tags: data.tags || [],
      excerpt: content.slice(0, 150) + '...',
      content,
    };
  });

  return articles.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * 获取单篇文章
 */
export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    excerpt: content.slice(0, 150) + '...',
    content,
  };
}
```

**设计理由**：
- 单文件，约80行代码，所有内容加载逻辑集中在这里
- 没有抽象ContentLoader类，直接导出函数
- 使用简单的JSON文件存储教师信息和资源列表
- 没有预留API数据源切换，需要时再添加

---

## SEO实现（极简）

### 布局文件（app/layout.tsx）

```typescript
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '化学教师个人网站',
  description: '专注高中化学教育，分享教学心得与学习资源',
  keywords: ['化学', '教学', '高中化学', '化学实验'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
```

**设计理由**：
- 全局SEO配置写在layout.tsx中
- 不需要单独的seo.ts工具文件
- sitemap和robots.txt使用Next.js自动生成功能

### Sitemap（app/sitemap.ts）

```typescript
import { MetadataRoute } from 'next';
import { getArticles } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const baseUrl = 'https://your-domain.com';

  const staticPages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/courses`, lastModified: new Date() },
    { url: `${baseUrl}/resources`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  const blogPages = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.date),
  }));

  return [...staticPages, ...blogPages];
}
```

---

## 部署方案（推荐Vercel）

### 为什么推荐Vercel？

1. **零配置部署**：连接GitHub仓库，自动构建和部署
2. **免费额度充足**：个人网站完全够用
3. **自动CI/CD**：Git提交即部署，无需手动操作
4. **国内访问可接受**：虽然服务器在海外，但静态页面加载速度仍可接受

### 快速部署流程

```bash
# 1. 安装Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel deploy

# 4. 绑定自定义域名（如有）
# 在Vercel控制台添加域名
```

### 如果需要国内优化（方案二）

使用**腾讯云静态网站托管**：

1. Next.js静态导出：`next.config.js`添加`output: 'export'`
2. 构建：`npm run build`
3. 上传`out`目录到腾讯云COS
4. 配置CDN加速

**选择建议**：
- 快速验证：直接用Vercel，10分钟上线
- 国内优化：静态导出 + 腾讯云COS + CDN

---

## 内容更新流程（教师友好）

### 场景1：发布新文章

1. 在`content/articles/`目录创建新Markdown文件
2. 填写frontmatter（标题、日期、分类、标签）
3. 编写正文（Markdown格式）
4. Git提交并推送到GitHub
5. Vercel自动构建并部署（约1-2分钟）

**示例**：

```markdown
---
title: 如何记忆元素周期表
date: 2024-02-01
category: 学习方法
tags: [元素周期表, 高一化学]
---

# 如何记忆元素周期表

元素周期表是化学学习的基础...

## 记忆技巧

### 分组记忆法

将元素按族分组记忆...
```

### 场景2：修改个人信息

编辑`content/profile.json`文件，修改姓名、简介、联系方式等。

### 场景3：添加资源文件

1. 将PDF/PPT文件上传到`public/files/`目录
2. 编辑`content/resources.json`，添加文件信息
3. Git提交并推送

---

## 化学公式渲染

### 方案：KaTeX + ReactMarkdown

```bash
npm install react-markdown remark-math rehype-katex katex
```

### 使用方式

在Markdown中直接写LaTeX公式：

```markdown
水的分子式：H₂O

化学方程式：
$$
\text{H}_2\text{O} + \text{CO}_2 \rightarrow \text{H}_2\text{CO}_3
$$
```

### 配置（app/blog/[slug]/page.tsx）

```typescript
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

// 在ReactMarkdown组件中添加插件
<ReactMarkdown
  remarkPlugins={[remarkMath]}
  rehypePlugins={[rehypeKatex]}
>
  {article.content}
</ReactMarkdown>
```

---

## 对比：优化前 vs 优化后

| 维度 | 优化前 | 优化后 | 理由 |
|------|--------|--------|------|
| 目录结构 | 4层嵌套 | 2层扁平 | 减少认知负担，AI更容易理解 |
| 组件数量 | 20+个 | 0个（直接写） | 避免过度封装，需要复用时再提取 |
| 类型文件 | 独立types目录 | 无（简单接口） | TypeScript自动推断，无需提前定义 |
| API路由 | 4个（3个AI预留） | 0个 | V1不需要，有需求时再添加 |
| 配置文件 | 5个YAML | 2个JSON | JSON更简单，教师容易编辑 |
| 内容加载 | ContentLoader类 | 3个函数 | 80行代码 vs 200行代码 |
| SEO工具 | 独立seo.ts | 直接写在页面中 | 减少文件跳转 |
| 部署方案 | 4种详解 | 1种（Vercel） | 快速上线，需要时再考虑其他方案 |
| 文档 | 3个文档文件 | 1个README | 集中管理，减少维护成本 |
| 代码总量 | ~3000行 | ~800行 | 减少70%代码量 |

---

## 未来演进路径（需要时再添加）

### 第2次需要搜索功能时

- 添加简单的客户端搜索（过滤文章列表）
- 不需要后端API，前端JS即可实现

### 第2次需要内容管理后台时

- 评估是否真的需要（直接编辑Markdown可能更快）
- 如需要，考虑集成第三方Headless CMS（如Sanity、Contentful）

### 第2次需要AI功能时

- 添加`/app/api/ai/`路由
- 集成AI服务（如通义千问、文心一言）

### 第2次需要多语言时

- 提取文案到JSON文件
- 添加语言切换逻辑

**关键原则**：只有在真正需要时才添加功能，不提前预留代码。

---

## 技术栈最终确认

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 14+ | React框架（App Router） |
| TypeScript | 5.x | 类型安全（宽松模式） |
| Tailwind CSS | 3.x | 样式 |
| react-markdown | 9.x | Markdown渲染 |
| remark-math | | 数学/化学公式支持 |
| rehype-katex | | KaTeX渲染 |
| gray-matter | | 解析Markdown frontmatter |

**不需要的技术**：
- 不需要zustand、redux等状态管理
- 不需要react-hook-form等表单库（没有复杂表单）
- 不需要axios（使用原生fetch即可）
- 不需要测试框架（V1快速上线优先）

---

## 开发流程（AI辅助）

### 第1步：初始化项目

```bash
npx create-next-app@latest chemistry-teacher-website --typescript --tailwind --app
```

### 第2步：安装依赖

```bash
npm install react-markdown remark-math rehype-katex gray-matter katex
```

### 第3步：创建内容文件

- `content/profile.json`
- `content/resources.json`
- `content/articles/` 目录

### 第4步：开发页面（逐个实现）

1. 首页（2小时）
2. 关于我（1小时）
3. 博客列表和详情（3小时）
4. 课程资源（2小时）
5. 资源中心（1小时）
6. 联系方式（1小时）

**总计：约10小时开发时间**

### 第5步：部署上线

```bash
vercel deploy
```

---

## 维护成本估算

| 任务 | 时间 | 频率 |
|------|------|------|
| 发布新文章 | 5分钟 | 每周1-2次 |
| 修改个人信息 | 2分钟 | 每月1次 |
| 添加资源文件 | 5分钟 | 每月1-2次 |
| 更新依赖包 | 10分钟 | 每季度1次 |

**年维护成本：约2-3小时**

---

## 总结：简化带来的好处

### 对AI开发工具
- 文件结构扁平，容易理解项目全貌
- 代码直接写在需要的地方，减少跳转
- 没有复杂抽象，AI生成代码更准确

### 对教师（非专业开发者）
- 只需要编辑Markdown和JSON文件
- Git提交即更新，无需登录后台
- 代码量少，出现问题容易排查

### 对项目演进
- 小步快跑，快速上线验证
- 需要新功能时再添加，避免维护无用代码
- 架构简单，重构成本低

---

**设计版本:** 2.0（简化版）  
**优化原则:** YAGNI、AI Friendly、MVP优先  
**预计开发时间:** 10小时  
**预计上线时间:** 1-2天  
