import { auth } from '@/auth';
import { isRoomHost } from '@/lib/getRoomHost';
import { RoomServiceClient } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { roomName, participantIdentity } = await req.json();

  const hostCheck = await isRoomHost(roomName, session.user.id);
  if (!hostCheck) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const hostURL = new URL(process.env.LIVEKIT_URL!);
  hostURL.protocol = 'https:';
  const svc = new RoomServiceClient(hostURL.origin, process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET);

  await svc.removeParticipant(roomName, participantIdentity);

  return NextResponse.json({ kicked: true });
}