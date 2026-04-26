import { auth } from '@/auth';
import { isRoomHost } from '@/lib/getRoomHost';
import { RoomServiceClient } from 'livekit-server-sdk';
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

  const hostCheck = await isRoomHost(roomName, session.user.id);
  if (!hostCheck) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const LIVEKIT_URL = process.env.LIVEKIT_URL!;
  const hostURL = new URL(LIVEKIT_URL);
  hostURL.protocol = 'https:';

  const roomService = new RoomServiceClient(
    hostURL.origin,
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
  );

  const participants = await roomService.listParticipants(roomName);

  // Return only lobby participants (identity starts with "lobby-")
  const waiting = participants
    .filter(p => p.identity.startsWith('lobby-'))
    .map(p => ({
      identity: p.identity,
      name: p.name,
      joinedAt: p.joinedAt,
    }));

  return NextResponse.json({ waiting });
}