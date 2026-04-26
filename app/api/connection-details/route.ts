import { auth } from '@/auth';
import { isRoomHost } from '@/lib/getRoomHost';
import { getLiveKitURL } from '@/lib/getLiveKitURL';
import { ConnectionDetails } from '@/lib/types';
import { AccessToken, AccessTokenOptions, VideoGrant } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

const COOKIE_KEY = 'random-participant-postfix';

export async function GET(request: NextRequest) {
  // ✅ 1. Must be logged in
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const roomName = request.nextUrl.searchParams.get('roomName');
    const region = request.nextUrl.searchParams.get('region');
    const metadata = request.nextUrl.searchParams.get('metadata') ?? '';

    if (!LIVEKIT_URL) throw new Error('LIVEKIT_URL is not defined');
    if (typeof roomName !== 'string') {
      return new NextResponse('Missing required query parameter: roomName', { status: 400 });
    }

    const livekitServerUrl = region ? getLiveKitURL(LIVEKIT_URL, region) : LIVEKIT_URL;
    if (!livekitServerUrl) throw new Error('Invalid region');

    // ✅ 2. Check if this user is the host of this room
    const userIsHost = await isRoomHost(roomName, session.user.id);

    // ✅ 3. Use real identity from session — not a spoofable query param
    const identity = session.user.id;
    const displayName = session.user.name ?? 'Participant';

    const participantToken = await createParticipantToken(
      {
        identity,
        name: displayName,
        metadata,
      },
      roomName,
      userIsHost,  // ← pass role into token
    );

    const data: ConnectionDetails = {
      serverUrl: livekitServerUrl,
      roomName,
      participantToken,
      participantName: displayName,
    };

    let cookiePostfix = request.cookies.get(COOKIE_KEY)?.value;
    if (!cookiePostfix) cookiePostfix = Math.random().toString(36).slice(2, 6);

    return new NextResponse(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `${COOKIE_KEY}=${cookiePostfix}; Path=/; HttpOnly; SameSite=Strict; Secure; Expires=${getCookieExpirationTime()}`,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return new NextResponse(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}

function createParticipantToken(
  userInfo: AccessTokenOptions,
  roomName: string,
  isHost: boolean,   // ← role parameter
) {
  const at = new AccessToken(API_KEY, API_SECRET, userInfo);

  // ✅ 4. Fixed TTL — was '5m', now '4h' so nobody gets kicked mid-meeting
  at.ttl = '4h';

  const grant: VideoGrant = {
    room: roomName,
    roomJoin: true,
    canSubscribe: true,       // everyone can watch/listen
    canPublish: isHost,       // ✅ only host can publish by default
    canPublishData: true,     // everyone can send chat/data messages
    roomAdmin: isHost,        // ✅ host can mute/kick participants
    roomRecord: isHost,       // ✅ host can trigger recordings
  };

  at.addGrant(grant);
  return at.toJwt();
}

function getCookieExpirationTime(): string {
  const now = new Date();
  now.setTime(now.getTime() + 60 * 120 * 1000);
  return now.toUTCString();
}