import { Suspense } from 'react';
import ProjectTable from './ProjectTable';
import ProjectOverview from './ProjectOverview';
import Glance from './Glance';

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
  const sortedProjects = [...projects].sort(
    (a, b) => b.price_day_delta - a.price_day_delta
  );
  const topGainers = sortedProjects.slice(0, 3);
  const topLosers = sortedProjects.slice(-3).reverse();

  const topGainersLosers = {
    gainers: topGainers.map((project) => ({
      name: project.project,
      symbol: project.token,
      price: project.price,
      change24h: project.price_day_delta,
      logo: project.logo,
    })),
    losers: topLosers.map((project) => ({
      name: project.project,
      symbol: project.token,
      price: project.price,
      change24h: project.price_day_delta,
      logo: project.logo,
    })),
  };

  const totalMarketCap = projects.reduce(
    (sum: number, project: { marketCap: number }) => sum + project.marketCap,
    0
  );
  const btcMarketCap =
    projects.find((p: { token: string }) => p.token === 'BTC')?.marketCap || 0;
  const ethMarketCap =
    projects.find((p: { token: string }) => p.token === 'ETH')?.marketCap || 0;
  const stablecoinMarketCap = projects
    .filter((p: { type: string }) => p.type.toLowerCase() === 'stablecoin')
    .reduce(
      (sum: number, project: { marketCap: number }) => sum + project.marketCap,
      0
    );

  const btcDominance = btcMarketCap / totalMarketCap;
  const ethDominance = ethMarketCap / totalMarketCap;
  const stablecoinDominance = stablecoinMarketCap / totalMarketCap;

  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
      <div className="max-w mx-auto">
        <h1 className="text-2xl md:text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-left text-brown-900">
          Crypto Market Overview
        </h1>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="order-2 md:order-none">
              <Glance topGainersLosers={topGainersLosers} />
            </div>
            <div className="order-1 md:order-none">
              <ProjectOverview
                totalMarketCap={totalMarketCap}
                btcDominance={btcDominance}
                ethDominance={ethDominance}
                stablecoinDominance={stablecoinDominance}
              />
            </div>
          </div>
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
