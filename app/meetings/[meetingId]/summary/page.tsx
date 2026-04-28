import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

interface PageProps {
  params: { meetingId: string };
}

export default async function SummaryPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect('/signin');

  const meeting = await prisma.meeting.findFirst({
    where: {
      id: params.meetingId,
      hostId: session.user.id,
    },
    include: { summary: true },
  });

  if (!meeting) redirect('/dashboard');

  const isProcessing = meeting.status === 'PROCESSING';
  const isFailed = meeting.status === 'FAILED';
  const summary = meeting.summary;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <a href="/dashboard" className="text-sm text-gray-400 hover:text-white mb-4 inline-block">
            ← Back to Dashboard
          </a>
          <h1 className="text-2xl font-semibold">
            {meeting.title ?? 'Meeting Summary'}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {new Date(meeting.startedAt).toLocaleDateString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>
        </div>

        {/* Processing state */}
        {isProcessing && (
          <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">⏳</div>
            <h2 className="text-lg font-medium text-yellow-300">Processing your meeting</h2>
            <p className="text-yellow-400/70 text-sm mt-1">
              Transcription and summarization is in progress. This usually takes 1–2 minutes.
            </p>
            {/* Auto-refresh every 10 seconds */}
            <meta httpEquiv="refresh" content="10" />
          </div>
        )}

        {/* Failed state */}
        {isFailed && (
          <div className="bg-red-900/30 border border-red-700 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">❌</div>
            <h2 className="text-lg font-medium text-red-300">Processing failed</h2>
            <p className="text-red-400/70 text-sm mt-1">
              Something went wrong generating your summary. Please check your API keys and try again.
            </p>
          </div>
        )}

        {/* Summary ready */}
        {summary && (
          <div className="space-y-6">

            {/* Overview */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                Overview
              </h2>
              <p className="text-gray-100 leading-relaxed">{summary.content}</p>
            </div>

            {/* Key Decisions */}
            {summary.keyDecisions.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                  Key Decisions
                </h2>
                <ul className="space-y-2">
                  {summary.keyDecisions.map((d: string, i: number) => (
                    <li key={i} className="flex gap-3 text-gray-200">
                      <span className="text-blue-400 mt-0.5">◆</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Items */}
            {summary.actionItems.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                  Action Items
                </h2>
                <ul className="space-y-2">
                  {summary.actionItems.map((a: string, i: number) => (
                    <li key={i} className="flex gap-3 text-gray-200">
                      <span className="text-green-400 mt-0.5">✓</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Steps */}
            {summary.nextSteps.length > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">
                  Next Steps
                </h2>
                <ul className="space-y-2">
                  {summary.nextSteps.map((s: string, i: number) => (
                    <li key={i} className="flex gap-3 text-gray-200">
                      <span className="text-purple-400 mt-0.5">→</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Transcript */}
            {summary.transcript && (
              <details className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <summary className="text-sm font-medium text-gray-400 uppercase tracking-wide cursor-pointer">
                  Full Transcript
                </summary>
                <pre className="mt-4 text-gray-300 text-sm whitespace-pre-wrap leading-relaxed font-mono">
                  {summary.transcript}
                </pre>
              </details>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
