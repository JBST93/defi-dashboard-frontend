import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">DeFi Lending Dashboard</h2>
            <p className="text-gray-300 mb-4">
              Your comprehensive platform for DeFi lending opportunities and
              yield farming insights
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/yield"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  All Yields
                </Link>
              </li>
              <li>
                <Link
                  href="/yield/stablecoin"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Stablecoin Yields
                </Link>
              </li>
              <li>
                <Link
                  href="/governance"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Governance
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Articles
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/articles"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-300">
            &copy; {new Date().getFullYear()} DeFi Lending Dashboard. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
