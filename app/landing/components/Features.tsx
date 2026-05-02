'use client';

import React from 'react';
import { FEATURES_SECTION, FEATURE_BLOCKS } from '../data/landingData';
import { Eyebrow, SectionSpacer, CrosshairCorners, SectionCornerBrackets } from './ui/primitives';
import FeatureBlock from './FeatureBlock';
import FeaturesAccordion from './FeaturesAccordion';

// ─── INLINE DIAGONAL SPACER (Features-specific, with gap above) ───────────────
function FeaturesDiagonalSpacer() {
  return (
    <>
      {/* GAP */}
      <div className="w-full h-[96px] flex justify-center">
        <div className="w-full max-w-[1200px] h-full border-x border-white/12" />
      </div>
      {/* DIAGONAL SPACER BODY */}
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[1200px] h-[100px] border-x border-y border-white/12 relative overflow-hidden">
          <div className="absolute inset-0 diagonal-mask" />
          <CrosshairCorners />
        </div>
      </div>
    </>
  );
}

// ─── SECTION HEADER (below accordion) ────────────────────────────────────────
function FeaturesHeader() {
  return (
    <div className="w-full max-w-[1200px] border-x border-t border-white/12 p-[64px_48px] flex flex-col md:flex-row gap-[48px] md:items-end justify-between relative group">
      <SectionCornerBrackets showBottom={false} />
      <div className="flex-[0.7] flex flex-col gap-[24px]">
        <Eyebrow text={FEATURES_SECTION.eyebrow} variant="bar" />
        <h2 className="text-[clamp(32px,4vw,56px)] font-normal leading-[1.1] tracking-[-0.04em] text-[#fafafa] max-w-[700px]">
          {FEATURES_SECTION.title}
        </h2>
      </div>
      <div className="flex-[0.3] flex flex-col gap-[24px]">
        <p className="text-[16px] leading-[1.6] text-white/50">
          {FEATURES_SECTION.description}
        </p>
        <a
          href="#"
          className="w-fit px-[24px] py-[12px] border border-white/12 bg-[#fafafa] text-[#0a0a0a] text-[14px] font-medium rounded-[2px] hover:bg-white transition-colors active:scale-[0.98]"
        >
          {FEATURES_SECTION.cta}
        </a>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Features() {
  return (
    <section className="flex flex-col items-center w-full bg-[#0a0a0a]">

      {/* SIDE BORDER SPACER */}
      <div className="w-full max-w-[1200px] border-x border-white/12 h-40" />

      {/* STICKY SCROLL CONTAINER */}
      <div className="relative w-full max-w-[1200px] border-x border-t border-b border-white/12 group">
        <SectionCornerBrackets showBottom={false} />
        {FEATURE_BLOCKS.map((block, i) => (
          <FeatureBlock key={i} index={i} {...block} />
        ))}
      </div>

      <FeaturesDiagonalSpacer />

      <FeaturesHeader />

      <FeaturesAccordion />
    </section>
  );
}
