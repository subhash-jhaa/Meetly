// Central data store for the landing page.
// All user-facing content lives here — no hardcoded strings in components.

// ─── SITE CONFIG ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Meetly',
  demoUrl: 'https://calendly.com/arushi-gandhi/30min',
  slackUrl: 'https://join.slack.com/t/resslaiaiagen-czp2639/shared_invite/zt-2vpd5vabp-D9LpsJZRiweb7_OFnvIvhA',
  introVideoUrl: 'https://www.youtube.com/watch?v=oNjh7WbUFM4',
} as const;

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export const NAVBAR_DATA = {
  links: [
    { label: 'Features', href: '#features' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Blog', href: '#blog' },
    { label: 'Enterprise', href: '#enterprise' },
    { label: 'Changelog', href: '#changelog' },
  ],
  cta: { primary: 'Start for free', secondary: 'Book a demo' },
} as const;

// ─── HERO ─────────────────────────────────────────────────────────────────────
export const HERO_DATA = {
  badge: {
    text: 'Backed by Y Combinator',
    logo: 'https://framerusercontent.com/images/ZCTiEB4A2nM5gHfjGAGzp0sRX0.png',
  },
  headline: 'Meetings that think, summarize, and act.',
  subheadline:
    `Stop taking notes. Stop chasing follow-ups. Meetly's AI joins every call, captures every decision, and delivers instant summaries your whole team can act on — before the call even ends.`,
  trustLine: 'No credit card required · 2M+ meetings summarized monthly',
  featureTags: [
    'Live AI Summaries',
    'HD Video Calls',
    'Auto Action Items',
    'Instant Transcripts',
  ],
  cta: { primary: 'Start for free', secondary: 'Watch a demo' },
  videoSrc: 'https://framerusercontent.com/assets/UVDXLnjzehJoOI0RqS5jxHQqg1o.webm',
  partnerLogos: [
    'https://framerusercontent.com/images/DqzIEgwb9yNI3Yv1Ot2ltSOLIbQ.png',
    'https://framerusercontent.com/images/z63aDZYITrqx191No7lyEJS0CM.png',
    'https://framerusercontent.com/images/7MyKkwzOpk4kJqzg4bIYsXeAy8.png',
    'https://framerusercontent.com/images/Z2CTknvdCwvZHV0sIpxs8frSKs.png',
    'https://framerusercontent.com/images/ZI7zeOvCAZFOoFdRRmYLfZyJww.png',
    'https://framerusercontent.com/images/a2is4PhQgTGf2pv7bgLFmvQLxQ.png',
  ],
} as const;

// ─── SOCIAL PROOF STATS ───────────────────────────────────────────────────────
export const STATS = [
  { num: '2M+', label: 'Meetings summarized', note: 'by Meetly AI every month' },
  { num: '40%', label: 'Less time in meetings', note: 'reported by active teams, Q1 2025' },
  { num: '4.9/5', label: 'User satisfaction', note: 'across 6,000+ verified reviews' },
  { num: '98%', label: 'Transcript accuracy', note: 'in live AI transcription benchmarks' },
] as const;

// ─── FEATURES (STICKY CARDS) ──────────────────────────────────────────────────
export const FEATURE_BLOCKS = [
  {
    tag: 'AI Meeting Summaries',
    title: 'Every meeting, summarized in seconds.',
    description:
      `Meetly's AI reads the room — capturing key decisions, open questions, and action items in real time. Get a polished summary delivered to your inbox the moment the call ends. No more "can you send me the notes?"`,
  },
  {
    tag: 'HD Video Conferencing',
    title: 'Crystal-clear calls. Zero friction.',
    description:
      'Studio-quality video and noise-cancelling audio that just works — in any browser, on any device. Host up to 500 participants with no lag, no plugins, and no IT ticket required.',
  },
  {
    tag: 'Smart Agenda Builder',
    title: `Structured meetings. Sharper outcomes.`,
    description:
      `Set a focused agenda before every meeting and Meetly keeps the conversation on track. Our AI flags when discussion drifts off-topic and auto-timestamps each agenda item in the transcript.`,
  },
] as const;

export const FEATURES_SECTION = {
  eyebrow: 'Why Meetly',
  title: 'Built for teams that move fast.',
  description:
    `Not just another video call tool. Meetly combines HD conferencing, AI intelligence, and team collaboration into one seamless workspace — so your meetings actually produce results.`,
  cta: 'Explore all features',
} as const;

// ─── FEATURES ACCORDION ───────────────────────────────────────────────────────
export const ACCORDION_ITEMS = [
  {
    id: 0,
    title: 'AI that captures everything',
    description:
      `Every word, every decision, every action item — transcribed live and organized automatically. Meetly never misses a thing, even when you do.`,
    iconPath: 'shield-clock',
  },
  {
    id: 1,
    title: 'Works with tools you already use',
    description:
      `Slack, Notion, Google Calendar, HubSpot — Meetly plugs into your stack and pushes summaries and tasks directly where your team works. No context switching.`,
    iconPath: 'code',
  },
  {
    id: 2,
    title: 'Powered by the best AI for the job',
    description:
      `We use leading LLMs fine-tuned on meeting context for superior accuracy. Not generic AI — purpose-built intelligence that understands business conversations.`,
    iconPath: 'bolt',
  },
  {
    id: 3,
    title: 'Enterprise-grade security, always',
    description:
      `End-to-end encryption, SOC 2 Type II compliance, and zero data retention policies. Your conversations stay yours — no exceptions.`,
    iconPath: 'shield-check',
  },
] as const;

// ─── BENEFITS ─────────────────────────────────────────────────────────────────
export const BENEFITS_SECTION = {
  eyebrow: 'Benefits',
  title: 'Reclaim the hours your team loses every week.',
};

export const BENEFIT_ITEMS = [
  {
    title: 'Zero note-taking required',
    desc: 'Meetly handles every word. Your team stays present in the conversation instead of buried in a doc.',
    iconPath: 'arrow-ne',
  },
  {
    title: 'Action items, automatically',
    desc: `Every task gets captured, assigned, and synced to your project tools — without anyone lifting a finger.`,
    iconPath: 'chevrons',
  },
  {
    title: 'Never miss what was decided',
    desc: `Search any meeting, any decision, any date. Your entire meeting history is indexed and instantly retrievable.`,
    iconPath: 'eye',
  },
  {
    title: 'Async-ready summaries',
    desc: 'Teammates who missed the call get a full summary. No replay required, no update meetings needed.',
    iconPath: 'monitor',
  },
  {
    title: 'Aligned from the first minute',
    desc: `Smart agendas and pre-meeting briefs mean everyone shows up prepared. Decisions happen faster.`,
    iconPath: 'upload',
  },
  {
    title: 'Scales with your team',
    desc: 'From solo standup to 500-person all-hands. One platform, one plan, no per-seat shock.',
    iconPath: 'activity',
  },
] as const;

// ─── COMPARISON ───────────────────────────────────────────────────────────────
export const COMPARISON_SECTION = {
  eyebrow: 'Comparison',
  title: 'Built different. Works better.',
  customPlan: {
    heading: 'Need an enterprise plan?',
    description: `We tailor security controls, compliance, SLAs, and onboarding to fit organizations of any size.`,
    cta: 'Talk to sales',
  },
};

export const COMPARISON_ROWS = [
  { feat: 'AI meeting summaries', other: 'Add-on or absent', meetly: 'Built-in & real-time', isText: true },
  { feat: 'Auto action items', isText: false },
  { feat: 'Transcript accuracy', other: '~80%', meetly: '98% verified', isText: true },
  { feat: 'Native integrations', isText: false },
  { feat: 'Async-ready notes', other: 'Manual export', meetly: 'Auto-delivered', isText: true },
  { feat: 'SOC 2 Type II', isText: false },
  { feat: 'Setup time', other: 'Hours / IT required', meetly: 'Under 2 minutes', isText: true },
  { feat: 'Smart agenda builder', isText: false },
] as const;

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
export const HOW_IT_WORKS_SECTION = {
  eyebrow: 'How it works',
  title: 'Smarter meetings in three steps.',
};

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: 'Connect in seconds',
    desc: `Sign up, sync your calendar, and invite your team. Meetly is live in under two minutes — no IT, no downloads, no drama.`,
    img: 'https://framerusercontent.com/images/7Js3JXXc3nTRKSrHFAwLzrbjPmc.png',
  },
  {
    step: 2,
    title: 'Meet. Meetly handles the rest.',
    desc: `Host your call as usual. Meetly joins silently, transcribes everything live, and builds a structured summary in real time.`,
    img: 'https://framerusercontent.com/images/xkBrVL5lHeQZcB6MjAInbK5P64.png',
  },
  {
    step: 3,
    title: 'Act on what matters',
    desc: `The moment the call ends, your summary, action items, and decisions land in your inbox and sync to your tools. Meeting done. Work starts.`,
    img: 'https://framerusercontent.com/images/pKiDNptCJ4FNCB5IDfzPMqsVVKs.png',
  },
] as const;

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const TESTIMONIALS_SECTION = {
  eyebrow: 'Customer Stories',
  title: 'Teams that never want to go back.',
  quote: `"Meetly eliminated our entire post-meeting workflow. Summaries, tasks, decisions — all done before we've even said goodbye. It's the single biggest productivity unlock we've had this year."`,
  author: { name: 'Priya Mehta', company: 'Head of Product · Vercel' },
  metrics: [
    { num: '40%', label: 'Reduction in meeting time' },
    { num: '3hrs', label: 'Saved per person, per week' },
    { num: '98%', label: 'Transcript accuracy rate' },
  ],
} as const;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_SECTION = {
  eyebrow: 'FAQs',
  title: 'Got questions?\nWe have answers.',
  subtext: 'Still unsure?\nTalk to our team — we respond fast.',
  cta: 'Contact us',
};

