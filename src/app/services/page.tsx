'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Code2 as CodeBracketIcon, Smartphone as DevicePhoneMobileIcon, Monitor as ComputerDesktopIcon, BarChart3 as ChartBarIcon, ShoppingCart as ShoppingCartIcon, Paintbrush as PaintBrushIcon, Share2 as ShareIcon, Check as CheckIcon, ArrowRight as ArrowRightIcon, Code2 as CodeBracketIconSolid, Smartphone as DevicePhoneMobileIconSolid, Monitor as ComputerDesktopIconSolid, BarChart3 as ChartBarIconSolid, ShoppingCart as ShoppingCartIconSolid, Paintbrush as PaintBrushIconSolid, Share2 as ShareIconSolid, Sparkles as SparklesIcon } from 'lucide-react';

const services = [
  {
    name: 'Web Development',
    slug: 'web-development',
    shortDescription: 'Modern, responsive websites that drive results',
    icon: CodeBracketIcon,
    iconSolid: CodeBracketIconSolid,
    gradient: 'from-green-500 to-emerald-500',
    hoverColor: 'hover:border-green-500',
    features: [
      'Responsive Websites – Modern, mobile-friendly designs that adapt seamlessly to any device',
      'E-commerce Platforms – Powerful online stores with secure payment integration',
      'Business Websites – Professional web presence that drives growth',
      'Custom Web Applications – Tailored solutions for unique business needs'
    ]
  },
  {
    name: 'App Development',
    slug: 'app-development',
    shortDescription: 'Native and cross-platform mobile solutions',
    icon: DevicePhoneMobileIcon,
    iconSolid: DevicePhoneMobileIconSolid,
    gradient: 'from-green-500 to-emerald-500',
    hoverColor: 'hover:border-green-500',
    features: [
      'Android Apps – Native applications optimized for the Android ecosystem',
      'iOS Apps – Sleek, high-performance apps for Apple devices',
      'Cross-platform Solutions – Build once, deploy everywhere with React Native & Flutter',
      'UI/UX Focused Design – Intuitive interfaces that users love'
    ]
  },
  {
    name: 'iOS Apps',
    slug: 'ios-apps',
    shortDescription: 'Premium Apple ecosystem applications',
    icon: ComputerDesktopIcon,
    iconSolid: ComputerDesktopIconSolid,
    gradient: 'from-green-600 to-emerald-600',
    hoverColor: 'hover:border-green-600',
    features: [
      'Swift Development – Native iOS apps built with Apple\'s latest technologies',
      'SwiftUI Interfaces – Modern, declarative UI framework for stunning interfaces',
      'App Store Optimization – Complete guidance for successful app launches',
      'Apple Watch Integration – Extend your app to wearable devices'
    ]
  },
  {
    name: 'SEO & Ads',
    slug: 'seo-ads',
    shortDescription: 'Digital marketing and search optimization',
    icon: ChartBarIcon,
    iconSolid: ChartBarIconSolid,
    gradient: 'from-green-500 to-emerald-500',
    hoverColor: 'hover:border-green-500',
    features: [
      'Search Engine Optimization – Improve your website\'s visibility in search results',
      'Google Ads Management – Targeted advertising campaigns that convert',
      'Social Media Advertising – Reach your audience on Facebook, Instagram, and more',
      'Analytics & Reporting – Data-driven insights to optimize your campaigns'
    ]
  },
  {
    name: 'E-commerce',
    slug: 'ecommerce',
    shortDescription: 'Complete online store solutions',
    icon: ShoppingCartIcon,
    iconSolid: ShoppingCartIconSolid,
    gradient: 'from-green-500 to-emerald-500',
    hoverColor: 'hover:border-green-500',
    features: [
      'Custom E-commerce Platforms – Tailored online stores that match your brand',
      'Payment Gateway Integration – Secure payment processing with multiple options',
      'Inventory Management – Efficient stock tracking and order management',
      'Mobile Commerce – Optimized shopping experience for mobile devices'
    ]
  },
  {
    name: 'Android Apps',
    slug: 'android-apps',
    shortDescription: 'Native Android development',
    icon: DevicePhoneMobileIcon,
    iconSolid: DevicePhoneMobileIconSolid,
    gradient: 'from-green-600 to-emerald-600',
    hoverColor: 'hover:border-green-600',
    features: [
      'Kotlin Development – Modern Android apps with the latest language features',
      'Material Design – Beautiful, intuitive interfaces following Google\'s guidelines',
      'Play Store Publishing – Complete support for app submission and updates',
      'Android SDK Integration – Leverage the full power of the Android platform'
    ]
  },
  {
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    shortDescription: 'Beautiful and functional user experiences',
    icon: PaintBrushIcon,
    iconSolid: PaintBrushIconSolid,
    gradient: 'from-green-500 to-emerald-500',
    hoverColor: 'hover:border-green-500',
    features: [
      'User Research – Understanding your users to create better experiences',
      'Wireframing & Prototyping – Interactive mockups before development begins',
      'Visual Design – Stunning interfaces that capture your brand identity',
      'Usability Testing – Ensuring your product is intuitive and user-friendly'
    ]
  },
  {
    name: 'Social Media',
    slug: 'social-media',
    shortDescription: 'Social media management and marketing',
    icon: ShareIcon,
    iconSolid: ShareIconSolid,
    gradient: 'from-green-600 to-emerald-600',
    hoverColor: 'hover:border-green-600',
    features: [
      'Content Strategy – Engaging content plans that resonate with your audience',
      'Community Management – Building and nurturing your online community',
      'Social Media Analytics – Track performance and optimize your strategy',
      'Influencer Partnerships – Connect with influencers to expand your reach'
    ]
  }
];



