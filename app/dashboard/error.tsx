'use client';

import { useEffect } from 'react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] text-center">
        <div className="flex items-center justify-center gap-2 font-mono
                        text-[11px] text-white/30 uppercase tracking-widest mb-4">
          <span className="w-3 h-px bg-white/20" />
          Dashboard error
        </div>
        <p className="text-[14px] text-white/50 mb-6">
          Failed to load your dashboard. This is usually a network issue.
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={reset}
            className="border border-white/12 px-5 py-2.5 font-mono
                       text-[12px] text-white hover:bg-white/5 transition-colors"
          >
            Retry
          </button>
          
           <a href="/"
            className="border border-white/12 px-5 py-2.5 font-mono
                       text-[12px] text-white/40 hover:text-white
                       hover:bg-white/5 transition-colors"
          >
            Home
          </a>
        </div>
      </div>
    </div>
  );
}