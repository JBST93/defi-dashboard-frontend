import { Suspense } from 'react';
import ProjectTable from './ProjectTable';
import ProjectOverview from './ProjectOverview';

async function getProjects() {
  const res = await fetch(
    'https://defi-dashboard-99d015fc546e.herokuapp.com/api/projects',
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch project data');
  }
  return res.json();
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  const totalMarketCap = projects.reduce(
    (sum, project) => sum + project.marketCap,
    0
  );
  const btcMarketCap = projects.find((p) => p.token === 'BTC')?.marketCap || 0;
  const ethMarketCap = projects.find((p) => p.token === 'ETH')?.marketCap || 0;
  const stablecoinMarketCap = projects
    .filter((p) => p.type.toLowerCase() === 'stablecoin')
    .reduce((sum, project) => sum + project.marketCap, 0);

  const btcDominance = btcMarketCap / totalMarketCap;
  const ethDominance = ethMarketCap / totalMarketCap;
  const stablecoinDominance = stablecoinMarketCap / totalMarketCap;

  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-left text-brown-900 ">
          Crypto Market Overview{' '}
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectOverview
            totalMarketCap={totalMarketCap}
            btcDominance={btcDominance}
            ethDominance={ethDominance}
            stablecoinDominance={stablecoinDominance}
          />
          <div className="max-w mx-auto">
            <ProjectTable
              initialProjects={projects}
              filter=""
              searchTerm=""
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
