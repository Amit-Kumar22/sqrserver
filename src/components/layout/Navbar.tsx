'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import ServicesPopup from '../ServicesPopup';

const navigation = [
  { name: 'Home', href: '/' },

  { name: 'About Us', href: '/about' },
  { name: 'Our Services', href: '/services' },
  {
    name: 'Projects',
    href: '#',
    dropdown: [
      { name: 'IT Solutions', href: '/solutions' },
      { name: 'Research & Development', href: '/research' }
    ]
  },
  { name: 'Our Work', href: '/work' },
  { name: 'Career', href: '/career' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [servicesPopupOpen, setServicesPopupOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActiveDropdownItem = (items: any[]) => {
    return items.some(item => pathname === item.href);
  };

  const underline = (active: boolean) =>
    `absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transform origin-left transition-transform duration-300 ${
      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
    }`;

  const navItemClass = (active: boolean) =>
    `relative text-sm font-medium py-2 transition-colors duration-300 ${
      active ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600'
    }`;

  return (
    <header className="sticky top-0 z-50">
      {/* Utility top bar */}
      <div className="hidden md:block bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-9 text-xs">
          <div className="flex items-center gap-5">
            <a href="mailto:info@squareserver.in" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <EnvelopeIcon className="h-3.5 w-3.5" />
              info@squareserver.in
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <PhoneIcon className="h-3.5 w-3.5" />
              +91 98765 43210
            </a>
          </div>
          <a
            href="https://www.linkedin.com/company/square-server/"
            aria-label="LinkedIn"
            className="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200/60 shadow-sm transition-all duration-300">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <Image
                  src="/logo.png"
                  alt="SquareServer"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
                <span className="text-lg font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Square
                  </span>
                  <span className="text-gray-800">Server</span>
                </span>
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-7">
              {navigation.map((item) => (
                <div key={item.name} className="relative group" ref={item.dropdown ? dropdownRef : undefined}>
                  {item.dropdown ? (
                    <>
                      <button
                        className={`flex items-center gap-1 ${navItemClass(isActiveDropdownItem(item.dropdown))}`}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        onMouseEnter={() => setDropdownOpen(true)}
                      >
                        {item.name}
                        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-300 ${
                          dropdownOpen ? 'rotate-180' : ''
                        }`} />
                        <span className={underline(isActiveDropdownItem(item.dropdown))} />
                      </button>

                      {/* Dropdown Menu */}
                      {dropdownOpen && (
                        <div
                          className="absolute left-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/60 z-50 overflow-hidden"
                          onMouseLeave={() => setDropdownOpen(false)}
                        >
                          <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                          <div className="py-2">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className={`group/item flex items-center justify-between px-4 py-3 text-sm transition-all duration-200 hover:bg-emerald-50/70 ${
                                  pathname === dropdownItem.href
                                    ? 'text-emerald-600 font-medium'
                                    : 'text-gray-700 hover:text-emerald-600'
                                }`}
                                onClick={() => setDropdownOpen(false)}
                              >
                                {dropdownItem.name}
                                <ArrowRightIcon className="h-3.5 w-3.5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : item.name === 'Our Services' ? (
                    <button
                      onClick={() => setServicesPopupOpen(true)}
                      className={navItemClass(pathname === item.href)}
                    >
                      {item.name}
                      <span className={underline(pathname === item.href)} />
                    </button>
                  ) : (
                    <Link href={item.href} className={navItemClass(pathname === item.href)}>
                      {item.name}
                      <span className={underline(pathname === item.href)} />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden p-2 inline-flex items-center justify-center rounded-full text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu (slides in from the left) */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 border-r border-gray-200/60 shadow-2xl">
            <div className="h-1 -mx-6 -mt-6 mb-6 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Image
                  src="/logo.png"
                  alt="SquareServer"
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-lg"
                />
                <span className="text-lg font-bold">
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Square
                  </span>
                  <span className="text-gray-800">Server</span>
                </span>
              </Link>
              <button
                type="button"
                className="p-2 rounded-full text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flow-root">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <button
                          className={`flex items-center justify-between w-full rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 ${
                            isActiveDropdownItem(item.dropdown)
                              ? 'text-emerald-600 bg-emerald-50'
                              : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                        >
                          {item.name}
                          <ChevronDownIcon className={`h-5 w-5 transition-transform duration-300 ${
                            mobileDropdownOpen ? 'rotate-180' : ''
                          }`} />
                        </button>
                        {mobileDropdownOpen && (
                          <div className="ml-4 mt-1 space-y-1 border-l-2 border-emerald-100 pl-3">
                            {item.dropdown.map((dropdownItem) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className={`block rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                  pathname === dropdownItem.href
                                    ? 'text-emerald-600 bg-emerald-50'
                                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {dropdownItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : item.name === 'Our Services' ? (
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setServicesPopupOpen(true);
                        }}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 w-full text-left ${
                          pathname === item.href
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-all duration-300 ${
                          pathname === item.href
                            ? 'text-emerald-600 bg-emerald-50'
                            : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTA Button */}
                <div className="pt-4 mt-6 border-t border-gray-200 space-y-3">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-gray-600"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Popup */}
      <ServicesPopup
        isOpen={servicesPopupOpen}
        onClose={() => setServicesPopupOpen(false)}
      />
    </header>
  );
}
