import { MetadataRoute } from 'next';

// Protocol slugs for future protocol pages
const PROTOCOL_SLUGS = [
  'aave',
  'morpho', 
  'curve',
  'compound',
  'maker',
  'spark',
  'pendle',
  'gearbox',
  'uniswap',
  'stargate'
];

// Type definitions for better type safety
interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

interface BlogPost {
  slug: string;
  lastModified: Date;
  priority: number;
}

async function getProjects() {
  try {
    const res = await fetch(
      'https://defi-dashboard-99d015fc546e.herokuapp.com/api/projects',
      { next: { revalidate: 3600 } } // Revalidate every hour
    );
    if (!res.ok) {
      throw new Error('Failed to fetch project data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
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
    
    const articles: BlogPost[] = [];
    
    for (const dir of articleDirs) {
      try {
        const pagePath = path.join(articlesDir, dir, 'page.tsx');
        
        if (fs.existsSync(pagePath)) {
          // Get file stats for actual modification date
          const stats = fs.statSync(pagePath);
          const lastModified = stats.mtime;
          
          // Read the page file to extract metadata
          const pageContent = fs.readFileSync(pagePath, 'utf8');
          
          // Extract date from the content (look for dateTime or datePublished)
          let articleDate = lastModified;
          
          // Try to find date in the content
          const dateMatch =
            pageContent.match(/dateTime="([^"]+)"/) ||
            pageContent.match(/datePublished":\s*"([^"]+)"/) ||
            pageContent.match(/dateModified":\s*"([^"]+)"/);
          
          if (dateMatch) {
            const parsedDate = new Date(dateMatch[1]);
            if (!isNaN(parsedDate.getTime())) {
              articleDate = parsedDate;
            }
          }
          
          articles.push({
            slug: dir,
            lastModified: articleDate,
            priority: 0.8, // Blog articles get priority 0.8 as requested
          });
        }
      } catch (error) {
        console.warn(`Error reading article ${dir}:`, error);
      }
    }
    
    // Sort by last modified date (newest first)
    return articles.sort(
      (a, b) => b.lastModified.getTime() - a.lastModified.getTime()
    );
    
  } catch (error) {
    console.error('Error getting blog posts:', error);
    // Return empty array on error to ensure sitemap still works
    return [];
  }
}

function getStaticRoutes(baseUrl: string): SitemapEntry[] {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Homepage gets highest priority
    },
    {
      url: `${baseUrl}/yield/stablecoin`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9, // Stablecoin yields - high priority
    },
    {
      url: `${baseUrl}/stablecoins`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/governance`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}

function getProtocolPages(baseUrl: string): SitemapEntry[] {
  return PROTOCOL_SLUGS.map((slug) => ({
    url: `${baseUrl}/protocols/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}

function getBlogPages(baseUrl: string, blogPosts: BlogPost[]): SitemapEntry[] {
  return blogPosts.map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'weekly',
    priority: post.priority,
  }));
}

function getProjectPages(baseUrl: string, projects: any[]): SitemapEntry[] {
  return projects
    .filter((project: any) => {
      const slug = project.project;
      return slug && typeof slug === 'string' && slug.trim() !== '';
    })
    .map((project: any) => {
      const slug = project.project;
      return {
        url: `${baseUrl}/project/${encodeURIComponent(
          slug.toLowerCase().replace(/\s+/g, '-')
        )}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      };
    });
}

function getYieldPages(baseUrl: string, projects: any[]): SitemapEntry[] {
  return projects
    .filter((project: any) => project.project)
    .map((project: any) => ({
      url: `${baseUrl}/yield/${encodeURIComponent(
        project.project.toLowerCase().replace(/\s+/g, '-')
      )}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.tokendataview.com';
  
  try {
    // Fetch data in parallel for better performance
    const [projects, blogPosts] = await Promise.all([
      getProjects(),
      getBlogPosts()
    ]);
    
    // Build all sitemap sections
    const staticRoutes = getStaticRoutes(baseUrl);
    const protocolPages = getProtocolPages(baseUrl);
    const blogPages = getBlogPages(baseUrl, blogPosts);
    const projectPages = getProjectPages(baseUrl, projects);
    const yieldPages = getYieldPages(baseUrl, projects);
    
    // Combine all routes
    const allRoutes = [
      ...staticRoutes,
      ...protocolPages,
      ...blogPages,
      ...projectPages,
      ...yieldPages,
    ];
    
    // Log sitemap generation info
    console.log(`Generated sitemap with ${allRoutes.length} URLs:`);
    console.log(`- Static routes: ${staticRoutes.length}`);
    console.log(`- Protocol pages: ${protocolPages.length}`);
    console.log(`- Blog articles: ${blogPages.length}`);
    console.log(`- Project pages: ${projectPages.length}`);
    console.log(`- Yield pages: ${yieldPages.length}`);
    
    return allRoutes;
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Return minimal sitemap on error to ensure site remains accessible
    return getStaticRoutes(baseUrl);
  }
}
