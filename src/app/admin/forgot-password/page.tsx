'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSubmittedEmail(data.email);
        setEmailSent(true);
        toast.success('Reset code sent! Check your email.');
      } else {
        toast.error(result.error || 'Failed to send reset code');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoToVerification = () => {
    router.push(`/admin/reset-password?email=${encodeURIComponent(submittedEmail)}`);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <div className="mx-auto h-12 w-fit">
              <span className="text-2xl font-bold text-primary-600">
                SquareServer
              </span>
            </div>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Check Your Email
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              We&apos;ve sent a password reset code to your email
            </p>
          </div>
          
          <div className="card-compact">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900">Email Sent Successfully</h3>
              
              <p className="text-sm text-gray-600">
                We&apos;ve sent a 6-digit verification code to:
                <br />
                <span className="font-medium text-gray-900">{submittedEmail}</span>
              </p>
              
              <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                <h4 className="text-sm font-medium text-teal-800 mb-2">What&apos;s next?</h4>
                <ul className="text-xs text-teal-700 space-y-1">
                  <li>• Check your email inbox (and spam folder)</li>
                  <li>• The code expires in 15 minutes</li>
                  <li>• Enter the code to reset your password</li>
                </ul>
              </div>
              
              <button
                onClick={handleGoToVerification}
                className="btn-primary w-full justify-center"
              >
                Continue to Reset Password
              </button>
              
              <div className="flex items-center justify-center space-x-4 text-sm">
                <button
                  onClick={() => {
                    setEmailSent(false);
                    setSubmittedEmail('');
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Use different email
                </button>
                <span className="text-gray-300">|</span>
                <Link
                  href="/admin/login"
                  className="text-primary-600 hover:text-primary-700"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-fit">
            <span className="text-2xl font-bold text-primary-600">
              SquareServer
            </span>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Forgot Your Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            No worries! Enter your email address and We&apos;ll send you a code to reset your password.
          </p>
        </div>
        
        <div className="card-compact">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="email" className="label-text">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="input-field"
                placeholder="Enter your registered email"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Reset Code...
                  </>
                ) : (
                  'Send Reset Code'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <Link
              href="/admin/login"
              className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back to Login
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} SquareServer. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}