import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Maple Finance Complete Guide 2025 | Institutional Lending Protocol | TokenDataView',
  description:
    'Complete guide to Maple Finance - the institutional lending protocol. Learn how Maple Finance works, SyrupUSDC, fixed-rate loans, and how to earn institutional-grade yields in DeFi.',
  keywords: [
    'Maple Finance',
    'institutional lending protocol',
    'DeFi lending',
    'SyrupUSDC',
    'fixed-rate loans',
    'overcollateralized lending',
    'institutional DeFi',
    'SYRUP token',
    'DeFi yield farming',
    'crypto lending',
    'professional lending',
    'white-glove service',
    'DeFi protocol guide',
    'crypto yield opportunities',
    'DeFi risk management',
  ],
  openGraph: {
    title: 'Maple Finance Complete Guide 2025 | Institutional Lending Protocol',
    description:
      'Master Maple Finance - the institutional lending protocol bringing traditional finance rigor to DeFi. Learn about SyrupUSDC, fixed-rate loans, and professional lending.',
    url: 'https://www.tokendataview.com/articles/maple-finance-complete-guide',
    type: 'article',
    images: [
      {
        url: 'https://www.tokendataview.com/og-maple-finance-guide.jpg',
        width: 1200,
        height: 630,
        alt: 'Maple Finance Complete Guide - Institutional Lending Protocol',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Maple Finance Complete Guide 2025 | Institutional Lending Protocol',
    description:
      'Master Maple Finance - the institutional lending protocol with SyrupUSDC and fixed-rate loans for professional DeFi lending.',
    images: ['https://www.tokendataview.com/og-maple-finance-guide.jpg'],
  },
  alternates: {
    canonical:
      'https://www.tokendataview.com/articles/maple-finance-complete-guide',
  },
};

export default function MapleFinanceGuide() {
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
              'Maple Finance Complete Guide 2025 | Institutional Lending Protocol',
            description:
              'Complete guide to Maple Finance - the institutional lending protocol with SyrupUSDC and fixed-rate loans.',
            author: {
              '@type': 'Organization',
              name: 'TokenDataView',
            },
            publisher: {
              '@type': 'Organization',
              name: 'TokenDataView',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.tokendataview.com/logo.png',
              },
            },
            datePublished: '2025-01-12',
            dateModified: '2025-01-12',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id':
                'https://www.tokendataview.com/articles/maple-finance-complete-guide',
            },
            image: 'https://www.tokendataview.com/og-maple-finance-guide.jpg',
            articleSection: 'DeFi Guides',
            keywords:
              'Maple Finance, institutional lending, DeFi protocol, SyrupUSDC, fixed-rate loans',
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
            <li className="text-gray-900">Maple Finance Guide</li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Maple Finance Complete Guide 2025: Institutional Lending in DeFi
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover Maple Finance, the pioneering institutional lending
            protocol that brings traditional finance rigor to DeFi. Learn about
            SyrupUSDC, fixed-rate loans, and how to access institutional-grade
            yields through professional lending.
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
            <span>By TokenDataView Team</span>
            <span>•</span>
            <time dateTime="2025-01-12">January 12, 2025</time>
            <span>•</span>
            <span>18 min read</span>
            <span>•</span>
            <span>Updated</span>
          </div>

          {/* Table of Contents */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Table of Contents
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a
                  href="#what-is-maple"
                  className="hover:text-blue-600"
                >
                  1. What is Maple Finance?
                </a>
              </li>
              <li>
                <a
                  href="#how-maple-works"
                  className="hover:text-blue-600"
                >
                  2. How Maple Finance Works
                </a>
              </li>
              <li>
                <a
                  href="#syrupusdc"
                  className="hover:text-blue-600"
                >
                  3. Understanding SyrupUSDC
                </a>
              </li>
              <li>
                <a
                  href="#institutional-lending"
                  className="hover:text-blue-600"
                >
                  4. Institutional Lending Model
                </a>
              </li>
              <li>
                <a
                  href="#syrup-token"
                  className="hover:text-blue-600"
                >
                  5. SYRUP Token and Tokenomics
                </a>
              </li>
              <li>
                <a
                  href="#yield-opportunities"
                  className="hover:text-blue-600"
                >
                  6. Yield Opportunities and APY
                </a>
              </li>
              <li>
                <a
                  href="#security-compliance"
                  className="hover:text-blue-600"
                >
                  7. Security and Compliance
                </a>
              </li>
              <li>
                <a
                  href="#how-to-use"
                  className="hover:text-blue-600"
                >
                  8. How to Use Maple Finance
                </a>
              </li>
              <li>
                <a
                  href="#risks-benefits"
                  className="hover:text-blue-600"
                >
                  9. Risks and Benefits
                </a>
              </li>
              <li>
                <a
                  href="#comparison"
                  className="hover:text-blue-600"
                >
                  10. Maple vs Other DeFi Protocols
                </a>
              </li>
              <li>
                <a
                  href="#future-outlook"
                  className="hover:text-blue-600"
                >
                  11. Future Outlook and Roadmap
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-blue-600"
                >
                  12. Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          {/* Section 1: What is Maple Finance */}
          <section
            id="what-is-maple"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              What is Maple Finance?
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Founded in 2019, Maple Finance is a pioneering digital asset
              lending platform that brings institutional-grade lending to the
              DeFi ecosystem. Unlike traditional DeFi protocols that focus on
              retail users, Maple Finance combines the rigor of traditional
              finance with the transparency and innovation of blockchain
              technology.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Key Innovation: Institutional DeFi
              </h3>
              <p className="text-blue-800">
                Maple Finance&apos;s core innovation lies in bridging the gap between
                traditional institutional finance and DeFi. By offering
                fixed-rate, overcollateralized loans to institutional borrowers,
                Maple brings professional-grade lending practices to the crypto
                ecosystem while maintaining the transparency and efficiency of
                blockchain technology.
              </p>
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The platform has facilitated billions in loans since its launch,
              bringing institutional-quality products to the crypto ecosystem.
              Maple&apos;s approach focuses on short-duration loans that enable
              consistent high yields and short-term liquidity for users, with a
              proven track record of yield outperformance compared to leading
              DeFi lending protocols.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Core Principles
            </h3>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span>
                  <strong>Institutional Quality:</strong> Professional-grade
                  lending with traditional finance rigor
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span>
                  <strong>Transparency:</strong> Full visibility into lending
                  activities and borrower information
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span>
                  <strong>Fixed-Rate Lending:</strong> Predictable yields
                  through fixed-rate loan structures
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span>
                  <strong>Overcollateralization:</strong> All loans backed by
                  sufficient collateral to minimize risk
                </span>
              </li>
            </ul>
          </section>

          {/* Section 2: How Maple Finance Works */}
          <section
            id="how-maple-works"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How Maple Finance Works
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Maple Finance operates on a fundamentally different model compared
              to traditional DeFi lending protocols. Instead of algorithmic
              interest rate models, Maple uses a structured approach with
              fixed-rate loans, professional risk assessment, and
              institutional-grade due diligence.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Lending Architecture
              </h3>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Traditional DeFi Lending
                  </h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="space-y-2 text-red-800">
                      <li>• Algorithmic interest rates</li>
                      <li>• Retail-focused</li>
                      <li>• Variable yields</li>
                      <li>• Automated risk assessment</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Maple Finance Approach
                  </h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <ul className="space-y-2 text-green-800">
                      <li>• Fixed-rate loans</li>
                      <li>• Institutional focus</li>
                      <li>• Professional due diligence</li>
                      <li>• Human risk assessment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              The Lending Process
            </h3>
            <ol className="space-y-4 text-gray-700 mb-8">
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  1
                </span>
                <span>
                  <strong>Borrower Application:</strong> Institutional borrowers
                  apply with detailed financial information
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  2
                </span>
                <span>
                  <strong>Due Diligence:</strong> Professional risk assessment
                  and KYC/AML compliance
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  3
                </span>
                <span>
                  <strong>Loan Structuring:</strong> Fixed-rate loan terms with
                  overcollateralization requirements
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  4
                </span>
                <span>
                  <strong>Lender Participation:</strong> Lenders provide capital
                  and earn fixed yields
                </span>
              </li>
            </ol>
          </section>

          {/* Section 3: Understanding SyrupUSDC */}
          <section
            id="syrupusdc"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Understanding SyrupUSDC
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              SyrupUSDC is Maple Finance&apos;s flagship product - a liquid yielding
              dollar that makes institutional lending accessible to all DeFi
              users. It represents a revolutionary approach to yield generation
              by combining the stability of USDC with the high yields of
              institutional lending.
            </p>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">
                What is SyrupUSDC?
              </h3>
              <p className="text-purple-800">
                SyrupUSDC is an overcollateralized, liquid yielding dollar that
                provides institutional-quality yield in a single, easy-to-use
                asset. It&apos;s backed by Maple&apos;s institutional lending marketplace
                and offers consistent, high yields while maintaining the
                stability and liquidity of USDC.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Key Features of SyrupUSDC
            </h3>
            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>
                  <strong>Liquid Yielding Dollar:</strong> Earn yield while
                  maintaining USDC-like stability
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>
                  <strong>Overcollateralized:</strong> All loans backed by
                  sufficient collateral
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>
                  <strong>Open Access:</strong> Available to everyone (non-US
                  residents)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>
                  <strong>No Minimums:</strong> Start earning with any amount
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>
                  <strong>Cross-Chain Support:</strong> Available on multiple
                  blockchain networks
                </span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              How SyrupUSDC Works
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              When you deposit USDC into SyrupUSDC, your funds are automatically
              deployed into Maple&apos;s institutional lending pools. These pools
              provide fixed-rate loans to vetted institutional borrowers, and
              the yield generated from these loans is distributed to SyrupUSDC
              holders.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                SyrupUSDC Benefits
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    For Lenders
                  </h5>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Access to institutional yields</li>
                    <li>• No minimum investment requirements</li>
                    <li>• Liquid and tradeable asset</li>
                    <li>• Professional risk management</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    For Borrowers
                  </h5>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Fixed-rate financing</li>
                    <li>• Professional due diligence</li>
                    <li>• White-glove service</li>
                    <li>• Transparent lending process</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Institutional Lending Model */}
          <section
            id="institutional-lending"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Institutional Lending Model
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Maple Finance&apos;s institutional lending model represents a paradigm
              shift in DeFi lending. Instead of relying solely on algorithmic
              models, Maple employs traditional finance practices including
              professional due diligence, KYC/AML compliance, and human risk
              assessment.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-yellow-900 mb-4">
                Why Institutional Lending Matters
              </h3>
              <p className="text-yellow-800">
                Institutional lending brings several advantages to DeFi: higher
                credit quality borrowers, more predictable yields, professional
                risk management, and access to larger loan sizes. This creates a
                more stable and sustainable lending ecosystem compared to
                retail-focused protocols.
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Lending Categories
            </h3>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Open Access Products
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>SyrupUSDC:</strong> Liquid yielding dollar for all
                    users
                  </li>
                  <li>
                    • <strong>SyrupUSDT:</strong> Tether-based yielding asset
                  </li>
                  <li>• No KYC requirements</li>
                  <li>• No minimum investment</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  Permissioned Access Products
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    • <strong>Blue Chip:</strong> High-quality institutional
                    loans
                  </li>
                  <li>
                    • <strong>High Yield:</strong> Higher-risk, higher-reward
                    lending
                  </li>
                  <li>
                    • <strong>Bitcoin Yield:</strong> Bitcoin-backed lending
                    strategies
                  </li>
                  <li>• KYC required, $100k minimum</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Risk Management Process
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Maple Finance employs a comprehensive risk management process that
              includes:
            </p>

            <ol className="space-y-4 text-gray-700 mb-8">
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  1
                </span>
                <span>
                  <strong>Borrower Due Diligence:</strong> Comprehensive
                  financial analysis and background checks
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  2
                </span>
                <span>
                  <strong>Collateral Assessment:</strong> Evaluation of
                  collateral quality and liquidation risk
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  3
                </span>
                <span>
                  <strong>Ongoing Monitoring:</strong> Continuous monitoring of
                  borrower financial health
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                  4
                </span>
                <span>
                  <strong>Liquidation Procedures:</strong> Automated liquidation
                  when collateral ratios fall below thresholds
                </span>
              </li>
            </ol>
          </section>

          {/* Section 5: SYRUP Token and Tokenomics */}
          <section
            id="syrup-token"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              SYRUP Token and Tokenomics
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              The SYRUP token is the governance and utility token of the Maple
              Finance ecosystem. It represents a significant evolution from the
              original MPL token, offering enhanced functionality and improved
              tokenomics for protocol participants.
            </p>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-purple-900 mb-4">
                SYRUP Token Utility
              </h3>
              <ul className="space-y-2 text-purple-800">
                <li>
                  • <strong>Governance:</strong> Vote on protocol parameters and
                  upgrades
                </li>
                <li>
                  • <strong>Staking Rewards:</strong> Earn additional rewards by
                  staking SYRUP
                </li>
                <li>
                  • <strong>Fee Sharing:</strong> Receive a portion of protocol
                  fees
                </li>
                <li>
                  • <strong>Priority Access:</strong> Early access to new
                  lending products
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Migration from MPL to SYRUP
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Maple Finance has migrated from the original MPL token to the new
              SYRUP token, offering improved functionality and better alignment
              with the protocol&apos;s vision. MPL holders can convert their tokens
              to SYRUP through the official migration process.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                SYRUP Staking Benefits
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Fee Revenue
                  </h5>
                  <p className="text-sm text-gray-600">
                    Share in protocol fee revenue
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🗳️</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Governance Power
                  </h5>
                  <p className="text-sm text-gray-600">
                    Vote on protocol decisions
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Priority Access
                  </h5>
                  <p className="text-sm text-gray-600">
                    Early access to new products
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Yield Opportunities */}
          <section
            id="yield-opportunities"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Yield Opportunities and APY
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Maple Finance offers some of the most competitive yields in DeFi,
              with institutional-quality returns that often outperform
              traditional lending protocols. The fixed-rate nature of loans
              provides predictable yields, while the professional risk
              management ensures consistent performance.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Current Yield Ranges
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Open Access Products
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between">
                      <span>SyrupUSDC:</span>
                      <span className="font-semibold text-green-600">
                        8.5% - 12.3% APY
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>SyrupUSDT:</span>
                      <span className="font-semibold text-green-600">
                        8.2% - 11.8% APY
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Cross-Chain:</span>
                      <span className="font-semibold text-green-600">
                        7.8% - 11.5% APY
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Permissioned Products
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between">
                      <span>Blue Chip:</span>
                      <span className="font-semibold text-green-600">
                        10.5% - 15.2% APY
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>High Yield:</span>
                      <span className="font-semibold text-green-600">
                        12.8% - 18.5% APY
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Bitcoin Yield:</span>
                      <span className="font-semibold text-green-600">
                        9.2% - 14.7% APY
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Factors Affecting Yields
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Several factors influence the yield rates on Maple Finance:
            </p>

            <ul className="space-y-3 text-gray-700 mb-8">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>
                  <strong>Borrower Quality:</strong> Higher-quality borrowers
                  command lower rates but provide more stability
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>
                  <strong>Loan Duration:</strong> Shorter-term loans typically
                  offer higher rates
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>
                  <strong>Collateral Type:</strong> Different collateral types
                  have different risk profiles
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>
                  <strong>Market Conditions:</strong> Overall credit market
                  conditions affect lending rates
                </span>
              </li>
            </ul>
          </section>

          {/* Section 7: Security and Compliance */}
          <section
            id="security-compliance"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Security and Compliance
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Maple Finance places a strong emphasis on security and regulatory
              compliance, implementing multiple layers of protection to ensure
              user funds remain safe and the protocol operates within regulatory
              frameworks.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-red-900 mb-4">
                Security Measures
              </h3>
              <ul className="space-y-2 text-red-800">
                <li>
                  • <strong>Smart Contract Audits:</strong> Multiple independent
                  security reviews
                </li>
                <li>
                  • <strong>Overcollateralization:</strong> All loans backed by
                  sufficient collateral
                </li>
                <li>
                  • <strong>Professional Risk Management:</strong> Human
                  oversight of all lending decisions
                </li>
                <li>
                  • <strong>Compliance Framework:</strong> KYC/AML procedures
                  for all participants
                </li>
                <li>
                  • <strong>Insurance Coverage:</strong> Additional protection
                  for institutional users
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Regulatory Compliance
            </h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Maple Finance operates with a strong focus on regulatory
              compliance, implementing traditional finance practices including
              KYC/AML procedures, professional due diligence, and transparent
              reporting. This approach ensures the protocol can operate within
              existing regulatory frameworks while maintaining its innovative
              DeFi features.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Compliance Features
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    For Lenders
                  </h5>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Transparent lending process</li>
                    <li>• Regular reporting and updates</li>
                    <li>• Professional risk management</li>
                    <li>• Regulatory compliance oversight</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">
                    For Borrowers
                  </h5>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• KYC/AML verification</li>
                    <li>• Professional due diligence</li>
                    <li>• Regulatory reporting</li>
                    <li>• Compliance monitoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: How to Use Maple Finance */}
          <section
            id="how-to-use"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Use Maple Finance
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Getting started with Maple Finance is straightforward, with
              different paths depending on whether you want to access open
              products or permissioned institutional lending.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Step-by-Step Guide
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Choose Your Product
                    </h4>
                    <p className="text-gray-700">
                      Decide between open access (SyrupUSDC) or permissioned
                      products (Blue Chip, High Yield)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Connect Your Wallet
                    </h4>
                    <p className="text-gray-700">
                      Connect your Web3 wallet to the Maple Finance platform
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Complete KYC (if required)
                    </h4>
                    <p className="text-gray-700">
                      For permissioned products, complete the KYC verification
                      process
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Deposit and Earn
                    </h4>
                    <p className="text-gray-700">
                      Deposit your assets and start earning institutional-grade
                      yields
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 9: Risks and Benefits */}
          <section
            id="risks-benefits"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Risks and Benefits
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">
                  Benefits
                </h3>
                <ul className="space-y-2 text-green-800">
                  <li>• Institutional-quality yields</li>
                  <li>• Professional risk management</li>
                  <li>• Fixed-rate predictability</li>
                  <li>• Transparent lending process</li>
                  <li>• Regulatory compliance</li>
                  <li>• White-glove service</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">
                  Risks
                </h3>
                <ul className="space-y-2 text-red-800">
                  <li>• Smart contract risk</li>
                  <li>• Borrower default risk</li>
                  <li>• Liquidation risk</li>
                  <li>• Regulatory risk</li>
                  <li>• Market volatility</li>
                  <li>• KYC requirements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 10: Comparison with Other Protocols */}
          <section
            id="comparison"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Maple vs Other DeFi Protocols
            </h2>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Feature
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Maple Finance
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      AAVE
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Compound
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Target Users
                    </td>
                    <td className="py-3 px-4 text-green-600">Institutional</td>
                    <td className="py-3 px-4 text-gray-600">Retail</td>
                    <td className="py-3 px-4 text-gray-600">Retail</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Rate Model
                    </td>
                    <td className="py-3 px-4 text-green-600">Fixed Rate</td>
                    <td className="py-3 px-4 text-gray-600">Variable</td>
                    <td className="py-3 px-4 text-gray-600">Variable</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Risk Assessment
                    </td>
                    <td className="py-3 px-4 text-green-600">
                      Human + Algorithmic
                    </td>
                    <td className="py-3 px-4 text-gray-600">Algorithmic</td>
                    <td className="py-3 px-4 text-gray-600">Algorithmic</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      Compliance
                    </td>
                    <td className="py-3 px-4 text-green-600">Full KYC/AML</td>
                    <td className="py-3 px-4 text-gray-600">None</td>
                    <td className="py-3 px-4 text-gray-600">None</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 11: FAQ */}
          <section
            id="faq"
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What is the difference between SyrupUSDC and regular USDC?
                </h3>
                <p className="text-gray-700">
                  SyrupUSDC is a liquid yielding dollar that automatically earns
                  yield from Maple&apos;s institutional lending pools, while regular
                  USDC is a stablecoin that doesn&apos;t earn any yield. SyrupUSDC
                  maintains USDC&apos;s stability while providing institutional-grade
                  returns.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Do I need KYC to use Maple Finance?
                </h3>
                <p className="text-gray-700">
                  KYC is only required for permissioned products (Blue Chip,
                  High Yield, Bitcoin Yield). Open access products like
                  SyrupUSDC and SyrupUSDT don&apos;t require KYC and are available to
                  everyone (non-US residents).
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How does Maple Finance ensure borrower quality?
                </h3>
                <p className="text-gray-700">
                  Maple Finance employs professional due diligence including
                  financial analysis, background checks, and ongoing monitoring.
                  All borrowers undergo comprehensive risk assessment before
                  being approved for loans.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What happens if a borrower defaults?
                </h3>
                <p className="text-gray-700">
                  Maple Finance uses overcollateralized lending, meaning all
                  loans are backed by collateral worth more than the loan
                  amount. In case of default, the collateral is liquidated to
                  cover the loan, protecting lenders from losses.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Explore Maple Finance?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Start earning institutional-grade yields with Maple Finance&apos;s
              professional lending platform. Access SyrupUSDC or explore
              permissioned lending opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/yield/stablecoin"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Maple Yields
              </Link>
              <Link
                href="/projects"
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                Compare Protocols
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
