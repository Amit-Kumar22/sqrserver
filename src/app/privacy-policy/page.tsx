'use client';

import { ShieldCheck as ShieldCheckIcon, FileText as DocumentTextIcon, Eye as EyeIcon, Lock as LockClosedIcon, ArrowUp as ArrowUpIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import PageHeader from '@/components/layout/PageHeader';

const privacyFeatures = [
  {
    name: 'Data Protection',
    description: 'Strong encryption and secure servers protect your personal information',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Transparent Practices',
    description: 'Clear information about how we collect, use, and protect your data',
    icon: EyeIcon,
  },
  {
    name: 'User Rights',
    description: 'Full control over your data with rights to access, update, or delete',
    icon: DocumentTextIcon,
  },
  {
    name: 'Secure Processing',
    description: 'Payment and sensitive data processed through secure third-party gateways',
    icon: LockClosedIcon,
  },
];

const navigationLinks = [
  { id: 'information-collect', label: 'Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'data-sharing', label: 'Data Sharing' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'cookies', label: 'Cookies' },
  { id: 'user-rights', label: 'User Rights' },
  { id: 'third-party', label: 'Third-Party Services' },
  { id: 'policy-changes', label: 'Changes to Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export default function PrivacyPolicyPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      
      // Update active section based on scroll position
      const sections = navigationLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="bg-white relative">
      <PageHeader
        eyebrow="Last Updated: April 6, 2026"
        title="Privacy Policy"
        description="Your data security and privacy is our priority. At SquareServer, we value your privacy and are committed to protecting your personal information — this policy explains how we collect, use, and safeguard your data when you use our website and services."
      />

      {/* Quick Navigation */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Quick Navigation</h2>
            <div className="flex flex-wrap gap-2 max-w-4xl">
              {navigationLinks.slice(0, 4).map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                    activeSection === link.id
                      ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="hidden lg:flex gap-2">
                {navigationLinks.slice(4).map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      activeSection === link.id
                        ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Features Overview */}
      <section className="relative bg-gradient-to-br from-gray-50 via-teal-50/50 to-purple-50/50 py-16 md:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">Privacy Commitments</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We implement comprehensive measures to protect your data and respect your privacy rights
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {privacyFeatures.map((feature, index) => (
              <div 
                key={feature.name} 
                className="group relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-2xl"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="relative bg-white py-16 md:py-20">
        <div className="container-custom max-w-5xl">
          
            {/* Section 1: Information We Collect */}
            <div id="information-collect" className="mb-16 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-teal-50/30 to-purple-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white text-lg font-bold">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">We may collect the following types of information:</p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-teal-100/50">
                    <h4 className="font-semibold text-teal-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                      Personal Information
                    </h4>
                    <p className="text-gray-600 text-sm">Name, email address, phone number, business details</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-purple-100/50">
                    <h4 className="font-semibold text-purple-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Account Data
                    </h4>
                    <p className="text-gray-600 text-sm">Login credentials and user preferences</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-emerald-100/50">
                    <h4 className="font-semibold text-emerald-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                      Usage Data
                    </h4>
                    <p className="text-gray-600 text-sm">Pages visited, time spent, and interactions</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-indigo-100/50">
                    <h4 className="font-semibold text-indigo-900 mb-2 flex items-center">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                      Payment Information
                    </h4>
                    <p className="text-gray-600 text-sm">Processed securely via third-party payment gateways</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: How We Use Your Information */}
            <div id="how-we-use" className="mb-16 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-purple-50/30 to-teal-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white text-lg font-bold">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">We use your information to:</p>
                
                <div className="space-y-3">
                  {[
                    'Provide and improve our AI-powered digital services',
                    'Create and manage your website, CRM, and online store',
                    'Communicate updates, support, and important notifications',
                    'Personalize user experience',
                    'Ensure security and prevent fraud'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-purple-100/50 hover:bg-white/70 transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Data Sharing */}
            <div id="data-sharing" className="mb-16 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-green-50/30 to-teal-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white text-lg font-bold">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Data Sharing</h2>
                </div>
                
                <div className="bg-green-100/50 backdrop-blur-sm p-6 rounded-2xl border border-green-200/50 mb-6">
                  <p className="text-green-800 font-semibold mb-2">🛡️ We do not sell your personal data</p>
                  <p className="text-gray-700">However, we may share information with:</p>
                </div>
                
                <div className="space-y-3">
                  {[
                    'Trusted third-party services (hosting, payment gateways, analytics)',
                    'Legal authorities if required by law'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-green-100/50">
                      <span className="text-green-500 mr-3 text-lg">•</span>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Data Security */}
            <div id="data-security" className="mb-16 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-red-50/30 to-orange-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">We implement strong security measures to protect your data, including:</p>
                
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                  {[
                    { icon: '🔒', title: 'Secure Servers', desc: 'Enterprise-grade server security' },
                    { icon: '🔐', title: 'Encryption', desc: 'End-to-end data encryption' },
                    { icon: '👁️', title: 'Regular Monitoring', desc: '24/7 security monitoring' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-red-100/50 text-center">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-orange-100/50 backdrop-blur-sm p-4 rounded-2xl border border-orange-200/50">
                  <p className="text-orange-800 text-sm italic">
                    However, no method is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5: Cookies */}
            <div id="cookies" className="mb-16 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-amber-50/30 to-yellow-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white text-lg">🍪</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Cookies</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">We use cookies to:</p>
                
                <div className="space-y-3 mb-6">
                  {[
                    'Improve website performance',
                    'Analyze user behavior',
                    'Provide personalized experience'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-amber-100/50">
                      <span className="text-amber-500 mr-3 text-lg">🔹</span>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-amber-100/50 backdrop-blur-sm p-4 rounded-2xl border border-amber-200/50">
                  <p className="text-gray-700">You can disable cookies through your browser settings.</p>
                </div>
              </div>
            </div>

            {/* Section 6: User Rights */}
            <div id="user-rights" className="mb-16 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <DocumentTextIcon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">User Rights</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">You have the right to:</p>
                
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { icon: '👁️', title: 'Access your data', desc: 'View all data we have about you' },
                    { icon: '✏️', title: 'Update information', desc: 'Correct or modify your data' },
                    { icon: '🗑️', title: 'Request deletion', desc: 'Delete your data permanently' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-teal-100/50 text-center hover:bg-white/80 transition-all duration-300">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 7: Third-Party Services */}
            <div id="third-party" className="mb-16 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white text-lg font-bold">7</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Third-Party Services</h2>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">Our platform may include integrations such as:</p>
                
                <div className="space-y-3 mb-6">
                  {[
                    { service: 'Payment gateways', icon: '💳' },
                    { service: 'Analytics tools', icon: '📊' },
                    { service: 'WhatsApp integrations', icon: '📱' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-pink-100/50">
                      <span className="text-2xl mr-4">{item.icon}</span>
                      <p className="text-gray-700 font-medium">{item.service}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-pink-100/50 backdrop-blur-sm p-4 rounded-2xl border border-pink-200/50">
                  <p className="text-gray-700">These services have their own privacy policies.</p>
                </div>
              </div>
            </div>

            {/* Section 8: Changes to Policy */}
            <div id="policy-changes" className="mb-16 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-violet-50/30 to-indigo-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white text-lg font-bold">8</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Changes to This Policy</h2>
                </div>
                
                <div className="bg-violet-100/50 backdrop-blur-sm p-6 rounded-2xl border border-violet-200/50">
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time. Updates will be posted on this page with 
                    a revised &quot;Last Updated&quot; date. We encourage you to review this Privacy Policy periodically to 
                    stay informed about how we protect your information.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 9: Contact Us */}
            <div id="contact" className="mb-16 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white text-lg">✉️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                </div>
                
                <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                  If you have any questions about this Privacy Policy, don&apos;t hesitate to contact us:
                </p>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <a 
                    href="mailto:contact@squareserver.com" 
                    className="group bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-emerald-100/50 hover:bg-white/80 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white text-2xl">📧</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">Email Us</h4>
                        <p className="text-emerald-600 font-medium">contact@squareserver.com</p>
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://squareserver.in/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-teal-100/50 hover:bg-white/80 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white text-2xl">🌐</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">Visit Website</h4>
                        <p className="text-teal-600 font-medium">squareserver.in</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center"
          aria-label="Back to top"
        >
          <ArrowUpIcon className="w-5 h-5" />
        </button>
      )}
      
    </div>
  );
}