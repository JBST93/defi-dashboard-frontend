import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DeFi Protocols - Aave, Pendle, Gearbox, Stargate & More',
  description: 'Explore comprehensive guides to top DeFi protocols including Aave, Pendle, Gearbox, Stargate, and Spark Lend. Compare features, risks, and yields.',
  keywords: ['DeFi protocols', 'Aave', 'Pendle', 'Gearbox', 'Stargate', 'Spark Lend', 'DeFi comparison', 'protocol features'],
  openGraph: {
    title: 'DeFi Protocols Guide - Compare Top DeFi Platforms',
    description: 'Comprehensive guides to Aave, Pendle, Gearbox, Stargate, and other leading DeFi protocols.',
    url: 'https://www.tokendataview.com/projects',
  },
  alternates: {
    canonical: '/projects',
  },
};

interface Protocol {
  name: string;
  description: string;
  features: string[];
  benefits: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  tvl: string;
  apy: string;
  logo: string;
  website: string;
  category: string;
}

const protocols: Protocol[] = [
  {
    name: 'AAVE',
    description:
      'Aave is a decentralized non-custodial liquidity protocol where users can participate as depositors or borrowers. Depositors provide liquidity to the market to earn a passive income, while borrowers are able to borrow in an overcollateralized (perpetually) or undercollateralized (one-block liquidity) fashion.',
    features: [
      'Flash loans',
      'Variable and stable interest rates',
      'Multiple collateral types',
      'Governance token (AAVE)',
      'Cross-chain deployment',
    ],
    benefits: [
      'High liquidity and deep markets',
      'Proven security track record',
      'Innovative flash loan feature',
      'Strong community governance',
      'Multiple asset support',
    ],
    riskLevel: 'Low',
    tvl: '$12.5B',
    apy: '3.2% - 8.5%',
    logo: '/aave-logo.svg',
    website: 'https://aave.com',
    category: 'Lending',
  },
  {
    name: 'Pendle',
    description:
      'Pendle is a protocol that enables users to trade future yield. It allows users to separate the principal and yield components of yield-bearing tokens, creating new opportunities for yield optimization and risk management.',
    features: [
      'Yield tokenization',
      'Principal and yield separation',
      'Fixed yield trading',
      'AMM for yield tokens',
      'Multiple asset support',
    ],
    benefits: [
      'Yield optimization strategies',
      'Fixed income opportunities',
      'Risk management tools',
      'Innovative yield trading',
      'Capital efficiency',
    ],
    riskLevel: 'Medium',
    tvl: '$850M',
    apy: '5.1% - 12.3%',
    logo: '/pendle-logo.svg',
    website: 'https://pendle.finance',
    category: 'Yield Trading',
  },
  {
    name: 'Gearbox',
    description:
      'Gearbox is a composable leverage protocol that allows users to take leverage on any DeFi strategy. It provides capital efficiency through credit accounts and enables users to amplify their yields through leverage.',
    features: [
      'Composable leverage',
      'Credit accounts',
      'Strategy amplification',
      'Risk management tools',
      'Multi-strategy support',
    ],
    benefits: [
      'Capital efficiency',
      'Leverage opportunities',
      'Strategy composability',
      'Risk management',
      'Yield amplification',
    ],
    riskLevel: 'High',
    tvl: '$320M',
    apy: '8.2% - 18.7%',
    logo: '/gearbox-logo.svg',
    website: 'https://gearbox.fi',
    category: 'Leverage',
  },
  {
    name: 'Stargate',
    description:
      'Stargate is a fully composable liquidity transport protocol that lives at the heart of Omnichain DeFi. It enables users to transfer native tokens cross-chain with instant guaranteed finality.',
    features: [
      'Cross-chain transfers',
      'Instant finality',
      'Native token support',
      'Composable liquidity',
      'Omnichain DeFi',
    ],
    benefits: [
      'Seamless cross-chain experience',
      'Instant transfers',
      'Native token support',
      'Composability',
      'Liquidity efficiency',
    ],
    riskLevel: 'Medium',
    tvl: '$450M',
    apy: '4.5% - 9.8%',
    logo: '/stargate-logo.svg',
    website: 'https://stargateprotocol.com',
    category: 'Cross-Chain',
  },
  {
    name: 'Spark Lend',
    description:
      'Spark Lend is a decentralized lending protocol built on Ethereum, offering competitive lending rates and a user-friendly interface. It focuses on providing stable and reliable lending services with advanced risk management.',
    features: [
      'Decentralized lending',
      'Competitive rates',
      'Risk management',
      'User-friendly interface',
      'Ethereum native',
    ],
    benefits: [
      'Stable lending rates',
      'Advanced risk management',
      'User-friendly experience',
      'Ethereum security',
      'Reliable service',
    ],
    riskLevel: 'Low',
    tvl: '$280M',
    apy: '2.8% - 6.2%',
    logo: '/spark-logo.svg',
    website: 'https://spark.fi',
    category: 'Lending',
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Structured Data for DeFi Protocols */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'DeFi Protocols Guide',
            description: 'Comprehensive guides to top DeFi protocols including Aave, Pendle, Gearbox, Stargate, and Spark Lend.',
            url: 'https://www.tokendataview.com/projects',
            mainEntity: {
              '@type': 'ItemList',
              name: 'DeFi Protocols',
              description: 'List of major DeFi protocols with features and comparisons',
              numberOfItems: protocols.length,
              itemListElement: protocols.map((protocol, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Organization',
                  name: protocol.name,
                  description: protocol.description,
                  url: protocol.website,
                },
              })),
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            DeFi Protocols Overview
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the leading DeFi protocols we support. Each protocol offers
            unique features and opportunities for yield generation, lending, and
            cross-chain operations.
          </p>
        </div>

        {/* Protocol Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {protocols.map((protocol, index) => (
            <div
              key={protocol.name}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Protocol Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-600">
                        {protocol.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {protocol.name}
                      </h2>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {protocol.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Risk Level</div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        protocol.riskLevel === 'Low'
                          ? 'bg-green-100 text-green-800'
                          : protocol.riskLevel === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {protocol.riskLevel}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {protocol.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">Total TVL</div>
                    <div className="text-lg font-bold text-gray-900">
                      {protocol.tvl}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">APY Range</div>
                    <div className="text-lg font-bold text-green-600">
                      {protocol.apy}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features and Benefits */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Features */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {protocol.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start"
                        >
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-600 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {protocol.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start"
                        >
                          <span className="text-blue-500 mr-2">→</span>
                          <span className="text-gray-600 text-sm">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex space-x-3">
                  <Link
                    href={protocol.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                  >
                    Visit Protocol
                  </Link>
                  <Link
                    href={`/stablecoins?search=${protocol.name.toLowerCase()}`}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
                  >
                    View Stablecoins
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Protocol Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Protocol
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    TVL
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    APY Range
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Risk Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {protocols.map((protocol) => (
                  <tr
                    key={protocol.name}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {protocol.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {protocol.category}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{protocol.tvl}</td>
                    <td className="py-3 px-4 text-green-600 font-medium">
                      {protocol.apy}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          protocol.riskLevel === 'Low'
                            ? 'bg-green-100 text-green-800'
                            : protocol.riskLevel === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {protocol.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore real-time yield opportunities across all these protocols and
            start maximizing your DeFi returns today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/yield/stablecoin"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View All Yields
            </Link>
            <Link
              href="/stablecoins"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
            >
              Stablecoin Yields
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
