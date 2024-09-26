import { Suspense } from 'react';
import StablecoinTable from './StablecoinTable';
import Link from 'next/link';

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
  const allProjects = await res.json();
  // Filter projects to only include stablecoins
  return allProjects.filter(
    (project: { type: string }) => project.type.toLowerCase() === 'stablecoin'
  );
}

export default async function ProjectsPage() {
  const projects = await getProjects();

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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-left text-brown-900">
          Stablecoin Market Overview
        </h1>

        <Link
          href="https://www.tokendataview.com/yield/stablecoin"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">
                  Earn Yield on Stablecoins
                </h2>
                <p className="text-lg">
                  Explore stablecoin yield opportunities on TokenDataView
                </p>
              </div>
              <button className="bg-white text-purple-600 font-bold py-2 px-4 rounded-full hover:bg-purple-100 transition-colors duration-300">
                Explore Yields
              </button>
            </div>
          </div>
        </Link>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="max-w mx-auto">
            <StablecoinTable
              initialProjects={projects}
              filter=""
              searchTerm=""
            />
          </div>
        </Suspense>

        {/* Add FAQ section */}
        <section className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-brown-900">
            Stablecoin FAQ
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What is a stablecoin?
              </h3>
              <p>
                A stablecoin is a type of cryptocurrency designed to maintain a
                stable value relative to a reference asset, typically a fiat
                currency like the US dollar. Unlike volatile cryptocurrencies
                such as Bitcoin or Ethereum, stablecoins aim to provide price
                stability, making them useful for everyday transactions and as a
                store of value.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                How do stablecoins maintain their value?
              </h3>
              <p>
                Stablecoins use various mechanisms to maintain their peg to the
                reference asset:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>
                  Fiat-collateralized: Backed by reserves of the pegged currency
                </li>
                <li>Crypto-collateralized: Backed by other cryptocurrencies</li>
                <li>
                  Algorithmic: Use smart contracts to adjust supply and maintain
                  the peg
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                What are the benefits of using stablecoins?
              </h3>
              <p>Stablecoins offer several advantages:</p>
              <ul className="list-disc pl-6 mt-2">
                <li>Price stability in volatile crypto markets</li>
                <li>Fast and low-cost international transfers</li>
                <li>
                  Access to cryptocurrency markets without exposure to high
                  volatility
                </li>
                <li>Potential for earning yield through lending or staking</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Are there risks associated with stablecoins?
              </h3>
              <p>
                While stablecoins aim to be stable, they still carry some risks:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Counterparty risk for centralized stablecoins</li>
                <li>Potential for de-pegging in extreme market conditions</li>
                <li>Regulatory uncertainty in some jurisdictions</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