export const FAQ_ITEMS = [
  {
    number: '01',
    question: 'Does Meetly record my calls without permission?',
    answer:
      `Never. Meetly announces itself when it joins a call and only activates with explicit host permission. All participants see a clear recording indicator throughout the meeting.`,
  },
  {
    number: '02',
    question: 'Which video conferencing tools does Meetly work with?',
    answer:
      `Meetly works as a standalone conferencing platform and also integrates with Zoom, Google Meet, and Microsoft Teams — so you can bring AI summaries to meetings you already run.`,
  },
  {
    number: '03',
    question: 'How accurate are the AI transcripts?',
    answer:
      `We hit 98% accuracy in independent benchmarks across English and 12+ other languages. Speaker identification, filler word removal, and domain vocabulary tuning are all included.`,
  },
  {
    number: '04',
    question: 'Is my meeting data stored or used for training?',
    answer:
      `No. Your meeting data is never used to train AI models. You can configure zero-retention mode so nothing is stored after the summary is delivered.`,
  },
  {
    number: '05',
    question: 'What integrations does Meetly support?',
    answer:
      `Slack, Notion, Linear, HubSpot, Salesforce, Jira, Google Calendar, Outlook, Asana, and more. Action items and summaries push directly to wherever your team works.`,
  },
  {
    number: '06',
    question: 'Is there a free plan?',
    answer:
      `Yes. The free plan includes unlimited meetings, AI summaries for up to 10 meetings per month, and 2 integrations. No credit card required to get started.`,
  },
] as const;

