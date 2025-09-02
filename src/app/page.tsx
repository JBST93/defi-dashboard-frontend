'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { yieldRatesStablecoin } from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import ProtocolLogo from '@/components/ProtocolLogo';

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

interface TopYieldCard {
  project: string;
  chain: string;
  asset: string;
  apy: number;
  tvl: number;
}

export default function Home() {
  const [yieldData, setYieldData] = useState<YieldItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topYields, setTopYields] = useState<TopYieldCard[]>([]);
  const [marketStats, setMarketStats] = useState({
    totalTVL: 0,
    avgAPY: 0,
    totalPools: 0,
    usdtAvgAPY: 0,
    usdcAvgAPY: 0,
    supportedProtocols: 0,
  });

  useEffect(() => {
    const fetchYieldData = async () => {
      try {
        const data = await yieldRatesStablecoin();
        setYieldData(data);

        // Calculate top yields by APY with specific filtering
        const filteredData = data.filter((item: YieldItem) => {
          // Only pools with >$1M TVL
          if (item.tvl <= 1000000) return false;

          // For AAVE: only Ethereum with USDC or USDT
          if (item.project.toLowerCase() === 'aave') {
            return (
              item.chain.toLowerCase() === 'ethereum' &&
              (item.market === 'USDC' || item.market === 'USDT')
            );
          }

          // For Pendle: maximum 1 pool (highest APY)
          if (item.project.toLowerCase() === 'pendle') {
            return true; // We'll handle the limit after sorting
          }

          // Include all other protocols
          return true;
        });

        // Sort by APY and handle Pendle limit
        const sortedData = filteredData.sort(
          (a: YieldItem, b: YieldItem) =>
            parseFloat(b.yield_rate_base) - parseFloat(a.yield_rate_base)
        );

        // Apply Pendle limit (max 1 pool)
        const pendlePools = sortedData.filter(
          (item: YieldItem) => item.project.toLowerCase() === 'pendle'
        );
        const otherPools = sortedData.filter(
          (item: YieldItem) => item.project.toLowerCase() !== 'pendle'
        );

        const finalData = [
          ...otherPools,
          ...pendlePools.slice(0, 1), // Only take the highest APY Pendle pool
        ];

        const topByAPY = finalData.slice(0, 6).map((item: YieldItem) => ({
          project: item.project,
          chain: item.chain,
          asset: item.market,
          apy: parseFloat(item.yield_rate_base),
          tvl: item.tvl,
        }));

        setTopYields(topByAPY);

        // Calculate market statistics
        const significantPools = data.filter(
          (item: YieldItem) => item.tvl > 50000000
        );
        const totalTVL = data.reduce(
          (sum: number, item: YieldItem) => sum + item.tvl,
          0
        );
        const avgAPY =
          significantPools.length > 0
            ? significantPools.reduce(
                (sum: number, item: YieldItem) =>
                  sum + parseFloat(item.yield_rate_base),
                0
              ) / significantPools.length
            : 0;

        const usdtPools = data.filter(
          (item: YieldItem) => item.market === 'USDT' && item.tvl > 50000000
        );
        const usdcPools = data.filter(
          (item: YieldItem) => item.market === 'USDC' && item.tvl > 50000000
        );

        const usdtAvgAPY =
          usdtPools.length > 0
            ? usdtPools.reduce(
                (sum: number, item: YieldItem) =>
                  sum + parseFloat(item.yield_rate_base),
                0
              ) / usdtPools.length
            : 0;

        const usdcAvgAPY =
          usdcPools.length > 0
            ? usdcPools.reduce(
                (sum: number, item: YieldItem) =>
                  sum + parseFloat(item.yield_rate_base),
                0
              ) / usdcPools.length
            : 0;

        // Get unique protocols from the data
        const uniqueProtocols = new Set(
          data.map((item: YieldItem) => item.project)
        );

        setMarketStats({
          totalTVL,
          avgAPY,
          totalPools: data.length,
          usdtAvgAPY,
          usdcAvgAPY,
          supportedProtocols: uniqueProtocols.size,
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching yield data:', error);
        setIsLoading(false);
      }
    };

    fetchYieldData();
  }, []);

  return (
    <>
      {/* Structured Data for the homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'DeFi Dashboard',
            url: 'https://www.tokendataview.com',
            description:
              'Comprehensive DeFi platform for comparing stablecoin yields and APY rates',
            potentialAction: {
              '@type': 'SearchAction',
              target:
                'https://www.tokendataview.com/yield/stablecoin?search={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <HeroSection />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <MarketOverviewSection
            marketStats={marketStats}
            isLoading={isLoading}
          />
          <TopYieldOpportunitiesSection
            topYields={topYields}
            isLoading={isLoading}
          />
          <LendingBenefitsSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-5 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 opacity-10 rounded-full blur-lg"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200 opacity-5 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text and CTA */}
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Earn up to </span>{' '}
                  <span className="block text-blue-200 xl:inline">15% APY</span>
                  <span className="block xl:inline"> on stablecoins</span>
                </h1>
                <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover the best DeFi yield opportunities for USDC, USDT, and
                  other stablecoins. Compare rates across protocols and maximize
                  your yield with real-time data.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/yield/stablecoin"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      View Stablecoin Yields
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/projects"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10 transition-colors"
                    >
                      View Protocols
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Side - Coin Logos and Visual Elements */}
              <div className="relative hidden lg:block">
                <div className="relative w-full h-96">
                  {/* Floating Coin Logos - Scattered across the entire area */}
                  <div className="absolute top-2 left-2 w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30 animate-pulse">
                    <Image
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMyNkE1RjQiLz4KPHBhdGggZD0iTTI0IDEyQzE3LjM3MyAxMiAxMiAxNy4zNzMgMTIgMjRDMTIgMzAuNjI3IDE3LjM3MyAzNiAyNCAzNkMzMC42MjcgMzYgMzYgMzAuNjI3IDM2IDI0QzM2IDE3LjM3MyAzMC42MjcgMTIgMjQgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjQgMTZDMjAuNjg2IDE2IDE4IDE4LjY4NiAxOCAyMkMxOCAyNS4zMTQgMjAuNjg2IDI4IDI0IDI4QzI3LjMxNCAyOCAzMCAyNS4zMTQgMzAgMjJDMzAgMTguNjg2IDI3LjMxNCAxNiAyNCAxNloiIGZpbGw9IiMyNkE1RjQiLz4KPC9zdmc+Cg=="
                      alt="USDC"
                      width={96}
                      height={96}
                      className="w-20 h-20"
                    />
                  </div>

                  <div
                    className="absolute top-8 right-8 w-20 h-20 bg-white bg-opacity-15 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-25 animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  >
                    <Image
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMyNkE1RjQiLz4KPHBhdGggZD0iTTI0IDhMMzIgMTZIMjhWMjRIMjBWMThIMTZMMjQgOFoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNiAyMEgyMFYyOEgyOFYyMEgzMkwyNCAzMkwxNiAyMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo="
                      alt="USDT"
                      width={80}
                      height={80}
                      className="w-16 h-16"
                    />
                  </div>

                  <div
                    className="absolute top-1/2 left-8 w-12 h-12 bg-white bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30 animate-pulse"
                    style={{ animationDelay: '1s' }}
                  >
                    <span className="text-white font-bold text-xs">DAI</span>
                  </div>

                  <div
                    className="absolute top-1/3 right-1/4 w-18 h-18 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-25 animate-pulse"
                    style={{ animationDelay: '1.5s' }}
                  >
                    <Image
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTI0IDEyQzE3LjM3MyAxMiAxMiAxNy4zNzMgMTIgMjRDMTIgMzAuNjI3IDE3LjM3MyAzNiAyNCAzNkMzMC42MjcgMzYgMzYgMzAuNjI3IDM2IDI0QzM2IDE3LjM3MyAzMC42MjcgMTIgMjQgMTJaTTI0IDMyQzE5LjU4MiAzMiAxNiAyOC40MTggMTYgMjRDMTYgMTkuNTgyIDE5LjU4MiAxNiAyNCAxNkMyOC40MTggMTYgMzIgMTkuNTgyIDMyIDI0QzMyIDI4LjQxOCAyOC40MTggMzIgMjQgMzJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMjAgMjBIMjhWMjRIMjRWMjhIMjBWMjBaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
                      alt="eUSD"
                      width={36}
                      height={36}
                      className="w-9 h-9"
                    />
                  </div>

                  <div
                    className="absolute bottom-8 left-1/3 w-16 h-16 bg-white bg-opacity-15 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30 animate-pulse"
                    style={{ animationDelay: '2s' }}
                  >
                    <span className="text-white font-bold text-sm">USDe</span>
                  </div>

                  {/* Protocol Logos - Scattered across the middle and other areas */}
                  <div className="absolute top-1/4 right-1/3">
                    <ProtocolLogo
                      protocol="AAVE"
                      size={56}
                      className="w-14 h-14"
                    />
                  </div>

                  <div className="absolute bottom-1/3 left-1/4">
                    <ProtocolLogo
                      protocol="PENDLE"
                      size={40}
                      className="w-10 h-10"
                    />
                  </div>

                  <div className="absolute top-2/3 right-1/6">
                    <ProtocolLogo
                      protocol="GEARBOX"
                      size={44}
                      className="w-11 h-11"
                    />
                  </div>

                  {/* Floating Elements - Repositioned */}
                  <div className="absolute top-12 left-1/2 w-2 h-2 bg-white bg-opacity-40 rounded-full animate-ping"></div>
                  <div
                    className="absolute bottom-24 right-1/3 w-1 h-1 bg-blue-200 bg-opacity-60 rounded-full animate-ping"
                    style={{ animationDelay: '1s' }}
                  ></div>
                  <div
                    className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-purple-200 bg-opacity-50 rounded-full animate-ping"
                    style={{ animationDelay: '2s' }}
                  ></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function MarketOverviewSection({
  marketStats,
  isLoading,
}: {
  marketStats: any;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-md animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Market Overview
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Real-time insights into the stablecoin ecosystem across all supported
          protocols
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Supported Protocols Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-blue-600">
                Protocols Supported
              </div>
              <div className="text-xs text-blue-500"></div>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-700 mb-2">
            {isLoading ? (
              <div className="h-8 bg-blue-200 rounded animate-pulse"></div>
            ) : (
              marketStats.supportedProtocols
            )}{' '}
          </div>
        </div>

        {/* Total TVL Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500 rounded-xl">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-600">TVL</div>
              <div className="text-xs text-green-500">Total Value</div>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-700 mb-2">
            {isLoading ? (
              <div className="h-8 bg-green-200 rounded animate-pulse"></div>
            ) : (
              `$${formatNumber(marketStats.totalTVL)}`
            )}
          </div>
        </div>

        {/* Average APY Card */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500 rounded-xl">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-purple-600">APY</div>
              <div className="text-xs text-purple-500">Average</div>
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-700 mb-2">
            {isLoading ? (
              <div className="h-8 bg-purple-200 rounded animate-pulse"></div>
            ) : (
              `${marketStats.avgAPY.toFixed(2)}%`
            )}
          </div>
        </div>

        {/* Active Pools Card */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500 rounded-xl">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-orange-600">
                Markets Supported
              </div>
              <div className="text-xs text-orange-500">
                Across all protocols
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-700 mb-2">
            {isLoading ? (
              <div className="h-8 bg-orange-200 rounded animate-pulse"></div>
            ) : (
              marketStats.totalPools
            )}
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"></div>
    </section>
  );
}

function TopYieldOpportunitiesSection({
  topYields,
  isLoading,
}: {
  topYields: TopYieldCard[];
  isLoading: boolean;
}) {
  return (
    <section className="mt-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Top Yield Opportunities
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Curated selection of the highest yielding stablecoin pools with
          significant TVL and proven track records
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-lg animate-pulse border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-6"></div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topYields.map((yieldItem, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2 group"
            >
              {/* Header with protocol and chain */}
              <div className="flex items-center space-x-3 mb-6">
                <ProtocolLogo
                  protocol={yieldItem.project}
                  size={48}
                  className="w-12 h-12"
                />
                <div>
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
                    {yieldItem.project}
                  </h3>
                  <div className="text-sm text-gray-500 capitalize">
                    {yieldItem.chain}
                  </div>
                </div>
              </div>

              {/* Asset */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">Asset</div>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      yieldItem.asset === 'USDC'
                        ? 'bg-blue-100'
                        : yieldItem.asset === 'USDT'
                        ? 'bg-green-100'
                        : 'bg-purple-100'
                    }`}
                  >
                    <span
                      className={`font-bold text-sm ${
                        yieldItem.asset === 'USDC'
                          ? 'text-blue-600'
                          : yieldItem.asset === 'USDT'
                          ? 'text-green-600'
                          : 'text-purple-600'
                      }`}
                    >
                      {yieldItem.asset}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {yieldItem.asset}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-600">
                      APY
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {yieldItem.apy.toFixed(2)}%
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-600">
                      TVL
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-600">
                    ${formatNumber(yieldItem.tvl)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Earning?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Explore all available opportunities and find the perfect yield
            strategy for your portfolio.
          </p>
          <Link
            href="/yield/stablecoin"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            View All Opportunities
          </Link>
        </div>
      </div>
    </section>
  );
}

function LendingBenefitsSection() {
  return (
    <section className="mt-24 bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Why Choose DeFi ?
        </h2>
        <p className="mt-3 max-w-2xl text-xl text-gray-600 sm:mt-4 mx-auto">
          Discover the advantages of earning yield on your stablecoins in DeFi
          protocols
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600 mb-4">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Higher Yields
          </h3>
          <p className="text-gray-600">
            Earn significantly higher interest rates compared to traditional
            banking, with some protocols offering up to 15% APY on stablecoins.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600 mb-4">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Minimums
          </h3>
          <p className="text-gray-600">
            Start earning yield with any amount - no minimum deposit
            requirements. Access global markets 24/7 without traditional banking
            restrictions.
          </p>
        </div>

        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600 mb-4">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Transparent
          </h3>
          <p className="text-gray-600">
            All activities are transparent and verifiable on the blockchain.
            Real-time data and smart contracts ensure trust and security.
          </p>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mt-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl overflow-hidden"></section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 mt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex justify-center space-x-6 md:order-2">
            {/* Add social media icons here */}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 Token Data View. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ... (Keep the existing FeatureCard and BenefitItem components)

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
