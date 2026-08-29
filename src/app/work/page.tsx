'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Code2 as CodeBracketIcon, Globe as GlobeAltIcon, ClipboardList as ClipboardDocumentListIcon, BarChart3 as ChartBarIcon, Paintbrush as PaintBrushIcon, Search as MagnifyingGlassIcon, Rocket as RocketLaunchIcon, Box as CubeTransparentIcon, Sparkles as SparklesIcon, ArrowRight as ArrowRightIcon, ShieldCheck as ShieldCheckIcon, MessagesSquare as ChatBubbleLeftRightIcon, Clock as ClockIcon, Heart as HeartIcon, Building2 as BuildingOfficeIcon, ShoppingCart as ShoppingCartIcon, GraduationCap as AcademicCapIcon, Banknote as BanknotesIcon, Truck as TruckIcon, BadgeCheck as CheckBadgeIcon, Users as UserGroupIcon, Star as StarIcon, Trophy as TrophyIcon } from 'lucide-react';

const processSteps = [
  { step: '01', title: 'Discovery', description: 'We understand your business, goals and requirements.', icon: MagnifyingGlassIcon },
  { step: '02', title: 'Strategy', description: 'We plan the best approach with the right technology stack.', icon: ClipboardDocumentListIcon },
  { step: '03', title: 'Design', description: 'We create user-friendly UI/UX designs that engage users.', icon: PaintBrushIcon },
  { step: '04', title: 'Development', description: 'We build scalable, secure and high performance solutions.', icon: CodeBracketIcon },
  { step: '05', title: 'Testing', description: 'We ensure quality assurance and bug-free delivery.', icon: ShieldCheckIcon },
  { step: '06', title: 'Launch', description: 'We deploy and provide ongoing support and continuous success.', icon: RocketLaunchIcon },
];

const technologies = ['Next.js', 'Node.js', 'PHP', 'MySQL', 'MongoDB', 'Tailwind CSS'];

const industries = [
  { name: 'Healthcare', icon: HeartIcon, color: 'from-red-500 to-pink-500' },
  { name: 'Real Estate', icon: BuildingOfficeIcon, color: 'from-teal-500 to-emerald-500' },
  { name: 'E-Commerce', icon: ShoppingCartIcon, color: 'from-orange-500 to-amber-500' },
  { name: 'Education', icon: AcademicCapIcon, color: 'from-indigo-500 to-purple-500' },
  { name: 'Finance', icon: BanknotesIcon, color: 'from-green-500 to-emerald-500' },
  { name: 'Logistics', icon: TruckIcon, color: 'from-yellow-500 to-orange-500' },
  { name: 'Travel', icon: GlobeAltIcon, color: 'from-green-500 to-teal-500' },
  { name: 'Hospitality', icon: BuildingOfficeIcon, color: 'from-pink-500 to-rose-500' },
];

const whyChooseUs = [
  { text: 'Experienced & Skilled Team', icon: UserGroupIcon },
  { text: 'Modern & Scalable Solutions', icon: CubeTransparentIcon },
  { text: 'Timely Delivery & On-Time Support', icon: ClockIcon },
  { text: 'Transparent Communication', icon: ChatBubbleLeftRightIcon },
  { text: 'Long-Term Partnership', icon: HeartIcon },
];

const testimonials = [
  {
    quote: 'SquareServer delivered an outstanding solution that exceeded our expectations. Their professionalism, communication, and technical expertise are excellent. Highly recommended!',
    initial: 'H',
    name: 'Happy Client',
    role: 'CEO, Tech Company',
  },
  {
    quote: 'Working with SquareServer was a game-changer for our business. They transformed our vision into reality with precision and creativity. Outstanding results!',
    initial: 'S',
    name: 'Satisfied Customer',
    role: 'Founder, Startup',
  },
];

const bottomStats = [
  { value: '50+', label: 'Projects Delivered', icon: CodeBracketIcon },
  { value: '30+', label: 'Happy Clients', icon: SparklesIcon },
  { value: '10+', label: 'Industries Served', icon: ChartBarIcon },
  { value: '98%', label: 'Client Satisfaction', icon: TrophyIcon },
];

