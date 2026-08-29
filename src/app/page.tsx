'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ArrowRight as ArrowRightIcon, Code2 as CodeBracketIcon, FlaskConical as BeakerIcon, Cpu as CpuChipIcon, ShieldCheck as ShieldCheckIcon, Rocket as RocketLaunchIcon, BarChart3 as ChartBarIcon, Building2 as BuildingOfficeIcon, Heart as HeartIcon, GraduationCap as AcademicCapIcon, ShoppingBag as ShoppingBagIcon, Banknote as BanknotesIcon, Truck as TruckIcon, Lightbulb as LightBulbIcon, ChevronDown as ChevronDownIcon, Users as UserGroupIcon, Zap as BoltIcon, Target as TargetIcon, Headphones as HeadphonesIcon, Paintbrush as PaintBrushIcon, CheckCircle2 as CheckCircleIcon } from 'lucide-react';

const features = [
  {
    name: 'Custom Software Development',
    description: 'Tailored software solutions built with cutting-edge technologies to meet your specific business requirements.',
    icon: CodeBracketIcon,
  },
  {
    name: 'Research & Development',
    description: 'Innovation-driven R&D services focusing on emerging technologies, AI/ML, and next-generation solutions.',
    icon: BeakerIcon,
  },
  {
    name: 'System Architecture',
    description: 'Scalable and robust system architecture design for enterprise-grade applications and platforms.',
    icon: CpuChipIcon,
  },
  {
    name: 'Security Solutions',
    description: 'Comprehensive cybersecurity solutions to protect your digital assets and ensure data integrity.',
    icon: ShieldCheckIcon,
  },
];

const stats = [
  { name: 'Projects Completed', value: '18+', icon: RocketLaunchIcon },
  { name: 'Years Experience', value: '3+', icon: ChartBarIcon },
  { name: 'Technologies Mastered', value: '25+', icon: CodeBracketIcon },
  { name: 'Client Satisfaction', value: '90%', icon: ShieldCheckIcon },
];

