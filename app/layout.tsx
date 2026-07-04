import type { Metadata } from 'next';
import './globals.css';

// Site configuration for SEO - Requirements 9.1, 9.2, 9.3, 9.8
const siteConfig = {
  name: '化学教师个人网站',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chemistry-teacher.com',
  description: '专注高中化学教育，分享教学心得与学习资源',
  keywords: ['化学', '教学', '高中化学', '化学实验', '化学教育', '化学教师'],
  ogImage: '/images/og-default.png',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: '化学教师' }],
  creator: '化学教师',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
