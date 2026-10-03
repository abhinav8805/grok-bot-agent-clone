'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Provider from '@/app/provider';

/**
 * Wraps the app with next-auth's SessionProvider and the custom Provider
 * (which syncs the authenticated user to the database).
 *
 * @param children - The nested React nodes to render.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>
    <Provider>
      {children}
    </Provider>
    </SessionProvider>;
}
