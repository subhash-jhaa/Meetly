'use client';

import React from 'react';
import Link from 'next/link';
import { FOOTER_DATA, SITE } from '../data/landingData';

const LOGO_SRC = 'https://framerusercontent.com/images/E1cdDQforYmgVbu5AtpZDN1cjVs.png';

const LINK_CLASS =
  'font-mono text-[13px] text-[#fafafa]/40 transition-colors hover:text-[#fafafa]/80 tracking-[-0.01em]';
const HEAD_CLASS =
  'text-[13px] font-normal tracking-widest uppercase text-[#fafafa]/30 font-mono mb-[16px]';

export default function Footer() {
  return (
    <footer className="w-full bg-[#09090b] border-t border-white/12">
      <div className="mx-auto max-w-[1200px] border-x border-white/12">

        {/* TOP GRID: brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_repeat(4,0.7fr)] border-b border-white/12">

          {/* BRAND COL */}
          <div className="p-[40px_32px] border-b border-white/12 md:border-b-0 md:border-r border-white/12 flex flex-col gap-[16px]">
            <img src={LOGO_SRC} alt={SITE.name} className="w-[28px] h-[28px] rounded-[3px]" />
            <p className="text-[14px] text-[#fafafa]/40 leading-[1.6] max-w-[220px]">
              {FOOTER_DATA.tagline}
            </p>
            <div className="flex flex-col gap-[10px] mt-[8px]">
              {FOOTER_DATA.social.map(({ label, href }) => (
                <Link key={label} href={href} target="_blank" className={LINK_CLASS}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* LINK COLUMNS */}
          {FOOTER_DATA.columns.map((col, i) => (
            <div
              key={col.heading}
              className={[
                'p-[40px_24px]',
                i < FOOTER_DATA.columns.length - 1 ? 'border-b border-white/12 md:border-b-0 md:border-r border-white/12' : '',
              ].join(' ')}
            >
              <p className={HEAD_CLASS}>{col.heading}</p>
              <div className="flex flex-col gap-[12px]">
                {col.links.map(({ label, href }) => (
                  <Link key={label} href={href} className={LINK_CLASS}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="p-[16px_24px] flex items-center justify-between flex-wrap gap-[8px]">
          <span className="text-[13px] text-[#fafafa]/20 font-mono tracking-[-0.01em]">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>
          <div className="flex gap-[20px]">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[12px] text-[#fafafa]/20 font-mono hover:text-[#fafafa]/40 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
