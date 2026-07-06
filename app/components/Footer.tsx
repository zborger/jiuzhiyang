import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Site Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">⚗️ 张老师的化学课堂</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              南京市第九中学化学教师，专注高中化学教育，致力于让化学变得简单有趣。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-sm text-gray-400 hover:text-white transition-colors min-h-0 min-w-0 inline-block">
                  课程资源
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors min-h-0 min-w-0 inline-block">
                  教学博客
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-gray-400 hover:text-white transition-colors min-h-0 min-w-0 inline-block">
                  资料中心
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors min-h-0 min-w-0 inline-block">
                  联系方式
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">联系我</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 南京市第九中学</li>
              <li>📧 化学组办公室</li>
              <li>💬 扫码添加微信</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© {currentYear} 张老师的化学课堂 · 南京市第九中学</p>
          <p className="mt-1">基于 AI 辅助构建的数字化教学平台</p>
        </div>
      </div>
    </footer>
  );
}
