'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Custom Error Page
 * Requirements: 16.2 - Custom 500 error page with "服务器错误" message and retry button
 * 
 * This is an error boundary that catches runtime errors in the application.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log error to console with context - Requirement 16.4
  useEffect(() => {
    console.error('Error occurred:', {
      type: 'Runtime Error',
      message: error.message,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    });
  }, [error]);

  return (
    <main className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center py-16">
          {/* Error Illustration */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
              <svg
                className="w-12 h-12 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">
            500
          </h1>

          {/* Error Message - Requirement 16.2 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">
            服务器错误
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
            抱歉，服务器遇到了一些问题。请稍后重试，或返回首页继续浏览。
          </p>

          {/* Action Buttons - Requirement 16.2 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Retry Button */}
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors min-h-[44px] w-full sm:w-auto justify-center"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              重试
            </button>

            {/* Back to Home Link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors min-h-[44px] w-full sm:w-auto justify-center"
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
          </div>

          {/* Contact Support */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm mb-4">
              如果问题持续存在，请联系我们：
            </p>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              获取帮助
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
