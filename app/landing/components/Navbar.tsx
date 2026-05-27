'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { SITE } from '../data/landingData';
import { CrosshairCorners } from '@/components/ui/primitives';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isSignedIn = status === 'authenticated' && !!session?.user;

  return (
    <nav className="sticky top-0 z-50 w-full flex flex-col items-center bg-background/90 backdrop-blur-md pt-4 px-4">
      <div className="relative flex w-full max-w-[1200px] h-[64px] items-center justify-between border border-white/12 bg-surface px-[24px]">

        {/* LEFT — logo */}
        <div className="flex-1 flex justify-start">
          <Link href="#hero" className="flex items-center no-underline outline-none">
            <img
              src="https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png?width=512&height=512"
              alt="Meetly Logo"
              className="h-[28px] w-[28px] rounded-[4px] object-contain"
            />
          </Link>
        </div>

        {/* CENTER — nav links */}
        <div className="hidden md:flex flex-none items-center gap-[32px]">
          <Link href="#features" className="font-mono text-[13px] text-white/60 no-underline transition-colors hover:text-white">
            Features
          </Link>
          <Link href="#benefits" className="font-mono text-[13px] text-white/60 no-underline transition-colors hover:text-white">
            Benefits
          </Link>
          <Link href="#faq" className="font-mono text-[13px] text-white/60 no-underline transition-colors hover:text-white">
            FAQs
          </Link>
        </div>

        {/* RIGHT — auth buttons */}
        <div className="flex-1 flex items-center justify-end gap-[12px]">

          {/* Loading state — prevent flash */}
          {status === 'loading' && (
            <div className="h-[36px] w-[120px] bg-white/5 animate-pulse" />
          )}

          {/* SIGNED OUT — show Sign in + Start for free */}
          {status !== 'loading' && !isSignedIn && (
            <>
              <Link
                href={SITE.signInUrl}
                className="group relative flex items-center justify-center border border-white/12 bg-surface px-[16px] py-[8px] no-underline transition-colors hover:bg-white/5"
              >
                <span className="font-mono text-[13px] text-white">Sign in</span>
                <CrosshairCorners color="bg-zinc-500" size={4} />
              </Link>

              <Link
                href={SITE.signUpUrl}
                className="hidden md:flex relative items-center justify-center bg-[#fafafa] rounded-[2px] px-[16px] py-[8px] no-underline transition-opacity hover:opacity-90"
              >
                <span className="font-mono text-[13px] text-black">Start for free</span>
                <CrosshairCorners color="bg-zinc-500" size={4} />
              </Link>
            </>
          )}

          {/* SIGNED IN — show Dashboard button only */}
          {status !== 'loading' && isSignedIn && (
            <Link
              href="/dashboard"
              className="group relative flex items-center justify-center bg-[#fafafa] rounded-[2px] px-[16px] py-[8px] no-underline transition-opacity hover:opacity-90"
            >
              <span className="font-mono text-[13px] text-black">Dashboard →</span>
              <CrosshairCorners color="bg-zinc-500" size={4} />
            </Link>
          )}

        </div>

        {/* OUTER CORNER MARKERS */}
        <div className="absolute -left-[1px] -top-[1px] h-[7px] w-[1px] bg-white/10" />
        <div className="absolute -left-[1px] -top-[1px] h-[1px] w-[7px] bg-white/10" />
        <div className="absolute -right-[1px] -top-[1px] h-[7px] w-[1px] bg-white/10" />
        <div className="absolute -right-[1px] -top-[1px] h-[1px] w-[7px] bg-white/10" />
        <div className="absolute -left-[1px] -bottom-[1px] h-[7px] w-[1px] bg-white/10" />
        <div className="absolute -left-[1px] -bottom-[1px] h-[1px] w-[7px] bg-white/10" />
        <div className="absolute -right-[1px] -bottom-[1px] h-[7px] w-[1px] bg-white/10" />
        <div className="absolute -right-[1px] -bottom-[1px] h-[1px] w-[7px] bg-white/10" />
      </div>
    </nav>
  );
}