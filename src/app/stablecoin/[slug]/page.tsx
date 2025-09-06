import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getStablecoinPageData,
  STABLECOIN_SLUG_MAP,
} from '@/lib/data/getStablecoinYields';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import StatsGrid from '@/components/Stablecoin/StatsGrid';
import YieldTable from '@/components/Stablecoin/YieldTable';
import RiskBadge from '@/components/Stablecoin/RiskBadge';
import Link from 'next/link';
import {
  buildBreadcrumbSchema,
  buildDatasetSchema,
  buildItemListSchema,
  buildFAQSchema,
  buildWebPageSchema,
} from './schema';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const stablecoin = STABLECOIN_SLUG_MAP[slug.toLowerCase()];

  if (!stablecoin) {
    return {
      title: 'Stablecoin Not Found | TokenDataView',
    };
  }

  const data = await getStablecoinPageData(slug);

  if (!data) {
    return {
      title: `${stablecoin} Yield Data Not Available | TokenDataView`,
    };
  }

  const title = `${stablecoin} Yield Farming 2025 | Best ${stablecoin} APY Rates & DeFi Opportunities`;
  const description = `Compare ${stablecoin} yield farming rates across 10+ DeFi protocols. Real-time APY data, TVL analysis, risk assessment. Find the highest ${stablecoin} yields on Aave, Compound, Pendle, Maker, and more. Updated every 15 minutes.`;

  return {
    title,
    description,
    keywords: [
      `${stablecoin} yield farming`,
      `${stablecoin} APY rates`,
      `${stablecoin} DeFi yields`,
      `${stablecoin} lending rates`,
      `${stablecoin} staking rewards`,
      `${stablecoin} yield comparison`,
      `${stablecoin} best rates`,
      `${stablecoin} highest APY`,
      `${stablecoin} DeFi protocols`,
      `${stablecoin} yield opportunities`,
      `${stablecoin} farming strategies`,
      `${stablecoin} passive income`,
      'DeFi yield farming',
      'stablecoin yields 2025',
      'cryptocurrency yield farming',
      'DeFi lending rates',
      'best DeFi yields',
      'highest APY DeFi',
      'yield farming strategies',
      'DeFi passive income',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.tokendataview.com/stablecoin/${slug}`,
      images: [
        {
          url: `https://www.tokendataview.com/og-${stablecoin.toLowerCase()}-yields.jpg`,
          width: 1200,
          height: 630,
          alt: `${stablecoin} Yield Farming Dashboard`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        `https://www.tokendataview.com/og-${stablecoin.toLowerCase()}-yields.jpg`,
      ],
    },
    alternates: {
      canonical: `https://www.tokendataview.com/stablecoin/${slug}`,
    },
  };
}

// Generate static params for all stablecoin slugs
export async function generateStaticParams() {
  const slugs = Object.keys(STABLECOIN_SLUG_MAP);
  return slugs.map((slug) => ({
    slug,
  }));
}

