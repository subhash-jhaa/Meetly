'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-[100] w-full flex flex-col items-center bg-[#0a0a0a]/90 backdrop-blur-md pt-4 px-4">
      {/* CONTAINER */}
      <div className="relative flex w-full max-w-[1200px] h-[64px] items-center justify-between border border-[#242424] bg-[#0a0908] px-[24px]">
        
        {/* LEFT */}
        <div className="flex-1 flex justify-start">
          <Link href="#hero" className="flex items-center no-underline outline-none">
            <img
              src="https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png?width=512&height=512"
              alt="Meetly Logo"
              className="h-[28px] w-[28px] rounded-[4px] object-contain"
            />
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
          {/* SECONADRY BUTTON: JOIN OUR SLACK */}
          <a
            href="https://join.slack.com/t/resslaiaiagen-czp2639/shared_invite/zt-2vpd5vabp-D9LpsJZRiweb7_OFnvIvhA"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center border border-[#242424] bg-[#0a0908] px-[16px] py-[8px] no-underline transition-colors hover:bg-white/5"
          >
            <span className="font-mono text-[13px] text-white">Join Our Slack</span>
            
            {/* INNER CORNER MARKERS (8 divs - bg-white/20) */}
            <div className="absolute -left-[1px] -top-[1px] h-[5px] w-[1px] bg-white/20 transition-colors group-hover:bg-white/40" />
            <div className="absolute -left-[1px] -top-[1px] h-[1px] w-[5px] bg-white/20 transition-colors group-hover:bg-white/40" />
            
            <div className="absolute -right-[1px] -top-[1px] h-[5px] w-[1px] bg-white/20 transition-colors group-hover:bg-white/40" />
            <div className="absolute -right-[1px] -top-[1px] h-[1px] w-[5px] bg-white/20 transition-colors group-hover:bg-white/40" />
            
            <div className="absolute -left-[1px] -bottom-[1px] h-[5px] w-[1px] bg-white/20 transition-colors group-hover:bg-white/40" />
            <div className="absolute -left-[1px] -bottom-[1px] h-[1px] w-[5px] bg-white/20 transition-colors group-hover:bg-white/40" />
            
            <div className="absolute -right-[1px] -bottom-[1px] h-[5px] w-[1px] bg-white/20 transition-colors group-hover:bg-white/40" />
            <div className="absolute -right-[1px] -bottom-[1px] h-[1px] w-[5px] bg-white/20 transition-colors group-hover:bg-white/40" />
          </a>

          {/* DEFAULT BUTTON: BOOK A DEMO */}
          <a
            href="https://calendly.com/arushi-gandhi/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-[#fafafa] rounded-[2px] px-[16px] py-[8px] no-underline transition-opacity hover:opacity-90"
          >
            <span className="font-mono text-[13px] text-black">Book A Demo</span>
          </a>
        </div>

        {/* OUTER CORNER MARKERS (8 divs - bg-white/10) */}
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
