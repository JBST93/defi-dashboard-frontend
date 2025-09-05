import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - DeFi Lending Platform | TokenDataView',
  description:
    'Learn about TokenDataView, the comprehensive DeFi lending platform helping users find the best stablecoin yields and lending opportunities.',
  keywords: [
    'about TokenDataView',
    'DeFi platform',
    'stablecoin lending platform',
    'DeFi team',
  ],
  openGraph: {
    title: 'About TokenDataView - DeFi Lending Platform',
    description:
      'Learn about our mission to democratize DeFi lending and help users find the best yields.',
    url: 'https://www.tokendataview.com/about',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Structured Data for About Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About TokenDataView',
            description:
              'Comprehensive DeFi lending platform for comparing stablecoin yields',
            url: 'https://www.tokendataview.com/about',
            mainEntity: {
              '@type': 'Organization',
              name: 'TokenDataView',
              url: 'https://www.tokendataview.com',
              description:
                'DeFi lending platform specializing in stablecoin yield comparison',
              foundingDate: '2024',
              industry: 'Decentralized Finance',
              areaServed: 'Global',
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About TokenDataView
            </h1>
            <p className="text-xl text-gray-600">
              Your trusted source for DeFi lending opportunities and stablecoin
              yields
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                TokenDataView was created to democratize access to DeFi lending
                opportunities. We believe that everyone should have access to
                the best yield farming and lending opportunities, regardless of
                their technical expertise.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our platform aggregates real-time data from multiple DeFi
                protocols, providing users with comprehensive insights to make
                informed investment decisions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                What We Do
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Compare yield rates across major DeFi protocols</li>
                <li>Track stablecoin lending opportunities in real-time</li>
                <li>Provide comprehensive protocol guides and analysis</li>
                <li>Monitor governance proposals and DAO activities</li>
                <li>Offer educational content about DeFi and stablecoins</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Transparency
                  </h3>
                  <p className="text-gray-600">
                    We provide clear, unbiased data to help you make informed
                    decisions.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Accessibility
                  </h3>
                  <p className="text-gray-600">
                    Complex DeFi concepts made simple for everyone.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Security
                  </h3>
                  <p className="text-gray-600">
                    Your data and privacy are our top priorities.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Innovation
                  </h3>
                  <p className="text-gray-600">
                    We stay ahead of the curve in DeFi developments.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Have questions or suggestions? We'd love to hear from you. Reach
                out to us through our social media channels or email us at
                support@tokendataview.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
