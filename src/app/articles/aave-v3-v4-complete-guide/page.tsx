import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title:
    'Aave V3 & V4 Explained – DeFi Lending Guide, Yield Strategies & GHO | TokenDataView',
  description:
    'Complete guide to Aave V3 and upcoming V4: lending/borrowing, Isolation Mode, E-Mode, yield strategies, GHO stablecoin, and what&apos;s new in DeFi lending.',
  keywords: [
    'Aave V3',
    'Aave V4',
    'DeFi lending platform',
    'Isolation Mode',
    'E-Mode',
    'GHO stablecoin',
    'over-collateralised loans',
    'crypto yield strategies',
    'aTokens',
    'hub-and-spoke DeFi',
    'DeFi lending',
    'yield farming',
    'crypto lending',
    'DeFi protocol',
    'liquidation risk',
    'DeFi strategies',
    'stablecoin lending',
    'LST looping',
    'DeFi borrowing',
    'Aave protocol guide',
    'DeFi yield optimization',
    'crypto lending strategies',
    'DeFi risk management',
    'Aave tutorial',
    'DeFi lending guide',
    'Aave vs other protocols',
    'DeFi money markets',
    'crypto yield farming guide',
    'DeFi protocol comparison',
    'Aave V4 features',
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
    title:
      'Aave V3 & V4 Explained – DeFi Lending Guide, Yield Strategies & GHO',
    description:
      'Complete guide to Aave V3 and upcoming V4: lending/borrowing, Isolation Mode, E-Mode, yield strategies, and GHO stablecoin integration.',
    url: 'https://www.tokendataview.com/articles/aave-v3-v4-complete-guide',
    type: 'article',
    locale: 'en_US',
    siteName: 'TokenDataView',
    images: [
      {
        url: 'https://www.tokendataview.com/og-aave-v3-v4-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Aave V3 & V4 Complete Guide - DeFi Lending and Yield Strategies',
        type: 'image/jpeg',
      },
    ],
    publishedTime: '2025-01-12T00:00:00.000Z',
    modifiedTime: '2025-01-12T00:00:00.000Z',
    authors: ['TokenDataView Team'],
    section: 'DeFi Guides',
    tags: [
      'Aave',
      'DeFi',
      'Lending',
      'Yield Farming',
      'V3',
      'V4',
      'GHO',
      'Isolation Mode',
      'E-Mode',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TokenDataView',
    creator: '@TokenDataView',
    title:
      'Aave V3 & V4 Explained – DeFi Lending Guide, Yield Strategies & GHO',
    description:
      'Complete guide to Aave V3 and upcoming V4: lending/borrowing, Isolation Mode, E-Mode, yield strategies, and GHO stablecoin.',
    images: ['https://www.tokendataview.com/og-aave-v3-v4-guide.jpg'],
  },
  alternates: {
    canonical:
      'https://www.tokendataview.com/articles/aave-v3-v4-complete-guide',
  },
  other: {
    'article:author': 'TokenDataView Team',
    'article:section': 'DeFi Guides',
    'article:tag':
      'Aave,DeFi,Lending,Yield Farming,V3,V4,GHO,Isolation Mode,E-Mode',
  },
};

