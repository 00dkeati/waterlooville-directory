'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

export default function TopNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'News', href: '/editorial' },
    { label: 'Directory', href: '/categories' },
    { label: 'Events', href: '/events' },
    { label: 'Guides', href: '/guides' }
  ];

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm supports-[backdrop-filter]:bg-white/60' 
          : 'bg-white'
      }`}>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Waterlooville.co</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Search & Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-4">
              <form role="search" className="relative">
                <input
                  type="search"
                  placeholder="Search businesses, services..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Topic Strip */}
      <div className="md:hidden bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex overflow-x-auto scrollbar-hide py-3 space-x-3">
            {[
              { label: 'News', href: '/editorial', icon: '📰' },
              { label: 'Directory', href: '/categories', icon: '📋' },
              { label: 'Plumbers', href: '/plumbers', icon: '🔧' },
              { label: 'Cafés', href: '/coffee-shops', icon: '☕' },
              { label: 'Vets', href: '/vets', icon: '🐕' },
              { label: 'Hairdressers', href: '/hairdressers', icon: '✂️' },
              { label: 'Restaurants', href: '/restaurants', icon: '🍽️' },
              { label: 'Estate Agents', href: '/estate-agents', icon: '🏠' }
            ].map((topic) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="flex-shrink-0 flex items-center space-x-2 px-3 py-2 bg-white rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <span className="text-sm">{topic.icon}</span>
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">{topic.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
