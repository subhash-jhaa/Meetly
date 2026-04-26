import { auth } from '@/auth';
import { isRoomHost } from '@/lib/getRoomHost';
import { EgressClient } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // ✅ Step 1 — must be logged in
  const session = await auth();
  if (!session?.user?.id) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const roomName = req.nextUrl.searchParams.get('roomName');
  if (!roomName) {
    return new NextResponse('Missing roomName parameter', { status: 400 });
  }

  // ✅ Step 2 — must be the host
  const hostCheck = await isRoomHost(roomName, session.user.id);
  if (!hostCheck) {
    return new NextResponse('Forbidden: only the host can stop recording', { status: 403 });
  }

  try {
    const { LIVEKIT_API_KEY, LIVEKIT_API_SECRET, LIVEKIT_URL } = process.env;

    const hostURL = new URL(LIVEKIT_URL!);
    hostURL.protocol = 'https:';

    const egressClient = new EgressClient(hostURL.origin, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);

    const activeEgresses = (await egressClient.listEgress({ roomName })).filter(
      (info) => info.status < 2,
    );

    if (activeEgresses.length === 0) {
      return new NextResponse('No active recording found', { status: 404 });
    }

    await Promise.all(activeEgresses.map((info) => egressClient.stopEgress(info.egressId)));

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
  }
}