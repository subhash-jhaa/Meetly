'use client';

import { useEffect } from 'react';

function Corners() {
  return (
    <>
      <div className="absolute -left-px -top-px h-[7px] w-px bg-white/10" />
      <div className="absolute -left-px -top-px h-px w-[7px] bg-white/10" />
      <div className="absolute -right-px -top-px h-[7px] w-px bg-white/10" />
      <div className="absolute -right-px -top-px h-px w-[7px] bg-white/10" />
      <div className="absolute -left-px -bottom-px h-[7px] w-px bg-white/10" />
      <div className="absolute -left-px -bottom-px h-px w-[7px] bg-white/10" />
      <div className="absolute -right-px -bottom-px h-[7px] w-px bg-white/10" />
      <div className="absolute -right-px -bottom-px h-px w-[7px] bg-white/10" />
    </>
  );
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to Sentry when you add it in Phase 6
    console.error('Global error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-[440px]">
        <div className="relative border border-[#242424] bg-[#0a0908] p-12 text-center">
          <Corners />
          <div className="flex items-center justify-center gap-2 font-mono
                          text-[11px] text-white/30 uppercase tracking-widest mb-6">
            <span className="w-3 h-px bg-white/20" />
            Error
          </div>
          <h1 className="text-[28px] font-normal tracking-[-0.04em] leading-[1.1] mb-3">
            Something went wrong
          </h1>
          <p className="font-mono text-[12px] text-white/30 mb-2 leading-relaxed">
            An unexpected error occurred.
          </p>
          {error.digest && (
            <p className="font-mono text-[10px] text-white/15 mb-8">
              Error ID: {error.digest}
            </p>
          )}
          <div className="flex flex-col gap-2 mt-8">
            <button
              onClick={reset}
              className="relative w-full bg-white text-black font-mono
                         text-[12px] uppercase tracking-widest py-3
                         hover:opacity-90 transition-opacity"
            >
              <Corners />
              Try again
            </button>
            
             <a href="/dashboard"
              className="w-full border border-[#242424] bg-[#0a0908]
                         py-3 font-mono text-[12px] text-white/50
                         hover:text-white hover:bg-white/5 transition-colors
                         text-center block"
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}