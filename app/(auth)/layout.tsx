import React from 'react';
import Link from 'next/link';
import { Corners, Logo } from '@/components/ui/primitives';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 repeating-grid-subtle opacity-50" />
      <div className="absolute inset-0 diagonal-dither opacity-[0.03] pointer-events-none" />

      {/* LOGO */}
      <div className="absolute top-8 left-8 z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative p-2 border border-white/12 bg-surface group-hover:border-white/20 transition-colors">
            <Logo className="h-[24px] w-[24px]" />
            {/* CORNER MARKERS */}
            <Corners size={4} color="bg-white/20" />
          </div>
          <span className="font-mono text-[14px] tracking-tight uppercase text-white/80 group-hover:text-white transition-colors">
            Meetly
          </span>
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-[400px] px-6">
        {children}
      </div>

      {/* FOOTER-ISH DECORATION */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center opacity-20 pointer-events-none">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em]">Auth.Node.v0.2</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em]">Secure Session</div>
      </div>
    </div>
  );
}
