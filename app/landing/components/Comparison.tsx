'use client';

import React from 'react';
import { COMPARISON_ROWS, COMPARISON_SECTION, SITE } from '../data/landingData';
import { SectionSpacer, CornerBox, SectionCornerBrackets, CrosshairCorners } from '@/components/ui/primitives';

// ─── TABLE ROW ────────────────────────────────────────────────────────────────
function ComparisonRow({
  feat,
  other,
  meetly,
  isText,
}: {
  feat: string;
  other?: string;
  meetly?: string;
  isText: boolean;
}) {
  const CheckIcon = () => (
    <div className="flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)]">
        <svg className="w-3 h-3 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
  );

  const CrossIcon = () => (
    <div className="flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]">
        <svg className="w-3 h-3 text-red-500/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
  );

  return (
    <tr className="border-b border-white/[0.08] last:border-0 transition-colors hover:bg-white/[0.02]">
      <td className="p-5 text-left text-[14px] font-medium text-white/90 border-r border-white/[0.08] w-1/3">
        {feat}
      </td>
      <td className="p-5 text-center text-[14px] text-white/40 border-r border-white/[0.08] w-1/3">
        {isText ? other : <CrossIcon />}
      </td>
      <td className="p-5 text-center text-[14px] font-medium text-white bg-white/[0.03] w-1/3">
        {isText ? (meetly || <CheckIcon />) : <CheckIcon />}
      </td>
    </tr>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Comparison() {
  const { title, customPlan, eyebrow } = COMPARISON_SECTION;

  return (
    <section className="flex flex-col items-center w-full bg-background">
      <div className="section-container w-full border-x border-white/12 relative group">
        <SectionCornerBrackets />

        {/* SECTION HEADER */}
        <div className="p-[60px_24px] md:p-[100px_48px_60px] flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[1px] h-3 bg-white/40" />
            <span className="text-[12px] font-mono text-white/40 tracking-wider uppercase">{eyebrow}</span>
          </div>
          <h2 className="text-[clamp(36px,6vw,64px)] font-normal tracking-[-0.03em] leading-[1.1] text-foreground text-center max-w-4xl">
            {title}
          </h2>
        </div>

        {/* TABLE */}
        <div className="px-4 md:px-12 pb-24 w-full max-w-[900px] mx-auto">
          <div className="overflow-x-auto pb-4 md:pb-0">
            <div className="min-w-[600px] md:min-w-0 bg-[#0d0d0d]/40 rounded-[4px] border border-white/[0.08] backdrop-blur-sm shadow-2xl relative">
              {/* Standard crosshair corners in grey-500 */}
              <CrosshairCorners size={8} color="bg-zinc-500" />
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.12] bg-white/[0.02]">
                    <th className="p-6 border-r border-white/[0.08] w-1/3"></th>
                    <th className="p-6 text-center text-[16px] md:text-[18px] font-medium text-white/90 border-r border-white/[0.08] w-1/3">
                      Other tools
                    </th>
                    <th className="p-6 text-center text-[16px] md:text-[18px] font-medium text-white bg-white/[0.04] w-1/3">
                      Meetly
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <ComparisonRow key={i} {...row} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CUSTOM PLAN BANNER */}
          <div className="mt-12 w-full">
            <div className="bg-[#0d0d0d]/60 rounded-[4px] border border-white/[0.08] p-8 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-sm shadow-xl group/banner hover:border-white/20 transition-all duration-500 relative">
              {/* Standard crosshair corners in grey-500 */}
              <CrosshairCorners size={6} color="bg-zinc-500/60" />

              <div className="max-w-[500px] text-center md:text-left">
                <h3 className="text-[22px] font-normal tracking-tight text-white mb-2">
                  {customPlan.heading}
                </h3>
                <p className="text-[15px] text-white/50 leading-relaxed">
                  {customPlan.description}
                </p>
              </div>
              <button
                className="px-8 py-3 bg-transparent text-white font-mono text-[13px] font-medium tracking-tight uppercase border border-white/20 rounded-[2px] hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.98] whitespace-nowrap relative"
                onClick={() => window.open(SITE.signUpUrl, '_blank')}
              >
                <span className="relative z-10">{customPlan.cta}</span>
                <CrosshairCorners color="bg-zinc-500" size={4} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <SectionSpacer variant="grid" hasGap={false} />
    </section>
  );
}
