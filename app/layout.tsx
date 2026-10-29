import { AuthProvider } from "@/components/session-provider";
import "./globals.css";
import type { Metadata } from "next";
import {Figtree} from 'next/font/google'
import { Toaster } from "@/components/ui/toast";

const figtree = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Orbit — Your AI workspace",
  description: "Create helpful AI agents, connect your tools, and bring your workflows together in Orbit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }} className = {figtree.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
