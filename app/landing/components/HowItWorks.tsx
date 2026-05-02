'use client';

import React from 'react';
import { HOW_IT_WORKS_SECTION, HOW_IT_WORKS_STEPS } from '../data/landingData';
import { CrosshairCorners, Eyebrow, SectionSpacer, SectionCornerBrackets } from './ui/primitives';

// ── Compact visual mockups (Grayscale / Technical style) ──────────────────────
function LinkMockup() {
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-[200px]">
      <div className="rounded-[2px] border border-white/8 bg-white/[0.03] px-3 py-2 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
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
    <div className="w-full max-w-[200px]">
      <div className="rounded-[2px] border border-white/8 bg-white/[0.03] px-3 py-2.5 flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
          <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="h-1 w-full rounded-full bg-white/8 overflow-hidden mb-1">
            <div className="h-full w-[55%] rounded-full bg-white/20" />
          </div>
          <span className="font-mono text-[9px] text-white/20">Recording · 24:13</span>
        </div>
      </div>
    </div>
  );
}

function TranscriptMockup() {
  return (
    <div className="space-y-1.5 w-full max-w-[200px]">
      {[
        { speaker: 'Sarah', text: 'Ship the redesign by Friday.' },
        { speaker: 'AI', text: '→ Action item captured' },
      ].map((l, i) => (
        <div
          key={i}
          className="rounded-[2px] border border-white/8 bg-white/[0.02] px-2.5 py-2"
        >
          <span className="font-mono text-[9px] block mb-0.5 text-white/25">{l.speaker}</span>
          <span className="text-[10px] text-white/40">{l.text}</span>
        </div>
      ))}
    </div>
  );
}

const MOCKUPS: Record<number, React.ReactNode> = { 1: <LinkMockup />, 2: <RecordMockup />, 3: <TranscriptMockup />, 4: <TranscriptMockup /> };

// ── Card ──────────────────────────────────────────────────────────────────────
function StepCard({ step, title, desc, img }: { step: number; title: string; desc: string; img?: string }) {
  return (
    <div className="relative flex flex-col border border-[#242424] bg-[#171717] h-full">
      {/* Top Visual Area (Image Container) */}
      <div className="h-[280px] w-full border-b border-[#242424] relative flex items-center justify-center bg-[#171717] overflow-hidden grayscale">
        {/* Dithered image background simulation */}
        <div className="absolute inset-0 diagonal-mask opacity-50" />

        {/* Foreground Image scaled and centered */}
        {img ? (
          <div className="relative w-full h-full flex items-center justify-center transform scale-[0.4]">
            <img
              src={img}
              alt={title}
              className="max-w-full max-h-full object-contain opacity-100 mix-blend-luminosity"
            />
          </div>
        ) : (
          <div className="relative z-10 scale-[0.6]">
            {MOCKUPS[step]}
          </div>
        )}
      </div>

      {/* Content Area (Text Container) */}
      <div className="p-8 flex flex-col gap-6 relative flex-1">
        {/* Step Badge (Label) with its own corner accents */}
        <div className="w-fit px-3 py-1 bg-[#18181b] relative">
          <span className="font-mono text-[11px] text-[#fafafa] uppercase tracking-wider relative z-10">
            Step {step}
          </span>
          {/* Label Corner Accents */}
          {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => {
            const cls = {
              tl: 'left-0 top-0',
              tr: 'right-0 top-0',
              bl: 'left-0 bottom-0',
              br: 'right-0 bottom-0',
            }[pos];
            return (
              <React.Fragment key={pos}>
                <div className={`absolute ${cls} w-[1px] h-[3px] bg-white/20`} />
                <div className={`absolute ${cls} h-[1px] w-[3px] bg-white/20`} />
              </React.Fragment>
            );
          })}
        </div>

        {/* Title + Sub (Title + Sub Container) */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[20px] font-normal text-[#fafafa] tracking-tight leading-tight">
            {title}
          </h4>
          <p className="text-[14px] text-[#a1a1aa] leading-[1.6] max-w-[320px]">{desc}</p>
        </div>
      </div>

      {/* Main Card Corner Accents */}
      <CrosshairCorners color="bg-white/20" />
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const { eyebrow, title } = HOW_IT_WORKS_SECTION;
  const steps = HOW_IT_WORKS_STEPS;

  return (
    <section id="how-it-works" className="flex flex-col items-center w-full bg-[#0a0a0a]">
      <div className="w-full max-w-[1200px] border-x border-white/12 relative group">
        <SectionCornerBrackets />

        {/* ── Section header ── */}
        <div className="px-[48px] py-[80px] flex flex-col gap-[20px]">
          <Eyebrow text={eyebrow} />
          <h2 className="text-[clamp(32px,5vw,56px)] font-normal tracking-[-0.05em] leading-[1.05] text-[#fafafa]">
            {title}
          </h2>
        </div>

        {/* ── Steps grid (3 Columns) ── */}
        <div className="px-[48px] pb-24 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.slice(0, 3).map((s, i) => (
              <StepCard key={i} {...s} />
            ))}
          </div>
        </div>

      </div>

      <SectionSpacer variant="grid" hasGap={false} />
    </section>
  );
}
