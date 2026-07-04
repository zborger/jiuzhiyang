import Image from 'next/image';
import { getProfile } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系方式',
  description: '通过微信、邮箱或社交媒体联系化学教师，咨询课程或预约辅导，欢迎学生家长咨询。',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: '联系方式 | 化学教师个人网站',
    description: '通过微信、邮箱或社交媒体联系化学教师，咨询课程或预约辅导，欢迎学生家长咨询。',
    url: '/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  const profile = getProfile();

  return (
    <main className="flex-1">
      {/* Page Header */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            联系方式
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
            欢迎通过以下方式联系我，咨询课程或预约辅导
          </p>
        </div>
      </section>

      {/* Contact Information - Requirements 7.2, 7.3, 7.4, 7.5, 7.6 */}
      <section className="bg-gray-50 py-12 md:py-16" aria-labelledby="contact-info-heading">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* WeChat QR Code - Requirement 7.2, 7.3 */}
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05a6.67 6.67 0 01-.249-1.806c0-3.681 3.347-6.672 7.466-6.672.235 0 .464.018.695.034C16.19 4.179 12.8 2.188 8.691 2.188zM5.698 5.96c.603 0 1.09.49 1.09 1.092s-.487 1.09-1.09 1.09a1.09 1.09 0 01-1.09-1.09 1.09 1.09 0 011.09-1.092zm5.973 0c.603 0 1.09.49 1.09 1.092s-.487 1.09-1.09 1.09a1.09 1.09 0 01-1.09-1.09 1.09 1.09 0 011.09-1.092z"/>
                  <path d="M23.918 14.08c0-3.223-3.168-5.839-7.069-5.839-3.901 0-7.069 2.616-7.069 5.839 0 3.223 3.168 5.838 7.069 5.838.779 0 1.525-.11 2.222-.302a.726.726 0 01.599.082l1.59.93a.273.273 0 00.14.045c.134 0 .24-.11.24-.244 0-.06-.024-.12-.04-.179l-.325-1.233a.49.49 0 01.177-.554c1.527-1.12 2.466-2.75 2.466-4.383zm-9.397-1.152a.912.912 0 01-.913-.912.912.912 0 01.913-.913.912.912 0 01.912.913.912.912 0 01-.912.912zm4.656 0a.912.912 0 01-.912-.912.912.912 0 01.912-.913.912.912 0 01.913.913.912.912 0 01-.913.912z"/>
                </svg>
              </div>
              <h2 id="contact-info-heading" className="text-xl font-semibold text-gray-900 mb-4">
                微信
              </h2>
              <div className="w-[200px] h-[200px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border-2 border-gray-200">
                {profile.wechatQR ? (
                  <Image
                    src={profile.wechatQR}
                    alt="微信二维码"
                    width={200}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-500">微信二维码</span>
                )}
              </div>
              {/* Requirement 7.3: Fallback - show WeChat ID below QR code */}
              {profile.wechatId && (
                <p className="mt-2 text-sm text-gray-500">
                  微信号: <span className="font-medium text-gray-700">{profile.wechatId}</span>
                </p>
              )}
              <p className="mt-4 text-gray-600">扫描二维码添加微信</p>
            </div>

            {/* Email mailto link - Requirement 7.4 */}
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                电子邮箱
              </h2>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors min-h-[44px] min-w-[44px]"
                aria-label={`发送邮件至 ${profile.email}`}
              >
                {profile.email}
              </a>
              <p className="mt-4 text-gray-600">点击发送邮件</p>
            </div>

            {/* Social Media Links - Requirement 7.5 */}
            <div className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                社交媒体
              </h2>
              <div className="flex flex-col gap-3 w-full">
                {profile.socialLinks.slice(0, 5).map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 hover:text-gray-900 transition-colors min-h-[44px]"
                    aria-label={`访问${social.name}主页`}
                  >
                    {social.name}
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ))}
              </div>
              <p className="mt-4 text-gray-600">关注获取更多内容</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Tips */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              联系须知
            </h2>
            <p className="text-gray-600 leading-relaxed">
              欢迎通过以上任意方式联系我。添加微信时请注明来意，我会尽快回复。
              如果您对课程有疑问或需要预约辅导，也可以直接发送邮件详细说明您的需求。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
