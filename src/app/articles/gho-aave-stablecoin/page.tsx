import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title:
    'GHO Stablecoin Explained – Aave&apos;s Native Dollar for Cheap DeFi Borrowing | TokenDataView',
  description:
    'What is GHO? Learn how Aave&apos;s stablecoin works, why it&apos;s cheaper to borrow, its risks, and how it compares to DAI & USDC in 2025.',
  keywords: [
    'GHO stablecoin',
    'Aave GHO',
    'mint GHO Aave',
    'over-collateralised stablecoin',
    'decentralised stablecoin',
    'sGHO savings rate',
    'stkAAVE discount',
    'GHO vs DAI',
    'GHO vs USDC',
    'Aave stablecoin',
    'DeFi borrowing',
    'cheap stablecoin borrowing',
    'GHO minting',
    'Aave DAO',
    'stablecoin comparison',
    'DeFi lending',
    'crypto stablecoin',
    'GHO risks',
    'GHO liquidity',
    'Aave V4 GHO',
    'GHO peg stability',
    'DeFi stablecoin guide',
    'GHO yield farming',
    'Aave protocol revenue',
    'GHO governance',
    'stablecoin strategies',
    'DeFi borrowing strategies',
    'GHO vs USDe',
    'Aave ecosystem',
    'DeFi stablecoin comparison',
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
      'GHO Stablecoin Explained – Aave&apos;s Native Dollar for Cheap DeFi Borrowing',
    description:
      'What is GHO? Learn how Aave&apos;s stablecoin works, why it&apos;s cheaper to borrow, its risks, and how it compares to DAI & USDC.',
    url: 'https://www.tokendataview.com/articles/gho-aave-stablecoin',
    type: 'article',
    locale: 'en_US',
    siteName: 'TokenDataView',
    images: [
      {
        url: 'https://www.tokendataview.com/og-gho-stablecoin-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'GHO Stablecoin Complete Guide - Aave&apos;s Native Dollar',
        type: 'image/jpeg',
      },
    ],
    publishedTime: '2025-01-12T00:00:00.000Z',
    modifiedTime: '2025-01-12T00:00:00.000Z',
    authors: ['TokenDataView Team'],
    section: 'DeFi Guides',
    tags: [
      'GHO',
      'Aave',
      'Stablecoin',
      'DeFi',
      'Borrowing',
      'Lending',
      'sGHO',
      'stkAAVE',
      'Over-collateralised',
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TokenDataView',
    creator: '@TokenDataView',
    title:
      'GHO Stablecoin Explained – Aave&apos;s Native Dollar for Cheap DeFi Borrowing',
    description:
      'What is GHO? Learn how Aave&apos;s stablecoin works, why it&apos;s cheaper to borrow, its risks, and how it compares to DAI & USDC.',
    images: ['https://www.tokendataview.com/og-gho-stablecoin-guide.jpg'],
  },
  alternates: {
    canonical: 'https://www.tokendataview.com/articles/gho-aave-stablecoin',
  },
  other: {
    'article:author': 'TokenDataView Team',
    'article:section': 'DeFi Guides',
    'article:tag':
      'GHO,Aave,Stablecoin,DeFi,Borrowing,Lending,sGHO,stkAAVE,Over-collateralised',
  },
};

