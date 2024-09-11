import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import YieldFilters from './YieldFilters';

interface YieldData {
  id: number;
  index: number;
  market: string;
  project: string;
  yield_rate_base: number;
  tvl: number;
  chain: string;
}

interface YieldTableProps {
  yieldData: YieldData[];
  isLoading: boolean;
}

export default function YieldTable({
  yieldData,
  searchTerm,
  selectedChains,
  isLoading,
}: YieldTableProps) {
  const [sortColumn, setSortColumn] = useState<
    'yield_rate_base' | 'tvl' | null
  >(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedData = useMemo(() => {
    let filtered = yieldData.filter((item) => {
      const matchesSearch = item.market
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesChain =
        selectedChains.length === 0 || selectedChains.includes(item.chain);
      return matchesSearch && matchesChain;
    });

    if (sortColumn) {
      filtered.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [yieldData, searchTerm, selectedChains, sortColumn, sortDirection]);

  const handleSort = (column: 'yield_rate_base' | 'tvl') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  if (isLoading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-amber-200 sticky top-0">
          <tr>
            <th className="p-2 text-xs sm:text-sm">#</th>
            <th className="p-2 text-xs sm:text-sm">Name</th>
            <th className="p-2 text-xs sm:text-sm">Project</th>
            <th
              className="p-2 cursor-pointer text-xs sm:text-sm"
              onClick={() => handleSort('yield_rate_base')}
            >
              APY{' '}
              {sortColumn === 'yield_rate_base' &&
                (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th
              className="p-2 cursor-pointer text-xs sm:text-sm"
              onClick={() => handleSort('tvl')}
            >
              TVL{' '}
              {sortColumn === 'tvl' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-2 text-xs sm:text-sm">Chain</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((item) => (
            <tr
              key={item.id}
              className="bg-white"
            >
              <td className="p-2 text-xs sm:text-sm">{item.index}</td>
              <td className="p-2 text-xs sm:text-sm">{item.market}</td>
              <td className="p-2 text-xs sm:text-sm">{item.project}</td>
              <td className="p-2 text-xs sm:text-sm">
                {item.yield_rate_base.toFixed(2)}%
              </td>
              <td className="p-2 text-xs sm:text-sm">
                ${item.tvl.toLocaleString()}
              </td>
              <td className="p-2 text-xs sm:text-sm">{item.chain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
