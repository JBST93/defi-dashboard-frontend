'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';
import { Menu, X, ChevronRight } from 'lucide-react';
import { DialogTitle } from '@/components/ui/dialog'; // Import DialogTitle
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

// Define the navItems array
type NavItem = {
  name: string;
  path: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Stablecoin Yields', path: '/yield/stablecoin' },
  { name: 'Stablecoins', path: '/stablecoins' },
  { name: 'Projects', path: '/projects' },
  { name: 'Governance', path: '/governance' },
  { name: 'Articles', path: '/articles' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const currentPath = usePathname();

  return (
    <nav className="bg-white text-gray-800 shadow-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src="/logo_nav.jpg"
              alt="DeFi Lending Dashboard Logo"
              width={150}
              height={40}
              className="mr-2"
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    {item.subItems ? (
                      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                    ) : (
                      <Link
                        href={item.path}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink
                          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-blue-50 hover:text-blue-700 ${
                            currentPath === item.path
                              ? 'bg-blue-100 text-blue-700'
                              : 'text-gray-700'
                          }`}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </Link>
                    )}
                    {item.subItems && (
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-3 p-4">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.path}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.path}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700"
                                >
                                  {subItem.name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full sm:w-[300px] p-0 bg-white text-gray-800"
              >
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-200">
                    <DialogTitle className="text-xl font-semibold text-blue-600">
                      Menu
                    </DialogTitle>
                    <SheetDescription className="sr-only">
                      Navigation menu for mobile devices
                    </SheetDescription>
                    <SheetClose className="absolute top-4 right-4">
                      <X className="h-6 w-6 text-gray-600" />
                      <span className="sr-only">Close menu</span>
                    </SheetClose>
                  </div>
                  <div className="flex-grow overflow-y-auto py-4">
                    {navItems.map((item) => (
                      <div
                        key={item.path}
                        className="mb-2"
                      >
                        {item.subItems ? (
                          <Button
                            variant="ghost"
                            className="w-full justify-between text-left px-6 py-3 text-lg hover:bg-blue-50 hover:text-blue-700"
                            onClick={() =>
                              setActiveSubmenu(
                                activeSubmenu === item.name ? null : item.name
                              )
                            }
                          >
                            {item.name}
                            <ChevronRight
                              className={`h-5 w-5 transition-transform ${
                                activeSubmenu === item.name ? 'rotate-90' : ''
                              }`}
                            />
                          </Button>
                        ) : (
                          <SheetClose asChild>
                            <Link href={item.path}>
                              <Button
                                variant="ghost"
                                className={`w-full justify-start px-6 py-3 text-lg transition-colors ${
                                  currentPath === item.path
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'hover:bg-blue-50 hover:text-blue-700'
                                }`}
                              >
                                {item.name}
                              </Button>
                            </Link>
                          </SheetClose>
                        )}
                        {item.subItems && activeSubmenu === item.name && (
                          <div className="bg-gray-50 py-2">
                            {item.subItems.map((subItem) => (
                              <SheetClose
                                key={subItem.path}
                                asChild
                              >
                                <Link href={subItem.path}>
                                  <Button
                                    variant="ghost"
                                    className={`w-full justify-start pl-10 py-2 text-base transition-colors ${
                                      currentPath === subItem.path
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'hover:bg-blue-50 hover:text-blue-700'
                                    }`}
                                  >
                                    {subItem.name}
                                  </Button>
                                </Link>
                              </SheetClose>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
