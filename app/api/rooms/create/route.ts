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

  // Register room with host
  await prisma.room.upsert({
    where: { name: roomName },
    update: {},
    create: {
      name: roomName,
      hostId: session.user.id,
    },
  });

  // Check if a scheduled meeting already exists for this room
  const existingScheduled = await prisma.meeting.findFirst({
    where: { roomName, scheduledAt: { not: null }, endedAt: null },
  });

  // If a scheduled meeting exists, use it — otherwise create an instant one
  const meeting = existingScheduled ?? await prisma.meeting.create({
    data: { roomName, hostId: session.user.id },
  });

  return NextResponse.json({
    meetingId: meeting.id,
    roomName: meeting.roomName,
    startedAt: meeting.startedAt,
  });
}