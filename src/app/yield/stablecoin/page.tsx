import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
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
    title: 'Stablecoin Yield Farming | Best DeFi Yields 2025 | TokenDataView',
    description: `Compare the best stablecoin yield farming opportunities across DeFi protocols. Real-time APY data for USDC, USDT, DAI and more. ${
      data.totalPools
    } active pools with up to ${Math.max(
      ...data.yields.map((y) => parseFloat(y.yield_rate_base))
    ).toFixed(2)}% APY.`,
    keywords:
      'stablecoin yield farming, DeFi yields, USDC APY, USDT rates, DAI farming, crypto yield farming',
    openGraph: {
      title: 'Stablecoin Yield Farming | Best DeFi Yields 2025',
      description: `Compare the best stablecoin yield farming opportunities across DeFi protocols. ${data.totalPools} active pools available.`,
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
      title: 'Stablecoin Yield Farming | Best DeFi Yields 2025',
      description: `Compare the best stablecoin yield farming opportunities across DeFi protocols. ${data.totalPools} active pools available.`,
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
    const pools = data.yields.filter((item) => {
      if (market === '') {
        // For overall average, use all pools above 50M TVL
        return item.tvl > 50_000_000;
      } else {
        // For specific markets, use all pools of that market above 50M TVL
        return item.market === market && item.tvl > 50_000_000;
      }
    });
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
            name: 'Stablecoin Yield Farming',
            description:
              'Compare the best stablecoin yield farming opportunities across DeFi protocols',
            url: 'https://www.tokendataview.com/yield/stablecoin',
            mainEntity: {
              '@type': 'Dataset',
              name: 'Stablecoin Yield Farming',
              description:
                'Real-time data on stablecoin yield farming opportunities across DeFi protocols',
              keywords: [
                'stablecoin',
                'yield farming',
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
              Stablecoin Yield Farming Opportunities
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the best stablecoin yield farming opportunities across DeFi
              protocols. Compare USDC, USDT, and other stablecoin yields in
              real-time.
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

          {/* Expandable Methodology Section */}
          <section className="mb-8">
            <div className="max-w-6xl mx-auto">
              <details className="bg-white rounded-xl shadow-lg border border-gray-200">
                <summary className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      📊 How We Calculate Stablecoin Yields
                    </h2>
                    <span className="text-gray-500 text-sm">
                      Click to expand
                    </span>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <p className="text-gray-700 leading-relaxed">
                    Our yield calculations are based on real-time data from
                    smart contracts across multiple DeFi protocols. We track
                    both base lending rates and additional reward tokens (like
                    COMP, AAVE, CRV) to provide comprehensive APY figures. Base
                    rates reflect the core lending yield, while reward APY
                    includes governance token distributions. TVL (Total Value
                    Locked) represents the total capital in each pool,
                    indicating liquidity depth and protocol adoption. Risk
                    levels are assessed based on protocol maturity, audit
                    history, and historical performance. All data is updated
                    every 15 minutes through direct smart contract integration,
                    ensuring accuracy and eliminating reliance on potentially
                    outdated third-party APIs. Our methodology prioritizes
                    transparency and real-time accuracy to help users make
                    informed DeFi decisions.
                  </p>
                </div>
              </details>
            </div>
          </section>

          {/* Table - Client Component with SSR data */}
          <StablecoinTableClient
            initialData={data.yields}
            lastUpdated={data.lastUpdated}
            totalPools={data.yields.length}
            availableChains={filterOptions.chains}
            availableProjects={filterOptions.projects}
            availableStablecoins={filterOptions.stablecoins}
          />

          {/* Methodology Section */}
          <section className="mt-16 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How We Track Stablecoin Yields
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <p className="text-lg text-gray-700 mb-6">
                  TokenDataView tracks real-time yields across lending
                  protocols, liquidity pools and yield aggregators to help you
                  find the highest sustainable returns. Our data connects
                  directly to smart contracts, ensuring accuracy and eliminating
                  reliance on potentially outdated third-party APIs.
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Data Sources & Verification
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        Direct smart contract integration for real-time APY data
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        Cross-verified with multiple DeFi protocols
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        Updated every 15 minutes for maximum accuracy
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        Historical performance tracking and analysis
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Supported Protocols
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <Link
                          href="/projects/aave"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          AAVE
                        </Link>{' '}
                        - Leading lending protocol
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <Link
                          href="/projects/compound"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Compound
                        </Link>{' '}
                        - DeFi lending pioneer
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <Link
                          href="/projects/pendle"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Pendle
                        </Link>{' '}
                        - Yield trading platform
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">✓</span>
                        <Link
                          href="/projects/maker"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          MakerDAO
                        </Link>{' '}
                        - DAI stablecoin ecosystem
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-16 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    What are the best stablecoin yield farming strategies in
                    2025?
                  </h3>
                  <p className="text-gray-700">
                    The best strategies depend on your risk tolerance and market
                    conditions. Currently,
                    <Link
                      href="/projects/aave"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {' '}
                      AAVE lending
                    </Link>{' '}
                    offers stable returns with low risk, while{' '}
                    <Link
                      href="/projects/pendle"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Pendle yield trading
                    </Link>
                    can provide higher returns for more sophisticated users.
                    Read our comprehensive guide on
                    <Link
                      href="/articles/stablecoin-yield-farming"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {' '}
                      stablecoin yield farming strategies
                    </Link>
                    for detailed analysis.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    How do I choose between different DeFi protocols for
                    stablecoin yields?
                  </h3>
                  <p className="text-gray-700">
                    Consider factors like TVL (Total Value Locked), historical
                    performance, and risk levels.
                    <Link
                      href="/projects"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Compare protocols
                    </Link>
                    on our platform, and check our detailed
                    <Link
                      href="/articles/aave-protocol-complete-guide"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {' '}
                      AAVE guide
                    </Link>
                    and{' '}
                    <Link
                      href="/articles/compound-finance-defi-lending-pioneer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Compound analysis
                    </Link>
                    for in-depth protocol comparisons.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    What are the risks of stablecoin yield farming?
                  </h3>
                  <p className="text-gray-700">
                    DeFi and Yield Farming involves smart contract risk,
                    impermanent loss, and potential total loss of funds. Past
                    performance doesn&apos;t guarantee future results. Always
                    DYOR (Do Your Own Research) and never invest more than you
                    can afford to lose. Learn more about
                    <Link
                      href="/articles/what-are-stablecoins"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {' '}
                      stablecoin risks
                    </Link>
                    and{' '}
                    <Link
                      href="/articles/defi-lending-protocols-earn-interest"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      DeFi lending risks
                    </Link>
                    .
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    How often are yield rates updated on TokenDataView?
                  </h3>
                  <p className="text-gray-700">
                    Our yield data is updated every 15 minutes by connecting
                    directly to smart contracts. This ensures you always see the
                    most current APY rates across all supported protocols.
                    Unlike third-party APIs that may have delays, our direct
                    integration provides real-time accuracy.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Which stablecoins offer the highest yields right now?
                  </h3>
                  <p className="text-gray-700">
                    Yield rates change frequently based on market conditions.
                    Use our filtering tools above to find current high-yield
                    opportunities. Generally, newer or less liquid stablecoins
                    may offer higher yields but come with additional risk. Check
                    our
                    <Link
                      href="/stablecoins"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {' '}
                      stablecoin comparison
                    </Link>
                    for detailed analysis of each stablecoin&apos;s
                    characteristics and risk profile.
                  </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    How do I get started with stablecoin yield farming?
                  </h3>
                  <p className="text-gray-700">
                    Start by understanding the basics with our
                    <Link
                      href="/articles/what-are-stablecoins"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {' '}
                      stablecoin guide
                    </Link>
                    and{' '}
                    <Link
                      href="/articles/defi-lending-protocols-earn-interest"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      DeFi lending primer
                    </Link>
                    . Then explore specific protocols like{' '}
                    <Link
                      href="/projects/aave"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      AAVE
                    </Link>
                    or{' '}
                    <Link
                      href="/projects/compound"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Compound
                    </Link>
                    to understand their unique features and requirements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Yields Differ Section */}
          <section className="mt-16 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why DeFi Yields Differ Across Protocols
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      AAVE: The DeFi Lending Gold Standard
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      AAVE consistently offers lower but more stable yields
                      (typically 3-8% APY) because it&apos;s considered the{' '}
                      <strong>safest DeFi lending protocol</strong>. With over
                      $15B in TVL, extensive audits, and battle-tested smart
                      contracts, AAVE prioritizes security over high yields.
                      Their conservative approach includes
                      over-collateralization requirements, liquidation
                      mechanisms, and a proven track record since 2017.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Why lower yields?</strong> Lower risk = lower
                      returns. AAVE&apos;s yields reflect the &quot;risk-free
                      rate&quot; of DeFi lending, similar to how US Treasury
                      bonds offer lower yields than corporate bonds.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Morpho: Optimized Capital Efficiency
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Morpho consistently offers{' '}
                      <strong>higher yields (8-15% APY)</strong> by optimizing
                      capital efficiency through peer-to-peer lending. Instead
                      of traditional liquidity pools, Morpho matches lenders
                      directly with borrowers, reducing capital requirements and
                      increasing yield for suppliers.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Higher yields because:</strong> More efficient
                      capital utilization, direct P2P matching, and reduced
                      protocol fees. However, this comes with slightly higher
                      complexity and newer, less battle-tested smart contracts.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Pendle: Yield Trading & Tokenized Future Yields
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Pendle&apos;s{' '}
                      <strong>extremely high yields (15-25% APY)</strong> come
                      from yield trading strategies, not traditional lending.
                      Users can trade future yield streams, leverage positions,
                      and access complex yield strategies that amplify returns.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Why so high?</strong> Pendle enables sophisticated
                      yield strategies including leverage, yield tokenization,
                      and arbitrage opportunities. These strategies can generate
                      much higher returns but come with significantly higher
                      risk and complexity.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Other Factors Affecting Yields
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Protocol Maturity
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Newer protocols often offer higher yields to attract
                          users, while established protocols like AAVE focus on
                          stability and security.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Capital Efficiency
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Protocols that use capital more efficiently (like
                          Morpho&apos;s P2P model) can offer higher yields to
                          suppliers.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Reward Tokens
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Additional governance token rewards (COMP, AAVE, CRV)
                          can significantly boost effective APY beyond base
                          lending rates.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Market Conditions
                        </h4>
                        <p className="text-gray-600 text-sm">
                          High borrowing demand increases lending yields, while
                          market volatility can create arbitrage opportunities.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-gray-700 text-sm font-medium">
                      <strong>Key Takeaway:</strong> Higher yields typically
                      come with higher risk, complexity, or newer technology.
                      Choose protocols that match your risk tolerance and
                      technical comfort level.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Safety Guidelines Section */}
          <section className="mt-16 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                DeFi Safety Guidelines
              </h2>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Smart Contract Security
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Always verify that protocols have undergone comprehensive
                      security audits by reputable firms. Check for multiple
                      audit reports and ensure they cover the specific smart
                      contracts you&apos;re interacting with. Look for protocols
                      with bug bounty programs and active security monitoring.
                      Avoid newly launched protocols without established track
                      records, even if they offer higher yields.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Risk Management Best Practices
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Never invest more than you can afford to lose completely.
                      Diversify your stablecoin holdings across multiple
                      protocols and chains to reduce concentration risk. Start
                      with smaller amounts to test protocols before committing
                      larger sums. Monitor your positions regularly and set up
                      alerts for significant changes in APY or protocol health.
                      Keep detailed records of your transactions for tax
                      purposes and security monitoring.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Due Diligence Checklist
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Before investing, research the protocol&apos;s team,
                      governance structure, and community. Verify the legitimacy
                      of yield sources and understand how rewards are generated.
                      Check protocol TVL trends and user adoption metrics.
                      Review recent governance proposals and community
                      sentiment. Ensure you understand the withdrawal process
                      and any lock-up periods. Test small transactions first to
                      verify everything works as expected.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Financial Disclosure */}
          <section className="mt-16 mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-red-800 mb-4">
                  Important Risk Disclosure
                </h2>
                <p className="text-red-700 mb-4">
                  <strong>
                    DeFi and Yield Farming involves smart contract risk,
                    impermanent loss, and potential total loss of funds.
                  </strong>
                  Past performance doesn&apos;t guarantee future results. Always
                  DYOR (Do Your Own Research) and never invest more than you can
                  afford to lose.
                </p>
                <p className="text-red-700">
                  The information provided on this page is for educational
                  purposes only and should not be considered financial advice.
                  Please consult with a qualified financial advisor before
                  making any investment decisions.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
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
