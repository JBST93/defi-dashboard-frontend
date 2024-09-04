'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Glance from './Glance';

interface ProjectData {
  type: string;
  price: number;
  token: string;
  price_day_delta: string;
  marketCap: string;
  tvl: string;
  tvl_day_delta: string;
  website: string;
  forum: string;
  project: string;
  logo?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [btcEthChange, setBtcEthChange] = useState({ btc: '0', eth: '0' });

  const totalMarketCapChange = useMemo(() => {
    const validProjects = projects.filter(
      (p) =>
        p.marketCap &&
        p.price &&
        p.price_day_delta &&
        !isNaN(parseFloat(p.price_day_delta))
    );

    const totalChange = validProjects.reduce((acc, project) => {
      const marketCap = parseFloat(project.marketCap.replace(/[^0-9.-]+/g, ''));
      const changePercent = parseFloat(project.price_day_delta) / 100;
      return acc + marketCap * changePercent;
    }, 0);

    const totalMarketCap = validProjects.reduce((acc, project) => {
      return acc + parseFloat(project.marketCap.replace(/[^0-9.-]+/g, ''));
    }, 0);

    const changePercentage = (totalChange / totalMarketCap) * 100;

    const btc = projects.find((p) => p.token === 'BTC');
    const eth = projects.find((p) => p.token === 'ETH');

    setBtcEthChange({
      btc: btc ? btc.price_day_delta : '0',
      eth: eth ? eth.price_day_delta : '0',
    });

    return {
      changeUSD: totalChange,
      changePercentage: changePercentage,
    };
  }, [projects]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          'https://www.tokendataview.com/api/projects'
        );
        const data = await response.json();

        setProjects(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching project data:', error);
        setError('Failed to fetch project data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const filtered = projects.filter((p) => {
      const matchesFilter =
        !activeFilter ||
        p.type.toLowerCase().includes(activeFilter.toLowerCase());
      const matchesSearch =
        !searchTerm ||
        p.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.type.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    setFilteredProjects(filtered);
  }, [activeFilter, projects, searchTerm]);

