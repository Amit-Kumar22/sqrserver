import Link from 'next/link';
import Image from 'next/image';
import {
  Mail as EnvelopeIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  ArrowRight as ArrowRightIcon,
  ArrowUp as ArrowUpIcon,
} from 'lucide-react';

const footerNavigation = {
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'IT Solutions', href: '/solutions' },
    { name: 'Research & Development', href: '/research' },
    { name: 'Projects', href: '/projects' },
  ],
  quickLinks: [
    { name: 'Career', href: '/career' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ],
  contact: [
    { name: 'info@squareserver.in', href: 'mailto:info@squareserver.in', icon: EnvelopeIcon },
    { name: '+91 98765 43210', href: 'tel:+919876543210', icon: PhoneIcon },
    { name: 'The Cozy Corner, No 9A, Choudhary Lane Road, Vikash Nagar, Balapur, Patna, Bihar 800010', href: '#', icon: MapPinIcon },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/square-server/',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 overflow-hidden">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand + inline CTA */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/logo.png" alt="SquareServer" width={32} height={32} className="w-8 h-8 rounded-md" />
              <span className="text-base font-bold text-white">SquareServer</span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-400 max-w-sm">
              Leading IT solutions company specializing in cutting-edge technology development
              and innovative software solutions for modern enterprises.
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
            >
              Start a conversation
              <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <div className="flex gap-2 pt-1">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors duration-200"
                  aria-label={item.name}
                >
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Company</h3>
              <ul className="space-y-2">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-gray-400 hover:text-emerald-400 transition-colors duration-200 leading-relaxed"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-2">
                {footerNavigation.quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-xs text-gray-400 hover:text-emerald-400 transition-colors duration-200 leading-relaxed"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact card */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Get in touch</h3>
              <ul className="space-y-3">
                {footerNavigation.contact.map((item, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 text-emerald-400 shrink-0 mt-0.5">
                      <item.icon className="h-3.5 w-3.5" />
                    </span>
                    {item.href !== '#' ? (
                      <a
                        href={item.href}
                        className="text-xs text-gray-400 hover:text-emerald-400 transition-colors duration-200 leading-relaxed pt-1"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 leading-relaxed pt-1">{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500 order-2 sm:order-1">
            &copy; {new Date().getFullYear()} SquareServer. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500 order-1 sm:order-2">
            <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors duration-200">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-emerald-400 transition-colors duration-200">
              Terms
            </Link>
            <span className="hidden sm:inline">•</span>
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-1 hover:text-emerald-400 transition-colors duration-200"
            >
              Back to top
              <ArrowUpIcon className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
