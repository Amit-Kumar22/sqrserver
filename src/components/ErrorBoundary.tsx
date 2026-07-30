'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Check if this is a ChunkLoadError
    const isChunkLoadError = error.name === 'ChunkLoadError' || 
                            error.message.includes('Loading chunk') ||
                            error.message.includes('timeout');
    
    if (isChunkLoadError) {
      // For chunk load errors, try to reload the page
      console.error('ChunkLoadError detected, reloading page:', error);
      window.location.reload();
      return { hasError: false };
    }

    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="max-w-md w-full bg-gray-900 shadow-lg rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-6">
              An error occurred while loading the application. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;