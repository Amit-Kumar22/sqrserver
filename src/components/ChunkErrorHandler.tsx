'use client';

import { useEffect } from 'react';

const ChunkErrorHandler = () => {
  useEffect(() => {
    // Handle unhandled promise rejections that might be chunk loading errors
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      
      // Check if this is a chunk loading error
      if (
        error &&
        (error.name === 'ChunkLoadError' ||
         (error.message && error.message.includes('Loading chunk')) ||
         (error.message && error.message.includes('timeout')))
      ) {
        console.warn('Chunk load error detected, reloading page:', error);
        event.preventDefault();
        window.location.reload();
      }
    };

    // Also handle regular errors
    const handleError = (event: ErrorEvent) => {
      const error = event.error;
      
      if (
        error &&
        (error.name === 'ChunkLoadError' ||
         (error.message && error.message.includes('Loading chunk')) ||
         (error.message && error.message.includes('timeout')))
      ) {
        console.warn('Chunk load error detected in error handler, reloading page:', error);
        window.location.reload();
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return null;
};

export default ChunkErrorHandler;