'use client';

import React from 'react';
import Link from 'next/link';
import { SITE } from '../data/landingData';
import { Logo, SectionCornerBrackets } from './ui/primitives';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] w-full flex flex-col items-center bg-[#0a0a0a]/90 backdrop-blur-md pt-4 px-4">
      {/* CONTAINER */}
      <div className="relative flex w-full max-w-[1200px] h-[64px] items-center justify-between border border-white/12 bg-[#0a0908] px-[24px]">

        {/* LEFT */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="flex items-center no-underline outline-none">
            <Logo className="h-[28px] w-[28px]" />
          </Link>
        </div>

        {/* CENTER */}
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

        {/* RIGHT */}
        <div className="flex-1 flex items-center justify-end gap-[12px]">
          {/* SECONDARY BUTTON: SIGN IN */}
          <Link
            href={SITE.signInUrl}
            className="group relative flex items-center justify-center border border-white/12 rounded-[2px] bg-[#0a0908] px-[16px] py-[8px] no-underline transition-colors hover:bg-white/5"
          >
            <span className="font-mono text-[13px] text-white">Sign in</span>

            {/* INNER CORNER MARKERS (8 divs - bg-white/20) */}
            <div className="absolute -left-[1px] -top-[1px] h-[5px] w-[1px] bg-white/20 transition-colors group-hover:bg-white/40" />
            <div className="absolute -left-[1px] -top-[1px] h-[1px] w-[5px] bg-white/20 transition-colors group-hover:bg-white/40" />

            <div className="absolute -right-[1px] -top-[1px] h-[5px] w-[1px] bg-white/20 transition-colors group-hover:bg-white/40" />
            <div className="absolute -right-[1px] -top-[1px] h-[1px] w-[5px] bg-white/20 transition-colors group-hover:bg-white/40" />

            <div className="absolute -left-[1px] -bottom-[1px] h-[5px] w-[1px] bg-white/20 transition-colors group-hover:bg-white/40" />
            <div className="absolute -left-[1px] -bottom-[1px] h-[1px] w-[5px] bg-white/20 transition-colors group-hover:bg-white/40" />

            <div className="absolute -right-[1px] -bottom-[1px] h-[5px] w-[1px] bg-white/20 transition-colors group-hover:bg-white/40" />
            <div className="absolute -right-[1px] -bottom-[1px] h-[1px] w-[5px] bg-white/20 transition-colors group-hover:bg-white/40" />
          </Link>

          {/* DEFAULT BUTTON: START WITH FREE */}
          <Link
            href={SITE.signUpUrl}
            className="flex items-center justify-center bg-[#fafafa] rounded-[2px] px-[16px] py-[8px] no-underline transition-opacity hover:opacity-90"
          >
            <span className="font-mono text-[13px] text-black">Start for free</span>
          </Link>
        </div>

        <SectionCornerBrackets />

      </div>
    </nav>
  );
}
