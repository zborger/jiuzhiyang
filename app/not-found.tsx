import Link from 'next/link';

/**
 * Custom 404 Not Found Page
 * Requirements: 16.1 - Custom 404 error page with "页面未找到" message and link to home
 */
export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center py-16">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">
            404
          </h1>

          {/* Error Message - Requirement 16.1 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
            页面未找到
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            抱歉，您访问的页面不存在或已被移除。请检查网址是否正确，或返回首页继续浏览。
          </p>

          {/* Back to Home Link - Requirement 16.1 */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors min-h-[44px]"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            返回首页
          </Link>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm mb-4">
              您还可以尝试以下操作：
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                浏览教学博客
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/courses"
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                查看课程资源
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href="/contact"
                className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
