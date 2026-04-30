'use client';

import React from 'react';
import { HOW_IT_WORKS_SECTION, HOW_IT_WORKS_STEPS } from '../data/landingData';
import { CardCornerAccents, Eyebrow, SectionSpacer } from './ui/primitives';

// ── Icons ─────────────────────────────────────────────────────────────────────
const ICONS: Record<number, React.ReactNode> = {
  1: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
    </svg>
  ),
  2: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  3: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
    </svg>
  ),
  4: (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  ),
};

function StepIcon({ step }: { step: number }) {
  return (
    <div className="w-8 h-8 rounded-[4px] border border-white/12 bg-white/[0.04] flex items-center justify-center text-white/50 shrink-0">
      {ICONS[step]}
    </div>
  );
}

// ── Compact visual mockups ────────────────────────────────────────────────────
function LinkMockup() {
  return (
    <div className="mt-auto pt-4 flex flex-col gap-1.5">
      <div className="rounded-[2px] border border-white/8 bg-white/[0.03] px-3 py-2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 shrink-0" />
        <span className="font-mono text-[10px] text-white/25 truncate">meetly.app/room/xk9-mq4-t7p</span>
      </div>
      <div className="flex gap-1.5">
        <div className="flex-1 rounded-[2px] border border-white/8 bg-white/[0.03] py-1.5 text-center font-mono text-[10px] text-white/20">Instant</div>
        <div className="flex-1 rounded-[2px] border border-white/8 bg-white/[0.03] py-1.5 text-center font-mono text-[10px] text-white/20">Scheduled</div>
      </div>
    </div>
  );
}

function RecordMockup() {
  return (
    <div className="mt-auto pt-4">
      <div className="rounded-[2px] border border-white/8 bg-white/[0.03] px-3 py-2.5 flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-red-500/70 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="h-1 w-full rounded-full bg-white/8 overflow-hidden mb-1">
            <div className="h-full w-[55%] rounded-full bg-white/15" />
          </div>
          <span className="font-mono text-[9px] text-white/20">Recording · 24:13</span>
        </div>
      </div>
    </div>
  );
}

function TranscriptMockup() {
  return (
    <div className="mt-auto pt-4 space-y-1.5">
      {[
        { speaker: 'Sarah', text: 'Ship the redesign by Friday.', accent: false },
        { speaker: 'AI', text: '→ Action item captured', accent: true },
      ].map((l, i) => (
        <div
          key={i}
          className={`rounded-[2px] border px-2.5 py-2 ${l.accent ? 'border-emerald-500/15 bg-emerald-500/[0.03]' : 'border-white/8 bg-white/[0.02]'}`}
        >
          <span className={`font-mono text-[9px] block mb-0.5 ${l.accent ? 'text-emerald-400/50' : 'text-white/25'}`}>{l.speaker}</span>
          <span className="text-[10px] text-white/40">{l.text}</span>
        </div>
      ))}
    </div>
  );
}

function EmailMockup() {
  return (
    <div className="mt-auto pt-4">
      <div className="rounded-[2px] border border-white/8 bg-white/[0.02] overflow-hidden">
        <div className="border-b border-white/8 px-3 py-1.5 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
          <span className="font-mono text-[9px] text-white/25">Summary delivered · just now</span>
        </div>
        <div className="px-3 py-2 space-y-1">
          <div className="h-1 w-3/4 rounded bg-white/8" />
          <div className="h-1 w-1/2 rounded bg-white/6" />
          <div className="h-1 w-2/3 rounded bg-white/6" />
        </div>
      </div>
    </div>
  );
}

const MOCKUPS: Record<number, React.ReactNode> = { 1: <LinkMockup />, 2: <RecordMockup />, 3: <TranscriptMockup />, 4: <EmailMockup /> };

// ── Card ──────────────────────────────────────────────────────────────────────
function StepCard({ step, title, desc }: { step: number; title: string; desc: string }) {
  return (
    <div className="relative flex flex-col p-5 bg-[#111111] h-full">
      <CardCornerAccents />
      {/* Step badge */}
      <span className="font-mono text-[10px] text-white/25 mb-3">
        {String(step).padStart(2, '0')}
      </span>
      {/* Icon */}
      <StepIcon step={step} />
      {/* Copy */}
      <div className="mt-3">
        <h4 className="text-[14px] font-normal text-[#fafafa] tracking-[-0.02em] leading-snug mb-1.5">
          {title}
        </h4>
        <p className="text-[12px] text-[#fafafa]/40 leading-[1.6]">{desc}</p>
      </div>
      {/* Visual */}
      {MOCKUPS[step]}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const { eyebrow, title } = HOW_IT_WORKS_SECTION;
  const steps = HOW_IT_WORKS_STEPS;

  return (
    <section id="how-it-works" className="flex flex-col items-center w-full bg-[#0a0a0a]">
      <div className="w-full max-w-[1200px] border-x border-white/12">

        {/* ── Section header ── */}
        <div className="px-[48px] py-[56px] border-b border-white/12 flex flex-col gap-[16px]">
          <Eyebrow text={eyebrow} />
          <h2 className="text-[clamp(28px,4vw,46px)] font-normal tracking-[-0.05em] leading-[1.1] text-[#fafafa]">
            {title}
          </h2>
        </div>

        {/* ── Bento grid ── */}
        <div className="p-4">
          {/* Row 1: large takes 3/5, small takes 2/5 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2">
            <div className="md:col-span-3 border border-white/10 min-h-[240px]">
              <StepCard step={steps[0].step} title={steps[0].title} desc={steps[0].desc} />
            </div>
            <div className="md:col-span-2 border border-white/10 min-h-[200px]">
              <StepCard step={steps[1].step} title={steps[1].title} desc={steps[1].desc} />
            </div>
          </div>
          {/* Row 2: small takes 2/5, large takes 3/5 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <div className="md:col-span-2 border border-white/10 min-h-[200px]">
              <StepCard step={steps[2].step} title={steps[2].title} desc={steps[2].desc} />
            </div>
            <div className="md:col-span-3 border border-white/10 min-h-[240px]">
              <StepCard step={steps[3].step} title={steps[3].title} desc={steps[3].desc} />
            </div>
          </div>
        </div>

      </div>

      <SectionSpacer variant="grid" />
    </section>
  );
}
