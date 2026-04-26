import { prisma } from '@/lib/prisma';

export async function isRoomHost(roomName: string, userId: string): Promise<boolean> {
  const room = await prisma.room.findUnique({
    where: { name: roomName },
    select: { hostId: true },
  });

  // If room doesn't exist in DB yet, deny
  if (!room) return false;

  return room.hostId === userId;
}