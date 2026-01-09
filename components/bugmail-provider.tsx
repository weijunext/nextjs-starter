'use client';

import { BugMailProvider } from '@bugmail-js/next';

/**
 * SafeBugMailProvider - Optional error tracking wrapper
 * 
 * If BUGMAIL credentials are configured, wraps children with BugMailProvider
 * for automatic error tracking. If not configured, renders children directly.
 * 
 * To enable: Add NEXT_PUBLIC_BUGMAIL_API_KEY and NEXT_PUBLIC_BUGMAIL_PROJECT_ID
 * to your .env.local file. Get keys from https://bugmail.site
 */
export function SafeBugMailProvider({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_BUGMAIL_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_BUGMAIL_PROJECT_ID;

  // If credentials are not configured, just render children (no-op)
  if (!apiKey || !projectId) {
    return <>{children}</>;
  }

  // If configured, wrap with BugMail for automatic error tracking
  return (
    <BugMailProvider
      apiKey={apiKey}
      projectId={projectId}
      endpoint="https://api.bugmail.site"
    >
      {children}
    </BugMailProvider>
  );
}
