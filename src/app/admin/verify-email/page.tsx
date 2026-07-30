'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface OTPFormData {
  otp: string;
}

// Component that uses useSearchParams - wrapped in Suspense
function OTPVerificationContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { user, loading, initialized } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<OTPFormData>();
  const otpValue = watch('otp', '');

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // If user is already authenticated and auth is initialized, redirect
  useEffect(() => {
    if (initialized && !loading && user) {
      router.replace('/admin/dashboard');
    }
  }, [initialized, loading, user, router]);

  // Redirect if no email provided
  useEffect(() => {
    if (!email) {
      toast.error('Email address required for verification');
      router.push('/admin/register');
    }
  }, [email, router]);

  // Show loading until auth is properly initialized
  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  // If user is authenticated, show redirect message
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: OTPFormData) => {
    if (!email) {
      toast.error('Email address is required');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: data.otp,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Email verified successfully! You can now sign in.');
        router.push('/admin/login');
      } else {
        toast.error(result.error || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email || isResending || countdown > 0) return;

    setIsResending(true);
    
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('New OTP sent to your email address');
        setCountdown(60); // 60 second cooldown
      } else {
        toast.error(result.error || 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

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
            Verify Your Email Address
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We&apos;ve sent a 6-digit verification code to
          </p>
          <p className="text-center text-sm font-medium text-primary-600">
            {email}
          </p>
        </div>
        
        <div className="card-compact">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="otp" className="label-text text-center block">
                Enter Verification Code
              </label>
              <input
                id="otp"
                type="text"
                maxLength={6}
                {...register('otp', {
                  required: 'Verification code is required',
                  pattern: {
                    value: /^\d{6}$/,
                    message: 'Please enter a valid 6-digit code',
                  },
                })}
                className="input-field text-center text-xl font-mono tracking-widest"
                placeholder="000000"
                autoComplete="one-time-code"
              />
              {errors.otp && (
                <p className="text-red-600 text-xs mt-1 text-center">{errors.otp.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-2 text-center">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || otpValue.length !== 6}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </>
                ) : (
                  'Verify Code'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600">
              didn&apos;t receive the code?
            </p>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResending || countdown > 0}
              className={`text-sm font-medium ${
                countdown > 0 || isResending
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary-600 hover:text-primary-700 cursor-pointer'
              }`}
            >
              {isResending ? (
                <>
                  <div className="inline-block animate-spin rounded-full h-3 w-3 border-b-2 border-primary-600 mr-1"></div>
                  Sending...
                </>
              ) : countdown > 0 ? (
                `Resend in ${countdown}s`
              ) : (
                'Resend Code'
              )}
            </button>
            
            <div className="pt-2 border-t border-gray-200">
              <Link 
                href="/admin/register"
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                ← Back to Registration
              </Link>
            </div>
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

// Loading fallback for Suspense boundary
function OTPVerificationLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading verification page...</p>
      </div>
    </div>
  );
}

// Main page component with Suspense wrapper
export default function OTPVerificationPage() {
  return (
    <Suspense fallback={<OTPVerificationLoading />}>
      <OTPVerificationContent />
    </Suspense>
  );
}
