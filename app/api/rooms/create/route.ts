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

  // Upsert — if room already exists keep the original host
  const room = await prisma.room.upsert({
    where: { name: roomName },
    update: {},  // don't overwrite existing host
    create: {
      name: roomName,
      hostId: session.user.id,
    },
  });

  return NextResponse.json({ roomName: room.name, hostId: room.hostId });
}