import Link from 'next/link';
import { Briefcase as BriefcaseIcon, MapPin as MapPinIcon, Clock as ClockIcon, Users as UserGroupIcon, GraduationCap as AcademicCapIcon, DollarSign as CurrencyDollarIcon, ArrowRight as ArrowRightIcon, Send as PaperAirplaneIcon } from 'lucide-react';

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
    <div className="bg-white">
      {/* Header */}
      <section className="relative bg-white overflow-hidden py-12 md:py-16">
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
                Join Our Innovation Journey
              </div>

              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Shape the Future of{' '}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Technology with Us
                </span>
              </h1>

              <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-lg">
                Join a team of passionate innovators where creativity meets cutting-edge technology.
                Build the future while growing your career.
              </p>

              <div className="flex flex-wrap gap-3 mt-7">
                <Link
                  href="#openings"
                  className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  Explore Opportunities
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 rounded-full hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/60 transition-all duration-300"
                >
                  General Inquiry
                </Link>
              </div>
            </div>

            {/* Right visual: benefits preview card */}
            <div className="relative">
              <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-emerald-900/5 p-6">
                <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-4">Why join us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                        <benefit.icon className="h-4 w-4" />
                      </span>
                      <p className="text-xs font-semibold text-gray-800 leading-snug pt-1">{benefit.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Why Choose
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> SquareServer?</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              We believe in creating an environment where innovation thrives.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="group relative rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 ring-1 ring-emerald-100 group-hover:ring-2 group-hover:ring-emerald-400 group-hover:bg-emerald-100 transition-all duration-300">
                  <benefit.icon className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 mb-1.5">{benefit.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section id="openings" className="py-12 md:py-16">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Current <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Opportunities</span>
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Discover exciting career paths and join our mission to create innovative solutions.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {jobOpenings.length > 0 ? (
              <div className="space-y-4">
                {jobOpenings.map((job) => (
                  <div
                    key={job.id}
                    className="group relative rounded-2xl bg-white border border-gray-100 hover:border-emerald-200 hover:-translate-y-1 p-5 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{job.title}</h3>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-100">
                            {job.type}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <BriefcaseIcon className="h-3.5 w-3.5 text-emerald-500" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPinIcon className="h-3.5 w-3.5 text-emerald-500" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <ClockIcon className="h-3.5 w-3.5 text-emerald-500" />
                            {job.experience} experience
                          </span>
                        </div>
                      </div>
                      <div className="text-left lg:text-right shrink-0">
                        <div className="text-sm font-bold text-emerald-600">{job.salary}</div>
                        <div className="text-xs text-gray-400">Posted {job.posted}</div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{job.description}</p>

                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2">Key Requirements</h4>
                      <div className="grid sm:grid-cols-2 gap-1.5">
                        {job.requirements.slice(0, 4).map((req) => (
                          <div key={req} className="flex items-start gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                            <span className="text-xs text-gray-600 leading-relaxed">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-gray-100">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
                      >
                        Apply Now
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center rounded-2xl border border-gray-100 bg-gray-50 py-12 px-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 ring-1 ring-emerald-100 mb-4">
                  <BriefcaseIcon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No Current Openings</h3>
                <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto leading-relaxed">
                  We don&apos;t have any job openings at the moment, but we&apos;re always looking for talented individuals.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Send Your Resume
                    <PaperAirplaneIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gray-950 py-12 md:py-16">
        <div className="pointer-events-none absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl translate-y-1/2" />

        <div className="container-custom text-center relative z-10">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to Start Your Innovation Journey?
            </h2>
            <p className="text-sm text-gray-400 mb-7 max-w-sm mx-auto leading-relaxed">
              Don&apos;t see the perfect role? We&apos;re always excited to meet passionate individuals.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-900 bg-white rounded-full hover:shadow-lg hover:shadow-white/10 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Get in Touch
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-300 border border-white/15 rounded-full hover:bg-white/5 hover:border-white/25 transition-all duration-300"
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
