'use client';

import React from 'react';
import { HOW_IT_WORKS_SECTION, HOW_IT_WORKS_STEPS } from '../data/landingData';
import { SectionSpacer } from './ui/primitives';

// ─── STEP CARD ─────────────────────────────────────────────────────────────────
function StepCard({ step, title, desc, img }: (typeof HOW_IT_WORKS_STEPS)[number]) {
  return (
    <div className="step-card border border-white/12 p-[24px] flex flex-col gap-[12px] m-[-1px_-1px_0_0] bg-[#171717]">
      <div className="step-num font-mono text-[12px] text-[#fafafa]/40 border border-white/12 rounded-[4px] p-[4px_8px] w-fit">
        Step {step}
      </div>
      <div className="step-img w-full h-[280px] border border-white/12 bg-[#121212] flex items-center justify-center overflow-hidden relative after:absolute after:inset-0 after:bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.012)_3px,rgba(255,255,255,0.012)_4px)]">
        <img src={img} className="w-[80px] h-[80px] object-contain opacity-60" alt="" />
      </div>
      <h4 className="step-title text-[clamp(18px,2vw,26px)] font-normal tracking-[-0.03em]">{title}</h4>
      <p className="step-desc text-[14px] text-[#fafafa]/50 leading-[1.5]">{desc}</p>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function HowItWorks() {
  const { eyebrow, title } = HOW_IT_WORKS_SECTION;

  return (
    <section className="flex flex-col items-center w-full bg-[#0a0a0a]">
      <div className="section-container w-full">

        {/* SECTION HEADER */}
        <div className="feat-section p-[64px_32px_32px] flex flex-col gap-[32px] border-b border-white/12">
          <div className="section-eyebrow flex items-center gap-[8px] text-[13px] font-mono text-[#fafafa]/50">
            <span className="eyebrow-line w-[12px] h-[1px] bg-[#fafafa]/40" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="feat-heading text-[clamp(28px,4vw,46px)] font-normal tracking-[-0.05em] leading-[1.1]">
            {title}
          </h2>
        </div>

        {/* STEP CARDS GRID */}
        <div className="steps-grid grid grid-cols-1 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>
      </div>

      <SectionSpacer />
    </section>
  );
}
