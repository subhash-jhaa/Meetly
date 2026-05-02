'use client';

import React from 'react';
import { COMPARISON_ROWS, COMPARISON_SECTION, SITE } from '../data/landingData';
import { SectionSpacer, CornerBox, SectionCornerBrackets } from './ui/primitives';

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
      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
        <svg className="w-3 h-3 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
  );

  const CrossIcon = () => (
    <div className="flex items-center justify-center">
      <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/30">
        <svg className="w-3 h-3 text-red-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
  );

  return (
    <tr className="border-b border-white/[0.08] last:border-0">
      <td className="p-5 text-left text-[14px] font-normal text-white/90 border-r border-white/[0.08] w-1/3">
        {feat}
      </td>
      <td className="p-5 text-center text-[14px] text-white/40 border-r border-white/[0.08] w-1/3">
        {isText ? other : <CrossIcon />}
      </td>
      <td className="p-5 text-center text-[14px] font-medium text-white bg-white/[0.03] w-1/3">
        {isText ? meetly : <CheckIcon />}
      </td>
    </tr>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Comparison() {
  const { title, customPlan } = COMPARISON_SECTION;

  return (
    <section className="flex flex-col items-center w-full bg-[#0a0a0a]">
      <div className="section-container w-full border-x border-white/12 relative group">
        <SectionCornerBrackets />

        {/* SECTION HEADER */}
        <div className="p-[80px_48px_48px] flex flex-col items-center gap-6">
          <h2 className="text-[clamp(32px,5vw,56px)] font-normal tracking-[-0.05em] leading-[1.05] text-[#fafafa] text-center max-w-3xl">
            {title}
          </h2>
        </div>

        {/* TABLE */}
        <div className="px-12 pb-24 w-full max-w-[720px] mx-auto">
          <CornerBox size="md" className="overflow-hidden bg-[#0d0d0d] border-none">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="p-6 border-r border-white/[0.08] w-1/3"></th>
                  <th className="p-6 text-center text-[18px] font-normal text-white/90 border-r border-white/[0.08] w-1/3">
                    Other tools
                  </th>
                  <th className="p-6 text-center text-[18px] font-normal text-white bg-white/[0.03] w-1/3">
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
          </CornerBox>

          {/* CUSTOM PLAN BANNER */}
          <div className="mt-8 w-full">
            <CornerBox size="md" className="bg-[#0d0d0d] p-6 flex items-center justify-between gap-8 border-none">
              <div className="max-w-[600px]">
                <h3 className="text-[20px] font-normal tracking-tight text-white mb-1">
                  {customPlan.heading}
                </h3>
                <p className="text-[14px] text-white/50 leading-relaxed">
                  {customPlan.description}
                </p>
              </div>
              <CornerBox size="sm" className="shrink-0 border-none">
                <button
                  className="px-6 py-2 bg-transparent text-white font-mono text-[12px] font-medium tracking-tight uppercase border-none hover:bg-white/5 transition-colors"
                  onClick={() => window.open(SITE.signUpUrl, '_blank')}
                >
                  Contact Sales
                </button>
              </CornerBox>
            </CornerBox>
          </div>
        </div>
      </div>

      <SectionSpacer variant="grid" hasGap={false} />
    </section>
  );
}
