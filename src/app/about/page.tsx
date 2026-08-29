'use client';

import { useState } from 'react';
import { Users as UserGroupIcon, Lightbulb as LightBulbIcon, ShieldCheck as ShieldCheckIcon, Rocket as RocketLaunchIcon, Paintbrush as PaintBrushIcon, Zap as BoltIcon, CheckCircle2 as CheckCircleIcon, ArrowRight as ArrowRightIcon, ShoppingCart as ShoppingCartIcon, GraduationCap as AcademicCapIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const visionMission = [
  {
    key: 'vision',
    label: 'Our Vision',
    icon: ShieldCheckIcon,
    image: '/about.png',
    imageAlt: 'Our Vision - SquareServer',
    imageCaption: 'Innovation Leadership',
    points: [
      {
        title: 'Innovation Leadership',
        text: 'To be the leading technology partner that empowers businesses through cutting-edge digital transformation and innovative solutions.',
      },
      {
        title: 'Global Impact',
        text: 'Create scalable digital solutions that make a meaningful impact on businesses worldwide, driving growth and success.',
      },
      {
        title: 'Technology Excellence',
        text: 'Pioneer emerging technologies and set new standards in digital innovation, quality, and client satisfaction.',
      },
    ],
  },
  {
    key: 'mission',
    label: 'Our Mission',
    icon: LightBulbIcon,
    image: '/mission.jpg',
    imageAlt: 'Our Mission - SquareServer',
    imageCaption: 'Excellence & Trust',
    points: [
      {
        title: 'Quality Services',
        text: 'Provide high-quality and cost-effective digital services that meet the unique needs of every client we partner with.',
      },
      {
        title: 'Business Growth',
        text: 'Help startups and established businesses grow their online presence and reach their target audience effectively.',
      },
      {
        title: 'Excellence & Trust',
        text: 'Deliver projects on time with excellence, ensuring customer satisfaction and building lasting trust with every engagement.',
      },
    ],
  },
];

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
    experience: '3+ years',
  },
];

const stats = [
  { label: 'Projects Delivered', value: '18+' },
  { label: 'Client Satisfaction', value: '90%' },
  { label: 'Technologies', value: '25+' },
  { label: 'Years Experience', value: '3+' },
];

