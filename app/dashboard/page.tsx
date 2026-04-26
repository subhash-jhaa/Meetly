'use client';

import { useRouter } from 'next/navigation';
import React, { Suspense, useState, useEffect } from 'react';
import { encodePassphrase, generateRoomId, randomString } from '@/lib/client-utils';

// ─── Types ────────────────────────────────────────────────────────────────────

type Meeting = {
  id: string;
  roomName: string;
  title: string | null;
  startedAt: string;
  endedAt: string | null;
  duration: number | null;
  scheduledAt: string | null;
  recordingUrl: string | null;
  participants: { displayName: string }[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const h = Math.floor(m / 60);
  if (h > 0) return `${h}h ${m % 60}m`;
  return `${m}m`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  });
}

function timeUntil(iso: string): string {
  const diff = new Date(iso).getTime() - Date.now();
  const m = Math.floor(diff / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (d > 0) return `in ${d}d ${h % 24}h`;
  if (h > 0) return `in ${h}h ${m % 60}m`;
  return `in ${m}m`;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/5 rounded-xl ${className ?? ''}`} />
  );
}

// ─── Schedule Modal ────────────────────────────────────────────────────────────

function ScheduleModal({
  onClose,
  onScheduled,
}: {
  onClose: () => void;
  onScheduled: (data: { roomName: string; scheduledAt: string; title: string }) => void;
}) {
  const [title, setTitle] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    const res = await fetch('/api/meeting/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, scheduledAt }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Something went wrong');
      setIsLoading(false);
      return;
    }
    onScheduled(data);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#141416] border border-white/10 rounded-2xl p-6 w-full max-w-md flex flex-col gap-5 mx-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-white">Schedule a meeting</h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-white/50">Meeting title</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-indigo-500 transition-colors"
            placeholder="e.g. Weekly sync"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-white/50">Date & time</label>
          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
            type="datetime-local"
            value={scheduledAt}
            min={new Date(Date.now() + 5 * 60000).toISOString().slice(0, 16)}
            onChange={e => setScheduledAt(e.target.value)}
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <div className="flex gap-2 justify-end mt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-white/50 bg-white/5 hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !title || !scheduledAt}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Scheduling...' : 'Schedule'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

function DashboardContent() {
  const router = useRouter();

  const [pastMeetings, setPastMeetings] = useState<Meeting[]>([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [loadingPast, setLoadingPast] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [inviteTitle, setInviteTitle] = useState('');
  const [copied, setCopied] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  useEffect(() => {
    fetch('/api/meeting/history')
      .then(r => r.json())
      .then(d => { setPastMeetings(d.meetings ?? []); setLoadingPast(false); })
      .catch(() => setLoadingPast(false));
  }, []);

  useEffect(() => {
    fetch('/api/meeting/upcoming')
      .then(r => r.json())
      .then(d => { setUpcomingMeetings(d.meetings ?? []); setLoadingUpcoming(false); })
      .catch(() => setLoadingUpcoming(false));
  }, []);

  const startInstantMeeting = async () => {
    setIsStarting(true);
    const roomId = generateRoomId();
    await fetch('/api/rooms/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomName: roomId }),
    });
    setInviteLink(`${window.location.origin}/rooms/${roomId}`);
    setInviteTitle('New Meeting');
    setIsStarting(false);
  };

  const enterMeeting = () => {
    const roomId = inviteLink.split('/rooms/')[1];
    router.push(`/rooms/${roomId}`);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const joinByCode = () => {
    const code = joinCode.trim();
    if (!code) return;
    router.push(`/rooms/${code}`);
  };

  const handleScheduled = (data: { roomName: string; scheduledAt: string; title: string }) => {
    setInviteLink(`${window.location.origin}/rooms/${data.roomName}`);
    setInviteTitle(data.title);
    setUpcomingMeetings(prev => [{
      id: data.roomName,
      roomName: data.roomName,
      title: data.title,
      scheduledAt: data.scheduledAt,
      startedAt: data.scheduledAt,
      endedAt: null,
      duration: null,
      recordingUrl: null,
      participants: [],
    }, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white">

      {/* Nav */}
      <nav className="sticky top-0 z-10 flex items-center justify-between px-6 h-14 border-b border-white/[0.07] bg-[#0c0c0e]">
        <span className="text-base font-semibold tracking-tight">
          Meet<span className="text-indigo-400">ly</span>
        </span>
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-semibold cursor-pointer">
          U
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 pb-16">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-medium tracking-tight">{getGreeting()} 👋</h1>
          <p className="text-sm text-white/40 mt-1">Here's what's happening with your meetings.</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <button
            onClick={startInstantMeeting}
            disabled={isStarting}
            className="flex flex-col gap-3 p-5 rounded-xl border border-indigo-500/30 bg-indigo-500/[0.06] hover:bg-indigo-500/10 hover:border-indigo-500/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-base">🎥</div>
            <div>
              <p className="text-sm font-medium">{isStarting ? 'Creating...' : 'New meeting'}</p>
              <p className="text-xs text-white/40 mt-0.5">Start an instant video call</p>
            </div>
          </button>

          <button
            onClick={() => setShowScheduleModal(true)}
            className="flex flex-col gap-3 p-5 rounded-xl border border-white/[0.07] bg-[#141416] hover:bg-[#1c1c1f] hover:border-white/[0.12] transition-all text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-base">📅</div>
            <div>
              <p className="text-sm font-medium">Schedule</p>
              <p className="text-xs text-white/40 mt-0.5">Plan a meeting for later</p>
            </div>
          </button>

          <button
            onClick={() => document.getElementById('join-input')?.focus()}
            className="flex flex-col gap-3 p-5 rounded-xl border border-white/[0.07] bg-[#141416] hover:bg-[#1c1c1f] hover:border-white/[0.12] transition-all text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-base">🔗</div>
            <div>
              <p className="text-sm font-medium">Join by code</p>
              <p className="text-xs text-white/40 mt-0.5">Enter a room code below</p>
            </div>
          </button>
        </div>

        {/* Invite link card */}
        {inviteLink && (
          <div className="flex items-center gap-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] mb-8">
            <span className="text-xl">✅</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-emerald-400 uppercase tracking-widest">{inviteTitle} — Ready</p>
              <p className="text-xs text-white/40 font-mono mt-0.5 truncate">{inviteLink}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={copyLink} className="px-3 py-1.5 rounded-lg text-xs text-white/60 bg-white/5 hover:bg-white/10 transition-colors">
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={enterMeeting} className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors">
                Enter →
              </button>
            </div>
          </div>
        )}

        {/* Join by code */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.07] bg-[#141416] mb-8">
          <span className="text-sm text-white/30 flex-shrink-0">Join:</span>
          <input
            id="join-input"
            className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none font-mono"
            placeholder="Paste a room code or link..."
            value={joinCode}
            onChange={e => setJoinCode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && joinByCode()}
          />
          <button
            onClick={joinByCode}
            disabled={!joinCode.trim()}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            Join
          </button>
        </div>

        {/* Upcoming meetings */}
        {(upcomingMeetings.length > 0 || loadingUpcoming) && (
          <div className="mb-8">
            <p className="text-xs font-medium tracking-widest uppercase text-white/30 mb-3">Upcoming</p>
            <div className="flex flex-col gap-2">
              {loadingUpcoming ? (
                [1, 2].map(i => <Skeleton key={i} className="h-16" />)
              ) : upcomingMeetings.map(m => (
                <div key={m.id} className="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-white/[0.07] bg-[#141416]">
                  <div className="min-w-[48px] text-center bg-white/5 rounded-lg px-2 py-1.5">
                    <div className="text-lg font-medium leading-none">{new Date(m.scheduledAt!).getDate()}</div>
                    <div className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">
                      {new Date(m.scheduledAt!).toLocaleString('en', { month: 'short' })}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{m.title ?? 'Untitled Meeting'}</p>
                    <p className="text-xs text-white/40 mt-0.5">{formatTime(m.scheduledAt!)}</p>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 flex-shrink-0">
                    {timeUntil(m.scheduledAt!)}
                  </span>
                  <button
                    onClick={() => router.push(`/rooms/${m.roomName}`)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex-shrink-0"
                  >
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past meetings */}
        <div>
          <p className="text-xs font-medium tracking-widest uppercase text-white/30 mb-3">Past meetings</p>

          {loadingPast ? (
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-14" />)}
            </div>
          ) : pastMeetings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 rounded-xl border border-white/[0.07] bg-[#141416] text-white/30">
              <span className="text-3xl mb-3">📭</span>
              <p className="text-sm">No past meetings yet. Start your first one above!</p>
            </div>
          ) : (
            <div className="rounded-xl border border-white/[0.07] overflow-hidden bg-[#141416]">
              {/* Header */}
              <div className="grid grid-cols-[1fr_120px_80px_140px_90px] px-4 py-2.5 border-b border-white/[0.07] text-[10px] font-medium tracking-widest uppercase text-white/20">
                <span>Meeting</span>
                <span>Date</span>
                <span>Duration</span>
                <span>Participants</span>
                <span>Recording</span>
              </div>

              {/* Rows */}
              {pastMeetings.map((m, i) => (
                <div
                  key={m.id}
                  className={`grid grid-cols-[1fr_120px_80px_140px_90px] px-4 py-3.5 items-center hover:bg-white/[0.02] transition-colors ${
                    i < pastMeetings.length - 1 ? 'border-b border-white/[0.05]' : ''
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{m.title ?? 'Instant meeting'}</p>
                    <p className="text-[11px] text-white/25 font-mono mt-0.5 truncate">{m.roomName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50">{formatDate(m.startedAt)}</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{formatTime(m.startedAt)}</p>
                  </div>
                  <p className="text-xs text-white/50">
                    {m.duration ? formatDuration(m.duration) : '—'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {m.participants.length === 0 ? (
                      <span className="text-xs text-white/25">—</span>
                    ) : (
                      <>
                        {m.participants.slice(0, 2).map((p, j) => (
                          <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/[0.07]">
                            {p.displayName}
                          </span>
                        ))}
                        {m.participants.length > 2 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/[0.07]">
                            +{m.participants.length - 2}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div>
                    {m.recordingUrl ? (
                      <button
                        onClick={() => window.open(m.recordingUrl!, '_blank')}
                        className="text-xs text-indigo-400 hover:text-indigo-300 underline transition-colors"
                      >
                        Download
                      </button>
                    ) : (
                      <span className="text-xs text-white/20">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Schedule modal */}
      {showScheduleModal && (
        <ScheduleModal
          onClose={() => setShowScheduleModal(false)}
          onScheduled={handleScheduled}
        />
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0c0c0e] flex items-center justify-center text-white/30 text-sm">
        Loading...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}