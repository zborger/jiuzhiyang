import { getArticle, getArticles, getProfile } from '@/lib/content';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Link from 'next/link';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all articles at build time
 * Requirements: 10.5 (Static Site Generation)
 */
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

/**
 * Generate metadata for SEO
 * Requirements: 9.1, 9.2, 9.3, 9.8 (SEO optimization)
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) {
    return {
      title: '文章未找到',
    };
  }

  const articleUrl = `/blog/${article.slug}`;

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: articleUrl,
      type: 'article',
      publishedTime: article.date,
      authors: ['化学教师'],
      tags: article.tags,
    },
  };
}

/**
 * Generate Article schema JSON-LD for SEO
 * Requirements: 9.6 (Article schema JSON-LD for blog posts)
 */
function generateArticleSchema(
  article: NonNullable<Awaited<ReturnType<typeof getArticle>>>,
  authorName: string
) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: '化学教师个人网站',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/profile.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${article.slug}`,
    },
    image: article.featuredImage ? `${baseUrl}${article.featuredImage}` : undefined,
    keywords: article.tags.join(', '),
    articleSection: article.category,
  };
}

/**
 * Blog detail page component
 * Requirements: 5.3 (article content rendering), 17.1-17.4 (chemistry formula rendering)
 */
export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = await getArticle(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const profile = getProfile();
  const articleSchema = generateArticleSchema(article, profile.name);

  return (
    <main className="container mx-auto px-4 py-12">
      {/* Article Schema JSON-LD - Requirement 9.6 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <article className="max-w-3xl mx-auto">
        {/* Article header */}
        <header className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {article.title}
          </h1>
          
          {/* Article meta info - Requirement 5.3 */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            <time dateTime={article.date} className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(article.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                {article.category}
              </span>
            </span>

            {article.readingTime && (
              <span className="flex items-center gap-1 text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {article.readingTime} 分钟阅读
              </span>
            )}
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Article content - Requirements: 5.3, 17.1, 17.2, 17.3, 17.4 */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              // Custom heading components for proper hierarchy
              h1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-900">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-3 text-gray-900">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl md:text-2xl font-semibold mt-4 mb-2 text-gray-900">
                  {children}
                </h3>
              ),
              // Paragraph styling with minimum 16px font size - Requirement 5.9
              p: ({ children }) => (
                <p className="my-4 text-base md:text-lg leading-7 md:leading-8 text-gray-800">
                  {children}
                </p>
              ),
              // Code block styling
              pre: ({ children }) => (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto">
                  {children}
                </pre>
              ),
              code: ({ className, children, ...props }) => {
                // Check if this is inline code or a code block
                const isInline = !className;
                if (isInline) {
                  return (
                    <code
                      className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              // Image styling - Requirement 12.2: All meaningful images need alt text
              img: ({ src, alt }) => (
                <img
                  src={src}
                  alt={alt || '文章配图'}
                  className="max-w-full h-auto rounded-lg my-6"
                  loading="lazy"
                />
              ),
              // List styling
              ul: ({ children }) => (
                <ul className="my-4 pl-6 list-disc text-gray-800">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="my-4 pl-6 list-decimal text-gray-800">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="my-2">{children}</li>
              ),
              // Blockquote styling
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600">
                  {children}
                </blockquote>
              ),
              // Link styling
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Back to blog list */}
        <footer className="mt-12 pt-6 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            返回博客列表
          </Link>
        </footer>
      </article>
    </main>
  );
}
