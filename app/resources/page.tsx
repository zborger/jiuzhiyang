import { getResources, formatFileSize, type ResourceFile } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '资料中心',
  description: '下载化学教学资料，包括PDF文档、PPT课件和实验讲义，支持高中各年级化学学习。',
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: '资料中心 | 化学教师个人网站',
    description: '下载化学教学资料，包括PDF文档、PPT课件和实验讲义，支持高中各年级化学学习。',
    url: '/resources',
    type: 'website',
  },
};

// Resource type labels with colors
const resourceTypeConfig = {
  pdf: {
    label: 'PDF文档',
    color: 'bg-red-100 text-red-700',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  ppt: {
    label: 'PPT课件',
    color: 'bg-orange-100 text-orange-700',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M12 21l9-9-9-9-9 9 9 9z" />
      </svg>
    ),
  },
};

// Category colors for visual distinction
const categoryColors: Record<string, string> = {
  '高一化学': 'bg-blue-50 border-blue-200',
  '高二化学': 'bg-green-50 border-green-200',
  '高三化学': 'bg-purple-50 border-purple-200',
  '通用': 'bg-gray-50 border-gray-200',
};

// Resource Card Component - Requirements 6.1, 6.2, 6.3
function ResourceCard({
  resource,
  type,
}: {
  resource: ResourceFile;
  type: 'pdf' | 'ppt';
}) {
  const typeConfig = resourceTypeConfig[type];
  const categoryColor = categoryColors[resource.category] || 'bg-gray-50 border-gray-200';

  return (
    <article
      id={resource.id}
      className={`rounded-xl border-2 p-6 transition-all hover:shadow-md ${categoryColor}`}
    >
      {/* Header with type badge and category */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`p-2 rounded-lg ${typeConfig.color}`}>
            {typeConfig.icon}
          </span>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${typeConfig.color}`}>
            {typeConfig.label}
          </span>
        </div>
        <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded">
          {resource.category}
        </span>
      </div>

      {/* Title - Requirement 6.1 */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
        {resource.title}
      </h3>

      {/* Description - Requirement 6.1 */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {resource.description}
      </p>

      {/* File Info - Requirement 6.1 */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {formatFileSize(resource.fileSize)}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {resource.downloadCount} 次下载
        </span>
      </div>

      {/* Download Button - Requirement 6.3 */}
      <a
        href={resource.file}
        download
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm min-h-[44px]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        下载文件
      </a>
    </article>
  );
}

// Resource Section Component - Requirement 6.5
function ResourceSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <span className="p-2 bg-blue-100 rounded-lg text-blue-600">{icon}</span>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function ResourcesPage() {
  const resources = getResources();

  // Group resources by category - Requirement 6.5
  const categories = ['高一化学', '高二化学', '高三化学', '通用'];

  // Group PDFs by category
  const pdfsByCategory: Record<string, ResourceFile[]> = {};
  categories.forEach((cat) => {
    pdfsByCategory[cat] = [];
  });
  resources.pdfFiles.forEach((pdf) => {
    if (pdfsByCategory[pdf.category]) {
      pdfsByCategory[pdf.category].push(pdf);
    }
  });

  // Group PPTs by category
  const pptsByCategory: Record<string, ResourceFile[]> = {};
  categories.forEach((cat) => {
    pptsByCategory[cat] = [];
  });
  resources.pptFiles.forEach((ppt) => {
    if (pptsByCategory[ppt.category]) {
      pptsByCategory[ppt.category].push(ppt);
    }
  });

  return (
    <main className="flex-1">
      {/* Page Header */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            资料中心
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
            下载化学教学资料，包括PDF文档、PPT课件和实验讲义
          </p>
        </div>
      </section>

      {/* Resources Content - Requirements 6.1, 6.2, 6.5 */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container-custom">
          {/* PDF Section - Requirement 6.2 */}
          <ResourceSection
            title="PDF文档"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            }
          >
            {resources.pdfFiles.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-gray-500">暂无PDF资源</p>
              </div>
            ) : (
              <div className="space-y-8">
                {categories.map((category) => {
                  const categoryPdfs = pdfsByCategory[category];
                  if (categoryPdfs.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryPdfs.map((pdf) => (
                          <ResourceCard key={pdf.id} resource={pdf} type="pdf" />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ResourceSection>

          {/* PPT Section - Requirement 6.2 */}
          <ResourceSection
            title="PPT课件"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 13v-1m4 1v-3m4 3V8M12 21l9-9-9-9-9 9 9 9z" />
              </svg>
            }
          >
            {resources.pptFiles.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center">
                <p className="text-gray-500">暂无PPT资源</p>
              </div>
            ) : (
              <div className="space-y-8">
                {categories.map((category) => {
                  const categoryPpts = pptsByCategory[category];
                  if (categoryPpts.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categoryPpts.map((ppt) => (
                          <ResourceCard key={ppt.id} resource={ppt} type="ppt" />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ResourceSection>

          {/* Help Section - Requirement 6.6 */}
          <div className="mt-12 bg-white rounded-xl p-6 md:p-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              文件下载遇到问题？
            </h3>
            <p className="text-gray-600 mb-4">
              如果您在下载过程中遇到问题，或者发现文件损坏无法下载，请通过以下方式联系我们：
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                发送邮件至教师邮箱
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                扫描微信二维码联系教师
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
