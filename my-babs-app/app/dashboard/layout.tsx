"use client";

import { SessionProvider } from "next-auth/react";

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}