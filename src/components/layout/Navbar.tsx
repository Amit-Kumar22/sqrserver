'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu as Bars3Icon,
  X as XMarkIcon,
  ChevronDown as ChevronDownIcon,
  ArrowRight as ArrowRightIcon,
  Mail as EnvelopeIcon,
  Phone as PhoneIcon,
  Cpu as CpuChipIcon,
  FlaskConical as BeakerIcon,
  Globe as GlobeAltIcon,
  Smartphone as DevicePhoneMobileIcon,
  Megaphone as MegaphoneIcon,
} from 'lucide-react';

type DropdownItem = {
  name: string;
  href: string;
  description: string;
  icon: typeof CpuChipIcon;
};

type Promo = {
  ctaLabel: string;
  href: string;
};

const projectsDropdown: DropdownItem[] = [
  {
    name: 'IT Solutions',
    href: '/solutions',
    description: 'Enterprise software & systems engineering',
    icon: CpuChipIcon,
  },
  {
    name: 'Research & Development',
    href: '/research',
    description: 'AI/ML innovation and applied R&D',
    icon: BeakerIcon,
  },
];

const projectsPromo: Promo = {
  ctaLabel: 'View All Projects',
  href: '/projects',
};

const servicesDropdown: DropdownItem[] = [
  {
    name: 'Website Design',
    href: '/services/web-development',
    description: 'Responsive, modern website design',
    icon: GlobeAltIcon,
  },
  {
    name: 'Mobile App Development',
    href: '/services/app-development',
    description: 'Native & cross-platform app builds',
    icon: DevicePhoneMobileIcon,
  },
  {
    name: 'Digital Marketing',
    href: '/services/seo-ads',
    description: 'SEO, ad campaigns & growth marketing',
    icon: MegaphoneIcon,
  },
];

const servicesPromo: Promo = {
  ctaLabel: 'View All Services',
  href: '/services',
};

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Our Services', href: '/services', dropdown: servicesDropdown, promo: servicesPromo },
  { name: 'Projects', href: '#', dropdown: projectsDropdown, promo: projectsPromo },
  { name: 'Our Work', href: '/work' },
  { name: 'Career', href: '/career' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const dropdownPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const insideNav = navRef.current?.contains(target);
      const insidePanel = dropdownPanelRef.current?.contains(target);
      if (!insideNav && !insidePanel) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActiveDropdownItem = (items: DropdownItem[]) => items.some((item) => pathname === item.href);

  const pillClass = (active: boolean) =>
    `relative flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      active ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-700 hover:text-emerald-800 hover:bg-white/60'
    }`;

  return (
    <header className="sticky top-0 z-50">
      {/*
        backdrop-blur creates a new CSS containing block for `position: fixed`
        descendants, so it must stay on this inner wrapper only — never on
        <header> itself, or the fixed mobile drawer/flyout below would resolve
        their offsets against this bar's height instead of the viewport.
      */}
      <div className="bg-emerald-50/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
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

            {/* Segmented pill navigation - desktop */}
            <div ref={navRef} className="hidden lg:flex items-center gap-1 bg-white/60 rounded-full p-1">
              {navigation.map((item) =>
                item.dropdown ? (
                  <div key={item.name} className="relative">
                    <button
                      className={pillClass(isActiveDropdownItem(item.dropdown))}
                      onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                    >
                      {item.name}
                      <ChevronDownIcon
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Compact anchored dropdown */}
                    {openDropdown === item.name && (
                      <div
                        ref={dropdownPanelRef}
                        className="absolute left-0 top-full mt-2 w-72 rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-900/10 overflow-hidden"
                      >
                        <div className="px-4 py-2.5 bg-emerald-50/70 border-b border-gray-100">
                          <p className="text-xs font-semibold text-emerald-700">{item.name}</p>
                        </div>
                        <div className="p-2">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              onClick={() => setOpenDropdown(null)}
                              className="group/item flex items-start gap-2.5 rounded-xl p-2.5 hover:bg-emerald-50/70 transition-colors duration-200"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover/item:bg-emerald-100 transition-colors duration-200">
                                <dropdownItem.icon className="h-4 w-4" />
                              </span>
                              <span>
                                <span
                                  className={`block text-sm font-semibold ${
                                    pathname === dropdownItem.href ? 'text-emerald-600' : 'text-gray-900'
                                  }`}
                                >
                                  {dropdownItem.name}
                                </span>
                                <span className="block text-[11px] text-gray-500 mt-0.5">
                                  {dropdownItem.description}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                        {item.promo && (
                          <Link
                            href={item.promo.href}
                            onClick={() => setOpenDropdown(null)}
                            className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-t border-gray-100 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors duration-200"
                          >
                            {item.promo.ctaLabel}
                            <ArrowRightIcon className="h-3.5 w-3.5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.name} href={item.href} className={pillClass(pathname === item.href)}>
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Right cluster: contact icons + CTA + mobile toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="hidden md:flex items-center gap-1">
                <a
                  href="mailto:info@squareserver.in"
                  aria-label="Email us"
                  className="p-2 rounded-full text-emerald-700/70 hover:text-emerald-800 hover:bg-white/60 transition-all duration-300"
                >
                  <EnvelopeIcon className="h-4 w-4" />
                </a>
                <a
                  href="tel:+919876543210"
                  aria-label="Call us"
                  className="p-2 rounded-full text-emerald-700/70 hover:text-emerald-800 hover:bg-white/60 transition-all duration-300"
                >
                  <PhoneIcon className="h-4 w-4" />
                </a>
              </div>

              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4" />
              </Link>

              <button
                type="button"
                className="lg:hidden p-2 inline-flex items-center justify-center rounded-full text-emerald-800 hover:bg-white/60 transition-all duration-300"
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
          <div
            className="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-sm overflow-y-auto bg-white px-6 py-6 border-r border-gray-200/60 shadow-2xl">
            <div className="h-1 -mx-6 -mt-6 mb-6 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Image src="/logo.png" alt="SquareServer" width={36} height={36} className="w-9 h-9 rounded-lg" />
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
                        onClick={() => setOpenMobileDropdown(openMobileDropdown === item.name ? null : item.name)}
                      >
                        {item.name}
                        <ChevronDownIcon
                          className={`h-5 w-5 transition-transform duration-300 ${
                            openMobileDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openMobileDropdown === item.name && (
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-emerald-100 pl-3">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                pathname === dropdownItem.href
                                  ? 'text-emerald-600 bg-emerald-50'
                                  : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <dropdownItem.icon className="h-4 w-4 shrink-0" />
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
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

              <div className="pt-4 mt-6 border-t border-gray-200 space-y-3">
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <div className="flex items-center justify-center gap-5 pt-1">
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    +91 98765 43210
                  </a>
                  <a
                    href="mailto:info@squareserver.in"
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600"
                  >
                    <EnvelopeIcon className="h-4 w-4" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
