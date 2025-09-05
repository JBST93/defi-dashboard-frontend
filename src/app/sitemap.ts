import { MetadataRoute } from 'next';

async function getProjects() {
  const res = await fetch(
    'https://defi-dashboard-99d015fc546e.herokuapp.com/api/projects',
    { next: { revalidate: 3600 } } // Revalidate every hour
  );
  if (!res.ok) {
    throw new Error('Failed to fetch project data');
  }
  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.tokendataview.com';

  // Fetch your projects
  let projects;
  try {
    projects = await getProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
    projects = [];
  }

  // Define your static routes with proper priorities
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0, // Homepage gets highest priority
    },

    {
      url: `${baseUrl}/yield/stablecoin`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9, // Stablecoin yields - high priority
    },
    {
      url: `${baseUrl}/stablecoins`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/governance`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Create sitemap entries for dynamic project pages
  const projectPages = projects
    .filter((project: any) => {
      const slug = project.project;
      const isValid = slug && typeof slug === 'string' && slug.trim() !== '';
      return isValid;
    })
    .map((project: any) => {
      const slug = project.project;
      return {
        url: `${baseUrl}/project/${encodeURIComponent(
          slug.toLowerCase().replace(/\s+/g, '-')
        )}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      };
    });

  // Create sitemap entries for blog posts
  const blogPosts = await getBlogPosts();
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Create sitemap entries for dynamic yield pages
  const yieldPages = projects
    .filter((project: any) => project.project)
    .map((project: any) => ({
      url: `${baseUrl}/yield/${encodeURIComponent(
        project.project.toLowerCase().replace(/\s+/g, '-')
      )}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));

  // Add FAQ and help pages
  const helpPages = [
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [
    ...staticRoutes,
    ...projectPages,
    ...blogPages,
    ...yieldPages,
    ...helpPages,
  ];
}

// Add this function to get blog posts dynamically
async function getBlogPosts() {
  try {
    // Import the file system module
    const fs = await import('fs');
    const path = await import('path');

    const articlesDir = path.join(process.cwd(), 'src/app/articles');

    // Check if articles directory exists
    if (!fs.existsSync(articlesDir)) {
      console.warn('Articles directory not found');
      return [];
    }

    // Read all directories in the articles folder
    const articleDirs = fs
      .readdirSync(articlesDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Extract metadata from each article
    const articles = [];

    for (const dir of articleDirs) {
      try {
        const pagePath = path.join(articlesDir, dir, 'page.tsx');

        if (fs.existsSync(pagePath)) {
          // Read the page file to extract metadata
          const pageContent = fs.readFileSync(pagePath, 'utf8');

          // Extract date from the file content (look for dateTime or datePublished)
          let articleDate = new Date().toISOString().split('T')[0]; // Default to today

          // Try to find date in the content
          const dateMatch =
            pageContent.match(/dateTime="([^"]+)"/) ||
            pageContent.match(/datePublished":\s*"([^"]+)"/) ||
            pageContent.match(/dateModified":\s*"([^"]+)"/);

          if (dateMatch) {
            articleDate = dateMatch[1];
          }

          articles.push({
            slug: dir,
            date: articleDate,
          });
        }
      } catch (error) {
        console.warn(`Error reading article ${dir}:`, error);
      }
    }

    // Sort by date (newest first)
    return articles.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error('Error getting blog posts:', error);
    // Fallback to hardcoded list if file system access fails
    return [
      { slug: 'aave-protocol-complete-guide', date: '2024-12-19' },
      { slug: 'curve-finance-defi-stablecoin-exchange', date: '2024-12-19' },
      { slug: 'defi-lending-protocols-earn-interest', date: '2024-12-19' },
      { slug: 'stablecoin-yield-farming', date: '2024-12-19' },
      { slug: 'what-are-stablecoins', date: '2024-12-19' },
      { slug: '1inch-dex-aggregator-best-rates', date: '2024-12-19' },
      { slug: 'compound-finance-defi-lending-pioneer', date: '2024-12-19' },
      { slug: 'stargate-finance-cross-chain-bridge', date: '2024-12-19' },
      { slug: 'makerdao-dai-stablecoin-ecosystem', date: '2024-12-19' },
      { slug: 'pendle-finance-yield-trading-protocol', date: '2024-12-19' },
      { slug: 'gearbox-protocol-leveraged-defi', date: '2024-12-19' },
      { slug: 'spark-lend-aave-fork-optimized', date: '2024-12-19' },
    ];
  }
}
