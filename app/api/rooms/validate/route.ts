import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const roomName = req.nextUrl.searchParams.get('roomName');
  if (!roomName) {
    return NextResponse.json({ error: 'Missing roomName' }, { status: 400 });
  }

  const room = await prisma.room.findUnique({
    where: { name: roomName },
    select: {
      id: true,
      name: true,
      hostId: true,
      createdAt: true,
    },
  });

  if (!room) {
    return NextResponse.json({ valid: false, error: 'Room not found' }, { status: 404 });
  }

  // Also check if there's a scheduled meeting that hasn't started yet
  const scheduledMeeting = await prisma.meeting.findFirst({
    where: {
      roomName,
      scheduledAt: { not: null },
      endedAt: null,
    },
    select: { scheduledAt: true, title: true },
  });

  const isTooEarly = scheduledMeeting?.scheduledAt
    ? (new Date(scheduledMeeting.scheduledAt).getTime() - Date.now()) / 1000 / 60 > 5
    : false;

  return NextResponse.json({
    valid: true,
    roomName: room.name,
    isHost: room.hostId === session.user.id,
    scheduledAt: scheduledMeeting?.scheduledAt ?? null,
    title: scheduledMeeting?.title ?? null,
    isTooEarly,
  });
}