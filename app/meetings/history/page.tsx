'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Participant = {
  displayName: string;
  joinedAt: string;
  leftAt: string | null;
  user: { image: string | null };
};

type Meeting = {
  id: string;
  roomName: string;
  title: string | null;
  startedAt: string;
  endedAt: string | null;
  duration: number | null;
  recordingUrl: string | null;
  status: string;
  participants: Participant[];
  summary: { id: string; content: string } | null;
};

type Pagination = {
  page: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${m % 60}m` : `${m}m`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  });
}

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

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-white/40 uppercase tracking-widest mb-1">
      <span className="w-3 h-px bg-white/30" />
      {text}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    COMPLETED: 'text-white/50 border-white/10',
    PROCESSING: 'text-amber-400/70 border-amber-400/20',
    FAILED: 'text-red-400/70 border-red-400/20',
    ACTIVE: 'text-green-400/70 border-green-400/20',
  };
  const label: Record<string, string> = {
    COMPLETED: 'Summarized',
    PROCESSING: 'Processing AI…',
    FAILED: 'AI failed',
    ACTIVE: 'Live',
  };
  return (
    <span className={`font-mono text-[10px] px-2 py-1 border ${map[status] ?? 'text-white/30 border-white/10'}`}>
      {label[status] ?? status}
    </span>
  );
}

function ParticipantAvatars({ participants }: { participants: Participant[] }) {
  const shown = participants.slice(0, 4);
  const extra = participants.length - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((p, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-full border border-[#0a0a0a] bg-[#222] overflow-hidden -ml-1 first:ml-0 flex items-center justify-center"
          title={p.displayName}
        >
          {p.user.image ? (
            <img src={p.user.image} alt={p.displayName} className="w-full h-full object-cover" />
          ) : (
            <span className="font-mono text-[9px] text-white/40">
              {p.displayName.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      ))}
      {extra > 0 && (
        <div className="w-6 h-6 rounded-full border border-[#0a0a0a] bg-[#1a1a1a] -ml-1 flex items-center justify-center">
          <span className="font-mono text-[9px] text-white/40">+{extra}</span>
        </div>
      )}
      {participants.length > 0 && (
        <span className="font-mono text-[11px] text-white/30 ml-2">
          {participants.length} participant{participants.length !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}

export default function HistoryPage() {
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/meetings/history?page=${page}`)
      .then(r => r.json())
      .then(d => {
        setMeetings(d.meetings ?? []);
        setPagination(d.pagination ?? null);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">

      {/* NAV */}
      <nav className="sticky top-0 z-50 w-full flex justify-center bg-[#0a0a0a]/90 backdrop-blur-md pt-4 px-4">
        <div className="relative flex w-full max-w-[1200px] h-[64px] items-center justify-between border border-[#242424] bg-[#0a0908] px-6">
          <Corners />
          <img
            src="https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png?width=512&height=512"
            alt="Meetly"
            className="h-7 w-7 rounded-[4px] object-contain"
          />
          
          <a
            href="/dashboard"
            className="font-mono text-[12px] text-white/40 hover:text-white transition-colors"
          >
            ← Dashboard
          </a>
        </div>
      </nav>

      <div className="flex flex-col items-center px-4 pb-20">
        <div className="w-full max-w-[1200px]">

          {/* HEADER */}
          <div className="border-x border-[#242424] px-8 pt-16 pb-10">
            <Eyebrow text="Archive" />
            <h1 className="text-[clamp(28px,4vw,48px)] font-normal tracking-[-0.04em] leading-[1.1]">
              Meeting History
            </h1>
            {pagination && (
              <p className="font-mono text-[12px] text-white/30 mt-2">
                {pagination.total} meeting{pagination.total !== 1 ? 's' : ''} total
              </p>
            )}
          </div>

          {/* TABLE HEADER */}
          <div className="border border-[#242424] border-t-0 hidden md:grid
                          grid-cols-[1fr_120px_140px_100px_160px] gap-0
                          px-8 py-3 bg-[#0a0908]">
            {['Meeting', 'Date', 'Participants', 'Duration', 'Actions'].map(h => (
              <span key={h} className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                {h}
              </span>
            ))}
          </div>

          {/* LOADING */}
          {loading && (
            <div className="border border-[#242424] border-t-0 px-8 py-16 text-center">
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto" />
            </div>
          )}

          {/* EMPTY */}
          {!loading && meetings.length === 0 && (
            <div className="border border-[#242424] border-t-0 px-8 py-20 text-center">
              <Eyebrow text="Empty" />
              <p className="text-[14px] text-white/40">No completed meetings yet.</p>
              <p className="font-mono text-[12px] text-white/20 mt-1">
                Start a meeting from the dashboard.
              </p>
            </div>
          )}

          {/* ROWS */}
          {!loading && meetings.map((m, i) => {
            const isExpanded = expanded === m.id;
            return (
              <div key={m.id} className="border border-[#242424] border-t-0">

                {/* Main row */}
                <div
                  className="grid grid-cols-1 md:grid-cols-[1fr_120px_140px_100px_160px]
                              gap-3 md:gap-0 px-8 py-5 cursor-pointer
                              hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpanded(isExpanded ? null : m.id)}
                >
                  {/* Title + status */}
                  <div className="flex flex-col gap-1.5 justify-center">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[14px] text-white">
                        {m.title ?? 'Untitled meeting'}
                      </span>
                      <StatusBadge status={m.status} />
                    </div>
                    <span className="font-mono text-[11px] text-white/30 md:hidden">
                      {formatDate(m.startedAt)} · {formatTime(m.startedAt)}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="hidden md:flex flex-col justify-center">
                    <span className="font-mono text-[12px] text-white/50">
                      {formatDate(m.startedAt)}
                    </span>
                    <span className="font-mono text-[11px] text-white/30">
                      {formatTime(m.startedAt)}
                    </span>
                  </div>

                  {/* Participants */}
                  <div className="hidden md:flex items-center">
                    <ParticipantAvatars participants={m.participants} />
                  </div>

                  {/* Duration */}
                  <div className="hidden md:flex items-center">
                    <span className="font-mono text-[12px] text-white/50">
                      {m.duration ? formatDuration(m.duration) : '—'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {m.status === 'COMPLETED' && m.summary && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          router.push(`/meetings/${m.id}/summary`);
                        }}
                        className="font-mono text-[11px] text-white/50 border
                                   border-[#242424] px-3 py-1.5 hover:text-white
                                   hover:border-white/30 transition-colors whitespace-nowrap"
                      >
                        Summary →
                      </button>
                    )}
                    {m.recordingUrl && (
                      <a
                        href={m.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="font-mono text-[11px] text-white/50 border
                                   border-[#242424] px-3 py-1.5 hover:text-white
                                   hover:border-white/30 transition-colors"
                      >
                        Recording
                      </a>
                    )}
                    <span className="font-mono text-[11px] text-white/20 ml-auto md:hidden">
                      {isExpanded ? '↑' : '↓'}
                    </span>
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-[#242424] px-8 py-6 bg-[#0a0908]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                      {/* Participants list */}
                      <div>
                        <Eyebrow text="Participants" />
                        {m.participants.length === 0 ? (
                          <p className="font-mono text-[12px] text-white/20">None recorded</p>
                        ) : (
                          <ul className="flex flex-col gap-2">
                            {m.participants.map((p, j) => {
                              const duration = p.leftAt
                                ? Math.round((new Date(p.leftAt).getTime() - new Date(p.joinedAt).getTime()) / 60000)
                                : null;
                              return (
                                <li key={j} className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-[#222] overflow-hidden flex-shrink-0 flex items-center justify-center">
                                    {p.user.image ? (
                                      <img src={p.user.image} alt={p.displayName} className="w-full h-full object-cover" />
                                    ) : (
                                      <span className="font-mono text-[8px] text-white/40">
                                        {p.displayName.charAt(0).toUpperCase()}
                                      </span>
                                    )}
                                  </div>
                                  <span className="font-mono text-[12px] text-white/60">{p.displayName}</span>
                                  {duration && (
                                    <span className="font-mono text-[10px] text-white/20 ml-auto">
                                      {duration}m
                                    </span>
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>

                      {/* AI Summary preview */}
                      <div className="md:col-span-2">
                        <Eyebrow text="Summary preview" />
                        {m.summary?.content ? (
                          <>
                            <p className="text-[13px] text-white/50 leading-[1.7] line-clamp-4">
                              {m.summary.content}
                            </p>
                            <button
                              onClick={() => router.push(`/meetings/${m.id}/summary`)}
                              className="font-mono text-[11px] text-white/40 mt-3
                                         hover:text-white transition-colors"
                            >
                              Read full summary →
                            </button>
                          </>
                        ) : m.status === 'PROCESSING' ? (
                          <p className="font-mono text-[12px] text-amber-400/50">
                            AI is generating your summary…
                          </p>
                        ) : (
                          <p className="font-mono text-[12px] text-white/20">
                            No summary available.
                          </p>
                        )}
                      </div>

                    </div>
                  </div>
                )}

              </div>
            );
          })}

          {/* PAGINATION */}
          {pagination && pagination.pages > 1 && (
            <div className="border border-[#242424] border-t-0 px-8 py-5
                            flex items-center justify-between">
              <span className="font-mono text-[11px] text-white/30">
                Page {pagination.page} of {pagination.pages}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => p - 1)}
                  disabled={!pagination.hasPrev}
                  className="font-mono text-[11px] text-white/40 border border-[#242424]
                             px-3 py-1.5 hover:text-white hover:border-white/30
                             transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={!pagination.hasNext}
                  className="font-mono text-[11px] text-white/40 border border-[#242424]
                             px-3 py-1.5 hover:text-white hover:border-white/30
                             transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}