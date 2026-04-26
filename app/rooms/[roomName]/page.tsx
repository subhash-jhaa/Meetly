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
  searchParams: Promise<{
    region?: string;
    hq?: string;
    codec?: string;
  }>;
}) {
  const session = await auth();
  if (!session?.user) redirect('/signin');

  const _params = await params;
  const _searchParams = await searchParams;
  const { roomName } = _params;

  // ✅ Validate room exists
  const room = await prisma.room.findUnique({
    where: { name: roomName },
  });

  if (!room) {
    // Room doesn't exist — show not found UI
    return (
      <main
        data-lk-theme="default"
        style={{
          height: '100%',
          display: 'grid',
          placeItems: 'center',
          fontFamily: 'inherit',
        }}
      >
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h1 style={{ fontSize: '2rem', margin: 0 }}>Room not found</h1>
          <p style={{ color: 'var(--lk-fg3)', margin: 0 }}>
            This meeting link is invalid or has expired.
          </p>
          <a href="/dashboard" className="lk-button" style={{ marginTop: '0.5rem' }}>
            Go to Dashboard
          </a>
        </div>
      </main>
    );
  }

  // ✅ Check if scheduled meeting is too early to join
  const scheduledMeeting = await prisma.meeting.findFirst({
    where: {
      roomName,
      scheduledAt: { not: null },
      endedAt: null,
    },
    select: { scheduledAt: true, title: true },
  });

  if (scheduledMeeting?.scheduledAt) {
    const diffMinutes =
      (new Date(scheduledMeeting.scheduledAt).getTime() - Date.now()) / 1000 / 60;

    if (diffMinutes > 5) {
      const formattedTime = new Date(scheduledMeeting.scheduledAt).toLocaleString();
      return (
        <main
          data-lk-theme="default"
          style={{
            height: '100%',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <h1 style={{ fontSize: '2rem', margin: 0 }}>Meeting hasn't started yet</h1>
            {scheduledMeeting.title && (
              <p style={{ fontSize: '1.25rem', margin: 0 }}>{scheduledMeeting.title}</p>
            )}
            <p style={{ color: 'var(--lk-fg3)', margin: 0 }}>
              Scheduled for {formattedTime}
            </p>
            <p style={{ color: 'var(--lk-fg3)', margin: 0, fontSize: '0.875rem' }}>
              You can join 5 minutes before the meeting starts.
            </p>
            <a href="/dashboard" className="lk-button" style={{ marginTop: '0.5rem' }}>
              Go to Dashboard
            </a>
          </div>
        </main>
      );
    }
  }

  const codec =
    typeof _searchParams.codec === 'string' && isVideoCodec(_searchParams.codec)
      ? _searchParams.codec
      : 'vp9';
  const hq = _searchParams.hq === 'true' ? true : false;

  return (
    <PageClientImpl
      roomName={roomName}
      region={_searchParams.region}
      hq={hq}
      codec={codec}
    />
  );
}