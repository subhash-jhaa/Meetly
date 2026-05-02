"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { clsx, type ClassValue } from "clsx";
import * as Color from "color-bits";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FOOTER_DATA, SITE } from "../../app/landing/data/landingData";
import { Logo, SectionCornerBrackets } from "../../app/landing/components/ui/primitives";

// ── Utilities ─────────────────────────────────────────────────────────────────
const cn = (...i: ClassValue[]) => twMerge(clsx(i));

const toRGBA = (color: React.CSSProperties["color"], fb = "rgba(180,180,180)"): string => {
  if (typeof window === "undefined" || !color) return fb;
  try {
    if (typeof color === "string" && color.startsWith("var(")) {
      const el = Object.assign(document.createElement("div"), { style: `color:${color}` });
      document.body.appendChild(el);
      const c = getComputedStyle(el).color;
      document.body.removeChild(el);
      return Color.formatRGBA(Color.parse(c));
    }
    return Color.formatRGBA(Color.parse(color));
  } catch { return fb; }
};

const withAlpha = (rgb: string, a: number) =>
  rgb.startsWith("rgb") ? Color.formatRGBA(Color.alpha(Color.parse(rgb), a)) : rgb;

// ── Badge icon (SOC2 / HIPAA / GDPR) ─────────────────────────────────────────
const Badge = ({ label }: { label: string }) => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="opacity-30 grayscale">
    <rect x="2" y="2" width="40" height="40" rx="20" fill="#222" />
    <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">{label}</text>
  </svg>
);

// ── Link row ──────────────────────────────────────────────────────────────────
const FooterLink = ({ label, href, external }: { label: string; href: string; external?: boolean }) => (
  <li className="group flex items-center gap-1">
    <Link href={href} {...(external ? { target: "_blank" } : {})}
      className="text-[13px] text-white/50 hover:text-white transition-colors font-mono">
      {label}
    </Link>
    <ChevronRightIcon className="h-3 w-3 text-white/0 group-hover:text-white/50 transition-all" />
  </li>
);

// ── FlickeringGrid ────────────────────────────────────────────────────────────
interface GridProps {
  squareSize?: number; gridGap?: number; flickerChance?: number;
  color?: string; width?: number; height?: number;
  className?: string; maxOpacity?: number; text?: string; fontSize?: number;
}

