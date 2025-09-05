'use client';

import { useState, useEffect, SetStateAction } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import YieldTable from '../YieldTable';
import YieldFilters from '@/components/YieldFilters';
import { Suspense } from 'react';
import { yieldRatesStablecoin } from '@/lib/api';
import { formatNumber } from '@/lib/utils';

interface YieldItem {
  id: number;
  project: string;
  chain: string;
  market: string;
  apy: number;
  yield_rate_base: string;
  tvl: number;
  humanized_timestamp: string;
}

interface HighlightCard {
  project: string;
  chain: string;
  asset: string;
  apy: number;
  tvl: number;
}

function YieldPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [yieldData, setYieldData] = useState<(YieldItem & { index: number })[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );
  const [selectedChains, setSelectedChains] = useState<string[]>(
    searchParams.get('chain') ? [searchParams.get('chain')!] : []
  );
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [selectedStablecoins, setSelectedStablecoins] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSingleAssetOnly, setIsSingleAssetOnly] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await yieldRatesStablecoin();
        console.log('Fetched yield data:', data);
        const indexedData = data.map((item: YieldItem, index: number) => ({
          ...item,
          index: index + 1,
        }));
        setYieldData(indexedData);
        // Use the API's timestamp from the first item (all items should have similar timestamps)
        if (indexedData.length > 0) {
          setLastUpdated(indexedData[0].humanized_timestamp);
        }
        setIsLoading(false);

        // Set initial selections for chains, projects, and stablecoins
        const uniqueChains = Array.from(
          new Set(indexedData.map((item: YieldItem) => item.chain))
        ) as string[];
        const uniqueProjects = Array.from(
          new Set(indexedData.map((item: YieldItem) => item.project))
        ) as string[];
        const uniqueStablecoins = Array.from(
          new Set(indexedData.map((item: YieldItem) => item.market))
        ) as string[];
        setSelectedChains(uniqueChains);
        setSelectedProjects(uniqueProjects);
        setSelectedStablecoins(uniqueStablecoins); // All stablecoins selected by default
      } catch (error) {
        console.error('Error fetching yield data:', error);
        setYieldData([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const uniqueChains = Array.from(new Set(yieldData.map((item) => item.chain)));
  const uniqueProjects = Array.from(
    new Set(yieldData.map((item) => item.project))
  );
  const uniqueStablecoins = Array.from(
    new Set(yieldData.map((item) => item.market))
  );

  const updateURLParams = (search: string, chain: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (chain) params.set('chain', chain);
    router.push(`/yield/stablecoin?${params.toString()}`);
  };

  const setSearchTermAndUpdateURL = (value: string) => {
    setSearchTerm(value);
    updateURLParams(value, selectedChains[0] || '');
  };

  const setSelectedChainsAndUpdateURL = (
    chainsOrUpdater: SetStateAction<string[]>
  ) => {
    setSelectedChains(chainsOrUpdater);
    const newChains =
      typeof chainsOrUpdater === 'function'
        ? chainsOrUpdater(selectedChains)
        : chainsOrUpdater;
    updateURLParams(searchTerm, newChains[0] || '');
  };

  const setSelectedProjectsAndUpdateURL = (
    projectsOrUpdater: SetStateAction<string[]>
  ) => {
    setSelectedProjects(projectsOrUpdater);
    // No need to update URL params for projects, as it's not included in the URL
  };

  const setSelectedStablecoinsAndUpdateURL = (
    stablecoinsOrUpdater: SetStateAction<string[]>
  ) => {
    setSelectedStablecoins(stablecoinsOrUpdater);
    // No need to update URL params for stablecoins, as it's not included in the URL
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedChains(uniqueChains);
    setSelectedProjects(uniqueProjects);
    setSelectedStablecoins(uniqueStablecoins);
    setIsSingleAssetOnly(false);
    router.push('/yield/stablecoin');
  };

  const getHighlightData = (): HighlightCard[] => {
    // Sort all pools by TVL and get top 4
    const topPools = [...yieldData]
      .sort((a, b) => b.tvl - a.tvl)
      .slice(0, 4)
      .map((pool) => ({
        project: pool.project,
        chain: pool.chain,
        asset: pool.market,
        apy: parseFloat(pool.yield_rate_base),
        tvl: pool.tvl,
      }));

    console.log('Top 4 pools by TVL:', topPools); // Debug log
    return topPools;
  };

  // Add this function to calculate average USDT yield
  const getAverageUsdtYield = (): { avgApy: number; poolCount: number } => {
    const usdtPools = yieldData.filter(
      (item) => item.market === 'USDT' && item.tvl > 50_000_000
    );

    if (usdtPools.length === 0) return { avgApy: 0, poolCount: 0 };

    // Log the pools we're calculating from
    console.log('USDT pools for average:', usdtPools);

    const totalApy = usdtPools.reduce((sum, pool) => {
      const apyValue = parseFloat(pool.yield_rate_base);
      return sum + (isNaN(apyValue) ? 0 : apyValue);
    }, 0);

    const avgApy = totalApy / usdtPools.length;

    return {
      avgApy: isNaN(avgApy) ? 0 : avgApy,
      poolCount: usdtPools.length,
    };
  };

  // Add this function for USDC calculations
  const getAverageUsdcYield = (): { avgApy: number; poolCount: number } => {
    const usdcPools = yieldData.filter(
      (item) => item.market === 'USDC' && item.tvl > 50_000_000
    );

    if (usdcPools.length === 0) return { avgApy: 0, poolCount: 0 };

    const totalApy = usdcPools.reduce((sum, pool) => {
      const apyValue = parseFloat(pool.yield_rate_base);
      return sum + (isNaN(apyValue) ? 0 : apyValue);
    }, 0);

    const avgApy = totalApy / usdcPools.length;

    return {
      avgApy: isNaN(avgApy) ? 0 : avgApy,
      poolCount: usdcPools.length,
    };
  };

  // Add this new function near your other average calculation functions
  const getOverallAverageYield = (): { avgApy: number; poolCount: number } => {
    const significantPools = yieldData.filter((item) => item.tvl > 50_000_000);

    if (significantPools.length === 0) return { avgApy: 0, poolCount: 0 };

    const totalApy = significantPools.reduce((sum, pool) => {
      const apyValue = parseFloat(pool.yield_rate_base);
      return sum + (isNaN(apyValue) ? 0 : apyValue);
    }, 0);

    const avgApy = totalApy / significantPools.length;

    return {
      avgApy: isNaN(avgApy) ? 0 : avgApy,
      poolCount: significantPools.length,
    };
  };

  return (
    <>
      {/* Structured Data for stablecoin yields */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Stablecoin Lending Rates',
            description:
              'Compare the best stablecoin lending rates across DeFi protocols',
            url: 'https://www.tokendataview.com/yield/stablecoin',
            mainEntity: {
              '@type': 'Dataset',
              name: 'Stablecoin Lending Rates',
              description:
                'Real-time data on stablecoin lending rates across DeFi protocols',
              keywords: [
                'stablecoin',
                'lending',
                'APY',
                'USDC',
                'USDT',
                'DeFi',
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
              Stablecoin Lending Opportunities
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the best stablecoin lending rates across DeFi protocols.
              Compare USDC, USDT, and other stablecoin yields in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Top TVL Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getHighlightData().map((highlight, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-base text-gray-900">
                      {highlight.project}
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-50 rounded-full text-xs text-blue-700 font-medium">
                      {highlight.chain}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {highlight.asset}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-600 mb-0.5">APY</span>
                      <span className="text-base font-bold text-green-600">
                        {highlight.apy.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-600 mb-0.5">TVL</span>
                      <span className="text-base font-bold text-gray-800">
                        ${formatNumber(highlight.tvl)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Average Yields Card */}
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-base text-gray-900">
                  Average DeFi Yield
                </h3>
                <span className="px-2 py-0.5 bg-blue-50 rounded-full text-xs text-blue-700 font-medium">
                  All Chains
                </span>
              </div>

              {/* Overall Average Section */}
              <div className="mb-4 border-b border-blue-100 pb-4">
                <div className="text-xl font-bold text-gray-900 mb-2">
                  Overall Markets
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center bg-blue-50/50 rounded p-2">
                    <span className="text-sm text-gray-700">Average APY</span>
                    <span className="text-base font-bold text-green-600">
                      {getOverallAverageYield().avgApy.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-blue-50/50 rounded p-2">
                    <span className="text-sm text-gray-700">Active Pools</span>
                    <span className="text-base font-bold text-gray-800">
                      {getOverallAverageYield().poolCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Individual Markets Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* USDT Section */}
                <div>
                  <div className="text-base font-bold text-gray-900 mb-2">
                    USDT Markets
                  </div>
                  <div className="bg-blue-50/50 rounded p-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700">APY</span>
                      <span className="text-base font-bold text-green-600">
                        {getAverageUsdtYield().avgApy.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Pools</span>
                      <span className="text-base font-bold text-gray-800">
                        {getAverageUsdtYield().poolCount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* USDC Section */}
                <div>
                  <div className="text-base font-bold text-gray-900 mb-2">
                    USDC Markets
                  </div>
                  <div className="bg-blue-50/50 rounded p-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-700">APY</span>
                      <span className="text-base font-bold text-green-600">
                        {getAverageUsdcYield().avgApy.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Pools</span>
                      <span className="text-base font-bold text-gray-800">
                        {getAverageUsdcYield().poolCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <YieldFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTermAndUpdateURL}
            selectedChains={selectedChains}
            setSelectedChains={setSelectedChainsAndUpdateURL}
            selectedProjects={selectedProjects}
            setSelectedProjects={setSelectedProjectsAndUpdateURL}
            selectedStablecoins={selectedStablecoins}
            setSelectedStablecoins={setSelectedStablecoinsAndUpdateURL}
            availableChains={uniqueChains}
            availableProjects={uniqueProjects}
            availableStablecoins={uniqueStablecoins}
            resetFilters={resetFilters}
            isSingleAssetOnly={isSingleAssetOnly}
            setIsSingleAssetOnly={setIsSingleAssetOnly}
          />

          {/* Last Updated Timestamp */}
          {lastUpdated && (
            <div className="mb-4 flex items-center justify-center">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200 flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Last updated:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {lastUpdated}
                  </span>
                </div>
              </div>
            </div>
          )}

          <YieldTable
            yieldData={yieldData}
            searchTerm={searchTerm}
            selectedChains={selectedChains}
            selectedProjects={selectedProjects}
            selectedStablecoins={selectedStablecoins}
            isLoading={isLoading}
            isSingleAssetOnly={isSingleAssetOnly}
          />
        </div>
      </div>
    </>
  );
}

export default function YieldPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <YieldPageContent />
    </Suspense>
  );
}
