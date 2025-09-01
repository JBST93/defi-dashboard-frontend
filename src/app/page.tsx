'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  });

  useEffect(() => {
    const fetchYieldData = async () => {
      try {
        const data = await yieldRatesStablecoin();
        setYieldData(data);

        // Calculate top yields by APY
        const topByAPY = data
          .filter((item: YieldItem) => item.tvl > 1000000) // Only pools with >$1M TVL
          .sort(
            (a: YieldItem, b: YieldItem) =>
              parseFloat(b.yield_rate_base) - parseFloat(a.yield_rate_base)
          )
          .slice(0, 6)
          .map((item: YieldItem) => ({
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

        setMarketStats({
          totalTVL,
          avgAPY,
          totalPools: data.length,
          usdtAvgAPY,
          usdcAvgAPY,
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
            name: 'DeFi Lending Dashboard',
            url: 'https://www.tokendataview.com',
            description:
              'Comprehensive DeFi lending platform for comparing stablecoin yields and APY rates',
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
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}

function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Earn up to</span>{' '}
                <span className="block text-blue-200 xl:inline">15% APY</span>
                <span className="block xl:inline">on stablecoins</span>
              </h1>
              <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover the best DeFi lending opportunities for USDC, USDT, and
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
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
        Stablecoin Lending Market Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm font-medium text-gray-600 mb-2">
            Total Market TVL
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${formatNumber(marketStats.totalTVL)}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm font-medium text-gray-600 mb-2">
            Average APY
          </div>
          <div className="text-2xl font-bold text-green-600">
            {marketStats.avgAPY.toFixed(2)}%
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm font-medium text-gray-600 mb-2">
            USDT Average APY
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {marketStats.usdtAvgAPY.toFixed(2)}%
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm font-medium text-gray-600 mb-2">
            USDC Average APY
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {marketStats.usdcAvgAPY.toFixed(2)}%
          </div>
        </div>
      </div>
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
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Top Lending Opportunities
        </h2>
        <p className="mt-3 max-w-2xl text-xl text-gray-600 sm:mt-4 mx-auto">
          Highest yielding stablecoin lending pools with significant TVL
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow-md animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topYields.map((yieldItem, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {yieldItem.project}
                </h3>
                <span className="px-3 py-1 bg-blue-50 rounded-full text-sm text-blue-700 font-medium">
                  {yieldItem.chain}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-4">
                {yieldItem.asset}
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">APY</span>
                  <span className="text-lg font-bold text-green-600">
                    {yieldItem.apy.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">TVL</span>
                  <span className="text-lg font-bold text-gray-800">
                    ${formatNumber(yieldItem.tvl)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          href="/yield/stablecoin"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          View All Lending Opportunities
        </Link>
      </div>
    </section>
  );
}

function LendingBenefitsSection() {
  return (
    <section className="mt-24 bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Why Choose DeFi Lending?
        </h2>
        <p className="mt-3 max-w-2xl text-xl text-gray-600 sm:mt-4 mx-auto">
          Discover the advantages of lending your stablecoins in DeFi protocols
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
            Start lending with any amount - no minimum deposit requirements.
            Access global markets 24/7 without traditional banking restrictions.
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
            All lending activities are transparent and verifiable on the
            blockchain. Real-time data and smart contracts ensure trust and
            security.
          </p>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mt-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl overflow-hidden">
      <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start earning?</span>
            <span className="block text-blue-200">
              Explore the best stablecoin lending opportunities today.
            </span>
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            Compare rates, analyze risks, and maximize your yield with our
            comprehensive DeFi lending dashboard.
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
          <Link
            href="/yield/stablecoin"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors"
          >
            Start Lending Now
          </Link>
        </div>
      </div>
    </section>
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
              &copy; 2024 DeFi Lending Dashboard. All rights reserved.
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
