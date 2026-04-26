import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { generateRoomId } from '@/lib/client-utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, scheduledAt } = await req.json();

  if (!title || typeof title !== 'string') {
    return NextResponse.json({ error: 'Missing title' }, { status: 400 });
  }

  if (!scheduledAt || isNaN(Date.parse(scheduledAt))) {
    return NextResponse.json({ error: 'Invalid scheduledAt date' }, { status: 400 });
  }

  const scheduledDate = new Date(scheduledAt);

  // Must be in the future
  if (scheduledDate <= new Date()) {
    return NextResponse.json({ error: 'Scheduled time must be in the future' }, { status: 400 });
  }

  // Generate a room name now so the invite link can be shared before the meeting
  const roomName = generateRoomId();

  // Register the room with this user as host
  await prisma.room.create({
    data: {
      name: roomName,
      hostId: session.user.id,
    },
  });

  // Create the scheduled meeting
  const meeting = await prisma.meeting.create({
    data: {
      roomName,
      hostId: session.user.id,
      title,
      scheduledAt: scheduledDate,
    },
  });

  return NextResponse.json({
    meetingId: meeting.id,
    roomName: meeting.roomName,
    title: meeting.title,
    scheduledAt: meeting.scheduledAt,
  });
}