export const FlickeringGrid: React.FC<GridProps> = ({
  squareSize = 2, gridGap = 3, flickerChance = 0.15,
  color = "#fff", width, height, className,
  maxOpacity = 0.15, text = "", fontSize = 120,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const maskRef = useRef<ImageData | null>(null);
  const rgb = useMemo(() => toRGBA(color), [color]);

  const buildMask = useCallback((cw: number, ch: number) => {
    if (!text || cw <= 0 || ch <= 0) { maskRef.current = null; return; }
    const off = Object.assign(document.createElement("canvas"), { width: cw, height: ch });
    const ctx = off.getContext("2d", { willReadFrequently: true })!;
    ctx.fillStyle = ctx.strokeStyle = "white";
    ctx.font = `900 ${fontSize}px Inter,"Segoe UI",system-ui,sans-serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.lineWidth = Math.max(2, fontSize * 0.04);
    ctx.strokeText(text, cw / 2, ch / 2);
    ctx.fillText(text, cw / 2, ch / 2);
    maskRef.current = ctx.getImageData(0, 0, cw, ch);
  }, [text, fontSize]);

  const draw = useCallback((
    ctx: CanvasRenderingContext2D,
    cw: number, ch: number, cols: number, rows: number,
    squares: Float32Array, dpr: number,
  ) => {
    ctx.clearRect(0, 0, cw, ch);
    const mask = maskRef.current;
    const step = (squareSize + gridGap) * dpr;
    const sw = Math.max(1, Math.floor(squareSize * dpr));

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const px = Math.floor(i * step), py = Math.floor(j * step);
        let hasText = false;
        if (mask?.width === cw && mask.height === ch) {
          const cx = Math.min(px + (sw >> 1), cw - 1);
          const cy = Math.min(py + (sw >> 1), ch - 1);
          hasText = mask.data[(cy * cw + cx) * 4] > 10;
        }
        const b = squares[i * rows + j];
        const opacity = hasText ? 0.25 + b * 0.20 : b * 0.18;
        ctx.fillStyle = withAlpha(rgb, opacity);
        ctx.fillRect(px, py, sw, sw);
      }
    }
  }, [rgb, squareSize, gridGap]);

  const setup = useCallback((canvas: HTMLCanvasElement, w: number, h: number) => {
    const dpr = devicePixelRatio || 1;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.cssText = `width:${w}px;height:${h}px`;
    const cols = Math.ceil(w / (squareSize + gridGap));
    const rows = Math.ceil(h / (squareSize + gridGap));
    const squares = new Float32Array(cols * rows).map(() => Math.random() * maxOpacity);
    buildMask(canvas.width, canvas.height);
    return { cols, rows, squares, dpr };
  }, [squareSize, gridGap, maxOpacity, buildMask]);

  useEffect(() => {
    const canvas = canvasRef.current, container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d")!;
    let rafId: number;
    let grid: ReturnType<typeof setup>;

    const resize = () => {
      const w = width || container.clientWidth, h = height || container.clientHeight;
      setSize({ width: w, height: h });
      grid = setup(canvas, w, h);
    };
    resize();

    let last = performance.now();
    const tick = (now: number) => {
      if (inView) {
        const dt = (now - last) / 1000; last = now;
        for (let i = 0; i < grid.squares.length; i++)
          if (Math.random() < flickerChance * dt) grid.squares[i] = Math.random() * maxOpacity;
        draw(ctx, canvas.width, canvas.height, grid.cols, grid.rows, grid.squares, grid.dpr);
      }
      rafId = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize); ro.observe(container);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting)); io.observe(canvas);
    rafId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); io.disconnect(); };
  }, [setup, draw, width, height, inView, flickerChance, maxOpacity]);

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)}>
      <canvas ref={canvasRef} className="pointer-events-none block" style={size} />
    </div>
  );
};

// ── FlickeringFooter ──────────────────────────────────────────────────────────
export const FlickeringFooter = () => {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(max-width:1024px)");
    setIsTablet(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsTablet(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  return (
    <footer id="footer" className="w-full bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1200px] border-x border-white/12 pt-20 relative group">
        <SectionCornerBrackets />

        {/* Info row */}
        <div className="flex flex-col md:flex-row md:justify-between p-10 border-b border-white/12 gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="size-8" />
              <span className="text-xl font-semibold text-white">{SITE.name}</span>
            </Link>
            <p className="text-[14px] text-white/40 leading-relaxed">{FOOTER_DATA.tagline}</p>
            <div className="flex gap-3">
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-12 lg:gap-20 flex-wrap">
            {FOOTER_DATA.columns.map((col, i) => (
              <ul key={i} className="flex flex-col gap-3">
                <li className="text-[11px] font-mono uppercase tracking-widest text-white/30">{col.heading}</li>
                {col.links.map(l => <FooterLink key={l.label} {...l} />)}
              </ul>
            ))}
            <ul className="flex flex-col gap-3">
              <li className="text-[11px] font-mono uppercase tracking-widest text-white/30">Social</li>
              {FOOTER_DATA.social.map(l => <FooterLink key={l.label} {...l} external />)}
            </ul>
          </div>
        </div>

        {/* Flickering banner */}
        <div className="relative w-full overflow-hidden" style={{ height: isTablet ? 200 : 320 }}>
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <FlickeringGrid
            text="Meetly" fontSize={isTablet ? 110 : 240}
            squareSize={2} gridGap={3} color="#fff"
            maxOpacity={0.5} flickerChance={0.15}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute bottom-5 inset-x-0 flex justify-center z-20">
            <p className="text-[11px] font-mono text-white/20 uppercase tracking-widest">
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
