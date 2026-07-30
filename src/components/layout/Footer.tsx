import Link from 'next/link';
import Image from 'next/image';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

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

      {/* CTA band */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h3 className="text-white text-lg sm:text-xl font-bold">Have a project in mind?</h3>
            <p className="text-gray-400 text-sm mt-1">Let&apos;s build something great together.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 transition-all duration-300 shrink-0"
          >
            Start a Conversation
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand */}
          <div className="md:col-span-4 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/logo.png" alt="SquareServer" width={32} height={32} className="w-8 h-8 rounded-md" />
              <span className="text-base font-bold text-white">SquareServer</span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-400 max-w-xs">
              Leading IT solutions company specializing in cutting-edge technology development
              and innovative software solutions for modern enterprises.
            </p>
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

          {/* Company Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Company
            </h3>
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

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h3>
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

          {/* Contact Info */}
          <div className="md:col-span-4 space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">
              Contact Info
            </h3>
            <ul className="space-y-3">
              {footerNavigation.contact.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/5 text-emerald-400 shrink-0 mt-0.5">
                    <item.icon className="h-3.5 w-3.5" />
                  </span>
                  {item.href !== '#' ? (
                    <a
                      href={item.href}
                      className="text-xs text-gray-400 hover:text-emerald-400 transition-colors duration-200 leading-relaxed pt-0.5"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400 leading-relaxed pt-0.5">
                      {item.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} SquareServer. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors duration-200">
              Privacy
            </Link>
            <span>•</span>
            <Link href="/terms-of-service" className="hover:text-emerald-400 transition-colors duration-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
