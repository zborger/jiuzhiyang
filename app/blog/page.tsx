import { getArticles } from '@/lib/content';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '教学博客',
  description: '分享化学教学心得、学习方法、考试分析和实验知识，涵盖高一至高三化学全部内容。',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: '教学博客 | 化学教师个人网站',
    description: '分享化学教学心得、学习方法、考试分析和实验知识，涵盖高一至高三化学全部内容。',
    url: '/blog',
    type: 'website',
  },
};

export default async function BlogListPage() {
  const articles = await getArticles();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">教学博客</h1>

      {articles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">暂无文章</p>
        </div>
      ) : (
        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-blue-300 transition-all duration-200"
            >
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 hover:text-blue-600">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                  {article.category}
                </span>
                {article.readingTime && (
                  <span className="text-gray-400">
                    {article.readingTime} 分钟阅读
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
