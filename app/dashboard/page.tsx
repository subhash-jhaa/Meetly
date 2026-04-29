'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';

type Meeting = {
  id: string;
  roomName: string;
  title: string | null;
  startedAt: string;
  endedAt: string | null;
  duration: number | null;
  scheduledAt: string | null;
  status: string;
};

function formatDuration(s: number) {
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${m % 60}m` : `${m}m`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function timeUntil(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `in ${d}d`;
  if (h > 0) return `in ${h}h`;
  return `in ${m}m`;
}

// Corner marker decoration — same as landing page
function Corners({ size = 7, opacity = '10' }: { size?: number; opacity?: string }) {
  const s = `${size}px`;
  const cls = `bg-white/${opacity}`;
  return (
    <>
      <div className={`absolute -left-px -top-px h-[${s}] w-px ${cls}`} />
      <div className={`absolute -left-px -top-px h-px w-[${s}] ${cls}`} />
      <div className={`absolute -right-px -top-px h-[${s}] w-px ${cls}`} />
      <div className={`absolute -right-px -top-px h-px w-[${s}] ${cls}`} />
      <div className={`absolute -left-px -bottom-px h-[${s}] w-px ${cls}`} />
      <div className={`absolute -left-px -bottom-px h-px w-[${s}] ${cls}`} />
      <div className={`absolute -right-px -bottom-px h-[${s}] w-px ${cls}`} />
      <div className={`absolute -right-px -bottom-px h-px w-[${s}] ${cls}`} />
    </>
  );
}

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-white/40 uppercase tracking-widest mb-3">
      <span className="w-3 h-px bg-white/30" />
      {text}
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const [upcoming, setUpcoming] = useState<Meeting[]>([]);
  const [history, setHistory] = useState<Meeting[]>([]);
  const [tab, setTab] = useState<'instant' | 'schedule'>('instant');
  const [joinCode, setJoinCode] = useState('');
  const [title, setTitle] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/meetings/upcoming').then(r => r.json()).then(d => setUpcoming(d.meetings ?? []));
    fetch('/api/meetings/history').then(r => r.json()).then(d => setHistory(d.meetings ?? []));
  }, []);

  async function startInstant() {
    setLoading(true);
    const roomName = generateRoomId();
    const res = await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName, title: title || 'Instant Meeting' }),
    });
    if (res.ok) router.push(`/rooms/${roomName}`);
    setLoading(false);
  }

  async function scheduleRoom() {
    setLoading(true);
    const roomName = generateRoomId();
    const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
    const res = await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName, title: title || 'Scheduled Meeting', scheduledAt }),
    });
    if (res.ok) {
      const d = await res.json();
      router.push(`/rooms/${d.roomName}`);
    }
    setLoading(false);
  }

  async function joinRoom() {
    if (!joinCode.trim()) return;
    router.push(`/rooms/${joinCode.trim()}`);
  }

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">

      {/* NAV */}
      <nav className="sticky top-0 z-50 w-full flex justify-center bg-[#0a0a0a]/90 backdrop-blur-md pt-4 px-4">
        <div className="relative flex w-full max-w-[1200px] h-[64px] items-center justify-between border border-[#242424] bg-[#0a0908] px-6">
          <Corners />
          <div className="flex items-center gap-2">
            <img
              src="https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png?width=512&height=512"
              alt="Meetly"
              className="h-7 w-7 rounded-[4px] object-contain"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] text-white/40 hidden md:block">
              {session?.user?.name}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="relative border border-[#242424] bg-[#0a0908] px-4 py-2 font-mono text-[12px] text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Corners size={5} opacity="20" />
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-col items-center px-4 pb-20">
        <div className="w-full max-w-[1200px]">

          {/* HEADER */}
          <div className="border-x border-[#242424] px-8 pt-16 pb-10 relative">
            <div className="absolute inset-0 repeating-grid-subtle pointer-events-none" />
            <Eyebrow text="Dashboard" />
            <h1 className="text-[clamp(28px,4vw,48px)] font-normal tracking-[-0.04em] leading-[1.1] text-white">
              {greeting}{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}.
            </h1>
            <p className="text-white/40 text-[14px] mt-2 font-mono">
              What are we meeting about today?
            </p>
          </div>

          {/* MAIN GRID */}
          <div className="border border-[#242424] border-t-0 flex flex-col md:flex-row">

            {/* LEFT — New Meeting */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-[#242424] p-8">
              <Eyebrow text="New meeting" />

              {/* Tab toggle */}
              <div className="flex border border-[#242424] w-fit mb-6">
                {(['instant', 'schedule'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2 font-mono text-[12px] capitalize transition-colors ${
                      tab === t ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {t === 'instant' ? 'Start now' : 'Schedule'}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Meeting title (optional)"
                  className="w-full bg-[#111] border border-[#242424] px-4 py-3 font-mono text-[13px] text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />

                {tab === 'schedule' && (
                  <div className="flex gap-3">
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={e => setScheduleDate(e.target.value)}
                      className="flex-1 bg-[#111] border border-[#242424] px-4 py-3 font-mono text-[13px] text-white focus:outline-none focus:border-white/30 transition-colors"
                    />
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={e => setScheduleTime(e.target.value)}
                      className="flex-1 bg-[#111] border border-[#242424] px-4 py-3 font-mono text-[13px] text-white focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                )}

                <button
                  onClick={tab === 'instant' ? startInstant : scheduleRoom}
                  disabled={loading || (tab === 'schedule' && (!scheduleDate || !scheduleTime))}
                  className="relative w-full bg-white text-black font-mono text-[13px] py-3 hover:opacity-90 transition-opacity disabled:opacity-30"
                >
                  <Corners size={5} opacity="20" />
                  {loading ? 'Starting...' : tab === 'instant' ? 'Start meeting' : 'Schedule meeting'}
                </button>
              </div>
            </div>

            {/* RIGHT — Join */}
            <div className="flex-1 p-8">
              <Eyebrow text="Join a meeting" />
              <div className="flex flex-col gap-3">
                <input
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && joinRoom()}
                  placeholder="Enter room code or link"
                  className="w-full bg-[#111] border border-[#242424] px-4 py-3 font-mono text-[13px] text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  onClick={joinRoom}
                  disabled={!joinCode.trim()}
                  className="relative w-full border border-[#242424] bg-[#0a0908] text-white font-mono text-[13px] py-3 hover:bg-white/5 transition-colors disabled:opacity-30"
                >
                  <Corners size={5} opacity="20" />
                  Join room
                </button>
              </div>
            </div>
          </div>

          {/* UPCOMING MEETINGS */}
          {upcoming.length > 0 && (
            <div className="border border-[#242424] border-t-0">
              <div className="border-b border-[#242424] px-8 py-5">
                <Eyebrow text="Upcoming" />
              </div>
              {upcoming.map((m, i) => (
                <div
                  key={m.id}
                  className={`flex items-center justify-between px-8 py-5 hover:bg-white/[0.02] transition-colors cursor-pointer ${
                    i < upcoming.length - 1 ? 'border-b border-[#242424]' : ''
                  }`}
                  onClick={() => router.push(`/rooms/${m.roomName}`)}
                >
                  <div>
                    <p className="text-[14px] text-white">{m.title ?? 'Untitled meeting'}</p>
                    <p className="font-mono text-[11px] text-white/40 mt-1">
                      {formatDate(m.scheduledAt!)} · {formatTime(m.scheduledAt!)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-white/30">
                      {timeUntil(m.scheduledAt!)}
                    </span>
                    <span className="font-mono text-[11px] px-2 py-1 border border-white/10 text-white/50">
                      Join →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MEETING HISTORY */}
          <div className="border border-[#242424] border-t-0">
            <div className="border-b border-[#242424] px-8 py-5">
              <Eyebrow text="Recent meetings" />
            </div>

            {history.length === 0 ? (
              <div className="px-8 py-16 text-center">
                <p className="font-mono text-[13px] text-white/20">No meetings yet.</p>
                <p className="font-mono text-[11px] text-white/10 mt-1">
                  Start your first meeting above.
                </p>
              </div>
            ) : (
              history.map((m, i) => (
                <div
                  key={m.id}
                  className={`flex items-center justify-between px-8 py-5 hover:bg-white/[0.02] transition-colors ${
                    i < history.length - 1 ? 'border-b border-[#242424]' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-white truncate">
                      {m.title ?? 'Untitled meeting'}
                    </p>
                    <p className="font-mono text-[11px] text-white/40 mt-1">
                      {formatDate(m.startedAt)} · {formatTime(m.startedAt)}
                      {m.duration ? ` · ${formatDuration(m.duration)}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    {m.status === 'PROCESSING' && (
                      <span className="font-mono text-[11px] text-amber-400/70 border border-amber-400/20 px-2 py-1">
                        Processing AI…
                      </span>
                    )}
                    {m.status === 'COMPLETED' && (
                      <button
                        onClick={() => router.push(`/meetings/${m.id}/summary`)}
                        className="font-mono text-[11px] text-white/50 border border-[#242424] px-3 py-1 hover:text-white hover:border-white/30 transition-colors"
                      >
                        View summary →
                      </button>
                    )}
                    {m.status === 'FAILED' && (
                      <span className="font-mono text-[11px] text-red-400/70 border border-red-400/20 px-2 py-1">
                        AI failed
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}