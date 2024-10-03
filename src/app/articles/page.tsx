import Link from 'next/link';
import Image from 'next/image';
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
      const postData = extractPostData(content, folder);
      if (postData) {
        blogPosts.push(postData);
      }
    }
  });

  return blogPosts;
}

function extractPostData(content: string, folder: string): BlogPost | null {
  const fields = ['id', 'title', 'excerpt', 'date', 'author', 'image'] as const;
  const postData = {} as BlogPost;

  for (const field of fields) {
    const regex = new RegExp(`${field}:\\s*['"](.+?)['"]`);
    const match = content.match(regex);
    if (match) {
      postData[field as keyof BlogPost] = match[1];
    } else {
      return null; // If any field is missing, return null
    }
  }

  postData.slug = folder;
  return postData;
}

export default function BlogPage() {
  const blogPosts = getBlogPosts();

  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-left text-brown-900">
          TokenDataView Blog
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              href={`/articles/${post.slug}`}
              key={post.id}
              className="block h-full"
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
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
                  <CardTitle className="text-xl font-semibold line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between">
                  <p className="text-sm text-gray-600 mb-2 line-clamp-3">
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
