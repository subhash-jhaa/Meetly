'use client';

import { CardCornerAccents, SectionHeader, SectionSpacer, CornerBox } from './ui/primitives';
import { TESTIMONIALS_SECTION } from '../data/landingData';

export default function Testimonials() {
  const { eyebrow, title, testimonials } = TESTIMONIALS_SECTION;

  return (
    <section className="w-full flex flex-col items-center bg-[#0a0a0a]" id="stories">
      <div className="w-full max-w-[1200px] border-x border-white/12 relative">

        {/* SECTION HEADER */}
        <div className="p-12 md:p-16">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-12 pb-24">
          {testimonials.map((t, i) => (
            <CornerBox key={i} size="md" className={`flex flex-col border-none bg-[#171717]/40 relative overflow-hidden group`}>
              {/* TESTIMONIAL QUOTE */}
              <div className="flex-1 p-10 md:p-12 relative overflow-hidden">
                <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                  <h3 className="text-[20px] md:text-[24px] font-normal leading-tight tracking-tight text-white/90 italic">
                    {t.quote}
                  </h3>

                  <div className="mt-auto">
                    <p className="text-[14px] font-medium text-white">{t.name}</p>
                    <p className="text-[12px] font-mono text-white/40 uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM14.017 11L14.017 8C14.017 6.89543 14.9124 6 16.017 6H19.017C20.1216 6 21.017 6.89543 21.017 8V11C21.017 12.1046 20.1216 13 19.017 13H16.017C14.9124 13 14.017 12.1046 14.017 11ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C9.10457 16 10 16.8954 10 18V21C10 22.1046 9.10457 23 8 23H5C3.89543 23 3 22.1046 3 21ZM3 11L3 8C3 6.89543 3.89543 6 5 6H8C9.10457 6 10 6.89543 10 8V11C10 12.1046 9.10457 13 8 13H5C3.89543 13 3 12.1046 3 11Z" />
                  </svg>
                </div>
              </div>
            </CornerBox>
          ))}
        </div>
      </div>
      <SectionSpacer variant="grid" hasGap={false} />
    </section>
  );
}
