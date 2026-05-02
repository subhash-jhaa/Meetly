// Central data store for the landing page.
// All user-facing content lives here — no hardcoded strings in components.

// ─── SITE CONFIG ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Meetly',
  dashboardUrl: '/dashboard',
  signInUrl: '/signin',
  signUpUrl: '/signup',
  slackUrl: '',
  introVideoUrl: '/meetly_hero_video.mp4',
} as const;

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
export const NAVBAR_DATA = {
  links: [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Sign in', href: '/signin' },
  ],
  cta: { primary: 'Start for free', secondary: '' },
} as const;

// ─── HERO ─────────────────────────────────────────────────────────────────────
export const HERO_DATA = {
  badge: {
    text: 'AI-powered meetings',
    logo: 'https://framerusercontent.com/images/ZCTiEB4A2nM5gHfjGAGzp0sRX0.png',
  },
  headline: "Meetings that don't get forgotten.",
  subheadline:
    `Meetly captures your audio, transcribes it, and extracts action items. A structured summary hits your inbox the second you hang up. You focus on the call. We handle the notes.`,
  trustLine: 'Free to start · No credit card · Works in your browser',
  featureTags: [
    'Live AI Summaries',
    'HD Video Calls',
    'Auto Action Items',
    'Instant Transcripts',
  ],
  cta: { primary: 'Start a meeting', secondary: 'See how it works' },
  videoSrc: '/meetly_hero_video.mp4',
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
    tag: 'AI Summaries',
    title: 'AI Summaries',
    description: `Meetly captures and transcribes audio in the background. You stay focused on the conversation.`,
    img: '/meetly_feature_ai_summaries.png',
  },
  {
    tag: 'Extracted Action Items',
    title: 'Extracted Action Items',
    description: `Our pipeline pulls out key decisions and tasks the moment the call ends. Nothing slips through the cracks.`,
    img: '/meetly_feature_action_items.png',
  },
  {
    tag: 'Automated Distribution',
    title: 'Automated Distribution',
    description: `Structured summaries hit everyone's inbox automatically. Nobody has to ask for the notes.`,
    img: '/meetly_feature_distribution.png',
  },
  {
    tag: 'Secure Waiting Room',
    title: 'Secure Waiting Room',
    description: `Control access with a pre-meeting lobby. Manage participants with direct host controls.`,
    img: '/meetly_feature_waiting_room.png',
  },
  {
    tag: 'Frictionless Joining',
    title: 'Frictionless Joining',
    description: `Create instant rooms or schedule in advance. Share simple links that work directly in the browser.`,
    img: '/meetly_feature_joining.png',
  },
  {
    tag: 'Searchable Archive',
    title: 'Searchable Archive',
    description: `Query your entire history of transcripts and summaries. Find exactly what was decided months ago, instantly.`,
    img: '/meetly_feature_archive.png',
  },
] as const;

export const FEATURES_SECTION = {
  eyebrow: 'Features',
  title: 'Built for teams that move fast.',
  description: `Not just another video call tool. Meetly combines HD conferencing, AI intelligence, and team collaboration into one seamless workspace — so your meetings actually produce results.`,
  cta: 'Explore all features',
} as const;

// ─── FEATURES ACCORDION ───────────────────────────────────────────────────────
export const ACCORDION_ITEMS = [
  { id: 0, title: 'AI that captures everything', description: `Every word, every decision, every action item — transcribed live and organized automatically.`, iconPath: 'shield-clock' },
  { id: 1, title: 'Works with tools you already use', description: `Slack, Notion, Google Calendar, HubSpot — Meetly plugs into your stack.`, iconPath: 'code' },
  { id: 2, title: 'Powered by the best AI for the job', description: `We use leading LLMs fine-tuned on meeting context for superior accuracy.`, iconPath: 'bolt' },
  { id: 3, title: 'Enterprise-grade security, always', description: `End-to-end encryption, SOC 2 Type II compliance, and zero data retention policies.`, iconPath: 'shield-check' },
] as const;

// ─── BENEFITS ─────────────────────────────────────────────────────────────────
export const BENEFITS_SECTION = {
  eyebrow: 'Benefits',
  title: 'Reclaim the hours your team loses every week.',
};

export const BENEFIT_ITEMS = [
  { title: 'Zero note-taking required', desc: 'Meetly handles every word.', iconPath: 'arrow-ne' },
  { title: 'Action items, automatically', desc: `Every task gets captured.`, iconPath: 'chevrons' },
  { title: 'Never miss what was decided', desc: `Your entire meeting history is indexed.`, iconPath: 'eye' },
  { title: 'Async-ready summaries', desc: 'Teammates who missed the call get a full summary.', iconPath: 'monitor' },
  { title: 'Aligned from the first minute', desc: `Smart agendas mean everyone is prepared.`, iconPath: 'upload' },
  { title: 'Scales with your team', desc: 'One platform, one plan.', iconPath: 'activity' },
] as const;

// ─── COMPARISON ───────────────────────────────────────────────────────────────
export const COMPARISON_SECTION = {
  eyebrow: 'Comparison',
  title: 'Built different. Works better.',
  customPlan: { heading: 'Need an enterprise plan?', description: `We tailor security controls.`, cta: 'Talk to sales' },
};

