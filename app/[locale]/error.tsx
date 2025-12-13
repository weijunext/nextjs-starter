'use client';

import { createAppRouterErrorHandler } from '@bugmail-js/next';
import { useEffect } from 'react';

// Initialize error reporter conditionally (outside component to avoid re-creation)
const apiKey = process.env.NEXT_PUBLIC_BUGMAIL_API_KEY;
const projectId = process.env.NEXT_PUBLIC_BUGMAIL_PROJECT_ID;

const reportError = (apiKey && projectId)
  ? createAppRouterErrorHandler({
    apiKey,
    projectId,
    baseUrl: 'https://api.bugmail.site',
    environment: process.env.NODE_ENV,
  })
  : null;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Report to BugMail if configured
    if (reportError) {
      reportError(error);
    }
    // Always log to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8 max-w-md">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">
            Something went wrong!
          </h2>
          <p className="text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
