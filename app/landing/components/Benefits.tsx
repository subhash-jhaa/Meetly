'use client';

import React from 'react';
import { BENEFIT_ITEMS, BENEFITS_SECTION } from '../data/landingData';
import { CardCornerAccents, Eyebrow, SectionSpacer } from './ui/primitives';

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

function BenefitCard({ title, desc, iconPath }: BenefitCardProps) {
  return (
    <div className="relative border border-[#242424] bg-[#171717] w-full flex flex-col justify-between p-6 min-h-[240px]">

      {/* Feature Card Icon */}
      <div className="relative w-12 h-12 bg-[#18181b] flex items-center justify-center">
        <svg className="w-5 h-5 text-[#fafafa]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          {ICON_MAP[iconPath]}
        </svg>

        {/* Icon Corner Accents (8 divs) */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => {
          const cls = {
            tl: 'left-0 top-0',
            tr: 'right-0 top-0',
            bl: 'left-0 bottom-0',
            br: 'right-0 bottom-0',
          }[pos];
          return (
            <React.Fragment key={pos}>
              <div className={`absolute ${cls} w-[1px] h-[3px] bg-white/20`} />
              <div className={`absolute ${cls} h-[1px] w-[3px] bg-white/20`} />
            </React.Fragment>
          );
        })}
      </div>

      {/* Text Container */}
      <div className="mt-8">
        {/* Title + Sub */}
        <div className="flex flex-col gap-2">
          {/* Title */}
          <div>
            <h4 className="text-[18px] md:text-[20px] font-normal tracking-tight text-[#fafafa] leading-snug">
              {title}
            </h4>
          </div>
          {/* Subtitle */}
          <div>
            <p className="text-[14px] text-[#a1a1aa] leading-relaxed max-w-[320px]">
              {desc}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Card Corner Accents (8 divs) */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => {
        const cls = {
          tl: '-left-[1px] -top-[1px]',
          tr: '-right-[1px] -top-[1px]',
          bl: '-left-[1px] -bottom-[1px]',
          br: '-right-[1px] -bottom-[1px]',
        }[pos];
        return (
          <React.Fragment key={`card-${pos}`}>
            <div className={`absolute ${cls} w-[1px] h-[3px] bg-white/20 pointer-events-none z-10`} />
            <div className={`absolute ${cls} h-[1px] w-[3px] bg-white/20 pointer-events-none z-10`} />
          </React.Fragment>
        );
      })}

    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Benefits() {
  return (
    <section className="w-full flex flex-col items-center bg-[#0a0a0a]" id="benefits">
      <div className="w-full max-w-[1200px] border-x border-white/12 relative">

        {/* SECTION HEADER */}
        <div className="px-[48px] py-[80px] flex flex-col gap-[20px]">
          <Eyebrow text={BENEFITS_SECTION.eyebrow} />
          <h2 className="text-[clamp(32px,5vw,56px)] font-normal tracking-[-0.05em] leading-[1.05] text-[#fafafa] max-w-3xl">
            {BENEFITS_SECTION.title}
          </h2>
        </div>

        {/* CARD GRID */}
        <div className="px-[48px] pb-24 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENEFIT_ITEMS.map((item, i) => (
              <BenefitCard key={i} index={i} {...item} />
            ))}
          </div>
        </div>

      </div>

      <SectionSpacer variant="grid" hasGap={false} />
    </section>
  );
}
