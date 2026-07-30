import Link from 'next/link';
import {
  CodeBracketIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CloudIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  BoltIcon,
  CogIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/layout/PageHeader';

const solutions = [
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Full-stack web applications using modern frameworks and technologies for optimal performance and user experience.',
    icon: CodeBracketIcon,
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'PostgreSQL','Spring Boot', 'sql'],
    features: [
      'Responsive design and mobile optimization',
      'Progressive Web Applications (PWA)',
      'E-commerce and content management systems',
      'API development and integration',
      'Performance optimization and SEO',
    ],
  },
  {
    id: 'mobile-development',
    name: 'Mobile App Development', 
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.',
    icon: DevicePhoneMobileIcon,
    technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin'],
    features: [
      'iOS and Android native development',
      'Cross-platform hybrid solutions',
      'Mobile UI/UX design and optimization',
      'App store deployment and maintenance',
      'Push notifications and offline functionality',
    ],
  },
  {
    id: 'desktop-applications',
    name: 'Desktop Applications',
    description: 'Robust desktop software solutions for Windows, macOS, and Linux platforms with advanced functionality.',
    icon: ComputerDesktopIcon,
    technologies: ['Electron', '.NET', 'Java', 'Python', 'C++'],
    features: [
      'Cross-platform compatibility',
      'Rich user interfaces and advanced features',
      'Database integration and data management',
      'System integration and automation tools',
      'Enterprise-grade security and performance',
    ],
  },
  {
    id: 'cloud-solutions',
    name: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure and migration services using leading cloud platforms and DevOps practices.',
    icon: CloudIcon,
    technologies: ['Hostinger','AWS', 'Azure',  'Docker', 'Kubernetes'],
    features: [
      'Cloud migration and modernization',
      'Serverless architecture and microservices',
      'Container orchestration and management',
      'Auto-scaling and load balancing',
      'Cost optimization and monitoring',
    ],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Solutions',
    description: 'Comprehensive security solutions to protect your digital assets, data, and infrastructure from threats.',
    icon: ShieldCheckIcon,
    technologies: ['Penetration Testing', 'SIEM', 'Zero Trust', 'Blockchain Security'],
    features: [
      'Security audits and penetration testing',
      'Data encryption and secure communication',
      'Identity and access management (IAM)',
      'Incident response and recovery planning',
      'Compliance and regulatory adherence',
    ],
  },
  {
    id: 'iot-solutions',
    name: 'IoT Solutions',
    description: 'Internet of Things implementations connecting devices, sensors, and systems for intelligent automation.',
    icon: CpuChipIcon,
    technologies: ['Arduino', 'Raspberry Pi', 'MQTT', 'LoRaWAN', 'Edge Computing'],
    features: [
      'Sensor networks and device connectivity',
      'Real-time data collection and analytics',
      'Industrial automation and monitoring',
      'Smart home and building solutions',
      'Predictive maintenance systems',
    ],
  },
  {
    id: 'ai-ml-solutions',
    name: 'AI & Machine Learning',
    description: 'Artificial intelligence and machine learning solutions to automate processes and generate insights.',
    icon: BoltIcon,
    technologies: ['TensorFlow', 'PyTorch', 'scikit-learn', 'OpenAI', 'Computer Vision'],
    features: [
      'Predictive analytics and forecasting',
      'Natural language processing (NLP)',
      'Computer vision and image recognition',
      'Recommendation systems and personalization',
      'Automated decision-making systems',
    ],
  },
  {
    id: 'system-integration',
    name: 'System Integration',
    description: 'Seamless integration of disparate systems, applications, and data sources for unified operations.',
    icon: CogIcon,
    technologies: ['REST APIs', 'GraphQL', 'ETL', 'Message Queues', 'Enterprise Service Bus'],
    features: [
      'Legacy system modernization',
      'API development and management',
      'Data synchronization and migration',
      'Workflow automation and optimization',
      'Real-time integration and monitoring',
    ],
  },
];

