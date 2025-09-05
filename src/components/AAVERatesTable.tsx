'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ChainLogo from './ChainLogo';

interface AAVERate {
  id: number;
  market: string;
  project: string;
  yield_rate_base: string;
  yield_rate_reward?: string;
  tvl?: number;
  chain: string;
  information?: string;
  humanized_timestamp?: string;
}

interface AAVERatesTableProps {
  className?: string;
}

export default function AAVERatesTable({
  className = '',
}: AAVERatesTableProps) {
  const [rates, setRates] = useState<AAVERate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'apy' | 'tvl' | 'chain'>('apy');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const fetchAAVERates = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        'https://defi-dashboard-99d015fc546e.herokuapp.com/api/yield_rates'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch AAVE rates');
      }

      const allData = await response.json();

      // Filter for AAVE protocol only
      const aaveData = allData.filter(
        (item: AAVERate) =>
          item.project.toLowerCase().includes('aave') &&
          ['USDC', 'USDT', 'DAI'].includes(item.market) &&
          ['Ethereum', 'Base', 'Arbitrum', 'Optimism'].includes(item.chain)
      );

      setRates(aaveData);
      if (aaveData.length > 0 && aaveData[0].humanized_timestamp) {
        setLastUpdated(aaveData[0].humanized_timestamp);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching AAVE rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAAVERates();

    // Auto-refresh every 15 minutes
    const interval = setInterval(fetchAAVERates, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getGasCostLevel = (chain: string): string => {
    switch (chain) {
      case 'Ethereum':
        return 'High';
      case 'Base':
        return 'Low';
      case 'Arbitrum':
        return 'Low';
      case 'Optimism':
        return 'Low';
      default:
        return 'Medium';
    }
  };

  const getGasCostColor = (level: string): string => {
    switch (level) {
      case 'High':
        return 'text-red-600 bg-red-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const sortedRates = [...rates].sort((a, b) => {
    let aValue: number | string = 0;
    let bValue: number | string = 0;

    if (sortBy === 'apy') {
      aValue =
        (parseFloat(a.yield_rate_base) || 0) +
        (parseFloat(a.yield_rate_reward || '0') || 0);
      bValue =
        (parseFloat(b.yield_rate_base) || 0) +
        (parseFloat(b.yield_rate_reward || '0') || 0);
    } else if (sortBy === 'tvl') {
      aValue = a.tvl || 0;
      bValue = b.tvl || 0;
    } else if (sortBy === 'chain') {
      aValue = a.chain;
      bValue = b.chain;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return sortDirection === 'asc'
      ? aValue.toString().localeCompare(bValue.toString())
      : bValue.toString().localeCompare(aValue.toString());
  });

  const handleSort = (column: 'apy' | 'tvl' | 'chain') => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Loading AAVE rates...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-red-600 mb-4">Failed to load AAVE rates</p>
          <button
            onClick={fetchAAVERates}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">
            Current AAVE Lending Rates
          </h3>
          {lastUpdated && (
            <p className="text-sm text-gray-500">Last updated: {lastUpdated}</p>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Data updates every 30 minutes. Rates shown are for informational
          purposes.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('chain')}
              >
                Network{' '}
                {sortBy === 'chain' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asset
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('apy')}
              >
                Current APY{' '}
                {sortBy === 'apy' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('tvl')}
              >
                TVL {sortBy === 'tvl' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gas Cost
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedRates.map((rate) => {
              const totalAPY =
                (parseFloat(rate.yield_rate_base) || 0) +
                (parseFloat(rate.yield_rate_reward || '0') || 0);
              const gasLevel = getGasCostLevel(rate.chain);

              return (
                <tr
                  key={`${rate.chain}-${rate.market}`}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ChainLogo
                        chain={rate.chain}
                        size={20}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {rate.chain}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{rate.market}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-green-600">
                      {totalAPY.toFixed(2)}%
                    </span>
                    {rate.yield_rate_reward &&
                      parseFloat(rate.yield_rate_reward) > 0 && (
                        <div className="text-xs text-gray-500">
                          Base: {rate.yield_rate_base}% + Reward:{' '}
                          {parseFloat(rate.yield_rate_reward).toFixed(2)}%
                        </div>
                      )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      $
                      {rate.tvl ? (rate.tvl / 1000000).toFixed(1) + 'M' : 'N/A'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGasCostColor(
                        gasLevel
                      )}`}
                    >
                      {gasLevel}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Link
                      href={`/yield/stablecoin?chain=${encodeURIComponent(
                        rate.chain
                      )}&project=aave&search=${encodeURIComponent(
                        rate.market
                      )}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedRates.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No AAVE rates available at the moment
        </div>
      )}
    </div>
  );
}
