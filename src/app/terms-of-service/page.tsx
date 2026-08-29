'use client';

import { ShieldCheck as ShieldCheckIcon, FileText as DocumentTextIcon, Eye as EyeIcon, ArrowUp as ArrowUpIcon, Scale as ScaleIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';

const termsFeatures = [
  {
    name: 'Fair Terms',
    description: 'Clear and transparent terms that protect both parties fairly',
    icon: ScaleIcon,
  },
  {
    name: 'User Rights',
    description: 'Your rights and responsibilities clearly outlined and protected',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Legal Compliance',
    description: 'All terms comply with applicable laws and industry standards',
    icon: DocumentTextIcon,
  },
  {
    name: 'Service Quality',
    description: 'Terms ensure consistent and high-quality service delivery',
    icon: EyeIcon,
  },
];

const navigationLinks = [
  { id: 'acceptance', label: 'Acceptance of Terms' },
  { id: 'services', label: 'Services' },
  { id: 'user-responsibilities', label: 'User Responsibilities' },
  { id: 'accounts', label: 'Accounts' },
  { id: 'payments', label: 'Payments' },
  { id: 'intellectual-property', label: 'Intellectual Property' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'third-party', label: 'Third-Party Services' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'termination', label: 'Termination' },
  { id: 'changes', label: 'Changes' },
  { id: 'contact', label: 'Contact' },
];

export default function TermsOfServicePage() {
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
        eyebrow="Terms & Conditions"
        title="Terms of Service"
        description="Please read these terms carefully before using our services. By accessing or using our website and services, you agree to be bound by these Terms of Service and our commitment to providing excellent digital solutions."
      />

      {/* Quick Navigation */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="container-custom py-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Quick Navigation</h2>
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

      {/* Terms Features Overview */}
      <section className="relative bg-gradient-to-br from-gray-50 via-teal-50/50 to-purple-50/50 py-8 md:py-12">
        <div className="container-custom">
          <div className="text-center mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              Our <span className="bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">Service Commitments</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">
              We maintain transparent, fair terms that protect your interests while ensuring quality service delivery
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {termsFeatures.map((feature, index) => (
              <div 
                key={feature.name} 
                className="group relative bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Glassmorphism effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 rounded-2xl"></div>
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-600 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="relative bg-white py-8 md:py-12">
        <div className="container-custom max-w-5xl">
          
            {/* Section 1: Acceptance of Terms */}
            <div id="acceptance" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-teal-50/30 to-purple-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Acceptance of Terms</h2>
                </div>
                
                <div className="bg-teal-100/50 backdrop-blur-sm p-4 rounded-2xl border border-teal-200/50">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    By using our platform, you confirm that you have read, understood, and agreed to these Terms of Service. 
                    If you do not agree with any part of these terms, please do not use our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Services */}
            <div id="services" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-purple-50/30 to-teal-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Services</h2>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">SquareServer provides:</p>
                
                <div className="grid gap-3 md:grid-cols-2 mb-4">
                  <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-purple-100/50">
                    <h4 className="font-semibold text-purple-900 mb-1 flex items-center text-sm">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      AI-powered website builder
                    </h4>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-teal-100/50">
                    <h4 className="font-semibold text-teal-900 mb-1 flex items-center text-sm">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                      CRM tools
                    </h4>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-emerald-100/50">
                    <h4 className="font-semibold text-emerald-900 mb-1 flex items-center text-sm">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                      Online store setup
                    </h4>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-indigo-100/50">
                    <h4 className="font-semibold text-indigo-900 mb-1 flex items-center text-sm">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                      Automation and digital solutions
                    </h4>
                  </div>
                </div>
                
                <div className="bg-purple-100/50 backdrop-blur-sm p-3 rounded-2xl border border-purple-200/50">
                  <p className="text-gray-700 text-xs">
                    We may update, modify, or discontinue services at any time with appropriate notice.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: User Responsibilities */}
            <div id="user-responsibilities" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-green-50/30 to-teal-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">User Responsibilities</h2>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">You agree to:</p>
                
                <div className="space-y-3">
                  {[
                    'Provide accurate and complete information',
                    'Use the platform legally and ethically',
                    'Not misuse or attempt to hack the system',
                    'Keep your account credentials secure'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-green-100/50 hover:bg-white/70 transition-all duration-300">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Accounts */}
            <div id="accounts" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <ShieldCheckIcon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Accounts</h2>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-amber-100/50">
                    <p className="text-gray-700 text-sm">
                      <strong>Account Security:</strong> You are responsible for maintaining account confidentiality and all activities under your account.
                    </p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-orange-100/50">
                    <p className="text-gray-700 text-sm">
                      <strong>Limited Liability:</strong> We are not liable for unauthorized account access resulting from your failure to maintain security.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Payments */}
            <div id="payments" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-lg">💳</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Payments</h2>
                </div>
                
                <div className="space-y-3">
                  {[
                    'Subscription fees are subject to change with notice',
                    'Payments are non-refundable unless specified in our refund policy',
                    'Transactions are processed via secure third-party gateways'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-emerald-100/50">
                      <span className="text-emerald-500 mr-3 text-lg">💰</span>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 6: Intellectual Property */}
            <div id="intellectual-property" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-rose-50/30 to-pink-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <DocumentTextIcon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Intellectual Property</h2>
                </div>
                
                <div className="bg-rose-100/50 backdrop-blur-sm p-4 rounded-2xl border border-rose-200/50">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    All content, software, designs, and materials on our platform belong to SquareServer. 
                    Unauthorized use, reproduction, or distribution is strictly prohibited and may result in legal action.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 7: Privacy */}
            <div id="privacy" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <EyeIcon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Privacy</h2>
                </div>
                
                <div className="bg-indigo-100/50 backdrop-blur-sm p-4 rounded-2xl border border-indigo-200/50">
                  <p className="text-gray-700 leading-relaxed text-sm text-sm">
                    Your data is handled according to our Privacy Policy. Please review our 
                    <Link href="/privacy-policy" className="text-indigo-600 hover:text-indigo-800 font-medium ml-1">
                      Privacy Policy
                    </Link> for detailed information about data collection, use, and protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 8: Third-Party Services */}
            <div id="third-party" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-sm font-bold">8</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Third-Party Services</h2>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">We may integrate with external services including:</p>
                
                <div className="space-y-2 mb-4">
                  {[
                    { service: 'Payment processors', icon: '💳' },
                    { service: 'WhatsApp Business API', icon: '📱' },
                    { service: 'Analytics and tracking tools', icon: '📊' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white/50 backdrop-blur-sm p-3 rounded-xl border border-emerald-100/50">
                      <span className="text-lg mr-3">{item.icon}</span>
                      <p className="text-gray-700 font-medium text-sm">{item.service}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-emerald-100/50 backdrop-blur-sm p-3 rounded-2xl border border-emerald-200/50">
                  <p className="text-gray-700 text-xs text-xs">
                    We are not responsible for third-party policies, availability, or issues that may arise from their services.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 9: Limitation of Liability */}
            <div id="liability" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-red-50/30 to-orange-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <ShieldCheckIcon className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Limitation of Liability</h2>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">We are not responsible for:</p>
                
                <div className="grid gap-3 md:grid-cols-3 mb-4">
                  {[
                    { icon: '📉', title: 'Business Losses', desc: 'Indirect or consequential business losses' },
                    { icon: '💾', title: 'Data Loss', desc: 'Data loss due to technical issues' },
                    { icon: '⚡', title: 'Service Interruptions', desc: 'Temporary service unavailability' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-red-100/50 text-center">
                      <div className="text-xl mb-1">{item.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm">{item.title}</h4>
                      <p className="text-gray-600 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 10: Termination */}
            <div id="termination" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-yellow-50/30 to-amber-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-lg">⚠️</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Termination</h2>
                </div>
                
                <div className="bg-yellow-100/50 backdrop-blur-sm p-4 rounded-2xl border border-yellow-200/50">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    We may suspend or terminate your account if these terms are violated. 
                    You may also terminate your account at any time by contacting our support team.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 11: Changes */}
            <div id="changes" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-violet-50/30 to-indigo-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-sm font-bold">11</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Changes to Terms</h2>
                </div>
                
                <div className="bg-violet-100/50 backdrop-blur-sm p-4 rounded-2xl border border-violet-200/50">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    We may update these Terms of Service from time to time. Changes will be posted on this page with 
                    a revised &quot;Last Updated&quot; date. Continued use of our services after changes means acceptance of the new terms.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 12: Contact Us */}
            <div id="contact" className="mb-8 animate-fadeIn">
              <div className="bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
                    <span className="text-white text-lg">✉️</span>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Contact Us</h2>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <a 
                    href="mailto:contact@squareserver.in" 
                    className="group bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-emerald-100/50 hover:bg-white/80 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-white text-lg">📧</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors text-sm">Email Us</h4>
                        <p className="text-emerald-600 font-medium text-xs">contact@squareserver.in</p>
                      </div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://squareserver.in/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-teal-100/50 hover:bg-white/80 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                        <span className="text-white text-lg">🌐</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors text-sm">Visit Website</h4>
                        <p className="text-teal-600 font-medium text-xs">squareserver.in</p>
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