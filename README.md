# 化学教师个人品牌网站

高中化学教师个人品牌与教学网站，基于 Next.js 14 构建，支持 Markdown 内容管理、化学公式渲染，适合部署到 Vercel。

## 功能特性

- **首页** - 教师介绍、教学理念、课程方向、精选内容
- **关于我** - 教育背景、教学经历、奖项证书、联系方式
- **课程资源** - 按年级分类的课程内容展示（高一/高二/高三化学）
- **教学博客** - Markdown 文章发布，支持 KaTeX 数学公式和化学方程式
- **资料中心** - PDF/PPT 资源文件下载
- **联系方式** - 微信二维码、邮箱、社交媒体链接
- **响应式设计** - 支持桌面、平板、移动端
- **SEO 优化** - sitemap、Open Graph、结构化数据

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **内容**: Markdown + YAML frontmatter
- **公式渲染**: KaTeX + react-markdown

## 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 pnpm

### 安装

```bash
# 克隆项目
git clone <your-repo-url>
cd chemistry-teacher-website

# 安装依赖
npm install

# 复制环境变量配置
cp .env.local.example .env.local
```

### 配置

编辑 `.env.local` 文件：

```env
# 网站URL（必填）
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 开发

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建

```bash
# 生产构建
npm run build

# 启动生产服务器
npm run start
```

---

## 内容更新指南

所有内容文件位于 `content/` 目录下，通过编辑 Markdown 和 JSON 文件管理网站内容。

### 发布新文章

文章存放在 `content/articles/` 目录，使用 Markdown 格式。

#### 文章格式

```markdown
---
title: 文章标题
date: 2024-03-01
category: 学习方法
tags: [标签1, 标签2]
---

# 文章标题

正文内容...
```

#### Frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题（最多100字符） |
| `date` | 是 | 发布日期，格式：YYYY-MM-DD |
| `category` | 是 | 分类：教学心得、考试分析、学习方法、实验知识 |
| `tags` | 否 | 标签数组 |

#### 化学公式写法

使用 LaTeX/KaTeX 语法：

```markdown
# 行内公式
水的分子式：$H_2O$

# 块级公式
$$
\text{2H}_2 + \text{O}_2 \xrightarrow{\text{点燃}} \text{2H}_2\text{O}
$$

# 下标和上标
$CO_2$（二氧化碳）
$Ca^{2+}$（钙离子）
```

#### 添加新文章步骤

1. 在 `content/articles/` 创建新的 `.md` 文件，文件名即 URL slug
2. 填写 frontmatter（title、date、category）
3. 编写 Markdown 正文
4. 运行 `npm run dev` 预览效果
5. 确认无误后提交代码

### 修改个人信息

编辑 `content/profile.json` 文件：

```json
{
  "name": "教师姓名",
  "photo": "/images/photo.jpg",
  "bio": "个人简介，不超过500字符",
  "philosophy": "教学理念，不超过1000字符",
  "email": "your@email.com",
  "wechatQR": "/images/wechat-qr.png",
  "wechatId": "your_wechat_id",
  "education": [
    {
      "school": "学校名称",
      "degree": "学位",
      "year": "毕业年份"
    }
  ],
  "experience": [
    {
      "period": "时间段",
      "school": "学校名称",
      "position": "职位"
    }
  ],
  "awards": [
    "奖项名称 (年份)"
  ],
  "socialLinks": [
    { "name": "微博", "url": "https://weibo.com/yourprofile" },
    { "name": "B站", "url": "https://bilibili.com/yourprofile" }
  ]
}
```

#### 字段说明

| 字段 | 说明 |
|------|------|
| `name` | 教师姓名 |
| `photo` | 照片路径，建议放在 `public/images/` |
| `bio` | 简短介绍（首页展示） |
| `philosophy` | 教学理念 |
| `email` | 联系邮箱 |
| `wechatQR` | 微信二维码图片路径 |
| `wechatId` | 微信号（二维码加载失败时显示） |
| `education` | 教育背景（最多5条） |
| `experience` | 教学经历（最多20条） |
| `awards` | 奖项证书（最多15条） |
| `socialLinks` | 社交媒体链接（最多5个） |

### 添加资源文件

#### 1. 上传文件

将 PDF 或 PPT 文件放入对应目录：

- PDF 文件：`public/files/pdf/`
- PPT 文件：`public/files/ppt/`

#### 2. 注册资源

编辑 `content/resources.json`：

```json
{
  "pdfFiles": [
    {
      "id": "pdf-001",
      "title": "资源标题",
      "description": "资源描述，最多200字符",
      "file": "/files/pdf/your-file.pdf",
      "fileSize": 2097152,
      "fileType": "application/pdf",
      "category": "高一化学",
      "downloadCount": 0,
      "createdAt": "2024-03-01T10:00:00.000Z",
      "updatedAt": "2024-03-01T10:00:00.000Z"
    }
  ],
  "pptFiles": [
    {
      "id": "ppt-001",
      "title": "PPT标题",
      "description": "PPT描述",
      "file": "/files/ppt/your-file.pptx",
      "fileSize": 5242880,
      "fileType": "application/vnd.ms-powerpoint",
      "category": "高二化学",
      "downloadCount": 0,
      "createdAt": "2024-03-01T10:00:00.000Z",
      "updatedAt": "2024-03-01T10:00:00.000Z"
    }
  ]
}
```

#### 字段说明

| 字段 | 说明 |
|------|------|
| `id` | 唯一标识符，格式：pdf-xxx 或 ppt-xxx |
| `title` | 资源标题 |
| `description` | 资源描述 |
| `file` | 文件路径（相对于 public 目录） |
| `fileSize` | 文件大小（字节） |
| `fileType` | MIME 类型 |
| `category` | 分类：高一化学、高二化学、高三化学、通用 |

#### 获取文件大小

```bash
# macOS/Linux
ls -l public/files/pdf/your-file.pdf

