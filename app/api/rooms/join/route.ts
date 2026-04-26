import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { roomName } = await req.json();
  if (!roomName || typeof roomName !== 'string') {
    return NextResponse.json({ error: 'Missing roomName' }, { status: 400 });
  }

  // Find the active meeting for this room
  const meeting = await prisma.meeting.findFirst({
    where: { roomName, endedAt: null },
    orderBy: { startedAt: 'desc' },
  });

  if (!meeting) {
    return NextResponse.json({ error: 'No active meeting found' }, { status: 404 });
  }

  // Record participant — upsert so rejoining doesn't create duplicates
  await prisma.participant.upsert({
    where: {
      meetingId_userId: {
        meetingId: meeting.id,
        userId: session.user.id,
      },
    },
    update: {
      joinedAt: new Date(),
      leftAt: null,
    },
    create: {
      meetingId: meeting.id,
      userId: session.user.id,
      displayName: session.user.name ?? 'Participant',
    },
  });

  return NextResponse.json({ meetingId: meeting.id });
}