// ─── CTA ──────────────────────────────────────────────────────────────────────
export const CTA_DATA = {
  headline: 'Your next meeting should run itself.',
  subheadline:
    `Stop burning hours on notes and follow-ups. Let Meetly handle the overhead so your team can focus on what actually moves the business forward.`,
  primaryCta: 'Start for free',
  secondaryCta: 'Book a demo',
  dashboardImg: 'https://framerusercontent.com/images/3LTXk1sUD5A7o2BhLA18XJVw9ec.png',
} as const;

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export const FOOTER_DATA = {
  tagline: 'AI-powered meetings. Zero overhead.',
  columns: [
    {
      heading: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Integrations', href: '#integrations' },
        { label: 'Changelog', href: '#changelog' },
        { label: 'Roadmap', href: '#roadmap' },
        { label: 'Pricing', href: '#pricing' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Blog', href: '#blog' },
        { label: 'Careers', href: '#careers' },
        { label: 'Press kit', href: '#press' },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Documentation', href: '#docs' },
        { label: 'API Reference', href: '#api' },
        { label: 'Status', href: '#status' },
        { label: 'Security', href: '#security' },
      ],
    },
    {
      heading: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Cookie Policy', href: '#cookies' },
        { label: 'GDPR', href: '#gdpr' },
      ],
    },
  ],
  social: [
    { label: 'X / Twitter', href: 'https://x.com/Meetly' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/meetly' },
    { label: 'Instagram', href: 'https://www.instagram.com/meetly/' },
  ],
} as const;
