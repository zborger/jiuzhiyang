import Image from 'next/image';
import { getProfile } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '关于我',
  description: '了解化学教师的教育背景、教学经历、获奖情况以及联系方式，专业资质认证教师。',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: '关于我 | 化学教师个人网站',
    description: '了解化学教师的教育背景、教学经历、获奖情况以及联系方式，专业资质认证教师。',
    url: '/about',
    type: 'profile',
  },
};

/**
 * Generate Person schema JSON-LD for SEO
 * Requirements: 9.6 (Person schema JSON-LD for about page)
 */
function generatePersonSchema(profile: ReturnType<typeof getProfile>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    description: profile.bio,
    image: profile.photo.startsWith('data:') ? undefined : profile.photo,
    jobTitle: '高中化学教师',
    email: profile.email,
    url: baseUrl,
    sameAs: profile.socialLinks.map((link) => link.url),
    alumniOf: profile.education.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.school,
    })),
    knowsAbout: ['化学', '高中化学', '化学教育', '化学实验'],
  };
}

export default function AboutPage() {
  const profile = getProfile();
  const personSchema = generatePersonSchema(profile);

  return (
    <main className="flex-1">
      {/* Person Schema JSON-LD - Requirement 9.6 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      
      {/* Page Header */}
      <section className="bg-white py-12 md:py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
            关于我
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
            了解我的教育背景、教学经历和专业资质
          </p>
        </div>
      </section>

      {/* Education Background - Requirement 3.1 */}
      <section className="bg-gray-50 py-12 md:py-16" aria-labelledby="education-heading">
        <div className="container-custom">
          <h2 id="education-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            教育背景
          </h2>
          <div className="space-y-6">
            {profile.education.slice(0, 5).map((edu, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.school}
                    </h3>
                    <p className="text-gray-600">{edu.degree}</p>
                  </div>
                  <span className="text-sm text-gray-500 sm:text-right">
                    {edu.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Experience Timeline - Requirement 3.2 */}
      <section className="bg-white py-12 md:py-16" aria-labelledby="experience-heading">
        <div className="container-custom">
          <h2 id="experience-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            教学经历
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 h-full w-0.5 bg-blue-200" />

            {/* Timeline items */}
            <div className="space-y-8">
              {profile.experience.slice(0, 20).map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <span className="text-sm font-medium text-blue-600 mb-1 block">
                        {exp.period}
                      </span>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {exp.school}
                      </h3>
                      <p className="text-gray-600">{exp.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards and Certificates - Requirement 3.3 */}
      <section className="bg-gray-50 py-12 md:py-16" aria-labelledby="awards-heading">
        <div className="container-custom">
          <h2 id="awards-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            荣誉奖项
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.awards.slice(0, 15).map((award, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4"
              >
                {/* Award icon */}
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-gray-900 font-medium">{award}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information - Requirement 3.4, 3.5, 3.6 */}
      <section className="bg-white py-12 md:py-16" aria-labelledby="contact-heading">
        <div className="container-custom">
          <h2 id="contact-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            联系方式
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* WeChat QR Code - Requirement 3.5 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
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
              <p className="mt-4 text-gray-600">扫描二维码添加微信</p>
            </div>

            {/* Email - Requirement 3.4 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">电子邮箱</h3>
              <a
                href={`mailto:${profile.email}`}
                className="text-blue-600 hover:text-blue-800 transition-colors text-lg"
              >
                {profile.email}
              </a>
            </div>

            {/* Social Media Links - Requirement 3.6 */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">社交媒体</h3>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {profile.socialLinks.slice(0, 5).map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {social.name}
                    <svg
                      className="w-4 h-4 ml-1"
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
