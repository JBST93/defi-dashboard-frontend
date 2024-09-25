'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface YieldData {
  id: number;
  index: number;
  market: string;
  project: string;
  yield_rate_base: string;
  yield_rate_reward?: string;
  tvl?: number;
  chain: string;
}

interface YieldTableProps {
  yieldData: YieldData[];
  searchTerm: string;
  selectedChains: string[];
  selectedProjects: string[];
  isLoading: boolean;
  isSingleAssetOnly: boolean; // Add this line
}

export default function YieldTable({
  yieldData,
  searchTerm,
  selectedChains,
  selectedProjects,
  isLoading,
  isSingleAssetOnly, // Add this line
}: YieldTableProps) {
  const [sortColumn, setSortColumn] = useState<
    'apy' | 'tvl' | 'yield_rate_base' | 'yield_rate_reward' | null
  >(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 50;

  const filteredData = yieldData.filter((item) => {
    const matchesSearch = item.market
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesChain =
      selectedChains.length === 0 || selectedChains.includes(item.chain);
    const matchesProject =
      selectedProjects.length === 0 || selectedProjects.includes(item.project);
    const matchesSingleAsset = !isSingleAssetOnly || !item.market.includes('/');
    return (
      matchesSearch && matchesChain && matchesProject && matchesSingleAsset
    );
  });

  const handleSort = (
    column: 'apy' | 'tvl' | 'yield_rate_base' | 'yield_rate_reward'
  ) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortColumn === null) return 0;
    if (sortColumn === 'apy') {
      const aValue =
        (parseFloat(a.yield_rate_base) || 0) +
        (parseFloat(a.yield_rate_reward || '0') || 0);
      const bValue =
        (parseFloat(b.yield_rate_base) || 0) +
        (parseFloat(b.yield_rate_reward || '0') || 0);
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    const aValue = parseFloat(a[sortColumn] as string) || 0;
    const bValue = parseFloat(b[sortColumn] as string) || 0;
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (isLoading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-amber-200 sticky top-0">
          <tr>
            <th className="sticky left-0 z-10 bg-amber-200 p-2 text-xs sm:text-sm">
              #
            </th>
            <th className="p-2 text-xs sm:text-sm">Name</th>
            <th className="p-2 text-xs sm:text-sm">Project</th>
            <th
              className="p-2 cursor-pointer text-xs sm:text-sm"
              onClick={() => handleSort('apy')}
            >
              APY{' '}
              {sortColumn === 'apy' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="p-2 cursor-pointer text-xs sm:text-sm"
              onClick={() => handleSort('tvl')}
            >
              TVL{' '}
              {sortColumn === 'tvl' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-2 text-xs sm:text-sm">Chain</th>
            <th
              className="p-2 text-xs sm:text-sm"
              onClick={() => handleSort('yield_rate_base')}
            >
              Base APY
              {sortColumn === 'yield_rate_base' &&
                (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="p-2 text-xs sm:text-sm"
              onClick={() => handleSort('yield_rate_reward')}
            >
              Reward APY
              {sortColumn === 'yield_rate_reward' &&
                (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr
              key={item.id}
              className={item.index % 2 === 0 ? 'bg-white' : 'bg-amber-50'}
            >
              <td className="sticky left-0 bg-inherit p-2 text-xs sm:text-sm">
                {item.index}
              </td>
              <td className="p-2 text-xs sm:text-sm">{item.market}</td>
              <td className="p-2 text-xs sm:text-sm">
                <Link
                  href={`/project/${encodeURIComponent(
                    item.project.toLowerCase().replace(/\s+/g, '-')
                  )}`}
                  className="text-blue-600 hover:underline"
                >
                  {item.project}
                </Link>
              </td>
              <td className="p-2 text-xs sm:text-sm font-semibold align-right">
                {(
                  (parseFloat(item.yield_rate_base) || 0) +
                  (parseFloat(item.yield_rate_reward || '0') || 0)
                )
                  .toFixed(2)
                  .replace(/^0.00$/, '0.00')}
                %
              </td>
              <td className="p-2 text-xs sm:text-sm text-right">
                ${Math.round(item.tvl || 0).toLocaleString()}
              </td>
              <td className="p-2 text-xs sm:text-sm">{item.chain}</td>
              <td className="p-2 text-xs sm:text-sm">
                {item.yield_rate_base}%
              </td>
              <td className="p-2 text-xs sm:text-sm">
                {item.yield_rate_reward}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 mb-2 sm:mb-0"
        >
          Previous
        </button>
        <span className="mb-2 sm:mb-0">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
