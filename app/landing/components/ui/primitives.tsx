// Shared primitive UI atoms used across all landing page sections.
// Import from here — never duplicate these in individual components.

import React from 'react';

// ─── CROSSHAIR CORNER MARKER ─────────────────────────────────────────────────
interface CrosshairCornerProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;   // arm length in px
  color?: string;  // tailwind bg class
}

const CORNER_CLASSES: Record<CrosshairCornerProps['position'], string> = {
  tl: 'left-0 top-0 -translate-x-1/2 -translate-y-1/2',
  tr: 'right-0 top-0 translate-x-1/2 -translate-y-1/2',
  bl: 'left-0 bottom-0 -translate-x-1/2 translate-y-1/2',
  br: 'right-0 bottom-0 translate-x-1/2 translate-y-1/2',
};

export function CrosshairCorner({
  position,
  size = 11,
  color = 'bg-white/40',
}: CrosshairCornerProps) {
  return (
    <div
      className={`absolute flex items-center justify-center pointer-events-none z-10 ${CORNER_CLASSES[position]}`}
    >
      <div className={`absolute w-[1px] ${color}`} style={{ height: size }} />
      <div className={`absolute h-[1px] ${color}`} style={{ width: size }} />
    </div>
  );
}

// All four corners — convenience wrapper
export function CrosshairCorners({
  size,
  color,
}: Omit<CrosshairCornerProps, 'position'>) {
  return (
    <>
      <CrosshairCorner position="tl" size={size} color={color} />
      <CrosshairCorner position="tr" size={size} color={color} />
      <CrosshairCorner position="bl" size={size} color={color} />
      <CrosshairCorner position="br" size={size} color={color} />
    </>
  );
}

// ─── EYEBROW LABEL ───────────────────────────────────────────────────────────
interface EyebrowProps {
  text: string;
  variant?: 'bar' | 'line'; // bar = vertical accent, line = horizontal dash
}

export function Eyebrow({ text, variant = 'bar' }: EyebrowProps) {
  return (
    <div className="flex items-center gap-[8px]">
      {variant === 'bar' ? (
        <div className="h-[14px] w-[2px] bg-[#7c7c7c]" />
      ) : (
        <span className="eyebrow-line w-[12px] h-[1px] bg-[#fafafa]/40" />
      )}
      <span className="font-mono text-[12px] uppercase tracking-widest text-[#7c7c7c]">
        {text}
      </span>
    </div>
  );
}

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  eyebrowVariant?: EyebrowProps['variant'];
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  eyebrowVariant = 'bar',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-[16px] ${className}`}>
      <Eyebrow text={eyebrow} variant={eyebrowVariant} />
      <h2 className="text-[clamp(28px,4vw,46px)] font-normal tracking-[-0.05em] leading-[1.1] text-[#fafafa]">
        {title}
      </h2>
    </div>
  );
}

// ─── ICON BUTTON ─────────────────────────────────────────────────────────────
interface IconButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'ghost';
  icon?: React.ReactNode;
}

export function IconButton({ label, onClick, variant = 'primary', icon }: IconButtonProps) {
  const base = 'rounded-[4px] p-[11px_16px] text-[13px] font-mono cursor-pointer transition-all';
  const styles =
    variant === 'primary'
      ? `bg-[#fafafa] text-[#0a0a0a] border-none hover:opacity-85 ${base}`
      : `bg-transparent text-[#fafafa] border border-white/20 hover:border-white/40 flex items-center gap-[6px] ${base}`;

  return (
    <button className={styles} onClick={onClick}>
      {icon}
      {label}
    </button>
  );
}

// ─── CARD CORNER ACCENT ──────────────────────────────────────────────────────
// Small L-shaped accent for boxed icon corners
interface CardCornerAccentProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
}

const ACCENT_CLASSES: Record<CardCornerAccentProps['position'], string> = {
  tl: '-left-[1px] -top-[1px] border-t border-l',
  tr: '-right-[1px] -top-[1px] border-t border-r',
  bl: '-left-[1px] -bottom-[1px] border-b border-l',
  br: '-right-[1px] -bottom-[1px] border-b border-r',
};

export function CardCornerAccent({ position }: CardCornerAccentProps) {
  return (
    <div className={`absolute w-1 h-1 border-white/30 ${ACCENT_CLASSES[position]}`} />
  );
}

export function CardCornerAccents() {
  return (
    <>
      <CardCornerAccent position="tl" />
      <CardCornerAccent position="tr" />
      <CardCornerAccent position="bl" />
      <CardCornerAccent position="br" />
    </>
  );
}

// ─── SECTION SPACER ──────────────────────────────────────────────────────────
// Canonical implementation — all spacers use this.
interface SectionSpacerProps {
  hasGap?: boolean;
  gapHeight?: string;
  variant?: 'diagonal' | 'grid';
}

export function SectionSpacer({
  hasGap = true,
  gapHeight = 'h-[80px] md:h-[120px]',
  variant = 'diagonal',
}: SectionSpacerProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {hasGap && (
        <div className={`w-full ${gapHeight} flex justify-center`}>
          <div className="w-full max-w-[1200px] h-full border-x border-white/12" />
        </div>
      )}
      <div className="flex justify-center w-full">
        <div className="w-full max-w-[1200px] h-[100px] border-x border-y border-white/12 relative overflow-hidden">
          {variant === 'diagonal' ? (
            <div className="absolute inset-0 diagonal-mask" />
          ) : (
            <div className="absolute inset-0 repeating-grid-subtle opacity-60" />
          )}
          <CrosshairCorners />
        </div>
      </div>
    </div>
  );
}
