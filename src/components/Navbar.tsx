'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const currentPath = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/project' },
    {
      name: 'Yield',
      path: '/yield',
      subItems: [
        { name: 'Stablecoin yields', path: '/yield/stablecoin' },
        { name: 'All token yields', path: '/yield' },
      ],
    },
    { name: 'Governance', path: '/governance' },
  ];

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <nav className="bg-brown-800 text-white shadow-lg">
      <div
        className="max-w-7xl mx-auto px-4"
        ref={menuRef}
      >
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center"
            >
              <Image
                src="/logo_nav.jpg"
                alt="TokenDataView Logo"
                width={300}
                height={100}
                className="mr-2 w-[200px] md:w-[300px]"
              />
              <span className="font-semibold text-lg">TokenDataView</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <div
                key={item.path}
                className="relative"
              >
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`py-2 px-3 rounded-md text-sm font-medium ${
                        currentPath.startsWith(item.path)
                          ? 'bg-amber-500 text-white'
                          : 'text-black hover:bg-amber-700 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.path}
                              href={subItem.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={`py-2 px-3 rounded-md text-sm font-medium ${
                      currentPath === item.path
                        ? 'bg-amber-500 text-white'
                        : 'text-black hover:bg-amber-700 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.path}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                        currentPath.startsWith(item.path)
                          ? 'bg-amber-500 text-white'
                          : 'text-gray-300 hover:bg-amber-700 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-4">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-amber-700 hover:text-white"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      currentPath === item.path
                        ? 'bg-amber-500 text-white'
                        : 'text-gray-300 hover:bg-amber-700 hover:text-white'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
