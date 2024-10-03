import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import the BlogPost interface
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  content: React.ReactNode;
}

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/articles"
          className="text-brown-600 hover:text-brown-800 mb-4 inline-block"
        >
          &larr; Back to Blog
        </Link>
        <Card className="overflow-hidden">
          <div className="h-64 sm:h-80 relative">
            <Image
              src={post.image}
              alt={post.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold">
              {post.title}
            </CardTitle>
            <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
              <span>{post.date}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">{post.excerpt}</p>
            {/* Add the full blog post content here */}
            {post.content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