export default function GHOStablecoinGuide() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline:
              'GHO Stablecoin Explained – Aave&apos;s Native Dollar for Cheap DeFi Borrowing',
            description:
              'What is GHO? Learn how Aave&apos;s stablecoin works, why it&apos;s cheaper to borrow, its risks, and how it compares to DAI & USDC.',
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
                'https://www.tokendataview.com/articles/gho-aave-stablecoin',
            },
            image: {
              '@type': 'ImageObject',
              url: 'https://www.tokendataview.com/og-gho-stablecoin-guide.jpg',
              width: 1200,
              height: 630,
              caption:
                'GHO Stablecoin Complete Guide - Aave&apos;s Native Dollar',
            },
            articleSection: 'DeFi Guides',
            keywords: [
              'GHO stablecoin',
              'Aave GHO',
              'mint GHO',
              'over-collateralised stablecoin',
              'decentralised stablecoin',
              'sGHO',
              'stkAAVE',
              'DeFi borrowing',
              'stablecoin comparison',
              'Aave DAO',
            ],
            wordCount: 4000,
            timeRequired: 'PT11M',
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            about: [
              {
                '@type': 'Thing',
                name: 'GHO',
                description: 'Aave&apos;s native stablecoin',
              },
              {
                '@type': 'Thing',
                name: 'Aave',
                description: 'Decentralized lending protocol',
              },
              {
                '@type': 'Thing',
                name: 'Stablecoin',
                description: 'Cryptocurrency pegged to stable value',
              },
            ],
            mentions: [
              {
                '@type': 'Thing',
                name: 'DAI',
                description: 'MakerDAO&apos;s stablecoin',
              },
              {
                '@type': 'Thing',
                name: 'USDC',
                description: 'USD Coin stablecoin',
              },
              {
                '@type': 'Thing',
                name: 'USDe',
                description: 'Ethena&apos;s synthetic stablecoin',
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
                  name: 'GHO Stablecoin Guide',
                },
              ],
            },
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is GHO stablecoin?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'GHO is Aave&apos;s native USD-pegged stablecoin, launched in July 2023. It&apos;s over-collateralised, meaning users deposit crypto assets on Aave and can borrow GHO up to a collateral ratio. All parameters are controlled by Aave DAO governance, and interest from GHO borrowing flows 100% to the Aave DAO treasury.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How do I mint GHO on Aave?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'To mint GHO: 1) Supply collateral in Aave V3 (like ETH, wstETH, WBTC, or USDC), 2) Enable the collateral toggle, 3) Go to Borrow section and select GHO, 4) Input the amount you want to borrow (stay below max), 5) Confirm the transaction. GHO will be minted to your wallet. Remember to maintain a healthy collateral ratio to avoid liquidation.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Why is GHO borrowing cheaper than DAI or USDC?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'GHO rates are typically set lower than USDC/DAI on Aave to encourage adoption. Additionally, if you stake AAVE in the Safety Module (stkAAVE), you can borrow a portion of GHO at an even more discounted interest rate. This makes GHO an attractive option for users who need stablecoin liquidity.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What are the risks of using GHO?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Key risks include: collateral liquidation risk (if health factor drops below 1), peg risk due to smaller supply and thinner liquidity compared to USDC/USDT, liquidity risk when swapping large amounts, governance risk as Aave DAO controls rates and parameters, and smart contract risk. Always maintain healthy collateral buffers and understand the risks before borrowing.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is sGHO and when will it launch?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'sGHO (Savings GHO) is a planned feature coming in Aave V4 that will allow holders to deposit idle GHO into a vault to earn yield, similar to Maker&apos;s DAI Savings Rate. This will make holding GHO more attractive, not just borrowing it, and is expected to boost GHO adoption significantly.',
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
              GHO Stablecoin Explained (2025): How Aave&apos;s Native Dollar
              Works
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Estimated reading time: ~11 minutes
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">
                TL;DR (for the skimmers)
              </h2>
              <div className="space-y-4 text-blue-800">
                <p>
                  <strong>What GHO is:</strong> Aave&apos;s native USD-pegged
                  stablecoin, launched in 2023; over-collateralised, governed by
                  the Aave DAO.
                </p>
                <p>
                  <strong>How it&apos;s minted:</strong> Deposit collateral into
                  Aave, borrow GHO; supply must always exceed debt.
                </p>
                <p>
                  <strong>Why it matters:</strong> Borrowing GHO is usually
                  cheaper than borrowing USDC/DAI; interest flows to Aave DAO
                  (protocol revenue).
                </p>
                <p>
                  <strong>Discounts:</strong> If you stake AAVE in the Safety
                  Module (stkAAVE), you can mint GHO at a discounted rate.
                </p>
                <p>
                  <strong>Where it fits:</strong> Key part of Aave V3 today,
                  deeper integration coming in Aave V4 (cross-chain GHO, savings
                  features like sGHO).
                </p>
                <div className="bg-white rounded-lg p-4 mt-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Compare quickly:
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li>
                      • <strong>GHO vs DAI:</strong> Both over-collateralised;
                      GHO controlled by Aave DAO, DAI by MakerDAO.
                    </li>
                    <li>
                      • <strong>GHO vs USDC/USDT:</strong> GHO is fully on-chain
                      & decentralised; USDC/USDT are centralised with issuer
                      risk.
                    </li>
                    <li>
                      • <strong>GHO vs USDe (Ethena):</strong> GHO =
                      conservative over-collateralisation; USDe = synthetic with
                      delta-hedging (riskier).
                    </li>
                  </ul>
                </div>
                <p>
                  <strong>Risks:</strong> peg deviations (still small supply),
                  liquidation risk on your collateral, interest rate governance
                  changes, liquidity depth vs bigger stables.
                </p>
              </div>
            </div>
          </header>

          {/* What Is GHO? */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What Is GHO?
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Launched
                </h3>
                <p className="text-gray-700">July 2023 by the Aave DAO.</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Design
                </h3>
                <p className="text-gray-700">
                  Over-collateralised, like DAI. Users deposit crypto on Aave
                  and borrow GHO up to a collateral ratio.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Governance
                </h3>
                <p className="text-gray-700">
                  All parameters (borrow rate, Facilitators, debt ceilings)
                  controlled by Aave DAO governance.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Peg
                </h3>
                <p className="text-gray-700">
                  Soft-pegged to USD, kept stable by arbitrage (borrow/repay
                  incentives) and governance levers.
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <p className="text-green-800">
                By mid-2025, GHO supply surpassed $300M, making it the 20th
                largest stablecoin. Still small compared to giants (USDT &gt;
                $100B, USDC &gt; $30B), but growing steadily thanks to cheap
                borrowing and Aave&apos;s footprint.
              </p>
            </div>
          </section>

          {/* How GHO Works */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How GHO Works (Step-by-Step)
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Step 1: Deposit Collateral
                </h3>
                <p className="text-gray-700">
                  Deposit collateral into Aave (e.g. ETH, wstETH, WBTC, USDC).
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Step 2: Borrow GHO
                </h3>
                <p className="text-gray-700">
                  Borrow GHO – this mints new GHO into circulation. Your
                  position has a health factor like any Aave loan.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Step 3: Interest Accrues
                </h3>
                <p className="text-gray-700">
                  Interest accrues at a base rate set by governance.
                </p>
                <p className="text-gray-600 mt-2 text-sm">
                  <strong>Example:</strong> if GHO borrow APR = 2%, a 1,000 GHO
                  debt grows to ~1,020 GHO over a year.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Step 4: Repay GHO
                </h3>
                <p className="text-gray-700">
                  Repay GHO (and interest) → your debt clears, collateral is
                  unlocked.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Interest Distribution
              </h3>
              <p className="text-blue-800">
                100% of GHO borrow interest flows to the Aave DAO treasury,
                unlike other assets where only ~10% goes as reserves.
              </p>
            </div>
          </section>

          {/* Key Features of GHO */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Key Features of GHO
            </h2>

            <div className="space-y-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Competitive Borrow Rates
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    • GHO rates are usually set lower than USDC/DAI on Aave to
                    encourage adoption.
                  </li>
                  <li>
                    • Governance can adjust rates depending on demand and peg
                    health.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  stkAAVE Discounts
                </h3>
                <p className="text-gray-700 mb-4">
                  Users staking AAVE in the Safety Module (stkAAVE) can borrow a
                  portion of GHO at a discounted interest rate.
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Example:</strong> Base GHO rate = 2.5% APR. With
                  stkAAVE, part of your loan might accrue at ~1.5% APR.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Facilitators
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    • Only authorised modules/entities
                    (&quot;Facilitators&quot;) can mint GHO.
                  </li>
                  <li>
                    • Currently: the main Facilitator is Aave V3 Ethereum pool.
                  </li>
                  <li>
                    • Future: other Spokes/partners can be added in V4 with
                    governance-set quotas.
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  sGHO (Coming Soon in V4)
                </h3>
                <ul className="text-gray-700 space-y-2">
                  <li>
                    • Planned &quot;Savings GHO&quot; will let holders deposit
                    idle GHO into a vault to earn yield (similar to Maker&apos;s
                    DAI Savings Rate).
                  </li>
                  <li>
                    • This will make holding GHO more attractive, not just
                    borrowing it.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* GHO vs Other Stablecoins */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              GHO vs Other Stablecoins
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Stablecoin
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Model
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Collateral
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Governance
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Risks
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Typical Borrow Cost
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">GHO</td>
                    <td className="py-3 px-4 text-gray-600">
                      Over-collateralised (Aave)
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Crypto assets on Aave
                    </td>
                    <td className="py-3 px-4 text-gray-600">Aave DAO</td>
                    <td className="py-3 px-4 text-gray-600">
                      Peg depth, smaller liquidity
                    </td>
                    <td className="py-3 px-4 text-gray-600">~1.5–3%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">DAI</td>
                    <td className="py-3 px-4 text-gray-600">
                      Over-collateralised (Maker)
                    </td>
                    <td className="py-3 px-4 text-gray-600">ETH + RWAs</td>
                    <td className="py-3 px-4 text-gray-600">MakerDAO</td>
                    <td className="py-3 px-4 text-gray-600">
                      USDC reliance, governance
                    </td>
                    <td className="py-3 px-4 text-gray-600">~2–5%</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      USDC
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Centralised fiat-backed
                    </td>
                    <td className="py-3 px-4 text-gray-600">Cash, T-bills</td>
                    <td className="py-3 px-4 text-gray-600">Circle</td>
                    <td className="py-3 px-4 text-gray-600">
                      Blacklist, issuer risk
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Not borrowed, but lent
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      USDT
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Centralised fiat-backed
                    </td>
                    <td className="py-3 px-4 text-gray-600">Mixed reserves</td>
                    <td className="py-3 px-4 text-gray-600">Tether Ltd</td>
                    <td className="py-3 px-4 text-gray-600">
                      Opacity, issuer risk
                    </td>
                    <td className="py-3 px-4 text-gray-600">Same as USDC</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      USDe
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      Synthetic (delta-hedged)
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      ETH collateral + short perps
                    </td>
                    <td className="py-3 px-4 text-gray-600">Ethena DAO</td>
                    <td className="py-3 px-4 text-gray-600">
                      Exchange risk, funding cost
                    </td>
                    <td className="py-3 px-4 text-gray-600">~8–15%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Risks of Using GHO */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Risks of Using GHO
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">
                  Collateral liquidation risk
                </h3>
                <p className="text-red-800">
                  Borrowing GHO still requires over-collateralisation; if HF
                  &lt; 1, your collateral can be liquidated.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">
                  Peg risk
                </h3>
                <p className="text-red-800">
                  GHO&apos;s peg has held close to $1, but its smaller supply
                  means thinner liquidity vs USDC/USDT. Temporary deviations may
                  occur.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">
                  Liquidity risk
                </h3>
                <p className="text-red-800">
                  Some pools may lack deep GHO liquidity, so swapping large
                  amounts could move price more than for bigger stables.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">
                  Governance risk
                </h3>
                <p className="text-red-800">
                  Aave DAO controls GHO&apos;s rate and Facilitators; parameter
                  changes could impact costs and availability.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">
                  Smart contract risk
                </h3>
                <p className="text-red-800">
                  Same as Aave generally – audited and battle-tested, but never
                  zero.
                </p>
              </div>
            </div>
          </section>

          {/* Strategies With GHO */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Strategies With GHO
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Cheap stablecoin borrowing
                </h3>
                <p className="text-gray-700">
                  Mint GHO for lower APR than other stables; swap to USDC/DAI if
                  needed.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Yield farming
                </h3>
                <p className="text-gray-700">
                  Borrow GHO → farm in Curve/Convex pools; if farm yield &gt;
                  borrow APR, you profit.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Loop with staking discounts
                </h3>
                <p className="text-gray-700">
                  Stake AAVE → borrow discounted GHO → reinvest into Aave
                  ecosystem or farms.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Long-term treasury play
                </h3>
                <p className="text-gray-700">
                  DAOs mint GHO for working capital, keeping Aave ecosystem
                  revenue aligned with usage.
                </p>
              </div>
            </div>
          </section>

          {/* Step-by-Step: Minting & Using GHO */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Step-by-Step: Minting & Using GHO
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <ol className="text-gray-700 space-y-3 list-decimal list-inside">
                <li>Supply collateral in Aave V3 (Ethereum main market).</li>
                <li>Enable collateral toggle.</li>
                <li>
                  Go to Borrow, select GHO, input amount (stay below max).
                </li>
                <li>Confirm borrow → GHO mints to your wallet.</li>
                <li>Use GHO (spend, LP, or swap).</li>
                <li>Repay GHO later to clear debt and free collateral.</li>
              </ol>
              <p className="text-gray-600 mt-4 text-sm">
                <strong>Tip:</strong> Track your borrow APR; if you hold
                stkAAVE, check discounted allocation.
              </p>
            </div>
          </section>

          {/* Outlook: GHO in Aave V4 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Outlook: GHO in Aave V4
            </h2>

            <div className="space-y-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Deeper integration into the Hub-and-Spoke design
                </h3>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Cross-chain GHO minting
                </h3>
                <p className="text-gray-700">
                  (collateral on one chain, mint GHO on another)
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  sGHO Savings Rate to boost adoption
                </h3>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Potential for broader Facilitators
                </h3>
                <p className="text-gray-700">
                  (partners, RWAs) to expand supply
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <p className="text-blue-800">
                <strong>Aave DAO&apos;s aim:</strong> grow GHO into a major
                decentralised stablecoin while funnelling sustainable revenue
                back to the protocol.
              </p>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Conclusion
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              GHO is Aave&apos;s bet on stablecoin dominance. It offers users
              cheaper borrowing, aligns protocol incentives (all interest goes
              to Aave DAO), and provides a decentralised alternative to
              USDC/USDT. While still smaller and less liquid than incumbents,
              its integration with the largest lending platform in DeFi gives it
              strong growth potential. With V4 enhancements like sGHO and
              cross-chain minting, GHO could evolve from &quot;the cheap
              borrow&quot; to a go-to stablecoin for saving and spending across
              DeFi.
            </p>
          </section>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Explore GHO?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover current GHO yields and compare stablecoin opportunities
              across DeFi protocols. Find the best rates for your borrowing and
              lending strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/yield/stablecoin"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                View Stablecoin Yields
              </Link>
              <Link
                href="/projects"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                Explore Aave Protocol
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
