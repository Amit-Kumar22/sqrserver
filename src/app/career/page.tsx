import Link from 'next/link';
import { BriefcaseIcon, MapPinIcon, ClockIcon, UserGroupIcon, AcademicCapIcon, CurrencyDollarIcon, SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  posted: string;
}

const jobOpenings: JobOpening[] = [
  // {
  //   id: 1,
  //   title: 'Senior Full Stack Developer',
  //   department: 'Engineering',
  //   location: 'Remote / Hybrid',
  //   type: 'Full-time',
  //   experience: '3-5 years',
  //   salary: '$80,000 - $120,000',
  //   description: 'We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.',
  //   requirements: [
  //     'Bachelor\'s degree in Computer Science or related field',
  //     'Proficient in React, Node.js, and TypeScript',
  //     'Experience with databases (MongoDB, PostgreSQL)',
  //     'Knowledge of cloud platforms (AWS, Azure)',
  //     'Strong problem-solving skills'
  //   ],
  //   posted: '2 days ago'
  // },
  // {
  //   id: 2,
  //   title: 'UI/UX Designer',
  //   department: 'Design',
  //   location: 'On-site',
  //   type: 'Full-time',
  //   experience: '2-4 years',
  //   salary: '$60,000 - $90,000',
  //   description: 'Join our creative team as a UI/UX Designer to create intuitive and engaging user experiences for our digital products.',
  //   requirements: [
  //     'Bachelor\'s degree in Design, HCI, or related field',
  //     'Proficiency in Figma, Adobe Creative Suite',
  //     'Experience with user research and testing',
  //     'Understanding of responsive design principles',
  //     'Portfolio showcasing design projects'
  //   ],
  //   posted: '1 week ago'
  // },
  // {
  //   id: 3,
  //   title: 'DevOps Engineer',
  //   department: 'Infrastructure',
  //   location: 'Remote',
  //   type: 'Full-time',
  //   experience: '3-6 years',
  //   salary: '$90,000 - $130,000',
  //   description: 'We are seeking a DevOps Engineer to help streamline our development and deployment processes while ensuring system reliability and scalability.',
  //   requirements: [
  //     'Bachelor\'s degree in Computer Science or related field',
  //     'Experience with containerization (Docker, Kubernetes)',
  //     'Proficiency in CI/CD pipelines',
  //     'Knowledge of infrastructure as code (Terraform, CloudFormation)',
  //     'Experience with monitoring and logging tools'
  //   ],
  //   posted: '3 days ago'
  // }
];

const benefits = [
  {
    icon: CurrencyDollarIcon,
    title: 'Competitive Salary',
    description: 'Market-competitive compensation with annual reviews'
  },
  {
    icon: AcademicCapIcon,
    title: 'Learning & Development',
    description: 'Professional development budget and conference attendance'
  },
  {
    icon: UserGroupIcon,
    title: 'Team Culture',
    description: 'Collaborative environment with team building activities'
  },
  {
    icon: ClockIcon,
    title: 'Flexible Hours',
    description: 'Work-life balance with flexible working arrangements'
  }
];

