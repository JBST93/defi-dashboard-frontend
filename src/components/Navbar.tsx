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
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/project' },
  {
    name: 'Yields',
    path: '/yield',
    subItems: [
      { name: 'All yields', path: '/yield' },
      { name: 'Stablecoin yields', path: '/yield/stablecoin' },
      { name: 'ETH Yields', path: '/yield/ethereum' },
    ],
  },
  { name: 'Stablecoins', path: '/stablecoin' },
  { name: 'Governance', path: '/governance' },
  { name: 'Articles', path: '/articles' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const currentPath = usePathname();

  return (
    <nav className="bg-white text-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center"
          >
            <Image
              src="/logo_nav.jpg"
              alt="TokenDataView Logo"
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
                          className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${
                            currentPath === item.path ? 'bg-yellow-400' : ''
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
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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
                className="w-full sm:w-[300px] p-0 bg-[#1a1a1a] text-white"
              >
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-gray-700">
                    <DialogTitle className="text-xl font-semibold text-[#ffd700]">
                      Menu
                    </DialogTitle>
                    <SheetDescription className="sr-only">
                      Navigation menu for mobile devices
                    </SheetDescription>
                    <SheetClose className="absolute top-4 right-4">
                      <X className="h-6 w-6 text-white" />
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
                            className="w-full justify-between text-left px-6 py-3 text-lg hover:bg-[#333333]"
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
                                className={`w-full justify-start px-6 py-3 text-lg ${
                                  currentPath === item.path
                                    ? 'bg-[#333333] text-[#ffd700]'
                                    : 'hover:bg-[#333333]'
                                }`}
                              >
                                {item.name}
                              </Button>
                            </Link>
                          </SheetClose>
                        )}
                        {item.subItems && activeSubmenu === item.name && (
                          <div className="bg-[#2a2a2a] py-2">
                            {item.subItems.map((subItem) => (
                              <SheetClose
                                key={subItem.path}
                                asChild
                              >
                                <Link href={subItem.path}>
                                  <Button
                                    variant="ghost"
                                    className={`w-full justify-start pl-10 py-2 text-base ${
                                      currentPath === subItem.path
                                        ? 'bg-[#333333] text-[#ffd700]'
                                        : 'hover:bg-[#333333]'
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
