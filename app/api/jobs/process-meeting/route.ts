import { NextRequest, NextResponse } from 'next/server';
import { verifySignatureAppRouter } from '@upstash/qstash/nextjs';
import { prisma } from '@/lib/prisma';

async function handler(req: NextRequest) {
    const body = await req.json();
    const { meetingId, recordingUrl } = body;

    if (!meetingId || !recordingUrl) {
        return NextResponse.json({ error: 'Missing meetingId or recordingUrl' }, { status: 400 });
    }

    try {
        // ── Step 1: Transcribe with Sarvam ───────────────────────────────────────
        const transcriptRes = await fetch('https://api.sarvam.ai/speech-to-text-translate', {
            method: 'POST',
            headers: {
                'api-subscription-key': process.env.SARVAM_API_KEY!,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                input_language: 'en-IN',
                url: recordingUrl,
            }),
        });

        if (!transcriptRes.ok) {
            const err = await transcriptRes.text();
            throw new Error(`Sarvam failed: ${err}`);
        }

        const transcriptData = await transcriptRes.json();
        const transcript: string = transcriptData.transcript ?? transcriptData.text ?? '';

        if (!transcript) throw new Error('Empty transcript returned from Sarvam');

        // ── Step 2: Summarize with Grok ──────────────────────────────────────────
        const grokRes = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.GROK_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'grok-3',
                messages: [
                    {
                        role: 'system',
                        content: `You are a meeting summarizer. 
Return ONLY a valid JSON object with exactly these keys:
{
  "summary": "2-3 sentence overview of the meeting",
  "keyDecisions": ["decision 1", "decision 2"],
  "actionItems": ["action 1", "action 2"],
  "nextSteps": ["next step 1", "next step 2"]
}
No markdown, no backticks, no extra text. Pure JSON only.`,
                    },
                    {
                        role: 'user',
                        content: `Summarize this meeting transcript:\n\n${transcript}`,
                    },
                ],
                temperature: 0.3,
            }),
        });

        if (!grokRes.ok) {
            const err = await grokRes.text();
            throw new Error(`Grok failed: ${err}`);
        }

        const grokData = await grokRes.json();
        const rawContent = grokData.choices?.[0]?.message?.content ?? '{}';

        let parsed: {
            summary: string;
            keyDecisions: string[];
            actionItems: string[];
            nextSteps: string[];
        };

        try {
            parsed = JSON.parse(rawContent);
        } catch {
            throw new Error(`Grok returned invalid JSON: ${rawContent}`);
        }

        // ── Step 3: Save to DB ───────────────────────────────────────────────────
        await prisma.summary.upsert({
            where: { meetingId },
            update: {
                transcript,
                content: parsed.summary ?? '',
                keyDecisions: parsed.keyDecisions ?? [],
                actionItems: parsed.actionItems ?? [],
                nextSteps: parsed.nextSteps ?? [],
            },
            create: {
                meetingId,
                transcript,
                content: parsed.summary ?? '',
                keyDecisions: parsed.keyDecisions ?? [],
                actionItems: parsed.actionItems ?? [],
                nextSteps: parsed.nextSteps ?? [],
            },
        });

        await prisma.meeting.update({
            where: { id: meetingId },
            data: { status: 'COMPLETED' },
        });

        console.log(`✅ Meeting ${meetingId} processed successfully`);
        return NextResponse.json({ ok: true });

    } catch (error) {
        console.error(`❌ process-meeting failed for ${meetingId}:`, error);

        // Mark as failed in DB so UI can show an error state
        await prisma.meeting.update({
            where: { id: meetingId },
            data: { status: 'FAILED' },
        }).catch(() => { }); // don't throw if this also fails

        // Return 500 so QStash retries automatically
        return NextResponse.json({ error: 'Job failed' }, { status: 500 });
    }
}

// Verifies the request genuinely came from QStash — not a random POST
export const POST = verifySignatureAppRouter(handler);