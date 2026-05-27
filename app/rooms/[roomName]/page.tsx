import * as React from 'react';
import { PageClientImpl } from './PageClientImpl';
import { isVideoCodec } from '@/lib/types';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ roomName: string }>;
  searchParams: Promise<{ region?: string; hq?: string; codec?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect('/signin');

  const _params = await params;
  const _searchParams = await searchParams;
  const { roomName } = _params;

  const room = await prisma.room.findUnique({ where: { name: roomName } });

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="text-5xl">🔍</div>
          <h1 className="text-2xl font-semibold text-white">Room not found</h1>
          <p className="text-white/40 font-mono text-[13px]">
            This meeting link is invalid or has expired.
          </p>
          
            <a href="/dashboard"
            className="mt-2 px-5 py-2.5 border border-white/12 bg-surface
                       text-white text-[13px] font-mono rounded-[2px]
                       hover:bg-white/5 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const scheduledMeeting = await prisma.meeting.findFirst({
    where: { roomName, scheduledAt: { not: null }, endedAt: null },
    select: { scheduledAt: true, title: true },
  });

  if (scheduledMeeting?.scheduledAt) {
    const diffMinutes =
      (new Date(scheduledMeeting.scheduledAt).getTime() - Date.now()) / 1000 / 60;

    if (diffMinutes > 5) {
      const formattedTime = new Date(scheduledMeeting.scheduledAt).toLocaleString();
      return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-4">
          <div className="text-5xl">⏰</div>
          <h1 className="text-2xl font-semibold text-white">
            Meeting hasn't started yet
          </h1>
          {scheduledMeeting.title && (
            <p className="text-lg text-white/70">{scheduledMeeting.title}</p>
          )}
          <p className="text-white/40 font-mono text-[13px]">Scheduled for {formattedTime}</p>
          <p className="text-white/20 font-mono text-[11px]">
            You can join 5 minutes before the meeting starts.
          </p>
          
            <a href="/dashboard"
            className="mt-2 px-5 py-2.5 border border-white/12 bg-surface
                       text-white text-[13px] font-mono rounded-[2px]
                       hover:bg-white/5 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
      );
    }
  }

  const codec =
    typeof _searchParams.codec === 'string' && isVideoCodec(_searchParams.codec)
      ? _searchParams.codec
      : 'vp9';
  const hq = _searchParams.hq === 'true';

  return (
    <PageClientImpl
      roomName={roomName}
      region={_searchParams.region}
      hq={hq}
      codec={codec}
    />
  );
}