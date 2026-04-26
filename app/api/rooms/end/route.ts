import { auth } from '@/auth';
import { isRoomHost } from '@/lib/getRoomHost';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { roomName } = await req.json();

  const hostCheck = await isRoomHost(roomName, session.user.id);
  if (!hostCheck) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const endedAt = new Date();

  const meeting = await prisma.meeting.findFirst({
    where: { roomName, endedAt: null },
    orderBy: { startedAt: 'desc' },
  });

  if (!meeting) {
    return NextResponse.json({ error: 'No active meeting found' }, { status: 404 });
  }

  const duration = Math.floor((endedAt.getTime() - meeting.startedAt.getTime()) / 1000);

  await prisma.meeting.update({
    where: { id: meeting.id },
    data: { endedAt, duration },
  });

  // Mark all participants as left
  await prisma.participant.updateMany({
    where: { meetingId: meeting.id, leftAt: null },
    data: { leftAt: endedAt },
  });

  return NextResponse.json({ meetingId: meeting.id, duration });
}