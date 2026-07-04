import Link from 'next/link';
import { getResources, getArticles, formatFileSize } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '课程资源',
  description: '高一、高二、高三化学课程资料，包括文章、视频和文档资源，按年级分类展示。',
  alternates: {
    canonical: '/courses',
  },
  openGraph: {
    title: '课程资源 | 化学教师个人网站',
    description: '高一、高二、高三化学课程资料，包括文章、视频和文档资源，按年级分类展示。',
    url: '/courses',
    type: 'website',
  },
};

// Course categories - Requirement 4.1
const courseCategories = [
  {
    id: '高一化学',
    name: '高一化学',
    description: '原子结构、化学键、氧化还原反应等基础知识',
  },
  {
    id: '高二化学',
    name: '高二化学',
    description: '有机化学基础、化学反应原理等进阶内容',
  },
  {
    id: '高三化学',
    name: '高三化学',
    description: '化学实验、综合复习、高考冲刺',
  },
];

// Content type definitions - Requirement 4.4
const contentTypes = ['文章', '视频', '文档'] as const;

export default async function CoursesPage() {
  const resources = getResources();
  const articles = await getArticles();

  // Build content items grouped by category
  const contentByCategory: Record<string, Array<{
    id: string;
    title: string;
    description: string;
    type: '文章' | '视频' | '文档';
    href: string;
    meta?: string;
    createdAt: string;
  }>> = {};

  // Initialize categories
  courseCategories.forEach((cat) => {
    contentByCategory[cat.id] = [];
  });

  // Add articles to their categories
  articles.forEach((article) => {
    // Map article categories to course categories
    const matchingCategory = courseCategories.find(
      (cat) => article.category === cat.name || article.tags.includes(cat.name)
    );

    if (matchingCategory) {
      contentByCategory[matchingCategory.id].push({
        id: article.slug,
        title: article.title,
        description: article.excerpt,
        type: '文章',
        href: `/blog/${article.slug}`,
        meta: article.readingTime ? `${article.readingTime} 分钟阅读` : undefined,
        createdAt: article.date,
      });
    }
  });

  // Add PDF files to their categories
  resources.pdfFiles.forEach((pdf) => {
    const matchingCategory = courseCategories.find(
      (cat) => pdf.category === cat.name || pdf.category === '通用'
    );

    if (matchingCategory || pdf.category === '通用') {
      // For '通用' category, add to all categories
      if (pdf.category === '通用') {
        courseCategories.forEach((cat) => {
          contentByCategory[cat.id].push({
            id: pdf.id,
            title: pdf.title,
            description: pdf.description,
            type: '文档',
            href: `/resources#${pdf.id}`,
            meta: formatFileSize(pdf.fileSize),
            createdAt: pdf.createdAt,
          });
        });
      } else if (matchingCategory) {
        contentByCategory[matchingCategory.id].push({
          id: pdf.id,
          title: pdf.title,
          description: pdf.description,
          type: '文档',
          href: `/resources#${pdf.id}`,
          meta: formatFileSize(pdf.fileSize),
          createdAt: pdf.createdAt,
        });
      }
    }
  });

  // Add PPT files to their categories
  resources.pptFiles.forEach((ppt) => {
    const matchingCategory = courseCategories.find(
      (cat) => ppt.category === cat.name
    );

    if (matchingCategory) {
      contentByCategory[matchingCategory.id].push({
        id: ppt.id,
        title: ppt.title,
        description: ppt.description,
        type: '文档',
        href: `/resources#${ppt.id}`,
        meta: formatFileSize(ppt.fileSize),
        createdAt: ppt.createdAt,
      });
    }
  });

  // Sort items by date descending - Requirement 4.5
  Object.keys(contentByCategory).forEach((category) => {
    contentByCategory[category].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  });

  return (
    <main className="flex-1">
      {/* Page Header */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            课程资源
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
            按年级浏览化学课程资料，找到符合需求的学习资源
          </p>
        </div>
      </section>

      {/* Course Categories Section - Requirement 4.1, 4.2 */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container-custom">
          <div className="space-y-12">
            {courseCategories.map((category) => {
              const items = contentByCategory[category.id];

              return (
                <div key={category.id} id={category.id}>
                  {/* Category Header */}
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>

                  {/* Content Items - Requirement 4.2, 4.3 */}
                  {items.length === 0 ? (
                    // Empty State - Requirement 4.6
                    <div className="bg-white rounded-xl p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-lg">暂无内容</p>
                      <p className="text-gray-400 text-sm mt-2">
                        该分类下暂时没有相关资源
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.slice(0, 50).map((item) => (
                        // Content Item Card - Requirement 4.3
                        <Link
                          key={item.id}
                          href={item.href}
                          className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 hover:border-blue-200"
                        >
                          {/* Type Badge - Requirement 4.3 */}
                          <span
                            className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-3 ${
                              item.type === '文章'
                                ? 'bg-blue-100 text-blue-700'
                                : item.type === '视频'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {item.type}
                          </span>

                          {/* Title - max 100 chars per requirement */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {item.title.length > 100
                              ? item.title.slice(0, 100) + '...'
                              : item.title}
                          </h3>

                          {/* Description - max 200 chars per requirement */}
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {item.description.length > 200
                              ? item.description.slice(0, 200) + '...'
                              : item.description}
                          </p>

                          {/* Meta Info */}
                          {item.meta && (
                            <span className="text-sm text-gray-500">
                              {item.meta}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Center Link */}
      <section className="bg-white py-12">
        <div className="container-custom text-center">
          <p className="text-gray-600 mb-4">
            需要更多资料？访问资源中心下载PDF和PPT文件
          </p>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            前往资源中心
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
