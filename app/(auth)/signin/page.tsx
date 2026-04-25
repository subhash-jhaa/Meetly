'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 p-8 border border-white/10 bg-[#0a0908]/50 backdrop-blur-sm relative">
      {/* CORNER MARKERS FOR THE CONTAINER */}
      <div className="absolute -left-[1px] -top-[1px] h-[12px] w-[1px] bg-white/20" />
      <div className="absolute -left-[1px] -top-[1px] h-[1px] w-[12px] bg-white/20" />
      <div className="absolute -right-[1px] -top-[1px] h-[12px] w-[1px] bg-white/20" />
      <div className="absolute -right-[1px] -top-[1px] h-[1px] w-[12px] bg-white/20" />
      <div className="absolute -left-[1px] -bottom-[1px] h-[12px] w-[1px] bg-white/20" />
      <div className="absolute -left-[1px] -bottom-[1px] h-[1px] w-[12px] bg-white/20" />
      <div className="absolute -right-[1px] -bottom-[1px] h-[12px] w-[1px] bg-white/20" />
      <div className="absolute -right-[1px] -bottom-[1px] h-[1px] w-[12px] bg-white/20" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-white/40 font-mono text-[12px] uppercase tracking-widest">
          <span className="w-8 h-[1px] bg-white/20" />
          Welcome back
        </div>
        <h1 className="text-[32px] font-normal tracking-[-0.04em] text-white">
          Sign in to Meetly
        </h1>
        <p className="text-white/40 text-[14px]">
          Enter your credentials to access your dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[11px] uppercase tracking-wider text-white/40 ml-1">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="name@company.com"
            className="w-full bg-[#0a0908] border border-white/10 px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center ml-1">
            <label className="font-mono text-[11px] uppercase tracking-wider text-white/40">
              Password
            </label>
            <Link href="#" className="font-mono text-[11px] uppercase tracking-wider text-white/30 hover:text-white transition-colors">
              Forgot?
            </Link>
          </div>
          <input
            type="password"
            required
            placeholder="••••••••"
            className="w-full bg-[#0a0908] border border-white/10 px-4 py-3 text-[14px] text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-colors"
          />
        </div>

        <button
          disabled={isLoading}
          className="group relative w-full mt-2 flex items-center justify-center bg-[#fafafa] py-3 transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <span className="font-mono text-[13px] text-black uppercase tracking-widest font-bold">
            {isLoading ? 'Processing...' : 'Sign In'}
          </span>
          {/* CORNER DECORATIONS FOR THE BUTTON */}
          <div className="absolute -left-[1px] -top-[1px] h-[6px] w-[1px] bg-black/10" />
          <div className="absolute -left-[1px] -top-[1px] h-[1px] w-[6px] bg-black/10" />
          <div className="absolute -right-[1px] -bottom-[1px] h-[6px] w-[1px] bg-black/10" />
          <div className="absolute -right-[1px] -bottom-[1px] h-[1px] w-[6px] bg-black/10" />
        </button>
      </form>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center text-[12px] uppercase font-mono">
          <span className="bg-[#0a0a0a] px-2 text-white/20 tracking-tighter">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 border border-white/10 bg-transparent py-2.5 transition-colors hover:bg-white/5 font-mono text-[12px] text-white/60">
          Google
        </button>
        <button className="flex items-center justify-center gap-2 border border-white/10 bg-transparent py-2.5 transition-colors hover:bg-white/5 font-mono text-[12px] text-white/60">
          GitHub
        </button>
      </div>

      <p className="text-center text-[13px] text-white/40">
        Don't have an account?{' '}
        <Link href="/signup" className="text-white hover:underline underline-offset-4 decoration-white/30">
          Sign up for free
        </Link>
      </p>
    </div>
  );
}
