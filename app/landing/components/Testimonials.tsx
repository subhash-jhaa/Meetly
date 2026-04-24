'use client';

import React from 'react';
import { TESTIMONIALS_SECTION } from '../data/landingData';
import { SectionSpacer } from './ui/primitives';

// ─── METRIC CELL ─────────────────────────────────────────────────────────────
function MetricCell({ num, label }: { num: string; label: string }) {
  return (
    <div className="metric-cell border border-[#d4d4d4]/15 p-[24px] flex flex-col gap-[6px] m-[-1px_-1px_0_0]">
      <span className="metric-num font-mono text-[32px] font-normal tracking-[-0.03em] text-[#fafafa]">
        {num}
      </span>
      <span className="metric-label font-mono text-[11px] text-[#fafafa]/40 tracking-[-0.04em] uppercase">
        {label}
      </span>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Testimonials() {
  const { eyebrow, title, quote, author, metrics } = TESTIMONIALS_SECTION;

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

        {/* TESTIMONIAL CARD */}
        <div className="border border-[#d4d4d4]/15 bg-[#171615] flex flex-col">
          <div className="testimonial-wrap p-[48px_32px] flex flex-col md:flex-row gap-[24px]">
            <div className="quote-text text-[clamp(22px,2.5vw,32px)] font-normal tracking-[-0.03em] leading-[1.2] text-[#fafafa] flex-[2]">
              {quote}
            </div>
            <div className="quote-meta flex-1 flex flex-col justify-end gap-[4px] pt-[48px] md:pt-0">
              <p className="quote-name font-mono text-[12px] text-[#fafafa] tracking-[-0.04em]">
                {author.name}
              </p>
              <p className="quote-company font-mono text-[11px] text-[#fafafa]/40 tracking-[-0.04em]">
                {author.company}
              </p>
            </div>
          </div>

          {/* METRICS ROW */}
          <div className="metrics-row grid grid-cols-1 md:grid-cols-3 border-t border-[#d4d4d4]/15">
            {metrics.map((m, i) => (
              <MetricCell key={i} {...m} />
            ))}
          </div>
        </div>
      </div>

      <SectionSpacer />
    </section>
  );
}
