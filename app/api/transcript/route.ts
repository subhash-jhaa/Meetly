import { NextRequest, NextResponse } from 'next/server';
import { WebhookReceiver } from 'livekit-server-sdk';
import { prisma } from '@/lib/prisma';
import { qstash } from '@/lib/qstash';

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: NextRequest) {
    const body = await req.text();
    const authHeader = req.headers.get('Authorization') ?? '';

    let event: Awaited<ReturnType<typeof receiver.receive>>;

    // ── Verify this request genuinely came from LiveKit ──────────────────────
    try {
        event = await receiver.receive(body, authHeader);
    } catch (err) {
        console.error('LiveKit webhook verification failed:', err);
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // ── Only care about egress finishing ─────────────────────────────────────
    if (event.event === 'egress_ended') {
        const egress = event.egressInfo;

        // status 3 = EGRESS_COMPLETE in LiveKit SDK
        if (egress?.status === 3) {
            const recordingUrl = egress.fileResults?.[0]?.location;
            const roomName = egress.roomName;

            if (!recordingUrl || !roomName) {
                console.warn('Egress ended but missing recordingUrl or roomName');
                return NextResponse.json({ ok: true });
            }

            // Find the active meeting for this room
            const meeting = await prisma.meeting.findFirst({
                where: {
                    roomName,
                    endedAt: null,
                    status: 'ACTIVE',
                },
                orderBy: { startedAt: 'desc' },
            });

            if (!meeting) {
                console.warn(`No active meeting found for room: ${roomName}`);
                return NextResponse.json({ ok: true });
            }

            // Save the recording URL and mark as PROCESSING
            await prisma.meeting.update({
                where: { id: meeting.id },
                data: {
                    recordingUrl,
                    status: 'PROCESSING',
                },
            });

            // ── Enqueue QStash job — responds near-instantly ───────────────────
            await qstash.publishJSON({
                url: `${process.env.NEXT_PUBLIC_APP_URL}/api/jobs/process-meeting`,
                body: {
                    meetingId: meeting.id,
                    recordingUrl,
                },
                retries: 3,
            });

            console.log(`📬 Queued processing for meeting ${meeting.id}`);
        }
    }

    // Always respond fast — LiveKit will retry if you're slow
    return NextResponse.json({ ok: true });
}