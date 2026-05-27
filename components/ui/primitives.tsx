// ─── Shared primitive UI atoms ──────────────────────────────────────────────
// Single source of truth for all UI primitives used across the entire app.
// Import from '@/components/ui/primitives' — never duplicate in individual pages.

import React from 'react';

// ─── TYPES ───────────────────────────────────────────────────────────────────
type CornerPosition = 'tl' | 'tr' | 'bl' | 'br';

// ─── CROSSHAIR CORNER MARKER ─────────────────────────────────────────────────
interface CrosshairCornerProps {
  position: CornerPosition;
  size?: number;   // arm length in px
  color?: string;  // tailwind bg class
}

const CROSSHAIR_POSITIONS: Record<CornerPosition, string> = {
  tl: '-left-[1px] -top-[1px]',
  tr: '-right-[1px] -top-[1px]',
  bl: '-left-[1px] -bottom-[1px]',
  br: '-right-[1px] -bottom-[1px]',
};

export function CrosshairCorner({
  position,
  size = 6,
  color = 'bg-zinc-500',
}: CrosshairCornerProps) {
  return (
    <>
      <div className={`absolute ${CROSSHAIR_POSITIONS[position]} w-[1px] ${color} pointer-events-none z-10`} style={{ height: size }} />
      <div className={`absolute ${CROSSHAIR_POSITIONS[position]} h-[1px] ${color} pointer-events-none z-10`} style={{ width: size }} />
    </>
  );
}

export function CrosshairCorners({
  size,
  color,
}: Omit<CrosshairCornerProps, 'position'>) {
  return (
    <>
      {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
        <CrosshairCorner key={pos} position={pos} size={size} color={color} />
      ))}
    </>
  );
}

// ─── CORNER BRACKETS (L-SHAPED) ──────────────────────────────────────────────
interface CornerBracketProps {
  position: CornerPosition;
  size?: number;
  thickness?: number;
  color?: string;
  className?: string;
}

const BRACKET_POSITIONS: Record<CornerPosition, string> = {
  tl: '-left-[1px] -top-[1px] border-t border-l',
  tr: '-right-[1px] -top-[1px] border-t border-r',
  bl: '-left-[1px] -bottom-[1px] border-b border-l',
  br: '-right-[1px] -bottom-[1px] border-b border-r',
};

export function CornerBracket({
  position,
  size = 12,
  color = 'border-zinc-500',
  className = '',
}: CornerBracketProps) {
  return (
    <div 
      className={`absolute ${BRACKET_POSITIONS[position]} ${color} pointer-events-none z-10 ${className}`} 
      style={{ width: size, height: size }} 
    />
  );
}

export function SectionCornerBrackets({
  showTop = true,
  showBottom = true,
  color = 'border-zinc-500',
  size = 12,
}: {
  showTop?: boolean;
  showBottom?: boolean;
  color?: string;
  size?: number;
}) {
  return (
    <>
      {showTop && (
        <>
          <CornerBracket position="tl" color={color} size={size} />
          <CornerBracket position="tr" color={color} size={size} />
        </>
      )}
      {showBottom && (
        <>
          <CornerBracket position="bl" color={color} size={size} />
          <CornerBracket position="br" color={color} size={size} />
        </>
      )}
    </>
  );
}

// ─── CORNERS (APP-WIDE SHORTHAND) ────────────────────────────────────────────
// Used on dashboard, profile, error, 404, history pages.
// Uses inline style for size to avoid dynamic Tailwind class issues.
export function Corners({ size = 7, color = 'bg-white/10' }: { size?: number; color?: string }) {
  return (
    <>
      {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
        <React.Fragment key={pos}>
          <div className={`absolute ${CROSSHAIR_POSITIONS[pos]} w-[1px] ${color} pointer-events-none`} style={{ height: size }} />
          <div className={`absolute ${CROSSHAIR_POSITIONS[pos]} h-[1px] ${color} pointer-events-none`} style={{ width: size }} />
        </React.Fragment>
      ))}
    </>
  );
}

// ─── EYEBROW LABEL ───────────────────────────────────────────────────────────
interface EyebrowProps {
  text: string;
  className?: string;
  variant?: 'bar' | 'dot' | 'line';
}

