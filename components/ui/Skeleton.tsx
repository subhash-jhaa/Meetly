import React from 'react';

export function Skeleton({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`relative overflow-hidden bg-white/[0.04] ${className ?? ''}`}
      style={style}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite]
                      bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}