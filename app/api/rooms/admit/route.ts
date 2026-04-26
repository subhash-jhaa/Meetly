import { auth } from '@/auth';
import { isRoomHost } from '@/lib/getRoomHost';
import { RoomServiceClient } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { roomName, participantIdentity } = await req.json();

  // Only host can admit
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

  // Update participant permissions to grant full access
  await roomService.updateParticipant(roomName, participantIdentity, undefined, {
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
    hidden: false,
  });

  return NextResponse.json({ admitted: true });
}