const processSteps = [
  {
    step: '01',
    title: 'Discovery & Planning',
    description: 'We analyze your requirements, assess technical feasibility, and create a comprehensive project roadmap.',
  },
  {
    step: '02', 
    title: 'Design & Architecture',
    description: 'Our experts design scalable architectures and create detailed technical specifications for your solution.',
  },
  {
    step: '03',
    title: 'Development & Testing',
    description: 'Agile development with continuous testing, code reviews, and quality assurance throughout the process.',
  },
  {
    step: '04',
    title: 'Deployment & Support',
    description: 'Seamless deployment to production environments with ongoing support, maintenance, and optimization.',
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-100 min-h-screen">
      <PageHeader
        eyebrow="Technology Solutions"
        title={<>IT Solutions & <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Services</span></>}
        description="Comprehensive technology solutions tailored to meet your business objectives and drive digital transformation across your organization."
        stats={['7+ Service Categories', 'Web · Mobile · Cloud']}
      />

      {/* Solutions Grid - Compact */}
      <section className="relative py-6 md:py-8">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
              Our
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Solutions</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
              Comprehensive IT services designed to accelerate your digital transformation journey
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className="group relative rounded-2xl bg-white border border-gray-100 hover:border-transparent p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/5 overflow-hidden"
              >
                {/* Accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-teal-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300" />

                <div className="flex items-start gap-3.5">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-600 transition-all duration-300">
                    <solution.icon className="h-5 w-5 text-emerald-600 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 mb-1">
                      {solution.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{solution.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {solution.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-50 text-gray-600 border border-gray-100 group-hover:border-emerald-200 group-hover:text-emerald-700 group-hover:bg-emerald-50/60 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="space-y-1 mb-3">
                      {solution.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-1.5 text-xs text-gray-600">
                          <span className="w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 pt-2 border-t border-gray-50 w-full group-hover:gap-1.5 transition-all duration-300">
                      Learn more
                      <ArrowRightIcon className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Compact */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-50 py-8 md:py-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(52, 211, 153, 0.3) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.3) 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container-custom relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 bg-emerald-100 rounded-full text-emerald-700 text-xs font-medium mb-3">
              <CogIcon className="w-3.5 h-3.5 mr-1.5" />
              Our Methodology
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
              Development
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> Process</span>
            </h2>
            <p className="text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
              A proven four-step methodology ensuring quality, efficiency, and success in every project.
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 relative">
            {/* Connecting Lines (desktop) */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-300 via-teal-400 to-purple-400 opacity-30" style={{ top: '3rem' }}></div>
            
            {processSteps.map((step, index) => (
              <div key={index} className="group relative" style={{ animationDelay: `${index * 0.15}s` }}>
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-all duration-300"></div>
                
                {/* Card */}
                <div className="relative h-full p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 group-hover:border-emerald-200 group-hover:transform group-hover:-translate-y-1">
                  {/* Step Number Badge */}
                  <div className="relative inline-flex items-center justify-center w-12 h-12 mb-4 mx-auto">
                    {/* Pulsing Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-10 animate-ping"></div>
                    
                    {/* Number */}
                    <div className="relative w-11 h-11 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full font-bold text-base shadow-md group-hover:scale-105 transition-transform duration-300">
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-300">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
                  
                  {/* Arrow Indicator (not on last item) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-2.5 top-1/2 transform -translate-y-1/2 z-10">
                      <div className="w-5 h-5 bg-white border-2 border-emerald-400 rounded-full flex items-center justify-center shadow-md">
                        <ArrowRightIcon className="w-2.5 h-2.5 text-emerald-600" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="relative overflow-hidden py-6 md:py-8">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-teal-400/10 to-purple-400/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-300/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-300/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative">
          <div className="relative p-4 md:p-6 rounded-lg bg-white shadow-lg text-center overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-emerald-200/30 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-teal-200/30 to-transparent rounded-full blur-2xl"></div>
            
            {/* Content */}
            <div className="relative">
              {/* Icon Badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mb-3 shadow-md">
                <BoltIcon className="w-5 h-5 text-white" />
              </div>
              
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Ready to Transform Your
                <span className="block mt-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">
                  Business with Technology?
                </span>
              </h2>
              
              <p className="text-xs sm:text-sm text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
                Let our expert team analyze your requirements and recommend the best technology 
                solutions tailored to your specific business needs. Get started with a free consultation today.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 justify-center items-center mb-4">
                <Link 
                  href="/contact" 
                  className="group inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-600 to-purple-600 rounded-lg hover:from-emerald-600 hover:via-teal-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRightIcon className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/projects?category=it-solutions" 
                  className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-emerald-600 bg-emerald-50 border-2 border-emerald-400 rounded-lg hover:bg-emerald-100 hover:border-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  View Our Work
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Free Consultation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="font-medium">Expert Team</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="font-medium">Proven Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}