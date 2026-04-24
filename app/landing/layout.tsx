'use client';

import React from 'react';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="landing-wrapper">
      <main>{children}</main>
      <style jsx global>{`
        /* Local overrides for the landing page if needed */
        .landing-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Ensure smooth scrolling for the landing page */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
