import { auth } from '@/auth';
import { isRoomHost } from '@/lib/getRoomHost';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ isHost: false });
  }

  const roomName = req.nextUrl.searchParams.get('roomName');
  if (!roomName) {
    return NextResponse.json({ isHost: false });
  }

  const hostCheck = await isRoomHost(roomName, session.user.id);
  return NextResponse.json({ isHost: hostCheck });
}