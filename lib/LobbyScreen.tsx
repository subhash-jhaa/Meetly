'use client';

import React from 'react';

export function LobbyScreen({
  displayName,
  roomName,
  onAdmitted,
  onLeave,
}: {
  displayName: string;
  roomName: string;
  onAdmitted: () => void;
  onLeave: () => void;
}) {
  React.useEffect(() => {
    // Poll every 3 seconds to check if admitted
    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/connection-details?roomName=${roomName}`
        );
        // If we get a 200 with a token, we've been admitted
        if (res.ok) {
          const data = await res.json();
          if (data.participantToken) {
            clearInterval(interval);
            onAdmitted();
          }
        }
      } catch (e) {
        // Keep polling
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [roomName, onAdmitted]);

  return (
    <div className="fixed inset-0 bg-[#0c0c0e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center px-6 max-w-sm">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 animate-ping" />
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/40" />
          <div className="absolute inset-2 rounded-full bg-indigo-500/10 flex items-center justify-center text-2xl">
            ⏳
          </div>
        </div>
        <div>
          <h2 className="text-white text-xl font-medium tracking-tight">
            Waiting to be admitted
          </h2>
          <p className="text-white/40 text-sm mt-2">
            Hi <span className="text-white/70">{displayName}</span>, the host will let you in shortly.
          </p>
        </div>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <button
          onClick={onLeave}
          className="text-sm text-white/30 hover:text-white/60 transition-colors underline"
        >
          Leave waiting room
        </button>
      </div>
    </div>
  );
}