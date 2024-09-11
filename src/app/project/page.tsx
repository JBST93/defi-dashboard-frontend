'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Glance from './Glance';
import CategoryCard from '@/components/CategoryCard';
import TopMovers from './TopMovers';
import { motion } from 'framer-motion';
import Image from 'next/image';

export interface ProjectData {
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
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryStats, setCategoryStats] = useState<{
    [key: string]: {
      averageChange: number;
      highestGainer: { project: string; change: number };
      highestLoser: { project: string; change: number };
    };
  }>({});

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
        calculateCategoryStats(data);
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

  const calculateCategoryStats = (projects: ProjectData[]) => {
    const stats: { [key: string]: any } = {};
    const categories = Array.from(new Set(projects.map((p) => p.type)));

    categories.forEach((category) => {
      const categoryProjects = projects.filter((p) => p.type === category);

      // Calculate average change for all projects in the category
      const averageChange =
        categoryProjects.reduce(
          (sum, p) => sum + parseFloat(p.price_day_delta),
          0
        ) / categoryProjects.length;

      const highestGainer = categoryProjects.reduce(
        (max, p) =>
          parseFloat(p.price_day_delta) > max.change
            ? { project: p.project, change: parseFloat(p.price_day_delta) }
            : max,
        { project: '', change: -Infinity }
      );
      const highestLoser = categoryProjects.reduce(
        (min, p) =>
          parseFloat(p.price_day_delta) < min.change
            ? { project: p.project, change: parseFloat(p.price_day_delta) }
            : min,
        { project: '', change: Infinity }
      );

      stats[category] = {
        averageChange,
        highestGainer,
        highestLoser,
      };
    });

    setCategories(categories);
    setCategoryStats(stats);
  };

  // Sort projects by price_day_delta
  const sortedProjects = useMemo(() => {
    return [...projects].sort(
      (a, b) => parseFloat(b.price_day_delta) - parseFloat(a.price_day_delta)
    );
  }, [projects]);

  const topGainers = useMemo(
    () => sortedProjects.slice(0, 3),
    [sortedProjects]
  );
  const topLosers = useMemo(
    () => sortedProjects.slice(-3).reverse(),
    [sortedProjects]
  );

  const { winner: topBlockchainWinner, loser: topBlockchainLoser } =
    useMemo(() => {
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
    }, [projects]);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200 p-4 sm:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-8 text-left text-brown-900"
        >
          Crypto Projects Overview
        </motion.h1>

        <div className="mb-6 sm:mb-12">
          <TopMovers
            topGainers={topGainers}
            topLosers={topLosers}
            topBlockchainWinner={topBlockchainWinner}
            topBlockchainLoser={topBlockchainLoser}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex flex-wrap justify-left items-center gap-2"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-amber-200">
                <tr>
                  {[
                    'Token',
                    'Project',
                    'Type',
                    'Price',
                    'Day ▲',
                    'Market Cap',
                    'TVL',
                    'Day TVL ▲',
                    'Links',
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-2 sm:p-4 text-left text-brown-800 font-semibold text-xs sm:text-sm whitespace-nowrap"
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
                    <td className="p-2 sm:p-4 text-xs sm:text-sm whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {project.logo && (
                          <Image
                            src={project.logo}
                            alt={`${project.token} logo`}
                            width={24}
                            height={24}
                            className="w-6 h-6 rounded-full"
                          />
                        )}
                        <span>{project.token || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm whitespace-nowrap">
                      {project.project}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm whitespace-nowrap">
                      {project.type}
                    </td>
                    <td className="p-2 sm:p-4 font-semibold text-xs sm:text-sm whitespace-nowrap">
                      {formatUSD(project.price)}
                    </td>
                    <td
                      className={`p-2 sm:p-4 text-xs sm:text-sm whitespace-nowrap ${
                        parseFloat(project.price_day_delta) >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {parseFloat(project.price_day_delta) >= 0 ? '▲' : '▼'}{' '}
                      {Math.abs(parseFloat(project.price_day_delta)).toFixed(2)}
                      %
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm whitespace-nowrap">
                      {project.marketCap}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm whitespace-nowrap">
                      {parseFloat(project.tvl) === 0 ? '-' : project.tvl}
                    </td>
                    <td className="p-2 sm:p-4 text-xs sm:text-sm whitespace-nowrap">
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
                    <td className="p-2 sm:p-4 text-xs sm:text-sm whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Link
                          href={`/yield?search=${encodeURIComponent(
                            project.token
                          )}`}
                          className="text-blue-600 hover:underline"
                        >
                          Yields
                        </Link>
                        <span>•</span>
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
                            <span>•</span>
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
        </motion.div>
      </div>
    </motion.div>
  );
}
