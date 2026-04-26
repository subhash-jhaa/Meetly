import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const meetings = await prisma.meeting.findMany({
    where: {
      hostId: session.user.id,
      scheduledAt: { gte: new Date() }, // only future meetings
      endedAt: null,
    },
    orderBy: { scheduledAt: 'asc' },
    take: 10,
  });

  return NextResponse.json({ meetings });
}