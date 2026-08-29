'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Eye as EyeIcon, EyeOff as EyeSlashIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function AdminRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const { user, loading, initialized } = useAuth();
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();
  const password = watch('password');

  const checkPasswordStrength = (password: string) => {
    if (!password) {
      setPasswordStrength(null);
      return;
    }
    
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?\":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
    
    const score = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length;
    
    if (score < 3) {
      setPasswordStrength('weak');
    } else if (score < 5) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  // If user is already authenticated and auth is initialized, redirect
  useEffect(() => {
    if (initialized && !loading && user) {
      router.replace('/admin/dashboard');
    }
  }, [initialized, loading, user, router]);

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

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.toLowerCase().trim(),
          password: data.password,
        }),
        credentials: 'include',
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Account created successfully! Please check your email for verification.');
        setTimeout(() => {
          router.push(`/admin/verify-email?email=${encodeURIComponent(data.email)}`);
        }, 1000);
      } else {
        toast.error(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
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
            Create New Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our platform to access admin features and manage content
          </p>
          <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-teal-700">
                  <strong>Important:</strong> After creating your account and verifying your email, 
                  an existing admin must approve your request before you can access the admin panel.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-teal-700">
                  <strong>Important:</strong> After creating your account and verifying your email, 
                  an existing admin must approve your request before you can access the admin panel.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card-compact">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name" className="label-text">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                {...register('name', {
                  required: 'Full name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
                className="input-field"
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

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
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="label-text">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                    onChange: (e) => checkPasswordStrength(e.target.value),
                  })}
                  className="input-field pr-10"
                  placeholder="Must include uppercase, lowercase, and number"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
              )}
              {password && passwordStrength && (
                <div className="mt-1">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-1 bg-gray-200 rounded">
                      <div
                        className={`h-full rounded transition-all duration-300 ${
                          passwordStrength === 'weak'
                            ? 'bg-red-500 w-1/3'
                            : passwordStrength === 'medium'
                            ? 'bg-yellow-500 w-2/3'
                            : 'bg-green-500 w-full'
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        passwordStrength === 'weak'
                          ? 'text-red-600'
                          : passwordStrength === 'medium'
                          ? 'text-yellow-600'
                          : 'text-green-600'
                      }`}
                    >
                      {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                    </span>
                  </div>
                </div>
              )}
              {!password && (
                <p className="text-xs text-gray-500 mt-1">
                  Use 8+ characters with a mix of uppercase, lowercase, numbers & symbols
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="label-text">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  className="input-field pr-10"
                  placeholder="Confirm your password"
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

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </>
                ) : (
                  'Create New Account'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                href="/admin/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign in
              </Link>
            </p>
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