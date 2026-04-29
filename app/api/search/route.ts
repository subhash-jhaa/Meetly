import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const q = req.nextUrl.searchParams.get('q')?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // Sanitize — strip special postgres FTS characters
  const sanitized = q.replace(/[&|!<>():*]/g, ' ').trim();

  try {
    const results = await prisma.$queryRaw<SearchResult[]>`
      SELECT
        m.id           AS "meetingId",
        m.title        AS "title",
        m."startedAt"  AS "startedAt",
        m."roomName"   AS "roomName",
        s.content      AS "summary",
        s."keyDecisions" AS "keyDecisions",
        s."actionItems"  AS "actionItems",
        ts_headline(
          'english',
          coalesce(s.content, '') || ' ' || coalesce(s.transcript, ''),
          plainto_tsquery('english', ${sanitized}),
          'MaxWords=20, MinWords=10, ShortWord=3, HighlightAll=false'
        ) AS "snippet"
      FROM "Meeting" m
      INNER JOIN "Summary" s ON s."meetingId" = m.id
      WHERE
        m."hostId" = ${session.user.id}
        AND m.status = 'COMPLETED'
        AND to_tsvector('english',
              coalesce(s.content, '') || ' ' ||
              coalesce(s.transcript, '')
            ) @@ plainto_tsquery('english', ${sanitized})
      ORDER BY m."startedAt" DESC
      LIMIT 20
    `;

    return NextResponse.json({ results });

  } catch (error) {
    console.error('Search failed:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

type SearchResult = {
  meetingId: string;
  title: string | null;
  startedAt: Date;
  roomName: string;
  summary: string | null;
  keyDecisions: string[];
  actionItems: string[];
  snippet: string;
};