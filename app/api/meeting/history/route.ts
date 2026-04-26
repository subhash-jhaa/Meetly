import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const meetings = await prisma.meeting.findMany({
    where: { hostId: session.user.id },
    orderBy: { startedAt: 'desc' },
    take: 20,
    include: {
      participants: {
        select: {
          displayName: true,
          joinedAt: true,
          leftAt: true,
        },
      },
    },
  });

  return NextResponse.json({ meetings });
}