'use client';

import React, { useState, useEffect } from 'react';
import { ACCORDION_ITEMS } from '../data/landingData';
import { CrosshairCorners, SectionCornerBrackets } from './ui/primitives';

// ─── ICON MAP ─────────────────────────────────────────────────────────────────
// Keeps SVG markup out of the data file while still being driven by data.
const ICON_MAP: Record<string, React.ReactNode> = {
  'shield-clock': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  code: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  bolt: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  'shield-check': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

const AUTO_CYCLE_MS = 50;    // tick interval
const TICKS_PER_ITEM = 100; // 100 ticks × 50ms = 5s per item

// ─── ACCORDION ITEM ───────────────────────────────────────────────────────────
interface AccordionItemProps {
  title: string;
  description: string;
  iconPath: string;
  isActive: boolean;
  progress: number;
  onClick: () => void;
}

function AccordionItem({ title, description, iconPath, isActive, progress, onClick }: AccordionItemProps) {
  return (
    <div
      onClick={onClick}
      className={[
        'group cursor-pointer border border-white/10 transition-all duration-300 overflow-hidden rounded-[4px]',
        isActive ? 'bg-[#18181b] border-white/20' : 'bg-[#171717] hover:bg-[#1a1a1a] opacity-80',
      ].join(' ')}
    >
      <div className="p-6 flex flex-col gap-4 relative">
        <div className="flex items-center gap-4">
          <div className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
            {ICON_MAP[iconPath]}
          </div>
          <h4 className={`text-[17px] font-normal transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}`}>
            {title}
          </h4>
        </div>

        {isActive && (
          <div className="pl-9 flex flex-col gap-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <p className="text-[15px] leading-[1.6] text-white/50 max-w-[700px]">
              {description}
            </p>
            <div className="relative w-full h-[2px] bg-white/5 overflow-hidden rounded-full">
              <div
                className="absolute left-0 top-0 h-full bg-white/20 transition-all duration-50 linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── BOTTOM SPACER (FeaturesAccordion-specific, full-width without max-width centering) ──
function AccordionBottomSpacer() {
  return (
    <div className="w-full h-[100px] border-b border-white/12 relative overflow-hidden">
      <div className="absolute inset-0 diagonal-mask" />
      <CrosshairCorners />
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function FeaturesAccordion() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= TICKS_PER_ITEM) {
          setActiveIndex((cur) => (cur + 1) % ACCORDION_ITEMS.length);
          return 0;
        }
        return prev + 1;
      });
    }, AUTO_CYCLE_MS);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleClick = (i: number) => {
    setActiveIndex(i);
    setProgress(0);
  };

  return (
    <div className="w-full max-w-[1200px] border-x border-white/12 flex flex-col items-center">
      <div className="w-full p-[0_48px] flex flex-col gap-[12px] border-b border-white/12 pb-16 relative group">
        <SectionCornerBrackets showTop={false} />
        {ACCORDION_ITEMS.map((item, i) => (
          <AccordionItem
            key={item.id}
            title={item.title}
            description={item.description}
            iconPath={item.iconPath}
            isActive={activeIndex === i}
            progress={progress}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
      <AccordionBottomSpacer />
    </div>
  );
}