// FAQ data for each stablecoin
const getFAQData = (stablecoin: string) => [
  {
    question: `What is ${stablecoin} and how does it work?`,
    answer: `${stablecoin} is a stablecoin designed to maintain a stable value relative to the US dollar. It's widely used in DeFi for yield farming, lending, and trading due to its price stability and liquidity. ${stablecoin} maintains its peg through various mechanisms depending on the specific stablecoin type.`,
  },
  {
    question: `Why should I earn yield on ${stablecoin} instead of other stablecoins?`,
    answer: `Earning yield on ${stablecoin} allows you to generate passive income while maintaining exposure to a stable asset. ${stablecoin} offers competitive yields, high liquidity, and wide protocol support, making it ideal for DeFi yield farming strategies. This reduces volatility risk while still participating in DeFi's high-yield opportunities.`,
  },
  {
    question: `What are the best DeFi protocols for ${stablecoin} yield farming in 2025?`,
    answer: `The best ${stablecoin} protocols include Aave, Compound, Pendle, Maker, and Gearbox. Each offers different risk profiles, yield rates, and features. Aave and Compound provide lending opportunities, while Pendle offers yield trading. Choose based on your risk tolerance, desired APY, and investment strategy.`,
  },
  {
    question: `How safe is ${stablecoin} yield farming compared to traditional investments?`,
    answer: `${stablecoin} yield farming safety depends on the protocol and TVL. Established protocols with high TVL (like Aave) are generally safer than newer or experimental protocols. While DeFi offers higher yields than traditional savings, it carries smart contract and protocol risks. Always assess risk before investing and never invest more than you can afford to lose.`,
  },
  {
    question: `What's the difference between base APY and reward APY in ${stablecoin} farming?`,
    answer: `Base APY is the core yield from the protocol (like lending interest), while reward APY comes from additional tokens or incentives. Total APY = Base APY + Reward APY. Base APY is more stable, while rewards can be volatile and may change over time. Both contribute to your total returns when farming ${stablecoin}.`,
  },
  {
    question: `Can I lose my ${stablecoin} when yield farming? What are the risks?`,
    answer: `Yes, there are several risks including smart contract bugs, protocol hacks, impermanent loss, and market volatility. DeFi protocols are experimental and can fail. Only invest what you can afford to lose, diversify across multiple protocols, and always do your own research before participating in ${stablecoin} yield farming.`,
  },
  {
    question: `How do I start ${stablecoin} yield farming as a beginner?`,
    answer: `Start by choosing a reputable protocol like Aave or Compound with high TVL. Connect your wallet, supply ${stablecoin} to earn base yields, and consider additional rewards. Start small, understand the risks, and gradually increase your position as you gain experience. Always verify contract addresses and use official protocol websites.`,
  },
  {
    question: `What are the tax implications of ${stablecoin} yield farming?`,
    answer: `${stablecoin} yield farming rewards are generally taxable as income in most jurisdictions. Keep detailed records of all transactions, yields earned, and gas fees paid. Consider consulting a tax professional familiar with cryptocurrency and DeFi taxation. Tax treatment varies by country and individual circumstances.`,
  },
];

