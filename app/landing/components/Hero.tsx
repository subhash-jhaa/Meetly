'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HERO_DATA, SITE } from '../data/landingData';
import { SectionSpacer, CrosshairCorners, SectionCornerBrackets } from '@/components/ui/primitives';

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function YCBadge() {
  return (
    <div className="flex items-center gap-[8px] border border-white/12 rounded-[4px] p-[4px_8px] w-fit bg-background">
      {/* <img
        
        alt="YC"
        className="w-[18px] h-[18px] rounded-[2px]"
      /> */}
      <span className="text-[11px] font-mono text-foreground/70 tracking-[-0.04em]">
        {HERO_DATA.badge.text}
      </span>
    </div>
  );
}

function HeroCTAs() {
  const router = useRouter();
  return (
    <div className="flex gap-[12px] items-center pt-[8px]">
      <button
        className="relative bg-[#fafafa] text-[#0a0a0a] border-none rounded-[2px] p-[11px_16px] text-[13px] font-mono cursor-pointer transition-opacity hover:opacity-85 active:scale-[0.98]"
        onClick={() => router.push(SITE.signUpUrl)}
      >
        <span className="relative z-10">{HERO_DATA.cta.primary}</span>
        <CrosshairCorners color="bg-zinc-500" size={4} />
      </button>
      <button
        className="relative bg-transparent text-foreground border border-white/20 rounded-[2px] p-[11px_16px] text-[13px] font-mono cursor-pointer flex items-center gap-[6px] transition-colors hover:border-white/40 active:scale-[0.98]"
        onClick={() => window.open(SITE.introVideoUrl, '_blank')}
      >
        <svg className="relative z-10 w-[15px] h-[15px] fill-[#fafafa]" viewBox="0 0 24 24">
          <path d="M5 3.83v15.34c0 .79.875 1.267 1.541.84l11.151-7.17c.612-.393.612-1.289 0-1.682L6.541 3.99C5.875 3.563 5 4.04 5 4.83z" />
        </svg>
        <span className="relative z-10">{HERO_DATA.cta.secondary}</span>
        <CrosshairCorners color="bg-zinc-500" size={4} />
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section id="hero" className="w-full flex flex-col items-center bg-background min-h-screen">

      {/* TOP SPACER */}
      <div className="w-full max-w-[1200px] h-[48px] border-x border-b border-white/12 relative">
        <div className="absolute inset-0 diagonal-mask" />
      </div>

      <div className="relative group flex flex-col w-full max-w-[1200px] border-x border-b border-white/12 flex-1 overflow-hidden">

        {/* CINEMATIC BACKGROUND VIDEO */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* DARK OVERLAY FOR TEXT LEGIBILITY */}
        <div className="absolute inset-0 bg-background/65 z-[1]" />

        <div className="relative z-10">
          <SectionCornerBrackets />
        </div>

        {/* HERO MAIN BODY */}
        <div className="flex flex-col relative z-10 flex-1 justify-center">

          {/* HEADING AREA */}
          <div className="p-[60px_24px_100px] md:p-[100px_64px_140px] flex flex-col gap-[32px] max-w-[1000px]">
            <YCBadge />
            <h1 className="text-[clamp(40px,6vw,84px)] font-normal leading-[1.05] tracking-[-0.05em] text-foreground drop-shadow-xl">
              {HERO_DATA.headline}
            </h1>
            <p className="text-[18px] md:text-[21px] text-foreground/80 max-w-[700px] leading-[1.5] drop-shadow-md">
              {HERO_DATA.subheadline}
            </p>
            <HeroCTAs />
          </div>

        </div>
      </div>

      {/* BOTTOM SPACER */}
      <div className="w-full max-w-[1200px] h-[90px] border-x border-b border-white/12 relative">
        <div className="absolute inset-0 diagonal-mask" />
      </div>
    </section>
  );
}
