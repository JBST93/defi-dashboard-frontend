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
  const blogPosts = getBlogPosts();
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

// Add this function to get blog posts
function getBlogPosts() {
  // This is a simplified version. You should implement the actual logic to get blog posts.
  return [
    { slug: 'curve-finance-defi-stablecoin-exchange', date: '2023-01-01' },
    { slug: 'what-is-defi', date: '2023-01-02' },
    { slug: 'what-are-stablecoins', date: '2023-01-03' },
    { slug: 'top-defi-projects', date: '2023-01-04' },
    { slug: 'defi-yield-farming', date: '2023-01-05' },
    { slug: 'best-stablecoin-lending-rates', date: '2023-01-06' },
    { slug: 'usdc-vs-usdt-yields-comparison', date: '2023-01-07' },
    { slug: 'aave-lending-protocol-guide', date: '2023-01-08' },
    { slug: 'compound-finance-lending', date: '2023-01-09' },
    { slug: 'defi-lending-risks-and-rewards', date: '2023-01-10' },
  ];
}
