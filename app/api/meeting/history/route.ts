import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') ?? '1');
  const limit = 20;
  const skip = (page - 1) * limit;

  const [meetings, total] = await Promise.all([
    prisma.meeting.findMany({
      where: {
        hostId: session.user.id,
        endedAt: { not: null },
      },
      include: {
        participants: {
          select: {
            displayName: true,
            joinedAt: true,
            leftAt: true,
            user: { select: { image: true } },
          },
        },
        summary: {
          select: { id: true, content: true },
        },
      },
      orderBy: { startedAt: 'desc' },
      take: limit,
      skip,
    }),
    prisma.meeting.count({
      where: {
        hostId: session.user.id,
        endedAt: { not: null },
      },
    }),
  ]);

  return NextResponse.json({
    meetings,
    pagination: {
      page,
      total,
      pages: Math.ceil(total / limit),
      hasNext: skip + limit < total,
      hasPrev: page > 1,
    },
  });
}