export const COMPARISON_ROWS = [
  { feat: 'Auto-summary', other: 'Requires third-party bots', meetly: 'Built-in automatically', isText: true },
  { feat: 'Action items extracted', isText: false },
  { feat: 'Emailed to all participants', isText: false },
  { feat: 'Searchable history', other: 'Video files only', meetly: 'Full-text search', isText: true },
  { feat: 'No per-seat pricing', other: 'Per-user fees', meetly: 'Flat plans', isText: true },
  { feat: 'Works in browser, no install', isText: false },
] as const;

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────
export const HOW_IT_WORKS_SECTION = {
  eyebrow: 'How it works',
  title: 'Smarter meetings in Three steps.',
};

export const HOW_IT_WORKS_STEPS = [
  { step: 1, title: 'Start or join a meeting', desc: `Generate an instant link or schedule ahead. Guests join directly from their browser without installing anything.`, img: 'https://framerusercontent.com/images/7Js3JXXc3nTRKSrHFAwLzrbjPmc.png' },
  { step: 2, title: 'Talk while Meetly records', desc: `The platform handles high-quality video and securely captures the audio in the background.`, img: 'https://framerusercontent.com/images/xkBrVL5lHeQZcB6MjAInbK5P64.png' },
  { step: 3, title: 'AI transcribes and summarizes', desc: `The moment you hang up, our pipeline processes the transcript and extracts the core decisions and action items.`, img: 'https://framerusercontent.com/images/pKiDNptCJ4FNCB5IDfzPMqsVVKs.png' },
  { step: 4, title: 'Delivered and indexed', desc: `A structured summary is emailed to all participants and indexed in your searchable archive forever.`, img: 'https://framerusercontent.com/images/7Js3JXXc3nTRKSrHFAwLzrbjPmc.png' },
] as const;

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const TESTIMONIALS_SECTION = {
  eyebrow: 'Customer Stories',
  title: 'Forward-looking teams ready to embrace AI',
  testimonials: [
    { quote: `"We used to lose track of decisions the second a meeting ended. Meetly handles the notes and the follow-ups automatically. It feels like we hired a chief of staff."`, name: 'Sarah Jenkins', role: 'Founder at Acme Corp.' },
    { quote: `"My clients love getting a clear, bulleted summary right after our syncs. It makes me look incredibly organized, and I don't have to spend 15 minutes typing up notes."`, name: 'Marcus Rohl', role: 'Technical Consultant' },
    { quote: `"Finally, a tool that just works in the browser without making me install another app. The searchable history has saved us from repeating the same architecture debates."`, name: 'David Chen', role: 'Engineering Lead' },
  ]
} as const;

// ─── PRICING ──────────────────────────────────────────────────────────────────
export const PRICING_SECTION = {
  eyebrow: 'Pricing',
  title: 'Simple, transparent pricing.',
  plans: [
    { name: 'Free', price: '$0', features: ['5 meetings per month', 'AI summaries included', '1 host'], isPopular: false },
    { name: 'Pro', price: '$12', period: '/mo', features: ['Unlimited meetings', 'Full meeting recording', 'Automated email summaries', 'Searchable meeting history'], isPopular: true },
    { name: 'Team', price: '$29', period: '/mo', features: ['Up to 5 hosts', 'All Pro features included', 'Priority support'], isPopular: false },
  ]
} as const;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ_SECTION = {
  eyebrow: 'FAQs',
  title: 'Got questions?\nWe have answers.',
  subtext: 'Still unsure?\nTalk to our team — we respond fast.',
  cta: 'Contact us',
};

export const FAQ_ITEMS = [
  { number: '01', question: 'How does the AI summary work?', answer: `When a meeting ends, the audio is transcribed and fed into our AI pipeline. It extracts the core topics, decisions, and action items, then formats them into a clean summary.` },
  { number: '02', question: 'What languages are supported?', answer: `Currently, our transcription engine fully supports English. We plan to roll out additional language support soon.` },
  { number: '03', question: 'Do I have to record the meeting to get a summary?', answer: `Yes. The AI requires the audio recording to generate the transcript and extract action items.` },
  { number: '04', question: 'How is my data stored?', answer: `Your data is securely stored in isolated databases. Transcripts and summaries are only accessible by meeting participants. We never use your meeting data to train public AI models.` },
  { number: '05', question: 'Do my guests need to install an app?', answer: `No. Meetly runs entirely in the browser. You share a link, and they join instantly.` },
  { number: '06', question: 'What happens when I hit the free tier limit?', answer: `You can continue hosting standard video calls, but the AI transcription and summary features will be paused until the next billing cycle or until you upgrade.` },
] as const;

// ─── CTA ──────────────────────────────────────────────────────────────────────
export const CTA_DATA = {
  headline: 'Stop forgetting what you decided.',
  subheadline: 'Spin up a room. Have the conversation. Let us handle the notes.',
  primaryCta: 'Start your first meeting',
  secondaryCta: '',
  footnote: 'Free forever for solo use.',
  dashboardImg: '/images/cta-dashboard.png',
} as const;

// ─── FOOTER ───────────────────────────────────────────────────────────────────
export const FOOTER_DATA = {
  tagline: 'Meetings with built-in memory.',
  columns: [
    { heading: 'Product', links: [{ label: 'Features', href: '#features' }] },
    { heading: 'Legal', links: [{ label: 'Privacy Policy', href: '#privacy' }, { label: 'Terms of Service', href: '#terms' }] },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/subhash-jhaa/Meetly' },
  ],
} as const;
