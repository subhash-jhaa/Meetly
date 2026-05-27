'use client';

import { useEffect } from 'react';
import { Corners, Eyebrow } from '@/components/ui/primitives';

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
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-4">
      <div className="w-full max-w-[440px]">
        <div className="relative border border-white/12 bg-surface p-12 text-center">
          <Corners />
          <Eyebrow text="Error" variant="line" className="justify-center mb-6" />
          <h1 className="text-[28px] font-normal tracking-[-0.04em] leading-[1.1] mb-3">
            Something went wrong
          </h1>
          <p className="font-mono text-[13px] text-white/30 mb-2 leading-relaxed">
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
                         text-[13px] uppercase tracking-wider py-3 rounded-[2px]
                         hover:opacity-90 transition-opacity"
            >
              <Corners />
              Try again
            </button>
            
             <a href="/dashboard"
              className="w-full border border-white/12 bg-surface
                         py-3 font-mono text-[13px] text-white/50
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