export default function AaveV3V4Guide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline:
              'Aave V3 & V4 Explained – DeFi Lending Guide, Yield Strategies & GHO',
            description:
              'Complete guide to Aave V3 and upcoming V4: lending/borrowing, Isolation Mode, E-Mode, yield strategies, and GHO stablecoin integration.',
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
                'https://www.tokendataview.com/articles/aave-v3-v4-complete-guide',
            },
            image: {
              '@type': 'ImageObject',
              url: 'https://www.tokendataview.com/og-aave-v3-v4-guide.jpg',
              width: 1200,
              height: 630,
              caption:
                'Aave V3 & V4 Complete Guide - DeFi Lending and Yield Strategies',
            },
            articleSection: 'DeFi Guides',
            keywords: [
              'Aave V3',
              'Aave V4',
              'DeFi lending',
              'Isolation Mode',
              'E-Mode',
              'GHO stablecoin',
              'yield strategies',
              'aTokens',
              'DeFi protocol',
              'crypto lending',
            ],
            wordCount: 5000,
            timeRequired: 'PT13M',
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            about: [
              {
                '@type': 'Thing',
                name: 'Aave',
                description: 'Decentralized lending protocol',
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
                name: 'GHO',
                description: 'Aave&apos;s native stablecoin',
              },
              {
                '@type': 'Thing',
                name: 'Ethereum',
                description: 'Blockchain platform',
              },
              {
                '@type': 'Thing',
                name: 'Liquid Staking',
                description: 'Staking derivative tokens',
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
                  name: 'Aave V3 & V4 Guide',
                },
              ],
            },
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is Aave and how does it work?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Aave is a decentralized money market protocol that allows users to supply assets to earn interest and borrow other assets against collateral. Users deposit assets to receive interest-bearing aTokens, which accrue yield in real time and are composable across DeFi.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What are Isolation Mode and E-Mode?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Isolation Mode lists riskier assets with tight guardrails - if used as collateral, you can only borrow approved stablecoins within a debt ceiling. E-Mode boosts LTVs for highly correlated assets like stablecoins or liquid staking tokens, enabling higher borrowing within those categories.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How is Aave V4 different from V3?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Aave V4 introduces a hub-and-spoke architecture with unified liquidity per chain, modular Spokes for specialized markets, dynamic risk-based pricing, improved cross-chain UX, and deeper GHO integration. This reduces liquidity fragmentation while enabling faster innovation.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is GHO and how do I mint it?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'GHO is Aave&apos;s over-collateralized, DAO-governed stablecoin. To mint GHO, supply and enable collateral on Aave, then borrow GHO within safe limits. Staking AAVE (stkAAVE) can unlock discounted GHO borrowing rates.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What are the main risks when using Aave?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Key risks include liquidation risk (if health factor drops below 1), asset/peg risk from depegs, interest rate volatility, governance changes to parameters, and smart contract risk. Always maintain healthy buffers and diversify your positions.',
                  },
                },
              ],
            },
          }),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="prose prose-lg max-w-none">
          {/* Header */}
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Aave V3 and V4 Explained: DeFi Lending, Yield Strategies, and
              What&apos;s New
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Estimated reading time: ~13 minutes
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                TL;DR (for the skimmers)
              </h2>
              <div className="space-y-4 text-blue-800">
                <p>
                  <strong>Aave V3</strong> = today&apos;s workhorse: supply
                  assets to earn; over-collateralised borrowing. Headliners:{' '}
                  <strong>Isolation Mode</strong> (safer listings) and{' '}
                  <strong>E-Mode</strong> (higher LTV for correlated assets like
                  stables/LSTs).
                </p>
                <p>
                  <strong>Who it&apos;s for:</strong> retail yield seekers
                  (simple stablecoin lending), &quot;degens&quot; (loops, basis,
                  leveraged LST), and pros/treasuries (deep blue-chip
                  liquidity).
                </p>
                <p>
                  <strong>Popular strategies:</strong> simple stablecoin
                  lending; E-Mode loops (e.g., stETH/ETH) to amplify staking
                  yield; borrow cheap, farm higher (carry trades) when borrow
                  APR &lt; external yields; mint GHO for low-cost stablecoin
                  liquidity (stkAAVE can reduce GHO APR).
                </p>
                <p>
                  <strong>Key risks:</strong> liquidation if health factor &lt;
                  1, asset/peg risk, interest swings, and
                  smart-contract/governance changes. Keep buffers; stick to
                  major assets if new.
                </p>
                <p>
                  <strong>Aave V4</strong> = next upgrade: Hub-and-Spoke
                  architecture (unified liquidity per chain + modular Spokes),
                  risk-based pricing (safer collateral → cheaper loans),
                  smoother cross-chain UX, and deeper GHO integration.
                </p>
                <p>
                  <strong>Why it matters:</strong> less liquidity fragmentation,
                  faster innovation (specialised Spokes), fairer pricing, and
                  simpler multi-chain use—without sacrificing risk controls.
                </p>
              </div>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Summary</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Aave is one of the largest decentralised money markets in DeFi. V3
              powers today&apos;s lending/borrowing across many chains and
              introduced safety/capital-efficiency tools like Isolation Mode and
              E-Mode. V4 is the next major upgrade: a modular hub-and-spoke
              design (unified liquidity per network with specialised
              &quot;Spokes&quot;), refreshed risk engines, and smoother
              cross-chain UX. Aave also issues GHO, an over-collateralised,
              DAO-governed stablecoin. For a full GHO deep dive, see{' '}
              <Link
                href="/articles/gho-aave-stablecoin"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                /articles/gho-aave-stablecoin
              </Link>
              .
            </p>
          </section>

          {/* What Aave Is and How It Works */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What Aave Is and How It Works
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Non-custodial pooled lending
                </h3>
                <p className="text-gray-700">
                  Deposit assets to earn interest; optionally enable as
                  collateral to borrow other assets.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  aTokens
                </h3>
                <p className="text-gray-700">
                  Your deposit mints an interest-bearing aToken (e.g., aUSDC)
                  that accrues yield in real time and is composable across DeFi.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Over-collateralised loans
                </h3>
                <p className="text-gray-700">
                  Borrow up to each asset&apos;s LTV; keep Health Factor &gt; 1
                  to avoid liquidation.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Liquidations
                </h3>
                <p className="text-gray-700">
                  If HF &lt; 1, third-party liquidators repay debt and seize
                  collateral with a bonus, keeping pools solvent.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-green-900 mb-4">
                Who uses it
              </h3>
              <ul className="text-green-800 space-y-2">
                <li>
                  • <strong>Retail:</strong> passive stablecoin yields
                </li>
                <li>
                  • <strong>Degens:</strong> loops/basis/arbs
                </li>
                <li>
                  • <strong>DAOs/treasuries:</strong> park reserves,
                  conservative leverage
                </li>
                <li>
                  • <strong>Integrators:</strong> building on Aave&apos;s
                  infrastructure
                </li>
              </ul>
            </div>
          </section>

          {/* Aave V3 — Key Features */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Aave V3 — Key Features
            </h2>

            <div className="space-y-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Isolation Mode
                </h3>
                <p className="text-gray-700 mb-4">
                  Lists riskier/new assets with tight guardrails:
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>
                    • If used as collateral, you can only borrow
                    governance-approved stables and within a debt ceiling.
                  </li>
                  <li>
                    • Prevents a toxic asset from contaminating the whole pool;
                    great for long-tail listings.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  High Efficiency Mode (E-Mode)
                </h3>
                <p className="text-gray-700 mb-4">
                  Boosts LTVs for highly correlated assets (e.g., stablecoin or
                  LST categories):
                </p>
                <ul className="text-gray-700 space-y-2 ml-6">
                  <li>
                    • Enable E-Mode to borrow more within that category (e.g.,
                    USDC↔DAI, wstETH↔ETH).
                  </li>
                  <li>
                    • Powerful for staking-yield loops; mind tighter liquidation
                    margins.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Multichain & Portals
                </h3>
                <p className="text-gray-700">
                  V3 runs on multiple L1/L2s; Portals enable approved bridges to
                  move aToken liquidity cross-chain, easing fragmentation (V4
                  improves this further).
                </p>
              </div>
            </div>
          </section>

          {/* Practical Yield Strategies (V3) */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Practical Yield Strategies (V3)
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Simple lending
                </h3>
                <p className="text-gray-700">
                  Deposit USDC/DAI/USDT or blue-chips for passive APY.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Stablecoin carry
                </h3>
                <p className="text-gray-700">
                  Borrow a cheap stable; deploy into a higher-yield venue (net
                  the spread).
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  LST looping (E-Mode)
                </h3>
                <p className="text-gray-700">
                  Deposit wstETH → borrow ETH → buy more wstETH → repeat to
                  amplify staking yield. Watch HF and rate spreads.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Mint GHO cheaply
                </h3>
                <p className="text-gray-700">
                  Borrow GHO (often the lowest stable borrow APR); stkAAVE can
                  unlock discounted tranches. Use GHO directly or swap if
                  needed.
                </p>
              </div>
            </div>
          </section>

          {/* Risks */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Risks (read this)
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">
                  Liquidation risk
                </h3>
                <p className="text-red-800">
                  Volatile collateral or narrow buffers can drive HF &lt; 1 →
                  liquidation penalty. Keep headroom.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">
                  Asset/peg risk
                </h3>
                <p className="text-red-800">
                  Depegs and thin liquidity increase liquidation/bad-debt risk;
                  Isolation Mode assets have stricter rules for a reason.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">
                  Rate/governance risk
                </h3>
                <p className="text-red-800">
                  Parameters, borrow caps, and facilitator settings can change
                  via governance.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">
                  Smart-contract risk
                </h3>
                <p className="text-red-800">
                  Battle-tested but never zero; use official interfaces,
                  diversify, and size positions prudently.
                </p>
              </div>
            </div>
          </section>

          {/* Aave V4 — What's Changing */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Aave V4 — What&apos;s Changing
            </h2>

            <div className="space-y-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Hub-and-Spoke Architecture
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    • Liquidity Hub per chain pools all deposits → no fragmented
                    markets.
                  </li>
                  <li>
                    • Spokes are modular markets (e.g., Stablecoin Spoke,
                    Isolation Spoke, RWA Spoke) with custom rules that tap the
                    shared Hub.
                  </li>
                  <li>
                    • Outcome: deeper books, faster iteration, safer
                    compartmentalisation (Hub caps a Spoke&apos;s draw to bound
                    risk).
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Dynamic Risk-Based Pricing
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    • Safer collateral → cheaper loans; riskier → higher
                    premiums.
                  </li>
                  <li>
                    • Finer-grained risk controls and quicker responses to
                    volatility.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Cross-Chain UX
                </h3>
                <p className="text-gray-700">
                  Protocol-level bridging (e.g., CCIP) aims for supply on chain
                  A, borrow on chain B flows, unified accounts, and simpler
                  migrations.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Deeper GHO Integration
                </h3>
                <p className="text-gray-700">
                  Smoother minting/redemptions, cross-chain support, and roadmap
                  items like sGHO (savings). GHO becomes a first-class citizen
                  in V4.
                </p>
              </div>
            </div>
          </section>

          {/* GHO — Aave's Native Stablecoin */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              GHO — Aave&apos;s Native Stablecoin (quick take)
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <ul className="text-blue-800 space-y-2">
                <li>
                  • Over-collateralised, DAO-governed USD stablecoin, minted
                  when borrowing against Aave collateral.
                </li>
                <li>
                  • Low borrow APR vs peers; stkAAVE holders can mint
                  allocations at discounted APR.
                </li>
                <li>
                  • Interest flows to the Aave DAO treasury (supports protocol
                  sustainability).
                </li>
              </ul>
              <p className="text-blue-800 mt-4">
                👉 Full explainer:{' '}
                <Link
                  href="/articles/gho-aave-stablecoin"
                  className="underline hover:text-blue-600"
                >
                  /articles/gho-aave-stablecoin
                </Link>
              </p>
            </div>
          </section>

          {/* Step-by-Step Walkthroughs (V3) */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Step-by-Step Walkthroughs (V3)
            </h2>

            <div className="space-y-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  A) Supplying/Lending
                </h3>
                <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Connect wallet to Aave V3 market (choose chain).</li>
                  <li>Pick asset → Approve → Supply.</li>
                  <li>Receive aTokens; APY accrues continuously.</li>
                  <li>Withdraw anytime (subject to liquidity).</li>
                </ol>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  B) Borrowing
                </h3>
                <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Enable collateral on your supplied asset.</li>
                  <li>
                    Select borrow asset (e.g., USDC), choose amount (leave
                    buffer), pick variable/stable if offered.
                  </li>
                  <li>
                    Borrow → receive tokens in wallet; track Health Factor.
                  </li>
                  <li>Repay partially or fully anytime.</li>
                </ol>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  C) Minting GHO
                </h3>
                <ol className="text-gray-700 space-y-2 list-decimal list-inside">
                  <li>Supply/enable collateral.</li>
                  <li>Choose GHO in Borrow; size within safe limits.</li>
                  <li>Borrow (mint) GHO; use or swap as needed.</li>
                  <li>
                    Repay GHO (buy back if you swapped it) to unlock collateral.
                  </li>
                </ol>
                <p className="text-gray-600 mt-4 text-sm">
                  <strong>Tip:</strong> Staking AAVE (stkAAVE) can unlock
                  discounted GHO borrowing tranches.
                </p>
              </div>
            </div>
          </section>

          {/* Aave vs Silo vs Maple */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Aave vs Silo vs Maple (at a glance)
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aave (V3→V4)
                  </h3>
                  <p className="text-gray-700">
                    Shared-pool money market with robust rails; V4 unifies
                    liquidity and modularises risk for scale.
                  </p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Silo
                  </h3>
                  <p className="text-gray-700">
                    Pair-isolated markets by default; vaults for passive
                    allocation; maximal ring-fencing with more fragmentation.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Maple
                  </h3>
                  <p className="text-gray-700">
                    Curated institutional credit; retail access via
                    yield-bearing tokens (e.g., syrupUSDC) and BTC yield; not a
                    permissionless borrow market.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Conclusion
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Aave remains a blue-chip DeFi primitive: flexible, liquid, and
              hardened by years of market stress. V3 delivers proven tools
              (Isolation Mode, E-Mode) for everyday lenders and advanced
              strategists. V4 pushes the frontier with unified liquidity,
              modular Spokes, risk-based pricing, and better cross-chain UX—all
              while deepening GHO&apos;s role. Whether you&apos;re here for
              simple stablecoin APY or complex leveraged loops, Aave offers the
              spectrum—just manage risk, keep buffers, and stay informed.
            </p>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Explore Aave?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover current Aave yields and compare lending opportunities
              across DeFi protocols. Find the best rates for your stablecoin and
              crypto lending strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/yield/stablecoin"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Current Yields
              </Link>
              <Link
                href="/projects"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                Explore All Protocols
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
