'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HERO_DATA, SITE } from '../data/landingData';
import { SectionSpacer } from './ui/primitives';

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function YCBadge() {
  return (
    <div className="flex items-center gap-[8px] border border-white/12 rounded-[4px] p-[4px_8px] w-fit bg-[#0a0a0a]">
      <img
        src={HERO_DATA.badge.logo}
        alt="YC"
        className="w-[18px] h-[18px] rounded-[2px]"
      />
      <span className="text-[11px] font-mono text-[#fafafa]/70 tracking-[-0.04em]">
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
        className="bg-[#fafafa] text-[#0a0a0a] border-none rounded-[2px] p-[11px_16px] text-[13px] font-mono cursor-pointer transition-opacity hover:opacity-85 active:scale-[0.98]"
        onClick={() => router.push(SITE.signUpUrl)}
      >
        {HERO_DATA.cta.primary}
      </button>
      <button
        className="bg-transparent text-[#fafafa] border border-white/20 rounded-[2px] p-[11px_16px] text-[13px] font-mono cursor-pointer flex items-center gap-[6px] transition-colors hover:border-white/40 active:scale-[0.98]"
        onClick={() => window.open(SITE.introVideoUrl, '_blank')}
      >
        <svg className="w-[15px] h-[15px] fill-[#fafafa]" viewBox="0 0 24 24">
          <path d="M5 3.83v15.34c0 .79.875 1.267 1.541.84l11.151-7.17c.612-.393.612-1.289 0-1.682L6.541 3.99C5.875 3.563 5 4.04 5 4.83z" />
        </svg>
        {HERO_DATA.cta.secondary}
      </button>
    </div>
  );
}

function PartnerLogoGrid() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 bg-[#0a0a0a] border-b border-white/12">
      {HERO_DATA.partnerLogos.map((url, i) => (
        <div
          key={i}
          className={[
            'logo-cell h-[80px] flex items-center justify-center overflow-hidden bg-[#0a0a0a]',
            i % 6 !== 0 ? 'md:border-l border-white/12' : '',
            i % 3 !== 0 ? 'border-l md:border-l-0 border-white/12' : '',
            i >= 3 ? 'border-t md:border-t-0 border-white/12' : '',
          ].join(' ')}
        >
          <img
            src={url}
            alt="Partner"
            className="max-w-[70%] max-h-[45%] object-contain opacity-60 brightness-[10]"
          />
        </div>
      ))}
    </div>
  );
}

// ─── INLINE SPACER (Hero-specific — no max-width centering) ──────────────────
function HeroBottomSpacer() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[1200px] h-[90px] border-x border-white/12 relative">
        <div className="absolute inset-0 diagonal-mask" />
        {/* Crosshair corners */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => {
          const cls = {
            tl: 'left-0 top-0 -translate-x-1/2 -translate-y-1/2',
            tr: 'right-0 top-0 translate-x-1/2 -translate-y-1/2',
            bl: 'left-0 bottom-0 -translate-x-1/2 translate-y-1/2',
            br: 'right-0 bottom-0 translate-x-1/2 translate-y-1/2',
          }[pos];
          return (
            <div
              key={pos}
              className={`absolute flex items-center justify-center pointer-events-none ${cls}`}
            >
              <div className="absolute h-[11px] w-[1px] bg-white/40" />
              <div className="absolute h-[1px] w-[11px] bg-white/40" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section className="section-container overflow-hidden flex flex-col">

      {/* TOP SPACER GRID */}
      <div id="hero" className="h-[48px] border-b border-white/12 relative overflow-hidden">
        <div className="absolute inset-0 diagonal-mask opacity-40" />
      </div>

      {/* HERO MAIN BODY - 2 COLUMN GRID */}
      <div id="hero" className="flex flex-col md:flex-row border-b border-white/12">

        {/* LEFT COLUMN */}
        <div className="flex-[0.55] flex flex-col border-r border-white/12">

          {/* HEADING AREA */}
          <div className="p-[64px_32px_80px] flex flex-col gap-[24px]">
            <YCBadge />
            <h1 className="text-[clamp(36px,5vw,62px)] font-normal leading-none tracking-[-0.05em] text-[#fafafa]">
              {HERO_DATA.headline}
            </h1>
            <p className="text-[16px] text-[#fafafa]/50 max-w-[400px] leading-[1.4]">
              {HERO_DATA.subheadline}
            </p>
            <HeroCTAs />
          </div>
        </div>

        {/* RIGHT COLUMN: VIDEO (FULL FRAME) */}
        <div className="flex-1 overflow-hidden relative min-h-[400px] md:min-h-0 bg-[#0a0a0a]">
          <video
            src={HERO_DATA.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* PARTNER LOGOS - FULL WIDTH BELOW */}
      <PartnerLogoGrid />

      <HeroBottomSpacer />
    </section>
  );
}
