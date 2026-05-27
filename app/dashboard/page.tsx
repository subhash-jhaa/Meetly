'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';
import { Corners, Eyebrow, Button } from '@/components/ui/primitives';
import { AppNavbar } from '@/components/ui/AppNavbar';

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

function StatusDot({ status }: { status: string }) {
  const colors = {
    PROCESSING: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse',
    COMPLETED: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
    FAILED: 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]',
  }[status] || 'bg-zinc-500';

  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors}`} />;
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
  const [createdRoom, setCreatedRoom] = useState<{ url: string; roomName: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/meeting/upcoming').then(r => r.json()).then(d => setUpcoming(d.meetings ?? []));
    fetch('/api/meeting/history').then(r => r.json()).then(d => setHistory(d.meetings ?? []));
  }, []);

  async function startInstant() {
    setLoading(true);
    const roomName = generateRoomId();
    const res = await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName, title: title || 'Instant Meeting' }),
    });
    if (res.ok) {
      setCreatedRoom({ roomName, url: `${window.location.origin}/rooms/${roomName}` });
    }
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
      setCreatedRoom({ roomName: d.roomName, url: `${window.location.origin}/rooms/${d.roomName}` });
      fetch('/api/meeting/upcoming').then(r => r.json()).then(data => setUpcoming(data.meetings ?? []));
    }
    setLoading(false);
  }

  async function joinRoom() {
    let code = joinCode.trim();
    if (!code) return;
    
    try {
      const urlString = code.startsWith('http') ? code : `https://${code}`;
      const url = new URL(urlString);
      const pathSegments = url.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        code = pathSegments[pathSegments.length - 1];
      }
    } catch {
      if (code.includes('/')) {
        code = code.split('/').filter(Boolean).pop() || code;
      }
    }
    
    code = code.split('?')[0].split('#')[0];

    router.push(`/rooms/${code}`);
  }

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div className="min-h-screen bg-background text-white selection:bg-white selection:text-black relative overflow-hidden">

      {/* ─── BACKGROUND VISUAL ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/cta-bg.png"
          alt="Dashboard background"
          fill
          className="object-cover opacity-15 grayscale"
          priority
        />
        {/* Vignette/Gradients to blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)]" />
      </div>

      <div className="relative z-10">
        {/* NAV */}
        <AppNavbar />

        <div className="flex flex-col items-center px-4 pb-20">
          <div className="w-full max-w-[1200px]">

          {/* HEADER */}
          <div className="border border-white/12 border-t-0 px-8 pt-12 pb-10 relative flex flex-col md:flex-row md:items-end md:justify-between gap-6 bg-surface/10">
            <Corners size={10} color="bg-white/15" />
            <div>
              <Eyebrow text="System Status: Active" variant="dot" className="mb-3" />
              <h1 className="text-[clamp(28px,3.5vw,40px)] font-normal tracking-[-0.04em] leading-[1.1] text-white">
                {greeting}{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}.
              </h1>
              <p className="text-white/40 text-[13px] mt-2 font-mono">
                What are we meeting about today?
              </p>
            </div>
            <div className="font-mono text-[11px] text-white/30 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
              DATE // {new Date().toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase()}
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="border-x border-b border-white/12 flex flex-col md:flex-row relative bg-surface/20">
            <Corners size={12} color="bg-white/10" />

            {/* LEFT — New Meeting */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-white/12 p-8 relative">
              <Corners size={8} color="bg-white/10" />
              <Eyebrow text="New meeting" variant="line" className="mb-4" />

              {/* Tab toggle */}
              <div className="flex border border-white/12 bg-surface w-fit mb-6 overflow-hidden relative">
                {(['instant', 'schedule'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-5 py-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-200 ${
                      tab === t
                        ? 'bg-white text-black font-medium'
                        : 'text-white/40 hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    {tab === t ? '• ' : ''}{t === 'instant' ? 'Start now' : 'Schedule'}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {createdRoom ? (
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="bg-surface-card border border-white/12 p-4 relative overflow-hidden flex flex-col gap-2">
                      <Corners size={4} color="bg-white/10" />
                      <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest">
                        Meeting Link
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="font-mono text-[12px] text-white/80 truncate flex-1 bg-surface-raised border border-white/5 px-3 py-2">
                          {createdRoom.url}
                        </p>
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(createdRoom.url);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          variant="outline"
                          className="!py-2 !px-3 text-[11px] lowercase tracking-normal"
                          showCorners={false}
                        >
                          {copied ? 'copied' : 'copy'}
                        </Button>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => router.push(`/rooms/${createdRoom.roomName}`)}
                        variant="primary"
                        className="flex-1 text-[12px]"
                      >
                        Join Room
                      </Button>
                      <Button
                        onClick={() => setCreatedRoom(null)}
                        variant="secondary"
                        className="flex-1 text-[12px]"
                      >
                        Done
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <input
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Meeting title (optional)"
                      className="w-full bg-surface-raised border border-white/12 focus:border-white/40 px-4 py-3 font-mono text-[13px] text-white placeholder-white/20 focus:outline-none transition-all duration-200 hover:border-white/20"
                    />

                    {tab === 'schedule' && (
                      <div className="flex gap-3">
                        <input
                          type="date"
                          value={scheduleDate}
                          onChange={e => setScheduleDate(e.target.value)}
                          className="flex-1 bg-surface-raised border border-white/12 focus:border-white/40 px-4 py-3 font-mono text-[13px] text-white focus:outline-none transition-all duration-200 hover:border-white/20 [color-scheme:dark]"
                        />
                        <input
                          type="time"
                          value={scheduleTime}
                          onChange={e => setScheduleTime(e.target.value)}
                          className="flex-1 bg-surface-raised border border-white/12 focus:border-white/40 px-4 py-3 font-mono text-[13px] text-white focus:outline-none transition-all duration-200 hover:border-white/20 [color-scheme:dark]"
                        />
                      </div>
                    )}

                    <Button
                      onClick={tab === 'instant' ? startInstant : scheduleRoom}
                      disabled={loading || (tab === 'schedule' && (!scheduleDate || !scheduleTime))}
                      variant="primary"
                      className="w-full disabled:opacity-30 disabled:pointer-events-none mt-1"
                    >
                      {loading ? 'Starting...' : tab === 'instant' ? 'Start meeting' : 'Schedule meeting'}
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* RIGHT — Join */}
            <div className="flex-1 p-8 relative">
              <Corners size={8} color="bg-white/10" />
              <Eyebrow text="Join a meeting" variant="line" className="mb-4" />
              <div className="flex flex-col gap-3">
                <input
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && joinRoom()}
                  placeholder="Enter room code or link"
                  className="w-full bg-surface-raised border border-white/12 focus:border-white/40 px-4 py-3 font-mono text-[13px] text-white placeholder-white/20 focus:outline-none transition-all duration-200 hover:border-white/20"
                />
                <Button
                  onClick={joinRoom}
                  disabled={!joinCode.trim()}
                  variant="secondary"
                  className="w-full disabled:opacity-30 disabled:pointer-events-none"
                >
                  Join room
                </Button>
              </div>
            </div>
          </div>

          {/* UPCOMING MEETINGS */}
          {upcoming.length > 0 && (
            <div className="border border-white/12 border-t-0 relative bg-surface/20">
              <Corners size={8} color="bg-white/10" />
              <div className="border-b border-white/12 px-8 py-5">
                <Eyebrow text="Upcoming" variant="line" />
              </div>
              {upcoming.map((m, i) => (
                <div
                  key={m.id}
                  className={`group flex items-center justify-between px-8 py-5 hover:bg-white/[0.02] transition-colors cursor-pointer ${
                    i < upcoming.length - 1 ? 'border-b border-white/12' : ''
                  }`}
                  onClick={() => router.push(`/rooms/${m.roomName}`)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-white/40 transition-all font-mono text-[13px]">
                        &gt;
                      </span>
                      <p className="text-[14px] text-white font-medium group-hover:text-white transition-colors">
                        {m.title ?? 'Untitled meeting'}
                      </p>
                    </div>
                    <p className="font-mono text-[11px] text-white/40 mt-1 pl-0 group-hover:pl-2 transition-all">
                      {formatDate(m.scheduledAt!)} · {formatTime(m.scheduledAt!)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <span className="font-mono text-[11px] text-white/30">
                      {timeUntil(m.scheduledAt!)}
                    </span>
                    <span className="font-mono text-[11px] px-2.5 py-1 border border-white/10 text-white/50 group-hover:text-white group-hover:border-white/30 transition-all rounded-[2px]">
                      Join →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MEETING HISTORY */}
          <div className="border border-white/12 border-t-0 relative bg-surface/20">
            <Corners size={8} color="bg-white/10" />
            <div className="border-b border-white/12 px-8 py-5">
              <Eyebrow text="Recent meetings" variant="line" />
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
                  className={`group flex items-center justify-between px-8 py-5 hover:bg-white/[0.02] transition-colors ${
                    i < history.length - 1 ? 'border-b border-white/12' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 text-white/40 transition-all font-mono text-[13px]">
                        &gt;
                      </span>
                      <p className="text-[14px] text-white truncate font-medium group-hover:text-white transition-colors">
                        {m.title ?? 'Untitled meeting'}
                      </p>
                    </div>
                    <p className="font-mono text-[11px] text-white/40 mt-1 pl-0 group-hover:pl-2 transition-all">
                      {formatDate(m.startedAt)} · {formatTime(m.startedAt)}
                      {m.duration ? ` · ${formatDuration(m.duration)}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    {m.status === 'PROCESSING' && (
                      <span className="flex items-center gap-2 font-mono text-[11px] text-amber-400/80 border border-amber-400/20 bg-amber-400/5 px-2.5 py-1 rounded-[2px]">
                        <StatusDot status="PROCESSING" />
                        Processing AI…
                      </span>
                    )}
                    {m.status === 'COMPLETED' && (
                      <button
                        onClick={() => router.push(`/meetings/${m.id}/summary`)}
                        className="flex items-center gap-2 font-mono text-[11px] text-white/60 border border-white/12 px-3 py-1 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all rounded-[2px]"
                      >
                        <StatusDot status="COMPLETED" />
                        View summary →
                      </button>
                    )}
                    {m.status === 'FAILED' && (
                      <span className="flex items-center gap-2 font-mono text-[11px] text-red-400/80 border border-red-400/20 bg-red-400/5 px-2.5 py-1 rounded-[2px]">
                        <StatusDot status="FAILED" />
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
    </div>
  );
}