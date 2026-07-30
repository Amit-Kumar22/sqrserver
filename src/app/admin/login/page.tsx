'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

interface LoginFormData {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, user, loading, initialized } = useAuth();
  const router = useRouter();
  
  console.log('Login page: user:', !!user, 'loading:', loading, 'initialized:', initialized);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  // If user is already authenticated and auth is initialized, redirect
  useEffect(() => {
    if (initialized && !loading && user) {
      console.log('Login page: User authenticated, redirecting to dashboard');
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

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    
    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        // The useEffect will handle the redirect when user state updates
        console.log('Login successful, waiting for redirect...');
        return;
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      // Check if this is a verification required error
      if (error && typeof error === 'object' && 'name' in error && error.name === 'VerificationRequiredError' && 'email' in error) {
        toast.error('Please verify your email address first');
        router.push(`/admin/verify-email?email=${encodeURIComponent(error.email as string)}`);
        return;
      }
      
      // For other errors, the AuthContext already shows the toast
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
            Admin Panel Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage projects and research content
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
                placeholder="admin@squareserver.com"
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
                  autoComplete="current-password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className="input-field pr-10"
                  placeholder="Enter your password"
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
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <Link
              href="/admin/forgot-password"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Forgot your password?
            </Link>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              don&apos;t have an account?{' '}
              <Link 
                href="/admin/register"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Create New Account
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