export default async function StablecoinPage({ params }: PageProps) {
  const { slug } = params;
  const data = await getStablecoinPageData(slug);

  if (!data) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Stablecoins', href: '/stablecoins' },
    { label: data.stablecoin, href: undefined },
  ];

  const faqData = getFAQData(data.stablecoin);

  // Build schemas
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const datasetSchema = buildDatasetSchema(data, slug);
  const itemListSchema = buildItemListSchema(data, slug);
  const faqSchema = buildFAQSchema(faqData);
  const webPageSchema = buildWebPageSchema(data, slug);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={breadcrumbItems}
            className="mb-6"
          />

          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {data.stablecoin} Yield Comparison 2025 — Best APY Across DeFi
              Protocols
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {data.stablecoin} is a leading stablecoin in the DeFi ecosystem.
              This page delivers real-time yield farming opportunities across
              multiple protocols, helping you find the best {data.stablecoin}{' '}
              APY rates with comprehensive risk analysis.
            </p>
          </header>

          {/* Stats Grid */}
          <section className="mb-8">
            <StatsGrid
              stablecoin={data.stablecoin}
              totalPools={data.totalPools}
              averageApy={data.averageApy}
              activeProtocols={data.activeProtocols}
              chainsSupported={data.chainsSupported}
              riskLevel={data.riskLevel}
              lastUpdated={data.lastUpdated}
              marketCap={data.marketCap}
            />
          </section>

          {/* Yield Table */}
          <section className="mb-12">
            <YieldTable
              yields={data.yields}
              stablecoin={data.stablecoin}
            />
          </section>

          {/* What is {Stablecoin} Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What is {data.stablecoin}? Complete Guide 2025
              </h2>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-6">
                  {data.stablecoin} is one of the most popular stablecoins in
                  the DeFi ecosystem, offering users a stable store of value
                  while providing opportunities to earn competitive yields
                  through various DeFi protocols.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Why Choose {data.stablecoin} for Yield Farming?
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-600">
                          <strong>Stability:</strong> Maintains 1:1 peg with
                          USD, reducing volatility risk
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-600">
                          <strong>High Liquidity:</strong> Easy to buy, sell,
                          and transfer across platforms
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-600">
                          <strong>Wide Adoption:</strong> Supported by{' '}
                          {data.activeProtocols.length}+ major DeFi protocols
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-600">
                          <strong>Competitive Yields:</strong> Earn up to{' '}
                          {Math.max(
                            ...data.yields.map(
                              (y) =>
                                parseFloat(y.yield_rate_base) +
                                parseFloat(y.yield_rate_reward || '0')
                            )
                          ).toFixed(2)}
                          % APY
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {data.stablecoin} Yield Farming Strategies
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Lending & Borrowing
                        </h4>
                        <p className="text-blue-800 text-sm">
                          Supply {data.stablecoin} to lending protocols like
                          Aave and Compound for steady base yields
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">
                          Liquidity Provision
                        </h4>
                        <p className="text-green-800 text-sm">
                          Provide liquidity to AMMs and earn trading fees plus
                          additional rewards
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">
                          Yield Trading
                        </h4>
                        <p className="text-purple-800 text-sm">
                          Use platforms like Pendle to trade future yield
                          streams for immediate returns
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {data.stablecoin} Yield Farming Guide
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What is {data.stablecoin}?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {data.stablecoin} is a stablecoin designed to maintain price
                    stability relative to the US dollar. It&apos;s widely
                    adopted in DeFi for its reliability and liquidity across
                    multiple protocols.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Why Earn Yield on {data.stablecoin}?
                  </h3>
                  <p className="text-gray-600">
                    s but e Earning yield on {data.stablecoin} provides stable
                    returns while participating in DeFi&apos;s growth. It&apos;s
                    ideal for conservative investors seeking steady income with
                    reduced volatility.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Best Protocols for {data.stablecoin} in 2025
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Top protocols include Aave, Compound, Pendle, and Maker.
                    Each offers different risk profiles and yield rates. Choose
                    based on your risk tolerance and desired returns.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Alternatives
                  </h3>
                  <p className="text-gray-600">
                    Consider other stablecoins like USDT, DAI, or FRAX for
                    diversification.
                    <Link
                      href="/stablecoins"
                      className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                      Compare all stablecoins →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Methodology & Risk */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Methodology & Risk Assessment
              </h2>
              <p className="text-gray-600 mb-4">
                Our risk assessment considers TVL, protocol maturity, and
                historical performance. Data is updated every 15 minutes from
                verified DeFi protocols.
              </p>
              <div className="flex items-center space-x-4">
                <RiskBadge risk="low" />
                <span className="text-sm text-gray-600">
                  Established protocols with high TVL
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <RiskBadge risk="medium" />
                <span className="text-sm text-gray-600">
                  Moderate risk with decent TVL
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-2">
                <RiskBadge risk="high" />
                <span className="text-sm text-gray-600">
                  High risk due to low TVL or new protocols
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                <Link
                  href="/methodology"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Learn more about our methodology →
                </Link>
              </p>
            </div>
          </section>

          {/* Regional & Global Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {data.stablecoin} Yield Farming: Global & Regional Opportunities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    United States
                  </h3>
                  <p className="text-blue-800 text-sm mb-3">
                    {data.stablecoin} yield farming is popular among US DeFi
                    users seeking stable returns
                  </p>
                  <div className="text-2xl font-bold text-blue-600">
                    {data.averageApy.toFixed(2)}% avg APY
                  </div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Europe
                  </h3>
                  <p className="text-green-800 text-sm mb-3">
                    European investors use {data.stablecoin} for DeFi yield
                    strategies and portfolio diversification
                  </p>
                  <div className="text-2xl font-bold text-green-600">
                    {data.chainsSupported.length} chains
                  </div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    Asia Pacific
                  </h3>
                  <p className="text-purple-800 text-sm mb-3">
                    APAC markets drive {data.stablecoin} adoption with high DeFi
                    participation rates
                  </p>
                  <div className="text-2xl font-bold text-purple-600">
                    {data.totalPools} pools
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Internal Links */}
          <section className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Related Resources & Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/yield/stablecoin"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">
                    All Stablecoin Yields
                  </h3>
                  <p className="text-sm text-gray-600">
                    Compare all stablecoin opportunities
                  </p>
                </Link>
                <Link
                  href="/stablecoins"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">
                    Stablecoin Guide
                  </h3>
                  <p className="text-sm text-gray-600">
                    Learn about different stablecoins
                  </p>
                </Link>
                <Link
                  href="/projects"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">DeFi Protocols</h3>
                  <p className="text-sm text-gray-600">
                    Explore supported protocols
                  </p>
                </Link>
                <Link
                  href="/articles/what-are-stablecoins"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">
                    Stablecoin Guide
                  </h3>
                  <p className="text-sm text-gray-600">
                    Learn about stablecoins
                  </p>
                </Link>
              </div>

              {/* Protocol-specific links */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular {data.stablecoin} Protocols
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {data.activeProtocols.slice(0, 8).map((protocol) => (
                    <Link
                      key={protocol}
                      href={`/projects/${protocol
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-center"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        {protocol}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