export default function CareerPage() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-emerald-500 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          {/* Subtle Gradient Orbs */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-400/8 rounded-full blur-xl"></div>
          
          {/* Career Elements */}
          <div className="absolute top-16 right-20 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg rotate-12 animate-float">
            <div className="flex items-center justify-center h-full">
              <BriefcaseIcon className="w-6 h-6 text-teal-300" />
            </div>
          </div>

          <div className="absolute top-32 left-16 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md -rotate-12 animate-float delay-500">
            <div className="flex items-center justify-center h-full">
              <UserGroupIcon className="w-5 h-5 text-green-300" />
            </div>
          </div>

          <div className="absolute bottom-24 right-32 w-14 h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl rotate-45 animate-float delay-700">
            <div className="flex items-center justify-center h-full">
              <AcademicCapIcon className="w-7 h-7 text-teal-300" />
            </div>
          </div>

          {/* Simple Grid Pattern */}
          <div className="absolute inset-0 opacity-3">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.2) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom py-8 md:py-10 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Career Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-white/15 border border-white/20 rounded-full text-white text-xs font-medium mb-4">
              <SparklesIcon className="w-3 h-3 mr-2" />
              Join Our Innovation Journey
            </div>
            
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
              Shape the Future of
              <span className="block bg-gradient-to-r from-teal-200 to-green-200 bg-clip-text text-transparent">
                Technology with Us
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-sm lg:text-base text-green-100/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              Join a team of 
              <span className="font-semibold text-teal-200"> passionate innovators </span>
              where creativity meets cutting-edge technology. Build the future while growing your career.
            </p>

            {/* Career Benefits */}
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-md">
                <CurrencyDollarIcon className="w-4 h-4 text-teal-300" />
                <span className="text-white text-xs">Competitive</span>
              </div>
              
              <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-md">
                <ClockIcon className="w-4 h-4 text-green-300" />
                <span className="text-white text-xs">Flexible</span>
              </div>
              
              <div className="flex items-center space-x-1 bg-white/10 px-3 py-1 rounded-md">
                <AcademicCapIcon className="w-4 h-4 text-teal-300" />
                <span className="text-white text-xs">Growth</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="#openings"
                className="group inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white bg-white/20 border border-white/30 rounded-md hover:bg-white/30 transform hover:scale-105 transition-all duration-300"
              >
                Explore Opportunities
                <ArrowRightIcon className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-green-200 border border-green-300/50 rounded-md hover:bg-white/10 transition-all duration-300"
              >
                General Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-6 md:py-8 bg-white/80 backdrop-blur-sm">
        <div className="container-custom">
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Why Choose 
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> SquareServer?</span>
            </h2>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              We believe in creating an environment where innovation thrives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="group relative">
                <div className="relative bg-white p-3 rounded-lg shadow-md hover:shadow-lg border border-gray-100 transition-all duration-500 text-center h-full group-hover:-translate-y-1">
                  {/* Floating icon background */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                      <benefit.icon className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section id="openings" className="py-6 md:py-8 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/30 to-teal-50/30"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Current <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Opportunities</span>
            </h2>
            <p className="text-xs text-gray-600 max-w-md mx-auto">
              Discover exciting career paths and join our mission to create innovative solutions.
            </p>
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            {jobOpenings.length > 0 ? (
              jobOpenings.map((job) => (
                <div key={job.id} className="group relative">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group-hover:-translate-y-1">
                    <div className="p-3">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                            <div className="flex items-center space-x-2">
                              <span className="px-1.5 py-0.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 text-xs font-medium rounded">
                                {job.type}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 text-xs text-gray-600 mb-1">
                            <div className="flex items-center">
                              <BriefcaseIcon className="h-3 w-3 mr-1 text-emerald-500" />
                              {job.department}
                            </div>
                            <div className="flex items-center">
                              <MapPinIcon className="h-3 w-3 mr-1 text-emerald-500" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="h-3 w-3 mr-1 text-emerald-500" />
                              {job.experience} experience
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-left lg:text-right lg:ml-4">
                          <div className="text-sm font-bold text-emerald-600 mb-0.5">{job.salary}</div>
                          <div className="text-xs text-gray-500">Posted {job.posted}</div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-2 leading-relaxed text-xs">{job.description}</p>
                      
                      <div className="mb-2">
                        <h4 className="text-xs font-semibold text-gray-900 mb-1">Key Requirements:</h4>
                        <div className="grid md:grid-cols-2 gap-1">
                          {job.requirements.slice(0, 4).map((req, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-1 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mt-1.5 mr-1.5 flex-shrink-0"></div>
                              <span className="text-xs text-gray-700 leading-relaxed">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-1.5 pt-2 border-t border-gray-100">
                        <Link
                          href="/contact"
                          className="group inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Apply Now
                          <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                        <button className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-emerald-600 border border-emerald-400 rounded hover:bg-emerald-50 hover:border-emerald-500 transition-all duration-300">
                          <svg className="mr-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <div className="relative mb-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 mb-2">
                    <BriefcaseIcon className="h-5 w-5 text-emerald-600" />
                  </div>
                  {/* Floating elements around the icon */}
                  <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-gradient-to-br from-teal-400 to-indigo-500 rounded-full animate-bounce"></div>
                </div>
                
                <h3 className="text-base font-bold text-gray-900 mb-1">No Current Openings</h3>
                <p className="text-xs text-gray-600 mb-3 max-w-xs mx-auto leading-relaxed">
                  We don&apos;t have any job openings at the moment, but We&apos;re always looking for talented individuals.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-1.5 justify-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded hover:from-emerald-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Send Your Resume
                    <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <button className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-semibold text-emerald-600 border border-emerald-400 rounded hover:bg-emerald-50 hover:border-emerald-500 transition-all duration-300">
                    Join Talent Pool
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-8 overflow-hidden">
        {/* Enhanced background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-indigo-700"></div>
        <div className="absolute inset-0">
          {/* Floating shapes */}
          <div className="absolute top-6 right-6 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-8 h-8 bg-white/10 rounded-xl rotate-45" style={{animation: 'bounce 2.5s ease-in-out infinite'}}></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
        </div>
        
        <div className="container-custom text-center relative z-10">
          <div className="max-w-lg mx-auto">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3">
              Ready to Start Your 
              <span className="block">Innovation Journey?</span>
            </h2>
            <p className="text-xs text-teal-100 mb-4 max-w-sm mx-auto leading-relaxed">
              don&apos;t see the perfect role? We&apos;re always excited to meet passionate individuals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-emerald-600 bg-white rounded hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get in Touch
                <svg className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white border border-white/30 rounded hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
