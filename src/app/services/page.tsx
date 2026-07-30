'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  PaintBrushIcon,
  ShareIcon,
  CheckIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import {
  CodeBracketIcon as CodeBracketIconSolid,
  DevicePhoneMobileIcon as DevicePhoneMobileIconSolid,
  ComputerDesktopIcon as ComputerDesktopIconSolid,
  ChartBarIcon as ChartBarIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  PaintBrushIcon as PaintBrushIconSolid,
  ShareIcon as ShareIconSolid
} from '@heroicons/react/24/solid';
import PageHeader from '@/components/layout/PageHeader';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/50">
      <PageHeader
        eyebrow="Comprehensive Digital Solutions"
        title={<>Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Services</span></>}
        description="From web development to mobile apps, we provide end-to-end digital solutions that transform your business and drive sustainable growth."
        stats={['8+ Services', 'Expert Team', '24/7 Support']}
      />

      {/* Services Grid */}
      <section className="relative bg-white py-8 md:py-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Complete <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Digital Solutions</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              Choose from our comprehensive range of services designed to elevate your digital presence
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const IconComponent = hoveredService === index ? service.iconSolid : service.icon;

              return (
                <Link
                  key={service.name}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col h-full p-6 rounded-2xl bg-white border border-gray-100 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 cursor-pointer overflow-hidden"
                  onMouseEnter={() => setHoveredService(index)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  {/* Ghost index number */}
                  <span className="absolute -top-1 right-3 text-5xl font-bold text-gray-50 group-hover:text-emerald-50 transition-colors duration-300 select-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <div className="relative w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-600 transition-all duration-300">
                    <IconComponent className="w-5 h-5 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-base font-bold text-gray-900 mb-1.5">
                    {service.name}
                  </h3>
                  <p className="relative text-sm text-gray-500 leading-relaxed flex-1">
                    {service.shortDescription}
                  </p>

                  {/* Footer link */}
                  <span className="relative inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 mt-4 pt-4 border-t border-gray-50 group-hover:gap-2 transition-all duration-300">
                    Learn more
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-teal-50 py-8 md:py-12">
        <div className="container-custom">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-start">
            
            {/* Web Development Details */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  <CodeBracketIconSolid className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Web Development
                </h3>
              </div>

              <div className="space-y-3">
                {services[0].features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <span className="font-medium text-gray-900">
                        {feature.split(' – ')[0]}
                      </span>
                      {feature.includes(' – ') && (
                        <span> – {feature.split(' – ')[1]}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* App Development Details */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                  <DevicePhoneMobileIconSolid className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  App Development
                </h3>
              </div>

              <div className="space-y-3">
                {services[1].features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      <span className="font-medium text-gray-900">
                        {feature.split(' – ')[0]}
                      </span>
                      {feature.includes(' – ') && (
                        <span> – {feature.split(' – ')[1]}</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="relative bg-white py-8 md:py-12">
        <div className="container-custom">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
            
            {/* Approach Content */}
            <div>
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-4">
                <CheckIcon className="w-4 h-4 mr-2" />
                Our Methodology
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Approach</span>
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                We combine cutting-edge technology with creative design to deliver 
                digital products that drive results. Every project is built with 
                scalability, performance, and user experience at its core. From 
                concept to deployment, we ensure your vision becomes reality.
              </p>

              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Strategic planning and analysis</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Agile development methodology</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Quality assurance and testing</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">Ongoing support and maintenance</span>
                </div>
              </div>
            </div>

            {/* Team Image Placeholder */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 border border-emerald-200">
                {/* Floating elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-500 rounded-lg opacity-20"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 bg-teal-500 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 left-8 w-4 h-4 bg-indigo-500 rounded-full opacity-25"></div>
                
                {/* Team meeting representation */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">T</span>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">E</span>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">A</span>
                    </div>
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">M</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Collaborative Process</h4>
                    <p className="text-xs text-gray-600">
                      Working together to bring your ideas to life through innovative technology solutions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Clean Process Section */}
      <section className="relative bg-gray-50 py-12 md:py-16">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Our Work Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a simple and effective process to deliver the best results
            </p>
          </div>

          {/* Simple Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "Planning",
                description: "We understand your requirements and create a detailed plan",
                color: "bg-teal-500"
              },
              {
                number: "02",
                title: "Design",
                description: "Our designers create beautiful and user-friendly interfaces",
                color: "bg-green-500"
              },
              {
                number: "03",
                title: "Development",
                description: "We build your project using latest technologies",
                color: "bg-purple-500"
              },
              {
                number: "04",
                title: "Testing",
                description: "We thoroughly test everything to ensure quality",
                color: "bg-orange-500"
              },
              {
                number: "05",
                title: "Launch",
                description: "We deploy your project and make it live",
                color: "bg-red-500"
              },
              {
                number: "06",
                title: "Support",
                description: "We provide ongoing support and maintenance",
                color: "bg-emerald-500"
              }
            ].map((step) => (
              <div key={step.number} className="group">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                  {/* Step Number */}
                  <div className="flex items-center mb-4">
                    <div className={`${step.color} text-white font-bold text-sm px-3 py-1 rounded-full mr-3`}>
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Call to Action */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-4 py-2 bg-teal-100 text-teal-800 rounded-lg text-sm">
              <CheckIcon className="w-4 h-4 mr-2" />
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
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-emerald-600 bg-white rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Start Your Project
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/work"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}