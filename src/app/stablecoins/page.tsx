import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stablecoins Guide - USDC, USDT, DAI, eUSD & More',
  description: 'Complete guide to stablecoins including USDC, USDT, DAI, eUSD, USDe, and others. Compare features, risks, and lending opportunities.',
  keywords: ['stablecoins', 'USDC', 'USDT', 'DAI', 'eUSD', 'USDe', 'stablecoin guide', 'crypto stablecoins'],
  openGraph: {
    title: 'Stablecoins Guide - Compare All Major Stablecoins',
    description: 'Learn about USDC, USDT, DAI, eUSD, USDe and other stablecoins. Compare features, risks, and DeFi opportunities.',
    url: 'https://www.tokendataview.com/stablecoins',
  },
  alternates: {
    canonical: '/stablecoins',
  },
};

interface Stablecoin {
  name: string;
  symbol: string;
  description: string;
  issuer: string;
  collateralType: 'Fiat-Backed' | 'Crypto-Backed' | 'Algorithmic' | 'Hybrid';
  marketCap: string;
  circulatingSupply: string;
  price: string;
  peggedTo: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  protocols: string[];
  avgAPY: string;
  logo: string;
  website: string;
  features: string[];
}

const stablecoins: Stablecoin[] = [
  {
    name: 'USD Coin',
    symbol: 'USDC',
    description:
      'USDC is a fully collateralized US dollar stablecoin. USDC is issued by regulated financial institutions, backed by fully reserved assets, redeemable on a 1:1 basis for US dollars.',
    issuer: 'Circle',
    collateralType: 'Fiat-Backed',
    marketCap: '$32.5B',
    circulatingSupply: '32.5B USDC',
    price: '$1.00',
    peggedTo: 'USD',
    riskLevel: 'Low',
    protocols: ['AAVE', 'Pendle', 'Gearbox', 'Spark Lend'],
    avgAPY: '4.2%',
    logo: '/usdc-logo.svg',
    website: 'https://www.circle.com/en/usdc',
    features: [
      'Fully collateralized',
      'Regulated issuer',
      '1:1 USD backing',
      'Transparent reserves',
      'Wide adoption',
    ],
  },
  {
    name: 'Tether',
    symbol: 'USDT',
    description:
      'Tether is a stablecoin pegged to the US Dollar. 1 USDT = 1 USD. Tether converts cash into digital currency, to anchor or tether the value to the price of national currencies.',
    issuer: 'Tether Limited',
    collateralType: 'Fiat-Backed',
    marketCap: '$95.2B',
    circulatingSupply: '95.2B USDT',
    price: '$1.00',
    peggedTo: 'USD',
    riskLevel: 'Low',
    protocols: ['AAVE', 'Pendle', 'Gearbox', 'Stargate'],
    avgAPY: '3.8%',
    logo: '/usdt-logo.svg',
    website: 'https://tether.to',
    features: [
      'Largest market cap',
      'High liquidity',
      'Multi-chain support',
      'Wide exchange adoption',
      'Fast transactions',
    ],
  },
  {
    name: 'Dai',
    symbol: 'DAI',
    description:
      'Dai is a decentralized, unbiased, collateral-backed cryptocurrency soft-pegged to the US Dollar. Dai is maintained and regulated by MakerDAO, a decentralized autonomous organization.',
    issuer: 'MakerDAO',
    collateralType: 'Crypto-Backed',
    marketCap: '$5.1B',
    circulatingSupply: '5.1B DAI',
    price: '$1.00',
    peggedTo: 'USD',
    riskLevel: 'Medium',
    protocols: ['AAVE', 'Pendle', 'Gearbox', 'Spark Lend'],
    avgAPY: '5.1%',
    logo: '/dai-logo.svg',
    website: 'https://makerdao.com/en/dai',
    features: [
      'Decentralized governance',
      'Crypto collateralized',
      'Overcollateralized',
      'Community controlled',
      'Transparent operations',
    ],
  },
  {
    name: 'Ethena USD',
    symbol: 'eUSD',
    description:
      'eUSD is a synthetic dollar protocol built on Ethereum that provides a crypto-native solution for money not bound by geography. It offers a stable, scalable, and censorship-resistant form of money.',
    issuer: 'Ethena Labs',
    collateralType: 'Hybrid',
    marketCap: '$2.8B',
    circulatingSupply: '2.8B eUSD',
    price: '$1.00',
    peggedTo: 'USD',
    riskLevel: 'Medium',
    protocols: ['Pendle', 'Gearbox'],
    avgAPY: '8.5%',
    logo: '/eusd-logo.svg',
    website: 'https://ethena.fi',
    features: [
      'Synthetic dollar',
      'High yield potential',
      'Crypto-native design',
      'Delta-neutral strategy',
      'Innovative mechanism',
    ],
  },
  {
    name: 'USDe',
    symbol: 'USDe',
    description:
      'USDe is a synthetic dollar protocol that provides a stable, scalable, and censorship-resistant form of money. It uses a delta-neutral strategy to maintain its peg.',
    issuer: 'Ethena Labs',
    collateralType: 'Hybrid',
    marketCap: '$1.2B',
    circulatingSupply: '1.2B USDe',
    price: '$1.00',
    peggedTo: 'USD',
    riskLevel: 'Medium',
    protocols: ['Pendle', 'Gearbox'],
    avgAPY: '7.9%',
    logo: '/usde-logo.svg',
    website: 'https://ethena.fi',
    features: [
      'Delta-neutral strategy',
      'High yield opportunities',
      'Crypto-native design',
      'Innovative mechanism',
      'Growing adoption',
    ],
  },
  {
    name: 'Frax',
    symbol: 'FRAX',
    description:
      'Frax is a fractional-algorithmic stablecoin protocol. Frax is open-source, permissionless, and entirely on-chain – currently implemented on Ethereum.',
    issuer: 'Frax Finance',
    collateralType: 'Hybrid',
    marketCap: '$650M',
    circulatingSupply: '650M FRAX',
    price: '$1.00',
    peggedTo: 'USD',
    riskLevel: 'Medium',
    protocols: ['AAVE', 'Pendle'],
    avgAPY: '6.2%',
    logo: '/frax-logo.svg',
    website: 'https://frax.finance',
    features: [
      'Fractional-algorithmic',
      'AMO mechanism',
      'FXS governance token',
      'Multi-chain deployment',
      'Innovative design',
    ],
  },
  {
    name: 'Liquity USD',
    symbol: 'LUSD',
    description:
      'LUSD is a decentralized, interest-free stablecoin that is backed by ETH. It is the native stablecoin of the Liquity protocol, which is a decentralized borrowing protocol.',
    issuer: 'Liquity Protocol',
    collateralType: 'Crypto-Backed',
    marketCap: '$180M',
    circulatingSupply: '180M LUSD',
    price: '$1.00',
    peggedTo: 'USD',
    riskLevel: 'Medium',
    protocols: ['AAVE', 'Pendle'],
    avgAPY: '4.8%',
    logo: '/lusd-logo.svg',
    website: 'https://www.liquity.org',
    features: [
      'Interest-free borrowing',
      'ETH collateralized',
      'Decentralized protocol',
      'No governance token',
      'Minimal fees',
    ],
  },
  {
    name: 'Magic Internet Money',
    symbol: 'MIM',
    description:
      'MIM is a stablecoin that is backed by interest-bearing tokens. It is designed to be a stable, decentralized, and censorship-resistant form of money.',
    issuer: 'Abracadabra Money',
    collateralType: 'Crypto-Backed',
    marketCap: '$45M',
    circulatingSupply: '45M MIM',
    price: '$1.00',
    peggedTo: 'USD',
    riskLevel: 'High',
    protocols: ['Pendle'],
    avgAPY: '9.2%',
    logo: '/mim-logo.svg',
    website: 'https://abracadabra.money',
    features: [
      'Interest-bearing collateral',
      'High yield potential',
      'DeFi native',
      'Innovative mechanism',
      'Growing ecosystem',
    ],
  },
];

