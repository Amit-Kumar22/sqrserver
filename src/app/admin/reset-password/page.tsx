'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface ResetPasswordFormData {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

// Component that uses useSearchParams - wrapped in Suspense
function ResetPasswordContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [resetComplete, setResetComplete] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<ResetPasswordFormData>();
  const newPassword = watch('newPassword');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // If no email provided, redirect to forgot password page
      router.push('/admin/forgot-password');
    }
  }, [searchParams, router]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: data.otp,
          newPassword: data.newPassword,
        }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setResetComplete(true);
        toast.success('Password reset successfully!');
      } else {
        toast.error(result.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (resetComplete) {
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
              Password Reset Complete
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your password has been successfully updated
            </p>
          </div>
          
          <div className="card-compact">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900">All Set!</h3>
              
              <p className="text-sm text-gray-600">
                Your password has been reset successfully. You can now log in with your new password.
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="text-sm font-medium text-green-800 mb-2">Security Tips</h4>
                <ul className="text-xs text-green-700 space-y-1">
                  <li>• Keep your password secure and don&apos;t share it</li>
                  <li>• Use a strong, unique password</li>
                  <li>• Log out from all devices if you suspect unauthorized access</li>
                </ul>
              </div>
              
              <Link
                href="/admin/login"
                className="btn-primary w-full justify-center inline-flex items-center"
              >
                Continue to Login
              </Link>
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
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter the verification code sent to your email and set a new password
          </p>
          {email && (
            <p className="mt-1 text-center text-xs text-gray-500">
              Code sent to: <span className="font-medium">{email}</span>
            </p>
          )}
        </div>
        
        <div className="card-compact">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="otp" className="label-text">
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                maxLength={6}
                {...register('otp', {
                  required: 'Verification code is required',
                  pattern: {
                    value: /^\d{6}$/,
                    message: 'Code must be 6 digits',
                  },
                })}
                className="input-field text-center text-lg letter-spacing-wide"
                placeholder="000000"
              />
              {errors.otp && (
                <p className="text-red-600 text-xs mt-1">{errors.otp.message}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Enter the 6-digit code from your email
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="newPassword" className="label-text">
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  {...register('newPassword', {
                    required: 'New password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className="input-field pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-red-600 text-xs mt-1">{errors.newPassword.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="label-text">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please confirm your new password',
                    validate: (value) => value === newPassword || 'Passwords do not match',
                  })}
                  className="input-field pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h4 className="text-sm font-medium text-amber-800 mb-1">Password Requirements</h4>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>• At least 6 characters long</li>
                <li>• Use a strong, unique password</li>
                <li>• don&apos;t reuse old passwords</li>
              </ul>
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
                    Resetting Password...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center space-y-2">
            <Link
              href="/admin/forgot-password"
              className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Request New Code
            </Link>
            <div className="text-xs text-gray-500">
              didn&apos;t receive the code? Check your spam folder or request a new one.
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
function ResetPasswordLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading reset password form...</p>
      </div>
    </div>
  );
}

// Main page component with Suspense wrapper
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
