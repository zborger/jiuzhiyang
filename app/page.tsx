import Image from 'next/image';
import Link from 'next/link';
import { getProfile, getArticles, getResources, formatFileSize } from '@/lib/content';
import type { Metadata } from 'next';

// Course directions data - hardcoded as per design (only 3 fixed options)
const courseDirections = [
  {
    title: '高一化学',
    description: '原子结构、化学键、氧化还原反应等基础知识',
    href: '/courses?grade=高一',
  },
  {
    title: '高二化学',
    description: '有机化学基础、化学反应原理等进阶内容',
    href: '/courses?grade=高二',
  },
  {
    title: '高三化学',
    description: '化学实验、综合复习、高考冲刺',
    href: '/courses?grade=高三',
  },
];

// Page metadata - Requirements 9.1, 9.2, 9.3, 9.8
export const metadata: Metadata = {
  title: '首页',
  description: '专业高中化学教师个人网站，提供高一、高二、高三化学课程资料，分享教学心得与学习资源，助力学生化学学习。',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '化学教师个人网站',
    description: '专业高中化学教师个人网站，提供高一、高二、高三化学课程资料，分享教学心得与学习资源，助力学生化学学习。',
    url: '/',
    type: 'website',
  },
};

export default async function HomePage() {
  const profile = getProfile();
  const articles = await getArticles();
  const resources = getResources();

  // Get recent 3 articles or resources for featured content
  // Combine articles and resources, sort by date
  const featuredItems = [
    ...articles.slice(0, 3).map((article) => ({
      type: 'article' as const,
      title: article.title,
      description: article.excerpt,
      href: `/blog/${article.slug}`,
      meta: article.date,
    })),
    ...[
      ...resources.pdfFiles.slice(0, 2),
      ...resources.pptFiles.slice(0, 1),
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 3 - Math.min(articles.length, 3))
      .map((resource) => ({
        type: 'resource' as const,
        title: resource.title,
        description: resource.description,
        href: `/resources#${resource.id}`,
        meta: formatFileSize(resource.fileSize),
      })),
  ];

  return (
    <main className="flex-1">
      {/* Teacher Introduction Section - Requirement 2.1 */}
      <section className="bg-white py-12 md:py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Teacher Photo - minimum 200x200px */}
            <div className="flex-shrink-0">
              <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full overflow-hidden bg-gray-200">
                {profile.photo.startsWith('data:') ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.photo}
                    alt={`${profile.name}的照片`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={profile.photo}
                    alt={`${profile.name}的照片`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 240px"
                    priority
                  />
                )}
              </div>
            </div>
            
            {/* Teacher Name and Bio */}
            <div className="text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {profile.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-[500px]">
                {profile.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy Section - Requirement 2.2 */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            教学理念
          </h2>
          <p className="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
            {profile.philosophy}
          </p>
        </div>
      </section>

      {/* Course Directions Section - Requirement 2.3 */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            课程方向
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {courseDirections.map((course) => (
              <Link
                key={course.title}
                href={course.href}
                className="block p-6 md:p-8 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600">{course.description}</p>
                <div className="mt-4 text-blue-600 font-medium flex items-center gap-2">
                  查看详情
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content Section - Requirement 2.4, 2.5 */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            精选内容
          </h2>
          
          {featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {featuredItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Type badge */}
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-3 ${
                      item.type === 'article'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {item.type === 'article' ? '文章' : '资源'}
                  </span>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {item.description}
                  </p>
                  <span className="text-sm text-gray-500">{item.meta}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">暂无精选内容</p>
          )}

          {/* View all link */}
          {featuredItems.length > 0 && (
            <div className="text-center mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                查看更多文章
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
          )}
        </div>
      </section>
    </main>
  );
}