export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState(0);
  const activeService = services[activeDetailTab];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative bg-white overflow-hidden py-8 md:py-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <div className="pointer-events-none absolute -top-24 -right-16 w-96 h-96 bg-emerald-200/40 rounded-full blur-[110px]" />
        <div className="pointer-events-none absolute bottom-0 -left-10 w-72 h-72 bg-teal-200/30 rounded-full blur-[100px]" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <SparklesIcon className="h-3.5 w-3.5" />
                Comprehensive Digital Solutions
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Services</span>
              </h1>

              <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-lg">
                From web development to mobile apps, we provide end-to-end digital solutions that
                transform your business and drive sustainable growth.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">
                <a
                  href="#services-grid"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Browse Services
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-full hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/60 transition-all duration-300"
                >
                  Get a Quote
                </Link>
              </div>
            </div>

            {/* Right visual: services preview grid */}
            <div className="relative">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-emerald-900/5 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider">8+ services</h3>
                  <span className="text-[11px] font-medium text-emerald-600">24/7 Support</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {services.slice(0, 4).map((service) => (
                    <div key={service.name} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                        <service.icon className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold text-gray-800 leading-snug">{service.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" className="relative bg-emerald-50 py-6 md:py-8 scroll-mt-20">
        <div className="container-custom">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Complete <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Digital Solutions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Choose from our comprehensive range of services designed to elevate your digital presence
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const IconComponent = hoveredService === index ? service.iconSolid : service.icon;

              return (
                <Link
                  key={service.name}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col h-full p-4 rounded-xl bg-white border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5 cursor-pointer overflow-hidden"
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {/* Accent bar */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

                  {/* Icon */}
                  <div className="relative w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center mb-3 ring-1 ring-emerald-100 group-hover:ring-2 group-hover:ring-emerald-400 group-hover:bg-emerald-100 transition-all duration-300">
                    <IconComponent className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-sm font-bold text-gray-900 mb-1">
                    {service.name}
                  </h3>
                  <p className="relative text-xs text-gray-500 leading-relaxed flex-1">
                    {service.shortDescription}
                  </p>

                  {/* Footer link */}
                  <span className="relative inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-3 pt-3 border-t border-gray-50 group-hover:gap-1.5 transition-all duration-300">
                    Learn more
                    <ArrowRightIcon className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Explore Service Details - tabbed */}
      <section className="relative bg-white py-6 md:py-8">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Explore Service <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Details</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Dive deeper into what each service includes.
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-2xl border border-gray-100 bg-white shadow-xl shadow-emerald-900/5 overflow-hidden">
            {/* Tab bar */}
            <div className="flex flex-wrap gap-1.5 p-3 border-b border-gray-100 bg-gray-50">
              {services.map((service, i) => (
                <button
                  key={service.slug}
                  onClick={() => setActiveDetailTab(i)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    activeDetailTab === i
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-emerald-700 hover:bg-white'
                  }`}
                >
                  <service.icon className="h-3.5 w-3.5" />
                  {service.name}
                </button>
              ))}
            </div>

            {/* Active service detail */}
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center shrink-0">
                  <activeService.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{activeService.name}</h3>
                  <p className="text-xs text-gray-500">{activeService.shortDescription}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {activeService.features.map((feature, index) => {
                  const [title, ...rest] = feature.split(' – ');
                  const desc = rest.join(' – ');
                  return (
                    <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <CheckIcon className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">{title}</span>
                        {desc && <span className="text-gray-600"> – {desc}</span>}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Link
                href={`/services/${activeService.slug}`}
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 mt-6"
              >
                View full details
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="relative bg-emerald-50 py-6 md:py-8">
        <div className="container-custom">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 items-center">

            {/* Approach Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckIcon className="w-3.5 h-3.5" />
                Our Methodology
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Approach</span>
              </h2>

              <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                We combine cutting-edge technology with creative design to deliver
                digital products that drive results. Every project is built with
                scalability, performance, and user experience at its core.
              </p>

              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Strategic planning and analysis</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Agile development methodology</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Quality assurance and testing</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Ongoing support and maintenance</span>
                </div>
              </div>
            </div>

            {/* Methodology preview card */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-emerald-900/5 p-5">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Built on process</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: ChartBarIcon, label: 'Strategic Planning' },
                  { icon: CodeBracketIcon, label: 'Agile Development' },
                  { icon: CheckIcon, label: 'Quality Assurance' },
                  { icon: ShareIcon, label: 'Ongoing Support' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <p className="text-xs font-semibold text-gray-800 leading-snug pt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="relative bg-white py-6 md:py-8">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Our Work Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a simple and effective process to deliver the best results
            </p>
          </div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { number: '01', title: 'Planning', description: 'We understand your requirements and create a detailed plan' },
              { number: '02', title: 'Design', description: 'Our designers create beautiful and user-friendly interfaces' },
              { number: '03', title: 'Development', description: 'We build your project using latest technologies' },
              { number: '04', title: 'Testing', description: 'We thoroughly test everything to ensure quality' },
              { number: '05', title: 'Launch', description: 'We deploy your project and make it live' },
              { number: '06', title: 'Support', description: 'We provide ongoing support and maintenance' },
            ].map((step) => (
              <div
                key={step.number}
                className="group relative bg-white p-5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Simple Call to Action */}
          <div className="text-center mt-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-sm font-medium">
              <CheckIcon className="w-4 h-4" />
              Ready to start your project? Let&apos;s work together!
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-teal-600 py-8">
        <div className="container-custom text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
            Ready to Transform Your Business?
          </h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto text-sm">
            Let&apos;s discuss your project and create something amazing together.
            Get in touch with our team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-emerald-600 bg-white rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Start Your Project
              <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}