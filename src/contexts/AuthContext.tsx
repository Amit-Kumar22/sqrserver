'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  initialized: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

// Custom error class for verification required
class VerificationRequiredError extends Error {
  email: string;
  
  constructor(message: string, email: string) {
    super(message);
    this.name = 'VerificationRequiredError';
    this.email = email;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const checkAuth = async () => {
    try {
      console.log('AuthContext: Starting auth check...');
      
      const response = await fetch('/api/auth/verify', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('AuthContext: User authenticated:', data.user);
        setUser(data.user);
        
        // Update localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
      } else {
        console.log('AuthContext: User not authenticated');
        setUser(null);
        
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error('AuthContext: Auth check failed:', error);
      setUser(null);
      
      // Clear localStorage on error
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    } finally {
      console.log('AuthContext: Auth check completed');
      setLoading(false);
      setInitialized(true);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        
        // Store user in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        
        toast.success('Login successful!');
        return true;
      } else if (response.status === 403 && data.requiresVerification) {
        // Handle verification required error specifically
        throw new VerificationRequiredError(data.error, data.email);
      } else {
        toast.error(data.error || 'Invalid credentials');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof VerificationRequiredError) {
        throw error; // Re-throw verification errors to be handled by the component
      }
      
      toast.error('Login failed. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      setUser(null);
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
      
      toast.success('Logged out successfully');
      
      // Force redirect to login
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  useEffect(() => {
    // Initialize auth state from localStorage first to prevent flash
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          console.log('AuthContext: Restoring user from localStorage:', parsedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error('AuthContext: Failed to parse saved user:', error);
          localStorage.removeItem('user');
        }
      }
    }
    
    // Then verify with server
    console.log('AuthContext: Checking auth on mount...');
    checkAuth();
  }, []); // Empty dependency array - only run once on mount

  const value = {
    user,
    loading,
    initialized,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}