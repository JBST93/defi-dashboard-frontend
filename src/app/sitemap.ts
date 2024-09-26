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

  // Define your static routes
  const routes = [
    '',
    '/project',
    '/yield',
    '/yield/stablecoin',
    '/yield/ethereum',
    '/stablecoin',
    '/governance',
  ];

  // Create sitemap entries for static routes
  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Create sitemap entries for dynamic project pages
  const projectPages = projects
    .filter((project: any) => {
      const slug = project.project; // Use the 'project' field as the slug
      const isValid = slug && typeof slug === 'string' && slug.trim() !== '';
      console.log(`Project slug: ${slug}, Valid: ${isValid}`);
      return isValid;
    })
    .map((project: any) => {
      const slug = project.project; // Use the 'project' field as the slug
      return {
        url: `${baseUrl}/project/${encodeURIComponent(
          slug.toLowerCase().replace(/\s+/g, '-')
        )}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      };
    });

  return [...staticPages, ...projectPages];
}
