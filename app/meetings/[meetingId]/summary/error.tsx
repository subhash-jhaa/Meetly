'use client';

export default function SummaryError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 font-mono
                        text-[11px] text-white/30 uppercase tracking-widest mb-4">
          <span className="w-3 h-px bg-white/20" />
          Summary error
        </div>
        <p className="text-[14px] text-white/50 mb-6">
          Could not load this meeting summary.
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={reset}
            className="border border-white/12 px-5 py-2.5 font-mono
                       text-[13px] text-white rounded-[2px] hover:bg-white/5 transition-colors"
          >
            Retry
          </button>
          
           <a href="/dashboard"
            className="border border-white/12 px-5 py-2.5 font-mono
                       text-[13px] text-white/40 hover:text-white rounded-[2px]
                       hover:bg-white/5 transition-colors"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}