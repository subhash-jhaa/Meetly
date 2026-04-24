import React from 'react';

interface FeatureBlockProps {
  tag: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  index: number;
}

const FeatureBlock = ({ tag, title, description, icon, index }: FeatureBlockProps) => {
  const topOffset = 80 + index * 24; // stagger the sticky offset so they peek behind each other

  return (
    <div
      className="relative flex flex-col md:flex-row w-full border border-[#242424] bg-[#0a0908] mb-40 last:mb-0"
      style={{
        position: 'sticky',
        top: `${topOffset}px`,
        minHeight: '600px',
        zIndex: 10 + index,
      }}
    >
      {/* IMAGE / VISUAL AREA */}
      <div className="flex flex-1 items-center justify-center overflow-hidden bg-[#0d0d0d] min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#242424]">
        <div className="relative flex h-full w-full items-center justify-center p-[36px]">
          <div className="w-full h-full min-h-[220px] rounded-[6px] bg-[#111] border border-white/[0.06] flex items-center justify-center overflow-hidden">
            {/* Dithered grid background */}
            <div className="absolute inset-0 repeating-grid opacity-60" />
            {icon || (
              <svg
                className="relative z-10 h-[56px] w-[56px] opacity-[0.18] stroke-[#fafafa]"
                viewBox="0 0 80 80"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <rect x="10" y="20" width="60" height="45" rx="3" />
                <path d="M20 35h40M20 45h30M20 55h18" />
                <circle cx="62" cy="22" r="8" />
                <path d="M59 22l2 2 4-4" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* TEXT BLOCK */}
      <div className="flex flex-[1.1] flex-col justify-center gap-[28px] p-[60px_60px]">
        {/* TAG */}
        <div className="flex items-center gap-[10px]">
          <svg
            className="h-[16px] w-[16px] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(115,115,115)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span className="font-mono text-[12px] text-[#737373]">{tag}</span>
        </div>

        {/* TITLE */}
        <h3 className="text-[clamp(28px,4vw,40px)] font-normal leading-[1.15] tracking-[-0.04em] text-[#fafafa]">
          {title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-[16px] leading-[1.6] text-white/50 max-w-[480px]">
          {description}
        </p>
      </div>

      {/* CROSSHAIR CORNERS */}
      <div className="absolute -left-[1px] -top-[1px] h-[6px] w-[1px] bg-white/10 pointer-events-none" />
      <div className="absolute -left-[1px] -top-[1px] h-[1px] w-[6px] bg-white/10 pointer-events-none" />
      <div className="absolute -right-[1px] -top-[1px] h-[6px] w-[1px] bg-white/10 pointer-events-none" />
      <div className="absolute -right-[1px] -top-[1px] h-[1px] w-[6px] bg-white/10 pointer-events-none" />
      <div className="absolute -left-[1px] -bottom-[1px] h-[6px] w-[1px] bg-white/10 pointer-events-none" />
      <div className="absolute -left-[1px] -bottom-[1px] h-[1px] w-[6px] bg-white/10 pointer-events-none" />
      <div className="absolute -right-[1px] -bottom-[1px] h-[6px] w-[1px] bg-white/10 pointer-events-none" />
      <div className="absolute -right-[1px] -bottom-[1px] h-[1px] w-[6px] bg-white/10 pointer-events-none" />
    </div>
  );
};

export default FeatureBlock;