function VisionMissionTabs() {
  const [active, setActive] = useState(0);
  const current = visionMission[active];

  return (
    <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 items-stretch max-w-6xl mx-auto">
      {/* Left: image, swaps with the active tab */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 min-h-[280px] lg:min-h-0">
        <Image
          src={current.image}
          alt={current.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 45vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-white/95 backdrop-blur-md rounded-lg px-4 py-2 shadow-lg">
            <p className="text-xs font-bold text-gray-800 text-center">{current.imageCaption}</p>
          </div>
        </div>
      </div>

      {/* Right: tab switcher + points */}
      <div className="rounded-2xl bg-white border border-gray-100 p-5 flex flex-col">
        <div className="flex gap-2 mb-5 pb-4 border-b border-gray-100">
          {visionMission.map((vm, i) => (
            <button
              key={vm.key}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                active === i
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <vm.icon className="h-4 w-4" />
              {vm.label}
            </button>
          ))}
        </div>
        <div className="space-y-4 flex-1">
          {current.points.map((point) => (
            <div key={point.title} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-0.5">{point.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative bg-white overflow-hidden py-10 md:py-14">
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
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Left content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Learn About Our Journey
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Transforming Ideas Into{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Digital Excellence
                </span>
              </h1>

              <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-lg">
                We are a forward-thinking IT solutions company dedicated to transforming businesses
                through innovative technology and cutting-edge research & development.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Get in Touch
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <a
                  href="#team"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-full hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/60 transition-all duration-300"
                >
                  Meet the Team
                </a>
              </div>
            </div>

            {/* Right visual: what drives us preview */}
            <div className="relative">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-emerald-900/5 p-6">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">What drives us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {values.map((value) => (
                    <div key={value.name} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                        <value.icon className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold text-gray-800 leading-snug pt-1">{value.name}</p>
                    </div>
                  ))}
                </div>
              </div>
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

        <div className="container-custom py-6 md:py-8 relative z-10">
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
              href="http://178.16.137.161:3000/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 cursor-pointer"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-24 bg-gradient-to-br from-emerald-500 to-teal-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <RocketLaunchIcon className="w-6 h-6 mx-auto mb-1 opacity-90 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="font-bold text-xs">Square Server</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-all duration-200"></div>
              </div>

              {/* Project Content */}
              <div className="p-3">
                <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-200 line-clamp-1">
                  Tour & Travel
                </h3>

                <p className="text-xs text-gray-600 mb-1.5 leading-tight line-clamp-2">
                  Better website for tour&travel service
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
                  <ArrowRightIcon className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            </a>

            {/* Project 2: Young Entrepreneur Network */}
            <a
              href="http://178.16.137.161:4207/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 cursor-pointer"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-24 bg-gradient-to-br from-purple-500 to-pink-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <UserGroupIcon className="w-6 h-6 mx-auto mb-1 opacity-90 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="font-bold text-xs">Resturant</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-purple-600/0 group-hover:bg-purple-600/10 transition-all duration-200"></div>
              </div>

              {/* Project Content */}
              <div className="p-3">
                <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-200 line-clamp-1">
                  Resturant with Admin Panel
                </h3>

                <p className="text-xs text-gray-600 mb-1.5 leading-tight line-clamp-2">
                  With Chef and Staff Panel
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
                  <ArrowRightIcon className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            </a>

            {/* Project 3: Khanamart */}
            <a
              href="https://bhurrr.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 cursor-pointer"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-24 bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <ShoppingCartIcon className="w-6 h-6 mx-auto mb-1 opacity-90 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="font-bold text-xs">Bhurr</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/10 transition-all duration-200"></div>
              </div>

              {/* Project Content */}
              <div className="p-3">
                <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-200 line-clamp-1">
                  QR Syatem for vehicles
                </h3>

                <p className="text-xs text-gray-600 mb-1.5 leading-tight line-clamp-2">
                  One message can save a lot
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {['QR Management', 'Retail'].map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 bg-green-50 text-green-700 text-xs rounded-md border border-green-200">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <div className="flex items-center text-green-600 font-medium text-xs group-hover:text-green-700 transition-colors">
                  <span>Visit</span>
                  <ArrowRightIcon className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            </a>

            {/* Project 4: DAV School */}
            <a
              href="http://www.davschool.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 cursor-pointer"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-24 bg-gradient-to-br from-indigo-500 to-teal-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <AcademicCapIcon className="w-6 h-6 mx-auto mb-1 opacity-90 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="font-bold text-xs">DAV School</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-all duration-200"></div>
              </div>

              {/* Project Content */}
              <div className="p-3">
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
                  <ArrowRightIcon className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            </a>

            <a
              href="https://rdecodeveloper.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 cursor-pointer"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-24 bg-gradient-to-br from-indigo-500 to-teal-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <AcademicCapIcon className="w-6 h-6 mx-auto mb-1 opacity-90 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="font-bold text-xs">RD Height</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-all duration-200"></div>
              </div>

              {/* Project Content */}
              <div className="p-3">
                <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
                  Restate Bussiness
                </h3>

                <p className="text-xs text-gray-600 mb-1.5 leading-tight line-clamp-2">
                  Best Apartment in Patna
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {['Sell', 'Network'].map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-md border border-indigo-200">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <div className="flex items-center text-indigo-600 font-medium text-xs group-hover:text-indigo-700 transition-colors">
                  <span>Visit</span>
                  <ArrowRightIcon className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.hiprotech.hiproems&hl=en_IN"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 cursor-pointer"
            >
              {/* Project Image/Thumbnail */}
              <div className="relative h-24 bg-gradient-to-br from-indigo-500 to-teal-600 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <AcademicCapIcon className="w-6 h-6 mx-auto mb-1 opacity-90 group-hover:scale-110 transition-transform duration-200" />
                    <h3 className="font-bold text-xs">HRM App</h3>
                  </div>
                </div>
                <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-all duration-200"></div>
              </div>

              {/* Project Content */}
              <div className="p-3">
                <h3 className="text-xs font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-1">
                  Attedance with full HRM Management App
                </h3>

                {/* <p className="text-xs text-gray-600 mb-1.5 leading-tight line-clamp-2">
                  Best Apartment in Patna
                </p> */}

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {['Sell', 'MAnagement'].map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-md border border-indigo-200">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <div className="flex items-center text-indigo-600 font-medium text-xs group-hover:text-indigo-700 transition-colors">
                  <span>Visit</span>
                  <ArrowRightIcon className="w-3 h-3 ml-1 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative bg-white">
        <div className="container-custom py-6 md:py-8">
          <VisionMissionTabs />
        </div>
      </section>

      {/* Service Offerings Section */}
      <section className="relative bg-emerald-50 py-6 md:py-8">
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
            <div className="group relative bg-white rounded-2xl transition-all duration-300 p-4 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-emerald-50 ring-1 ring-emerald-100 group-hover:ring-2 group-hover:ring-emerald-400 group-hover:bg-emerald-100 mb-2 transition-all duration-300">
                  <PaintBrushIcon className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 transition-colors duration-300" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 mb-0.5">Static Website</h3>
                <p className="text-xs text-gray-500">Design</p>
              </div>

              <p className="text-[11px] md:text-xs text-gray-600 mb-3 leading-relaxed text-left">
                Professional and responsive website design for businesses, startups, portfolios, and personal brands. Fast-loading pages with clean and modern UI. Mobile-friendly and SEO-optimized structure. Ideal for companies that need an online presence without frequent content updates.
              </p>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Professional & responsive design</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Fast-loading pages</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Mobile-friendly & SEO-optimized</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Ideal for online presence</span>
                </div>
              </div>

              <button className="w-full py-2 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full transition-all duration-300 text-[11px] md:text-xs shadow-md hover:shadow-lg hover:shadow-emerald-500/30">
                Learn More
              </button>
            </div>

            {/* Dynamic Website Development Card - Featured */}
            <div className="group relative bg-white rounded-2xl transition-all duration-300 p-4 border-2 border-emerald-200 lg:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600" />
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-emerald-50 ring-1 ring-emerald-100 group-hover:ring-2 group-hover:ring-emerald-400 group-hover:bg-emerald-100 mb-2 transition-all duration-300">
                  <BoltIcon className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 transition-colors duration-300" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 mb-0.5">Dynamic Website</h3>
                <p className="text-xs text-gray-500">Development</p>
              </div>

              <p className="text-[11px] md:text-xs text-gray-600 mb-3 leading-relaxed text-left">
                Interactive and database-driven websites with advanced functionality. Suitable for business portals, educational platforms, booking systems, and custom web applications. Admin panel integration for easy content management. Secure, scalable, and built for growth.
              </p>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Interactive & database-driven</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Advanced functionality</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Admin panel integration</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Secure & scalable</span>
                </div>
              </div>

              <button className="w-full py-2 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full transition-all duration-300 text-[11px] md:text-xs shadow-md hover:shadow-lg hover:shadow-emerald-500/30">
                Choose Plan
              </button>
            </div>

            {/* Fully Managed Website Solution Card */}
            <div className="group relative bg-white rounded-2xl transition-all duration-300 p-4 border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              <div className="text-center mb-3">
                <div className="inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl bg-emerald-50 ring-1 ring-emerald-100 group-hover:ring-2 group-hover:ring-emerald-400 group-hover:bg-emerald-100 mb-2 transition-all duration-300">
                  <RocketLaunchIcon className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 transition-colors duration-300" />
                </div>
                <h3 className="text-sm md:text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 mb-0.5">Fully Managed</h3>
                <p className="text-xs text-gray-500">Website Solution</p>
              </div>

              <p className="text-[11px] md:text-xs text-gray-600 mb-3 leading-relaxed text-left">
                Complete website management service from design to maintenance. Includes hosting support, security monitoring, backups, updates, bug fixes, and performance optimization. Dedicated technical support and ongoing maintenance for hassle-free operations.
              </p>

              <div className="space-y-1.5 mb-3">
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Complete management service</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Hosting & security monitoring</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Backups & updates</span>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] md:text-xs text-gray-700">Dedicated technical support</span>
                </div>
              </div>

              <button className="w-full py-2 px-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full transition-all duration-300 text-[11px] md:text-xs shadow-md hover:shadow-lg hover:shadow-emerald-500/30">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative bg-emerald-50 py-6 md:py-8">
        <div className="container-custom">
          <div className="text-center mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto text-xs">Numbers that reflect our commitment to excellence and client success</p>
          </div>

          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm px-4 py-5 max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-center">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex-1 min-w-[130px] text-center px-4 py-2 ${i > 0 ? 'sm:border-l sm:border-gray-100' : ''}`}
                >
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - alternating rows */}
      <section className="relative bg-white">
        <div className="container-custom py-6 md:py-8">
          <div className="text-center mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Our Core <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xs text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and define our culture of excellence and innovation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {values.map((value, i) => (
              <div
                key={value.name}
                className={`group flex items-center gap-4 rounded-2xl border border-gray-100 hover:border-emerald-200 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5 ${
                  i % 2 === 1 ? 'sm:flex-row-reverse sm:text-right' : ''
                }`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100 group-hover:ring-2 group-hover:ring-emerald-400 group-hover:bg-emerald-100 text-emerald-600 transition-all duration-300">
                  <value.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{value.name}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team - horizontal rows */}
      <section id="team" className="relative bg-emerald-50 scroll-mt-20">
        <div className="container-custom py-6 md:py-8">
          <div className="text-center mb-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Our Expert <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-xs text-gray-600 max-w-2xl mx-auto">
              Meet the passionate professionals driving innovation and delivering exceptional results for our clients.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="group flex items-center gap-4 rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 p-4 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-900/5"
              >
                <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {member.name}
                    </h3>
                    <span className="text-xs text-emerald-600 font-medium">{member.role}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{member.expertise}</p>
                </div>
                <span className="hidden sm:inline-flex shrink-0 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-xs text-emerald-700 font-medium">
                  {member.experience}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
