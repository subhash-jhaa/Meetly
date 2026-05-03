'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { HERO_DATA, SITE } from '../data/landingData';
import { SectionSpacer, CrosshairCorners, SectionCornerBrackets } from './ui/primitives';

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

// function PartnerLogoGrid() {
//   return (
//     <div className="grid grid-cols-3 bg-[#0a0a0a] border-t border-white/12 mt-auto">
//       {HERO_DATA.partnerLogos.map((url, i) => (
//         <div
//           key={i}
//           className={[
//             'logo-cell h-[80px] flex items-center justify-center overflow-hidden bg-[#0a0a0a]',
//             i % 3 !== 0 ? 'border-l border-white/12' : '',
//             i >= 3 ? 'border-t border-white/12' : '',
//           ].join(' ')}
//         >
//           {/* Logo hidden for now */}
//         </div>
//       ))}
//     </div>
//   );
// }

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Hero() {
  return (
    <section id="hero" className="w-full flex flex-col items-center bg-[#0a0a0a]">
      {/* TOP SPACER */}
      <div className="w-full max-w-[1200px] h-[48px] border-x border-b border-white/12 relative">
        <div className="absolute inset-0 diagonal-mask opacity-40" />
      </div>

      <div className="relative group flex flex-col w-full max-w-[1200px] border-x border-white/12">
        <SectionCornerBrackets />

        {/* HERO MAIN BODY - FULL WIDTH (UN-COMPRESSED) */}
        <div className="flex flex-col border-b border-white/12">

          {/* HEADING AREA - NOW FULL WIDTH */}
          <div className="p-[80px_48px_120px] md:p-[100px_64px_140px] flex flex-col gap-[32px] max-w-[1000px]">
            <YCBadge />
            <h1 className="text-[clamp(40px,6vw,84px)] font-normal leading-[1.05] tracking-[-0.05em] text-[#fafafa]">
              {HERO_DATA.headline}
            </h1>
            <p className="text-[18px] md:text-[21px] text-[#fafafa]/50 max-w-[700px] leading-[1.5]">
              {HERO_DATA.subheadline}
            </p>
            <HeroCTAs />
          </div>

          {/* <PartnerLogoGrid /> */}
        </div>
      </div>

      {/* BOTTOM SPACER */}
      <div className="w-full max-w-[1200px] h-[90px] border-x border-b border-white/12 relative">
        <div className="absolute inset-0 diagonal-mask" />
      </div>
    </section>
  );
}
