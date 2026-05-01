'use client';

import React from 'react';
import { COMPARISON_ROWS, COMPARISON_SECTION, SITE } from '../data/landingData';
import { SectionSpacer } from './ui/primitives';

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
    <svg className="check-svg w-[20px] h-[20px] inline-block text-[#fafafa]" viewBox="0 0 24 24">
      <path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
  const CrossIcon = () => (
    <svg className="cross-svg w-[20px] h-[20px] inline-block opacity-40 text-[#fafafa]/30" viewBox="0 0 24 24">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );

  return (
    <tr className="even:bg-white/[0.02]">
      <td className="feat-col p-[12px_24px] text-left text-[#fafafa]/60 border border-white/08">{feat}</td>
      <td className="p-[12px_24px] text-center border border-white/08">
        {isText ? <span className="text-[#fafafa]/40 text-[14px]">{other}</span> : <CrossIcon />}
      </td>
      <td className="ressl-col p-[12px_24px] text-center border border-white/08 bg-white/[0.03]">
        {isText ? <span className="text-[#fafafa] text-[14px]">{meetly}</span> : <CheckIcon />}
      </td>
    </tr>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Comparison() {
  const { eyebrow, title, customPlan } = COMPARISON_SECTION;

  return (
    <section className="flex flex-col items-center w-full bg-[#0a0a0a]">
      <div className="section-container w-full">

        {/* SECTION HEADER */}
        <div className="feat-section p-[64px_32px_32px] flex flex-col gap-[32px]">
          <div className="section-eyebrow flex items-center gap-[8px] text-[13px] font-mono text-[#fafafa]/50">
            <span className="eyebrow-line w-[12px] h-[1px] bg-[#fafafa]/40" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="feat-heading text-center max-w-full text-[clamp(28px,4vw,46px)] font-normal tracking-[-0.05em] leading-[1.1]">
            {title}
          </h2>
        </div>

        {/* TABLE */}
        <div className="p-[0_32px_48px] max-w-[720px] mx-auto">
          <table className="comp-table w-full border-collapse bg-[#171717] border border-white/12">
            <thead>
              <tr>
                <th className="feat-col p-[32px] text-left text-[15px] font-normal text-[#fafafa]/60 border border-white/12 bg-[#0a0a0a]" />
                <th className="p-[32px] text-center text-[15px] font-normal text-[#fafafa]/50 border border-white/12 bg-[#0a0a0a]">
                  Other tools
                </th>
                <th className="ressl-col p-[32px] text-center text-[20px] font-normal tracking-[-0.03em] border border-white/12 bg-[#1a1a1b] text-[#fafafa]">
                  Meetly
                </th>
              </tr>
            </thead>
            <tbody className="text-[15px]">
              {COMPARISON_ROWS.map((row, i) => (
                <ComparisonRow key={i} {...row} />
              ))}
            </tbody>
          </table>

          {/* CUSTOM PLAN BANNER */}
          <div className="border border-[#d4d4d4]/15 bg-[#171717] p-[24px] flex items-center justify-between flex-wrap gap-[16px]">
            <div>
              <p className="text-[18px] font-normal tracking-[-0.03em] mb-[4px]">{customPlan.heading}</p>
              <p className="text-[14px] text-[#fafafa]/50">{customPlan.description}</p>
            </div>
            <button
              className="btn-outline rounded-[4px] border border-white/20 px-[16px] py-[8px] font-mono text-[13px] text-[#fafafa] transition-colors hover:border-white/40 bg-transparent"
              onClick={() => window.open(SITE.signUpUrl, '_blank')}
            >
              {customPlan.cta}
            </button>
          </div>
        </div>
      </div>

      <SectionSpacer variant="diagonal" gapHeight="h-[48px] md:h-[64px]" />
    </section>
  );
}