export default function StablecoinsPage() {
  return (
    <>
      {/* Structured Data for Stablecoins */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Stablecoins Guide',
            description: 'Complete guide to stablecoins including USDC, USDT, DAI, eUSD, USDe, and others.',
            url: 'https://www.tokendataview.com/stablecoins',
            mainEntity: {
              '@type': 'ItemList',
              name: 'Stablecoins',
              description: 'List of major stablecoins with features and comparisons',
              numberOfItems: stablecoins.length,
              itemListElement: stablecoins.map((stablecoin, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'FinancialProduct',
                  name: stablecoin.name,
                  description: stablecoin.description,
                  identifier: stablecoin.symbol,
                  provider: {
                    '@type': 'Organization',
                    name: stablecoin.issuer,
                  },
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
            Stablecoins Overview
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore all the stablecoins supported across our DeFi protocols.
            Each stablecoin offers unique features, risk profiles, and yield
            opportunities for your portfolio.
          </p>
        </div>

        {/* Market Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Market Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stablecoins.length}
              </div>
              <div className="text-gray-600">Total Stablecoins</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                $137.6B
              </div>
              <div className="text-gray-600">Total Market Cap</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                5.8%
              </div>
              <div className="text-gray-600">Average APY</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">6</div>
              <div className="text-gray-600">Supported Protocols</div>
            </div>
          </div>
        </div>

        {/* Stablecoins Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {stablecoins.map((stablecoin) => (
            <div
              key={stablecoin.symbol}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Stablecoin Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-600">
                        {stablecoin.symbol.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {stablecoin.name}
                      </h2>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium text-gray-600">
                          {stablecoin.symbol}
                        </span>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {stablecoin.collateralType}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Risk Level</div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        stablecoin.riskLevel === 'Low'
                          ? 'bg-green-100 text-green-800'
                          : stablecoin.riskLevel === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {stablecoin.riskLevel}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {stablecoin.description}
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">Market Cap</div>
                    <div className="text-lg font-bold text-gray-900">
                      {stablecoin.marketCap}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="text-lg font-bold text-green-600">
                      {stablecoin.price}
                    </div>
                  </div>
                </div>

                {/* Protocols */}
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">
                    Available on:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stablecoin.protocols.map((protocol) => (
                      <span
                        key={protocol}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full"
                      >
                        {protocol}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features and Actions */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {stablecoin.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start"
                      >
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    href={stablecoin.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                  >
                    Visit Website
                  </Link>
                  <Link
                    href={`/projects?search=${stablecoin.symbol.toLowerCase()}`}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
                  >
                    View Protocols ({stablecoin.avgAPY} avg)
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Stablecoin Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Stablecoin
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Market Cap
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Avg APY
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Risk Level
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Protocols
                  </th>
                </tr>
              </thead>
              <tbody>
                {stablecoins.map((stablecoin) => (
                  <tr
                    key={stablecoin.symbol}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {stablecoin.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stablecoin.symbol}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {stablecoin.collateralType}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {stablecoin.marketCap}
                    </td>
                    <td className="py-3 px-4 text-green-600 font-medium">
                      {stablecoin.avgAPY}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          stablecoin.riskLevel === 'Low'
                            ? 'bg-green-100 text-green-800'
                            : stablecoin.riskLevel === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {stablecoin.riskLevel}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {stablecoin.protocols.map((protocol) => (
                          <span
                            key={protocol}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                          >
                            {protocol}
                          </span>
                        ))}
                      </div>
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
            Start Earning on Stablecoins
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Compare yields across all stablecoins and protocols to find the best
            opportunities for your stablecoin holdings.
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
