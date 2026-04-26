'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';
  const error = searchParams.get('error');

  return (
    <div className="flex flex-col gap-8 p-8 border border-white/10 bg-[#0a0908]/50 backdrop-blur-sm relative">
      {/* Corner markers — keep your existing decorations */}
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
          Welcome
        </div>
        <h1 className="text-[32px] font-normal tracking-[-0.04em] text-white">
          Sign in to Meetly
        </h1>
        <p className="text-white/40 text-[14px]">
          Use your Google account to continue.
        </p>
      </div>

      {error && (
        <p className="text-red-400 text-[13px] font-mono">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        onClick={() => signIn('google', { callbackUrl })}
        className="group relative w-full flex items-center justify-center gap-3 bg-[#fafafa] py-3 transition-opacity hover:opacity-90"
      >
        {/* Google icon */}
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
          <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
          <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
          <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
        </svg>
        <span className="font-mono text-[13px] text-black uppercase tracking-widest font-bold">
          Continue with Google
        </span>
      </button>

      <p className="text-center text-[12px] text-white/30 leading-relaxed">
        By signing in, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}