# Windows PowerShell
(Get-Item "public\files\pdf\your-file.pdf").length
```

### 添加图片

将图片放入 `public/images/` 目录，在文章或配置中引用：

```markdown
<!-- 文章中引用 -->
![图片描述](/images/your-image.jpg)
```

```json
// profile.json 中引用
"photo": "/images/photo.jpg"
```

---

## 部署指南

### Vercel 部署（推荐）

Vercel 是 Next.js 的官方托管平台，支持零配置部署。

#### 方式一：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel deploy
```

#### 方式二：通过 GitHub 集成

1. 将代码推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com) 并登录
3. 点击 "Add New Project"
4. 导入 GitHub 仓库
5. Vercel 自动检测 Next.js，点击 "Deploy"
6. 等待构建完成

#### 配置环境变量

在 Vercel 项目设置中添加环境变量：

1. 进入项目 Settings → Environment Variables
2. 添加 `NEXT_PUBLIC_SITE_URL`，值为你的域名（如 `https://your-domain.com`）
3. 重新部署使配置生效

#### 绑定自定义域名

1. 进入项目 Settings → Domains
2. 添加自定义域名
3. 按提示配置 DNS 记录
4. 等待 SSL 证书自动配置

### Docker 部署

#### 构建镜像

```bash
# 构建镜像
docker build -t chemistry-teacher-website .

# 运行容器
docker run -p 3000:3000 chemistry-teacher-website
```

#### Dockerfile

项目根目录已包含 Dockerfile：

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### 环境变量

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
  chemistry-teacher-website
```

### 腾讯云轻量服务器部署

1. 购买腾讯云轻量应用服务器
2. 安装 Docker：

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com | sh
```

3. 按上述 Docker 部署步骤操作
4. 配置安全组开放 3000 端口
5. 配置 Nginx 反向代理和 SSL

---

## 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── layout.tsx          # 全局布局
│   ├── page.tsx            # 首页
│   ├── about/              # 关于我页面
│   ├── blog/               # 博客页面
│   ├── courses/            # 课程资源页面
│   ├── resources/          # 资料中心页面
│   └── contact/            # 联系方式页面
├── content/                # 内容文件
│   ├── articles/           # 博客文章（Markdown）
│   ├── profile.json        # 教师个人信息
│   └── resources.json      # 资源文件列表
├── lib/                    # 工具函数
│   └── content.ts          # 内容加载工具
├── public/                 # 静态资源
│   ├── images/             # 图片
│   └── files/              # 下载文件
│       ├── pdf/            # PDF 文件
│       └── ppt/            # PPT 文件
└── .env.local.example      # 环境变量示例
```

---

## 许可证

MIT License
