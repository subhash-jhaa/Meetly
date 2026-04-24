'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/landingData';

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
interface FAQItemProps {
  number: string;
  question: string;
  answer: string;
}

function FAQItem({ number, question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="cursor-pointer border-b border-[#d4d4d4]/15 p-[24px] last:border-b-0"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex items-center justify-between gap-[16px]">
        <span className="min-w-[28px] font-mono text-[12px] text-[#fafafa]/40">{number}</span>
        <span className="flex-1 text-[18px] font-normal tracking-[-0.02em] text-[#fafafa] md:text-[20px]">
          {question}
        </span>
        <svg
          className={`h-6 w-6 shrink-0 stroke-[#fafafa]/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" strokeWidth={2} strokeLinecap="round" fill="none" />
        </svg>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[200px] pt-[16px]' : 'max-h-0 pt-0'}`}>
        <p className="text-[15px] leading-[1.5] text-[#fafafa]/50 font-normal">{answer}</p>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function FAQ() {
  return (
    <div className="border border-[#d4d4d4]/15">
      {FAQ_ITEMS.map((faq, i) => (
        <FAQItem key={i} {...faq} />
      ))}
    </div>
  );
}
