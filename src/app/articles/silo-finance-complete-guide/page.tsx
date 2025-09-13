import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Silo Finance Explained (2025): Isolated Markets vs. Managed Vaults — Which Should You Use? | TokenDataView',
  description:
    'Complete guide to Silo Finance - isolated lending markets vs managed vaults. Learn about risk isolation, ERC-4626 vaults, borrowing strategies, and how to earn yields safely in DeFi.',
  keywords: [
    'Silo Finance',
    'isolated lending markets',
    'managed vaults',
    'ERC-4626',
    'DeFi lending',
    'risk isolation',
    'SILO token',
    'xSILO',
    'DeFi yield farming',
    'crypto lending',
    'isolated pools',
    'DeFi security',
    'permissionless lending',
    'ETH USDC lending',
    'DeFi protocol guide',
    'crypto yield opportunities',
    'DeFi risk management',
    'Silo Finance guide',
    'isolated money markets',
    'DeFi vault strategies',
    'crypto yield optimization',
    'DeFi lending protocols',
    'Silo Finance tutorial',
    'DeFi risk management strategies',
    'crypto lending platforms',
    'DeFi yield farming guide',
    'Silo Finance vs Aave',
    'DeFi isolated lending',
    'crypto lending strategies',
    'DeFi protocol comparison',
  ],
  authors: [{ name: 'TokenDataView Team' }],
  creator: 'TokenDataView',
  publisher: 'TokenDataView',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Silo Finance Explained (2025): Isolated Markets vs. Managed Vaults',
    description:
      'Master Silo Finance - isolated lending markets vs managed vaults. Learn about risk isolation, ERC-4626 vaults, and professional DeFi lending strategies.',
    url: 'https://www.tokendataview.com/articles/silo-finance-complete-guide',
    type: 'article',
    locale: 'en_US',
    siteName: 'TokenDataView',
    images: [
      {
        url: 'https://www.tokendataview.com/og-silo-finance-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Silo Finance Complete Guide - Isolated Markets vs Managed Vaults',
        type: 'image/jpeg',
      },
    ],
    publishedTime: '2025-01-12T00:00:00.000Z',
    modifiedTime: '2025-01-12T00:00:00.000Z',
    authors: ['TokenDataView Team'],
    section: 'DeFi Guides',
    tags: [
      'Silo Finance',
      'DeFi',
      'Lending',
      'Yield Farming',
      'Risk Management',
      'ERC-4626',
      'Isolated Markets',
      'Managed Vaults',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TokenDataView',
    creator: '@TokenDataView',
    title: 'Silo Finance Explained (2025): Isolated Markets vs. Managed Vaults',
    description:
      'Master Silo Finance - isolated lending markets vs managed vaults with ERC-4626 vaults and risk isolation.',
    images: ['https://www.tokendataview.com/og-silo-finance-guide.jpg'],
  },
  alternates: {
    canonical:
      'https://www.tokendataview.com/articles/silo-finance-complete-guide',
  },
  other: {
    'article:author': 'TokenDataView Team',
    'article:section': 'DeFi Guides',
    'article:tag':
      'Silo Finance,DeFi,Lending,Yield Farming,Risk Management,ERC-4626,Isolated Markets,Managed Vaults',
  },
};