export function Eyebrow({ text, className = '', variant = 'bar' }: EyebrowProps) {
  const indicator = {
    bar: 'w-[1.5px] h-3 bg-white/40',
    dot: 'w-1 h-1 rounded-full bg-white/40',
    line: 'w-3 h-px bg-white/30',
  }[variant];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={indicator} />
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
  align?: 'left' | 'center';
}

export function SectionHeader({
  eyebrow,
  title,
  eyebrowVariant = 'bar',
  className = '',
  align = 'left',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  return (
    <div className={`flex flex-col gap-[16px] ${alignClass} ${className}`}>
      <Eyebrow text={eyebrow} variant={eyebrowVariant} />
      <h2 className="text-[clamp(28px,4vw,46px)] font-normal tracking-[-0.05em] leading-[1.1] text-foreground">
        {title}
      </h2>
    </div>
  );
}

// ─── BUTTON ──────────────────────────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: React.ReactNode;
  showCorners?: boolean;
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  icon,
  showCorners = true,
  ...props
}: ButtonProps) {
  const base = 'relative px-6 py-3 font-mono text-[13px] uppercase tracking-wider transition-all active:scale-[0.98] rounded-[2px] flex items-center justify-center gap-2';
  const variants = {
    primary: 'bg-[#fafafa] text-[#0a0a0a] hover:bg-white border-none',
    secondary: 'bg-[#18181b] text-white border border-white/10 hover:border-white/20',
    outline: 'bg-transparent text-white border border-white/20 hover:border-white/40',
    ghost: 'bg-transparent text-white/60 hover:text-white border-none',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {icon}
      <span className="relative z-10">{children}</span>
      {showCorners && <CrosshairCorners color="bg-zinc-500" size={4} />}
    </button>
  );
}

// Alias for backwards compatibility
export const IconButton = ({ label, ...props }: any) => <Button {...props}>{label}</Button>;

// ─── SECTION SPACER ──────────────────────────────────────────────────────────
export function SectionSpacer({
  hasGap = true,
  gapHeight = 'h-[80px] md:h-[120px]',
  variant = 'diagonal',
}: {
  hasGap?: boolean;
  gapHeight?: string;
  variant?: 'diagonal' | 'grid';
}) {
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

// ─── LANDING SECTION WRAPPER ─────────────────────────────────────────────────
export function LandingSection({ 
  children, 
  id, 
  className = "", 
  containerClassName = "",
  showTopBrackets = true,
  showBottomBrackets = true
}: { 
  children: React.ReactNode; 
  id?: string; 
  className?: string;
  containerClassName?: string;
  showTopBrackets?: boolean;
  showBottomBrackets?: boolean;
}) {
  return (
    <section id={id} className={`flex flex-col items-center w-full bg-background ${className}`}>
      <div className={`w-full max-w-[1200px] border-x border-white/12 relative group ${containerClassName}`}>
        <SectionCornerBrackets showTop={showTopBrackets} showBottom={showBottomBrackets} />
        {children}
      </div>
    </section>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────
export function Card({ 
  children, 
  className = "", 
  showCorners = true 
}: { 
  children: React.ReactNode; 
  className?: string;
  showCorners?: boolean;
}) {
  return (
    <div className={`relative border border-white/12 bg-surface-card p-6 group ${className}`}>
      {children}
      {showCorners && <CrosshairCorners color="bg-zinc-500" />}
    </div>
  );
}

// ─── ICON BOX ────────────────────────────────────────────────────────────────
export function IconBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative w-12 h-12 bg-[#18181b] flex items-center justify-center ${className}`}>
      {children}
      <SectionCornerBrackets size={3} color="border-white/20" />
    </div>
  );
}

// Alias for backwards compatibility
export const CardCornerAccents = () => <SectionCornerBrackets size={3} color="border-white/20" />;

// ─── CORNER BOX (RESSL AI STYLE) ─────────────────────────────────────────────
export function CornerBox({ children, size = 'md', className = '', style }: {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}) {
  const sizeClass = { sm: 'corner-box-sm', md: 'corner-box-md', lg: 'corner-box-lg' }[size];
  return (
    <div className={`corner-box ${sizeClass} ${className}`} style={style}>
      <span className="cb"></span>
      {children}
    </div>
  );
}
