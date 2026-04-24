'use client';

import React from 'react';
import { CTA_DATA, SITE } from '../data/landingData';
import { SectionSpacer } from './ui/primitives';

export default function CTA() {
  const { headline, subheadline, primaryCta, secondaryCta, dashboardImg } = CTA_DATA;

  return (
    <section className="flex flex-col items-center w-full bg-[#0a0a0a]">
      <div className="section-container w-full">
        <div className="cta-section grid grid-cols-1 md:grid-cols-2 min-h-[420px] border border-white/12">

          {/* LEFT: COPY */}
          <div className="cta-left p-[48px_32px] flex flex-col justify-center gap-[24px] border-r border-white/12">
            <h2 className="cta-h2 text-[clamp(32px,4vw,58px)] font-normal tracking-[-0.05em] leading-none max-w-[500px]">
              {headline}
            </h2>
            <p className="cta-sub text-[15px] text-[#fafafa]/50 max-w-[360px] leading-[1.4]">
              {subheadline}
            </p>
            <div className="flex gap-[12px] flex-wrap">
              <button
                className="btn-white bg-[#fafafa] text-[#0a0a0a] border-none rounded-[4px] p-[11px_16px] text-[13px] font-mono cursor-pointer transition-opacity hover:opacity-85"
                onClick={() => window.open(SITE.demoUrl, '_blank')}
              >
                {primaryCta}
              </button>
              <button
                className="btn-ghost bg-transparent text-[#fafafa] border border-white/20 rounded-[4px] p-[11px_16px] text-[13px] font-mono cursor-pointer flex items-center gap-[6px] transition-colors hover:border-white/40"
                onClick={() => window.open(SITE.slackUrl, '_blank')}
              >
                {secondaryCta}
              </button>
            </div>
          </div>

          {/* RIGHT: DASHBOARD PREVIEW */}
          <div className="cta-right repeating-grid-subtle flex items-center justify-center relative overflow-hidden h-[300px] md:h-auto">
            <div className="cta-dashboard transform perspective-[1200px] scale-[0.68] rounded-[6px] overflow-hidden border border-white/12 max-w-[90%]">
              <img src={dashboardImg} alt="Dashboard preview" className="w-full block" />
            </div>
          </div>
        </div>
      </div>

      <SectionSpacer />
    </section>
  );
}
