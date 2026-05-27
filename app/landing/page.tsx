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
import { SectionSpacer, SectionCornerBrackets, CrosshairCorners } from '@/components/ui/primitives';
import { FAQ_SECTION, SITE } from './data/landingData';
import { useSession } from 'next-auth/react';  // ← ADD
import { useEffect } from 'react';


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
          <div className="flex-1 p-[48px_24px] md:p-[64px_32px] border-r border-white/12 border-b md:border-b-0">
            <div className="section-eyebrow flex items-center gap-[8px] text-[13px] font-mono text-foreground/50 mb-[16px]">
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
            <p className="text-[14px] text-foreground/40 mt-[16px] leading-[1.5]">
              {subtext.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < subtext.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
            <button
              className="relative btn-outline mt-[24px] rounded-[2px] border border-white/20 px-[16px] py-[8px] font-mono text-[13px] text-foreground transition-colors hover:border-white/40 bg-transparent"
              onClick={() => router.push(SITE.signUpUrl)}
            >
              <span className="relative z-10">{cta}</span>
              <CrosshairCorners color="bg-zinc-500" size={4} />
            </button>
          </div>

          {/* RIGHT: ACCORDION */}
          <div className="flex-[2] p-4 md:p-[32px]">
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
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect signed-in users straight to dashboard
  useEffect(() => {
    // Only redirect if there's no hash (e.g., coming from dashboard logo to #hero should stay)
    if (status === 'authenticated' && !window.location.hash) {
      router.replace('/dashboard');
    }
  }, [status, router]);

  // Show nothing while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground selection:bg-white selection:text-black min-h-screen relative">
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
