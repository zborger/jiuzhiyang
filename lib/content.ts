import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Types
export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: string;
  readingTime?: number;
  featuredImage?: string;
}

export interface Profile {
  name: string;
  photo: string;
  bio: string;
  philosophy: string;
  email: string;
  wechatQR: string;
  wechatId?: string;
  education: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
  experience: Array<{
    period: string;
    school: string;
    position: string;
  }>;
  awards: string[];
  socialLinks: Array<{
    name: string;
    url: string;
  }>;
}

export interface ResourceFile {
  id: string;
  title: string;
  description: string;
  file: string;
  fileSize: number;
  fileType: string;
  category: string;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Resources {
  pdfFiles: ResourceFile[];
  pptFiles: ResourceFile[];
}

// Content directory paths
const CONTENT_DIR = path.join(process.cwd(), 'content');
const ARTICLES_DIR = path.join(CONTENT_DIR, 'articles');

/**
 * Get teacher profile information
 */
export function getProfile(): Profile {
  const profilePath = path.join(CONTENT_DIR, 'profile.json');
  const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));
  return profileData;
}

/**
 * Get resources list (PDF and PPT files)
 */
export function getResources(): Resources {
  const resourcesPath = path.join(CONTENT_DIR, 'resources.json');
  const resourcesData = JSON.parse(fs.readFileSync(resourcesPath, 'utf-8'));
  return resourcesData;
}

/**
 * Get all articles list
 */
export async function getArticles(): Promise<Article[]> {
  // Ensure directory exists
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));

  const articles = files.map((file) => {
    const filePath = path.join(ARTICLES_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    // Calculate reading time (average 200 characters per minute for Chinese)
    const readingTime = Math.ceil(content.length / 200);

    return {
      slug: file.replace('.md', ''),
      title: data.title || 'Untitled',
      date: typeof data.date === 'string' ? data.date : (data.date instanceof Date ? data.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
      category: data.category || '未分类',
      tags: data.tags || [],
      excerpt: content.slice(0, 150) + (content.length > 150 ? '...' : ''),
      content,
      readingTime,
      featuredImage: data.featured_image,
    };
  });

  // Sort by date descending
  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single article by slug
 */
export async function getArticle(slug: string): Promise<Article | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Calculate reading time
  const readingTime = Math.ceil(content.length / 200);

  return {
    slug,
    title: data.title || 'Untitled',
    date: typeof data.date === 'string' ? data.date : (data.date instanceof Date ? data.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]),
    category: data.category || '未分类',
    tags: data.tags || [],
    excerpt: content.slice(0, 150) + (content.length > 150 ? '...' : ''),
    content,
    readingTime,
    featuredImage: data.featured_image,
  };
}

/**
 * Search articles by keyword
 */
export async function searchArticles(keyword: string): Promise<Article[]> {
  if (!keyword || keyword.length < 2) {
    return [];
  }

  const articles = await getArticles();
  const lowerKeyword = keyword.toLowerCase();

  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerKeyword) ||
      article.content.toLowerCase().includes(lowerKeyword) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerKeyword))
  );
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(
  category: string
): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter((article) => article.category === category);
}

/**
 * Format file size to human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
}
