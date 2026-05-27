import Link from 'next/link';
import { Corners, Eyebrow } from '@/components/ui/primitives';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        <div className="relative border border-white/12 bg-surface p-12 text-center">
          <Corners />
          <Eyebrow text="404" variant="line" className="justify-center mb-6" />
          <h1 className="text-[32px] font-normal tracking-[-0.04em] leading-[1.1] mb-3">
            Page not found
          </h1>
          <p className="font-mono text-[13px] text-white/30 mb-8 leading-relaxed">
            This page doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/dashboard"
            className="inline-block border border-white/12 bg-surface
                       px-5 py-2.5 font-mono text-[13px] text-white rounded-[2px]
                       hover:bg-white/5 transition-colors"
          >
            Go to Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}