  const getTopBlockchainMovers = () => {
    const blockchains = projects.filter(
      (p) => p.type.toLowerCase() === 'blockchain'
    );
    const sorted = [...blockchains].sort(
      (a, b) => parseFloat(b.price_day_delta) - parseFloat(a.price_day_delta)
    );
    return {
      winner: sorted[0],
      loser: sorted[sorted.length - 1],
    };
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-semibold text-brown-800">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl font-semibold text-red-600">
        {error}
      </div>
    );
  }

  // Sort projects by price_day_delta
  const sortedProjects = [...projects].sort(
    (a, b) => parseFloat(b.price_day_delta) - parseFloat(a.price_day_delta)
  );
  const topGainers = sortedProjects.slice(0, 3);
  const topLosers = sortedProjects.slice(-3).reverse();

  const { winner: topBlockchainWinner, loser: topBlockchainLoser } =
    getTopBlockchainMovers();

  const renderProjectCard = (project: ProjectData, isGainer: boolean) => (
    <div
      key={project.project}
      className={`bg-white rounded-lg shadow-md p-3 flex justify-between items-center ${
        isGainer ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
      }`}
    >
      <div>
        <h3 className="font-semibold text-sm mb-1">{project.project}</h3>
        <p className="text-xs text-gray-600">{formatUSD(project.price)}</p>
      </div>
      <p
        className={`text-sm font-bold ${
          isGainer ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {parseFloat(project.price_day_delta) > 0 ? '+' : ''}
        {project.price_day_delta}%
      </p>
    </div>
  );

  const formatUSD = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const filterButtons = [
    { label: 'All', value: null },
    { label: 'Blockchain', value: 'blockchain' },
    { label: 'Lending', value: 'lending' },
    { label: 'Stablecoin', value: 'stablecoin' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 text-center text-brown-900 retro-shadow">
          Crypto Projects Overview
        </h1>

        <Glance data={btcEthChange} />

        <div className="mt-4 mb-6 sm:mb-12 p-4 bg-gray-100 border-2 border-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-sm sm:text-base text-center text-gray-800 font-sans">
            Navigate the world of digital assets with our comprehensive
            directory. Explore real-time data on your favorite cryptocurrencies,
            compare market performance, and stay ahead with the latest updates.
          </p>
        </div>

        <div className="mb-6 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-brown-800">
            Top Movers (24h)
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-400">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              <div className="p-4">
                <h3 className="text-md font-semibold mb-2 text-green-700">
                  Top Gainers
                </h3>
                <div className="space-y-2">
                  {topGainers.map((project) =>
                    renderProjectCard(project, true)
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-md font-semibold mb-2 text-red-700">
                  Top Losers
                </h3>
                <div className="space-y-2">
                  {topLosers.map((project) =>
                    renderProjectCard(project, false)
                  )}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-md font-semibold mb-2 text-brown-700">
                  Top Blockchain Movers
                </h3>
                <div className="space-y-2">
                  {renderProjectCard(topBlockchainWinner, true)}
                  {renderProjectCard(topBlockchainLoser, false)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap justify-left items-center gap-2">
          <input
            type="text"
            placeholder="Search project, token, or type"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 text-sm border-2 border-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          />
          {filterButtons.map((button) => (
            <button
              key={button.label}
              onClick={() => setActiveFilter(button.value)}
              className={`px-4 py-2 text-sm font-medium transition-colors border-2 border-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:translate-x-[1px] ${
                activeFilter === button.value
                  ? 'bg-gray-200 border-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-amber-200">
                <tr>
                  {[
                    'Token',
                    'Project',
                    'Type',
                    'Price',
                    '24H Change',
                    'Market Cap',
                    'TVL',
                    '24H TVL Change',
                    'Links',
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-2 sm:p-4 text-left text-brown-800 font-semibold text-xs sm:text-sm"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project, index) => (
                  <tr
                    key={index}
                    className={
                      index % 2 === 0
                        ? 'bg-amber-50'
                        : 'bg-white hover:bg-amber-100 transition-colors duration-150'
                    }
                  >
                    <td className="p-2 sm:p-4 text-xs sm:text-sm">
                      <div className="flex items-center space-x-2">
                        {project.logo && (
                          <img
                            src={project.logo}
                            alt={`${project.token} logo`}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                        )}
                        {project.token || 'N/A'}
                      </div>
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm">
                      {project.project}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm">
                      {project.type}
                    </td>
                    <td className="p-2 sm:p-4 font-semibold text-xs sm:text-sm">
                      {formatUSD(project.price)}
                    </td>
                    <td
                      className={`p-2 sm:p-4 text-xs sm:text-sm ${
                        parseFloat(project.price_day_delta) >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {parseFloat(project.price_day_delta) >= 0 ? '▲' : '▼'}{' '}
                      {Math.abs(parseFloat(project.price_day_delta)).toFixed(2)}
                      %
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm">
                      {project.marketCap}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm">
                      {parseFloat(project.tvl) === 0 ? '-' : project.tvl}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm">
                      {parseFloat(project.tvl) === 0 ? (
                        '-'
                      ) : (
                        <span
                          className={`${
                            parseFloat(project.tvl_day_delta) >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {parseFloat(project.tvl_day_delta) >= 0 ? '▲' : '▼'}{' '}
                          {Math.abs(parseFloat(project.tvl_day_delta))}%
                        </span>
                      )}
                    </td>

                    <td className="p-2 sm:p-4 text-xs sm:text-sm">
                      <div className="flex flex-col sm:flex-row sm:space-x-2">
                        <Link
                          href={`/yield?search=${encodeURIComponent(
                            project.token
                          )}`}
                          className="text-blue-600 hover:underline"
                        >
                          Yields
                        </Link>
                        <span className="hidden sm:inline">•</span>
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Website
                        </a>
                        {project.forum && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <a
                              href={project.forum}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Forum
                            </a>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
