import { auth } from '@/auth';
import { isRoomHost } from '@/lib/getRoomHost';
import { getLiveKitURL } from '@/lib/getLiveKitURL';
import { AccessToken } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const roomName = request.nextUrl.searchParams.get('roomName');
  if (!roomName) {
    return new NextResponse('Missing roomName', { status: 400 });
  }

  const LIVEKIT_URL = process.env.LIVEKIT_URL!;
  const livekitServerUrl = getLiveKitURL(LIVEKIT_URL, null) ?? LIVEKIT_URL;

  const userIsHost = await isRoomHost(roomName, session.user.id);

  // If host, give full token immediately — host never waits
  if (userIsHost) {
    return NextResponse.json({ isHost: true, needsLobby: false });
  }

  // Participant gets a lobby token — connected but hidden, can't publish
  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: `lobby-${session.user.id}`,
      name: session.user.name ?? 'Participant',
      metadata: JSON.stringify({ waiting: true, userId: session.user.id }),
    }
  );

  at.ttl = '30m'; // lobby token shorter TTL
  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: false,
    canSubscribe: false,  // can't see others while waiting
    canPublishData: false,
    hidden: true,         // not visible in participant list
  });

  return NextResponse.json({
    isHost: false,
    needsLobby: true,
    lobbyToken: await at.toJwt(),
    serverUrl: livekitServerUrl,
    displayName: session.user.name ?? 'Participant',
  });
}