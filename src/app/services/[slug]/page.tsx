'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Code2 as CodeBracketIcon, Smartphone as DevicePhoneMobileIcon, Monitor as ComputerDesktopIcon, BarChart3 as ChartBarIcon, ShoppingCart as ShoppingCartIcon, Paintbrush as PaintBrushIcon, Share2 as ShareIcon, CheckCircle2 as CheckCircleIcon, ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon } from 'lucide-react';

const servicesData = [
  {
    name: 'Web Development',
    slug: 'web-development',
    shortDescription: 'Modern, responsive websites that drive results',
    longDescription: 'Transform your digital presence with our cutting-edge web development services. We create stunning, high-performance websites that not only look beautiful but also deliver exceptional user experiences and drive business growth.',
    icon: CodeBracketIcon,
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Responsive Websites – Modern, mobile-friendly designs that adapt seamlessly to any device',
      'E-commerce Platforms – Powerful online stores with secure payment integration',
      'Business Websites – Professional web presence that drives growth',
      'Custom Web Applications – Tailored solutions for unique business needs',
      'Website Maintenance – Regular updates, security patches, and technical support to keep your site running smoothly'
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'Tailwind CSS'],
    benefits: [
      'Mobile-first responsive design',
      'SEO-optimized structure',
      'Fast loading speeds',
      'Secure and scalable architecture',
      'Easy content management',
      'Analytics integration',
      'Regular maintenance & updates',
      'Backup & disaster recovery'
    ]
  },
  {
    name: 'App Development',
    slug: 'app-development',
    shortDescription: 'Native and cross-platform mobile solutions',
    longDescription: 'Bring your ideas to life with powerful mobile applications. We develop native and cross-platform apps that deliver seamless experiences across all devices, helping you reach your audience wherever they are.',
    icon: DevicePhoneMobileIcon,
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Android Apps – Native Android app development with fast, secure performance and Play Store-ready builds',
      'iOS Apps – Premium iPhone applications with a smooth user experience and secure Apple ecosystem apps',
      'Cross-Platform Solutions – One codebase for all platforms using React Native & Flutter',
      'UI/UX Focused Design – Modern, clean interfaces with a user-centric design approach',
      'App Maintenance – Regular updates, bug fixes, performance monitoring, and 24/7 technical support',
      'API Integration – Payment gateways, third-party APIs, cloud connectivity, and real-time data sync',
      'App Testing & QA – Manual and automated testing, bug detection, and device compatibility testing',
      'Deployment & Support – App Store & Play Store publishing, continuous monitoring, and post-launch support'
    ],
    technologies: ['React Native', 'REST APIs'],
    benefits: [
      'Native performance',
      'Offline functionality',
      'Push notifications',
      'App store optimization',
      'Regular updates and maintenance',
      'Cross-platform compatibility',
      'Real-time data sync',
      'Cloud integration'
    ]
  },
  {
    name: 'iOS Apps',
    slug: 'ios-apps',
    shortDescription: 'Premium Apple ecosystem applications',
    longDescription: "Create premium iOS applications that leverage the full power of Apple's ecosystem. Our team specializes in building elegant, high-performance apps that meet Apple's stringent quality standards.",
    icon: ComputerDesktopIcon,
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      "Swift Development – Native iOS apps built with Apple's latest technologies",
      'SwiftUI Interfaces – Modern, declarative UI framework for stunning interfaces',
      'App Store Optimization – Complete guidance for successful app launches',
      'Apple Watch Integration – Extend your app to wearable devices'
    ],
    technologies: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'CloudKit', 'Xcode'],
    benefits: [
      'Native iOS performance',
      'Apple design guidelines',
      'App Store approval support',
      'iCloud synchronization',
      'Apple Watch support',
      'Regular iOS updates'
    ]
  },
  {
    name: 'SEO & Ads',
    slug: 'seo-ads',
    shortDescription: 'Digital marketing and search optimization',
    longDescription: 'Boost your online visibility and drive targeted traffic with our comprehensive SEO and advertising services. We help businesses rank higher in search results and run effective ad campaigns that deliver real ROI.',
    icon: ChartBarIcon,
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Search Engine Optimization – Higher Google search rankings through keyword & content optimization',
      'Google Ads Management – High-converting ad campaigns with ROI-focused targeting',
      'Social Media Advertising – Facebook & Instagram ads with audience engagement strategies',
      'Analytics & Reporting – Real-time performance tracking and monthly reports',
      'Content Marketing – SEO-friendly content, blog & article marketing',
      'Email Marketing – Personalized campaigns and lead nurturing automation',
      'Local SEO Services – Google Business optimization and local search visibility',
      'Conversion Optimization – Landing page optimization for higher conversion rates'
    ],
    technologies: ['Google Analytics', 'Google Ads', 'Facebook Ads', 'Meta Business', 'SEMrush', 'Ahrefs', 'Mailchimp', 'Google Search Console'],
    benefits: [
      'Increased organic traffic',
      'Higher search rankings',
      'Better conversion rates',
      'Detailed analytics',
      'ROI tracking',
      'Brand awareness',
      'Lead generation',
      'Customer retargeting'
    ]
  },
  {
    name: 'E-commerce',
    slug: 'ecommerce',
    shortDescription: 'Complete online store solutions',
    longDescription: 'Launch and grow your online business with our comprehensive e-commerce solutions. We build powerful, scalable online stores that provide seamless shopping experiences and drive sales.',
    icon: ShoppingCartIcon,
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Custom E-commerce Platforms – Tailored online stores that match your brand',
      'Payment Gateway Integration – Secure payment processing with multiple options',
      'Inventory Management – Efficient stock tracking and order management',
      'Mobile Commerce – Optimized shopping experience for mobile devices'
    ],
    technologies: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal', 'Magento', 'Next.js Commerce'],
    benefits: [
      'Secure payment processing',
      'Inventory management',
      'Order tracking',
      'Customer accounts',
      'Product reviews',
      'Marketing integration'
    ]
  },
  {
    name: 'Android Apps',
    slug: 'android-apps',
    shortDescription: 'Native Android development',
    longDescription: "Reach billions of Android users with powerful, feature-rich mobile applications. We develop native Android apps that take full advantage of the platform's capabilities and Google's latest technologies.",
    icon: DevicePhoneMobileIcon,
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Kotlin Development – Modern Android apps with the latest language features',
      "Material Design – Beautiful, intuitive interfaces following Google's guidelines",
      'Play Store Publishing – Complete support for app submission and updates',
      'Android SDK Integration – Leverage the full power of the Android platform'
    ],
    technologies: ['Kotlin', 'Java', 'Android Studio', 'Jetpack Compose', 'Firebase', 'Material Design'],
    benefits: [
      'Native Android performance',
      'Material Design UI',
      'Play Store optimization',
      'Google services integration',
      'Wide device compatibility',
      'Regular Android updates'
    ]
  },
  {
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    shortDescription: 'Beautiful and functional user experiences',
    longDescription: 'Create delightful user experiences that keep customers engaged. Our UI/UX design services focus on understanding your users and crafting intuitive, beautiful interfaces that drive satisfaction and conversions.',
    icon: PaintBrushIcon,
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'User Research – Understanding your users to create better experiences',
      'Wireframing & Prototyping – Interactive mockups before development begins',
      'Visual Design – Stunning interfaces that capture your brand identity',
      'Usability Testing – Ensuring your product is intuitive and user-friendly'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer'],
    benefits: [
      'User-centered design',
      'Improved usability',
      'Higher conversion rates',
      'Brand consistency',
      'Accessibility compliance',
      'Design systems'
    ]
  },
  {
    name: 'Social Media',
    slug: 'social-media',
    shortDescription: 'Social media management and marketing',
    longDescription: 'Build and engage your community with strategic social media management. We help brands create compelling content, grow their audience, and turn followers into customers across all major social platforms.',
    icon: ShareIcon,
    gradient: 'from-emerald-500 to-teal-600',
    features: [
      'Content Strategy – Engaging content plans that resonate with your audience',
      'Community Management – Building and nurturing your online community',
      'Social Media Analytics – Track performance and optimize your strategy',
      'Influencer Partnerships – Connect with influencers to expand your reach'
    ],
    technologies: ['Hootsuite', 'Buffer', 'Sprout Social', 'Meta Business Suite', 'LinkedIn Ads', 'Twitter Ads'],
    benefits: [
      'Increased engagement',
      'Brand awareness',
      'Community growth',
      'Content calendar',
      'Performance analytics',
      'Crisis management'
    ]
  }
];

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Service Not Found</h1>
          <Link href="/services" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

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
          <Link
            href="/services"
            className="group inline-flex items-center text-gray-500 hover:text-emerald-600 mb-4 transition-colors text-xs font-medium"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-sm`}>
                <service.icon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">{service.name}</h1>
              <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-lg">{service.longDescription}</p>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 mt-6 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Get Started
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-emerald-900/5 p-5">
              <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-3">What&apos;s included</h3>
              <div className="space-y-2">
                {service.features.slice(0, 4).map((feature) => {
                  const [title] = feature.split(' – ');
                  return (
                    <div key={title} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                      <p className="text-xs font-semibold text-gray-800">{title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-emerald-50 py-6 md:py-8">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              What We <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Offer</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-3">
              {service.features.map((feature, index) => {
                const [title, description] = feature.split(' – ');
                return (
                  <div
                    key={index}
                    className="group relative bg-white p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-50 ring-1 ring-emerald-100 flex items-center justify-center">
                        <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
                        {description && <p className="text-gray-600 text-xs leading-relaxed">{description}</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative bg-white py-6 md:py-8">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              Technologies We <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Use</span>
            </h2>

            <div className="flex flex-wrap justify-center gap-2">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3.5 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-xs font-semibold text-emerald-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative bg-emerald-50 py-6 md:py-8">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
              Key <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Benefits</span>
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
                >
                  <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-gray-700 font-medium text-xs">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-teal-600 py-8">
        <div className="container-custom text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Ready to Get Started?</h2>
          <p className="text-emerald-100 mb-6 max-w-2xl mx-auto text-sm">
            Let&apos;s discuss how our {service.name.toLowerCase()} services can help transform your business.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-emerald-600 bg-white rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Contact Us
              <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
