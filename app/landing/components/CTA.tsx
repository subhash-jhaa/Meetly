'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CTA_DATA, SITE } from '../data/landingData';
import { CrosshairCorners, Logo, CornerBox, SectionSpacer } from './ui/primitives';

export default function CTA() {
  const router = useRouter();
  const { headline, subheadline, dashboardImg } = CTA_DATA;

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0a] text-center pt-32 pb-0">

      {/* ─── BACKGROUND VISUAL ─── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg.png"
          alt="CTA background"
          fill
          className="object-cover opacity-30 grayscale"
        />
        {/* Vignette/Gradients to blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)]" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="section-container w-full border-x border-white/12 relative flex flex-col items-center px-6 pb-24">

          {/* Top Logo Mark */}
          <div className="mb-12 flex flex-col items-center">
            <Logo className="w-12 h-12" />
          </div>

          <h2 className="text-[clamp(36px,6vw,72px)] font-normal tracking-[-0.05em] leading-[1.05] text-white max-w-3xl">
            {headline}
          </h2>

          <p className="mt-8 text-[16px] md:text-[18px] text-white/50 max-w-xl leading-relaxed">
            {subheadline}
          </p>

          <div className="mt-12 flex gap-4">
            <button
              className="bg-white text-black px-8 py-3 rounded-[2px] font-mono text-[13px] hover:bg-white/90 transition-all active:scale-[0.98]"
              onClick={() => router.push(SITE.signUpUrl)}
            >
              {CTA_DATA.primaryCta}
            </button>
            {CTA_DATA.secondaryCta && (
              <button
                className="bg-white/5 text-white border border-white/10 px-8 py-3 rounded-[2px] font-mono text-[13px] hover:bg-white/10 transition-all backdrop-blur-md active:scale-[0.98]"
                onClick={() => router.push(SITE.dashboardUrl)}
              >
                {CTA_DATA.secondaryCta}
              </button>
            )}
          </div>
          <div className="mt-6 text-white/40 font-mono text-[11px] uppercase tracking-wider">
            {CTA_DATA.footnote}
          </div>

          {/* Central Mockup */}
          <div className="mt-8 w-full max-w-5xl mx-auto relative z-20">
            <div className="relative border border-white/12 overflow-hidden bg-[#0a0a0a]">

              <img
                src={dashboardImg}
                alt="Meetly Dashboard"
                className="w-full block"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            </div>

            {/* Box decoration */}
            <div className="absolute -inset-4 border border-white/5 rounded-2xl -z-10 pointer-events-none" />
            <CrosshairCorners color="bg-white/40" />
          </div>
        </div>
      </div>

      <SectionSpacer variant="grid" hasGap={false} />
    </section>
  );
}
