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
  tl: '-left-[1px] -top-[1px]',
  tr: '-right-[1px] -top-[1px]',
  bl: '-left-[1px] -bottom-[1px]',
  br: '-right-[1px] -bottom-[1px]',
};

export function CrosshairCorner({
  position,
  size = 6,
  color = 'bg-white/40',
}: CrosshairCornerProps) {
  return (
    <>
      <div className={`absolute ${CORNER_CLASSES[position]} w-[1px] ${color} pointer-events-none z-10`} style={{ height: size }} />
      <div className={`absolute ${CORNER_CLASSES[position]} h-[1px] ${color} pointer-events-none z-10`} style={{ width: size }} />
    </>
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
  className?: string;
  variant?: 'bar' | 'dot';
}

export function Eyebrow({ text, className, variant = 'bar' }: EyebrowProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {variant === 'bar' ? (
        <div className="w-[1.5px] h-3 bg-white/40" />
      ) : (
        <div className="w-1 h-1 rounded-full bg-white/40" />
      )}
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
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
  const base = 'rounded-[2px] p-[11px_20px] text-[13px] font-mono cursor-pointer transition-all active:scale-[0.98]';
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
    <div className={`absolute w-3 h-3 border-white/40 ${ACCENT_CLASSES[position]}`} />
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
          <div className="absolute inset-0 diagonal-mask" />
          <CrosshairCorners />
        </div>
      </div>
    </div>
  );
}

// ─── BRAND LOGO ──────────────────────────────────────────────────────────────
export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <img
      src="https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png?width=512&height=512"
      alt="Meetly Logo"
      className={`${className} rounded-[4px] object-contain`}
    />
  );
}

// ─── CORNER BOX (RESSL AI STYLE) ─────────────────────────────────────────────
interface CornerBoxProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export function CornerBox({ children, size = 'md', className = '', style }: CornerBoxProps) {
  const sizeClass = {
    sm: 'corner-box-sm',
    md: 'corner-box-md',
    lg: 'corner-box-lg',
  }[size];

  return (
    <div className={`corner-box ${sizeClass} ${className}`} style={style}>
      <span className="cb"></span>
      {children}
    </div>
  );
}

// ─── SECTION CORNER BRACKETS (NORMAL STATE) ──────────────────────────────────
export function SectionCornerBrackets({
  showTop = true,
  showBottom = true
}: {
  showTop?: boolean;
  showBottom?: boolean
}) {
  return (
    <>
      {showTop && (
        <>
          <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l border-zinc-400 pointer-events-none z-50" />
          <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r border-zinc-400 pointer-events-none z-50" />
        </>
      )}
      {showBottom && (
        <>
          <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l border-zinc-400 pointer-events-none z-50" />
          <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r border-zinc-400 pointer-events-none z-50" />
        </>
      )}
    </>
  );
}
