'use client';

import React from 'react';
import Image from 'next/image';
import { CardCornerAccents, SectionHeader, SectionSpacer } from './ui/primitives';
import { TESTIMONIALS_SECTION } from '../data/landingData';

export default function Testimonials() {
  const { eyebrow, title, quote, author, metrics } = TESTIMONIALS_SECTION;

  return (
    <section className="w-full flex flex-col items-center bg-[#0a0a0a]" id="stories">
      <div className="w-full max-w-[1200px] border-x border-white/12 relative">
        
        {/* SECTION HEADER */}
        <div className="p-12 md:p-16 border-b border-white/12">
          <SectionHeader 
            eyebrow={eyebrow} 
            title={title} 
          />
        </div>

        {/* MAIN GRID */}
        <div className="flex flex-col md:flex-row border-b border-white/12">
          
          {/* LEFT COLUMN: VISUAL CARD */}
          <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-white/12 bg-[#111111]/30 flex items-center justify-center relative group">
            <div className="relative w-full aspect-[4/5] max-w-[360px] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
              {/* Window controls decoration */}
              <div className="absolute top-0 right-0 p-2 z-10 flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40 border border-green-500/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/10 flex items-center justify-center">
                   <div className="w-1.5 h-[1px] bg-white/40 rotate-45" />
                   <div className="w-1.5 h-[1px] bg-white/40 -rotate-45 absolute" />
                </div>
              </div>
              
              <Image 
                src="/images/customer-impact.png" 
                alt="Customer Story Visual" 
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Bottom overlay text */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[11px] text-white/50 bg-black/40 backdrop-blur-md px-2 py-1 rounded">
                  Invoices.
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: QUOTE & STATS */}
          <div className="flex-[1.5] flex flex-col">
            
            {/* TESTIMONIAL QUOTE */}
            <div className="flex-1 p-10 md:p-14 border-b border-white/12 bg-[#171717]/40 relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-[24px] md:text-[32px] font-normal leading-tight tracking-tight text-white/90 italic">
                    {quote}
                  </h3>
                  
                  <div className="mt-12">
                    <p className="text-[14px] font-medium text-white">{author.name}</p>
                    <p className="text-[12px] font-mono text-white/40 uppercase tracking-wider">{author.company}</p>
                  </div>
               </div>
               <div className="absolute top-0 right-0 p-4 opacity-5">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 11L14.017 8C14.017 6.89543 14.9124 6 16.017 6H19.017C20.1216 6 21.017 6.89543 21.017 8V11C21.017 12.1046 20.1216 13 19.017 13H16.017C14.9124 13 14.017 12.1046 14.017 11ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21ZM3 11L3 8C3 6.89543 3.89543 6 5 6H8C9.10457 6 10 6.89543 10 8V11C10 12.1046 9.10457 13 8 13H5C3.89543 13 3 12.1046 3 11Z" />
                  </svg>
               </div>
            </div>

            {/* STATS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3">
              {metrics.map((m, i) => (
                <div key={i} className={`p-8 border-b sm:border-b-0 ${i < metrics.length - 1 ? 'sm:border-r' : ''} border-white/12 bg-[#121212] relative overflow-hidden group hover:bg-[#1a1a1a] transition-colors`}>
                  <CardCornerAccents />
                  <div className="relative z-10">
                    <h4 className="text-[28px] font-normal tracking-tighter text-white mb-2">{m.num}</h4>
                    <p className="text-[12px] font-mono text-white/40 leading-tight">{m.label}</p>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 border border-white/5 rotate-45 group-hover:border-white/10 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SectionSpacer variant="grid" />
    </section>
  );
}
