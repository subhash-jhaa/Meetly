import '../styles/globals.css';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import '@/lib/env';
import { Providers } from '@/components/Providers';
import '../styles/livekit-theme.css';


export const metadata: Metadata = {
  title: {
    default: 'Meetly | Conference app',
    template: '%s',
  },
  description:
    "Meetly is an AI-powered video conferencing platform that transcribes your meetings, extracts action items, and delivers structured summaries instantly. Focus on the conversation, we'll handle the notes.",
  twitter: {
    creator: '@livekitted',
    site: '@livekitted',
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://github.com/subhash-jhaa/Meetly',
    images: [
      {
        url: 'https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png',
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    ],
    siteName: 'Meetly',
  },
  icons: {
    icon: {
      rel: 'icon',
      url: 'https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png',
    },
    apple: [
      {
        rel: 'apple-touch-icon',
        url: 'https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png',
        sizes: '180x180',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#070707',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body data-lk-theme="default" suppressHydrationWarning>
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