const team = [
  {
    name: 'Upendra Kumar',
    role: 'CEO & Founder, Backend, DevOps',
    expertise: 'AI, Cloud Computing, IT Strategy',
    experience: '4+ years',
  },
  {
    name: 'Amit Kumar',
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

const industries = [
  {
    name: 'Real Estate',
    description: 'Property management systems, virtual tours, and CRM solutions',
    icon: BuildingOfficeIcon,
    color: 'from-teal-500 to-emerald-500',
  },
  {
    name: 'Healthcare',
    description: 'Patient management, telemedicine platforms, and analytics',
    icon: HeartIcon,
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Education',
    description: 'E-learning platforms, student management, and educational apps',
    icon: AcademicCapIcon,
    color: 'from-purple-500 to-indigo-500',
  },
  {
    name: 'E-commerce',
    description: 'Online stores, payment gateways, and shopping platforms',
    icon: ShoppingBagIcon,
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Finance',
    description: 'Banking apps, investment platforms, and financial tools',
    icon: BanknotesIcon,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Logistics',
    description: 'Fleet management, route optimization, and supply chain tracking',
    icon: TruckIcon,
    color: 'from-teal-600 to-green-600',
  },
  {
    name: 'Startups',
    description: 'MVP development, scalable architecture, and rapid prototyping',
    icon: LightBulbIcon,
    color: 'from-emerald-500 to-teal-500',
  },
];

const faqs = [
  {
    question: 'How much does a custom website or app development project cost?',
    answer: 'Project costs vary based on complexity, features, and timeline. A basic website starts from ₹25,000-₹50,000, while custom web applications range from ₹1,00,000-₹5,00,000+. Mobile apps typically range from ₹1,50,000-₹10,00,000+. We provide detailed quotes after understanding your specific requirements. Contact us for a free consultation and accurate estimate.'
  },
  {
    question: 'How long does it take to complete a project?',
    answer: 'Project timelines depend on scope and complexity. A simple website takes 2-4 weeks, a custom web application takes 2-4 months, and mobile apps typically take 3-6 months. We follow agile methodology with regular updates and milestone deliveries. Rush projects can be accommodated with additional resources.'
  },
  {
    question: 'Do you provide ongoing support and maintenance after project completion?',
    answer: 'Yes! We offer comprehensive maintenance packages including regular updates, security patches, bug fixes, performance optimization, and 24/7 technical support. Our maintenance plans start from ₹5,000/month for basic support to ₹25,000+/month for enterprise-level support with priority response times.'
  },
  {
    question: 'What technologies do you use for development?',
    answer: 'We use modern, industry-standard technologies: React, Next.js, Node.js for web development; React Native for cross-platform mobile apps; MongoDB and PostgreSQL for databases; AWS and Azure for cloud hosting. We choose the best tech stack based on your project requirements, scalability needs, and budget.'
  },
  {
    question: 'Can you help with digital marketing and SEO for my website?',
    answer: 'Absolutely! We offer comprehensive digital marketing services including SEO optimization, Google Ads management, social media marketing, content creation, and email campaigns. Our SEO packages start from ₹15,000/month and include keyword research, on-page optimization, content strategy, and monthly performance reports.'
  },
  {
    question: 'Do you work with startups and small businesses?',
    answer: 'Yes! We have extensive experience working with startups and small businesses. We understand budget constraints and offer flexible payment plans, MVP development for quick market entry, and scalable solutions that grow with your business. We\'ve successfully helped multiple startups launch their digital products.'
  },
  {
    question: 'What is your development process?',
    answer: 'We follow a structured agile process: 1) Discovery & Planning - understand requirements and create roadmap, 2) Design - create wireframes and UI/UX designs, 3) Development - build in sprints with regular demos, 4) Testing - comprehensive QA and bug fixes, 5) Deployment - launch and monitoring, 6) Support - ongoing maintenance and updates.'
  },
  {
    question: 'Can you redesign or improve my existing website/app?',
    answer: 'Yes! We specialize in website and app redesigns, modernization, and performance optimization. Whether you need a visual refresh, technology upgrade, new features, or complete rebuild, we can help. We\'ll audit your current solution, identify improvements, and provide a detailed upgrade plan with transparent pricing.'
  }
];

// Animates a "18+" / "90%" style value counting up from 0 once it mounts.
function AnimatedNumber({ value }: { value: string }) {
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1200;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(target * eased)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{display}</>;
}

export default function HomePage() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCardDeckMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: y * -10 });
  };

  const handleCardDeckMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Card-deck layout on light dot-grid background */}
      <section className="relative bg-emerald-50 pt-5 pb-10 sm:pt-3 sm:pb-10 lg:pt-7 lg:pb-20 overflow-hidden">
        {/* Dot-grid texture, faded toward the edges */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #a7d9c5 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 0%, black 40%, transparent 100%)',
          }}
        />

        {/* Soft ambient color blobs */}
        <div className="pointer-events-none absolute -top-24 -right-16 w-96 h-96 bg-emerald-200/50 rounded-full blur-[110px] animate-pulse-slow" />
        <div className="pointer-events-none absolute bottom-0 -left-10 w-72 h-72 bg-teal-200/40 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />

        <div className="relative container-custom">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-10 items-center">
            {/* Left: headline + copy + CTAs */}
            <div className="max-w-xl">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-sm opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.1s' }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                SquareServer Digital
              </div>

              <h1
                className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-[1.12] tracking-tight opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.2s' }}
              >
                Transform your business with{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent animate-gradient-x">
                  cutting-edge technology
                </span>
              </h1>

              <p
                className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                Empowering businesses with innovative software development, AI-driven solutions, and
                next-generation digital experiences. Partner with SquareServer to turn your vision into reality.
              </p>

              <div className="flex flex-wrap gap-3 mt-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <span className="relative">Get Started Today</span>
                  <ArrowRightIcon className="relative h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-full hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/60 transition-all duration-300"
                >
                  Explore Projects
                </Link>
              </div>

              <div
                className="flex items-center gap-6 sm:gap-8 mt-8 pt-6 border-t border-emerald-200/50 opacity-0 animate-fade-in-up"
                style={{ animationDelay: '0.5s' }}
              >
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.name}>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      <AnimatedNumber value={stat.value} />
                    </p>
                    <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{stat.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: fanned card-deck visual */}
            <div
              className="relative h-[300px] sm:h-[340px] lg:h-[380px] flex items-center justify-center opacity-0 animate-scale-in"
              style={{ animationDelay: '0.3s', perspective: '900px' }}
              onMouseMove={handleCardDeckMouseMove}
              onMouseLeave={handleCardDeckMouseLeave}
            >
              <div
                className="relative w-full max-w-[19rem] transition-transform duration-300 ease-out"
                style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`, transformStyle: 'preserve-3d' }}
              >
                {/* Back card */}
                <div className="absolute inset-x-8 top-0 animate-float-card" style={{ animationDelay: '0s' }}>
                  <div className="rotate-[7deg] bg-white rounded-2xl border border-gray-100 shadow-lg px-4 py-3 flex items-center gap-3 transition-transform duration-500 hover:rotate-[5deg]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
                      <ChartBarIcon className="h-4 w-4" />
                    </span>
                    <div className="flex items-center justify-between gap-3 flex-1 min-w-0">
                      <span className="text-xs font-semibold text-gray-700 truncate">Years Experience</span>
                      <span className="text-base font-bold text-gray-900 shrink-0">
                        <AnimatedNumber value="3+" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle card */}
                <div className="absolute inset-x-4 top-14 animate-float-card" style={{ animationDelay: '0.8s' }}>
                  <div className="-rotate-[4deg] bg-white rounded-2xl border border-gray-100 shadow-lg px-4 py-3 flex items-center gap-3 transition-transform duration-500 hover:-rotate-[2deg]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <ShieldCheckIcon className="h-4 w-4" />
                    </span>
                    <div className="flex items-center justify-between gap-3 flex-1 min-w-0">
                      <span className="text-xs font-semibold text-gray-700 truncate">Client Satisfaction</span>
                      <span className="text-base font-bold text-gray-900 shrink-0">
                        <AnimatedNumber value="90%" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Front card */}
                <div className="relative top-28 animate-float-card" style={{ animationDelay: '1.6s' }}>
                  <div className="rotate-[2deg] bg-white rounded-2xl border border-gray-100 shadow-xl shadow-emerald-900/5 p-5 transition-transform duration-500 hover:rotate-0 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30">
                        <RocketLaunchIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-gray-900">18+ Projects</p>
                        <p className="text-[11px] text-gray-500">Delivered across industries</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Web', 'Mobile', 'AI/ML', 'Cloud'].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-medium text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="relative bg-white py-6 md:py-8 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 text-green-700 text-xs font-semibold shadow-sm">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-2"></span>
                About SquareServer
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              {/* Left Content */}
              <div className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                  Your Trusted Partner in
                  <span className="block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Digital Innovation
                  </span>
                </h2>

                <div className="space-y-3 text-gray-600 leading-relaxed text-xs sm:text-sm">
                  <p className="text-sm font-medium text-gray-700">
                    SquareServer is a leading technology solutions provider specializing in custom software development, 
                    AI-driven innovations, and cutting-edge digital transformation services.
                  </p>
                  
                  <p>
                    Founded by a team of passionate technologists, we&apos;ve successfully delivered <strong className="text-gray-900">18+ innovative projects</strong> across 
                    diverse industries. Our expertise spans web and mobile application development, cloud solutions, 
                    AI/ML implementations, and enterprise software architecture.
                  </p>

                  <p>
                    We don&apos;t just build software—we craft experiences that drive business growth, enhance operational 
                    efficiency, and create lasting value.
                  </p>
                </div>

                {/* Key Highlights */}
                <div className="grid grid-cols-2 gap-2.5 pt-3">
                  {[
                    { icon: RocketLaunchIcon, title: 'Innovation', subtitle: 'First Approach' },
                    { icon: UserGroupIcon, title: 'Expert', subtitle: 'Team' },
                    { icon: BoltIcon, title: 'Fast', subtitle: 'Delivery' },
                    { icon: TargetIcon, title: 'Result', subtitle: 'Driven' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{item.title}</p>
                        <p className="text-[10px] text-gray-500">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Image */}
              <div className="relative max-w-md mx-auto md:mx-0">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                  {/* Trust Image */}
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image
                      src="/trust.jpg"
                      alt="SquareServer - Your Trusted Technology Partner"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />

                    {/* Overlay Gradient for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
                  </div>

                  {/* Bottom Badge */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-800">
                      <span className="text-emerald-600">3+ Years</span> of Excellence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-emerald-50 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom py-6 md:py-8 relative z-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="group relative rounded-xl bg-white border border-gray-100 hover:border-emerald-200 hover:-translate-y-0.5 p-3 text-center transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="inline-flex items-center justify-center w-8 h-8 mb-1.5 rounded-lg bg-emerald-50 ring-1 ring-emerald-100 group-hover:ring-2 group-hover:ring-emerald-400 group-hover:bg-emerald-100 transition-all duration-300">
                  <stat.icon className="h-4 w-4 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
                </div>
                <p className="text-base sm:text-lg font-bold text-gray-900 mb-0.5">{stat.value}</p>
                <p className="text-[10px] sm:text-[11px] font-medium text-gray-500 leading-tight">{stat.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative bg-white py-6 md:py-8 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-green-200/50 text-green-700 text-xs font-semibold shadow-sm mb-3">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-2"></span>
              Why Partner With Us
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Why <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">Choose Us</span>
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-6 items-center max-w-5xl mx-auto">
            {/* Left: Image */}
            <div className="relative max-w-md mx-auto md:mx-0">
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                <div className="relative aspect-[4/3] bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600">
                  <Image
                    src="/vision.jpg"
                    alt="Why Choose SquareServer - Excellence in Technology Solutions"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Overlay with Stats */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                  
                  {/* Bottom Stats Badge */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="bg-white/95 backdrop-blur-md rounded-lg p-3 shadow-lg">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-lg font-bold text-green-600">18+</p>
                          <p className="text-[9px] text-gray-600">Projects</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-emerald-600">90%</p>
                          <p className="text-[9px] text-gray-600">Satisfaction</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-teal-600">3+</p>
                          <p className="text-[9px] text-gray-600">Years</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content Boxes */}
            <div className="space-y-3">
              {[
                {
                  icon: PaintBrushIcon,
                  title: 'Professional & Modern Design',
                  description: 'Sleek, contemporary designs with 100% responsive solutions for perfect display on every device.',
                },
                {
                  icon: BoltIcon,
                  title: 'Affordable & Fast Delivery',
                  description: 'Premium quality at competitive prices with on-time delivery without compromising excellence.',
                },
                {
                  icon: HeadphonesIcon,
                  title: '24/7 Support & Satisfaction',
                  description: 'Round-the-clock support with client-first approach. We deliver quality, not just code.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 group-hover:ring-2 group-hover:ring-emerald-400 group-hover:bg-emerald-100 transition-all duration-300">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-xs">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-emerald-50 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-400/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/3 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom py-8 md:py-10 relative">
          {/* Animated Section Header */}
          <div className="mx-auto max-w-2xl text-center mb-8 md:mb-10 relative">
            {/* Decorative Top Line */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full animate-pulse-slow"></div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 relative inline-block">
              Comprehensive
              <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent animate-gradient-x"> Technology Solutions</span>
              
              {/* Animated Underline */}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400/60 to-transparent animate-pulse-slow"></div>
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We deliver end-to-end technology solutions tailored to accelerate your business growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group relative rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-3 ring-1 ring-emerald-100 group-hover:ring-2 group-hover:ring-emerald-400 group-hover:bg-emerald-100 transition-all duration-300">
                  <feature.icon className="h-5 w-5 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5">{feature.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-white">
        <div className="container-custom py-8 md:py-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Our Expert <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Meet the passionate professionals driving innovation and delivering exceptional results for our clients.
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="group relative rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 p-4 text-center h-48 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                {/* Avatar */}
                <div className="relative mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mx-auto flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-sm">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 left-1/2 translate-x-2.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                    <CheckCircleIcon className="h-2.5 w-2.5 text-white" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors mb-1 line-clamp-1">
                      {member.name}
                    </h3>
                    <p className="text-emerald-600 font-medium mb-2 text-xs">{member.role}</p>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-tight">{member.expertise}</p>
                  </div>
                  <div className="mt-auto">
                    <div className="inline-flex items-center px-2 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                      <span className="text-xs text-emerald-700 font-medium">{member.experience}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve Section */}
      <section className="relative bg-emerald-50">
        <div className="container-custom py-8 md:py-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full mb-3">
              <span className="text-xs font-medium text-emerald-600">◆ Our Expertise Across Sectors</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Industries We <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Serve</span>
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Delivering tailored technology solutions across diverse industries with specialized expertise.
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => {
              const IconComponent = industry.icon;
              return (
                <div
                  key={industry.name}
                  className="group relative rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 p-4 h-40 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                  <div className="mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${industry.color} rounded-xl flex items-center justify-center shadow-sm`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2">
                      {industry.name}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">Don&apos;t see your industry? We work across all sectors with custom solutions.</p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Discuss Your Project
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-emerald-50">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="container-custom py-6 md:py-8 relative">
          <div className="mx-auto max-w-4xl">
            {/* Compact Card Design */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 p-4 md:p-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full mb-3">
                  <span className="text-[10px] font-semibold text-emerald-600">🚀 Let&apos;s Build Together</span>
                </div>
                
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                  Ready to Transform Your
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Digital Future?</span>
                </h2>
                
                <p className="text-xs sm:text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
                  Partner with us to leverage cutting-edge technology solutions that drive innovation and accelerate your business growth.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
                  <Link 
                    href="/contact" 
                    className="group inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Start Your Project
                    <ArrowRightIcon className="ml-1.5 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/solutions" 
                    className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-300"
                  >
                    Explore Solutions
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 text-[10px] text-gray-500">
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-medium">18+ Projects</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-medium">90% Client Satisfaction</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-medium">3+ Years Experience</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// FAQ Section Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white py-6 md:py-8">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full mb-2">
              <span className="text-xs font-medium text-emerald-600">❓ Got Questions?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Frequently Asked <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services, pricing, and development process.
            </p>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 hover:border-emerald-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-3 text-left focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-semibold text-gray-900 pr-3">
                    {faq.question}
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-emerald-600 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-3 pb-3 pt-0">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <p className="text-xs text-gray-500 mb-2">Still have questions?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Contact Us
              <ArrowRightIcon className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}