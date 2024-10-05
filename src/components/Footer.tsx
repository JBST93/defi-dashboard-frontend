import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-amber-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">TokenDataView</h2>
            <p className="text-amber-200 mb-4">
              Your one-stop shop for token data and yield farming insights
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 hover:text-white"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 hover:text-white"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-200 hover:text-white"
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
                  className="text-amber-200 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/project"
                  className="text-amber-200 hover:text-white"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/yield"
                  className="text-amber-200 hover:text-white"
                >
                  Yields
                </Link>
              </li>
              <li>
                <Link
                  href="/stablecoin"
                  className="text-amber-200 hover:text-white"
                >
                  Stablecoins
                </Link>
              </li>
              <li>
                <Link
                  href="/governance"
                  className="text-amber-200 hover:text-white"
                >
                  Governance
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
                  className="text-amber-200 hover:text-white"
                >
                  Articles
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200 hover:text-white"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200 hover:text-white"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200 hover:text-white"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-amber-700 text-center">
          <p className="text-amber-200">
            &copy; {new Date().getFullYear()} TokenDataView. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
