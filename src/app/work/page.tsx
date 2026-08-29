'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Code2 as CodeBracketIcon, Globe as GlobeAltIcon, ClipboardList as ClipboardDocumentListIcon, BarChart3 as ChartBarIcon, Paintbrush as PaintBrushIcon, Search as MagnifyingGlassIcon, Rocket as RocketLaunchIcon, Box as CubeTransparentIcon, Sparkles as SparklesIcon, ArrowRight as ArrowRightIcon, ShieldCheck as ShieldCheckIcon, MessagesSquare as ChatBubbleLeftRightIcon, Clock as ClockIcon, Heart as HeartIcon, Building2 as BuildingOfficeIcon, ShoppingCart as ShoppingCartIcon, GraduationCap as AcademicCapIcon, Banknote as BanknotesIcon, Truck as TruckIcon, BadgeCheck as CheckBadgeIcon, Users as UserGroupIcon, Star as StarIcon } from 'lucide-react';

export default function WorkPage() {

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section - Two Column Layout */}
      <section className="relative bg-white overflow-hidden py-12 md:py-16">
        {/* Dot-grid background, faded toward the edges */}
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Portfolio Showcase
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Our Work <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Portfolio</span>
              </h1>

              {/* Description */}
              <p className="text-base text-gray-600 leading-relaxed">
                Discover innovative digital solutions that transform businesses and create lasting impact through cutting-edge technology and creative excellence.
              </p>

              {/* Statistics */}
              <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100 mt-2">
                <div>
                  <div className="text-2xl font-bold text-gray-900">4+</div>
                  <div className="text-gray-500 font-medium text-sm">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-gray-500 font-medium text-sm">Success</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">3+</div>
                  <div className="text-gray-500 font-medium text-sm">Years</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
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
            <div className="relative lg:h-[400px] h-[300px] group">
              <div className="relative h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-500">
                <Image
                  src="/work.jpg"
                  alt="UX/UI Design Portfolio"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-5 py-2 shadow-lg border border-gray-100">
                <div className="flex items-center gap-2">
                  <CheckBadgeIcon className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-bold text-gray-900">Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-16 bg-gradient-to-b from-white via-green-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #dcfce7 1px, transparent 1px), linear-gradient(to bottom, #dcfce7 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 bg-green-100 rounded-full text-green-700 text-xs font-semibold mb-3">
              <ClipboardDocumentListIcon className="w-4 h-4 mr-2" />
              Our Process
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Development <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              A proven methodology ensuring successful delivery of every project from concept to launch.
            </p>
          </div>

          {/* Horizontal Timeline - Desktop */}
          <div className="hidden lg:block max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Icons Row */}
              <div className="flex justify-between items-center mb-6">
                {[
                  { step: "01", title: "Discovery", description: "We understand your business, goals and requirements.", icon: MagnifyingGlassIcon },
                  { step: "02", title: "Strategy", description: "We plan the best approach with the right technology stack.", icon: ClipboardDocumentListIcon },
                  { step: "03", title: "Design", description: "We create user-friendly UI/UX designs that engage users.", icon: PaintBrushIcon },
                  { step: "04", title: "Development", description: "We build scalable, secure and high performance solutions.", icon: CodeBracketIcon },
                  { step: "05", title: "Testing", description: "We ensure quality assurance and bug-free delivery.", icon: ShieldCheckIcon },
                  { step: "06", title: "Launch", description: "We deploy and provide ongoing support and continuous success.", icon: RocketLaunchIcon }
                ].map((item, index) => (
                  <div key={index} className="relative flex-1 flex flex-col items-center group">
                    {/* Connecting Line */}
                    {index < 5 && (
                      <div className="absolute left-1/2 top-10 w-full h-0.5 border-t-2 border-dashed border-teal-300 -z-10"></div>
                    )}
                    
                    {/* Icon Circle */}
                    <div className="relative mb-2">
                      <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                        <item.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Step Number */}
                    <div className="text-xs font-bold text-teal-600 mb-0.5">{item.step}</div>
                    
                    {/* Title */}
                    <h3 className="text-xs font-bold text-gray-900 mb-1 text-center">{item.title}</h3>
                    
                    {/* Description */}
                    <p className="text-xs text-gray-600 text-center leading-tight px-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Grid */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Discovery", description: "We understand your business, goals and requirements.", icon: MagnifyingGlassIcon, gradient: "from-teal-500 to-teal-600" },
              { step: "02", title: "Strategy", description: "We plan the best approach with the right technology stack.", icon: ClipboardDocumentListIcon, gradient: "from-indigo-500 to-indigo-600" },
              { step: "03", title: "Design", description: "We create user-friendly UI/UX designs that engage users.", icon: PaintBrushIcon, gradient: "from-purple-500 to-purple-600" },
              { step: "04", title: "Development", description: "We build scalable, secure and high performance solutions.", icon: CodeBracketIcon, gradient: "from-green-500 to-green-600" },
              { step: "05", title: "Testing", description: "We ensure quality assurance and bug-free delivery.", icon: ShieldCheckIcon, gradient: "from-emerald-500 to-emerald-600" },
              { step: "06", title: "Launch", description: "We deploy and provide ongoing support and continuous success.", icon: RocketLaunchIcon, gradient: "from-violet-500 to-violet-600" }
            ].map((item, index) => (
              <div key={index} className="group relative bg-white rounded-xl p-5 border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-2">{item.step}</div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies We Use Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-green-300 text-xs font-semibold mb-4">
              <CubeTransparentIcon className="w-4 h-4 mr-2" />
              Tech Stack
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Technologies <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">We Master</span>
            </h2>
            <p className="text-sm text-green-200 max-w-2xl mx-auto">
              Leveraging cutting-edge technologies to build powerful, scalable solutions.
            </p>
          </div>

          {/* Technology Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'Next.js', logo: '▲', color: 'from-white to-gray-100' },
              { name: 'Node.js', logo: '⬢', color: 'from-green-400 to-emerald-500' },
              { name: 'PHP', logo: '🐘', color: 'from-indigo-400 to-purple-500' },
              { name: 'MySQL', logo: '🐬', color: 'from-teal-400 to-emerald-500' },
              { name: 'MongoDB', logo: '🍃', color: 'from-green-500 to-emerald-600' },
              { name: 'Tailwind', logo: '💨', color: 'from-emerald-400 to-green-500' }
            ].map((tech, index) => (
              <div key={index} className="group flex flex-col items-center">
                <div className={`relative w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-3 border border-white/20 group-hover:bg-gradient-to-br ${tech.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{tech.logo}</span>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-500`}></div>
                </div>
                <span className="text-white font-semibold text-sm group-hover:text-green-300 transition-colors duration-300">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 bg-green-100 rounded-full text-green-700 text-xs font-semibold mb-3">
              <BuildingOfficeIcon className="w-4 h-4 mr-2" />
              Industries
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Industries <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">We Serve</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Empowering businesses across diverse industries with tailored digital solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-6xl mx-auto">
            {[
              { name: 'Healthcare', icon: HeartIcon, color: 'from-red-500 to-pink-500' },
              { name: 'Real Estate', icon: BuildingOfficeIcon, color: 'from-teal-500 to-emerald-500' },
              { name: 'E-Commerce', icon: ShoppingCartIcon, color: 'from-orange-500 to-amber-500' },
              { name: 'Education', icon: AcademicCapIcon, color: 'from-indigo-500 to-purple-500' },
              { name: 'Finance', icon: BanknotesIcon, color: 'from-green-500 to-emerald-500' },
              { name: 'Logistics', icon: TruckIcon, color: 'from-yellow-500 to-orange-500' },
              { name: 'Travel', icon: GlobeAltIcon, color: 'from-green-500 to-teal-500' },
              { name: 'Hospitality', icon: BuildingOfficeIcon, color: 'from-pink-500 to-rose-500' }
            ].map((industry, index) => (
              <div key={index} className="group flex flex-col items-center">
                <div className={`relative w-16 h-16 bg-gradient-to-br ${industry.color} rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <industry.icon className="w-8 h-8 text-white" />
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-2xl`}></div>
                </div>
                <span className="text-sm font-semibold text-gray-700 text-center group-hover:text-green-600 transition-colors duration-300">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose SquareServer Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-4 py-1.5 bg-green-200/50 rounded-full text-green-700 text-xs font-semibold mb-4">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Why Choose Us
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Why Choose <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">SquareServer?</span>
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Delivering exceptional IT solutions with unmatched quality, transparency, and dedicated support that drives your business forward.
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {[
                  { text: 'Experienced & Skilled Team', icon: UserGroupIcon },
                  { text: 'Modern & Scalable Solutions', icon: CubeTransparentIcon },
                  { text: 'Timely Delivery & On-Time Support', icon: ClockIcon },
                  { text: 'Transparent Communication', icon: ChatBubbleLeftRightIcon },
                  { text: 'Long-Term Partnership', icon: HeartIcon }
                ].map((feature, index) => (
                  <div key={index} className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors duration-300">{feature.text}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Let&apos;s Work Together
                <ArrowRightIcon className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Right Image with Floating Cards */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <Image 
                  src="/web.jpg" 
                  alt="Team collaboration"
                  width={600}
                  height={350}
                  className="w-full h-[350px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent"></div>
              </div>

              {/* Floating Feature Cards */}
              <div className="hidden lg:block">
                {/* Dedicated Support Card */}
                <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-xl p-4 max-w-[160px] border border-gray-100 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 mb-1">Dedicated Support</h4>
                      <p className="text-xs text-gray-600">24/7 available</p>
                    </div>
                  </div>
                </div>

                {/* On-Time Delivery Card */}
                <div className="absolute top-1/3 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-[160px] border border-gray-100 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <ClockIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 mb-1">On-Time Delivery</h4>
                      <p className="text-xs text-gray-600">Value your time</p>
                    </div>
                  </div>
                </div>

                {/* Quality Assurance Card */}
                <div className="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-xl p-4 max-w-[160px] border border-gray-100 hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <ShieldCheckIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 mb-1">Quality Assurance</h4>
                      <p className="text-xs text-gray-600">Bug-free solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-1.5 bg-yellow-100 rounded-full text-yellow-700 text-xs font-semibold mb-3">
              <StarIcon className="w-4 h-4 mr-2 fill-current" />
              Testimonials
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              What Our <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Real feedback from satisfied clients who trusted us with their digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="group bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-5 leading-relaxed italic">
                &quot;SquareServer delivered an outstanding solution that exceeded our expectations. Their professionalism, communication, and technical expertise are excellent. Highly recommended!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-base mr-3 shadow-lg">
                  H
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Happy Client</div>
                  <div className="text-xs text-gray-500">CEO, Tech Company</div>
                </div>
              </div>
            </div>

            <div className="group bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-5 leading-relaxed italic">
                &quot;Working with SquareServer was a game-changer for our business. They transformed our vision into reality with precision and creativity. Outstanding results!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-base mr-3 shadow-lg">
                  S
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">Satisfied Customer</div>
                  <div className="text-xs text-gray-500">Founder, Startup</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Statistics Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 border-t border-white/10 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <CodeBracketIcon className="w-10 h-10 text-white" />
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 blur-xl opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-300"></div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">50+</div>
              <div className="text-green-200 font-medium text-sm">Projects Delivered</div>
            </div>

            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <SparklesIcon className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 blur-xl opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-300"></div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">30+</div>
              <div className="text-green-200 font-medium text-sm">Happy Clients</div>
            </div>

            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <ChartBarIcon className="w-10 h-10 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 blur-xl opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-300"></div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">10+</div>
              <div className="text-green-200 font-medium text-sm">Industries Served</div>
            </div>

            <div className="text-center group">
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-4 shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-600 blur-xl opacity-0 group-hover:opacity-50 rounded-2xl transition-opacity duration-300"></div>
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-2">98%</div>
              <div className="text-green-200 font-medium text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}