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
  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'What is DeFi lending?',
          answer:
            'DeFi lending allows you to earn interest on your cryptocurrency by lending it to borrowers through decentralized protocols like Aave, Compound, and others. Unlike traditional banking, DeFi lending is permissionless, often offers higher yields, and operates 24/7 without intermediaries.',
        },
        {
          question: 'What are stablecoin yields?',
          answer:
            'Stablecoin yields are the interest rates you can earn by lending stablecoins like USDC, USDT, or DAI through DeFi protocols. These yields are typically 5-20% APY, much higher than traditional savings accounts, and are backed by smart contracts and over-collateralization.',
        },
        {
          question: 'How do I get started with DeFi lending?',
          answer:
            'First, you need a Web3 wallet like MetaMask. Then, visit our platform to compare yield rates, choose a protocol, and connect your wallet. Start with small amounts to familiarize yourself with the process before investing larger sums.',
        },
        {
          question: 'What is the minimum amount I can lend?',
          answer:
            'Minimum amounts vary by protocol. Most DeFi protocols have very low minimums (often $1-10), making DeFi lending accessible to everyone. However, consider gas fees when making small transactions, as they might eat into your profits.',
        },
      ],
    },
    {
      category: 'Using TokenDataView',
      questions: [
        {
          question: 'How do I find the best yield rates?',
          answer:
            'Use our platform to compare yield rates across different protocols in real-time. We aggregate data from 10+ major DeFi protocols, showing you APY, TVL, and risk factors. Filter by stablecoin type, protocol, or minimum yield to find opportunities that match your risk tolerance.',
        },
        {
          question: 'How often are yield rates updated?',
          answer:
            'Our yield rates are updated in real-time from multiple DeFi protocols. We refresh the data every few minutes to ensure you have the most current information. All data is sourced directly from protocol APIs for accuracy.',
        },
        {
          question: 'What does TVL mean?',
          answer:
            "TVL (Total Value Locked) represents the total amount of assets deposited in a protocol. Higher TVL generally indicates more trust and stability, but it doesn't guarantee safety. We show TVL to help you assess protocol popularity and liquidity.",
        },
        {
          question: 'How do I filter yield opportunities?',
          answer:
            'Use our advanced filters to narrow down opportunities by stablecoin type (USDC, USDT, DAI, etc.), protocol (Aave, Compound, etc.), minimum APY, or TVL. You can also sort by highest yield, lowest risk, or most popular protocols.',
        },
      ],
    },
    {
      category: 'Risks & Safety',
      questions: [
        {
          question: 'What are the risks of DeFi lending?',
          answer:
            'DeFi lending carries several risks: smart contract bugs, protocol failures, market volatility, impermanent loss, and regulatory changes. Always do your own research, start small, and never invest more than you can afford to lose. Diversify across multiple protocols to reduce risk.',
        },
        {
          question: 'Are my funds safe in DeFi protocols?',
          answer:
            "DeFi protocols use smart contracts that are generally secure, but they're not insured like traditional bank deposits. Look for protocols with audits, high TVL, and good track records. Consider using established protocols like Aave and Compound for lower risk.",
        },
        {
          question: 'What happens if a protocol gets hacked?',
          answer:
            'If a protocol gets hacked, you could lose your funds. This is why we recommend diversifying across multiple protocols and using established, audited platforms. Some protocols have insurance funds, but coverage is limited. Always assess the risk before investing.',
        },
        {
          question: 'Can I lose money in DeFi lending?',
          answer:
            'Yes, you can lose money through smart contract exploits, protocol failures, or market crashes. However, if you stick to reputable protocols and stablecoins, the risk is generally lower than other DeFi activities. Start with small amounts to learn the ropes.',
        },
      ],
    },
    {
      category: 'Technical Questions',
      questions: [
        {
          question: 'What are gas fees?',
          answer:
            'Gas fees are transaction costs on blockchain networks (like Ethereum). They can range from $5-50+ depending on network congestion. Consider gas fees when calculating your potential profits, especially for small investments. Layer 2 solutions like Polygon offer lower fees.',
        },
        {
          question: 'Do I need to stake tokens to earn yields?',
          answer:
            "No, most DeFi lending doesn't require staking. You simply deposit your tokens into a lending pool and start earning immediately. Some protocols offer additional rewards for staking their governance tokens, but it's optional.",
        },
        {
          question: 'How do I withdraw my funds?',
          answer:
            'Withdrawing is usually as simple as clicking a "Withdraw" button in the protocol interface. Your funds will be returned to your wallet, minus any gas fees. Most protocols allow instant withdrawals, but some may have withdrawal limits or waiting periods.',
        },
        {
          question: 'What is over-collateralization?',
          answer:
            "Over-collateralization means borrowers must deposit more value than they borrow (e.g., deposit $150 worth of ETH to borrow $100 USDC). This protects lenders by ensuring there's always enough collateral to cover loans, even if asset prices drop.",
        },
      ],
    },
    {
      category: 'Stablecoins',
      questions: [
        {
          question: 'Which stablecoins are safest?',
          answer:
            'USDC and USDT are generally considered the safest due to their large market caps and backing by major companies. DAI is decentralized but also very safe. Newer stablecoins like eUSD and USDe offer higher yields but may carry more risk. Always research before investing.',
        },
        {
          question: "What's the difference between USDC and USDT?",
          answer:
            'USDC is issued by Circle and is fully backed by cash and short-term U.S. Treasury bonds. USDT is issued by Tether and is backed by a mix of assets. Both are widely accepted, but USDC is often preferred for its transparency and regulatory compliance.',
        },
        {
          question: 'Can stablecoins lose their peg?',
          answer:
            'Yes, stablecoins can temporarily lose their peg to $1 due to market stress, regulatory issues, or technical problems. This is rare for major stablecoins like USDC and USDT, but it has happened. Monitor the peg and be prepared for potential volatility.',
        },
        {
          question: 'Why do different stablecoins have different yields?',
          answer:
            'Yield differences come from supply and demand dynamics, protocol-specific rewards, and risk premiums. Newer or less established stablecoins often offer higher yields to attract users, while USDC and USDT typically have lower but more stable yields.',
        },
      ],
    },
    {
      category: 'Platform & Support',
      questions: [
        {
          question: 'Is TokenDataView free to use?',
          answer:
            "Yes, TokenDataView is completely free to use. We don't charge any fees for accessing our data or using our platform. We make money through partnerships and affiliate programs, but this doesn't affect the rates you see or pay.",
        },
        {
          question: 'How do I contact support?',
          answer:
            'You can reach us at support@tokendataview.com or through our social media channels. We typically respond within 24 hours. For urgent issues, please include as much detail as possible about your problem.',
        },
        {
          question: 'Do you have a mobile app?',
          answer:
            "Currently, we're a web-based platform that works great on mobile browsers. We're working on a mobile app for iOS and Android, which will be released in the coming months. Follow us for updates!",
        },
        {
          question: 'How accurate is your data?',
          answer:
            "Our data is sourced directly from protocol APIs and is updated in real-time. We cross-reference multiple sources to ensure accuracy. However, yields can change rapidly, so always verify rates on the protocol's official website before investing.",
        },
      ],
    },
  ];

  return (
    <>
      {/* Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqData.flatMap((category) =>
              category.questions.map((q) => ({
                '@type': 'Question',
                name: q.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: q.answer,
                },
              }))
            ),
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about DeFi lending, stablecoin yields,
              and how to use TokenDataView effectively.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-16">
            {faqData.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {category.category}
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid gap-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div
                      key={faqIndex}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                          Q
                        </span>
                        {faq.question}
                      </h3>
                      <div className="ml-9">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Can&apos;t find what you&apos;re looking for? Our team is here
                to help you navigate the world of DeFi lending.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@tokendataview.com"
                  className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact Support
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors font-semibold"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
