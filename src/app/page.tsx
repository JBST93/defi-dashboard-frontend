import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200">
      <HeroSection />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <YieldSnapshotSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-amber-500 to-orange-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Unlock the power of</span>{' '}
                <span className="block text-amber-200 xl:inline">
                  TokenDataView
                </span>
              </h1>
              <p className="mt-3 text-base text-amber-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Your ultimate platform for real-time token data and yield
                farming insights. Make informed decisions and maximize your
                crypto investments.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/project"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-amber-700 bg-white hover:bg-amber-50 md:py-4 md:text-lg md:px-10"
                  >
                    Explore Projects
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/yield"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 md:py-4 md:text-lg md:px-10"
                  >
                    View Yields
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function YieldSnapshotSection() {
  return (
    <section className="mt-24">
      <h2 className="text-3xl font-extrabold text-brown-900 sm:text-4xl">
        Top Yield Opportunities
      </h2>
      <p className="mt-3 max-w-2xl text-xl text-brown-700 sm:mt-4">
        Get a quick glimpse of the hottest yield farming opportunities available
        right now.
      </p>
      <div className="mt-12 bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-amber-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                Market
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                APY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                TVL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brown-700 uppercase tracking-wider">
                Chain
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Add sample data rows here */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brown-900">
                USDC
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brown-900">
                Aave
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                5.23%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                $1.2B
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                Ethereum
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brown-900">
                USDT
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brown-900">
                Compound
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                7.54%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                $753M
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                Ethereum
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brown-900">
                USDC
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brown-900">
                Morpho
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                6.93%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                $150M
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                Base
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brown-900">
                ETH
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brown-900">
                Aave
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                5.07%
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                $124K
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-brown-700">
                Ethereum
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/yield"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700"
        >
          View All Opportunities
        </Link>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mt-24 bg-amber-600 rounded-lg shadow-xl overflow-hidden">
      <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-amber-200">
            Start exploring TokenDataView today.
          </span>
        </h2>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-brown-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex justify-center space-x-6 md:order-2">
            {/* Add social media icons here */}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2023 TokenDataView. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ... (Keep the existing FeatureCard and BenefitItem components)

export interface ProjectData {
  type: string;
  price: number;
  token: string;
  price_day_delta: string;
  marketCap: string;
  tvl: string;
  tvl_day_delta: string;
  website: string;
  forum: string;
  project: string;
  logo?: string;
}
