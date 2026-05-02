import React from 'react';

interface FeatureBlockProps {
  tag: string;
  title: string;
  description: string;
  img?: string;
  icon?: React.ReactNode;
  index: number;
}

const FeatureBlock = ({ tag, title, description, img, icon, index }: FeatureBlockProps) => {
  const topOffset = 80 + index * 24; // stagger the sticky offset so they peek behind each other

  // Unique minimalist colorful gradients for each feature card
  const gradients = [
    'radial-gradient(circle at 0% 0%, #ff007f 0%, transparent 60%), radial-gradient(circle at 100% 100%, #00f0ff 0%, transparent 60%), radial-gradient(circle at 50% 50%, #7000ff 0%, transparent 60%)',
    'radial-gradient(circle at 0% 0%, #00ff88 0%, transparent 60%), radial-gradient(circle at 100% 100%, #0088ff 0%, transparent 60%), radial-gradient(circle at 50% 50%, #00ffcc 0%, transparent 60%)',
    'radial-gradient(circle at 0% 0%, #ff8800 0%, transparent 60%), radial-gradient(circle at 100% 100%, #ff007f 0%, transparent 60%), radial-gradient(circle at 50% 50%, #ffcc00 0%, transparent 60%)'
  ];
  const bgGradient = gradients[index % gradients.length];

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
          <div className="w-full h-full min-h-[320px] rounded-[16px] bg-[#111] border border-white/[0.06] flex flex-col items-center justify-center overflow-hidden relative group">

            {img ? (
              <img
                src={img}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <>
                {/* Minimal Colorful Gradient Background (Acts as the image) */}
                <div
                  className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-60"
                  style={{
                    background: bgGradient,
                    filter: 'blur(40px)',
                    transform: 'scale(1.2)'
                  }}
                />

                {/* Dithered grid background */}
                <div className="absolute inset-0 repeating-grid opacity-30 mix-blend-overlay" />

                {/* Meetly Branding Overlay */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-[32px]">
                  <div className="px-[20px] py-[10px] rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl flex items-center gap-[10px] transition-transform duration-500 group-hover:scale-105">
                    <div className="w-[8px] h-[8px] rounded-full bg-white animate-pulse" />
                    <span className="text-white font-semibold tracking-wide text-[14px]">Meetly AI</span>
                  </div>

                  {icon || (
                    <svg
                      className="relative z-10 h-[72px] w-[72px] opacity-[0.8] stroke-white drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-2"
                      viewBox="0 0 80 80"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    >
                      <rect x="10" y="20" width="60" height="45" rx="4" />
                      <path d="M20 35h40M20 45h30M20 55h18" />
                      <circle cx="62" cy="22" r="8" />
                      <path d="M59 22l2 2 4-4" />
                    </svg>
                  )}
                </div>
              </>
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

