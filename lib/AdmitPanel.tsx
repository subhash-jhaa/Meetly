'use client';

import React from 'react';

type WaitingParticipant = {
  identity: string;
  name: string;
};

export function AdmitPanel({
  roomName,
  isHost,
}: {
  roomName: string;
  isHost: boolean;
}) {
  const [waiting, setWaiting] = React.useState<WaitingParticipant[]>([]);
  const [admitting, setAdmitting] = React.useState<string | null>(null);

  // Poll for waiting participants every 3 seconds
  React.useEffect(() => {
    if (!isHost) return;

    const poll = async () => {
      const res = await fetch(`/api/rooms/waiting?roomName=${roomName}`);
      if (res.ok) {
        const data = await res.json();
        setWaiting(data.waiting ?? []);
      }
    };

    poll();
    const interval = setInterval(poll, 3000);
    return () => clearInterval(interval);
  }, [isHost, roomName]);

  const admit = async (identity: string) => {
    setAdmitting(identity);
    await fetch('/api/rooms/admit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName, participantIdentity: identity }),
    });
    setWaiting(prev => prev.filter(p => p.identity !== identity));
    setAdmitting(null);
  };

  if (!isHost || waiting.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col gap-2 max-w-xs w-full">
      {waiting.map(p => (
        <div
          key={p.identity}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1c1c1f] border border-white/10 shadow-xl"
        >
          <div className="w-8 h-8 rounded-full bg-indigo-600/20 flex items-center justify-center text-sm font-medium text-indigo-400 flex-shrink-0">
            {p.name?.[0]?.toUpperCase() ?? '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{p.name}</p>
            <p className="text-xs text-white/30">Wants to join</p>
          </div>
          <button
            onClick={() => admit(p.identity)}
            disabled={admitting === p.identity}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 transition-colors flex-shrink-0"
          >
            {admitting === p.identity ? '...' : 'Admit'}
          </button>
        </div>
      ))}
    </div>
  );
}