export default function SiloFinanceGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline:
              'Silo Finance Explained (2025): Isolated Markets vs. Managed Vaults — Which Should You Use?',
            description:
              'Complete guide to Silo Finance - isolated lending markets vs managed vaults with ERC-4626 vaults and risk isolation.',
            author: {
              '@type': 'Organization',
              name: 'TokenDataView',
              url: 'https://www.tokendataview.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'TokenDataView',
              url: 'https://www.tokendataview.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.tokendataview.com/logo.png',
                width: 200,
                height: 60,
              },
            },
            datePublished: '2025-01-12T00:00:00.000Z',
            dateModified: '2025-01-12T00:00:00.000Z',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id':
                'https://www.tokendataview.com/articles/silo-finance-complete-guide',
            },
            image: {
              '@type': 'ImageObject',
              url: 'https://www.tokendataview.com/og-silo-finance-guide.jpg',
              width: 1200,
              height: 630,
              caption:
                'Silo Finance Complete Guide - Isolated Markets vs Managed Vaults',
            },
            articleSection: 'DeFi Guides',
            keywords: [
              'Silo Finance',
              'isolated lending',
              'managed vaults',
              'ERC-4626',
              'DeFi protocol',
              'risk management',
              'DeFi lending',
              'yield farming',
              'crypto lending',
              'DeFi security',
            ],
            wordCount: 3500,
            timeRequired: 'PT20M',
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            about: [
              {
                '@type': 'Thing',
                name: 'Silo Finance',
                description:
                  'Non-custodial lending protocol with isolated markets',
              },
              {
                '@type': 'Thing',
                name: 'DeFi Lending',
                description: 'Decentralized finance lending protocols',
              },
              {
                '@type': 'Thing',
                name: 'Yield Farming',
                description: 'DeFi yield optimization strategies',
              },
            ],
            mentions: [
              {
                '@type': 'Thing',
                name: 'Aave',
                description: 'DeFi lending protocol',
              },
              {
                '@type': 'Thing',
                name: 'ERC-4626',
                description: 'Tokenized Vault Standard',
              },
              {
                '@type': 'Thing',
                name: 'Ethereum',
                description: 'Blockchain platform',
              },
            ],
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.tokendataview.com',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Articles',
                  item: 'https://www.tokendataview.com/articles',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Silo Finance Guide',
                },
              ],
            },
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="hover:text-blue-600"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/articles"
                className="hover:text-blue-600"
              >
                Articles
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">Silo Finance Guide</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Silo Finance Explained (2025): Isolated Markets vs. Managed Vaults —
            Which Should You Use?
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Silo Finance is a non-custodial lending protocol built around
            risk-isolated money markets (&quot;silos&quot;) and an ERC-4626
            Managed Vault layer on top. Learn which approach suits your DeFi
            strategy.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
            <span>By TokenDataView Team</span>
            <span>•</span>
            <time dateTime="2025-01-12">January 12, 2025</time>
            <span>•</span>
            <span>20 min read</span>
            <span>•</span>
            <span>Updated</span>
          </div>

          {/* Primary CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Explore Silo Finance?
            </h2>
            <p className="text-blue-100 mb-6">
              Discover current Silo Finance yields and find the best
              opportunities for your portfolio.
            </p>
            <Link
              href="/yield/stablecoin"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              View Yields
            </Link>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          {/* Summary Section */}
          <section className="mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Summary</h2>
              <p className="text-blue-800 mb-4">
                Silo Finance is a non-custodial lending protocol built around
                risk-isolated money markets (&quot;silos&quot;) and an ERC-4626
                Managed Vault layer on top. In isolated markets, each market is
                strictly scoped (two assets per market), so collateral and
                borrow risk are contained to that market.
              </p>
              <p className="text-blue-800 mb-4">
                Managed Vaults, by contrast, are single-asset deposit vaults
                that allocate liquidity across multiple Silo markets (and,
                subject to configuration, other ERC-4626 destinations) to
                optimise APY without you micro-managing positions. Vault
                deposits earn yield but cannot be used as collateral to borrow;
                if you want to borrow, you interact with isolated markets
                directly.
              </p>
              <p className="text-blue-800">
                Silo is live on Ethereum, Sonic, Arbitrum, and Avalanche.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-3">
                  For Users
                </h3>
                <p className="text-green-800 mb-3">
                  <strong>
                    If you need borrow/lend with collateral control and
                    ring-fenced risk
                  </strong>{' '}
                  → use Isolated Markets.
                </p>
                <p className="text-green-800">
                  <strong>
                    If you want single-asset, &quot;hands-off&quot; yield routed
                    by a professional manager across markets
                  </strong>{' '}
                  → use Managed Vaults.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-purple-800">
                  <li>
                    •{' '}
                    <a
                      href="https://docs.silo.finance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Silo V2 Documentation
                    </a>
                  </li>
                  <li>
                    •{' '}
                    <Link
                      href="/projects/silo-finance"
                      className="underline"
                    >
                      TokenDataView Silo Project Page
                    </Link>
                  </li>
                  <li>
                    •{' '}
                    <Link
                      href="/yield/stablecoin"
                      className="underline"
                    >
                      View Current Yields
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What Silo Is Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What Silo Is (and why it&apos;s different)
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Silo flips the classic &quot;shared pool&quot; lending model on
              its head. Instead of one giant pool per chain, each Silo market is
              a two-asset pair (e.g., Base Asset + Bridge Asset). You can lend
              either asset and borrow the other, with risk strictly confined to
              that market. Systemic spillover from one asset to the entire
              protocol is materially reduced because there&apos;s no giant,
              shared collateral basket.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">
                Architectural Innovation
              </h3>
              <p className="text-yellow-800 mb-4">
                Architecturally, Silo runs a standard peer-to-pool,
                over-collateralised model (you deposit, set collateral, borrow
                below LTV; liquidations happen if health falls too low). But
                risk isolation is the core primitive: silos are independent,
                each with its own oracle, interest rate model, and liquidation
                parameters.
              </p>
              <p className="text-yellow-800">
                Silo&apos;s Managed Vaults layer is ERC-4626-compliant. Any
                third-party manager can deploy a vault, define a whitelist of
                markets, and allocate deposits across those markets. This makes
                &quot;deposit once, get diversified Silo exposure&quot; possible
                — with the trade-off that vault deposits don&apos;t power your
                borrowing.
              </p>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <strong>Networks:</strong> Ethereum, Sonic, Arbitrum, Avalanche.
            </p>
          </section>

          {/* Isolated Markets Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Isolated Markets (a.k.a. &quot;Silos&quot;)
            </h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              What you can do:
            </h3>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span>
                  Supply either asset in the silo to earn interest (and any
                  incentives).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span>Enable as collateral and borrow the other asset.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span>
                  Repay and withdraw anytime, subject to solvency and liquidity.
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              How risk isolation works
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Each market has exactly two assets. Your collateral, borrow,
              interest accrual, and liquidation risk are scoped to that pair and
              its oracle(s). A toxic asset listed in one market cannot
              contaminate unrelated markets. This is the main design distinction
              versus large, shared-pool designs.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Key Features
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Interest Rates & Utilisation
                  </h5>
                  <p className="text-gray-700 text-sm">
                    Silo uses a dynamic interest rate model configured per
                    market/asset to target an optimal utilisation range (often
                    implemented via a PI-controller style curve). That means
                    borrow rates respond non-linearly as utilisation climbs,
                    helping balance liquidity.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Oracles</h5>
                  <p className="text-gray-700 text-sm">
                    Oracle adapters are market-level and oracle-agnostic
                    (Chainlink, RedStone, Pyth, DIA, ERC-4626 NAV feeds, etc.).
                    Managers/market deployers choose feeds; this is powerful,
                    but it also means oracle due diligence is part of market due
                    diligence.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Liquidations
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              When health factor hits 0%, positions can be liquidated by
              external liquidators (the protocol doesn&apos;t liquidate you
              itself). Liquidators repay debt, seize and sell collateral, and
              keep a fee.
            </p>
          </section>

          {/* Managed Vaults Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Managed Vaults (ERC-4626)
            </h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              What they are
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Single-asset deposit vaults that allocate your deposits across
              whitelisted Silo markets. A third-party vault manager sets policy,
              rebalances across markets, and charges a performance fee. The
              goal: deliver optimised, diversified yield while inheriting
              market-level risk isolation from the underlying silos.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-red-900 mb-4">
                Two big differences vs. Isolated Markets:
              </h3>
              <ul className="space-y-2 text-red-800">
                <li>
                  •{' '}
                  <strong>
                    Deposits can&apos;t be used as collateral for borrowing.
                  </strong>{' '}
                  If you want leverage or borrow stablecoins, you go to the silo
                  directly.
                </li>
                <li>
                  • <strong>Manager discretion:</strong> you&apos;re trusting a
                  smart-contracted mandate plus the manager&apos;s allocation
                  logic. You should evaluate the manager&apos;s track record,
                  mandate, and risk controls.
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Who creates vaults?
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              They&apos;re permissionless to deploy. Notable managers in the
              broader EVM ecosystem include Steakhouse Financial, known for
              institutional-grade vault curation and RWA work; they actively
              curate lending vaults (e.g., on Morpho) and specialise in
              stablecoin/RWA strategies. You&apos;ll also see community managers
              proposing Silo vaults via governance. Evaluate each manager&apos;s
              mandate, whitelist, fee schedule, and disclosures.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-blue-800">
                <strong>Note:</strong> Silo&apos;s documentation indicates
                vaults are ERC-4626 and can (subject to configuration) allocate
                to Silo v2 markets and other ERC-4626 destinations. Always read
                the specific vault docs/whitelist.
              </p>
            </div>
          </section>

          {/* Head-to-Head Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Head-to-Head: Isolated Markets vs. Managed Vaults
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Dimension
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Isolated Markets (Silos)
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Managed Vaults
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Primary use
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Borrow/lend with collateral; strategy control.
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Single-asset deposit for optimised, manager-run yield.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Risk model
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Risk confined to the two-asset market you use; oracle/IRM
                      set per market.
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Inherits market isolation, but adds manager + allocation
                      risk across multiple markets.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Complexity
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Higher: you manage collateral, LTV, liquidation risk.
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Lower: &quot;deposit & let the manager allocate.&quot;
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Borrowing
                    </td>
                    <td className="py-3 px-4 text-green-600">
                      Yes (over-collateralised).
                    </td>
                    <td className="py-3 px-4 text-red-600">
                      No — deposits aren&apos;t borrowing collateral.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Targets
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Power-users, hedgers, structured strategies.
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Yield seekers who want diversification without active
                      management.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Fees
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Protocol reserve factors; gas; any incentive dynamics.
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Performance fee to manager + underlying market fees.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Due diligence
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Market parameters, feed quality, liquidity depth.
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      As left plus: manager track, whitelist, mandate,
                      rebalancing rules.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Silo vs Aave Comparison */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How Silo Compares to Aave (V3)
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Aave popularised the shared-pool model with robust risk tooling
              (caps, isolation mode, e-mode). Aave V3&apos;s Isolation Mode
              lists certain collaterals with strict borrow restrictions (often
              stablecoin-only) and debt ceilings to contain tail risk — but
              liquidity still resides in a large, multipurpose pool per market.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-green-900 mb-4">
                Key Differences
              </h3>
              <p className="text-green-800 mb-4">
                Silo differs in default granularity: every market is inherently
                isolated to two assets. There&apos;s no sprawling, shared
                collateral basket for that market; the blast radius of a bad
                asset is limited to the silo that lists it. Practically, that
                can reduce systemic contagion risk and allow long-tail assets to
                exist without endangering unrelated pairs.
              </p>
              <p className="text-green-800">
                Aave&apos;s e-mode and isolation give excellent capital
                efficiency for tightly correlated assets and controlled exposure
                to new listings — ideal for blue-chip stables and LSDs.
                Silo&apos;s approach maximises ring-fencing by design and then
                re-aggregates via Managed Vaults for depositors who want
                convenience.
              </p>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              <strong>Consider your goal:</strong> leverage and deep liquidity
              (Aave) vs. bespoke pair risk and vault-routed yield (Silo).
            </p>
          </section>

          {/* Step-by-Step User Journeys */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Step-by-Step: Two User Journeys
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  A) Using Isolated Markets
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      1
                    </span>
                    <span>
                      Choose chain & market (e.g., ETH/USDC silo on Arbitrum).
                      Verify oracle(s), reserve factors, and utilisation.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      2
                    </span>
                    <span>
                      Supply Asset A, enable as collateral (optional), and check
                      your health factor.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      3
                    </span>
                    <span>
                      Borrow Asset B within LTV limits, leaving a safety buffer
                      vs. liquidation.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      4
                    </span>
                    <span>
                      Manage: monitor rates, market utilisation, and your
                      health.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      5
                    </span>
                    <span>Repay & withdraw when done.</span>
                  </li>
                </ol>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  B) Using Managed Vaults
                </h3>
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      1
                    </span>
                    <span>
                      Pick a vault matching your deposit asset (e.g., USDC
                      Vault) and read the vault mandate: whitelist, target
                      markets (stables/RWA focus), fees.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      2
                    </span>
                    <span>
                      Deposit your asset — you receive vault shares (ERC-4626).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      3
                    </span>
                    <span>
                      The manager allocates to whitelisted Silo markets (and
                      potentially other ERC-4626 targets per the vault&apos;s
                      policy).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      4
                    </span>
                    <span>
                      Claim/compound as per vault mechanics; withdraw any time
                      (subject to liquidity).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-1">
                      5
                    </span>
                    <span>
                      Track manager updates (governance/forum) and rate
                      behaviour.
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </section>

          {/* Assets & Markets Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Assets & Markets (focus: Stables & RWA)
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Silo supports market creators to list pairs across chains, with
              oracles chosen per market. For yield, stablecoin markets (USDC,
              etc.) and RWA-adjacent markets are typically the most intuitive
              entry point for conservative depositors, while traders might
              prefer volatile pairs for borrow opportunities.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">
                When evaluating any stable/RWA market, verify:
              </h3>
              <ul className="space-y-2 text-yellow-800">
                <li>
                  • <strong>Oracle provider & pricing methodology</strong>{' '}
                  (e.g., Chainlink vs. RedStone; pull/push; smoothing).
                </li>
                <li>
                  • <strong>Liquidity depth & utilisation</strong> (impacts
                  withdrawal and rate spikes).
                </li>
                <li>
                  • <strong>Interest rate curve and reserve factor</strong>{' '}
                  (lender APY take).
                </li>
              </ul>
            </div>
          </section>

          {/* Token & Governance Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Token & Governance (quick)
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              SILO is the governance token. xSILO is the staked/escrowed form
              that participates in revenue sharing. As of 1 Sep 2025, xSILO
              receives revenue in USDC, following a governance update. A
              separate governance decision (Aug 2025) approved distributing 50%
              of protocol revenue to xSILO holders in ETH/USDC; always check the
              latest forum posts for exact split and chains.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Governance occurs on the Silo forum and associated voting venues;
              it covers parameter changes, vault programmes, and revenue policy.
            </p>
          </section>

          {/* Security Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Security, Audits & Known Incidents
            </h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Audits/Formal methods
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Recent reviews by Sigma Prime and Certora are documented in
              Silo&apos;s audits page. Always read the latest reports/notes for
              scope and findings.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-red-900 mb-4">
                June 25, 2025 incident
              </h3>
              <p className="text-red-800 mb-4">
                A pre-release leverage module (separate from core Silo markets)
                suffered a borrow-manipulation exploit via overly broad
                approvals (≈ $545k impact). According to Certora&apos;s write-up
                and multiple analyses, core markets and user funds were not at
                risk.
              </p>
              <p className="text-red-800">
                <strong>Lessons:</strong> minimise privileged approvals,
                segregate experimental modules, and monitor event streams.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Risk you still own (both tracks):
            </h3>
            <ul className="space-y-2 text-gray-700 mb-8">
              <li>• Oracle risk (bad feeds → wrong liquidations).</li>
              <li>
                • Interest rate volatility/liquidity risk at high utilisation.
              </li>
              <li>
                • Liquidation risk if your LTV goes too high (isolated markets).
              </li>
              <li>
                • Manager/mandate risk (vault track): fees, whitelist choices,
                rebalance cadence.
              </li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-blue-800">
                <strong>Important:</strong> Read the Silo risk pages and
                specific market/vault docs before depositing.
              </p>
            </div>
          </section>

          {/* Practical Tips Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Practical Tips (actionable)
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  For yield hunters (no borrow)
                </h3>
                <p className="text-gray-700 mb-4">
                  Start with a Managed Vault in your deposit asset (e.g., USDC)
                  curated by a reputable manager. Confirm the vault&apos;s
                  whitelist emphasises stablecoin/RWA markets and check
                  performance/fee disclosures. Then monitor utilisation and APY
                  trends on-chain or via dashboards.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  For strategy builders/borrowers
                </h3>
                <p className="text-gray-700 mb-4">
                  Use Isolated Markets. Keep a conservative safety buffer
                  (liquidation bands can move fast under stress). If you&apos;re
                  running basis or delta-neutral, model the interest curve
                  sensitivity and potential oracle lags.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-green-900 mb-4">
                General Best Practices
              </h3>
              <ul className="space-y-2 text-green-800">
                <li>
                  • <strong>Diversify oracle exposure:</strong> favour markets
                  with mature oracle stacks (Chainlink/RedStone) and
                  well-documented parameters.
                </li>
                <li>
                  • <strong>Security hygiene:</strong> use hardware wallets,
                  verify contract addresses from official docs, and prefer
                  audited markets/vaults.
                </li>
              </ul>
            </div>
          </section>

          {/* Silo vs Aave at a Glance */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Silo vs. Aave at a Glance (for the &quot;which one?&quot;
              question)
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Choose Silo Isolated Markets when:
                  </h3>
                  <p className="text-gray-700">
                    You need pair-level risk ring-fencing or want to
                    list/participate in idiosyncratic assets without touching a
                    giant shared pool.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Choose Silo Managed Vaults when:
                  </h3>
                  <p className="text-gray-700">
                    You want hands-off, single-asset yield with manager curation
                    across multiple Silo markets.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Choose Aave V3 when:
                  </h3>
                  <p className="text-gray-700">
                    You want deep shared liquidity, plus Isolation Mode/e-mode
                    for capital-efficient borrowing in correlated asset classes
                    (e.g., stables, LSDs) — accepting that it&apos;s still a
                    shared pool with governance-enforced caps rather than
                    pair-native isolation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How to Get Started */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Get Started (fast)
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">
                  Yield-first path:
                </h3>
                <ol className="space-y-2 text-green-800">
                  <li>1. Pick a chain (ETH / Arbitrum / Sonic / Avalanche).</li>
                  <li>
                    2. Choose a USDC or stablecoin Managed Vault with a clear
                    mandate (e.g., stable/RWA focus).
                  </li>
                  <li>3. Deposit → monitor APY and manager updates.</li>
                </ol>
                <div className="mt-4">
                  <Link
                    href="/yield/stablecoin"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
                  >
                    View Yields
                  </Link>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Borrow-first path:
                </h3>
                <ol className="space-y-2 text-blue-800">
                  <li>
                    1. Pick your Isolated Market for the asset pair you care
                    about.
                  </li>
                  <li>
                    2. Supply collateral, borrow within limits, maintain a
                    safety buffer.
                  </li>
                  <li>3. Repay/withdraw.</li>
                </ol>
                <div className="mt-4">
                  <Link
                    href="/projects/silo-finance"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                  >
                    View Silo Project Page
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is a Managed Vault safer than lending directly in a silo?
                </h3>
                <p className="text-gray-700">
                  Different risks. Vaults diversify across markets but add
                  manager/mandate risk. Direct silo lending removes manager risk
                  but concentrates you in one market. Evaluate which risk you
                  prefer.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I borrow against a Managed Vault deposit?
                </h3>
                <p className="text-gray-700">
                  No. Vault deposits aren&apos;t collateral. Borrowing requires
                  interacting with isolated markets directly.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Which chains are supported today?
                </h3>
                <p className="text-gray-700">
                  Ethereum, Sonic, Arbitrum, Avalanche (check app/docs for live
                  status).
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How are rates set?
                </h3>
                <p className="text-gray-700">
                  Per-market dynamic interest rate models target an optimal
                  utilisation; borrow demand drives lender APY.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What happened in the June 2025 incident?
                </h3>
                <p className="text-gray-700">
                  A pre-release leverage module (separate from core) was
                  exploited (~$545k). Core markets and user funds were not at
                  risk, per Certora&apos;s report.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Explore Silo Finance?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start earning competitive yields with Silo Finance&apos;s isolated
              lending markets or managed vaults. Compare rates and find the best
              opportunities for your portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/yield/stablecoin"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Silo Yields
              </Link>
              <Link
                href="/projects/silo-finance"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                Silo Project Page
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
