'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRightIcon, CodeBracketIcon, BeakerIcon, CpuChipIcon, ShieldCheckIcon, RocketLaunchIcon, ChartBarIcon, BuildingOfficeIcon, HeartIcon, AcademicCapIcon, ShoppingBagIcon, BanknotesIcon, TruckIcon, LightBulbIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// Deterministic pseudo-random generator so decorative values are identical on
// the server-rendered HTML and the client hydration pass (avoids hydration mismatches).
function seededRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

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

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Modern SaaS Design */}
      <section className="relative min-h-[340px] sm:min-h-[380px] lg:min-h-[420px] pt-4 pb-6 sm:pt-6 sm:pb-8 lg:pt-8 lg:pb-12 bg-gradient-to-br from-[#0a0e1a] via-[#0f1729] to-[#0a0e1a] overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e1a] via-[#0d1220] to-[#0f1729]"></div>
          
          {/* Flowing Wave Lines - Sky Blue & Cyan */}
          <div className="absolute top-0 right-0 w-[60%] h-full overflow-hidden opacity-70">
            {[...Array(25)].map((_, i) => (
              <div
                key={`sky-${i}`}
                className="absolute h-px origin-left"
                style={{
                  width: '120%',
                  background: 'linear-gradient(90deg, transparent, #4ade80, transparent)',
                  top: `${10 + i * 3}%`,
                  right: '-20%',
                  transform: `rotate(${-35 + i * 0.5}deg)`,
                  opacity: 0.15 + (i % 3) * 0.1,
                  animation: `flowWave ${8 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <div
                key={`cyan-${i}`}
                className="absolute h-px origin-left"
                style={{
                  width: '110%',
                  background: 'linear-gradient(90deg, transparent, #34d399, transparent)',
                  top: `${15 + i * 3.5}%`,
                  right: '-15%',
                  transform: `rotate(${-32 + i * 0.4}deg)`,
                  opacity: 0.2 + (i % 2) * 0.15,
                  animation: `flowWave ${9 + i * 0.25}s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>

          {/* Ambient Glows */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[120px] animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-green-400/8 rounded-full blur-[100px] animate-float-slow" style={{ animationDelay: '4s' }}></div>
          
          {/* Enhanced Particle System */}
          <div className="absolute inset-0">
            {[...Array(60)].map((_, i) => {
              const size = seededRandom(i * 1.1) * 3 + 1;
              const isLarge = i % 8 === 0;
              const isMedium = i % 4 === 0;
              const displaySize = (isLarge ? size * 2 : isMedium ? size * 1.5 : size).toFixed(2);
              const opacity = isLarge ? 0.7 : Number((seededRandom(i * 4.1 + 19) * 0.4 + 0.2).toFixed(2));
              return (
                <div
                  key={i}
                  className={`absolute rounded-full ${
                    isLarge
                      ? 'bg-green-400 shadow-lg shadow-green-400/50 animate-pulse-slow'
                      : isMedium
                      ? 'bg-gradient-to-br from-green-300 to-emerald-400 animate-particle-float'
                      : 'bg-white animate-twinkle'
                  }`}
                  style={{
                    width: `${displaySize}px`,
                    height: `${displaySize}px`,
                    top: `${(seededRandom(i * 2.3 + 7) * 100).toFixed(2)}%`,
                    left: `${(seededRandom(i * 3.7 + 13) * 100).toFixed(2)}%`,
                    opacity,
                    animationDelay: `${(seededRandom(i * 5.9 + 29) * 5).toFixed(2)}s`,
                    animationDuration: `${(3 + seededRandom(i * 6.5 + 37) * 4).toFixed(2)}s`,
                    boxShadow: isLarge ? '0 0 20px rgba(74, 222, 128, 0.4)' : 'none'
                  }}
                />
              );
            })}
          </div>

          {/* Floating Geometric Shapes */}
          <div className="absolute top-[20%] left-[8%] animate-float-slow opacity-30" style={{ animationDelay: '0s' }}>
            <div className="w-16 h-16 border-2 border-green-400/40 rounded-lg rotate-45 backdrop-blur-sm shadow-lg shadow-green-400/20 animate-spin-slow"></div>
          </div>
          
          <div className="absolute top-[60%] left-[12%] animate-float opacity-25" style={{ animationDelay: '2s' }}>
            <div className="w-12 h-12 border-2 border-emerald-400/40 rounded-full backdrop-blur-sm shadow-lg shadow-emerald-400/20 animate-pulse-slow"></div>
          </div>
          
          <div className="absolute top-[35%] right-[8%] animate-float-slow opacity-30" style={{ animationDelay: '3s' }}>
            <div className="w-10 h-10 bg-gradient-to-br from-green-400/20 to-emerald-400/10 rounded backdrop-blur-sm border border-green-400/30 shadow-lg shadow-green-400/15 animate-spin-slow"></div>
          </div>

          <div className="absolute bottom-[20%] right-[15%] animate-float opacity-25" style={{ animationDelay: '1.5s' }}>
            <div className="w-14 h-14 border-2 border-green-400/40 backdrop-blur-sm shadow-lg shadow-green-400/20" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
          </div>

          {/* Animated Grid Lines */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(74, 222, 128, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(74, 222, 128, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
              animation: 'gradientShift 20s ease-in-out infinite'
            }}></div>
          </div>

          {/* Scanning Light Beams */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-green-400/60 to-transparent animate-slide-down" style={{ left: '15%', animationDelay: '0s' }}></div>
            <div className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent animate-slide-down" style={{ left: '40%', animationDelay: '2s' }}></div>
            <div className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-green-500/55 to-transparent animate-slide-down" style={{ left: '65%', animationDelay: '4s' }}></div>
            <div className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/45 to-transparent animate-slide-down" style={{ left: '85%', animationDelay: '6s' }}></div>
          </div>

          {/* Horizontal Scanning Lines */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/70 to-transparent animate-scan-horizontal"></div>
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent animate-scan-horizontal" style={{ animationDelay: '3s' }}></div>
          </div>

          {/* Pulsing Rings */}
          <div className="absolute top-[25%] right-[20%] animate-pulse-slow" style={{ animationDelay: '1s' }}>
            <div className="w-32 h-32 rounded-full border border-green-400/30 animate-ping opacity-20"></div>
            <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-green-400/20"></div>
          </div>

          <div className="absolute bottom-[30%] left-[18%] animate-pulse-slow" style={{ animationDelay: '2.5s' }}>
            <div className="w-24 h-24 rounded-full border border-emerald-400/30 animate-ping opacity-20"></div>
            <div className="absolute inset-0 w-24 h-24 rounded-full border-2 border-emerald-400/20"></div>
          </div>

          {/* Depth Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e1a]/20 to-[#0a0e1a]/60"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container-custom flex items-center">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
            {/* Left Content */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-5 animate-fade-in-up relative">
              {/* Decorative Elements Around Text */}
              <div className="absolute -left-8 top-0 w-20 h-20 bg-green-400/5 rounded-full blur-xl animate-pulse-slow"></div>
              <div className="absolute -right-4 bottom-1/4 w-16 h-16 bg-emerald-400/5 rounded-full blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
              
              {/* Floating Mini Particles Near Text */}
              <div className="absolute -left-4 top-1/4 w-1.5 h-1.5 bg-green-400 rounded-full animate-float-slow shadow-lg shadow-green-400/50" style={{ animationDelay: '1s' }}></div>
              <div className="absolute -left-2 top-1/2 w-1 h-1 bg-emerald-400 rounded-full animate-twinkle" style={{ animationDelay: '2s' }}></div>
              <div className="absolute -right-3 top-1/3 w-1.5 h-1.5 bg-green-300 rounded-full animate-particle-float" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-500/15 backdrop-blur-md border border-green-400/40 text-green-300 text-xs sm:text-sm font-semibold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all duration-500 hover:scale-105 animate-bounce-in relative" style={{ animationDelay: '0s' }}>
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2 shadow-lg shadow-green-400/60"></span>
                  SQUARESERVER DIGITAL
                  {/* Badge Glow Effect */}
                  <span className="absolute inset-0 rounded-full bg-green-400/10 blur-lg animate-pulse-slow"></span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-white leading-tight relative">
                  <span className="block animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
                    Transform Your Business
                  </span>
                  <span className="block bg-gradient-to-r from-green-400 via-green-500 to-emerald-400 bg-clip-text text-transparent animate-gradient-x animate-text-reveal relative" style={{ animationDelay: '0.4s', backgroundSize: '200% 200%' }}>
                    With Cutting-Edge
                    {/* Text Glow Effect */}
                    <span className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-green-500/20 to-emerald-400/20 blur-2xl animate-pulse-slow"></span>
                  </span>
                  <span className="block text-white animate-slide-in-right" style={{ animationDelay: '0.6s' }}>
                    Technology Solutions
                  </span>
                  
                  {/* Decorative Line Accent */}
                  <div className="absolute -left-6 sm:-left-8 top-1/2 w-1 sm:w-1.5 h-16 sm:h-20 bg-gradient-to-b from-transparent via-green-400/50 to-transparent animate-pulse-slow"></div>
                </h1>
              </div>
              
              <p className="text-xs sm:text-sm md:text-base text-gray-300/90 leading-relaxed max-w-lg animate-scale-in relative" style={{ animationDelay: '0.8s' }}>
                Empowering businesses with innovative software development, AI-driven solutions, and next-generation 
                digital experiences. Partner with SquareServer to turn your vision into reality.
                
                {/* Text Background Glow */}
                <span className="absolute -inset-2 bg-green-400/5 rounded-lg blur-3xl -z-10 animate-pulse-slow"></span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3 animate-fade-in-up relative" style={{ animationDelay: '1s' }}>
                {/* Button Area Decoration */}
                <div className="absolute -bottom-4 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-green-400/40 to-transparent blur-sm animate-pulse-slow"></div>
                
                <Link 
                  href="/contact" 
                  className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 rounded-full overflow-hidden shadow-xl shadow-green-500/40 hover:shadow-2xl hover:shadow-green-500/60 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></span>
                  <span className="relative flex items-center">
                    Get Started Today
                    <ArrowRightIcon className="ml-1.5 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="absolute inset-0 rounded-full border-2 border-green-300/60 animate-ping"></span>
                  </span>
                  {/* Button Ambient Glow */}
                  <span className="absolute -inset-2 bg-green-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></span>
                </Link>
                <Link 
                  href="/projects" 
                  className="group inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-green-300 border-2 border-green-400/60 backdrop-blur-md rounded-full hover:bg-green-500/20 hover:border-green-300 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/30 to-green-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="relative">Explore Projects</span>
                  {/* Secondary Button Glow */}
                  <span className="absolute -inset-2 bg-green-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></span>
                </Link>
              </div>
            </div>

            {/* Right Content - Mobile Phone with 3D Hexagonal Cubes */}
            <div className="relative flex items-center justify-center lg:justify-end animate-fade-in-up min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]" style={{ animationDelay: '0.6s' }}>
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg h-full">
                <div className="relative flex justify-center lg:justify-end lg:pr-8 h-full items-center">
                
                {/* 3D Hexagonal Cubes Network */}
                <div className="absolute inset-0 pointer-events-none group-hover:scale-105 transition-transform duration-700">
                  {/* Top Cube */}
                  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 animate-float-slow hover:scale-125 transition-transform duration-500" style={{ animationDelay: '0s' }}>
                    <div className="relative w-14 h-14 lg:w-16 lg:h-16" style={{ transform: 'rotateX(60deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-90 rounded-lg shadow-2xl shadow-green-500/50 backdrop-blur-sm border border-green-300/40 animate-pulse-slow group-hover:shadow-green-500/80 transition-shadow duration-500"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-green-300/70 to-emerald-400/70 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Left Cube */}
                  <div className="absolute top-[40%] left-[5%] lg:left-[8%] animate-float hover:scale-125 transition-transform duration-500" style={{ animationDelay: '1s' }}>
                    <div className="relative w-12 h-12 lg:w-14 lg:h-14" style={{ transform: 'rotateX(60deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 opacity-90 rounded-lg shadow-2xl shadow-emerald-500/50 backdrop-blur-sm border border-emerald-300/40 animate-pulse-slow group-hover:shadow-emerald-500/80 transition-shadow duration-500"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-emerald-300/70 to-green-400/70 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Right-Top Cube */}
                  <div className="absolute top-[25%] right-[10%] animate-float-slow hover:scale-125 transition-transform duration-500" style={{ animationDelay: '2s' }}>
                    <div className="relative w-10 h-10 lg:w-12 lg:h-12" style={{ transform: 'rotateX(60deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-80 rounded-lg shadow-2xl shadow-green-500/50 backdrop-blur-sm border border-green-300/30 animate-pulse-slow group-hover:shadow-green-500/80 transition-shadow duration-500"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-green-400/60 to-emerald-500/60 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Bottom-Left Cube */}
                  <div className="absolute bottom-[12%] left-[12%] lg:left-[15%] animate-float hover:scale-125 transition-transform duration-500" style={{ animationDelay: '1.5s' }}>
                    <div className="relative w-13 h-13 lg:w-16 lg:h-16" style={{ transform: 'rotateX(60deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-green-600 opacity-90 rounded-lg shadow-2xl shadow-emerald-500/50 backdrop-blur-sm border border-emerald-300/40 animate-pulse-slow group-hover:shadow-emerald-500/80 transition-shadow duration-500"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-emerald-400/70 to-green-500/70 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Bottom-Right Cube */}
                  <div className="absolute bottom-[15%] right-[15%] animate-float-slow hover:scale-125 transition-transform duration-500" style={{ animationDelay: '0.8s' }}>
                    <div className="relative w-12 h-12 lg:w-14 lg:h-14" style={{ transform: 'rotateX(60deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-80 rounded-lg shadow-2xl shadow-green-500/50 backdrop-blur-sm border border-green-300/30 animate-pulse-slow group-hover:shadow-green-500/80 transition-shadow duration-500"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-green-300/60 to-emerald-400/60 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Center Cube (Behind Phone) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '2.5s' }}>
                    <div className="relative w-18 h-18 lg:w-24 lg:h-24 opacity-25" style={{ transform: 'rotateX(60deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 opacity-80 rounded-lg shadow-2xl shadow-green-500/60 backdrop-blur-sm border border-green-300/30 animate-pulse-slow"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-green-400/60 to-emerald-500/60 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-700">
                    <defs>
                      <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>
                    <line x1="50%" y1="18%" x2="50%" y2="46%" stroke="url(#lineGradient1)" strokeWidth="2" className="animate-pulse-slow" />
                    <line x1="14%" y1="38%" x2="46%" y2="48%" stroke="url(#lineGradient1)" strokeWidth="2" className="animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
                    <line x1="86%" y1="28%" x2="54%" y2="47%" stroke="url(#lineGradient1)" strokeWidth="2" className="animate-pulse-slow" style={{ animationDelay: '1s' }} />
                    <line x1="20%" y1="85%" x2="48%" y2="54%" stroke="url(#lineGradient1)" strokeWidth="2" className="animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
                    <line x1="80%" y1="85%" x2="52%" y2="54%" stroke="url(#lineGradient1)" strokeWidth="2" className="animate-pulse-slow" style={{ animationDelay: '2s' }} />
                  </svg>
                </div>

                {/* Mobile Phone Mockup */}
                <div className="relative z-10 animate-float-slow group">
                  {/* Phone Container with 3D Perspective */}
                  <div style={{ perspective: '1200px' }}>
                    <div className="relative w-32 h-56 sm:w-36 sm:h-[17rem] lg:w-40 lg:h-[20rem] transition-all duration-700 hover:scale-105 hover:-translate-y-2" style={{ transform: 'rotateY(15deg) rotateX(-5deg)', transformStyle: 'preserve-3d' }}>
                    {/* Phone Frame */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border-[3px] border-slate-700 overflow-hidden transition-all duration-700 group-hover:border-green-500/50 group-hover:shadow-green-500/30" style={{ boxShadow: '-20px 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(74, 222, 128, 0.15)' }}>
                      {/* Phone Screen Glow */}
                      <div className="absolute inset-0.5 bg-gradient-to-br from-green-900/50 via-slate-900 to-slate-950 rounded-[1.8rem] lg:rounded-[2.2rem] overflow-hidden">
                        
                        {/* Screen Content - Dashboard Preview */}
                        <div className="absolute inset-0 p-2.5 lg:p-3.5">
                          {/* Status Bar */}
                          <div className="flex items-center justify-between mb-2.5 lg:mb-4">
                            <span className="text-[8px] lg:text-[10px] text-slate-400">9:41</span>
                            <div className="flex gap-0.5">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            </div>
                          </div>

                          {/* Dashboard Title */}
                          <div className="mb-2 lg:mb-3">
                            <h3 className="text-[9px] lg:text-[11px] font-bold text-white mb-0.5">Dashboard</h3>
                            <p className="text-[6px] lg:text-[7px] text-slate-400">Welcome back</p>
                          </div>

                          {/* Stats Cards */}
                          <div className="space-y-1.5 lg:space-y-2.5">
                            {/* Total Revenue Card */}
                            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm border border-green-400/30 rounded-lg p-1.5 lg:p-2">
                              <p className="text-[6px] lg:text-[7px] text-green-300 mb-0.5">Total Revenue</p>
                              <p className="text-[10px] lg:text-xs font-bold text-white mb-0.5">$24,521</p>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <div key={i} className="w-1 bg-green-400 rounded-t" style={{ height: `${(seededRandom(i * 2.1 + 3) * 12 + 8).toFixed(2)}px` }}></div>
                                ))}
                              </div>
                            </div>

                            {/* Active Users Card */}
                            <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/10 backdrop-blur-sm border border-emerald-400/30 rounded-lg p-1.5 lg:p-2">
                              <p className="text-[6px] lg:text-[7px] text-emerald-300 mb-0.5">Active Users</p>
                              <p className="text-[10px] lg:text-xs font-bold text-white">8,234</p>
                            </div>

                            {/* Recent Activity */}
                            <div className="space-y-0.5">
                              <p className="text-[6px] lg:text-[7px] text-slate-400">Recent Activity</p>
                              <div className="flex gap-0.5">
                                <div className="w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 bg-green-400 rounded-full"></div>
                                <div className="w-1.5 h-1.5 lg:w-2.5 lg:h-2.5 bg-emerald-400 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Screen Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Phone Notch */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 lg:w-16 h-3 lg:h-3.5 bg-slate-900 rounded-b-2xl z-10"></div>

                    {/* Side Buttons */}
                    <div className="absolute -right-0.5 top-12 w-0.5 h-4 lg:h-6 bg-slate-700 rounded-l"></div>
                    <div className="absolute -left-0.5 top-9 w-0.5 h-3 bg-slate-700 rounded-r"></div>
                  </div>
                  </div>

                  {/* Phone Glow Effect */}
                  <div className="absolute -inset-4 lg:-inset-6 bg-gradient-to-br from-green-500/25 via-emerald-500/20 to-green-400/25 rounded-full blur-3xl -z-10 animate-pulse-slow group-hover:from-green-500/40 group-hover:via-emerald-500/35 group-hover:to-green-400/40 transition-all duration-700"></div>
                  
                  {/* Decorative Circles on Right Side */}
                  <div className="absolute -right-10 sm:-right-12 top-[15%] w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-purple-500/90 to-purple-600/70 animate-float-slow blur-md shadow-2xl shadow-purple-500/40 group-hover:scale-110 group-hover:from-purple-500 group-hover:to-purple-600 transition-all duration-700" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute -right-14 sm:-right-16 top-[40%] w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-teal-500/85 to-teal-600/65 animate-float blur-md shadow-2xl shadow-teal-500/40 group-hover:scale-110 group-hover:from-teal-500 group-hover:to-teal-600 transition-all duration-700" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute -right-12 sm:-right-14 top-[65%] w-18 h-18 sm:w-22 sm:h-22 lg:w-26 lg:h-26 rounded-full bg-gradient-to-br from-emerald-400/85 to-emerald-500/65 animate-float-slow blur-md shadow-2xl shadow-emerald-500/40 group-hover:scale-110 group-hover:from-emerald-400 group-hover:to-emerald-500 transition-all duration-700" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute -right-8 sm:-right-10 bottom-[10%] w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-purple-400/75 to-teal-500/55 animate-float blur-md shadow-xl shadow-purple-400/30 group-hover:scale-110 group-hover:from-purple-400 group-hover:to-teal-500 transition-all duration-700" style={{ animationDelay: '0.8s' }}></div>
                  
                  {/* Floating Particles Around Phone */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                {[...Array(15)].map((_, i) => {
                  const angle = (360 / 15) * i;
                  const distance = (95 + seededRandom(i * 3.3 + 11) * 25).toFixed(2);
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${distance}px)`,
                      }}
                    >
                      <div 
                        className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-gradient-to-br from-green-300 to-emerald-400 animate-twinkle"
                        style={{
                          animationDelay: `${i * 0.2}s`,
                          boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)'
                        }}
                      ></div>
                    </div>
                  );
                })}
                  </div>
                </div>

                {/* Background Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-green-400/15 rounded-full blur-[120px] -z-10 animate-pulse-slow group-hover:from-green-500/25 group-hover:via-emerald-500/20 group-hover:to-green-400/25 transition-all duration-1000"></div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="relative bg-white py-8 md:py-10 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-emerald-400/5 rounded-full blur-3xl"></div>
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
                <div className="grid grid-cols-2 gap-2 pt-3">
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <span className="text-base">🚀</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Innovation</p>
                      <p className="text-[10px] text-gray-600">First Approach</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <span className="text-base">💡</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Expert</p>
                      <p className="text-[10px] text-gray-600">Team</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <span className="text-base">⚡</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Fast</p>
                      <p className="text-[10px] text-gray-600">Delivery</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                      <span className="text-base">🎯</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">Result</p>
                      <p className="text-[10px] text-gray-600">Driven</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative max-w-md mx-auto md:mx-0">
                {/* Decorative Background Elements */}
                <div className="absolute -inset-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl blur-xl opacity-30"></div>
                
                {/* Main Image Container - Compact Size */}
                <div className="relative rounded-xl overflow-hidden shadow-xl border-2 border-white/50">
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
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-lg border border-green-200">
                    <p className="text-[10px] font-bold text-gray-800">
                      <span className="text-green-600">3+ Years</span> of Excellence
                    </p>
                  </div>
                </div>
                
                {/* Corner Decorative Elements */}
                <div className="absolute -top-2 -right-2 w-16 h-16 border-2 border-green-400/30 rounded-lg rotate-45"></div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-emerald-400/10 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom py-6 md:py-8 relative z-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div 
                key={stat.name} 
                className="relative text-center group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card with Glassmorphism Effect */}
                <div className="relative p-2.5 sm:p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg hover:shadow-2xl hover:border-green-300/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 via-emerald-400/0 to-green-500/0 group-hover:from-green-400/10 group-hover:via-emerald-400/5 group-hover:to-green-500/10 transition-all duration-700 rounded-lg"></div>
                  
                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-lg opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 mb-1.5 rounded-lg bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 shadow-lg shadow-green-500/40 group-hover:shadow-green-500/60 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative overflow-hidden">
                      {/* Icon Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    {/* Value with Counter Animation */}
                    <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 bg-clip-text text-transparent mb-0.5 group-hover:from-green-600 group-hover:via-emerald-600 group-hover:to-teal-600 transition-all duration-500">
                      {stat.value}
                    </p>
                    
                    {/* Label */}
                    <p className="text-[10px] sm:text-xs font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-300 leading-tight">{stat.name}</p>
                  </div>
                  
                  {/* Bottom Border Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative bg-gradient-to-r from-gray-50 to-teal-50 py-8 md:py-10 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-green-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-emerald-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          {/* Section Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 text-green-700 text-xs font-semibold shadow-sm mb-3">
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
              {/* Decorative Background */}
              <div className="absolute -inset-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg blur-xl opacity-30"></div>
              
              {/* Image Container */}
              <div className="relative rounded-lg overflow-hidden shadow-xl border-2 border-white/50">
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

              {/* Corner Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-12 h-12 border-2 border-green-400/30 rounded-lg rotate-45"></div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-emerald-400/10 rounded-lg"></div>
            </div>

            {/* Right: Content Boxes */}
            <div className="space-y-4">
              {/* Professional & Modern Design */}
              <div className="group relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg border border-gray-100 hover:border-green-200 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                      Professional & Modern Design
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs">
                      Sleek, contemporary designs with 100% responsive solutions for perfect display on every device.
                    </p>
                  </div>
                </div>
              </div>

              {/* Affordable & Fast Delivery */}
              <div className="group relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg border border-gray-100 hover:border-green-200 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                      Affordable & Fast Delivery
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs">
                      Premium quality at competitive prices with on-time delivery without compromising excellence.
                    </p>
                  </div>
                </div>
              </div>

              {/* 24/7 Support & Satisfaction */}
              <div className="group relative bg-white p-4 rounded-lg shadow-md hover:shadow-lg border border-gray-100 hover:border-green-200 transition-all duration-300">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                      24/7 Support & Satisfaction
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-xs">
                      Round-the-clock support with client-first approach. We deliver quality, not just code.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-400/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/3 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom py-12 md:py-16 relative">
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
          
          <div className="grid md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={feature.name} className="group relative" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Card with Modern Design */}
                <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent">
                  {/* Gradient Top Border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  {/* Animated Corner Accent */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-green-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content Container */}
                  <div className="relative p-4 group-hover:-translate-y-1 transition-transform duration-500">
                    {/* Icon Container with Badge Style */}
                    <div className="relative inline-flex items-center justify-center mb-3">
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600 shadow-lg group-hover:shadow-xl group-hover:shadow-green-500/50 transition-all duration-500">
                        <feature.icon className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      {/* Rotating Ring */}
                      <div className="absolute inset-0 w-10 h-10 border-2 border-green-400/30 rounded-xl group-hover:rotate-180 group-hover:scale-125 transition-all duration-700"></div>
                      {/* Outer Glow */}
                      <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Title with Gradient on Hover */}
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-2 group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-emerald-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                      {feature.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-emerald-400/5 to-transparent rounded-tl-full"></div>
                    <div className="absolute top-1/2 left-0 w-24 h-24 bg-gradient-to-r from-green-400/5 to-transparent rounded-r-full"></div>
                  </div>
                  
                  {/* Bottom Shine Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative bg-gradient-to-r from-slate-50 to-teal-50">
        <div className="container-custom py-12 md:py-16">
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
              <div key={member.name} className="group relative">
                <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 text-center h-48 flex flex-col">
                  {/* Avatar */}
                  <div className="relative mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
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
                      <div className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full">
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

      {/* Industries We Serve Section */}
      <section className="relative bg-white">
        <div className="container-custom py-12 md:py-16">
          <div className="text-center mb-10">
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
                <div key={industry.name} className="group relative">
                  <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 h-40 flex flex-col">
                    {/* Icon */}
                    <div className="mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${industry.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-200 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-200 rounded-full filter blur-3xl opacity-20"></div>
        </div>
        
        <div className="container-custom py-8 md:py-10 relative">
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
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">18+ Projects</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">90% Client Satisfaction</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
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
    <section className="relative bg-white py-8 md:py-10">
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
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
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