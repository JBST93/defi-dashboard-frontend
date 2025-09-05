import Image from 'next/image';
import Link from 'next/link';

// Import the BlogPost interface
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  content: React.ReactNode;
}

interface BlogPostProps {
  post: BlogPost;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Articles Link */}
        <Link
          href="/articles"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Articles
        </Link>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Hero Image */}
          <div className="h-64 sm:h-80 relative">
            {post.image.endsWith('.svg') ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Article Meta */}
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center text-sm text-gray-600 mb-2 sm:mb-0">
                <span className="font-medium">By {post.author}</span>
                <span className="mx-2">•</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="prose prose-lg max-w-none">{post.content}</div>
        </div>

        {/* Related Articles CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 sm:p-8 text-white">
          <h3 className="text-xl font-bold mb-4">
            Ready to Explore More DeFi Opportunities?
          </h3>
          <p className="text-blue-100 mb-6">
            Discover current yield opportunities and find the best rates for
            your assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/yield/stablecoin"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors"
            >
              View Stablecoin Yields
            </Link>
            <Link
              href="/yield"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-md hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              View All Yields
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
