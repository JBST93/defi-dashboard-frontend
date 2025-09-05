import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - DeFi Lending & Stablecoin Yields',
  description:
    'Frequently asked questions about DeFi lending, stablecoin yields, and how to use TokenDataView for yield farming.',
  keywords: [
    'DeFi FAQ',
    'stablecoin lending FAQ',
    'yield farming questions',
    'DeFi lending help',
  ],
  openGraph: {
    title: 'FAQ - DeFi Lending & Stablecoin Yields',
    description:
      'Get answers to common questions about DeFi lending and stablecoin yields.',
    url: 'https://www.tokendataview.com/faq',
  },
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQPage() {
  return (
    <>
      {/* Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is DeFi lending?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'DeFi lending allows you to earn interest on your cryptocurrency by lending it to borrowers through decentralized protocols like Aave, Compound, and others.',
                },
              },
              {
                '@type': 'Question',
                name: 'What are stablecoin yields?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Stablecoin yields are the interest rates you can earn by lending stablecoins like USDC, USDT, or DAI through DeFi protocols.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I find the best yield rates?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Use our platform to compare yield rates across different protocols, check TVL (Total Value Locked), and analyze risk factors before investing.',
                },
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about DeFi lending and stablecoin
              yields
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What is DeFi lending?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                DeFi lending allows you to earn interest on your cryptocurrency
                by lending it to borrowers through decentralized protocols like
                Aave, Compound, and others. Unlike traditional banking, DeFi
                lending is permissionless and often offers higher yields.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What are stablecoin yields?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Stablecoin yields are the interest rates you can earn by lending
                stablecoins like USDC, USDT, or DAI through DeFi protocols.
                These yields are typically higher than traditional savings
                accounts and are backed by smart contracts.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How do I find the best yield rates?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Use our platform to compare yield rates across different
                protocols, check TVL (Total Value Locked), and analyze risk
                factors before investing. We provide real-time data to help you
                make informed decisions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What are the risks of DeFi lending?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                DeFi lending carries risks including smart contract bugs,
                protocol failures, and market volatility. Always do your own
                research and never invest more than you can afford to lose.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How often are yield rates updated?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our yield rates are updated in real-time from multiple DeFi
                protocols. We refresh the data every few minutes to ensure you
                have the most current information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
