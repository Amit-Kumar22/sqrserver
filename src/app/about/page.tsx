import { UserGroupIcon, LightBulbIcon, ShieldCheckIcon, RocketLaunchIcon, PaintBrushIcon, BoltIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const values = [
  {
    name: 'Innovation Excellence',
    description: 'We pursue cutting-edge solutions and embrace emerging technologies to deliver superiors results.',
    icon: LightBulbIcon,
  },
  {
    name: 'Security First',
    description: 'Every solution is built with security and data protection as fundamental design principles.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Client Success',
    description: 'Your success drives our mission. We deliver measurable value and sustainable growth.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Expert Team',
    description: 'Our experienced professionals bring deep expertise across multiple technology domains.',
    icon: UserGroupIcon,
  },
];

const team = [
  {
    name: 'Upendra Kumar',
    role: 'CEO & Founder, Backend, DevOps',
    expertise: 'AI, Cloud Computing, IT Strategy',
    experience: '4+ years',
  },
  {
    name: 'Amit Pandey',
    role: 'CEO & Founder, Frontend, App Developer',
    expertise: 'Agile, DevOps, Client Relations',
    experience: '2+ years',
    
  },
  {
    name: 'Mithilesh Kumar',
    role: 'CEO & Founder',
    expertise: 'Accounting, Management',
    experience: '3+ years',
  },
  {
    name: 'Rahul Kumar',
    role: 'CEO & Founder',
    expertise: 'Management',
    experience: ' 3+ years',
  },
];


const stats = [
  { label: 'Projects Delivered', value: '18+' },
  { label: 'Client Satisfaction', value: '90%' },
  { label: 'Technologies', value: '25+' },
  { label: 'Years Experience', value: '3+' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-500 overflow-hidden min-h-[450px] lg:min-h-[400px]">
        {/* Background Image - Full Hero */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about.png"
            alt="SquareServer - Transforming Ideas Into Digital Excellence"
            fill
            priority
            className="object-cover object-center opacity-40"
          />
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-teal-900/60 to-transparent"></div>
        </div>

        {/* Floating Tech Elements */}
        <div className="absolute inset-0 z-10">
          {/* AI Brain Icon */}
          <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-emerald-400/30 to-teal-500/30 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-8 h-8 border-2 border-emerald-400 rounded-full relative">
              <div className="absolute inset-1 border border-emerald-400 rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Chart/Analytics Icons */}
          <div className="absolute top-40 right-40 w-12 h-12 bg-gradient-to-br from-teal-400/20 to-indigo-500/20 rounded-lg rotate-12 flex items-center justify-center">
            <div className="w-6 h-6 border border-teal-400 rounded opacity-70">
              <div className="w-full h-full bg-gradient-to-t from-teal-400/40 to-transparent rounded"></div>
            </div>
          </div>

          {/* Code/Development Icon */}
          <div className="absolute bottom-32 right-32 w-10 h-10 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-md -rotate-12 flex items-center justify-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          </div>

          {/* Network/Connection Lines */}
          <div className="absolute top-1/3 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent transform rotate-45"></div>
          <div className="absolute bottom-1/3 right-1/3 w-20 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent transform -rotate-12"></div>

          {/* Floating Particles */}
          <div className="absolute top-1/4 right-1/5 w-2 h-2 bg-emerald-400 rounded-full animate-bounce opacity-60"></div>
          <div className="absolute bottom-1/4 right-1/6 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse opacity-50"></div>
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40"></div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(52, 211, 153, 0.4) 1px, transparent 0)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="container-custom py-12 md:py-16 relative z-20">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-500/10 backdrop-blur-sm border border-teal-400/30 text-teal-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse mr-3"></span>
              Learn About Our Journey
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
              Transforming Ideas Into
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-teal-100/90 leading-relaxed mb-8 max-w-2xl">
              We are a forward-thinking IT solutions company dedicated to transforming businesses 
              through innovative technology and cutting-edge research & development.
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-4">
              <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/30 rounded-lg text-emerald-400 text-sm font-medium">
                <RocketLaunchIcon className="w-4 h-4 mr-2" />
                Innovation Driven
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-teal-500/10 backdrop-blur-sm border border-teal-400/30 rounded-lg text-teal-400 text-sm font-medium">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                Security First
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent z-15"></div>
      </section>

      {/* Company Overview */}
      <section className="relative bg-white">
        <div className="container-custom py-8 md:py-10">
          {/* Vision Section - Image Left, Content Right */}
          <div className="mb-8 md:mb-10">
            <div className="grid md:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
              {/* Left: Image */}
              <div className="relative max-w-md mx-auto md:mx-0 w-full">
                <div className="absolute -inset-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg blur-xl opacity-30"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                  <div className="relative w-full" style={{ minHeight: '300px' }}>
                    <Image
                      src="/about.png"
                      alt="Our Vision - SquareServer"
                      width={500}
                      height={375}
                      className="w-full h-auto object-cover rounded-lg"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/95 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg">
                        <p className="text-xs font-bold text-gray-800 text-center">Innovation Leadership</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 border-2 border-green-400/30 rounded-lg rotate-45"></div>
              </div>

              {/* Right: Content */}
              <div className="relative">
                <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-br from-teal-500/10 to-indigo-600/10 rounded-full transform rotate-12"></div>
                <div className="relative bg-white p-5 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
                      <ShieldCheckIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Vision</span>
                    </h2>
                  </div>

                  <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Innovation Leadership</p>
                      <p className="text-xs">
                        To be the leading technology partner that empowers businesses through cutting-edge digital transformation and innovative solutions.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Global Impact</p>
                      <p className="text-xs">
                        Create scalable digital solutions that make a meaningful impact on businesses worldwide, driving growth and success.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Technology Excellence</p>
                      <p className="text-xs">
                        Pioneer emerging technologies and set new standards in digital innovation, quality, and client satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Section - Content Left, Image Right */}
          <div>
            <div className="grid md:grid-cols-2 gap-6 items-center max-w-6xl mx-auto">
              {/* Left: Content */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 rounded-xl transform -rotate-6"></div>
                <div className="relative bg-white p-5 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mr-3 shadow-md">
                      <LightBulbIcon className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Mission</span>
                    </h2>
                  </div>

                  <div className="space-y-3 text-gray-600 leading-relaxed text-sm">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Quality Services</p>
                      <p className="text-xs">
                        Provide high-quality and cost-effective digital services that meet the unique
                        needs of every client we partner with.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Business Growth</p>
                      <p className="text-xs">
                        Help startups and established businesses grow their online presence and reach
                        their target audience effectively.
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Excellence & Trust</p>
                      <p className="text-xs">
                        Deliver projects on time with excellence, ensuring customer satisfaction and
                        building lasting trust with every engagement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative max-w-md mx-auto md:mx-0 md:ml-auto w-full">
                <div className="absolute -inset-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg blur-xl opacity-30"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl ring-4 ring-white">
                  <div className="relative w-full" style={{ minHeight: '300px' }}>
                    <Image
                      src="/mission.jpg"
                      alt="Our Mission - SquareServer"
                      width={500}
                      height={375}
                      className="w-full h-auto object-cover rounded-lg"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/95 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg">
                        <p className="text-xs font-bold text-gray-800 text-center">Excellence & Trust</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-emerald-400/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Offerings Section */}
      <section className="relative bg-gray-50 py-8">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5">
              Choose the perfect solution for your business needs
            </h2>
            <p className="text-xs text-gray-600">
              From simple static websites to fully managed solutions with ongoing support
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-6xl mx-auto">
            {/* Static Website Design Card */}
            <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-3 md:p-4 border border-gray-100 hover:border-green-300 cursor-pointer hover:-translate-y-1">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-gray-100 group-hover:bg-green-100 rounded-full mb-2 transition-colors duration-300">
                  <PaintBrushIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-0.5">Static Website</h3>
                <p className="text-xs text-gray-500">Design</p>
              </div>

              <p className="text-[11px] md:text-xs text-gray-600 mb-3 leading-relaxed text-left">
                Professional and responsive website design for businesses, startups, portfolios, and personal brands. Fast-loading pages with clean and modern UI. Mobile-friendly and SEO-optimized structure. Ideal for companies that need an online presence without frequent content updates.
              </p>
              
              <div className="space-y-1.5 mb-3">
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Professional & responsive design</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Fast-loading pages</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Mobile-friendly & SEO-optimized</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Ideal for online presence</span>
                </div>
              </div>

              <button className="w-full py-1.5 md:py-2 px-3 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg transition-all duration-300 text-[11px] md:text-xs shadow-md hover:shadow-lg">
                Learn More
              </button>
            </div>

            {/* Dynamic Website Development Card - Featured */}
            <div className="group bg-white hover:bg-green-50 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 p-3 md:p-4 border-2 border-gray-100 hover:border-green-300 transform lg:scale-105 cursor-pointer hover:-translate-y-1">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-gray-100 group-hover:bg-green-100 rounded-full mb-2 transition-colors duration-300">
                  <BoltIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700 group-hover:text-green-600 transition-colors duration-300" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 mb-0.5">Dynamic Website</h3>
                <p className="text-xs text-gray-500">Development</p>
              </div>

              <p className="text-[11px] md:text-xs text-gray-600 mb-3 leading-relaxed text-left">
                Interactive and database-driven websites with advanced functionality. Suitable for business portals, educational platforms, booking systems, and custom web applications. Admin panel integration for easy content management. Secure, scalable, and built for growth.
              </p>
              
              <div className="space-y-1.5 mb-3">
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Interactive & database-driven</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Advanced functionality</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Admin panel integration</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Secure & scalable</span>
                </div>
              </div>

              <button className="w-full py-1.5 md:py-2 px-3 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg transition-all duration-300 text-[11px] md:text-xs shadow-md hover:shadow-lg">
                Choose Plan
              </button>
            </div>

            {/* Fully Managed Website Solution Card */}
            <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-3 md:p-4 border border-gray-100 hover:border-emerald-300 cursor-pointer hover:-translate-y-1">
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-gray-100 group-hover:bg-emerald-100 rounded-full mb-2 transition-colors duration-300">
                  <RocketLaunchIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-700 group-hover:text-emerald-600 transition-colors duration-300" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 mb-0.5">Fully Managed</h3>
                <p className="text-xs text-gray-500">Website Solution</p>
              </div>

              <p className="text-[11px] md:text-xs text-gray-600 mb-3 leading-relaxed text-left">
                Complete website management service from design to maintenance. Includes hosting support, security monitoring, backups, updates, bug fixes, and performance optimization. Dedicated technical support and ongoing maintenance for hassle-free operations.
              </p>
              
              <div className="space-y-1.5 mb-3">
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Complete management service</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Hosting & security monitoring</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Backups & updates</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-3.5 h-3.5 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] md:text-xs text-gray-700">Dedicated technical support</span>
                </div>
              </div>

              <button className="w-full py-1.5 md:py-2 px-3 bg-emerald-400 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all duration-300 text-[11px] md:text-xs shadow-md hover:shadow-lg">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom py-8 md:py-10 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 mb-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse mr-1.5"></span>
              <span className="text-xs font-semibold text-emerald-700">Portfolio</span>
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Our Featured <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            
            <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-snug">
              Explore our successful projects showcasing expertise in web development and digital solutions.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6 max-w-5xl mx-auto">
            {/* Project 1: Hiprotech */}
            <a 
              href="https://hiprotech.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-20 bg-gradient-to-br from-emerald-500 to-teal-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <RocketLaunchIcon className="w-6 h-6 mx-auto mb-1 opacity-90 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="font-bold text-xs">Square Server</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-all duration-200"></div>
              </div>

              {/* Project Content */}
              <div className="p-2">
                <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-1">
                  Robotics & AI Education
                </h3>
                
                <p className="text-xs text-gray-600 mb-1.5 leading-tight line-clamp-2">
                  STEM learning platform for schools
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {['AI', 'STEM'].map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-md border border-emerald-200">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <div className="flex items-center text-emerald-600 font-medium text-xs group-hover:text-emerald-700 transition-colors">
                  <span>Visit</span>
                  <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Project 2: Young Entrepreneur Network */}
            <a 
              href="https://yenuniversal.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-20 bg-gradient-to-br from-purple-500 to-pink-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <UserGroupIcon className="w-6 h-6 mx-auto mb-1 opacity-90 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="font-bold text-xs">YEN</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/10 transition-all duration-200"></div>
              </div>

              {/* Project Content */}
              <div className="p-2">
                <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-200 line-clamp-1">
                  Entrepreneur Network
                </h3>
                
                <p className="text-xs text-gray-600 mb-1.5 leading-tight line-clamp-2">
                  Global platform for startups
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {['Startup', 'Network'].map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-md border border-purple-200">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <div className="flex items-center text-purple-600 font-medium text-xs group-hover:text-purple-700 transition-colors">
                  <span>Visit</span>
                  <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Project 3: Khanamart */}
            <a 
              href="https://khanamart.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-20 bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-6 h-6 mx-auto mb-1 opacity-90 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="font-bold text-xs">Khanamart</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/10 transition-all duration-200"></div>
              </div>

              {/* Project Content */}
              <div className="p-2">
                <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-200 line-clamp-1">
                  E-Commerce Platform
                </h3>
                
                <p className="text-xs text-gray-600 mb-1.5 leading-tight line-clamp-2">
                  Online shopping marketplace
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {['E-Commerce', 'Retail'].map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 bg-green-50 text-green-700 text-xs rounded-md border border-green-200">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <div className="flex items-center text-green-600 font-medium text-xs group-hover:text-green-700 transition-colors">
                  <span>Visit</span>
                  <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Project 4: DAV School */}
            <a 
              href="http://www.davschool.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-20 bg-gradient-to-br from-indigo-500 to-teal-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg className="w-6 h-6 mx-auto mb-1 opacity-90 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="font-bold text-xs">DAV School</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-all duration-200"></div>
              </div>

              {/* Project Content */}
              <div className="p-2">
                <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
                  School Website
                </h3>
                
                <p className="text-xs text-gray-600 mb-1.5 leading-tight line-clamp-2">
                  Educational institution portal
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {['Education', 'Portal'].map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-md border border-indigo-200">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <div className="flex items-center text-indigo-600 font-medium text-xs group-hover:text-indigo-700 transition-colors">
                  <span>Visit</span>
                  <svg className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-gradient-to-r from-emerald-50 to-teal-50 py-8">
        <div className="container-custom">
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-xs">Numbers that reflect our commitment to excellence and client success</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <span className="text-white font-bold text-sm">{stat.value}</span>
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <p className="text-gray-700 font-medium text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative bg-white">
        <div className="container-custom py-8 md:py-10">
          <div className="text-center mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Our Core <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xs text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and define our culture of excellence and innovation.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.name} className="group relative">
                <div className="relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 text-center h-full">
                  {/* Floating icon background */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <value.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {value.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs">
                      {value.description}
                    </p>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-gradient-to-r from-slate-50 to-teal-50">
        <div className="container-custom py-8 md:py-10">
          <div className="text-center mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Our Expert <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xs text-gray-600 max-w-2xl mx-auto">
              Meet the passionate professionals driving innovation and delivering exceptional results for our clients.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="group relative">
                <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 text-center h-40 flex flex-col">
                  {/* Avatar */}
                  <div className="relative mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <span className="text-white font-bold text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1 line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-emerald-600 font-medium mb-1 text-xs">{member.role}</p>
                      <p className="text-xs text-gray-600 mb-1 line-clamp-2 leading-tight">{member.expertise}</p>
                    </div>
                    <div className="mt-auto">
                      <div className="inline-flex items-center px-2 py-0.5 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full">
                        <span className="text-xs text-emerald-700 font-medium">{member.experience}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}