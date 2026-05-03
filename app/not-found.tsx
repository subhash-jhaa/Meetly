import Link from 'next/link';

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

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="relative border border-[#242424] bg-[#0a0908] p-12 text-center">
          <Corners />
          <div className="flex items-center justify-center gap-2 font-mono
                          text-[11px] text-white/30 uppercase tracking-widest mb-6">
            <span className="w-3 h-px bg-white/20" />
            404
          </div>
          <h1 className="text-[32px] font-normal tracking-[-0.04em] leading-[1.1] mb-3">
            Page not found
          </h1>
          <p className="font-mono text-[12px] text-white/30 mb-8 leading-relaxed">
            This page doesn't exist or has been moved.
          </p>
          <Link
            href="/dashboard"
            className="inline-block border border-[#242424] bg-[#0a0908]
                       px-5 py-2.5 font-mono text-[12px] text-white
                       hover:bg-white/5 transition-colors"
          >
            Go to Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}