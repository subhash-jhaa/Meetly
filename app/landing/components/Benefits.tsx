'use client';

import React from 'react';
import { BENEFIT_ITEMS, BENEFITS_SECTION } from '../data/landingData';
import { CardCornerAccents, SectionSpacer } from './ui/primitives';

// ─── ICON MAP ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  'arrow-ne': <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />,
  chevrons: <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />,
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  upload: <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />,
  activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
};

// ─── BENEFIT CARD ─────────────────────────────────────────────────────────────
interface BenefitCardProps {
  title: string;
  desc: string;
  iconPath: string;
  index: number;
}

function BenefitCard({ title, desc, iconPath, index }: BenefitCardProps) {
  return (
    <div
      className={[
        'group p-8 md:p-10 border-b border-white/12 bg-[#171717] relative flex flex-col min-h-[280px]',
        index % 3 !== 2 ? 'md:border-r border-white/12' : '',
      ].join(' ')}
    >
      {/* Card corner markers */}
      {(['left-0 top-0', 'right-0 top-0', 'left-0 bottom-0', 'right-0 bottom-0'] as const).map((pos) => (
        <div key={pos} className={`absolute ${pos} flex items-center justify-center pointer-events-none`}>
          <div className="absolute h-[7px] w-[1px] bg-white/10" />
          <div className="absolute h-[1px] w-[7px] bg-white/10" />
        </div>
      ))}

      {/* Boxed icon */}
      <div className="w-10 h-10 bg-[#18181b] border border-white/5 rounded-[2px] flex items-center justify-center relative mb-auto">
        <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          {ICON_MAP[iconPath]}
        </svg>
        <CardCornerAccents />
      </div>

      {/* Text */}
      <div className="mt-8">
        <h4 className="text-[18px] font-normal tracking-tight text-white mb-3">{title}</h4>
        <p className="text-[14px] leading-relaxed text-white/40">{desc}</p>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Benefits() {
  return (
    <section className="w-full flex flex-col items-center bg-[#0a0a0a]" id="benefits">
      <div className="w-full max-w-[1200px] border-x border-white/12 relative">

        {/* SECTION HEADER */}
        <div className="p-12 md:p-16 border-b border-white/12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-3 w-[2px] bg-white/30" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
              {BENEFITS_SECTION.eyebrow}
            </span>
          </div>
          <h2 className="text-[32px] md:text-[48px] font-normal leading-[1.1] tracking-tight text-white max-w-3xl">
            {BENEFITS_SECTION.title}
          </h2>
        </div>

        {/* CARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {BENEFIT_ITEMS.map((item, i) => (
            <BenefitCard key={i} index={i} {...item} />
          ))}
        </div>
      </div>

      <SectionSpacer variant="grid" />
    </section>
  );
}
