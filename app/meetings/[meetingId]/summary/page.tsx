import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: { meetingId: string };
}

function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] text-white/40 uppercase tracking-widest mb-3">
      <span className="w-3 h-px bg-white/30" />
      {text}
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-[#242424] border-t-0">
      <div className="px-8 py-5 border-b border-[#242424]">
        <Eyebrow text={label} />
      </div>
      <div className="px-8 py-6">{children}</div>
    </div>
  );
}

export default async function SummaryPage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect('/signin');

  const meeting = await prisma.meeting.findFirst({
    where: { id: params.meetingId, hostId: session.user.id },
    include: { summary: true },
  });

  if (!meeting) redirect('/dashboard');

  const isProcessing = meeting.status === 'PROCESSING';
  const isFailed = meeting.status === 'FAILED';
  const summary = meeting.summary;

  const formattedDate = new Date(meeting.startedAt).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">

      {/* NAV */}
      <nav className="sticky top-0 z-50 w-full flex justify-center bg-[#0a0a0a]/90 backdrop-blur-md pt-4 px-4">
        <div className="relative flex w-full max-w-[1200px] h-[64px] items-center justify-between border border-[#242424] bg-[#0a0908] px-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img
                src="https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png?width=512&height=512"
                alt="Meetly"
                className="h-7 w-7 rounded-[4px] object-contain cursor-pointer"
              />
            </Link>
          </div>

          <a href="/dashboard"
            className="font-mono text-[12px] text-white/40 hover:text-white transition-colors"
          >
            ← Dashboard
          </a>
        </div>
      </nav>

      <div className="flex flex-col items-center px-4 pb-20">
        <div className="w-full max-w-[1200px]">

          {/* HEADER */}
          <div className="border-x border-[#242424] px-8 pt-16 pb-10 relative">
            <div className="absolute inset-0 repeating-grid-subtle pointer-events-none" />
            <Eyebrow text="Meeting summary" />
            <h1 className="text-[clamp(24px,3.5vw,42px)] font-normal tracking-[-0.04em] leading-[1.1]">
              {meeting.title ?? 'Meeting Summary'}
            </h1>
            <p className="font-mono text-[12px] text-white/30 mt-2">{formattedDate}</p>
          </div>

          {/* PROCESSING */}
          {isProcessing && (
            <div className="border border-[#242424] border-t-0 px-8 py-16 text-center relative">
              <meta httpEquiv="refresh" content="10" />
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4" />
              <Eyebrow text="Processing" />
              <p className="text-[14px] text-white/60">
                Transcribing and summarizing your meeting…
              </p>
              <p className="font-mono text-[12px] text-white/20 mt-2">
                This usually takes 1–2 minutes. Page refreshes automatically.
              </p>
            </div>
          )}

          {/* FAILED */}
          {isFailed && (
            <div className="border border-[#242424] border-t-0 px-8 py-16 text-center">
              <Eyebrow text="Error" />
              <p className="text-[14px] text-white/60">AI processing failed.</p>
              <p className="font-mono text-[12px] text-white/20 mt-2">
                Check your SARVAM_API_KEY and GROK_API_KEY, then try again.
              </p>
            </div>
          )}

          {/* SUMMARY CONTENT */}
          {summary && (
            <>
              {/* Overview */}
              <Section label="Overview">
                <p className="text-[14px] text-white/70 leading-[1.75]">{summary.content}</p>
              </Section>

              {/* Two-column: Decisions + Actions */}
              <div className="flex flex-col md:flex-row border border-[#242424] border-t-0">
                <div className="flex-1 border-b md:border-b-0 md:border-r border-[#242424] px-8 py-6">
                  <Eyebrow text="Key decisions" />
                  {summary.keyDecisions.length === 0 ? (
                    <p className="font-mono text-[12px] text-white/20">None recorded</p>
                  ) : (
                    <ul className="flex flex-col gap-3">
                      {summary.keyDecisions.map((d, i) => (
                        <li key={i} className="flex gap-3 text-[14px] text-white/70 leading-[1.6]">
                          <span className="text-white/20 font-mono text-[11px] mt-1 flex-shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex-1 px-8 py-6">
                  <Eyebrow text="Action items" />
                  {summary.actionItems.length === 0 ? (
                    <p className="font-mono text-[12px] text-white/20">None recorded</p>
                  ) : (
                    <ul className="flex flex-col gap-3">
                      {summary.actionItems.map((a, i) => (
                        <li key={i} className="flex gap-3 text-[14px] text-white/70 leading-[1.6]">
                          <span className="text-white/20 font-mono text-[11px] mt-1 flex-shrink-0">→</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Next Steps */}
              {summary.nextSteps.length > 0 && (
                <Section label="Next steps">
                  <ul className="flex flex-col gap-3">
                    {summary.nextSteps.map((s, i) => (
                      <li key={i} className="flex gap-3 text-[14px] text-white/70 leading-[1.6]">
                        <span className="text-white/20 font-mono text-[11px] mt-1 flex-shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </Section>
              )}

              {/* Transcript */}
              {summary.transcript && (
                <details className="border border-[#242424] border-t-0 group">
                  <summary className="px-8 py-5 font-mono text-[11px] text-white/40 uppercase tracking-widest cursor-pointer hover:text-white/60 transition-colors list-none flex items-center gap-2">
                    <span className="w-3 h-px bg-white/30" />
                    Full transcript
                    <span className="ml-auto text-white/20 group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <div className="border-t border-[#242424] px-8 py-6">
                    <pre className="font-mono text-[12px] text-white/40 whitespace-pre-wrap leading-[1.8]">
                      {summary.transcript}
                    </pre>
                  </div>
                </details>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}