export default function WorkPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Two Column Layout */}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Portfolio Showcase
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Our Work <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Portfolio</span>
              </h1>

              <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-lg">
                Discover innovative digital solutions that transform businesses and create lasting impact through cutting-edge technology and creative excellence.
              </p>

              <div className="flex flex-wrap gap-6 mt-6 pt-5 border-t border-gray-100">
                <div>
                  <div className="text-xl font-bold text-gray-900">4+</div>
                  <div className="text-gray-500 font-medium text-xs">Projects</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">100%</div>
                  <div className="text-gray-500 font-medium text-xs">Success</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">3+</div>
                  <div className="text-gray-500 font-medium text-xs">Years</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href="#projects"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  View Projects
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-full hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/60 transition-all duration-300"
                >
                  Start Project
                  <RocketLaunchIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative lg:h-[320px] h-[260px] group">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-500">
                <Image
                  src="/work.jpg"
                  alt="UX/UI Design Portfolio"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-5 py-2 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckBadgeIcon className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold text-gray-900">Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="relative bg-emerald-50 py-8 md:py-10">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-emerald-200 rounded-full text-emerald-700 text-xs font-semibold mb-3">
              <ClipboardDocumentListIcon className="w-3.5 h-3.5" />
              Our Process
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Development <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              A proven methodology ensuring successful delivery of every project from concept to launch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {processSteps.map((item) => (
              <div
                key={item.step}
                className="group relative bg-white p-4 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-600">{item.step}</span>
                    <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies We Use Section */}
      <section className="relative bg-white py-8 md:py-10">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-semibold mb-3">
              <CubeTransparentIcon className="w-3.5 h-3.5" />
              Tech Stack
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Technologies <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">We Master</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Leveraging cutting-edge technologies to build powerful, scalable solutions.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2.5 bg-emerald-50 border border-emerald-100 rounded-full text-sm font-semibold text-emerald-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="relative bg-emerald-50 py-8 md:py-10">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-emerald-200 rounded-full text-emerald-700 text-xs font-semibold mb-3">
              <BuildingOfficeIcon className="w-3.5 h-3.5" />
              Industries
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Industries <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">We Serve</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Empowering businesses across diverse industries with tailored digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-6xl mx-auto">
            {industries.map((industry) => (
              <div key={industry.name} className="group flex flex-col items-center">
                <div
                  className={`w-11 h-11 bg-gradient-to-br ${industry.color} rounded-xl flex items-center justify-center mb-2 shadow-sm group-hover:scale-110 transition-all duration-300`}
                >
                  <industry.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center group-hover:text-emerald-600 transition-colors duration-300">
                  {industry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SquareServer Section */}
      <section className="relative bg-white py-8 md:py-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-semibold mb-4">
                <SparklesIcon className="w-3.5 h-3.5" />
                Why Choose Us
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Why Choose <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">SquareServer?</span>
              </h2>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                Delivering exceptional IT solutions with unmatched quality, transparency, and dedicated support that drives your business forward.
              </p>

              <div className="space-y-2 mb-6">
                {whyChooseUs.map((feature) => (
                  <div
                    key={feature.text}
                    className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 transition-all duration-300"
                  >
                    <div className="w-9 h-9 shrink-0 bg-emerald-50 ring-1 ring-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-all duration-300">
                      <feature.icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Let&apos;s Work Together
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Right Image with Floating Cards */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 group">
                <Image
                  src="/web.jpg"
                  alt="Team collaboration"
                  width={600}
                  height={350}
                  className="w-full h-[280px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="hidden lg:block">
                <div className="absolute -top-4 -right-5 bg-white rounded-2xl shadow-lg p-3 max-w-[150px] border border-gray-100">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                      <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Dedicated Support</h4>
                      <p className="text-[11px] text-gray-500">24/7 available</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/3 -left-5 bg-white rounded-2xl shadow-lg p-3 max-w-[150px] border border-gray-100">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                      <ClockIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">On-Time Delivery</h4>
                      <p className="text-[11px] text-gray-500">Value your time</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-5 bg-white rounded-2xl shadow-lg p-3 max-w-[150px] border border-gray-100">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                      <ShieldCheckIcon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Quality Assurance</h4>
                      <p className="text-[11px] text-gray-500">Bug-free solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="relative bg-emerald-50 py-8 md:py-10">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-emerald-200 rounded-full text-emerald-700 text-xs font-semibold mb-3">
              <StarIcon className="w-3.5 h-3.5 fill-current" />
              Testimonials
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              What Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Real feedback from satisfied clients who trusted us with their digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="group bg-white rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                <div className="flex items-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed italic">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {t.initial}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Statistics Section */}
      <section className="relative bg-gray-950 py-8 md:py-10 overflow-hidden">
        <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl translate-y-1/2" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {bottomStats.map((stat) => (
              <div
                key={stat.label}
                className="text-center rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mb-3 shadow-sm">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 font-medium text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
