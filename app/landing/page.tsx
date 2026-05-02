'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Benefits from './components/Benefits';
import Comparison from './components/Comparison';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import FAQ from './components/FAQ';
import { SectionSpacer, SectionCornerBrackets } from './components/ui/primitives';
import { FAQ_SECTION, SITE } from './data/landingData';

// ─── FAQ WRAPPER (lives in page.tsx since it spans two columns) ───────────────
function FAQSection() {
  const router = useRouter();
  const { eyebrow, title, subtext, cta } = FAQ_SECTION;

  return (
    <div className="w-full flex flex-col items-center" id="faq">
      <div className="section-container w-full pb-24 relative group">
        <SectionCornerBrackets />
        <div className="flex flex-col md:flex-row border-b border-white/12">
          {/* LEFT: META */}
          <div className="flex-1 p-[64px_32px] border-r border-white/12 border-b md:border-b-0">
            <div className="section-eyebrow flex items-center gap-[8px] text-[13px] font-mono text-[#fafafa]/50 mb-[16px]">
              <span className="eyebrow-line w-[12px] h-[1px] bg-[#fafafa]/40" />
              <span>{eyebrow}</span>
            </div>
            <h2 className="feat-heading max-w-[320px] text-[clamp(28px,4vw,46px)] font-normal tracking-[-0.05em] leading-[1.1]">
              {title.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < title.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
            <p className="text-[14px] text-[#fafafa]/40 mt-[16px] leading-[1.5]">
              {subtext.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < subtext.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
            <button
              className="btn-outline mt-[24px] rounded-[4px] border border-white/20 px-[16px] py-[8px] font-mono text-[13px] text-[#fafafa] transition-colors hover:border-white/40 bg-transparent"
              onClick={() => router.push(SITE.signUpUrl)}
            >
              {cta}
            </button>
          </div>

          {/* RIGHT: ACCORDION */}
          <div className="flex-[2] p-[32px]">
            <FAQ />
          </div>
        </div>
      </div>
      <SectionSpacer hasGap={false} />
    </div>
  );
}

// ─── LANDING PAGE ────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#fafafa] selection:bg-white selection:text-black min-h-screen flex flex-col items-center">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Comparison />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <CTA />
      <FlickeringFooter />
      {/* Refresh Trigger */}
    </div>
  );
}
