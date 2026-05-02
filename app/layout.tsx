import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { NeonAuthUIProvider, UserButton } from "@neondatabase/auth/react";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Planner",
  description: "Plan and manage events easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable}
          min-h-screen flex flex-col bg-background text-foreground
        `}
      >

        <NeonAuthUIProvider authClient={authClient as any}>

          {/* ================= HEADER ================= */}
          <header className="sticky top-0 z-50 bg-background py-4">

            <div className="mx-auto max-w-6xl flex items-center justify-between px-6">

              {/* Logo */}
              <Link
                href="/"
                className="text-xl font-semibold tracking-tight"
              >
                Event Planner
              </Link>

              {/* Nav */}
              <nav className="flex items-center gap-4">

                <Link
                  href="/dashboard"
                  className="text-sm text-muted hover:opacity-70 transition"
                >
                  Dashboard
                </Link>

                <UserButton size="icon" />

              </nav>
            </div>
          </header>

          {/* ================= MAIN ================= */}
          <main className="mx-auto max-w-6xl w-full flex-1 px-6 py-10">
            {children}
          </main>

          {/* ================= FOOTER ================= */}
          <footer className="text-center text-sm text-muted py-6">
            © {new Date().getFullYear()} Event Planner
          </footer>

        </NeonAuthUIProvider>

      </body>
    </html>
  );
}