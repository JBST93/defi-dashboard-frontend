import { Suspense } from 'react';
import { Metadata } from 'next';
import {
  getStablecoinYields,
  getTopStablecoinYields,
  getStablecoinFilterOptions,
} from '@/lib/stablecoinData';
import StablecoinTableClient from '@/components/StablecoinTableClient';
import YieldFilters from '@/components/YieldFilters';
import { formatNumber } from '@/lib/utils';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const data = await getStablecoinYields();

  return {
    title: 'Stablecoin Lending Rates | Best DeFi Yields 2025 | TokenDataView',
    description: `Compare the best stablecoin lending rates across DeFi protocols. Real-time APY data for USDC, USDT, DAI and more. ${
      data.totalPools
    } active pools with up to ${Math.max(
      ...data.yields.map((y) => parseFloat(y.yield_rate_base))
    ).toFixed(2)}% APY.`,
    keywords:
      'stablecoin lending, DeFi yields, USDC APY, USDT rates, DAI lending, crypto lending rates',
    openGraph: {
      title: 'Stablecoin Lending Rates | Best DeFi Yields 2025',
      description: `Compare the best stablecoin lending rates across DeFi protocols. ${data.totalPools} active pools available.`,
      type: 'website',
      url: 'https://www.tokendataview.com/yield/stablecoin',
      images: [
        {
          url: 'https://www.tokendataview.com/og-stablecoin-yields.jpg',
          width: 1200,
          height: 630,
          alt: 'Stablecoin Lending Rates Dashboard',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Stablecoin Lending Rates | Best DeFi Yields 2025',
      description: `Compare the best stablecoin lending rates across DeFi protocols. ${data.totalPools} active pools available.`,
      images: ['https://www.tokendataview.com/og-stablecoin-yields.jpg'],
    },
    alternates: {
      canonical: 'https://www.tokendataview.com/yield/stablecoin',
    },
  };
}

// Server component for the main content
async function StablecoinPageContent() {
  // Fetch data server-side
  const [data, filterOptions] = await Promise.all([
    getStablecoinYields(),
    getStablecoinFilterOptions(),
  ]);

  // Get top yields for highlights
  const topYields = data.yields.slice(0, 4);

  // Calculate averages
  const getAverageYield = (market: string) => {
    const pools = data.yields.filter(
      (item) => item.market === market && item.tvl > 50_000_000
    );
    if (pools.length === 0) return { avgApy: 0, poolCount: 0 };

    const totalApy = pools.reduce((sum, pool) => {
      const apyValue = parseFloat(pool.yield_rate_base);
      return sum + (isNaN(apyValue) ? 0 : apyValue);
    }, 0);

    return {
      avgApy: totalApy / pools.length,
      poolCount: pools.length,
    };
  };

  const usdtAverage = getAverageYield('USDT');
  const usdcAverage = getAverageYield('USDC');
  const overallAverage = getAverageYield(''); // All pools

  return (
    <>
      {/* Structured Data for SEO */}
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
              temporalCoverage: data.lastUpdated,
              numberOfItems: data.totalPools,
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 p-4 sm:p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
              Stablecoin Lending Opportunities
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the best stablecoin lending rates across DeFi protocols.
              Compare USDC, USDT, and other stablecoin yields in real-time.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Top TVL Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topYields.map((yieldItem, index) => (
                <div
                  key={yieldItem.id}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-base text-gray-900">
                      {yieldItem.project}
                    </h3>
                    <span className="px-2 py-0.5 bg-blue-50 rounded-full text-xs text-blue-700 font-medium">
                      {yieldItem.chain}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    {yieldItem.market}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-600 mb-0.5">APY</span>
                      <span className="text-base font-bold text-green-600">
                        {parseFloat(yieldItem.yield_rate_base).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-600 mb-0.5">TVL</span>
                      <span className="text-base font-bold text-gray-800">
                        ${formatNumber(yieldItem.tvl)}
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
                      {overallAverage.avgApy.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-blue-50/50 rounded p-2">
                    <span className="text-sm text-gray-700">Active Pools</span>
                    <span className="text-base font-bold text-gray-800">
                      {overallAverage.poolCount}
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
                        {usdtAverage.avgApy.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Pools</span>
                      <span className="text-base font-bold text-gray-800">
                        {usdtAverage.poolCount}
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
                        {usdcAverage.avgApy.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Pools</span>
                      <span className="text-base font-bold text-gray-800">
                        {usdcAverage.poolCount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters - Client Component */}
          <Suspense
            fallback={
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse mb-6"></div>
            }
          >
            <YieldFiltersClient
              filterOptions={filterOptions}
              initialData={data}
            />
          </Suspense>

          {/* Last Updated Timestamp */}
          <div className="mb-4 flex items-center justify-center">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200 flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Last updated:</span>
                <span className="text-sm font-medium text-gray-900">
                  {data.lastUpdated}
                </span>
              </div>
            </div>
          </div>

          {/* Table - Client Component with SSR data */}
          <StablecoinTableClient
            initialData={data.yields}
            lastUpdated={data.lastUpdated}
            totalPools={data.totalPools}
          />
        </div>
      </div>
    </>
  );
}

// Client component for filters (needs interactivity)
function YieldFiltersClient({
  filterOptions,
  initialData,
}: {
  filterOptions: any;
  initialData: any;
}) {
  // This will be hydrated on the client
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-6">
      <div className="text-sm text-gray-600 text-center">
        Filters will be available after page loads
      </div>
    </div>
  );
}

// Main page component
export default function StablecoinPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading stablecoin yields...</p>
          </div>
        </div>
      }
    >
      <StablecoinPageContent />
    </Suspense>
  );
}
