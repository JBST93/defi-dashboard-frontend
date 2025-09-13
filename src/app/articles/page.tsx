import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DeFi Articles & Guides - Learn About DeFi Lending',
  description:
    'Comprehensive DeFi articles covering stablecoin lending, yield farming, protocol guides, and DeFi strategies.',
  keywords: [
    'DeFi articles',
    'DeFi guides',
    'stablecoin lending',
    'yield farming',
    'DeFi education',
    'crypto lending',
  ],
  openGraph: {
    title: 'DeFi Articles & Educational Content',
    description:
      'Learn about DeFi lending, stablecoins, yield farming, and protocol strategies through our comprehensive guides.',
    url: 'https://www.tokendataview.com/articles',
  },
  alternates: {
    canonical: '/articles',
  },
};
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import fs from 'fs';
import path from 'path';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
  content: React.ReactNode;
}

function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'src', 'app', 'articles');
  const subfolders = fs
    .readdirSync(blogDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const blogPosts: BlogPost[] = [];

  subfolders.forEach((folder) => {
    const postPath = path.join(blogDir, folder, 'page.tsx');
    if (fs.existsSync(postPath)) {
      const content = fs.readFileSync(postPath, 'utf8');
      const stats = fs.statSync(postPath);
      const postData = extractPostData(content, folder, stats.mtime);
      if (postData) {
        blogPosts.push(postData);
      }
    }
  });

  // Sort by date (newest first)
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

function extractPostData(
  content: string,
  folder: string,
  mtime: Date
): BlogPost | null {
  const postData = {} as BlogPost;

  // Extract title from metadata
  const titleMatch = content.match(/title:\s*['"](.+?)['"]/);
  if (titleMatch) {
    postData.title = titleMatch[1];
  } else {
    return null;
  }

  // Extract description as excerpt
  const descriptionMatch = content.match(/description:\s*['"](.+?)['"]/);
  if (descriptionMatch) {
    postData.excerpt = descriptionMatch[1];
  } else {
    return null;
  }

  // Extract image from openGraph
  const imageMatch = content.match(/url:\s*['"](.+?og-.+?\.jpg)['"]/);
  if (imageMatch) {
    postData.image = imageMatch[1];
  } else {
    // Default image if not found
    postData.image = '/og-default.jpg';
  }

  // Generate ID from folder name
  postData.id = folder;
  postData.slug = folder;

  // Set date from file modification time
  postData.date = mtime.toISOString().split('T')[0];

  return postData;
}

export default function BlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            DeFi Insights & Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest insights on DeFi lending, yield
            farming, and the broader cryptocurrency ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              href={`/articles/${post.slug}`}
              key={post.id}
              className="block h-full"
            >
              <Card className="hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-white border-gray-200 hover:border-blue-200">
                <div className="h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="flex-grow">
                  <CardTitle className="text-xl font-semibold line-clamp-2 text-gray-900">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-sm text-gray-600 mb-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
