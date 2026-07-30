'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  projectType: string;
  budget?: string;
}

const projectTypes = [
  { value: '', label: 'Select Project Type' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-app', label: 'Mobile App Development' },
  { value: 'desktop-app', label: 'Desktop Application' },
  { value: 'cloud-solutions', label: 'Cloud Solutions' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'iot-solutions', label: 'IoT Solutions' },
  { value: 'blockchain', label: 'Blockchain Development' },
  { value: 'ai-ml', label: 'AI/ML Solutions' },
  { value: 'consulting', label: 'Technology Consulting' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: '', label: 'Select Budget Range' },
  { value: 'under-5k', label: 'Under ₹5,00,000' },
  { value: '5k-10k', label: '₹5,00,000 - ₹10,00,000' },
  { value: '10k-25k', label: '₹10,00,000 - ₹25,00,000' },
  { value: '25k-50k', label: '₹25,00,000 - ₹50,00,000' },
  { value: '50k-100k', label: '₹50,00,000 - ₹1,00,00,000' },
  { value: 'over-100k', label: 'Over ₹1,00,00,000' },
  { value: 'discuss', label: 'Prefer to discuss' },
];

const contactInfo = [
  {
    icon: EnvelopeIcon,
    label: 'Email',
    value: 'info@squareserver.in',
    link: 'mailto:info@squareserver.in',
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: '+91 98765 43210',
    link: 'tel:+919876543210',
  },
  {
    icon: MapPinIcon,
    label: 'Address',
    value: 'The Cozy Corner, No 9A, Choudhary Lane Road, Vikash Nagar, Balapur, Patna, Bihar 800010',
    link: null,
  },
  {
    icon: ClockIcon,
    label: 'Business Hours',
    value: 'Mon-Sat: 10AM-5PM IST',
    link: null,
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        // Handle specific error types from API
        if (response.status === 503) {
          toast.error(result.error || 'Email service temporarily unavailable. Please contact us directly.');
        } else if (response.status === 500 && result.details?.includes('Email service error')) {
          toast.error(result.error || 'Failed to send email. Please contact us directly at info@squareserver.in or call +91 98765 43210.');
        } else {
          toast.error(result.error || 'Failed to submit contact form. Please try again.');
        }
        return; // Return early instead of throwing error
      }
      
      // Success response
      toast.success(result.message || 'Message sent successfully! We\'ll get back to you soon.');
      reset();
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      // Handle network errors, JSON parsing errors, etc.
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        toast.error('Network error. Please check your connection and try again.');
      } else if (error.name === 'SyntaxError') {
        toast.error('Server response error. Please try again later.');
      } else {
        toast.error('Unable to send message. Please contact us directly at info@squareserver.in or call +91 98765 43210.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-indigo-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 max-w-3xl mx-auto">
              Ready to transform your business with cutting-edge technology? 
              Let&apos;s discuss your project and explore innovative solutions together.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-4 md:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <div className="lg:sticky lg:top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Let&apos;s Start a Conversation
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  We&apos;re here to help you navigate the digital landscape and build solutions 
                  that drive real results. Reach out to us through any of these channels.
                </p>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg shadow-md">
                        <info.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1 text-sm">{info.label}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-sm text-gray-600 hover:text-emerald-600 transition-colors duration-300"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-600">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Office Image */}
                
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-lg shadow-lg border border-emerald-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Send us a Message</h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name and Email Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors duration-300"
                        placeholder="Name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^\S+@\S+$/,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors duration-300"
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Company and Phone Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="block text-xs font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        {...register('company')}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors duration-300"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors duration-300"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Project Type and Budget Row */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="projectType" className="block text-xs font-medium text-gray-700 mb-1">
                        Project Type *
                      </label>
                      <select
                        {...register('projectType', { required: 'Please select a project type' })}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors duration-300"
                      >
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value} className="bg-gray-50">
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.projectType && (
                        <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-xs font-medium text-gray-700 mb-1">
                        Budget Range
                      </label>
                      <select
                        {...register('budget')}
                        className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors duration-300"
                      >
                        {budgetRanges.map((range) => (
                          <option key={range.value} value={range.value} className="bg-gray-50">
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      {...register('subject', { required: 'Subject is required' })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors duration-300"
                      placeholder="How can we help you?"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      {...register('message', { required: 'Message is required' })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-colors duration-300 resize-none"
                      placeholder="Tell us more about your project, goals, and any specific requirements..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
