'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Corners, Logo } from '@/components/ui/primitives';

// ─── MOBILE MENU ─────────────────────────────────────────────────────────────
function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-10 h-10 border border-white/12 bg-surface flex items-center justify-center text-white/60 hover:text-white transition-colors"
      >
        <Corners size={5} color="bg-white/20" />
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-[72px] right-0 left-0 border border-white/12 bg-surface p-4 flex flex-col gap-2 z-[100] shadow-2xl">
          <Corners size={8} color="bg-white/20" />
          <a
            href="/meetings/history"
            className="flex items-center px-4 py-3 font-mono text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
            onClick={() => setOpen(false)}
          >
            History
          </a>
          <a
            href="/profile"
            className="flex items-center px-4 py-3 font-mono text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5"
            onClick={() => setOpen(false)}
          >
            Profile
          </a>
          <button
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: '/' });
            }}
            className="flex items-center px-4 py-3 font-mono text-[13px] text-red-400/60 hover:text-red-400 hover:bg-white/5 transition-colors text-left"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

// ─── APP NAVBAR ──────────────────────────────────────────────────────────────
// Shared navbar for all authenticated pages (dashboard, profile, history, etc.)
interface AppNavbarProps {
  /** Show a back link to dashboard instead of full nav (for subpages like profile, history) */
  backTo?: { label: string; href: string };
}

export function AppNavbar({ backTo }: AppNavbarProps) {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full flex justify-center bg-background/90 backdrop-blur-md pt-4 px-4">
      <div className="relative flex w-full max-w-[1200px] h-[64px] items-center justify-between border border-white/12 bg-surface px-6">
        <Corners />

        {/* LEFT — Logo */}
        <div className="flex items-center gap-2">
          <Link href="/#hero">
            <Logo className="h-7 w-7 cursor-pointer" />
          </Link>
        </div>

        {/* RIGHT — Navigation */}
        {backTo ? (
          /* Sub-page mode: show back link */
          <a
            href={backTo.href}
            className="font-mono text-[13px] text-white/40 hover:text-white transition-colors"
          >
            ← {backTo.label}
          </a>
        ) : (
          /* Dashboard mode: show full nav */
          <div className="flex items-center gap-3">
            <span className="font-mono text-[13px] text-white/40 hidden md:block">
              {session?.user?.name}
            </span>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/meetings/history"
                className="font-mono text-[13px] text-white/40 hover:text-white transition-colors"
              >
                History
              </a>
              <a
                href="/profile"
                className="relative border border-white/12 bg-surface px-4 py-2 font-mono text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Corners size={5} color="bg-white/20" />
                Profile
              </a>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="relative border border-white/12 bg-surface px-4 py-2 font-mono text-[13px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Corners size={5} color="bg-white/20" />
                Sign out
              </button>
            </div>

            {/* Mobile Nav Toggle */}
            <MobileMenu />
          </div>
        )}
      </div>
    </nav>
  );
}
